/**
 * Checkout data for ELBURG's storefront.
 *
 * This is the reference's **US storefront**: prices are USD and exclude sales
 * tax, which is added at checkout rather than contained in the price. That is
 * the one structural difference from VERDON's EU checkout, where prices are
 * VAT-inclusive and the tax is shown as a portion already inside the total.
 */

export type ShippingMethod = {
  id: string;
  label: string;
  detail: string;
  /** USD. Standard is waived above `freeOver`; `0` renders as "Free" */
  price: number;
  freeOver?: number;
  /** business-day window, used to quote a delivery date on the confirmation */
  daysMin: number;
  daysMax: number;
};

export const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    label: "Standard delivery",
    detail: "Delivered within 2/4 business days, tracked",
    price: 6,
    freeOver: 49,
    daysMin: 2,
    daysMax: 4,
  },
  {
    id: "express",
    label: "Express delivery",
    detail: "Delivered within 1/2 business days, tracked",
    price: 15,
    daysMin: 1,
    daysMax: 2,
  },
];

/** The threshold is the catalogue's, so the cart and the checkout cannot drift. */
export function shippingCost(method: ShippingMethod, subtotal: number): number {
  return method.freeOver !== undefined && subtotal >= method.freeOver ? 0 : method.price;
}

/**
 * A single flat rate, labelled "estimated" everywhere it renders. Sales tax in
 * the US is set per state and per locality; a table of invented per-state rates
 * would look precise and be wrong, so the demo quotes one figure and says it is
 * a demo figure.
 */
export const SALES_TAX_RATE = 0.0875;

export function salesTax(taxable: number): number {
  return Math.round(taxable * SALES_TAX_RATE * 100) / 100;
}

/**
 * The reference runs a storefront per region and this is the `en-us` one, so
 * the country is fixed rather than a select — which is also why the address
 * fields below are US-shaped (state + ZIP) instead of VERDON's postal code.
 */
export const shipsToCountry = "United States";

export const states: string[] = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
