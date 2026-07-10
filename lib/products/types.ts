export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  title: string; // 例："M / 藍"
  price: number; // 分量單位：元 (TWD)
  stock: number;
}

export interface Category {
  slug: string;
  title: string;
}

export interface Product {
  slug: string;
  title: string;
  description: string;
  price: number; // 售價 (TWD)
  compareAtPrice?: number; // 原價（有折扣時顯示刪除線）
  images: ProductImage[];
  category: Category;
  tags: string[];
  variants: ProductVariant[];
  stock: number; // 無 variant 時的總庫存
  featured?: boolean;
}

export type ProductSort = "featured" | "price-asc" | "price-desc" | "newest";
