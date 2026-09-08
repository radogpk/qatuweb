import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        crudo: {
          DEFAULT: "#F5EFE4",
          light: "#FAF7F2",
          dark: "#EADDC8",
        },
        rojo: {
          DEFAULT: "#B23A2E",
          hover: "#962E24",
          light: "#FDF0EE",
          dark: "#7A241C",
        },
        qori: {
          DEFAULT: "#D4A017",
          light: "#FCF6E5",
          dark: "#A67C0E",
        },
        indigo: {
          DEFAULT: "#2B3A55",
          light: "#4A5B78",
          dark: "#1A2436",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        warm: "0 4px 20px -2px rgba(43, 58, 85, 0.08)",
        "warm-lg": "0 10px 30px -4px rgba(43, 58, 85, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
