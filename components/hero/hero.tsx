"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Sparkles, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { DeveloperAvatar } from "./DeveloperAvatar";
import { BackgroundMesh } from "./background-mesh";

interface HeroProps {
  onOpenAssistant?: () => void;
}

export function Hero({ onOpenAssistant }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      <BackgroundMesh />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Engineering Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-blue-50/90 text-blue-700 border border-blue-200/80 mb-6 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>AI Engineer • Full-Stack Developer • CSE-IoT</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-4">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Tagline */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-slate-700 leading-snug mb-5">
              {PERSONAL_INFO.tagline}
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mb-8 font-normal">
              Pursuing <span className="text-slate-900 font-semibold">{PERSONAL_INFO.degree}</span> in{" "}
              <span className="text-slate-900 font-semibold">{PERSONAL_INFO.branch}</span> at{" "}
              <span className="text-slate-900 font-semibold">{PERSONAL_INFO.college}</span> (Class of {PERSONAL_INFO.graduationYear}). I design and build modern software where machine learning pipelines, responsive full-stack web applications, and sensor-driven IoT hardware converge to solve genuine problems.
            </p>

            {/* CTAs & Secondary Links */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200 group w-full sm:w-auto"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all duration-200 w-full sm:w-auto"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            {/* Social & Contact Direct Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-200/60 w-full">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
                Find me on:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors"
                  aria-label="Vijay Kumar on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-colors"
                  aria-label="Vijay Kumar on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.social.email}`}
                  className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/80 transition-colors"
                  aria-label="Email Vijay Kumar"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium 3D Developer Avatar */}
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
