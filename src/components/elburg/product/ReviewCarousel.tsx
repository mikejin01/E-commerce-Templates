"use client";

import { useState } from "react";
import { reviews } from "@/data/elburg/products";

/**
 * The review band — "WHAT PEOPLE SAY", one italic pull-quote at a time with its
 * attribution and a row of dots. `relative` on the root because of the
 * `sr-only` live region (see the note in ImageStrip).
 */
export default function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  return (
    <section className="relative mx-auto max-w-[900px] px-6 py-16 text-center md:py-24">
      <h2 className="font-heading text-[13px] font-semibold uppercase tracking-[0.16em] opacity-70">
        What people say
      </h2>

      <blockquote className="mt-6">
        <p className="text-[28px] italic leading-[1.2] md:text-[40px]">
          &ldquo;{review.quote}&rdquo;
        </p>
        <footer className="mt-6">
          <span className="block font-heading text-[11px] uppercase tracking-[0.14em] opacity-55">
            Review by
          </span>
          <span className="mt-1 block font-heading text-[13px] font-semibold uppercase tracking-[0.1em]">
            {review.author}
          </span>
        </footer>
      </blockquote>

      <span className="sr-only" aria-live="polite">
        Review {index + 1} of {reviews.length}
      </span>

      <ul className="mt-8 flex items-center justify-center gap-2.5">
        {reviews.map((item, i) => (
          <li key={item.quote}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show review ${i + 1}`}
              aria-current={i === index}
              className={`block size-2 rotate-45 transition-colors ${
                i === index ? "bg-elburg-ink" : "bg-elburg-ink/25 hover:bg-elburg-ink/50"
              }`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
