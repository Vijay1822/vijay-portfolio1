"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, BookOpen, Award, CheckCircle } from "lucide-react";
import { EDUCATION } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="py-20 sm:py-24 min-h-[calc(100vh-5rem)] relative bg-[#0F1726] border-t border-[rgba(148,163,184,0.12)] flex flex-col justify-center">
      {/* Aurora Ambient Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#22D3EE]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#3B82F6]/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] mb-4 shadow-[0_0_12px_rgba(34,211,238,0.10)]"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Academic Foundation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-4"
          >
            Education &amp; Alma Mater
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[#A7B4C7] text-sm sm:text-base leading-relaxed max-w-2xl"
          >
            Rigorous engineering education blending computer science fundamentals with hands-on
            Internet of Things laboratory systems and algorithm design.
          </motion.p>
        </div>

        {/* Premium Academic Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-[rgba(148,163,184,0.12)] relative overflow-hidden group hover:border-[rgba(34,211,238,0.45)] hover:shadow-[0_16px_45px_rgba(34,211,238,0.08)]"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#22D3EE]/[0.06] via-[#3B82F6]/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-[rgba(148,163,184,0.12)] pb-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-[#22D3EE] uppercase tracking-wider">
                  Autonomous Engineering College
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#F8FAFC]">
                  {EDUCATION.institution}
                </h2>
                <p className="text-xs sm:text-sm text-[#A7B4C7] mt-0.5 font-normal">
                  {EDUCATION.fullName}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2 shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0D2731] text-[#34D399] border border-[#34D399]/40 shadow-[0_0_12px_rgba(52,211,153,0.10)]">
                  <Award className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>{EDUCATION.cgpa}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.3)]">
                  <Calendar className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>Class of {EDUCATION.graduationYear}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                <MapPin className="w-3.5 h-3.5 text-[#64748B]" />
                <span>{EDUCATION.location}</span>
              </div>
            </div>
          </div>

          {/* Degree & Focus Area */}
          <div className="mb-8">
            <h3 className="text-xs font-mono font-medium text-[#64748B] uppercase tracking-wider mb-2.5">
              Degree Program
            </h3>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1626] border border-[rgba(34,211,238,0.25)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <div>
                <span className="text-base sm:text-lg font-bold text-[#F8FAFC] block">
                  {EDUCATION.degree}
                </span>
                <span className="text-xs sm:text-sm text-[#22D3EE] font-medium">
                  {EDUCATION.branch}
                </span>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#172338] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] shadow-xs self-start sm:self-auto">
                {EDUCATION.status}
              </span>
            </div>
          </div>

          {/* Institutional Overview */}
          <div className="mb-8 p-4 rounded-2xl bg-[#0A101D]/60 border border-[rgba(148,163,184,0.08)] text-xs sm:text-sm text-[#A7B4C7] leading-relaxed font-normal">
            {EDUCATION.overview}
          </div>

          {/* Coursework Matrix */}
          <div>
            <h3 className="text-xs font-mono font-medium text-[#64748B] uppercase tracking-wider mb-3.5 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#22D3EE]" />
              Core Academic Coursework &amp; Interfacing Labs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EDUCATION.keyCoursework.map((course) => (
                <div
                  key={course}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0D1626]/80 border border-[rgba(148,163,184,0.12)] text-xs text-[#CBD5E1] font-medium hover:border-[rgba(34,211,238,0.35)] hover:bg-[#0D1626] transition-all"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
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
