import Link from "next/link";
import InertLink from "@/components/shared/InertLink";
import MobileNav from "@/components/verdon/layout/MobileNav";
import CartButton from "@/components/verdon/cart/CartButton";
import { mainNav } from "@/data/verdon/navigation";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" strokeLinecap="round" />
    </svg>
  );
}

function DutchFlag() {
  return (
    <svg viewBox="0 0 24 16" className="h-3 w-[18px] rounded-[2px]">
      <rect width="24" height="16" fill="#21468b" />
      <rect width="24" height="10.67" fill="#ffffff" />
      <rect width="24" height="5.33" fill="#ae1c28" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-verdon-green text-white">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center px-4 lg:px-8">
        {/* Left: mobile hamburger / desktop nav */}
        <div className="flex flex-1 items-center gap-6">
          <MobileNav />
          <nav className="hidden items-center gap-6 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-heading text-[12px] font-medium uppercase tracking-[0.12em] hover:opacity-75"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center: wordmark. Set in Jost rather than artwork, so there is no logo asset to ship. */}
        <Link
          href="/verdon"
          aria-label="VERDON home"
          className="-my-3 shrink-0 py-3 font-heading text-[19px] font-semibold uppercase leading-none tracking-[0.2em] hover:opacity-75"
        >
          {/* -mr compensates for the trailing letter-space, so the mark optically centres */}
          <span className="-mr-[0.2em] block">Verdon</span>
        </Link>

        {/* Right: explore, locale, search, cart */}
        <div className="flex flex-1 items-center justify-end gap-5">
          <InertLink className="hidden font-heading text-[12px] font-medium uppercase tracking-[0.12em] hover:opacity-75 lg:block">
            Explore
          </InertLink>
          <button
            aria-label="Change locale"
            title="Not part of this demo"
            className="hidden items-center gap-1.5 hover:opacity-75 lg:flex"
          >
            <DutchFlag />
            <svg viewBox="0 0 12 8" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m1.5 2 4.5 4 4.5-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* -m + p trades no layout for a finger-sized hit area on the icon */}
          <button aria-label="Search" title="Not part of this demo" className="-m-2.5 p-2.5 hover:opacity-75">
            <SearchIcon />
          </button>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
