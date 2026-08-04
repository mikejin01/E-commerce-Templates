import Image from "next/image";
import type { FeatureRow } from "@/data/verdon/products";

/** Three alternating image/copy rows — OPTICS, PERFORMANCE, FIT. */
export default function FeatureRows({ features }: { features: FeatureRow[] }) {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 md:gap-16 lg:px-16">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 ${
              index % 2 === 1 ? "md:[&>figure]:order-2" : ""
            }`}
          >
            <figure className="relative aspect-[4/3] overflow-hidden bg-verdon-cream">
              <Image
                src={feature.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </figure>

            <div>
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                {feature.eyebrow}
              </p>
              <h3 className="mt-2 font-heading text-[22px] font-medium uppercase tracking-[0.03em] md:text-[26px]">
                {feature.title}
              </h3>
              <p className="mt-4 max-w-prose text-[13px] leading-relaxed text-neutral-600">
                {feature.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
