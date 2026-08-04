"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import InertLink from "@/components/shared/InertLink";
import { footerColumns, mainNav } from "@/data/verdon/navigation";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="-m-2.5 p-2.5 lg:hidden"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </button>

      {/* backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        /* inert keeps the off-screen panel out of the tab order and the a11y tree */
        inert={!open}
        className={`fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-sm flex-col bg-verdon-green text-white transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-6">
          <span className="font-heading text-[12px] font-semibold uppercase tracking-[0.16em]">
            Menu
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="-m-2.5 p-2.5"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="size-6"
            >
              <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 pb-10">
          <ul className="border-t border-white/15">
            {mainNav.map((item) => (
              <li key={item.label} className="border-b border-white/15">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-heading text-[15px] font-medium uppercase tracking-[0.1em]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-white/15">
              <InertLink className="block w-full py-4 font-heading text-[15px] font-medium uppercase tracking-[0.1em]">
                Explore
              </InertLink>
            </li>
          </ul>

          <ul className="mt-8 space-y-3">
            {footerColumns[1].links.slice(0, 4).map((link) => (
              <li key={link.label}>
                <InertLink className="-my-1.5 py-1.5 text-[13px] text-white/75 hover:text-white">
                  {link.label}
                </InertLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
