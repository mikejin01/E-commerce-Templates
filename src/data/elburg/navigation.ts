/**
 * Header and footer navigation for ELBURG.
 *
 * Mirrors the reference's own information architecture — a left-hand drawer
 * with three top-level menus, where SHOP opens a second column and the other
 * two render their groups in one — with every name restated through the naming
 * map in `sites/elburg.md`.
 *
 * `href` is set only for destinations this demo actually builds. Everything
 * else is label-only and renders as `InertLink` (standing rule 3): the site has
 * exactly five routes. Phase 3 pointed the eight model entries at their PDPs
 * and every "see all" at the listing; the style, add-on and mission entries stay
 * label-only, because those pages are not among the five.
 */

export type NavItem = { label: string; href?: string };

export type NavGroup = {
  heading?: string;
  /** the reference's `subMenuIsSmall`: styles and utility groups set smaller type */
  small?: boolean;
  items: NavItem[];
};

export type NavPanel = { label: string; groups: NavGroup[] };

export type NavStory = { title: string; image: string; alt: string };

export type NavMenu = {
  label: string;
  /** SHOP only: entries in column one that reveal their groups in column two */
  panels?: NavPanel[];
  /** the other menus render their groups directly in column one */
  groups?: NavGroup[];
  stories?: { heading: string; items: NavStory[] };
};

export const mainNav: NavMenu[] = [
  {
    label: "Shop",
    panels: [
      {
        label: "Wallets",
        groups: [
          { items: [{ label: "See all wallets", href: "/elburg/collections/all" }] },
          {
            heading: "Essential Carry (4–6 cards)",
            items: [
              { label: "Cardlift", href: "/elburg/products/cardlift" },
              { label: "Cardlift Snap", href: "/elburg/products/cardlift-snap" },
              { label: "Cardlift Sleeve", href: "/elburg/products/cardlift-sleeve" },
            ],
          },
          {
            heading: "Expanded Carry (4–16 cards)",
            items: [
              { label: "Claspwallet", href: "/elburg/products/claspwallet" },
              { label: "Foldwallet", href: "/elburg/products/foldwallet" },
              { label: "Notewallet", href: "/elburg/products/notewallet" },
              { label: "Strapwallet", href: "/elburg/products/strapwallet" },
              { label: "Duowallet", href: "/elburg/products/duowallet" },
            ],
          },
          {
            heading: "Styles",
            small: true,
            items: [
              { label: "Classic" },
              { label: "Feminine" },
              { label: "Premium" },
              { label: "Textured" },
            ],
          },
          {
            heading: "More for Wallets",
            small: true,
            items: [{ label: "Engrave your wallet" }],
          },
        ],
      },
      {
        label: "Add-ons",
        groups: [
          { items: [{ label: "See all wallet add-ons" }] },
          {
            heading: "Wallet Add-ons",
            items: [
              { label: "Trackcard" },
              { label: "Coin pouch" },
              { label: "Cashband" },
              { label: "Add-on Strapwallet" },
              { label: "Additional slide" },
            ],
          },
          {
            heading: "Carrywear Essentials",
            items: [{ label: "Daily Care Sticks" }, { label: "ELBURG Brooch" }],
          },
        ],
      },
    ],
  },
  {
    label: "New & featured",
    groups: [
      { items: [{ label: "New releases", href: "/elburg/collections/all" }] },
      {
        heading: "New",
        items: [
          { label: "Premium+" },
          { label: "Cardlift Snap", href: "/elburg/products/cardlift-snap" },
          { label: "The Claspwallet", href: "/elburg/products/claspwallet" },
        ],
      },
      {
        heading: "Featured",
        small: true,
        items: [{ label: "Engrave your wallet" }, { label: "Art collection" }],
      },
    ],
  },
  {
    label: "Our mission",
    groups: [
      {
        heading: "Who we are",
        items: [{ label: "Our Philosophy" }, { label: "Care for climate" }],
      },
      {
        heading: "What we do",
        items: [{ label: "Impact fund" }, { label: "Care & Repair" }],
      },
    ],
    stories: {
      heading: "Stories",
      items: [
        {
          title: "Three Decades of Product Evolution",
          image: "/images/elburg/stories/product-evolution.jpg",
          alt: "Prototype components laid out in a grid",
        },
        {
          title: "We Made Your Wallet",
          image: "/images/elburg/stories/we-made-your-wallet.jpg",
          alt: "Hands assembling a wallet at a workbench",
        },
        {
          title: "Design Dilemmas",
          image: "/images/elburg/stories/design-dilemmas.jpg",
          alt: "A textured wallet slipped into a jacket pocket",
        },
      ],
    },
  },
];

/** The utility links that sit under the menus in the drawer and to the right of
 *  the wordmark on desktop. */
export const utilityNav: NavItem[] = [
  { label: "Stores" },
  { label: "Care & Repair" },
  { label: "Support" },
];

/** The four-up strip above the footer columns. */
export const footerUsps: { title: string; body: string; icon: "repair" | "warranty" | "delivery" | "returns" }[] = [
  {
    icon: "repair",
    title: "Designed for repair",
    body: "Repairing is better than replacing. Visit one of our Care & Repair points.",
  },
  {
    icon: "warranty",
    title: "Extended warranty",
    body: "Enjoy extra long warranty when registering your ELBURG product.",
  },
  {
    icon: "delivery",
    title: "Free delivery over $49,-",
    body: "Delivered within 2/4 business days.",
  },
  {
    icon: "returns",
    title: "60-days return policy",
    body: "Return your product within 60 days after receiving your order.",
  },
];

/** Footer link columns. Each column is a list of blocks so the reference's
 *  visual gap inside SERVICES survives. */
export const footerColumns: { heading: string; blocks: string[][] }[] = [
  {
    heading: "Support",
    blocks: [
      [
        "Orders & Payments",
        "Shipping & Delivery",
        "Cancellation & Return",
        "Product Usage",
        "Product Care",
        "Repair & Warranty",
        "Wallet Registration",
        "FAQ",
        "Contact",
      ],
    ],
  },
  {
    heading: "Services",
    blocks: [
      ["Engraving", "Corporate Gifts", "Care & Repair"],
      ["B2B Portal", "Fair Calendar"],
    ],
  },
  {
    heading: "Who we are",
    blocks: [[
      "About ELBURG",
      "Impact Fund",
      "Stores",
      "Jobs",
      "Press",
    ]],
  },
];

export const legalLinks: string[] = [
  "Terms and conditions",
  "Accessibility statement",
  "Privacy Policy",
  "Cookie settings",
  "Sitemap",
];
