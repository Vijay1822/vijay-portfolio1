"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";
import { Sparkles, RotateCcw, Bot, Terminal, Cpu } from "lucide-react";
import { AvatarSpeechBubble } from "./AvatarSpeechBubble";

interface DeveloperAvatarProps {
  onOpenAssistant?: () => void;
  size?: "default" | "compact";
}

export function DeveloperAvatar({ onOpenAssistant, size = "default" }: DeveloperAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interaction States
  const [phase, setPhase] = useState<"appear" | "settle" | "wave" | "speech" | "idle">("appear");
  const [speechHeading, setSpeechHeading] = useState<string>("");
  const [speechLine1, setSpeechLine1] = useState<string>("");
  const [speechLine2, setSpeechLine2] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isBubbleVisible, setIsBubbleVisible] = useState<boolean>(false);
  const [showQuickActions, setShowQuickActions] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showHoverPrompt, setShowHoverPrompt] = useState<boolean>(false);
  const [isAcknowledging, setIsAcknowledging] = useState<boolean>(false);

  // 3D Parallax Tilt Physics with Responsive Springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 190, mass: 0.45 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothMouseX, [-1, 1], [-16, 16]);
  const rotateX = useTransform(smoothMouseY, [-1, 1], [12, -12]);
  const translateX = useTransform(smoothMouseX, [-1, 1], [-14, 14]);
  const translateY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);
  const platformRotateX = useTransform(smoothMouseY, [-1, 1], [65, 55]);
  const shadowX = useTransform(smoothMouseX, [-1, 1], [22, -22]);
  const shadowY = useTransform(smoothMouseY, [-1, 1], [18, -18]);

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

  // Typewriter Text Effect (Zero Audio, Pure Visual)
  const typeOut = useCallback(
    (text: string, setter: (val: string) => void, speed = 32): Promise<void> => {
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

  // Cinematic Welcoming Sequence
  const runCinematicSequence = useCallback(async () => {
    setPhase("appear");
    setIsBubbleVisible(false);
    setShowQuickActions(false);
    setSpeechHeading("");
    setSpeechLine1("");
    setSpeechLine2("");
    setIsAcknowledging(false);

    await new Promise((r) => setTimeout(r, 500));
    setPhase("settle");
    await new Promise((r) => setTimeout(r, 500));

    setPhase("speech");
    setIsBubbleVisible(true);

    // Line 1: "Hey! I'm Vijay 👋"
    await typeOut("Hey! I'm Vijay 👋", setSpeechHeading, 35);
    await new Promise((r) => setTimeout(r, 600));

    // Line 2: "AI Engineer • Full-Stack Developer"
    await typeOut("AI Engineer • Full-Stack Developer", setSpeechLine1, 30);
    await new Promise((r) => setTimeout(r, 700));

    // Line 3: "Welcome to my interactive workspace."
    await typeOut("Welcome to my interactive workspace. Feel free to explore!", setSpeechLine2, 28);

    setShowQuickActions(true);
    setPhase("idle");

    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasWelcomedVijayAvatar", "true");
    }
  }, [typeOut]);

  // Session Check
  useEffect(() => {
    const hasWelcomed = typeof window !== "undefined" && sessionStorage.getItem("hasWelcomedVijayAvatar");
    if (hasWelcomed) {
      setPhase("idle");
      setIsBubbleVisible(false);
    } else {
      runCinematicSequence();
    }
  }, [runCinematicSequence]);

  // Click Interaction: acknowledged animation & open bubble
  const handleAvatarClick = () => {
    setIsAcknowledging(true);
    setTimeout(() => setIsAcknowledging(false), 1600);

    setIsBubbleVisible(true);
    setShowHoverPrompt(false);
    setShowQuickActions(true);
    setSpeechHeading("Hey! I'm Vijay 👋");
    setSpeechLine1("AI Engineer • Full-Stack Developer");
    setSpeechLine2("What would you like to explore today?");
  };

  // Hover Tooltip Trigger
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered && phase === "idle" && !isBubbleVisible && !showQuickActions) {
      timer = setTimeout(() => setShowHoverPrompt(true), 400);
    } else {
      setShowHoverPrompt(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered, phase, isBubbleVisible, showQuickActions]);

  // Three.js 3D Cyber Platform & Constellation Mesh
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 460;
    const height = canvas.clientHeight || 560;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch {
      return;
    }

    // 1. Futuristic Glowing Ring Platform (Pedestal at bottom)
    const ringGeometry = new THREE.RingGeometry(2.2, 2.32, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.3;
    ring.position.set(0, -3.2, 0);
    scene.add(ring);

    // Inner Amber Telemetry Ring
    const innerRingGeo = new THREE.RingGeometry(1.6, 1.68, 48);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 2.3;
    innerRing.position.set(0, -3.22, 0);
    scene.add(innerRing);

    // 2. Subtle Floating Ambient Cyber Particles
    const particleCount = 55;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.075,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow platform rotation & pulsation
      ring.rotation.z = elapsed * 0.15;
      innerRing.rotation.z = -elapsed * 0.2;
      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = Math.sin(elapsed * 0.05) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth || 460;
      const h = canvas.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      ringGeometry.dispose();
      ringMaterial.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  const isCompact = size === "compact";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full ${
        isCompact ? "min-h-[380px]" : "min-h-[480px] sm:min-h-[560px]"
      } flex items-center justify-center select-none`}
      style={{ perspective: 1200 }}
    >
      {/* Background Radial Aurora Glow */}
      <div className="absolute inset-0 -z-20 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-sky-500/15 to-amber-500/15 blur-3xl animate-pulse-subtle" />
      </div>

      {/* Three.js 3D Cyber Platform & Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      />

      {/* Floating Glassmorphic Speech Bubble */}
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

      {/* Hover Tooltip Prompt */}
      <AnimatePresence>
        {showHoverPrompt && !isBubbleVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            className="absolute top-6 right-2 sm:right-6 z-30 px-3.5 py-1.5 rounded-full bg-slate-900/90 shadow-[0_0_25px_rgba(6,182,212,0.35)] border border-cyan-500/40 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 pointer-events-none backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Click to interact with Vijay! ✨</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Interactive Character Card with Depth Parallax Physics */}
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
        className={`relative w-full ${
          isCompact ? "max-w-[320px] h-[400px]" : "max-w-[380px] sm:max-w-[440px] h-[480px] sm:h-[540px]"
        } flex items-center justify-center cursor-pointer group`}
        title="Click to interact with Vijay's 3D AI Engineer Avatar"
        aria-label="Interactive 3D Developer Avatar"
      >
        {/* Soft dynamic contact shadow */}
        <motion.div
          style={{
            x: shadowX,
            y: shadowY,
          }}
          className="absolute bottom-2 w-56 h-10 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none -z-10"
        />

        {/* Natural Idle Breathing & Click Acknowledgment Physics */}
        <motion.div
          animate={
            isAcknowledging
              ? {
                  scale: [1, 1.03, 0.99, 1],
                  y: [0, -8, 2, 0],
                  rotate: [0, -1.5, 1.5, 0],
                }
              : {
                  y: [0, -7, 0],
                  rotate: [0, 0.3, -0.3, 0],
                }
          }
          transition={
            isAcknowledging
              ? {
                  duration: 1.4,
                  ease: "easeInOut",
                  repeat: 0,
                }
              : {
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Futuristic Rounded Character Framing with Glass Backplate & Cyan Rim Glow */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden glass-card border border-slate-700/80 group-hover:border-cyan-500/50 group-hover:shadow-[0_20px_50px_rgba(6,182,212,0.3)] transition-all duration-500">
            {/* Ambient workspace background mesh */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent z-10 pointer-events-none opacity-80" />

            {/* High-Fidelity 3D Stylized Avatar of Vijay */}
            <motion.img
              src="/images/avatar-developer-3d.png"
              alt="Mamidala Vijay Kumar - AI Engineer & Full-Stack Developer 3D Avatar"
              className="w-full h-full object-cover object-center select-none filter contrast-[1.03] brightness-[1.02] transition-transform duration-500 group-hover:scale-[1.02]"
              draggable={false}
            />

            {/* Subtle Interactive Lighting Sheen Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-cyan-400/5 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

            {/* Futuristic Telemetry HUD Corner Accents */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* Interactive Floating Wave Emojis during Acknowledgment */}
          <AnimatePresence>
            {isAcknowledging && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 0, x: -60 }}
                  animate={{ opacity: 1, scale: 1.2, y: -45, x: -80 }}
                  exit={{ opacity: 0, scale: 0.8, y: -65 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute top-12 left-6 pointer-events-none text-2xl z-30 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                >
                  👋
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 0, x: 40 }}
                  animate={{ opacity: 1, scale: 1.1, y: -40, x: 60 }}
                  exit={{ opacity: 0, scale: 0.5, y: -55 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  className="absolute top-16 right-6 pointer-events-none text-xl z-30 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"
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
        className="absolute bottom-2 right-2 sm:right-4 bg-slate-900/85 hover:bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] z-20 active:scale-95 backdrop-blur-md"
        title="Replay Welcome Greeting"
      >
        <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
        <span>Replay Intro</span>
      </button>

      {/* Academic Specialization Pill */}
      <div className="absolute bottom-2 left-2 sm:left-4 bg-slate-900/85 border border-amber-500/30 px-3 py-1.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex items-center gap-2 text-xs font-semibold text-amber-300 pointer-events-none z-20 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#F59E0B]" />
        <span>VNR VJIET • CSE-IoT</span>
      </div>

      {/* 3D AI Engineer Digital Twin Pill */}
      <div className="absolute top-4 left-2 sm:left-4 bg-slate-900/85 border border-cyan-500/30 px-3 py-1.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex items-center gap-2 text-xs font-semibold text-cyan-300 pointer-events-none z-20 backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Interactive Digital Twin</span>
      </div>
    </div>
  );
}

// Reusable export alias as requested
export const InteractiveAvatar = DeveloperAvatar;
