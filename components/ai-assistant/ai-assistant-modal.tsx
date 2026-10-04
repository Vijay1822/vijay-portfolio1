"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Minus,
  Send,
  Bot,
  User,
  Trash2,
  ArrowUpRight,
  ExternalLink,
  Mic,
  MicOff,
  Square,
  Volume2,
  VolumeX,
  FolderGit2,
  AlertCircle,
} from "lucide-react";
import { AI_ASSISTANT_SUGGESTIONS, PERSONAL_INFO } from "@/lib/data";
import { generateSmartResponse, ChatAction, ChatProjectCard } from "@/lib/ai-assistant";
import { FormattedMessage } from "./FormattedMessage";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
  actions?: ChatAction[];
  projectCard?: ChatProjectCard;
  skillsGrid?: { category: string; skills: string[] }[];
  suggestedFollowUps?: string[];
}

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AIAssistantModal({ isOpen, onToggle }: AIAssistantProps) {
  const router = useRouter();

  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-welcome",
      role: "assistant",
      content: `Hey! 👋\n\nI'm Vijay AI, Vijay's personal portfolio assistant.\n\nI can help you explore his skills, projects (such as BudgetMind), education at VNR VJIET, hackathons, and technical background.\n\nWhat would you like to know?`,
      timestamp: "Just now",
      actions: [
        { label: "Explore Projects", type: "query", query: "Show me Vijay's projects", variant: "primary" },
        { label: "View Skills", type: "query", query: "What are Vijay's skills?" },
        { label: "Tell me about BudgetMind", type: "query", query: "Tell me about BudgetMind" },
        { label: "Contact Vijay", type: "query", query: "How can I contact Vijay?" },
      ],
      suggestedFollowUps: [
        "Who is Vijay?",
        "Tell me about BudgetMind",
        "What are Vijay's skills?",
        "What is Vijay's LeetCode?",
        "How can I contact Vijay?",
      ],
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceRecognitionSupported, setVoiceRecognitionSupported] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef<boolean>(false);
  const finalTranscriptRef = useRef<string>("");
  const interimTranscriptRef = useRef<string>("");
  const silenceTimerRef = useRef<any>(null);

  // Check speech synthesis and recognition support
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSpeechSupported("speechSynthesis" in window);
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setVoiceRecognitionSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-IN";

        recognition.onresult = (event: any) => {
          let newlyFinalized = "";
          let currentInterim = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const piece = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              newlyFinalized += (newlyFinalized ? " " : "") + piece.trim();
            } else {
              currentInterim += (currentInterim ? " " : "") + piece.trim();
            }
          }

          if (newlyFinalized) {
            const existing = finalTranscriptRef.current.trim();
            finalTranscriptRef.current = existing
              ? `${existing} ${newlyFinalized}`
              : newlyFinalized;
          }

          interimTranscriptRef.current = currentInterim;

          const combined = (
            finalTranscriptRef.current + (currentInterim ? " " + currentInterim : "")
          ).trim();

          if (combined) {
            setInput(combined);
          }

          // Reset silence timer: wait 2.5s of quiet before auto-finalizing complete sentence
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            if (isRecordingRef.current) {
              finalizeAndSendVoice();
            }
          }, 2500);
        };

        recognition.onerror = (e: any) => {
          if (e.error === "no-speech") {
            // Keep listening, don't abort abruptly
            return;
          }

          if (e.error === "not-allowed" || e.error === "permission-denied") {
            stopAllVoice();
            setVoiceError(
              "Microphone access was denied. Please allow microphone permissions in your browser settings or use text input."
            );
          } else if (e.error === "network") {
            stopAllVoice();
            setVoiceError("Speech recognition network error. Please try again or type your question.");
          } else {
            console.warn("Speech recognition notice:", e.error);
          }
        };

        recognition.onend = () => {
          // If the user hasn't explicitly stopped recording, automatically restart
          if (isRecordingRef.current) {
            try {
              recognition.start();
            } catch (err) {
              console.warn("Speech recognition restart catch:", err);
            }
          } else {
            setIsListening(false);
          }
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 200);
    }
  }, [isOpen, isMinimized, messages]);

  // Stop all active voice recognition and microphone activity
  const stopAllVoice = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    isRecordingRef.current = false;
    setIsListening(false);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
    }
    finalTranscriptRef.current = "";
    interimTranscriptRef.current = "";
  }, []);

  // Stop active text-to-speech audio
  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  // Comprehensive stop for all audio, recording, and TTS
  const stopAllAudioAndVoice = useCallback(() => {
    stopAllVoice();
    stopSpeaking();
    setVoiceError(null);
  }, [stopAllVoice, stopSpeaking]);

  // Close handler: stops all microphone, TTS, resets state, and closes panel
  const handleClose = useCallback(() => {
    stopAllAudioAndVoice();
    setIsMinimized(false);
    onToggle();
  }, [stopAllAudioAndVoice, onToggle]);

  // Minimize handler: hides large panel, preserves floating button
  const handleMinimize = useCallback(() => {
    stopAllAudioAndVoice();
    setIsMinimized(true);
  }, [stopAllAudioAndVoice]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Text-To-Speech with accurate playback status
  const speakText = (text: string) => {
    if (!speechSupported || !isSpeakingEnabled || typeof window === "undefined") return;
    window.speechSynthesis.cancel();

    const clean = text.replace(/[*_#`[\]()]/g, " ").slice(0, 220);
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Finalizes the accumulated speech buffer and sends ONE complete query
  const finalizeAndSendVoice = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    const completeSentence = (
      finalTranscriptRef.current + (interimTranscriptRef.current ? " " + interimTranscriptRef.current : "")
    ).trim();

    stopAllVoice();

    if (completeSentence.length > 0) {
      handleSendMessage(completeSentence);
    }
  };

  // Toggle voice input on/off
  const toggleVoiceInput = () => {
    if (!voiceRecognitionSupported) {
      setVoiceError("Voice input isn't supported in this browser. You can type your question instead.");
      return;
    }

    setVoiceError(null);
    stopSpeaking();

    if (isListening) {
      // User pressed Stop: finalize captured audio and send
      finalizeAndSendVoice();
    } else {
      // Start recording session
      finalTranscriptRef.current = "";
      interimTranscriptRef.current = "";
      isRecordingRef.current = true;
      setIsListening(true);

      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn("Recognition start notice:", err);
      }
    }
  };

  // Send message to AI backend
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    // Stop recording and speech synthesis if active
    stopAllVoice();
    stopSpeaking();

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history }),
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.reply || "I'm ready to answer any questions about Vijay!";

        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: "assistant",
            content: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            actions: data.actions,
            projectCard: data.projectCard,
            skillsGrid: data.skillsGrid,
            suggestedFollowUps: data.suggestedFollowUps,
          },
        ]);

        if (isSpeakingEnabled) {
          speakText(replyText);
        }
      } else {
        // Fallback engine
        const localStructured = generateSmartResponse(query, history);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: "assistant",
            content: localStructured.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            actions: localStructured.actions,
            projectCard: localStructured.projectCard,
            skillsGrid: localStructured.skillsGrid,
            suggestedFollowUps: localStructured.suggestedFollowUps,
          },
        ]);
        if (isSpeakingEnabled) speakText(localStructured.reply);
      }
    } catch {
      const localStructured = generateSmartResponse(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: localStructured.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actions: localStructured.actions,
          projectCard: localStructured.projectCard,
          skillsGrid: localStructured.skillsGrid,
          suggestedFollowUps: localStructured.suggestedFollowUps,
        },
      ]);
      if (isSpeakingEnabled) speakText(localStructured.reply);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.type === "query" && action.query) {
      handleSendMessage(action.query);
    } else if (action.type === "navigate" && action.url) {
      handleClose();
      if (action.url.startsWith("#")) {
        const el = document.querySelector(action.url);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push(action.url);
        }
      } else {
        router.push(action.url);
      }
    } else if (action.type === "external" && action.url) {
      window.open(action.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleClear = () => {
    stopAllAudioAndVoice();
    setMessages([
      {
        id: "cleared-welcome",
        role: "assistant",
        content: `Conversation reset! How can I help you explore Vijay's background?`,
        timestamp: "Just now",
        suggestedFollowUps: [
          "Who is Vijay?",
          "What are Vijay's skills?",
          "Tell me about BudgetMind",
          "What is Vijay's education?",
          "How can I contact Vijay?",
        ],
      },
    ]);
  };

  return (
    <>
      {/* Floating Modern AI Assistant Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => {
            if (isMinimized) {
              setIsMinimized(false);
            } else {
              onToggle();
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0F172A]/90 backdrop-blur-xl border border-cyan-500/40 text-slate-100 shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:shadow-[0_0_40px_rgba(6,182,212,0.65)] hover:border-cyan-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/50 group"
          aria-label={isOpen && !isMinimized ? "Close Vijay AI Assistant" : "Open Vijay AI Assistant"}
        >
          {/* Orbital Ambient Halo */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-amber-400 opacity-40 blur-sm group-hover:opacity-75 transition duration-500 animate-pulse-subtle" />

          {/* 3D Avatar Head Thumbnail */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-400/60 shadow-[0_0_10px_rgba(6,182,212,0.4)] shrink-0 bg-slate-900">
            <img
              src="/images/avatar-developer-3d.png"
              alt="Vijay AI Avatar"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900 shadow-[0_0_6px_#34D399]" />
          </div>

          <div className="relative flex flex-col text-left pr-1">
            <span className="text-xs font-bold text-[#F8FAFC] flex items-center gap-1.5 leading-tight">
              <span>Ask Vijay AI</span>
              <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
            </span>
            <span className="text-[10px] text-cyan-300/90 font-mono leading-none">Portfolio Assistant</span>
          </div>

          {isOpen && !isMinimized && <X className="w-4 h-4 text-slate-400 ml-1" />}
        </motion.button>
      </div>

      {/* Modern AI Assistant Chat Panel */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 w-[calc(100vw-24px)] sm:w-[400px] h-[78vh] sm:h-[580px] max-h-[580px] bg-[#0F172A]/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-slate-700/80 z-50 flex flex-col overflow-hidden text-slate-100"
          >
            {/* Header: [Avatar] Vijay AI [Online] ... [Speaking] [—] [×] */}
            <div className="p-3.5 sm:p-4 border-b border-slate-800/90 bg-slate-900/95 flex items-center justify-between relative shrink-0">
              <div className="flex items-center gap-2.5">
                {/* 3D Avatar */}
                <div className="relative w-9 h-9 rounded-2xl overflow-hidden border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.35)] shrink-0 bg-slate-950">
                  <img
                    src="/images/avatar-developer-3d.png"
                    alt="Vijay AI Avatar"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900 shadow-[0_0_6px_#34D399]" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-[#F8FAFC] text-sm tracking-tight leading-none">
                      Vijay AI
                    </h3>
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 leading-none">
                      Online
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">AI Engineer Assistant</p>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1.5">
                {/* Active Audio Speech Stop Button */}
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-all shadow-sm animate-pulse"
                    title="Stop Voice Output"
                    aria-label="Stop Voice Output"
                  >
                    <Square className="w-3 h-3 fill-rose-300" />
                    <span>Stop Voice</span>
                  </button>
                )}

                {/* Read Aloud Toggle */}
                {speechSupported && (
                  <button
                    onClick={() => {
                      if (isSpeaking) stopSpeaking();
                      setIsSpeakingEnabled(!isSpeakingEnabled);
                    }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isSpeakingEnabled
                        ? "text-cyan-300 bg-cyan-950/80 border border-cyan-500/40"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                    title={isSpeakingEnabled ? "Disable Read Aloud" : "Enable Read Aloud"}
                    aria-label="Toggle voice readout"
                  >
                    {isSpeakingEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  </button>
                )}

                {/* Clear Chat Button */}
                <button
                  onClick={handleClear}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-300 hover:bg-slate-800 transition-colors"
                  title="Clear Chat History"
                  aria-label="Clear Chat History"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Minimize Button [—] */}
                <button
                  onClick={handleMinimize}
                  className="w-7 h-7 rounded-full border border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 hover:text-white text-slate-300 flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                  title="Minimize Chatbot"
                  aria-label="Minimize Chatbot"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                {/* Clear, Prominent Close Button [×] */}
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40 text-slate-300 flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400/50"
                  title="Close Vijay AI (Escape)"
                  aria-label="Close Chatbot"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Error Notification Banner if Mic Fails */}
            {voiceError && (
              <div className="px-3 py-2 bg-amber-950/60 border-b border-amber-500/30 flex items-center justify-between text-[11px] text-amber-200">
                <div className="flex items-center gap-1.5 flex-1 pr-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{voiceError}</span>
                </div>
                <button
                  onClick={() => setVoiceError(null)}
                  className="text-amber-400 hover:text-white shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Messages Scroll View */}
            <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 text-xs sm:text-sm">
              {messages.map((m) => {
                const isAssistant = m.role === "assistant";
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${isAssistant ? "" : "flex-row-reverse"}`}
                  >
                    {/* Role Icon */}
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs shadow-md ${
                        isAssistant
                          ? "bg-gradient-to-tr from-cyan-500 to-sky-500 text-slate-950 font-bold"
                          : "bg-slate-800 text-slate-200 border border-slate-700"
                      }`}
                    >
                      {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl p-3 sm:p-3.5 space-y-2.5 leading-relaxed ${
                        isAssistant
                          ? "bg-slate-900/90 text-slate-200 rounded-tl-sm border border-slate-800/90 shadow-md"
                          : "bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-medium rounded-tr-sm shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                      }`}
                    >
                      {/* Message Content */}
                      {isAssistant ? (
                        <FormattedMessage
                          content={m.content}
                          onNavigate={(url) => {
                            handleClose();
                            router.push(url);
                          }}
                          onQuery={(query) => {
                            handleSendMessage(query);
                          }}
                        />
                      ) : (
                        <div className="whitespace-pre-wrap font-medium">{m.content}</div>
                      )}

                      {/* Project Card Render (e.g. BudgetMind) */}
                      {m.projectCard && (
                        <div className="glass-card p-3 rounded-xl border border-cyan-500/40 bg-slate-950/80 mt-2 space-y-2 shadow-lg">
                          <div className="flex items-center justify-between">
                            <h4 className="font-extrabold text-cyan-300 text-xs sm:text-sm tracking-tight flex items-center gap-1.5">
                              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span>{m.projectCard.title}</span>
                            </h4>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40">
                              {m.projectCard.tagline || "Project"}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-snug">
                            {m.projectCard.description}
                          </p>
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono uppercase text-slate-400 block tracking-wider">
                              Tech Stack
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {m.projectCard.techStack.map((tech, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800/90 text-slate-200 border border-slate-700/80"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
                            <button
                              onClick={() => {
                                handleClose();
                                router.push("/projects");
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shadow-sm"
                            >
                              <span>View Project</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </button>
                            <a
                              href={m.projectCard.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                            >
                              <span>GitHub</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            {m.projectCard.liveDemoUrl && (
                              <a
                                href={m.projectCard.liveDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-cyan-950/80 hover:bg-cyan-900/90 text-cyan-300 border border-cyan-500/40 transition-colors"
                              >
                                <span>Live Demo</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Structured Skills Grid */}
                      {m.skillsGrid && (
                        <div className="space-y-1.5 mt-2">
                          <div className="text-[11px] font-bold text-white tracking-tight flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-cyan-400" />
                            <span>Vijay's Technical Skills</span>
                          </div>
                          <div className="grid grid-cols-1 gap-1.5">
                            {m.skillsGrid.map((group, gIdx) => (
                              <div key={gIdx} className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/90">
                                <h5 className="font-semibold text-cyan-300 text-[10px] mb-1 font-mono uppercase tracking-wider flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                  <span>{group.category}</span>
                                </h5>
                                <div className="flex flex-wrap gap-1">
                                  {group.skills.map((s, sIdx) => (
                                    <span
                                      key={sIdx}
                                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800/90 text-slate-200 border border-slate-700/80 hover:border-cyan-500/40 hover:text-cyan-200 transition-all shadow-sm select-none"
                                    >
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Interactive Actions / Buttons */}
                      {m.actions && m.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                          {m.actions.map((act, aIdx) => (
                            <button
                              key={aIdx}
                              onClick={() => handleActionClick(act)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                                act.variant === "primary"
                                  ? "bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)] hover:brightness-110"
                                  : act.variant === "secondary"
                                  ? "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600"
                                  : "bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/40"
                              }`}
                            >
                              <span>{act.label}</span>
                              {act.type === "external" && <ExternalLink className="w-3 h-3" />}
                              {act.type === "navigate" && <ArrowUpRight className="w-3 h-3" />}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Suggested Follow-Up Questions Chips */}
                      {m.suggestedFollowUps && m.suggestedFollowUps.length > 0 && (
                        <div className="pt-2 border-t border-slate-800/60 space-y-1">
                          <span className="text-[9px] font-mono text-slate-400 block uppercase">
                            Suggested follow-ups:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {m.suggestedFollowUps.map((prompt, pIdx) => (
                              <button
                                key={pIdx}
                                onClick={() => handleSendMessage(prompt)}
                                className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800/80 hover:bg-cyan-950 hover:text-cyan-300 text-slate-300 border border-slate-700 hover:border-cyan-500/40 transition-colors"
                              >
                                {prompt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <span
                        className={`text-[9px] block mt-1 ${
                          isAssistant ? "text-slate-500" : "text-slate-900/70 text-right"
                        }`}
                      >
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-500 text-slate-950 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                    <span className="text-[11px] text-cyan-300/90 font-mono">Vijay AI is thinking</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Live Voice Recording Status & Waveform Indicator */}
            {isListening && (
              <div className="px-3.5 py-2 bg-slate-950/90 border-t border-rose-500/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                  </span>
                  <span className="text-xs font-semibold text-rose-300">Listening...</span>

                  {/* Equalizer Waveform Animation */}
                  <div className="flex items-end gap-0.5 h-3.5 ml-1">
                    <span className="w-0.5 h-2 bg-rose-400 animate-[bounce_0.6s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-3.5 bg-rose-500 animate-[bounce_0.4s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-1.5 bg-rose-300 animate-[bounce_0.8s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-3 bg-cyan-400 animate-[bounce_0.5s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-2 bg-cyan-300 animate-[bounce_0.7s_ease-in-out_infinite]" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                    Speak complete question
                  </span>
                  <button
                    type="button"
                    onClick={finalizeAndSendVoice}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-500 text-white hover:bg-rose-400 transition-colors shadow-sm"
                  >
                    <Square className="w-2.5 h-2.5 fill-white" />
                    <span>Done</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Action Suggestion Chips Horizontal Bar */}
            <div className="px-3 py-1.5 border-t border-slate-800 bg-slate-900/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              {AI_ASSISTANT_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSendMessage(suggestion)}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-800/80 hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-500/40 text-slate-300 border border-slate-700/70 whitespace-nowrap transition-colors shrink-0"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input Form with Voice & Keyboard Support */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0"
            >
              {/* Voice Input Button */}
              {voiceRecognitionSupported && (
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`p-2.5 rounded-xl transition-all shrink-0 ${
                    isListening
                      ? "bg-rose-500 text-white animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.6)]"
                      : "bg-slate-950 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 border border-slate-700"
                  }`}
                  title={isListening ? "Listening... Click to stop and send" : "Start Voice Input"}
                  aria-label={isListening ? "Stop Voice Input" : "Start Voice Input"}
                >
                  {isListening ? (
                    <Square className="w-4 h-4 fill-white" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>
              )}

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isListening
                    ? "Listening to your question..."
                    : "Ask about BudgetMind, skills, projects, CGPA..."
                }
                className={`flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-950 border transition-all text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none ${
                  isListening
                    ? "border-rose-500/60 ring-2 ring-rose-500/20"
                    : "border-slate-700 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400"
                }`}
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 text-slate-950 font-bold hover:from-cyan-300 hover:to-sky-300 disabled:opacity-40 transition-all shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
