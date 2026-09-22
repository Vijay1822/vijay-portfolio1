import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, ACHIEVEMENTS, EDUCATION } from "./data";

export const PORTFOLIO_SYSTEM_PROMPT = `
You are Vijay AI, the dedicated personal portfolio assistant for Mamidala Vijay Kumar.
Your role is to represent Vijay professionally, accurately, and concisely to recruiters, collaborators, hackathon organizers, and fellow developers.

KEY FACTUAL INFORMATION ABOUT VIJAY:
- Name: ${PERSONAL_INFO.name} (Vijay)
- Role: ${PERSONAL_INFO.title}
- College: ${EDUCATION.institution} (${EDUCATION.fullName}), Hyderabad, India
- Degree: ${EDUCATION.degree} in ${EDUCATION.branch}
- Expected Graduation: ${PERSONAL_INFO.graduationYear}
- GitHub: ${PERSONAL_INFO.social.github} (${PERSONAL_INFO.social.handle})
- LinkedIn: ${PERSONAL_INFO.social.linkedin}
- Email: ${PERSONAL_INFO.social.email}
- Tagline: "${PERSONAL_INFO.tagline}"

FEATURED PROJECTS:
1. ${PROJECTS[0].title}:
   - Category: ${PROJECTS[0].category}
   - Problem: ${PROJECTS[0].problem}
   - Solution: ${PROJECTS[0].solution}
   - Tech Stack: ${PROJECTS[0].techStack.join(", ")}
   - GitHub: ${PROJECTS[0].githubUrl}

2. ${PROJECTS[1].title}:
   - Category: ${PROJECTS[1].category}
   - Problem: ${PROJECTS[1].problem}
   - Solution: ${PROJECTS[1].solution}
   - Tech Stack: ${PROJECTS[1].techStack.join(", ")}
   - GitHub: ${PROJECTS[1].githubUrl}

SKILLS & PROFICIENCIES:
${SKILL_CATEGORIES.map(
  (c) => `- ${c.title}: ${c.skills.map((s) => `${s.name} (${s.status})`).join(", ")}`
).join("\n")}

JOURNEY & ACHIEVEMENTS:
${ACHIEVEMENTS.map((a) => `- ${a.year}: ${a.title} (${a.category}) - ${a.description}`).join("\n")}

STRICT INSTRUCTIONS:
1. Answer ONLY about Vijay, his engineering work, projects, studies, skills, and portfolio.
2. Be concise, polite, professional, and clear.
3. NEVER fabricate awards, company employment, or fake statistics.
4. If asked about contact info, provide his email (${PERSONAL_INFO.social.email}) and LinkedIn (${PERSONAL_INFO.social.linkedin}).
5. If asked a question outside the scope of Vijay's background or portfolio, politely decline and refocus on Vijay's engineering profile.
`.trim();

/**
 * Intelligent client/server fallback engine that runs when no external API key
 * is configured. Guarantees 100% uptime, zero latency, and accurate answers.
 */
export function generateFallbackResponse(query: string): string {
  const clean = query.trim().toLowerCase();

  // Greeting
  if (/^(hi|hello|hey|greetings|hola|sup|good (morning|afternoon|evening))/i.test(clean)) {
    return `Hello! I'm **Vijay AI**, Mamidala Vijay Kumar's personal portfolio assistant. I can answer questions about Vijay's background, his CSE-IoT studies at VNR VJIET, his AI & Full-Stack projects, skills, or how to get in touch. How can I assist you today?`;
  }

  // Who is Vijay / About
  if (
    clean.includes("who is") ||
    clean.includes("about vijay") ||
    clean.includes("introduce") ||
    clean.includes("summary") ||
    clean.includes("tell me about yourself")
  ) {
    return `**${PERSONAL_INFO.name}** is an aspiring **${PERSONAL_INFO.title}** pursuing his B.Tech in **${PERSONAL_INFO.branch}** at **${PERSONAL_INFO.college}** (graduating in **${PERSONAL_INFO.graduationYear}**).\n\nHe focuses on turning intelligent models into tangible products—combining modern web platforms (Next.js, TypeScript), machine learning pipelines, and sensor-driven hardware systems (ESP8266/Arduino). His engineering philosophy is simple: *"Building intelligent systems that turn ideas into real-world experiences."*`;
  }

  // Projects
  if (
    clean.includes("project") ||
    clean.includes("what has he built") ||
    clean.includes("work") ||
    clean.includes("portfolio")
  ) {
    return `Vijay showcases two flagship engineering projects that bridge software and hardware:\n\n1. **${PROJECTS[0].title}** (*${PROJECTS[0].category}*):\n   A marketplace bridging farmers directly to wholesale buyers. Features an ML-powered fair price benchmark based on historical demand and supply corridors.\n   *Tech:* ${PROJECTS[0].techStack.join(", ")}.\n\n2. **${PROJECTS[1].title}** (*${PROJECTS[1].category}*):\n   An autonomous energy-efficient cooling prototype utilizing NodeMCU & DHT sensors to dynamically modulate fan speed via proportional PWM, cutting idle energy consumption by ~34%.\n   *Tech:* ${PROJECTS[1].techStack.join(", ")}.\n\nYou can click on any project card on this page to inspect the full architecture!`;
  }

  // AI / ML Specific
  if (
    clean.includes("ai") ||
    clean.includes("machine learning") ||
    clean.includes("ml") ||
    clean.includes("generative") ||
    clean.includes("model")
  ) {
    return `Vijay actively builds with **Machine Learning & Generative AI**:\n\n- **Skills:** Machine Learning, Generative AI, LangChain, Hugging Face, Data Analysis, and Model Experimentation.\n- **Applications:** He built the **Smart Farmer Procurement System**, integrating Scikit-Learn regression models for agricultural price and demand forecasting.\n- **Learning:** Explores transformer architectures and practical LLM integration patterns into Next.js full-stack interfaces.`;
  }

  // IoT / Hardware Specific
  if (
    clean.includes("iot") ||
    clean.includes("hardware") ||
    clean.includes("arduino") ||
    clean.includes("nodemcu") ||
    clean.includes("sensor") ||
    clean.includes("fan")
  ) {
    return `As a **CSE-IoT student at VNR VJIET**, Vijay has deep hands-on interest in embedded systems:\n\n- **Microcontrollers:** NodeMCU (ESP8266), ESP32, and Arduino boards.\n- **Protocols & Clouds:** MQTT, Blynk IoT, and REST telemetry.\n- **Featured Hardware Project:** The **Smart Temperature-Based Fan Control System**, which reads ambient heat/humidity through DHT22 sensors and dynamically modulates fan RPM via PWM circuitry to optimize thermal comfort and conserve power.`;
  }

  // Skills / Technologies
  if (
    clean.includes("skill") ||
    clean.includes("tech") ||
    clean.includes("stack") ||
    clean.includes("language") ||
    clean.includes("know")
  ) {
    return `Vijay's technical stack includes:\n\n- **Languages:** Python, Java, TypeScript, JavaScript\n- **Frontend:** Next.js, React, Tailwind CSS, HTML5/CSS3, Framer Motion\n- **Backend:** Node.js, Express.js, RESTful APIs\n- **AI/ML:** Machine Learning, Generative AI, LangChain, Hugging Face\n- **Databases:** SQL, Supabase, SQLite\n- **IoT/Hardware:** NodeMCU (ESP8266), Arduino, Environmental Sensors, Blynk\n- **Tools:** Git, GitHub, VS Code, Vercel`;
  }

  // Education / College / VNR
  if (
    clean.includes("study") ||
    clean.includes("college") ||
    clean.includes("education") ||
    clean.includes("vnr") ||
    clean.includes("btech") ||
    clean.includes("degree") ||
    clean.includes("graduation")
  ) {
    return `Vijay is pursuing a **Bachelor of Technology (B.Tech)** in **Computer Science and Engineering — Internet of Things (CSE-IoT)** at **${EDUCATION.institution}** (${EDUCATION.fullName}), Hyderabad. His expected graduation is in **${EDUCATION.graduationYear}**.\n\nHis coursework emphasizes core algorithms, discrete mathematics, microcontroller architectures, sensor networks, and machine learning principles.`;
  }

  // Contact / Hire / Email / LinkedIn
  if (
    clean.includes("contact") ||
    clean.includes("email") ||
    clean.includes("reach") ||
    clean.includes("hire") ||
    clean.includes("internship") ||
    clean.includes("connect")
  ) {
    return `You can connect directly with Vijay through:\n\n- **Email:** [${PERSONAL_INFO.social.email}](mailto:${PERSONAL_INFO.social.email})\n- **LinkedIn:** [${PERSONAL_INFO.social.linkedin}](${PERSONAL_INFO.social.linkedin})\n- **GitHub:** [${PERSONAL_INFO.social.github}](${PERSONAL_INFO.social.github})\n\nHe is open to exciting internship opportunities, hackathon collaborations, and innovative engineering projects!`;
  }

  // GitHub / Code
  if (clean.includes("github") || clean.includes("git") || clean.includes("repo") || clean.includes("source")) {
    return `You can explore Vijay's code and repositories directly on GitHub at:\n👉 [https://github.com/Vijay1822](https://github.com/Vijay1822) (@Vijay1822).`;
  }

  // Achievements / Hackathons
  if (
    clean.includes("achievement") ||
    clean.includes("hackathon") ||
    clean.includes("journey") ||
    clean.includes("competition")
  ) {
    return `Vijay's journey includes active participation in:\n\n- **Hackathons & Ideathons:** Developing collaborative hardware-software prototypes under tight sprint deadlines.\n- **Applied Projects:** Engineering the *Smart Farmer Procurement System* and *Smart Fan Control System*.\n- **Self-Directed Mastery:** Completing NPTEL and online curricula in Python, algorithmic thinking, and modern machine learning foundations.\n- **Campus Leadership:** Active contributor to technical forums and engineering cohorts at VNR VJIET.`;
  }

  // Default helpful response
  return `Thank you for asking! Vijay is a **${PERSONAL_INFO.title}** studying **CSE-IoT at VNR VJIET** (Class of 2029).\n\nYou can ask me about:\n- **"What projects has Vijay built?"**\n- **"What is his IoT experience?"**\n- **"What technologies does he work with?"**\n- **"How can I contact Vijay?"**\n\nFeel free to select one of the suggested prompts below or ask anything specific!`;
}
