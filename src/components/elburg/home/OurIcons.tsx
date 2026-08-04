import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/elburg/home/SectionHeading";
import { products, titleFor } from "@/data/elburg/products";
import { formatPrice } from "@/lib/elburg/format";

/**
 * "Our icons" — the model line-up on a horizontal rail, one
 * card per model in its lead colourway.
 *
 * Two things the reference's design depends on. The renders sit on a per-product
 * tint that comes from the catalogue rather than a token — the source art is a
 * cut-out, so a card with no tint would lose the product's edges against the
 * paper background. And the cards are divided by vertical hairlines rather than
 * gaps, so the rail reads as one ruled strip: the divider goes on the card, not
 * the list.
 *
 * Phase 3 replaced this band's private copy of the catalogue with the catalogue
 * itself, and pointed every card at its PDP.
 */
export default function OurIcons() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionHeading
          title="Our icons"
          link="All wallets"
          href="/elburg/collections/all"
          className="mb-5"
        />
      </div>

      <ul className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-pl-6 px-6 lg:scroll-pl-12 lg:px-12">
        {products.map((product, i) => {
          const color = product.colors[0];
          return (
            <li
              key={product.slug}
              className={`w-[62vw] min-w-0 shrink-0 snap-start px-3 sm:w-[40vw] md:w-[30vw] lg:w-[22vw] xl:w-[18vw] ${
                i > 0 ? "border-l border-elburg-ink/15" : ""
              }`}
            >
              <Link href={`/elburg/products/${product.slug}`} className="group block w-full">
                <div className="relative aspect-[41/47]" style={{ backgroundColor: color.tint }}>
                  <Image
                    src={color.images[0].src}
                    alt={color.images[0].alt}
                    fill
                    sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 768px) 30vw, 62vw"
                    className="object-contain"
                  />
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <h3 className="min-w-0 font-heading text-[16px] font-bold uppercase leading-[1.1] tracking-[0.02em] group-hover:text-elburg-accent">
                    {titleFor(product, color)}
                  </h3>
                  <span className="shrink-0 font-heading text-[16px] font-medium leading-[1.1] tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <p className="mt-1 text-[14px] italic leading-none opacity-70">{color.name}</p>
              </Link>

              {/* the model's colourways, each a link to that SKU's PDP. The
                  dot sits inside a 24px hit box — see the note in ProductCard */}
              <ul className="mt-3 flex items-center gap-2.5">
                {product.colors.map((option, j) => (
                  <li key={option.slug}>
                    <Link
                      href={`/elburg/products/${product.slug}?colour=${option.slug}`}
                      aria-label={`${product.name} in ${option.name}`}
                      className="-m-1.25 flex size-6 items-center justify-center"
                    >
                      <span
                        aria-hidden
                        style={{ backgroundColor: option.hex }}
                        className={`block size-3.5 rounded-full ${
                          j === 0
                            ? "ring-1 ring-elburg-ink/50 ring-offset-2 ring-offset-elburg-paper"
                            : ""
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
