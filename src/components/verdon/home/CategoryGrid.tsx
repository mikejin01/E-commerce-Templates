import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/verdon/home";

export default function CategoryGrid() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <h2 className="mb-8 text-center font-heading text-[26px] font-medium uppercase tracking-[0.04em] md:text-[32px]">
          Shop by Activity
        </h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {categories.map((category) => (
            <Link
              key={category.handle}
              href="/verdon/collections/all"
              className="group relative block aspect-square overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.label}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4 md:p-6">
                <h3 className="font-heading text-[12px] font-medium uppercase tracking-[0.08em] text-white sm:text-[15px] sm:tracking-[0.1em] md:text-[18px]">
                  {category.label}
                </h3>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hidden size-4 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 sm:block"
                  aria-hidden
                >
                  <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
