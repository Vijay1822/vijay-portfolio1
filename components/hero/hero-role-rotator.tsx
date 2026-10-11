"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = [
  { article: "an", title: "AI Engineer" },
  { article: "a", title: "Full-Stack Developer" },
  { article: "an", title: "AI Agent Builder" },
  { article: "a", title: "Machine Learning Enthusiast" },
];

export function HeroRoleRotator() {
  const [index, setIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 3400);

    return () => clearInterval(interval);
  }, []);

  const currentRole = ROLES[index];

  if (prefersReducedMotion) {
    return (
      <div className="relative inline-flex items-center h-8 sm:h-9 md:h-10 mb-4">
        <span className="text-base sm:text-lg md:text-xl font-semibold text-[#F5F7FA] mr-2">
          I am an
        </span>
        <h2 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-[#22D3EE] via-[#38D9E8] to-[#3B82F6] bg-clip-text text-transparent">
          AI Engineer
        </h2>
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center h-8 sm:h-9 md:h-10 overflow-hidden mb-4 select-none">
      {/* Screen Reader Accessible Announcement */}
      <span className="sr-only" aria-live="polite">
        Current Role: I am {currentRole.article} {currentRole.title}
      </span>

      <span className="text-base sm:text-lg md:text-xl font-semibold text-[#F5F7FA] mr-2 shrink-0">
        I am
      </span>

      <div className="relative h-full flex items-center overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentRole.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center gap-2"
          >
            <span className="text-base sm:text-lg md:text-xl font-semibold text-[#A8B8CC]">
              {currentRole.article}
            </span>
            <h2 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-[#22D3EE] via-[#38D9E8] to-[#3B82F6] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.25)] whitespace-nowrap leading-none">
              {currentRole.title}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
