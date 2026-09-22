"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, BookOpen, Award, CheckCircle } from "lucide-react";
import { EDUCATION } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="py-24 relative bg-slate-50/50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 mb-4"
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Academic Foundation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            Education & Alma Mater
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed"
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
          className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider">
                  Autonomous Engineering College
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {EDUCATION.institution}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {EDUCATION.fullName}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-1.5 shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Graduation Year: {EDUCATION.graduationYear}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{EDUCATION.location}</span>
              </div>
            </div>
          </div>

          {/* Degree & Focus Area */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-slate-900 mb-2">Degree Program:</h4>
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-base font-bold text-blue-900 block">
                  {EDUCATION.degree}
                </span>
                <span className="text-xs sm:text-sm text-blue-700 font-medium">
                  {EDUCATION.branch}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-blue-700 border border-blue-200 shadow-2xs self-start sm:self-auto">
                Undergraduate
              </span>
            </div>
          </div>

          {/* Institutional Overview */}
          <div className="mb-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {EDUCATION.overview}
          </div>

          {/* Coursework Matrix */}
          <div>
            <h4 className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              Core Academic Coursework & Interfacing Labs
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EDUCATION.keyCoursework.map((course) => (
                <div
                  key={course}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/60 text-xs text-slate-700 font-medium"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
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
