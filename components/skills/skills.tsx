"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  FileCode,
  Coffee,
  Braces,
  Brain,
  Sparkles,
  Workflow,
  Smile,
  Cpu,
  BarChart3,
  Layers,
  Atom,
  Palette,
  Globe,
  Move,
  Server,
  Zap,
  Radio,
  Database,
  Flame,
  HardDrive,
  Wifi,
  Activity,
  Smartphone,
  GitBranch,
  Github,
  Terminal,
  Cloud,
  UploadCloud,
  ArrowRight,
  RadioTower,
  Binary,
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/lib/data";

const ICON_MAP: Record<string, React.ElementType> = {
  FileCode,
  Coffee,
  Code2,
  Braces,
  Brain,
  Sparkles,
  Workflow,
  Smile,
  Cpu,
  BarChart3,
  Layers,
  Atom,
  Palette,
  Globe,
  Move,
  Server,
  Zap,
  Radio,
  Database,
  Flame,
  HardDrive,
  Wifi,
  Activity,
  Smartphone,
  GitBranch,
  Github,
  Terminal,
  Cloud,
  UploadCloud,
};

export function Skills() {
  const [activeFilter, setActiveFilter] = useState<"all" | "ai" | "iot" | "web" | "core">("all");

  const filterOptions = [
    { label: "All Capabilities", key: "all" as const },
    { label: "AI & Machine Learning", key: "ai" as const },
    { label: "IoT & Hardware Telemetry", key: "iot" as const },
    { label: "Full-Stack Web", key: "web" as const },
    { label: "Languages & DevOps", key: "core" as const },
  ];

  // Helper for status badges
  const getStatusBadge = (
    status: "Building With" | "Working With" | "Exploring",
    domain: "ai" | "iot" | "web" | "general"
  ) => {
    if (domain === "iot") {
      return {
        bg: "bg-[#172338] text-[#F59E0B] border-[rgba(245,158,11,0.25)]",
        dot: "bg-[#F59E0B] shadow-[0_0_6px_#F59E0B]",
      };
    }
    if (domain === "ai") {
      return {
        bg: "bg-[#0D2731] text-[#22D3EE] border-[rgba(34,211,238,0.25)]",
        dot: "bg-[#22D3EE] shadow-[0_0_6px_#22D3EE]",
      };
    }
    return {
      bg: "bg-[#172338] text-[#A7B4C7] border-[rgba(148,163,184,0.15)]",
      dot: "bg-[#3B82F6]",
    };
  };

  const aiCategory = SKILL_CATEGORIES.find((c) => c.title.includes("AI")) || SKILL_CATEGORIES[1];
  const iotCategory = SKILL_CATEGORIES.find((c) => c.title.includes("IoT")) || SKILL_CATEGORIES[5];
  const frontendCategory = SKILL_CATEGORIES.find((c) => c.title.includes("Frontend")) || SKILL_CATEGORIES[2];
  const backendCategory = SKILL_CATEGORIES.find((c) => c.title.includes("Backend")) || SKILL_CATEGORIES[3];
  const langCategory = SKILL_CATEGORIES.find((c) => c.title.includes("Languages")) || SKILL_CATEGORIES[0];
  const dbCategory = SKILL_CATEGORIES.find((c) => c.title.includes("Databases")) || SKILL_CATEGORIES[4];
  const toolsCategory = SKILL_CATEGORIES.find((c) => c.title.includes("Tools")) || SKILL_CATEGORIES[6];

  const showAi = activeFilter === "all" || activeFilter === "ai";
  const showIot = activeFilter === "all" || activeFilter === "iot";
  const showWeb = activeFilter === "all" || activeFilter === "web";
  const showCore = activeFilter === "all" || activeFilter === "core";

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0F1726] border-t border-[rgba(148,163,184,0.12)]">
      {/* Aurora Ambient Lighting Glows */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-[#22D3EE]/[0.05] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-[#3B82F6]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] mb-4 shadow-[0_0_12px_rgba(34,211,238,0.10)]"
          >
            <Cpu className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Authoritative Technical Arsenal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-4"
          >
            Skills &amp; Technical Domains
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#A7B4C7] text-sm sm:text-base leading-relaxed"
          >
            A verified catalogue of the machine learning pipelines, responsive frontend frameworks,
            backend gateways, and real-time IoT hardware protocols I build and deploy.
          </motion.p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)]">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setActiveFilter(opt.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeFilter === opt.key
                    ? "bg-[#172338] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] shadow-[0_0_12px_rgba(34,211,238,0.15)] font-semibold"
                    : "text-[#A7B4C7] hover:text-[#F8FAFC] hover:bg-[#121C2D]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: AI / Machine Learning (Featured 7 cols) */}
          {showAi && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`${
                activeFilter === "ai" ? "md:col-span-12" : "md:col-span-7"
              } glass-card p-6 sm:p-7 rounded-3xl relative overflow-hidden group hover:border-[rgba(34,211,238,0.45)] hover:shadow-[0_16px_45px_rgba(34,211,238,0.08)] flex flex-col justify-between`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#22D3EE]/[0.05] rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#0D2731] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] shadow-[0_0_12px_rgba(34,211,238,0.15)]">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors">
                        AI &amp; Machine Learning
                      </h3>
                      <p className="text-xs text-[#22D3EE]/80 font-mono">
                        Predictive Pipelines, GenAI &amp; Transformer Models
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] hidden sm:inline-block">
                    Primary Domain
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#A7B4C7] leading-relaxed mb-6 font-normal">
                  Designing end-to-end ML microservices, tabular regression models for agricultural market forecasting,
                  and autonomous AI agents with Retrieval-Augmented Generation (RAG).
                </p>

                {/* Skills badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                  {aiCategory.skills.map((skill) => {
                    const Icon = ICON_MAP[skill.iconName] || Brain;
                    const badge = getStatusBadge(skill.status, "ai");
                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ y: -3, scale: 1.02 }}
                        className="p-3 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] hover:bg-[#121C2D] transition-all flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon className="w-4 h-4 text-[#22D3EE]" />
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#F8FAFC]">{skill.name}</div>
                          <span className="text-[10px] text-[#22D3EE] font-mono">{skill.status}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Direct Project Proof-of-Work Link */}
              <div className="pt-4 border-t border-[rgba(148,163,184,0.12)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#64748B]">
                  Applied in BudgetMind RAG Agent &amp; Smart Farmer ML
                </span>
                <Link
                  href="/projects#budgetmind"
                  prefetch={true}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#22D3EE] hover:text-[#67E8F9] active:scale-95 active:opacity-90 transition-all group/link"
                >
                  <span>View Case Studies</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Card 2: IoT & Hardware Telemetry (Featured 5 cols) */}
          {showIot && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`${
                activeFilter === "iot" ? "md:col-span-12" : "md:col-span-5"
              } glass-card p-6 sm:p-7 rounded-3xl relative overflow-hidden group hover:border-[rgba(245,158,11,0.45)] hover:shadow-[0_16px_45px_rgba(245,158,11,0.08)] flex flex-col justify-between`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/[0.05] rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#172338] text-[#F59E0B] border border-[rgba(245,158,11,0.3)] shadow-[0_0_12px_rgba(245,158,11,0.15)]">
                      <RadioTower className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#F8FAFC] group-hover:text-[#F59E0B] transition-colors">
                        IoT &amp; Hardware Telemetry
                      </h3>
                      <p className="text-xs text-[#F59E0B]/80 font-mono">
                        Microcontrollers, PWM &amp; Sensor Streams
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#A7B4C7] leading-relaxed mb-6 font-normal">
                  Interfacing physical environmental sensors, tuning closed-loop duty cycles with PWM logic, and transmitting telemetry via MQTT to cloud monitors.
                </p>

                {/* Skills badges */}
                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  {iotCategory.skills.map((skill) => {
                    const Icon = ICON_MAP[skill.iconName] || Cpu;
                    const badge = getStatusBadge(skill.status, "iot");
                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ y: -3, scale: 1.02 }}
                        className="p-3 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] hover:border-[rgba(245,158,11,0.45)] hover:bg-[#121C2D] transition-all flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon className="w-4 h-4 text-[#F59E0B]" />
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#F8FAFC]">{skill.name}</div>
                          <span className="text-[10px] text-[#F59E0B] font-mono">{skill.status}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Direct Project Proof-of-Work Link */}
              <div className="pt-4 border-t border-[rgba(148,163,184,0.12)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#64748B]">
                  Applied in Closed-Loop Fan Controller
                </span>
                <Link
                  href="/projects#smart-fan-control"
                  prefetch={true}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F59E0B] hover:text-[#FBBF24] active:scale-95 active:opacity-90 transition-all group/link"
                >
                  <span>View IoT Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Card 3: Frontend Engineering (4 cols) */}
          {showWeb && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className={`${
                activeFilter === "web" ? "md:col-span-6" : "md:col-span-4"
              } glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group hover:border-[rgba(59,130,246,0.45)] flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#0D1626] text-[#3B82F6] border border-[rgba(59,130,246,0.25)]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#3B82F6] transition-colors">
                      Frontend Engineering
                    </h3>
                    <p className="text-[11px] text-[#64748B] font-mono">Accessible &amp; Reactive UIs</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {frontendCategory.skills.map((skill) => {
                    const Icon = ICON_MAP[skill.iconName] || Layers;
                    return (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#0D1626] border border-[rgba(148,163,184,0.12)] text-xs font-medium text-[#A7B4C7]"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-[#3B82F6]" />
                          <span className="text-[#F8FAFC]">{skill.name}</span>
                        </span>
                        <span className="text-[10px] text-[#64748B] font-mono">{skill.status}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-[rgba(148,163,184,0.10)] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#64748B]">Next.js 14 App Router</span>
                <Link
                  href="/projects#smart-farmer-procurement"
                  prefetch={true}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B82F6] hover:text-[#60A5FA] active:scale-95 active:opacity-90 transition-all"
                >
                  <span>See in Action</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Card 4: Backend & Systems (4 cols) */}
          {showWeb && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className={`${
                activeFilter === "web" ? "md:col-span-6" : "md:col-span-4"
              } glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group hover:border-[rgba(34,211,238,0.45)] flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)]">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors">
                      Backend &amp; Databases
                    </h3>
                    <p className="text-[11px] text-[#64748B] font-mono">REST Gateways &amp; Persistent Stores</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {[...backendCategory.skills, ...dbCategory.skills.slice(0, 3)].map((skill) => {
                    const Icon = ICON_MAP[skill.iconName] || Server;
                    return (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#0D1626] border border-[rgba(148,163,184,0.12)] text-xs font-medium text-[#A7B4C7]"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-[#22D3EE]" />
                          <span className="text-[#F8FAFC]">{skill.name}</span>
                        </span>
                        <span className="text-[10px] text-[#64748B] font-mono">{skill.status}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-[rgba(148,163,184,0.10)] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#64748B]">Node.js &amp; MongoDB/Supabase</span>
                <Link
                  href="/projects#budgetmind"
                  prefetch={true}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#22D3EE] hover:text-[#67E8F9] active:scale-95 active:opacity-90 transition-all"
                >
                  <span>See in Action</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Card 5: Languages & DevOps (4 cols) */}
          {showCore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className={`${
                activeFilter === "core" ? "md:col-span-12" : "md:col-span-4"
              } glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group hover:border-[rgba(245,158,11,0.45)] flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#0D1626] text-[#F59E0B] border border-[rgba(245,158,11,0.25)]">
                    <Binary className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#F59E0B] transition-colors">
                      Languages &amp; Tooling
                    </h3>
                    <p className="text-[11px] text-[#64748B] font-mono">Python, Java, TypeScript &amp; Git</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {[...langCategory.skills, ...toolsCategory.skills.slice(0, 4)].map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#172338] border border-[rgba(34,211,238,0.15)] text-[#67E8F9] hover:border-[rgba(34,211,238,0.45)] transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[rgba(148,163,184,0.10)] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#64748B]">Git &amp; LeetCode Problem Solving</span>
                <Link
                  href="/projects"
                  prefetch={true}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#F59E0B] hover:text-[#fbbf24] active:scale-95 active:opacity-90 transition-all"
                >
                  <span>Explore All Projects</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
