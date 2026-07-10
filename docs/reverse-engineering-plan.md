# 逆向工程 + 重建計劃書：demo-shop.mosstack.studio → getdigimate 可複用電商模板

> 參考站：`https://demo-shop.mosstack.studio/products`
> 目標：拆解該電商系統的功能與購物流程，clean-room 重建為 getdigimate 可重複販售的電商模板。

## 背景與目標（Context）

**數伴 DigiMate（getdigimate）** 是台中的小店官網架設服務，目前 repo 只有一支靜態
`index.html` 行銷頁（部署於 Vercel）。本計劃透過**逆向工程**拆解參考站
`demo-shop.mosstack.studio` 的電商系統，理解它的功能、購物流程與架構，然後**重建成一套
可重複販售給不同小店客戶的電商模板**。

已確認方向：
- **目標**：可複用電商模板（多客戶 / 易換品牌），非一次性網站。
- **技術堆疊**：Next.js（App Router）+ Sanity（headless CMS）+ Vercel。
- **市場**：台灣為主 → 綠界 ECPay / 藍新 NewebPay、超商取貨、Line Pay。
- **模仿深度**：**功能與流程**複製；視覺、文案、圖片、品牌**全部原創**（clean-room 重製）。

> **偵察環境限制**：雲端開發環境的網路政策封鎖 `demo-shop.mosstack.studio`（proxy 對
> `CONNECT ...:443` 回 403）。因此**偵察階段（Phase 0）需在本機瀏覽器執行**；重建階段
> （Phase 1+）才在此 repo 動工。

---

## 法律與倫理界線（貫穿全程）

逆向一個「公開網站前端」做競品分析、並自行實作功能相似的系統是合法且業界常見的。風險只在於
**照抄受保護的內容**。因此本專案採 **clean-room（乾淨室）** 原則：

- ✅ 可以：觀察功能、購物流程、資訊架構、UX 模式、頁面結構、API 行為，寫成規格再自行實作。
- ❌ 不可：複製對方 HTML/CSS/JS 原始碼、圖片、商品文案、Logo、字型授權、品牌識別。
- ❌ 不可：抓取對方後端 API 當自己的資料源，或大量爬取商品資料。
- 產出物一律以「規格 → 自行重寫」的方式產生，不留對方任何原始碼片段。

---

## Phase 0：逆向偵察方法（本機執行，產出規格文件）

目標：把參考站「拆」成一份可實作的功能規格，而不是複製檔案。用瀏覽器 DevTools 即可，無需任何
入侵手段。建議把每項發現記到 `docs/reverse-eng/spec.md`。

### 0.1 技術堆疊指紋
- 開 `view-source:` 與 DevTools → **Network**，看：
  - 是否有 `__NEXT_DATA__`（Next.js）、`/_next/static/...` chunk → 確認框架。
  - `<meta name="generator">`、`x-powered-by`、`x-vercel-id`、`server` 回應標頭。
  - 是否打到 `*.sanity.io`（apicdn.sanity.io / GROQ query）→ 確認 CMS。
- 裝 **Wappalyzer** 擴充套件快速辨識框架 / CDN / 分析工具 / 金流。
- 看 `/robots.txt` 與 `/sitemap.xml` → 了解路由與可索引頁面。

### 0.2 路由與資訊架構
- 記錄所有頁面型別與 URL 樣式：`/products`（列表）、`/products/[slug]`（單品）、`/cart`、
  `/checkout`、`/collections/[x]`、分類 / 搜尋 / 會員 / 訂單查詢等。
- 觀察 `/products` 的 query 參數（分類、排序、分頁、篩選）如何反映在 URL。

### 0.3 資料 / API 行為（黑箱觀察，不抄資料）
- DevTools Network → XHR/Fetch：記下前端呼叫哪些 endpoint、回傳的**欄位形狀**（不是內容），
  例如商品有：`title / slug / price / compareAtPrice / images[] / variants[] / stock / tags`。
- 觀察加入購物車、更新數量、結帳前計算運費 / 折扣的請求時機（判斷 client cart 或 server cart）。

### 0.4 購物流程逐步錄
- 完整走一遍：瀏覽 → 篩選 → 加入購物車 → 購物車頁 → 結帳表單 → 運送方式（超商 / 宅配）→
  付款方式 → 完成頁。每一步截圖 + 記錄欄位、驗證規則、錯誤訊息。
- 特別記：**台灣在地流程**——超商店到店選擇、發票（載具 / 統編）、金流導轉行為。

### 0.5 效能 / SEO / 行銷
- 跑 **Lighthouse**（效能、SEO、a11y）當作重建的標竿。
- 看 meta / OG / JSON-LD（`Product`、`Offer` schema.org）→ 這些結構化資料也要做。
- 注意行銷埋點：UTM、Meta Pixel（`fbclid` 代表有跑 IG/FB 廣告導流），列入模板必備功能。

**Phase 0 產出**：`docs/reverse-eng/spec.md` — 一份「功能清單 + 資料模型草圖 + 流程圖 +
效能標竿」的規格，作為後續實作依據。

---

## 功能盤點清單（模板要涵蓋的範圍）

| 模組 | 功能 |
|---|---|
| 商品 | 商品列表、分類 / 標籤篩選、排序、分頁、搜尋、單品頁、規格 variants、庫存 |
| 購物車 | 加入 / 更新 / 移除、數量、小計、優惠碼、購物車持久化（localStorage + 可選 server） |
| 結帳 | 收件資料、運送方式（超商店到店 / 宅配）、付款方式、發票（載具 / 統編）、訂單成立 |
| 金流 | 綠界 ECPay 或 藍新 NewebPay 導轉 + 回調（webhook）驗簽、Line Pay（可選） |
| 物流 | 超商電子地圖選店、宅配、運費規則 |
| 內容 | 首頁 banner、促銷區塊、關於 / FAQ / 條款頁（Sanity 可編輯） |
| SEO/行銷 | metadata、OG、JSON-LD Product、sitemap、Meta Pixel / GA4、UTM 保留 |
| 後台 | Sanity Studio 管商品 / 分類 / 內容；訂單資料落地 |

---

## 重建架構（Next.js + Sanity + Vercel，台灣金流）

```
Browser ──> Next.js (App Router, Vercel)
               │  ├─ Server Components 讀 Sanity（GROQ, CDN 快取）
               │  ├─ Route Handlers /api/* （購物車結算、建立訂單、金流回調 webhook）
               │  └─ 商品/內容 = ISR / on-demand revalidate
               ▼
        Sanity（商品、分類、內容、首頁區塊）  ← Sanity Studio 後台
               +
        訂單資料庫  +  ECPay/NewebPay（金流導轉 + webhook 驗簽）
```

**技術選型**
- 前端 / 全端：**Next.js App Router**、TypeScript、Tailwind CSS、Server Components。
- CMS：**Sanity**。商品 / 分類 / 內容 schema 由我們定義並 `deploy_schema`；商品讀取走
  GROQ + `next-sanity`。
- 訂單儲存：MVP 用 **Sanity document type** 或輕量 DB（Vercel Postgres / Supabase）。金流與
  庫存屬敏感寫入，放 Route Handler（server），不在 client。
- 金流：**綠界 ECPay** 全功能（信用卡 / ATM / 超商代碼 / 超商取貨付款）為主，介面抽象成
  `PaymentProvider` interface，方便日後換 NewebPay / Line Pay。
- 部署：**Vercel**（延用 `getdigimate.vercel.app` 帳號），環境變數存金流金鑰。

**可複用模板設計（關鍵，因為要賣給多個客戶）**
- **主題 tokens 化**：顏色 / 字型 / logo / 圓角 / 間距抽成 `theme.config.ts` + Sanity
  `siteSettings` 文件，換客戶只改設定不改程式。
- **Schema 通用化**：商品 / 分類 / 頁面 schema 對所有客戶一致；每客戶一個 Sanity project 或
  dataset（多租戶隔離）。
- **金流 / 物流 adapter**：以 interface 封裝，讓不同客戶啟用不同 provider。
- **環境變數驅動**：站名、金流金鑰、Pixel ID、GA ID 全走 env / siteSettings，一鍵開新店。

---

## 建議專案結構

現有 `index.html` 可保留為行銷頁或移到 `/marketing`。

```
getdigimate/
├─ app/
│  ├─ (shop)/products/page.tsx            # 商品列表（篩選/排序/分頁）
│  ├─ (shop)/products/[slug]/page.tsx     # 單品頁 + JSON-LD
│  ├─ (shop)/cart/page.tsx
│  ├─ (shop)/checkout/page.tsx
│  ├─ api/checkout/route.ts               # 建立訂單、產生金流參數
│  ├─ api/payment/ecpay/callback/route.ts # 金流 webhook 驗簽
│  └─ layout.tsx / page.tsx（首頁）
├─ lib/
│  ├─ sanity/{client.ts,queries.ts,schema/…}
│  ├─ cart/                               # 購物車狀態（zustand + localStorage）
│  ├─ payment/                            # PaymentProvider 抽象 + ecpay 實作
│  └─ logistics/                          # 超商取貨 / 運費
├─ sanity/                                # Sanity Studio（product/category/page/siteSettings）
├─ theme.config.ts                        # 換客戶用的主題設定
└─ docs/reverse-eng/spec.md               # Phase 0 產出
```

---

## 實作里程碑（Roadmap）

- **M0 — 偵察與規格（本機執行）**：完成 Phase 0，產出 `docs/reverse-eng/spec.md`。
- **M1 — 骨架**：Next.js + Tailwind + Sanity 接好；`siteSettings` + `product`/`category`
  schema 部署；首頁 / 商品列表 / 單品頁可讀 Sanity 假資料。
- **M2 — 購物車**：cart 狀態、加入 / 更新 / 移除、優惠碼、購物車頁。
- **M3 — 結帳 + 金流**：結帳表單（收件 / 發票 / 運送）、ECPay 導轉、webhook 驗簽、訂單落地、
  完成頁。
- **M4 — 台灣在地化**：超商店到店選店、運費規則、發票載具 / 統編、Line Pay（可選）。
- **M5 — 模板化 + 行銷 + SEO**：主題 tokens、多租戶設定、Meta Pixel / GA4 / UTM、JSON-LD、
  sitemap、Lighthouse 調校達標杆。

每個里程碑結束都可 commit 到 `claude/ecommerce-reverse-engineering-7az1e5` 分支並推上。

---

## 驗證方式（每階段怎麼確認可用）

- **商品 / 內容**：Sanity Studio 新增商品 → 前台列表與單品頁即時反映（ISR revalidate）。
- **購物流程**：本機 `next dev`，手動走「瀏覽 → 加入購物車 → 結帳」全流程，比對 M0 規格。
- **金流**：用 **ECPay 測試環境（stage）** 金鑰做測試單，確認導轉、回調 webhook 驗簽成功、
  訂單狀態正確更新（以 server webhook 為準，不可只信前端 redirect）。
- **SEO / 效能**：對重建站跑 Lighthouse，分數不低於 M0 記錄的參考站標竿；用 Rich Results
  Test 驗 JSON-LD。
- **模板化**：改一次 `theme.config.ts` + `siteSettings`，確認整站換色 / 換 logo / 換站名
  成功，程式碼零改動。

---

## 開工前的前置需求（需提供 / 開通）

- Sanity project 存取（可用已接上的 MCP 建立 project / dataset）。
- ECPay（或 NewebPay）**測試環境**商店代號與金鑰。
- 確認 `index.html` 現有行銷頁是要保留、併入新站，還是分開部署。
