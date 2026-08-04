"use client";

import { MAX_QUANTITY } from "@/lib/elburg/cart-context";

export default function QuantityStepper({
  quantity,
  onChange,
  label,
  size = "md",
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  /** what is being counted, for screen readers — e.g. the product name */
  label: string;
  size?: "sm" | "md";
}) {
  const button =
    size === "sm"
      ? "flex size-8 items-center justify-center text-[15px]"
      : "flex size-10 items-center justify-center text-[17px]";

  return (
    <div className="inline-flex items-center border border-elburg-ink/20">
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        aria-label={`Decrease quantity of ${label}`}
        className={`${button} transition-colors hover:bg-elburg-ink/5`}
      >
        −
      </button>
      <span
        aria-live="polite"
        className={`min-w-8 text-center font-heading text-[14px] tabular-nums ${
          size === "sm" ? "px-1" : "px-2"
        }`}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= MAX_QUANTITY}
        aria-label={`Increase quantity of ${label}`}
        className={`${button} transition-colors hover:bg-elburg-ink/5 disabled:pointer-events-none disabled:opacity-30`}
      >
        +
      </button>
    </div>
  );
}
