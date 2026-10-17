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
        background: "#0B0C0E",
        surface: {
          DEFAULT: "#111215",
          hover: "#18191E",
          elevated: "#1F2127",
        },
        acid: {
          DEFAULT: "var(--acid, #D4F62A)",
          hover: "#C3E424",
          dim: "rgba(var(--acid-rgb, 212, 246, 42), 0.12)",
        },
        cobalt: {
          DEFAULT: "#101EC4",
          hover: "#0D18A6",
          dim: "rgba(16, 30, 196, 0.15)",
        },
        offwhite: "#F3F4F6",
        muted: "#9CA3AF",
        border: {
          DEFAULT: "#23252B",
          light: "#2E313A",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "system-ui", "sans-serif"],
        display: ["'Bebas Neue'", "'Impact'", "'Oswald'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'SF Mono'", "Menlo", "Consolas", "monospace"],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '36px',
        '4xl': '44px',
        '5xl': '52px',
      },
      boxShadow: {
        tactile: "0 4px 14px -2px rgba(0, 0, 0, 0.45)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
