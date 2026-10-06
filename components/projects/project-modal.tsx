"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle, Cpu, Layers, Server, Database, ArrowRight } from "lucide-react";
import { Project } from "@/lib/data";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#121C2D]/98 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[rgba(34,211,238,0.22)] overflow-y-auto z-10 p-6 sm:p-8 md:p-10 text-[#F8FAFC]"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#22D3EE]/[0.05] rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2.5 rounded-full text-[#A7B4C7] hover:text-[#F8FAFC] hover:bg-[#172338] transition-colors focus:outline-none border border-[rgba(148,163,184,0.15)]"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] mb-3 shadow-[0_0_12px_rgba(34,211,238,0.12)]">
              <span>{project.badge}</span>
              <span>•</span>
              <span className="text-[#F59E0B]">{project.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-[#22D3EE] mt-2 font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Quick Metrics Bar if available */}
          {project.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 p-4 rounded-2xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)]">
              {project.metrics.map((m) => (
                <div key={m.label} className="text-center sm:text-left">
                  <div className="text-xs text-[#64748B] font-mono uppercase">{m.label}</div>
                  <div className="text-base sm:text-lg font-bold text-[#22D3EE] mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Grid Layout: Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 rounded-2xl bg-[#172338]/80 border border-[rgba(245,158,11,0.25)]">
              <h3 className="text-sm font-bold text-[#F59E0B] uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_6px_#F59E0B]" />
                The Problem
              </h3>
              <p className="text-xs sm:text-sm text-[#A7B4C7] leading-relaxed font-normal">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D2731]/80 border border-[rgba(34,211,238,0.25)]">
              <h3 className="text-sm font-bold text-[#22D3EE] uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_6px_#22D3EE]" />
                The Solution
              </h3>
              <p className="text-xs sm:text-sm text-[#A7B4C7] leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          </div>

          {/* System Architecture Section */}
          <div className="mb-8">
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#22D3EE]" />
              System Architecture &amp; Data Flow
            </h3>

            {/* Step-by-step Flow */}
            <div className="space-y-2 mb-6">
              {project.architecture.flow.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] text-xs sm:text-sm text-[#A7B4C7]"
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#22D3EE] text-[#061018] font-bold text-[11px] shrink-0 mt-0.5 shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                    {idx + 1}
                  </div>
                  <span className="leading-snug text-[#F8FAFC]">{step}</span>
                </div>
              ))}
            </div>

            {/* Architecture Stack Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#F8FAFC] block">Frontend Client:</span>
                  <span className="text-[#A7B4C7]">{project.architecture.frontend}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] flex items-start gap-2.5">
                <Server className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#F8FAFC] block">Backend Gateway:</span>
                  <span className="text-[#A7B4C7]">{project.architecture.backend}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] flex items-start gap-2.5">
                <Cpu className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#F8FAFC] block">AI / Hardware Engine:</span>
                  <span className="text-[#A7B4C7]">{project.architecture.aiOrIot}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] flex items-start gap-2.5">
                <Database className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#F8FAFC] block">Persistence &amp; Telemetry:</span>
                  <span className="text-[#A7B4C7]">{project.architecture.database}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-8">
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] mb-3">
              Core Engineering Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#A7B4C7]">
                  <CheckCircle className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <div className="mb-8">
            <h4 className="text-xs font-mono font-medium text-[#64748B] uppercase tracking-wider mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#172338] text-[#67E8F9] border border-[rgba(34,211,238,0.15)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-[rgba(148,163,184,0.12)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] transition-all shadow-[0_10px_25px_rgba(34,211,238,0.18)]"
              >
                <Github className="w-4 h-4" />
                <span>Source Profile (@Vijay1822)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#A7B4C7] hover:text-[#F8FAFC] transition-colors"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
