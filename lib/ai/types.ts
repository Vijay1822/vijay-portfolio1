export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export type AIProviderId = "groq" | "gemini" | "local-knowledge" | "error";

export interface AIProviderResponse {
  reply: string;
  source: AIProviderId;
  model?: string;
  latencyMs?: number;
  isError?: boolean;
  canRetry?: boolean;
}

export interface ProviderConfig {
  name: AIProviderId;
  enabled: boolean;
  model: string;
  timeoutMs: number;
}
