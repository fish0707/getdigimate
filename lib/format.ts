import { theme } from "@/theme.config";

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(theme.locale, {
    style: "currency",
    currency: theme.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
