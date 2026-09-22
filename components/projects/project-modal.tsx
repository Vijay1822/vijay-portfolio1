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
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-y-auto z-10 p-6 sm:p-8 md:p-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 mb-3">
              <span>{project.badge}</span>
              <span>•</span>
              <span>{project.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Quick Metrics Bar if available */}
          {project.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
              {project.metrics.map((m) => (
                <div key={m.label} className="text-center sm:text-left">
                  <div className="text-xs text-slate-500 font-mono uppercase">{m.label}</div>
                  <div className="text-base sm:text-lg font-bold text-slate-900">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Grid Layout: Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60">
              <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                The Problem
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/60">
              <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                The Solution
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* System Architecture Section */}
          <div className="mb-8">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              System Architecture & Data Flow
            </h3>

            {/* Step-by-step Flow */}
            <div className="space-y-2 mb-6">
              {project.architecture.flow.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 text-xs sm:text-sm text-slate-700"
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="leading-snug">{step}</span>
                </div>
              ))}
            </div>

            {/* Architecture Stack Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Frontend Client:</span>
                  <span className="text-slate-600">{project.architecture.frontend}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
                <Server className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Backend Gateway:</span>
                  <span className="text-slate-600">{project.architecture.backend}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
                <Cpu className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">AI / Hardware Engine:</span>
                  <span className="text-slate-600">{project.architecture.aiOrIot}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
                <Database className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Persistence & Telemetry:</span>
                  <span className="text-slate-600">{project.architecture.database}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-8">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
              Core Engineering Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <div className="mb-8">
            <h4 className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Profile (@Vijay1822)</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
