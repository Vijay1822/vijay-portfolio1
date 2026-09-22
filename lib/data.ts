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
  category: "Hackathon" | "ML Project" | "Certification" | "IoT Hardware" | "Academic";
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
    email: "mamidalavijay04@gmail.com",
    handle: "@Vijay1822",
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
    ],
  },
  {
    title: "AI / Machine Learning",
    description: "Generative AI, machine learning pipelines, and experimentation",
    skills: [
      { name: "Machine Learning", status: "Building With", iconName: "Brain" },
      { name: "Generative AI", status: "Building With", iconName: "Sparkles" },
      { name: "LangChain", status: "Working With", iconName: "Workflow" },
      { name: "Hugging Face", status: "Working With", iconName: "Smile" },
      { name: "Model Experimentation", status: "Building With", iconName: "Cpu" },
      { name: "Data Analysis", status: "Working With", iconName: "BarChart3" },
    ],
  },
  {
    title: "Frontend Engineering",
    description: "Performant, accessible, and reactive user interfaces",
    skills: [
      { name: "Next.js", status: "Building With", iconName: "Layers" },
      { name: "React", status: "Building With", iconName: "Atom" },
      { name: "Tailwind CSS", status: "Building With", iconName: "Palette" },
      { name: "HTML5 & CSS3", status: "Building With", iconName: "Globe" },
      { name: "Framer Motion", status: "Working With", iconName: "Move" },
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
    description: "Relational persistence and cloud backend services",
    skills: [
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
    year: "2025 – Present",
    title: "B.Tech in CSE-IoT at VNR VJIET",
    category: "Academic",
    description:
      "Pursuing Bachelor of Technology in Computer Science & Engineering (Internet of Things) at VNR VJIET, Hyderabad. Focusing on data structures, algorithmic design, embedded hardware interfacing, and distributed systems.",
    highlights: [
      "Active participation in campus technical clubs and coding challenges",
      "Rigorous foundation in computer architecture, C++, and hardware lab experiments",
      "Collaborative project development across AI and IoT domains",
    ],
  },
  {
    year: "2025",
    title: "Building Competition-Focused ML & Full-Stack Prototypes",
    category: "ML Project",
    description:
      "Developed high-impact practical solutions including the Smart Farmer Procurement System and predictive ML models addressing real-world operational challenges in agriculture and resource allocation.",
    highlights: [
      "Implemented predictive regression and classification pipelines in Python",
      "Integrated machine learning microservices into modern Next.js client architectures",
      "Focused on practical feasibility and honest engineering design",
    ],
  },
  {
    year: "2025",
    title: "Participation in Technical Competitions & Ideathons",
    category: "Hackathon",
    description:
      "Engaged in technical hackathons and ideathons, pitching software-hardware integrated solutions and collaborating on rapid prototyping under tight deadlines.",
    highlights: [
      "Gained hands-on experience under competitive team constraints",
      "Refined presentation of system architecture and real-world viability",
      "Networked with fellow student builders and tech mentors",
    ],
  },
  {
    year: "2024 – 2025",
    title: "NPTEL & Specialized AI Learning",
    category: "Certification",
    description:
      "Undertook continuous self-directed learning across NPTEL coursework, online developer curricula, and open-source documentation covering Python, data analytics, and modern web frameworks.",
    highlights: [
      "Completed in-depth studies of Python programming and object-oriented paradigms",
      "Explored generative AI models, Hugging Face transformers, and LLM prompting patterns",
      "Strengthened mathematical foundations of optimization and statistics",
    ],
  },
  {
    year: "2024",
    title: "Hands-on IoT & Microcontroller Prototyping",
    category: "IoT Hardware",
    description:
      "Constructed hands-on microcontroller systems utilizing Arduino and NodeMCU (ESP8266/ESP32) boards, interfacing sensors, actuators, and WiFi telemetry.",
    highlights: [
      "Designed and deployed the Smart Temperature-Based Fan Control System",
      "Mastered PWM control, analog-to-digital conversions, and sensor calibration",
      "Implemented MQTT and cloud communication channels using Blynk IoT",
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
  graduationYear: "2029",
  overview:
    "VNR VJIET is recognized among the premier autonomous engineering institutions in Hyderabad, distinguished for excellence in computing education, research culture, state-of-the-art laboratory infrastructure, and high academic standards.",
  keyCoursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming (Java & Python)",
    "Internet of Things Architecture & Protocols",
    "Microcontrollers & Embedded Interfacing",
    "Computer Networks & Telemetry",
    "Database Management Systems",
    "Machine Learning Foundations",
    "Digital Logic & Circuit Design",
  ],
};

export const AI_ASSISTANT_SUGGESTIONS = [
  "Who is Vijay?",
  "What technologies does Vijay use?",
  "Tell me about his projects.",
  "What is Vijay studying?",
  "Tell me about his IoT experience.",
  "How can I contact Vijay?",
  "Show me his GitHub.",
];
