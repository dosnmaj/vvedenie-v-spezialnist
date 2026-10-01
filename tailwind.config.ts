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
        candlelight: "#E8C97A",
        lantern: "#C4852A",
        ember: "#8C4A18",
        burgundy: "#5C1C1C",
        canal: "#1E3830",
        stone: "#1A1610",
        void: "#100C08",
        abyss: "#070503",
      },
      fontFamily: {
        serif: ["Playfair Display SC", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
