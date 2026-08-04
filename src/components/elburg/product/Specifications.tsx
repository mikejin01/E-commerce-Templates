"use client";

import { useId, useState } from "react";
import SizeDiagram from "@/components/elburg/product/SizeDiagram";
import type { Accordion as AccordionData, Dimensions } from "@/data/elburg/products";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="m5 9 7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Panel({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <div className="border-b border-elburg-ink/20">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-4 py-4 text-left font-heading text-[14px] font-semibold uppercase tracking-[0.08em] hover:text-elburg-accent"
        >
          <span className="min-w-0">{title}</span>
          <Chevron open={open} />
        </button>
      </h3>
      {open && (
        <div id={id} className="min-w-0 pb-6">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * The specifications band — the reference's brand blurb on the left, four
 * accordions on the right. "Size & weight" is the one that opens by default and
 * the one that renders a drawing rather than prose.
 */
export default function Specifications({
  accordions,
  dimensions,
}: {
  accordions: AccordionData[];
  dimensions: Dimensions;
}) {
  // the reference opens on Size & weight, which is the last panel
  const [openIndex, setOpenIndex] = useState(accordions.length);

  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20 lg:px-12 lg:py-20">
      <p className="max-w-lg text-[22px] italic leading-[1.28] md:text-[26px]">
        ELBURG Carrywear — Dutch design, made in Europe. Everyday essentials that combine patented
        technology, sustainability and function.
      </p>

      <div className="min-w-0 border-t border-elburg-ink/20">
        {accordions.map((accordion, i) => (
          <Panel
            key={accordion.title}
            title={accordion.title}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          >
            {accordion.lead && (
              <p className="mb-3 text-[16px] italic">{accordion.lead}</p>
            )}
            {accordion.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mb-3 text-[15px] leading-relaxed last:mb-0">
                {paragraph}
              </p>
            ))}
            {accordion.list && (
              <div className="mt-4">
                <p className="font-heading text-[13px] font-semibold uppercase tracking-[0.08em]">
                  {accordion.list.heading}
                </p>
                <ul className="mt-1.5 space-y-1 text-[15px] leading-relaxed">
                  {accordion.list.items.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>
            )}
            {accordion.footer && (
              <div className="mt-4">
                <p className="font-heading text-[13px] font-semibold uppercase tracking-[0.08em]">
                  {accordion.footer.heading}
                </p>
                <p className="mt-1.5 text-[15px] leading-relaxed">{accordion.footer.body}</p>
              </div>
            )}
          </Panel>
        ))}

        <Panel
          title="Size & weight"
          open={openIndex === accordions.length}
          onToggle={() => setOpenIndex(openIndex === accordions.length ? -1 : accordions.length)}
        >
          <SizeDiagram dimensions={dimensions} />
        </Panel>
      </div>
    </section>
  );
}
