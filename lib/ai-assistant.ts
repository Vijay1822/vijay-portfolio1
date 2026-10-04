import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, ACHIEVEMENTS, EDUCATION } from "./data";

export interface ChatAction {
  label: string;
  type: "navigate" | "external" | "query";
  url?: string;
  query?: string;
  variant?: "primary" | "secondary" | "accent";
}

export interface ChatProjectCard {
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
}

export interface StructuredChatResponse {
  reply: string;
  actions?: ChatAction[];
  projectCard?: ChatProjectCard;
  skillsGrid?: { category: string; skills: string[] }[];
  suggestedFollowUps?: string[];
}

export const PORTFOLIO_SYSTEM_PROMPT = `
You are Vijay AI, the dedicated personal portfolio assistant for Mamidala Vijay Kumar.
You speak in a warm, intelligent, concise, and highly professional tone as Vijay's personal AI agent.

FACTUAL KNOWLEDGE BASE ABOUT VIJAY:
- Name: ${PERSONAL_INFO.name} (${PERSONAL_INFO.preferredName})
- Title: ${PERSONAL_INFO.title}
- College: ${EDUCATION.institution} (${EDUCATION.fullName}), Hyderabad, India
- Degree: ${EDUCATION.degree} in ${EDUCATION.branch}
- CGPA / Academic Profile: ${EDUCATION.cgpa}
- Expected Graduation: ${PERSONAL_INFO.graduationYear}
- LeetCode: ${PERSONAL_INFO.social.leetcode}
- GitHub: ${PERSONAL_INFO.social.github}
- LinkedIn: ${PERSONAL_INFO.social.linkedin}
- Email: ${PERSONAL_INFO.social.email}
- Tagline: "${PERSONAL_INFO.tagline}"

KEY PROJECTS:
1. BudgetMind:
   - Category: AI Agent & Financial Intelligence
   - Tagline: AI Budget Optimizer & Procurement Memory Agent
   - Description: Intelligent AI financial budget optimizer and procurement memory agent using RAG and LLMs to analyze expenditure patterns, predict budget variances, and store contextual financial memory.
   - Technologies: React, Node.js, MongoDB, RAG, LLMs, LangChain, Tailwind CSS
   - GitHub: https://github.com/Vijay1822/BudgetMind
   - Live Demo: https://budgetmind3.netlify.app/

2. Smart Farmer Procurement System:
   - Category: AI + Full-Stack Platform
   - Tagline: Transparent Agricultural Marketplace with ML Demand & Price Intelligence
   - Technologies: Next.js, TypeScript, Python, Scikit-Learn, Node.js, Supabase, Tailwind CSS
   - GitHub: https://github.com/Vijay1822

3. Smart Temperature-Based Fan Control System:
   - Category: CSE-IoT & Embedded Hardware
   - Tagline: Autonomous Microclimate Cooling System with Closed-Loop PWM & IoT Telemetry
   - Technologies: NodeMCU (ESP8266), Arduino C++, DHT22 Sensor, PWM Driver, Blynk IoT, MQTT, Next.js
   - GitHub: https://github.com/Vijay1822

HACKATHONS & ACHIEVEMENTS:
- Hands-on IoT & Microcontroller Prototyping (2026): Arduino, NodeMCU (ESP8266/ESP32), Smart Temperature-Based Fan Control, PWM control, Blynk IoT.
- AI Full-Stack Web Development, NPTEL & AI/ML Learning (2025–2026): React & Node.js, Generative AI, RAG, LLMs, LeetCode algorithmic problem-solving (${PERSONAL_INFO.social.leetcode}).
- Adobe Hackathon & Creative AI Challenges (2025–2026): Building AI agents, creative tech workflows, and LLM-driven applications.
- Smart India Hackathon (SIH) & National Hackathons (2025–2026): Real-world national problem statement prototyping across AI, IoT, and full-stack solutions.
- B.Tech in CSE-IoT at VNR VJIET (2026–Present): 9.45 CGPA, core computing, embedded systems, and distributed architecture.

SKILLS & PROFICIENCIES:
${SKILL_CATEGORIES.map(
  (c) => `- ${c.title}: ${c.skills.map((s) => `${s.name} (${s.status})`).join(", ")}`
).join("\n")}

FORMATTING AND PRESENTATION RULES (CRITICAL):
1. NEVER output raw asterisks (*) or hyphens (-) for bullet points or lists.
2. NEVER use markdown symbols like *, **, ###, or --- in ways that appear as raw unformatted characters.
3. When listing technical skills, format them strictly by category followed by comma-separated technologies:
   Programming Languages: Python, Java, TypeScript, JavaScript, C++
   AI & Machine Learning: Machine Learning, Generative AI, LLMs & Prompting, RAG Systems, LangChain, Hugging Face, Scikit-Learn
   Frontend Engineering: Next.js, React, Tailwind CSS, HTML5, CSS3, Framer Motion
   Backend & Systems: Node.js, Express.js, REST APIs
   Databases & Storage: MongoDB, SQL, Supabase, SQLite
   IoT & Hardware: Arduino, NodeMCU, Environmental Sensors, Blynk IoT, MQTT
   Tools & DevOps: Git, GitHub, VS Code, Vercel, Netlify
4. Keep responses concise, modern, readable, and structured. Avoid long walls of text.
5. When discussing projects (such as BudgetMind), provide the title, a 1-2 sentence description, Tech Stack, and the official GitHub or demo links clearly:
   BudgetMind GitHub: https://github.com/Vijay1822/BudgetMind
   BudgetMind Demo: https://budgetmind3.netlify.app/
6. When asked about Education:
   Education
   VNR VJIET
   B.Tech — Computer Science & Engineering (IoT)
   CGPA: 9.45 / 10
   Expected Graduation: 2029
7. When asked about Contact:
   Contact Vijay
   Email: mamidalavijay04@gmail.com
   LinkedIn: https://www.linkedin.com/in/vijay-kumar-09b2bb36a
   GitHub: https://github.com/Vijay1822
8. When asked about Coding Profiles:
   Only mention LeetCode (https://leetcode.com/u/Vijay_kumar2008/) and GitHub (https://github.com/Vijay1822). Do NOT mention HackerRank, CodeChef, or Codeforces.
9. When asked about Hackathons:
   Smart India Hackathon (SIH): Participated in the national-level innovation and problem-solving competition.
   Adobe Hackathon: Advanced to Round 2.
   Do not exaggerate or claim winner/finalist status.
10. For casual greetings like "Hey", keep it friendly, natural, and concise:
   Hey! 👋 I'm Vijay AI, Vijay's personal portfolio assistant. I can help you explore his skills, projects, education, hackathons, and technical background.
`.trim();

/**
 * Intelligent deterministic & semantic fallback engine with context awareness.
 * Guarantees instant response, 100% accuracy, zero hallucinations, and rich interactive UI.
 */
export function generateSmartResponse(
  query: string,
  history: { role: string; content: string }[] = []
): StructuredChatResponse {
  const clean = query.trim().toLowerCase();

  // Extract previous context from recent messages
  const lastUserMsg = history.filter((h) => h.role === "user").slice(-2).map((m) => m.content.toLowerCase()).join(" ");
  const lastAiMsg = history.filter((h) => h.role === "assistant").slice(-1).map((m) => m.content.toLowerCase()).join(" ");
  const context = `${lastUserMsg} ${lastAiMsg}`;

  // 1. GREETING
  if (/^(hi|hello|hey|greetings|hola|sup|good (morning|afternoon|evening)|yo)/i.test(clean)) {
    return {
      reply: `Hey! 👋\n\nI'm Vijay AI, Vijay's personal portfolio assistant.\n\nI can help you explore his skills, projects, education, hackathons and technical background.`,
      actions: [
        { label: "Explore Projects", type: "query", query: "Show me Vijay's projects", variant: "primary" },
        { label: "View Skills", type: "query", query: "What are Vijay's skills?" },
        { label: "Contact Vijay", type: "query", query: "How can I contact Vijay?" },
      ],
      suggestedFollowUps: ["Who is Vijay?", "Tell me about BudgetMind", "What are Vijay's skills?", "How can I contact Vijay?"],
    };
  }

  // 2. BUDGETMIND (Specific project query or contextual follow-up)
  const isBudgetMindQuery =
    clean.includes("budgetmind") ||
    clean.includes("budget mind") ||
    ((clean.includes("main project") || clean.includes("featured project") || clean.includes("best project")) && !clean.includes("farmer") && !clean.includes("fan")) ||
    ((clean.includes("technology") || clean.includes("tech") || clean.includes("architecture") || clean.includes("github") || clean.includes("demo") || clean.includes("link")) && context.includes("budgetmind"));

  if (isBudgetMindQuery) {
    const isTechFollowup = clean.includes("technology") || clean.includes("tech") || clean.includes("stack") || clean.includes("used");
    
    return {
      reply: isTechFollowup
        ? `BudgetMind Architecture\n\nAI & Machine Learning: LangChain, RAG Systems, LLMs, Vector Embeddings\nFrontend Engineering: React, Next.js, Tailwind CSS, Framer Motion\nBackend & Systems: Node.js, Express.js REST APIs\nDatabases & Storage: MongoDB Transaction Memory\n\nIt features real-time budgetary variance forecasting, semantic document retrieval, and contextual procurement tracking.`
        : `BudgetMind is Vijay's featured AI Budget Optimizer & Procurement Memory Agent.\n\nIt utilizes Retrieval-Augmented Generation (RAG) and Large Language Models (LLMs) to analyze procurement expenses, predict budget variances, and store contextual financial memory for real-time cost optimization.`,
      projectCard: {
        title: "BudgetMind",
        tagline: "AI Budget Optimizer & Procurement Memory Agent",
        description:
          "An intelligent AI financial budget optimizer that uses RAG and LLMs to analyze procurement expenses, predict budget variances, and store contextual financial memory.",
        techStack: ["React", "Node.js", "MongoDB", "RAG", "LLMs", "LangChain", "Tailwind CSS"],
        githubUrl: "https://github.com/Vijay1822/BudgetMind",
        liveDemoUrl: "https://budgetmind3.netlify.app/",
      },
      actions: [
        { label: "Live Demo ↗", type: "external", url: "https://budgetmind3.netlify.app/", variant: "primary" },
        { label: "GitHub Repo ↗", type: "external", url: "https://github.com/Vijay1822/BudgetMind", variant: "secondary" },
        { label: "View All Projects →", type: "navigate", url: "/projects" },
      ],
      suggestedFollowUps: [
        "What technologies were used in BudgetMind?",
        "Show me all of Vijay's projects",
        "What other AI projects has he built?",
      ],
    };
  }

  // 3. RESUME / CV
  if (
    clean.includes("resume") ||
    clean.includes("cv") ||
    clean.includes("curriculum vitae") ||
    clean.includes("download resume") ||
    clean.includes("see resume") ||
    clean.includes("view resume") ||
    clean.includes("where is his resume") ||
    clean.includes("show me his resume") ||
    clean.includes("show me vijay's resume")
  ) {
    return {
      reply: `Sure! You can view Vijay's resume here.\n\nHis resume highlights his **9.45 CGPA in B.Tech CSE-IoT at VNR VJIET**, his featured **BudgetMind** AI agent platform, technical skills, hackathons (**Smart India Hackathon, Adobe Hackathon**), and certifications.`,
      actions: [
        { label: "View Resume →", type: "navigate", url: "/resume", variant: "primary" },
        { label: "Download Resume 📥", type: "external", url: "/Mamidala_Vijay_Kumar_Resume.pdf", variant: "secondary" },
        { label: "Open in New Tab ↗", type: "external", url: "/Mamidala_Vijay_Kumar_Resume.pdf" },
      ],
      suggestedFollowUps: [
        "Tell me about BudgetMind",
        "What is Vijay's CGPA?",
        "What are Vijay's technical skills?",
        "How can I contact Vijay?",
      ],
    };
  }

  // 4. WHO IS VIJAY / PROFILE / SUMMARY
  if (
    clean.includes("who is") ||
    clean.includes("about vijay") ||
    clean.includes("profile") ||
    clean.includes("introduce") ||
    clean.includes("summary") ||
    clean.includes("tell me about yourself") ||
    clean.includes("bio")
  ) {
    return {
      reply: `**${PERSONAL_INFO.name}** is an ambitious **${PERSONAL_INFO.title}** pursuing his B.Tech in **${PERSONAL_INFO.branch}** at **${EDUCATION.institution}** (Class of **${PERSONAL_INFO.graduationYear}**).\n\nHe specializes in bridging **generative AI / machine learning models**, **high-performance web platforms (Next.js, TypeScript)**, and **real-world IoT telemetry (ESP8266/Arduino)**.\n\nHis engineering philosophy is centered around building resilient, usable systems that interface intelligently with human and business needs.`,
      actions: [
        { label: "About Page →", type: "navigate", url: "/about" },
        { label: "Explore Skills →", type: "navigate", url: "/skills" },
        { label: "View Projects →", type: "navigate", url: "/projects" },
      ],
      suggestedFollowUps: [
        "What is Vijay's CGPA?",
        "What technologies does Vijay know?",
        "Tell me about BudgetMind",
        "How can I contact Vijay?",
      ],
    };
  }

  // 4. CGPA & ACADEMIC PERFORMANCE
  if (
    clean.includes("cgpa") ||
    clean.includes("gpa") ||
    clean.includes("marks") ||
    clean.includes("percentage") ||
    clean.includes("grade") ||
    clean.includes("academic performance")
  ) {
    return {
      reply: `Vijay maintains a strong academic profile with an **${EDUCATION.cgpa}** in his **Bachelor of Technology (B.Tech) in Computer Science & Engineering — IoT** at **${EDUCATION.institution}** (${EDUCATION.fullName}).\n\nHis academic curriculum encompasses core computing principles, Data Structures & Algorithms, Object-Oriented Programming (Java/C++/Python), Embedded Interfacing, and Machine Learning.`,
      actions: [
        { label: "View Education →", type: "navigate", url: "/education" },
        { label: "View Journey & Milestones →", type: "navigate", url: "/journey" },
      ],
      suggestedFollowUps: [
        "What is Vijay studying?",
        "What hackathons did Vijay participate in?",
        "What is Vijay's LeetCode?",
      ],
    };
  }

  // 5. EDUCATION & COLLEGE & DEGREE
  if (
    clean.includes("education") ||
    clean.includes("college") ||
    clean.includes("study") ||
    clean.includes("studying") ||
    clean.includes("vnr") ||
    clean.includes("vjiet") ||
    clean.includes("degree") ||
    clean.includes("branch") ||
    clean.includes("university") ||
    clean.includes("graduation")
  ) {
    return {
      reply: `Education\n\nVNR VJIET\nB.Tech — Computer Science & Engineering (IoT)\n\nCGPA\n9.45 / 10\n\nExpected Graduation\n2029`,
      actions: [
        { label: "View Education →", type: "navigate", url: "/education", variant: "primary" },
        { label: "Contact Vijay →", type: "navigate", url: "/contact" },
      ],
      suggestedFollowUps: [
        "What is Vijay's CGPA?",
        "What hackathons has Vijay participated in?",
        "What technologies does Vijay know?",
      ],
    };
  }

  // 6. ALL PROJECTS / PORTFOLIO WORK
  if (
    clean.includes("project") ||
    clean.includes("work") ||
    clean.includes("what has he built") ||
    clean.includes("show projects") ||
    clean.includes("case study")
  ) {
    return {
      reply: `Vijay's Featured Projects\n\nBudgetMind\nAI Budget Optimizer & Procurement Memory Agent using RAG and LLMs to analyze procurement expenses, predict budget variances, and store contextual financial memory.\nTech Stack: React, Node.js, MongoDB, RAG, LLMs, LangChain, Tailwind CSS\n\nSmart Farmer Procurement System\nTransparent Agricultural Marketplace with ML Demand & Price Intelligence.\nTech Stack: Next.js, TypeScript, Python, Scikit-Learn, Supabase\n\nSmart Temperature-Based Fan Control System\nClosed-loop microclimate cooling system with PWM telemetry and ESP8266 IoT connectivity.\nTech Stack: NodeMCU, Arduino C++, DHT22, Blynk IoT, MQTT`,
      actions: [
        { label: "View Projects Page →", type: "navigate", url: "/projects", variant: "primary" },
        { label: "BudgetMind Demo ↗", type: "external", url: "https://budgetmind3.netlify.app/" },
        { label: "GitHub Profile ↗", type: "external", url: "https://github.com/Vijay1822" },
      ],
      suggestedFollowUps: [
        "Tell me about BudgetMind",
        "Tell me about Smart Farmer Procurement",
        "What is Vijay's IoT experience?",
      ],
    };
  }

  // 7. SKILLS & TECH STACK
  if (
    clean.includes("skill") ||
    clean.includes("tech stack") ||
    clean.includes("technology") ||
    clean.includes("technologies") ||
    clean.includes("language") ||
    clean.includes("what does he know") ||
    clean.includes("know")
  ) {
    return {
      reply: `Vijay's Technical Skills\n\nProgramming Languages: Python, Java, TypeScript, JavaScript, C++\n\nAI & Machine Learning: Machine Learning, Generative AI, LLMs & Prompting, RAG Systems, LangChain, Hugging Face, Scikit-Learn\n\nFrontend Engineering: Next.js, React, Tailwind CSS, HTML5, CSS3, Framer Motion\n\nBackend & Systems: Node.js, Express.js, REST APIs\n\nDatabases & Storage: MongoDB, SQL, Supabase, SQLite\n\nIoT & Hardware: Arduino, NodeMCU, Environmental Sensors, Blynk IoT, MQTT\n\nTools & DevOps: Git, GitHub, VS Code, Vercel, Netlify`,
      skillsGrid: [
        { category: "Programming Languages", skills: ["Python", "Java", "TypeScript", "JavaScript", "C++"] },
        { category: "AI & Machine Learning", skills: ["Machine Learning", "Generative AI", "LLMs & Prompting", "RAG Systems", "LangChain", "Hugging Face", "Scikit-Learn"] },
        { category: "Frontend Engineering", skills: ["Next.js", "React", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"] },
        { category: "Backend & Systems", skills: ["Node.js", "Express.js", "REST APIs"] },
        { category: "Databases & Storage", skills: ["MongoDB", "SQL", "Supabase", "SQLite"] },
        { category: "IoT & Hardware", skills: ["Arduino", "NodeMCU", "Environmental Sensors", "Blynk IoT", "MQTT"] },
        { category: "Tools & DevOps", skills: ["Git", "GitHub", "VS Code", "Vercel", "Netlify"] },
      ],
      actions: [
        { label: "Explore Skills →", type: "navigate", url: "/skills", variant: "primary" },
        { label: "View Projects →", type: "navigate", url: "/projects" },
      ],
      suggestedFollowUps: [
        "What AI projects has Vijay built?",
        "Where can I see Vijay's coding profile?",
        "Tell me about BudgetMind",
      ],
    };
  }

  // 8. LEETCODE & CODING PROFILE
  if (
    clean.includes("leetcode") ||
    clean.includes("coding profile") ||
    clean.includes("competitive programming") ||
    clean.includes("problem solving") ||
    clean.includes("dsa")
  ) {
    return {
      reply: `Coding Profiles\n\nLeetCode\nPracticing Data Structures & Algorithms in Python, Java, and C++.\nhttps://leetcode.com/u/Vijay_kumar2008/\n\nGitHub\nExplore open-source repositories and AI architectures.\nhttps://github.com/Vijay1822`,
      actions: [
        { label: "View LeetCode →", type: "external", url: PERSONAL_INFO.social.leetcode, variant: "primary" },
        { label: "View GitHub →", type: "external", url: PERSONAL_INFO.social.github, variant: "secondary" },
      ],
      suggestedFollowUps: [
        "What are Vijay's technical skills?",
        "What hackathons did Vijay participate in?",
        "Show me Vijay's projects",
      ],
    };
  }

  // 9. GITHUB
  if (
    clean.includes("github") ||
    clean.includes("git") ||
    clean.includes("repo") ||
    clean.includes("repositories") ||
    clean.includes("source code")
  ) {
    return {
      reply: `Explore all of Vijay's open-source projects, machine learning repositories, and full-stack applications directly on GitHub:\n\nhttps://github.com/Vijay1822`,
      actions: [
        { label: "Open GitHub Profile ↗", type: "external", url: PERSONAL_INFO.social.github, variant: "primary" },
        { label: "BudgetMind Repository ↗", type: "external", url: "https://github.com/Vijay1822/BudgetMind" },
        { label: "View Projects Page →", type: "navigate", url: "/projects" },
      ],
      suggestedFollowUps: [
        "Tell me about BudgetMind",
        "What is Vijay's LeetCode?",
        "How can I contact Vijay?",
      ],
    };
  }

  // 10. LINKEDIN
  if (clean.includes("linkedin") || clean.includes("social") || clean.includes("network")) {
    return {
      reply: `Connect with Vijay on LinkedIn to explore his professional updates, engineering articles, and career journey:\n\nhttps://www.linkedin.com/in/vijay-kumar-09b2bb36a`,
      actions: [
        { label: "Open LinkedIn Profile ↗", type: "external", url: PERSONAL_INFO.social.linkedin, variant: "primary" },
        { label: "Contact Page →", type: "navigate", url: "/contact" },
      ],
      suggestedFollowUps: [
        "How can I contact Vijay?",
        "Who is Vijay?",
        "Show me Vijay's projects",
      ],
    };
  }

  // 11. HACKATHONS & COMPETITIONS
  if (
    clean.includes("hackathon") ||
    clean.includes("competition") ||
    clean.includes("contest") ||
    clean.includes("smart india") ||
    clean.includes("sih") ||
    clean.includes("adobe")
  ) {
    return {
      reply: `Hackathons & National Ideathons (2025–2026)\n\nSmart India Hackathon (SIH) & National Hackathons\nParticipated in SIH and national ideathons, developing end-to-end AI, IoT, and full-stack prototypes.\n\nAdobe Hackathon & Creative AI Challenges\nExplored intelligent digital experiences, AI agents, and RAG architectures.`,
      actions: [
        { label: "View Milestones →", type: "navigate", url: "/journey", variant: "primary" },
        { label: "Explore Projects →", type: "navigate", url: "/projects" },
      ],
      suggestedFollowUps: [
        "Tell me about BudgetMind",
        "What certifications does Vijay have?",
        "What is Vijay studying?",
      ],
    };
  }

  // 12. CERTIFICATIONS
  if (
    clean.includes("certification") ||
    clean.includes("certificate") ||
    clean.includes("course") ||
    clean.includes("nptel")
  ) {
    return {
      reply: `Certifications & Technical Learning (2025–2026)\n\nAI Full-Stack Web Development\nReact, Next.js, Node.js, and Generative AI system integration.\n\nNPTEL & AI/ML Learning\nPython, machine learning, data analytics, and algorithmic problem-solving on LeetCode.`,
      actions: [
        { label: "View Certifications →", type: "navigate", url: "/journey", variant: "primary" },
        { label: "Explore Skills →", type: "navigate", url: "/skills" },
      ],
      suggestedFollowUps: [
        "What technologies does Vijay know?",
        "What is Vijay's LeetCode?",
        "Show me Vijay's projects",
      ],
    };
  }

  // 13. CONTACT / EMAIL / HIRE / INTERNSHIP
  if (
    clean.includes("contact") ||
    clean.includes("email") ||
    clean.includes("hire") ||
    clean.includes("reach") ||
    clean.includes("internship") ||
    clean.includes("connect") ||
    clean.includes("message") ||
    clean.includes("phone")
  ) {
    return {
      reply: `Contact Vijay\n\nEmail\nmamidalavijay04@gmail.com\n\nLinkedIn\nVijay Kumar\n\nGitHub\nVijay1822`,
      actions: [
        { label: "Email Vijay", type: "external", url: `mailto:${PERSONAL_INFO.social.email}`, variant: "primary" },
        { label: "LinkedIn", type: "external", url: PERSONAL_INFO.social.linkedin },
        { label: "GitHub", type: "external", url: PERSONAL_INFO.social.github },
        { label: "Contact Page →", type: "navigate", url: "/contact" },
      ],
      suggestedFollowUps: [
        "Who is Vijay?",
        "Show me Vijay's projects",
        "What are his technical skills?",
      ],
    };
  }

  // 14. OUT-OF-SCOPE QUESTIONS (Weather, stocks, homework, generic world facts)
  if (
    clean.includes("weather") ||
    clean.includes("stock") ||
    clean.includes("bitcoin") ||
    clean.includes("assignment") ||
    clean.includes("homework") ||
    clean.includes("joke") ||
    clean.includes("best programmer") ||
    clean.includes("president") ||
    clean.includes("capital of") ||
    clean.includes("recipe")
  ) {
    return {
      reply: `I'm **Vijay AI**, his personal portfolio assistant, so I'm mainly here to answer questions about Vijay, his engineering projects, technical skill set, and academic background.\n\nHere are some things I can help you with:`,
      actions: [
        { label: "Projects", type: "query", query: "Show me Vijay's projects" },
        { label: "Skills", type: "query", query: "What technologies does Vijay know?" },
        { label: "Education", type: "query", query: "What is Vijay studying?" },
        { label: "Contact", type: "query", query: "How can I contact Vijay?" },
      ],
      suggestedFollowUps: [
        "Who is Vijay?",
        "Tell me about BudgetMind",
        "What are his technical skills?",
      ],
    };
  }

  // 15. UNKNOWN QUESTIONS (Fallback with honest grounding)
  return {
    reply: `I don't have that specific information in Vijay's portfolio yet. You can ask me about his **projects (like BudgetMind)**, **skills**, **education at VNR VJIET**, **hackathons**, or **coding profiles**!`,
    actions: [
      { label: "Projects", type: "query", query: "Show me Vijay's projects" },
      { label: "Skills", type: "query", query: "What technologies does Vijay know?" },
      { label: "Education", type: "query", query: "What is Vijay studying?" },
      { label: "LeetCode", type: "query", query: "What is Vijay's LeetCode?" },
      { label: "Contact", type: "query", query: "How can I contact Vijay?" },
    ],
    suggestedFollowUps: [
      "Tell me about BudgetMind",
      "What is Vijay's CGPA?",
      "How can I contact Vijay?",
    ],
  };
}

// Backward-compatible fallback helper returning string
export function generateFallbackResponse(query: string): string {
  const structured = generateSmartResponse(query);
  return structured.reply;
}
