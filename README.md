# Mamidala Vijay Kumar — AI Engineer & Full-Stack Developer Portfolio

A production-ready personal portfolio for **Mamidala Vijay Kumar** (B.Tech CSE-IoT at VNR VJIET, Class of 2029). Crafted with a **light-mode first SaaS aesthetic**, interactive **Three.js WebGL developer avatar**, **Framer Motion** animation system, and an integrated **Vijay AI** personal assistant.

![Portfolio Preview Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80)

---

## ⚡ Key Highlights & Architecture

- **Light-Mode First SaaS Aesthetic**: Inspired by the modern elegance of Vercel, Linear, and Stripe. Built with high contrast readability, frosted glassmorphism (`backdrop-blur-md`), and subtle blue/violet/cyan accents.
- **Interactive 3D Developer Avatar**: Dynamic Three.js WebGL canvas featuring an AI-inspired icosahedron geometric core, gyroscopic orbital rings, and reactive particle physics that tilt dynamically with cursor movement.
- **Vijay AI Personal Assistant**: Floating assistant with `/api/chat` architecture supporting external LLM keys (OpenAI / Gemini) as well as an intelligent zero-dependency fallback engine that guarantees 100% uptime with instant, factual answers about Vijay's profile.
- **Dual Case Study Deep-Dives**:
  1. **Smart Farmer Procurement System** (*AI + Full-Stack Platform*): ML-driven fair price benchmarking and direct farmer-buyer trade portal.
  2. **Smart Temperature-Based Fan Control System** (*CSE-IoT & Embedded Hardware*): NodeMCU ESP8266 + DHT22 closed-loop PWM fan control and cloud telemetry.
- **Honest Engineering Progression**: "Journey So Far" chronological timeline and skills matrix tagged transparently with *"Building With"*, *"Working With"*, and *"Exploring"*.
- **Performant & Accessible**: Custom desktop spring cursor (auto-disabled on touch devices), scroll progress bar, ARIA labels, semantic HTML, and `prefers-reduced-motion` compliance.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) (WebGL Canvas)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Micro-Interactions**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment**: [Vercel](https://vercel.com/) (Optimized out of the box)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** or **Node.js 20+** installed:
```bash
node -v
npm -v
```

### 1. Clone the Repository
```bash
git clone https://github.com/Vijay1822/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

| Variable | Required | Description |
| :--- | :--- | :--- |
| `OPENAI_API_KEY` | Optional | OpenAI API key for conversational AI responses in `/api/chat`. |
| `GEMINI_API_KEY` | Optional | Alternative Gemini API key for dynamic generation. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Base URL for Open Graph and sitemap generation (default: `https://vijaykumar.dev`). |

> **Note**: If no API key is provided, the portfolio automatically operates in **intelligent offline fallback mode**, answering questions factually with zero dependencies.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📦 Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts         # Vijay AI conversational API endpoint
│   ├── favicon.ico
│   ├── globals.css              # Glassmorphism tokens, utilities, and scrollbars
│   ├── layout.tsx               # Root layout, fonts, and Open Graph metadata
│   ├── page.tsx                 # Master single-page scroll layout
│   ├── robots.ts                # Dynamic robots.txt
│   └── sitemap.ts               # Dynamic sitemap.xml
├── components/
│   ├── ui/
│   │   ├── custom-cursor.tsx    # Desktop spring cursor
│   │   └── scroll-progress.tsx  # Top scroll depth bar
│   ├── navbar/
│   │   └── navbar.tsx           # Sticky frosted glass navigation
│   ├── hero/
│   │   ├── hero.tsx             # Hero headline, CTAs, and badges
│   │   ├── avatar-3d.tsx        # Three.js 3D developer identity canvas
│   │   └── background-mesh.tsx  # Interactive ambient mesh
│   ├── about/
│   │   └── about.tsx            # Philosophy, story, and stats
│   ├── skills/
│   │   └── skills.tsx           # Filterable technical capabilities
│   ├── projects/
│   │   ├── projects.tsx         # Dual project showcase
│   │   ├── project-card.tsx     # 3D tilt glass card
│   │   └── project-modal.tsx    # Architecture deep-dive modal
│   ├── achievements/
│   │   └── achievements.tsx     # "Journey So Far" vertical timeline
│   ├── education/
│   │   └── education.tsx        # VNR VJIET B.Tech CSE-IoT foundation
│   ├── ai-assistant/
│   │   └── ai-assistant-modal.tsx # Floating Vijay AI chat panel
│   ├── contact/
│   │   └── contact.tsx          # Direct coordinates and interactive form
│   └── footer/
│       └── footer.tsx           # Footer, quick links, and copyright
├── lib/
│   ├── data.ts                  # Central portfolio data store (all content lives here)
│   ├── ai-assistant.ts          # Knowledge base & heuristic fallback engine
│   └── utils.ts                 # Utility helpers & animation variants
├── .env.example
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## ✏️ Customizing Portfolio Data

All personal content, projects, achievements, skills, and links are decoupled from UI components and cleanly centralized in:
👉 [`lib/data.ts`](lib/data.ts)

To update your contact information, add new projects, or modify milestones, simply edit the objects in `lib/data.ts` and the UI will automatically update everywhere.

---

## 🌐 Deploying to Vercel

The website is fully optimized for **1-click deployment on Vercel**:

### Option A: Using the Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: Using GitHub & Vercel Dashboard
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of premium portfolio"
   git branch -M main
   git remote add origin https://github.com/Vijay1822/portfolio.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com).
3. Click **"New Project"** and import your `portfolio` repository.
4. Framework preset will automatically detect **Next.js**.
5. (Optional) Add `OPENAI_API_KEY` under **Environment Variables**.
6. Click **Deploy**.

---

## 👨‍💻 Developer Profile

**Mamidala Vijay Kumar**  
- **Role**: AI Engineer & Full-Stack Developer  
- **Education**: B.Tech in CSE-IoT, VNR VJIET (2025 – 2029)  
- **GitHub**: [@Vijay1822](https://github.com/Vijay1822)  
- **LinkedIn**: [Vijay Kumar](https://www.linkedin.com/in/vijay-kumar-09b2bb36a)  
- **Email**: [mamidalavijay04@gmail.com](mailto:mamidalavijay04@gmail.com)

---

## 📄 License

MIT License © 2026 Mamidala Vijay Kumar.
