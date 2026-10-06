"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/lib/data";

function LeetCodeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [botField, setBotField] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-Side Validation
    const errors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Please enter your message (at least 10 characters).";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSending(true);
    setSubmitError(null);

    // 2. Honeypot Spam Protection
    if (botField.trim()) {
      // Fake success for bots without triggering backend
      setTimeout(() => {
        setIsSending(false);
        setIsSubmitted(true);
      }, 500);
      return;
    }

    try {
      let isSuccessful = false;

      // Primary submission: Serverless API endpoint
      try {
        const apiRes = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            botField,
          }),
        });

        if (apiRes.ok) {
          isSuccessful = true;
        } else {
          const errData = await apiRes.json().catch(() => null);
          if (errData?.error) {
            setSubmitError(errData.error);
            setIsSending(false);
            return;
          }
        }
      } catch (apiErr) {
        console.warn("Direct API dispatch notice:", apiErr);
      }

      // Dual submission: Netlify Forms AJAX post (detected by Netlify in production)
      try {
        const netlifyBody = new URLSearchParams({
          "form-name": "contact",
          "bot-field": botField,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }).toString();

        const netlifyRes = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: netlifyBody,
        });

        if (netlifyRes.ok) {
          isSuccessful = true;
        }
      } catch (netlifyErr) {
        console.warn("Netlify form submission notice:", netlifyErr);
      }

      if (isSuccessful) {
        setSubmittedName(formData.name.trim());
        setIsSubmitted(true);

        // Celebration Confetti
        confetti({
          particleCount: 60,
          spread: 75,
          origin: { y: 0.7 },
          colors: ["#06B6D4", "#F59E0B", "#22D3EE", "#6366F1"],
        });
      } else {
        setSubmitError(
          "Something went wrong. Your message wasn't sent. Please try again or contact me directly at: mamidalavijay04@gmail.com"
        );
      }
    } catch {
      setSubmitError(
        "Something went wrong. Your message wasn't sent. Please try again or contact me directly at: mamidalavijay04@gmail.com"
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setFieldErrors({});
    setFormData({ name: "", email: "", subject: "", message: "" });
    setBotField("");
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0B1220] border-t border-[rgba(148,163,184,0.12)]">
      {/* Aurora Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#22D3EE]/[0.05] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-[#3B82F6]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.25)] mb-4 shadow-[0_0_12px_rgba(34,211,238,0.10)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Open for Opportunities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-4"
          >
            Let&apos;s Build Something Intelligent.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-[#A7B4C7] text-sm sm:text-base leading-relaxed max-w-2xl"
          >
            Whether you are looking to collaborate on high-impact AI/ML projects, discuss internship
            opportunities, build hackathon prototypes, or exchange engineering thoughts—my inbox is always open.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: Direct Links & Coordinates (Obsidian unified style) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <a
              href={`mailto:${PERSONAL_INFO.social.email}`}
              className="glass-card p-5 rounded-2xl flex items-center gap-4 group border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] hover:shadow-[0_16px_45px_rgba(34,211,238,0.08)] transition-all block"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0D1626] text-[#A7B4C7] border border-[rgba(148,163,184,0.12)] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[rgba(34,211,238,0.45)] group-hover:text-[#22D3EE] transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-mono font-medium text-[#64748B] uppercase tracking-wider block">
                  Direct Email
                </span>
                <span className="text-sm font-bold text-[#F8FAFC] truncate block group-hover:text-[#22D3EE] transition-colors">
                  {PERSONAL_INFO.social.email}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#22D3EE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 rounded-2xl flex items-center gap-4 group border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] hover:shadow-[0_16px_45px_rgba(34,211,238,0.08)] transition-all block"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0D1626] text-[#A7B4C7] border border-[rgba(148,163,184,0.12)] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[rgba(34,211,238,0.45)] group-hover:text-[#22D3EE] transition-all">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-mono font-medium text-[#64748B] uppercase tracking-wider block">
                  Professional Network
                </span>
                <span className="text-sm font-bold text-[#F8FAFC] truncate block group-hover:text-[#22D3EE] transition-colors">
                  linkedin.com/in/vijay-kumar...
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#22D3EE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>

            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 rounded-2xl flex items-center gap-4 group border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] hover:shadow-[0_16px_45px_rgba(34,211,238,0.08)] transition-all block"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0D1626] text-[#A7B4C7] border border-[rgba(148,163,184,0.12)] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[rgba(34,211,238,0.45)] group-hover:text-[#22D3EE] transition-all">
                <Github className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-mono font-medium text-[#64748B] uppercase tracking-wider block">
                  GitHub Profile
                </span>
                <span className="text-sm font-bold text-[#F8FAFC] truncate block group-hover:text-[#22D3EE] transition-colors">
                  {PERSONAL_INFO.social.handle}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#22D3EE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>

            {/* LeetCode Card */}
            <a
              href={PERSONAL_INFO.social.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Vijay Kumar's LeetCode profile"
              className="glass-card p-5 rounded-2xl flex items-center gap-4 group border border-[rgba(148,163,184,0.12)] hover:border-[rgba(34,211,238,0.45)] hover:shadow-[0_16px_45px_rgba(34,211,238,0.08)] transition-all block"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0D1626] text-[#A7B4C7] border border-[rgba(148,163,184,0.12)] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[rgba(34,211,238,0.45)] group-hover:text-[#22D3EE] transition-all">
                <LeetCodeIcon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-mono font-medium text-[#64748B] uppercase tracking-wider block">
                  LeetCode Profile
                </span>
                <span className="text-sm font-bold text-[#F8FAFC] truncate block group-hover:text-[#22D3EE] transition-colors">
                  {PERSONAL_INFO.social.leetcodeHandle}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#22D3EE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" aria-hidden="true" />
            </a>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl relative border border-[rgba(148,163,184,0.12)] shadow-[0_16px_45px_rgba(0,0,0,0.25)]">
            {isSubmitted ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#0D1626] text-[#34D399] border border-[#34D399]/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">Message Sent!</h3>
                <p className="text-sm text-[#A7B4C7] max-w-md mb-6 font-normal">
                  Thanks for reaching out, <span className="font-semibold text-[#F8FAFC]">{submittedName}</span>.
                  I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#172338] hover:bg-[#121C2D] text-[#F8FAFC] border border-[rgba(148,163,184,0.15)] transition-colors shadow-sm"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
              >
                {/* Netlify Form Identifier & Honeypot */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden className="hidden">
                  <label>
                    Don’t fill this out:{" "}
                    <input
                      name="bot-field"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                {/* Error Banner if Submission Failed */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-[#172338] border border-[#FB7185]/40 text-[#FB7185] text-xs sm:text-sm space-y-2"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[#FB7185]">
                      <AlertCircle className="w-4 h-4 text-[#FB7185] shrink-0" />
                      <span>Something went wrong.</span>
                    </div>
                    <p className="text-xs text-[#A7B4C7] leading-relaxed">
                      Your message wasn&apos;t sent. Please try again or contact me directly at:{" "}
                      <a
                        href="mailto:mamidalavijay04@gmail.com"
                        className="underline font-semibold text-[#F8FAFC]"
                      >
                        mamidalavijay04@gmail.com
                      </a>
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitError(null)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#FB7185]/20 hover:bg-[#FB7185]/30 text-[#FB7185] border border-[#FB7185]/40 transition-colors"
                    >
                      Try Again
                    </button>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label className="text-xs font-semibold text-[#A7B4C7] block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                      }}
                      placeholder="e.g. Alex Morgan"
                      className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-[#0D1626] border text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none transition-colors ${
                        fieldErrors.name
                          ? "border-[#FB7185] focus:ring-2 focus:ring-[#FB7185]/30"
                          : "border-[rgba(148,163,184,0.15)] focus:ring-2 focus:ring-[#22D3EE]/10 focus:border-[#22D3EE]"
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="text-xs text-[#FB7185] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{fieldErrors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="text-xs font-semibold text-[#A7B4C7] block mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                      }}
                      placeholder="alex@company.com"
                      className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-[#0D1626] border text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none transition-colors ${
                        fieldErrors.email
                          ? "border-[#FB7185] focus:ring-2 focus:ring-[#FB7185]/30"
                          : "border-[rgba(148,163,184,0.15)] focus:ring-2 focus:ring-[#22D3EE]/10 focus:border-[#22D3EE]"
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-xs text-[#FB7185] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{fieldErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="text-xs font-semibold text-[#A7B4C7] block mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Internship / Project Collaboration / Research"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.15)] text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/10 focus:border-[#22D3EE] transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="text-xs font-semibold text-[#A7B4C7] block mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: undefined });
                    }}
                    placeholder="Hi Vijay, I came across your portfolio and wanted to discuss..."
                    className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-[#0D1626] border text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none resize-none transition-colors ${
                      fieldErrors.message
                        ? "border-[#FB7185] focus:ring-2 focus:ring-[#FB7185]/30"
                        : "border-[rgba(148,163,184,0.15)] focus:ring-2 focus:ring-[#22D3EE]/10 focus:border-[#22D3EE]"
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="text-xs text-[#FB7185] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{fieldErrors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button with Loading State */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] hover:-translate-y-0.5 transition-all duration-200 shadow-[0_10px_30px_rgba(34,211,238,0.18)] flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#061018]" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
