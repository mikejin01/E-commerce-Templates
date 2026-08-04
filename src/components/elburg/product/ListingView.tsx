"use client";

import { useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/elburg/product/ProductCard";
import { carryTiers, skus, type CarryTier } from "@/data/elburg/products";

const TIER_TILES: { tier: CarryTier; image: string; alt: string }[] = [
  {
    tier: "essential",
    image: "/images/elburg/categories/essential-carry.jpg",
    alt: "A ribbed aluminium card holder with cards fanning out of it",
  },
  {
    tier: "expanded",
    image: "/images/elburg/categories/expanded-carry.jpg",
    alt: "A cognac leather wallet with a press stud closure",
  },
];

const CARD_SIZES =
  "(min-width: 1280px) 21vw, (min-width: 1024px) 28vw, (min-width: 640px) 44vw, 88vw";

/**
 * The listing, built against the reference's `/wallets/all/` capture: title and
 * italic standfirst, the two carry-tier tiles, a rule, the count, then the grid.
 *
 * On the reference the tier tiles are links to their own collection pages. This
 * demo has five routes (standing rule 3), so they filter in place instead — same
 * affordance, one route. The count label is derived, never written down, so it
 * cannot drift from the catalogue.
 */
export default function ListingView() {
  const [tier, setTier] = useState<CarryTier | null>(null);
  const visible = tier ? skus.filter((sku) => sku.product.tier === tier) : skus;

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12 lg:py-14">
      <h1 className="font-heading text-[44px] uppercase leading-[0.92] tracking-[0.01em] md:text-[64px]">
        All wallets
      </h1>
      <p className="mt-2 max-w-sm text-[15px] italic leading-snug opacity-80">
        Slim, secure and RFID-safe — for minimalists and for those carrying a little extra.
      </p>

      <ul className="mt-8 flex min-w-0 gap-2">
        {TIER_TILES.map(({ tier: value, image, alt }) => {
          const active = tier === value;
          return (
            <li key={value} className="min-w-0">
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setTier(active ? null : value)}
                className={`block w-[136px] text-left transition-opacity sm:w-[152px] ${
                  tier && !active ? "opacity-45" : ""
                }`}
              >
                <div className="relative aspect-square bg-elburg-ink/5">
                  <Image src={image} alt={alt} fill sizes="152px" className="object-cover" />
                </div>
                <div
                  className={`px-3 py-2.5 ${active ? "bg-elburg-ink text-elburg-paper" : "bg-elburg-ink/8"}`}
                >
                  <p className="font-heading text-[13px] font-bold uppercase leading-tight tracking-[0.02em]">
                    {carryTiers[value].label}
                  </p>
                  <p className="mt-0.5 text-[13px] italic leading-none opacity-75">
                    {carryTiers[value].cards}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex items-center gap-3 border-t border-elburg-ink/20 pt-4">
        {tier ? (
          <button
            type="button"
            onClick={() => setTier(null)}
            className="font-heading text-[13px] uppercase tracking-[0.06em] underline underline-offset-4 hover:text-elburg-accent"
          >
            Clear filter
          </button>
        ) : (
          <span className="font-heading text-[13px] uppercase tracking-[0.06em] opacity-45">
            All carry
          </span>
        )}
        <span aria-hidden className="opacity-30">
          |
        </span>
        <p aria-live="polite" className="text-[14px] italic opacity-70">
          {visible.length} product{visible.length === 1 ? "" : "s"}
        </p>
      </div>

      {/* minmax(0,…) on every track at every breakpoint — standing rule 5 */}
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-x-4 gap-y-10 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))] xl:grid-cols-[repeat(4,minmax(0,1fr))]">
        {visible.map(({ product, color }, i) => (
          <ProductCard
            key={`${product.slug}-${color.slug}`}
            product={product}
            color={color}
            sizes={CARD_SIZES}
            priority={i < 4}
          />
        ))}
      </div>
    </div>
  );
}
