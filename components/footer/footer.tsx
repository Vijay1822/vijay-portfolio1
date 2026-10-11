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
                <Link href="/" prefetch={true} className="hover:text-[#22D3EE] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" prefetch={true} className="hover:text-[#22D3EE] transition-colors">About</Link>
              </li>
              <li>
                <Link href="/skills" prefetch={true} className="hover:text-[#22D3EE] transition-colors">Skills</Link>
              </li>
              <li>
                <Link href="/projects" prefetch={true} className="hover:text-[#22D3EE] transition-colors">Projects</Link>
              </li>
              <li>
                <Link href="/journey" prefetch={true} className="hover:text-[#22D3EE] transition-colors">Journey</Link>
              </li>
              <li>
                <Link href="/education" prefetch={true} className="hover:text-[#22D3EE] transition-colors">Education</Link>
              </li>
              <li>
                <Link href="/resume" prefetch={true} className="hover:text-[#22D3EE] transition-colors">Resume</Link>
              </li>
              <li>
                <Link href="/contact" prefetch={true} className="hover:text-[#22D3EE] transition-colors">Contact</Link>
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
                  aria-label="GitHub Profile"
                  title="GitHub Profile (@Vijay1822)"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] text-[#A7B4C7] hover:text-[#22D3EE] hover:border-[rgba(34,211,238,0.45)] hover:bg-[#121C2D] transition-all"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.social.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] text-[#A7B4C7] hover:text-[#F59E0B] hover:border-[rgba(245,158,11,0.45)] hover:bg-[#121C2D] transition-all"
                  aria-label="LeetCode Profile"
                  title="LeetCode Profile (@Vijay_kumar2008)"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.social.email}`}
                  className="p-2.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)] text-[#A7B4C7] hover:text-[#F59E0B] hover:border-[rgba(245,158,11,0.45)] hover:bg-[#121C2D] transition-all"
                  aria-label="Send Email"
                  title="Send Email"
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
