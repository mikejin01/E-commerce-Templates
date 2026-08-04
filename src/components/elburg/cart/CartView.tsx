"use client";

import Link from "next/link";
import CartLineItem from "@/components/elburg/cart/CartLineItem";
import { useCart } from "@/lib/elburg/cart-context";
import { formatPrice, formatPriceDash } from "@/lib/elburg/format";
import { shippingCost, shippingMethods } from "@/data/elburg/checkout";
import { freeShippingThreshold } from "@/data/elburg/products";

export default function CartView() {
  const { items, count, subtotal, hydrated } = useCart();

  // the same standard-delivery rule the checkout applies, read from one place
  // so the two pages cannot quote different numbers
  const delivery = shippingCost(shippingMethods[0], subtotal);

  // the cart is localStorage-backed, so the server renders nothing to avoid a
  // hydration mismatch; this placeholder holds the page height steady meanwhile
  if (!hydrated) {
    return <div className="min-h-[50vh]" aria-hidden />;
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[46vh] flex-col items-center justify-center gap-5 text-center">
        <h1 className="font-heading text-[32px] uppercase leading-none tracking-[0.01em]">
          Your bag is empty
        </h1>
        <p className="max-w-md text-[15px] italic leading-relaxed opacity-70">
          Free delivery over {formatPriceDash(freeShippingThreshold)}, and 60 days to change your
          mind about any of it.
        </p>
        <Link
          href="/elburg/collections/all"
          className="mt-2 bg-elburg-ink px-9 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-elburg-paper transition-colors hover:bg-elburg-accent"
        >
          See all wallets
        </Link>
      </div>
    );
  }

  return (
    /* minmax(0,…) on both tracks — standing rule 5 */
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-16">
      <div className="min-w-0">
        <h1 className="font-heading text-[36px] uppercase leading-none tracking-[0.01em] md:text-[46px]">
          Your bag
        </h1>
        <p className="mt-2 text-[15px] italic opacity-70">
          {count} item{count === 1 ? "" : "s"}
        </p>

        <ul className="mt-8 divide-y divide-elburg-ink/12 border-y border-elburg-ink/12">
          {items.map((item) => (
            <CartLineItem key={item.key} item={item} size="md" />
          ))}
        </ul>
      </div>

      <aside className="min-w-0 lg:sticky lg:top-[70px] lg:self-start">
        <div className="border border-elburg-ink/15 p-6">
          <h2 className="font-heading text-[13px] font-semibold uppercase tracking-[0.1em]">
            Order summary
          </h2>

          <dl className="mt-5 space-y-3 text-[14px]">
            <div className="flex items-baseline justify-between gap-4">
              <dt>Subtotal</dt>
              <dd className="font-heading tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt>Delivery</dt>
              <dd className="font-heading tabular-nums">
                {delivery === 0 ? "Free" : formatPrice(delivery)}
              </dd>
            </div>
            {/* a US storefront quotes tax against an address, which the cart
                does not have yet — so it is named here and added at checkout */}
            <div className="flex items-baseline justify-between gap-4">
              <dt>Sales tax</dt>
              <dd className="text-[13px] italic opacity-65">Calculated at checkout</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-elburg-ink/15 pt-4">
            <span className="font-heading text-[13px] font-semibold uppercase tracking-[0.1em]">
              Estimated total
            </span>
            <span className="font-heading text-[20px] tabular-nums">
              {formatPrice(subtotal + delivery)}
            </span>
          </div>

          <Link
            href="/elburg/checkout"
            className="mt-6 block w-full bg-elburg-ink px-6 py-4 text-center font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-elburg-paper transition-colors hover:bg-elburg-accent"
          >
            Checkout
          </Link>
          <p className="mt-3 text-center text-[12px] italic opacity-60">
            Delivery in 2/4 business days · 60-day returns
          </p>
        </div>
      </aside>
    </div>
  );
}
