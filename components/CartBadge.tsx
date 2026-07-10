"use client";

import { selectCount, useCart } from "@/lib/cart/store";
import { useHydrated } from "@/lib/cart/useHydrated";

export default function CartBadge() {
  const hydrated = useHydrated();
  const count = useCart((s) => selectCount(s.items));
  if (!hydrated || count === 0) return null;
  return (
    <span
      data-testid="cart-count"
      className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-white"
    >
      {count}
    </span>
  );
}
