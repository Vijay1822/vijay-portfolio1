"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle,
  Cpu,
  Layers,
  Server,
  Database,
  Calculator,
  Brain,
  History,
  TrendingUp,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { Project } from "@/lib/data";
import { IotFanSimulator } from "./iot-fan-simulator";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  const isBudgetMind = project?.id === "budgetmind";
  const isSmartFan = project?.id === "smart-fan-control";

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#121C2D]/98 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[rgba(34,211,238,0.22)] overflow-y-auto z-10 p-6 sm:p-8 md:p-10 text-[#F8FAFC]"
          >
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#22D3EE]/[0.05] rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2.5 rounded-full text-[#A7B4C7] hover:text-[#F8FAFC] hover:bg-[#172338] active:scale-95 transition-all focus:outline-none border border-[rgba(148,163,184,0.15)] focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Close Project Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] mb-3 shadow-[0_0_12px_rgba(34,211,238,0.12)]">
                <span>{project.badge}</span>
                <span>•</span>
                <span className="text-[#F59E0B]">{project.category}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-[#22D3EE] mt-2 font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Quick Metrics Bar if available */}
            {project.metrics && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 p-4 rounded-2xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)]">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center sm:text-left">
                    <div className="text-xs text-[#64748B] font-mono uppercase">{m.label}</div>
                    <div className="text-base sm:text-lg font-bold text-[#22D3EE] mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Grid Layout: Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-2xl bg-[#172338]/80 border border-[rgba(245,158,11,0.25)]">
                <h3 className="text-sm font-bold text-[#F59E0B] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_6px_#F59E0B]" />
                  The Problem
                </h3>
                <p className="text-xs sm:text-sm text-[#A7B4C7] leading-relaxed font-normal">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0D2731]/80 border border-[rgba(34,211,238,0.25)]">
                <h3 className="text-sm font-bold text-[#22D3EE] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_6px_#22D3EE]" />
                  The Solution
                </h3>
                <p className="text-xs sm:text-sm text-[#A7B4C7] leading-relaxed font-normal">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Specific Deep Architectural Breakdown for BudgetMind */}
            {isBudgetMind && (
              <div className="mb-8 p-6 rounded-2xl bg-[#0B1528] border border-[rgba(34,211,238,0.25)] shadow-[0_0_20px_rgba(34,211,238,0.06)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[rgba(148,163,184,0.12)]">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] flex items-center gap-2">
                      <Brain className="w-4 h-4 text-[#22D3EE]" />
                      BudgetMind Autonomous Logic &amp; Hindsight Architecture
                    </h3>
                    <p className="text-xs text-[#A7B4C7]">
                      Core Philosophy: <span className="font-mono text-[#22D3EE]">Available Budget ≠ Target Spending</span> (Minimizing Effective Cost while preserving unallocated strategic reserves).
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#17253B] text-[#38D9E8] border border-[rgba(34,211,238,0.3)] w-fit">
                    Hindsight Memory Engine
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm mb-5">
                  <div className="p-3.5 rounded-xl bg-[#0D1A30] border border-[rgba(148,163,184,0.12)]">
                    <div className="font-bold text-[#22D3EE] flex items-center gap-1.5 mb-1">
                      <Calculator className="w-3.5 h-3.5" />
                      21 Deterministic Financial Tools
                    </div>
                    <p className="text-[#A7B4C7] leading-relaxed text-xs">
                      Single source of truth. Critical arithmetic is <strong>never delegated to LLMs</strong>. Deterministic tools execute all math for category allocations, recurring costs, 3-year TCO, and variance calculations.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0D1A30] border border-[rgba(148,163,184,0.12)]">
                    <div className="font-bold text-[#38D9E8] flex items-center gap-1.5 mb-1">
                      <Brain className="w-3.5 h-3.5" />
                      Gemini 1.5 Flash Constraint Parser
                    </div>
                    <p className="text-[#A7B4C7] leading-relaxed text-xs">
                      Extracts structured requirement tokens and spending constraints from natural language prompts, mapping user objectives to appropriate procurement categories with zero math dependency.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0D1A30] border border-[rgba(148,163,184,0.12)]">
                    <div className="font-bold text-[#F59E0B] flex items-center gap-1.5 mb-1">
                      <Scale className="w-3.5 h-3.5" />
                      3-Year TCO &amp; Hidden Cost Modeler
                    </div>
                    <p className="text-[#A7B4C7] leading-relaxed text-xs">
                      Evaluates total cost of ownership beyond superficial sticker prices, flagging vendor lock-in risks, hidden cloud egress tiers, contract renewal price hikes, and SLA penalties.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0D1A30] border border-[rgba(148,163,184,0.12)]">
                    <div className="font-bold text-[#34D399] flex items-center gap-1.5 mb-1">
                      <History className="w-3.5 h-3.5" />
                      Biomimetic Hindsight Memory Bank
                    </div>
                    <p className="text-[#A7B4C7] leading-relaxed text-xs">
                      Persistent memory powered by <code>@vectorize-io/hindsight-client</code>. Recalls past cloud cost overruns and vendor reliability metrics to inform subsequent project budget plans.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0D1A30] border border-[rgba(148,163,184,0.12)]">
                    <div className="font-bold text-[#60A5FA] flex items-center gap-1.5 mb-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Software Seat &amp; Asset Harvesting
                    </div>
                    <p className="text-[#A7B4C7] leading-relaxed text-xs">
                      Audits enterprise resource inventories before approving new purchases, detecting and harvesting idle SaaS seats (e.g. unused Slack/Jira seats) to immediately eliminate redundant expenditures.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0D1A30] border border-[rgba(148,163,184,0.12)]">
                    <div className="font-bold text-[#F43F5E] flex items-center gap-1.5 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Evidence-Based Reserves &amp; Human Approval
                    </div>
                    <p className="text-[#A7B4C7] leading-relaxed text-xs">
                      Injects evidence-backed contingency reserves based on category risk histories. Strict human-in-the-loop governance ensures no financial commitment is executed without explicit stakeholder sign-off.
                    </p>
                  </div>
                </div>

                {/* Implementation Status vs Roadmap */}
                <div className="pt-3 border-t border-[rgba(148,163,184,0.12)] grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-[#07111D] border border-cyan-500/20">
                    <span className="font-bold text-[#22D3EE] block mb-1">✓ Shipped &amp; Production-Ready:</span>
                    <span className="text-[#A7B4C7]">
                      Natural language intake, 21 deterministic tools, Hindsight memory bank, license harvesting, Netlify cloud deployment (<a href="https://budgetmind3.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[#22D3EE] underline">budgetmind3.netlify.app</a>), and human review gates.
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#07111D] border border-amber-500/20">
                    <span className="font-bold text-[#F59E0B] block mb-1">⏳ Planned Enterprise Roadmap:</span>
                    <span className="text-[#A7B4C7]">
                      Direct ERP database synchronization (SAP / Oracle NetSuite connectors) and automated banking webhook ledger reconciliation.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Hardware Simulator for Smart Fan Control */}
            {isSmartFan && (
              <div className="mb-8">
                <IotFanSimulator />
              </div>
            )}

            {/* System Architecture Section */}
            <div className="mb-8">
              <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#22D3EE]" />
                System Architecture &amp; Data Flow
              </h3>

              {/* Step-by-step Flow */}
              <div className="space-y-2 mb-6">
                {project.architecture.flow.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] text-xs sm:text-sm text-[#A7B4C7]"
                  >
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#22D3EE] text-[#061018] font-bold text-[11px] shrink-0 mt-0.5 shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                      {idx + 1}
                    </div>
                    <span className="leading-snug text-[#F8FAFC]">{step}</span>
                  </div>
                ))}
              </div>

              {/* Architecture Stack Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#F8FAFC] block">Frontend Client:</span>
                    <span className="text-[#A7B4C7]">{project.architecture.frontend}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] flex items-start gap-2.5">
                  <Server className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#F8FAFC] block">Backend Gateway:</span>
                    <span className="text-[#A7B4C7]">{project.architecture.backend}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] flex items-start gap-2.5">
                  <Cpu className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#F8FAFC] block">AI / Hardware Engine:</span>
                    <span className="text-[#A7B4C7]">{project.architecture.aiOrIot}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] flex items-start gap-2.5">
                  <Database className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#F8FAFC] block">Persistence &amp; Telemetry:</span>
                    <span className="text-[#A7B4C7]">{project.architecture.database}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] mb-3">
                Core Engineering Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#A7B4C7]">
                    <CheckCircle className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Badges */}
            <div className="mb-8">
              <h4 className="text-xs font-mono font-medium text-[#64748B] uppercase tracking-wider mb-2">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-[#172338] text-[#67E8F9] border border-[rgba(34,211,238,0.15)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-6 border-t border-[rgba(148,163,184,0.12)] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] active:scale-95 transition-all shadow-[0_10px_25px_rgba(34,211,238,0.18)]"
                  >
                    <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                    <span>Launch Live Demo ↗</span>
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#F8FAFC] bg-[#121C2D] hover:bg-[#172338] border border-[rgba(148,163,184,0.2)] hover:border-[#22D3EE] active:scale-95 transition-all shadow-sm"
                >
                  <Github className="w-4 h-4 text-[#22D3EE]" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#A7B4C7]" />
                </a>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#A7B4C7] hover:text-[#F8FAFC] active:scale-95 transition-colors border border-transparent hover:border-slate-800"
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
