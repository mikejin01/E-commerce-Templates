import Image from "next/image";
import InertLink from "@/components/shared/InertLink";
import SectionHeading from "@/components/elburg/home/SectionHeading";
import { featuredTiles } from "@/data/elburg/home";

/**
 * The "New & featured" band — the slider variant of the
 * categories band (`is_slider: true`). Three landscape tiles on a rail that
 * bleeds off the right edge at every width, so the third tile is always cut and
 * the row reads as scrollable without a control.
 *
 * The rail is a flex row with `min-w-0` on the tiles: without it a tile's own
 * min-content would widen the row and hand the page horizontal scroll
 * (standing rule 5).
 */
const TILE_RATIO = 85 / 99;

/** The tile's widths, scaled by however much `object-cover` has to blow the
 *  photograph up before it can crop it — 1 for a source taller than the box. */
function coverSizes(sourceRatio: number) {
  const factor = Math.max(1, TILE_RATIO / sourceRatio);
  const vw = (n: number) => `${Math.round(n * factor)}vw`;
  return `(min-width: 1024px) ${vw(31)}, (min-width: 768px) ${vw(38)}, ${vw(80)}`;
}

export default function NewAndFeatured() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionHeading title="New &amp; featured" className="mb-5" />
      </div>

      <ul className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-pl-6 px-6 lg:scroll-pl-12 lg:px-12">
        {featuredTiles.map((tile) => (
          <li
            key={tile.title}
            className="relative w-[80vw] min-w-0 shrink-0 snap-start sm:w-[52vw] md:w-[38vw] lg:w-[31vw]"
          >
            <div className="relative aspect-[99/85]">
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                /* `sizes` has to describe the *scaled* image, not the tile. The
                   Premium+ shot is 1200 × 677 in a 99:85 box, so `object-cover`
                   scales it to 1.5× the tile's width before cropping the sides
                   — a plain 31vw hint fetched two thirds of the pixels it
                   needed and shipped soft at every width. */
                sizes={coverSizes(tile.sourceRatio)}
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent"
              />
              <InertLink className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                <span className="text-[15px] italic leading-none">{tile.eyebrow}</span>
                <span className="mt-2.5 font-heading text-[22px] font-bold uppercase leading-none tracking-[0.01em] lg:text-[25px]">
                  {tile.title}
                </span>
              </InertLink>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
