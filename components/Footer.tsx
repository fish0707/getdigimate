import { theme } from "@/theme.config";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-subtle">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div>
            <p className="font-bold text-ink">{theme.siteName}</p>
            <p className="mt-1">{theme.tagline}</p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="font-semibold text-ink">購物指南</p>
              <ul className="mt-2 space-y-1">
                <li>運送方式</li>
                <li>付款方式</li>
                <li>退換貨政策</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">關於</p>
              <ul className="mt-2 space-y-1">
                <li>品牌故事</li>
                <li>常見問題</li>
                <li>聯絡我們</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs">
          © {new Date().getFullYear()} {theme.siteNameEn}. 由 數伴 DigiMate 打造。
        </p>
      </div>
    </footer>
  );
}
