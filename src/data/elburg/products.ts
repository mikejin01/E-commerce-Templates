/**
 * ELBURG's demo catalogue — eight wallet models × three colourways = 24 SKUs,
 * plus three add-ons, restated against the live reference product data captured
 * on 2026-08-03 (see `sites/elburg.md`, "Pulling the reference").
 *
 * Real from the reference: the model line-up and its two carry tiers, USD
 * prices, colourway names and their per-product tints, the property bullets,
 * the accordion copy, the material bands and the render set (front / open /
 * side) behind every colourway.
 *
 * Demo-authored: the size-and-weight figures for seven of the eight models. The
 * reference loads those from an API rather than the page, so only the
 * Claspwallet's (102 × 72 × 25 mm, 78 g) is the reference's own; the rest are
 * plausible figures for a wallet of that shape.
 *
 * Every name here has been through the naming map — the models, the finishes,
 * the flagship's proprietary mark and the add-ons. Nothing in this file may name
 * a real company (standing rule 2); re-run the scrub grep in `sites/elburg.md`
 * after any refresh.
 *
 * **Renders carry their tint in the pixels.** The reference composites cut-out
 * PNGs onto a per-product tint; ELBURG bakes that composite in at build time, so
 * `ProductImage.src` is already a tinted JPEG. `ColorVariant.tint` still ships,
 * because the same colour drives the panel behind the render, the listing card's
 * ground and the cart thumbnail — an image whose box is a different colour shows
 * a seam.
 */

export type CarryTier = "essential" | "expanded";

export type MaterialKey = "aluminium" | "pebble" | "matte" | "vintage" | "original";

export type ProductImage = {
  src: string;
  alt: string;
  /** width ÷ height. The renders are portrait and vary per view — 0.64 for a
   *  front, 0.14 for a side, 1.85 for an open — so the gallery cannot assume
   *  one box like VERDON's square packshots could. */
  ratio: number;
};

export type ColorVariant = {
  name: string;
  slug: string;
  /** the finish, which the reference prints as part of the product title —
   *  "Claspwallet Pebble". Empty on the aluminium models, which have none. */
  finish: string;
  /** swatch dot */
  hex: string;
  /** the ground the render sits on, everywhere it appears */
  tint: string;
  material: MaterialKey;
  images: ProductImage[];
};

export type Accordion = {
  title: string;
  lead?: string;
  paragraphs?: string[];
  list?: { heading: string; items: string[] };
  footer?: { heading: string; body: string };
};

export type Dimensions = {
  /** millimetres */
  width: number;
  height: number;
  depth: number;
  /** grams */
  weight: number;
};

export type Product = {
  slug: string;
  name: string;
  tier: CarryTier;
  /** USD, whole units */
  price: number;
  /** the italic standfirst under the price */
  description: string;
  /** the five ticked bullets in the sidebar */
  properties: string[];
  accordions: Accordion[];
  dimensions: Dimensions;
  colors: ColorVariant[];
};

export const carryTiers: Record<CarryTier, { label: string; cards: string; blurb: string }> = {
  essential: {
    label: "Essential Carry",
    cards: "up to 6 cards",
    blurb: "The card protector on its own, or with just enough around it.",
  },
  expanded: {
    label: "Expanded Carry",
    cards: "up to 16 cards",
    blurb: "Room for notes, receipts and the cards that will not fit anywhere else.",
  },
};

export const materials: Record<
  MaterialKey,
  { title: [string, string]; quote: string; image: string; alt: string; usps: { label: string; value: string }[] }
> = {
  aluminium: {
    title: ["Strong", "aluminium"],
    quote:
      "The aluminium protects your cards against bending, breaking and unwanted wireless communication.",
    image: "/images/elburg/materials/aluminium.jpg",
    alt: "Extruded aluminium profiles stacked in a workshop",
    usps: [
      { label: "Anodised strong surface", value: "finish" },
      { label: "Patented mechanism", value: "highest quality" },
      { label: "Made in the Netherlands", value: "sheltered workshops" },
    ],
  },
  pebble: {
    title: ["Pebble", "leather"],
    quote:
      "Embossed leather with a pebble grain texture. Made in Italy and inspired by high-end clothing, Pebble is unquestionably stylish.",
    image: "/images/elburg/materials/pebble.jpg",
    alt: "A swatch of pebble-grain leather",
    usps: [
      { label: "Pebble grain embossing", value: "finish" },
      { label: "European cowhide", value: "highest quality" },
      { label: "Made in the Netherlands and Italy", value: "sheltered workshop" },
    ],
  },
  matte: {
    title: ["Matte", "leather"],
    quote: "A rugged leather type that can withstand everyday hustle and bustle.",
    image: "/images/elburg/materials/matte.jpg",
    alt: "A swatch of matte green leather",
    usps: [
      { label: "Soft matte finish", value: "finish" },
      { label: "European cowhide", value: "highest quality" },
      { label: "Made in the Netherlands", value: "sheltered workshop" },
    ],
  },
  vintage: {
    title: ["Vintage", "leather"],
    quote:
      "Our Vintage leather has a carefully abraded surface and a wax finish that gives a stonewashed look.",
    image: "/images/elburg/materials/vintage.jpg",
    alt: "A swatch of waxed vintage leather",
    usps: [
      { label: "Aniline dyed, finished with wax", value: "finish" },
      { label: "European cowhide", value: "highest quality" },
      { label: "Made in the Netherlands and Italy", value: "sheltered workshop" },
    ],
  },
  original: {
    title: ["Original", "leather"],
    quote:
      "Whether you are wearing a suit or worn jeans, this smooth leather with its naturally glossy finish fits every style.",
    image: "/images/elburg/materials/original.jpg",
    alt: "A swatch of smooth black leather",
    usps: [
      { label: "Smooth semi-aniline", value: "finish" },
      { label: "European cowhide", value: "highest quality" },
      { label: "Made in the Netherlands and Italy", value: "sheltered workshop" },
    ],
  },
};

/** Shared accordion copy. Return & guarantee is identical on every product and
 *  the care text depends only on whether the body is metal or leather. */
const RETURN_ACCORDION: Accordion = {
  title: "Return & guarantee",
  paragraphs: [
    "Not the wallet you hoped for? Return it within 60 days of delivery, unused and in its packaging, and we refund the full amount.",
    "Every ELBURG wallet carries a two-year guarantee, which becomes three years when you register your wallet with us.",
  ],
};

const METAL_CARE: Accordion = {
  title: "Care & repair",
  paragraphs: [
    "The card protector is made of anodised aluminium, plastic and stainless steel, and is impervious to water.",
    "Clean it with a soft cloth and soap and rinse with warm water. Salt affects the metals, so rinse with fresh water after contact with sea water and make sure the mechanism is dry before using the wallet again.",
  ],
};

const LEATHER_CARE: Accordion = {
  title: "Care & repair",
  paragraphs: [
    "The leather we choose for our wallets needs no regular maintenance.",
    "If your wallet does get dirty or wet, a few steps will keep the leather's look and feel. Depending on the leather there are two ways to go about it — bring it to a Care & Repair point and we will show you which.",
  ],
};

export const products: Product[] = [
  {
    slug: "cardlift",
    name: "Cardlift",
    tier: "essential",
    price: 49,
    description:
      "The most minimal wallet, and the heart of every ELBURG product. One motion slides your cards out, ready to use.",
    properties: ["Holds up to 6 cards", "RFID protected", "Two-year warranty"],
    accordions: [
      {
        title: "Product info",
        lead: "Go minimal",
        paragraphs: [
          "The most minimal wallet and the heart of every ELBURG product. The patented lever slides your cards out with one simple motion, ready for immediate use. The aluminium casing protects them from bending, breaking and unwanted wireless communication.",
        ],
        list: { heading: "Holds", items: ["A maximum of 4 embossed or 6 flat plastic cards"] },
      },
      METAL_CARE,
      RETURN_ACCORDION,
    ],
    dimensions: { width: 65, height: 102, depth: 8, weight: 41 },
    colors: [
      {
        name: "Black",
        slug: "black",
        finish: "",
        hex: "#454545",
        tint: "#454545",
        material: "aluminium",
        images: [
          { src: "/images/elburg/products/cardlift/black-front.jpg", alt: "Cardlift in black anodised aluminium", ratio: 461 / 762 },
          { src: "/images/elburg/products/cardlift/black-open.jpg", alt: "Cardlift with its cards stepped out", ratio: 912 / 720 },
          { src: "/images/elburg/products/cardlift/black-side.jpg", alt: "Cardlift seen edge on", ratio: 60 / 720 },
        ],
      },
      {
        name: "Red",
        slug: "red",
        finish: "",
        hex: "#BA4C40",
        tint: "#BA4C40",
        material: "aluminium",
        images: [
          { src: "/images/elburg/products/cardlift/red-front.jpg", alt: "Cardlift in red anodised aluminium", ratio: 461 / 762 },
          { src: "/images/elburg/products/cardlift/red-open.jpg", alt: "Cardlift in red with its cards stepped out", ratio: 912 / 720 },
          { src: "/images/elburg/products/cardlift/red-side.jpg", alt: "Cardlift in red seen edge on", ratio: 60 / 720 },
        ],
      },
      {
        name: "Sand",
        slug: "sand",
        finish: "",
        hex: "#BCAA93",
        tint: "#BCAA93",
        material: "aluminium",
        images: [
          { src: "/images/elburg/products/cardlift/sand-front.jpg", alt: "Cardlift in sand anodised aluminium", ratio: 461 / 762 },
          { src: "/images/elburg/products/cardlift/sand-open.jpg", alt: "Cardlift in sand with its cards stepped out", ratio: 912 / 720 },
          { src: "/images/elburg/products/cardlift/sand-side.jpg", alt: "Cardlift in sand seen edge on", ratio: 60 / 720 },
        ],
      },
    ],
  },
  {
    slug: "cardlift-snap",
    name: "Cardlift Snap",
    tier: "essential",
    price: 69,
    description:
      "Keeps your phone and your cards in one hand. The Cardlift Snap holds to the back of a phone and comes away when you would rather it did not.",
    properties: [
      "Holds up to 6 cards",
      "Magnetic phone attachment",
      "RFID protected",
      "Two-year warranty",
    ],
    accordions: [
      {
        title: "Product info",
        lead: "The new Cardlift Snap",
        paragraphs: [
          "A strong magnet secures the Cardlift Snap to the back of a compatible phone, and releases it just as easily when the day calls for something else. Your cards stay fully protected against unwanted wireless communication.",
          "Compatible with phones that support magnetic accessory attachment, directly or through a suitable case or adapter.",
        ],
        list: { heading: "Holds", items: ["A maximum of 4 embossed or 6 flat plastic cards"] },
        footer: {
          heading: "Warning — strong magnet",
          body: "This product contains magnets. Magnets produce a magnetic field which may interfere with medical devices. Consult your physician for further information about your device.",
        },
      },
      METAL_CARE,
      RETURN_ACCORDION,
    ],
    dimensions: { width: 65, height: 102, depth: 11, weight: 60 },
    colors: [
      {
        name: "Titanium",
        slug: "titanium",
        finish: "",
        hex: "#B6B6B6",
        tint: "#B6B6B6",
        material: "aluminium",
        images: [
          { src: "/images/elburg/products/cardlift-snap/titanium-front.jpg", alt: "Cardlift Snap in titanium, magnetic pad facing out", ratio: 344 / 720 },
          { src: "/images/elburg/products/cardlift-snap/titanium-open.jpg", alt: "Cardlift Snap laid flat with its cards fanned", ratio: 986 / 720 },
          { src: "/images/elburg/products/cardlift-snap/titanium-side.jpg", alt: "Cardlift Snap seen edge on", ratio: 73 / 720 },
        ],
      },
      {
        name: "Fuchsia",
        slug: "fuchsia",
        finish: "",
        hex: "#B45672",
        tint: "#B45672",
        material: "aluminium",
        images: [
          { src: "/images/elburg/products/cardlift-snap/fuchsia-front.jpg", alt: "Cardlift Snap in fuchsia, magnetic pad facing out", ratio: 344 / 720 },
          { src: "/images/elburg/products/cardlift-snap/fuchsia-open.jpg", alt: "Cardlift Snap in fuchsia laid flat with its cards fanned", ratio: 986 / 720 },
          { src: "/images/elburg/products/cardlift-snap/fuchsia-side.jpg", alt: "Cardlift Snap in fuchsia seen edge on", ratio: 73 / 720 },
        ],
      },
      {
        name: "Lime",
        slug: "lime",
        finish: "",
        hex: "#BCB693",
        tint: "#BCB693",
        material: "aluminium",
        images: [
          { src: "/images/elburg/products/cardlift-snap/lime-front.jpg", alt: "Cardlift Snap in lime, magnetic pad facing out", ratio: 344 / 720 },
          { src: "/images/elburg/products/cardlift-snap/lime-open.jpg", alt: "Cardlift Snap in lime laid flat with its cards fanned", ratio: 986 / 720 },
          { src: "/images/elburg/products/cardlift-snap/lime-side.jpg", alt: "Cardlift Snap in lime seen edge on", ratio: 73 / 720 },
        ],
      },
    ],
  },
  {
    slug: "cardlift-sleeve",
    name: "Cardlift Sleeve",
    tier: "essential",
    price: 99,
    description:
      "A modular wallet: a Cardlift, a slide and a band. Carry all three, or leave one at home.",
    properties: [
      "Holds up to 6 cards",
      "Space for small essentials",
      "RFID protected",
      "Two-year warranty",
    ],
    accordions: [
      {
        title: "Product info",
        lead: "The modular wallet",
        paragraphs: [
          "Configure the three parts of the Cardlift Sleeve however you like. Combine the Cardlift, the band and the slide for room to carry business cards, notes and smaller personal things. Use the Cardlift with the band alone for a few extra notes and receipts. Or go minimal with just the Cardlift — it is up to you.",
        ],
        list: {
          heading: "Holds",
          items: [
            "A maximum of 4 embossed or 6 flat plastic cards",
            "2 extra cards, banknotes, business cards, receipts and small items",
          ],
        },
      },
      METAL_CARE,
      RETURN_ACCORDION,
    ],
    dimensions: { width: 68, height: 102, depth: 15, weight: 70 },
    colors: [
      {
        name: "Desert",
        slug: "desert",
        finish: "",
        hex: "#A8886B",
        tint: "#A8886B",
        material: "aluminium",
        images: [
          { src: "/images/elburg/products/cardlift-sleeve/desert-front.jpg", alt: "Cardlift Sleeve in desert with its elastic band", ratio: 414 / 720 },
          { src: "/images/elburg/products/cardlift-sleeve/desert-side.jpg", alt: "Cardlift Sleeve in desert seen edge on", ratio: 126 / 720 },
        ],
      },
      {
        name: "Black",
        slug: "black",
        finish: "",
        hex: "#666666",
        tint: "#666666",
        material: "aluminium",
        images: [
          { src: "/images/elburg/products/cardlift-sleeve/black-front.jpg", alt: "Cardlift Sleeve in black with its elastic band", ratio: 414 / 720 },
          { src: "/images/elburg/products/cardlift-sleeve/black-open.jpg", alt: "Cardlift Sleeve in black with the slide drawn out", ratio: 314 / 720 },
          { src: "/images/elburg/products/cardlift-sleeve/black-side.jpg", alt: "Cardlift Sleeve in black seen edge on", ratio: 126 / 720 },
        ],
      },
      {
        name: "Charcoal",
        slug: "charcoal",
        finish: "",
        hex: "#5C5648",
        tint: "#5C5648",
        material: "aluminium",
        images: [
          { src: "/images/elburg/products/cardlift-sleeve/charcoal-front.jpg", alt: "Cardlift Sleeve in charcoal with its elastic band", ratio: 414 / 720 },
          { src: "/images/elburg/products/cardlift-sleeve/charcoal-side.jpg", alt: "Cardlift Sleeve in charcoal seen edge on", ratio: 126 / 720 },
        ],
      },
    ],
  },
  {
    slug: "notewallet",
    name: "Notewallet",
    tier: "expanded",
    price: 99,
    description:
      "Its slim profile fits any pocket. The open exterior is cut extra wide, to hold cards, banknotes and receipts.",
    properties: [
      "Holds up to 12 cards",
      "Extra storage for bills",
      "Without closing mechanism",
      "RFID protected",
      "Two-year warranty",
    ],
    accordions: [
      {
        title: "Product info",
        lead: "The billfold, reconsidered",
        paragraphs: [
          "A slim profile lets the Notewallet sit flat in any pocket. The open exterior is cut extra wide for cards, banknotes and receipts, while the Cardlift mechanism inside slides your cards out in one motion and its aluminium body protects them from bending, breaking and unwanted wireless communication.",
        ],
        list: {
          heading: "Holds",
          items: [
            "A maximum of 4 embossed or 6 flat cards",
            "Up to 6 extra cards in the exterior wrap",
            "Banknotes, business cards and receipts",
          ],
        },
        footer: {
          heading: "Open exterior",
          body: "The Notewallet's exterior wrap has no button or magnet closure.",
        },
      },
      LEATHER_CARE,
      RETURN_ACCORDION,
    ],
    dimensions: { width: 68, height: 102, depth: 21, weight: 74 },
    colors: [
      {
        name: "Nightblue & Orange",
        slug: "nightblue-orange",
        finish: "Matte",
        hex: "#3A4256",
        tint: "#C05746",
        material: "matte",
        images: [
          { src: "/images/elburg/products/notewallet/nightblue-orange-front.jpg", alt: "Notewallet in matte nightblue leather with orange stitching", ratio: 419 / 720 },
          { src: "/images/elburg/products/notewallet/nightblue-orange-open.jpg", alt: "Notewallet opened flat, cards in the card holder", ratio: 1090 / 720 },
          { src: "/images/elburg/products/notewallet/nightblue-orange-side.jpg", alt: "Notewallet seen edge on", ratio: 104 / 720 },
        ],
      },
      {
        name: "Black",
        slug: "black",
        finish: "Matte",
        hex: "#3B3B3B",
        tint: "#666666",
        material: "matte",
        images: [
          { src: "/images/elburg/products/notewallet/black-front.jpg", alt: "Notewallet in matte black leather", ratio: 418 / 720 },
          { src: "/images/elburg/products/notewallet/black-open.jpg", alt: "Notewallet in black opened flat", ratio: 1096 / 720 },
          { src: "/images/elburg/products/notewallet/black-side.jpg", alt: "Notewallet in black seen edge on", ratio: 102 / 720 },
        ],
      },
      {
        name: "Teal",
        slug: "teal",
        finish: "Vintage",
        hex: "#849399",
        tint: "#849399",
        material: "vintage",
        images: [
          { src: "/images/elburg/products/notewallet/teal-front.jpg", alt: "Notewallet in vintage teal leather", ratio: 391 / 720 },
          { src: "/images/elburg/products/notewallet/teal-open.jpg", alt: "Notewallet in teal opened flat", ratio: 1103 / 720 },
          { src: "/images/elburg/products/notewallet/teal-side.jpg", alt: "Notewallet in teal seen edge on", ratio: 92 / 720 },
        ],
      },
    ],
  },
  {
    slug: "claspwallet",
    name: "Claspwallet",
    tier: "expanded",
    price: 109,
    description:
      "The Claspwallet combines timeless design with practicality, and offers unexpected spaciousness for everyday carry.",
    properties: [
      "Holds up to 8 cards",
      "Compartment for coins and small items",
      "With button closure",
      "RFID protected",
      "Two-year warranty",
    ],
    accordions: [
      {
        title: "Product info",
        lead: "The new Claspwallet",
        paragraphs: [
          "Inspired by the envelope and reimagined as one of our most practical wallets. It holds your cards safely and unfolds its storage compartment without being asked twice. Coins, tokens, a photograph and the other things worth keeping close, all in one compact wallet.",
        ],
        list: {
          heading: "Holds",
          items: [
            "4 embossed or 6 flat plastic cards, RFID protected",
            "2 extra cards in the exterior wrap",
            "More than 8 coins and small items",
            "Business cards and receipts",
          ],
        },
        footer: {
          heading: "Made in Europe",
          body: "We source high-quality leather from European suppliers and assemble our wallets in Dutch sheltered workshops.",
        },
      },
      LEATHER_CARE,
      RETURN_ACCORDION,
    ],
    dimensions: { width: 72, height: 102, depth: 25, weight: 78 },
    colors: [
      {
        name: "Cappuccino",
        slug: "cappuccino",
        finish: "Pebble",
        hex: "#C1A488",
        tint: "#C1A488",
        material: "pebble",
        images: [
          { src: "/images/elburg/products/claspwallet/cappuccino-front.jpg", alt: "Claspwallet in cappuccino pebble leather with a press stud", ratio: 388 / 720 },
          { src: "/images/elburg/products/claspwallet/cappuccino-open.jpg", alt: "Claspwallet opened out, cards and coin compartment visible", ratio: 1071 / 720 },
          { src: "/images/elburg/products/claspwallet/cappuccino-side.jpg", alt: "Claspwallet seen edge on", ratio: 166 / 720 },
        ],
      },
      {
        name: "Ice Blue",
        slug: "ice-blue",
        finish: "Pebble",
        hex: "#849399",
        tint: "#849399",
        material: "pebble",
        images: [
          { src: "/images/elburg/products/claspwallet/ice-blue-front.jpg", alt: "Claspwallet in ice blue pebble leather", ratio: 388 / 720 },
          { src: "/images/elburg/products/claspwallet/ice-blue-open.jpg", alt: "Claspwallet in ice blue opened out", ratio: 1071 / 720 },
          { src: "/images/elburg/products/claspwallet/ice-blue-side.jpg", alt: "Claspwallet in ice blue seen edge on", ratio: 166 / 720 },
        ],
      },
      {
        name: "Butter Yellow",
        slug: "butter-yellow",
        finish: "Pebble",
        hex: "#D6BC7A",
        tint: "#D6BC7A",
        material: "pebble",
        images: [
          { src: "/images/elburg/products/claspwallet/butter-yellow-front.jpg", alt: "Claspwallet in butter yellow pebble leather", ratio: 388 / 720 },
          { src: "/images/elburg/products/claspwallet/butter-yellow-open.jpg", alt: "Claspwallet in butter yellow opened out", ratio: 1071 / 720 },
          { src: "/images/elburg/products/claspwallet/butter-yellow-side.jpg", alt: "Claspwallet in butter yellow seen edge on", ratio: 166 / 720 },
        ],
      },
    ],
  },
  {
    slug: "foldwallet",
    name: "Foldwallet",
    tier: "expanded",
    price: 109,
    description:
      "Small in size and surprisingly large in capacity, the Foldwallet takes the best of both.",
    properties: [
      "Holds up to 10 cards",
      "Extra storage for bills",
      "With button closure",
      "RFID protected",
      "Two-year warranty",
    ],
    accordions: [
      {
        title: "Product info",
        lead: "The all-rounder",
        paragraphs: [
          "Small in size and surprisingly large in storage, the Foldwallet takes the best of both. The exterior holds banknotes, receipts and cards, while the aluminium Cardlift inside slides cards out in one motion and protects them from bending, breaking and unwanted wireless communication.",
        ],
        list: {
          heading: "Holds",
          items: [
            "A maximum of 4 embossed or 6 flat plastic cards",
            "Up to 4 extra cards in the exterior wrap",
            "Banknotes, business cards and receipts",
          ],
        },
      },
      LEATHER_CARE,
      RETURN_ACCORDION,
    ],
    dimensions: { width: 65, height: 102, depth: 21, weight: 73 },
    colors: [
      {
        name: "Latte",
        slug: "latte",
        finish: "Pebble",
        hex: "#BCAA93",
        tint: "#BCAA93",
        material: "pebble",
        images: [
          { src: "/images/elburg/products/foldwallet/latte-front.jpg", alt: "Foldwallet in latte pebble leather", ratio: 380 / 720 },
          { src: "/images/elburg/products/foldwallet/latte-open.jpg", alt: "Foldwallet opened flat with cards in the card holder", ratio: 1332 / 720 },
          { src: "/images/elburg/products/foldwallet/latte-side.jpg", alt: "Foldwallet seen edge on", ratio: 132 / 720 },
        ],
      },
      {
        name: "Rose",
        slug: "rose",
        finish: "Pebble",
        hex: "#C5ABA5",
        tint: "#C5ABA5",
        material: "pebble",
        images: [
          { src: "/images/elburg/products/foldwallet/rose-front.jpg", alt: "Foldwallet in rose pebble leather", ratio: 381 / 720 },
          { src: "/images/elburg/products/foldwallet/rose-open.jpg", alt: "Foldwallet in rose opened flat", ratio: 1328 / 720 },
          { src: "/images/elburg/products/foldwallet/rose-side.jpg", alt: "Foldwallet in rose seen edge on", ratio: 132 / 720 },
        ],
      },
      {
        name: "Chocolate",
        slug: "chocolate",
        finish: "Original",
        hex: "#8F6E5B",
        tint: "#8F6E5B",
        material: "original",
        images: [
          { src: "/images/elburg/products/foldwallet/chocolate-front.jpg", alt: "Foldwallet in chocolate original leather", ratio: 380 / 720 },
          { src: "/images/elburg/products/foldwallet/chocolate-open.jpg", alt: "Foldwallet in chocolate opened flat", ratio: 1328 / 720 },
          { src: "/images/elburg/products/foldwallet/chocolate-side.jpg", alt: "Foldwallet in chocolate seen edge on", ratio: 133 / 720 },
        ],
      },
    ],
  },
  {
    slug: "strapwallet",
    name: "Strapwallet",
    tier: "expanded",
    price: 109,
    description:
      "With a band holding everything tightly in place, the Strapwallet stays slim and stays shut.",
    properties: [
      "Holds up to 12 cards",
      "Extra storage for bills",
      "With customisable band closure",
      "RFID protected",
      "Two-year warranty",
    ],
    accordions: [
      {
        title: "Product info",
        lead: "Held in place",
        paragraphs: [
          "The Strapwallet is cut from a durable leather that stays soft, flexible and easy to clean. Squared corners and a distinctive stitch give it a modern line, and the coloured elastic band carries receipts and extra cards while keeping the wallet closed. Bands in other colours are available separately.",
        ],
        list: {
          heading: "Holds",
          items: [
            "A maximum of 4 embossed or 6 flat plastic cards",
            "Up to 6 extra cards in the exterior wrap",
            "Banknotes, business cards and receipts",
          ],
        },
        footer: {
          heading: "Elastic closure",
          body: "The band comes off the wallet and goes in the washing machine. Wash it twice a year at 40 degrees to keep it clean and, above all, to make it last.",
        },
      },
      LEATHER_CARE,
      RETURN_ACCORDION,
    ],
    dimensions: { width: 68, height: 102, depth: 22, weight: 80 },
    colors: [
      {
        name: "Leaf & Khaki",
        slug: "leaf-khaki",
        finish: "Matte",
        hex: "#7C8367",
        tint: "#9D9F8B",
        material: "matte",
        images: [
          { src: "/images/elburg/products/strapwallet/leaf-khaki-front.jpg", alt: "Strapwallet in khaki matte leather with an elastic band", ratio: 404 / 720 },
          { src: "/images/elburg/products/strapwallet/leaf-khaki-open.jpg", alt: "Strapwallet opened flat, band to one side", ratio: 1147 / 720 },
          { src: "/images/elburg/products/strapwallet/leaf-khaki-side.jpg", alt: "Strapwallet seen edge on", ratio: 114 / 720 },
        ],
      },
      {
        name: "Black",
        slug: "black",
        finish: "Matte",
        hex: "#3F3F3F",
        tint: "#727272",
        material: "matte",
        images: [
          { src: "/images/elburg/products/strapwallet/black-front.jpg", alt: "Strapwallet in black matte leather", ratio: 404 / 720 },
          { src: "/images/elburg/products/strapwallet/black-open.jpg", alt: "Strapwallet in black opened flat", ratio: 1148 / 720 },
          { src: "/images/elburg/products/strapwallet/black-side.jpg", alt: "Strapwallet in black seen edge on", ratio: 114 / 720 },
        ],
      },
      {
        name: "Steel Blue & Brown",
        slug: "steel-blue-brown",
        finish: "Matte",
        hex: "#7C8B9B",
        tint: "#ABB4C0",
        material: "matte",
        images: [
          { src: "/images/elburg/products/strapwallet/steel-blue-brown-front.jpg", alt: "Strapwallet in steel blue matte leather", ratio: 404 / 720 },
          { src: "/images/elburg/products/strapwallet/steel-blue-brown-open.jpg", alt: "Strapwallet in steel blue opened flat", ratio: 1148 / 720 },
          { src: "/images/elburg/products/strapwallet/steel-blue-brown-side.jpg", alt: "Strapwallet in steel blue seen edge on", ratio: 114 / 720 },
        ],
      },
    ],
  },
  {
    slug: "duowallet",
    name: "Duowallet",
    tier: "expanded",
    price: 140,
    description:
      "Two card holders, double the contents, and a wallet that stays compact all the same.",
    properties: [
      "Holds up to 16 cards",
      "Extra storage for bills",
      "With button closure",
      "RFID protected",
      "Two-year warranty",
    ],
    accordions: [
      {
        title: "Product info",
        lead: "Double the carry, not the size",
        paragraphs: [
          "Two Cardlift mechanisms carry up to 16 cards, banknotes and receipts, and the Duowallet still closes flat. A sturdy button and a generous exterior take the cards that will not fit anywhere else.",
        ],
        list: {
          heading: "Holds",
          items: [
            "A maximum of 8 embossed or 12 flat plastic cards",
            "Up to 4 extra cards in the exterior wrap",
            "Banknotes, business cards and receipts",
          ],
        },
      },
      LEATHER_CARE,
      RETURN_ACCORDION,
    ],
    dimensions: { width: 68, height: 102, depth: 27, weight: 105 },
    colors: [
      {
        name: "Cognac & Brown",
        slug: "cognac-brown",
        finish: "Vintage",
        hex: "#9A6E4E",
        tint: "#AC9080",
        material: "vintage",
        images: [
          { src: "/images/elburg/products/duowallet/cognac-brown-front.jpg", alt: "Duowallet in cognac vintage leather", ratio: 442 / 720 },
          { src: "/images/elburg/products/duowallet/cognac-brown-open.jpg", alt: "Duowallet opened flat, both card holders visible", ratio: 1264 / 720 },
          { src: "/images/elburg/products/duowallet/cognac-brown-side.jpg", alt: "Duowallet seen edge on", ratio: 166 / 720 },
        ],
      },
      {
        name: "Red",
        slug: "red",
        finish: "Original",
        hex: "#994C40",
        tint: "#994C40",
        material: "original",
        images: [
          { src: "/images/elburg/products/duowallet/red-front.jpg", alt: "Duowallet in red original leather", ratio: 480 / 720 },
          { src: "/images/elburg/products/duowallet/red-open.jpg", alt: "Duowallet in red opened flat", ratio: 1236 / 720 },
          { src: "/images/elburg/products/duowallet/red-side.jpg", alt: "Duowallet in red seen edge on", ratio: 161 / 720 },
        ],
      },
      {
        name: "Chocolate",
        slug: "chocolate",
        finish: "Vintage",
        hex: "#7A5A48",
        tint: "#8F6E5B",
        material: "vintage",
        images: [
          { src: "/images/elburg/products/duowallet/chocolate-front.jpg", alt: "Duowallet in chocolate vintage leather", ratio: 501 / 762 },
          { src: "/images/elburg/products/duowallet/chocolate-open.jpg", alt: "Duowallet in chocolate opened flat", ratio: 1248 / 720 },
          { src: "/images/elburg/products/duowallet/chocolate-side.jpg", alt: "Duowallet in chocolate seen edge on", ratio: 158 / 720 },
        ],
      },
    ],
  },
];

export type AddOn = {
  id: string;
  name: string;
  /** USD */
  price: number;
  blurb: string;
  image: string;
  tint: string;
  /** product slugs this add-on is offered with */
  fits: string[];
};

export const addOns: AddOn[] = [
  {
    id: "trackcard",
    name: "Trackcard",
    price: 39,
    blurb: "Find your wallet again. 2.5 mm thin, so it slips into any ELBURG.",
    image: "/images/elburg/addons/trackcard.jpg",
    tint: "#CFCAC1",
    fits: [
      "cardlift",
      "cardlift-snap",
      "cardlift-sleeve",
      "notewallet",
      "claspwallet",
      "foldwallet",
      "strapwallet",
      "duowallet",
    ],
  },
  {
    id: "coin-pouch",
    name: "Coin pouch",
    price: 14,
    blurb: "Coins, a key, an earring. A rotating cover keeps them in and shows you what is there.",
    image: "/images/elburg/addons/coin-pouch.jpg",
    tint: "#B0BABE",
    fits: ["notewallet", "claspwallet", "foldwallet", "strapwallet", "duowallet"],
  },
  {
    id: "cashband",
    name: "Cashband",
    price: 14,
    blurb: "Our slimmest answer to banknotes and receipts, wrapped around the card holder.",
    image: "/images/elburg/addons/cashband.jpg",
    tint: "#B6B6B6",
    fits: ["cardlift", "cardlift-snap", "cardlift-sleeve"],
  },
];

/** What the PDP's fact rail carries. Two of the reference's six facts name a
 *  real certification and a real award; the naming map restates the first
 *  first-party and invents the second, and neither ships any artwork — so those
 *  two cards borrow from ELBURG's own library. */
export const walletFacts: { title: string; body: string; image: string; alt: string }[] = [
  {
    title: "Protected cards",
    body: "The Cardlift protects your cards against bending, breaking and unwanted wireless communication.",
    image: "/images/elburg/facts/protected-cards.jpg",
    alt: "A hand holding a wallet against a contactless card reader",
  },
  {
    title: "We design to last",
    body: "Our wallets are made with longevity in mind — every material, component and machine. Each design is engineered to last and tested until it does.",
    image: "/images/elburg/facts/built-to-last.jpg",
    alt: "Aluminium bar stock waiting to be extruded",
  },
  {
    title: "Extended warranty",
    body: "Register your wallet with us for an extended warranty and a certificate of authenticity.",
    /* Not the components flat-lay it used to be: that source is 800 × 452, and
       in this rail's portrait box `object-cover` has to scale it to twice the
       box's width to cover the height — which `sizes` cannot ask for, because
       `sizes` only describes the box's *width*. It shipped visibly soft. Every
       source in this rail is now taller than the slot it fills. */
    image: "/images/elburg/flagship/cardlift-cashband.jpg",
    alt: "An orange card holder with its cash band, seen from above",
  },
  {
    title: "Independently audited",
    body: "Our impact on people and place is audited by people who do not work for us, and the findings are published in full.",
    image: "/images/elburg/stories/we-made-your-wallet.jpg",
    alt: "Hands assembling a wallet at a workbench",
  },
  {
    title: "Super quick access",
    body: "One motion gives quick one-handed access to your cards without opening the wallet.",
    image: "/images/elburg/facts/quick-access.jpg",
    alt: "An illustration of a card sliding out of a wallet",
  },
  {
    title: "Grondvorm Design Award",
    body: "The original Cardlift launched in 2009 and won the Grondvorm Design Award the following year.",
    image: "/images/elburg/stories/design-dilemmas.jpg",
    alt: "A textured wallet slipped into a jacket pocket",
  },
];

/** The reference's own pull-quotes, attributed the way it attributes them. */
export const reviews: { quote: string; author: string }[] = [
  { quote: "The wallet is really compact, yet it has everything I need.", author: "Community member" },
  { quote: "I have had this card protector five years now and it is still like new.", author: "Verified buyer" },
  { quote: "One motion and the cards are there. I did not expect to notice that every day.", author: "Community member" },
];

export const freeShippingThreshold = 49;

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** Falls back to the first colourway so a stale cart line or an unknown
 *  `?colour=` never renders a product with no images. */
export function getColor(product: Product, slug: string | undefined): ColorVariant {
  return product.colors.find((color) => color.slug === slug) ?? product.colors[0];
}

export function getAddOn(id: string): AddOn | undefined {
  return addOns.find((addOn) => addOn.id === id);
}

export function addOnsFor(slug: string): AddOn[] {
  return addOns.filter((addOn) => addOn.fits.includes(slug));
}

/** The product title as the reference sets it: model plus finish, where there
 *  is one. "Claspwallet Pebble", but just "Cardlift". */
export function titleFor(product: Product, color: ColorVariant): string {
  return color.finish ? `${product.name} ${color.finish}` : product.name;
}

/** One entry per SKU — what the listing counts and renders. */
export type Sku = { product: Product; color: ColorVariant };

export const skus: Sku[] = products.flatMap((product) =>
  product.colors.map((color) => ({ product, color })),
);

export function unitPrice(product: Product, addOnIds: string[] = []): number {
  return addOnIds.reduce((total, id) => total + (getAddOn(id)?.price ?? 0), product.price);
}
