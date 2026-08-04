import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col items-center justify-center gap-5 px-6 py-16 text-center">
      <p className="font-heading text-[11px] uppercase tracking-[0.18em] text-neutral-500">
        Error 404
      </p>
      <h1 className="font-heading text-[30px] font-medium uppercase tracking-[0.04em] md:text-[38px]">
        Off the trail
      </h1>
      <p className="max-w-sm text-[13px] leading-relaxed text-neutral-500">
        This page does not exist — it may have moved, or the link may be wrong. Head back down and
        pick up the route from there.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/verdon"
          className="bg-verdon-green px-9 py-3.5 font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-verdon-green-dark"
        >
          Home
        </Link>
        <Link
          href="/verdon/collections/all"
          className="border border-verdon-green px-9 py-3.5 font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-verdon-green transition-colors hover:bg-verdon-green hover:text-white"
        >
          Shop All
        </Link>
      </div>
    </div>
  );
}
