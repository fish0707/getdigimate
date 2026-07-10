/**
 * 優惠碼 —— M2 先在前端驗證（示範用）。
 * M3 結帳時會改由 server 端重新驗證，避免前端被竄改。
 */
export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number; // percent: 折扣百分比(0-100)；fixed: 折抵金額(TWD)
  minSpend?: number; // 最低消費門檻
  label: string;
}

export const COUPONS: Coupon[] = [
  { code: "WELCOME100", type: "fixed", value: 100, minSpend: 500, label: "新客折 100（滿 500）" },
  { code: "VIP10", type: "percent", value: 10, label: "VIP 全站 9 折" },
  { code: "FREESHIP", type: "fixed", value: 60, minSpend: 990, label: "免運折抵 60（滿 990）" },
];

export interface CouponResult {
  ok: boolean;
  discount: number;
  message: string;
  coupon?: Coupon;
}

/** 驗證優惠碼並算出折抵金額（折抵不超過小計）。 */
export function validateCoupon(code: string, subtotal: number): CouponResult {
  const normalized = code.trim().toUpperCase();
  if (!normalized) {
    return { ok: false, discount: 0, message: "請輸入優惠碼" };
  }
  const coupon = COUPONS.find((c) => c.code === normalized);
  if (!coupon) {
    return { ok: false, discount: 0, message: "優惠碼無效" };
  }
  if (coupon.minSpend && subtotal < coupon.minSpend) {
    return {
      ok: false,
      discount: 0,
      message: `需消費滿 ${coupon.minSpend} 元才能使用`,
    };
  }
  const raw =
    coupon.type === "percent"
      ? Math.round((subtotal * coupon.value) / 100)
      : coupon.value;
  const discount = Math.min(raw, subtotal);
  return { ok: true, discount, message: `已套用「${coupon.label}」`, coupon };
}
