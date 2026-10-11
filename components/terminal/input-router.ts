export type TerminalInputRoute =
  | { type: "empty" }
  | { type: "command"; command: string; args: string[]; raw: string }
  | { type: "ai-question"; query: string }
  | { type: "unknown-command"; command: string; suggestion?: string };

// Supported zero-argument CLI commands
const ZERO_ARG_COMMANDS = new Set([
  "whoami",
  "about",
  "projects",
  "skills",
  "stack",
  "education",
  "resume",
  "leetcode",
  "github",
  "linkedin",
  "contact",
  "clear",
  "exit",
  "date",
  "history",
  "matrix",
  "ping",
  "coffee",
  "sudo",
  "theme",
  "id",
  "uname",
  "cv",
  "lc",
  "git",
  "email",
  "ls",
  "work",
  "experience",
  "milestones",
  "achievements",
  "work-history",
]);

// Valid flag/argument combinations for multi-token CLI commands
const VALID_PROJECT_ARGS = new Set([
  "--featured",
  "budgetmind",
  "smart-farmer-procurement",
  "smart-farmer",
  "smart-fan-control",
  "smart-fan",
]);

const VALID_SKILLS_FLAGS = new Set(["--ai", "--frontend", "--backend"]);

const VALID_OPEN_TARGETS = new Set([
  "projects",
  "skills",
  "resume",
  "contact",
  "about",
  "education",
  "journey",
]);

const QUESTION_STARTERS = new Set([
  "what",
  "how",
  "why",
  "who",
  "where",
  "when",
  "which",
  "explain",
  "tell",
  "describe",
  "compare",
  "summarize",
  "detail",
  "can",
  "could",
  "would",
  "should",
  "is",
  "are",
  "does",
  "do",
  "did",
  "will",
  "show",
  "give",
  "list",
  "find",
  "any",
  "share",
  "help me understand",
]);

// Common natural-language connectors that signal conversational questions rather than shell args
const CONVERSATIONAL_WORDS = new Set([
  "is",
  "are",
  "was",
  "were",
  "the",
  "his",
  "him",
  "vijay",
  "vijay's",
  "built",
  "created",
  "used",
  "using",
  "in",
  "of",
  "for",
  "with",
  "by",
  "detail",
  "details",
  "architecture",
  "experience",
  "background",
  "technologies",
  "tech",
  "projects",
  "skills",
  "cgpa",
  "college",
  "hackathons",
]);

/**
 * Accurately routes user input between:
 * - Recognized safe CLI commands and flags
 * - Natural-language AI queries
 * - Unknown command typos
 */
export function routeTerminalInput(input: string): TerminalInputRoute {
  const trimmed = input.trim();
  if (!trimmed) {
    return { type: "empty" };
  }

  // Explicit 'ask' prefix always routes to AI (e.g. 'ask What is BudgetMind?')
  if (/^ask\s+/i.test(trimmed)) {
    const query = trimmed.replace(/^ask\s+/i, "").replace(/^["']|["']$/g, "").trim();
    if (query) {
      return { type: "ai-question", query };
    }
  }

  const tokens = trimmed.split(/\s+/);
  const firstToken = tokens[0].toLowerCase();
  const lowerFull = trimmed.toLowerCase();

  // 1. Exact zero-argument command (e.g. "projects", "skills", "help", "whoami", "resume", "clear")
  if (tokens.length === 1) {
    if (ZERO_ARG_COMMANDS.has(firstToken) || firstToken === "help") {
      return {
        type: "command",
        command: firstToken,
        args: [],
        raw: trimmed,
      };
    }
  }

  // 2. Recognized multi-token CLI command forms
  // 2a. "help [command]"
  if (firstToken === "help" && tokens.length === 2 && !tokens[1].includes("?")) {
    return {
      type: "command",
      command: "help",
      args: [tokens[1].toLowerCase()],
      raw: trimmed,
    };
  }

  // 2b. "projects [known-project | --featured]"
  if (firstToken === "projects" && tokens.length === 2) {
    const secondToken = tokens[1].toLowerCase();
    if (VALID_PROJECT_ARGS.has(secondToken)) {
      return {
        type: "command",
        command: "projects",
        args: [tokens[1]],
        raw: trimmed,
      };
    }
  }

  // 2c. "skills [--ai | --frontend | --backend]"
  if (firstToken === "skills" && tokens.length === 2) {
    const secondToken = tokens[1].toLowerCase();
    if (VALID_SKILLS_FLAGS.has(secondToken)) {
      return {
        type: "command",
        command: "skills",
        args: [tokens[1]],
        raw: trimmed,
      };
    }
  }

  // 2d. "cat resume"
  if (firstToken === "cat" && tokens.length === 2 && tokens[1].toLowerCase() === "resume") {
    return {
      type: "command",
      command: "resume",
      args: [],
      raw: trimmed,
    };
  }

  // 2e. "open [destination]"
  if (firstToken === "open" && tokens.length === 2) {
    const target = tokens[1].toLowerCase();
    if (VALID_OPEN_TARGETS.has(target)) {
      return {
        type: "command",
        command: "open",
        args: [tokens[1]],
        raw: trimmed,
      };
    }
  }

  // 3. Natural-language AI queries:
  // - Contains question mark
  // - Starts with question word
  // - Multi-word input that is not a recognized shell command
  const hasQuestionMark = trimmed.includes("?");
  const startsWithQuestionWord = QUESTION_STARTERS.has(firstToken);
  const containsConversational = tokens.some((t) =>
    CONVERSATIONAL_WORDS.has(t.toLowerCase().replace(/[^a-z']/g, ""))
  );

  // If it has a question mark or starts with a question word -> AI question
  if (hasQuestionMark || startsWithQuestionWord) {
    return { type: "ai-question", query: trimmed };
  }

  // Multi-token input with conversational or topical keywords (e.g. "BudgetMind architecture", "Explain BudgetMind", "tell me about him")
  if (tokens.length >= 2 || containsConversational) {
    // Check if user typed a clear shell command like "cd ..", "ls -la", "rm -rf", "sudo apt"
    const isShellCommandLike =
      /^(cd\s|ls\s-|rm\s|mkdir\s|touch\s|chmod\s|curl\s|git\s(commit|push|pull|clone)|docker\s|npm\s|yarn\s|pnpm\s)/i.test(
        trimmed
      );
    if (!isShellCommandLike) {
      return { type: "ai-question", query: trimmed };
    }
  }

  // Single word topic queries like "BudgetMind", "Python", "CGPA"
  if (
    tokens.length === 1 &&
    (lowerFull === "budgetmind" ||
      lowerFull === "cgpa" ||
      lowerFull === "hackathon" ||
      lowerFull === "iot" ||
      lowerFull === "rag")
  ) {
    return { type: "ai-question", query: trimmed };
  }

  // 4. Unrecognized command typo (e.g. "projcts", "skils", "xyz123", "cd ..")
  return {
    type: "unknown-command",
    command: trimmed,
  };
}
