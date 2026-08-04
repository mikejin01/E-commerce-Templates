"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import OrderSummary from "@/components/verdon/checkout/OrderSummary";
import { getServerSnapshot, getSnapshot, subscribe, type Order } from "@/lib/verdon/order-store";
import { formatPrice } from "@/lib/verdon/format";

/** Fixed locale, matching `formatPrice`, so dates read the same everywhere. */
const dateFormat = new Intl.DateTimeFormat("en-IE", { day: "numeric", month: "long" });

function deliveryWindow(order: Order): string {
  const from = new Date(order.deliveryWindow.from);
  const to = new Date(order.deliveryWindow.to);
  if (from.getMonth() === to.getMonth()) {
    return `${from.getDate()}–${dateFormat.format(to)}`;
  }
  return `${dateFormat.format(from)} – ${dateFormat.format(to)}`;
}

function CheckIcon() {
  return (
    <span
      aria-hidden
      className="flex size-12 items-center justify-center rounded-full bg-verdon-green text-white"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-6">
        <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
        {title}
      </h3>
      <div className="mt-2 space-y-0.5 text-[13px] leading-relaxed text-neutral-700">{children}</div>
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
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-5 text-center">
        <h1 className="font-heading text-[26px] font-medium uppercase tracking-[0.04em]">
          No recent order
        </h1>
        <p className="max-w-sm text-[13px] leading-relaxed text-neutral-500">
          This demo keeps your order for the current browser tab only. Place another one to see the
          confirmation.
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

  const firstName = order.shippingAddress[0]?.split(" ")[0] ?? "there";

  return (
    <div className="mx-auto max-w-[860px]">
      <div className="flex flex-col items-center text-center">
        <CheckIcon />
        <p className="mt-5 font-heading text-[11px] uppercase tracking-[0.16em] text-neutral-500">
          Order {order.number}
        </p>
        <h1 className="mt-2 font-heading text-[28px] font-medium uppercase tracking-[0.04em] md:text-[34px]">
          Thank you, {firstName}
        </h1>
        <p className="mt-3 max-w-md text-[13px] leading-relaxed text-neutral-500">
          Your order is confirmed. We have sent a receipt to{" "}
          <span className="text-neutral-700">{order.email}</span> — or we would have, if this were
          not a demo.
        </p>
      </div>

      <div className="mt-10 border border-neutral-200 p-6 lg:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-neutral-200 pb-5">
          <h2 className="font-heading text-[15px] font-medium uppercase tracking-[0.1em]">
            Estimated delivery
          </h2>
          <p className="text-[15px] font-medium">{deliveryWindow(order)}</p>
        </div>

        <div className="mt-6 grid gap-7 sm:grid-cols-2">
          <DetailBlock title="Contact">
            <p>{order.email}</p>
          </DetailBlock>

          <DetailBlock title="Shipping method">
            <p>{order.shippingMethod.label}</p>
            <p className="text-neutral-500">{order.shippingMethod.detail}</p>
            <p className="text-neutral-500">
              {order.shippingMethod.price === 0 ? "Free" : formatPrice(order.shippingMethod.price)}
            </p>
          </DetailBlock>

          <DetailBlock title="Shipping address">
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
            <p className="text-neutral-500">Demo order — no payment was taken.</p>
          </DetailBlock>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-heading text-[15px] font-medium uppercase tracking-[0.1em]">
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
              quantity: line.quantity,
              lineTotal: line.lineTotal,
            }))}
            totals={{
              subtotal: order.subtotal,
              shipping: order.shipping,
              total: order.total,
              vat: order.vat,
            }}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <Link
          href="/verdon/collections/all"
          className="border border-verdon-green px-9 py-3.5 font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-verdon-green transition-colors hover:bg-verdon-green hover:text-white"
        >
          Continue shopping
        </Link>
        <p className="text-center text-[11px] text-neutral-500">
          Questions about this order? <span className="underline underline-offset-4">Contact us</span>{" "}
          and quote {order.number}.
        </p>
      </div>
    </div>
  );
}
