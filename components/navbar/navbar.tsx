"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

interface NavbarProps {
  onOpenAssistant: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Journey", href: "/journey" },
  { label: "Education", href: "/education" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ onOpenAssistant }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#070B14]/85 backdrop-blur-[18px] border-b border-[rgba(148,163,184,0.12)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "py-4 bg-[#070B14]/60 backdrop-blur-[18px] border-b border-[rgba(148,163,184,0.08)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Animated Brand Logo */}
        <Link
          href="/"
          aria-label="Vijay Kumar - Portfolio Home"
          className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1 select-none shrink-0"
        >
          <div className="relative flex items-center justify-center w-9 h-9 shrink-0 rounded-xl bg-gradient-to-tr from-[#22D3EE] to-[#2563EB] text-[#061018] font-extrabold text-sm shadow-[0_8px_30px_rgba(34,211,238,0.16)] group-hover:scale-105 transition-all duration-300">
            <span>VK</span>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
          </div>
          <div className="flex flex-col min-w-0 justify-center text-left">
            <span className="font-bold text-xs sm:text-sm tracking-tight text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors leading-snug whitespace-nowrap">
              Vijay Kumar
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#A7B4C7] font-mono tracking-wider uppercase leading-none mt-0.5 whitespace-nowrap">
              CSE-IOT • AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Floating Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0B1220]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[rgba(148,163,184,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-[#22D3EE] font-semibold"
                    : "text-[#A7B4C7] hover:text-[#F8FAFC] hover:bg-[#172338]/40"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-cyan-950/40 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.15)] -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* AI Assistant Quick Trigger */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#22D3EE] bg-[#121C2D] hover:bg-[#172338] border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.10)] group"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Ask</span> Vijay AI
          </button>

          {/* Obsidian Electric Cyan Connect Button */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full text-xs font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] shadow-[0_10px_30px_rgba(34,211,238,0.18)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
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
            className="md:hidden bg-[#070B14]/95 backdrop-blur-xl border-b border-[rgba(148,163,184,0.12)] px-4 pt-3 pb-6 overflow-hidden mt-2 shadow-2xl"
          >
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#121C2D] text-[#22D3EE] font-semibold border border-cyan-500/30"
                        : "text-[#A7B4C7] hover:bg-[#121C2D] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAssistant();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium text-[#22D3EE] bg-[#121C2D] border border-cyan-500/30"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Chat with Vijay AI
                </button>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-bold text-[#061018] bg-[#22D3EE]"
                >
                  <span>Connect with Vijay</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
