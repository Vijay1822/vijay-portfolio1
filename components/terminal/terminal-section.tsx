"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Sparkles, Maximize2, ShieldCheck, Zap } from "lucide-react";
import { TerminalWindow } from "./terminal-window";
import { Project } from "@/lib/data";

interface TerminalSectionProps {
  onOpenProjectModal?: (project: Project) => void;
  onOpenFullModal?: () => void;
}

export function TerminalSection({
  onOpenProjectModal,
  onOpenFullModal,
}: TerminalSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="engineering-terminal"
      className="py-20 relative bg-[#070B14] border-t border-[rgba(148,163,184,0.12)] overflow-hidden"
    >
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#22D3EE]/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#3B82F6]/[0.025] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] shadow-[0_0_12px_rgba(34,211,238,0.10)] font-mono">
              <Terminal className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>OBSIDIAN AI TERMINAL</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              Engineering Terminal &amp;{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] bg-clip-text text-transparent">
                Developer Workspace.
              </span>
            </h2>

            <p className="text-[#A7B4C7] text-sm sm:text-base leading-relaxed">
              Explore my engineering projects, categorized skills, university records, and coding profiles via an interactive command-line environment.
            </p>
          </motion.div>

          {/* Quick feature tags */}
          <div className="flex items-center gap-3 font-mono text-xs text-[#64748B] flex-wrap">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B1220] border border-[rgba(148,163,184,0.12)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Sandboxed Engine</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B1220] border border-[rgba(148,163,184,0.12)]">
              <Zap className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Instant CLI Autocomplete</span>
            </span>
          </div>
        </div>

        {/* Embedded Terminal Window Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl mx-auto"
        >
          <TerminalWindow
            isModal={false}
            isExpanded={isExpanded}
            onToggleExpand={() => {
              if (onOpenFullModal) {
                onOpenFullModal();
              } else {
                setIsExpanded(!isExpanded);
              }
            }}
            onOpenProjectModal={onOpenProjectModal}
          />
        </motion.div>
      </div>
    </section>
  );
}
