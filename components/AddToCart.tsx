"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart/store";
import type { Product } from "@/lib/products/types";

export default function AddToCart({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const hasVariants = product.variants.length > 0;
  const [variantId, setVariantId] = useState<string | undefined>(
    hasVariants ? undefined : undefined,
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedVariant = useMemo(
    () => product.variants.find((v) => v.id === variantId),
    [product.variants, variantId],
  );

  const stock = hasVariants
    ? (selectedVariant?.stock ?? 0)
    : product.stock;
  const price = selectedVariant?.price ?? product.price;
  const needsVariant = hasVariants && !variantId;
  const soldOut = hasVariants
    ? product.variants.every((v) => v.stock === 0)
    : product.stock === 0;
  const disabled = soldOut || needsVariant || stock === 0;

  const handleAdd = () => {
    if (disabled) return;
    addItem(
      {
        key: selectedVariant ? `${product.slug}:${selectedVariant.id}` : product.slug,
        slug: product.slug,
        title: product.title,
        variantId: selectedVariant?.id,
        variantTitle: selectedVariant?.title,
        price,
        image: product.images[0]?.url,
        maxStock: stock,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      {hasVariants && (
        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold text-ink">規格</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => {
              const out = v.stock === 0;
              const active = v.id === variantId;
              return (
                <button
                  key={v.id}
                  type="button"
                  disabled={out}
                  onClick={() => setVariantId(v.id)}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                    out
                      ? "cursor-not-allowed border-border text-muted line-through"
                      : active
                        ? "border-brand bg-brand text-white"
                        : "border-ink/30 text-ink hover:border-brand"
                  }`}
                >
                  {v.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 數量 */}
      <div className="mt-6 flex items-center gap-3">
        <p className="text-sm font-semibold text-ink">數量</p>
        <div className="flex items-center rounded-lg border border-border">
          <button
            type="button"
            aria-label="減少數量"
            className="px-3 py-1.5 text-lg text-muted hover:text-ink"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="w-10 text-center text-sm" data-testid="qty">
            {qty}
          </span>
          <button
            type="button"
            aria-label="增加數量"
            className="px-3 py-1.5 text-lg text-muted hover:text-ink"
            onClick={() => setQty((q) => Math.min(Math.max(1, stock || 1), q + 1))}
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={disabled}
        data-testid="add-to-cart"
        className="mt-8 w-full rounded-lg bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-muted"
      >
        {soldOut
          ? "已售完"
          : needsVariant
            ? "請選擇規格"
            : added
              ? "已加入購物車 ✓"
              : "加入購物車"}
      </button>
    </div>
  );
}
