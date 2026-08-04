/** Content for the homepage bands. Demo copy — see PLAN.md session notes. */

import { products } from "@/data/verdon/products";
import { getReviewSummary } from "@/data/verdon/reviews";

export type Category = {
  handle: string;
  label: string;
  image: string;
};

export const categories: Category[] = [
  { handle: "everyday", label: "Everyday", image: "/images/verdon/categories/everyday.png" },
  { handle: "ski-snow", label: "Ski & Snow", image: "/images/verdon/categories/ski-snow.jpg" },
  {
    handle: "mountaineering",
    label: "Mountaineering",
    image: "/images/verdon/categories/mountaineering.jpg",
  },
  { handle: "cycling", label: "Cycling", image: "/images/verdon/categories/cycling.jpg" },
  { handle: "fishing", label: "Fishing", image: "/images/verdon/categories/fishing.jpg" },
  { handle: "accessories", label: "Accessories", image: "/images/verdon/categories/accessories.jpg" },
];

export type Feature = {
  icon: string;
  title: string;
  body: string;
};

export const features: Feature[] = [
  {
    icon: "/images/verdon/features/icon-exploration.png",
    title: "Built for Exploration",
    body: "Designed in the Alps and field-tested by the people who live there — from valley floor to summit ridge.",
  },
  {
    icon: "/images/verdon/features/icon-optics.png",
    title: "Maximum Performance",
    body: "Impact-resistant polarised lenses, 100% UV400 protection and no-slip grip that stays put when it matters.",
  },
  {
    icon: "/images/verdon/features/icon-classic.png",
    title: "Mountain to Bar",
    body: "Timeless frames that look as good après as they do mid-descent. No wraparound plastic, no compromises.",
  },
  {
    icon: "/images/verdon/features/icon-pledge.png",
    title: "Made Responsibly",
    body: "Bio-based acetate, plastic-free packaging and a lifetime warranty, because the greenest pair is the one you keep.",
  },
];

export type Story = {
  slug: string;
  eyebrow: string;
  title: string;
  image: string;
};

export const stories: Story[] = [
  {
    slug: "introducing-the-sable",
    eyebrow: "New Release",
    title: "Introducing the Sable",
    image: "/images/verdon/stories/sable.png",
  },
  {
    slug: "best-aviator-sunglasses",
    eyebrow: "Guides",
    title: "The Best Aviator Sunglasses for Every Face Shape",
    image: "/images/verdon/stories/best-aviators.png",
  },
  {
    slug: "meet-the-wren-and-lark",
    eyebrow: "New Release",
    title: "Meet the Wren & Lark",
    image: "/images/verdon/stories/wren-lark.png",
  },
  {
    slug: "verdon-x-fieldgoods",
    eyebrow: "Collaboration",
    title: "VERDON × Fieldgoods",
    image: "/images/verdon/stories/fieldgoods.png",
  },
];

/** Instagram tiles — site lifestyle photography standing in for the live feed. */
export const instagramTiles: string[] = Array.from(
  { length: 16 },
  (_, i) => `/images/verdon/instagram/ig-${String(i + 1).padStart(2, "0")}.jpg`,
);

/**
 * Derived from the catalogue rather than hard-coded, so the homepage band can
 * never drift from the per-product ratings shown on the PDPs. `recommendPercent`
 * is the share of the (demo) reviews rated 4 or better.
 */
const totalReviews = products.reduce((total, p) => total + p.reviewCount, 0);
const weighted = products.reduce((total, p) => total + p.rating * p.reviewCount, 0);

export const reviewStats = {
  rating: Math.round((weighted / totalReviews) * 10) / 10,
  reviewCount: totalReviews,
  recommendPercent:
    Math.round(
      (products.reduce(
        (total, p) => total + (getReviewSummary(p.slug)?.histogram.slice(0, 2).reduce((a, b) => a + b, 0) ?? 0),
        0,
      ) /
        totalReviews) *
        1000,
    ) / 10,
};
