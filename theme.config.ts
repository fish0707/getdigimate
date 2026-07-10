/**
 * 主題設定 — 換客戶時只需改這支檔案。
 * 顏色以 HSL 分量字串表示（例："221 83% 53%"），供 Tailwind 與 CSS 變數共用。
 * 之後可由 Sanity `siteSettings` 覆寫，達成一鍵開新店。
 */
export const theme = {
  siteName: "數伴選物",
  siteNameEn: "DigiMate Store",
  tagline: "為台灣小店打造的線上商店",
  colors: {
    brand: "221 83% 53%", // 主色 (blue)
    brandDark: "217 91% 35%",
    accent: "160 84% 39%", // 點綴 (green)
    ink: "222 47% 11%", // 主要文字
    muted: "215 16% 47%", // 次要文字
    surface: "0 0% 100%", // 背景
    subtle: "210 40% 98%", // 淺背景
    border: "214 32% 91%",
  },
  radius: "14px",
  font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang TC', 'Noto Sans TC', '微軟正黑體', sans-serif",
  currency: "TWD",
  locale: "zh-TW",
} as const;

export type Theme = typeof theme;
