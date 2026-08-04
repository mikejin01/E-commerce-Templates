/**
 * USD formatting, matching the reference's `en-us` storefront. The locale is
 * fixed so the server and the client render identical strings — a locale read
 * off the browser is a hydration mismatch waiting to happen.
 */
export function formatPrice(amount: number): string {
  const hasCents = amount % 1 !== 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(amount);
}

/** The reference writes its shipping threshold as "$49,-". Kept, because it is
 *  the house style rather than a locale artefact. */
export function formatPriceDash(amount: number): string {
  return `${formatPrice(amount)},-`;
}
