"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { demoSites } from "@/data/sites";

/**
 * Floating demo chrome, not part of any storefront: a bottom-right pill that
 * switches between the demo sites.
 *
 * Rendered outside every `.site-*` wrapper, so it keeps the neutral system
 * font. Sits at z-30 — above page content, below each site's own overlays
 * (mobile nav at z-40/50, cart drawer at z-50), so it never blocks a drawer.
 *
 * z-order is not enough at the bottom edge: a site with its own sticky bottom
 * bar (ELBURG's PDP buy bar) put its primary CTA in exactly this corner, and on
 * a phone this pill covered it outright. Any such bar publishes its height as
 * `--site-bottom-bar` on the document, and the pill lifts itself clear.
 */
export default function DemoSwitcher() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const current = demoSites.find(
    (site) => pathname === `/${site.slug}` || pathname.startsWith(`/${site.slug}/`),
  );

  return (
    <div
      className="fixed right-4 z-30 flex flex-col items-end gap-2 transition-[bottom] duration-300"
      style={{ bottom: "calc(1rem + var(--site-bottom-bar, 0px))" }}
    >
      {open && (
        <nav
          aria-label="Demo sites"
          className="w-56 overflow-hidden rounded-xl bg-neutral-900/95 text-white shadow-xl ring-1 ring-white/10 backdrop-blur"
        >
          <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
            Demo sites
          </p>
          {demoSites.map((site) => (
            <Link
              key={site.slug}
              href={`/${site.slug}`}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 transition-colors hover:bg-white/10 ${
                current?.slug === site.slug ? "bg-white/5" : ""
              }`}
            >
              <span className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em]">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ background: site.accent }}
                />
                {site.name}
                {current?.slug === site.slug && (
                  <span className="ml-auto text-[10px] font-normal text-neutral-400">viewing</span>
                )}
              </span>
              <span className="mt-0.5 block pl-4 text-[11px] text-neutral-400">
                {site.category}
              </span>
            </Link>
          ))}
        </nav>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Switch demo site"
        className="flex items-center gap-2 rounded-full bg-neutral-900/95 py-2.5 pl-4 pr-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-neutral-800"
      >
        <span
          aria-hidden
          className="h-2 w-2 rounded-full"
          style={{ background: current?.accent ?? "#ffffff" }}
        />
        {current ? current.name : "Demos"}
      </button>
    </div>
  );
}
