"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Rocket, ShieldCheck, Sparkles, GraduationCap } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-24 relative bg-slate-50/50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Philosophy & Background</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            More Than Just Code.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed"
          >
            Engineering is not just about writing lines of syntax; it is about creating resilient,
            usable systems that interface intelligently with human needs and physical environments.
          </motion.p>
        </div>

        {/* Story & Focus Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">B.Tech in CSE-IoT</h3>
                <p className="text-xs text-slate-500 font-mono">
                  {PERSONAL_INFO.collegeFullName} • Bachupally, Hyderabad
                </p>
              </div>
            </div>

            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              {PERSONAL_INFO.aboutParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Core Pillars */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">AI / ML</h4>
                  <p className="text-[11px] text-slate-500">Predictive models & GenAI workflows</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">Full-Stack Web</h4>
                  <p className="text-[11px] text-slate-500">Next.js, TypeScript & APIs</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">IoT Hardware</h4>
                  <p className="text-[11px] text-slate-500">Sensors, NodeMCU & Telemetry</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Engineering Pillars Card */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="glass-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-blue-500/40 group-hover:bg-blue-600 transition-colors" />
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                    {stat.value}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{stat.detail}</p>
                </div>
              </motion.div>
            ))}

            {/* Quick highlight banner spanning 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="col-span-2 glass-panel p-4 rounded-xl border border-blue-100/80 flex items-center gap-3 bg-gradient-to-r from-blue-50/60 to-indigo-50/40"
            >
              <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0">
                <Rocket className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-700 leading-snug">
                Actively seeking technical internships, hackathons, and research projects bridging AI and IoT.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
