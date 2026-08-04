"use client";

import { useRef } from "react";
import Image from "next/image";
import type { ProductImage } from "@/data/verdon/products";

/** Full-bleed 3-up lifestyle rail with arrow controls, as on the reference PDP. */
export default function InTheField({ images }: { images: ProductImage[] }) {
  const railRef = useRef<HTMLUListElement>(null);

  function scrollBy(direction: 1 | -1) {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild as HTMLElement | null;
    rail.scrollBy({ left: direction * (card?.offsetWidth ?? rail.clientWidth * 0.8), behavior: "smooth" });
  }

  return (
    <section className="bg-verdon-cream py-14 md:py-20">
      <div className="mx-auto mb-8 flex max-w-[1440px] items-end justify-between gap-6 px-6 lg:px-16">
        <h2 className="font-heading text-[24px] font-medium uppercase tracking-[0.04em] md:text-[30px]">
          In the field
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="flex size-10 items-center justify-center rounded-full border border-neutral-300 text-verdon-green transition-colors hover:border-verdon-green hover:bg-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
              <path d="m14.5 5-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="flex size-10 items-center justify-center rounded-full border border-neutral-300 text-verdon-green transition-colors hover:border-verdon-green hover:bg-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
              <path d="m9.5 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <ul
        ref={railRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 px-6 lg:scroll-pl-16 lg:px-16"
      >
        {images.map((image) => (
          // `relative` keeps absolutely-positioned children inside the rail's
          // overflow clip rather than resolving against the viewport
          <li
            key={image.src}
            className="relative w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[32%]"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 78vw"
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
