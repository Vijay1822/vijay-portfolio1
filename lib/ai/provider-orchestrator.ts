import { ChatMessage, AIProviderResponse, AIProviderId } from "./types";
import {
  PORTFOLIO_SYSTEM_PROMPT,
  evaluateLocalKnowledge,
  findDeterministicAnswer,
} from "./portfolio-knowledge";

// Short circuit breaker cache for temporarily failing providers (cooldown: 45s)
const providerCooldownMap: Record<string, number> = {};

function isProviderInCooldown(provider: AIProviderId): boolean {
  const until = providerCooldownMap[provider];
  if (!until) return false;
  if (Date.now() > until) {
    delete providerCooldownMap[provider];
    return false;
  }
  return true;
}

function setProviderCooldown(provider: AIProviderId, durationMs = 45000) {
  providerCooldownMap[provider] = Date.now() + durationMs;
}

/**
 * Fetch with custom timeout signal.
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), Math.max(500, timeoutMs));

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

/**
 * Call Groq API (Primary Provider)
 */
async function callGroq(
  query: string,
  history: ChatMessage[],
  timeoutMs: number
): Promise<AIProviderResponse | null> {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) return null;
  if (isProviderInCooldown("groq")) return null;

  const configuredModel = process.env.GROQ_MODEL?.trim();
  const candidateModels = [
    ...(configuredModel ? [configuredModel] : []),
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "qwen/qwen3.8-27b",
  ].filter((m, i, arr) => arr.indexOf(m) === i);

  const messages = [
    { role: "system", content: PORTFOLIO_SYSTEM_PROMPT },
    ...history.slice(-6).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    })),
    { role: "user", content: query },
  ];

  const startTime = Date.now();
  for (const model of candidateModels) {
    try {
      const res = await fetchWithTimeout(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "User-Agent": "VijayPortfolio/1.0",
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.35,
            max_tokens: 600,
          }),
        },
        timeoutMs
      );

      if (res.status === 401 || res.status === 403) {
        console.warn("[AI Orchestrator] Groq Authentication/Permission error. Setting cooldown.");
        setProviderCooldown("groq", 120000);
        return null;
      }

      if (res.status === 404) {
        console.warn(`[AI Orchestrator] Groq model "${model}" not found (404), trying fallback candidate...`);
        continue;
      }

      if (!res.ok) {
        console.warn(`[AI Orchestrator] Groq returned status ${res.status}`);
        setProviderCooldown("groq", 30000);
        return null;
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (!reply) continue;

      return {
        reply,
        source: "groq",
        model,
        latencyMs: Date.now() - startTime,
      };
    } catch (err: any) {
      console.warn(`[AI Orchestrator] Groq request failed for ${model} (${err?.name || err?.message || "error"})`);
      continue;
    }
  }

  setProviderCooldown("groq", 20000);
  return null;
}

/**
 * Call Google Gemini API (Only Fallback Provider)
 */
async function callGemini(
  query: string,
  history: ChatMessage[],
  timeoutMs: number
): Promise<AIProviderResponse | null> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;
  if (isProviderInCooldown("gemini")) return null;

  const configuredModel = process.env.GEMINI_MODEL?.trim();
  const candidateModels = [
    ...(configuredModel ? [configuredModel] : []),
    "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-2.5-flash-lite",
  ].filter((m, i, arr) => arr.indexOf(m) === i);

  const formattedContents = [
    ...history.slice(-6).map((h) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.content }],
    })),
    {
      role: "user",
      parts: [{ text: query }],
    },
  ];

  const startTime = Date.now();
  for (const model of candidateModels) {
    try {
      const res = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: PORTFOLIO_SYSTEM_PROMPT }],
            },
            contents: formattedContents,
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 600,
            },
          }),
        },
        timeoutMs
      );

      if (res.status === 401 || res.status === 403) {
        console.warn("[AI Orchestrator] Gemini Authentication/Permission error. Setting cooldown.");
        setProviderCooldown("gemini", 120000);
        return null;
      }

      if (res.status === 404) {
        console.warn(`[AI Orchestrator] Gemini model "${model}" not found (404), trying fallback candidate...`);
        continue;
      }

      if (!res.ok) {
        console.warn(`[AI Orchestrator] Gemini returned status ${res.status}`);
        setProviderCooldown("gemini", 30000);
        return null;
      }

      const data = await res.json();
      const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawReply) continue;

      // Clean formatting artifacts
      const reply = rawReply
        .replace(
          /^[ \t]*[*•\-][ \t]+(?=(?:Programming Languages|AI|Frontend|Backend|Databases|IoT|Tools|Tech Stack|Key Coursework|Education|Contact|LeetCode|GitHub))/gim,
          ""
        )
        .replace(/^[ \t]*[-*_]{3,}[ \t]*$/gm, "")
        .trim();

      return {
        reply,
        source: "gemini",
        model,
        latencyMs: Date.now() - startTime,
      };
    } catch (err: any) {
      console.warn(`[AI Orchestrator] Gemini request failed for ${model} (${err?.name || err?.message || "error"})`);
      continue;
    }
  }

  setProviderCooldown("gemini", 20000);
  return null;
}

/**
 * Multi-Provider AI Orchestrator:
 * Flow:
 * 1. Fast deterministic portfolio lookup (0-2ms) with explicit status:
 *    - ANSWER_FOUND: return verified fact immediately.
 *    - ANSWER_INCOMPLETE / ANSWER_NOT_FOUND / REQUIRES_REASONING: proceed to AI.
 * 2. Primary Provider: Groq
 * 3. Fallback Provider: Google Gemini (Only called if Groq fails and time permits)
 * 4. Error response with retry option if both providers fail (NEVER return unrelated canned responses)
 */
export async function generateAIResponse(
  query: string,
  history: ChatMessage[] = []
): Promise<AIProviderResponse> {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      reply: "Please ask a question about Vijay's projects, skills, or background.",
      source: "local-knowledge",
      model: "empty-query",
      latencyMs: 0,
    };
  }

  // 1. Explicit Local Knowledge Lookup (<2ms)
  const localResult = evaluateLocalKnowledge(trimmed);
  if (localResult.status === "ANSWER_FOUND" && localResult.reply) {
    return {
      reply: localResult.reply,
      source: "local-knowledge",
      model: "deterministic-lookup",
      latencyMs: 1,
    };
  }

  // If local answer is missing, incomplete, or requires reasoning, automatically query AI models
  const primaryTimeout = parseInt(process.env.AI_PRIMARY_TIMEOUT_MS || "8000", 10);
  const fallbackTimeout = parseInt(process.env.AI_FALLBACK_TIMEOUT_MS || "6000", 10);
  const totalTimeout = parseInt(process.env.AI_TOTAL_TIMEOUT_MS || "15000", 10);

  const requestStartTime = Date.now();

  // 2. Primary Provider: Groq
  const groqResult = await callGroq(trimmed, history, primaryTimeout);
  if (groqResult) {
    return groqResult;
  }

  // Calculate remaining time for fallback attempt within total deadline
  const elapsed = Date.now() - requestStartTime;
  const remainingBudget = totalTimeout - elapsed;

  // 3. Fallback Provider: Google Gemini (Only if Groq failed and sufficient time remains)
  if (remainingBudget >= 1500) {
    const geminiTimeout = Math.min(fallbackTimeout, remainingBudget);
    const geminiResult = await callGemini(trimmed, history, geminiTimeout);
    if (geminiResult) {
      return geminiResult;
    }
  } else {
    console.warn(
      `[AI Orchestrator] Insufficient deadline remaining for Gemini fallback (${remainingBudget}ms left)`
    );
  }

  // 4. Clear error response with retry indicator when both providers fail
  return {
    reply: `I apologize, but I am temporarily unable to reach the AI reasoning service (both Groq and Gemini fallback encountered an error or timeout). Please click **Retry Question** below to try again.`,
    source: "error",
    model: "error-fallback",
    isError: true,
    canRetry: true,
    latencyMs: Date.now() - requestStartTime,
  };
}
