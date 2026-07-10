"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import {
  selectCount,
  selectDiscount,
  selectSubtotal,
  selectTotal,
  useCart,
} from "@/lib/cart/store";
import { validateCoupon } from "@/lib/cart/coupons";
import { useHydrated } from "@/lib/cart/useHydrated";

export default function CartPage() {
  const hydrated = useHydrated();
  const { items, couponCode, setQty, removeItem, applyCoupon, removeCoupon } =
    useCart();
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const subtotal = selectSubtotal(items);
  const discount = selectDiscount(items, couponCode);
  const total = selectTotal(items, couponCode);
  const count = selectCount(items);

  const handleApply = () => {
    const res = validateCoupon(codeInput, subtotal);
    if (!res.ok) {
      setError(res.message);
      return;
    }
    setError(null);
    applyCoupon(codeInput);
    setCodeInput("");
  };

  if (!hydrated) {
    return <div className="py-20 text-center text-muted">載入中…</div>;
  }

  if (count === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-muted">購物車是空的</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark"
        >
          去逛逛
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h1 className="text-2xl font-extrabold text-ink">購物車</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* 品項列表 */}
        <ul className="divide-y divide-border">
          {items.map((line) => (
            <li key={line.key} className="flex gap-4 py-4" data-testid="cart-line">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-subtle">
                {line.image && (
                  <Image
                    src={line.image}
                    alt={line.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col">
                <Link
                  href={`/products/${line.slug}`}
                  className="font-semibold text-ink hover:text-brand"
                >
                  {line.title}
                </Link>
                {line.variantTitle && (
                  <p className="text-sm text-muted">{line.variantTitle}</p>
                )}
                <p className="mt-1 text-sm text-brand">
                  {formatPrice(line.price)}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      aria-label="減少數量"
                      className="px-3 py-1 text-muted hover:text-ink"
                      onClick={() => setQty(line.key, line.qty - 1)}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{line.qty}</span>
                    <button
                      aria-label="增加數量"
                      className="px-3 py-1 text-muted hover:text-ink"
                      onClick={() => setQty(line.key, line.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-sm text-muted hover:text-ink"
                    onClick={() => removeItem(line.key)}
                    data-testid="remove-line"
                  >
                    移除
                  </button>
                </div>
              </div>
              <div className="text-right font-semibold text-ink">
                {formatPrice(line.price * line.qty)}
              </div>
            </li>
          ))}
        </ul>

        {/* 摘要 */}
        <aside className="h-fit rounded-card border border-border bg-subtle p-5">
          {/* 優惠碼 */}
          <div>
            <label className="text-sm font-semibold text-ink">優惠碼</label>
            {couponCode ? (
              <div className="mt-2 flex items-center justify-between rounded-lg bg-accent/10 px-3 py-2 text-sm">
                <span className="font-semibold text-accent">{couponCode}</span>
                <button
                  className="text-muted hover:text-ink"
                  onClick={() => {
                    removeCoupon();
                    setError(null);
                  }}
                >
                  移除
                </button>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <input
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="輸入優惠碼"
                  data-testid="coupon-input"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
                />
                <button
                  onClick={handleApply}
                  data-testid="coupon-apply"
                  className="rounded-lg bg-ink px-4 py-2 text-sm font-bold text-white"
                >
                  套用
                </button>
              </div>
            )}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          </div>

          <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <span>小計</span>
              <span data-testid="subtotal">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-accent">
                <span>折扣</span>
                <span data-testid="discount">−{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-ink">
              <span>合計</span>
              <span data-testid="total">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-muted">運費將於結帳時計算</p>
          </div>

          <button
            disabled
            className="mt-5 w-full cursor-not-allowed rounded-lg bg-muted px-6 py-3 font-bold text-white"
          >
            前往結帳
          </button>
          <p className="mt-2 text-center text-xs text-muted">
            * 結帳與金流於 M3 里程碑實作
          </p>
        </aside>
      </div>
    </div>
  );
}
