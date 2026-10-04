"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles, Cpu, Layers, Activity, RadioTower } from "lucide-react";
import { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  isFeaturedLarge?: boolean;
  accent?: "cyan" | "amber";
  customMetric?: string;
}

export function ProjectCard({
  project,
  onSelect,
  isFeaturedLarge = false,
  accent = "cyan",
  customMetric,
}: ProjectCardProps) {
  const isCyan = accent === "cyan";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-card rounded-3xl overflow-hidden border border-slate-800/90 flex flex-col justify-between group transition-all duration-300 relative ${
        isCyan
          ? "hover:border-cyan-500/50 hover:shadow-[0_20px_45px_-15px_rgba(6,182,212,0.25)]"
          : "hover:border-amber-500/50 hover:shadow-[0_20px_45px_-15px_rgba(245,158,11,0.25)]"
      }`}
    >
      {/* Top Banner Visual Representation */}
      <div className={`relative ${isFeaturedLarge ? "h-56 sm:h-64" : "h-48 sm:h-56"} w-full bg-[#070B14] overflow-hidden flex items-center justify-center p-6 border-b border-slate-800/80`}>
        {/* Animated Background Gradients */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${
            isCyan
              ? "from-cyan-950/70 via-slate-900/90 to-[#070B14]"
              : "from-amber-950/70 via-slate-900/90 to-[#070B14]"
          }`}
        />

        {/* Ambient Orb Glow */}
        <div
          className={`absolute w-44 h-44 rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity ${
            isCyan ? "bg-cyan-500" : "bg-amber-500"
          }`}
        />

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 bg-tech-grid opacity-40" />

        {/* Abstract Schematic Diagram / Visual */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div
            className={`w-16 h-16 rounded-2xl bg-slate-900/80 backdrop-blur-md border flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300 ${
              isCyan
                ? "border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                : "border-amber-500/40 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            }`}
          >
            {isCyan ? (
              <Layers className="w-8 h-8" />
            ) : (
              <RadioTower className="w-8 h-8" />
            )}
          </div>
          <span
            className={`text-xs font-mono tracking-widest uppercase font-semibold ${
              isCyan ? "text-cyan-300" : "text-amber-300"
            }`}
          >
            {isCyan ? "Machine Learning & Microservices" : "NodeMCU & Closed-Loop PWM"}
          </span>
          <h3 className="text-lg font-bold text-[#F8FAFC] mt-1 px-4 max-w-sm line-clamp-1">
            {project.title}
          </h3>
        </div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border ${
              isCyan
                ? "bg-cyan-950/80 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                : "bg-amber-950/80 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
            }`}
          >
            {project.badge}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-20">
          <span className="text-[11px] font-mono text-slate-300 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-700/60">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4
              className={`text-xl font-extrabold text-[#F8FAFC] transition-colors ${
                isCyan ? "group-hover:text-cyan-300" : "group-hover:text-amber-300"
              }`}
            >
              {project.title}
            </h4>
            {customMetric && (
              <span
                className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${
                  isCyan
                    ? "bg-cyan-950 text-cyan-300 border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.3)]"
                    : "bg-amber-950 text-amber-300 border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                }`}
              >
                {customMetric}
              </span>
            )}
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* Quick Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              {project.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">{m.label}</div>
                  <div
                    className={`text-xs font-bold mt-0.5 ${
                      isCyan ? "text-cyan-300" : "text-amber-300"
                    }`}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/80 text-slate-200 border border-slate-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <button
            onClick={() => onSelect(project)}
            className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors group/btn ${
              isCyan ? "text-cyan-400 hover:text-cyan-300" : "text-amber-400 hover:text-amber-300"
            }`}
          >
            <span>View System Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-colors"
            title="View Vijay's GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
