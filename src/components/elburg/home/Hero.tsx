import Image from "next/image";
import Link from "next/link";
import InertLink from "@/components/shared/InertLink";
import { heroLinkTiles } from "@/data/elburg/home";

/**
 * The hero band: a full-bleed product shot with the headline set over it,
 * then three link tiles on paper below the fold line.
 *
 * The reference sets its headline as an SVG; that artwork is typographic and
 * carries the reference wordmark's own drawing, so it is rebuilt here as live
 * type — Newsreader italic over Barlow Condensed caps.
 */
export default function Hero() {
  return (
    <section>
      <div className="relative flex min-h-[520px] items-end overflow-hidden bg-elburg-bone md:min-h-[640px] md:items-center lg:min-h-[760px]">
        <Image
          src="/images/elburg/hero/claspwallet-hero.jpg"
          alt="A Claspwallet in cognac leather, open, with coins falling past it"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* keeps the white headline legible wherever the image crops */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-transparent"
        />

        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-12 md:pb-0 lg:px-12">
          <p className="mb-1 font-sans text-[24px] italic leading-none text-white md:text-[30px]">
            The new
          </p>
          <h1 className="font-heading text-[52px] font-bold uppercase leading-[0.92] tracking-[0.005em] text-white sm:text-[66px] lg:text-[80px]">
            Clasp
            <br />
            wallet
          </h1>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/elburg/collections/all"
              className="bg-white px-6 py-3 font-heading text-[12px] font-semibold uppercase leading-none tracking-[0.06em] text-elburg-ink transition-colors hover:bg-elburg-paper"
            >
              Shop all wallets
            </Link>
            <Link
              href="/elburg/products/claspwallet"
              className="border border-white px-6 py-3 font-heading text-[12px] font-semibold uppercase leading-none tracking-[0.06em] text-white transition-colors hover:bg-white hover:text-elburg-ink"
            >
              The Claspwallet
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-12 md:grid-cols-[repeat(3,minmax(0,1fr))] md:gap-10 md:py-14 lg:px-12">
        {heroLinkTiles.map((tile) => (
          <div key={tile.link} className="min-w-0 border-l border-elburg-ink/25 pl-5">
            <p className="text-[26px] leading-[1.12] lg:text-[28px]">
              {tile.lines.map((line) => (
                <span key={line.text} className={line.italic ? "block italic" : "block"}>
                  {line.text}
                </span>
              ))}
            </p>
            <InertLink className="mt-6 inline-block py-2 font-heading text-[12px] font-medium uppercase leading-none tracking-[0.06em] underline underline-offset-[5px] hover:text-elburg-accent">
              {tile.link}
            </InertLink>
          </div>
        ))}
      </div>
    </section>
  );
}
