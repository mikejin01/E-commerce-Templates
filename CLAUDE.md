# Commerce Demo Showcase

One repo, several self-contained e-commerce demo storefronts. Each demo recreates a real reference
site's design under a **fictional brand**, with a mock shopping flow (home → listing → PDP → cart →
checkout). Private client demos — not for public deployment, and `robots: noindex` is set at the
root.

**The three docs, and who owns what:**

- `SITES.md` — the registry: which demos exist, their reference sites, and status. Start here.
- `PLAN.md` — the reusable playbook: standing rules, build phases, reference-pulling, QA. It is
  stateless — never write progress into it, but do promote generalizable lessons into it.
- `sites/<slug>.md` — one per demo: naming map, decisions, progress checklists, session notes.

Reference-site URLs and provenance live **only** in those docs, which are never served. Nothing in
`src/` or `public/` may name a real company — see standing rule 2 in `PLAN.md`.

## Repo layout — one folder set per site

Everything brand-specific lives under the site's slug; the root shell is neutral showcase chrome.

```
src/app/<slug>/            routes: layout (fonts/shell/metadata), page, collections/all,
                           products/[slug], cart, checkout(+confirmation), not-found, icon.svg
src/components/<slug>/     {layout,home,product,cart,checkout}/ — one component per file, PascalCase
src/components/shared/     neutral chrome only: InertLink, DemoSwitcher
src/data/<slug>/           static catalogue + copy (products, home, press, reviews, navigation)
src/data/sites.ts          the browser-facing site registry (switcher + home redirect) — no real names
src/lib/<slug>/            cart/order stores, checkout logic, formatting
public/images/<slug>/      the site's image assets — private demo use only
sites/<slug>.md            the site's doc
sites/reference/<slug>/    design screenshots of the reference site (user-provided + captured) —
                           the build-against artifact; never served
```

Sites never import from each other's folders. New sites copy the `verdon` folder set as the
template and adapt — the shapes (cart line, data model) are brand-specific by design, so there is
no shared store/catalogue abstraction.

The root shell (`src/app/layout.tsx`, `page.tsx`, `not-found.tsx`) is the showcase: there is no
menu page — `/` redirects to the first demo in `src/data/sites.ts`, and visitors move between
demos with the floating `DemoSwitcher` (bottom-right, z-30 — below every site's drawers). Per-site theming: `--color-<slug>-*` tokens under `@theme` in
`src/app/globals.css`, and font roles resolved through the `.site-<slug>` wrapper class (see the
layout-traps section of `PLAN.md` for why).

## Stack (all demos)

- **Next.js (App Router)** + **TypeScript** + **Tailwind CSS v4**; React Compiler enabled
- Package manager: **pnpm** (build approvals live in `pnpm-workspace.yaml`)
- No database, auth, or payments — catalogues are static data; carts are React Context +
  `localStorage` (`<slug>-cart-v1`), orders `sessionStorage` (`<slug>-order-v1`); nothing leaves
  the browser
- Fonts per site via `next/font/google`, loaded in the site's own layout

## Planned production stack (do NOT add during demo stage)

When a demo graduates: **Better Auth** (self-hosted), **Neon** (serverless Postgres), **Drizzle
ORM**, **Stripe**.

## Conventions

- Pages are server components by default; `"use client"` only where interactivity requires it
  (cart, carousels, drawers)
- Run `pnpm dev` to develop, `pnpm build` to verify before ending a work session

### Two rules that are easy to break

- **Each site has exactly five routes under its prefix** (`/<slug>`, `/<slug>/collections/all`,
  `/<slug>/products/[slug]`, `/<slug>/cart`, `/<slug>/checkout` + confirmation). Everything else
  the reference links to renders as `InertLink`, which navigates nowhere. No `href="#"`, no
  external links, no cross-site links — only the showcase chrome navigates between sites.
- **Every grid track needs `minmax(0, …)` at every breakpoint**, plus `min-w-0` on flex children
  holding scroll rails or long strings. An `auto`/bare-`fr` track sizes to its items' min-content
  and will silently push content off-screen — this has caused two separate regressions. See
  `PLAN.md`.

## Multi-session workflow

- **Add a demo**: open with "Add a new demo site: `<reference-url>`" **plus design screenshots**
  (homepage + a product page minimum) → `PLAN.md` Phase 0. Both inputs are required — ask before
  starting if either is missing.
- **Continue a demo**: check `SITES.md` for status, then the site's `sites/<slug>.md`.
- End of each session: update the site's checklist + session notes in `sites/<slug>.md` and its
  status row in `SITES.md`; promote any generalizable lesson into `PLAN.md`.
