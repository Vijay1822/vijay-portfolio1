"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
  isActive: boolean;
  onFinished?: () => void;
}

export function MatrixRain({ isActive, onFinished }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = setTimeout(() => onFinished?.(), 3000);
      return () => clearTimeout(timer);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Characters for the subtle digital stream
    const chars = "010101010101VIJAYKUMARAI_ML_IOT_REACT_NEXT_RAG_LLM_";
    const fontSize = 13;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -30);
    }

    let frameCount = 0;
    const render = () => {
      // Extremely restrained opacity to keep text crisp and legible
      ctx.fillStyle = "rgba(7, 11, 20, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(34, 211, 238, 0.28)"; // Subtle cyan-green stream
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      frameCount++;
      // Limit to 10 seconds (~600 frames at 60fps)
      if (frameCount < 540) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        onFinished?.();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive, onFinished]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
