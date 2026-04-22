import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: "#05070b",
          900: "#0a0d12",
          850: "#11161c",
          800: "#171d25",
          700: "#202833",
          600: "#2c3644",
        },
        forest: {
          50: "#f5faf7",
          100: "#e2efe7",
          200: "#c6dccf",
          300: "#9cbfae",
          400: "#6b9b82",
          500: "#4e7f66",
          600: "#3c6651",
          700: "#315242",
          800: "#294138",
          900: "#22362f",
        },
        signal: "#c4ff6d",
        mist: "#f4f7fb",
        sand: "#f3ecdf",
        sky: "#dceaf0",
        clay: "#b6845f",
        ink: "#1f2a26",
      },
      boxShadow: {
        card: "0 24px 60px rgba(31, 42, 38, 0.10)",
        soft: "0 12px 30px rgba(31, 42, 38, 0.08)",
        site: "0 30px 90px rgba(0, 0, 0, 0.38)",
        "site-soft": "0 18px 48px rgba(0, 0, 0, 0.24)",
      },
      backgroundImage: {
        "page-glow":
          "linear-gradient(180deg, #05070b 0%, #0a0d12 38%, #0c1117 100%)",
        "site-grid":
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "site-panel":
          "linear-gradient(180deg, rgba(24,30,38,0.94) 0%, rgba(10,13,18,0.96) 100%)",
        "site-border":
          "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))",
      },
      maxWidth: {
        "screen-shell": "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
