"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/data/verdon/products";

/**
 * Left thumbnail rail + large main frame, matching the reference PDP. Every
 * reference image is square, so the frame is `aspect-square` and there is no
 * per-image fit hint to reconcile.
 */
export default function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const [index, setIndex] = useState(0);
  // reset when the colourway changes under us and the new set is shorter
  const safeIndex = Math.min(index, images.length - 1);
  const active = images[safeIndex];

  const railRef = useRef<HTMLUListElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    // don't hijack the page position on first paint
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    railRef.current?.children[safeIndex]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  }, [safeIndex]);

  function step(delta: number) {
    setIndex((current) => (current + delta + images.length) % images.length);
  }

  return (
    // lg:items-start — without it the row stretches to the taller buy column and
    // that stretch beats the frame's aspect ratio
    <div className="flex min-w-0 flex-col-reverse gap-3 lg:flex-row lg:items-start lg:gap-4">
      {/* min-w-0: without it the rail's min-content (5 thumbs + gaps) becomes the
          gallery's, and the PDP grid track sizes to that instead of the viewport */}
      <ul
        ref={railRef}
        className="no-scrollbar flex min-w-0 gap-3 overflow-x-auto lg:w-19 lg:flex-col lg:overflow-visible xl:w-22"
      >
        {images.map((image, i) => (
          <li key={image.src} className="w-17 shrink-0 lg:w-auto">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === safeIndex}
              className={`relative block aspect-square w-full overflow-hidden bg-verdon-cream transition-colors ${
                i === safeIndex
                  ? "ring-1 ring-verdon-green"
                  : "ring-1 ring-transparent hover:ring-neutral-300"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="88px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* min-w-0: a flex item defaults to min-width:auto, which would let the
          gallery's intrinsic size push the buy column out of the viewport */}
      <div className="relative aspect-square w-full min-w-0 overflow-hidden bg-verdon-cream lg:flex-1">
        <Image
          key={active.src}
          src={active.src}
          alt={active.alt || productName}
          fill
          priority
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover"
        />

        <button
          type="button"
          className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-verdon-green shadow-sm backdrop-blur transition-colors hover:bg-white md:text-[11px]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4">
            <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
            <circle cx="12" cy="12" r="2.6" />
          </svg>
          Virtual Try-On
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3 md:p-4">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="pointer-events-auto flex size-9 items-center justify-center rounded-full bg-white/90 text-verdon-green shadow-sm transition-colors hover:bg-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
              <path d="m14.5 5-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="pointer-events-none rounded-full bg-white/90 px-3 py-1 text-[11px] tabular-nums text-neutral-600">
            {safeIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className="pointer-events-auto flex size-9 items-center justify-center rounded-full bg-white/90 text-verdon-green shadow-sm transition-colors hover:bg-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
              <path d="m9.5 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
