"use client";

import { useState } from "react";
import StarRating from "@/components/verdon/product/StarRating";
import type { Review, ReviewSummary } from "@/data/verdon/reviews";

const PER_PAGE = 3;

/** Regional-indicator pair renders the flag emoji for an ISO alpha-2 code. */
function flagFor(code: string) {
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ProductReviews({
  productName,
  summary,
  reviews,
}: {
  productName: string;
  summary: ReviewSummary;
  reviews: Review[];
}) {
  const [filter, setFilter] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const filtered = filter === null ? reviews : reviews.filter((r) => r.rating === filter);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, pages - 1);
  const shown = filtered.slice(safePage * PER_PAGE, safePage * PER_PAGE + PER_PAGE);

  function choose(stars: number | null) {
    setFilter(stars);
    setPage(0);
  }

  const chips: (number | null)[] = [null, 5, 4, 3];

  return (
    <section className="border-t border-neutral-200 py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <h2 className="font-heading text-[24px] font-medium uppercase tracking-[0.04em] md:text-[30px]">
          {productName} Reviews
        </h2>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:gap-16">
          {/* Average + histogram */}
          <div>
            <div className="flex items-baseline gap-3">
              <p className="font-heading text-[44px] font-medium leading-none tabular-nums">
                {summary.rating.toFixed(1)}
              </p>
              <div>
                <StarRating rating={summary.rating} />
                <p className="mt-1 text-[11px] text-neutral-500">
                  {summary.total.toLocaleString("en-IE")} reviews
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-1.5">
              {summary.histogram.map((count, i) => {
                const stars = 5 - i;
                const pct = summary.total ? (count / summary.total) * 100 : 0;
                return (
                  <li key={stars} className="flex items-center gap-3 text-[11px] text-neutral-500">
                    <span className="w-8 shrink-0 tabular-nums">{stars} ★</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-200">
                      <span
                        className="block h-full rounded-full bg-verdon-star"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="w-12 shrink-0 text-right tabular-nums">
                      {count.toLocaleString("en-IE")}
                    </span>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              className="mt-7 w-full border border-verdon-green px-6 py-3 font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-verdon-green transition-colors hover:bg-verdon-green hover:text-white"
            >
              Write a Review
            </button>
          </div>

          {/* Filters + cards */}
          <div>
            <div className="flex flex-wrap gap-2">
              {chips.map((stars) => {
                const selected = filter === stars;
                return (
                  <button
                    key={stars ?? "all"}
                    type="button"
                    onClick={() => choose(stars)}
                    aria-pressed={selected}
                    className={`rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.1em] transition-colors ${
                      selected
                        ? "border-verdon-green bg-verdon-green text-white"
                        : "border-neutral-300 text-neutral-600 hover:border-verdon-green hover:text-verdon-green"
                    }`}
                  >
                    {stars === null ? "All reviews" : `${stars} stars`}
                  </button>
                );
              })}
            </div>

            {shown.length === 0 ? (
              <p className="mt-8 text-[13px] text-neutral-500">
                No reviews with this rating yet.
              </p>
            ) : (
              <ul className="mt-6 divide-y divide-neutral-200 border-t border-neutral-200">
                {shown.map((review) => (
                  <li key={review.id} className="py-6">
                    <div className="flex items-start gap-3.5">
                      <span
                        aria-hidden
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-verdon-cream font-heading text-[12px] font-semibold text-verdon-green"
                      >
                        {initials(review.author)}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <span className="text-[13px] font-medium">{review.author}</span>
                          <span className="text-[12px]" title={review.country}>
                            {flagFor(review.countryCode)}
                          </span>
                          {review.verified && (
                            <span className="rounded-full bg-verdon-green/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-verdon-green">
                              Verified buyer
                            </span>
                          )}
                          <span className="ml-auto text-[11px] tabular-nums text-neutral-500">
                            {review.date}
                          </span>
                        </div>

                        <div className="mt-2">
                          <StarRating rating={review.rating} />
                        </div>

                        <h3 className="mt-2.5 font-heading text-[14px] font-medium">
                          {review.title}
                        </h3>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-600">
                          {review.body}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {pages > 1 && (
              <div className="mt-6 flex items-center gap-2">
                {Array.from({ length: pages }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    aria-label={`Go to review page ${i + 1}`}
                    aria-current={i === safePage}
                    className={`size-8 border text-[12px] tabular-nums transition-colors ${
                      i === safePage
                        ? "border-verdon-green bg-verdon-green text-white"
                        : "border-neutral-300 text-neutral-600 hover:border-verdon-green"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
