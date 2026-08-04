"use client";

import Image from "next/image";
import type { AddOn } from "@/data/elburg/products";
import { formatPrice } from "@/lib/elburg/format";

/**
 * The reference's add-on package band, folded into the buy box: each add-on is
 * a checkbox that changes the CTA total and rides along on the cart line, so
 * two otherwise identical wallets do not merge into one line.
 */
export default function AddOnPicker({
  addOns,
  selected,
  onToggle,
}: {
  addOns: AddOn[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <fieldset className="mt-7 min-w-0">
      <legend className="font-heading text-[13px] font-semibold uppercase tracking-[0.1em]">
        Add-on options
      </legend>
      <p className="mt-1 text-[13px] italic opacity-70">Get more out of your wallet.</p>

      <ul className="mt-3 space-y-2">
        {addOns.map((addOn) => {
          const checked = selected.includes(addOn.id);
          return (
            <li key={addOn.id}>
              <label
                className={`flex min-w-0 cursor-pointer items-center gap-3 border p-2.5 transition-colors ${
                  checked ? "border-elburg-ink" : "border-elburg-ink/20 hover:border-elburg-ink/45"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(addOn.id)}
                  className="size-4 shrink-0 accent-[#2e2e2b]"
                />
                <span
                  className="relative size-11 shrink-0 overflow-hidden"
                  style={{ backgroundColor: addOn.tint }}
                >
                  <Image
                    src={addOn.image}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-contain"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-[14px] font-medium uppercase leading-tight tracking-[0.03em]">
                    {addOn.name}
                  </span>
                  <span className="block text-[12px] italic leading-snug opacity-70">
                    {addOn.blurb}
                  </span>
                </span>
                <span className="shrink-0 font-heading text-[14px] tabular-nums">
                  +{formatPrice(addOn.price)}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
