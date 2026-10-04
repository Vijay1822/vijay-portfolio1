"use client";

import { useState, ReactNode } from "react";
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

export function ClientLayout({ children }: { children: ReactNode }) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative bg-[#0B1120] text-[#F8FAFC]">
      {/* Interactive Desktop Custom Cursor */}
      <CustomCursor />

      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Shared Route-Based Floating Navbar */}
      <Navbar onOpenAssistant={() => setIsAssistantOpen(true)} />

      {/* Main Content with Page Transition */}
      <main className="flex-1 w-full pt-20">
        <PageTransition>{children}</PageTransition>
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Shared Floating Vijay AI Portfolio Assistant */}
      <AIAssistantModal
        isOpen={isAssistantOpen}
        onToggle={() => setIsAssistantOpen(!isAssistantOpen)}
      />
    </div>
  );
}
