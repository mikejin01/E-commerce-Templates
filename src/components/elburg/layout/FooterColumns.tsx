"use client";

import { useState } from "react";
import InertLink from "@/components/shared/InertLink";
import { footerColumns } from "@/data/elburg/navigation";

/**
 * Three link columns, split by vertical rules from `md`. Below that the
 * reference collapses them into accordions with the first one open, so this
 * does the same rather than stacking nine-item lists.
 */
export default function FooterColumns() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="grid gap-0 md:grid-cols-[repeat(3,minmax(0,1fr))] md:gap-8">
      {footerColumns.map((column, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={column.heading}
            className={`border-t border-elburg-bone/20 py-1 md:border-t-0 md:py-0 ${
              i > 0 ? "md:border-l md:border-elburg-bone/20 md:pl-8" : ""
            } ${i === footerColumns.length - 1 ? "border-b md:border-b-0" : ""}`}
          >
            {/* button on mobile, plain heading from md — one control, two roles */}
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left md:pointer-events-none md:py-0"
            >
              <h3 className="font-heading text-[15px] font-semibold uppercase leading-none tracking-[0.03em]">
                {column.heading}
              </h3>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden
                className={`size-5 shrink-0 transition-transform md:hidden ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <path d="m5 9 7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className={`${isOpen ? "block" : "hidden"} pb-5 md:block md:pb-0 md:pt-5`}>
              {column.blocks.map((block, blockIndex) => (
                <ul key={blockIndex} className="space-y-3 [&:not(:first-child)]:mt-5">
                  {block.map((label) => (
                    <li key={label}>
                      {/* `-my-1.5 py-1.5` grows a 14px link to a 26px tap
                          target inside the list's own `space-y-3` gaps, with
                          no layout shift — the tap-target trap in `PLAN.md` */}
                      <InertLink className="-my-1.5 block py-1.5 text-[14px] leading-none text-elburg-bone/85 hover:text-elburg-bone hover:underline">
                        {label}
                      </InertLink>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
