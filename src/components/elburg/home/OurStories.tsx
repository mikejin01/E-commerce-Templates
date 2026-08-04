import Image from "next/image";
import InertLink from "@/components/shared/InertLink";
import SectionHeading from "@/components/elburg/home/SectionHeading";
import { stories } from "@/data/elburg/home";

/**
 * The "Our stories" band — six editorial tiles, each at its own aspect ratio
 * (the reference authors them per tile, as percentages of the tile width).
 *
 * Mixed ratios in a grid would align every row to its tallest tile and leave
 * gaps under the short ones, which is exactly what the reference does not do —
 * hence CSS multi-column, which packs each column tight and keeps the ragged
 * bottom edge the band is built around. Tiles get `break-inside-avoid` so a
 * caption never splits from its photograph.
 *
 * Multi-column balances by height but cannot break a tile, so the *order* of
 * the entries decides how even the columns come out — see the note on `stories`
 * in `src/data/elburg/home.ts`.
 */

/** A tile's width, scaled by however much `object-cover` has to blow the
 *  photograph up before it can crop it. `sizes` describes the scaled image, not
 *  the box, and the flat-lay sits in a slot half again as tall as it is. */
function coverSizes(slotRatio: number, sourceRatio: number) {
  const factor = Math.max(1, slotRatio / sourceRatio);
  const vw = (n: number) => `${Math.round(n * factor)}vw`;
  return `(min-width: 1024px) ${vw(31)}, (min-width: 640px) ${vw(46)}, ${vw(92)}`;
}

export default function OurStories() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:py-20 lg:px-12">
      <SectionHeading title="Our stories" link="All stories" className="mb-6" />

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {stories.map((story) => (
          <article key={story.title} className="mb-8 break-inside-avoid">
            <InertLink className="block w-full">
              <div className="relative w-full" style={{ aspectRatio: `100 / ${story.ratio}` }}>
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  sizes={coverSizes(story.ratio / 100, story.sourceRatio)}
                  className="object-cover"
                />
              </div>
              <p className="mt-4 font-heading text-[12px] font-medium uppercase leading-none tracking-[0.08em] opacity-70">
                {story.category}
              </p>
              <h3 className="mt-2 text-[22px] leading-[1.15]">{story.title}</h3>
            </InertLink>
          </article>
        ))}
      </div>
    </section>
  );
}
