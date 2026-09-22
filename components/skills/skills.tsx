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
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/lib/data";

// Map string icon names to Lucide components
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
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", ...SKILL_CATEGORIES.map((c) => c.title)];

  const filteredCategories =
    activeTab === "All"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.title === activeTab);

  const getStatusBadge = (status: "Building With" | "Working With" | "Exploring") => {
    switch (status) {
      case "Building With":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200/80",
          dot: "bg-blue-600",
          icon: CheckCircle2,
        };
      case "Working With":
        return {
          bg: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
          dot: "bg-indigo-600",
          icon: Clock,
        };
      case "Exploring":
        return {
          bg: "bg-cyan-50 text-cyan-700 border-cyan-200/80",
          dot: "bg-cyan-500",
          icon: Compass,
        };
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 mb-4"
          >
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>Technical Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            Skills & Technologies
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed"
          >
            A transparent overview of the programming languages, ML libraries, frontend architectures,
            and IoT hardware I actively build, experiment, and solve problems with.
          </motion.p>

          {/* Status Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-4 border-t border-slate-200/60 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Building With (Primary / Frequent)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              Working With (Applied in Projects)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Exploring (Actively Learning)
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 scrollbar-none gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Categories & Skill Cards Grid */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-baseline justify-between border-b border-slate-200/80 pb-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>{category.title}</span>
                    <span className="text-xs font-normal text-slate-500 font-mono">
                      ({category.skills.length})
                    </span>
                  </h3>
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    {category.description}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  {category.skills.map((skill) => {
                    const IconComponent = ICON_MAP[skill.iconName] || Code2;
                    const badge = getStatusBadge(skill.status);

                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ y: -3, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="glass-card p-4 rounded-xl flex flex-col justify-between group cursor-default transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-blue-50 text-slate-700 group-hover:text-blue-600 transition-colors">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span
                            className={`w-2 h-2 rounded-full ${badge.dot}`}
                            title={skill.status}
                          />
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 text-xs sm:text-sm mb-1 group-hover:text-blue-600 transition-colors">
                            {skill.name}
                          </h4>
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium border ${badge.bg}`}>
                            {skill.status}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
