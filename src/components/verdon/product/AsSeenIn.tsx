"use client";

import { useState } from "react";
import { pressQuotes } from "@/data/verdon/press";

const PER_PAGE = 3;
const pages = Math.ceil(pressQuotes.length / PER_PAGE);

/** Navy press band with dot pagination, as on the reference PDP. */
export default function AsSeenIn() {
  const [page, setPage] = useState(0);
  const shown = pressQuotes.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="bg-verdon-navy py-14 text-white md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <h2 className="text-center font-heading text-[24px] font-medium uppercase tracking-[0.04em] md:text-[30px]">
          As seen in
        </h2>

        <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {shown.map((item) => (
            <li key={item.outlet} className="flex flex-col items-center text-center">
              {/* set as type rather than a logo file — the band ships no publication artwork */}
              <span className="font-heading text-[15px] font-semibold uppercase leading-none tracking-[0.16em] md:text-[17px]">
                {item.outlet}
              </span>
              <blockquote className="mt-5 text-[14px] leading-relaxed text-white/85">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </li>
          ))}
        </ul>

        {pages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2.5">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Show press page ${i + 1}`}
                aria-current={i === page}
                className={`size-2.5 rounded-full transition-colors ${
                  i === page ? "bg-white" : "bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
