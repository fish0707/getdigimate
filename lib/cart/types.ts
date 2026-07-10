export interface CartLine {
  key: string; // slug 或 slug:variantId — 同品項合併依據
  slug: string;
  title: string;
  variantId?: string;
  variantTitle?: string;
  price: number; // 單價 (TWD)
  image?: string;
  qty: number;
  maxStock: number; // 可加入的庫存上限
}
