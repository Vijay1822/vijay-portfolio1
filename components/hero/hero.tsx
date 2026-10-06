"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowUpRight, FolderGit2, Sparkles, Terminal, Mail, Github, Linkedin } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { BackgroundMesh } from "./background-mesh";

const DeveloperAvatar = dynamic(
  () => import("./DeveloperAvatar").then((mod) => mod.DeveloperAvatar),
  { ssr: false }
);

interface HeroProps {
  onOpenAssistant?: () => void;
}

export function Hero({ onOpenAssistant }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      <BackgroundMesh />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Pill Badge with Pulsing Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#0D1626] border border-[rgba(148,163,184,0.12)] text-[#22D3EE] mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-md"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping opacity-60" />
                <span className="absolute w-2 h-2 rounded-full bg-[#34D399]" />
              </div>
              <span className="font-semibold text-[#34D399]">Open for Opportunities</span>
              <span className="text-[#475569]">•</span>
              <span className="text-[#A7B4C7]">AI Engineer &amp; CSE-IoT</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight text-[#F8FAFC] leading-[1.08] mb-4">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#67E8F9] to-[#3B82F6] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.18)]">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Tagline / Subheading */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#22D3EE] leading-snug mb-5">
              AI Engineer &amp; Full-Stack Developer
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-sm sm:text-base text-[#A7B4C7] leading-relaxed max-w-2xl mb-8 font-normal">
              Building intelligent systems, AI agents, and scalable full-stack applications. Pursuing{" "}
              <span className="text-[#F8FAFC] font-semibold">{PERSONAL_INFO.degree}</span> in{" "}
              <span className="text-[#22D3EE] font-semibold">{PERSONAL_INFO.branch}</span> at{" "}
              <span className="text-[#F59E0B] font-semibold">{PERSONAL_INFO.college}</span> (Class of {PERSONAL_INFO.graduationYear}).
            </p>

            {/* Clean Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              {/* Primary CTA: View Projects */}
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(34,211,238,0.18)] transition-all duration-200 group w-full sm:w-auto"
              >
                <FolderGit2 className="w-4 h-4 stroke-[2.5]" />
                <span>View Projects</span>
              </Link>

              {/* Secondary CTA: Let's Connect */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[#F8FAFC] bg-transparent hover:bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.55)] hover:border-[#22D3EE] shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-all duration-200 group w-full sm:w-auto backdrop-blur-md"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-4 h-4 text-[#22D3EE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </div>

            {/* Social & Contact Direct Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-[rgba(148,163,184,0.12)] w-full">
              <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#22D3EE]" />
                Find me on:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#A7B4C7] hover:text-[#22D3EE] hover:bg-[#121C2D] border border-transparent hover:border-[rgba(34,211,238,0.25)] transition-all"
                  aria-label="Vijay Kumar on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#A7B4C7] hover:text-[#22D3EE] hover:bg-[#121C2D] border border-transparent hover:border-[rgba(34,211,238,0.25)] transition-all"
                  aria-label="Vijay Kumar on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.social.email}`}
                  className="p-2 rounded-lg text-[#A7B4C7] hover:text-[#F59E0B] hover:bg-[#121C2D] border border-transparent hover:border-[rgba(245,158,11,0.25)] transition-all"
                  aria-label="Email Vijay Kumar"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium 3D Interactive Developer Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <DeveloperAvatar onOpenAssistant={onOpenAssistant} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
