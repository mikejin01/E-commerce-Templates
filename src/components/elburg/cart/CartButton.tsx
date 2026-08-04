"use client";

import { useCart } from "@/lib/elburg/cart-context";

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-5">
      <path d="M5 8h14l-1 12H6L5 8Z" strokeLinejoin="round" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" strokeLinecap="round" />
    </svg>
  );
}

export default function CartButton() {
  const { count, hydrated, openDrawer } = useCart();
  // the badge waits for localStorage so the server and first client render match
  const showBadge = hydrated && count > 0;

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={showBadge ? `Bag, ${count} item${count === 1 ? "" : "s"}` : "Bag"}
      /* -m-2.5 p-2.5 pads the 20px icon out to a finger-sized target without
         moving the header's layout — see the tap-target trap in `PLAN.md` */
      className="relative -m-2.5 p-2.5 hover:text-elburg-accent"
    >
      <BagIcon />
      {showBadge && (
        <span className="absolute right-0.5 top-1.5 flex min-w-4 items-center justify-center rounded-full bg-elburg-accent px-1 font-heading text-[10px] font-semibold leading-4 text-elburg-paper">
          {count}
        </span>
      )}
    </button>
  );
}
