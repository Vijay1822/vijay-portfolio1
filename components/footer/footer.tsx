"use client";

import Link from "next/link";
import { ArrowUp, Github, Linkedin, Mail, Heart } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070B14] border-t border-[rgba(148,163,184,0.10)] pt-16 pb-12 overflow-hidden text-[#A7B4C7]">
      {/* Subtle Cyan Ambient Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[rgba(34,211,238,0.3)] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[rgba(148,163,184,0.10)]">
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#2563EB] text-[#061018] font-bold text-xs flex items-center justify-center shadow-[0_8px_30px_rgba(34,211,238,0.16)]">
                VK
              </div>
              <span className="font-extrabold text-base tracking-tight text-[#F8FAFC]">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A7B4C7] max-w-sm font-normal">
              {PERSONAL_INFO.title} • {PERSONAL_INFO.branch} at {PERSONAL_INFO.college} (Class of {PERSONAL_INFO.graduationYear}).
            </p>
            <p className="text-xs text-[#64748B] font-normal">
              Engineered with Obsidian AI theme, responsive Next.js architectures, and interactive 3D WebGL.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-mono font-semibold text-[#F8FAFC] uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-1.5 text-xs text-[#A7B4C7]">
              <li>
                <Link href="/" className="hover:text-[#22D3EE] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#22D3EE] transition-colors">About</Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-[#22D3EE] transition-colors">Skills</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#22D3EE] transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/journey" className="hover:text-[#22D3EE] transition-colors">Journey</Link>
              </li>
              <li>
                <Link href="/education" className="hover:text-[#22D3EE] transition-colors">Education</Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-[#22D3EE] transition-colors">Resume</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#22D3EE] transition-colors">Contact</Link>
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
                  className="p-2.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] text-[#A7B4C7] hover:text-[#22D3EE] hover:border-[rgba(34,211,238,0.45)] hover:bg-[#121C2D] transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] text-[#A7B4C7] hover:text-[#22D3EE] hover:border-[rgba(34,211,238,0.45)] hover:bg-[#121C2D] transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.social.email}`}
                  className="p-2.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] text-[#A7B4C7] hover:text-[#F59E0B] hover:border-[rgba(245,158,11,0.45)] hover:bg-[#121C2D] transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#A7B4C7] bg-[#0D1626] hover:bg-[#121C2D] hover:text-[#F8FAFC] border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#22D3EE]" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© 2026 {PERSONAL_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[#64748B]">
            <span>Engineered with precision for real-world impact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
