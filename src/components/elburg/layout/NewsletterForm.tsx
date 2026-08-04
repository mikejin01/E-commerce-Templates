"use client";

import { useState } from "react";

/**
 * Demo newsletter sign-up: an underlined field with no button, as on the
 * reference. Nothing is sent anywhere.
 */
export default function NewsletterForm() {
  const [joined, setJoined] = useState(false);

  if (joined) {
    return (
      <p className="mx-auto max-w-xs text-[14px] leading-relaxed text-elburg-bone/80" role="status">
        Thanks — you are on the list. Nothing was actually sent: this is a demo site.
      </p>
    );
  }

  return (
    <form
      /* `relative` so the sr-only submit resolves against the form, not the
         viewport — see the layout traps in PLAN.md */
      className="relative mx-auto max-w-[220px]"
      onSubmit={(event) => {
        event.preventDefault();
        setJoined(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="Your email"
        aria-label="Email address"
        /* 16px below `lg` or iOS Safari zooms the page on focus — the same
           rule the checkout's controls follow */
        className="w-full border-b border-elburg-bone/40 bg-transparent pb-2 text-center text-[16px] text-elburg-bone placeholder:text-elburg-bone/60 focus:border-elburg-bone focus:outline-none lg:pb-1.5 lg:text-[14px]"
      />
      <button type="submit" className="sr-only">
        Sign up
      </button>
    </form>
  );
}
