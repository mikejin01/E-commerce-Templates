/** Native <details> so the PDP accordions stay server-rendered. */
export default function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-neutral-200">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading text-[12px] font-semibold uppercase tracking-[0.14em] [&::-webkit-details-marker]:hidden">
        {title}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-45"
        >
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="pb-5 text-[13px] leading-relaxed text-neutral-600">{children}</div>
    </details>
  );
}
