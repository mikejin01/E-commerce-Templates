"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/verdon/product/ProductCard";
import { bestsellers } from "@/data/verdon/products";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 ${direction === "left" ? "rotate-180" : ""}`}
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export default function Bestsellers() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    syncArrows();
    window.addEventListener("resize", syncArrows);
    return () => window.removeEventListener("resize", syncArrows);
  }, [syncArrows]);

  function scrollByPage(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <section className="bg-verdon-cream py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-heading text-[26px] font-medium uppercase tracking-[0.04em] md:text-[32px]">
              Bestsellers
            </h2>
            <p className="mt-1 text-[12px] text-neutral-500">
              The frames our community reaches for most.
            </p>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              aria-label="Previous products"
              onClick={() => scrollByPage(-1)}
              disabled={atStart}
              className="flex size-9 items-center justify-center border border-neutral-300 text-verdon-green transition-colors hover:border-verdon-green hover:bg-verdon-green hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next products"
              onClick={() => scrollByPage(1)}
              disabled={atEnd}
              className="flex size-9 items-center justify-center border border-neutral-300 text-verdon-green transition-colors hover:border-verdon-green hover:bg-verdon-green hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <Chevron direction="right" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={syncArrows}
        /* scroll-pl matches the gutter so snapping doesn't scroll the padding away */
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 scroll-smooth px-6 pb-2 lg:gap-6 lg:scroll-pl-16 lg:px-16"
      >
        {bestsellers.map((product) => (
          <div
            key={product.slug}
            className="w-[72%] flex-none snap-start sm:w-[45%] md:w-[38%] lg:w-[calc((100%-72px)/4)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-[1440px] px-6 text-center lg:px-16">
        <Link
          href="/verdon/collections/all"
          className="inline-block border border-verdon-green px-9 py-3.5 font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-verdon-green transition-colors hover:bg-verdon-green hover:text-white"
        >
          Shop All
        </Link>
      </div>
    </section>
  );
}
