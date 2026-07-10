import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

/**
 * Sanity Studio 設定。待用 MCP `create_project` 建立專案後，
 * 填入 projectId（或以環境變數帶入）即可 `sanity deploy` / `deploy_schema`。
 */
export default defineConfig({
  name: "getdigimate-store",
  title: "數伴選物 後台",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "REPLACE_WITH_PROJECT_ID",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
