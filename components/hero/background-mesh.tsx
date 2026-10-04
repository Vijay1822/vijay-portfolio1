"use client";

import { motion } from "framer-motion";

export function BackgroundMesh() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Subtle Midnight Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60" />

      {/* Upper-Left Electric Cyan Aurora Orb */}
      <motion.div
        animate={{
          x: [0, 35, -25, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.12, 0.94, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-28 w-[580px] h-[580px] rounded-full bg-gradient-to-br from-cyan-500/18 via-sky-500/12 to-transparent blur-[130px]"
      />

      {/* Right Warm Solar Amber Aurora Orb */}
      <motion.div
        animate={{
          x: [0, -45, 30, 0],
          y: [0, 35, -30, 0],
          scale: [1, 0.92, 1.08, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -right-40 w-[620px] h-[620px] rounded-full bg-gradient-to-bl from-amber-500/15 via-amber-600/10 to-transparent blur-[140px]"
      />

      {/* Lower Subtle Indigo Aurora Glow */}
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -25, 30, 0],
          scale: [1, 1.06, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-4 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-600/14 via-violet-500/10 to-transparent blur-[140px]"
      />

      {/* Top subtle cyan light flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-cyan-500/8 via-transparent to-transparent" />
    </div>
  );
}
