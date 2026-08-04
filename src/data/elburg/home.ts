/**
 * Homepage copy for ELBURG, band by band, following the reference's own
 * section order (`sites/elburg.md`, "Page anatomy"). Names are restated through
 * the naming map — the reference's founding year is the reference's, so ELBURG
 * dates from 1997.
 */

/** The hero band's three tiles, below the hero's fold line. The last line
 *  of each is italic on the reference. */
export const heroLinkTiles: {
  lines: { text: string; italic?: boolean }[];
  link: string;
}[] = [
  {
    lines: [{ text: "Wallet" }, { text: "makers" }, { text: "since 1997", italic: true }],
    link: "How it started",
  },
  {
    lines: [{ text: "Crafted to" }, { text: "last", italic: true }],
    link: "Our philosophy",
  },
  {
    lines: [{ text: "Responsibly" }, { text: "made in" }, { text: "Europe", italic: true }],
    link: "How it's made",
  },
];

/**
 * The "Wallet Categories" band — three tall tiles. The two carry
 * tiers are the reference's own `storage` facet and will drive the Phase 3
 * listing filters; the price floors are ELBURG's catalogue, not the
 * reference's, so they follow the price table in `sites/elburg.md`.
 */
export const walletCategories: {
  eyebrow: string;
  title: string;
  /** rendered as the serif italic under the title */
  subtitle?: string;
  image: string;
  alt: string;
  /** set only where the demo builds the destination — the add-ons tile has no
   *  route of its own, so it stays inert (standing rule 3) */
  href?: string;
}[] = [
  {
    eyebrow: "Up to 6 cards",
    title: "Essential Carry",
    subtitle: "up to $99",
    href: "/elburg/collections/all",
    image: "/images/elburg/categories/essential-carry.jpg",
    alt: "A ribbed aluminium card holder with cards fanning out of it",
  },
  {
    eyebrow: "Up to 16 cards",
    title: "Expanded Carry",
    subtitle: "up to $140",
    href: "/elburg/collections/all",
    image: "/images/elburg/categories/expanded-carry.jpg",
    alt: "A cognac leather wallet with a press stud closure",
  },
  {
    eyebrow: "Upgrade your pocket",
    title: "Wallet add-ons",
    image: "/images/elburg/categories/add-ons.jpg",
    alt: "A leather flap folded open over a coin pouch",
  },
];

export type IconUsp = { icon: string; title: string; body: string };

/** Icon-USP band #1 — the engraving service. */
export const engravingBand: {
  heading: { text: string; italic?: boolean }[];
  image: string;
  alt: string;
  usps: IconUsp[];
} = {
  heading: [{ text: "Our" }, { text: "engraving", italic: true }, { text: "service" }],
  image: "/images/elburg/engraving/phone-mockup.jpg",
  alt: "Two hands holding a phone showing an engraving preview",
  usps: [
    {
      icon: "combine",
      title: "Make unique combinations",
      body: "Combine text, icons and artwork.",
    },
    {
      icon: "style",
      title: "Create your own style",
      body: "Pick your font, size, position and orientation.",
    },
    {
      icon: "price",
      title: "Engrave for $10",
      body: "For a fixed price you can make your own combinations and use up to 50 characters.",
    },
  ],
};

/**
 * The "New & featured" band — three landscape tiles on a
 * horizontal rail. The reference's middle tile sells a model line the naming map
 * drops outright, so this one carries the Duowallet instead and uses that
 * line's own photography.
 */
export const featuredTiles: {
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
  /** the photograph's own height / width — the tile hint is derived from it */
  sourceRatio: number;
}[] = [
  {
    eyebrow: "Also holds metal cards",
    title: "The Premium+ collection",
    image: "/images/elburg/featured/premium.jpg",
    alt: "A wallet held open, cards being drawn out of it",
    sourceRatio: 677 / 1200,
  },
  {
    eyebrow: "Extra capacity",
    title: "The Duowallet collection",
    image: "/images/elburg/featured/duowallet.jpg",
    alt: "A hand holding a tan leather wallet with cards stepped out of it",
    sourceRatio: 1555 / 1200,
  },
  {
    eyebrow: "Gift guide",
    title: "For your father",
    image: "/images/elburg/featured/gift-guide.jpg",
    alt: "An engraved card holder resting on patterned gift wrap",
    sourceRatio: 1694 / 1000,
  },
];

/** The collection band — full-bleed editorial band with one CTA. */
export const collectionBand = {
  headline: [{ text: "Carry" }, { text: "with" }, { text: "confidence" }],
  standfirst: [{ text: "Chic," }, { text: "elegant and" }, { text: "bold styles" }],
  cta: "Shop now",
  image: "/images/elburg/collection/carry-with-confidence.jpg",
  alt: "Two pale pink wallets stacked on a deep red one, on a pink background",
};

/**
 * "Our icons" used to carry its own copy of the model line-up. Phase 3 replaced
 * it with a slice of `src/data/elburg/products.ts` — the catalogue is now the
 * single source of the names, prices, tints and swatch colours, so the homepage
 * cannot drift from the listing (which was already true of the price floors in
 * `walletCategories` above, and is why those are cross-checked against the price
 * table in `sites/elburg.md`).
 */

/** Icon-USP band #2 — the flagship band, on the dark ground. */
export const flagshipBand: {
  heading: { text: string; italic?: boolean }[];
  image: string;
  alt: string;
  usps: IconUsp[];
} = {
  heading: [{ text: "The" }, { text: "original", italic: true }, { text: "card protector" }],
  image: "/images/elburg/flagship/cardlift-cashband.jpg",
  alt: "An orange Cardlift card holder wearing a striped Cashband",
  usps: [
    {
      icon: "rfid",
      title: "RFID / NFC protected",
      body: "Protected against bending, breaking and unwanted wireless communication.",
    },
    {
      icon: "access",
      title: "Super quick access",
      body: "One motion provides quick one-handed access to your cards without opening the wallet.",
    },
    {
      icon: "cashband",
      title: "Cashband",
      body: "The Cashband is an add-on for the Cardlift, our slimmest solution for banknotes and receipts.",
    },
  ],
};

/**
 * The "Our stories" band — six editorial tiles at the reference's own
 * mixed aspect ratios (141/133/77/121/121/77, as percentages of the tile width).
 *
 * The reference loads these client-side by UUID, so the full-page captures show
 * the band empty and there is no authored copy to restate. What ships is drawn
 * from the reference's own editorial subjects — repair, materials, making, the
 * fund — retitled for ELBURG, with photography from the same library. Standing
 * rule 9 rules out most of the originals anyway: they are portraits of the
 * reference's staff and founders.
 *
 * Two constraints shape the order, and they are not the same one:
 *
 * - Each entry keeps a ratio *its own photograph can fill*. Our library is not
 *   the reference's, and a tile whose source is flatter than its slot gets
 *   upscaled by `object-cover` — the components flat-lay is landscape and
 *   rendered visibly soft in the opening 141 slot until it was moved to a 77.
 * - The *sequence* balances the three columns. The reference's own order
 *   (141/133/77/121/121/77) puts both tall tiles in column one, which ran it
 *   ~40% longer than its neighbours — a ragged bottom edge is the band's design,
 *   a third of a column of empty paper is not. Pairing them 141+77 / 133+77 /
 *   121+121 is the closest a 2-2-2 split of these six ratios gets. The band is
 *   empty in every reference capture, so there is nothing to be faithful *to*
 *   here beyond the ratios themselves.
 */
export const stories: {
  category: string;
  title: string;
  image: string;
  alt: string;
  /** height as a percentage of the tile's width, from the reference */
  ratio: number;
  /** the photograph's own height / width — what the slot can ask of it */
  sourceRatio: number;
}[] = [
  {
    category: "Service",
    title: "Engraved, and meant for someone",
    image: "/images/elburg/stories/engraving.jpg",
    alt: "An engraved card holder resting in a red leather wallet",
    ratio: 141,
    sourceRatio: 1549 / 900,
  },
  {
    category: "Design",
    title: "Thirty years of product evolution",
    image: "/images/elburg/stories/product-evolution.jpg",
    alt: "A flat lay of wallet components: springs, levers and card holders",
    ratio: 77,
    sourceRatio: 452 / 800,
  },
  {
    category: "Craft",
    title: "We made your wallet",
    image: "/images/elburg/stories/we-made-your-wallet.jpg",
    alt: "Hands assembling a red leather wallet at a workbench",
    ratio: 133,
    sourceRatio: 1007 / 600,
  },
  {
    category: "Materials",
    title: "Twenty types of leather",
    image: "/images/elburg/stories/impact-fund.jpg",
    alt: "A hand sketching in a notebook among leather and cork samples",
    ratio: 77,
    sourceRatio: 920 / 1000,
  },
  {
    category: "Design",
    title: "Design dilemmas",
    image: "/images/elburg/stories/design-dilemmas.jpg",
    alt: "A dark textured wallet slipped into a jacket pocket",
    ratio: 121,
    sourceRatio: 933 / 600,
  },
  {
    category: "Carry",
    title: "What a pocket can hold",
    image: "/images/elburg/stories/pocket-carry.jpg",
    alt: "A hand holding an orange card holder against a knitted sweater",
    ratio: 121,
    sourceRatio: 1400 / 900,
  },
];
