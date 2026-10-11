"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  Globe,
  Rocket,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Code2,
  Compass,
  Lightbulb,
  Workflow,
  Zap,
} from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export function About() {
  const engineeringPrinciples = [
    {
      icon: Workflow,
      title: "System Decomposition",
      description:
        "Breaking complex domains into isolated layers: deterministic API contracts, asynchronous queue workers, and modular telemetry loops before writing code.",
    },
    {
      icon: Zap,
      title: "Closed-Loop Feedback",
      description:
        "Software should not run blind. Whether monitoring PWM fan speeds or tracking LLM token latencies, real-world metrics dictate system optimization.",
    },
    {
      icon: Lightbulb,
      title: "Rapid Empirical Prototyping",
      description:
        "Ideas are cheap; validated software is rare. Hackathon sprints and rapid PoC cycles test assumptions against production environments immediately.",
    },
    {
      icon: ShieldCheck,
      title: "Resilience & Craftsmanship",
      description:
        "Writing clean, type-safe, and self-documenting code that stands up to unstable network conditions, unexpected payloads, and edge deployment constraints.",
    },
  ];

  const focusProblems = [
    {
      title: "Autonomous Decision Agents",
      detail:
        "Building intelligent agents equipped with semantic vector memory and tool calling to automate complex financial analysis and operational procurement.",
    },
    {
      title: "Direct-Trade Agricultural Tech",
      detail:
        "Connecting smallholder farmers directly to wholesale markets via machine learning price corridors to eliminate exploitative intermediaries.",
    },
    {
      title: "Closed-Loop Climate Automation",
      detail:
        "Interfacing low-power microcontrollers (ESP8266/ESP32) with environmental sensors to dynamically cut electrical consumption in domestic and industrial spaces.",
    },
  ];

  return (
    <section id="about" className="py-24 relative bg-[#0B1220] border-t border-[rgba(148,163,184,0.12)]">
      {/* Subtle Ambient Radial Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#22D3EE]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#3B82F6]/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] mb-4 shadow-[0_0_12px_rgba(34,211,238,0.10)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Philosophy &amp; Engineering Identity</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-4"
          >
            The Person Behind the Systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#A7B4C7] text-sm sm:text-base leading-relaxed"
          >
            Engineering is not merely writing lines of syntax. It is the disciplined craft of creating
            resilient, usable systems that interface intelligently with human needs and physical environments.
          </motion.p>
        </div>

        {/* Narrative & Focus Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Narrative Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)]"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#22D3EE]/[0.05] blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] shadow-[0_0_12px_rgba(34,211,238,0.15)]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-[#F8FAFC] text-lg">B.Tech in CSE-IoT Foundation</h2>
                <p className="text-xs text-[#A7B4C7] font-mono">
                  {PERSONAL_INFO.collegeFullName} • Bachupally, Hyderabad
                </p>
              </div>
            </div>

            <div className="space-y-4 text-[#A7B4C7] text-sm leading-relaxed font-normal">
              {PERSONAL_INFO.aboutParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Why AI & Software Engineering */}
            <div className="mt-8 pt-6 border-t border-[rgba(148,163,184,0.12)]">
              <h3 className="text-sm font-bold text-[#F8FAFC] mb-2 uppercase tracking-wider font-mono text-[#22D3EE]">
                Why AI &amp; Software Engineering?
              </h3>
              <p className="text-xs sm:text-sm text-[#A7B4C7] leading-relaxed">
                Traditional software executes static logic. What excites me about artificial intelligence
                is its capacity to reason under uncertainty, summarize complex multidimensional data, and
                adapt to human context. By uniting AI with full-stack web platforms and physical IoT sensors,
                software transforms from an isolated screen into an active participant in everyday life.
              </p>
            </div>

            {/* Contextual Subpage Links */}
            <div className="mt-8 pt-6 border-t border-[rgba(148,163,184,0.12)] flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                prefetch={true}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#22D3EE] bg-[#0D1626] hover:bg-[#121C2D] border border-[rgba(34,211,238,0.3)] hover:border-[#22D3EE] active:scale-95 active:opacity-90 transition-all group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/skills"
                prefetch={true}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#F8FAFC] bg-[#0D1626] hover:bg-[#121C2D] border border-[rgba(148,163,184,0.15)] hover:border-[rgba(34,211,238,0.45)] active:scale-95 active:opacity-90 transition-all group"
              >
                <span>Check Technical Arsenal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/education"
                prefetch={true}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#34D399] bg-[#0D1626] hover:bg-[#121C2D] border border-[#34D399]/30 hover:border-[#34D399] active:scale-95 active:opacity-90 transition-all group"
              >
                <span>Academic Credentials</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Engineering Pillars & Focus (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * idx }}
                  className="glass-card p-5 rounded-2xl flex flex-col justify-between border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] transition-all"
                >
                  <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider block mb-1">
                    {stat.label}
                  </span>
                  <div className="text-2xl font-extrabold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors">
                    {stat.value}
                  </div>
                  <p className="text-xs text-[#A7B4C7] mt-1 font-medium">{stat.detail}</p>
                </motion.div>
              ))}
            </div>

            {/* Target Problems I Want to Solve */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-3xl border border-[rgba(148,163,184,0.12)] space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider">
                <Compass className="w-4 h-4 text-[#F59E0B]" />
                <span>Target Problems I Seek to Solve</span>
              </div>

              <div className="space-y-3.5">
                {focusProblems.map((p, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.08)]">
                    <h3 className="text-xs font-bold text-[#F8FAFC] mb-1">{p.title}</h3>
                    <p className="text-xs text-[#A7B4C7] leading-relaxed">{p.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Problem-Solving Principles Grid */}
        <div className="mt-16">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
              How I Approach Problem-Solving.
            </h2>
            <p className="text-xs sm:text-sm text-[#A7B4C7] mt-1.5 leading-relaxed">
              Core heuristics and technical methodologies applied across every software project, hackathon sprint, and hardware build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringPrinciples.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * idx }}
                  className="glass-card p-6 rounded-2xl border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] flex items-center justify-center mb-4 shadow-[0_0_12px_rgba(34,211,238,0.12)]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#F8FAFC] mb-2">{item.title}</h3>
                    <p className="text-xs text-[#A7B4C7] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
