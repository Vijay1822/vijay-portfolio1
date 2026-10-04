"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  Sparkles,
  Printer,
  CheckCircle2,
  Share2,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Code2,
} from "lucide-react";

export function ResumeViewer() {
  const [viewMode, setViewMode] = useState<"interactive" | "pdf">("interactive");
  const [copied, setCopied] = useState(false);

  const resumePdfUrl = "/Mamidala_Vijay_Kumar_Resume.pdf";

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen py-10 relative overflow-hidden bg-[#0B1120]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] w-fit group"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          {/* Action Buttons: Download, Open in New Tab, Share */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setViewMode("interactive")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  viewMode === "interactive"
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Interactive
              </button>
              <button
                onClick={() => setViewMode("pdf")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  viewMode === "pdf"
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Original PDF
              </button>
            </div>

            {/* Open in New Tab Button */}
            <a
              href={resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>

            {/* Download Resume Button */}
            <a
              href={resumePdfUrl}
              download="Mamidala_Vijay_Kumar_Resume.pdf"
              className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] transition-all"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>

        {/* Document Viewer Container */}
        {viewMode === "pdf" ? (
          /* Embedded PDF Object View */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-[850px] rounded-3xl overflow-hidden glass-card border border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
          >
            <object
              data={`${resumePdfUrl}#toolbar=1&navpanes=0`}
              type="application/pdf"
              className="w-full h-full"
            >
              <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-300">
                <FileText className="w-12 h-12 text-cyan-400 mb-3" />
                <p className="text-sm font-semibold mb-4">
                  Unable to display PDF directly in your browser.
                </p>
                <a
                  href={resumePdfUrl}
                  download="Mamidala_Vijay_Kumar_Resume.pdf"
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Download Resume PDF
                </a>
              </div>
            </object>
          </motion.div>
        ) : (
          /* Interactive High-Fidelity Selectable Document View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[850px] mx-auto bg-[#FFFFFF] text-[#0F172A] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.6)] border border-slate-300 p-8 sm:p-12 selection:bg-cyan-500/20 selection:text-cyan-900 font-sans leading-normal"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            {/* Header: Name & Contact Info */}
            <div className="text-center mb-6 pb-4 border-b border-slate-200">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A365D] tracking-tight uppercase mb-1">
                MAMIDALA VIJAY KUMAR
              </h1>
              <p className="text-sm font-bold text-[#1E293B] mb-2">
                AI/ML Engineer | Generative AI | Full-Stack Developer
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#334155]">
                <span>7569032323</span>
                <span>•</span>
                <a
                  href="mailto:mamidalavijay04@gmail.com"
                  className="text-[#0D6EFD] hover:underline"
                >
                  mamidalavijay04@gmail.com
                </a>
                <span>•</span>
                <span>Hyderabad, Telangana</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#334155] mt-1">
                <a
                  href="https://github.com/Vijay1822"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0D6EFD] hover:underline font-medium"
                >
                  github.com/Vijay1822
                </a>
                <span>•</span>
                <a
                  href="https://www.linkedin.com/in/vijay-kumar-09b2bb36a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0D6EFD] hover:underline font-medium"
                >
                  linkedin.com/in/vijay-kumar-09b2bb36a
                </a>
              </div>
            </div>

            {/* 1. PROFESSIONAL SUMMARY */}
            <section className="mb-5">
              <h2 className="text-xs font-bold text-[#1A365D] uppercase tracking-wider border-b border-[#CBD5E1] pb-1 mb-2">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs text-[#1E293B] leading-relaxed text-justify">
                B.Tech Computer Science & Engineering (IoT) student at VNR VJIET with a 9.45 CGPA, focused on
                Artificial Intelligence, Generative AI, and full-stack development. Builds AI-powered web
                applications using Python, JavaScript, React, Node.js, MongoDB, RAG, and LLMs. Built and
                deployed BudgetMind, an AI-driven budget optimization and procurement memory platform. Participant
                in Smart India Hackathon and Adobe Hackathon; interested in AI agents and production-oriented
                software engineering.
              </p>
            </section>

            {/* 2. EDUCATION */}
            <section className="mb-5">
              <h2 className="text-xs font-bold text-[#1A365D] uppercase tracking-wider border-b border-[#CBD5E1] pb-1 mb-2">
                EDUCATION
              </h2>
              <div className="flex justify-between items-baseline mb-0.5">
                <span className="text-xs font-bold text-[#0F172A]">VNR VJIET, Hyderabad</span>
                <span className="text-xs font-bold text-[#0F172A]">Expected 2029</span>
              </div>
              <p className="text-xs text-[#1E293B] mb-0.5">
                B.Tech in Computer Science & Engineering (IoT)
              </p>
              <p className="text-xs text-[#334155]">
                <strong className="text-[#0F172A]">CGPA: 9.45/10</strong> |{" "}
                <strong className="text-[#0F172A]">Class XII:</strong> 992 marks |{" "}
                <strong className="text-[#0F172A]">Class X:</strong> 10.0 CGPA
              </p>
            </section>

            {/* 3. TECHNICAL SKILLS */}
            <section className="mb-5">
              <h2 className="text-xs font-bold text-[#1A365D] uppercase tracking-wider border-b border-[#CBD5E1] pb-1 mb-2">
                TECHNICAL SKILLS
              </h2>
              <div className="space-y-1 text-xs text-[#1E293B]">
                <p>
                  <strong className="text-[#0F172A]">Languages:</strong> Python, Java, C++, JavaScript
                </p>
                <p>
                  <strong className="text-[#0F172A]">Frontend:</strong> HTML, CSS, React
                </p>
                <p>
                  <strong className="text-[#0F172A]">Backend:</strong> Node.js, Express.js
                </p>
                <p>
                  <strong className="text-[#0F172A]">AI/ML:</strong> Machine Learning, Generative AI, LLMs,
                  Retrieval-Augmented Generation (RAG)
                </p>
                <p>
                  <strong className="text-[#0F172A]">Databases:</strong> MongoDB, Supabase, Firebase
                </p>
                <p>
                  <strong className="text-[#0F172A]">Tools & Platforms:</strong> Git, GitHub, Netlify,
                  Vercel, Arduino, Blynk
                </p>
              </div>
            </section>

            {/* 4. PROJECTS */}
            <section className="mb-5">
              <h2 className="text-xs font-bold text-[#1A365D] uppercase tracking-wider border-b border-[#CBD5E1] pb-1 mb-2">
                PROJECTS
              </h2>
              <div className="mb-3">
                <div className="flex flex-wrap justify-between items-baseline gap-1 mb-0.5">
                  <span className="text-xs font-bold text-[#0F172A]">
                    BudgetMind — AI Budget Optimizer & Procurement Memory Agent
                  </span>
                  <div className="text-xs font-semibold text-[#0D6EFD] space-x-1.5">
                    <a
                      href="https://github.com/Vijay1822/BudgetMind"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      GitHub
                    </a>
                    <span>|</span>
                    <a
                      href="https://budgetmind3.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
                <p className="text-xs italic text-[#475569] mb-1.5">
                  Python, JavaScript, React, Node.js, MongoDB, RAG, LLMs
                </p>
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#1E293B]">
                  <li>
                    Developed an AI-powered budgeting platform that analyzes requirements and available
                    budget to generate minimal, complete, value-focused spending plans.
                  </li>
                  <li>
                    Implemented procurement intelligence to flag unnecessary or duplicate expenses,
                    compare options, and account for recurring costs, hidden costs, and contingency
                    reserves.
                  </li>
                  <li>
                    Built memory-driven workflows that learn from past purchases, vendor experiences,
                    budget overruns, savings, and procurement outcomes.
                  </li>
                  <li>
                    Deployed the application as a live web platform on Netlify and maintained the codebase
                    on GitHub.
                  </li>
                </ul>
              </div>
            </section>

            {/* 5. HACKATHONS & COMPETITIONS */}
            <section className="mb-5">
              <h2 className="text-xs font-bold text-[#1A365D] uppercase tracking-wider border-b border-[#CBD5E1] pb-1 mb-2">
                HACKATHONS & COMPETITIONS
              </h2>
              <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#1E293B]">
                <li>
                  <strong className="text-[#0F172A]">Smart India Hackathon (SIH)</strong> — Participated in
                  a national-level innovation and problem-solving competition.
                </li>
                <li>
                  <strong className="text-[#0F172A]">Adobe Hackathon</strong> — Advanced to Round 2.
                </li>
              </ul>
            </section>

            {/* 6. CERTIFICATIONS */}
            <section className="mb-5">
              <h2 className="text-xs font-bold text-[#1A365D] uppercase tracking-wider border-b border-[#CBD5E1] pb-1 mb-2">
                CERTIFICATIONS
              </h2>
              <ul className="list-disc list-outside pl-4 text-xs text-[#1E293B]">
                <li>
                  <strong className="text-[#0F172A]">AI Full-Stack Web Development</strong>
                </li>
              </ul>
            </section>

            {/* 7. CODING PROFILES */}
            <section>
              <h2 className="text-xs font-bold text-[#1A365D] uppercase tracking-wider border-b border-[#CBD5E1] pb-1 mb-2">
                CODING PROFILES
              </h2>
              <ul className="list-disc list-outside pl-4 text-xs text-[#1E293B]">
                <li>
                  <strong className="text-[#0F172A]">LeetCode</strong> —{" "}
                  <a
                    href="https://leetcode.com/u/Vijay_kumar2008"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0D6EFD] hover:underline"
                  >
                    leetcode.com/u/Vijay_kumar2008
                  </a>
                </li>
              </ul>
            </section>
          </motion.div>
        )}
      </div>
    </div>
  );
}
