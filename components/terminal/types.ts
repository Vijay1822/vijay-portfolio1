export type CommandCategory =
  | "Navigation"
  | "Professional"
  | "Skills & Work"
  | "Utilities"
  | "Fun";

export interface CommandFlag {
  flag: string;
  description: string;
}

export interface CommandDefinition {
  name: string;
  description: string;
  category: CommandCategory;
  usage: string;
  aliases?: string[];
  examples?: string[];
  flags?: CommandFlag[];
  hidden?: boolean;
}

export type OutputType =
  | "command"
  | "welcome"
  | "system"
  | "help"
  | "projects"
  | "project-detail"
  | "skills"
  | "experience"
  | "whoami"
  | "about"
  | "education"
  | "contact"
  | "resume"
  | "leetcode"
  | "github"
  | "linkedin"
  | "history"
  | "ask"
  | "ai-response"
  | "ai-loading"
  | "easter-egg"
  | "matrix"
  | "date"
  | "error";

export interface TerminalOutputItem {
  id: string;
  type: OutputType;
  commandText?: string;
  timestamp: string;
  status?: "success" | "warning" | "error" | "info";
  text?: string;
  payload?: any;
}

export interface AutocompleteSuggestion {
  name: string;
  description: string;
  hint?: string;
}

export interface TerminalSessionStats {
  sessionStatus: "Online" | "Idle";
  totalCommandsImplemented: number;
  commandsExecuted: number;
  currentRoute: string;
}
