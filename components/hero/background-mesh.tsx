"use client";

import { motion } from "framer-motion";

export function BackgroundMesh() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-70" />

      {/* Soft Blurred Ambient Glowing Orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-blue-400/12 via-indigo-300/10 to-transparent blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.92, 1.05, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-cyan-400/12 via-blue-300/10 to-transparent blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, 25, -25, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-violet-400/10 via-pink-200/5 to-transparent blur-[130px]"
      />

      {/* Top subtle light flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-blue-50/40 via-transparent to-transparent" />
    </div>
  );
}
