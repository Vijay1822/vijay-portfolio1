"use client";

import { useState } from "react";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Skills } from "@/components/skills/skills";
import { Projects } from "@/components/projects/projects";
import { Achievements } from "@/components/achievements/achievements";
import { Education } from "@/components/education/education";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";
import { AIAssistantModal } from "@/components/ai-assistant/ai-assistant-modal";

export default function Home() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <main className="min-h-screen relative selection:bg-blue-100 selection:text-blue-900 bg-[#FAFAFA]">
      {/* Interactive Desktop Custom Cursor */}
      <CustomCursor />

      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Glassmorphic Sticky Header */}
      <Navbar onOpenAssistant={() => setIsAssistantOpen(true)} />

      {/* Hero Section with 3D Avatar & Interactive Ambient Canvas */}
      <Hero onOpenAssistant={() => setIsAssistantOpen(true)} />

      {/* About Section: "More Than Just Code." */}
      <About />

      {/* Interactive Skills Showcase */}
      <Skills />

      {/* Featured Project Case Studies with Architecture Deep-Dive */}
      <Projects />

      {/* Journey So Far: Chronological Engineering Milestones */}
      <Achievements />

      {/* Academic Foundation: VNR VJIET CSE-IoT */}
      <Education />

      {/* Contact Section: "Let's Build Something Intelligent." */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Floating Vijay AI Portfolio Assistant */}
      <AIAssistantModal
        isOpen={isAssistantOpen}
        onToggle={() => setIsAssistantOpen(!isAssistantOpen)}
      />
    </main>
  );
}
