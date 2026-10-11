"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Bot,
  Server,
  Cpu,
  Database,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Layers,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Clock,
  Terminal,
  Code2,
  RotateCcw,
  Sparkle,
  Info,
  KeyRound,
  FileText,
  Search,
  Zap,
} from "lucide-react";

// ============================================================================
// ARCHITECTURE NODE DEFINITIONS (VERIFIED DIRECTLY FROM REPO CODE)
// ============================================================================

export interface ArchitectureNode {
  id: string;
  stepNumber: number;
  label: string;
  badge: string;
  badgeVariant: "cyan" | "emerald" | "amber" | "blue" | "purple";
  subsystem: string;
  filePath: string;
  icon: typeof Bot;
  summary: string;
  responsibilities: string[];
  dataReceived: string;
  dataProduced: string;
  codeSnippet: string;
  boundaryAndErrors: string;
}

const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "visitor-interface",
    stepNumber: 1,
    label: "Client Interface",
    badge: "Dual UI Frontends",
    badgeVariant: "cyan",
    subsystem: "Client Frontend (React & Next.js)",
    filePath: "components/ai-assistant/ai-assistant-modal.tsx & components/terminal/terminal-window.tsx",
    icon: Bot,
    summary:
      "Captures visitor questions via natural text typing or Web Speech API voice transcription. Manages optimistic message state and rolling conversation history.",
    responsibilities: [
      "Collects text input or transcribes microphone audio via Web Speech API",
      "Maintains client-side conversation state with a rolling 6-message history window",
      "CLI Terminal uses routeTerminalInput to separate shell commands from AI questions",
      "Dispatches HTTP POST /api/chat with sanitized query and previous message context",
    ],
    dataReceived:
      "Visitor keystrokes or audio stream; previous messages array from local state.",
    dataProduced:
      'JSON payload: { message: string, history: ChatMessage[], source: "modal" | "terminal" }',
    codeSnippet: `// components/ai-assistant/ai-assistant-modal.tsx
const history = messages.slice(-6).map((m) => ({
  role: m.role,
  content: m.content,
}));
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: query, history, source: "modal" }),
});`,
    boundaryAndErrors:
      "If the browser is offline, the client catches the fetch error and displays a retryable network alert.",
  },
  {
    id: "api-gateway",
    stepNumber: 2,
    label: "API Route Gateway",
    badge: "Edge Validation",
    badgeVariant: "blue",
    subsystem: "Next.js App Router Server Handler",
    filePath: "app/api/chat/route.ts",
    icon: Server,
    summary:
      "Server-side entry point validating payload integrity, checking message length boundaries, and generating structured UI enhancement metadata.",
    responsibilities: [
      "Parses incoming JSON with raw text escape fallback for malformed characters",
      "Enforces length limits: requires non-empty string and max 2,000 characters",
      "Slices input history to the last 10 messages to protect model context window",
      "Invokes generateSmartResponse (lib/ai-assistant.ts) for action chips and project cards",
      "Hands query off to the multi-provider orchestrator (lib/ai/provider-orchestrator.ts)",
    ],
    dataReceived:
      "HTTP POST Request body containing raw message, history array, and source metadata.",
    dataProduced:
      "Sanitized string trimmed, historyList array, and structured UI metadata container.",
    codeSnippet: `// app/api/chat/route.ts
if (!message || typeof message !== "string" || message.trim().length === 0) {
  return NextResponse.json({ error: "Message is required." }, { status: 400 });
}
if (message.length > 2000) {
  return NextResponse.json({ error: "Message exceeds 2000 chars." }, { status: 400 });
}
const smartStructured = generateSmartResponse(trimmed, historyList);
const aiResponse = await generateAIResponse(trimmed, historyList);`,
    boundaryAndErrors:
      "Rejects invalid JSON or oversized messages with HTTP 400. Unexpected server errors return a safe JSON fallback with retry capability.",
  },
  {
    id: "deterministic-lookup",
    stepNumber: 3,
    label: "Deterministic Filter",
    badge: "<2ms Local Engine",
    badgeVariant: "emerald",
    subsystem: "In-Memory Knowledge Heuristics",
    filePath: "lib/ai/portfolio-knowledge.ts",
    icon: Zap,
    summary:
      "Evaluates query intent before calling any external model. Authoritative facts (CGPA 9.45, college, GitHub, LeetCode, resume) return instantly with zero hallucination risk.",
    responsibilities: [
      "Classifies incoming question into 4 explicit statuses: ANSWER_FOUND, REQUIRES_REASONING, ANSWER_INCOMPLETE, or ANSWER_NOT_FOUND",
      "Extracts exact ground-truth facts (CGPA 9.45, VNR VJIET, social links, resume) in <2ms",
      "Detects evaluative queries ('Why should I hire Vijay?') and routes them to LLM reasoning",
      "Identifies unrecorded school-level queries and marks them ANSWER_NOT_FOUND",
    ],
    dataReceived:
      "Normalized lowercase query string.",
    dataProduced:
      'LocalLookupResult: { status: "ANSWER_FOUND" | "REQUIRES_REASONING" | ..., reply?: string }',
    codeSnippet: `// lib/ai/portfolio-knowledge.ts
export function evaluateLocalKnowledge(query: string): LocalLookupResult {
  const q = query.toLowerCase().trim();
  if (q.includes("cgpa") || q.includes("gpa")) {
    return {
      status: "ANSWER_FOUND",
      reply: \`Vijay Kumar holds an outstanding CGPA of \${EDUCATION.cgpa} at \${EDUCATION.institution}...\`,
      source: "local-knowledge",
      model: "deterministic-lookup",
    };
  }
  if (/why\\s+(should\\s+)?hire/i.test(q)) {
    return { status: "REQUIRES_REASONING", source: "local-knowledge" };
  }
  return { status: "ANSWER_NOT_FOUND", source: "local-knowledge" };
}`,
    boundaryAndErrors:
      "If status is ANSWER_FOUND, execution terminates immediately with 0ms LLM latency and 0 token cost. All other statuses proceed to model orchestration.",
  },
  {
    id: "context-assembly",
    stepNumber: 4,
    label: "Context Assembly",
    badge: "Prompt Grounding",
    badgeVariant: "amber",
    subsystem: "Factual Data Grounding Layer",
    filePath: "lib/data.ts & lib/ai/portfolio-knowledge.ts",
    icon: Database,
    summary:
      "Synthesizes authoritative profile records from strongly-typed TypeScript objects into PORTFOLIO_SYSTEM_PROMPT with strict negative constraints.",
    responsibilities: [
      "Reads directly from single source of truth in lib/data.ts (PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, EDUCATION, ACHIEVEMENTS)",
      "Formats verified project specs: BudgetMind (RAG + persistent memory), Smart Farmer Procurement, IoT Smart Fan Control",
      "Injects strict negative rules: never fabricate unrecorded metrics, high school marks, or unverified awards",
      "Mandates candidate evaluation structure: highlights academic standing, AI systems, and competitive problem solving",
      "Distinguishes portfolio facts from general computer science theory (explains general tech while noting portfolio boundaries)",
    ],
    dataReceived:
      "Typed objects from lib/data.ts.",
    dataProduced:
      "Comprehensive system prompt string (PORTFOLIO_SYSTEM_PROMPT) injected into model payload.",
    codeSnippet: `// lib/ai/portfolio-knowledge.ts
export const PORTFOLIO_SYSTEM_PROMPT = \`
You are Vijay AI, the dedicated personal engineering assistant for Mamidala Vijay Kumar.
DECISION RULES:
1. PORTFOLIO-SPECIFIC QUESTIONS: Base your answer STRICTLY on verified facts.
   If unlisted, EXPLICITLY state it is not documented. NEVER invent metrics.
2. "WHY SHOULD I HIRE VIJAY?": Synthesize verified strengths: 9.45 CGPA, BudgetMind development,
   IoT telemetry, and competitive LeetCode problem solving.
3. GENERAL TECHNICAL QUESTIONS: Answer helpfully from CS theory, but clearly clarify
   whether it is part of Vijay's documented stack.
FACTUAL KNOWLEDGE BASE:
- Degree: \${EDUCATION.degree} | Institution: \${EDUCATION.institution} | CGPA: \${EDUCATION.cgpa}
FEATURED PROJECTS: \${PROJECTS.map(...).join("\\n\\n")}
\`;`,
    boundaryAndErrors:
      "Context is static in code rather than retrieved from a vector database (RAG). Any update in lib/data.ts instantly updates both portfolio UI and AI prompt.",
  },
  {
    id: "model-orchestrator",
    stepNumber: 5,
    label: "Multi-Provider LLM",
    badge: "Groq → Gemini Failover",
    badgeVariant: "purple",
    subsystem: "External AI Provider Orchestrator",
    filePath: "lib/ai/provider-orchestrator.ts",
    icon: Sparkles,
    summary:
      "Orchestrates fast primary inference via Groq Cloud (Meta Llama 3.3 70B) with automatic failover to Google Gemini 1.5 Flash protected by timeouts and circuit breakers.",
    responsibilities: [
      "Primary Provider: Groq Cloud API running llama-3.3-70b-versatile (low temperature 0.35, 8s timeout)",
      "Circuit Breaker: Tracks cooldowns (120s on auth error, 30s on HTTP non-200, 20s on network timeout)",
      "Fallback Provider: Google Gemini API running gemini-1.5-flash (temperature 0.40, 6s timeout)",
      "Failover trigger: Gemini is called only if Groq fails and remaining budget within 15s total budget >= 1500ms",
      "Cleans formatting artifacts: strips raw asterisks, hyphens, and markdown dividers from output",
    ],
    dataReceived:
      "PORTFOLIO_SYSTEM_PROMPT + previous 6 conversation turns + visitor query.",
    dataProduced:
      'AIProviderResponse: { reply: string, source: "groq" | "gemini", model: string, latencyMs: number }',
    codeSnippet: `// lib/ai/provider-orchestrator.ts
// 1. Primary: Groq API
const groqResult = await callGroq(trimmed, history, primaryTimeout); // 8s timeout
if (groqResult) return groqResult;

// 2. Remaining Budget Check
const elapsed = Date.now() - requestStartTime;
const remainingBudget = totalTimeout - elapsed; // 15s total budget

// 3. Fallback: Google Gemini API
if (remainingBudget >= 1500) {
  const geminiResult = await callGemini(trimmed, history, Math.min(fallbackTimeout, remainingBudget));
  if (geminiResult) return geminiResult;
}`,
    boundaryAndErrors:
      "If both providers fail or timeout, returns source: 'error', isError: true, and canRetry: true. Never outputs canned unrelated answers upon error.",
  },
  {
    id: "response-enrichment",
    stepNumber: 6,
    label: "Answer Synthesis",
    badge: "Grounded UI Output",
    badgeVariant: "cyan",
    subsystem: "Client Display & Action Routing",
    filePath: "components/ai-assistant/FormattedMessage.tsx",
    icon: CheckCircle2,
    summary:
      "Merges generated explanation with interactive action buttons, project cards, and suggested follow-ups for one-click exploration.",
    responsibilities: [
      "Formats clean markdown without raw bullet artifacts via FormattedMessage",
      "Attaches action chips: one-click project navigation or direct contact links",
      "Displays interactive project cards with live demo and GitHub repository buttons",
      "Supports Web Speech API text-to-speech audio synthesis if enabled by user",
      "Displays transparent retry banner if model encountered downtime",
    ],
    dataReceived:
      "Complete JSON envelope from /api/chat with reply, actions, projectCard, source, and latency.",
    dataProduced:
      "Grounded conversational message bubble or terminal stdout block with interactive chips.",
    codeSnippet: `// Response payload displayed to visitor
{
  "success": true,
  "reply": "BudgetMind is an AI financial budget optimizer engineered by Vijay Kumar...",
  "actions": [
    { "label": "Explore Projects →", "type": "navigate", "url": "/projects" },
    { "label": "Contact Vijay →", "type": "navigate", "url": "/contact" }
  ],
  "source": "groq",
  "model": "llama-3.3-70b-versatile",
  "latencyMs": 412
}`,
    boundaryAndErrors:
      "If the assistant is unavailable, action pills allow visitors to manually navigate to /projects or /contact without dead ends.",
  },
];

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

export function HowVijayAIWorks() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("visitor-interface");
  const [activeTab, setActiveTab] = useState<
    "models" | "knowledge" | "grounding" | "fallbacks" | "walkthrough"
  >("models");

  const selectedNode =
    ARCHITECTURE_NODES.find((n) => n.id === selectedNodeId) ||
    ARCHITECTURE_NODES[0];

  const handleOpenExampleQuery = (query: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-ai-assistant", {
          detail: { query },
        })
      );
    }
  };

  return (
    <section
      id="how-vijay-ai-works"
      className="py-24 relative bg-[#070B14] border-t border-[rgba(148,163,184,0.12)] overflow-hidden"
      aria-labelledby="architecture-heading"
    >
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-[#22D3EE]/[0.035] blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-[#3B82F6]/[0.03] blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================================================================= */}
        {/* SECTION HEADER                                                    */}
        {/* ================================================================= */}
        <div className="flex flex-col items-start text-left mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0B1528] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] shadow-[0_0_14px_rgba(34,211,238,0.08)] mb-4 font-mono">
            <Cpu className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>AI SUBSYSTEM ARCHITECTURE</span>
          </div>

          <h2
            id="architecture-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.15]"
          >
            How Vijay AI{" "}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#38D9E8] to-[#3B82F6] bg-clip-text text-transparent">
              Works.
            </span>
          </h2>

          <p className="text-[#A7B4C7] text-base sm:text-lg leading-relaxed mt-3">
            From your question to a profile-grounded answer — here&apos;s what
            happens behind the scenes across my portfolio&apos;s AI orchestration
            pipeline.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-6 pt-6 border-t border-[rgba(148,163,184,0.12)]">
            <div className="p-3 rounded-xl bg-[#0B1220]/70 border border-[rgba(148,163,184,0.1)]">
              <span className="text-[11px] font-mono text-[#64748B] block uppercase tracking-wider">
                Fast Filter
              </span>
              <span className="text-sm font-bold text-[#34D399] font-mono">
                &lt;2ms In-Memory
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0B1220]/70 border border-[rgba(148,163,184,0.1)]">
              <span className="text-[11px] font-mono text-[#64748B] block uppercase tracking-wider">
                Model Orchestrator
              </span>
              <span className="text-sm font-bold text-[#22D3EE] font-mono">
                Groq → Gemini
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0B1220]/70 border border-[rgba(148,163,184,0.1)]">
              <span className="text-[11px] font-mono text-[#64748B] block uppercase tracking-wider">
                Ground Truth
              </span>
              <span className="text-sm font-bold text-[#F8FAFC] font-mono">
                lib/data.ts
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0B1220]/70 border border-[rgba(148,163,184,0.1)]">
              <span className="text-[11px] font-mono text-[#64748B] block uppercase tracking-wider">
                Global Budget
              </span>
              <span className="text-sm font-bold text-[#F59E0B] font-mono">
                15s Timeout
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* LAYER 1: INTERACTIVE PIPELINE ARCHITECTURE DIAGRAM                */}
        {/* ================================================================= */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider">
                Interactive Architecture Diagram
              </span>
              <span className="text-[11px] text-[#A7B4C7] hidden sm:inline">
                (Click or press Tab/Enter on any stage to inspect verified code)
              </span>
            </div>
            <span className="text-xs font-mono text-[#22D3EE]">
              Step {selectedNode.stepNumber} of {ARCHITECTURE_NODES.length} Active
            </span>
          </div>

          {/* Desktop & Tablet Horizontal/Grid Pipeline Flow */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3.5"
            role="tablist"
            aria-label="Architecture Pipeline Stages"
          >
            {ARCHITECTURE_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const Icon = node.icon;

              return (
                <button
                  key={node.id}
                  id={`tab-${node.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${node.id}`}
                  tabIndex={0}
                  onClick={() => setSelectedNodeId(node.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedNodeId(node.id);
                    }
                  }}
                  className={`relative flex flex-col items-start p-4 rounded-2xl text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] group cursor-pointer ${
                    isSelected
                      ? "bg-[#0E1A30] border-2 border-[#22D3EE] shadow-[0_0_24px_rgba(34,211,238,0.22)] scale-[1.02]"
                      : "bg-[#0A101D] border border-[rgba(148,163,184,0.15)] hover:border-[rgba(34,211,238,0.4)] hover:bg-[#0D1526]"
                  }`}
                >
                  {/* Step Sequence Badge */}
                  <div className="flex items-center justify-between w-full mb-3">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold font-mono flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#22D3EE] text-[#061018]"
                          : "bg-[#172338] text-[#A7B4C7] group-hover:text-[#F8FAFC]"
                      }`}
                    >
                      {node.stepNumber}
                    </span>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isSelected
                          ? "bg-[#070B14] text-[#22D3EE] border-[#22D3EE]/40"
                          : "bg-[#070B14]/70 text-[#64748B] border-[rgba(148,163,184,0.15)]"
                      }`}
                    >
                      {node.badge}
                    </span>
                  </div>

                  {/* Icon & Label */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isSelected ? "text-[#22D3EE]" : "text-[#A7B4C7]"
                      }`}
                    />
                    <h3 className="font-bold text-sm text-[#F8FAFC] tracking-tight">
                      {node.label}
                    </h3>
                  </div>

                  {/* Subsystem Subtitle */}
                  <p className="text-[11px] text-[#A7B4C7] line-clamp-2 leading-snug">
                    {node.subsystem}
                  </p>

                  {/* Flow Arrow indicator */}
                  <div className="mt-3 pt-2 w-full border-t border-[rgba(148,163,184,0.08)] flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                    <span>Inspect</span>
                    <ArrowRight
                      className={`w-3 h-3 transition-transform ${
                        isSelected
                          ? "text-[#22D3EE] translate-x-1"
                          : "text-[#64748B] group-hover:translate-x-0.5"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* LAYER 2: NODE DEEP-DIVE INSPECTOR (ACTIVE NODE PANEL)             */}
        {/* ================================================================= */}
        <div
          id={`panel-${selectedNode.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${selectedNode.id}`}
          className="mb-16 p-6 sm:p-8 rounded-3xl bg-[#090E1B] border border-[rgba(56,217,232,0.3)] shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(34,211,238,0.06)] relative overflow-hidden"
        >
          {/* Ambient Corner Specular Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#22D3EE]/[0.08] via-transparent to-transparent pointer-events-none rounded-tr-3xl" />

          {/* Panel Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[rgba(148,163,184,0.12)]">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#22D3EE] text-[#061018] font-bold font-mono text-sm flex items-center justify-center">
                  {selectedNode.stepNumber}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#F8FAFC]">
                  {selectedNode.label}: {selectedNode.subsystem}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] pt-1">
                <Code2 className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span className="underline underline-offset-2">
                  {selectedNode.filePath}
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1829] border border-[#22D3EE]/30 text-xs font-mono text-[#22D3EE]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Verified In Codebase</span>
            </div>
          </div>

          {/* Panel Grid: Breakdown & Code Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Left Column: Responsibilities & Contracts (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <h4 className="text-xs font-mono text-[#64748B] uppercase tracking-wider mb-2">
                  Summary &amp; Architecture Role
                </h4>
                <p className="text-sm sm:text-base text-[#F8FAFC] leading-relaxed">
                  {selectedNode.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-[#64748B] uppercase tracking-wider mb-2.5">
                  Verified Responsibilities
                </h4>
                <ul className="space-y-2">
                  {selectedNode.responsibilities.map((resp, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A7B4C7] leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data In & Data Out Contracts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)]">
                  <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block mb-1">
                    Data Received (Input)
                  </span>
                  <p className="text-xs text-[#E2E8F0] font-mono leading-relaxed">
                    {selectedNode.dataReceived}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)]">
                  <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block mb-1">
                    Data Emitted (Output)
                  </span>
                  <p className="text-xs text-[#E2E8F0] font-mono leading-relaxed">
                    {selectedNode.dataProduced}
                  </p>
                </div>
              </div>

              {/* Boundary / Error Handling */}
              <div className="p-3.5 rounded-xl bg-[#0D1626] border border-[rgba(34,211,238,0.2)] text-xs text-[#A7B4C7]">
                <strong className="text-[#22D3EE] font-mono block mb-1">
                  Boundary &amp; Failure Behavior:
                </strong>
                {selectedNode.boundaryAndErrors}
              </div>
            </div>

            {/* Right Column: Code Snippet Verification (5 cols) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-2 text-xs font-mono text-[#64748B]">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#22D3EE]" />
                  Verified Implementation
                </span>
                <span className="text-[10px] text-[#A7B4C7]">TypeScript / React</span>
              </div>

              <div className="flex-1 rounded-2xl bg-[#050811] border border-[rgba(148,163,184,0.15)] p-4 font-mono text-[11px] sm:text-xs text-[#E2E8F0] leading-relaxed overflow-x-auto shadow-inner">
                <pre>
                  <code>{selectedNode.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* LAYER 3: TECHNICAL IMPLEMENTATION & RELIABILITY DEEP DIVE TABS    */}
        {/* ================================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(148,163,184,0.15)] pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#F8FAFC]">
                Engineering Specifications &amp; Grounding Safeguards
              </h3>
              <p className="text-xs sm:text-sm text-[#A7B4C7] mt-1">
                Explore the verified design choices, knowledge sources, and reliability mechanisms.
              </p>
            </div>

            {/* Sub-Tabs Nav */}
            <div
              className="flex items-center gap-1.5 bg-[#0A101D] p-1 rounded-full border border-[rgba(148,163,184,0.15)] overflow-x-auto max-w-full"
              role="tablist"
              aria-label="Architecture Topic Tabs"
            >
              {[
                { key: "models", label: "Model & API Design" },
                { key: "knowledge", label: "Profile Knowledge Source" },
                { key: "grounding", label: "Grounding & Hallucinations" },
                { key: "fallbacks", label: "Error & Unknown Handling" },
                { key: "walkthrough", label: "Live Trace Example" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={activeTab === tab.key}
                  tabIndex={0}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] ${
                    activeTab === tab.key
                      ? "bg-[#22D3EE] text-[#061018] shadow-[0_0_12px_rgba(34,211,238,0.3)] font-bold"
                      : "text-[#A7B4C7] hover:text-[#F8FAFC] hover:bg-[#121C2D]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: MODEL & API DESIGN */}
          {activeTab === "models" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
            >
              <div className="p-6 rounded-2xl bg-[#090E1B] border border-[rgba(148,163,184,0.15)] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1E33] border border-[#22D3EE]/30 text-xs font-mono text-[#22D3EE]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>PRIMARY PROVIDER: GROQ CLOUD</span>
                  </div>
                  <span className="text-xs font-mono text-[#34D399]">Fast LPUs</span>
                </div>

                <h4 className="text-lg font-bold text-[#F8FAFC]">
                  Meta Llama 3.3 70B on Groq LPUs
                </h4>

                <p className="text-xs sm:text-sm text-[#A7B4C7] leading-relaxed">
                  Invoked via OpenAI-compatible REST endpoint at{" "}
                  <code className="text-[#22D3EE]">api.groq.com/openai/v1/chat/completions</code>{" "}
                  using configured model identifier <code className="text-[#F8FAFC]">llama-3.3-70b-versatile</code>.
                </p>

                <ul className="space-y-2 text-xs text-[#A7B4C7] font-mono">
                  <li>• Timeout: 8,000ms (configured via AI_PRIMARY_TIMEOUT_MS)</li>
                  <li>• Generation Temperature: 0.35 (strict factual grounding)</li>
                  <li>• Max Tokens: 600 (focused conversational answers)</li>
                  <li>• Circuit Breaker Cooldown: 120s on 401/403, 30s on non-200, 20s on timeout</li>
                </ul>

                <p className="text-xs text-[#64748B] pt-2 border-t border-[rgba(148,163,184,0.1)]">
                  <strong>Engineering Rationale:</strong> Groq provides near-instant time-to-first-token
                  (often &lt;300ms), delivering a snappy, responsive conversational feel.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#090E1B] border border-[rgba(148,163,184,0.15)] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1829] border border-purple-500/30 text-xs font-mono text-purple-300">
                    <Layers className="w-3.5 h-3.5" />
                    <span>FALLBACK PROVIDER: GOOGLE GEMINI</span>
                  </div>
                  <span className="text-xs font-mono text-[#F59E0B]">High Availability</span>
                </div>

                <h4 className="text-lg font-bold text-[#F8FAFC]">
                  Gemini 1.5 Flash Failover
                </h4>

                <p className="text-xs sm:text-sm text-[#A7B4C7] leading-relaxed">
                  Invoked via Google Generative Language REST endpoint at{" "}
                  <code className="text-[#22D3EE]">generativelanguage.googleapis.com</code>{" "}
                  using configured model identifier <code className="text-[#F8FAFC]">gemini-1.5-flash</code>.
                </p>

                <ul className="space-y-2 text-xs text-[#A7B4C7] font-mono">
                  <li>• Activation Trigger: Only called if Groq fails and remaining budget &gt;= 1,500ms</li>
                  <li>• Timeout: 6,000ms (configured via AI_FALLBACK_TIMEOUT_MS)</li>
                  <li>• Global Request Ceiling: 15,000ms total wall-clock budget</li>
                  <li>• System Instruction: Formatted system prompt injected into system_instruction</li>
                </ul>

                <p className="text-xs text-[#64748B] pt-2 border-t border-[rgba(148,163,184,0.1)]">
                  <strong>Engineering Rationale:</strong> Gemini offers robust rate limits and high
                  availability, guaranteeing visitors receive answers even during upstream Groq outages.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 2: PROFILE KNOWLEDGE SOURCE */}
          {activeTab === "knowledge" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#090E1B] border border-[rgba(148,163,184,0.15)] text-left space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <h4 className="text-xl font-bold text-[#F8FAFC]">
                  Where Does Vijay AI Get Its Information?
                </h4>
                <p className="text-sm text-[#A7B4C7] leading-relaxed">
                  The architecture does not use an opaque vector database, dynamic web scraping, or
                  unverified external links. All profile context originates from a single authoritative
                  TypeScript source of truth: <code className="text-[#22D3EE]">lib/data.ts</code>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] space-y-2">
                  <h5 className="font-bold text-sm text-[#22D3EE]">
                    1. Structured Data Constants
                  </h5>
                  <p className="text-xs text-[#A7B4C7] leading-relaxed">
                    Facts are declared in strongly-typed structures: <code className="text-[#F8FAFC]">PERSONAL_INFO</code>,{" "}
                    <code className="text-[#F8FAFC]">PROJECTS</code>, <code className="text-[#F8FAFC]">SKILL_CATEGORIES</code>,{" "}
                    <code className="text-[#F8FAFC]">EDUCATION</code>, and <code className="text-[#F8FAFC]">ACHIEVEMENTS</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] space-y-2">
                  <h5 className="font-bold text-sm text-[#34D399]">
                    2. Prompt-Based Ingestion
                  </h5>
                  <p className="text-xs text-[#A7B4C7] leading-relaxed">
                    Rather than vector similarity lookups, verified facts are interpolated directly into{" "}
                    <code className="text-[#F8FAFC]">PORTFOLIO_SYSTEM_PROMPT</code>. The model has full contextual visibility on every call.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] space-y-2">
                  <h5 className="font-bold text-sm text-[#F59E0B]">
                    3. Synchronized Updates
                  </h5>
                  <p className="text-xs text-[#A7B4C7] leading-relaxed">
                    When Vijay updates a project or skill in <code className="text-[#F8FAFC]">lib/data.ts</code>,
                    the Web UI, Obsidian CLI Terminal, and AI Assistant update simultaneously.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0D1626] border border-[rgba(34,211,238,0.2)] text-xs text-[#A7B4C7] space-y-1.5">
                <strong className="text-[#22D3EE] font-mono block">
                  CLI Terminal vs. Chatbot Relationship:
                </strong>
                <p>
                  The Obsidian CLI Terminal executes discrete commands (e.g. <code className="text-white">projects</code>,{" "}
                  <code className="text-white">skills</code>, <code className="text-white">cat resume</code>) directly in client JavaScript using{" "}
                  <code className="text-[#22D3EE]">lib/terminal-commands.ts</code>. When a visitor types a conversational question (e.g.{" "}
                  <em>&ldquo;How does the fan control work?&rdquo;</em>), the CLI routes the question to{" "}
                  <code className="text-[#22D3EE]">/api/chat</code>, sharing the identical multi-provider backend.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 3: GROUNDING & HALLUCINATIONS */}
          {activeTab === "grounding" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#090E1B] border border-[rgba(148,163,184,0.15)] text-left space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <h4 className="text-xl font-bold text-[#F8FAFC]">
                  How Vijay AI Keeps Answers Grounded
                </h4>
                <p className="text-sm text-[#A7B4C7] leading-relaxed">
                  Hallucinations in candidate profile chatbots are unacceptable. Here is the verified 4-tier
                  safeguard system implemented in the code:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] space-y-1.5">
                  <div className="flex items-center gap-2 text-[#34D399] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>1. Deterministic Bypass (&lt;2ms)</span>
                  </div>
                  <p className="text-xs text-[#A7B4C7] leading-relaxed">
                    Hard credentials (CGPA 9.45, VNR VJIET, GitHub, LeetCode, resume) bypass the LLM entirely via{" "}
                    <code className="text-[#22D3EE]">evaluateLocalKnowledge</code>, eliminating 100% of hallucination risk for key facts.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] space-y-1.5">
                  <div className="flex items-center gap-2 text-[#22D3EE] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>2. Low Generation Temperature</span>
                  </div>
                  <p className="text-xs text-[#A7B4C7] leading-relaxed">
                    Configured at <code className="text-white">temperature: 0.35</code> (Groq) and{" "}
                    <code className="text-white">0.40</code> (Gemini) to minimize generative drift and strictly prioritize factual fidelity.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] space-y-1.5">
                  <div className="flex items-center gap-2 text-[#F59E0B] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>3. Rigid Negative Constraints</span>
                  </div>
                  <p className="text-xs text-[#A7B4C7] leading-relaxed">
                    Prompt instruction: <em>&ldquo;If a personal detail or metric is NOT in the knowledge base, EXPLICITLY state that the information is not documented. NEVER invent personal facts.&rdquo;</em>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] space-y-1.5">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>4. Topic Demarcation</span>
                  </div>
                  <p className="text-xs text-[#A7B4C7] leading-relaxed">
                    When asked about general CS theory (e.g. Kubernetes, Rust, Docker), the model answers from computer science knowledge while clearly clarifying whether or not Vijay has documented experience with it.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                <strong className="font-mono text-amber-300 block">
                  Honest Architectural Limitations:
                </strong>
                <p>
                  No LLM can guarantee zero hallucination on complex, multi-paragraph syntheses. Static prompt
                  injection also has context length boundaries compared to dynamic RAG chunking.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 4: ERROR & UNKNOWN HANDLING */}
          {activeTab === "fallbacks" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#090E1B] border border-[rgba(148,163,184,0.15)] text-left space-y-6"
            >
              <div className="max-w-3xl space-y-2">
                <h4 className="text-xl font-bold text-[#F8FAFC]">
                  What Happens When Vijay AI Doesn&apos;t Know?
                </h4>
                <p className="text-sm text-[#A7B4C7] leading-relaxed">
                  How the system behaves when asked unrecorded questions, out-of-domain topics, or when
                  upstream cloud APIs fail:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <strong className="text-[#F8FAFC] text-sm block">
                      Case 1: Unrecorded Profile Details (e.g. &ldquo;What was his 10th grade score?&rdquo;)
                    </strong>
                    <p className="text-[#A7B4C7]">
                      The model explicitly states that high school or unlisted records are not documented in Vijay&apos;s
                      portfolio. It refuses to invent hypothetical numbers and offers to share his college CGPA (9.45) instead.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] flex items-start gap-3">
                  <Info className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <strong className="text-[#F8FAFC] text-sm block">
                      Case 2: General Technology Concept (e.g. &ldquo;Explain Kubernetes&rdquo;)
                    </strong>
                    <p className="text-[#A7B4C7]">
                      The model explains container orchestration accurately using general CS knowledge, then explicitly notes that Kubernetes is not currently listed in Vijay&apos;s primary documented stack.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] flex items-start gap-3">
                  <RotateCcw className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <strong className="text-[#F8FAFC] text-sm block">
                      Case 3: Both Providers Fail or Timeout (&gt;15s)
                    </strong>
                    <p className="text-[#A7B4C7]">
                      The API route returns an explicit error payload (<code className="text-[#F8FAFC]">isError: true</code>,{" "}
                      <code className="text-[#F8FAFC]">canRetry: true</code>). The UI renders an apology with a prominent{" "}
                      <strong>&ldquo;Retry Question&rdquo;</strong> button and links to <code className="text-[#22D3EE]">/projects</code> and{" "}
                      <code className="text-[#22D3EE]">/contact</code>.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: WALKTHROUGH EXAMPLE */}
          {activeTab === "walkthrough" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#090E1B] border border-[rgba(148,163,184,0.15)] text-left space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold text-[#F8FAFC]">
                    Trace a Real Question: &ldquo;What is BudgetMind?&rdquo;
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A7B4C7] mt-1">
                    Step-by-step walkthrough of how a project question moves through the architecture.
                  </p>
                </div>

                <button
                  onClick={() => handleOpenExampleQuery("What is BudgetMind?")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#38D9E8] shadow-[0_0_18px_rgba(34,211,238,0.25)] transition-all cursor-pointer shrink-0"
                  title="Open Vijay AI Assistant with 'What is BudgetMind?' prefilled"
                >
                  <Bot className="w-4 h-4" />
                  <span>Try in Vijay AI Assistant</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Step Sequence Trace */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#22D3EE] text-[#061018] font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <strong className="text-[#F8FAFC] block">Visitor submits question in UI</strong>
                    <span className="text-[#A7B4C7]">Payload: &#123; message: &quot;What is BudgetMind?&quot;, history: [] &#125; dispatched to /api/chat.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#3B82F6] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <strong className="text-[#F8FAFC] block">API Gateway validates and evaluates</strong>
                    <span className="text-[#A7B4C7]">Input sanitized. evaluateLocalKnowledge detects &quot;BudgetMind&quot; requires technical explanation → status: REQUIRES_REASONING.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#F59E0B] text-[#061018] font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <strong className="text-[#F8FAFC] block">Prompt context injected</strong>
                    <span className="text-[#A7B4C7]">System prompt provides verified BudgetMind record: AI Budget Optimizer, RAG + LLMs, LangChain, React, Node.js, MongoDB, GitHub and demo links.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-purple-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    4
                  </span>
                  <div>
                    <strong className="text-[#F8FAFC] block">Groq Llama 3.3 70B generates response (~380ms)</strong>
                    <span className="text-[#A7B4C7]">Synthesizes clear architectural breakdown grounded strictly in BudgetMind facts.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-[#34D399] text-[#061018] font-bold text-xs flex items-center justify-center shrink-0">
                    5
                  </span>
                  <div>
                    <strong className="text-[#F8FAFC] block">UI renders grounded answer + interactive card</strong>
                    <span className="text-[#A7B4C7]">Formatted text returned with clickable GitHub repo chip, live demo link, and follow-up chips.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HowVijayAIWorks;
