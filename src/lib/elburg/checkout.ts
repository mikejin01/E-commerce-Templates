import { shipsToCountry } from "@/data/elburg/checkout";

/**
 * Framework-free checkout form model: shape, validation and input masking.
 * Nothing here leaves the browser — the demo has no backend and no payment
 * processor, so none of it is a substitute for real card handling.
 *
 * Copied from `src/lib/verdon/` and adapted (standing rule 7). The address is
 * US-shaped because this is the reference's `en-us` storefront: a state and a
 * ZIP rather than a country select and a postal code, and sales tax added on
 * top of the subtotal instead of contained in it.
 */

export type Address = {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
};

export type Card = {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
};

export function emptyAddress(): Address {
  return {
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  };
}

export const emptyCard: Card = { number: "", expiry: "", cvc: "", name: "" };

/** Deliberately loose — enough to catch typos, not to police valid addresses. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(value: string): Record<string, string> {
  const trimmed = value.trim();
  if (!trimmed) return { email: "Enter an email address" };
  if (!EMAIL_PATTERN.test(trimmed)) return { email: "Enter a valid email address" };
  return {};
}

const REQUIRED_ADDRESS_FIELDS: [keyof Address, string][] = [
  ["firstName", "Enter a first name"],
  ["lastName", "Enter a last name"],
  ["address", "Enter a street address"],
  ["city", "Enter a city"],
  ["state", "Choose a state"],
  ["zip", "Enter a ZIP code"],
];

/** ZIP or ZIP+4, which is what a US address field accepts. */
const ZIP_PATTERN = /^\d{5}(-\d{4})?$/;

/** Errors are keyed `${prefix}.${field}` so shipping and billing share one map. */
export function validateAddress(address: Address, prefix: string): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const [field, message] of REQUIRED_ADDRESS_FIELDS) {
    if (!address[field].trim()) errors[`${prefix}.${field}`] = message;
  }
  if (address.zip.trim() && !ZIP_PATTERN.test(address.zip.trim())) {
    errors[`${prefix}.zip`] = "Use a 5-digit ZIP code";
  }
  return errors;
}

export function validateCard(card: Card, now: Date): Record<string, string> {
  const errors: Record<string, string> = {};

  const digits = cardDigits(card.number);
  if (!digits) errors["card.number"] = "Enter a card number";
  else if (digits.length < 13 || digits.length > 19) {
    errors["card.number"] = "Enter a valid card number";
  }

  const expiry = /^(\d{2})\/(\d{2})$/.exec(card.expiry.trim());
  if (!card.expiry.trim()) {
    errors["card.expiry"] = "Enter an expiry date";
  } else if (!expiry) {
    errors["card.expiry"] = "Use MM / YY";
  } else {
    const month = Number(expiry[1]);
    const year = 2000 + Number(expiry[2]);
    if (month < 1 || month > 12) errors["card.expiry"] = "Use MM / YY";
    // a card is good through the last day of its expiry month
    else if (year < now.getFullYear() || (year === now.getFullYear() && month <= now.getMonth())) {
      errors["card.expiry"] = "This card has expired";
    }
  }

  if (!card.cvc.trim()) errors["card.cvc"] = "Enter a security code";
  else if (!/^\d{3,4}$/.test(card.cvc.trim())) errors["card.cvc"] = "3 or 4 digits";

  if (!card.name.trim()) errors["card.name"] = "Enter the name on the card";

  return errors;
}

export function cardDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatCardNumber(value: string): string {
  const digits = cardDigits(value).slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

/** Digits and a single hyphen, so ZIP+4 can still be typed. */
export function formatZip(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

export function formatAddressLines(address: Address): string[] {
  // "Austin, Texas 78701" — the US convention, built so a missing part cannot
  // leave a stray comma behind
  const locality = [
    [address.city, address.state].filter(Boolean).join(", "),
    address.zip,
  ]
    .filter(Boolean)
    .join(" ");

  return [
    `${address.firstName} ${address.lastName}`.trim(),
    address.address,
    address.apartment,
    locality,
    shipsToCountry,
    address.phone,
  ].filter(Boolean);
}
