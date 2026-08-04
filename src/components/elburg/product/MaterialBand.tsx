import Image from "next/image";
import { materials, type MaterialKey } from "@/data/elburg/products";

/**
 * The full-bleed dark band: material swatch on the left, a two-line display
 * title, the quote and three numbered claims. Which material it shows follows
 * the *colourway*, not the model — a Foldwallet in Latte is pebble leather, the
 * same wallet in Chocolate is original.
 */
export default function MaterialBand({ material }: { material: MaterialKey }) {
  const data = materials[material];

  return (
    <section className="grid min-w-0 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)]">
      <div className="relative aspect-[4/3] bg-elburg-bone/40 lg:aspect-auto lg:min-h-[420px]">
        <Image
          src={data.image}
          alt={data.alt}
          fill
          sizes="(min-width: 1024px) 44vw, 100vw"
          className="object-contain p-10 lg:p-16"
        />
      </div>

      <div className="min-w-0 bg-elburg-slate px-6 py-12 text-elburg-bone lg:px-14 lg:py-16">
        <h2 className="font-heading text-[46px] font-bold uppercase leading-[0.88] tracking-[0.005em] md:text-[64px] lg:text-[76px]">
          {data.title[0]}
          <br />
          {data.title[1]}
        </h2>

        <p className="mt-5 max-w-md text-[15px] italic leading-snug opacity-90">
          &ldquo;{data.quote}&rdquo;
        </p>

        <ol className="mt-10 max-w-md">
          {data.usps.map((usp, i) => (
            <li
              key={usp.label}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-5 border-b border-elburg-bone/25 py-3.5 last:border-b-0"
            >
              <span className="font-heading text-[22px] font-bold leading-none tabular-nums opacity-90">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] leading-snug">{usp.label}</span>
                <span className="block font-heading text-[12px] uppercase tracking-[0.1em] opacity-60">
                  {usp.value}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
