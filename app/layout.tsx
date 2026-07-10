import type { Metadata } from "next";
import "./globals.css";
import { theme } from "@/theme.config";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: `${theme.siteName}｜${theme.tagline}`,
    template: `%s｜${theme.siteName}`,
  },
  description: theme.tagline,
};

/** 從 theme.config.ts 產生 CSS 變數，讓 Tailwind 的 brand/accent... 全指向這裡。 */
function themeStyle(): string {
  const c = theme.colors;
  return `:root{
    --color-brand:${c.brand};--color-brand-dark:${c.brandDark};--color-accent:${c.accent};
    --color-ink:${c.ink};--color-muted:${c.muted};--color-surface:${c.surface};
    --color-subtle:${c.subtle};--color-border:${c.border};--font-sans:${theme.font};
  }`;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={theme.locale}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeStyle() }} />
      </head>
      <body>
        <Nav />
        <main className="mx-auto min-h-[60vh] max-w-6xl px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
