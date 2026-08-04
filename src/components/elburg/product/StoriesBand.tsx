import Image from "next/image";
import InertLink from "@/components/shared/InertLink";
import { stories } from "@/data/elburg/home";

/**
 * The PDP's stories band: the same editorial subjects as the homepage's, on the
 * dark ground the reference uses here. Three tiles, not six — the PDP's version
 * is a taster, and the homepage band is where the set lives.
 *
 * Which three is not "the first three". These tiles are a fixed 4:5 box, and
 * the homepage band's set includes a landscape flat-lay (800 × 452) that
 * `object-cover` has to blow up past its own pixels to fill one — it shipped at
 * 2.2× its own width. So the band takes the entries whose photographs are at
 * least as tall as this box.
 */
const TILES = stories.filter((story) => story.sourceRatio >= 5 / 4).slice(0, 3);

export default function StoriesBand() {
  return (
    <section className="bg-elburg-bark py-14 text-elburg-bone md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <h2 className="text-center font-heading text-[13px] font-semibold uppercase tracking-[0.16em] opacity-80">
          ELBURG stories
        </h2>

        {/* minmax(0,…) at every breakpoint — standing rule 5 */}
        <ul className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-[repeat(3,minmax(0,1fr))]">
          {TILES.map((story) => (
            <li key={story.title} className="min-w-0">
              <InertLink className="group block w-full text-left">
                <div className="relative aspect-[4/5] overflow-hidden bg-elburg-bone/10">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 88vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 font-heading text-[11px] uppercase tracking-[0.14em] opacity-65">
                  {story.category}
                </p>
                <h3 className="mt-1 font-heading text-[19px] font-bold uppercase leading-tight tracking-[0.02em]">
                  {story.title}
                </h3>
              </InertLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
