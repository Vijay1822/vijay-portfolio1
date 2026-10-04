"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, FolderGit2, Cpu, Bot, Minus, Plus, X } from "lucide-react";

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
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute -top-3 sm:top-2 right-2 sm:right-6 z-30 transition-all duration-300 rounded-2xl bg-slate-900/95 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] border border-cyan-500/40 select-none ${
            isMinimized
              ? "p-2.5 sm:p-3 max-w-[220px]"
              : "p-4 sm:p-4.5 max-w-[270px] sm:max-w-[320px]"
          }`}
        >
          {/* Speech-bubble pointer toward character */}
          <div className="absolute -bottom-2 left-10 w-4 h-4 bg-slate-900/95 border-r border-b border-cyan-500/40 rotate-45" />

          {/* Header Row with Title & Controls [—] [×] */}
          <div
            className={`flex items-center justify-between gap-2 ${
              isMinimized ? "" : "mb-2 pb-1.5 border-b border-slate-800"
            }`}
          >
            <div
              className="flex items-center gap-1.5 cursor-pointer"
              onClick={() => isMinimized && setIsMinimized(false)}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34D399]" />
              <span className="text-xs font-bold text-white">Vijay</span>
              <span className="text-[10px] text-cyan-300 font-mono bg-cyan-950/80 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                AI Engineer
              </span>
            </div>

            {/* Window Controls: Minimize [—] and Close [×] */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-all border border-slate-700/60"
                title={isMinimized ? "Expand Speech Bubble" : "Minimize Speech Bubble"}
                aria-label={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <Plus className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseBubble();
                }}
                className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-300 hover:bg-rose-500/20 transition-all border border-slate-700/60 hover:border-rose-500/40"
                title="Close"
                aria-label="Close"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Expanded Content */}
          {!isMinimized && (
            <>
              {/* Typography Content */}
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#F8FAFC] leading-snug">
                  {heading}
                </h4>
                {line1 && (
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {line1}
                  </p>
                )}
                {line2 && (
                  <p className="text-xs text-cyan-400 font-semibold leading-relaxed">
                    {line2}
                    {isTyping && (
                      <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-0.5 animate-pulse" />
                    )}
                  </p>
                )}
              </div>

              {/* Quick Action Buttons */}
              {showQuickActions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 pt-2.5 border-t border-slate-800 grid grid-cols-2 gap-1.5"
                >
                  <Link
                    href="/about"
                    onClick={onCloseBubble}
                    className="px-2 py-1.5 rounded-lg text-[11px] font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-cyan-300 border border-slate-700/60 flex items-center gap-1.5 transition-colors"
                  >
                    <UserCheck className="w-3 h-3 text-cyan-400" />
                    <span>About Me</span>
                  </Link>

                  <Link
                    href="/projects"
                    onClick={onCloseBubble}
                    className="px-2 py-1.5 rounded-lg text-[11px] font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-cyan-300 border border-slate-700/60 flex items-center gap-1.5 transition-colors"
                  >
                    <FolderGit2 className="w-3 h-3 text-cyan-400" />
                    <span>Projects</span>
                  </Link>

                  <Link
                    href="/skills"
                    onClick={onCloseBubble}
                    className="px-2 py-1.5 rounded-lg text-[11px] font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-amber-300 border border-slate-700/60 flex items-center gap-1.5 transition-colors"
                  >
                    <Cpu className="w-3 h-3 text-amber-400" />
                    <span>Skills</span>
                  </Link>

                  <button
                    onClick={() => {
                      onCloseBubble();
                      onOpenAssistant?.();
                    }}
                    className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Ask AI</span>
                  </button>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
