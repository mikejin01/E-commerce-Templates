/**
 * Holds the order that was just placed so `/checkout/confirmation` can render
 * it after the cart has been emptied. Mirrors `cart-store.ts`: framework-free,
 * read through `useSyncExternalStore` rather than an effect.
 *
 * sessionStorage, not localStorage — a placed order belongs to the tab that
 * placed it and should not resurface days later in a new session.
 */

const STORAGE_KEY = "verdon-order-v1";

export type OrderLine = {
  slug: string;
  name: string;
  /** colourway plus lens, e.g. "Tortoise · Polarised" */
  variantLabel: string;
  /** add-on names, priced into `unitPrice` */
  addOns: string[];
  image: string;
  quantity: number;
  /** frozen at purchase time; unlike the cart this is a historical record */
  unitPrice: number;
  lineTotal: number;
};

export type Order = {
  number: string;
  /** ISO timestamp, formatted on render */
  placedAt: string;
  email: string;
  shippingAddress: string[];
  billingAddress: string[];
  shippingMethod: { label: string; detail: string; price: number };
  /** estimated delivery window, as ISO dates */
  deliveryWindow: { from: string; to: string };
  cardLast4: string;
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
  vat: number;
};

export type OrderSnapshot = {
  order: Order | null;
  /** false until sessionStorage has been read; guards against a hydration mismatch */
  loaded: boolean;
};

const EMPTY_SNAPSHOT: OrderSnapshot = { order: null, loaded: false };

let snapshot: OrderSnapshot = EMPTY_SNAPSHOT;
const listeners = new Set<() => void>();

function isOrder(value: unknown): value is Order {
  if (typeof value !== "object" || value === null) return false;
  const order = value as Partial<Order>;
  return (
    typeof order.number === "string" &&
    typeof order.email === "string" &&
    typeof order.total === "number" &&
    Array.isArray(order.lines)
  );
}

function readStorage(): Order | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isOrder(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function emit() {
  for (const listener of listeners) listener();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);

  if (listeners.size === 1 && !snapshot.loaded) {
    snapshot = { order: readStorage(), loaded: true };
    emit();
  }

  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): OrderSnapshot {
  return snapshot;
}

export function getServerSnapshot(): OrderSnapshot {
  return EMPTY_SNAPSHOT;
}

export function saveOrder(order: Order) {
  snapshot = { order, loaded: true };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    // private browsing / quota — the confirmation still renders from memory
  }
  emit();
}

/** Mock order number. Uniqueness does not matter in a demo. */
export function createOrderNumber(): string {
  return `VRD-${10000 + Math.floor(Math.random() * 90000)}`;
}

/** Skips weekends so the quoted window reads as working days. */
export function addWorkingDays(from: Date, days: number): Date {
  const date = new Date(from);
  let remaining = days;
  while (remaining > 0) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  return date;
}
