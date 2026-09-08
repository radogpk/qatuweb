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
          DEFAULT: "#FAF9F6", // Blanco editorial con subtono arena neutro
          light: "#FDFBF7",
          dark: "#F0ECE1",
          border: "#EAE6DF",
        },
        rojo: {
          DEFAULT: "#B23A2E", // Rojo Ayacuchano / Terracota
          hover: "#962E24",
          light: "#FDF2F0",
          dark: "#7A241C",
        },
        qori: {
          DEFAULT: "#C59218", // Dorado sobrio
          light: "#FCF8EC",
          dark: "#9E730E",
        },
        indigo: {
          DEFAULT: "#1E2838", // Índigo profundo editorial
          light: "#4B586E",
          dark: "#121A24",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(30, 40, 56, 0.04), 0 1px 2px -1px rgba(30, 40, 56, 0.04)",
        card: "0 4px 20px -2px rgba(30, 40, 56, 0.06)",
        "card-hover": "0 12px 30px -4px rgba(30, 40, 56, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
