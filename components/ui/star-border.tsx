"use client";

import React from "react";

interface StarBorderProps {
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: string;
  glow?: boolean;
}

/**
 * StarBorder renders a subtle traveling star/beam highlight around the perimeter
 * of the element, using CSS mask-composite and a rotating conic gradient.
 * It is completely transparent in the interior, preserving backgrounds & glassmorphism.
 */
export function StarBorder({
  className = "",
  children,
  color = "#22D3EE",
  speed = "5s",
  glow = true,
}: StarBorderProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ isolation: "isolate" }}
    >
      {/* Decorative Star Border Highlight Overlay */}
      <div
        className="absolute inset-0 rounded-[inherit] p-[1.5px] pointer-events-none z-10 overflow-hidden"
        style={{
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-[-200%] animate-[spin_5s_linear_infinite] motion-reduce:animate-none opacity-80 hover:opacity-100 transition-opacity"
          style={{
            animationDuration: speed,
            background: `conic-gradient(from 0deg, transparent 0 310deg, rgba(34,211,238,0.2) 330deg, ${color} 350deg, #FFFFFF 356deg, ${color} 360deg)`,
            filter: glow ? "drop-shadow(0 0 6px rgba(34, 211, 238, 0.8))" : undefined,
          }}
        />
      </div>

      {children}
    </div>
  );
}
