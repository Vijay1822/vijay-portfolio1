import { NextResponse } from "next/server";
import { PORTFOLIO_SYSTEM_PROMPT, generateFallbackResponse } from "@/lib/ai-assistant";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const trimmed = message.trim();

    // 1. Check if an OpenAI API key is provided
    if (process.env.OPENAI_API_KEY) {
      try {
        const messages = [
          { role: "system", content: PORTFOLIO_SYSTEM_PROMPT },
          ...(Array.isArray(history)
            ? history.slice(-6).map((h: { role: string; content: string }) => ({
                role: h.role === "assistant" ? "assistant" : "user",
                content: h.content,
              }))
            : []),
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
            temperature: 0.4,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply, source: "openai" });
          }
        }
      } catch (aiErr) {
        console.warn("OpenAI API call failed, falling back to deterministic engine:", aiErr);
      }
    }

    // 2. Intelligent deterministic fallback mode (Zero API keys needed, 100% reliability)
    const reply = generateFallbackResponse(trimmed);
    return NextResponse.json({
      reply,
      source: "local-knowledge-engine",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "I experienced a slight glitch processing that request, but I'm here! Feel free to ask about Vijay's projects, his CSE-IoT studies at VNR VJIET, or his skills.",
        source: "error-fallback",
      },
      { status: 200 }
    );
  }
}
