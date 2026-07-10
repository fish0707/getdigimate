import type { Config } from "tailwindcss";
import { theme } from "./theme.config";

/** 把 theme.config.ts 的顏色接到 Tailwind，值走 CSS 變數（見 globals.css）以便執行期覆寫。 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "hsl(var(--color-brand) / <alpha-value>)",
        "brand-dark": "hsl(var(--color-brand-dark) / <alpha-value>)",
        accent: "hsl(var(--color-accent) / <alpha-value>)",
        ink: "hsl(var(--color-ink) / <alpha-value>)",
        muted: "hsl(var(--color-muted) / <alpha-value>)",
        surface: "hsl(var(--color-surface) / <alpha-value>)",
        subtle: "hsl(var(--color-subtle) / <alpha-value>)",
        border: "hsl(var(--color-border) / <alpha-value>)",
      },
      borderRadius: {
        card: theme.radius,
      },
      fontFamily: {
        sans: [theme.font],
      },
    },
  },
  plugins: [],
};

export default config;
