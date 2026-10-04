"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, BookOpen, Award, CheckCircle } from "lucide-react";
import { EDUCATION } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="py-24 relative bg-[#0B1120] border-t border-slate-800/80">
      {/* Aurora Ambient Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic Foundation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-4"
          >
            Education & Alma Mater
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#94A3B8] text-sm sm:text-base leading-relaxed"
          >
            Rigorous engineering education blending computer science fundamentals with hands-on
            Internet of Things laboratory systems and algorithm design.
          </motion.p>
        </div>

        {/* Premium Academic Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-slate-800/90 relative overflow-hidden group hover:border-cyan-500/40"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-cyan-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-slate-950 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                  Autonomous Engineering College
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#F8FAFC]">
                  {EDUCATION.institution}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-normal">
                  {EDUCATION.fullName}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-1.5 shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34D399]" />
                <span>Graduation Year: {EDUCATION.graduationYear}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{EDUCATION.location}</span>
              </div>
            </div>
          </div>

          {/* Degree & Focus Area */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-[#F8FAFC] mb-2">Degree Program:</h4>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-base font-bold text-[#F8FAFC] block">
                  {EDUCATION.degree}
                </span>
                <span className="text-xs sm:text-sm text-cyan-300 font-medium">
                  {EDUCATION.branch}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-xs self-start sm:self-auto">
                Undergraduate
              </span>
            </div>
          </div>

          {/* Institutional Overview */}
          <div className="mb-8 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {EDUCATION.overview}
          </div>

          {/* Coursework Matrix */}
          <div>
            <h4 className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Core Academic Coursework & Interfacing Labs
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EDUCATION.keyCoursework.map((course) => (
                <div
                  key={course}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 font-medium hover:border-slate-700 transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
