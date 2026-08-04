"use client";

import { useEffect, useState } from "react";
import ProductThumb from "@/components/elburg/product/ProductThumb";
import { titleFor, unitPrice, type ColorVariant, type Product } from "@/data/elburg/products";
import { formatPrice } from "@/lib/elburg/format";

/**
 * The reference's sticky buy bar: it appears once the main ADD TO BAG has
 * scrolled away, and it is a *second* add-to-cart control — so standing rule 6
 * applies to it as well, and its button has to sit inside the viewport at every
 * QA width. Hence the `minmax(0,…)` text track and the shrink-0 button.
 */
export default function StickyBuyBar({
  product,
  color,
  addOns,
  onAdd,
}: {
  product: Product;
  color: ColorVariant;
  addOns: string[];
  onAdd: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 620);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      /* z-30 sits under the site header (z-40) and the cart drawer (z-50) */
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-elburg-ink/15 bg-elburg-paper transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      inert={!visible}
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-2.5 sm:gap-5 sm:px-6 lg:px-12">
        <ProductThumb
          src={color.images[0].src}
          alt=""
          tint={color.tint}
          sizes="48px"
          className="size-11 shrink-0 sm:size-12"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-[13px] font-semibold uppercase leading-tight tracking-[0.04em] sm:text-[14px]">
            {titleFor(product, color)}
          </p>
          <p className="font-heading text-[13px] tabular-nums opacity-70">
            {formatPrice(unitPrice(product, addOns))}
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="shrink-0 bg-elburg-ink px-5 py-3 font-heading text-[12px] font-semibold uppercase tracking-[0.1em] text-elburg-paper transition-colors hover:bg-elburg-accent sm:px-8 sm:text-[13px]"
        >
          Add to bag
        </button>
      </div>
    </div>
  );
}
