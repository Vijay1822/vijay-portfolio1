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
          className="relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#121C2D]/95 backdrop-blur-xl border border-[rgba(34,211,238,0.35)] text-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:border-[#22D3EE] transition-all focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30 group"
          aria-label={isOpen && !isMinimized ? "Close Vijay AI Assistant" : "Open Vijay AI Assistant"}
        >
          {/* Orbital Ambient Halo */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#2563EB] opacity-25 blur-sm group-hover:opacity-40 transition duration-500" />

          {/* 3D Avatar Head Thumbnail */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#22D3EE]/50 shadow-[0_0_10px_rgba(34,211,238,0.2)] shrink-0 bg-[#070B14]">
            <img
              src="/images/avatar-developer-3d.png"
              alt="Vijay AI Avatar"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#34D399] ring-2 ring-[#121C2D] shadow-[0_0_6px_#34D399]" />
          </div>

          <div className="relative flex flex-col text-left pr-1">
            <span className="text-xs font-bold text-[#F8FAFC] flex items-center gap-1.5 leading-tight">
              <span>Ask Vijay AI</span>
              <Sparkles className="w-3 h-3 text-[#22D3EE]" />
            </span>
            <span className="text-[10px] text-[#22D3EE]/90 font-mono leading-none">Portfolio Assistant</span>
          </div>

          {isOpen && !isMinimized && <X className="w-4 h-4 text-[#A7B4C7] ml-1" />}
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
            className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 w-[calc(100vw-24px)] sm:w-[400px] h-[78vh] sm:h-[580px] max-h-[580px] bg-[#121C2D]/98 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-[rgba(34,211,238,0.22)] z-50 flex flex-col overflow-hidden text-[#F8FAFC]"
          >
            {/* Header: [Avatar] Vijay AI [Online] ... [Speaking] [—] [×] */}
            <div className="p-3.5 sm:p-4 border-b border-[rgba(148,163,184,0.12)] bg-[#0D1626]/95 flex items-center justify-between relative shrink-0">
              <div className="flex items-center gap-2.5">
                {/* 3D Avatar */}
                <div className="relative w-9 h-9 rounded-2xl overflow-hidden border border-[rgba(34,211,238,0.4)] shadow-[0_0_12px_rgba(34,211,238,0.2)] shrink-0 bg-[#070B14]">
                  <img
                    src="/images/avatar-developer-3d.png"
                    alt="Vijay AI Avatar"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-[#34D399] ring-2 ring-[#0D1626] shadow-[0_0_6px_#34D399]" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-[#F8FAFC] text-sm tracking-tight leading-none">
                      Vijay AI
                    </h3>
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-[#0D2731] text-[#34D399] border border-[#34D399]/40 leading-none">
                      Online
                    </span>
                  </div>
                  <p className="text-[10px] text-[#A7B4C7] font-mono mt-0.5">AI Engineer Assistant</p>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1.5">
                {/* Active Audio Speech Stop Button */}
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-[#FB7185]/20 text-[#FB7185] border border-[#FB7185]/40 hover:bg-[#FB7185]/30 transition-all shadow-sm animate-pulse"
                    title="Stop Voice Output"
                    aria-label="Stop Voice Output"
                  >
                    <Square className="w-3 h-3 fill-[#FB7185]" />
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
                        ? "text-[#22D3EE] bg-[#0D2731] border border-[rgba(34,211,238,0.4)]"
                        : "text-[#A7B4C7] hover:text-[#F8FAFC] hover:bg-[rgba(34,211,238,0.10)]"
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
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#A7B4C7] hover:text-[#FB7185] hover:bg-[rgba(251,113,133,0.10)] transition-colors"
                  title="Clear Chat History"
                  aria-label="Clear Chat History"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Minimize Button [—] */}
                <button
                  onClick={handleMinimize}
                  className="w-7 h-7 rounded-full border border-[rgba(148,163,184,0.15)] bg-[#172338] hover:bg-[#121C2D] hover:text-white text-[#A7B4C7] flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30"
                  title="Minimize Chatbot"
                  aria-label="Minimize Chatbot"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                {/* Clear, Prominent Close Button [×] */}
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full border border-[rgba(148,163,184,0.15)] bg-[#172338] hover:bg-[#FB7185]/20 hover:text-[#FB7185] hover:border-[#FB7185]/40 text-[#A7B4C7] flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FB7185]/40"
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
                          ? "bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] shadow-[0_0_10px_rgba(34,211,238,0.15)]"
                          : "bg-[#172338] text-[#A7B4C7] border border-[rgba(148,163,184,0.15)]"
                      }`}
                    >
                      {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl p-3 sm:p-3.5 space-y-2.5 leading-relaxed ${
                        isAssistant
                          ? "bg-[#0D2731] text-[#F8FAFC] rounded-tl-sm border border-[rgba(34,211,238,0.22)] shadow-md"
                          : "bg-[#172338] text-[#F8FAFC] font-medium rounded-tr-sm border border-[rgba(148,163,184,0.15)] shadow-md"
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
                        <div className="glass-card p-3 rounded-xl border border-[rgba(34,211,238,0.3)] bg-[#0D1626] mt-2 space-y-2 shadow-lg">
                          <div className="flex items-center justify-between">
                            <h4 className="font-extrabold text-[#22D3EE] text-xs sm:text-sm tracking-tight flex items-center gap-1.5">
                              <FolderGit2 className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                              <span>{m.projectCard.title}</span>
                            </h4>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono text-[#22D3EE] bg-[#0D2731] border border-[rgba(34,211,238,0.3)]">
                              {m.projectCard.tagline || "Project"}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#A7B4C7] leading-snug">
                            {m.projectCard.description}
                          </p>
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono uppercase text-[#64748B] block tracking-wider">
                              Tech Stack
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {m.projectCard.techStack.map((tech, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#172338] text-[#67E8F9] border border-[rgba(34,211,238,0.15)]"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[rgba(148,163,184,0.12)]">
                            <button
                              onClick={() => {
                                handleClose();
                                router.push("/projects");
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#22D3EE] text-[#061018] hover:bg-[#67E8F9] transition-colors shadow-sm"
                            >
                              <span>View Project</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </button>
                            <a
                              href={m.projectCard.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#172338] hover:bg-[#121C2D] text-[#F8FAFC] border border-[rgba(148,163,184,0.15)] transition-colors"
                            >
                              <span>GitHub</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            {m.projectCard.liveDemoUrl && (
                              <a
                                href={m.projectCard.liveDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#0D2731] hover:bg-[#070B14] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] transition-colors"
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
                          <div className="text-[11px] font-bold text-[#F8FAFC] tracking-tight flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#22D3EE]" />
                            <span>Vijay&apos;s Technical Skills</span>
                          </div>
                          <div className="grid grid-cols-1 gap-1.5">
                            {m.skillsGrid.map((group, gIdx) => (
                              <div key={gIdx} className="p-2 rounded-xl bg-[#0D1626] border border-[rgba(148,163,184,0.12)]">
                                <h5 className="font-semibold text-[#22D3EE] text-[10px] mb-1 font-mono uppercase tracking-wider flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                                  <span>{group.category}</span>
                                </h5>
                                <div className="flex flex-wrap gap-1">
                                  {group.skills.map((s, sIdx) => (
                                    <span
                                      key={sIdx}
                                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#172338] text-[#67E8F9] border border-[rgba(34,211,238,0.15)] hover:border-[#22D3EE] transition-all select-none"
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
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[rgba(148,163,184,0.12)]">
                          {m.actions.map((act, aIdx) => (
                            <button
                              key={aIdx}
                              onClick={() => handleActionClick(act)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                                act.variant === "primary"
                                  ? "bg-[#22D3EE] text-[#061018] font-bold shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:bg-[#67E8F9]"
                                  : act.variant === "secondary"
                                  ? "bg-[#172338] hover:bg-[#121C2D] text-[#F8FAFC] border border-[rgba(148,163,184,0.15)]"
                                  : "bg-[#0D1626] hover:bg-[#172338] text-[#22D3EE] border border-[rgba(34,211,238,0.3)]"
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
                        <div className="pt-2 border-t border-[rgba(148,163,184,0.12)] space-y-1">
                          <span className="text-[9px] font-mono text-[#64748B] block uppercase">
                            Suggested follow-ups:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {m.suggestedFollowUps.map((prompt, pIdx) => (
                              <button
                                key={pIdx}
                                onClick={() => handleSendMessage(prompt)}
                                className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#172338] hover:bg-[#0D2731] hover:text-[#22D3EE] text-[#A7B4C7] border border-[rgba(148,163,184,0.15)] hover:border-[rgba(34,211,238,0.3)] transition-colors"
                              >
                                {prompt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <span
                        className={`text-[9px] block mt-1 ${
                          isAssistant ? "text-[#64748B]" : "text-[#A7B4C7] text-right"
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
                <div className="flex items-center gap-2 text-[#A7B4C7] text-xs pl-2">
                  <div className="w-7 h-7 rounded-xl bg-[#0D1626] text-[#22D3EE] border border-[rgba(34,211,238,0.3)] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.15)]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-2.5 bg-[#0D2731] border border-[rgba(34,211,238,0.2)] rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                    <span className="text-[11px] text-[#22D3EE] font-mono">Vijay AI is thinking</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Live Voice Recording Status & Waveform Indicator */}
            {isListening && (
              <div className="px-3.5 py-2 bg-[#070B14] border-t border-[#FB7185]/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FB7185] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FB7185]" />
                  </span>
                  <span className="text-xs font-semibold text-[#FB7185]">Listening...</span>

                  {/* Equalizer Waveform Animation */}
                  <div className="flex items-end gap-0.5 h-3.5 ml-1">
                    <span className="w-0.5 h-2 bg-[#FB7185] animate-[bounce_0.6s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-3.5 bg-[#FB7185] animate-[bounce_0.4s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-1.5 bg-[#FB7185] animate-[bounce_0.8s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-3 bg-[#22D3EE] animate-[bounce_0.5s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-2 bg-[#22D3EE] animate-[bounce_0.7s_ease-in-out_infinite]" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#64748B] font-mono hidden sm:inline">
                    Speak complete question
                  </span>
                  <button
                    type="button"
                    onClick={finalizeAndSendVoice}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FB7185] text-[#061018] hover:brightness-110 transition-colors shadow-sm"
                  >
                    <Square className="w-2.5 h-2.5 fill-[#061018]" />
                    <span>Done</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Action Suggestion Chips Horizontal Bar */}
            <div className="px-3 py-1.5 border-t border-[rgba(148,163,184,0.12)] bg-[#0D1626]/90 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              {AI_ASSISTANT_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSendMessage(suggestion)}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#172338] hover:bg-[#0D2731] hover:text-[#22D3EE] hover:border-[rgba(34,211,238,0.3)] text-[#A7B4C7] border border-[rgba(148,163,184,0.15)] whitespace-nowrap transition-colors shrink-0"
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
              className="p-3 bg-[#0D1626] border-t border-[rgba(148,163,184,0.12)] flex items-center gap-2 shrink-0"
            >
              {/* Voice Input Button */}
              {voiceRecognitionSupported && (
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`p-2.5 rounded-xl transition-all shrink-0 ${
                    isListening
                      ? "bg-[#FB7185] text-[#061018] animate-pulse shadow-[0_0_15px_rgba(251,113,133,0.5)]"
                      : "bg-[#070B14] text-[#A7B4C7] hover:text-[#22D3EE] hover:bg-[#172338] border border-[rgba(148,163,184,0.15)]"
                  }`}
                  title={isListening ? "Listening... Click to stop and send" : "Start Voice Input"}
                  aria-label={isListening ? "Stop Voice Input" : "Start Voice Input"}
                >
                  {isListening ? (
                    <Square className="w-4 h-4 fill-[#061018]" />
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
                className={`flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-[#070B14] border transition-all text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none ${
                  isListening
                    ? "border-[#FB7185]/60 ring-2 ring-[#FB7185]/20"
                    : "border-[rgba(148,163,184,0.15)] focus:ring-2 focus:ring-[#22D3EE]/10 focus:border-[#22D3EE]"
                }`}
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-[#22D3EE] text-[#061018] font-bold hover:bg-[#67E8F9] disabled:opacity-40 transition-all shrink-0 shadow-[0_10px_25px_rgba(34,211,238,0.18)]"
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
