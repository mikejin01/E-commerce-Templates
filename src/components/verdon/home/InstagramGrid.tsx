import Image from "next/image";
import InertLink from "@/components/shared/InertLink";
import { instagramTiles } from "@/data/verdon/home";

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-6">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function InstagramGrid() {
  return (
    <section className="pb-14 md:pb-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <div className="mb-7 text-center">
          <h2 className="font-heading text-[26px] font-medium uppercase tracking-[0.04em] md:text-[32px]">
            Follow the Adventure
          </h2>
          {/* the real profile is deliberately not linked — this demo never
              navigates off-site */}
          <InertLink className="mt-1.5 inline-flex items-center gap-2 text-[13px] text-neutral-600 hover:text-verdon-green">
            <InstagramGlyph />
            @verdon_official
          </InertLink>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1 md:grid-cols-8">
        {instagramTiles.map((src, i) => (
          <InertLink
            key={src}
            label={`VERDON on Instagram, photo ${i + 1}`}
            className="group relative block aspect-square w-full overflow-hidden"
          >
            <Image
              src={src}
              alt={`VERDON on Instagram, photo ${i + 1}`}
              fill
              sizes="(min-width: 768px) 12.5vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-verdon-green/0 text-white/0 transition-colors duration-300 group-hover:bg-verdon-green/45 group-hover:text-white">
              <InstagramGlyph />
            </span>
          </InertLink>
        ))}
      </div>
    </section>
  );
}
