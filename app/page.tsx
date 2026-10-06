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
      <section className="py-20 relative bg-[#0B1220] border-t border-[rgba(148,163,184,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left summary copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] shadow-[0_0_12px_rgba(34,211,238,0.10)]">
                <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>Introduction &amp; Vision</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
                Engineering at the Intersection of{" "}
                <span className="bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] bg-clip-text text-transparent">
                  AI &amp; Embedded Systems.
                </span>
              </h2>

              <p className="text-[#A7B4C7] text-sm sm:text-base leading-relaxed">
                {PERSONAL_INFO.aboutParagraphs[0]}
              </p>
              <p className="text-[#64748B] text-sm leading-relaxed">
                {PERSONAL_INFO.aboutParagraphs[1]}
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#22D3EE] bg-[#121C2D] hover:bg-[#172338] border border-[rgba(34,211,238,0.3)] hover:border-[#22D3EE] transition-all group"
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
                  className="glass-card p-5 sm:p-6 rounded-2xl border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] transition-all duration-300 group hover:shadow-[0_16px_45px_rgba(34,211,238,0.08)]"
                >
                  <span className="text-xs text-[#64748B] font-medium block mb-1 uppercase tracking-wider font-mono">
                    {stat.label}
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-[#A7B4C7] leading-snug">{stat.detail}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects Preview */}
      <section className="py-20 relative bg-[#070B14] border-t border-[rgba(148,163,184,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] mb-3 shadow-[0_0_12px_rgba(34,211,238,0.10)]">
                <Terminal className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>Featured Engineering Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
                Selected Case Studies.
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#22D3EE] hover:text-[#67E8F9] transition-colors group"
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] shadow-[0_10px_30px_rgba(34,211,238,0.18)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>View All Projects &amp; Architectures</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Short Skills Preview */}
      <section className="py-20 relative bg-[#0F1726] border-t border-[rgba(148,163,184,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#172338] text-[#F59E0B] border border-[rgba(245,158,11,0.25)] mb-3 shadow-[0_0_12px_rgba(245,158,11,0.10)]">
                <Cpu className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Technical Arsenal</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
                Skills &amp; Technologies Overview.
              </h2>
            </div>
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#F59E0B] hover:text-[#fbbf24] transition-colors group"
            >
              <span>View All Skills &amp; Filter by Domain</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Skill Domains Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSkillCategories.map((cat, idx) => (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-[#F8FAFC] mb-1.5">{cat.title}</h3>
                  <p className="text-xs text-[#A7B4C7] mb-4">{cat.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#172338] border border-[rgba(34,211,238,0.15)] text-[#67E8F9]"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#A7B4C7] hover:text-[#F8FAFC] bg-[#121C2D] hover:bg-[#172338] border border-[rgba(148,163,184,0.15)] hover:border-[rgba(34,211,238,0.45)] transition-all"
            >
              <span>Explore Complete Categorized Skill Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Short Journey Preview */}
      <section className="py-20 relative bg-[#070B14] border-t border-[rgba(148,163,184,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] mb-3 shadow-[0_0_12px_rgba(34,211,238,0.10)]">
                <Calendar className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>Roadmap &amp; Highlights</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
                Recent Journey Milestones.
              </h2>
            </div>
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#22D3EE] hover:text-[#67E8F9] transition-colors group"
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
                className="glass-card p-6 rounded-2xl border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#22D3EE] bg-[#0D1626] border border-[rgba(34,211,238,0.25)] px-2.5 py-0.5 rounded-full">
                    {item.year}
                  </span>
                  <span className="text-xs text-[#F59E0B] bg-[#172338] border border-[rgba(245,158,11,0.25)] px-2.5 py-0.5 rounded-full font-medium">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#A7B4C7] mb-4 leading-relaxed">{item.description}</p>
                <ul className="space-y-1.5">
                  {item.highlights.slice(0, 2).map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs text-[#A7B4C7]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3EE] shrink-0 mt-0.5" />
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#A7B4C7] hover:text-[#F8FAFC] bg-[#121C2D] hover:bg-[#172338] border border-[rgba(148,163,184,0.15)] hover:border-[rgba(34,211,238,0.45)] transition-all"
            >
              <span>Explore Complete Engineering Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="py-16 relative bg-gradient-to-b from-[#070B14] to-[#0B1220] border-t border-[rgba(148,163,184,0.12)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[rgba(34,211,238,0.3)] shadow-[0_16px_50px_rgba(0,0,0,0.35)] relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#22D3EE]/[0.05] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -top-16 w-64 h-64 bg-[#3B82F6]/[0.04] rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] mb-3">
              Ready to Collaborate or Build Something Impactful?
            </h2>
            <p className="text-sm text-[#A7B4C7] max-w-xl mx-auto mb-6">
              Whether you are interested in AI engineering, full-stack systems, IoT prototypes, or innovative partnerships, I would love to connect.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] shadow-[0_10px_30px_rgba(34,211,238,0.18)] hover:-translate-y-0.5 transition-all"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                href="/education"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#F8FAFC] bg-transparent hover:bg-[rgba(34,211,238,0.08)] border border-[rgba(34,211,238,0.55)] hover:border-[#22D3EE] transition-all"
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
