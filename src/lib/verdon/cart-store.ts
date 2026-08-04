import { getAddOn, getProduct } from "@/data/verdon/products";

/**
 * Framework-free cart store backed by localStorage. React subscribes to this
 * through `useSyncExternalStore` in `cart-context.tsx`, which keeps the
 * localStorage read out of an effect and syncs the cart across open tabs.
 */

// v2: lines gained `lens` and `addOns`, and every colourway was renamed when the
// catalogue was restated against the reference, so v1 lines can no longer resolve
const STORAGE_KEY = "verdon-cart-v1";
export const MAX_QUANTITY = 10;

/**
 * Only the identity of a line is persisted — price, name and imagery are
 * resolved from `products.ts` on read, so a stale stored cart can never show an
 * out-of-date price.
 */
export type CartLine = {
  slug: string;
  color: string;
  /** absent for products the store sells with one lens only */
  lens?: string;
  /** add-on ids, always sorted so line identity is order-independent */
  addOns: string[];
  quantity: number;
};

export type CartSnapshot = {
  lines: CartLine[];
  /** false until localStorage has been read; guards against a hydration mismatch */
  loaded: boolean;
};

const EMPTY_SNAPSHOT: CartSnapshot = { lines: [], loaded: false };

let snapshot: CartSnapshot = EMPTY_SNAPSHOT;
const listeners = new Set<() => void>();

function clampQuantity(quantity: number) {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity)));
}

/**
 * Two lines merge only when the product, colourway, lens *and* add-on set all
 * match — a Roamer with a retainer is a different line from one without.
 */
export function lineKey(line: Pick<CartLine, "slug" | "color" | "lens" | "addOns">) {
  return [line.slug, line.color, line.lens ?? "", [...line.addOns].sort().join("+")].join("|");
}

/** Drops unknown ids and duplicates, then sorts, so a line key is canonical. */
function normaliseAddOns(ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.filter((id): id is string => typeof id === "string" && !!getAddOn(id)))].sort();
}

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((entry): CartLine[] => {
      if (typeof entry !== "object" || entry === null) return [];
      const { slug, color, lens, quantity, addOns } = entry as Partial<CartLine>;
      if (typeof slug !== "string" || typeof color !== "string") return [];
      if (typeof quantity !== "number" || !Number.isFinite(quantity)) return [];

      // drop lines whose product, colourway or lens has left the catalogue
      const product = getProduct(slug);
      if (!product) return [];
      if (!product.colors.some((c) => c.name === color)) return [];
      const validLens =
        product.lensOptions === undefined
          ? undefined
          : product.lensOptions.find((l) => l.name === lens)?.name;
      if (product.lensOptions !== undefined && validLens === undefined) return [];

      return [
        {
          slug,
          color,
          ...(validLens ? { lens: validLens } : {}),
          addOns: normaliseAddOns(addOns),
          quantity: clampQuantity(quantity),
        },
      ];
    });
  } catch {
    return [];
  }
}

function writeStorage(lines: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // private browsing / quota — the cart still works for this session
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function commit(lines: CartLine[]) {
  snapshot = { lines, loaded: true };
  writeStorage(lines);
  emit();
}

function handleStorageEvent(event: StorageEvent) {
  // key is null when storage is cleared wholesale
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  snapshot = { lines: readStorage(), loaded: true };
  emit();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);

  if (listeners.size === 1) {
    window.addEventListener("storage", handleStorageEvent);
    if (!snapshot.loaded) {
      snapshot = { lines: readStorage(), loaded: true };
      emit();
    }
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", handleStorageEvent);
    }
  };
}

export function getSnapshot(): CartSnapshot {
  return snapshot;
}

export function getServerSnapshot(): CartSnapshot {
  return EMPTY_SNAPSHOT;
}

export function addLine(
  line: Omit<CartLine, "quantity" | "addOns"> & { addOns?: string[] },
  quantity = 1,
) {
  const next: CartLine = {
    ...line,
    addOns: normaliseAddOns(line.addOns ?? []),
    quantity: clampQuantity(quantity),
  };
  const key = lineKey(next);

  commit(
    snapshot.lines.some((l) => lineKey(l) === key)
      ? snapshot.lines.map((l) =>
          lineKey(l) === key ? { ...l, quantity: clampQuantity(l.quantity + quantity) } : l,
        )
      : [...snapshot.lines, next],
  );
}

export function updateLineQuantity(key: string, quantity: number) {
  commit(
    quantity < 1
      ? snapshot.lines.filter((l) => lineKey(l) !== key)
      : snapshot.lines.map((l) =>
          lineKey(l) === key ? { ...l, quantity: clampQuantity(quantity) } : l,
        ),
  );
}

export function removeLine(key: string) {
  commit(snapshot.lines.filter((l) => lineKey(l) !== key));
}

export function clearLines() {
  commit([]);
}
