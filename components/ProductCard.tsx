import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products/types";

export default function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const onSale =
    product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-card border border-border bg-surface transition hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-subtle">
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        )}
        {product.tags[0] && (
          <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white">
            {product.tags[0]}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-muted">{product.category.title}</p>
        <h3 className="mt-1 line-clamp-1 font-semibold text-ink">
          {product.title}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-brand">
            {formatPrice(product.price)}
          </span>
          {onSale && (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
