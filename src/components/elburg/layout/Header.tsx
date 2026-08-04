"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import InertLink from "@/components/shared/InertLink";
import BrandMark from "@/components/elburg/layout/BrandMark";
import NavDrawer from "@/components/elburg/layout/NavDrawer";
import CartButton from "@/components/elburg/cart/CartButton";
import { mainNav, utilityNav } from "@/data/elburg/navigation";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-5">
      <circle cx="10.75" cy="10.75" r="6.25" />
      <path d="m15.5 15.5 4.5 4.5" strokeLinecap="round" />
    </svg>
  );
}

function UsFlag() {
  return (
    <svg viewBox="0 0 24 16" className="h-3 w-[18px] rounded-[2px]" aria-hidden>
      <rect width="24" height="16" fill="#b22234" />
      {[1, 3, 5, 7, 9, 11].map((i) => (
        <rect key={i} y={i * 1.23} width="24" height="1.23" fill="#ffffff" />
      ))}
      <rect width="10" height="8.6" fill="#3c3b6e" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-6">
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  /** the reference swaps the wordmark for the compact mark once the page moves */
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = useCallback((index: number) => {
    setMenuIndex(index);
    setOpen(true);
  }, []);

  return (
    <>
      {/* z-40 keeps the site chrome above the showcase DemoSwitcher (z-30) and
          below the nav drawer (z-50), matching VERDON */}
      <header className="sticky top-0 z-40 border-b border-elburg-ink/10 bg-elburg-paper text-elburg-ink">
        {/* Three tracks so the wordmark stays optically centred whatever the
            side columns hold. minmax(0,…) on every track — standing rule 5. */}
        <div className="grid h-[54px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-5 lg:h-[50px] lg:px-6">
          <div className="flex min-w-0 items-center gap-6">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => openMenu(0)}
              className="lg:hidden"
            >
              <BurgerIcon />
            </button>
            <nav className="hidden items-center gap-6 lg:flex">
              {mainNav.map((item, i) => (
                <button
                  key={item.label}
                  type="button"
                  aria-expanded={open && menuIndex === i}
                  onClick={() => openMenu(i)}
                  className="font-heading text-[12px] font-medium uppercase leading-none tracking-[0.04em] hover:text-elburg-accent"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <Link
            href="/elburg"
            aria-label="ELBURG home"
            className="flex items-center justify-center hover:text-elburg-accent"
          >
            {scrolled ? (
              <BrandMark className="size-7" />
            ) : (
              /* set in Barlow Condensed rather than artwork, so no logo asset
                 ships; -mr offsets the trailing letter-space to optically centre */
              <span className="-mr-[0.14em] block font-heading text-[21px] font-bold uppercase leading-none tracking-[0.14em]">
                Elburg
              </span>
            )}
          </Link>

          <div className="flex min-w-0 items-center justify-end gap-5">
            <nav className="hidden items-center gap-5 lg:flex">
              {utilityNav.map((item) => (
                <InertLink
                  key={item.label}
                  className="font-heading text-[12px] font-medium uppercase leading-none tracking-[0.04em] hover:text-elburg-accent"
                >
                  {item.label}
                </InertLink>
              ))}
            </nav>
            <button
              type="button"
              aria-label="Change locale"
              title="Not part of this demo"
              className="hidden cursor-default lg:block"
            >
              <UsFlag />
            </button>
            <button
              type="button"
              aria-label="Search"
              title="Not part of this demo"
              className="cursor-default hover:text-elburg-accent"
            >
              <SearchIcon />
            </button>
            <CartButton />
          </div>
        </div>
      </header>

      <NavDrawer
        open={open}
        onClose={() => setOpen(false)}
        menuIndex={menuIndex}
        onMenuChange={setMenuIndex}
      />
    </>
  );
}
