"use client";

import { useState } from "react";

/**
 * Demo newsletter sign-up. Nothing is sent anywhere — the previous markup was a
 * bare `<form action="#">`, which submits as a GET and reloads the page.
 */
export default function NewsletterForm() {
  const [joined, setJoined] = useState(false);

  if (joined) {
    return (
      <p className="max-w-xs text-[12px] leading-relaxed text-white/85" role="status">
        Thanks — you are on the list. Nothing was actually sent: this is a demo site.
      </p>
    );
  }

  return (
    <form
      className="flex max-w-xs"
      onSubmit={(event) => {
        event.preventDefault();
        setJoined(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="Enter email address"
        aria-label="Email address"
        className="w-full border border-white/40 bg-transparent px-3 py-2 text-[12px] placeholder:text-white/50 focus:border-white focus:outline-none"
      />
      <button
        type="submit"
        className="border border-l-0 border-white/40 px-4 font-heading text-[12px] font-semibold uppercase tracking-wide hover:bg-white hover:text-verdon-green"
      >
        Join
      </button>
    </form>
  );
}
