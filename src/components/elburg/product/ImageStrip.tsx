"use client";

import { useCallback, useRef, useState } from "react";
import ProductThumb from "@/components/elburg/product/ProductThumb";
import type { ColorVariant } from "@/data/elburg/products";

/**
 * The PDP's opening band: a horizontal strip of panels — front, open, side —
 * with prev/next controls under it. The reference does not use a thumbnail
 * gallery here, and the panels are not one shape: a front render is portrait,
 * an open render is wide, a side render is a sliver. Each panel is therefore
 * sized by its own image's aspect ratio, capped so a wide one cannot push the
 * band past the viewport.
 *
 * A colourway swap resets the strip to its front view. That is done by keying
 * this component on the colourway at the call site rather than by an effect —
 * setState inside an effect is a cascading render, and React's own answer to
 * "reset state when a prop changes" is the key.
 *
 * `relative` on the rail root is not decoration — the `sr-only` label inside it
 * is `position: absolute`, and without a positioned ancestor it resolves against
 * the viewport, escapes the overflow clip and hands the page hundreds of px of
 * horizontal scroll (the VERDON carousel bug, in `PLAN.md`).
 */
export default function ImageStrip({ color }: { color: ColorVariant }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = color.images.length;

  const goTo = useCallback((next: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const target = rail.children[next] as HTMLElement | undefined;
    if (!target) return;
    setIndex(next);
    rail.scrollTo({ left: target.offsetLeft - rail.offsetLeft, behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-w-0">
      <ul
        ref={railRef}
        /* scroll-pl matches the rail's own gutter, or snap-mandatory parks the
           first panel past it (the snap trap in PLAN.md) */
        className="no-scrollbar flex h-[58vh] min-h-[360px] snap-x snap-mandatory gap-2 overflow-x-auto scroll-pl-0 lg:h-[76vh] lg:max-h-[820px]"
        onScroll={(event) => {
          const rail = event.currentTarget;
          const children = Array.from(rail.children) as HTMLElement[];
          const nearest = children.reduce(
            (best, child, i) =>
              Math.abs(child.offsetLeft - rail.offsetLeft - rail.scrollLeft) <
              Math.abs(children[best].offsetLeft - rail.offsetLeft - rail.scrollLeft)
                ? i
                : best,
            0,
          );
          setIndex(nearest);
        }}
      >
        {color.images.map((image, i) => {
          const ratio = Math.min(1.55, Math.max(0.62, image.ratio));
          return (
          <li
            key={image.src}
            className="h-full min-w-0 shrink-0 snap-start"
            /* Panels share a height and take their width from their own
               picture, which is what makes the strip read as one band: a front
               render is portrait, an open one is wide and a side one is a
               sliver. Sizing each panel by aspect ratio at a fixed height does
               that; giving them all one box and a fixed width did not — the
               narrow panels came out short and the strip looked broken. */
            style={{ aspectRatio: ratio }}
          >
            <ProductThumb
              src={image.src}
              alt={image.alt}
              tint={color.tint}
              /* These panels take their width from the rail's *height*, so a
                 `vw` hint describes the wrong axis: the open view is 1017px
                 wide in a 1440 window and a 46vw hint fetched 662px of it. The
                 hint mirrors the rail's own height classes, times this panel's
                 clamped ratio. */
              sizes={`(min-width: 1024px) calc(min(76vh, 820px) * ${ratio}), calc(max(58vh, 360px) * ${ratio})`}
              priority={i === 0}
              className="size-full"
            />
          </li>
          );
        })}
      </ul>

      <span className="sr-only" aria-live="polite">
        Image {index + 1} of {count}
      </span>

      {count > 1 && (
        /* 44px controls on a phone — these are the only way to reach the open
           and side views without a swipe; the design's 32px returns at `lg` */
        <div className="mt-3 flex items-center gap-2 px-6 lg:px-1">
          <button
            type="button"
            onClick={() => goTo(Math.max(0, index - 1))}
            disabled={index === 0}
            aria-label="Previous image"
            className="flex size-11 items-center justify-center border border-elburg-ink/25 transition-colors hover:bg-elburg-ink/5 disabled:opacity-30 lg:size-8"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4">
              <path d="m14 5-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(Math.min(count - 1, index + 1))}
            disabled={index === count - 1}
            aria-label="Next image"
            className="flex size-11 items-center justify-center border border-elburg-ink/25 transition-colors hover:bg-elburg-ink/5 disabled:opacity-30 lg:size-8"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4">
              <path d="m10 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
