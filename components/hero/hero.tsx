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
            {/* Status Pill Badge with Pulsing Green/Cyan Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-900/80 border border-cyan-500/30 text-cyan-300 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
              </div>
              <span className="font-semibold text-emerald-300">Open for Opportunities</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">AI Engineer & CSE-IoT</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight text-[#F8FAFC] leading-[1.08] mb-4">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Tagline / Subheading */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-300 leading-snug mb-5">
              AI Engineer & Full-Stack Developer
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl mb-8 font-normal">
              Building intelligent systems, AI agents, and scalable full-stack applications. Pursuing{" "}
              <span className="text-[#F8FAFC] font-semibold">{PERSONAL_INFO.degree}</span> in{" "}
              <span className="text-cyan-300 font-semibold">{PERSONAL_INFO.branch}</span> at{" "}
              <span className="text-amber-300 font-semibold">{PERSONAL_INFO.college}</span> (Class of {PERSONAL_INFO.graduationYear}).
            </p>

            {/* Clean Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              {/* Primary CTA: View Projects */}
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.65)] hover:-translate-y-0.5 transition-all duration-200 group w-full sm:w-auto"
              >
                <FolderGit2 className="w-4 h-4 stroke-[2.5]" />
                <span>View Projects</span>
              </Link>

              {/* Secondary CTA: Let's Connect */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 hover:text-white border border-slate-700/80 hover:border-slate-600 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto backdrop-blur-md"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </div>

            {/* Social & Contact Direct Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 w-full">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Find me on:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all"
                  aria-label="Vijay Kumar on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all"
                  aria-label="Vijay Kumar on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.social.email}`}
                  className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all"
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
