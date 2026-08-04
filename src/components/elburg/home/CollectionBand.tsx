import Image from "next/image";
import InertLink from "@/components/shared/InertLink";
import { collectionBand } from "@/data/elburg/home";

/**
 * The collection band — a full-bleed editorial band with the headline set over
 * the bottom-left of the photograph.
 *
 * The reference pairs a huge condensed headline with a small serif italic
 * standfirst tucked into the gap the headline's last line leaves, which is why
 * the two are a flex row aligned to the baseline rather than a stack. It ships
 * a portrait crop of the same photograph for mobile; one landscape file with
 * `object-cover` gets to the same place without a second image to de-brand.
 */
export default function CollectionBand() {
  return (
    <section className="px-6 py-4 lg:px-12">
      <div className="relative mx-auto flex min-h-[420px] max-w-[1440px] items-end overflow-hidden sm:min-h-[480px] lg:min-h-[560px]">
        <Image
          src={collectionBand.image}
          alt={collectionBand.alt}
          fill
          /* The photograph is 2200 × 992 and this band is 342 × 420 on a phone,
             so `object-cover` crops it to a portrait sliver — it needs a file
             roughly 2.4× the band's own width, which a plain `100vw` never
             asks for. `sizes` describes the *scaled* image, not the box, and
             the multiplier shrinks as the band gets wider than the photograph
             is flat; past 1280 it is the band's own width again. */
          sizes="(min-width: 1280px) 100vw, (min-width: 640px) 150vw, 240vw"
          className="object-cover object-[62%_center] sm:object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-transparent"
        />

        <div className="relative p-6 lg:p-10">
          <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
            <h2 className="font-heading text-[46px] font-bold uppercase leading-[0.88] tracking-[0.005em] text-white sm:text-[58px] lg:text-[74px]">
              {collectionBand.headline.map((line) => (
                <span key={line.text} className="block">
                  {line.text}
                </span>
              ))}
            </h2>
            <p className="mb-2 text-[17px] italic leading-[1.15] text-white lg:text-[19px]">
              {collectionBand.standfirst.map((line) => (
                <span key={line.text} className="block">
                  {line.text}
                </span>
              ))}
            </p>
          </div>

          <InertLink className="mt-7 inline-block bg-white px-6 py-3 font-heading text-[12px] font-semibold uppercase leading-none tracking-[0.06em] text-elburg-ink transition-colors hover:bg-elburg-paper">
            {collectionBand.cta}
          </InertLink>
        </div>
      </div>
    </section>
  );
}
