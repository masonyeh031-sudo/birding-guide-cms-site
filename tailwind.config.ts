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
        glow: "#9be7c4",
        // `mist` 原本是深色主題的淺色文字；改為 Wix 淺色風格後，改指向深森林綠字色。
        mist: "#22362f",
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
        glow: "0 0 0 1px rgba(196, 255, 109, 0.35), 0 18px 40px -10px rgba(78, 127, 102, 0.45)",
        "glow-soft":
          "0 0 0 1px rgba(155, 231, 196, 0.35), 0 12px 30px -8px rgba(78, 127, 102, 0.35)",
      },
      backgroundImage: {
        // Wix 淺色風格：頁面底色改為淺綠漸層。
        "page-glow":
          "linear-gradient(180deg, #f7fbf8 0%, #eef5f0 50%, #f7fbf8 100%)",
        "site-grid":
          "linear-gradient(rgba(49,82,66,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(49,82,66,0.08) 1px, transparent 1px)",
        "site-panel":
          "linear-gradient(180deg, #ffffff 0%, rgba(245,250,247,0.95) 100%)",
        "site-border":
          "linear-gradient(180deg, rgba(49,82,66,0.18), rgba(49,82,66,0.04))",
        "hero-radial":
          "radial-gradient(1200px 600px at 80% 20%, rgba(155, 231, 196, 0.18), transparent 60%), radial-gradient(900px 500px at 10% 90%, rgba(196, 255, 109, 0.12), transparent 60%)",
        "glass-line":
          "linear-gradient(90deg, transparent, rgba(196, 255, 109, 0.6), transparent)",
      },
      maxWidth: {
        "screen-shell": "1180px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(20px,-12px,0)" },
        },
        "drift-slow": {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(-30px,18px,0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.06)" },
        },
        "fly-across": {
          "0%": { transform: "translate3d(-10vw, 0, 0) rotate(-2deg)", opacity: "0" },
          "10%": { opacity: "0.4" },
          "90%": { opacity: "0.4" },
          "100%": { transform: "translate3d(110vw, -8vh, 0) rotate(2deg)", opacity: "0" },
        },
        "shimmer-line": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "fade-in": "fade-in 0.8s ease-out both",
        drift: "drift 14s ease-in-out infinite",
        "drift-slow": "drift-slow 22s ease-in-out infinite",
        "glow-pulse": "glow-pulse 9s ease-in-out infinite",
        "fly-across": "fly-across 38s linear infinite",
        "shimmer-line": "shimmer-line 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
