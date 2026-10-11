"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  GraduationCap,
  Layers,
  Milestone,
  RadioTower,
  User,
  Wrench,
} from "lucide-react";
import { Hero } from "@/components/hero/hero";
import { TerminalSection } from "@/components/terminal/terminal-section";

export default function HomePage() {
  return (
    <div className="relative">
      {/* 1. Command Center Hero Section */}
      <Hero />

      {/* 2. What I Build — Core Engineering Pillars */}
      <section className="py-20 relative bg-[#0B1220] border-t border-[rgba(148,163,184,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] mb-3 shadow-[0_0_12px_rgba(34,211,238,0.10)]">
              <Brain className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Core Specializations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              What I Build.
            </h2>
            <p className="text-[#A7B4C7] text-sm sm:text-base mt-2 leading-relaxed">
              Engineering intelligent systems across three converging domains — from predictive machine
              learning models to reactive web platforms and closed-loop hardware telemetry.
            </p>
          </div>

          {/* 3 Engineering Domain Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Domain 1: AI & Agentic Systems */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="glass-card p-6 rounded-2xl border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] transition-all flex flex-col justify-between group hover:shadow-[0_16px_45px_rgba(34,211,238,0.08)]"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-[0_0_16px_rgba(34,211,238,0.12)]">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-2 group-hover:text-[#22D3EE] transition-colors">
                  AI &amp; Agent Systems
                </h3>
                <p className="text-xs sm:text-sm text-[#A7B4C7] leading-relaxed mb-5">
                  Autonomous agents, Retrieval-Augmented Generation (RAG) pipelines, and predictive
                  machine learning models designed for contextual reasoning and decision support.
                </p>
              </div>
              <div className="pt-4 border-t border-[rgba(148,163,184,0.10)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#64748B]">BudgetMind • Scikit-Learn</span>
                <Link
                  href="/projects"
                  prefetch={true}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#22D3EE] hover:text-[#67E8F9] active:scale-95 transition-all"
                >
                  <span>Explore Case Studies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Domain 2: Full-Stack Web Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-card p-6 rounded-2xl border border-[rgba(148,163,184,0.12)] hover:border-[rgba(59,130,246,0.45)] transition-all flex flex-col justify-between group hover:shadow-[0_16px_45px_rgba(59,130,246,0.08)]"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#0D1626] text-[#3B82F6] border border-[rgba(59,130,246,0.25)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-[0_0_16px_rgba(59,130,246,0.12)]">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-2 group-hover:text-[#3B82F6] transition-colors">
                  Full-Stack Web Architecture
                </h3>
                <p className="text-xs sm:text-sm text-[#A7B4C7] leading-relaxed mb-5">
                  High-throughput, reactive web applications built with Next.js 14, Node.js gateways,
                  type-safe APIs, and tactile interactive design systems.
                </p>
              </div>
              <div className="pt-4 border-t border-[rgba(148,163,184,0.10)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#64748B]">Next.js • React • Node.js</span>
                <Link
                  href="/skills"
                  prefetch={true}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-[#60A5FA] active:scale-95 transition-all"
                >
                  <span>View Technical Stack</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Domain 3: IoT & Embedded Intelligence */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-card p-6 rounded-2xl border border-[rgba(148,163,184,0.12)] hover:border-[rgba(245,158,11,0.45)] transition-all flex flex-col justify-between group hover:shadow-[0_16px_45px_rgba(245,158,11,0.08)]"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#0D1626] text-[#F59E0B] border border-[rgba(245,158,11,0.25)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-[0_0_16px_rgba(245,158,11,0.12)]">
                  <RadioTower className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-2 group-hover:text-[#F59E0B] transition-colors">
                  IoT &amp; Embedded Telemetry
                </h3>
                <p className="text-xs sm:text-sm text-[#A7B4C7] leading-relaxed mb-5">
                  Closed-loop microcontroller systems running on NodeMCU (ESP8266/ESP32), sensor
                  interfacing, pulse-width modulation (PWM), and live cloud telemetry.
                </p>
              </div>
              <div className="pt-4 border-t border-[rgba(148,163,184,0.10)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#64748B]">NodeMCU • PWM • Blynk</span>
                <Link
                  href="/projects"
                  prefetch={true}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F59E0B] hover:text-[#FBBF24] active:scale-95 transition-all"
                >
                  <span>Explore IoT Systems</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Interactive CLI Terminal Section (Visible on First Page) */}
      <TerminalSection />

      {/* 4. Engineering Platform Discovery Hub (Where to Explore Next) */}
      <section className="py-20 relative bg-[#0F1726] border-t border-[rgba(148,163,184,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] mb-3 shadow-[0_0_12px_rgba(34,211,238,0.10)] font-mono">
              <CompassIcon className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>PLATFORM DIRECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              Explore the Platform.
            </h2>
            <p className="text-[#A7B4C7] text-sm sm:text-base mt-2 leading-relaxed">
              Every section of this engineering platform serves a dedicated purpose. Navigate directly
              to review in-depth case studies, categorized toolchains, academic records, or timeline milestones.
            </p>
          </div>

          {/* 4 Dedicated Domain Router Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Router Card 1: About */}
            <Link
              href="/about"
              prefetch={true}
              className="glass-card p-6 rounded-2xl border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] active:scale-[0.98] transition-all flex flex-col justify-between group hover:shadow-[0_16px_45px_rgba(34,211,238,0.08)]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors mb-1.5">
                  About Vijay
                </h3>
                <p className="text-xs text-[#A7B4C7] leading-relaxed">
                  Engineering mindset, problem-solving heuristics, learning principles, and the background behind the code.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[rgba(148,163,184,0.10)] flex items-center gap-1.5 text-xs font-semibold text-[#22D3EE]">
                <span>Read Philosophy</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Router Card 2: Skills */}
            <Link
              href="/skills"
              prefetch={true}
              className="glass-card p-6 rounded-2xl border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] active:scale-[0.98] transition-all flex flex-col justify-between group hover:shadow-[0_16px_45px_rgba(34,211,238,0.08)]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors mb-1.5">
                  Technical Skills
                </h3>
                <p className="text-xs text-[#A7B4C7] leading-relaxed">
                  Full categorized breakdown of languages, ML frameworks, web stacks, databases, and IoT toolchains.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[rgba(148,163,184,0.10)] flex items-center gap-1.5 text-xs font-semibold text-[#22D3EE]">
                <span>View All 7 Domains</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Router Card 3: Journey */}
            <Link
              href="/journey"
              prefetch={true}
              className="glass-card p-6 rounded-2xl border border-[rgba(148,163,184,0.12)] hover:border-[rgba(245,158,11,0.45)] active:scale-[0.98] transition-all flex flex-col justify-between group hover:shadow-[0_16px_45px_rgba(245,158,11,0.08)]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0D1626] text-[#F59E0B] border border-[rgba(245,158,11,0.25)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Milestone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#F59E0B] transition-colors mb-1.5">
                  Journey &amp; Milestones
                </h3>
                <p className="text-xs text-[#A7B4C7] leading-relaxed">
                  Chronological timeline of national hackathons (SIH, Adobe), certifications, and IoT prototyping.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[rgba(148,163,184,0.10)] flex items-center gap-1.5 text-xs font-semibold text-[#F59E0B]">
                <span>View Timeline</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Router Card 4: Education */}
            <Link
              href="/education"
              prefetch={true}
              className="glass-card p-6 rounded-2xl border border-[rgba(148,163,184,0.12)] hover:border-[rgba(52,211,153,0.45)] active:scale-[0.98] transition-all flex flex-col justify-between group hover:shadow-[0_16px_45px_rgba(52,211,153,0.08)]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0D1626] text-[#34D399] border border-[rgba(52,211,153,0.25)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#34D399] transition-colors mb-1.5">
                  Academic Foundation
                </h3>
                <p className="text-xs text-[#A7B4C7] leading-relaxed">
                  VNR VJIET B.Tech CSE (IoT) degree, 9.45 CGPA, laboratory coursework, and institutional details.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[rgba(148,163,184,0.10)] flex items-center gap-1.5 text-xs font-semibold text-[#34D399]">
                <span>View Academics</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
