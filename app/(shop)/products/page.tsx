import Link from "next/link";
import type { Metadata } from "next";
import {
  getCategories,
  getProducts,
} from "@/lib/products/repository";
import type { ProductSort } from "@/lib/products/types";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = { title: "全部商品" };

const SORTS: { value: ProductSort; label: string }[] = [
  { value: "featured", label: "精選" },
  { value: "newest", label: "最新" },
  { value: "price-asc", label: "價格低到高" },
  { value: "price-desc", label: "價格高到低" },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category, sort } = await searchParams;
  const activeSort = (SORTS.find((s) => s.value === sort)?.value ??
    "featured") as ProductSort;

  const [products, categories] = await Promise.all([
    getProducts({ category, sort: activeSort }),
    getCategories(),
  ]);

  const buildHref = (params: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    const merged = { category, sort: activeSort, ...params };
    if (merged.category) next.set("category", merged.category);
    if (merged.sort) next.set("sort", merged.sort);
    const qs = next.toString();
    return `/products${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="py-10">
      <h1 className="text-2xl font-extrabold text-ink">全部商品</h1>

      {/* 分類篩選 */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={buildHref({ category: undefined })}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
            !category
              ? "border-brand bg-brand text-white"
              : "border-border text-muted hover:border-brand"
          }`}
        >
          全部
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={buildHref({ category: c.slug })}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
              category === c.slug
                ? "border-brand bg-brand text-white"
                : "border-border text-muted hover:border-brand"
            }`}
          >
            {c.title}
          </Link>
        ))}
      </div>

      {/* 排序 */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted">排序：</span>
        {SORTS.map((s) => (
          <Link
            key={s.value}
            href={buildHref({ sort: s.value })}
            className={`rounded-md px-3 py-1 ${
              activeSort === s.value
                ? "bg-subtle font-semibold text-ink"
                : "text-muted hover:text-ink"
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {/* 商品格 */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="mt-12 text-center text-muted">此分類目前沒有商品。</p>
      )}
    </div>
  );
}
