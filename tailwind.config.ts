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
        background: "#FAFAFA",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#0F172A",
          muted: "#334155",
          subtle: "#64748B",
        },
        accent: {
          blue: "#2563EB",
          "blue-light": "#3B82F6",
          violet: "#6366F1",
          "violet-light": "#8B5CF6",
          cyan: "#06B6D4",
          "cyan-light": "#22D3EE",
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
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        glass: "0 8px 30px rgba(0, 0, 0, 0.04)",
        "glass-hover": "0 20px 40px -15px rgba(37, 99, 235, 0.08)",
        glow: "0 0 35px -5px rgba(99, 102, 241, 0.25)",
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient 8s ease infinite",
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
      },
    },
  },
  plugins: [],
};
export default config;
