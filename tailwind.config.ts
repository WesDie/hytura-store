import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kaiseitokumin: ["var(--font-kaisei-tokumin)"],
        generalsans: ["var(--font-general-sans)"],
      },
      colors: {
        stroke: {
          gray: "#CBCBCB",
          black: "#1F1F1F",
          "light-gray": "#B6B6B6",
          white: "#FFFFFF",
          red: "#AF4545",
          green: "#29751B",
        },
        text: {
          black: "#1F1F1F",
          white: "#FFFFFF",
          "light-gray": "#878787",
          red: "#AF4545",
          green: "#29751B",
        },
        background: {
          white: "#FFFFFF",
          sand: "#FBF9EE",
          "dark-sand": "#EFEDE1",
          black: "#1F1F1F",
          "dark-gray": "#3A3A3A",
        },
      },
      spacing: {
        "1x": "8px",
        "2x": "16px",
        "3x": "24px",
        "4x": "32px",
        "5x": "40px",
        "6x": "48px",
        "7x": "56px",
        "8x": "64px",
        "9x": "72px",
        "10x": "80px",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
export default config;
