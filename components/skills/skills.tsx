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
            <span>Technical Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-4"
          >
            Skills &amp; Technical Domains
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#A7B4C7] text-sm sm:text-base leading-relaxed"
          >
            An asymmetrical view of the machine learning pipelines, responsive frontend frameworks,
            and real-time IoT hardware protocols I build and deploy.
          </motion.p>

          {/* Status Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 pt-4 border-t border-[rgba(148,163,184,0.12)] text-xs text-[#64748B]">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_6px_#22D3EE]" />
              <span className="text-[#22D3EE]">Electric Cyan:</span> AI &amp; Software
            </span>
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_6px_#F59E0B]" />
              <span className="text-[#F59E0B]">Solar Amber:</span> Hardware &amp; Telemetry
            </span>
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              <span className="text-[#A7B4C7]">Deep Blue:</span> Web &amp; Tooling
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
            className="md:col-span-7 glass-card p-6 sm:p-7 rounded-3xl relative overflow-hidden group hover:border-[rgba(34,211,238,0.45)] hover:shadow-[0_16px_45px_rgba(34,211,238,0.08)] flex flex-col justify-between"
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
          </motion.div>

          {/* Card 2: IoT & Hardware Telemetry (Featured 5 cols with Solar Amber theme) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="md:col-span-5 glass-card p-6 sm:p-7 rounded-3xl relative overflow-hidden group hover:border-[rgba(245,158,11,0.45)] hover:shadow-[0_16px_45px_rgba(245,158,11,0.08)] flex flex-col justify-between"
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
          </motion.div>

          {/* Card 3: Frontend Engineering (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="md:col-span-4 glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group hover:border-[rgba(59,130,246,0.45)] flex flex-col justify-between"
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

              <div className="space-y-2">
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
          </motion.div>

          {/* Card 4: Backend & Systems (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="md:col-span-4 glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group hover:border-[rgba(34,211,238,0.45)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)]">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors">
                    Backend &amp; Systems
                  </h3>
                  <p className="text-[11px] text-[#64748B] font-mono">REST microservices &amp; Gateways</p>
                </div>
              </div>

              <div className="space-y-2">
                {backendCategory.skills.map((skill) => {
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
          </motion.div>

          {/* Card 5: Languages & DevOps (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="md:col-span-4 glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden group hover:border-[rgba(245,158,11,0.45)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#0D1626] text-[#F59E0B] border border-[rgba(245,158,11,0.25)]">
                  <Binary className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#F59E0B] transition-colors">
                    Languages &amp; DevOps
                  </h3>
                  <p className="text-[11px] text-[#64748B] font-mono">Python, Java, TypeScript &amp; Git</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
