"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Rocket, ShieldCheck, Sparkles, GraduationCap } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-24 relative bg-[#0B1220] border-t border-[rgba(148,163,184,0.12)]">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#22D3EE]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#3B82F6]/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] mb-4 shadow-[0_0_12px_rgba(34,211,238,0.10)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Philosophy &amp; Background</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-4"
          >
            More Than Just Code.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#A7B4C7] text-sm sm:text-base leading-relaxed"
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
            className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden group border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)]"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#22D3EE]/[0.05] blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] shadow-[0_0_12px_rgba(34,211,238,0.15)]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#F8FAFC] text-lg">B.Tech in CSE-IoT</h3>
                <p className="text-xs text-[#A7B4C7] font-mono">
                  {PERSONAL_INFO.collegeFullName} • Bachupally, Hyderabad
                </p>
              </div>
            </div>

            <div className="space-y-4 text-[#A7B4C7] text-sm leading-relaxed font-normal">
              {PERSONAL_INFO.aboutParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Core Pillars */}
            <div className="mt-8 pt-6 border-t border-[rgba(148,163,184,0.12)] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)]">
                <div className="p-1.5 rounded-lg bg-[#0D2731] text-[#22D3EE] mt-0.5 shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F8FAFC]">AI / ML</h4>
                  <p className="text-[11px] text-[#64748B]">Predictive models &amp; GenAI</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)]">
                <div className="p-1.5 rounded-lg bg-[#172338] text-[#3B82F6] mt-0.5 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F8FAFC]">Full-Stack Web</h4>
                  <p className="text-[11px] text-[#64748B]">Next.js &amp; Microservices</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)]">
                <div className="p-1.5 rounded-lg bg-[#172338] text-[#F59E0B] mt-0.5 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F8FAFC]">IoT Hardware</h4>
                  <p className="text-[11px] text-[#64748B]">NodeMCU &amp; PWM Telemetry</p>
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
                className="glass-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] hover:shadow-[0_16px_45px_rgba(34,211,238,0.08)] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-medium text-[#64748B] uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#22D3EE]/40 group-hover:bg-[#22D3EE] group-hover:shadow-[0_0_8px_#22D3EE] transition-colors" />
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight group-hover:text-[#22D3EE] transition-colors">
                    {stat.value}
                  </div>
                  <p className="text-xs text-[#A7B4C7] mt-1 font-medium">{stat.detail}</p>
                </div>
              </motion.div>
            ))}

            {/* Quick highlight banner spanning 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="col-span-2 glass-panel p-4.5 rounded-2xl border border-[rgba(34,211,238,0.25)] flex items-center gap-3 bg-[#0D1626]/90 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            >
              <div className="p-2.5 rounded-xl bg-[#22D3EE] text-[#061018] shrink-0 font-bold shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                <Rocket className="w-4 h-4" />
              </div>
              <p className="text-xs text-[#A7B4C7] leading-snug">
                Actively seeking technical internships, hackathons, and collaborative engineering projects bridging AI and IoT.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
