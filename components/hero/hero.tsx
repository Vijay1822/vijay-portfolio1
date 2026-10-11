"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  FolderGit2,
  FileText,
  Bot,
  Terminal,
  Mail,
  Github,
  Linkedin,
  Activity,
  Sparkles,
} from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { BackgroundMesh } from "./background-mesh";
import { HeroRoleRotator } from "./hero-role-rotator";
import { DeveloperAvatar } from "./DeveloperAvatar";
import { StarBorder } from "@/components/ui/star-border";
import { Magnetic } from "@/components/ui/magnetic-button";

interface HeroProps {
  onOpenAssistant?: () => void;
}

export function Hero({ onOpenAssistant }: HeroProps) {
  const handleOpenAssistant = () => {
    if (onOpenAssistant) {
      onOpenAssistant();
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-ai-assistant"));
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center pt-6 sm:pt-10 pb-20 sm:pb-28 overflow-hidden"
    >
      {/* Background Command Center Matrix & Cyber Grid */}
      <BackgroundMesh />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Introduction & AI Engineering Command Center Identity (~56%) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* 1. Professional Availability Badge with Pulsing Emerald Signal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08, duration: 0.45 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#0B1220]/90 border border-[rgba(56,217,232,0.22)] text-[#22D3EE] mb-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping opacity-60" />
                <span className="absolute w-2 h-2 rounded-full bg-[#34D399]" />
              </div>
              <span className="font-semibold text-[#34D399]">Open for Opportunities</span>
              <span className="text-[#475569]">•</span>
              <span className="text-[#A8B8CC]">AI Engineer &amp; CSE-IoT</span>
            </motion.div>

            {/* 2. Editorial Hierarchy Name Heading */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mb-2"
            >
              <span className="block text-xl sm:text-2xl md:text-3xl font-medium text-[#A8B8CC] tracking-tight mb-1">
                Hi, I&apos;m
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[62px] font-extrabold tracking-tight text-[#F5F7FA] leading-[1.08]">
                <span className="bg-gradient-to-r from-[#22D3EE] via-[#38D9E8] to-[#3B82F6] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(34,211,238,0.22)]">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
            </motion.div>

            {/* 3. Smooth Vertical Sliding Animated Role */}
            <HeroRoleRotator />

            {/* 4. Strong One-Line Engineering Statement */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl font-semibold text-[#F5F7FA] tracking-tight mb-2.5"
            >
              Building intelligent systems that solve real-world problems.
            </motion.h2>

            {/* 5. Concise Supporting Profile Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-[#A8B8CC] leading-relaxed max-w-xl mb-5 font-normal"
            >
              I&apos;m an AI Engineer and Full-Stack Developer focused on building intelligent applications,
              AI agents, and scalable software solutions. Currently pursuing{" "}
              <span className="text-[#F5F7FA] font-medium">B.Tech in Computer Science &amp; Engineering (IoT)</span> at{" "}
              <span className="text-[#22D3EE] font-medium">{PERSONAL_INFO.college}</span>, Class of {PERSONAL_INFO.graduationYear}.
            </motion.p>

            {/* 6. Command Center Telemetry Bar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="inline-flex flex-wrap items-center gap-3 px-3.5 py-1.5 rounded-xl bg-[#0B1220]/75 border border-[rgba(56,217,232,0.18)] mb-7 shadow-[0_4px_16px_rgba(0,0,0,0.25)] backdrop-blur-md font-mono text-[11px] text-[#A8B8CC]"
            >
              <div className="flex items-center gap-1.5 text-[#34D399]">
                <Activity className="w-3 h-3 text-[#34D399] animate-pulse" />
                <span className="font-semibold">SYS::OPERATIONAL</span>
              </div>
              <span className="text-[#475569] hidden sm:inline">•</span>
              <span className="text-[#22D3EE]">CORE: AI AGENTS • RAG • IOT</span>
              <span className="text-[#475569] hidden sm:inline">•</span>
              <span className="text-[#94A3B8]">LOC: HYDERABAD, IN</span>
            </motion.div>

            {/* 7. Premium Action CTAs (Explore Projects • View Resume • Ask AI) */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-7">
              {/* Primary CTA: Explore Projects (With Selective Star Border & Magnetic) */}
              <Magnetic maxDisplacement={3} className="w-full sm:w-auto">
                <StarBorder className="rounded-xl inline-block w-full sm:w-auto">
                  <Link
                    href="/projects"
                    prefetch={true}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#38D9E8] active:scale-95 shadow-[0_10px_30px_rgba(34,211,238,0.22)] cta-tactile group w-full sm:w-auto transition-all"
                  >
                    <FolderGit2 className="w-4 h-4 stroke-[2.5]" />
                    <span>Explore Projects</span>
                  </Link>
                </StarBorder>
              </Magnetic>

              {/* Secondary CTA: View Resume */}
              <Magnetic maxDisplacement={3} className="w-full sm:w-auto">
                <Link
                  href="/resume"
                  prefetch={true}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-[#F5F7FA] bg-[#0B1220]/80 hover:bg-[#121C2D] active:scale-95 border border-[rgba(56,217,232,0.35)] hover:border-[#22D3EE] shadow-[0_4px_20px_rgba(0,0,0,0.2)] cta-tactile group w-full sm:w-auto backdrop-blur-md transition-all"
                >
                  <FileText className="w-4 h-4 text-[#22D3EE]" />
                  <span>View Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#A8B8CC] group-hover:text-[#22D3EE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Magnetic>

              {/* Tertiary Action: Ask My AI (Opens existing portfolio assistant) */}
              <button
                type="button"
                onClick={handleOpenAssistant}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs font-semibold text-[#22D3EE] bg-[#0B1220]/50 hover:bg-[#0E1726] active:scale-95 border border-[rgba(56,217,232,0.2)] hover:border-[#22D3EE]/60 shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-all group w-full sm:w-auto backdrop-blur-md"
                title="Ask Vijay AI Portfolio Assistant"
              >
                <Bot className="w-4 h-4 text-[#22D3EE] group-hover:rotate-12 transition-transform" />
                <span>Ask My AI</span>
                <Sparkles className="w-3 h-3 text-[#38D9E8]" />
              </button>
            </div>

            {/* 8. Technical Identity & Direct Social Links */}
            <div className="flex items-center gap-4 pt-3.5 border-t border-[rgba(56,217,232,0.18)] w-full max-w-md">
              <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#22D3EE]" />
                Connect:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#A8B8CC] hover:text-[#22D3EE] hover:bg-[#0B1220] border border-transparent hover:border-[rgba(56,217,232,0.3)] transition-all focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/40"
                  aria-label="Vijay Kumar on GitHub"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#A8B8CC] hover:text-[#22D3EE] hover:bg-[#0B1220] border border-transparent hover:border-[rgba(56,217,232,0.3)] transition-all focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/40"
                  aria-label="Vijay Kumar on LinkedIn"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.social.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#A8B8CC] hover:text-[#F59E0B] hover:bg-[#0B1220] border border-transparent hover:border-[rgba(245,158,11,0.3)] transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                  aria-label="Vijay Kumar on LeetCode"
                  title="LeetCode Profile (@Vijay_kumar2008)"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.social.email}`}
                  className="p-2 rounded-lg text-[#A8B8CC] hover:text-[#FBBF24] hover:bg-[#0B1220] border border-transparent hover:border-[rgba(245,158,11,0.3)] transition-all focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                  aria-label="Email Vijay Kumar"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: AI Engineer Command Center — Interactive Digital Twin (~44%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative w-full"
          >
            <DeveloperAvatar onOpenAssistant={handleOpenAssistant} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
