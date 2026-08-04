/**
 * The demo-site registry that ships to the browser: the floating DemoSwitcher
 * renders from this list, and the home page redirects to the FIRST entry —
 * order decides which demo greets a visitor.
 *
 * Docs-only facts — reference URLs, build status, session history — live in
 * `SITES.md` / `sites/<slug>.md` and must never appear here: nothing shipped
 * names a real company.
 */

export type DemoSite = {
  /** route prefix: the demo lives under `/<slug>` */
  slug: string;
  /** wordmark as rendered in the switcher */
  name: string;
  category: string;
  tagline: string;
  /** brand accent dot shown in the switcher */
  accent: string;
};

export const demoSites: DemoSite[] = [
  {
    slug: "verdon",
    name: "VERDON",
    category: "Outdoor & sports eyewear",
    tagline: "Classic alpine style meets performance eyewear.",
    accent: "#173c37",
  },
  {
    slug: "elburg",
    name: "ELBURG",
    category: "Card-protecting wallets & pocket carry",
    tagline: "Industrial design in your pocket. Made in Europe, built to last.",
    accent: "#5c5648",
  },
];
