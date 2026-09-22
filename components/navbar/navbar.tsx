"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

interface NavbarProps {
  onOpenAssistant: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ onOpenAssistant }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 glass-panel border-b shadow-sm"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Animated Brand Logo */}
        <a
          href="#home"
          className="group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform duration-300">
            <span>VK</span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              {PERSONAL_INFO.preferredName}
              <span className="text-blue-600">.</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase -mt-0.5">
              CSE-IoT • AI
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-blue-50/90 border border-blue-200/60 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* AI Assistant Quick Trigger */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-blue-700 bg-blue-50/90 hover:bg-blue-100/80 border border-blue-200/80 transition-all shadow-2xs hover:shadow-xs group"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Ask</span> Vijay AI
          </button>

          {/* Connect Button */}
          <a
            href="#contact"
            className="hidden lg:inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 transition-colors duration-200 shadow-sm"
          >
            <span>Connect</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden glass-panel border-b border-slate-200/80 px-4 pt-3 pb-6 overflow-hidden mt-2"
          >
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.href.substring(1)
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-200/60 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAssistant();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Chat with Vijay AI
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
