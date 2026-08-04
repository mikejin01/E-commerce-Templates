"use client";

import { useCart } from "@/lib/verdon/cart-context";

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-5">
      <path d="M5.5 8h13l-1 12.5h-11L5.5 8Z" strokeLinejoin="round" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" strokeLinecap="round" />
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
      aria-label={showBadge ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Cart"}
      className="-m-2.5 p-2.5 hover:opacity-75"
    >
      {/* the badge anchors to this span, not the padded button box */}
      <span className="relative block">
        <CartIcon />
        {showBadge && (
          <span className="absolute -right-1.5 -top-1 flex min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold leading-4 text-verdon-green">
            {count}
          </span>
        )}
      </span>
    </button>
  );
}
