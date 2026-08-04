"use client";

import Link from "next/link";
import AddOnPicker from "@/components/elburg/product/AddOnPicker";
import {
  addOnsFor,
  carryTiers,
  freeShippingThreshold,
  titleFor,
  unitPrice,
  type ColorVariant,
  type Product,
} from "@/data/elburg/products";
import { formatPrice, formatPriceDash } from "@/lib/elburg/format";

function Tick() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="mt-[3px] size-4 shrink-0">
      <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The sticky sidebar: breadcrumb, title, price, standfirst, the five ticked
 * properties, the colourway swatches, the add-ons and ADD TO BAG.
 *
 * On mobile the reference moves the properties *below* the CTA — the bullets
 * are reference material, the button is the point — so the order changes with
 * the breakpoint rather than the content.
 */
export default function BuyBox({
  product,
  color,
  onColorChange,
  selectedAddOns,
  onToggleAddOn,
  onAdd,
}: {
  product: Product;
  color: ColorVariant;
  onColorChange: (slug: string) => void;
  selectedAddOns: string[];
  onToggleAddOn: (id: string) => void;
  onAdd: () => void;
}) {
  const addOns = addOnsFor(product.slug);
  const total = unitPrice(product, selectedAddOns);

  const properties = (
    <ul className="space-y-1.5">
      {product.properties.map((property) => (
        <li key={property} className="flex gap-2.5 text-[15px] leading-snug">
          <Tick />
          <span>{property}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-w-0">
      <nav aria-label="Breadcrumb" className="text-[14px] italic opacity-75">
        <Link href="/elburg/collections/all" className="-my-1.5 py-1.5 hover:text-elburg-accent">
          Wallets
        </Link>
        <span aria-hidden className="px-1.5">
          ·
        </span>
        <span>{carryTiers[product.tier].label}</span>
        <span aria-hidden className="px-1.5">
          ·
        </span>
        <span>{product.name}</span>
      </nav>

      <h1 className="mt-2 font-heading text-[38px] font-bold uppercase leading-[0.92] tracking-[0.005em] md:text-[46px]">
        {titleFor(product, color)}
      </h1>

      <p className="mt-3 font-heading text-[19px] tabular-nums">{formatPrice(product.price)}</p>

      <p className="mt-4 text-[16px] italic leading-snug">{product.description}</p>

      <div className="mt-6 hidden lg:block">{properties}</div>

      <div className="mt-6">
        <p className="text-[14px] italic opacity-80">{color.name}</p>
        {/* The swatch is the PDP's most-tapped control, and at 24px it only
            just clears WCAG 2.5.8's floor. The button is a 34px box with the
            24px swatch drawn inside; `-m-1.25` (5px) against `gap-2.5` leaves
            the swatches exactly where they were and the hit areas adjacent
            rather than overlapping (the tap-target trap in `PLAN.md`). */}
        <ul className="mt-2 flex flex-wrap items-center gap-2.5">
          {product.colors.map((option) => (
            <li key={option.slug}>
              <button
                type="button"
                onClick={() => onColorChange(option.slug)}
                aria-pressed={option.slug === color.slug}
                aria-label={option.name}
                title={option.name}
                className="group -m-1.25 flex size-8.5 items-center justify-center"
              >
                <span
                  aria-hidden
                  style={{ backgroundColor: option.hex }}
                  className={`block size-6 rounded-full transition-shadow ${
                    option.slug === color.slug
                      ? "ring-1 ring-elburg-ink/60 ring-offset-2 ring-offset-elburg-paper"
                      : "group-hover:ring-1 group-hover:ring-elburg-ink/30 group-hover:ring-offset-2 group-hover:ring-offset-elburg-paper"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {addOns.length > 0 && (
        <AddOnPicker addOns={addOns} selected={selectedAddOns} onToggle={onToggleAddOn} />
      )}

      <button
        type="button"
        onClick={onAdd}
        className="mt-6 block w-full bg-elburg-ink px-6 py-4 font-heading text-[15px] font-semibold uppercase tracking-[0.12em] text-elburg-paper transition-colors hover:bg-elburg-accent"
      >
        Add to bag — {formatPrice(total)}
      </button>

      <p className="mt-2.5 text-center text-[13px] italic opacity-70">
        Free shipping over {formatPriceDash(freeShippingThreshold)} · Delivery time: 2/4 business
        days
      </p>

      <div className="mt-7 lg:hidden">{properties}</div>
    </div>
  );
}
