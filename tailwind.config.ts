import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1120",
        surface: {
          DEFAULT: "#0F172A",
          card: "#1E293B",
          glass: "rgba(30, 41, 59, 0.75)",
          elevated: "rgba(15, 23, 42, 0.85)",
        },
        midnight: {
          950: "#070B14",
          900: "#0B1120",
          800: "#0F172A",
          700: "#1E293B",
          600: "#334155",
        },
        primary: {
          DEFAULT: "#F8FAFC",
          muted: "#94A3B8",
          subtle: "#64748B",
          dark: "#0F172A",
        },
        aurora: {
          cyan: "#06B6D4",
          "cyan-light": "#22D3EE",
          "cyan-glow": "rgba(6, 182, 212, 0.35)",
          amber: "#F59E0B",
          "amber-light": "#FBBF24",
          "amber-glow": "rgba(245, 158, 11, 0.3)",
          indigo: "#6366F1",
          "indigo-light": "#818CF8",
        },
        accent: {
          cyan: "#06B6D4",
          "cyan-light": "#22D3EE",
          amber: "#F59E0B",
          "amber-light": "#FBBF24",
          blue: "#38BDF8",
          violet: "#818CF8",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.4)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-hover": "0 20px 40px -15px rgba(6, 182, 212, 0.2)",
        "amber-hover": "0 20px 40px -15px rgba(245, 158, 11, 0.2)",
        "glow-cyan": "0 0 35px -5px rgba(6, 182, 212, 0.45)",
        "glow-amber": "0 0 35px -5px rgba(245, 158, 11, 0.4)",
        "glow-indigo": "0 0 35px -5px rgba(99, 102, 241, 0.35)",
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient 8s ease infinite",
        "aurora-flow": "aurora 12s ease infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        aurora: {
          "0%": { opacity: "0.5", transform: "scale(1) translate(0, 0)" },
          "50%": { opacity: "0.85", transform: "scale(1.1) translate(20px, -20px)" },
          "100%": { opacity: "0.6", transform: "scale(0.95) translate(-15px, 15px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
