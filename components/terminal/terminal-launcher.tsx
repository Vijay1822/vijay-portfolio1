"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Sparkles, X } from "lucide-react";

interface TerminalLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function TerminalLauncher({ isOpen, onToggle }: TerminalLauncherProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative flex items-center group"
        >
          {/* Main Floating Terminal Trigger Button */}
          <button
            type="button"
            onClick={onToggle}
            className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0B1220]/95 backdrop-blur-xl border border-[rgba(34,211,238,0.35)] hover:border-[#22D3EE] text-[#F8FAFC] shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
            aria-label={isOpen ? "Close Engineering Terminal" : "Open Engineering Terminal"}
            title="Open Interactive Engineering Terminal"
          >
            {/* Ambient Halo */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] opacity-20 blur-sm group-hover:opacity-40 transition duration-500" />

            {/* Terminal Icon with Pulse Dot */}
            <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[#070B14] border border-[#22D3EE]/40 text-[#22D3EE] shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              <Terminal className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#34D399] animate-pulse ring-1 ring-[#0B1220]" />
            </div>

            {/* Label */}
            <div className="flex flex-col text-left pr-1 font-mono">
              <span className="text-xs font-bold text-[#F8FAFC] flex items-center gap-1.5 leading-tight">
                <span>Try Terminal</span>
                <span className="text-[10px] text-[#34D399] font-normal">[v2.4]</span>
              </span>
              <span className="text-[9px] text-[#A7B4C7] leading-none mt-0.5">
                Developer CLI
              </span>
            </div>
          </button>

          {/* Subtle Dismiss Dot if user wants to hide */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity ml-1.5 p-1 rounded-full bg-[#121C2D] text-[#64748B] hover:text-[#FB7185] hover:bg-[#172338] border border-[rgba(148,163,184,0.15)] text-[10px]"
            title="Dismiss launcher"
            aria-label="Dismiss Terminal Launcher"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
