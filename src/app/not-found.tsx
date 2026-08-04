import type { Metadata } from "next";
import Link from "next/link";
import { demoSites } from "@/data/sites";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * Neutral 404 for anything outside a demo site's own routes. Each site keeps
 * its branded not-found for unknown catalogue pages; this one belongs to the
 * showcase shell.
 */
export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-5 bg-[#111312] px-6 py-24 text-center text-white">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
        Error 404
      </p>
      <h1 className="text-[30px] font-semibold tracking-tight md:text-[38px]">Page not found</h1>
      <p className="max-w-sm text-[13px] leading-relaxed text-neutral-400">
        This page is not part of the showcase or any of its demo sites.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        {demoSites.map((site) => (
          <Link
            key={site.slug}
            href={`/${site.slug}`}
            className="rounded-full border border-white/25 px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10"
          >
            {site.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
