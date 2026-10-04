"use client";

import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  ArrowUpRight,
  Mail,
  Linkedin,
  Github,
  Code2,
  GraduationCap,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

interface FormattedMessageProps {
  content: string;
  onNavigate?: (url: string) => void;
  onQuery?: (query: string) => void;
}

// Known technology / skill categories to detect and chip-ify
const TECH_CATEGORY_REGEX =
  /^(?:[*•\-\d.]*\s*)?(?:\*\*)?(Programming Languages|AI\s*(?:\/|&)?\s*Machine Learning|Frontend(?: Engineering)?|Backend(?: & Systems)?|Databases?(?: & Storage)?|IoT & Hardware(?: Interfacing)?|Tools & DevOps|Tech Stack|Core Technologies|Technologies Used)(?:\*\*)?\s*:\s*(.+)$/i;

// Clean text by stripping markdown artifacts
function cleanText(text: string): string {
  return text
    .replace(/^[*•\-\s]+/, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

// Parse inline formatting: **bold**, `code`, [links](url), and raw URLs
function renderInlineContent(text: string): React.ReactNode[] {
  // Regex to match:
  // 1. Markdown link: [label](url)
  // 2. Bold: **text**
  // 3. Code: `code`
  // 4. Raw URLs: https://... or mailto:...
  const tokenRegex =
    /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s<>)"]+|mailto:[^\s<>)"]+)/g;

  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // 1. Markdown link [Label](URL)
    const mdLinkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (mdLinkMatch) {
      const [, label, url] = mdLinkMatch;
      const isInternal = url.startsWith("/");
      const isMailto = url.startsWith("mailto:");

      return (
        <a
          key={idx}
          href={url}
          target={isInternal ? undefined : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
          className="inline-flex items-center gap-1 px-2 py-0.5 mx-0.5 rounded text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/90 hover:text-cyan-200 transition-colors"
        >
          <span>{label}</span>
          {isInternal ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : isMailto ? (
            <Mail className="w-3 h-3" />
          ) : (
            <ExternalLink className="w-3 h-3" />
          )}
        </a>
      );
    }

    // 2. Bold **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={idx} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // 3. Inline code `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[11px] border border-slate-700/80"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // 4. Raw URLs
    if (/^(https?:\/\/|mailto:)/i.test(part)) {
      let label = part;
      let isActionPill = false;

      if (part.includes("github.com/Vijay1822/BudgetMind")) {
        label = "BudgetMind GitHub →";
        isActionPill = true;
      } else if (part.includes("budgetmind3.netlify.app")) {
        label = "Live Demo →";
        isActionPill = true;
      } else if (part.includes("github.com/Vijay1822")) {
        label = "View GitHub →";
        isActionPill = true;
      } else if (part.includes("leetcode.com/u/Vijay_kumar2008")) {
        label = "View LeetCode →";
        isActionPill = true;
      } else if (part.includes("linkedin.com")) {
        label = "LinkedIn Profile →";
        isActionPill = true;
      } else if (part.startsWith("mailto:")) {
        label = part.replace("mailto:", "");
        isActionPill = true;
      }

      if (isActionPill) {
        return (
          <a
            key={idx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 my-0.5 rounded-lg text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/90 hover:border-cyan-400 transition-all shadow-sm"
          >
            <span>{label}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        );
      }

      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline hover:text-cyan-300 transition-colors break-all"
        >
          {part}
        </a>
      );
    }

    // Regular text (strip any lone stray raw asterisks or backticks)
    const cleaned = part.replace(/[*_~`]/g, "");
    return <React.Fragment key={idx}>{cleaned}</React.Fragment>;
  });
}

// Splits skill lists by comma, bullet, bracket, or separator into clean chips
function extractSkillChips(rawSkills: string): string[] {
  // If format is [Python] [Java] [TypeScript]
  const bracketMatches = rawSkills.match(/\[([^\]]+)\]/g);
  if (bracketMatches && bracketMatches.length > 0) {
    return bracketMatches.map((m) => m.replace(/[[\]]/g, "").trim()).filter(Boolean);
  }

  // Otherwise split by commas, bullet dots, slashes, or middots
  return rawSkills
    .split(/[,•·|;]+/)
    .map((s) => cleanText(s))
    .filter((s) => s.length > 0 && s !== "and");
}

export function FormattedMessage({ content, onNavigate, onQuery }: FormattedMessageProps) {
  if (!content) return null;

  // Split into lines while preserving paragraphs
  const rawLines = content.split("\n");

  const elements: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];

  const flushList = () => {
    if (currentListItems.length > 0) {
      elements.push(
        <div key={`list-${elements.length}`} className="my-2 space-y-1.5">
          {currentListItems}
        </div>
      );
      currentListItems = [];
    }
  };

  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i].trim();

    // Skip empty lines or horizontal rules (---)
    if (!rawLine || /^[-*_]{3,}$/.test(rawLine)) {
      flushList();
      continue;
    }

    // 1. Check for Technology Category with Chip List
    // e.g. "Programming Languages: Python, Java, TypeScript, JavaScript, C++"
    // or "* AI & Machine Learning: Machine Learning, Generative AI..."
    const techMatch = rawLine.match(TECH_CATEGORY_REGEX);
    if (techMatch) {
      flushList();
      const category = techMatch[1].replace(/[*_#]/g, "").trim();
      const chips = extractSkillChips(techMatch[2]);

      elements.push(
        <div key={`tech-${i}`} className="my-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
            <span>{category}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {chips.map((chip, cIdx) => (
              <span
                key={cIdx}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/90 text-slate-200 border border-slate-700/80 hover:border-cyan-500/50 hover:text-cyan-200 transition-all shadow-sm select-none"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      );
      continue;
    }

    // 2. Heading line detection (### Heading or ## Heading or # Heading)
    if (/^#{1,4}\s+/.test(rawLine)) {
      flushList();
      const headingText = rawLine.replace(/^#{1,4}\s+/, "").replace(/[*_]/g, "").trim();
      elements.push(
        <div key={`h-${i}`} className="mt-3.5 mb-1.5 flex items-center gap-2">
          <span className="w-1 h-3.5 bg-gradient-to-b from-cyan-400 to-sky-500 rounded-full shrink-0" />
          <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">{headingText}</h4>
        </div>
      );
      continue;
    }

    // 3. Pure stand-alone Category/Heading lines (e.g. "Programming Languages", "Education", "Contact Vijay")
    if (
      /^(?:Vijay's\s+)?(?:Technical\s+)?Skills$/i.test(rawLine) ||
      /^Education$/i.test(rawLine) ||
      /^Contact(?:\s+Vijay)?$/i.test(rawLine) ||
      /^Coding Profiles$/i.test(rawLine) ||
      /^Hackathons & Competitions$/i.test(rawLine) ||
      /^Certifications$/i.test(rawLine)
    ) {
      flushList();
      elements.push(
        <div key={`section-h-${i}`} className="mt-3 mb-1.5 flex items-center gap-2">
          <span className="w-1 h-3.5 bg-cyan-400 rounded-full shrink-0" />
          <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">{rawLine}</h4>
        </div>
      );
      continue;
    }

    // 4. Bullet point lines (starting with *, -, •, or numbering like 1., 2.)
    const bulletMatch = rawLine.match(/^([*•\-]|\d+\.)\s+(.+)$/);
    if (bulletMatch) {
      const lineText = bulletMatch[2];

      // Check if this bullet is actually a tech category
      const subTechMatch = lineText.match(TECH_CATEGORY_REGEX);
      if (subTechMatch) {
        flushList();
        const category = subTechMatch[1].replace(/[*_#]/g, "").trim();
        const chips = extractSkillChips(subTechMatch[2]);

        elements.push(
          <div key={`bullet-tech-${i}`} className="my-2 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{category}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {chips.map((chip, cIdx) => (
                <span
                  key={cIdx}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/90 text-slate-200 border border-slate-700/80"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        );
        continue;
      }

      currentListItems.push(
        <div key={`item-${i}`} className="flex items-start gap-2 leading-relaxed text-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
          <div className="flex-1">{renderInlineContent(lineText)}</div>
        </div>
      );
      continue;
    }

    // 5. Regular paragraph
    flushList();
    elements.push(
      <p key={`p-${i}`} className="leading-relaxed text-slate-200">
        {renderInlineContent(rawLine)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-2">{elements}</div>;
}
