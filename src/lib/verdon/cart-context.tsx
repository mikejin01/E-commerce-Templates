"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  getAddOn,
  getColor,
  getProduct,
  unitPrice,
  type AddOn,
  type ColorVariant,
  type Product,
} from "@/data/verdon/products";
import {
  addLine,
  clearLines,
  getServerSnapshot,
  getSnapshot,
  lineKey,
  removeLine,
  subscribe,
  updateLineQuantity,
  type CartLine,
} from "@/lib/verdon/cart-store";

export { MAX_QUANTITY, lineKey, type CartLine } from "@/lib/verdon/cart-store";

export type CartItem = CartLine & {
  /** stable identity for list keys and the update/remove calls */
  key: string;
  product: Product;
  variant: ColorVariant;
  addOnItems: AddOn[];
  /** "Tortoise · Polarised" — colourway plus lens, when the product has one */
  variantLabel: string;
  /** one unit with the chosen lens and add-ons */
  unitTotal: number;
  lineTotal: number;
  image: string;
};

/** What the PDP hands to `addItem`. */
export type AddItemInput = {
  slug: string;
  color: string;
  lens?: string;
  addOns?: string[];
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  /** false until localStorage has been read; guards against a hydration mismatch */
  hydrated: boolean;
  drawerOpen: boolean;
  addItem: (input: AddItemInput, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { lines, loaded } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const addItem = useCallback((input: AddItemInput, quantity = 1) => {
    addLine({ ...input, addOns: input.addOns ?? [] }, quantity);
    setDrawerOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const items = lines.flatMap((line): CartItem[] => {
      const product = getProduct(line.slug);
      if (!product) return [];

      const variant = getColor(product, line.color);
      const addOnItems = line.addOns.flatMap((id) => {
        const addOn = getAddOn(id);
        return addOn ? [addOn] : [];
      });
      const unitTotal =
        unitPrice(product, line.lens) + addOnItems.reduce((t, a) => t + a.price, 0);

      return [
        {
          ...line,
          key: lineKey(line),
          product,
          variant,
          addOnItems,
          variantLabel: [line.color, line.lens].filter(Boolean).join(" · "),
          unitTotal,
          lineTotal: unitTotal * line.quantity,
          image: variant.images[0].src,
        },
      ];
    });

    return {
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + item.lineTotal, 0),
      hydrated: loaded,
      drawerOpen,
      addItem,
      updateQuantity: updateLineQuantity,
      removeItem: removeLine,
      clearCart: clearLines,
      openDrawer,
      closeDrawer,
    };
  }, [lines, loaded, drawerOpen, addItem, openDrawer, closeDrawer]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside a CartProvider");
  return context;
}
