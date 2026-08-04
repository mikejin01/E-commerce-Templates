"use client";

import { useEffect } from "react";
import Link from "next/link";
import CartLineItem from "@/components/elburg/cart/CartLineItem";
import { useCart } from "@/lib/elburg/cart-context";
import { formatPrice, formatPriceDash } from "@/lib/elburg/format";
import { freeShippingThreshold } from "@/data/elburg/products";

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
        /* z-50 puts the drawer above the site header (z-40) and the showcase
           DemoSwitcher (z-30) */
        className={`fixed inset-0 z-50 bg-elburg-ink/40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        /* inert keeps the off-screen panel out of the tab order and the a11y tree */
        inert={!drawerOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-elburg-paper text-elburg-ink transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[54px] shrink-0 items-center justify-between border-b border-elburg-ink/15 px-6">
          <h2 className="font-heading text-[13px] font-semibold uppercase tracking-[0.1em]">
            Your bag {count > 0 && <span className="opacity-50">({count})</span>}
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close bag"
            className="-m-2.5 p-2.5 hover:text-elburg-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="font-heading text-[18px] uppercase tracking-[0.05em]">Your bag is empty</p>
            <p className="text-[14px] italic leading-relaxed opacity-70">
              Free delivery over {formatPriceDash(freeShippingThreshold)} and 60 days to change your
              mind.
            </p>
            <Link
              href="/elburg/collections/all"
              onClick={closeDrawer}
              className="mt-2 bg-elburg-ink px-8 py-3.5 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-elburg-paper transition-colors hover:bg-elburg-accent"
            >
              See all wallets
            </Link>
          </div>
        ) : (
          <>
            <ul className="min-w-0 flex-1 divide-y divide-elburg-ink/12 overflow-y-auto px-6">
              {items.map((item) => (
                <CartLineItem key={item.key} item={item} onNavigate={closeDrawer} />
              ))}
            </ul>

            <div className="shrink-0 border-t border-elburg-ink/15 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="font-heading text-[13px] font-semibold uppercase tracking-[0.1em]">
                  Subtotal
                </span>
                <span className="font-heading text-[16px] tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1.5 text-[12px] italic opacity-60">
                Free shipping over {formatPriceDash(freeShippingThreshold)} · Delivery in 2/4
                business days
              </p>

              <Link
                href="/elburg/checkout"
                onClick={closeDrawer}
                className="mt-4 block w-full bg-elburg-ink px-6 py-4 text-center font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-elburg-paper transition-colors hover:bg-elburg-accent"
              >
                Checkout
              </Link>
              <Link
                href="/elburg/cart"
                onClick={closeDrawer}
                className="mt-3 block text-center font-heading text-[12px] uppercase tracking-[0.1em] underline underline-offset-4 hover:text-elburg-accent"
              >
                View bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
