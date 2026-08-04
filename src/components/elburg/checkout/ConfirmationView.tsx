"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import InertLink from "@/components/shared/InertLink";
import OrderSummary from "@/components/elburg/checkout/OrderSummary";
import { formatPrice } from "@/lib/elburg/format";
import { getServerSnapshot, getSnapshot, subscribe, type Order } from "@/lib/elburg/order-store";

/** Fixed locale, matching `formatPrice`, so dates read the same everywhere. */
const dateFormat = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" });

function deliveryWindow(order: Order): string {
  const from = new Date(order.deliveryWindow.from);
  const to = new Date(order.deliveryWindow.to);
  if (from.getMonth() === to.getMonth()) {
    return `${dateFormat.format(from)}–${to.getDate()}`;
  }
  return `${dateFormat.format(from)} – ${dateFormat.format(to)}`;
}

function CheckIcon() {
  return (
    <span
      aria-hidden
      className="flex size-12 items-center justify-center rounded-full bg-elburg-ink text-elburg-paper"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        className="size-6"
      >
        <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <h3 className="font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-elburg-ink/55">
        {title}
      </h3>
      <div className="mt-2 space-y-0.5 text-[14px] leading-relaxed">{children}</div>
    </div>
  );
}

export default function ConfirmationView() {
  const { order, loaded } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // the order lives in sessionStorage, so hold the layout until it is read
  if (!loaded) {
    return <div className="min-h-[50vh]" aria-busy="true" />;
  }

  if (!order) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-5 px-6 text-center">
        <h1 className="font-heading text-[32px] uppercase leading-none tracking-[0.01em]">
          No recent order
        </h1>
        <p className="max-w-md text-[15px] italic leading-relaxed opacity-70">
          This demo keeps your order for the current browser tab only. Place another one to see the
          confirmation.
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

  const firstName = order.shippingAddress[0]?.split(" ")[0] ?? "there";

  return (
    <div className="mx-auto max-w-[880px]">
      <div className="flex flex-col items-center text-center">
        <CheckIcon />
        <p className="mt-5 font-heading text-[12px] uppercase tracking-[0.16em] opacity-60">
          Order {order.number}
        </p>
        <h1 className="mt-2 font-heading text-[36px] uppercase leading-none tracking-[0.01em] md:text-[46px]">
          Thank you, {firstName}
        </h1>
        <p className="mt-4 max-w-lg text-[15px] italic leading-relaxed opacity-75">
          Your order is confirmed. We have sent a receipt to{" "}
          <span className="not-italic">{order.email}</span> — or we would have, if this were not a
          demo.
        </p>
      </div>

      <div className="mt-10 border border-elburg-ink/15 p-6 lg:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-elburg-ink/12 pb-5">
          <h2 className="font-heading text-[15px] font-semibold uppercase tracking-[0.1em]">
            Estimated delivery
          </h2>
          <p className="font-heading text-[17px]">{deliveryWindow(order)}</p>
        </div>

        {/* minmax(0,…) on the tracks — standing rule 5 */}
        <div className="mt-6 grid gap-7 sm:grid-cols-[repeat(2,minmax(0,1fr))]">
          <DetailBlock title="Contact">
            <p className="break-words">{order.email}</p>
          </DetailBlock>

          <DetailBlock title="Delivery method">
            <p>{order.shippingMethod.label}</p>
            <p className="italic text-elburg-ink/65">{order.shippingMethod.detail}</p>
            <p className="italic text-elburg-ink/65">
              {order.shippingMethod.price === 0 ? "Free" : formatPrice(order.shippingMethod.price)}
            </p>
          </DetailBlock>

          <DetailBlock title="Delivery address">
            {order.shippingAddress.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </DetailBlock>

          <DetailBlock title="Billing address">
            {order.billingAddress.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </DetailBlock>

          <DetailBlock title="Payment">
            <p>Card ending {order.cardLast4 || "••••"}</p>
            <p className="italic text-elburg-ink/65">Demo order — no payment was taken.</p>
          </DetailBlock>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-heading text-[15px] font-semibold uppercase tracking-[0.1em]">
          Order summary
        </h2>
        <div className="mt-4">
          <OrderSummary
            lines={order.lines.map((line, index) => ({
              key: `${line.slug}-${index}`,
              name: line.name,
              variantLabel: line.variantLabel,
              addOns: line.addOns,
              image: line.image,
              tint: line.tint,
              quantity: line.quantity,
              lineTotal: line.lineTotal,
            }))}
            totals={{
              subtotal: order.subtotal,
              shipping: order.shipping,
              tax: order.tax,
              total: order.total,
            }}
          />
        </div>
      </div>

      {/* the extended warranty is one of the footer's four promises, and
          registration is where the reference sends you next — inert here, as
          the naming map has no domain to point at */}
      <div className="mt-10 flex flex-col items-center gap-3 border border-dashed border-elburg-ink/20 px-6 py-7 text-center">
        <h2 className="font-heading text-[15px] font-semibold uppercase tracking-[0.1em]">
          Extended warranty
        </h2>
        <p className="max-w-md text-[14px] italic leading-relaxed opacity-70">
          Register your wallet once it arrives for an extended warranty and a certificate of
          authenticity.
        </p>
        <InertLink className="-my-2 py-2 font-heading text-[12px] uppercase tracking-[0.1em] underline underline-offset-4 hover:text-elburg-accent">
          Register your wallet
        </InertLink>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <Link
          href="/elburg/collections/all"
          className="bg-elburg-ink px-9 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-elburg-paper transition-colors hover:bg-elburg-accent"
        >
          Continue shopping
        </Link>
        <p className="text-center text-[13px] italic opacity-60">
          Questions about this order? Quote {order.number} when you get in touch.
        </p>
      </div>
    </div>
  );
}
