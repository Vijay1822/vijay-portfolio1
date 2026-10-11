"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Sparkles, RotateCcw, Bot, Terminal, Cpu, ArrowUpRight } from "lucide-react";
import { AvatarSpeechBubble } from "./AvatarSpeechBubble";

interface DeveloperAvatarProps {
  onOpenAssistant?: () => void;
  size?: "default" | "compact";
}

interface TechNode {
  id: string;
  label: string;
  tag: string;
  tooltip: string;
  href: string;
  icon: typeof Bot;
  positionClasses: string;
}

const TECH_NODES: TechNode[] = [
  {
    id: "ai-agents",
    label: "AI Agents",
    tag: "LangGraph • RAG",
    tooltip: "Autonomous multi-agent architectures & LLM orchestration",
    href: "/projects",
    icon: Bot,
    positionClasses: "top-14 -left-3 sm:-left-8",
  },
  {
    id: "full-stack",
    label: "Full-Stack",
    tag: "Next.js • Python",
    tooltip: "High-performance full-stack web applications & scalable APIs",
    href: "/skills",
    icon: Terminal,
    positionClasses: "bottom-24 -left-3 sm:-left-8",
  },
  {
    id: "iot-systems",
    label: "IoT & Edge",
    tag: "Telemetry • CSE",
    tooltip: "Embedded edge computing, sensors & real-time telemetry",
    href: "/projects",
    icon: Cpu,
    positionClasses: "top-28 -right-3 sm:-right-8",
  },
];

export function DeveloperAvatar({ onOpenAssistant, size = "default" }: DeveloperAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Image load state with reliable fallback to prevent broken-image outlines
  const [imgSrc, setImgSrc] = useState<string>("/images/avatar-developer-3d.png");
  const [hasImageLoaded, setHasImageLoaded] = useState<boolean>(true);
  const [activeNodeTooltip, setActiveNodeTooltip] = useState<string | null>(null);

  // Cinematic Welcome Sequence States
  const [speechHeading, setSpeechHeading] = useState<string>("");
  const [speechLine1, setSpeechLine1] = useState<string>("");
  const [speechLine2, setSpeechLine2] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isBubbleVisible, setIsBubbleVisible] = useState<boolean>(false);
  const [showQuickActions, setShowQuickActions] = useState<boolean>(false);
  const [isAcknowledging, setIsAcknowledging] = useState<boolean>(false);

  // Desktop Pointer Tracking with Restrained 2.5° Spring Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 32, stiffness: 180, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Subdued, realistic rotation angles (max 2.5° to preserve facial realism)
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-2.5, 2.5]);
  const rotateX = useTransform(smoothMouseY, [-1, 1], [2.2, -2.2]);
  const translateX = useTransform(smoothMouseX, [-1, 1], [-5, 5]);
  const translateY = useTransform(smoothMouseY, [-1, 1], [-4, 4]);

  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsPointerDevice(isFine && !reducedMotion);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isPointerDevice || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 2);
      mouseY.set(y * 2);
    },
    [isPointerDevice, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Visual typewriter effect for welcome greeting
  const typeOut = useCallback(
    (text: string, setter: (val: string) => void, speed = 28): Promise<void> => {
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
    setIsBubbleVisible(false);
    setShowQuickActions(false);
    setSpeechHeading("");
    setSpeechLine1("");
    setSpeechLine2("");
    setIsAcknowledging(false);

    await new Promise((r) => setTimeout(r, 300));
    setIsBubbleVisible(true);

    // Line 1: "Hey! I'm Vijay 👋"
    await typeOut("Hey! I'm Vijay 👋", setSpeechHeading, 30);
    await new Promise((r) => setTimeout(r, 450));

    // Line 2: "AI Engineer • Full-Stack Developer"
    await typeOut("AI Engineer • Full-Stack Developer", setSpeechLine1, 26);
    await new Promise((r) => setTimeout(r, 550));

    // Line 3: "Welcome to my Command Center workspace."
    await typeOut("Welcome to my interactive workspace. Feel free to explore!", setSpeechLine2, 24);

    setShowQuickActions(true);
  }, [typeOut]);

  // Initial gentle mount greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      runCinematicSequence();
    }, 500);
    return () => clearTimeout(timer);
  }, [runCinematicSequence]);

  // Click Interaction: acknowledged wave & bubble open
  const handleAvatarClick = () => {
    setIsAcknowledging(true);
    setTimeout(() => setIsAcknowledging(false), 1400);

    setIsBubbleVisible(true);
    setShowQuickActions(true);
    setSpeechHeading("Hey! I'm Vijay 👋");
    setSpeechLine1("AI Engineer • Full-Stack Developer");
    setSpeechLine2("What would you like to explore today?");
  };

  const isCompact = size === "compact";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full ${
        isCompact ? "min-h-[380px]" : "min-h-[440px] sm:min-h-[500px]"
      } flex items-center justify-center select-none`}
      style={{ perspective: 1200 }}
    >
      {/* 1. Ambient Command Center Cyan Backlight Glow */}
      <div className="absolute inset-0 -z-20 flex items-center justify-center pointer-events-none">
        <div className="w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18)_0%,rgba(56,217,232,0.06)_50%,transparent_75%)] blur-3xl animate-pulse-subtle" />
      </div>

      {/* 2. Floating Speech Bubble Greeting */}
      <AvatarSpeechBubble
        isVisible={isBubbleVisible}
        heading={speechHeading}
        line1={speechLine1}
        line2={speechLine2}
        isTyping={isTyping}
        showQuickActions={showQuickActions}
        onCloseBubble={() => setIsBubbleVisible(false)}
        onOpenAssistant={() => {
          if (onOpenAssistant) {
            onOpenAssistant();
          } else if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("open-ai-assistant"));
          }
        }}
      />

      {/* 3. Interactive Technical Nodes (Phase 7) */}
      {TECH_NODES.map((node) => {
        const IconComponent = node.icon;
        const isHovered = activeNodeTooltip === node.id;

        return (
          <div
            key={node.id}
            className={`absolute ${node.positionClasses} z-30 hidden sm:block`}
          >
            <Link
              href={node.href}
              prefetch={true}
              onMouseEnter={() => setActiveNodeTooltip(node.id)}
              onMouseLeave={() => setActiveNodeTooltip(null)}
              onFocus={() => setActiveNodeTooltip(node.id)}
              onBlur={() => setActiveNodeTooltip(null)}
              className="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B1220]/90 hover:bg-[#0F172A] border border-[rgba(56,217,232,0.22)] hover:border-[#22D3EE] active:scale-95 active:opacity-90 shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/40"
              aria-label={`${node.label} - ${node.tooltip}`}
            >
              <div className="w-5 h-5 rounded-lg bg-[#070B14] border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] group-hover:scale-110 transition-transform">
                <IconComponent className="w-3 h-3" />
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[11px] font-bold text-[#F5F7FA] group-hover:text-[#22D3EE] transition-colors">
                  {node.label}
                </span>
                <span className="text-[9px] font-mono text-[#A8B8CC] mt-0.5">
                  {node.tag}
                </span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-[#A8B8CC] group-hover:text-[#22D3EE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all opacity-0 group-hover:opacity-100" />
            </Link>

            {/* Micro Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-48 px-2.5 py-1.5 rounded-lg bg-[#070B14]/95 border border-[rgba(56,217,232,0.3)] shadow-[0_10px_25px_rgba(0,0,0,0.7)] text-[10px] text-[#A8B8CC] leading-tight text-center pointer-events-none backdrop-blur-lg z-40"
                >
                  {node.tooltip}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* 4. Realistic Portrait Frame with Restrained Tilt & Layered Shadows */}
      <motion.div
        onClick={handleAvatarClick}
        style={
          isPointerDevice
            ? {
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
        initial={false}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full ${
          isCompact
            ? "max-w-[290px] h-[370px]"
            : "max-w-[340px] sm:max-w-[390px] md:max-w-[410px] h-[430px] sm:h-[475px]"
        } flex items-center justify-center cursor-pointer group`}
        title="Click to interact with Vijay's Command Center Digital Twin"
        aria-label="Interactive Digital Twin of Mamidala Vijay Kumar"
      >
        {/* Soft bottom contact shadow */}
        <div className="absolute -bottom-4 w-4/5 h-8 bg-[#000000]/70 rounded-full blur-xl pointer-events-none -z-10" />

        {/* Ambient rim glow behind frame */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#22D3EE]/15 via-transparent to-[#3B82F6]/10 opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none -z-10" />

        {/* 5. Portrait Card Frame — Dark Navy Glass Backplate */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#080D1C] border border-[rgba(56,217,232,0.22)] group-hover:border-[rgba(56,217,232,0.5)] shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_35px_rgba(34,211,238,0.12)] transition-all duration-500">
          {/* Subtle Top-Right Ambient Specular Accent */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#22D3EE]/15 blur-2xl pointer-events-none z-10" />

          {/* Genuine Portrait of Vijay with smooth loading and graceful dark fallback */}
          <div className="relative w-full h-full bg-[#080D1C] overflow-hidden">
            <motion.img
              src={imgSrc}
              alt="Mamidala Vijay Kumar - AI Engineer & Full-Stack Developer"
              onLoad={() => setHasImageLoaded(true)}
              onError={() => {
                // Graceful fallback to secondary local photo if first asset is unavailable
                if (imgSrc !== "/images/vijay.png") {
                  setImgSrc("/images/vijay.png");
                }
              }}
              className="w-full h-full object-cover object-top select-none filter contrast-[1.03] brightness-[1.02] transition-transform duration-500 group-hover:scale-[1.02]"
              draggable={false}
            />
          </div>

          {/* Gentle Bottom Gradient Fade into Dark Navy Theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D1C] via-[#080D1C]/40 to-transparent pointer-events-none z-10" />

          {/* Subtle Cyber Grid Telemetry Overlay */}
          <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none z-10" />

          {/* Top-Left Pill: Interactive Digital Twin */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#070B14]/85 border border-[rgba(56,217,232,0.35)] text-[10px] font-semibold text-[#22D3EE] shadow-[0_4px_12px_rgba(0,0,0,0.4)] backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#22D3EE]" />
            <span>Interactive Digital Twin</span>
          </div>

          {/* Top-Right Status Badge: ONLINE */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#070B14]/85 border border-[#34D399]/30 text-[10px] font-mono text-[#34D399] shadow-[0_4px_12px_rgba(0,0,0,0.4)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34D399]" />
            </span>
            <span>ONLINE</span>
          </div>

          {/* Bottom-Left Pill: Academic Identity */}
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#070B14]/90 border border-amber-500/30 text-[10px] font-semibold text-[#FBBF24] shadow-[0_4px_12px_rgba(0,0,0,0.4)] backdrop-blur-md pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span>VNR VJIET • CSE-IoT</span>
          </div>

          {/* Bottom-Right: Replay Welcome Intro Action */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              runCinematicSequence();
            }}
            className="absolute bottom-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#070B14]/90 hover:bg-[#121C2D] border border-[rgba(56,217,232,0.35)] hover:border-[#22D3EE] text-[10px] font-medium text-[#A8B8CC] hover:text-[#22D3EE] shadow-[0_4px_12px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all active:scale-95"
            title="Replay Welcome Greeting"
            aria-label="Replay Welcome Greeting"
          >
            <RotateCcw className="w-3 h-3 text-[#22D3EE]" />
            <span>Replay Intro</span>
          </button>
        </div>

        {/* Floating Wave Emojis during Click Acknowledgment */}
        <AnimatePresence>
          {isAcknowledging && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 0, x: -40 }}
                animate={{ opacity: 1, scale: 1.2, y: -45, x: -60 }}
                exit={{ opacity: 0, scale: 0.8, y: -65 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-12 left-6 pointer-events-none text-2xl z-30 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              >
                👋
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 0, x: 40 }}
                animate={{ opacity: 1, scale: 1.1, y: -40, x: 60 }}
                exit={{ opacity: 0, scale: 0.5, y: -55 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="absolute top-16 right-6 pointer-events-none text-xl z-30 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              >
                ✨
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export const InteractiveAvatar = DeveloperAvatar;
