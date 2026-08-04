import { getProduct, products, type Product } from "@/data/verdon/products";

/**
 * Demo review content. The aggregate (`rating` / `reviewCount` on each product)
 * is real data captured from verdon.com; the individual cards below are written
 * for the demo and attributed to invented reviewers. Nothing here is a real
 * customer quote — replace before this is ever shown as genuine feedback.
 */

export type Review = {
  id: string;
  author: string;
  country: string;
  /** ISO-3166 alpha-2, used to draw the flag */
  countryCode: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
};

export type ReviewSummary = {
  rating: number;
  total: number;
  /** counts for 5,4,3,2,1 stars, summing to `total` */
  histogram: number[];
};

const AUTHORS: [string, string, string][] = [
  ["Mathieu L.", "France", "FR"],
  ["Sanne V.", "Netherlands", "NL"],
  ["Tom H.", "United Kingdom", "GB"],
  ["Elena R.", "Italy", "IT"],
  ["Jonas B.", "Germany", "DE"],
  ["Aoife M.", "Ireland", "IE"],
  ["Marc S.", "Switzerland", "CH"],
  ["Karin D.", "Austria", "AT"],
  ["Pau G.", "Spain", "ES"],
  ["Nils E.", "Sweden", "SE"],
  ["Hanne K.", "Norway", "NO"],
  ["Luis F.", "Portugal", "PT"],
];

const FIVE: [string, string][] = [
  ["Exactly what I wanted", "Second pair from VERDON and the build quality is the reason. Light enough that I forget they are on, and the clarity at the edge of the lens is noticeably better than the pair they replaced."],
  ["Worth it", "Wore these every day for three weeks in the mountains, including a fair bit of weather, and they still look new. The case that comes with them is genuinely good too."],
  ["No notes", "Fit is spot on straight out of the box, and being able to bend the temple ends slightly made the difference. Glare is handled well in bright sun."],
  ["Better than the big brands", "Owned two pairs from the obvious names before this and these are sharper optically for less money. Ordering was quick and they arrived in three days."],
  ["Great for long days outside", "On the water all day and no eye strain at the end of it, which was not true of my old pair. The headstrap is more useful than I expected."],
];

const FOUR: [string, string][] = [
  ["Very good, small caveat", "Optics and finish are excellent. Only reason for four stars is that they sit slightly high on my face — worth measuring against the size guide first."],
  ["Happy with them", "Comfortable and clear, and they look good with everything. Would have liked a slightly darker lens for the brightest days, but that is a preference not a fault."],
  ["Solid pair", "Nothing to fault in the build. Took a few days to get used to the shape after years in a much smaller frame."],
];

const THREE: [string, string][] = [
  ["Good but check the fit", "Lens quality is genuinely impressive. The frame is a little wide for me and slides when I look down, so they are more a lifestyle pair than a running pair in my case."],
];

/** Small deterministic PRNG so the demo reviews are stable between renders. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
}

/**
 * Splits the real review count across star ratings so the histogram always
 * averages back to the product's real rating.
 */
function buildHistogram(rating: number, total: number): number[] {
  // weight the tail by how far the average sits below 5
  const gap = Math.max(0, 5 - rating);
  const raw = [1, gap * 0.9, gap * 0.28, gap * 0.12, gap * 0.14];
  const sum = raw.reduce((a, b) => a + b, 0);
  const counts = raw.map((w) => Math.round((w / sum) * total));
  // absorb any rounding drift into the 5-star bucket
  counts[0] += total - counts.reduce((a, b) => a + b, 0);
  return counts;
}

function buildReviews(product: Product): Review[] {
  const rand = seeded(product.slug);
  const out: Review[] = [];
  // roughly mirrors the histogram: mostly 5s, a couple of 4s, one 3
  const pattern = [5, 5, 4, 5, 4, 3];

  for (let i = 0; i < pattern.length; i++) {
    const stars = pattern[i];
    const pool = stars === 5 ? FIVE : stars === 4 ? FOUR : THREE;
    const [title, body] = pool[Math.floor(rand() * pool.length)];
    const [author, country, countryCode] =
      AUTHORS[Math.floor(rand() * AUTHORS.length)];
    // dates walk backwards from a fixed point so they never go stale mid-demo
    const day = new Date(Date.UTC(2026, 6, 20));
    day.setUTCDate(day.getUTCDate() - i * 9 - Math.floor(rand() * 6));

    out.push({
      id: `${product.slug}-${i}`,
      author,
      country,
      countryCode,
      rating: stars,
      date: day.toISOString().slice(0, 10),
      title,
      body,
      verified: rand() > 0.2,
    });
  }
  return out;
}

const REVIEWS: Record<string, Review[]> = Object.fromEntries(
  products.map((p) => [p.slug, buildReviews(p)]),
);

export function getReviews(slug: string): Review[] {
  return REVIEWS[slug] ?? [];
}

export function getReviewSummary(slug: string): ReviewSummary | null {
  const product = getProduct(slug);
  if (!product) return null;
  return {
    rating: product.rating,
    total: product.reviewCount,
    histogram: buildHistogram(product.rating, product.reviewCount),
  };
}
