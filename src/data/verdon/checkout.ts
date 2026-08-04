export type ShippingMethod = {
  id: string;
  label: string;
  detail: string;
  /** EUR, whole units; 0 renders as "Free" */
  price: number;
  /** working-day window, used to quote a delivery date on the confirmation */
  daysMin: number;
  daysMax: number;
};

export const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    label: "Standard delivery",
    detail: "3–5 working days, tracked",
    price: 0,
    daysMin: 3,
    daysMax: 5,
  },
  {
    id: "express",
    label: "Express delivery",
    detail: "1–2 working days, tracked",
    price: 12,
    daysMin: 1,
    daysMax: 2,
  },
];

/**
 * Prices are VAT-inclusive, as on the reference site's EU storefront — VAT is
 * shown as the portion already contained in the total, never added on top.
 */
export const VAT_RATE = 0.21;

export const defaultCountry = "Netherlands";

export const countries: string[] = [
  "Netherlands",
  "Austria",
  "Belgium",
  "Canada",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "Ireland",
  "Italy",
  "Luxembourg",
  "Norway",
  "Poland",
  "Portugal",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
  "United States",
];
