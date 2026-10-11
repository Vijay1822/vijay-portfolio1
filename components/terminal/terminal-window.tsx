"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Terminal as TerminalIcon,
  Minus,
  Maximize2,
  Minimize2,
  X,
  RotateCcw,
  Compass,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Activity,
  Sparkles,
  Send,
  Loader2,
} from "lucide-react";
import { TerminalOutputItem, AutocompleteSuggestion } from "./types";
import {
  COMMAND_REGISTRY,
  executeCommand,
  getAutocompleteSuggestions,
} from "./command-registry";
import { routeTerminalInput } from "./input-router";
import { TerminalOutputRenderer } from "./terminal-output";
import { CommandExplorer } from "./command-explorer";
import { MatrixRain } from "./matrix-rain";
import { Project } from "@/lib/data";

interface TerminalWindowProps {
  isModal?: boolean;
  isExpanded?: boolean;
  isMinimized?: boolean;
  onToggleExpand?: () => void;
  onMinimize?: () => void;
  onClose?: () => void;
  onOpenProjectModal?: (project: Project) => void;
  onAskChatbot?: (question: string) => void;
  className?: string;
}

const QUICK_COMMANDS = [
  "projects",
  "skills",
  "resume",
  "leetcode",
  "whoami",
  "help",
];

export function TerminalWindow({
  isModal = false,
  isExpanded = false,
  isMinimized = false,
  onToggleExpand,
  onMinimize,
  onClose,
  onOpenProjectModal,
  onAskChatbot,
  className = "",
}: TerminalWindowProps) {
  const pathname = usePathname();
  const router = useRouter();

  // State management
  const [input, setInput] = useState("");
  const [outputItems, setOutputItems] = useState<TerminalOutputItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isDashboardCollapsed, setIsDashboardCollapsed] = useState(false);
  const [sessionCommandsCount, setSessionCommandsCount] = useState(0);
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(0);
  const [isTypingWelcome, setIsTypingWelcome] = useState(false);
  const [welcomeText, setWelcomeText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const welcomeInitialized = useRef(false);
  const draftInputRef = useRef<string>("");

  // Auto-scroll to bottom of output
  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  // Initialize Welcome Message
  useEffect(() => {
    if (welcomeInitialized.current) return;
    welcomeInitialized.current = true;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Check if user already saw welcome in this session
    const hasSeenWelcome =
      typeof window !== "undefined" &&
      sessionStorage.getItem("vijay_terminal_welcome_shown") === "true";

    const fullWelcomeLines = [
      "V I J A Y / E N G I N E E R I N G   T E R M I N A L",
      "Welcome, explorer.",
      "I'm Vijay Kumar — AI/ML + Full-Stack Developer.",
      "Explore my projects, technical skills, resume, and coding profiles using commands below.",
      "",
      "System ready. Type help or select a command to begin.",
    ].join("\n");

    if (prefersReducedMotion || hasSeenWelcome) {
      // Show immediately
      setOutputItems([
        {
          id: "welcome-init",
          type: "welcome",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      return;
    }

    // Typing effect for the welcome
    setIsTypingWelcome(true);
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx += 3;
      if (currentIdx <= fullWelcomeLines.length) {
        setWelcomeText(fullWelcomeLines.slice(0, currentIdx));
      } else {
        clearInterval(interval);
        setIsTypingWelcome(false);
        setOutputItems([
          {
            id: "welcome-init",
            type: "welcome",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
        try {
          sessionStorage.setItem("vijay_terminal_welcome_shown", "true");
        } catch (_) {}
      }
    }, 18);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [outputItems, welcomeText, scrollToBottom]);

  // Handle Autocomplete Suggestions on Input Change
  const handleInputChange = (val: string) => {
    setInput(val);
    if (!val.trim()) {
      setSuggestions([]);
      setSelectedSuggestionIndex(0);
      return;
    }
    const matched = getAutocompleteSuggestions(val);
    setSuggestions(matched);
    setSelectedSuggestionIndex(0);
  };

  // Skip welcome animation
  const handleSkipAnimation = () => {
    setIsTypingWelcome(false);
    setOutputItems([
      {
        id: "welcome-init",
        type: "welcome",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    try {
      sessionStorage.setItem("vijay_terminal_welcome_shown", "true");
    } catch (_) {}
  };

  // Shared submission handler for Enter key, Send button, suggestions, and quick chips
  const submitChatMessage = useCallback(
    async (rawInput: string) => {
      const trimmed = rawInput.trim();
      // Gracefully reject empty or whitespace-only messages
      if (!trimmed) return;
      // Prevent duplicate rapid submissions while request is pending
      if (isProcessing) return;

      // Close autocomplete & explorer, and clear input now that submission is accepted
      setSuggestions([]);
      setIsExplorerOpen(false);
      setInput("");

      // Add to command history (avoid adjacent duplicates)
      const newHistory =
        commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== trimmed
          ? [...commandHistory, trimmed]
          : commandHistory;

      setCommandHistory(newHistory);
      setHistoryIndex(-1);
      setSessionCommandsCount((c) => c + 1);

      const commandTimestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Route between safe CLI command and natural-language AI question
      const route = routeTerminalInput(trimmed);

      if (route.type === "empty") return;

      // 1. Recognized Local CLI Command
      if (route.type === "command") {
        const userCommandLineItem: TerminalOutputItem = {
          id: Math.random().toString(36).slice(2),
          type: "command",
          commandText: trimmed,
          timestamp: commandTimestamp,
        };

        const resultItem = executeCommand(trimmed, {
          onNavigate: (path) => router.push(path),
          onToggleMatrix: () => setIsMatrixActive(true),
          onAskChatbot: (question) => {
            if (onAskChatbot) {
              onAskChatbot(question);
            }
          },
          history: newHistory,
        });

        // Special system handlers
        if (resultItem.text === "__CLEAR__") {
          setOutputItems([]);
          return;
        }

        if (resultItem.text === "__EXIT__") {
          if (onClose) onClose();
          else if (onMinimize) onMinimize();
          return;
        }

        // Direct navigation handlers
        if (
          trimmed.startsWith("open ") ||
          trimmed === "resume" ||
          trimmed === "contact" ||
          trimmed === "education" ||
          trimmed === "projects" ||
          trimmed === "skills" ||
          trimmed === "about" ||
          trimmed === "journey" ||
          trimmed === "experience"
        ) {
          if (trimmed === "open resume" || trimmed === "resume") {
            router.push("/resume");
          } else if (trimmed === "open contact" || trimmed === "contact") {
            router.push("/contact");
          } else if (trimmed === "open education" || trimmed === "education") {
            router.push("/education");
          } else if (trimmed === "open projects" || trimmed === "projects") {
            router.push("/projects");
          } else if (trimmed === "open skills" || trimmed === "skills") {
            router.push("/skills");
          } else if (trimmed === "open about" || trimmed === "about") {
            router.push("/about");
          } else if (trimmed === "open journey" || trimmed === "journey" || trimmed === "experience") {
            router.push("/journey");
          }
        }

        setOutputItems((prev) => [...prev, userCommandLineItem, resultItem]);

        setTimeout(() => {
          inputRef.current?.focus();
          scrollToBottom();
        }, 50);
        return;
      }

      // 2. Unrecognized Command Typo
      if (route.type === "unknown-command") {
        const userCommandLineItem: TerminalOutputItem = {
          id: Math.random().toString(36).slice(2),
          type: "command",
          commandText: trimmed,
          timestamp: commandTimestamp,
        };

        const errorItem: TerminalOutputItem = {
          id: Math.random().toString(36).slice(2),
          type: "error",
          timestamp: commandTimestamp,
          status: "warning",
          text: `Command not recognized: '${route.command}'\nType 'help' to see available commands, or ask any natural-language question directly (e.g. "What projects has Vijay built?").`,
        };

        setOutputItems((prev) => [...prev, userCommandLineItem, errorItem]);
        setTimeout(() => {
          inputRef.current?.focus();
          scrollToBottom();
        }, 50);
        return;
      }

      // 3. Natural-Language AI Question (Free-text query)
      if (route.type === "ai-question") {
        const userCommandLineItem: TerminalOutputItem = {
          id: Math.random().toString(36).slice(2),
          type: "command",
          commandText: route.query,
          timestamp: commandTimestamp,
        };

        const loadingId = Math.random().toString(36).slice(2);
        const loadingItem: TerminalOutputItem = {
          id: loadingId,
          type: "ai-loading",
          timestamp: commandTimestamp,
        };

        setOutputItems((prev) => [...prev, userCommandLineItem, loadingItem]);
        setIsProcessing(true);

        setTimeout(() => {
          scrollToBottom();
        }, 50);

        try {
          // Gather relevant conversation history for follow-up questions
          const history = outputItems
            .filter((it) => it.type === "command" || it.type === "ai-response")
            .slice(-6)
            .map((it) => ({
              role: it.type === "command" ? "user" : "assistant",
              content: it.commandText || it.payload?.reply || it.text || "",
            }));

          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: route.query,
              history,
              source: "terminal",
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const aiResponseItem: TerminalOutputItem = {
              id: Math.random().toString(36).slice(2),
              type: "ai-response",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              payload: {
                reply: data.reply,
                source: data.source,
                model: data.model,
                latencyMs: data.latencyMs,
                actions: data.actions,
                projectCard: data.projectCard,
                suggestedFollowUps: data.suggestedFollowUps,
              },
            };

            setOutputItems((prev) =>
              prev.map((item) => (item.id === loadingId ? aiResponseItem : item))
            );
          } else {
            const errorItem: TerminalOutputItem = {
              id: Math.random().toString(36).slice(2),
              type: "error",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              status: "error",
              text: "Could not reach Vijay AI assistant. Please try asking again or explore commands with 'help'.",
            };
            setOutputItems((prev) =>
              prev.map((item) => (item.id === loadingId ? errorItem : item))
            );
          }
        } catch {
          const errorItem: TerminalOutputItem = {
            id: Math.random().toString(36).slice(2),
            type: "error",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: "error",
            text: "Network error while connecting to AI assistant. Please check your connection and try again.",
          };
          setOutputItems((prev) =>
            prev.map((item) => (item.id === loadingId ? errorItem : item))
          );
        } finally {
          setIsProcessing(false);
          setTimeout(() => {
            inputRef.current?.focus();
            scrollToBottom();
          }, 50);
        }
      }
    },
    [router, onClose, onMinimize, scrollToBottom, commandHistory, outputItems, isProcessing, onAskChatbot]
  );

  // Keyboard navigation & shortcuts
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Ctrl+L or Cmd+L: Clear terminal screen output
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setOutputItems([]);
      return;
    }

    // Escape: dismiss autocomplete / clear current input
    if (e.key === "Escape") {
      if (suggestions.length > 0) {
        setSuggestions([]);
        return;
      }
      if (isExplorerOpen) {
        setIsExplorerOpen(false);
        return;
      }
      setInput("");
      return;
    }

    // Tab autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        const chosen = suggestions[selectedSuggestionIndex]?.name || suggestions[0].name;
        setInput(chosen);
        setSuggestions([]);
      } else {
        const matched = getAutocompleteSuggestions(input);
        if (matched.length > 0) {
          setInput(matched[0].name);
        }
      }
      return;
    }

    // Arrow Up: Command history backwards or suggestion selection
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestionIndex((prev) =>
          prev <= 0 ? suggestions.length - 1 : prev - 1
        );
        return;
      }

      if (commandHistory.length === 0) return;
      if (historyIndex === -1) {
        draftInputRef.current = input;
      }
      const nextIndex =
        historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
      return;
    }

    // Arrow Down: Command history forwards or suggestion selection
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestionIndex((prev) =>
          prev >= suggestions.length - 1 ? 0 : prev + 1
        );
        return;
      }

      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput(draftInputRef.current);
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
      return;
    }

    // Enter: execute user's actual typed input
    if (e.key === "Enter") {
      e.preventDefault();
      submitChatMessage(input);
    }
  };

  const handleClearOutput = () => {
    setOutputItems([]);
    inputRef.current?.focus();
  };

  return (
    <div
      role="region"
      aria-label="Engineering Terminal Workspace"
      className={`relative flex flex-col rounded-2xl sm:rounded-3xl border border-[rgba(34,211,238,0.22)] bg-[#070B14] shadow-[0_20px_60px_rgba(0,0,0,0.65)] overflow-hidden transition-all duration-300 font-mono text-[#F8FAFC] select-text ${
        isExpanded
          ? "w-full h-[88vh] max-h-[92vh]"
          : isModal
          ? "w-[calc(100vw-24px)] sm:w-[780px] max-w-full h-[76vh] sm:h-[580px] max-h-[580px]"
          : "w-full h-[540px] sm:h-[600px]"
      } ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Subtle Matrix rain easter egg stream */}
      <MatrixRain
        isActive={isMatrixActive}
        onFinished={() => setIsMatrixActive(false)}
      />

      {/* 1. Terminal Window Header */}
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-3 bg-[#0B1220] border-b border-[rgba(148,163,184,0.12)] shrink-0 z-20 select-none">
        {/* Left: Window Dots & Prompt Title */}
        <div className="flex items-center gap-3">
          {/* Real 3-window control dots */}
          <div className="flex items-center gap-1.5" aria-label="Window Controls">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose ? onClose() : handleClearOutput();
              }}
              className="w-3 h-3 rounded-full bg-[#FB7185] hover:opacity-80 transition-opacity flex items-center justify-center group"
              title="Close Terminal"
              aria-label="Close Terminal"
            >
              <X className="w-2 h-2 text-[#061018] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize ? onMinimize() : null;
              }}
              className="w-3 h-3 rounded-full bg-[#F59E0B] hover:opacity-80 transition-opacity flex items-center justify-center group"
              title="Minimize Terminal"
              aria-label="Minimize Terminal"
            >
              <Minus className="w-2 h-2 text-[#061018] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand ? onToggleExpand() : null;
              }}
              className="w-3 h-3 rounded-full bg-[#34D399] hover:opacity-80 transition-opacity flex items-center justify-center group"
              title={isExpanded ? "Restore Size" : "Expand Window"}
              aria-label={isExpanded ? "Restore Size" : "Expand Window"}
            >
              <Maximize2 className="w-2 h-2 text-[#061018] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          <div className="h-3.5 w-px bg-[rgba(148,163,184,0.15)] mx-0.5" />

          {/* Terminal label & Hostname */}
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span className="text-xs font-bold text-[#F8FAFC] tracking-tight">
              vijay@portfolio:~
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-semibold bg-[#121C2D] text-[#22D3EE] rounded border border-[#22D3EE]/25">
              MAIN TERMINAL
            </span>
          </div>
        </div>

        {/* Right: Live Status & Controls */}
        <div className="flex items-center gap-2">
          {/* Live SYSTEM ONLINE indicator */}
          <div className="hidden xs:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#070B14] border border-[rgba(52,211,153,0.3)] text-[10px] text-[#34D399]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            <span className="font-semibold tracking-wider">SYSTEM ONLINE</span>
          </div>

          {/* Activity pulse */}
          <div
            className="p-1 rounded text-[#22D3EE] hover:bg-[#121C2D] transition-colors hidden sm:block"
            title={`${sessionCommandsCount} commands executed in session`}
          >
            <Activity className="w-3.5 h-3.5 animate-pulse text-[#22D3EE]" />
          </div>

          {/* Command Explorer Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExplorerOpen(!isExplorerOpen);
            }}
            className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 ${
              isExplorerOpen
                ? "bg-[#22D3EE] text-[#061018] font-bold"
                : "bg-[#121C2D] text-[#A7B4C7] hover:text-[#22D3EE] border border-[rgba(148,163,184,0.15)]"
            }`}
            title="Explore All Commands"
            aria-label="Explore Commands"
          >
            <Compass className="w-3 h-3" />
            <span className="hidden md:inline">Explore Commands</span>
          </button>

          {/* Clear screen output button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClearOutput();
            }}
            className="p-1.5 rounded-lg text-[#A7B4C7] hover:text-[#FB7185] hover:bg-[#121C2D] transition-colors"
            title="Clear output (Ctrl+L)"
            aria-label="Clear Output"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Expand / Collapse window button */}
          {onToggleExpand && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand();
              }}
              className="p-1.5 rounded-lg text-[#A7B4C7] hover:text-[#F8FAFC] hover:bg-[#121C2D] transition-colors"
              title={isExpanded ? "Collapse window" : "Expand window"}
              aria-label={isExpanded ? "Collapse Window" : "Expand Window"}
            >
              {isExpanded ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          {/* Close / minimize button */}
          {onClose && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1.5 rounded-lg text-[#A7B4C7] hover:text-[#FB7185] hover:bg-[#FB7185]/10 transition-colors"
              title="Close Terminal"
              aria-label="Close Terminal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Command Explorer Overlay */}
      <CommandExplorer
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
        onSelectCommand={submitChatMessage}
      />

      {/* 2. Output Viewport Area */}
      <div
        ref={scrollAreaRef}
        className="flex-1 p-3 sm:p-4 overflow-y-auto z-10 scrollbar-thin space-y-3"
        tabIndex={0}
        aria-live="polite"
        aria-label="Terminal Output History"
      >
        {/* Collapsible Activity Dashboard */}
        <div className="rounded-xl bg-[#0B1220]/90 border border-[rgba(148,163,184,0.12)] p-2.5 text-xs transition-all">
          <div
            className="flex items-center justify-between cursor-pointer select-none"
            onClick={() => setIsDashboardCollapsed(!isDashboardCollapsed)}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34D399]" />
              <span className="text-[11px] font-bold text-[#F8FAFC]">
                SESSION ACTIVITY DASHBOARD
              </span>
              <span className="text-[10px] text-[#A7B4C7]">
                • Route: <span className="text-[#22D3EE] font-mono">{pathname}</span>
              </span>
            </div>
            <button
              type="button"
              className="text-[#64748B] hover:text-white p-0.5"
              aria-label={isDashboardCollapsed ? "Expand Dashboard" : "Collapse Dashboard"}
            >
              {isDashboardCollapsed ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {!isDashboardCollapsed && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-[rgba(148,163,184,0.1)] text-[11px]">
              <div className="bg-[#070B14] p-1.5 rounded border border-[rgba(148,163,184,0.08)]">
                <span className="text-[9px] text-[#64748B] block uppercase">Status</span>
                <span className="text-[#34D399] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                  Online
                </span>
              </div>
              <div className="bg-[#070B14] p-1.5 rounded border border-[rgba(148,163,184,0.08)]">
                <span className="text-[9px] text-[#64748B] block uppercase">Registry</span>
                <span className="text-[#22D3EE] font-bold">
                  {COMMAND_REGISTRY.length} Available
                </span>
              </div>
              <div className="bg-[#070B14] p-1.5 rounded border border-[rgba(148,163,184,0.08)]">
                <span className="text-[9px] text-[#64748B] block uppercase">Executed</span>
                <span className="text-[#F59E0B] font-bold">
                  {sessionCommandsCount} Commands
                </span>
              </div>
              <div className="bg-[#070B14] p-1.5 rounded border border-[rgba(148,163,184,0.08)]">
                <span className="text-[9px] text-[#64748B] block uppercase">Environment</span>
                <span className="text-[#A7B4C7] font-bold">Next.js / TypeScript</span>
              </div>
            </div>
          )}
        </div>

        {/* Typing Welcome Animation if currently typing */}
        {isTypingWelcome && (
          <div className="font-mono text-xs sm:text-sm text-[#F8FAFC] whitespace-pre-wrap leading-relaxed py-1">
            {welcomeText}
            <span className="inline-block w-2 h-4 bg-[#22D3EE] ml-0.5 animate-terminal-cursor align-middle" />
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSkipAnimation}
                className="px-2.5 py-1 text-[10px] rounded-full bg-[#121C2D] text-[#22D3EE] border border-[#22D3EE]/30 hover:bg-[#172338] transition-colors"
              >
                Skip Animation
              </button>
            </div>
          </div>
        )}

        {/* Rendered Command Output Items */}
        {outputItems.map((item) => (
          <div key={item.id} className="space-y-1">
            {/* If item was a user submitted command, show the prompt line */}
            {item.type === "command" && item.commandText !== undefined && (
              <div className="flex items-center gap-2 text-xs sm:text-sm pt-2">
                <span className="text-[#34D399] font-bold shrink-0">vijay@portfolio:~$</span>
                <span className="text-[#F8FAFC] font-semibold">{item.commandText}</span>
                <span className="text-[10px] text-[#64748B] ml-auto shrink-0 font-mono">
                  {item.timestamp}
                </span>
              </div>
            )}

            {/* Structured result output */}
            {item.type !== "command" && (
              <TerminalOutputRenderer
                item={item}
                onExecuteCommand={submitChatMessage}
                onOpenProjectModal={onOpenProjectModal}
              />
            )}
          </div>
        ))}
      </div>

      {/* 3. Interactive Quick Commands Launcher Bar */}
      <div className="px-3 py-1.5 bg-[#0B1220]/95 border-t border-[rgba(148,163,184,0.12)] flex items-center gap-2 z-20 shrink-0 overflow-x-auto scrollbar-none">
        <span className="text-[9px] font-mono text-[#64748B] uppercase tracking-wider font-bold shrink-0 hidden xs:inline">
          QUICK COMMANDS:
        </span>
        <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => submitChatMessage(cmd)}
              className="group relative px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-[#121C2D] hover:bg-[#0D2731] text-[#A7B4C7] hover:text-[#22D3EE] border border-[rgba(148,163,184,0.15)] hover:border-[#22D3EE]/40 transition-all duration-200 flex items-center gap-1 shrink-0"
            >
              <span>{cmd}</span>
              <ArrowRight className="w-2.5 h-2.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#22D3EE]" />
            </button>
          ))}
        </div>
      </div>

      {/* 4. Intelligent Autocomplete Floating Popup */}
      {suggestions.length > 0 && (
        <div className="absolute bottom-14 left-4 right-4 z-30 max-h-48 overflow-y-auto bg-[#0B1220]/98 backdrop-blur-md border border-[rgba(34,211,238,0.35)] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] p-1.5 text-xs font-mono">
          <div className="px-2 py-1 text-[10px] text-[#64748B] uppercase font-bold flex justify-between">
            <span>Suggestions</span>
            <span>Tab to complete • Esc to dismiss</span>
          </div>
          {suggestions.map((s, idx) => (
            <button
              key={s.name}
              type="button"
              onClick={() => {
                setInput(s.name);
                setSuggestions([]);
                inputRef.current?.focus();
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                idx === selectedSuggestionIndex
                  ? "bg-[#172338] text-[#22D3EE] border border-[rgba(34,211,238,0.3)]"
                  : "text-[#A7B4C7] hover:bg-[#121C2D] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#22D3EE]">{s.name}</span>
                <span className="text-[11px] text-[#64748B] line-clamp-1">
                  — {s.description}
                </span>
              </div>
              <span className="text-[10px] text-[#34D399] font-mono bg-[#070B14] px-1.5 py-0.5 rounded border border-[#34D399]/20">
                [Tab]
              </span>
            </button>
          ))}
        </div>
      )}

      {/* 5. Command & AI Question Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitChatMessage(input);
        }}
        className="p-2.5 sm:p-3 bg-[#0B1220] border-t border-[rgba(148,163,184,0.12)] flex items-center gap-2 z-20 shrink-0"
      >
        <span className="text-xs sm:text-sm font-bold text-[#34D399] shrink-0 select-none">
          vijay@portfolio:~$
        </span>

        <div className="relative flex-1 flex items-center min-w-0">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI a question or type 'help'..."
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal command or AI question prompt"
            className="w-full bg-transparent text-xs sm:text-sm font-mono text-[#F8FAFC] placeholder:text-[#475569] focus:outline-none focus:ring-0 border-none p-0"
          />
          {/* Custom blinking cursor at end of input */}
          {!isProcessing && (
            <span className="w-2 h-4 bg-[#22D3EE] ml-0.5 shrink-0 animate-terminal-cursor pointer-events-none" />
          )}
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim() || isProcessing}
          className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-bold text-[#061018] bg-[#22D3EE] hover:bg-[#67E8F9] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.2)] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/40"
          title="Send question or execute command (Enter)"
          aria-label="Send"
        >
          {isProcessing ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#061018]" />
          ) : (
            <>
              <span className="hidden sm:inline">Send</span>
              <Send className="w-3 h-3 stroke-[2.5]" />
            </>
          )}
        </button>

        <div className="hidden md:flex items-center gap-2 text-[10px] text-[#64748B] font-mono shrink-0 select-none">
          <span className="px-1.5 py-0.5 rounded bg-[#070B14] border border-[rgba(148,163,184,0.1)]">
            Tab: complete
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#070B14] border border-[rgba(148,163,184,0.1)]">
            ↑↓: history
          </span>
        </div>
      </form>
    </div>
  );
}
