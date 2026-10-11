"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  ArrowUpRight,
  FolderGit2,
  Sparkles,
  CheckCircle2,
  Github,
  Linkedin,
  Code2,
  FileText,
  Mail,
  Calendar,
  Layers,
  Terminal as TerminalIcon,
  HelpCircle,
  Bot,
  History,
  Award,
  Loader2,
} from "lucide-react";
import { TerminalOutputItem, CommandDefinition } from "./types";
import { Project, SkillCategory, AchievementItem } from "@/lib/data";
import { FormattedMessage } from "@/components/ai-assistant/FormattedMessage";

interface TerminalOutputProps {
  item: TerminalOutputItem;
  onExecuteCommand: (command: string) => void;
  onOpenProjectModal?: (project: Project) => void;
}

export function TerminalOutputRenderer({
  item,
  onExecuteCommand,
  onOpenProjectModal,
}: TerminalOutputProps) {
  const [activeSkillTooltip, setActiveSkillTooltip] = useState<string | null>(null);

  switch (item.type) {
    case "welcome":
      return (
        <div className="space-y-3 font-mono text-xs sm:text-sm py-2">
          <div className="text-[#22D3EE] font-bold tracking-widest text-[11px] sm:text-xs">
            V I J A Y &nbsp;/&nbsp; E N G I N E E R I N G &nbsp; T E R M I N A L &nbsp; [v2.4]
          </div>
          <div className="text-[#F8FAFC] font-medium leading-relaxed">
            Welcome, explorer.
            <br />
            I&apos;m <span className="text-[#22D3EE] font-bold">Vijay Kumar</span> — AI/ML + Full-Stack Developer.
            <br />
            Explore my projects, technical skills, resume, and coding profiles using commands below.
          </div>
          <div className="text-[#A7B4C7] text-xs pt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse inline-block" />
            <span>
              System ready. Type <span className="text-[#22D3EE] font-bold underline cursor-pointer" onClick={() => onExecuteCommand("help")}>help</span> or select a quick command to begin.
            </span>
          </div>
        </div>
      );

    case "whoami": {
      const p = item.payload;
      return (
        <div className="my-2 p-4 rounded-xl bg-[#0B1220] border border-[rgba(34,211,238,0.3)] shadow-[0_4px_25px_rgba(0,0,0,0.3)] max-w-xl">
          <div className="flex items-start gap-4">
            {p.avatarUrl && (
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#22D3EE]/50 shadow-[0_0_12px_rgba(34,211,238,0.25)] shrink-0 bg-[#070B14]">
                <img
                  src={p.avatarUrl}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#34D399] ring-2 ring-[#0B1220]" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-[#F8FAFC] font-extrabold text-sm sm:text-base tracking-tight">
                  {p.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#172338] text-[#22D3EE] border border-[#22D3EE]/30">
                  {p.cgpa}
                </span>
              </div>
              <p className="text-xs text-[#22D3EE] font-mono mt-0.5">{p.title}</p>
              <p className="text-[11px] text-[#A7B4C7] mt-1">
                {p.degree} • {p.branch}
                <br />
                <span className="text-[#F59E0B] font-medium">{p.college}</span> ({p.location})
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[rgba(148,163,184,0.12)]">
            <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block mb-1.5">
              Engineering Focus
            </span>
            <div className="flex flex-wrap gap-1.5">
              {p.specializations.map((spec: string, i: number) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#121C2D] text-[#A7B4C7] border border-[rgba(148,163,184,0.15)]"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3.5 flex items-center gap-2 pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] transition-all"
            >
              <span>About Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => onExecuteCommand("projects")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#A7B4C7] hover:text-[#22D3EE] bg-[#121C2D] hover:bg-[#172338] border border-[rgba(148,163,184,0.15)] transition-all"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Explore Projects</span>
            </button>
          </div>
        </div>
      );
    }

    case "about": {
      const p = item.payload;
      return (
        <div className="space-y-3 font-mono text-xs sm:text-sm my-2 max-w-2xl">
          <div className="text-[#22D3EE] font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>ABOUT VIJAY KUMAR — ENGINEERING PROFILE</span>
          </div>
          {p.paragraphs.map((para: string, idx: number) => (
            <p key={idx} className="text-[#A7B4C7] leading-relaxed text-xs sm:text-sm">
              {para}
            </p>
          ))}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {p.stats.map((s: any, idx: number) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-[#0B1220] border border-[rgba(148,163,184,0.12)] text-center"
              >
                <span className="text-[10px] text-[#64748B] block uppercase tracking-wider">
                  {s.label}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#22D3EE]">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-2 flex gap-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs text-[#22D3EE] hover:underline"
            >
              <span>Read Full Journey on /about</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      );
    }

    case "projects": {
      const { projects, filter } = item.payload;
      return (
        <div className="my-2 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#A7B4C7] pb-1 border-b border-[rgba(148,163,184,0.12)]">
            <span className="flex items-center gap-2 text-[#22D3EE] font-bold">
              <FolderGit2 className="w-4 h-4" />
              <span>
                ENGINEERING REPOSITORIES {filter === "featured" ? "(FEATURED)" : `(${projects.length})`}
              </span>
            </span>
            <span className="text-[10px] text-[#64748B]">
              Tip: Click actions to view demos &amp; source
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projects.map((proj: Project, idx: number) => (
              <div
                key={proj.id}
                className="group relative p-3.5 sm:p-4 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.15)] hover:border-[rgba(34,211,238,0.5)] shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_30px_rgba(34,211,238,0.12)] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono text-[#22D3EE] font-bold bg-[#121C2D] px-1.5 py-0.5 rounded border border-[#22D3EE]/25">
                      [{String(idx + 1).padStart(2, "0")}]
                    </span>
                    <span className="text-[10px] font-semibold text-[#F59E0B] bg-[#172338] px-2 py-0.5 rounded-full border border-[#F59E0B]/25">
                      {proj.badge}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors leading-tight mb-1">
                    {proj.title}
                  </h4>

                  <p className="text-xs text-[#A7B4C7] leading-relaxed line-clamp-2 mb-3">
                    {proj.tagline || proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {proj.techStack.slice(0, 5).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#121C2D] text-[#A7B4C7] group-hover:text-[#F8FAFC] border border-[rgba(148,163,184,0.12)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.techStack.length > 5 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#121C2D] text-[#64748B]">
                        +{proj.techStack.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-[rgba(148,163,184,0.1)] flex items-center gap-2 flex-wrap text-xs">
                  <Link
                    href={`/projects#${proj.id}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] transition-colors"
                  >
                    <span>Explore Project</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#A7B4C7] hover:text-[#F8FAFC] bg-[#121C2D] hover:bg-[#172338] border border-[rgba(148,163,184,0.15)] transition-colors"
                    >
                      <Github className="w-3 h-3" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {proj.liveDemoUrl && (
                    <a
                      href={proj.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#34D399] hover:text-white bg-[#0D2731] hover:bg-[#0D383D] border border-[#34D399]/30 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-1 flex items-center justify-between text-xs">
            <span className="text-[#64748B] font-mono text-[11px]">
              Type <code className="text-[#22D3EE]">projects --featured</code> to isolate spotlight systems.
            </span>
            <Link
              href="/projects"
              className="text-[#22D3EE] hover:underline inline-flex items-center gap-1 text-[11px] font-mono"
            >
              <span>View full projects catalog</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      );
    }

    case "project-detail": {
      const proj = item.payload as Project;
      return (
        <div className="my-2 p-4 rounded-xl bg-[#0B1220] border border-[rgba(34,211,238,0.4)] shadow-[0_4px_30px_rgba(0,0,0,0.4)] max-w-2xl space-y-3 font-mono">
          <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-[rgba(148,163,184,0.12)]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#22D3EE] bg-[#121C2D] px-2 py-0.5 rounded border border-[#22D3EE]/30">
                [PROJECT SPECIFICATION]
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-[#F8FAFC]">
                {proj.title}
              </h3>
            </div>
            <span className="text-[10px] font-semibold text-[#F59E0B] bg-[#172338] px-2.5 py-0.5 rounded-full border border-[#F59E0B]/30">
              {proj.badge}
            </span>
          </div>

          <p className="text-xs text-[#22D3EE] font-medium leading-relaxed">
            {proj.tagline}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#070B14] border border-[rgba(251,113,133,0.2)]">
              <span className="text-[10px] font-bold text-[#FB7185] block uppercase mb-1">
                Problem Statement
              </span>
              <p className="text-[11px] text-[#A7B4C7] leading-relaxed">
                {proj.problem}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-[#070B14] border border-[rgba(52,211,153,0.2)]">
              <span className="text-[10px] font-bold text-[#34D399] block uppercase mb-1">
                Engineered Solution
              </span>
              <p className="text-[11px] text-[#A7B4C7] leading-relaxed">
                {proj.solution}
              </p>
            </div>
          </div>

          {proj.architecture && (
            <div className="p-2.5 rounded-lg bg-[#070B14] border border-[rgba(148,163,184,0.1)] space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider block">
                Architecture &amp; Data Pipeline
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-[#A7B4C7]">
                <div><span className="text-[#22D3EE]">Frontend:</span> {proj.architecture.frontend}</div>
                <div><span className="text-[#22D3EE]">Backend:</span> {proj.architecture.backend}</div>
                <div><span className="text-[#22D3EE]">AI/IoT:</span> {proj.architecture.aiOrIot}</div>
                <div><span className="text-[#22D3EE]">Database:</span> {proj.architecture.database}</div>
              </div>
            </div>
          )}

          <div>
            <span className="text-[10px] text-[#64748B] block uppercase tracking-wider mb-1">
              Technology Stack
            </span>
            <div className="flex flex-wrap gap-1">
              {proj.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] bg-[#121C2D] text-[#F8FAFC] border border-[rgba(148,163,184,0.15)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {proj.metrics && proj.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {proj.metrics.map((m, idx) => (
                <div key={idx} className="p-1.5 rounded bg-[#121C2D] text-center border border-[rgba(148,163,184,0.1)]">
                  <span className="text-[9px] text-[#64748B] block">{m.label}</span>
                  <span className="text-xs font-bold text-[#22D3EE]">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-[rgba(148,163,184,0.12)] flex items-center gap-2 flex-wrap text-xs">
            <Link
              href={`/projects#${proj.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] transition-colors"
            >
              <span>Explore in Projects Page</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {proj.githubUrl && (
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#A7B4C7] hover:text-white bg-[#121C2D] hover:bg-[#172338] border border-[rgba(148,163,184,0.15)] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Source</span>
              </a>
            )}

            {proj.liveDemoUrl && (
              <a
                href={proj.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#34D399] hover:text-white bg-[#0D2731] hover:bg-[#0D383D] border border-[#34D399]/30 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Deployment</span>
              </a>
            )}
          </div>
        </div>
      );
    }

    case "skills": {
      const { categories, filter } = item.payload;
      return (
        <div className="my-2 space-y-3 font-mono">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-[rgba(148,163,184,0.12)]">
            <div className="text-xs text-[#22D3EE] font-bold flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              <span>TECHNICAL MATRIX {filter !== "all" ? `[${filter.toUpperCase()}]` : ""}</span>
            </div>

            {/* Quick Category Filters */}
            <div className="flex items-center gap-1 text-[11px]">
              <button
                onClick={() => onExecuteCommand("skills")}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  filter === "all"
                    ? "bg-[#22D3EE] text-[#061018]"
                    : "bg-[#121C2D] text-[#A7B4C7] hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => onExecuteCommand("skills --ai")}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  filter?.includes("AI")
                    ? "bg-[#22D3EE] text-[#061018]"
                    : "bg-[#121C2D] text-[#A7B4C7] hover:text-white"
                }`}
              >
                --ai
              </button>
              <button
                onClick={() => onExecuteCommand("skills --frontend")}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  filter?.includes("Frontend")
                    ? "bg-[#22D3EE] text-[#061018]"
                    : "bg-[#121C2D] text-[#A7B4C7] hover:text-white"
                }`}
              >
                --frontend
              </button>
              <button
                onClick={() => onExecuteCommand("skills --backend")}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  filter?.includes("Backend")
                    ? "bg-[#22D3EE] text-[#061018]"
                    : "bg-[#121C2D] text-[#A7B4C7] hover:text-white"
                }`}
              >
                --backend
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {categories.map((cat: SkillCategory, idx: number) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-xs font-bold text-[#F8FAFC] tracking-wide">
                    {cat.title}
                  </h5>
                  <span className="text-[10px] text-[#64748B]">
                    {cat.skills.length} competencies
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => {
                    const isTooltipOpen = activeSkillTooltip === skill.name;
                    return (
                      <button
                        key={sIdx}
                        onClick={() =>
                          setActiveSkillTooltip(isTooltipOpen ? null : skill.name)
                        }
                        className={`group relative px-2.5 py-1 rounded text-xs transition-all flex items-center gap-1.5 ${
                          isTooltipOpen
                            ? "bg-[#0D2731] text-[#22D3EE] border border-[#22D3EE]/50"
                            : "bg-[#121C2D] text-[#A7B4C7] hover:text-[#F8FAFC] hover:bg-[#172338] border border-[rgba(148,163,184,0.15)]"
                        }`}
                        title={`Status: ${skill.status}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] group-hover:scale-125 transition-transform" />
                        <span>{skill.name}</span>
                        {isTooltipOpen && (
                          <span className="text-[10px] font-bold text-[#34D399] ml-1 bg-[#070B14] px-1 py-0.2 rounded">
                            {skill.status}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-[#64748B]">
            Click any skill chip to toggle its application status. View complete roadmap on{" "}
            <Link href="/skills" className="text-[#22D3EE] hover:underline">
              /skills
            </Link>
          </div>
        </div>
      );
    }

    case "experience": {
      const { achievements } = item.payload;
      return (
        <div className="my-2 space-y-3 font-mono max-w-2xl">
          <div className="flex items-center justify-between pb-1 border-b border-[rgba(148,163,184,0.12)] text-xs text-[#22D3EE] font-bold">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>VERIFIED ENGINEERING MILESTONES &amp; EXPERIENCE</span>
            </span>
            <span className="text-[10px] text-[#64748B]">
              {achievements.length} Entries
            </span>
          </div>

          <div className="space-y-3">
            {achievements.map((expItem: any, idx: number) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] space-y-2"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] font-bold text-[#22D3EE] bg-[#070B14] px-2 py-0.5 rounded border border-[#22D3EE]/25">
                    {expItem.year}
                  </span>
                  <span className="text-[10px] font-semibold text-[#F59E0B] bg-[#172338] px-2 py-0.5 rounded-full border border-[#F59E0B]/25">
                    {expItem.category}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#F8FAFC]">
                  {expItem.title}
                </h4>
                <p className="text-xs text-[#A7B4C7] leading-relaxed">
                  {expItem.description}
                </p>
                <ul className="space-y-1 pt-1">
                  {expItem.highlights.slice(0, 3).map((h: string, hIdx: number) => (
                    <li key={hIdx} className="flex items-start gap-1.5 text-[11px] text-[#A7B4C7]">
                      <CheckCircle2 className="w-3 h-3 text-[#22D3EE] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-1 flex justify-between items-center text-xs">
            <span className="text-[11px] text-[#64748B]">
              Full verified timeline available on /journey
            </span>
            <Link
              href="/journey"
              className="text-[#22D3EE] hover:underline inline-flex items-center gap-1 text-[11px]"
            >
              <span>Explore Interactive Timeline</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      );
    }

    case "resume": {
      const p = item.payload;
      return (
        <div className="my-2 p-4 rounded-xl bg-[#0B1220] border border-[rgba(34,211,238,0.3)] max-w-lg space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#22D3EE] flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>RESUME &amp; ACADEMIC RECORD</span>
            </span>
            <span className="text-[10px] text-[#34D399] font-bold bg-[#0D2731] px-2 py-0.5 rounded border border-[#34D399]/30">
              Verified Candidate
            </span>
          </div>

          <div className="text-xs text-[#A7B4C7] space-y-1">
            <p className="text-[#F8FAFC] font-bold">{p.name} — {p.title}</p>
            <p>{p.education}</p>
            <p className="text-[#F59E0B]">{p.college}</p>
          </div>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <Link
              href={p.route}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] transition-colors"
            >
              <span>View Online Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={p.downloadUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-[#A7B4C7] hover:text-[#F8FAFC] bg-[#121C2D] hover:bg-[#172338] border border-[rgba(148,163,184,0.15)] transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      );
    }

    case "leetcode": {
      const p = item.payload;
      return (
        <div className="my-2 p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(245,158,11,0.3)] max-w-md space-y-2 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#F59E0B] flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              <span>LEETCODE PROFILE</span>
            </span>
            <span className="text-[10px] text-[#A7B4C7] bg-[#121C2D] px-2 py-0.5 rounded">
              @{p.handle}
            </span>
          </div>
          <p className="text-xs text-[#A7B4C7]">{p.highlight}</p>
          <div className="pt-1">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#061018] bg-[#F59E0B] hover:bg-amber-400 transition-colors"
            >
              <span>Open LeetCode Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      );
    }

    case "github": {
      const p = item.payload;
      return (
        <div className="my-2 p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(34,211,238,0.3)] max-w-md space-y-2 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#22D3EE] flex items-center gap-1.5">
              <Github className="w-4 h-4" />
              <span>GITHUB REPOSITORY HUB</span>
            </span>
            <span className="text-[10px] text-[#A7B4C7] bg-[#121C2D] px-2 py-0.5 rounded">
              {p.handle}
            </span>
          </div>
          <p className="text-xs text-[#A7B4C7]">{p.highlight}</p>
          <div className="pt-1">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] transition-colors"
            >
              <span>Visit GitHub Repositories</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      );
    }

    case "linkedin": {
      const p = item.payload;
      return (
        <div className="my-2 p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(59,130,246,0.35)] max-w-md space-y-2 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3B82F6] flex items-center gap-1.5">
              <Linkedin className="w-4 h-4" />
              <span>LINKEDIN NETWORK</span>
            </span>
            <span className="text-[10px] text-[#A7B4C7] bg-[#121C2D] px-2 py-0.5 rounded">
              {p.name}
            </span>
          </div>
          <p className="text-xs text-[#A7B4C7]">{p.headline}</p>
          <div className="pt-1">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#F8FAFC] bg-[#2563EB] hover:bg-blue-600 transition-colors"
            >
              <span>Connect on LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      );
    }

    case "education": {
      const p = item.payload;
      return (
        <div className="my-2 p-4 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.15)] max-w-xl space-y-2.5 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#22D3EE] flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>ACADEMIC FOUNDATION</span>
            </span>
            <span className="text-[10px] font-bold text-[#F59E0B] bg-[#172338] px-2 py-0.5 rounded">
              {p.cgpa}
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#F8FAFC]">{p.degree} — {p.branch}</h4>
          <p className="text-xs text-[#A7B4C7]">{p.fullName} (Graduation: {p.graduationYear})</p>
          <div className="pt-1">
            <span className="text-[10px] text-[#64748B] block mb-1 uppercase tracking-wider">
              Key Coursework
            </span>
            <div className="flex flex-wrap gap-1">
              {p.coursework.map((c: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] bg-[#121C2D] text-[#A7B4C7] border border-[rgba(148,163,184,0.12)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-2">
            <Link
              href={p.route}
              className="inline-flex items-center gap-1.5 text-xs text-[#22D3EE] hover:underline"
            >
              <span>View full Academic Curriculum on /education</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      );
    }

    case "contact": {
      const p = item.payload;
      return (
        <div className="my-2 p-4 rounded-xl bg-[#0B1220] border border-[rgba(34,211,238,0.3)] max-w-md space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#22D3EE] flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              <span>DIRECT CHANNELS</span>
            </span>
            <span className="text-[10px] text-[#34D399] font-medium">Available</span>
          </div>
          <div className="text-xs text-[#A7B4C7] space-y-1">
            <p>
              Email: <a href={`mailto:${p.email}`} className="text-[#22D3EE] underline">{p.email}</a>
            </p>
            <p>Location: <span className="text-[#F8FAFC]">{p.location}</span></p>
          </div>
          <div className="pt-1 flex gap-2">
            <Link
              href={p.route}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] transition-colors"
            >
              <span>Open Contact Form</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      );
    }

    case "help": {
      const { mode, command, commands } = item.payload;
      if (mode === "single" && command) {
        return (
          <div className="my-2 p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(34,211,238,0.3)] max-w-lg space-y-2 font-mono text-xs">
            <div className="text-[#22D3EE] font-bold text-sm">
              MANUAL: {command.name.toUpperCase()}
            </div>
            <p className="text-[#A7B4C7]">{command.description}</p>
            <div className="bg-[#070B14] p-2 rounded border border-[rgba(148,163,184,0.12)]">
              <span className="text-[#64748B] block text-[10px] uppercase">Usage</span>
              <span className="text-[#F8FAFC]">{command.usage}</span>
            </div>
            {command.flags && command.flags.length > 0 && (
              <div className="pt-1 space-y-1">
                <span className="text-[#64748B] block text-[10px] uppercase">Supported Flags</span>
                {command.flags.map((f: any, idx: number) => (
                  <div key={idx} className="flex gap-2 text-[11px]">
                    <span className="text-[#22D3EE] font-bold">{f.flag}</span>
                    <span className="text-[#A7B4C7]">{f.description}</span>
                  </div>
                ))}
              </div>
            )}
            {command.aliases && (
              <div className="text-[11px] text-[#64748B]">
                Aliases: {command.aliases.join(", ")}
              </div>
            )}
          </div>
        );
      }

      // Group by category
      const categories: Record<string, CommandDefinition[]> = {};
      commands.forEach((c: CommandDefinition) => {
        if (!categories[c.category]) categories[c.category] = [];
        categories[c.category].push(c);
      });

      return (
        <div className="my-2 space-y-3 font-mono text-xs max-w-2xl">
          <div className="text-[#22D3EE] font-bold flex items-center justify-between pb-1 border-b border-[rgba(148,163,184,0.12)]">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              <span>COMMAND SYSTEM REGISTRY</span>
            </span>
            <span className="text-[10px] text-[#64748B]">
              Click any command to execute
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(categories).map(([catName, catCmds]) => (
              <div
                key={catName}
                className="p-3 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.12)] space-y-1.5"
              >
                <span className="text-[10px] font-bold text-[#F59E0B] tracking-wider uppercase block">
                  {catName}
                </span>
                <div className="space-y-1">
                  {catCmds.map((cmd) => (
                    <div
                      key={cmd.name}
                      onClick={() => onExecuteCommand(cmd.name)}
                      className="group flex items-start justify-between cursor-pointer p-1 rounded hover:bg-[#121C2D] transition-colors"
                    >
                      <span className="text-[#22D3EE] font-bold group-hover:underline">
                        {cmd.name}
                      </span>
                      <span className="text-[11px] text-[#A7B4C7] text-right ml-2 line-clamp-1">
                        {cmd.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-[#64748B] pt-1">
            Type <code className="text-[#22D3EE]">help &lt;command&gt;</code> for in-depth flags (e.g.{" "}
            <code className="text-[#22D3EE]">help projects</code>).
          </div>
        </div>
      );
    }

    case "error":
      return (
        <div className="font-mono text-xs sm:text-sm text-[#FB7185] my-1.5 p-2 rounded bg-[#FB7185]/10 border border-[#FB7185]/20 leading-relaxed whitespace-pre-wrap">
          {item.text}
        </div>
      );

    case "easter-egg":
      return (
        <div className="font-mono text-xs sm:text-sm text-[#F8FAFC] my-1 p-2 rounded bg-[#121C2D] border border-[rgba(34,211,238,0.25)] leading-relaxed whitespace-pre-wrap">
          {item.text}
        </div>
      );

    case "matrix":
      return (
        <div className="font-mono text-xs text-[#34D399] my-1 p-2 rounded bg-[#0D2731] border border-[#34D399]/40 leading-relaxed flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping" />
          <span>{item.text}</span>
        </div>
      );

    case "date":
      return (
        <div className="font-mono text-xs text-[#A7B4C7] my-1">
          {item.text}
        </div>
      );

    case "history": {
      const { commands } = item.payload;
      return (
        <div className="my-2 p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(148,163,184,0.15)] max-w-md space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[#22D3EE] font-bold pb-1 border-b border-[rgba(148,163,184,0.1)]">
            <span className="flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>SESSION COMMAND HISTORY</span>
            </span>
            <span className="text-[10px] text-[#64748B]">{commands.length} executed</span>
          </div>
          {commands.length === 0 ? (
            <p className="text-xs text-[#64748B]">No previous commands recorded in this session.</p>
          ) : (
            <div className="space-y-1">
              {commands.map((cmd: string, idx: number) => (
                <div
                  key={idx}
                  onClick={() => onExecuteCommand(cmd)}
                  className="flex items-center justify-between p-1 rounded hover:bg-[#121C2D] cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#64748B] font-mono">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors">
                      {cmd}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#64748B] opacity-0 group-hover:opacity-100 transition-opacity">
                    Run ↵
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    case "ask": {
      const { question } = item.payload;
      return (
        <div className="my-2 p-3.5 rounded-xl bg-[#0B1220] border border-[rgba(34,211,238,0.3)] max-w-md space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#22D3EE] font-bold">
            <Sparkles className="w-4 h-4" />
            <span>AI CHATBOT QUERY DISPATCHED</span>
          </div>
          <p className="text-[#F8FAFC] bg-[#070B14] p-2 rounded border border-[rgba(148,163,184,0.12)]">
            &ldquo;{question}&rdquo;
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-[#34D399]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Chatbot opened with question prefilled. Click send or review.</span>
          </div>
        </div>
      );
    }

    case "ai-loading": {
      return (
        <div className="my-2 p-3 rounded-xl bg-[#0B1220] border border-[rgba(34,211,238,0.25)] max-w-xl space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#22D3EE] font-bold">
            <Loader2 className="w-4 h-4 animate-spin text-[#22D3EE]" />
            <span>VIJAY AI ASSISTANT</span>
            <span className="text-[10px] text-[#A7B4C7] font-normal">querying knowledge engine...</span>
          </div>
          <div className="flex items-center gap-1.5 pl-6 text-[#A7B4C7] text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-ping" />
            <span>Analyzing portfolio context &amp; generating grounded response...</span>
          </div>
        </div>
      );
    }

    case "ai-response": {
      const { reply, source, model, latencyMs, actions, projectCard, suggestedFollowUps } =
        item.payload || {};
      const sourceLabel =
        source === "groq"
          ? `Groq • ${model || "Llama 3.3 70B"}`
          : source === "gemini"
          ? `Gemini • ${model || "1.5 Flash"}`
          : source === "error"
          ? "AI Service Unavailable"
          : "Local Knowledge Engine";

      return (
        <div className="my-2 p-3.5 sm:p-4 rounded-xl bg-[#0B1220] border border-[rgba(34,211,238,0.3)] shadow-[0_4px_25px_rgba(0,0,0,0.3)] max-w-2xl space-y-3 font-mono text-xs sm:text-sm">
          {/* AI Header & Provider Badge */}
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(148,163,184,0.12)]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#0D2731] border border-[rgba(34,211,238,0.4)] flex items-center justify-center text-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.2)]">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-[#F8FAFC]">Vijay AI Assistant</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#A7B4C7]">
              <span className="px-2 py-0.5 rounded bg-[#121C2D] border border-[rgba(148,163,184,0.15)] text-[#22D3EE]">
                {sourceLabel}
              </span>
              {typeof latencyMs === "number" && (
                <span className="text-[#64748B]">{latencyMs}ms</span>
              )}
            </div>
          </div>

          {/* Formatted Reply */}
          <div className="text-[#F8FAFC] font-sans text-xs sm:text-sm">
            <FormattedMessage
              content={reply || ""}
              onNavigate={(url) => onExecuteCommand(`open ${url.replace(/^\//, "")}`)}
              onQuery={(q) => onExecuteCommand(q)}
            />
          </div>

          {/* Project Card Preview (if applicable) */}
          {projectCard && (
            <div className="p-3 rounded-xl bg-[#070B14] border border-[rgba(34,211,238,0.25)] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#22D3EE] text-xs">{projectCard.title}</span>
                <span className="text-[10px] text-[#A7B4C7]">{projectCard.tagline}</span>
              </div>
              <p className="text-[11px] text-[#A7B4C7] line-clamp-2">{projectCard.description}</p>
              <div className="flex items-center gap-3 pt-1">
                {projectCard.githubUrl && (
                  <a
                    href={projectCard.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#22D3EE] hover:underline"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {projectCard.liveDemoUrl && (
                  <a
                    href={projectCard.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#34D399] hover:underline"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Quick Action Buttons (e.g. Retry Question, View Projects) */}
          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {actions.map((act: any, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (act.type === "query" && act.query) {
                      onExecuteCommand(act.query);
                    } else if (act.type === "navigate" && act.url) {
                      onExecuteCommand(`open ${act.url.replace(/^\//, "")}`);
                    } else if (act.type === "external" && act.url) {
                      window.open(act.url, "_blank");
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 ${
                    act.variant === "primary"
                      ? "bg-[#22D3EE] text-[#061018] hover:bg-[#67E8F9] shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                      : "bg-[#121C2D] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] hover:bg-[#172338]"
                  }`}
                >
                  <span>{act.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Suggested Follow-Ups & Quick Action Chips */}
          {suggestedFollowUps && suggestedFollowUps.length > 0 && (
            <div className="pt-2 border-t border-[rgba(148,163,184,0.1)] space-y-1.5">
              <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block">
                Suggested Follow-ups:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedFollowUps.map((prompt: string, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onExecuteCommand(prompt)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#121C2D] hover:bg-[#172338] text-[#22D3EE] hover:text-[#67E8F9] border border-[rgba(34,211,238,0.2)] hover:border-[#22D3EE] transition-all text-left"
                  >
                    {prompt} ↵
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    default:
      return item.text ? (
        <div className="font-mono text-xs sm:text-sm text-[#A7B4C7] my-1 whitespace-pre-wrap">
          {item.text}
        </div>
      ) : null;
  }
}
