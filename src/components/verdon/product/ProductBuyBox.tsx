"use client";

import Image from "next/image";
import { useState } from "react";
import Accordion from "@/components/verdon/product/Accordion";
import QuantityStepper from "@/components/verdon/cart/QuantityStepper";
import StarRating from "@/components/verdon/product/StarRating";
import {
  addOns as allAddOns,
  productBenefits,
  promoMessage,
  unitPrice,
  type ColorVariant,
  type Product,
} from "@/data/verdon/products";
import { MAX_QUANTITY, useCart } from "@/lib/verdon/cart-context";
import { formatPrice } from "@/lib/verdon/format";

function Swatch({ variant, selected }: { variant: ColorVariant; selected: boolean }) {
  return (
    <span
      className={`block size-full rounded-full ring-1 ${
        selected ? "ring-black/20" : "ring-black/10"
      }`}
      style={{ background: `linear-gradient(135deg, ${variant.hex} 50%, ${variant.hex2} 50%)` }}
    />
  );
}

export default function ProductBuyBox({
  product,
  variant,
  onSelectColor,
}: {
  product: Product;
  variant: ColorVariant;
  onSelectColor: (name: string) => void;
}) {
  const { addItem } = useCart();
  const [lens, setLens] = useState(product.lensOptions?.[0].name);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const base = unitPrice(product, lens);
  const addOnTotal = selectedAddOns.reduce(
    (total, id) => total + (allAddOns.find((a) => a.id === id)?.price ?? 0),
    0,
  );

  function toggleAddOn(id: string) {
    setSelectedAddOns((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
  }

  function handleAdd() {
    addItem({ slug: product.slug, color: variant.name, lens, addOns: selectedAddOns }, quantity);
    setQuantity(1);
    setSelectedAddOns([]);
  }

  return (
    <div>
      <p className="font-heading text-[11px] uppercase tracking-[0.16em] text-neutral-500">
        {product.tagline}
      </p>
      <h1 className="mt-2 font-heading text-[28px] font-medium uppercase tracking-[0.03em] md:text-[34px]">
        {product.name}
      </h1>

      <div className="mt-3">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
      </div>

      <p className="mt-4 text-[22px] font-medium tabular-nums">{formatPrice(base)}</p>

      <p className="mt-4 text-[13px] leading-relaxed text-neutral-600">{product.description}</p>

      {/* Colour */}
      <div className="mt-7">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em]">
            Colour
          </h2>
          <span className="text-[12px] text-neutral-500">{variant.name}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2.5">
          {product.colors.map((color) => {
            const selected = color.name === variant.name;
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => onSelectColor(color.name)}
                aria-label={color.name}
                aria-pressed={selected}
                title={color.name}
                className={`size-9 rounded-full p-1 transition-colors ${
                  selected
                    ? "ring-1 ring-verdon-green"
                    : "ring-1 ring-neutral-200 hover:ring-neutral-400"
                }`}
              >
                <Swatch variant={color} selected={selected} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Lens option cards */}
      {product.lensOptions && (
        <div className="mt-7">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em]">
              Lens
            </h2>
            <span className="text-[12px] text-neutral-500">{lens}</span>
          </div>

          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {product.lensOptions.map((option) => {
              const selected = option.name === lens;
              return (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => setLens(option.name)}
                  aria-pressed={selected}
                  className={`relative flex flex-col items-start gap-1 border p-3.5 text-left transition-colors ${
                    selected
                      ? "border-verdon-green bg-verdon-green/[0.04]"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  {option.badge && (
                    <span className="absolute right-2.5 top-2.5 bg-verdon-green px-1.5 py-0.5 font-heading text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
                      {option.badge}
                    </span>
                  )}
                  <span className="font-heading text-[13px] font-medium uppercase tracking-[0.08em]">
                    {option.name}
                  </span>
                  <span className="text-[11px] leading-relaxed text-neutral-500">
                    {option.blurb}
                  </span>
                  <span className="mt-1 text-[13px] font-medium tabular-nums">
                    {formatPrice(product.price + option.surcharge)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-neutral-500">
        <button type="button" className="-my-2 py-2 underline underline-offset-4 hover:text-verdon-green">
          Prescription Lenses
        </button>
        <button type="button" className="-my-2 py-2 underline underline-offset-4 hover:text-verdon-green">
          Size Guide
        </button>
      </div>

      {/* Add-ons */}
      <div className="mt-7">
        <h2 className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em]">
          Add to your order
        </h2>
        <ul className="mt-3 divide-y divide-neutral-100 border-y border-neutral-200">
          {allAddOns.map((addOn) => {
            const checked = selectedAddOns.includes(addOn.id);
            return (
              <li key={addOn.id}>
                <label className="flex cursor-pointer items-center gap-3 py-2.5">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleAddOn(addOn.id)}
                    className="size-4 shrink-0 accent-verdon-green"
                  />
                  <span className="relative size-11 shrink-0 overflow-hidden bg-verdon-cream">
                    <Image
                      src={addOn.image}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </span>
                  {/* the blurb wraps rather than truncating: `truncate` sets
                      white-space:nowrap, whose min-content is the whole string,
                      and that propagates up to size the PDP grid track */}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] font-medium">{addOn.name}</span>
                    <span className="block text-[11px] leading-snug text-neutral-500">
                      {addOn.blurb}
                    </span>
                  </span>
                  <span className="shrink-0 text-[12px] font-medium tabular-nums">
                    +{formatPrice(addOn.price)}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-5 bg-verdon-green px-4 py-2.5 text-center font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
        {promoMessage}
      </p>

      <div className="mt-4 flex items-stretch gap-3">
        <QuantityStepper
          quantity={quantity}
          onChange={(next) => setQuantity(Math.min(MAX_QUANTITY, Math.max(1, next)))}
          label={product.name}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="flex flex-1 items-center justify-center gap-2 bg-verdon-green px-6 py-3.5 font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-verdon-green-dark"
        >
          Add to Cart
          <span className="tabular-nums">· {formatPrice((base + addOnTotal) * quantity)}</span>
        </button>
      </div>

      <p className="mt-3 text-[11px] text-neutral-500">Ships within 1 working day</p>

      {/* Benefits */}
      <div className="mt-7 grid border-t border-neutral-200 sm:grid-cols-2 sm:gap-x-6">
        {productBenefits.map((benefit) => (
          <Accordion key={benefit.title} title={benefit.title}>
            <p>{benefit.body}</p>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
