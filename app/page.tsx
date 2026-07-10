import Link from "next/link";
import { theme } from "@/theme.config";
import { getFeaturedProducts } from "@/lib/products/repository";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const featured = await getFeaturedProducts(3);

  return (
    <div className="py-10">
      {/* Hero */}
      <section className="rounded-card bg-gradient-to-br from-ink to-brand px-6 py-16 text-center text-white">
        <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
          {theme.siteNameEn}
        </p>
        <h1 className="mx-auto max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
          {theme.tagline}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          精選好物、安心結帳、超商取貨。專為台灣小店打造的線上商店。
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-bold text-brand transition hover:bg-white/90"
        >
          開始選購
        </Link>
      </section>

      {/* Featured */}
      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-ink">精選商品</h2>
          <Link href="/products" className="text-sm font-semibold text-brand">
            看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
