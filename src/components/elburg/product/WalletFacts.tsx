import Image from "next/image";
import { walletFacts } from "@/data/elburg/products";

/**
 * The wallet-facts band — a six-card rail.
 *
 * One ratio for the whole rail, not a per-card one. Mixed ratios belong in the
 * stories band, where the tiles stack in columns and the ragged bottom edge is
 * the design; in a *row* they put the six titles on six different baselines and
 * the band reads as broken rather than as editorial. The reference's own facts
 * band loads client-side and is empty in every capture, so there is no ground
 * truth to copy here — this is the shape that reads right.
 *
 * The card is capped at 360px because the flattest source in the set is
 * 800 × 452: at `21vw` of a 2560 screen the card is 538px wide, and covering
 * that box would upscale it 1.4× (the `object-cover` trap in `PLAN.md`).
 *
 * `min-w-0` on the rail's children: the rail is a horizontal scroller and a
 * long fact title would otherwise size the row to its min-content (standing
 * rule 5).
 */
const CARD_RATIO = 121;

export default function WalletFacts() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <h2 className="font-heading text-[28px] font-bold uppercase leading-none tracking-[0.01em] md:text-[36px]">
          Wallet facts
        </h2>
      </div>

      <ul className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-6 px-6 lg:scroll-pl-12 lg:px-12">
        {walletFacts.map((fact) => (
          <li
            key={fact.title}
            className="w-[76vw] min-w-0 max-w-[360px] shrink-0 snap-start sm:w-[44vw] lg:w-[27vw] xl:w-[21vw]"
          >
            <div
              className="relative w-full bg-elburg-ink/5"
              style={{ paddingTop: `${CARD_RATIO}%` }}
            >
              <Image
                src={fact.image}
                alt={fact.alt}
                fill
                sizes="(min-width: 1720px) 360px, (min-width: 1280px) 21vw, (min-width: 1024px) 27vw, (min-width: 640px) 44vw, 76vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 font-heading text-[17px] font-bold uppercase leading-tight tracking-[0.02em]">
              {fact.title}
            </h3>
            <p className="mt-1.5 text-[14px] leading-snug opacity-80">{fact.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
