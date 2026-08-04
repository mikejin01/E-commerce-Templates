"use client";

import { useState } from "react";
import ProductThumb from "@/components/elburg/product/ProductThumb";
import { formatPrice } from "@/lib/elburg/format";

export type SummaryLine = {
  key: string;
  /** the title as the PDP sets it — "Claspwallet Pebble" */
  name: string;
  /** the colourway, e.g. "Cappuccino" */
  variantLabel: string;
  addOns?: string[];
  image: string;
  /** the render's own ground; the thumbnail's box has to match or it seams */
  tint: string;
  quantity: number;
  lineTotal: number;
};

export type SummaryTotals = {
  subtotal: number;
  shipping: number;
  /** US storefront: added on top of the subtotal, not contained in it */
  tax: number;
  total: number;
};

function Lines({ lines }: { lines: SummaryLine[] }) {
  return (
    <ul className="space-y-4">
      {lines.map((line) => (
        <li key={line.key} className="flex items-center gap-4">
          <div className="relative shrink-0">
            <ProductThumb
              src={line.image}
              alt={line.name}
              tint={line.tint}
              sizes="64px"
              className="aspect-square w-16"
            />
            <span className="absolute -right-2 -top-2 flex min-w-5 items-center justify-center rounded-full bg-elburg-ink px-1.5 font-heading text-[11px] font-semibold leading-5 text-elburg-paper tabular-nums">
              {line.quantity}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-heading text-[14px] font-medium uppercase leading-tight tracking-[0.03em]">
              {line.name}
            </p>
            <p className="mt-0.5 text-[13px] italic text-elburg-ink/65">{line.variantLabel}</p>
            {line.addOns?.map((addOn) => (
              <p key={addOn} className="text-[12px] text-elburg-ink/60">
                + {addOn}
              </p>
            ))}
          </div>

          <p className="shrink-0 font-heading text-[14px] tabular-nums">
            {formatPrice(line.lineTotal)}
          </p>
        </li>
      ))}
    </ul>
  );
}

function Totals({ totals }: { totals: SummaryTotals }) {
  return (
    <dl className="space-y-3 text-[14px]">
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-elburg-ink/70">Subtotal</dt>
        <dd className="font-heading tabular-nums">{formatPrice(totals.subtotal)}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-elburg-ink/70">Delivery</dt>
        <dd className="font-heading tabular-nums">
          {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
        </dd>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-elburg-ink/70">
          Estimated sales tax
          <span className="ml-1.5 text-[12px] italic text-elburg-ink/50">demo rate</span>
        </dt>
        <dd className="font-heading tabular-nums">{formatPrice(totals.tax)}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-4 border-t border-elburg-ink/15 pt-4">
        <dt className="font-heading text-[13px] font-semibold uppercase tracking-[0.1em]">Total</dt>
        <dd className="font-heading text-[20px] tabular-nums">{formatPrice(totals.total)}</dd>
      </div>
    </dl>
  );
}

export default function OrderSummary({
  lines,
  totals,
  collapsible = false,
}: {
  lines: SummaryLine[];
  totals: SummaryTotals;
  /** on checkout the summary collapses behind a bar on small screens */
  collapsible?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const body = (
    <div className="space-y-6 border-t border-elburg-ink/12 p-6 lg:border-t-0 lg:p-8">
      <Lines lines={lines} />
      <div className="border-t border-elburg-ink/15 pt-6">
        <Totals totals={totals} />
      </div>
    </div>
  );

  // standalone (the confirmation) the panel carries its own ground; collapsible
  // (the checkout) it sits in a column that already carries it, and two 40%
  // bone layers stack into a box visibly darker than the rest of the column
  if (!collapsible) {
    return <div className="bg-elburg-bone/40">{body}</div>;
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-elburg-bone/70 lg:hidden"
      >
        <span className="flex items-center gap-2 font-heading text-[13px] uppercase tracking-[0.1em]">
          {open ? "Hide" : "Show"} order summary
          <svg
            viewBox="0 0 12 8"
            aria-hidden
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`size-3 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="m1.5 2 4.5 4 4.5-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="font-heading text-[17px] tabular-nums">{formatPrice(totals.total)}</span>
      </button>

      <div className={open ? "block" : "hidden lg:block"}>{body}</div>
    </div>
  );
}
