"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  Cpu,
  Layers,
  RadioTower,
  Bot,
} from "lucide-react";
import { PROJECTS, Project } from "@/lib/data";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";
import { CardSwap, CardSwapRef } from "@/components/ui/CardSwap";

type DomainFilter = "all" | "ai" | "fullstack" | "iot";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<DomainFilter>("all");
  const cardSwapRef = useRef<CardSwapRef | null>(null);

  const filterTabs = [
    { label: "All Systems", key: "all" as DomainFilter },
    { label: "AI Agents & RAG", key: "ai" as DomainFilter },
    { label: "Full-Stack Web", key: "fullstack" as DomainFilter },
    { label: "Embedded IoT", key: "iot" as DomainFilter },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "ai") return p.category.toLowerCase().includes("ai");
    if (activeFilter === "fullstack") return p.category.toLowerCase().includes("full-stack");
    if (activeFilter === "iot") return p.category.toLowerCase().includes("iot");
    return true;
  });

  const handleFilterChange = (key: DomainFilter) => {
    setActiveFilter(key);
    cardSwapRef.current?.goTo(0);
  };

  return (
    <section id="projects" className="py-24 relative bg-[#070B14] border-t border-[rgba(148,163,184,0.12)] overflow-hidden">
      {/* Aurora Ambient Lighting */}
      <div className="absolute top-20 left-10 w-[550px] h-[550px] bg-[#22D3EE]/[0.05] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[550px] h-[550px] bg-[#3B82F6]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] mb-4 shadow-[0_0_12px_rgba(34,211,238,0.10)]"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Authoritative Project Repository</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-4"
          >
            Engineering In Action
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#A7B4C7] text-sm sm:text-base leading-relaxed"
          >
            Explore verified engineering implementations across AI memory agents, agricultural machine
            learning platforms, and closed-loop IoT microclimate telemetry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3"
          >
            <a
              href="#how-vijay-ai-works"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-[#22D3EE] bg-[#0B1528] hover:bg-[#0E1F3B] border border-[rgba(34,211,238,0.25)] hover:border-[#22D3EE] transition-all shadow-sm"
            >
              <Bot className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Explore How Vijay AI Works Architecture ↓</span>
            </a>
          </motion.div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)]">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleFilterChange(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeFilter === tab.key
                    ? "bg-[#172338] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] shadow-[0_0_12px_rgba(34,211,238,0.15)] font-semibold"
                    : "text-[#A7B4C7] hover:text-[#F8FAFC] hover:bg-[#121C2D]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Straight Front-Facing Card Swap Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
            className="w-full flex justify-center py-4"
          >
            <CardSwap
              ref={cardSwapRef}
              autoplay={true}
              autoAdvanceInterval={6000} // Configurable 6-second auto-swap interval
              pauseOnHover={true}
              showControls={true}
              showSideControls={true}
              showPagination={true}
              showProgressBar={true}
              adjacentPreviews={true}
              draggable={true}
              cardRadius={24}
              className="w-full max-w-4xl"
            >
              {filteredProjects.map((project, idx) => (
                <div key={project.id} id={project.id} className="w-full">
                  <ProjectCard
                    project={project}
                    onSelect={(p) => setSelectedProject(p)}
                    isFeaturedLarge={true}
                    accent={idx % 2 === 0 ? "cyan" : "amber"}
                    customMetric={project.metrics?.[0]?.value}
                    className="shadow-2xl"
                  />
                </div>
              ))}
            </CardSwap>
          </motion.div>
        </AnimatePresence>

        {/* Technical Architecture Domains Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16">
          <div className="glass-card p-5 rounded-2xl flex items-center gap-3.5 border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] transition-all">
            <div className="p-3 rounded-xl bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">AI Domain</h4>
              <p className="text-xs text-[#A7B4C7]">RAG Pipelines, LangChain, Scikit-Learn Regression</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex items-center gap-3.5 border border-[rgba(148,163,184,0.12)] hover:border-[rgba(59,130,246,0.45)] transition-all">
            <div className="p-3 rounded-xl bg-[#0D1626] text-[#3B82F6] border border-[rgba(59,130,246,0.25)] shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">Full-Stack Domain</h4>
              <p className="text-xs text-[#A7B4C7]">Next.js 14 App Router, Express Gateway, Supabase &amp; MongoDB</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex items-center gap-3.5 border border-[rgba(148,163,184,0.12)] hover:border-[rgba(245,158,11,0.45)] transition-all">
            <div className="p-3 rounded-xl bg-[#0D1626] text-[#F59E0B] border border-[rgba(245,158,11,0.25)] shrink-0">
              <RadioTower className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">Embedded IoT Domain</h4>
              <p className="text-xs text-[#A7B4C7]">NodeMCU ESP8266, DHT22 Sensor, PWM Logic &amp; Blynk</p>
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
export default Projects;
