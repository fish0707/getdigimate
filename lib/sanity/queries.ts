import { groq } from "next-sanity";

/** GROQ 查詢——待 Sanity schema 部署後由 repository 使用。 */
export const PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(_createdAt desc){
    "slug": slug.current,
    title,
    description,
    price,
    compareAtPrice,
    "images": images[]{ "url": asset->url, "alt": coalesce(alt, ^.title) },
    "category": category->{ "slug": slug.current, title },
    tags,
    "variants": variants[]{ "id": _key, title, price, stock },
    stock,
    featured
  }
`;

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    description,
    price,
    compareAtPrice,
    "images": images[]{ "url": asset->url, "alt": coalesce(alt, ^.title) },
    "category": category->{ "slug": slug.current, title },
    tags,
    "variants": variants[]{ "id": _key, title, price, stock },
    stock,
    featured
  }
`;

export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc){ "slug": slug.current, title }
`;
