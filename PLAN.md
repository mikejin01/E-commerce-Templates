# Demo-Site Playbook

How a demo storefront gets built in this repo. **This file is stateless and reusable** — it holds
the process and the rules, never progress. What exists and where each site stands lives in
`SITES.md`; each site's history, naming map and decisions live in `sites/<slug>.md`. See `CLAUDE.md`
for the repo structure and stack.

A session that builds or extends a site starts by reading this file, `SITES.md`, and the site's
`sites/<slug>.md`.

---

## Standing rules

These were learned the hard way (mostly on VERDON — see `sites/verdon.md` for the stories). Read
them before starting work on any site.

**1. Reference first, invention never.** For any page we recreate, pull the real page and build
against it section by section. Do not design from memory — an invented PDP turned out to be about a
fifth of the real page, which cost a full session to redo.

**2. The brand is invented before the catalogue is imported.** Nothing shipped names a real company:
brand, product names, partner companies, press outlets and proprietary marks (`®`/`™` suffixes,
interior-capital words like `RiPel`) are all restated on the way in, per the site's naming map in
`sites/<slug>.md`. Verify each invented name is not itself a real company in the same industry —
replacing one real company with another is a net loss. Structure, prices, media and page anatomy
follow the reference; names never do. VERDON did this as a retrofit (165 renames, eight folder
moves, a storage-key bump); doing it in Phase 0 is why Phase 0 exists.

**3. Each site has exactly five routes**, under its prefix: `/<slug>`, `/<slug>/collections/all`,
`/<slug>/products/[slug]`, `/<slug>/cart`, `/<slug>/checkout` (+ confirmation). Every other
destination the reference site links to renders as `InertLink` — a `<button>` that navigates
nowhere. Nothing links off-site and nothing links across demo sites; a bare `href="#"` is not
acceptable (it scrolls to the top and pushes a history entry, which reads as broken). The one
exception is the showcase chrome — the `DemoSwitcher` (there is no landing page; `/` redirects to
the first registered demo) — which is the only thing that navigates between sites.

**4. The catalogue stays small.** VERDON is eight frames, three colourways each, three shared
add-ons. Set a cap of that order for each site and resist growing it — this is a demo, not a store.

**5. Every grid track gets `minmax(0, …)`, at every breakpoint.** An `auto` or bare-`fr` track
sizes itself to its items' *min-content*, which can be far wider than the container. This has bitten
twice: once at `lg` (a gallery pushed ADD TO CART to x=2055 on a 1920 screen) and once at the base
breakpoint (a single `truncate` class whose `white-space: nowrap` min-content propagated up and
sized the whole grid at 517px inside a 390px viewport). Pair it with `min-w-0` on flex children
that contain scroll rails or long strings.

**6. Responsive QA covers ≥1920 and 2560, on every key page.** The Session 3 blowout was invisible
at ≤1440 and survived two sessions of QA. An element-level Playwright assertion is not enough:
`click()` auto-scrolls to the element, so an off-screen control still passes. Assert the element's
rect against the viewport, and assert document overflow.

**7. Sites do not share brand code.** Everything brand-specific lives in the site's own folders
(`src/app/<slug>`, `src/components/<slug>`, `src/data/<slug>`, `src/lib/<slug>`,
`public/images/<slug>`). `src/components/shared/` is only for neutral chrome (`InertLink`,
`DemoSwitcher`); nothing in one site's folders imports from another site's. When a new site needs
cart/checkout plumbing, copy VERDON's `src/lib/verdon/` and adapt it — the line shape (colour, lens,
add-ons) is brand-specific, so a shared abstraction would be the wrong altitude.

**8. Lessons get promoted.** When a session learns something that would bite any site, it becomes a
standing rule or a layout trap in this file. Site-specific detail stays in `sites/<slug>.md`. This
file only grows rules, never state.

**9. The build is a static export (GitHub Pages).** `output: "export"` with a base path from
`NEXT_PUBLIC_BASE_PATH`, deployed by `.github/workflows/deploy.yml`. Consequences for every site:
no server-side `searchParams` (ELBURG's `?colour=` broke the export — read the query client-side
after mount instead), no route handlers, no middleware. `next/image` srcs get the base path from
`src/lib/image-loader.ts` automatically, but any *hand-written* URL that bypasses the router or
loader (raw `<img>`, CSS `url()`, OG image paths) will silently 404 on Pages — OG paths resolve via
`metadataBase`/`NEXT_PUBLIC_SITE_URL`. Local `pnpm dev`/`pnpm build` are unaffected (no env var set
→ empty base path).

**9. Every downloaded image is inspected before it ships.** The scrub grep is blind to pixels, and
reference photography leaks in three ways the naming map cannot reach:

- **The brand is in the product.** Reference product shots carry the reference's wordmark embossed
  on the leather, printed on the metal, or moulded into the part — often twice in one frame, and at
  a size that is obvious at 1:1. Zoom every shipped image to 4–5× over the product before deciding
  it is clean. ELBURG's hero had two marks. The fix is a clone-stamp: copy an adjacent patch of the
  *same* material, rescale its mean to the destination's border ring so the local lighting still
  matches, and paste under a feathered mask — grain and sheen survive, unlike a blur, which leaves a
  smudge on a crisp product shot. Where the surface is smooth (anodised metal, plastic) there is no
  grain to keep and no clean run to clone from, so a feathered blur is the better tool. Working
  script: `sites/reference/elburg/debrand.py`. Pick the clone offset so it follows the panel's own
  edges — an offset straight down paints over a diagonal edge and leaves a seam.

  **Check the hardware, not just the panel.** ELBURG's reference engraves its wordmark around every
  press stud's rim and prints it down the card holder's spine — a second and third mark per frame,
  in places a sweep of the leather never looks at. A photo is not cleared until its studs, buckles,
  clasps and metal edges have each been zoomed.
- **Third parties ride along in the props.** Not just clothing logos: a shipping carton with a
  supplier's name and a scannable QR code, a notebook carrying a real trade body's mark, a bank's
  logo on a card in the stack. Each is a real company shipped under the invented brand. When the
  offender sits outside the crop the layout actually renders, **crop the file to the rendered
  window** instead of retouching it — nothing visible changes and the leak leaves the repo. Work out
  that window from the tile's own aspect ratio and `object-cover`, not by eye.
- **Real people.** Reference sites photograph their actual staff, founders and customers.
  Photographs of identifiable people must not ship under an invented brand — the naming map already
  replaces the founders' names, and shipping their faces undoes that. Prefer product, material and
  hands-only lifestyle shots; drop the image rather than retouch a face.

**How to find the marks, and how to be sure they are gone.** Three techniques, each of which caught
something the previous one missed on ELBURG:

- **Screen with a high-pass view**, not with the eye and not with `find_mark`. Subtract a blurred
  copy from the greyscale, autocontrast, and embossing pops out of the shading. `find_mark`'s outlier
  clustering saturates on leather grain and returns the whole search region, and a plain 1:1 look
  reads a two-line maker's stamp as texture — that is exactly how ELBURG's add-ons shot passed a
  first inspection.
- **Size the rect so its *core* covers the mark**, not its edge. `debrand.py`'s mask feathers inward,
  so a rect drawn to the mark's own bounds pastes the outermost glyphs at partial opacity and leaves
  them legible. Five separate patches on ELBURG had to be redone for exactly this — the first and
  last letter surviving is the signature. The feather is clamped to a quarter of the short side, so
  the quantitative version of the rule is **draw the rect at least three times the mark's width**;
  at twice, ELBURG's spines shipped the whole word back as a faint relief.
- **Verify by re-cropping the saved file at 6–8× and comparing against the original**, side by side.
  Re-running the detector is not enough: it happily reports a stud's own specular highlight or a
  stitch line as a "mark" and reports nothing when a faded ghost remains.

**At scale, the checks matter more than the recipe.** Once a phase ships tens of images, "look at
them" stops being a check. ELBURG's Phase 3 needed three layers, each of which passed something the
one before it caught:

1. A **thumbnail contact sheet is screening, not verification.** At 300px a cell, a 25px wordmark on
   a card holder's spine is a smudge — two rounds of "clean" sheets shipped one that was plainly
   legible at render size.
2. **Crop every patched rect out of the cleaned file at 4× and tile them.** One crop per operation,
   at a size where a surviving letter is unmistakable. This is the check that finds a rect measured
   slightly wrong — and mis-measurement is the common failure, so **measure rects numerically**
   (`find_mark` over a narrow band at a high threshold) rather than reading them off a zoom or, worse,
   off a montage whose tile fractions are not the image's.
3. **Sweep whole frames for anything word-shaped** — high-pass, threshold, cluster, report blobs
   whose area and aspect could be a word. Layer 2 only checks where the recipe *claims* a mark is; a
   rect 2% of the width off shows a clean crop and ships the mark. Expect the sweep to over-report
   (stitching, card print, specular edges) and look at the hits.

`find_mark` measures; it does not screen. Given a region it will find *something*. Prefer fixed,
over-covering rects, and where a family's renders are framed differently enough that one fraction
cannot serve them all — ELBURG's Duowallet ships at 442, 480 and 501px wide — write a per-file
override rather than widening the rect until it swallows the product.

**Two marks that need their own tool.** An engraving around a **press stud's rim** is localised in
*angle* while the dome's shading varies only with *radius*: average a fan of copies rotated about the
stud's centre, then blur the residue. A blur alone either leaves the letters or, grown enough to
cover them, prints a soft halo on the leather that reads as a retouch from across the page. A mark on
**flat vector artwork** (an illustration, a diagram) gets neither clone nor blur — a clone drags the
illustration's own line work along and a blur only softens an outlined word; paint the field's colour
back over it, sampled at a point you name.

---

## Phases

One phase per work session, roughly. Progress is tracked as checklists in `sites/<slug>.md`, not
here.

**Phase 0 — Register & name.** Two inputs are required from the user before any work starts:
**the reference site's URL** and **screenshots of the design** — at minimum the homepage and one
product page, desktop, full-page (mobile welcome). If either is missing, ask for it and stop; the
screenshots are what pins *which* design state is being copied (sites run A/B tests and seasonal
refreshes), and the URL is where the data comes from. Save user-provided screenshots into
`sites/reference/<slug>/`, and during the inventory capture your own full-page screenshots of every
page being recreated (desktop + 390px) into the same folder — the reference can change or go
offline mid-build, and these captures are what standing rule 1 builds against in later sessions.
Then: inventory the reference (page sections, catalogue size, currency, fonts, palette). Propose
the invented brand name and the full naming map — every product, partner, outlet and proprietary
mark — and check each against real companies. **Confirm the naming map with the user before
Phase 1**: renaming later is the expensive half of a session. Add the site to `SITES.md`, create
`sites/<slug>.md` with the map and the reference URLs.

**Phase 1 — Scaffold.** `src/app/<slug>/layout.tsx` (fonts via `next/font`, metadata with the
site's `%s | BRAND` template, shell components, its own `viewport` themeColor), `not-found.tsx`,
`icon.svg` if the brand needs one. Tokens in `globals.css`: a `--color-<slug>-*` block under
`@theme` and a `.site-<slug>` scope for the two font roles. Download assets into
`public/images/<slug>/`. Register the site in `src/data/sites.ts` (this is what puts it in the
switcher; the first entry is also where `/` redirects — **no reference URLs in `src/`, ever**). Storage keys are
`<slug>-cart-v1` (localStorage) and `<slug>-order-v1` (sessionStorage). Header, footer,
announcement bar. Verify: `pnpm build` clean.

**Phase 2 — Homepage.** Every band of the reference homepage, section by section, plus the
responsive pass (mobile nav drawer, stacked sections). Verify: build + lint clean, no horizontal
overflow at any QA width.

**Phase 3 — Catalogue, PDP & cart.** `src/data/<slug>/products.ts` from the reference data, the
PDP rebuilt section by section against a real product page, cart store/context (copy
`src/lib/verdon/` and adapt the line shape), cart drawer, `/cart`, the listing page. **Budget the
majority of this phase for imagery**, not markup: it is the phase where ~70 reference photographs
land, and standing rule 9's checks — not just its recipe — are what it costs. Two shapes that recur:

- *One product route per model, the variant in a query param.* A reference usually gives each SKU
  its own URL; standing rule 3 allows five routes. So the listing renders one card per SKU and links
  to `/<slug>/products/<model>?<variant>=<value>`, which the PDP reads as its initial state and keeps
  in step with `router.replace(..., { scroll: false })` — shareable, and no history entry per click.
- *Split the PDP at the variant.* The sections that depend on the colourway go in one client
  component holding that state; the ones that do not (reviews, facts, editorial) are passed to it as
  `children` and stay server components.

**Phase 4 — Checkout & polish.** Two-column demo checkout, place order → clear cart →
confirmation with a mock order number. Hover/focus states, empty states, metadata. Nothing leaves
the browser; store at most the last four card digits.

**The reference's storefront region decides the checkout's shape** — copy the previous site's
plumbing, not its tax model or its address fields. VERDON's EU storefront quotes VAT-inclusive
prices and shows the tax as a portion already inside the total; ELBURG's `en-us` storefront adds
sales tax on top, ships within one country (so the country is stated rather than chosen), and needs
a state and a ZIP where VERDON needs a country select and a postal code. Getting this wrong is
invisible in a build and obvious to anyone who shops in that region.

**Whatever the cart page quotes, the checkout has to agree.** Put the delivery rule in the site's
own `src/data/<slug>/checkout.ts` and have both read it; a hard-coded shipping price in the cart
summary is a number that silently drifts the first time the checkout's methods change. Where the
cart genuinely cannot know a figure yet — sales tax needs an address — name the line and say where
it is calculated rather than leaving it out of the total silently.

**Phase 5 — QA.** The full harness below, against the production build, plus screenshots of every
band — assertions don't catch a wrapped headline or an off-brand colour. Shoot each band as its own
element (`main > *`, plus the header, footer, both drawers, the empty states and the 404) at
desktop and mobile: a full-page capture is too long to read and hides exactly the alignment
problems this pass exists to find. Then *sample pixels* for any colour judgement — a band read as
"rendering on the wrong background" in a downscaled screenshot turned out to be `rgb(69,69,69)`
exactly as intended.

A screenshot pass finds a different class of defect than the harness: on ELBURG every one of its
findings was a *layout-against-its-neighbours* problem — a caption a line lower than the two beside
it, six rail cards on six baselines, a column 40% longer than its siblings — none of which any
single-element assertion would fail. Turn each one into an assertion once found.

---

## Pulling the reference (Shopify sites)

Most D2C reference sites are Shopify, which exposes real data as JSON. Substitute the reference
domain:

| What | Where |
| --- | --- |
| Product data (title, price, options, variants, media + alt text) | `https://<domain>/products/<handle>.js` |
| Any collection, with prices | `https://<domain>/collections/<handle>/products.json?limit=250` |
| Rating + review count | `ratingValue` / `reviewCount` in the JSON-LD on the product page |
| Page structure, quotes, feature copy | the page HTML — Shopify themes name their sections (`section-main-product`, `section-press`, …) |
| Images | any media `src` + `?width=1200` |

Check the media conventions per site before trusting them — e.g. whether alt text encodes the
colourway, and whether packshots and lifestyle shots follow a slot order. Record what holds in
`sites/<slug>.md`; VERDON's conventions are documented there and did **not** all survive contact
with the data (alt text alone was not a reliable packshot/lifestyle classifier).

## Pulling the reference (Next.js / headless-CMS sites)

The second common shape. If the HTML contains `<script id="__NEXT_DATA__">`, the whole page — every
section, in render order, with its resolved copy, images, prices and links — is one JSON blob:

```
python3 -c "import re,json; h=open('page.html',encoding='utf-8').read(); \
  print(json.dumps(json.loads(re.search(r'<script id=\"__NEXT_DATA__\" type=\"application/json\">(.*?)</script>',h,re.S).group(1)),indent=1))"
```

Look for `props.pageProps.story.content.body[]` (the CMS's authored section list, in order) and
`props.pageProps.serverProps[]` (the same list with server data resolved). `props.siteData` usually
holds the nav. Walk the tree printing each node's `component` field — that gives the page anatomy
with the CMS's own section names, which is what the site doc should record.

**When a listing paginates client-side, use its facet filters.** `?page=N` returning page 1 every
time means pagination happens in the browser and the full catalogue is not in any one document —
but the *filters* are usually server-rendered, so one request per facet value (`?model=x`,
`?category=y`) walks the catalogue instead. Read the facet values out of the page's own filter map
rather than guessing them. This is how ELBURG's catalogue was pulled; see `sites/elburg.md`.

For references that are neither, the catalogue is read off the rendered pages by hand — budget more
of Phase 0 for it.

**Whatever the source: names are restated at import time** (standing rule 2), and after any
refresh, re-run the site's scrub grep from `sites/<slug>.md` plus a shape-grep for `®`/`™` and
interior-capital marks.

**The reference's own section names can carry its marks.** A CMS component like
`BlockCardProtectorUsps` is the natural thing to name in a code comment when building a band against
it — and it puts the reference's flagship trademark into `src/`, where the scrub grep finds it. Keep
the CMS names in `sites/<slug>.md`'s page anatomy, which is never served, and have the code refer to
the band by what it does.

**Prefer dropping a third party to inventing a stand-in for it.** Certifications, awards and
industry bodies are the worst offenders — invented names for them keep landing on real programmes,
because that naming space is small and already densely occupied. Restating the claim first-party
("independently audited") ships no new name at all. Same for a partner whose only job is to supply
a product: make it first-party. Every invented name is a collision check you have to keep passing
on every refresh.

---

## How to QA

Run against the **production** build, not `pnpm dev` — two sessions found issues that only show in
a production render.

```
pnpm build && PORT=3101 pnpm start
```

Drive it with `playwright-core` and the already-cached Chromium at
`~/Library/Caches/ms-playwright/chromium-<rev>/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`.
The harness is scratch, not committed. For the site under test it should assert, at minimum:

1. `documentElement.scrollWidth <= clientWidth` on all five routes at 390/768/1024/1440/1920/2560
2. ADD TO CART's bounding box is inside the viewport at every width — **and
   `document.elementFromPoint()` at its centre returns the button itself.** Inside the viewport is
   not the same as reachable: ELBURG's sticky buy bar put its CTA in the same corner as the
   showcase's floating DemoSwitcher, which covered it outright on a phone. A rect assertion passed
   the whole time; a hit test is what catches it. Apply the same check to any control a fixed
   overlay could sit on
3. The catalogue size matches the site's cap and the count label agrees
4. Every PDP section heading renders
5. Picking a variant swaps the gallery; picking an option changes the price; ticking an add-on
   changes the CTA total
6. Options reach the cart line, and differing lines do not merge
7. The full purchase flow reaches `/<slug>/checkout/confirmation` with the variant label intact
8. Inert links do not navigate, and no anchor has `href="#"`, an external URL, or another site's
   prefix
9. Zero console errors
10. The showcase shell: `/` redirects to the first registered demo, the switcher lists every site
    and reaches each one, and the root 404 is the neutral one
11. The site's fonts actually resolve: `getComputedStyle` on the `.site-<slug>` wrapper names the
    site's heading and body families, not the shell's system stack (see the layout traps)
12. No image is being scaled up to fill its box — see the `sizes` trap below for how to measure it,
    and why `naturalWidth` is not the way

Harness traps, learned here:

- Cart drawers are **always in the DOM** (inert when closed) — scope cart-page queries to `main`
  or every line counts twice.
- Next's RSC prefetches on *unmatched* routes never settle, so `waitUntil: "networkidle"` hangs on
  a 404 page — use `"load"`.
- Rebuilding while `next start` is running leaves the old server serving a deleted chunk manifest —
  every stylesheet 404s as a 500 and pages render unstyled. Kill it with
  `kill -9 $(lsof -ti:3101)`; `pkill -f "next start"` does not match.
- **Unmatched routes log a hydration error (React #418) on every site.** It comes from Next's own
  404 handling, not from site code — `/verdon/nope` and `/elburg/nope` produce it identically while
  the real routes are clean. Scope the zero-console-errors assertion to the five built routes, or
  it will chase a framework issue every session.
- **Scroll the page before asserting anything about images.** `next/image` lazy-loads everything
  below the fold, so an immediate `naturalWidth === 0` check reports most of a long homepage as
  broken — 19 false positives on ELBURG's. Walk the viewport down the page, wait, then assert.
  Watching for HTTP ≥400 responses is the check that needs no scrolling and cannot false-positive.
- **`fullPage` screenshots have the same problem**: Playwright stitches the capture without
  scrolling, so lazy bands photograph blank. Scroll first, or the screenshot record of "every band"
  is a record of empty boxes.
- **`.next/cache/images` survives a rebuild.** Next's image optimiser caches by URL, so re-shipping
  a corrected image under the same path still serves the old one — which looks exactly like the fix
  having failed. `rm -rf .next/cache/images` before verifying anything about imagery.
- **Cart-line counts need scoping twice over.** Scope to `main` (the drawer is always in the DOM and
  renders the same lines), and count a per-line control such as the Remove button rather than `li` —
  a line's add-ons are nested `li`s and over-count again.
- **Scope every harness query to `main`, not just the cart's.** The shell is full of decoys that
  match the obvious selector: the footer newsletter is a `<form>` with its own
  `button[type=submit]`, the header burger and the footer accordions carry `aria-expanded`, and
  Next's own route announcer is a live `[role=alert]`. Each one cost a strict-mode violation or a
  click on the wrong control while testing ELBURG's checkout.
- **`innerText` returns text as CSS renders it, uppercase included.** These sites set
  `text-transform: uppercase` on nearly every heading, so a case-sensitive `/Estimated delivery/`
  fails against markup that says exactly that. Match headings case-insensitively, or read
  `textContent`.
- **Let images settle before measuring them, and never measure them with `naturalWidth`.** Two
  separate traps, and the second one invented nineteen failures on ELBURG before it was caught.
  Reading an image mid-upgrade reports the small candidate the browser is about to replace — wait
  for `document.images.every(i => i.complete)`. And on any `srcset`/`sizes` image `naturalWidth` is
  **density-corrected**: it is the file's width divided by (chosen descriptor ÷ resolved slot),
  which lands near the box's width whatever the file actually is. Re-load `img.currentSrc` into a
  bare `new Image()` to get real pixels, and load the un-optimised path alongside it to tell a
  `sizes` bug (the source had the pixels, the hint did not ask for them) from a content limit (the
  source does not have them at all).
- **A closing drawer makes a sticky element unstable.** Closing restores `body { overflow }`, the
  scrollbar comes back, and everything sticky shifts sideways — a click issued in that window fails
  Playwright's stability check with no "intercepts pointer events" to explain it. Wait for the
  panel to be off-screen, not for a fixed delay.
- **Count cards by their card element, not by their links.** A product card holds its own link plus
  one per colour dot, so `a[href^="/products/"]` counted ELBURG's 24-SKU listing as 96.

---

## Layout traps

CSS lessons that will bite any site, kept here so each build doesn't relearn them:

- **`sr-only` is `position: absolute`** — inside a carousel, those spans resolve against the
  viewport unless an ancestor is `relative`, escape the rail's overflow clip, and hand the page
  hundreds of px of horizontal scroll. Any component with an `sr-only` span gets `relative` on its
  root.
- **A flex row's default `align-items: stretch` overrides `aspect-ratio`** on its children — use
  `items-start` (or size explicitly) when a flex child carries an aspect box.
- **The global `:focus-visible` ring must live in `@layer base`** — unlayered rules beat Tailwind's
  layered utilities regardless of specificity, so an unlayered ring overrides `focus:outline-none`
  and double-rings inputs that show their own error border.
- **`snap-mandatory` snaps the first card past the rail's left gutter** — pair scroll snap with
  `scroll-pl-*` matching the gutter.
- **A strip of mixed-shape images shares a height, not a width.** A reference that lays product
  views out in a row — a portrait front, a wide open shot, a sliver of a side — sizes each panel by
  its own aspect ratio at one height. Give them all one box and a fixed width instead and the narrow
  ones come out short: the row loses its baseline and reads as broken rather than as a strip. Clamp
  the ratio at both ends so a sliver is not 60px and a panoramic one does not fill the screen.
- **A translucent panel inside a translucent column double-tints.** The checkout summary wants its
  ground on the *column* so it fills the row however tall the form gets — but the panel component is
  also used standalone (on the confirmation), where it needs a ground of its own. Give it both and
  the two 40% layers stack: the top of the column comes out visibly darker than the rest, which
  reads as a mis-drawn panel rather than as a tint. Sample the rendered pixels rather than trusting
  the eye — the difference was 232 vs 237 and only obvious once measured.
- **`sizes` describes the *scaled image*, not the box.** `next/image` picks a file from the width
  you declare, but `object-cover` scales by whichever axis needs it — so a source flatter than its
  box is scaled by *height* and the file it needs is `boxWidth × (boxRatio ÷ sourceRatio)`, which
  a plain `31vw` never asks for. ELBURG shipped a 2200 × 992 editorial photograph in a 342 × 420
  mobile band at 2.4× under-fetch, and a 1200 × 677 tile in a 99:85 box at 1.5×, both looking
  simply "a bit soft". The same trap in a second shape: a box whose size comes from its *height*
  (a strip of panels at `76vh`, each as wide as its own ratio) has no `vw` that describes it — say
  `calc(min(76vh, 820px) * <ratio>)` instead. Where one band's sources differ, carry the source's
  own ratio in the data and derive each tile's hint from it, the way `stories` and `featuredTiles`
  do in ELBURG. And when the source simply has too few pixels for its box, that is a *content*
  limit — record it rather than tuning `sizes` at it forever.
- **Mixed aspect ratios belong in a column band, not in a row.** The same ratios that make a
  masonry band read as editorial put a horizontal rail's captions on six different baselines, and
  the rail reads as broken. One ratio per rail; cap the card's width if the flattest source cannot
  cover the box at the widest QA viewport.
- **A CSS multi-column band is only as balanced as its entry order.** Multi-column balances by
  height but cannot break a tile, so with tall tiles first it fills column one and leaves the rest
  short — ELBURG's stories band ran 40% longer on the left until the entries were paired
  tall-with-short. Assert it: measure each column's last tile's bottom and compare.
- **An overlay caption with an optional line bottom-aligns to a different baseline.** A tile whose
  price or standfirst is absent gets a shorter block, and `justify-end` pushes its eyebrow down a
  line while its neighbours' stay put. Reserve the row (`{value ?? " "}`, `aria-hidden` when
  empty) rather than dropping it.
- **A reference's authored aspect ratios assume the reference's photographs.** Copy a band that
  sets a per-tile ratio and the ratios are right, but our image library is not theirs: a source
  flatter than its slot gets *upscaled* by `object-cover` and ships visibly soft next to its
  neighbours. Keep the ratio sequence and reorder the entries so each slot gets a photograph at
  least as tall as it is — ELBURG's stories band opened on a landscape flat-lay in a 141 slot until
  it was moved to a 77.
- **An icon button's tap target is its icon** unless it is given one. These designs draw header and
  drawer icons at 20–24px, well under the ~44px finger target (WCAG 2.5.8's floor is 24px) — and the
  miss compounds on exactly the controls a phone user hits most (menu, cart, close). Pad the hit
  area without moving the layout: `p-2.5 -m-2.5` on the button. Dot pagination is the worst case
  (a 10px dot *is* the control) — put the visible dot in a `size-6`+ flex button instead of styling
  the button as the dot. Adjacent padded controls eat their shared gap from both sides, so keep each
  button's padding to half the gap or the hit areas overlap.
- **A sticky bottom bar owns the bottom edge of the viewport, and the page's last rows end up
  under it with no scroll left to reveal them.** ELBURG's PDP ended with its copyright line
  permanently behind the buy bar. Two things share that edge — the site's own footer and the
  showcase's floating DemoSwitcher — and neither should have to know which site is rendering. So
  the bar *publishes* its measured height as `--site-bottom-bar` on `document.documentElement`
  (`0px` when hidden, removed on unmount); `globals.css` gives `footer` that much
  `padding-bottom`, and the switcher offsets its `bottom` by it. Any future site's bottom bar gets
  both behaviours for free by setting the same variable.
- **A phone's listing wants the reference's column count, not the desktop grid's base tier.** A
  `grid-cols-1` base with `sm:grid-cols-2` reads as a deliberate mobile choice and is almost never
  what the reference does: ELBURG's 24 SKUs came out one-per-row at 390 — a 13,900px page rendering
  a $49 card holder 390px wide, against a reference that is two-up with the same catalogue. Check
  the mobile capture before accepting the base tier a desktop-first grid falls back to.
- **An input with a font under 16px makes iOS Safari zoom the whole page on focus** — the single
  most jarring mobile-checkout defect, and invisible in any desktop or emulator pass (it needs real
  Safari). These designs want 12–13px form text, so give every `input`/`select` `text-[16px]` at
  mobile widths and restore the design size at `lg:`. The taller control that falls out of 16px text
  is a better touch target anyway.
- **Font roles resolve per site**, and there are *two* computed-value traps stacked on top of each
  other. `@theme` emits its variables into `:root`, so a role written as
  `--font-heading: var(--site-heading-font, <system stack>)` resolves **at `:root`**, where
  `--site-heading-font` is undefined — the fallback gets baked in, and because custom properties
  inherit as computed values, defining `--site-heading-font` on the wrapper further down can never
  reach it. Every site silently rendered in the system stack for two sessions before anyone
  compared a screenshot to the reference. So: `@theme` holds the *shell's* fonts as literal stacks,
  and each `.site-<slug>` wrapper redefines `--font-heading` / `--font-sans` **directly**. Then,
  because `font-family` is inherited as a computed value too, the wrapper must also re-state
  `font-family: var(--font-sans)` for its body font to apply below it (see `globals.css`).
  Assert this rather than eyeballing it: read `getComputedStyle(wrapper).fontFamily` in the QA
  harness and check it names the site's font, not `-apple-system`.
