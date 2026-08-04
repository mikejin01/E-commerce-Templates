"use client";

import { useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/verdon/format";

export type SummaryLine = {
  key: string;
  name: string;
  /** colourway plus lens, e.g. "Tortoise · Polarised" */
  variantLabel: string;
  addOns?: string[];
  image: string;
  quantity: number;
  lineTotal: number;
};

export type SummaryTotals = {
  subtotal: number;
  shipping: number;
  total: number;
  /** already contained in `total` — EU prices are VAT-inclusive */
  vat: number;
};

function Lines({ lines }: { lines: SummaryLine[] }) {
  return (
    <ul className="space-y-4">
      {lines.map((line) => (
        <li key={line.key} className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="relative aspect-square w-16 overflow-hidden bg-white">
              <Image
                src={line.image}
                alt={line.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <span className="absolute -right-2 -top-2 flex min-w-5 items-center justify-center rounded-full bg-verdon-green px-1.5 text-[10px] font-semibold leading-5 text-white">
              {line.quantity}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-heading text-[12px] font-medium uppercase tracking-[0.06em]">
              {line.name}
            </p>
            <p className="mt-0.5 text-[11px] text-neutral-500">{line.variantLabel}</p>
            {line.addOns?.map((addOn) => (
              <p key={addOn} className="text-[11px] text-neutral-500">
                + {addOn}
              </p>
            ))}
          </div>

          <p className="shrink-0 text-[13px] tabular-nums">{formatPrice(line.lineTotal)}</p>
        </li>
      ))}
    </ul>
  );
}

function Totals({ totals }: { totals: SummaryTotals }) {
  return (
    <dl className="space-y-3 text-[13px]">
      <div className="flex justify-between">
        <dt className="text-neutral-500">Subtotal</dt>
        <dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-neutral-500">Shipping</dt>
        <dd className="tabular-nums">
          {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
        </dd>
      </div>
      <div className="flex items-baseline justify-between border-t border-neutral-300 pt-3">
        <dt className="font-heading text-[13px] font-semibold uppercase tracking-[0.1em]">Total</dt>
        <dd className="text-[18px] font-medium tabular-nums">{formatPrice(totals.total)}</dd>
      </div>
      <div className="flex justify-between text-[11px] text-neutral-500">
        <dt>Including VAT</dt>
        <dd className="tabular-nums">{formatPrice(totals.vat)}</dd>
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
    <div className="space-y-6 border-t border-neutral-200 p-6 lg:border-t-0 lg:p-8">
      <Lines lines={lines} />
      <div className="border-t border-neutral-300 pt-6">
        <Totals totals={totals} />
      </div>
    </div>
  );

  if (!collapsible) {
    return <div className="bg-verdon-cream">{body}</div>;
  }

  return (
    <div className="bg-verdon-cream">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-verdon-sand lg:hidden"
      >
        <span className="flex items-center gap-2 text-[12px] uppercase tracking-[0.1em] text-verdon-green">
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
        <span className="text-[16px] font-medium tabular-nums">{formatPrice(totals.total)}</span>
      </button>

      <div className={open ? "block" : "hidden lg:block"}>{body}</div>
    </div>
  );
}
