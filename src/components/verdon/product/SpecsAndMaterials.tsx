import type { Product } from "@/data/verdon/products";

function Tick() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
      className="mt-[3px] size-3.5 shrink-0 text-verdon-green"
    >
      <path d="m4 12.5 5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SpecsAndMaterials({ product }: { product: Product }) {
  return (
    <section className="border-t border-neutral-200 py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <h2 className="font-heading text-[24px] font-medium uppercase tracking-[0.04em] md:text-[30px]">
          Specs &amp; Materials
        </h2>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-14">
          {product.specGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-heading text-[13px] font-semibold uppercase tracking-[0.1em]">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-neutral-600">
                    <Tick />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-verdon-green p-7 text-white">
            <h3 className="font-heading text-[13px] font-semibold uppercase tracking-[0.1em]">
              About the {product.name}
            </h3>
            <p className="mt-3.5 text-[13px] leading-relaxed text-white/85">
              {product.description}
            </p>
            <ul className="mt-5 space-y-2 border-t border-white/20 pt-5">
              {product.highlights.slice(0, 3).map((highlight) => (
                <li key={highlight} className="text-[12px] leading-relaxed text-white/85">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
