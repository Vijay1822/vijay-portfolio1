"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  ArrowRight,
  Brain,
  Cpu,
  Layers,
  Code2,
  Calendar,
  CheckCircle2,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { Hero } from "@/components/hero/hero";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectModal } from "@/components/projects/project-modal";
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, ACHIEVEMENTS, Project } from "@/lib/data";

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Take top featured projects
  const featuredProjects = PROJECTS.slice(0, 2);

  // Preview skill highlights
  const topSkillCategories = SKILL_CATEGORIES.slice(0, 4);

  // Latest journey highlight
  const latestMilestones = ACHIEVEMENTS.slice(0, 2);

  return (
    <div className="relative">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Introduction & Profile Preview */}
      <section className="py-20 relative bg-[#0B1120] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left summary copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Introduction & Vision</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
                Engineering at the Intersection of{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-amber-300 bg-clip-text text-transparent">
                  AI & Embedded Systems.
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {PERSONAL_INFO.aboutParagraphs[0]}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {PERSONAL_INFO.aboutParagraphs[1]}
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all group"
                >
                  <span>Learn More About Vijay</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-6 grid grid-cols-2 gap-4"
            >
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(6,182,212,0.1)]"
                >
                  <span className="text-xs text-slate-400 font-medium block mb-1 uppercase tracking-wider font-mono">
                    {stat.label}
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] group-hover:text-cyan-300 transition-colors mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{stat.detail}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects Preview */}
      <section className="py-20 relative bg-[#090E1A] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Featured Engineering Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
                Selected Case Studies.
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <span>Explore All Projects ({PROJECTS.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
                isFeaturedLarge={true}
                accent={idx === 0 ? "cyan" : "amber"}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-200"
            >
              <span>View All Projects & Architectures</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Short Skills Preview */}
      <section className="py-20 relative bg-[#0B1120] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/30 mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>Technical Arsenal</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
                Skills & Technologies Overview.
              </h2>
            </div>
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group"
            >
              <span>View All Skills & Filter by Domain</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Skill Domains Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSkillCategories.map((cat, idx) => (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-[#F8FAFC] mb-1.5">{cat.title}</h3>
                  <p className="text-xs text-slate-400 mb-4">{cat.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-900/80 border border-slate-700/60 text-slate-200"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 transition-all"
            >
              <span>Explore Complete Categorized Skill Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Short Journey Preview */}
      <section className="py-20 relative bg-[#090E1A] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Roadmap & Highlights</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
                Recent Journey Milestones.
              </h2>
            </div>
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <span>View Full Journey Timeline</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Milestones grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestMilestones.map((item, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                    {item.year}
                  </span>
                  <span className="text-xs text-amber-400 bg-amber-950/50 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-medium">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">{item.description}</p>
                <ul className="space-y-1.5">
                  {item.highlights.slice(0, 2).map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 transition-all"
            >
              <span>Explore Complete Engineering Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="py-16 relative bg-gradient-to-b from-[#090E1A] to-[#0B1120] border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] mb-3">
              Ready to Collaborate or Build Something Impactful?
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
              Whether you are interested in AI engineering, full-stack systems, IoT prototypes, or innovative partnerships, I would love to connect.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                href="/education"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all"
              >
                <span>View Academic Background</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal (if user clicks on a project card) */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
