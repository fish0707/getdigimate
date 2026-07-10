import { create } from "zustand";
import { persist } from "zustand/middleware";
import { validateCoupon } from "./coupons";
import type { CartLine } from "./types";

interface CartState {
  items: CartLine[];
  couponCode: string | null;
  addItem: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      couponCode: null,

      addItem: (line, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.key === line.key);
          if (existing) {
            const nextQty = Math.min(existing.qty + qty, line.maxStock);
            return {
              items: state.items.map((i) =>
                i.key === line.key ? { ...i, qty: nextQty } : i,
              ),
            };
          }
          const startQty = Math.min(qty, line.maxStock);
          return { items: [...state.items, { ...line, qty: startQty }] };
        }),

      setQty: (key, qty) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.key === key
                ? { ...i, qty: Math.max(0, Math.min(qty, i.maxStock)) }
                : i,
            )
            .filter((i) => i.qty > 0),
        })),

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

      clear: () => set({ items: [], couponCode: null }),

      applyCoupon: (code) => set({ couponCode: code.trim().toUpperCase() }),
      removeCoupon: () => set({ couponCode: null }),
    }),
    { name: "digimate-cart" },
  ),
);

/* ── 純函式 selector（供元件與測試共用） ── */
export function selectCount(items: CartLine[]): number {
  return items.reduce((n, i) => n + i.qty, 0);
}

export function selectSubtotal(items: CartLine[]): number {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function selectDiscount(items: CartLine[], couponCode: string | null): number {
  if (!couponCode) return 0;
  const subtotal = selectSubtotal(items);
  return validateCoupon(couponCode, subtotal).discount;
}

export function selectTotal(items: CartLine[], couponCode: string | null): number {
  return selectSubtotal(items) - selectDiscount(items, couponCode);
}
