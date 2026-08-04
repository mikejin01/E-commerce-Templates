"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InertLink from "@/components/shared/InertLink";
import BrandMark from "@/components/elburg/layout/BrandMark";
import { mainNav, utilityNav, type NavGroup, type NavMenu } from "@/data/elburg/navigation";

/**
 * The reference's navigation is a left-hand drawer, not a full-width mega menu
 * (see `sites/reference/elburg/nav-shop-desktop.png`). On desktop it is two
 * columns: the menu's own entries, and — for SHOP, the only menu with panels —
 * the selected panel's link groups sliding in beside them. On mobile the same
 * drawer goes full width and SHOP's panels are hoisted to the top level, so
 * every section is one tap deep.
 */

function ChevronRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-6">
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

function UsFlag() {
  return (
    <svg viewBox="0 0 24 16" className="h-3 w-[18px] shrink-0 rounded-[2px]" aria-hidden>
      <rect width="24" height="16" fill="#b22234" />
      {[1, 3, 5, 7, 9, 11].map((i) => (
        <rect key={i} y={i * 1.23} width="24" height="1.23" fill="#ffffff" />
      ))}
      <rect width="10" height="8.6" fill="#3c3b6e" />
    </svg>
  );
}

/** One group of links: a serif heading, then condensed caps items.
 *
 *  An entry with an `href` is a destination this demo actually builds and gets
 *  a real `Link`; everything else stays an `InertLink` (standing rule 3). Phase
 *  3 turned the eight model entries and "See all wallets" into the former. */
function LinkGroup({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  /* `-my-1.5 py-1.5` pads each entry to ~27px without changing the list's
     rhythm: the negative margin cancels the padding, so the hit areas grow into
     the `space-y-3` gaps and meet rather than overlap. */
  const itemClass = `-my-1.5 block py-1.5 font-heading font-medium uppercase leading-none tracking-[0.02em] hover:text-elburg-accent ${
    group.small ? "text-[12px]" : "text-[15px]"
  }`;
  return (
    <div className="mb-7 last:mb-0">
      {group.heading ? (
        <p className="mb-3 text-[13px] leading-snug text-elburg-ink/55">{group.heading}</p>
      ) : null}
      <ul className="space-y-3">
        {group.items.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <Link href={item.href} onClick={onNavigate} className={itemClass}>
                {item.label}
              </Link>
            ) : (
              <InertLink className={itemClass}>{item.label}</InertLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Groups({ groups, onNavigate }: { groups: NavGroup[]; onNavigate: () => void }) {
  return (
    <>
      {groups.map((group, i) => (
        <LinkGroup key={group.heading ?? `lead-${i}`} group={group} onNavigate={onNavigate} />
      ))}
    </>
  );
}

function Stories({ menu }: { menu: NavMenu }) {
  if (!menu.stories) return null;
  return (
    <div className="mt-2">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <p className="text-[13px] text-elburg-ink/55">{menu.stories.heading}</p>
        <InertLink className="-my-1.5 shrink-0 py-1.5 text-[13px] underline underline-offset-4 hover:text-elburg-accent">
          See all
        </InertLink>
      </div>
      <ul className="space-y-4">
        {menu.stories.items.map((story) => (
          <li key={story.title}>
            <InertLink className="flex w-full min-w-0 items-center gap-4 hover:text-elburg-accent">
              <span className="relative block h-[48px] w-[72px] shrink-0 overflow-hidden bg-elburg-bone">
                <Image src={story.image} alt={story.alt} fill sizes="72px" className="object-cover" />
              </span>
              <span className="min-w-0 text-[14px] leading-snug">{story.title}</span>
            </InertLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NavDrawer({
  open,
  onClose,
  menuIndex,
  onMenuChange,
}: {
  open: boolean;
  onClose: () => void;
  /** which top-level menu the header opened, or -1 for the mobile burger */
  menuIndex: number;
  onMenuChange: (index: number) => void;
}) {
  /** desktop: which of SHOP's panels is expanded into column two */
  const [panelIndex, setPanelIndex] = useState<number | null>(null);
  /** mobile: which flattened section is showing */
  const [mobileSection, setMobileSection] = useState<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  /* Switching menus, or reopening the drawer, collapses both columns back to
     their index. Adjusted during render rather than in an effect: an effect
     would paint the stale column first and then cascade a second render. */
  const [lastOpened, setLastOpened] = useState({ menuIndex, open });
  if (lastOpened.menuIndex !== menuIndex || lastOpened.open !== open) {
    setLastOpened({ menuIndex, open });
    setPanelIndex(null);
    setMobileSection(null);
  }

  const menu = mainNav[Math.max(menuIndex, 0)];
  const panels = menu.panels;

  /** Mobile hoists SHOP's panels to the top level, so every section is one tap deep. */
  const mobileSections: { label: string; groups: NavGroup[]; menu: NavMenu }[] = [
    ...(mainNav[0].panels ?? []).map((panel) => ({
      label: panel.label,
      groups: panel.groups,
      menu: mainNav[0],
    })),
    ...mainNav.slice(1).map((item) => ({
      label: item.label,
      groups: item.groups ?? [],
      menu: item,
    })),
  ];
  const activeMobile = mobileSection === null ? null : mobileSections[mobileSection];

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-40 bg-elburg-ink/45 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        /* inert keeps the closed panel out of the tab order and the a11y tree */
        inert={!open}
        className={`fixed inset-y-0 left-0 z-50 flex w-full bg-elburg-paper text-elburg-ink shadow-[0_0_40px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out sm:w-[320px] lg:w-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ——— desktop: column one ——— */}
        <div className="hidden w-[320px] shrink-0 flex-col lg:flex">
          <div className="flex h-[50px] shrink-0 items-center gap-6 px-6">
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              /* padded hit area, negative margin so the icon stays put */
              className="-m-2.5 -ml-3.5 p-2.5"
            >
              <CloseIcon />
            </button>
            {mainNav.map((item, i) => (
              <button
                key={item.label}
                type="button"
                onClick={() => onMenuChange(i)}
                aria-current={i === menuIndex ? "true" : undefined}
                className={`font-heading text-[12px] font-medium uppercase leading-none tracking-[0.04em] hover:text-elburg-accent ${
                  i === menuIndex ? "underline underline-offset-[5px]" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-10">
            {panels ? (
              <>
                <ul className="space-y-4">
                  {panels.map((panel, i) => (
                    <li key={panel.label}>
                      <button
                        type="button"
                        onClick={() => setPanelIndex(panelIndex === i ? null : i)}
                        aria-expanded={panelIndex === i}
                        className={`font-heading text-[17px] font-semibold uppercase leading-none tracking-[0.02em] hover:text-elburg-accent ${
                          panelIndex === i ? "underline underline-offset-[6px]" : ""
                        }`}
                      >
                        {panel.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <ul className="mt-10 space-y-3">
                  {utilityNav.map((item) => (
                    <li key={item.label}>
                      <InertLink className="font-heading text-[12px] font-medium uppercase leading-none tracking-[0.04em] hover:text-elburg-accent">
                        {item.label}
                      </InertLink>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <Groups groups={menu.groups ?? []} onNavigate={onClose} />
                <Stories menu={menu} />
              </>
            )}
          </div>

          <div className="shrink-0 px-6 pb-8">
            <BrandMark className="size-8" />
          </div>
        </div>

        {/* ——— desktop: column two, SHOP's selected panel ——— */}
        {panels && panelIndex !== null ? (
          <div className="hidden w-[310px] shrink-0 overflow-y-auto border-l border-elburg-ink/12 px-6 pb-10 pt-[60px] lg:block">
            <Groups groups={panels[panelIndex].groups} onNavigate={onClose} />
          </div>
        ) : null}

        {/* ——— mobile ——— */}
        <div className="flex min-w-0 flex-1 flex-col lg:hidden">
          <div className="flex h-[54px] shrink-0 items-center justify-between border-b border-elburg-ink/10 px-5">
            {activeMobile ? (
              <button
                type="button"
                onClick={() => setMobileSection(null)}
                className="-m-2.5 flex items-center gap-2 p-2.5 font-heading text-[13px] font-semibold uppercase tracking-[0.04em]"
              >
                <ChevronRight className="size-4 rotate-180" />
                Back
              </button>
            ) : (
              <BrandMark className="size-7" />
            )}
            <button type="button" aria-label="Close menu" onClick={onClose} className="-m-2.5 p-2.5">
              <CloseIcon />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-8">
            {activeMobile ? (
              <>
                <Groups groups={activeMobile.groups} onNavigate={onClose} />
                <Stories menu={activeMobile.menu} />
              </>
            ) : (
              <>
                <ul className="space-y-1">
                  {mobileSections.map((section, i) => (
                    <li key={section.label}>
                      <button
                        type="button"
                        onClick={() => setMobileSection(i)}
                        /* py-3.5 makes each section row a 44px tap target —
                           these are the drawer's whole job on a phone */
                        className="flex w-full items-center justify-between gap-4 py-3.5 text-left font-heading text-[16px] font-semibold uppercase leading-none tracking-[0.02em]"
                      >
                        {section.label}
                        <ChevronRight className="size-5 shrink-0" />
                      </button>
                    </li>
                  ))}
                </ul>
                <ul className="mt-10 space-y-3.5">
                  {utilityNav.map((item) => (
                    <li key={item.label}>
                      <InertLink className="-my-1.5 block w-full py-1.5 font-heading text-[12px] font-medium uppercase leading-none tracking-[0.04em]">
                        {item.label}
                      </InertLink>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="shrink-0 border-t border-elburg-ink/10 px-5 py-5">
            <button
              type="button"
              title="Not part of this demo"
              className="-m-2 flex cursor-default items-center gap-2 p-2 text-[13px]"
            >
              <UsFlag />
              <span>USA</span>
              <span aria-hidden className="text-elburg-ink/35">
                |
              </span>
              <span>English</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
