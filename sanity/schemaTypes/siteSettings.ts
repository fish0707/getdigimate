import { defineField, defineType } from "sanity";

/** 站台設定 — 之後可覆寫 theme.config.ts，達成一鍵開新店。 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "站台設定",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "站名", type: "string" }),
    defineField({ name: "tagline", title: "標語", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "brandColor", title: "主色 (hex)", type: "string" }),
    defineField({ name: "accentColor", title: "點綴色 (hex)", type: "string" }),
    defineField({
      name: "metaPixelId",
      title: "Meta Pixel ID",
      type: "string",
    }),
    defineField({ name: "gaId", title: "GA4 Measurement ID", type: "string" }),
  ],
});
