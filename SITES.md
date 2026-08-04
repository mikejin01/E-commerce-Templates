# Demo Sites Registry

What this showcase contains and where each site stands. One row per site; the detailed history,
naming map and decisions live in that site's `sites/<slug>.md`. The build process itself is
`PLAN.md`.

Reference URLs live **only** here and in `sites/*.md` — never in `src/` (see standing rule 2 in
`PLAN.md`). The browser-facing registry is `src/data/sites.ts`, which carries the fictional brand
only.

| Site | Route | Reference | Status | History |
| --- | --- | --- | --- | --- |
| **VERDON** — outdoor & sports eyewear | `/verdon` | vallon.com (Shopify) | ✅ Complete (Sessions 1–8) | `sites/verdon.md` |
| **ELBURG** — card-protecting wallets & pocket carry | `/elburg` | secrid.com (Storyblok + Next.js) | ✅ Complete (Sessions 1–6) | `sites/elburg.md` |

## Status detail

### VERDON — `/verdon`

Complete and QA'd: full flow (home → listing → PDP → cart → checkout → confirmation), rebranded,
converted to the per-site folder layout in Session 8. Nothing in progress. Refreshing the catalogue
from the reference must follow the scrub rules in `sites/verdon.md`.

**One fix landed here in ELBURG Session 2**: the site was rendering in the system font stack, not
Jost/Montserrat, because of how `globals.css` wrote its font roles — see the layout traps in
`PLAN.md`. Worth a look at VERDON's pages, since every band was designed against the wrong type.

### ELBURG — `/elburg`

Complete and QA'd: the full flow runs, home → listing → PDP → cart → checkout → confirmation, with
274 assertions green at 390–2560 across all six routes and every band shot and read at desktop and
mobile. Build, lint, scrub grep and both shape greps clean. Nothing in progress.

The checkout is **US-shaped on purpose** — the reference's `en-us` storefront adds sales tax on top
rather than containing it, ships within one country, and takes a state and a ZIP. That is the one
part of VERDON's checkout that could not be copied; the reasoning is in `sites/elburg.md`.

Session 3's open question — the homepage stories band's first column running ~40% taller than the
other two — was settled in Phase 5: CSS multi-column balances by height but cannot break a tile, so
the reference's own ratio order stacks both tall tiles into column one. Re-pairing them brings the
three columns within 2%.

Anything that touches this site again should carry in:

- **De-branding needs its checks, not just its recipe.** The pipeline lives in
  `sites/reference/elburg/pipeline/`; run `python3 runscrub.py && python3 deploy.py` after any image
  refresh, then `verify.py` (crops every patched rect at 4×) *and* `detect.py` (sweeps whole frames
  for anything word-shaped). A contact sheet at thumbnail size is not a check — it passed a
  wordmark that was plainly legible at render size.
- `.next/cache/images` survives a rebuild, so a corrected image is still served in its old form
  until you `rm -rf .next/cache/images`.
- **Seed the stores before measuring anything**, and seed the order by *placing* one — a
  hand-written object fails the store's shape check and renders the empty state, which reads as a
  broken page.
- **Swapping a photograph means updating its `sourceRatio`** in `src/data/elburg/home.ts`. Three of
  this site's bands crop hard, and their `sizes` hints are derived from the source's own aspect —
  see the `sizes` trap in `PLAN.md`.

## Adding a site

Open a session with:

> **Add a new demo site: `<reference-url>`** — attaching screenshots of the design (homepage and a
> product page at minimum, desktop, full-page).

**Both inputs are required.** Phase 0 in `PLAN.md` does not start without the URL and the
screenshots — if either is missing, the session's first move is to ask for it. Provided screenshots
are saved under `sites/reference/<slug>/` (alongside the session's own full-page captures) so every
later session builds against the same design, even if the live site changes.

The session then follows `PLAN.md` from Phase 0: inventory the reference, propose the invented
brand and naming map (confirm it before building), add the row above, create `sites/<slug>.md`, and
register the site in `src/data/sites.ts` when the scaffold lands. Use VERDON's folders as the
template throughout — copy the shape, not the brand.

## Continuing a site

Open a session with: **"Continue the `<name>` demo"**. The session reads this file for status, then
the site's `sites/<slug>.md` for the checklist and naming map, and resumes from the next unchecked
item — with `sites/reference/<slug>/` as the design source of truth.
