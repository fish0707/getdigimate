import Link from "next/link";
import { theme } from "@/theme.config";
import { getCategories } from "@/lib/products/repository";
import CartBadge from "@/components/CartBadge";

export default async function Nav() {
  const categories = await getCategories();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand font-black text-white">
            D
          </span>
          <span className="text-lg font-extrabold text-ink">
            {theme.siteName}
          </span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/products" className="text-sm font-medium text-muted hover:text-ink">
            全部商品
          </Link>
          {categories.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              className="text-sm font-medium text-muted hover:text-ink"
            >
              {c.title}
            </Link>
          ))}
        </div>
        <Link
          href="/cart"
          className="flex items-center rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-dark"
        >
          購物車
          <CartBadge />
        </Link>
      </nav>
    </header>
  );
}
