"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function BackgroundMesh() {
  const [isInteractive, setIsInteractive] = useState(false);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springConfig = { damping: 45, stiffness: 180, mass: 1.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices with motion enabled
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setIsInteractive(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Offset relative to viewport
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Subtle Obsidian Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-35" />

      {/* Restrained Desktop Pointer-Following Cyan Aura */}
      {isInteractive && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="fixed top-0 left-0 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.05)_0%,transparent_70%)] blur-[90px] pointer-events-none hidden md:block"
        />
      )}

      {/* Upper-Left Electric Cyan Ambient Depth */}
      <motion.div
        animate={{
          x: [0, 35, -25, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-28 w-[580px] h-[580px] rounded-full bg-gradient-to-br from-[#22D3EE]/[0.07] via-[#3B82F6]/[0.04] to-transparent blur-[140px]"
      />

      {/* Right Deep Blue Ambient Depth */}
      <motion.div
        animate={{
          x: [0, -45, 30, 0],
          y: [0, 35, -30, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -right-40 w-[620px] h-[620px] rounded-full bg-gradient-to-bl from-[#2563EB]/[0.06] via-[#3B82F6]/[0.035] to-transparent blur-[150px]"
      />

      {/* Lower Electric Cyan & Blue Glow */}
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -25, 30, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-4 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#22D3EE]/[0.04] via-[#2563EB]/[0.03] to-transparent blur-[140px]"
      />

      {/* Top subtle cyan light flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-[#22D3EE]/[0.04] via-transparent to-transparent" />
    </div>
  );
}
