# ELBURG — card-protecting wallets & pocket carry

Demo storefront at `/elburg`, built against **secrid.com** (`en-us` storefront) as the structural
reference. The brand in all shipped code and copy is **ELBURG** (see the naming map below).
Status: **complete** — Phases 0–5 done. The full flow runs, home → listing → PDP → cart → checkout →
confirmation; 274 assertions green at 390–2560 across all six routes, and every band has been shot
and read at desktop and mobile. Process rules live in `PLAN.md`.

Site folders: `src/app/elburg/`, `src/components/elburg/`, `src/data/elburg/`, `src/lib/elburg/`,
`public/images/elburg/`. Reference captures: `sites/reference/elburg/`; the de-branding pipeline
that produced every shipped render is `sites/reference/elburg/pipeline/`.

| | |
| --- | --- |
| Reference | `https://secrid.com/en-us/` — homepage; `https://secrid.com/en-us/envelope-original-latte/` — PDP |
| Also captured | `https://secrid.com/en-us/wallets/all/` (listing), `https://secrid.com/en-us/collections/envelope-wallet/` (collection) |
| Platform | Next.js (pages router) + **Storyblok** CMS — *not* Shopify |
| Currency | **USD** (the `en-us` storefront: $49–$255; free shipping over $49) |
| Fonts | Barlow Condensed (UI/labels — stands in for DIN Pro Condensed) + Newsreader (editorial serif — stands in for Capitolium) |
| Catalogue | **8 wallet models × 3 colourways = 24 SKUs**, plus 3 add-ons |
| Storage | `elburg-cart-v1` (localStorage), `elburg-order-v1` (sessionStorage) |
| Tax model | **US: sales tax added on top**, flat 8.75% quoted as "Estimated sales tax · demo rate" |
| Delivery | Standard $6, free over $49, 2/4 business days · Express $15, 1/2 business days |

---

## Pulling the reference (Storyblok / Next.js sites)

`PLAN.md`'s table is written for Shopify and does **not** apply here. The reference has no
`.js`/`products.json` endpoints. Everything comes out of the `__NEXT_DATA__` blob embedded in each
page's HTML:

```
curl -sL -A "<a desktop UA>" "https://secrid.com/en-us/<path>/" -o page.html
python3 -c "import re,json; h=open('page.html',encoding='utf-8').read(); \
  print(json.dumps(json.loads(re.search(r'<script id=\"__NEXT_DATA__\" type=\"application/json\">(.*?)</script>',h,re.S).group(1)),indent=1))"
```

| What | Where in `__NEXT_DATA__` |
| --- | --- |
| Homepage bands, in order | `props.pageProps.story.content.body[]` — each entry's `component` names the band |
| Homepage bands, resolved (products, images, links) | `props.pageProps.serverProps[]` — same order, `null` where a band needs no server data |
| PDP sections | `props.pageProps.serverProps[]` — `PdpBlockHeaderSidebar`, `PdpBlockSpecifications`, `PdpBlockMaterial`, `PlpGlobalBlock` ×4, `PdpBlockOtherProducts` |
| PDP price, per region, in **cents** | `props.pageProps.story.content.region_pricing` (`us`, `gb`, `nl`, …) |
| PDP bullets / description / swatch colour | `serverProps[0].properties[]`, `.description`, `.productColor` |
| Accordion copy (Product info, Care & Repair, …) | `serverProps[1].items[]` — Storyblok richtext docs |
| Nav (three panels + right rail) | `props.siteData.nav1 / nav2 / nav3 / navRight` |
| Catalogue | see the filter trick below |
| Images | `a.storyblok.com` URLs, straight out of any asset field |

**The catalogue filter trick.** `/en-us/wallets/all/` paginates *client-side* — `?page=N` returns
page 1 every time, so the 299-SKU list cannot be walked that way. The **facet filters are
server-rendered**, so fetch one request per model family instead:

```
https://secrid.com/en-us/wallets/all/?model=<miniwallet|slimwallet|cardprotector|twinwallet|
    bandwallet|cardprotector-for-magsafe|envelope-wallet|flexwallet|cardslide>
```

Each returns `props.pageProps.products[]` (capped at 20 per family) as flat records —
`name`, `slug`, `sku`, `model`, `style`, `product_colour`, `storage`, `number_of_cards`,
`price_us` (cents), `productColorName` (the per-product tint hex), `images[]`, `assets[]`.
`props.pageProps.availableFilters` is the full facet map and is what the nine family names above
came from.

**Images.** `https://a.storyblok.com/f/132418/<w>x<h>/<hash>/<name>.<ext>`, with an optional
transform suffix `/m/<w>x<h>/filters:quality(80)` (a `0` dimension preserves the aspect ratio).
Verified working. Download into `public/images/elburg/` under the **renamed** slugs.

### De-branding downloaded imagery

**Every reference photo carries the reference wordmark in the pixels** — embossed on the leather,
printed on the aluminium card holder, or both in one frame. The scrub grep cannot see any of it.
The Phase 1 hero had two marks, ~100px and ~78px wide at 1500px; at the size the hero renders they
were plainly legible. Assume every product shot in Phases 2–3 has at least one.

**Where this reference puts its mark — the checklist for every new photo.** Phase 2 shipped nine
files that each needed work, and every one of these places was the *only* mark in at least one file:

1. **Embossed on a leather panel** — the flap, the rib, the back. Runs along the panel's own slope.
2. **Engraved around a press stud's rim.** Every stud on every wallet, front and inside. This is the
   easiest one to miss: the leather sweep looks clean and the stud is 40px across.
3. **Printed down the card holder's anodised spine**, vertically, light on dark.
4. **A two-line maker's stamp** on the flap interior, low contrast — reads as grain at 1:1 and even
   in a badly-cropped high-pass. Screen the *whole* frame, not the spot you expect.
5. **Third parties in the props** — a supplier's carton with a QR code, a real trade body's mark on
   a notebook spine, a bank's logo on a card in the stack.

Renders are as affected as photographs: six of the eight product PNGs needed a patch.

**Phase 3 turned the recipe into a pipeline**, because 70 renders is too many to retouch by hand
and the marks repeat: the studio shots inside a model family share a pose, so a rect written once
covers three colourways. `sites/reference/elburg/pipeline/` holds it — `manifest.py` (which
reference asset becomes which shipped file), `recipes.py` (one entry per family × view),
`scrub.py` (the runner), `verify.py` and `detect.py` (the two checks), `deploy.py` (flatten onto
the tint, ship). Re-run with `python3 runscrub.py && python3 deploy.py` from that folder, with the
downloads in `raw/`.

Two tools were added to `debrand.py`'s vocabulary there:

- **`stud_smear`** — averages a fan of copies rotated about a press stud's centre. Engraving is
  localised in *angle*; the dome's shading varies only with *radius*. A blur either leaves the
  letters or, grown enough to cover them, prints a soft halo on the leather that reads as a
  retouch. Smearing first and then blurring the residue removes the angular modulation, which is
  what the letters are.
- **`fill`** — paints a flat colour sampled at a named point. For flat vector artwork (the
  "quick access" illustration) a clone drags the illustration's own line work along and a blur
  only softens an outlined word; painting the field back over it is exactly right, and only right,
  because the field is one flat colour.

`sites/reference/elburg/debrand.py` is the underlying recipe (pure PIL, no numpy in this
environment):

- `patch(im, rect, dx, dy)` — clone-stamp. Copies the rect shifted by `(dx, dy)`, rescales its mean
  to the destination's **border ring** (the ring reports the material's local tone; the mark itself
  sits in the middle and would skew a plain mean), and pastes under a feathered mask. Keeps leather
  grain and metal sheen. **Pick the offset so it follows the panel's own edges** — the flap's mark
  sits ~4px from a diagonal edge, and an offset straight down painted flat leather over that edge
  and left a visible seam; `dx: +162, dy: -60` follows the edge's slope and lands clean.
- `blur_patch(im, rect, radius)` — for marks on smooth surfaces (the dark card holder). No grain to
  preserve and no clean run of the same material to clone from, so a feathered blur reads as the
  surface's own sheen.

- `tile_patch(im, rect, src_rect, …)` — for a mark over a repeating texture (the carbon weave on the
  Cardlift Snap, the elastic band, a paper board) where no clean run is as large as the mark. Tiles a
  small clean sample of the same texture and tone-matches it.

Verify by re-cropping the rect at 5× and looking at it. Both hero marks are gone and the retouch is
invisible at 1:1.

**The failure that recurred five times in Phase 2**: a rect drawn to the mark's own bounds puts the
feathered ring on the outermost glyphs, which then paste semi-transparent and stay readable. The
signature is *the first and last letter surviving*. Size the rect so its opaque core covers the whole
mark, and expect a second pass. Also: `pick_offset` will happily choose an offset whose source is
clean but which drags a panel edge into the destination — the add-ons flap grew a hard vertical seam
that way, and a blur was the right tool there instead.

**Phase 3 found the quantitative version of that rule.** `_feather_mask` clamps its feather to a
quarter of the short side, so a 25px rect over a 12px wordmark leaves an opaque core barely wider
than the mark: the outermost strokes still paste semi-transparent and the whole word survives as a
legible relief rather than as two letters. **Every rect here is now at least three times the mark's
own width**, and the spine rects were re-measured numerically (`find_mark` over a narrow band at
k=60) rather than read off a zoom — reading them off a montage put five of them 5–8% of the image
width to one side, which is enough to miss entirely.

**`find_mark` is a measuring tool, not a screening tool.** Given a region it will find *something*;
on the Claspwallet's open view it found the wrong thing and the wordmark shipped. Every op in
`recipes.py` is now a `fixed` rect. Where the family's colourways are framed differently enough that
one fraction cannot serve — the Duowallet's renders are 442, 480 and 501px wide — there is a
per-colourway entry in `OVERRIDES`.

**Do not ship photographs of identifiable people.** The reference's story imagery is its own staff
and founders — the "We Made Your Wallet" thumbnail is six portraits, one wearing a real third-party
brand's logo, and "Design Dilemmas" is the design team. The naming map already invents the founders;
shipping their faces would undo that. Both were replaced with hands-only product/craft shots from
the reference's own library (`nav-care-repair.jpg`, `textured.jpg`), which needed one small clone
patch between them. Only the components flat-lay survived unedited.

### Media conventions

- **Product renders are transparent PNGs**, not square packshots — they are composited onto the
  product's own tint colour (`productColorName`, e.g. `#fff2cc` for the Latte envelope wallet).
  That per-product tint is a real design element: cards and PDP galleries both use it. There is no
  off-white studio background to inherit, so every product tile needs its tint token.
  **ELBURG bakes the composite in at build time** (`pipeline/deploy.py`): every shipped render is
  already a tinted JPEG. Nothing shows these on another ground, it drops 28MB of RGBA PNG to 7.6MB,
  and it removes the failure the QA notes below warn about — a colourway that lost its tint can no
  longer render as a cut-out over the paper background. `ColorVariant.tint` still ships, because the
  same colour has to be set on the box behind the image or the letterbox shows a seam.
- **`assets[]` carries a `layout` tag per image** — `frontView`, `flatCards`, `sideMobileMagsafe`,
  … That tag, not alt text, is the reliable slot classifier (the VERDON lesson, in a different
  shape). `serverProps[0]` also pre-resolves `frontViewImage` / `sideViewImage` / `realLifeImage`.
- Renders are **portrait and vary in aspect ratio** per view (388×720 front, 166×720 side,
  988×720 flat). Unlike VERDON, `ProductImage` will need a per-image aspect hint.

**Any refresh from the reference must restate names on the way in** (naming map below), then
re-run the scrub grep at the bottom of this file.

---

## The naming map

`ELBURG` — a Dutch fortified town; `-burg` reads as *fortification*, which lands directly on a
brand whose flagship is a card **protector**. Six letters, same wordmark shape as the reference.
Checked against real leather-goods and wallet companies and clear. VOORNE and KAMPEN were the
other finalists (VOORNE is also used by an unrelated NL consulting firm).

### Brand, products and proprietary marks

| Reference | Shipped | Note |
| --- | --- | --- |
| Secrid / Secrid BV | **ELBURG** / **ELBURG BV** | |
| Cardprotector® | **Cardlift®** | Names the lever action; keeps a proprietary flagship mark. Checked, clear |
| Cardprotector+ / Premium Cardprotector+ | **Cardlift+** / **Premium Cardlift+** | |
| Cardprotector for MagSafe | **Cardlift Snap®** | **MagSafe is Apple's trademark** — never shipped. The attachment is described generically as "magnetic phone attachment" |
| Cardslide | **Cardlift Sleeve** | Stays inside the Cardlift family — one fewer invented mark |
| Envelope Wallet | **Claspwallet** | Derived from the reference's own "with button closure" bullet. The homepage hero product |
| Miniwallet | **Foldwallet** | |
| Slimwallet | **Notewallet** | The note compartment is what separates it from the Mini |
| Twinwallet | **Duowallet** | |
| Bandwallet | **Strapwallet** | |
| Moneyband™ | **Cashband** | "THE MONEYBAND" is a live registered trademark — must not ship |
| Coinpocket | **Coin pouch** | Mark dropped; reads better as a plain descriptor (the VERDON "Prescription Lenses" move) |
| Chipolo tracker card (real partner) | **Trackcard**, first-party | Partner dropped entirely rather than replaced — one fewer invented company |
| Pocketwear (Secrid's category coinage) | **Carrywear** | Checked, clear |
| Secrid Brooch / The Ministicks | **ELBURG Brooch** / **Daily Care Sticks** | |
| my.secrid.com (warranty registration) | "**register your wallet**" | Renders as `InertLink`; no domain ships |
| "since 1995" | **since 1997** | The founding year belongs to the invented brand, not the real one |

**Dropped, not replaced** — reference features that exist only to name a real third party, and
that a 24-SKU demo does not need: the Flexwallet line, the *Freitag × Secrid* and *Sheltersuit*
collaborations, and the *Mirum* plant-leather material. Dropping Flexwallet is why the eighth
model slot is Cardlift Sleeve.

### Third parties, awards and people

| Reference | Shipped | Note |
| --- | --- | --- |
| Certified **B Corp** / B Corporation | "**Independently audited**" | No invented certification body — the fact is restated as a first-party commitment with a neutral seal. Every candidate stand-in ("Common Good Certified") turned out to be a real programme |
| **Red Dot Design Award** (2010) | **Grondvorm Design Award** | Invented Dutch design prize (*grondvorm* = "basic form"). Checked, clear. No award artwork ships |
| Founders René van Geer & Marianne van Sasse van Ysselt | **Joost van Ravel & Hanne de Wit** | Invented |
| Community story: Karel van 't Wout & Jerrie Bührmann | **Thijs & Marit Oosterlee** | Invented |
| Visa / Mastercard / Amex / PayPal / G Pay footer marks | *dropped* | No payment artwork ships (VERDON precedent) |

### Finishes and colourways

Finish names that are plain descriptors are kept — **Original, Vintage, Matte, Pebble, Powder,
Fluted**. Leather-trade names the reference uses as marks are restated if a chosen SKU needs one:
Texano → **Saddleleaf**, Naplak → **Lacquer**, Crisple → **Crinkle**, Basco → **Cortez**,
Hammerstone → **Hammered**, Leo → **Lynx**, Liba → **Lido**.

Colour names are generic descriptors and carry over as-is (Latte, Black, Cognac, Ice Blue,
Cappuccino, Butter Yellow, Chocolate, Saddle, Teal, Nightblue & Orange) — with the reference's
"Cappuchino" spelled correctly.

---

## The catalogue (8 × 3 + 3 add-ons)

Prices are the reference's real `price_us` values, in USD. Built in Phase 3 as
`src/data/elburg/products.ts`: eight `Product`s, each with three `ColorVariant`s carrying their own
finish, tint, material and render set. **The listing renders 24 cards (one per colourway) but the
site has eight product routes**, with the colourway in `?colour=` — the reference gives each SKU its
own URL, which standing rule 3 does not allow, so the query param stands in and `router.replace`
keeps it in step with the swatches.

Size-and-weight figures are **demo-authored** for seven of the eight models: the reference loads
them from an API rather than the page, so only the Claspwallet's (102 × 72 × 25 mm, 78 g) is real.
The `SizeDiagram` component draws its own elevation — the reference's diagram is an SVG with the
wordmark set into the wallet outline.

| Shipped model | Reference model | Price | Carry tier |
| --- | --- | --- | --- |
| Cardlift® | Cardprotector | $49 | Essential (4–6 cards) |
| Cardlift Snap® | Cardprotector for MagSafe | $69 | Essential |
| Cardlift Sleeve | Cardslide | $99 | Essential |
| Notewallet | Slimwallet | $99 | Expanded (4–16 cards) |
| Claspwallet | Envelope Wallet | $109 | Expanded |
| Foldwallet | Miniwallet | $109 | Expanded |
| Strapwallet | Bandwallet | $109 | Expanded |
| Duowallet | Twinwallet | $140 | Expanded |

The colourways, in catalogue order — each is a real reference SKU, so its renders and its tint are
the reference's own:

| Model | Colourways (finish) |
| --- | --- |
| Cardlift | Black · Red · Sand |
| Cardlift Snap | Titanium · Fuchsia · Lime |
| Cardlift Sleeve | Desert · Black · Charcoal |
| Notewallet | Nightblue & Orange (Matte) · Black (Matte) · Teal (Vintage) |
| Claspwallet | Cappuccino · Ice Blue · Butter Yellow (all Pebble) |
| Foldwallet | Latte (Pebble) · Rose (Pebble) · Chocolate (Original) |
| Strapwallet | Leaf & Khaki · Black · Steel Blue & Brown (all Matte) |
| Duowallet | Cognac & Brown (Vintage) · Red (Original) · Chocolate (Vintage) |

Add-ons: **Trackcard** ($39, fits every model), **Coin pouch** ($14, the five leather wallets),
**Cashband** ($14, the three aluminium ones). They are checkboxes in the buy box: they change the
CTA total and ride on the cart line, so two otherwise identical wallets do not merge.

The two carry tiers are the reference's own `storage` facet (`essential-carry` /
`expanded-carry`) and drive the homepage "Wallet Categories" band and the listing filters.
Cardlift Sleeve's Desert and Charcoal have no open view on the reference, so their image strip is
two panels rather than three — the strip renders however many exist.

---

## Design tokens

Sampled from the live DOM, not from the screenshots.

| Token | Value | Where |
| --- | --- | --- |
| `--color-elburg-ink` | `#2e2e2b` | Body text (`--color`) |
| `--color-elburg-paper` | `#f5f4f0` | Page background (`--background-color`) |
| `--color-elburg-accent` | `#c05746` | Terracotta highlight (`--highlight-color`) |
| `--color-elburg-slate` | `#454545` | Material band background |
| `--color-elburg-bone` | `#e2e0d4` | Material band display type |
| `--color-elburg-bark` | `#5c5648` | Footer (warm olive-brown) |

Per-product tints come from the catalogue data (`productColorName`), not from tokens.

**Type roles.** Two fonts, both via `next/font/google`, resolved through `.site-elburg`:

- **Barlow Condensed** — every label, nav item, product name, section eyebrow and button.
  Always uppercase, weight 500 or 700, letter-spacing `0.12px`–`0.36px`. This is the site's voice.
- **Newsreader** — editorial serif, weight 400, **used in italic as display type** far more than
  upright ("The new", "Chic elegant and bold styles", "ORIGINAL CARD PROTECTOR", "20 TYPES *of*
  LEATHER"). Mixed-case *and* uppercase italic both appear.

---

## Page anatomy (what Phases 2–3 build against)

Section names are the reference's own Storyblok component names, so they can be re-found in the
data. Full-page captures for every one of these are in `sites/reference/elburg/`.

### Header & navigation (built in Phase 1)

The reference's nav is **a left-hand drawer, not a mega menu** — captured in
`nav-shop-desktop.png`, `nav-shop-wallets-desktop.png`, `nav-our-mission-desktop.png` and
`nav-drawer-mobile.png`. It is click-triggered, not hover-triggered (an hour went into hovering
before that was clear).

- **Header**, 50px desktop / 54px mobile, paper with a hairline rule. Left: `SHOP · NEW & FEATURED ·
  OUR MISSION`. Centre: the wordmark, which **swaps to the compact mark once the page scrolls**.
  Right: `STORES · CARE & REPAIR · SUPPORT`, flag, search, bag. Mobile collapses the left to a
  burger and drops the utility links.
- **Desktop drawer**, two columns. Column one (320px) repeats the header's menu row with an X and
  the active menu underlined, then the menu's own entries; the brand mark sits in the bottom
  corner. Only SHOP has panels (`Wallets` / `Add-ons`) — picking one slides column two (310px) in
  beside it. NEW & FEATURED and OUR MISSION render their groups directly in column one.
- **Group headings are the serif at 13px** (`Essential Carry (4–6 cards)`, `Styles`,
  `More for Wallets`); links are condensed caps, 15px normally and 12px where the CMS sets
  `subMenuIsSmall` (Styles, Featured, More for Wallets).
- **Mobile drawer** goes full width and **hoists SHOP's panels to the top level** —
  `WALLETS / ADD-ONS / NEW & FEATURED / OUR MISSION`, each with a chevron — so every section is one
  tap deep. Utility links below, locale row (flag · USA · English) pinned at the bottom.
- **Footer**: a four-up promise strip (a swipeable rail with diamond dots below `md`), then three
  link columns split by vertical rules — collapsing to accordions with the first open on mobile —
  plus a centred newsletter column, socials, the seal and the legal row. Footer link labels are the
  **serif**, headings condensed caps.

Two bands in the CMS data do **not** render on the live reference and were not built:
`BannerImportantInformation` (a shipping-delay notice) and `BlockUspBar` (the six Made in Europe /
Since 1995 pairs listed as band 1 below). The captures are the source of truth, so ELBURG has no
announcement bar. The footer's four-up strip is the USP bar that does render.

### Homepage — 10 bands

1. `BlockUspBar` — six label/value pairs (Made in Europe · Socially Responsible · Carbon
   Compensated · Transparent Production · European Leather · Since 1995)
2. `BlockHeaderHome` — full-bleed hero, product render on a tinted field, SVG wordmark headline
   ("The new ENVELOPE WALLET"), two CTAs, an award badge, and **three link tiles below the fold
   line** (WALLET MAKERS SINCE 1995 / CRAFTED TO LAST / RESPONSIBLY MADE IN EUROPE)
3. `BlockProductsCategory` "Wallet Categories" — three tall tiles (Essential Carry · Expanded
   Carry · Wallet add-ons), each with an eyebrow, a title and an "up to $X" price floor
4. `BlockCardProtectorUsps` — engraving service: phone mockup + three icon USPs
5. `BlockProductsCategory` "New & featured" — three landscape tiles, horizontally scrollable
6. `BlockHomeCollection` — full-bleed editorial band, italic display headline, one CTA
7. `BlockIconsProducts` "Our icons" — product rail; each card is a render on its tint, condensed
   caps name, colour name, price, and colour dots
8. `BlockCardProtectorUsps` — the flagship band: video/still, italic display headline, three icon
   USPs, shoppable dots
9. `BlockStoryColumns` "Our stories" — six editorial tiles at mixed aspect ratios (141/133/77/121/121/77)
10. Footer USP strip (Designed for repair · Extended warranty · Free delivery over $49 · 60-days
    return policy) + four-column footer + newsletter

### PDP — 8 sections

1. `PdpBlockHeaderSidebar` — a **three-panel horizontal image strip** (front / open / side) with
   prev-next controls, not a thumbnail gallery; sticky right sidebar with breadcrumb
   (Wallets › Expanded Carry › Envelope wallet), title, price, description, five property
   bullets, colour swatch, ADD TO BAG, and shipping/delivery notes
2. `PdpBlockSpecifications` — left blurb + four accordions (Product info · Care & Repair ·
   Return & guarantee · **Size & weight**, which renders a dimensioned SVG diagram and a gram figure)
3. `PdpBlockMaterial` — full-bleed dark band (`#454545`): material swatch photo, two-line display
   title, a quote, and three numbered `01/02/03` USPs
4. `BlockReview` — "WHAT PEOPLE SAY", italic pull-quote carousel with attribution
5. `PdpBlockWalletFacts` — six-card fact rail (Protected cards · We design to last · Extended
   warranty · B Corp certified · Super quick access · Red dot design award)
6. Stories band — dark, three editorial tiles
7. `PdpBlockOtherProducts` — "OTHER *ORIGINAL* ENVELOPE WALLET" colourway rail
8. Sticky buy bar (title + price + ADD TO BAG) + the shared footer

`BlockMixMatch` and `PdpBlockAddonPackage` also exist on the reference PDP; the add-on package
band is what the demo's three add-ons attach to.

### Checkout & confirmation — the one place with no reference capture

The reference's own checkout sits behind a real cart and was never captured, so this is the house
two-column pattern (`PLAN.md` Phase 4) rendered in ELBURG's voice rather than a rebuild of a
reference page: condensed-caps labels, italic serif for anything secondary, hairline ink borders
that go solid on focus, and the ink CTA that turns terracotta on hover.

**What is US-shaped, and why.** This is the `en-us` storefront, so the checkout differs from
VERDON's structurally rather than cosmetically:

- **Sales tax is added on top**, not contained in the price the way VERDON's VAT is. One flat rate
  (`SALES_TAX_RATE`, 8.75%), labelled *Estimated sales tax · demo rate* everywhere it renders.
  A table of per-state rates was considered and rejected: it would look precise and be wrong, and
  the demo has no reason to make a tax claim. Delivery is taxed with the goods.
- **One country, so it is stated rather than chosen** — a `StaticField` reading "United States",
  with the note that this storefront delivers within it. That is what makes the state select and
  the ZIP (5 or ZIP+4) the address's real fields.
- **Delivery is the catalogue's own rule**: standard $6, waived over the `freeShippingThreshold`
  the cart and footer already quote, plus express at $15. `src/data/elburg/checkout.ts` holds it
  and `/cart` reads the same function, so the two pages cannot quote different numbers.

The cart page therefore says **Estimated total** and names sales tax as *Calculated at checkout* —
it has no address, so it cannot quote one, and leaving the line out entirely would make the
checkout's total look like a surprise.

The confirmation carries a **register your wallet** panel: it is the extended warranty the footer
promises and the reference's next step, and it renders as `InertLink` because the naming map
retired `my.secrid.com` without inventing a domain to replace it.

---

## Build checklist

- [x] **Phase 0 — Register & name.** Reference inventoried; 8 full-page captures (desktop + 390px)
      in `sites/reference/elburg/`; brand, catalogue shape and currency confirmed with the user;
      naming map written; row added to `SITES.md`.
- [x] **Phase 1 — Scaffold.** `layout.tsx` (Barlow Condensed + Newsreader, metadata `%s | ELBURG`,
      themeColor `#f5f4f0`), `not-found.tsx`, `icon.svg`, `--color-elburg-*` tokens + `.site-elburg`
      font scope, hero + story assets de-branded into `public/images/elburg/`, registered in
      `src/data/sites.ts`, header + nav drawer (desktop two-column, mobile full-width) + footer.
      Build, lint, scrub grep and overflow at 390–2560 all clean.
- [x] **Phase 2 — Homepage.** All nine bands built against the captures: wallet categories, the
      icon-USP band (twice — engraving and the flagship, on the dark ground), new & featured,
      the collection band, our icons, our stories. 24 images downloaded and de-branded. Build,
      lint, scrub grep clean; no horizontal overflow and zero console errors at 390/768/1024/
      1440/1920/2560; fonts assert as Barlow Condensed + Newsreader; every anchor inert.
- [x] **Phase 3 — Catalogue, PDP & cart.** `src/data/elburg/products.ts` (8 models × 3 colourways
      + 3 add-ons), the 8-section PDP, cart store/context copied from `src/lib/verdon/` and adapted,
      cart drawer, `/cart`, listing page with the two carry tiers. 76 reference images downloaded,
      de-branded through the pipeline and flattened onto their tints. Nav destinations wired; the
      homepage's "Our icons" band now reads from the catalogue. Build, lint and scrub grep clean;
      QA harness green at 390–2560.
- [x] **Phase 4 — Checkout & polish.** `/elburg/checkout` (two-column, summary sticky beside the
      form and collapsed behind a bar below `lg`) and `/elburg/checkout/confirmation`, plus
      `src/data/elburg/checkout.ts`, `src/lib/elburg/checkout.ts` (US address, validation, masking)
      and `src/lib/elburg/order-store.ts` (`elburg-order-v1`, `ELB-#####`). Both Checkout CTAs —
      cart drawer and `/cart` — are real `Link`s now. Build, lint and scrub grep clean; the QA
      harness is green at 390–2560 across all six routes.
- [x] **Phase 5 — QA.** The `PLAN.md` harness (all twelve items) at 390/768/1024/1440/1920/2560
      across all six routes plus every model route — **274 assertions green** — and a screenshot of
      every band, header, footer, both drawers, all three empty states and the site 404, at desktop
      and mobile. Five visual findings fixed (below). Build, lint, scrub grep and both shape greps
      clean.

---

## QA specifics

Run the generic harness in `PLAN.md` against `/elburg`. Site facts it should assert: catalogue is
**24 SKUs** and the listing count label agrees; PDP section headings are the eight above;
colourway swap drives the three-panel strip *and* the tint behind it; add-ons change the CTA total
and reach the cart line unmerged; the sticky buy bar's ADD TO BAG is inside the viewport at every
QA width (it is a second add-to-cart control, so standing rule 6 applies to both).

Phase 4 adds: the delivery method re-prices the order and the tax with it; subtotal + delivery +
tax equals both the summary total and the CTA's; a short ZIP is rejected; the placed order empties
the cart, keeps only `cardLast4`, and reaches a confirmation that still names the colourway and the
add-on; and both empty states (no cart / no order) render rather than a broken form.

All of the above is asserted and green at 390/768/1024/1440/1920/2560 across all six routes —
`/elburg`, `/elburg/collections/all`, `/elburg/products/[slug]`, `/elburg/cart`,
`/elburg/checkout` and `/elburg/checkout/confirmation` (**274 assertions** as of Phase 5; seed
`elburg-cart-v1` and `elburg-order-v1` via `addInitScript` so the populated layouts are what gets
measured, not the empty states — and seed the order by *placing* one, since a hand-written object
fails the store's shape check and renders the empty state, which looks exactly like a broken page).

Phase 5 added: all eight model routes render; every listing card carries a tint and links to
`?colour=`; the strip's next control moves the rail; the nav drawer's Wallets panel resolves to
built routes only; the mobile drawer hoists all four sections; the landing page, switcher and both
404s; and no image is scaled up to fill its box.

Two harness details worth keeping:

- **Scope the cart-line count to `main`, and count the Remove buttons.** The drawer is always in
  the DOM and renders the same lines, so an unscoped count doubles them; and a line's add-ons are
  nested `li`s, so counting `li` over-counts again.
- The essential-carry filter narrows the listing to **9** of 24, which is a cheap check that the
  tier data and the count label are both live rather than written down.

**One known limit, deliberately left.** `hero/claspwallet-hero.jpg` is 1500 × 1153 behind a
full-bleed band, so above roughly 1500px of viewport it is scaled up — 1.7× at 2560. Fixing it
means re-pulling the hero at a larger transform and re-running the de-branding on a new resolution,
and the de-branding *checks* are the expensive, risky half (standing rule 9); a sharper hero at
2560 is not worth a chance of shipping the reference's wordmark. The harness names the file in a
`SOURCE_LIMITED` list so the assertion still catches anything new.

Three traps this site's design invites, worth asserting early:

- The **per-product tint** is data, not a token. Since Phase 3 the tint is also baked into every
  render, so a colourway that lost its `tint` shows a seam around a letterboxed image rather than a
  cut-out floating on the paper background — less destructive, but still wrong.
- The PDP image strip and the "Our icons" / colourway rails are **horizontal scroll rails**:
  standing rule 5's `min-w-0` applies to every one of them, and `sr-only` spans inside them need
  `relative` on the rail root (the VERDON carousel bug).
- **This site's photography is unusually mixed in shape** — 45-ratio editorial panoramas next to
  172-ratio portraits — and three of its bands crop them hard, so `sizes` here has to be derived
  from the source's own ratio rather than written as a flat `vw`. `stories` and `featuredTiles`
  both carry a `sourceRatio` for exactly that; keep it accurate when swapping a photograph.

### The scrub grep

After any content refresh, this must return nothing:

```
grep -rniIE "secrid|cardprotector|\bmagsafe\b|miniwallet|slimwallet|twinwallet|bandwallet|flexwallet|cardslide|moneyband|coinpocket|pocketwear|chipolo|freitag|sheltersuit|\bmirum\b|\bb.corp|red.?dot|van.geer|sasse|bührmann|buhrmann|\bwout\b|texano|naplak|crisple|basco|hammerstone" src public
```

Run it over `src` and `public` only — this file and `SITES.md` keep the provenance notes on
purpose, and neither is served. As on VERDON, the grep cannot see three shapes of leak: **binary
artwork** (the reference's headline SVGs and award badges are typographic — none may ship),
**initialisms** of the original brand, and **new proprietary marks**. Follow it with a shape-grep
for `®`/`™` suffixes and interior-capital words.

---

## Session notes

- 2026-07-31 (Session 1, Phase 0): Registered the site. The reference is **Storyblok + Next.js,
  not Shopify**, so `PLAN.md`'s pull table did not apply — the replacement technique
  (`__NEXT_DATA__`, and the server-rendered `?model=` facet filter to escape client-side
  pagination) is documented above and has been promoted to `PLAN.md` as a second reference-pulling
  recipe. Three naming candidates died on collision checks and are recorded so they are not
  re-proposed: **Wrapwallet** (Thread & Leather sell a "Wrap Wallet"), **Softwallet** and
  **Slipwallet** (both live brands), **Springwallet** (Clark Morelia), **Common Good Certified**
  (a real certification tied to B Corp), and **Kompas/Northlight Design Award** (too close to
  Kompas Design and the Northern Design Awards). The lesson worth keeping: for a certification or
  an award, *dropping the third party and restating the claim first-party* is safer than inventing
  a body — invented certification names kept landing on real programmes. Same reasoning retired
  the Chipolo stand-in: the tracker card is simply first-party. User confirmed ELBURG, 8 × 3 + 3
  add-ons, and USD pricing. Nothing scaffolded yet — Phase 1 is the next session.

- 2026-07-31 (Session 2, Phase 1): Shell shipped. Three things worth carrying forward:

  **The fonts were never rendering — on either site.** `globals.css` wrote its font roles as
  `--font-heading: var(--site-heading-font, <system stack>)`, but `@theme` emits into `:root`, where
  `--site-heading-font` is undefined, so the fallback resolved and was baked in *there*; custom
  properties inherit as computed values, so the `.site-<slug>` wrapper's definition could never
  reach it. VERDON has been rendering in `-apple-system` since the tokens landed and it survived a
  full QA phase — an assertion on `getComputedStyle(wrapper).fontFamily` would have caught it, and
  is now QA item 11. Fixed for both sites: `@theme` holds literal shell stacks, each wrapper
  redefines `--font-heading` / `--font-sans` directly.

  **The reference brand is in the photographs.** Two legible wordmarks in the hero alone. The
  clone-stamp/blur recipe and its traps are written up above and promoted to `PLAN.md` as standing
  rule 9 — budget time for this in Phase 3, when ~100 product images land. Two story images were
  dropped rather than retouched because they are portraits of the reference's actual staff.

  **The nav is a drawer, click-triggered.** Hover does nothing; that cost a couple of capture runs.
  Four new captures are in `sites/reference/elburg/`, and the structure is documented above.

  Nav destinations are all inert for now — `collections/all` and `products/[slug]` do not exist
  until Phase 3, and pointing at them would 404. Phase 3 wires the eight model links to their PDPs
  and "See all wallets" to the listing. Also unbuilt by design: the cart button in the header is a
  placeholder until the cart store lands.

- 2026-08-03 (Session 3, Phase 2): Homepage complete. The nine bands and their data had been
  written in a working session that ended before its notes were, so this session opened by
  verifying what was actually there rather than by building — worth knowing when reading the file
  dates. The components were sound; the gap was everything that comes *after* the markup.

  **Nine of the 24 shipped images were still carrying the reference's brand**, in five distinct
  places (the list is in the de-branding section above). The two that matter most as lessons:
  the **press studs** — engraved around the rim on every wallet, and invisible unless you go
  looking at a 40px disc — and the **props**, where a shipping carton's QR code, a real trade
  body's mark on a notebook spine and a bank's logo on a card had all ridden along. The carton
  and its QR sat outside the crop the tile actually renders, so `impact-fund.jpg` was cropped to
  its rendered window rather than retouched; that trick is now in `PLAN.md`. Screening by eye and
  by `find_mark` both missed marks that a high-pass view showed immediately — the add-ons flap's
  maker's stamp survived a first inspection as "grain". Five patches had to be redone because the
  rect was drawn to the mark instead of around it, leaving the first and last glyph readable.

  **The scrub grep found five hits in `src/`** — the reference's own Storyblok component name
  (`BlockCardProtectorUsps`) quoted in code comments, plus a dropped model name. The CMS names are
  genuinely useful for re-finding a band in the data, so they now live only in the page anatomy
  above and the code names the band by what it does. Promoted to `PLAN.md`.

  **The stories band's ratios are the reference's, but the photographs are not.** The opening 141
  slot had a landscape flat-lay in it, which `object-cover` upscaled into something visibly soft
  beside its neighbours. The ratio sequence stayed; the entries were reordered so each slot gets a
  source at least as tall as itself.

  QA is clean at 390–2560 (overflow, console, fonts, link hygiene, all 24 images). One harness trap
  cost a false alarm and is now in `PLAN.md`: `next/image` lazy-loads, so an immediate broken-image
  check reports 19 of 24 as broken and `fullPage` screenshots come back with blank bands — scroll
  the viewport down the page first. Left as an observation, not a defect: with the reference's
  ratio sequence in three columns, the first column runs ~40% taller than the other two. The
  reference's own band is empty in the captures (it loads client-side by UUID), so there is no
  ground truth to match; revisit in Phase 5 polish if it reads as unbalanced rather than editorial.

- 2026-08-03 (Session 4, Phase 3): Catalogue, listing, PDP and cart. 24 SKUs from eight real
  reference models, 76 images pulled and de-branded, five new routes' worth of components, and the
  homepage's "Our icons" band rewired to read the catalogue instead of its own copy of it.

  **The de-branding is the phase.** Roughly two thirds of the session went on it, and the reason is
  worth writing down: *the checks were wrong before the retouching was*. Three of them failed in
  sequence, each catching what the last one missed.

  1. **The high-pass contact sheet is a screening tool, not a verification tool.** At 300px a cell,
     a 25px wordmark on a card holder's spine is a smudge. Two rounds of "clean" contact sheets
     shipped a Claspwallet whose open view still said the reference's name, plainly, at the size the
     PDP renders it.
  2. **So `verify.py` crops every recipe rect out of the *cleaned* file at 4× and tiles them** —
     112 crops, one per op. That found nine survivors in one look, including five spine rects I had
     measured 5–8% of the image width off by reading them off a montage instead of measuring them.
     But it only checks where the recipe *claims* a mark is: the Claspwallet's rect was 2% off, so
     its crop showed a clean spine and the mark shipped anyway.
  3. **So `detect.py` sweeps the whole frame** — high-pass, threshold, cluster, report every blob
     shaped like a six-letter word. 37 hits over 70 renders, all of them the reference's generic
     mock-card print ("CREDITCARD", "GOLDC…"), stitching or a stud's own ring. That is the check
     that can say *clean* rather than *the places I looked were clean*.

  **`find_mark` measures; it does not screen.** Given a region it finds something. Every op is now a
  `fixed` rect, and where a family's colourways are framed differently enough that one fraction
  cannot serve — the Duowallet's renders are 442, 480 and 501px wide — there is a per-colourway
  override. The rects that had to be measured were measured numerically (`find_mark` over a narrow
  band at k=60), not read off a picture.

  **Two new tools.** Press studs get `stud_smear` (average a fan of rotated copies: engraving is
  localised in angle, the dome's shading only in radius) because a blur either leaves the letters or
  prints a halo on the leather. Flat vector artwork gets `fill` (paint the field's own colour back
  over it) because a clone drags the illustration's line work along.

  **A cached optimised image cost twenty minutes.** `.next/cache/images` survives a rebuild, so
  after re-shipping a corrected JPEG the browser still served the branded one and it looked like the
  patch had failed. Promoted to `PLAN.md`.

  **Renders now carry their tint in the pixels**, flattened at build time — 28MB of RGBA PNG became
  7.6MB of JPEG, and nothing anywhere shows these on another ground.

  Three build decisions worth carrying into Phase 4. The listing shows 24 cards but the site has
  eight product routes, with the colourway in `?colour=` (standing rule 3 forbids 24 routes; the
  reference gives each SKU its own URL). The PDP splits at the colourway: `ProductDetail` is a
  client component holding the colour and add-on state and rendering the five sections that depend
  on it, and the three that do not — reviews, wallet facts, stories — arrive as `children` and stay
  server components. And the image strip sizes each panel by *its own* aspect ratio at a shared
  height; giving them one box and a fixed width made the narrow panels short and the strip read as
  broken.

  QA at 390–2560 is clean across all four built routes. The one thing deliberately left dead: the
  Checkout CTA, which is an `InertLink` until Phase 4 builds the route.

- 2026-08-03 (Session 5, Phase 4): Checkout and confirmation. The plumbing came from
  `src/lib/verdon/` as standing rule 7 intends, and the interesting part was everything that could
  *not* be copied.

  **The reference's region is a structural fact, not a currency setting.** VERDON's checkout is an
  EU one — VAT-inclusive prices, a country select, a postal code. ELBURG is the `en-us` storefront,
  so tax is added on top rather than contained, the country is stated rather than chosen (one
  storefront, one country), and the address needs a state and a ZIP. Copying VERDON's form and
  swapping the currency would have produced something that looks right and reads wrong to anyone
  who has bought anything in the US. Promoted to `PLAN.md`.

  On tax: a per-state rate table was written and then thrown away. It makes the state select feel
  alive, but per-state rates in a demo are a precise-looking claim that is wrong the moment a local
  rate applies — one flat figure labelled *demo rate* is honest and reads the same.

  **The cart and the checkout have to quote the same delivery.** `/cart` had `formatPrice(6)`
  hard-coded next to a `>= freeShippingThreshold` test; both now come from `shippingCost()` in
  `src/data/elburg/checkout.ts`. The cart also names sales tax as *Calculated at checkout* and
  calls its figure an **Estimated total**, because it has no address to price tax against and a
  total that quietly grows at the next step is worse than one that says why.

  **A tinted panel inside a tinted column double-tints.** The summary aside carries
  `bg-elburg-bone/40` so the ground fills the row however tall the form gets, and `OrderSummary`
  carried it too for the standalone use on the confirmation — so on the checkout the panel came out
  at 232,232,222 against the rest of the column's 237,236,229. Obvious in a pixel sample, easy to
  miss by eye. The collapsible variant is now transparent and the standalone one keeps its ground.
  Promoted to `PLAN.md`.

  **Three of the five harness failures this session were the harness.** `button[type=submit]` also
  matches the footer newsletter's `sr-only` submit; `[role=alert]` also matches Next's route
  announcer; `button[aria-expanded]` also matches the header burger. And `innerText` returns text
  *as CSS renders it*, so `/Estimated delivery/` failed against a heading that says exactly that,
  because it is styled `uppercase`. Scope to `main` and match headings case-insensitively — both
  are now in `PLAN.md`'s harness traps. The one real finding was the double-tint above.

  95 assertions green at 390–2560 across all six routes, with the cart and a placed order seeded
  through `addInitScript` so the populated layouts are what gets measured. Build, lint and scrub
  grep clean.

- 2026-08-04 (Session 7): Opened to continue, but every checklist item is checked and `SITES.md`
  says complete — so the session verified rather than built. Build, lint, the scrub grep and the
  `®`/`™` shape grep are all clean against the current tree. No code changed. The one known limit
  (the 1500px hero upscaling above ~1500px viewports) stands as deliberately left.

- 2026-08-03 (Session 6, Phase 5): QA. The harness went from 95 assertions to 274 — the whole of
  `PLAN.md`'s list, all eight model routes, the showcase shell and both 404s — and passed on the
  first full run once its own selector bugs were out (a card is an `<article>`, not an anchor; the
  nav drawer is a `role=dialog`, not a `nav`). **The harness found nothing.** Everything below came
  from the screenshots, and that is the finding worth keeping: every defect was a band's layout
  *against its neighbours*, which no single-element assertion is shaped to catch.

  **Three alignment findings, all of the same kind.** The wallet-categories band bottom-aligns its
  captions, so the add-ons tile — the one with no price floor — sat a line lower than the two
  beside it while the reference lines all three eyebrows up. The PDP's fact rail carried a
  *per-card* aspect ratio, which is right for the stories band's masonry columns and wrong in a
  row: six cards, six baselines. And the stories band itself ran ~40% longer in column one, the
  open question Session 3 left for this phase — the reference's authored order puts both tall
  tiles first, and CSS multi-column balances by height but cannot break a tile. Pairing the ratios
  141+77 / 133+77 / 121+121 brings the three columns within 2%. All three are now in `PLAN.md`.

  **Then a check that was wrong about how the platform works.** "No image is upscaled to fill its
  box" looked easy — compare the box to `naturalWidth` — and reported nineteen failures. On a
  `srcset`/`sizes` image `naturalWidth` is *density-corrected*: the file's width divided by
  (chosen descriptor ÷ resolved slot), so it sits near the box's width whatever the file is, and a
  9% shortfall reads as 1.4×. Re-loading `img.currentSrc` into a bare `Image()` gives real pixels;
  loading the un-optimised path alongside it separates a `sizes` bug from a source that simply has
  too few pixels. Two of the nineteen survived that correction, and both were real:

  - **`sizes` describes the scaled image, not the box.** `object-cover` on a source flatter than
    its box scales by *height*, so the file it needs is `boxWidth × (boxRatio ÷ sourceRatio)`. The
    2200 × 992 collection photograph in a 342 × 420 mobile band was under-fetched 2.4×; the
    1200 × 677 Premium+ tile in a 99:85 box, 1.5× at 2560. The PDP's image strip is the same trap
    in a second shape — its panels are sized by the rail's *height*, so no `vw` describes them at
    all and the wide open view came in at 1.36×. `stories` and `featuredTiles` now carry the
    photograph's own ratio and each band derives its hint from it.
  - **A source can just be too small.** The hero is 1500 × 1153 behind a full-bleed band and
    upscales past ~1500px of viewport. Left as it is, on purpose: re-pulling it means re-running
    the de-branding at a new resolution, and standing rule 9's checks are the expensive half. The
    harness carries it in a named `SOURCE_LIMITED` list so the assertion still catches new ones.

  Two smaller things. A landscape flat-lay (800 × 452) was filling a 4:5 tile in the PDP's stories
  band and a portrait card in the fact rail — both bands now select photographs at least as tall as
  their box, rather than taking the first three. And a lesson about reading screenshots: the
  flagship band looked, at screenshot scale, like it had lost its dark ground. It had not —
  `rgb(69,69,69)`, exactly as written. Sample pixels before believing a colour.
