import { NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai/provider-orchestrator";
import { generateSmartResponse } from "@/lib/ai-assistant";

export async function POST(req: Request) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      try {
        const rawText = await req.text();
        body = JSON.parse(rawText.replace(/\\(?!["\\/bfnrtu])/g, "\\\\"));
      } catch {
        return NextResponse.json(
          { error: "Invalid JSON format in request payload." },
          { status: 400 }
        );
      }
    }

    const { message, history, source, conversationId } = body || {};

    // Validate input message
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required and must be non-empty." },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message exceeds maximum allowed length (2000 characters)." },
        { status: 400 }
      );
    }

    const trimmed = message.trim();
    const historyList = Array.isArray(history) ? history.slice(-10) : [];

    // 1. Get structured UI enhancements (actions, project cards, follow-ups)
    const smartStructured = generateSmartResponse(trimmed, historyList);

    // 2. Multi-provider AI orchestration: Fast Deterministic Lookup -> Groq (Primary) -> Gemini (Fallback)
    const aiResponse = await generateAIResponse(trimmed, historyList);

    if (aiResponse.isError) {
      return NextResponse.json({
        success: true,
        reply: aiResponse.reply,
        isError: true,
        canRetry: true,
        actions: [
          { label: "Retry Question", type: "query", query: trimmed, variant: "primary" },
          { label: "View Projects →", type: "navigate", url: "/projects" },
          { label: "Contact Vijay →", type: "navigate", url: "/contact" },
        ],
        source: "error",
        model: aiResponse.model,
        latencyMs: aiResponse.latencyMs,
        conversationId: conversationId || undefined,
      });
    }

    return NextResponse.json({
      success: true,
      reply: aiResponse.reply || smartStructured.reply,
      actions: smartStructured.actions,
      projectCard: smartStructured.projectCard,
      skillsGrid: smartStructured.skillsGrid,
      suggestedFollowUps: smartStructured.suggestedFollowUps,
      source: aiResponse.source,
      model: aiResponse.model,
      latencyMs: aiResponse.latencyMs,
      conversationId: conversationId || undefined,
    });
  } catch (error) {
    console.error("[Chat API Route] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        reply:
          "⚠️ An unexpected server error occurred while connecting to the AI assistant. Please try asking again or explore Vijay's projects.",
        isError: true,
        canRetry: true,
        actions: [
          { label: "Retry Question", type: "query", query: "help", variant: "primary" },
          { label: "View Projects →", type: "navigate", url: "/projects" },
          { label: "Contact Vijay →", type: "navigate", url: "/contact" },
        ],
        source: "error",
      },
      { status: 200 }
    );
  }
}
