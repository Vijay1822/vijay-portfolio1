import {
  PERSONAL_INFO,
  PROJECTS,
  SKILL_CATEGORIES,
  ACHIEVEMENTS,
  EDUCATION,
} from "@/lib/data";

export type LocalLookupStatus =
  | "ANSWER_FOUND"
  | "ANSWER_INCOMPLETE"
  | "ANSWER_NOT_FOUND"
  | "REQUIRES_REASONING";

export interface LocalLookupResult {
  status: LocalLookupStatus;
  reply?: string;
  source: "local-knowledge";
  model: "deterministic-lookup";
  contextSnippet?: string;
}

/**
 * Evaluates whether a query can be answered deterministically from the local knowledge base,
 * or whether it is incomplete, requires multi-step reasoning, or is absent from local facts.
 */
export function evaluateLocalKnowledge(query: string): LocalLookupResult {
  const q = query.toLowerCase().trim();

  // 1. REASONING / EVALUATION DETECTIONS
  // "Why should I hire Vijay?", "Why hire?", complex comparisons, deep architectural questions
  const isHiringQuestion =
    /why\s+(should\s+(i|we)\s+)?hire/i.test(q) ||
    /should\s+(i|we)\s+hire/i.test(q) ||
    /why\s+hire\s+vijay/i.test(q) ||
    q === "why hire" ||
    q === "hire vijay";

  if (isHiringQuestion) {
    return {
      status: "REQUIRES_REASONING",
      source: "local-knowledge",
      model: "deterministic-lookup",
      contextSnippet: "Query asks for hiring rationale; requires synthesizing skills, projects, and academic excellence.",
    };
  }

  // Deep architectural, comparison, or explanation queries
  const isComplexQuestion =
    /^(how\s+does|how\s+can|how\s+did|explain|compare|why\s+did|why\s+is)/i.test(q) ||
    q.includes("architecture") ||
    q.includes("persistent memory") ||
    q.includes("tradeoff") ||
    q.includes("deep dive") ||
    q.includes("pros and cons");

  if (isComplexQuestion) {
    return {
      status: "REQUIRES_REASONING",
      source: "local-knowledge",
      model: "deterministic-lookup",
      contextSnippet: "Query requires technical reasoning or architectural explanation.",
    };
  }

  // 2. INCOMPLETE LOCAL DATA / SYNTHESIS DETECTIONS
  // Broad achievement / milestone questions that benefit from AI qualification
  if (
    q.includes("achievement") ||
    q.includes("accomplishment") ||
    q.includes("awards") ||
    q.includes("milestone") ||
    q.includes("what did he win") ||
    q.includes("hackathon experience")
  ) {
    return {
      status: "ANSWER_INCOMPLETE",
      source: "local-knowledge",
      model: "deterministic-lookup",
      contextSnippet: "Partial achievements available; requires LLM qualification based on verified evidence.",
    };
  }

  // Exclude unrecorded school-level queries from deterministic college CGPA matching
  const isSchoolOrUnrecorded =
    q.includes("high school") ||
    q.includes("school") ||
    q.includes("10th") ||
    q.includes("12th") ||
    q.includes("intermediate") ||
    q.includes("secondary") ||
    q.includes("previous");

  if (isSchoolOrUnrecorded) {
    return {
      status: "ANSWER_NOT_FOUND",
      source: "local-knowledge",
      model: "deterministic-lookup",
      contextSnippet: "Query asks for school or unrecorded academic records not present in portfolio.",
    };
  }

  // 3. DETERMINISTIC VERIFIED ANSWERS (ANSWER_FOUND)
  // Exact College CGPA & Academic Standing
  if (
    (q.includes("cgpa") ||
      q.includes("gpa") ||
      q.includes("grades") ||
      q.includes("academic marks") ||
      q.includes("his marks") ||
      q === "percentage" ||
      q.includes("b.tech percentage") ||
      q.includes("college percentage") ||
      q.includes("current percentage")) &&
    !q.includes("why") &&
    !q.includes("how")
  ) {
    return {
      status: "ANSWER_FOUND",
      reply: `Vijay Kumar holds an outstanding CGPA of **${EDUCATION.cgpa}** pursuing his B.Tech at ${EDUCATION.institution} (${EDUCATION.fullName}), specializing in ${EDUCATION.branch}.`,
      source: "local-knowledge",
      model: "deterministic-lookup",
    };
  }

  // Exact College & Education Fact (only when not asking for reasoning)
  if (
    (q.includes("college") ||
      q.includes("university") ||
      q.includes("study") ||
      q.includes("studying") ||
      q.includes("alma mater") ||
      q.includes("which institute") ||
      q.includes("where does he study") ||
      q.includes("what degree") ||
      q.includes("what is his branch") ||
      q === "education" ||
      q === "vnr" ||
      q === "vjiet") &&
    !q.includes("why") &&
    !q.includes("how") &&
    !q.includes("project")
  ) {
    return {
      status: "ANSWER_FOUND",
      reply: `Vijay is pursuing a **${EDUCATION.degree} in ${EDUCATION.branch}** at **${EDUCATION.institution} (${EDUCATION.fullName})**, Hyderabad (Class of ${PERSONAL_INFO.graduationYear}). He maintains a **${EDUCATION.cgpa}** academic record.`,
      source: "local-knowledge",
      model: "deterministic-lookup",
    };
  }

  // Who is Vijay / Profile Introduction
  if (
    q === "who is vijay" ||
    q === "who is vijay kumar" ||
    q === "who are you" ||
    q === "tell me about vijay" ||
    q.includes("who is vijay") ||
    q.includes("introduce vijay") ||
    q === "about vijay"
  ) {
    return {
      status: "ANSWER_FOUND",
      reply: `${PERSONAL_INFO.name} (${PERSONAL_INFO.preferredName}) is an **${PERSONAL_INFO.title}** pursuing his ${EDUCATION.degree} in ${EDUCATION.branch} at ${EDUCATION.institution} (${EDUCATION.fullName}), maintaining an outstanding **${EDUCATION.cgpa}** record. He builds intelligent AI systems, RAG memory architectures (BudgetMind), and closed-loop IoT controllers.`,
      source: "local-knowledge",
      model: "deterministic-lookup",
    };
  }

  // Key / Strongest Projects
  if (
    q.includes("strongest project") ||
    q.includes("best project") ||
    q.includes("featured project") ||
    q.includes("top project") ||
    q.includes("flagship project") ||
    q.includes("show me vijay's projects") ||
    q.includes("what are his projects")
  ) {
    return {
      status: "ANSWER_FOUND",
      reply: `Vijay's flagship engineering projects are:\n\n1. **BudgetMind** (AI Agent & Financial Intelligence): Autonomous budget optimizer using Hindsight biomimetic memory, Gemini Flash, and 21 deterministic financial tools ([GitHub](${PROJECTS[0].githubUrl}) | [Demo](${PROJECTS[0].liveDemoUrl}))\n2. **Smart Farmer Procurement System** (AI + Full-Stack): Direct agricultural marketplace with ML demand & price corridor regression\n3. **Smart Temperature-Based Fan Control System** (CSE-IoT): Autonomous closed-loop PWM cooling system with NodeMCU and live IoT telemetry.\n\nYou can explore full architectural deep dives on [/projects](/projects).`,
      source: "local-knowledge",
      model: "deterministic-lookup",
    };
  }

  // Source Code / Repositories
  if (
    q.includes("source code") ||
    q.includes("where can i find the source code") ||
    q.includes("where is the code") ||
    q.includes("source repository")
  ) {
    return {
      status: "ANSWER_FOUND",
      reply: `All open-source implementations and engineering codebases are hosted on Vijay's GitHub profile: [${PERSONAL_INFO.social.github}](${PERSONAL_INFO.social.github}). Key repositories include **BudgetMind** and hardware controllers.`,
      source: "local-knowledge",
      model: "deterministic-lookup",
    };
  }

  // What information is missing from the profile
  if (
    q.includes("missing from the profile") ||
    q.includes("information is missing") ||
    q.includes("what is missing") ||
    q.includes("profile limits") ||
    q.includes("undocumented facts")
  ) {
    return {
      status: "ANSWER_FOUND",
      reply: `Vijay's verified portfolio documents his current **B.Tech CSE-IoT degree at VNR VJIET (9.45 CGPA)**, flagship projects (**BudgetMind**, Smart Farmer Procurement, Smart Fan Control), verified hackathons (SIH, Adobe Round 2), and technical skills. Information not documented in the profile includes earlier secondary schooling marks, unlisted external certifications, personal phone numbers, and non-technical extracurricular hobbies.`,
      source: "local-knowledge",
      model: "deterministic-lookup",
    };
  }

  // Exact GitHub Profile
  if (
    q === "github" ||
    q.includes("github profile") ||
    q.includes("github link") ||
    q.includes("his github") ||
    q.includes("github repo") ||
    q.includes("repositories link") ||
    q.includes("where is his github")
  ) {
    return {
      status: "ANSWER_FOUND",
      reply: `You can explore Vijay's code repositories on GitHub: [${PERSONAL_INFO.social.github}](${PERSONAL_INFO.social.github}). Key repositories include **BudgetMind**, IoT Microclimate telemetry, and procurement systems.`,
      source: "local-knowledge",
      model: "deterministic-lookup",
    };
  }

  // Exact LeetCode Profile
  if (
    q === "leetcode" ||
    q.includes("leetcode profile") ||
    q.includes("leetcode link") ||
    q.includes("his leetcode") ||
    q.includes("coding profile") ||
    q.includes("dsa profile")
  ) {
    return {
      status: "ANSWER_FOUND",
      reply: `Vijay actively solves algorithmic problems on LeetCode: [${PERSONAL_INFO.social.leetcode}](${PERSONAL_INFO.social.leetcode}). His core focus areas include Data Structures, Dynamic Programming, Trees, and Graph Algorithms.`,
      source: "local-knowledge",
      model: "deterministic-lookup",
    };
  }

  // Exact LinkedIn Profile
  if (
    q === "linkedin" ||
    q.includes("linkedin profile") ||
    q.includes("linkedin link") ||
    q.includes("his linkedin") ||
    q.includes("connect on linkedin")
  ) {
    return {
      status: "ANSWER_FOUND",
      reply: `Connect with Vijay on LinkedIn: [${PERSONAL_INFO.social.linkedin}](${PERSONAL_INFO.social.linkedin}).`,
      source: "local-knowledge",
      model: "deterministic-lookup",
    };
  }

  // Exact Resume Download / View
  if (
    q === "resume" ||
    q === "cv" ||
    q.includes("download resume") ||
    q.includes("view resume") ||
    q.includes("where is his resume") ||
    q.includes("get resume") ||
    q.includes("resume link")
  ) {
    return {
      status: "ANSWER_FOUND",
      reply: `Vijay's verified resume is available at [/resume](/resume). You can preview his credentials, academic milestones, and download the official PDF directly from the resume page.`,
      source: "local-knowledge",
      model: "deterministic-lookup",
    };
  }

  // Direct Contact Information (Strictly contact intent, never "hire" or evaluation queries)
  if (
    (q === "contact" ||
      q === "email" ||
      q.includes("contact information") ||
      q.includes("contact details") ||
      q.includes("what is his email") ||
      q.includes("his email address") ||
      q.includes("how to contact") ||
      q.includes("how can i reach")) &&
    !q.includes("why") &&
    !q.includes("should") &&
    !q.includes("hire") &&
    !q.includes("skill") &&
    !q.includes("project")
  ) {
    return {
      status: "ANSWER_FOUND",
      reply: `You can reach Vijay directly via email at [${PERSONAL_INFO.social.email}](mailto:${PERSONAL_INFO.social.email}), connect on [LinkedIn](${PERSONAL_INFO.social.linkedin}), or use the interactive contact form on [/contact](/contact).`,
      source: "local-knowledge",
      model: "deterministic-lookup",
    };
  }

  // 4. UNKNOWN / GENERAL KNOWLEDGE / MISSING PORTFOLIO DATA
  return {
    status: "ANSWER_NOT_FOUND",
    source: "local-knowledge",
    model: "deterministic-lookup",
  };
}

/**
 * Backward-compatible helper that returns a deterministic result if and only if status is ANSWER_FOUND.
 */
export function findDeterministicAnswer(query: string): LocalLookupResult | null {
  const result = evaluateLocalKnowledge(query);
  if (result.status === "ANSWER_FOUND") {
    return result;
  }
  return null;
}

/**
 * Verified factual system prompt grounding all external LLM completions.
 * Explicitly separates portfolio-specific factual grounding from general technical knowledge.
 */
export const PORTFOLIO_SYSTEM_PROMPT = `
You are Vijay AI, the dedicated personal engineering assistant for Mamidala Vijay Kumar.
You speak in a warm, intelligent, concise, and highly professional tone as Vijay's personal engineering representative.

=======================================================
DECISION & ANSWERING RULES (CRITICAL):
=======================================================

1. PORTFOLIO-SPECIFIC QUESTIONS & UNRECORDED CREDENTIALS:
   - For questions about Vijay's background, education, projects, skills, and hackathons, base your answer STRICTLY on the verified facts in the knowledge base below.
   - When asked whether Vijay holds a specific external certification, award, degree, publication, or unlisted credential that is NOT in the knowledge base (e.g. AWS/GCP certifications, ACM ICPC medals, corporate employment, patents):
     • Prefer phrasing such as: "This information is not documented in Vijay's verified portfolio."
     • Distinguish "not documented" from "confirmed not to exist" — clearly state that his verified records focus on his documented B.Tech CSE-IoT studies at VNR VJIET (9.45 CGPA) and engineering projects, and that the queried credential is not documented in his portfolio records.
     • NEVER invent personal facts, jobs, awards, or metrics.
   - If asked "What are Vijay's achievements?", construct an appropriately qualified answer using the verified achievements listed below (e.g. 9.45 CGPA, BudgetMind development, SIH participation, Adobe Hackathon Round 2). Do not invent additional unverified awards.

2. "WHY SHOULD I HIRE VIJAY?" / CANDIDATE EVALUATION:
   - If asked "Why should I hire Vijay?" or similar evaluation questions, DO NOT simply output contact details!
   - Construct a compelling, evidence-based, structured summary highlighting his verified engineering strengths:
     • High Academic Excellence: Maintaining a 9.45 CGPA in B.Tech CSE-IoT at VNR VJIET.
     • AI & LLM Systems: Engineered BudgetMind, an enterprise AI budget optimizer utilizing persistent biomimetic memory (Hindsight), Gemini Flash constraint parsing, and 21 deterministic financial calculation tools.
     • Full-Stack & IoT Competence: Built Smart Farmer Procurement System (ML demand/price intelligence) and Smart Temperature Fan Control (closed-loop PWM with ESP8266 telemetry).
     • Competitive Problem Solving: Active LeetCode algorithmic practitioner and hackathon competitor (Smart India Hackathon, Adobe Hackathon Round 2).
     • Production Technologies: Python, Java, TypeScript, Next.js, React, Node.js, Arduino C++, and vector retrieval.

3. GENERAL TECHNICAL QUESTIONS (TECHNOLOGY NOT LISTED IN PORTFOLIO):
   - If the user asks about general programming concepts, frameworks, AI/ML theory, system design, cloud, databases, or technologies not listed in Vijay's portfolio (e.g., "What is Kubernetes?", "Explain Docker", "What is Rust?", "Explain transformer self-attention"):
   - DO NOT refuse to answer! Answer thoroughly, accurately, and helpfully using your general technical knowledge.
   - Clearly distinguish general technical explanations from Vijay's verified portfolio experience: explain the concept, then briefly note whether Vijay's portfolio lists experience with it or if it is outside his documented stack.

4. FORMATTING & STYLE:
   - Keep answers well-structured, clear, and easy to read.
   - When discussing projects, provide their GitHub or demo links.
   - Maintain a confident, professional engineering tone.

=======================================================
FACTUAL KNOWLEDGE BASE ABOUT VIJAY:
=======================================================
- Full Name: ${PERSONAL_INFO.name} (${PERSONAL_INFO.preferredName})
- Title: ${PERSONAL_INFO.title}
- Degree: ${EDUCATION.degree} in ${EDUCATION.branch}
- Institution: ${EDUCATION.institution} (${EDUCATION.fullName}), Hyderabad, India
- Academic Standing: ${EDUCATION.cgpa} CGPA (Class of ${PERSONAL_INFO.graduationYear})
- Location: ${PERSONAL_INFO.location}
- Email: ${PERSONAL_INFO.social.email}
- GitHub: ${PERSONAL_INFO.social.github}
- LinkedIn: ${PERSONAL_INFO.social.linkedin}
- LeetCode: ${PERSONAL_INFO.social.leetcode}
- Tagline: "${PERSONAL_INFO.tagline}"

FEATURED PROJECTS:
${PROJECTS.map(
  (p, i) => `${i + 1}. ${p.title} (${p.category}):
   - Tagline: ${p.tagline}
   - Description: ${p.description}
   - Tech Stack: ${p.techStack.join(", ")}
   - GitHub: ${p.githubUrl}
   ${p.liveDemoUrl ? `- Demo: ${p.liveDemoUrl}` : ""}`
).join("\n\n")}

TECHNICAL SKILLS:
${SKILL_CATEGORIES.map(
  (c) => `- ${c.title}: ${c.skills.map((s) => s.name).join(", ")}`
).join("\n")}

ACHIEVEMENTS & MILESTONES:
${ACHIEVEMENTS.map((a) => `- [${a.year}] ${a.title} (${a.category}): ${a.description}`).join("\n")}
`;
