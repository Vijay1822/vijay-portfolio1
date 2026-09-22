"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";
import { Sparkles, RotateCcw } from "lucide-react";
import { AvatarSpeechBubble } from "./AvatarSpeechBubble";

interface DeveloperAvatarProps {
  onOpenAssistant?: () => void;
}

export function DeveloperAvatar({ onOpenAssistant }: DeveloperAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interaction & Greeting States
  const [phase, setPhase] = useState<"appear" | "settle" | "wave" | "speech" | "idle">("appear");
  const [speechHeading, setSpeechHeading] = useState<string>("");
  const [speechLine1, setSpeechLine1] = useState<string>("");
  const [speechLine2, setSpeechLine2] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isBubbleVisible, setIsBubbleVisible] = useState<boolean>(false);
  const [showQuickActions, setShowQuickActions] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showHoverPrompt, setShowHoverPrompt] = useState<boolean>(false);
  const [isWaving, setIsWaving] = useState<boolean>(false);

  // 3D Parallax Tilt Physics with Framer Motion Spring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothMouseX, [-1, 1], [-14, 14]);
  const rotateX = useTransform(smoothMouseY, [-1, 1], [10, -10]);
  const translateX = useTransform(smoothMouseX, [-1, 1], [-12, 12]);
  const translateY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);
  const shadowX = useTransform(smoothMouseX, [-1, 1], [18, -18]);
  const shadowY = useTransform(smoothMouseY, [-1, 1], [15, -15]);

  // Handle Mouse Tracking
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 2);
      mouseY.set(y * 2);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setShowHoverPrompt(false);
  }, [mouseX, mouseY]);

  // Typewriter Text Effect (Purely Visual, ZERO Audio)
  const typeOut = useCallback(
    (text: string, setter: (val: string) => void, speed = 35): Promise<void> => {
      return new Promise((resolve) => {
        let current = "";
        let index = 0;
        setIsTyping(true);
        const interval = setInterval(() => {
          if (index < text.length) {
            current += text[index];
            setter(current);
            index++;
          } else {
            clearInterval(interval);
            setIsTyping(false);
            resolve();
          }
        }, speed);
      });
    },
    []
  );

  // Cinematic Welcoming Sequence (0.0s – 4.5s)
  const runCinematicSequence = useCallback(async () => {
    // 0.0s - 0.5s: Appear
    setPhase("appear");
    setIsBubbleVisible(false);
    setShowQuickActions(false);
    setSpeechHeading("");
    setSpeechLine1("");
    setSpeechLine2("");
    setIsWaving(false);

    await new Promise((r) => setTimeout(r, 600));

    // 0.6s - 1.2s: Settle into position
    setPhase("settle");
    await new Promise((r) => setTimeout(r, 600));

    // 1.2s - 2.4s: Friendly greeting wave
    setPhase("wave");
    setIsWaving(true);
    await new Promise((r) => setTimeout(r, 500));

    // 1.7s - 4.5s: Glassmorphic speech bubble typing
    setPhase("speech");
    setIsBubbleVisible(true);

    // Line 1: "Hi! I'm Vijay 👋"
    await typeOut("Hi! I'm Vijay 👋", setSpeechHeading, 40);
    await new Promise((r) => setTimeout(r, 700));

    // Line 2: "Welcome to my portfolio."
    await typeOut("Welcome to my portfolio.", setSpeechLine1, 35);
    await new Promise((r) => setTimeout(r, 800));

    // Line 3: "Have a look around! ✨"
    await typeOut("Have a look around! ✨", setSpeechLine2, 35);

    // Conclude wave motion smoothly
    setIsWaving(false);

    // Let user read message, then transition to idle
    await new Promise((r) => setTimeout(r, 2600));
    setIsBubbleVisible(false);
    setPhase("idle");

    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasWelcomedVijayAvatar", "true");
    }
  }, [typeOut]);

  // Session Check: Welcome visitor on first visit or idle if already greeted
  useEffect(() => {
    const hasWelcomed = typeof window !== "undefined" && sessionStorage.getItem("hasWelcomedVijayAvatar");
    if (hasWelcomed) {
      setPhase("idle");
      setIsBubbleVisible(false);
    } else {
      runCinematicSequence();
    }
  }, [runCinematicSequence]);

  // Click Interaction: wave and show quick actions
  const handleAvatarClick = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2000);

    setIsBubbleVisible(true);
    setShowHoverPrompt(false);
    setShowQuickActions(true);
    setSpeechHeading("What would you like to explore?");
    setSpeechLine1("Choose an area below:");
    setSpeechLine2("");
  };

  // Hover Tooltip Trigger
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered && phase === "idle" && !isBubbleVisible && !showQuickActions) {
      timer = setTimeout(() => setShowHoverPrompt(true), 450);
    } else {
      setShowHoverPrompt(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered, phase, isBubbleVisible, showQuickActions]);

  // Three.js Background Constellation Mesh (AI & IoT Developer Aesthetic)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 420;
    const height = canvas.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 8;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch {
      return;
    }

    // Interactive Particle Constellation Nodes
    const particleCount = 45;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      speeds[i] = 0.2 + Math.random() * 0.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = Math.sin(elapsed * 0.03) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth || 420;
      const h = canvas.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[460px] sm:min-h-[540px] flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* Background Radial Glow (Light Mode SaaS Aesthetic) */}
      <div className="absolute inset-0 -z-20 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 sm:w-[460px] sm:h-[460px] rounded-full bg-gradient-to-tr from-emerald-400/15 via-blue-500/12 to-cyan-400/15 blur-3xl animate-pulse-subtle" />
      </div>

      {/* Three.js Background Particle Constellation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      />

      {/* Floating Glassmorphic Speech Bubble (Pure Visual, ZERO Audio) */}
      <AvatarSpeechBubble
        isVisible={isBubbleVisible}
        heading={speechHeading}
        line1={speechLine1}
        line2={speechLine2}
        isTyping={isTyping}
        showQuickActions={showQuickActions}
        onCloseBubble={() => setIsBubbleVisible(false)}
        onOpenAssistant={onOpenAssistant}
      />

      {/* Hover Tooltip: "Want to explore? Click me!" */}
      <AnimatePresence>
        {showHoverPrompt && !isBubbleVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            className="absolute top-8 right-2 sm:right-6 z-30 px-3.5 py-1.5 rounded-full glass-panel shadow-md border border-blue-200 text-xs font-medium text-blue-700 flex items-center gap-1.5 pointer-events-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Want to explore? Click me! ✨</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Interactive Avatar Character with Spring Physics & Cursor Tracking */}
      <motion.div
        onClick={handleAvatarClick}
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative w-full max-w-[340px] sm:max-w-[380px] h-[460px] sm:h-[520px] flex items-center justify-center cursor-pointer group"
        title="Click to interact with Vijay's 3D Avatar"
        aria-label="Interactive 3D Developer Avatar"
      >
        {/* Subtle Ambient Drop Shadow under avatar */}
        <motion.div
          style={{
            x: shadowX,
            y: shadowY,
          }}
          className="absolute bottom-4 w-44 h-8 bg-slate-900/12 dark:bg-black/30 rounded-full blur-xl pointer-events-none -z-10"
        />

        {/* Breathing & Wave Animated Wrapper */}
        <motion.div
          animate={
            isWaving
              ? {
                  rotate: [0, -3.5, 4, -3.5, 2.5, 0],
                  scale: [1, 1.025, 1],
                  y: [0, -6, 0],
                }
              : {
                  y: [0, -8, 0],
                  rotate: [0, 0.4, -0.4, 0],
                }
          }
          transition={
            isWaving
              ? {
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: 0,
                }
              : {
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* High-Resolution 3D Stylized Developer Avatar */}
          <motion.img
            src="/images/avatar-developer-3d.png"
            alt="Mamidala Vijay Kumar - 3D Developer Avatar"
            className="w-full h-full object-contain filter drop-shadow-md select-none transition-transform duration-300 group-hover:scale-[1.015]"
            draggable={false}
            priority-load="true"
          />

          {/* Interactive Floating Wave Particles during Greeting */}
          <AnimatePresence>
            {isWaving && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 0, x: -60 }}
                  animate={{ opacity: 1, scale: 1.2, y: -45, x: -80 }}
                  exit={{ opacity: 0, scale: 0.8, y: -65 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute top-16 left-8 pointer-events-none text-2xl z-20"
                >
                  👋
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 0, x: -30 }}
                  animate={{ opacity: 1, scale: 1, y: -35, x: -40 }}
                  exit={{ opacity: 0, scale: 0.5, y: -50 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  className="absolute top-20 left-16 pointer-events-none text-xl z-20"
                >
                  ✨
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Replay Welcome Greeting Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          runCinematicSequence();
        }}
        className="absolute bottom-2 right-2 sm:right-4 glass-panel px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 hover:text-blue-600 hover:border-blue-300 flex items-center gap-1.5 transition-all shadow-xs hover:shadow-sm z-20 active:scale-95"
        title="Replay Welcome Greeting"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Replay Greeting</span>
      </button>

      {/* Academic / Specialization Badge */}
      <div className="absolute bottom-2 left-2 sm:left-4 glass-panel px-3 py-1.5 rounded-full shadow-xs flex items-center gap-2 text-xs font-medium text-slate-700 pointer-events-none z-20">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>VNR VJIET • CSE-IoT</span>
      </div>

      {/* 3D Developer Avatar Badge */}
      <div className="absolute top-4 left-2 sm:left-4 glass-panel px-3 py-1.5 rounded-full shadow-xs flex items-center gap-2 text-xs font-medium text-blue-700 pointer-events-none z-20">
        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
        <span>3D Developer Avatar</span>
      </div>
    </div>
  );
}
