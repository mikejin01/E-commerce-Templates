import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col items-center justify-center gap-5 px-6 py-16 text-center">
      <p className="font-heading text-[11px] font-medium uppercase tracking-[0.16em] text-elburg-ink/55">
        Error 404
      </p>
      <h1 className="font-heading text-[34px] font-bold uppercase leading-none tracking-[0.01em] md:text-[46px]">
        Nothing in this pocket
      </h1>
      <p className="max-w-sm text-[15px] leading-relaxed text-elburg-ink/70">
        This page does not exist — it may have moved, or the link may be wrong.
      </p>
      <div className="mt-2">
        <Link
          href="/elburg"
          className="inline-block bg-elburg-ink px-9 py-3.5 font-heading text-[12px] font-semibold uppercase leading-none tracking-[0.06em] text-elburg-paper transition-colors hover:bg-elburg-accent"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
