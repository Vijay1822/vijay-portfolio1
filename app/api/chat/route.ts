import { NextResponse } from "next/server";
import { PORTFOLIO_SYSTEM_PROMPT, generateSmartResponse } from "@/lib/ai-assistant";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const trimmed = message.trim();
    const historyList = Array.isArray(history) ? history : [];

    // 1. Generate core grounded structured response (actions, project card, skills, navigation)
    const smartStructured = generateSmartResponse(trimmed, historyList);

    // 2. Check if a Gemini API key is provided for dynamic AI generation
    if (process.env.GEMINI_API_KEY) {
      try {
        const formattedContents = [
          ...historyList.slice(-6).map((h: { role: string; content: string }) => ({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: h.content }],
          })),
          {
            role: "user",
            parts: [{ text: trimmed }],
          },
        ];

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
          }
        );

        if (res.ok) {
          const data = await res.json();
          const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawReply) {
            const reply = rawReply
              .replace(/^[ \t]*[*•\-][ \t]+(?=(?:Programming Languages|AI|Frontend|Backend|Databases|IoT|Tools|Tech Stack|Key Coursework|Education|Contact|LeetCode|GitHub))/gim, "")
              .replace(/^[ \t]*[-*_]{3,}[ \t]*$/gm, "")
              .trim();

            return NextResponse.json({
              reply,
              actions: smartStructured.actions,
              projectCard: smartStructured.projectCard,
              skillsGrid: smartStructured.skillsGrid,
              suggestedFollowUps: smartStructured.suggestedFollowUps,
              source: "gemini",
            });
          }
        } else {
          const errData = await res.text();
          console.warn("Gemini API call non-OK status:", res.status, errData);
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, attempting fallback:", geminiErr);
      }
    }

    // 3. Check if an OpenAI API key is provided for natural language variation
    if (process.env.OPENAI_API_KEY) {
      try {
        const messages = [
          { role: "system", content: PORTFOLIO_SYSTEM_PROMPT },
          ...historyList.slice(-6).map((h: { role: string; content: string }) => ({
            role: h.role === "assistant" ? "assistant" : "user",
            content: h.content,
          })),
          { role: "user", content: trimmed },
        ];

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages,
            max_tokens: 450,
            temperature: 0.35,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              actions: smartStructured.actions,
              projectCard: smartStructured.projectCard,
              skillsGrid: smartStructured.skillsGrid,
              suggestedFollowUps: smartStructured.suggestedFollowUps,
              source: "openai",
            });
          }
        }
      } catch (aiErr) {
        console.warn("OpenAI API call failed, falling back to local engine:", aiErr);
      }
    }

    // 3. Fallback / Default Instant Knowledge Engine
    return NextResponse.json({
      ...smartStructured,
      source: "local-knowledge-engine",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "I experienced a slight glitch processing that request, but I'm here! Feel free to ask about Vijay's projects, his CSE-IoT studies at VNR VJIET, his skills, or hackathons.",
        actions: [
          { label: "Projects", type: "query", query: "Show me Vijay's projects" },
          { label: "Skills", type: "query", query: "What technologies does Vijay know?" },
          { label: "Contact", type: "query", query: "How can I contact Vijay?" },
        ],
        source: "error-fallback",
      },
      { status: 200 }
    );
  }
}
