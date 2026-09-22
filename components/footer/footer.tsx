"use client";

import { ArrowUp, Github, Linkedin, Mail, Heart } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-white border-t border-slate-200/80 pt-16 pb-12 overflow-hidden">
      {/* Animated gradient accent top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-100">
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center">
                VK
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
              {PERSONAL_INFO.title} • {PERSONAL_INFO.branch} at {PERSONAL_INFO.college} (Class of {PERSONAL_INFO.graduationYear}).
            </p>
            <p className="text-xs text-slate-400">
              Designed with a light-mode first SaaS aesthetic, Three.js WebGL, and Next.js.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-mono font-semibold text-slate-900 uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-600 transition-colors">Skills</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
              </li>
              <li>
                <a href="#journey" className="hover:text-blue-600 transition-colors">Journey</a>
              </li>
              <li>
                <a href="#education" className="hover:text-blue-600 transition-colors">Education</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-slate-900 uppercase tracking-wider block md:text-right">
                Connect
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.social.email}`}
                  className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {PERSONAL_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Engineered with precision for real-world impact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
