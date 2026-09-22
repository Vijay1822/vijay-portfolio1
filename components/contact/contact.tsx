"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, Sparkles, CheckCircle2, MessageSquare, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/lib/data";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);

    // Trigger celebration confetti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#2563EB", "#6366F1", "#06B6D4"],
    });

    // Simulate sending & trigger default mail client with encoded body
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);

      const mailtoUrl = `mailto:${PERSONAL_INFO.social.email}?subject=${encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Hi Vijay,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`;

      window.open(mailtoUrl, "_blank");
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50/50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Open for Opportunities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            Let&apos;s Build Something Intelligent.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl"
          >
            Whether you are looking to collaborate on high-impact AI/ML projects, discuss internship
            opportunities, build hackathon prototypes, or exchange engineering thoughts—my inbox is always open.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: Direct Links & Coordinates */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <a
              href={`mailto:${PERSONAL_INFO.social.email}`}
              className="glass-card p-5 rounded-2xl flex items-center gap-4 group hover:border-blue-300 transition-all block"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-mono font-medium text-slate-400 uppercase tracking-wider block">
                  Direct Email
                </span>
                <span className="text-sm font-bold text-slate-900 truncate block group-hover:text-blue-600 transition-colors">
                  {PERSONAL_INFO.social.email}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 rounded-2xl flex items-center gap-4 group hover:border-blue-300 transition-all block"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-mono font-medium text-slate-400 uppercase tracking-wider block">
                  Professional Network
                </span>
                <span className="text-sm font-bold text-slate-900 truncate block group-hover:text-indigo-600 transition-colors">
                  linkedin.com/in/vijay-kumar...
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>

            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 rounded-2xl flex items-center gap-4 group hover:border-blue-300 transition-all block"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-slate-900 group-hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-mono font-medium text-slate-400 uppercase tracking-wider block">
                  GitHub Profile
                </span>
                <span className="text-sm font-bold text-slate-900 truncate block group-hover:text-slate-900 transition-colors">
                  {PERSONAL_INFO.social.handle}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl relative">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Message Dispatched!</h3>
                <p className="text-sm text-slate-600 max-w-md mb-6">
                  Thank you for reaching out. Your default email client was also prompted to send the message. I will respond to your email shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-blue-600 transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Internship / Project Collaboration / Hackathon"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Vijay, I came across your portfolio and wanted to discuss..."
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  <span>{isSending ? "Dispatching..." : "Send a Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
