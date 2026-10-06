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
    <section id="journey" className="py-24 relative overflow-hidden bg-[#070B14] border-t border-[rgba(148,163,184,0.12)]">
      {/* Aurora Ambient Lighting */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#22D3EE]/[0.05] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#3B82F6]/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] mb-4 shadow-[0_0_12px_rgba(34,211,238,0.10)]"
          >
            <Milestone className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Milestones &amp; Growth</span>
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
            className="text-[#A7B4C7] text-sm sm:text-base leading-relaxed"
          >
            An authentic chronological roadmap of my academic milestones, hands-on ML experimentation,
            hackathons, and hardware engineering progression.
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Connecting Vertical Line: #1E293B base with subtle cyan accent */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#22D3EE] via-[#1E293B] to-[#1E293B]" />

          <div className="space-y-12 sm:space-y-16">
            {ACHIEVEMENTS.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const IconComponent = CATEGORY_ICONS[item.category] || Milestone;
              const isHighlight =
                item.category === "Hackathon" ||
                item.category === "Hackathons & National Ideathons" ||
                item.category === "Certification" ||
                item.category === "Certifications & Learning";
              const isRecent = idx === 0;

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
                    className={`absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#0D1626] border-2 shadow-lg flex items-center justify-center z-10 transition-all ${
                      isHighlight
                        ? "border-[#F59E0B] text-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                        : isRecent
                        ? "border-[#22D3EE] text-[#22D3EE] shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                        : "border-[#475569] text-[#A7B4C7]"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8 w-full">
                    <div
                      className={`glass-card p-6 rounded-2xl border border-[rgba(148,163,184,0.12)] transition-all group ${
                        isHighlight
                          ? "hover:border-[rgba(245,158,11,0.45)] hover:shadow-[0_16px_45px_rgba(245,158,11,0.08)]"
                          : "hover:border-[rgba(34,211,238,0.45)] hover:shadow-[0_16px_45px_rgba(34,211,238,0.08)]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${
                            isHighlight
                              ? "bg-[#172338] text-[#F59E0B] border-[rgba(245,158,11,0.25)]"
                              : "bg-[#0D1626] text-[#22D3EE] border-[rgba(34,211,238,0.25)]"
                          }`}
                        >
                          {item.year}
                        </span>
                        <span className="text-xs font-mono text-[#64748B]">{item.category}</span>
                      </div>

                      <h3
                        className={`text-lg font-bold text-[#F8FAFC] mb-2 transition-colors ${
                          isHighlight ? "group-hover:text-[#F59E0B]" : "group-hover:text-[#22D3EE]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#A7B4C7] leading-relaxed mb-4 font-normal">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1.5 pt-3 border-t border-[rgba(148,163,184,0.12)]">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#A7B4C7]">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isHighlight ? "text-[#F59E0B]" : "text-[#22D3EE]"
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
