/**
 * Only five routes exist in this demo: `/`, `/collections/all`,
 * `/products/[slug]`, `/cart` and `/checkout` (plus its confirmation). Anything
 * else the real site links to is rendered with `InertLink`, which navigates
 * nowhere rather than 404ing or leaving the demo — hence the split below:
 * `mainNav` entries carry a real href, footer entries are labels only.
 */

export const mainNav: { label: string; href: string }[] = [
  { label: "Shop All", href: "/verdon/collections/all" },
  { label: "Sunglasses", href: "/verdon/collections/all" },
  { label: "Goggles", href: "/verdon/collections/all" },
];

export const footerColumns: { heading: string; links: { label: string }[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "About" },
      { label: "Sustainability" },
      { label: "Stories" },
      { label: "Wholesale" },
      { label: "Corporate Gifting" },
      { label: "Pro Deal" },
      { label: "Affiliate Program" },
      { label: "Store Locator" },
      { label: "Jobs" },
      { label: "Newsroom" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center" },
      { label: "Lifetime Warranty" },
      { label: "Returns & Exchanges" },
      { label: "Light Sensitivity" },
      { label: "Prescription" },
      { label: "Terms" },
      { label: "Privacy" },
      { label: "Contact Us" },
    ],
  },
];
