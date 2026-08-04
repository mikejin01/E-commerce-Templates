"use client";

import { useRef, useState } from "react";
import { footerUsps } from "@/data/elburg/navigation";

/**
 * The four-up promise strip above the footer columns. Four columns from `md`;
 * below that the reference turns it into a swipeable rail with dots, so this
 * does the same — the dot index comes from the rail's own scroll position
 * rather than a timer, so it stays truthful when you drag.
 */

const icons: Record<string, React.ReactNode> = {
  repair: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.4v2.2M12 18.4v2.2M20.6 12h-2.2M5.6 12H3.4M18.1 5.9l-1.6 1.6M7.5 16.5l-1.6 1.6M18.1 18.1l-1.6-1.6M7.5 7.5 5.9 5.9" strokeLinecap="round" />
    </>
  ),
  warranty: (
    <>
      <path d="M12 3.2 19 6v6c0 3.7-2.8 6.6-7 8-4.2-1.4-7-4.3-7-8V6l7-2.8Z" strokeLinejoin="round" />
      <path d="M12 9.4v5M9.5 11.9h5" strokeLinecap="round" />
    </>
  ),
  delivery: (
    <>
      <path d="M12 3.6 21 8l-9 4.4L3 8l9-4.4Z" strokeLinejoin="round" />
      <path d="M3 8v8l9 4.4V12.4M21 8v8l-9 4.4" strokeLinejoin="round" />
    </>
  ),
  returns: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M14.5 10.5H10a2 2 0 0 0 0 4h1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m12.6 8.4 2.1 2.1-2.1 2.1" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export default function FooterUsps() {
  const railRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  function onScroll() {
    const rail = railRef.current;
    if (!rail) return;
    const index = Math.round(rail.scrollLeft / Math.max(rail.clientWidth, 1));
    setActive(Math.min(Math.max(index, 0), footerUsps.length - 1));
  }

  return (
    <div>
      <ul
        ref={railRef}
        onScroll={onScroll}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory overflow-x-auto md:mx-0 md:grid md:grid-cols-[repeat(4,minmax(0,1fr))] md:gap-8 md:overflow-visible"
      >
        {footerUsps.map((usp) => (
          <li
            key={usp.title}
            className="flex w-full min-w-0 shrink-0 snap-center flex-col items-center px-6 text-center md:w-auto md:px-0"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              aria-hidden
              className="mb-4 size-7"
            >
              {icons[usp.icon]}
            </svg>
            <h3 className="mb-3 font-heading text-[15px] font-semibold uppercase leading-none tracking-[0.03em]">
              {usp.title}
            </h3>
            <p className="max-w-[15rem] text-[14px] leading-snug text-elburg-bone/80">{usp.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex items-center justify-center gap-3 md:hidden" aria-hidden>
        {footerUsps.map((usp, i) => (
          <span
            key={usp.title}
            className={`size-[7px] rotate-45 ${
              i === active ? "bg-elburg-bone" : "border border-elburg-bone/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
