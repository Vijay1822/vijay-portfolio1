"use client";

import { motion } from "framer-motion";
import { Milestone, Trophy, Award, Cpu, Code2, GraduationCap, CheckCircle2 } from "lucide-react";
import { ACHIEVEMENTS, AchievementItem } from "@/lib/data";

const CATEGORY_ICONS: Record<AchievementItem["category"], React.ElementType> = {
  Academic: GraduationCap,
  "ML Project": Code2,
  Hackathon: Trophy,
  Certification: Award,
  "IoT Hardware": Cpu,
};

export function Achievements() {
  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-4"
          >
            <Milestone className="w-3.5 h-3.5 text-indigo-600" />
            <span>Milestones & Growth</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            Journey So Far
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed"
          >
            An authentic chronological roadmap of my academic milestones, hands-on ML experimentation,
            hackathons, and hardware engineering progression.
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Connecting Vertical Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-400 to-slate-200" />

          <div className="space-y-12 sm:space-y-16">
            {ACHIEVEMENTS.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const IconComponent = CATEGORY_ICONS[item.category] || Milestone;

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
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-blue-600 shadow-md flex items-center justify-center text-blue-600 z-10">
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8 w-full">
                    <div className="glass-card p-6 rounded-2xl hover:border-blue-200 transition-all">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                          {item.year}
                        </span>
                        <span className="text-xs font-medium text-slate-500">{item.category}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1.5 pt-3 border-t border-slate-100">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
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
