"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles, Cpu, Layers, Activity } from "lucide-react";
import { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const isAI = project.id.includes("farmer");

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-3xl overflow-hidden border border-slate-200/80 flex flex-col justify-between group transition-all duration-300 relative hover:border-blue-300/80"
    >
      {/* Top Banner Visual Representation */}
      <div className="relative h-48 sm:h-56 w-full bg-slate-900 overflow-hidden flex items-center justify-center p-6">
        {/* Animated Background Gradients */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${
            isAI
              ? "from-blue-900/80 via-indigo-950/90 to-slate-900"
              : "from-cyan-950/90 via-blue-950/80 to-slate-900"
          }`}
        />

        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 bg-tech-grid opacity-30" />

        {/* Abstract Schematic Diagram / Visual */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-3 shadow-glow group-hover:scale-110 group-hover:border-white/40 transition-all duration-300">
            {isAI ? (
              <Layers className="w-7 h-7 text-blue-400" />
            ) : (
              <Activity className="w-7 h-7 text-cyan-400" />
            )}
          </div>
          <span className="text-xs font-mono tracking-widest text-slate-300 uppercase">
            {isAI ? "Machine Learning & Microservices" : "NodeMCU & PWM Hardware"}
          </span>
          <h3 className="text-lg font-bold text-white mt-1 px-4 max-w-sm line-clamp-1">
            {project.title}
          </h3>
        </div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/15 backdrop-blur-md text-white border border-white/20">
            {project.badge}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-20">
          <span className="text-[11px] font-mono text-slate-300 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
        <div>
          <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
            {project.title}
          </h4>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* Quick Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-2 mb-5 p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/60">
              {project.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">{m.label}</div>
                  <div className="text-xs font-bold text-slate-800">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors group/btn"
          >
            <span>View Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="View Vijay's GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
