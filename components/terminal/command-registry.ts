import {
  CommandDefinition,
  TerminalOutputItem,
  AutocompleteSuggestion,
} from "./types";
import {
  PERSONAL_INFO,
  PROJECTS,
  SKILL_CATEGORIES,
  EDUCATION,
  ACHIEVEMENTS,
} from "@/lib/data";

export interface ExecutionContext {
  onNavigate?: (path: string) => void;
  onToggleMatrix?: () => void;
  onAskChatbot?: (question: string) => void;
  history?: string[];
}

export const COMMAND_REGISTRY: CommandDefinition[] = [
  {
    name: "help",
    description: "Display available commands or details for a specific command",
    category: "Utilities",
    usage: "help [command]",
    examples: ["help", "help projects", "help skills", "help ask"],
  },
  {
    name: "whoami",
    description: "Display developer profile card & core specialization",
    category: "Professional",
    usage: "whoami",
    aliases: ["id", "uname", "bio"],
  },
  {
    name: "about",
    description: "Detailed overview of engineering vision, background & mindset",
    category: "Navigation",
    usage: "about",
  },
  {
    name: "projects",
    description: "Browse engineering projects or inspect a specific project",
    category: "Skills & Work",
    usage: "projects [budgetmind | smart-farmer | smart-fan | --featured]",
    aliases: ["ls", "work"],
    flags: [
      { flag: "--featured", description: "Filter only featured AI/IoT projects" },
    ],
    examples: [
      "projects",
      "projects budgetmind",
      "projects smart-farmer-procurement",
      "projects smart-fan-control",
      "projects --featured",
    ],
  },
  {
    name: "skills",
    description: "Explore categorized technical skill matrix & toolchains",
    category: "Skills & Work",
    usage: "skills [--ai | --frontend | --backend]",
    flags: [
      { flag: "--ai", description: "Filter AI, Machine Learning & LLM tools" },
      { flag: "--frontend", description: "Filter Frontend engineering stack" },
      { flag: "--backend", description: "Filter Backend & database stack" },
    ],
    examples: ["skills", "skills --ai", "skills --frontend", "skills --backend"],
  },
  {
    name: "experience",
    description: "Verified engineering milestones, hackathons & IoT hardware projects",
    category: "Professional",
    usage: "experience",
    aliases: ["milestones", "achievements", "work-history"],
  },
  {
    name: "stack",
    description: "Quick snapshot of primary technologies & architectures",
    category: "Skills & Work",
    usage: "stack",
  },
  {
    name: "resume",
    description: "View resume credentials, academic scores & download link",
    category: "Professional",
    usage: "resume",
    aliases: ["cv", "cat resume"],
  },
  {
    name: "leetcode",
    description: "View LeetCode competitive problem solving profile & stats",
    category: "Professional",
    usage: "leetcode",
    aliases: ["lc"],
  },
  {
    name: "github",
    description: "Access GitHub repositories, commits, and open-source code",
    category: "Professional",
    usage: "github",
    aliases: ["git"],
  },
  {
    name: "linkedin",
    description: "Open professional network profile on LinkedIn",
    category: "Professional",
    usage: "linkedin",
  },
  {
    name: "education",
    description: "View university degree, coursework & CGPA at VNR VJIET",
    category: "Navigation",
    usage: "education",
    aliases: ["college", "academics"],
  },
  {
    name: "contact",
    description: "Get direct email, location, and contact options",
    category: "Navigation",
    usage: "contact",
    aliases: ["email"],
  },
  {
    name: "ask",
    description: "Open Vijay AI chatbot with a prefilled question",
    category: "Utilities",
    usage: 'ask "question"',
    examples: [
      'ask "Explain BudgetMind"',
      'ask "What are Vijay\'s skills?"',
      'ask "Tell me about your education at VNR VJIET"',
    ],
  },
  {
    name: "history",
    description: "Display list of commands executed in current terminal session",
    category: "Utilities",
    usage: "history",
  },
  {
    name: "date",
    description: "Display current system timestamp & local timezone",
    category: "Utilities",
    usage: "date",
  },
  {
    name: "clear",
    description: "Clear terminal screen output",
    category: "Utilities",
    usage: "clear",
    aliases: ["cls"],
  },
  {
    name: "exit",
    description: "Close or minimize the engineering terminal window",
    category: "Utilities",
    usage: "exit",
    aliases: ["quit"],
  },
  {
    name: "hello",
    description: "Say hello to Vijay's workspace assistant",
    category: "Fun",
    usage: "hello",
    aliases: ["hi", "hey"],
  },
  {
    name: "coffee",
    description: "Brew virtual developer coffee",
    category: "Fun",
    usage: "coffee",
  },
  {
    name: "sudo",
    description: "Attempt superuser elevation",
    category: "Fun",
    usage: "sudo [command]",
  },
  {
    name: "matrix",
    description: "Toggle subtle digital stream visual easter egg",
    category: "Fun",
    usage: "matrix",
  },
];

// Open destinations table
const OPEN_DESTINATIONS: Record<string, string> = {
  projects: "projects",
  skills: "skills",
  resume: "resume",
  leetcode: "leetcode",
  github: "github",
  linkedin: "linkedin",
  contact: "contact",
  education: "education",
  about: "about",
  experience: "experience",
};

/**
 * Parses user input safely without eval or arbitrary code execution.
 */
export function parseCommandLine(input: string): {
  raw: string;
  command: string;
  args: string[];
  flags: string[];
} {
  const trimmed = input.trim();
  if (!trimmed) {
    return { raw: "", command: "", args: [], flags: [] };
  }

  // Handle 'ask' specifically to preserve question strings with spaces and quotes
  if (/^ask\b/i.test(trimmed)) {
    const questionMatch =
      trimmed.match(/^ask\s+["'](.+?)["']$/i) ||
      trimmed.match(/^ask\s+(.+)$/i);
    const question = questionMatch ? questionMatch[1].trim() : "";
    return {
      raw: trimmed,
      command: "ask",
      args: question ? [question] : [],
      flags: [],
    };
  }

  // Tokenize preserving flag structure
  const tokens = trimmed.split(/\s+/).filter(Boolean);
  const command = tokens[0].toLowerCase();
  const args: string[] = [];
  const flags: string[] = [];

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.startsWith("--") || token.startsWith("-")) {
      flags.push(token.toLowerCase());
    } else {
      args.push(token);
    }
  }

  return { raw: trimmed, command, args, flags };
}

/**
 * Resolves aliases to canonical commands.
 */
export function resolveCommandAlias(
  command: string,
  args: string[]
): { canonical: string; args: string[]; flags: string[] } | null {
  const fullRaw = [command, ...args].join(" ").toLowerCase();

  // Check "open <destination>" pattern
  if (command === "open" && args.length > 0) {
    const dest = args[0].toLowerCase();
    if (OPEN_DESTINATIONS[dest]) {
      return { canonical: OPEN_DESTINATIONS[dest], args: args.slice(1), flags: [] };
    }
  }

  // Check "cat resume"
  if (command === "cat" && args[0]?.toLowerCase() === "resume") {
    return { canonical: "resume", args: [], flags: [] };
  }

  // Match against direct command names
  const directMatch = COMMAND_REGISTRY.find((c) => c.name === command);
  if (directMatch) {
    return { canonical: directMatch.name, args, flags: [] };
  }

  // Match against registered aliases
  for (const cmd of COMMAND_REGISTRY) {
    if (cmd.aliases?.includes(command) || cmd.aliases?.includes(fullRaw)) {
      return { canonical: cmd.name, args, flags: [] };
    }
  }

  // Easter egg: ping
  if (command === "ping") {
    return { canonical: "ping", args, flags: [] };
  }

  return null;
}

/**
 * Autocomplete suggestions based on current query.
 */
export function getAutocompleteSuggestions(input: string): AutocompleteSuggestion[] {
  const trimmed = input.trimStart();
  if (!trimmed) return [];

  const lower = trimmed.toLowerCase();

  // If user typed "projects "
  if (lower.startsWith("projects ")) {
    const subQuery = lower.slice(9).trim();
    const suggestions: AutocompleteSuggestion[] = [
      {
        name: "projects budgetmind",
        description: "View BudgetMind AI agent deep details",
        hint: "[Tab]",
      },
      {
        name: "projects smart-farmer-procurement",
        description: "View Agricultural Marketplace case study",
        hint: "[Tab]",
      },
      {
        name: "projects smart-fan-control",
        description: "View Closed-Loop IoT PWM fan controller",
        hint: "[Tab]",
      },
      {
        name: "projects --featured",
        description: "View top featured projects only",
        hint: "[Tab]",
      },
    ];
    return suggestions.filter((s) => s.name.toLowerCase().includes(subQuery));
  }

  // If user typed "ask "
  if (lower.startsWith("ask")) {
    return [
      {
        name: 'ask "Explain BudgetMind"',
        description: "Ask Vijay AI about BudgetMind architecture",
        hint: "[Tab]",
      },
      {
        name: 'ask "What are Vijay\'s skills?"',
        description: "Ask chatbot for technical skills summary",
        hint: "[Tab]",
      },
      {
        name: 'ask "What is Vijay\'s education?"',
        description: "Ask chatbot about degree at VNR VJIET",
        hint: "[Tab]",
      },
    ];
  }

  // If user typed "open "
  if (lower.startsWith("open ")) {
    const destQuery = lower.slice(5).trim();
    return Object.keys(OPEN_DESTINATIONS)
      .filter((dest) => dest.startsWith(destQuery))
      .map((dest) => ({
        name: `open ${dest}`,
        description: `Navigate to ${dest}`,
        hint: "[Tab]",
      }));
  }

  // If user typed "help "
  if (lower.startsWith("help ")) {
    const helpQuery = lower.slice(5).trim();
    return COMMAND_REGISTRY.filter(
      (c) => c.name !== "help" && c.name.startsWith(helpQuery)
    ).map((c) => ({
      name: `help ${c.name}`,
      description: `View docs for ${c.name}`,
      hint: "[Tab]",
    }));
  }

  // If user typed "skills --"
  if (lower.startsWith("skills -")) {
    const flags = ["--ai", "--frontend", "--backend"];
    const flagQuery = lower.slice(7).trim();
    return flags
      .filter((f) => f.startsWith(flagQuery))
      .map((f) => ({
        name: `skills ${f}`,
        description: `Filter skills by ${f.replace("--", "")}`,
        hint: "[Tab]",
      }));
  }

  // Match command names or aliases
  const results: AutocompleteSuggestion[] = [];
  for (const cmd of COMMAND_REGISTRY) {
    if (cmd.name.startsWith(lower)) {
      results.push({
        name: cmd.name,
        description: cmd.description,
        hint: "[Tab]",
      });
    }
  }

  // Also suggest "projects budgetmind" if typing "pro"
  if ("projects budgetmind".startsWith(lower) && !results.some((r) => r.name === "projects budgetmind")) {
    results.push({
      name: "projects budgetmind",
      description: "Direct deep view of BudgetMind",
      hint: "[Tab]",
    });
  }

  // Also match "open"
  if ("open".startsWith(lower) && !results.some((r) => r.name === "open")) {
    results.push({
      name: "open",
      description: "Open specific section (e.g. open projects)",
      hint: "[Tab]",
    });
  }

  return results.slice(0, 6);
}

/**
 * Safe Command Execution Handler.
 * Returns an OutputItem with structured payload to be rendered inside the terminal.
 */
export function executeCommand(
  rawInput: string,
  contextOrNavigate?: ExecutionContext | ((path: string) => void),
  legacyOnToggleMatrix?: () => void
): TerminalOutputItem {
  const timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const context: ExecutionContext =
    typeof contextOrNavigate === "function"
      ? {
          onNavigate: contextOrNavigate,
          onToggleMatrix: legacyOnToggleMatrix,
        }
      : contextOrNavigate || {};

  const parsed = parseCommandLine(rawInput);
  if (!parsed.command) {
    return {
      id: Math.random().toString(36).slice(2),
      type: "command",
      commandText: "",
      timestamp,
      text: "",
    };
  }

  const resolved = resolveCommandAlias(parsed.command, parsed.args);

  // If not found in registry and not special command
  if (!resolved) {
    return {
      id: Math.random().toString(36).slice(2),
      type: "error",
      commandText: rawInput,
      timestamp,
      status: "error",
      text: `Command not found: ${parsed.command}\nType 'help' to see available commands.`,
    };
  }

  const { canonical, args } = resolved;
  const flags = parsed.flags;

  switch (canonical) {
    case "help": {
      if (args.length > 0) {
        const targetName = args[0].toLowerCase();
        const targetCmd = COMMAND_REGISTRY.find(
          (c) => c.name === targetName || c.aliases?.includes(targetName)
        );
        if (targetCmd) {
          return {
            id: Math.random().toString(36).slice(2),
            type: "help",
            commandText: rawInput,
            timestamp,
            status: "info",
            payload: {
              mode: "single",
              command: targetCmd,
            },
          };
        } else {
          return {
            id: Math.random().toString(36).slice(2),
            type: "error",
            commandText: rawInput,
            timestamp,
            status: "error",
            text: `No manual entry for '${args[0]}'. Type 'help' for full command list.`,
          };
        }
      }

      return {
        id: Math.random().toString(36).slice(2),
        type: "help",
        commandText: rawInput,
        timestamp,
        status: "info",
        payload: {
          mode: "all",
          commands: COMMAND_REGISTRY,
        },
      };
    }

    case "whoami": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "whoami",
        commandText: rawInput,
        timestamp,
        status: "success",
        payload: {
          name: PERSONAL_INFO.name,
          title: PERSONAL_INFO.title,
          degree: PERSONAL_INFO.degree,
          branch: PERSONAL_INFO.branch,
          college: PERSONAL_INFO.college,
          collegeFullName: PERSONAL_INFO.collegeFullName,
          cgpa: PERSONAL_INFO.cgpa,
          location: PERSONAL_INFO.location,
          avatarUrl: "/images/avatar-developer-3d.png",
          specializations: [
            "AI / Machine Learning",
            "Generative AI & RAG",
            "Full-Stack Web Engineering",
            "CSE-IoT Hardware Telemetry",
          ],
        },
      };
    }

    case "about": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "about",
        commandText: rawInput,
        timestamp,
        status: "info",
        payload: {
          name: PERSONAL_INFO.name,
          title: PERSONAL_INFO.title,
          paragraphs: PERSONAL_INFO.aboutParagraphs,
          stats: PERSONAL_INFO.stats,
        },
      };
    }

    case "projects": {
      // Check if user passed a project name, e.g. "projects budgetmind"
      if (args.length > 0 && !args[0].startsWith("-")) {
        const query = args.join(" ").toLowerCase();
        const matched = PROJECTS.find(
          (p) =>
            p.id.toLowerCase() === query ||
            p.title.toLowerCase().includes(query) ||
            query.includes(p.id.toLowerCase())
        );

        if (matched) {
          return {
            id: Math.random().toString(36).slice(2),
            type: "project-detail",
            commandText: rawInput,
            timestamp,
            status: "success",
            payload: matched,
          };
        } else {
          return {
            id: Math.random().toString(36).slice(2),
            type: "error",
            commandText: rawInput,
            timestamp,
            status: "error",
            text: `Project '${args[0]}' not found.\nAvailable projects: ${PROJECTS.map((p) => p.id).join(", ")}\nType 'projects' to list all.`,
          };
        }
      }

      const isFeaturedOnly = flags.includes("--featured");
      const displayedProjects = isFeaturedOnly
        ? PROJECTS.slice(0, 2)
        : PROJECTS;

      return {
        id: Math.random().toString(36).slice(2),
        type: "projects",
        commandText: rawInput,
        timestamp,
        status: "success",
        payload: {
          filter: isFeaturedOnly ? "featured" : "all",
          projects: displayedProjects,
        },
      };
    }

    case "skills": {
      let filterCategory: string | null = null;
      if (flags.includes("--ai")) filterCategory = "AI / Machine Learning";
      else if (flags.includes("--frontend")) filterCategory = "Frontend Engineering";
      else if (flags.includes("--backend")) filterCategory = "Backend & Systems";

      const categories = filterCategory
        ? SKILL_CATEGORIES.filter((c) =>
            c.title.toLowerCase().includes(filterCategory!.toLowerCase())
          )
        : SKILL_CATEGORIES;

      return {
        id: Math.random().toString(36).slice(2),
        type: "skills",
        commandText: rawInput,
        timestamp,
        status: "success",
        payload: {
          filter: filterCategory || "all",
          categories,
        },
      };
    }

    case "experience": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "experience",
        commandText: rawInput,
        timestamp,
        status: "success",
        payload: {
          achievements: ACHIEVEMENTS,
        },
      };
    }

    case "stack": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "skills",
        commandText: rawInput,
        timestamp,
        status: "success",
        payload: {
          filter: "Core Stack",
          categories: SKILL_CATEGORIES.slice(0, 4),
        },
      };
    }

    case "resume": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "resume",
        commandText: rawInput,
        timestamp,
        status: "success",
        payload: {
          name: PERSONAL_INFO.name,
          title: PERSONAL_INFO.title,
          education: `${EDUCATION.degree} in ${EDUCATION.branch}`,
          college: `${EDUCATION.institution} (${EDUCATION.cgpa})`,
          route: "/resume",
          downloadUrl: "/Vijay_Kumar_Resume.pdf",
        },
      };
    }

    case "leetcode": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "leetcode",
        commandText: rawInput,
        timestamp,
        status: "success",
        payload: {
          handle: "Vijay_kumar2008",
          url: "https://leetcode.com/u/Vijay_kumar2008/",
          highlight: "Algorithmic problem solving in C++, Java & Python",
        },
      };
    }

    case "github": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "github",
        commandText: rawInput,
        timestamp,
        status: "success",
        payload: {
          handle: "@Vijay1822",
          url: "https://github.com/Vijay1822",
          highlight: "AI systems, BudgetMind, IoT telemetry & full-stack repositories",
        },
      };
    }

    case "linkedin": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "linkedin",
        commandText: rawInput,
        timestamp,
        status: "success",
        payload: {
          url: "https://www.linkedin.com/in/vijay-kumar-09b2bb36a/",
          name: "Vijay Kumar",
          headline: "AI Engineer & CSE-IoT at VNR VJIET",
        },
      };
    }

    case "education": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "education",
        commandText: rawInput,
        timestamp,
        status: "success",
        payload: {
          institution: EDUCATION.institution,
          fullName: EDUCATION.fullName,
          degree: EDUCATION.degree,
          branch: EDUCATION.branch,
          cgpa: EDUCATION.cgpa,
          graduationYear: EDUCATION.graduationYear,
          overview: EDUCATION.overview,
          coursework: EDUCATION.keyCoursework,
          route: "/education",
        },
      };
    }

    case "contact": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "contact",
        commandText: rawInput,
        timestamp,
        status: "success",
        payload: {
          email: PERSONAL_INFO.social.email,
          location: PERSONAL_INFO.location,
          route: "/contact",
          github: PERSONAL_INFO.social.github,
          linkedin: PERSONAL_INFO.social.linkedin,
        },
      };
    }

    case "ask": {
      const question = args.join(" ").trim();
      if (!question) {
        return {
          id: Math.random().toString(36).slice(2),
          type: "error",
          commandText: rawInput,
          timestamp,
          status: "warning",
          text: 'Usage: ask "your question"\nExample: ask "Explain BudgetMind"\nOpens Vijay AI assistant with question prefilled.',
        };
      }

      // Dispatch event to prefill chatbot
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("vijay_ai_prefill", {
            detail: { query: question },
          })
        );
      }
      if (context.onAskChatbot) {
        context.onAskChatbot(question);
      }

      return {
        id: Math.random().toString(36).slice(2),
        type: "ask",
        commandText: rawInput,
        timestamp,
        status: "success",
        payload: { question },
        text: `Forwarding query to Vijay AI assistant: "${question}"\nChatbot modal opened with question prefilled.`,
      };
    }

    case "history": {
      const historyList = (context.history || []).filter(Boolean);
      return {
        id: Math.random().toString(36).slice(2),
        type: "history",
        commandText: rawInput,
        timestamp,
        status: "info",
        payload: {
          commands: historyList,
        },
      };
    }

    case "date": {
      const now = new Date();
      return {
        id: Math.random().toString(36).slice(2),
        type: "date",
        commandText: rawInput,
        timestamp,
        status: "info",
        text: `${now.toUTCString()} (Local: ${now.toString()})`,
      };
    }

    case "hello": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "easter-egg",
        commandText: rawInput,
        timestamp,
        status: "success",
        text: "Hey there! Welcome to Vijay's engineering workspace. Explore my work by typing 'projects' or 'skills'!",
      };
    }

    case "coffee": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "easter-egg",
        commandText: rawInput,
        timestamp,
        status: "success",
        text: "☕ Coffee acquired. Back to building useful things.",
      };
    }

    case "sudo": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "easter-egg",
        commandText: rawInput,
        timestamp,
        status: "warning",
        text: "Nice try! This is a portfolio terminal, not a real system shell.",
      };
    }

    case "matrix": {
      if (context.onToggleMatrix) {
        context.onToggleMatrix();
      }
      return {
        id: Math.random().toString(36).slice(2),
        type: "matrix",
        commandText: rawInput,
        timestamp,
        status: "success",
        text: "Easter egg unlocked. Digital stream visual active for 10 seconds.",
      };
    }

    case "ping": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "easter-egg",
        commandText: rawInput,
        timestamp,
        status: "info",
        text: "64 bytes from portfolio.vijay: icmp_seq=1 ttl=64 time=0.082 ms\nPacket loss: 0% | Host status: Optimal",
      };
    }

    case "clear": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "system",
        commandText: rawInput,
        timestamp,
        text: "__CLEAR__",
      };
    }

    case "exit": {
      return {
        id: Math.random().toString(36).slice(2),
        type: "system",
        commandText: rawInput,
        timestamp,
        text: "__EXIT__",
      };
    }

    default: {
      return {
        id: Math.random().toString(36).slice(2),
        type: "error",
        commandText: rawInput,
        timestamp,
        status: "warning",
        text: `Command not recognized: '${rawInput}'\nType 'help' to see available CLI commands, or ask a natural-language question directly (e.g. "What projects has Vijay built?").`,
      };
    }
  }
}
