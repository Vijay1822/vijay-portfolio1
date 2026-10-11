"use client";

import { motion } from "framer-motion";
import { X, Terminal, ArrowRight, Sparkles } from "lucide-react";
import { COMMAND_REGISTRY } from "./command-registry";
import { CommandDefinition } from "./types";

interface CommandExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCommand: (command: string) => void;
}

export function CommandExplorer({
  isOpen,
  onClose,
  onSelectCommand,
}: CommandExplorerProps) {
  if (!isOpen) return null;

  // Group commands by category
  const categories = {
    Navigation: COMMAND_REGISTRY.filter((c) => c.category === "Navigation"),
    "Professional Profiles": COMMAND_REGISTRY.filter((c) => c.category === "Professional"),
    "Skills & Work": COMMAND_REGISTRY.filter((c) => c.category === "Skills & Work"),
    Utilities: COMMAND_REGISTRY.filter((c) => c.category === "Utilities"),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className="absolute top-12 left-2 right-2 sm:left-4 sm:right-4 z-30 max-h-[75%] overflow-y-auto bg-[#0B1220]/98 backdrop-blur-xl border border-[rgba(34,211,238,0.35)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-4 sm:p-5 text-[#F8FAFC]"
    >
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(148,163,184,0.12)]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#22D3EE]" />
          <h3 className="font-bold text-xs sm:text-sm font-mono text-[#F8FAFC]">
            COMMAND EXPLORER DIRECTORY
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#121C2D] text-[#22D3EE] border border-[#22D3EE]/25">
            {COMMAND_REGISTRY.length} Available
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#A7B4C7] hover:text-white hover:bg-[#172338] transition-colors"
          aria-label="Close Command Explorer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 font-mono">
        {Object.entries(categories).map(([categoryName, items]) => (
          <div
            key={categoryName}
            className="p-3 rounded-xl bg-[#070B14] border border-[rgba(148,163,184,0.12)] space-y-2"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F59E0B] block">
              {categoryName}
            </span>
            <div className="space-y-1">
              {items.map((cmd) => (
                <button
                  key={cmd.name}
                  onClick={() => {
                    onSelectCommand(cmd.name);
                    onClose();
                  }}
                  className="w-full text-left p-1.5 rounded-lg hover:bg-[#121C2D] transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#22D3EE] group-hover:underline">
                      {cmd.name}
                    </span>
                    <span className="text-[11px] text-[#A7B4C7] line-clamp-1">
                      {cmd.description}
                    </span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#64748B] group-hover:text-[#22D3EE] group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-[rgba(148,163,184,0.12)] flex items-center justify-between text-[11px] text-[#64748B] font-mono">
        <span>Click any command to execute immediately</span>
        <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#121C2D] text-[#A7B4C7] border border-[rgba(148,163,184,0.12)]">Esc</kbd> to close</span>
      </div>
    </motion.div>
  );
}
