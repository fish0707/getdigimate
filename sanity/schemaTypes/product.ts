import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "商品",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "商品名稱",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "網址代稱",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "描述", type: "text" }),
    defineField({
      name: "price",
      title: "售價 (TWD)",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "compareAtPrice",
      title: "原價（折扣時顯示）",
      type: "number",
    }),
    defineField({
      name: "images",
      title: "商品圖片",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "替代文字", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "category",
      title: "分類",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "tags",
      title: "標籤",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "variants",
      title: "規格",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "規格名稱", type: "string" },
            { name: "price", title: "價格", type: "number" },
            { name: "stock", title: "庫存", type: "number" },
          ],
        },
      ],
    }),
    defineField({ name: "stock", title: "總庫存", type: "number" }),
    defineField({ name: "featured", title: "設為精選", type: "boolean" }),
  ],
  preview: {
    select: { title: "title", media: "images.0", subtitle: "price" },
  },
});
