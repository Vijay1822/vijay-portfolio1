"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalWindow } from "./terminal-window";
import { Project } from "@/lib/data";

interface TerminalModalProps {
  isOpen: boolean;
  isExpanded: boolean;
  onClose: () => void;
  onToggleExpand: () => void;
  onOpenProjectModal?: (project: Project) => void;
  onAskChatbot?: (question: string) => void;
}

export function TerminalModal({
  isOpen,
  isExpanded,
  onClose,
  onToggleExpand,
  onOpenProjectModal,
  onAskChatbot,
}: TerminalModalProps) {
  // Close on Escape if pressed when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 pointer-events-none">
          {/* Subtle dark backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#070B14]/80 backdrop-blur-md pointer-events-auto"
            aria-hidden="true"
          />

          {/* Terminal Window Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative pointer-events-auto z-10 w-full flex items-center justify-center"
          >
            <TerminalWindow
              isModal={true}
              isExpanded={isExpanded}
              onClose={onClose}
              onMinimize={onClose}
              onToggleExpand={onToggleExpand}
              onOpenProjectModal={onOpenProjectModal}
              onAskChatbot={onAskChatbot}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
