import Image from "next/image";
import Link from "next/link";
import { features } from "@/data/verdon/home";

export default function FeaturesBand() {
  return (
    <section className="bg-verdon-green text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-14 md:py-20 lg:px-16">
        {/* no max-width: the explicit break sets the two lines, and a width cap
            would wrap "the Verdon way" a second time at md and up */}
        <h2 className="text-balance text-center font-heading text-[30px] font-semibold uppercase leading-[1.15] tracking-[0.06em] md:text-[44px]">
          Eyewear made
          <br />
          the Verdon way
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 md:mt-16 md:gap-x-16 md:gap-y-14">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-5">
              <Image
                src={feature.icon}
                alt=""
                width={96}
                height={96}
                sizes="56px"
                className="size-11 shrink-0 object-contain md:size-14"
              />
              <div>
                <h3 className="font-heading text-[15px] font-semibold uppercase tracking-[0.1em] md:text-[17px]">
                  {feature.title}
                </h3>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/80">
                  {feature.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:mt-16">
          <Link
            href="/verdon/collections/all"
            className="inline-block border border-white px-9 py-3.5 font-heading text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-verdon-green"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
