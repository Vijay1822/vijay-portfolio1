"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2, Sparkles, Cpu, Layers, RadioTower } from "lucide-react";
import { PROJECTS, Project } from "@/lib/data";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const farmerProject = PROJECTS.find((p) => p.id.includes("farmer")) || PROJECTS[0];
  const fanProject = PROJECTS.find((p) => p.id.includes("fan")) || PROJECTS[1];

  return (
    <section id="projects" className="py-24 relative bg-[#0B1120] border-t border-slate-800/80">
      {/* Aurora Ambient Lighting */}
      <div className="absolute top-20 left-10 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Featured Case Studies</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-4"
          >
            Engineering In Action
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#94A3B8] text-sm sm:text-base leading-relaxed"
          >
            Two flagship engineering implementations highlighted across an asymmetrical Bento Grid:
            intelligent full-stack AI architectures and closed-loop IoT hardware telemetry.
          </motion.p>
        </div>

        {/* Asymmetrical Bento Grid Project Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Featured Project 1: Smart Farmer Procurement System (7 cols) */}
          <div className="lg:col-span-7">
            <ProjectCard
              project={farmerProject}
              onSelect={(p) => setSelectedProject(p)}
              isFeaturedLarge
              accent="cyan"
              customMetric="100% Data-Driven"
            />
          </div>

          {/* Featured Project 2: Closed-Loop Fan Controller (5 cols) */}
          <div className="lg:col-span-5">
            <ProjectCard
              project={fanProject}
              onSelect={(p) => setSelectedProject(p)}
              isFeaturedLarge={false}
              accent="amber"
              customMetric="1.5s Loop"
            />
          </div>

          {/* Domain Highlights Row */}
          <div className="lg:col-span-4 glass-card p-5 rounded-2xl flex items-center gap-3.5 border border-slate-800/80 hover:border-cyan-500/40 transition-all">
            <div className="p-3 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">AI Domain</h4>
              <p className="text-xs text-slate-300">Random Forest Regressor, Python ML API</p>
            </div>
          </div>

          <div className="lg:col-span-4 glass-card p-5 rounded-2xl flex items-center gap-3.5 border border-slate-800/80 hover:border-sky-500/40 transition-all">
            <div className="p-3 rounded-xl bg-sky-950/80 text-sky-400 border border-sky-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">Full-Stack Domain</h4>
              <p className="text-xs text-slate-300">Next.js 14, Node.js Gateway, Supabase</p>
            </div>
          </div>

          <div className="lg:col-span-4 glass-card p-5 rounded-2xl flex items-center gap-3.5 border border-slate-800/80 hover:border-amber-500/40 transition-all">
            <div className="p-3 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-500/30">
              <RadioTower className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">Embedded IoT Domain</h4>
              <p className="text-xs text-slate-300">NodeMCU ESP8266, DHT22 & PWM Control</p>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
