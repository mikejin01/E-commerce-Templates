/**
 * EUR formatting, matching the reference site's currency. The locale is fixed
 * so the server and client render identical strings (no hydration mismatch).
 */
export function formatPrice(amount: number): string {
  const hasCents = amount % 1 !== 0;
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(amount);
}
