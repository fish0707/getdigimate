import type { Category, Product } from "./types";

/**
 * 原創假資料（clean-room）：文案、命名、圖片皆自行產生，不取自任何參考站。
 * 圖片用 Unsplash 佔位（next.config 已允許該 host）；接上 Sanity 後改讀 CMS。
 */
export const categories: Category[] = [
  { slug: "apparel", title: "服飾" },
  { slug: "accessories", title: "配件" },
  { slug: "home", title: "居家" },
  { slug: "stationery", title: "文具" },
];

const cat = (slug: string) =>
  categories.find((c) => c.slug === slug) ?? categories[0];

export const products: Product[] = [
  {
    slug: "everyday-cotton-tee",
    title: "日常有機棉 T 恤",
    description:
      "以 100% 有機棉織成，親膚透氣，版型俐落好搭。台灣在地打樣，耐洗不變形，是衣櫃裡的百搭基本款。",
    price: 690,
    compareAtPrice: 880,
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
        alt: "白色棉質 T 恤平放",
      },
    ],
    category: cat("apparel"),
    tags: ["新品", "熱銷"],
    variants: [
      { id: "tee-s", title: "S", price: 690, stock: 12 },
      { id: "tee-m", title: "M", price: 690, stock: 8 },
      { id: "tee-l", title: "L", price: 690, stock: 0 },
    ],
    stock: 20,
    featured: true,
  },
  {
    slug: "canvas-tote-bag",
    title: "厚磅帆布托特包",
    description:
      "14 盎司厚磅帆布，容量寬敞可放 A4，肩背手提兩用。簡約素色設計，通勤採買都合適。",
    price: 480,
    images: [
      {
        url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&q=80",
        alt: "米色帆布托特包",
      },
    ],
    category: cat("accessories"),
    tags: ["熱銷"],
    variants: [],
    stock: 34,
    featured: true,
  },
  {
    slug: "ceramic-pour-over-mug",
    title: "手沖陶瓷濾杯馬克杯",
    description:
      "一體成型陶瓷濾杯，杯口聚熱、注水穩定，一杯到位。溫潤釉色，晨間手沖的儀式感。",
    price: 1180,
    compareAtPrice: 1380,
    images: [
      {
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80",
        alt: "陶瓷馬克杯與咖啡",
      },
    ],
    category: cat("home"),
    tags: ["新品"],
    variants: [],
    stock: 15,
    featured: true,
  },
  {
    slug: "linen-apron",
    title: "亞麻工作圍裙",
    description:
      "天然亞麻材質，越洗越柔軟。可調頸帶與大口袋設計，料理、手作、園藝皆好用。",
    price: 890,
    images: [
      {
        url: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=900&q=80",
        alt: "亞麻圍裙",
      },
    ],
    category: cat("apparel"),
    tags: [],
    variants: [],
    stock: 9,
  },
  {
    slug: "brass-desk-clip",
    title: "黃銅桌上文件夾",
    description:
      "實心黃銅車製，沉穩手感隨使用養出溫潤色澤。夾放收據、便條、明信片的桌面小物。",
    price: 320,
    images: [
      {
        url: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=900&q=80",
        alt: "桌面文具",
      },
    ],
    category: cat("stationery"),
    tags: ["新品"],
    variants: [],
    stock: 40,
  },
  {
    slug: "recycled-notebook",
    title: "再生紙筆記本",
    description:
      "採用再生紙內頁，滑順不暈墨。平攤裝訂好書寫，隨手記錄靈感與待辦。",
    price: 260,
    compareAtPrice: 320,
    images: [
      {
        url: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=900&q=80",
        alt: "筆記本",
      },
    ],
    category: cat("stationery"),
    tags: ["熱銷"],
    variants: [],
    stock: 55,
  },
];
