import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "分類",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "分類名稱",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "網址代稱",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
  ],
});
