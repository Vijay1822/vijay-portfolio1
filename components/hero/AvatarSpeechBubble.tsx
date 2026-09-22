"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, FolderGit2, Cpu, Bot } from "lucide-react";

interface AvatarSpeechBubbleProps {
  isVisible: boolean;
  heading: string;
  line1: string;
  line2: string;
  isTyping: boolean;
  showQuickActions: boolean;
  onCloseBubble: () => void;
  onOpenAssistant?: () => void;
}

export function AvatarSpeechBubble({
  isVisible,
  heading,
  line1,
  line2,
  isTyping,
  showQuickActions,
  onCloseBubble,
  onOpenAssistant,
}: AvatarSpeechBubbleProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-3 sm:top-2 right-2 sm:right-6 max-w-[270px] sm:max-w-[320px] z-30 p-4 sm:p-4.5 rounded-2xl glass-panel shadow-glass border border-blue-200/90 bg-white/95 backdrop-blur-md select-none"
        >
          {/* Subtle speech-bubble pointer toward character */}
          <div className="absolute -bottom-2 left-10 w-4 h-4 bg-white/95 border-r border-b border-blue-200/90 rotate-45" />

          {/* Header Row */}
          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">Vijay</span>
              <span className="text-[10px] text-blue-600 font-mono bg-blue-50 px-1.5 py-0.5 rounded">
                AI Engineer
              </span>
            </div>
          </div>

          {/* Typography Content */}
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 leading-snug">
              {heading}
            </h4>
            {line1 && (
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {line1}
              </p>
            )}
            {line2 && (
              <p className="text-xs text-blue-600 font-semibold leading-relaxed">
                {line2}
                {isTyping && <span className="inline-block w-1.5 h-3.5 bg-blue-600 ml-0.5 animate-pulse" />}
              </p>
            )}
          </div>

          {/* Quick Action Buttons (Section 18) */}
          {showQuickActions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-1.5"
            >
              <a
                href="#about"
                onClick={onCloseBubble}
                className="px-2 py-1.5 rounded-lg text-[11px] font-medium bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 flex items-center gap-1.5 transition-colors"
              >
                <UserCheck className="w-3 h-3 text-blue-600" />
                <span>About Me</span>
              </a>

              <a
                href="#projects"
                onClick={onCloseBubble}
                className="px-2 py-1.5 rounded-lg text-[11px] font-medium bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 flex items-center gap-1.5 transition-colors"
              >
                <FolderGit2 className="w-3 h-3 text-blue-600" />
                <span>Projects</span>
              </a>

              <a
                href="#skills"
                onClick={onCloseBubble}
                className="px-2 py-1.5 rounded-lg text-[11px] font-medium bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 flex items-center gap-1.5 transition-colors"
              >
                <Cpu className="w-3 h-3 text-indigo-600" />
                <span>Skills</span>
              </a>

              <button
                onClick={() => {
                  onCloseBubble();
                  onOpenAssistant?.();
                }}
                className="px-2 py-1.5 rounded-lg text-[11px] font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center gap-1.5 shadow-xs hover:shadow-sm transition-all"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask Vijay AI</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
