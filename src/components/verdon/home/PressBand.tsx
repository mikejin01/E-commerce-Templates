import { pressQuotes } from "@/data/verdon/press";

export default function PressBand() {
  const shown = pressQuotes.slice(0, 3);

  return (
    <section className="bg-verdon-navy text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-14 md:py-20 lg:px-16">
        <p className="mb-10 text-center font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
          As seen in
        </p>

        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {shown.map((item) => (
            <figure key={item.outlet} className="flex flex-col items-center text-center">
              {/* set as type rather than a logo file — the band ships no publication artwork */}
              <span className="font-heading text-[15px] font-semibold uppercase leading-none tracking-[0.16em] md:text-[17px]">
                {item.outlet}
              </span>
              <blockquote className="mt-6 max-w-sm text-[14px] leading-relaxed text-white/90 md:text-[15px]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
