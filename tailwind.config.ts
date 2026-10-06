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
        background: "#070B14",
        obsidian: {
          950: "#070B14", // Primary Background
          900: "#0B1220", // Secondary Background
          850: "#0F1726", // Section Background
          800: "#121C2D", // Card Background
          750: "#172338", // Elevated Card Background
          700: "#0D1626", // Input Background
        },
        surface: {
          DEFAULT: "#070B14",
          secondary: "#0B1220",
          section: "#0F1726",
          card: "#121C2D",
          elevated: "#172338",
          input: "#0D1626",
          glass: "rgba(7, 11, 20, 0.82)",
          border: "rgba(148, 163, 184, 0.12)",
        },
        brand: {
          cyan: "#22D3EE",
          "cyan-hover": "#67E8F9",
          blue: "#3B82F6",
          "blue-deep": "#2563EB",
          amber: "#F59E0B",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#A7B4C7",
          muted: "#64748B",
          dim: "#475569",
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
        card: "0 10px 40px rgba(0, 0, 0, 0.18)",
        "card-hover": "0 16px 45px rgba(34, 211, 238, 0.08)",
        "amber-hover": "0 16px 45px rgba(245, 158, 11, 0.08)",
        "btn-primary": "0 10px 30px rgba(34, 211, 238, 0.18)",
        "logo-glow": "0 8px 30px rgba(34, 211, 238, 0.16)",
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
