"use client";

import { useState, useEffect, ReactNode } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { PageTransition } from "./page-transition";


const CustomCursor = dynamic(
  () => import("@/components/ui/custom-cursor").then((mod) => mod.CustomCursor),
  { ssr: false }
);

const AIAssistantModal = dynamic(
  () => import("@/components/ai-assistant/ai-assistant-modal").then((mod) => mod.AIAssistantModal),
  { ssr: false }
);

const TerminalModal = dynamic(
  () => import("@/components/terminal/terminal-modal").then((mod) => mod.TerminalModal),
  { ssr: false }
);

const TerminalLauncher = dynamic(
  () => import("@/components/terminal/terminal-launcher").then((mod) => mod.TerminalLauncher),
  { ssr: false }
);

export function ClientLayout({ children }: { children: ReactNode }) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(false);

  const [initialAssistantQuery, setInitialAssistantQuery] = useState<string | undefined>(undefined);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    const handleOpenAssistant = (e?: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      if (customEvent?.detail?.query) {
        setInitialAssistantQuery(customEvent.detail.query);
      }
      setIsAssistantOpen(true);
    };
    const handleOpenTerminal = () => setIsTerminalOpen(true);

    window.addEventListener("open-ai-assistant", handleOpenAssistant);
    window.addEventListener("open-terminal", handleOpenTerminal);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("open-ai-assistant", handleOpenAssistant);
      window.removeEventListener("open-terminal", handleOpenTerminal);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-[#070B14] text-[#F8FAFC]">
      {/* Interactive Desktop Custom Cursor (Floating Bubble) */}
      <CustomCursor />

      {/* Top Offline Notification Bar */}
      {isOffline && (
        <div
          role="status"
          aria-live="polite"
          className="bg-amber-950/90 text-amber-300 border-b border-amber-600/30 px-4 py-1.5 text-xs font-mono text-center flex items-center justify-center gap-2 z-50 sticky top-0 backdrop-blur-md"
        >
          <span>⚠️ You are currently browsing offline. Local pages and downloaded resume remain accessible.</span>
        </div>
      )}

      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Shared Route-Based Floating Navbar */}
      <Navbar
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content with Page Transition */}
      <main className="flex-1 w-full pt-20">
        <PageTransition>{children}</PageTransition>
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Floating Engineering Terminal Launcher (Bottom-Left) */}
      <TerminalLauncher
        isOpen={isTerminalOpen}
        onToggle={() => setIsTerminalOpen(!isTerminalOpen)}
      />

      {/* Engineering Terminal Workspace Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        isExpanded={isTerminalExpanded}
        onClose={() => setIsTerminalOpen(false)}
        onToggleExpand={() => setIsTerminalExpanded(!isTerminalExpanded)}
        onAskChatbot={() => setIsAssistantOpen(true)}
      />

      {/* Shared Floating Vijay AI Portfolio Assistant (Bottom-Right) */}
      <AIAssistantModal
        isOpen={isAssistantOpen}
        onToggle={() => setIsAssistantOpen(!isAssistantOpen)}
        initialQuery={initialAssistantQuery}
      />
    </div>
  );
}
