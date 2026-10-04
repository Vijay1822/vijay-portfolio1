"use client";

import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail, Heart } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070B14] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden text-slate-300">
      {/* Animated Aurora Gradient Accent Top Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 text-slate-950 font-bold text-xs flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                VK
              </div>
              <span className="font-extrabold text-base tracking-tight text-[#F8FAFC]">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm font-normal">
              {PERSONAL_INFO.title} • {PERSONAL_INFO.branch} at {PERSONAL_INFO.college} (Class of {PERSONAL_INFO.graduationYear}).
            </p>
            <p className="text-xs text-slate-400 font-normal">
              Designed with a Midnight Slate & Aurora aesthetic, Three.js WebGL, and Next.js.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-mono font-semibold text-[#F8FAFC] uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-cyan-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition-colors">About</Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-cyan-300 transition-colors">Skills</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyan-300 transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/journey" className="hover:text-cyan-300 transition-colors">Journey</Link>
              </li>
              <li>
                <Link href="/education" className="hover:text-cyan-300 transition-colors">Education</Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-cyan-300 transition-colors">Resume</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-[#F8FAFC] uppercase tracking-wider block md:text-right">
                Connect
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.social.email}`}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-amber-400 hover:border-amber-500/50 hover:bg-slate-800 transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 {PERSONAL_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Engineered with precision for real-world impact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
