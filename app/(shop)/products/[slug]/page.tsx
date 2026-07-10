import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { theme } from "@/theme.config";
import { formatPrice } from "@/lib/format";
import {
  getProductBySlug,
  getProducts,
} from "@/lib/products/repository";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "找不到商品" };
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images[0] ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const image = product.images[0];
  const onSale =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const soldOut = product.variants.length
    ? product.variants.every((v) => v.stock === 0)
    : product.stock === 0;

  // schema.org Product JSON-LD（SEO）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((i) => i.url),
    category: product.category.title,
    offers: {
      "@type": "Offer",
      priceCurrency: theme.currency,
      price: product.price,
      availability: soldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
    },
  };

  return (
    <div className="py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-6 text-sm text-muted">
        <Link href="/products" className="hover:text-ink">
          全部商品
        </Link>
        {" / "}
        <Link
          href={`/products?category=${product.category.slug}`}
          className="hover:text-ink"
        >
          {product.category.title}
        </Link>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-card bg-subtle">
          {image && (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          )}
        </div>

        <div>
          <p className="text-sm text-muted">{product.category.title}</p>
          <h1 className="mt-1 text-3xl font-black text-ink">{product.title}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-brand">
              {formatPrice(product.price)}
            </span>
            {onSale && (
              <span className="text-muted line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-ink/80">
            {product.description}
          </p>

          {product.variants.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-ink">規格</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <span
                    key={v.id}
                    className={`rounded-lg border px-3 py-1.5 text-sm ${
                      v.stock === 0
                        ? "border-border text-muted line-through"
                        : "border-ink/30 text-ink"
                    }`}
                  >
                    {v.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            disabled={soldOut}
            className="mt-8 w-full rounded-lg bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-muted"
          >
            {soldOut ? "已售完" : "加入購物車"}
          </button>
          <p className="mt-3 text-xs text-muted">
            * 加入購物車功能於 M2 里程碑實作
          </p>
        </div>
      </div>
    </div>
  );
}
