# VERDON — outdoor & sports eyewear

Demo storefront at `/verdon`, built against **vallon.com** as the structural reference. The brand
in all shipped code and copy is **VERDON** (see the naming map below); Session 7 scrubbed every
identifying string. Status: complete, Sessions 1–8. Process rules live in `PLAN.md`.

Site folders: `src/app/verdon/`, `src/components/verdon/`, `src/data/verdon/`, `src/lib/verdon/`,
`public/images/verdon/`. Fonts: Jost (headings; stand-in for the brand's futura-pt) + Montserrat
(body). Tokens: `--color-verdon-*` in `globals.css`. Currency EUR. Catalogue: 8 frames × 3
colourways, 3 shared add-ons. Storage: `verdon-cart-v1` (localStorage), `verdon-order-v1`
(sessionStorage).

> Paths in the session notes below predate Session 8, which moved everything into the per-site
> folders — read `src/data/products.ts` as `src/data/verdon/products.ts`, image paths as
> `/images/verdon/…`, routes as `/verdon/…`, and so on.

---

## Pulling the reference

vallon.com is Shopify — the generic technique is in `PLAN.md`. Specific to this site:

| What | Where |
| --- | --- |
| Product data (title, EUR price, options, variants, media + alt text) | `https://www.vallon.com/products/<handle>.js` |
| Accessories, with prices | `https://www.vallon.com/collections/accessories/products.json?limit=250` |
| Rating + review count | `ratingValue` / `reviewCount` in the JSON-LD on `https://www.vallon.com/products/<handle>` |
| Page structure, press quotes, feature copy | the PDP HTML — sections are `section-main-product`, `section-vertical-accordion`, `section-gallery`, `section-press`, `section-double`, `section-product-reviews`, `section-product-related` |
| Images | any media `src` + `?width=1200` |

Media conventions that make the assets usable:

- **Alt text is prefixed with the colourway** (`"Dark Tortoise | Side view of …"`) — how images are
  grouped per colour. Holds across all eight products.
- **Within each colourway, slots 0–2 are studio packshots and slots 3+ are the frame being worn**,
  with an occasional what's-in-the-box or size-guide graphic last. That ordering — not the alt
  text — is what `fieldImages` and the feature rows filter on. Alt text alone is not a reliable
  classifier: several front packshots are described as "active lifestyle".
- Every reference image is square (1200×1200 packshots on off-white, 1080×1080 lifestyle), which is
  why `ProductImage` has no per-image `fit` hint.

**Any refresh from the reference must restate names on the way in** (naming map below), then re-run
the scrub grep at the bottom of this file.

**Decisions taken, so they don't get re-litigated:**

- **Prices are the Shopify base prices read as EUR** (Roamer €120 / €145 polarised, Alpine Aviators
  €90, Egret Ocean €150, …). The US storefront shows market-adjusted USD ($129/$169); ignore it.
  This supersedes the "€129 / €159" figure noted in Session 5, which came from a different capture.
- **Ratings and review counts are real**; the individual review *cards* in
  `src/data/verdon/reviews.ts` are demo-authored and attributed to invented reviewers. The homepage
  review band derives its aggregate from the catalogue, so it cannot drift from the PDPs.
- **Press quotes and outlets are both invented** (Session 7). The earlier real-quotes decision was
  about not putting invented words in a real outlet's mouth; inventing *both* halves keeps that
  intact. Outlets render as Jost wordmarks — no publication artwork ships.
- **Taglines, highlight bullets and all checkout copy are demo-authored.**
- Checkout treats prices as **VAT-inclusive** (21%, NL locale); shipping Standard free / Express
  €12; expiry is validated, card number deliberately loose (13–19 digits, no Luhn); only the last
  four card digits are ever stored.

---

## The naming map (Session 7)

`VERDON` — the Gorges du Verdon, the French alpine canyon; same French-geographic register as
"vallon", so the brand story, copy tone and six-letter wordmark carry over. Checked against
existing eyewear brands and clear; SERAC, MORAINE and COULOIR were the other finalists and are all
taken.

| Reference | Shipped | Note |
| --- | --- | --- |
| VALLON® | **VERDON®** | |
| V52® | **CLARO 52®** | Keeps the number, so the "ABBE value 52" copy still parses |
| Howlin' | **Roamer** | |
| Daytrippers | **Weekenders** | |
| Waylons | **Marlows** | |
| Heron Glacier / Heron Ocean | **Egret Glacier** / **Egret Ocean** | Egret is a heron; the two-product family survives |
| Watchtowers™ | **Lookouts™** | Same meaning, keeps the ™ |
| Ski Aviators | **Alpine Aviators** | |
| Royal Enfield Classic Edition | **Ashfell Classic Edition** | Invented marque; tagline `Ashfell × VERDON` |
| Carl ZEISS (lens partner, 18 refs) | **Helior Optics** | Invented |
| CleanHub (plastic pledge) | **Shorebound** | Invented — "Tideline" was first pick and is taken several times over |
| Topo Designs (story tile) | **Fieldgoods** | Invented |
| SportRx (prescription link) | **"Prescription Lenses"** | Partner name dropped; reads better as a link label |
| RiPel (lens coating, 4 refs) | **HydroVeil** | Found mid-session — same class of mark as V52® |
| Arlo → **Sable**; Elmore & Ella → **Wren & Lark** | | Blog-tile product names; asset files renamed to match |

All invented partner names were checked against real optics/outdoor companies and are clear.

---

## Build history

- **Session 1 — Scaffold**: Next.js (TS, Tailwind v4, App Router, pnpm), tokens, fonts, assets,
  `AnnouncementBar`/`Header`/`Footer`.
- **Session 2 — Homepage**: all eight bands + responsive pass.
- **Session 3 — Catalogue, PDP & cart**: `products.ts`, PDP, cart store/context + drawer, `/cart`,
  `/collections/all`.
- **Session 4 — Checkout & polish**: two-column checkout, confirmation with mock order number,
  empty states, 404, metadata.
- **Session 5 — PDP grid blowout**: the `minmax(0, …)` fix (now standing rule 5 in `PLAN.md`).
- **Session 6 — PDP rebuilt against the reference**: real per-colourway media (115 images across
  8 × 3), real prices/ratings, full PDP anatomy (gallery, buy column, specs, lifestyle rail, press
  band, feature rows, reviews, related + extras), cart line grew `lens` + `addOns` keyed by
  `lineKey()`, link containment via `InertLink`. 70-assertion browser pass.
- **Session 7 — Rebrand VALLON → VERDON**: the naming map above, logo and features headline
  replaced with live Jost type, invented press band, storage keys bumped, 76-assertion pass.
- **Session 8 — Converted to showcase**: everything moved into per-site folders, routes under
  `/verdon`, tokens `brand-*` → `verdon-*`, fonts scoped via `.site-verdon`, Verdon layout became
  a nested layout (root shell is now the neutral showcase: landing page, `DemoSwitcher`, neutral
  404 + icon), docs split into `PLAN.md` (playbook) / `SITES.md` (registry) / this file.
  `pnpm build` (18 routes) + `pnpm lint` clean; browser harness re-run against the production
  build — see the session note.

---

## QA specifics

Run the generic harness in `PLAN.md` against `/verdon`. Site facts it asserts: catalogue is **8
products** and the listing count label agrees; PDP section headings are Specs & Materials, In the
field, As seen in, the three feature rows (OPTICS / PERFORMANCE / FIT), reviews, You might also
like + Extras; colourway swap drives the gallery; lens (Standard/Polarised) changes the price;
add-ons change the CTA total and reach the cart line unmerged.

### The scrub grep

After any content refresh, this must return nothing:

```
grep -rniIE "vallon|\bvln\b|\bv52\b|royal.?enfield|zeiss|cleanhub|topo.?designs|sportrx|ripel|howlin|waylons|daytrippers|watchtowers|heron|\barlo\b|\belmore\b" src public
```

The `\b` on the short terms matters: without it **"Marlows" contains "arlo"** and the scrub reports
a false hit on every page that lists the catalogue. Run it over `src` and `public` only — the docs
(`SITES.md`, this file) keep the provenance notes on purpose, and neither is served. The grep
cannot catch binary artwork; also assert that no logo/press/headline PNGs exist under
`public/images/verdon/` (`brand/`, `features/eyewear-made.png` and `press/*.png` were deleted in
Session 7). Then a shape-grep for new marks: `®`/`™` suffixes and interior-capital words.

---

## Session notes

- 2026-07-31 (Session 8): Converted the repo to a multi-site showcase; Verdon is the first entry.
  The mechanical half was one ordered `perl` pass (imports → routes → image paths → tokens) after
  `mv`-ing the folder sets — the repo still has no commits, so plain `mv`. Route links got the
  `/verdon` prefix as *string* rules (`"/collections/all"` catches both JSX `href` and
  `navigation.ts` data; `href="/"` had to stay JSX-anchored so it could not touch `.join("/")`-style
  code). Three things worth keeping: **(a)** `font-family` inherits as a computed value, so the
  `.site-verdon` wrapper must re-state `font-family: var(--font-sans)` or the body font silently
  stays the root fallback — promoted to a layout trap in `PLAN.md`. **(b)** The `DemoSwitcher`
  sits at z-30, deliberately *below* the site's mobile nav (z-40/50) and cart drawer (z-50):
  demo chrome must never cover a drawer. **(c)** A nested `not-found.tsx` only catches `notFound()`
  thrown inside its segment — unmatched URLs under `/verdon/*` fall through to the root 404, which
  is why the root 404 links every registered demo. Verdon's `icon.svg` moved into
  `src/app/verdon/` (App Router serves nested route icons), and the root got a neutral tile-grid
  mark so the showcase never wears a brand's favicon. QA also caught a Session 7 escapee:
  `createOrderNumber` still returned **`VLN-…`** — an abbreviation of the original brand, which the
  scrub grep cannot see because "VLN" does not contain "vallon". Now `VRD-…`, and the grep gained
  `\bvln\b`; initialisms of the original brand are a third shape the scrub misses, alongside
  `®`/`™` marks and binary artwork. 85/85 harness assertions against the production build (18
  routes), build + lint clean.
- 2026-07-31 (Session 7): Rebranded VALLON → **VERDON**. The mechanical half went in one `perl`
  pass over `src/**/*.{ts,tsx}` — 26 ordered rules, longest match first, so `Royal Enfield Classic
  Edition` resolves before `Royal Enfield`, and the lowercase slug rules (`howlin` → `roamer`) run
  after the capitalised copy rules. The eight `public/images/products/` folders and three story
  assets were moved to match by hand (`git mv` unavailable — no commits, everything untracked).
  Three things the plan did not anticipate. **(a) Two more proprietary marks existed**: `RiPel`,
  the lens coating (4 refs), the same class of trademark as V52®, and `SportRx` on the PDP buy
  column. Found by grepping for the *shape* of the problem — `®`/`™` suffixes and interior-capital
  words — rather than for known strings, which is the check worth repeating after any copy refresh.
  **(b) "Tideline", the first pick for the CleanHub stand-in, is itself taken** several times over —
  replacing one real company with another is a net loss, so it became **Shorebound**. Ashfell,
  Helior, Fieldgoods and Shorebound were all checked and are clear. **(c) The scrub grep gives a
  false positive on `arlo`** ("Marlows" contains it) — the short terms need `\b`. The logo swap
  could not be a string edit: `logo-white.png` and `eyewear-made.png` were typographic artwork,
  both now live Jost text (`Header` no longer imports `next/image` at all). Two type details: the
  header wordmark needs `-mr-[0.2em]` to cancel the trailing letter-space or it sits visibly left
  of centre, and the features `h2` must **not** carry a `max-w` — with the explicit `<br />`
  already setting two lines, a width cap wraps "the Verdon way" a second time. Both were caught by
  screenshotting the bands, not by the assertions. `press.ts` lost its `logo` field; outlets render
  as Jost wordmarks. `pnpm build` (16 routes) + `pnpm lint` clean, 76/76 browser assertions. One QA
  trap: rebuilding while `next start` runs leaves the old server serving a deleted chunk manifest —
  every stylesheet 404s as a **500** and screenshots come back unstyled. `pkill -f "next start"`
  did not match; `kill -9 $(lsof -ti:3101)` did.
- 2026-07-31 (Session 6): PDP rebuilt against the reference, and the catalogue restated with it.
  The audit that started the session found three things worth recording. **(a) Product copy did
  not match the photography** — Howlin' was described as a round keyhole frame and Waylons as a
  flat-brow navigator, when the packshots are the other way round; Royal Enfield's specs claimed
  stainless steel over an all-acetate frame. **(b) The PDP galleries claimed lifestyle photos were
  of the product when they were not** — one showed a **Madson**-branded competitor frame, and the
  Royal Enfield collab page used a shot of a **Harley-Davidson**. Rather than rewrite the alt text,
  the fix was to pull the real per-colourway media from Shopify, which also gave real names,
  prices, ratings and swatch colours. **(c) Every footer/social/story link was `href="#"`** and the
  Instagram grid opened instagram.com in a new tab; the newsletter form submitted as a GET and
  reloaded the page. All now route through `InertLink` / `NewsletterForm`. Two structural fixes:
  the cart line grew `lens` and `addOns` and is keyed by `lineKey()` (storage bumped to
  `vallon-cart-v2` — every colourway was renamed, v1 lines can no longer resolve), and
  **`StarRating` got `relative` on its root** so its `sr-only` span can never resolve against the
  viewport and widen the document. The 390px grid blowout (standing rule) was found by this
  session's harness — fixed with `minmax(0,1fr)` at the base breakpoint, dropping `truncate` from
  the add-on blurb, and `min-w-0` on the gallery. Swatch colours were assigned by eye from a
  contact sheet of all 24 front packshots — two rounds of automated sampling were unreliable,
  because the lens dominates the frame by area and mirror coatings read as the frame colour.
  70/70 assertions against the production build.
- 2026-07-31 (Session 5): Client flagged the PDP as broken with no way to add to cart, and was
  right — `lg:grid-cols-[1.15fr_0.85fr]` was blowing out. Bare `fr` tracks carry
  `min-width: auto`, so the gallery's intrinsic size forced the columns to 1561px + 220px inside a
  1440px container at every ≥`lg` width. Fixed with `minmax(0, …)` on both tracks and `min-w-0` on
  the gallery's flex child. Underneath it: a flex row's default `align-items: stretch` **overrides
  `aspect-ratio`**, so the gallery frame stretched — fixed with `lg:items-start`. Why three
  sessions of QA missed it: responsive passes stopped at 1440, and Playwright auto-scrolls before
  clicking, so an off-screen control still passed.
- 2026-07-31 (Session 4): Checkout, confirmation and polish. `order-store.ts` mirrors
  `cart-store.ts` — framework-free, read through `useSyncExternalStore` — but on **sessionStorage**:
  a placed order belongs to the tab that placed it. Only the last four card digits are stored;
  nothing leaves the browser. Card validation deliberately loose, expiry checked against the
  current month. Prices VAT-inclusive (21%, NL locale). Shipping Standard (free, 3–5 days) /
  Express (€12, 1–2 days); the confirmation quotes a window from `addWorkingDays`. `CheckoutForm`'s
  guard order is `!hydrated → placing → empty → form`; the "Placing your order" panel exists so
  clearing the cart before `router.push` cannot flash the empty-cart state. Two visual-QA bugs:
  switching billing back to "same as delivery" left `billing.*` errors for fields that no longer
  existed, and the summary tint sat on the panel rather than the column. The `:focus-visible` ring
  must live in `@layer base`. The site sends `robots: noindex`.
- 2026-07-31 (Session 3): PDP, cart and Shop All. Shell moved into the layout —
  `AnnouncementBar`/`Header`/`Footer`/`CartDrawer` wrap every route inside `<CartProvider>`, and
  metadata gained the `%s | VALLON®` template. Cart state split in two: a framework-free
  localStorage store + a thin provider over `useSyncExternalStore` — forced by the React Compiler
  rule `react-hooks/set-state-in-effect`, which rejects reading localStorage in a `useEffect`;
  cross-tab sync via the `storage` event fell out for free. Only line identity is persisted —
  price, name and imagery resolve from the catalogue on read. `loaded`/`hydrated` stops the header
  badge and `/cart` flashing between server render and the localStorage read. Off-screen drawers
  use React 19's `inert` prop.
- 2026-07-31 (Session 2): All eight homepage bands + responsive pass. `formatPrice` uses a fixed
  `en-IE` locale so server/client strings match. `StarRating` fills fractionally via a clipped
  overlay. Two layout bugs found in QA: **`sr-only` is `position:absolute`** and escaped the
  carousel's overflow clip (962px of horizontal scroll) — fixed with `relative` on the container;
  and `snap-mandatory` snapped the first card past the rail's left gutter — fixed with
  `scroll-pl-6 lg:scroll-pl-16`. The white PNGs in `features/` and `press/` only read on the dark
  bands; `eyewear-made.png` *was* the features headline (replaced with live text in Session 7).
- 2026-07-30 (Session 1): Scaffolded via `create-next-app` into `vallon-demo/` then moved to root
  (npm name restrictions vs. the directory capitalisation). pnpm v11 build approvals for
  `sharp`/`unrs-resolver` are in `pnpm-workspace.yaml`. Instagram grid uses the site's own
  lifestyle photos as stand-ins — the real IG feed loads from Instagram's CDN at runtime and is not
  scrapeable.
