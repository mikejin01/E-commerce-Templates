"use client";

import { useEffect } from "react";
import Link from "next/link";
import CartLineItem from "@/components/verdon/cart/CartLineItem";
import { useCart } from "@/lib/verdon/cart-context";
import { formatPrice } from "@/lib/verdon/format";

export default function CartDrawer() {
  const { items, count, subtotal, drawerOpen, closeDrawer } = useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeDrawer();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        /* inert keeps the off-screen panel out of the tab order and the a11y tree */
        inert={!drawerOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-6">
          <h2 className="font-heading text-[12px] font-semibold uppercase tracking-[0.16em]">
            Cart {count > 0 && <span className="text-neutral-400">({count})</span>}
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="-m-2.5 p-2.5 hover:opacity-60"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="font-heading text-[16px] uppercase tracking-[0.08em]">Your cart is empty</p>
            <p className="text-[13px] leading-relaxed text-neutral-500">
              Free shipping and 60-day returns on every order.
            </p>
            <Link
              href="/verdon/collections/all"
              onClick={closeDrawer}
              className="mt-2 border border-verdon-green px-8 py-3 font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-verdon-green transition-colors hover:bg-verdon-green hover:text-white"
            >
              Shop All
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-neutral-200 overflow-y-auto px-6">
              {items.map((item) => (
                <CartLineItem
                  key={`${item.slug}-${item.color}`}
                  item={item}
                  onNavigate={closeDrawer}
                />
              ))}
            </ul>

            <div className="shrink-0 border-t border-neutral-200 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em]">
                  Subtotal
                </span>
                <span className="text-[15px] font-medium tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1.5 text-[11px] text-neutral-500">
                VAT included. Free standard shipping, or upgrade at checkout.
              </p>

              <Link
                href="/verdon/checkout"
                onClick={closeDrawer}
                className="mt-4 block bg-verdon-green px-6 py-4 text-center font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-verdon-green-dark"
              >
                Checkout
              </Link>
              <Link
                href="/verdon/cart"
                onClick={closeDrawer}
                className="mt-3 block text-center text-[12px] uppercase tracking-[0.1em] underline underline-offset-4 hover:opacity-70"
              >
                View cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
