import Image from "next/image";
import InertLink from "@/components/shared/InertLink";
import { stories } from "@/data/verdon/home";

export default function Stories() {
  return (
    <section className="bg-verdon-cream py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="font-heading text-[26px] font-medium uppercase tracking-[0.04em] md:text-[32px]">
            Stories
          </h2>
          <InertLink className="shrink-0 font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-verdon-green underline-offset-4 hover:underline">
            View all
          </InertLink>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stories.map((story) => (
            <InertLink key={story.slug} className="group block w-full">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-4 font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                {story.eyebrow}
              </p>
              <h3 className="mt-1.5 font-heading text-[16px] font-medium leading-snug group-hover:underline">
                {story.title}
              </h3>
            </InertLink>
          ))}
        </div>
      </div>
    </section>
  );
}
