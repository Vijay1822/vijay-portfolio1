"use client";

import { motion } from "framer-motion";
import { Milestone, Trophy, Award, Cpu, Code2, GraduationCap, CheckCircle2 } from "lucide-react";
import { ACHIEVEMENTS, AchievementItem } from "@/lib/data";

const CATEGORY_ICONS: Record<AchievementItem["category"], React.ElementType> = {
  Academic: GraduationCap,
  "ML Project": Code2,
  Hackathon: Trophy,
  "Hackathons & National Ideathons": Trophy,
  Certification: Award,
  "Certifications & Learning": Award,
  "IoT Hardware": Cpu,
};

export function Achievements() {
  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-[#0B1120] border-t border-slate-800/80">
      {/* Aurora Ambient Lighting */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <Milestone className="w-3.5 h-3.5 text-cyan-400" />
            <span>Milestones & Growth</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-4"
          >
            Journey So Far
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#94A3B8] text-sm sm:text-base leading-relaxed"
          >
            An authentic chronological roadmap of my academic milestones, hands-on ML experimentation,
            hackathons, and hardware engineering progression.
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Connecting Vertical Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-400 via-sky-400 to-amber-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]" />

          <div className="space-y-12 sm:space-y-16">
            {ACHIEVEMENTS.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const IconComponent = CATEGORY_ICONS[item.category] || Milestone;
              const isIoT = item.category === "IoT Hardware";
              const isML = item.category === "ML Project" || item.category === "Hackathon";

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Center Node Icon */}
                  <div
                    className={`absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#0F172A] border-2 shadow-lg flex items-center justify-center z-10 ${
                      isIoT
                        ? "border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                        : "border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8 w-full">
                    <div
                      className={`glass-card p-6 rounded-2xl transition-all group ${
                        isIoT
                          ? "hover:border-amber-500/50 hover:shadow-[0_15px_35px_-10px_rgba(245,158,11,0.2)]"
                          : "hover:border-cyan-500/50 hover:shadow-[0_15px_35px_-10px_rgba(6,182,212,0.2)]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${
                            isIoT
                              ? "bg-amber-950/80 text-amber-300 border-amber-500/40"
                              : "bg-cyan-950/80 text-cyan-300 border-cyan-500/40"
                          }`}
                        >
                          {item.year}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{item.category}</span>
                      </div>

                      <h3
                        className={`text-lg font-bold text-[#F8FAFC] mb-2 transition-colors ${
                          isIoT ? "group-hover:text-amber-300" : "group-hover:text-cyan-300"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-normal">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isIoT ? "text-amber-400" : "text-cyan-400"
                              }`}
                            />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
