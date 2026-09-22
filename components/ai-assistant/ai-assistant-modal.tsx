"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User, Trash2, ArrowUpRight, MessageSquare } from "lucide-react";
import { AI_ASSISTANT_SUGGESTIONS, PERSONAL_INFO } from "@/lib/data";
import { generateFallbackResponse } from "@/lib/ai-assistant";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AIAssistantModal({ isOpen, onToggle }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-welcome",
      role: "assistant",
      content: `Hello! I'm **Vijay AI**, Mamidala Vijay Kumar's personal portfolio assistant.\n\nAsk me anything about Vijay's **AI/ML projects**, his **CSE-IoT coursework at VNR VJIET**, his **skills**, or how to get in touch!`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 200);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

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
      const history = messages.slice(-5).map((m) => ({
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
        const replyText = data.reply || generateFallbackResponse(query);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: "assistant",
            content: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        // Graceful client fallback
        const fallback = generateFallbackResponse(query);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: "assistant",
            content: fallback,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch {
      // 100% resilient client-side fallback
      const fallback = generateFallbackResponse(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: fallback,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: "cleared-welcome",
        role: "assistant",
        content: `Conversation reset! How can I help you learn more about Vijay?`,
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <>
      {/* Floating Circular AI Assistant Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-xl hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 group"
          aria-label="Open Vijay AI Assistant"
        >
          {/* Orbital Particles / Glow Pulse */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-40 blur-sm group-hover:opacity-75 transition duration-500 animate-pulse-subtle" />
          
          <div className="relative flex items-center justify-center">
            {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
          </div>
        </motion.button>
      </div>

      {/* Modern AI Assistant Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 w-[94vw] sm:w-[420px] max-h-[620px] h-[80vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 z-50 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-sm">Vijay AI</h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700">
                      Online
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Portfolio & Knowledge Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                  title="Clear Chat History"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onToggle}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                  aria-label="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((m) => {
                const isAssistant = m.role === "assistant";
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${isAssistant ? "" : "flex-row-reverse"}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                        isAssistant
                          ? "bg-blue-600 text-white shadow-2xs"
                          : "bg-slate-800 text-white"
                      }`}
                    >
                      {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                        isAssistant
                          ? "bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200/60"
                          : "bg-blue-600 text-white rounded-tr-sm"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{m.content}</div>
                      <span
                        className={`text-[10px] block mt-1.5 ${
                          isAssistant ? "text-slate-400" : "text-blue-200 text-right"
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
                <div className="flex items-center gap-2 text-slate-500 text-xs pl-2">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 bg-slate-100 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                    <span
                      className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Pills */}
            <div className="px-3 py-2 border-t border-slate-100 bg-slate-50/50 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {AI_ASSISTANT_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSendMessage(suggestion)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 whitespace-nowrap transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Vijay's projects, skills, college..."
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:hover:bg-blue-600 transition-colors shrink-0"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
