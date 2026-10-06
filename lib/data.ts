export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  architecture: {
    frontend: string;
    backend: string;
    aiOrIot: string;
    database: string;
    flow: string[];
  };
  techStack: string[];
  features: string[];
  metrics?: { label: string; value: string }[];
  githubUrl: string;
  liveDemoUrl?: string;
  badge: string;
  themeColor: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    status: "Building With" | "Working With" | "Exploring";
    iconName: string;
  }[];
}

export interface AchievementItem {
  year: string;
  title: string;
  category:
    | "Hackathon"
    | "ML Project"
    | "Certification"
    | "Certifications & Learning"
    | "IoT Hardware"
    | "Academic"
    | "Hackathons & National Ideathons";
  description: string;
  highlights: string[];
}

export const PERSONAL_INFO = {
  name: "Mamidala Vijay Kumar",
  preferredName: "Vijay",
  title: "AI Engineer & Full-Stack Developer",
  college: "VNR VJIET",
  collegeFullName: "Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering and Technology",
  degree: "Bachelor of Technology (B.Tech)",
  branch: "Computer Science & Engineering — IoT",
  cgpa: "9.45 CGPA",
  graduationYear: "2029",
  location: "Hyderabad, India",
  tagline: "Building intelligent systems that turn ideas into real-world experiences.",
  heroBio:
    "An ambitious AI Engineer & Full-Stack Developer currently pursuing B.Tech in CSE-IoT at VNR VJIET. Passionate about bridging cutting-edge machine learning models, resilient web architectures, and real-world IoT hardware to solve tangible problems.",
  aboutParagraphs: [
    "I am an engineer in the making who believes software is most powerful when it touches the physical world. Specializing in Computer Science and Engineering with an IoT focus at VNR VJIET, my work bridges intelligence, connectivity, and usability.",
    "Rather than treating AI and full-stack development as isolated silos, I focus on integrating machine learning pipelines directly into responsive web interfaces and micro-controller telemetry. From predictive agriculture platforms to closed-loop hardware controllers, I enjoy taking projects from raw concepts to production-grade implementations.",
    "My mindset is centered on continuous experimentation, clean code craftsmanship, and building technology that stands up to real-world conditions.",
  ],
  social: {
    github: "https://github.com/Vijay1822",
    linkedin: "https://www.linkedin.com/in/vijay-kumar-09b2bb36a",
    leetcode: "https://leetcode.com/u/Vijay_kumar2008/",
    email: "mamidalavijay04@gmail.com",
    handle: "@Vijay1822",
    leetcodeHandle: "@Vijay_kumar2008",
  },
  stats: [
    { label: "Graduation", value: "2029", detail: "B.Tech CSE-IoT" },
    { label: "Engineering Focus", value: "CSE-IoT", detail: "Hardware & Software Integration" },
    { label: "Core Direction", value: "AI + Full Stack", detail: "Intelligent Web Systems" },
    { label: "Engineering Mindset", value: "Always Building", detail: "Prototyping & Shipping" },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core algorithmic foundations and multi-paradigm development",
    skills: [
      { name: "Python", status: "Building With", iconName: "FileCode" },
      { name: "Java", status: "Working With", iconName: "Coffee" },
      { name: "TypeScript", status: "Building With", iconName: "Code2" },
      { name: "JavaScript", status: "Building With", iconName: "Braces" },
      { name: "C++", status: "Working With", iconName: "Binary" },
    ],
  },
  {
    title: "AI / Machine Learning",
    description: "Generative AI, machine learning pipelines, and experimentation",
    skills: [
      { name: "Machine Learning", status: "Building With", iconName: "Brain" },
      { name: "Generative AI", status: "Building With", iconName: "Sparkles" },
      { name: "LLMs & Prompting", status: "Building With", iconName: "Cpu" },
      { name: "RAG Systems", status: "Building With", iconName: "Layers" },
      { name: "LangChain", status: "Working With", iconName: "Workflow" },
      { name: "Hugging Face", status: "Working With", iconName: "Smile" },
      { name: "Scikit-Learn", status: "Building With", iconName: "BarChart3" },
    ],
  },
  {
    title: "Frontend Engineering",
    description: "Performant, accessible, and reactive user interfaces",
    skills: [
      { name: "Next.js", status: "Building With", iconName: "Layers" },
      { name: "React", status: "Building With", iconName: "Atom" },
      { name: "Tailwind CSS", status: "Building With", iconName: "Palette" },
      { name: "HTML5 / CSS3", status: "Building With", iconName: "Globe" },
      { name: "Framer Motion", status: "Building With", iconName: "Move" },
    ],
  },
  {
    title: "Backend & Systems",
    description: "Scalable server architectures and API microservices",
    skills: [
      { name: "Node.js", status: "Building With", iconName: "Server" },
      { name: "Express.js", status: "Building With", iconName: "Zap" },
      { name: "RESTful APIs", status: "Building With", iconName: "Radio" },
    ],
  },
  {
    title: "Databases & Storage",
    description: "Relational persistence, vector stores, and cloud backend services",
    skills: [
      { name: "MongoDB", status: "Building With", iconName: "Database" },
      { name: "SQL", status: "Building With", iconName: "Database" },
      { name: "Supabase", status: "Working With", iconName: "Flame" },
      { name: "SQLite", status: "Working With", iconName: "HardDrive" },
    ],
  },
  {
    title: "IoT & Hardware Interfacing",
    description: "Microcontrollers, sensor telemetry, and embedded protocols",
    skills: [
      { name: "Arduino Framework", status: "Building With", iconName: "Cpu" },
      { name: "NodeMCU (ESP8266)", status: "Building With", iconName: "Wifi" },
      { name: "Environmental Sensors", status: "Building With", iconName: "Activity" },
      { name: "Blynk IoT", status: "Working With", iconName: "Smartphone" },
      { name: "MQTT Protocols", status: "Working With", iconName: "RadioTower" },
    ],
  },
  {
    title: "Tools & DevOps",
    description: "Developer tooling, version control, and cloud hosting",
    skills: [
      { name: "Git", status: "Building With", iconName: "GitBranch" },
      { name: "GitHub", status: "Building With", iconName: "Github" },
      { name: "VS Code", status: "Building With", iconName: "Terminal" },
      { name: "Vercel", status: "Building With", iconName: "Cloud" },
      { name: "Netlify", status: "Working With", iconName: "UploadCloud" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "budgetmind",
    title: "BudgetMind",
    category: "AI Agent & Financial Intelligence",
    tagline: "AI Budget Optimizer & Procurement Memory Agent",
    description:
      "An intelligent AI financial budget optimizer and procurement memory agent that uses RAG (Retrieval-Augmented Generation) and Large Language Models to analyze expenditure patterns, predict budget variances, and store contextual financial memory.",
    problem:
      "Organizations and individuals struggle with fragmented expense tracking, opaque procurement leakages, and lack of real-time predictive budgetary intelligence.",
    solution:
      "Engineered an autonomous AI agent leveraging Retrieval-Augmented Generation (RAG) and LLMs with persistent memory pipelines to analyze transaction streams, optimize procurement allocation, and provide actionable real-time budgetary reasoning.",
    architecture: {
      frontend: "React, Next.js, Tailwind CSS, Framer Motion",
      backend: "Node.js, Express.js microservices with transactional settlement",
      aiOrIot: "LangChain, RAG architecture, LLMs, semantic vector embeddings",
      database: "MongoDB with vector indexing and secure session state",
      flow: [
        "User or organization uploads expense & procurement records",
        "Semantic vector pipeline extracts context and stores embeddings in memory",
        "RAG retrieval agent evaluates historical trends and budget thresholds",
        "LLM delivers personalized optimization insights, alerts, and savings strategies",
      ],
    },
    techStack: ["React", "Node.js", "MongoDB", "RAG", "LLMs", "LangChain", "Tailwind CSS"],
    features: [
      "Contextual procurement memory tracking recurring expenditure cycles",
      "Automated budgetary variance forecasting with dynamic limits",
      "Semantic financial document search and conversational query agent",
      "Real-time cost reduction recommendations and anomaly alerts",
      "Interactive data visualization charts for cashflow telemetry",
    ],
    metrics: [
      { label: "AI Architecture", value: "RAG + LLMs" },
      { label: "Database", value: "MongoDB" },
      { label: "Deployment", value: "Netlify / Cloud" },
    ],
    githubUrl: "https://github.com/Vijay1822/BudgetMind",
    liveDemoUrl: "https://budgetmind3.netlify.app/",
    badge: "Featured AI Agent",
    themeColor: "from-cyan-500 to-indigo-600",
  },
  {
    id: "smart-farmer-procurement",
    title: "Smart Farmer Procurement System",
    category: "AI + Full-Stack Platform",
    tagline: "Transparent Agricultural Marketplace with Machine Learning Demand & Price Intelligence",
    description:
      "A full-stack agricultural marketplace designed to bypass exploitative intermediaries. The platform empowers smallholder farmers with automated fair-market pricing predictions, verified direct trade orders, and transparent logistics tracking.",
    problem:
      "Farmers in emerging markets face extreme revenue loss due to opaque middleman cartels, unpredictable wholesale mandi prices, and lack of real-time demand insights. Without accurate market forecasting, farmers are forced into distress sales immediately after harvest.",
    solution:
      "Built a unified direct-trade ecosystem with an embedded Machine Learning pricing model. The platform aggregates regional mandi price histories, weather indices, and seasonal demand to compute fair recommended price corridors, allowing verified wholesale purchasers and institutional buyers to contract directly with farmers.",
    architecture: {
      frontend: "Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion",
      backend: "Node.js & Express API Gateway for transactional settlement and user authentication",
      aiOrIot: "Scikit-Learn Python microservice utilizing Random Forest Regression on regional agricultural indicators",
      database: "Supabase (PostgreSQL) with Row-Level Security, real-time channels, and storage",
      flow: [
        "Farmer inputs crop details, expected harvest quantity, and geo-location",
        "ML pricing engine calculates fair floor and ceiling price corridors based on seasonal historical data",
        "Direct procurement listing is published with transparent escrow milestones",
        "Wholesale buyer approves bid with verified digital contract, eliminating middlemen margins",
      ],
    },
    techStack: ["Next.js", "TypeScript", "Python", "Scikit-Learn", "Node.js", "Supabase", "Tailwind CSS"],
    features: [
      "Dynamic ML price benchmark based on regional historical demand curves",
      "Direct farmer-to-buyer contract generation with verifiable terms",
      "Localized user flow designed for mobile responsiveness across varied connectivity conditions",
      "Telemetry-friendly harvest logging with quality condition parameters",
      "Comprehensive transparent payment and dispute milestone tracker",
    ],
    metrics: [
      { label: "Middleman Reduction", value: "100% Direct" },
      { label: "Price Transparency", value: "Real-Time" },
      { label: "Architecture", value: "Modular ML API" },
    ],
    githubUrl: "https://github.com/Vijay1822",
    badge: "Featured AI Project",
    themeColor: "from-blue-600 to-indigo-600",
  },
  {
    id: "smart-fan-control",
    title: "Smart Temperature-Based Fan Control System",
    category: "CSE-IoT & Embedded Hardware",
    tagline: "Autonomous Microclimate Cooling System with Closed-Loop PWM & IoT Telemetry",
    description:
      "An intelligent, energy-conservative climate control solution built with NodeMCU microcontrollers and digital humidity/temperature sensors, regulating fan RPM via pulse-width modulation and transmitting real-time analytics to the cloud.",
    problem:
      "Standard domestic and laboratory cooling fans run at static high-wattage settings regardless of subtle shifts in ambient temperature. This results in significant electrical wastage, thermal discomfort, and unnecessary mechanical wear during cooler periods.",
    solution:
      "Engineered an autonomous closed-loop embedded system that monitors ambient temperature and relative humidity using a DHT sensor, computes heat index vectors, and smoothly modulates fan rotational speed via proportional PWM logic. Telemetry is streamed to an IoT cloud dashboard for real-time diagnostics.",
    architecture: {
      frontend: "Responsive Next.js Web Telemetry Dashboard with live gauge meters and status feeds",
      backend: "NodeMCU firmware compiled on Arduino C++ with lightweight HTTP/REST and MQTT telemetry handlers",
      aiOrIot: "Closed-loop proportional control algorithm calculating dynamic PWM duty cycles based on temperature thresholds",
      database: "Blynk IoT Cloud & lightweight time-series logging for thermal analytics",
      flow: [
        "DHT22 sensor reads ambient room temperature and relative humidity every 1500ms",
        "NodeMCU ESP8266 computes the target RPM using a calibrated proportional control transfer curve",
        "MOSFET driver circuit delivers smoothed PWM voltage directly to the fan motor",
        "Telemetry payload is streamed to the cloud dashboard for real-time monitoring and manual override",
      ],
    },
    techStack: ["NodeMCU (ESP8266)", "Arduino C++", "DHT22 Sensor", "PWM Driver", "Blynk IoT", "MQTT", "Next.js"],
    features: [
      "Dynamic closed-loop PWM modulation adjusting speed automatically from 0% to 100%",
      "Real-time telemetry streaming of heat index, humidity, and duty cycle",
      "Automated thermal hysteresis preventing rapid on/off motor oscillations",
      "Cloud-connected fail-safe shutdown mode for over-temperature anomalies",
      "Substantial energy reduction compared to constant high-speed fan operation",
    ],
    metrics: [
      { label: "Power Efficiency", value: "~34% Saved" },
      { label: "Sampling Rate", value: "1.5s Loop" },
      { label: "Control System", value: "Proportional PWM" },
    ],
    githubUrl: "https://github.com/Vijay1822",
    badge: "Featured IoT Project",
    themeColor: "from-cyan-600 to-blue-600",
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    year: "2026 – Present",
    title: "B.Tech in CSE-IoT at VNR VJIET",
    category: "Academic",
    description:
      "Pursuing Bachelor of Technology in Computer Science & Engineering (Internet of Things) at VNR VJIET, Hyderabad.",
    highlights: [
      "Maintaining a strong academic profile with a 9.45 CGPA",
      "Building a strong foundation in Data Structures, Algorithms, C++, Computer Networks, DBMS, Java, Computer Architecture, and IoT",
      "Active participation in technical clubs, coding challenges, hackathons, and project-based learning",
      "Developing collaborative projects across AI, Full-Stack Development, and IoT",
      "Exploring practical applications of AI, cloud technologies, embedded systems, and intelligent automation",
    ],
  },
  {
    year: "2026",
    title: "Hands-on IoT & Microcontroller Prototyping",
    category: "IoT Hardware",
    description:
      "Built hands-on IoT and embedded systems using Arduino and NodeMCU/ESP8266/ESP32, working with sensors, actuators, motor control, and IoT communication.",
    highlights: [
      "Designed and developed a Smart Temperature-Based Fan Control System",
      "Worked with Arduino, LM35 temperature sensors, motor drivers, DC motors/fans, LCD displays, and embedded components",
      "Implemented PWM-based motor control and analog-to-digital sensor interfacing",
      "Practiced sensor calibration, real-time hardware control, and Wi-Fi IoT cloud communication using Blynk",
      "Gained practical experience in circuit prototyping, hardware debugging, and IoT system integration",
    ],
  },
  {
    year: "2025 – 2026",
    title: "AI Full-Stack Web Development, NPTEL & AI/ML Learning",
    category: "Certifications & Learning",
    description:
      "Completed certifications and technical learning programs during 2025–2026, with a focus on AI, full-stack development, machine learning, and modern software engineering.",
    highlights: [
      "Completed certification in AI Full-Stack Web Development with React & Node.js",
      "Completed / pursued NPTEL coursework covering Python, machine learning, data analytics, and related technical foundations",
      "Explored Generative AI, Hugging Face Transformers, LLMs, RAG, LangChain/LangGraph, and AI agents",
      "Practiced programming and algorithmic problem solving through LeetCode",
      "Built practical projects applying AI/ML, backend development, databases, cloud deployment, and full-stack engineering",
    ],
  },
  {
    year: "2025 – 2026",
    title: "Adobe Hackathon & Creative AI Challenges",
    category: "Hackathon",
    description:
      "Participated in the Adobe Hackathon and creative AI challenges during 2025–2026, exploring intelligent digital experiences and AI-powered applications.",
    highlights: [
      "Built and explored LLM-powered applications, AI agents, automation workflows, and RAG architectures",
      "Experimented with Generative AI, tool calling, prompt engineering, and intelligent workflows",
      "Developed responsive interfaces connected to AI-powered backend services",
      "Explored practical applications of AI in creative technology, automation, and data-driven experiences",
      "Strengthened skills in rapid product development and presenting technical solutions",
    ],
  },
  {
    year: "2025 – 2026",
    title: "Smart India Hackathon (SIH) & National Hackathons",
    category: "Hackathons & National Ideathons",
    description:
      "Participated in Smart India Hackathon (SIH), national-level hackathons, college hackathons, and ideathons during 2025–2026, developing technology solutions for real-world problems.",
    highlights: [
      "Designed and developed end-to-end AI, IoT, and full-stack prototypes",
      "Worked under intensive hackathon timelines to convert problem statements into functional prototypes",
      "Collaborated with multidisciplinary teams on architecture, development, integration, and deployment",
      "Worked on solutions involving AI agents, RAG, intelligent automation, IoT, databases, and cloud technologies",
      "Presented system architecture, technical feasibility, innovation, and scalability to hackathon judges and mentors",
      "Gained practical experience in rapid prototyping, problem-solving, teamwork, and technical pitching",
    ],
  },
];

export const EDUCATION = {
  institution: "VNR VJIET",
  fullName: "Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering and Technology",
  location: "Bachupally, Hyderabad, Telangana, India",
  degree: "Bachelor of Technology (B.Tech)",
  branch: "Computer Science & Engineering — Internet of Things (CSE-IoT)",
  status: "Undergraduate Student",
  cgpa: "9.45/10 CGPA",
  graduationYear: "2029",
  overview:
    "VNR VJIET is recognized among the premier autonomous engineering institutions in Hyderabad, distinguished for excellence in computing education, research culture, state-of-the-art laboratory infrastructure, and high academic standards.",
  keyCoursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming (Java, Python, C++)",
    "Internet of Things Architecture & Protocols",
    "Microcontrollers & Embedded Interfacing",
    "Computer Networks & Telemetry",
    "Database Management Systems",
    "Machine Learning Foundations",
  ],
};

export const AI_ASSISTANT_SUGGESTIONS = [
  "Who is Vijay?",
  "Resume",
  "Tech Stack",
  "Projects",
  "BudgetMind",
  "Education",
  "Hackathons",
  "LeetCode",
  "GitHub",
  "Contact Vijay",
];
