"use client";

import { useState } from "react";
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
  CheckCircle2,
  Clock,
  Compass,
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
    { label: "All Capabilities", key: "all" },
    { label: "AI & Machine Learning", key: "ai" },
    { label: "IoT & Hardware Telemetry", key: "iot" },
    { label: "Full-Stack Web", key: "web" },
    { label: "Languages & DevOps", key: "core" },
  ];

  // Helper for status badges
  const getStatusBadge = (status: "Building With" | "Working With" | "Exploring", domain: "ai" | "iot" | "web" | "general") => {
    if (domain === "iot") {
      return {
        bg: "bg-amber-950/70 text-amber-300 border-amber-500/30",
        dot: "bg-amber-400 shadow-[0_0_6px_#F59E0B]",
      };
    }
    if (domain === "ai") {
      return {
        bg: "bg-cyan-950/70 text-cyan-300 border-cyan-500/30",
        dot: "bg-cyan-400 shadow-[0_0_6px_#06B6D4]",
      };
    }
    return {
      bg: "bg-slate-800/80 text-slate-300 border-slate-700/60",
      dot: "bg-sky-400",
    };
  };

  const aiCategory = SKILL_CATEGORIES.find((c) => c.title.includes("AI")) || SKILL_CATEGORIES[1];
  const iotCategory = SKILL_CATEGORIES.find((c) => c.title.includes("IoT")) || SKILL_CATEGORIES[5];
  const frontendCategory = SKILL_CATEGORIES.find((c) => c.title.includes("Frontend")) || SKILL_CATEGORIES[2];
  const backendCategory = SKILL_CATEGORIES.find((c) => c.title.includes("Backend")) || SKILL_CATEGORIES[3];
  const langCategory = SKILL_CATEGORIES.find((c) => c.title.includes("Languages")) || SKILL_CATEGORIES[0];
  const dbCategory = SKILL_CATEGORIES.find((c) => c.title.includes("Databases")) || SKILL_CATEGORIES[4];
  const toolsCategory = SKILL_CATEGORIES.find((c) => c.title.includes("Tools")) || SKILL_CATEGORIES[6];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0B1120] border-t border-slate-800/80">
      {/* Aurora Ambient Lighting Glows */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-4"
          >
            Skills & Technical Domains
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#94A3B8] text-sm sm:text-base leading-relaxed"
          >
            An asymmetrical view of the machine learning pipelines, responsive frontend frameworks,
            and real-time IoT hardware protocols I build and deploy.
          </motion.p>

          {/* Status Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#06B6D4]" />
              <span className="text-cyan-200">Electric Cyan:</span> AI & Software
            </span>
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
              <span className="text-amber-200">Solar Amber:</span> Hardware & Telemetry
            </span>
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="text-slate-200">Cool Slate:</span> Web & Tooling
            </span>
          </div>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: AI / Machine Learning (Featured 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="md:col-span-7 glass-card p-6 sm:p-7 rounded-3xl relative overflow-hidden group hover:border-cyan-500/50 hover:shadow-[0_20px_45px_-15px_rgba(6,182,212,0.25)] flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#F8FAFC] group-hover:text-cyan-300 transition-colors">
                      AI & Machine Learning
                    </h3>
                    <p className="text-xs text-cyan-400/80 font-mono">
                      Predictive Pipelines, GenAI & Transformer Models
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-xs hidden sm:inline-block">
                  Primary Domain
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                Designing end-to-end ML microservices, tabular regression algorithms for market forecasting, and LLM integrations.
              </p>

              {/* Skills badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {aiCategory.skills.map((skill) => {
                  const Icon = ICON_MAP[skill.iconName] || Brain;
                  const badge = getStatusBadge(skill.status, "ai");
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/70 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-4 h-4 text-cyan-400" />
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#F8FAFC]">{skill.name}</div>
                        <span className="text-[10px] text-cyan-400 font-mono">{skill.status}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Card 2: IoT & Hardware Telemetry (Featured 5 cols with Solar Amber theme) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="md:col-span-5 glass-card p-6 sm:p-7 rounded-3xl relative overflow-hidden group hover:border-amber-500/50 hover:shadow-[0_20px_45px_-15px_rgba(245,158,11,0.25)] flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <RadioTower className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#F8FAFC] group-hover:text-amber-300 transition-colors">
                      IoT & Hardware Telemetry
                    </h3>
                    <p className="text-xs text-amber-400/80 font-mono">
                      Microcontrollers, PWM & Sensor Streams
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                Interfacing physical sensors, tuning closed-loop duty cycles, and transmitting telemetry via MQTT to cloud monitors.
              </p>

              {/* Skills badges */}
              <div className="grid grid-cols-2 gap-2.5">
                {iotCategory.skills.map((skill) => {
                  const Icon = ICON_MAP[skill.iconName] || Cpu;
                  const badge = getStatusBadge(skill.status, "iot");
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/70 hover:border-amber-500/50 hover:bg-slate-800/80 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-4 h-4 text-amber-400" />
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#F8FAFC]">{skill.name}</div>
                        <span className="text-[10px] text-amber-400 font-mono">{skill.status}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Frontend Engineering (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="md:col-span-4 glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group hover:border-sky-500/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-sky-950/80 text-sky-400 border border-sky-500/30">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-sky-300 transition-colors">
                    Frontend Engineering
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">Accessible & Reactive UIs</p>
                </div>
              </div>

              <div className="space-y-2">
                {frontendCategory.skills.map((skill) => {
                  const Icon = ICON_MAP[skill.iconName] || Layers;
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs font-medium text-slate-200"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-sky-400" />
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{skill.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Card 4: Backend & Systems (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="md:col-span-4 glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group hover:border-cyan-500/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-500/30">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-indigo-300 transition-colors">
                    Backend & Systems
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">REST microservices & Gateways</p>
                </div>
              </div>

              <div className="space-y-2">
                {backendCategory.skills.map((skill) => {
                  const Icon = ICON_MAP[skill.iconName] || Server;
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs font-medium text-slate-200"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-indigo-400" />
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{skill.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Card 5: Languages & DevOps (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="md:col-span-4 glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group hover:border-amber-500/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-500/30">
                  <Binary className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-amber-300 transition-colors">
                    Languages & DevOps
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">Python, Java, TypeScript & Git</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[...langCategory.skills, ...toolsCategory.skills.slice(0, 4)].map((skill) => (
                  <span
                    key={skill.name}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/80 border border-slate-700 text-slate-200 hover:border-amber-500/40 hover:text-amber-300 transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
