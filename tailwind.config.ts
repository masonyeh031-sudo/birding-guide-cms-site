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
      },
      maxWidth: {
        "screen-shell": "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
