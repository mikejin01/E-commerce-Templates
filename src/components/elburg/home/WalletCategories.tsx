import Image from "next/image";
import Link from "next/link";
import InertLink from "@/components/shared/InertLink";
import SectionHeading from "@/components/elburg/home/SectionHeading";
import { walletCategories } from "@/data/elburg/home";

/**
 * The "Wallet Categories" band — three tall tiles, each a
 * full-bleed shot with its label group set over the bottom-left corner.
 *
 * Three equal columns from `md`; below that the reference turns the row into a
 * swipeable rail, so the tiles stay a fixed fraction of the viewport wide and
 * the row scrolls. Every track is `minmax(0, …)` (standing rule 5) — an `auto`
 * track here would size to the tile's own min-content and push the third tile
 * off-screen.
 */
export default function WalletCategories() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-6 pb-16 md:pb-20 lg:px-12">
      <SectionHeading title="Wallet categories" link="All wallets" className="mb-5" />

      <ul className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-pl-6 px-6 md:mx-0 md:grid md:grid-cols-[repeat(3,minmax(0,1fr))] md:overflow-visible md:px-0">
        {walletCategories.map((category) => (
          <li
            key={category.title}
            className="relative w-[78vw] min-w-0 shrink-0 snap-start overflow-hidden md:w-auto"
          >
            <div className="relative aspect-[47/58]">
              <Image
                src={category.image}
                alt={category.alt}
                fill
                sizes="(min-width: 768px) 33vw, 78vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent"
              />
              {(() => {
                const body = (
                  <>
                    <span className="font-heading text-[12px] font-medium uppercase leading-none tracking-[0.08em]">
                      {category.eyebrow}
                    </span>
                    <span className="mt-2 font-heading text-[24px] font-bold uppercase leading-none tracking-[0.01em] lg:text-[27px]">
                      {category.title}
                    </span>
                    {/* The add-ons tile has no price floor. The reference still
                        lines all three eyebrows up with each other, so the row
                        is reserved rather than dropped — bottom-aligning a
                        shorter block pushes its whole caption down a line. */}
                    <span aria-hidden={!category.subtitle} className="mt-1.5 text-[14px] italic leading-none">
                      {category.subtitle ?? " "}
                    </span>
                  </>
                );
                const overlay = "absolute inset-0 flex flex-col justify-end p-5 text-white";
                return category.href ? (
                  <Link href={category.href} className={overlay}>
                    {body}
                  </Link>
                ) : (
                  <InertLink className={overlay}>{body}</InertLink>
                );
              })()}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
