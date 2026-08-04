"use client";

import Link from "next/link";
import CartLineItem from "@/components/verdon/cart/CartLineItem";
import { useCart } from "@/lib/verdon/cart-context";
import { formatPrice } from "@/lib/verdon/format";

export default function CartView() {
  const { items, count, subtotal, hydrated } = useCart();

  // the cart only exists in localStorage, so hold the layout until it is read
  if (!hydrated) {
    return <div className="min-h-[40vh]" aria-busy="true" />;
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-5 text-center">
        <h1 className="font-heading text-[26px] font-medium uppercase tracking-[0.04em]">
          Your cart is empty
        </h1>
        <p className="max-w-sm text-[13px] leading-relaxed text-neutral-500">
          Nothing here yet. Every order ships free, with 60 days to send it back if the fit is not
          right.
        </p>
        <Link
          href="/verdon/collections/all"
          className="mt-2 border border-verdon-green px-9 py-3.5 font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-verdon-green transition-colors hover:bg-verdon-green hover:text-white"
        >
          Shop All
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-heading text-[28px] font-medium uppercase tracking-[0.04em] md:text-[34px]">
        Cart <span className="text-neutral-400">({count})</span>
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
        <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map((item) => (
            <CartLineItem key={`${item.slug}-${item.color}`} item={item} size="md" />
          ))}
        </ul>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="bg-verdon-cream p-6 lg:p-8">
            <h2 className="font-heading text-[12px] font-semibold uppercase tracking-[0.16em]">
              Order summary
            </h2>

            <dl className="mt-5 space-y-3 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-neutral-500">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Standard shipping</dt>
                <dd>Free</dd>
              </div>
              <div className="flex justify-between border-t border-neutral-300 pt-3 text-[15px] font-medium">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
            </dl>

            <p className="mt-2 text-[11px] text-neutral-500">
              VAT included. Choose your delivery speed at checkout.
            </p>

            <Link
              href="/verdon/checkout"
              className="mt-6 block bg-verdon-green px-6 py-4 text-center font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-verdon-green-dark"
            >
              Checkout
            </Link>
            <Link
              href="/verdon/collections/all"
              className="mt-3 block text-center text-[12px] uppercase tracking-[0.1em] underline underline-offset-4 hover:opacity-70"
            >
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
