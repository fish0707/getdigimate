import { useEffect, useState } from "react";

/**
 * zustand persist 從 localStorage 還原是在 client 掛載後才發生，
 * 直接在 SSR 渲染購物車數字會造成 hydration mismatch。
 * 用此 hook 在掛載後才顯示依賴購物車的內容。
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
