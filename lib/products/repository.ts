import { sanityClient, sanityConfigured } from "@/lib/sanity/client";
import {
  CATEGORIES_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
} from "@/lib/sanity/queries";
import { categories as fixtureCategories, products as fixtureProducts } from "./fixtures";
import type { Category, Product, ProductSort } from "./types";

/**
 * 資料層抽象：有設定 Sanity 就走 GROQ，否則走本機 fixture。
 * 上層頁面完全不需知道資料來源，之後接 CMS 不必改頁面。
 */

function sortProducts(items: Product[], sort: ProductSort): Product[] {
  const list = [...items];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "featured":
      return list.sort((a, b) => Number(b.featured) - Number(a.featured));
    case "newest":
    default:
      return list;
  }
}

export interface GetProductsOptions {
  category?: string;
  sort?: ProductSort;
}

export async function getProducts(
  opts: GetProductsOptions = {},
): Promise<Product[]> {
  const { category, sort = "featured" } = opts;

  let items: Product[];
  if (sanityConfigured && sanityClient) {
    items = await sanityClient.fetch<Product[]>(PRODUCTS_QUERY);
  } else {
    items = fixtureProducts;
  }

  if (category) {
    items = items.filter((p) => p.category.slug === category);
  }
  return sortProducts(items, sort);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  if (sanityConfigured && sanityClient) {
    return sanityClient.fetch<Product | null>(PRODUCT_BY_SLUG_QUERY, { slug });
  }
  return fixtureProducts.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  const items = await getProducts({ sort: "featured" });
  return items.filter((p) => p.featured).slice(0, limit);
}

export async function getCategories(): Promise<Category[]> {
  if (sanityConfigured && sanityClient) {
    return sanityClient.fetch<Category[]>(CATEGORIES_QUERY);
  }
  return fixtureCategories;
}
