/**
 * Demo catalogue — eight frames, restated against the live verdon.com product
 * data captured on 2026-07-31 (see PLAN.md "Pulling the reference").
 *
 * Real from the reference: product names, EUR base prices, lens tiers, colourway
 * names, packshot/lifestyle imagery with its original alt text, ratings and
 * review counts, and the Specs & Materials / feature-row copy.
 *
 * Demo-authored: the individual review cards in `reviews.ts`, and the tagline
 * and highlight bullets, which paraphrase the reference description.
 *
 * Swatch hexes were read off each colourway's own front packshot.
 */

export type LensOption = {
  name: string;
  /** added to `Product.price`, EUR */
  surcharge: number;
  blurb: string;
  badge?: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

/** Every reference image is square, so the gallery needs no per-image fit hint. */
export type ColorVariant = {
  name: string;
  slug: string;
  /** frame colour, read off the packshot */
  hex: string;
  /** lens colour — swatches render as a two-tone split */
  hex2: string;
  images: ProductImage[];
};

export type SpecGroup = {
  title: string;
  items: string[];
};

export type FeatureRow = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  /** short frame descriptor shown under the product name */
  tagline: string;
  category: "Sunglasses";
  /** category-grid handles this product belongs to */
  collections: string[];
  /** EUR, whole units — the price with the cheapest lens fitted */
  price: number;
  /** present only where the real store sells a lens upgrade */
  lensOptions?: LensOption[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  description: string;
  highlights: string[];
  specGroups: SpecGroup[];
  features: FeatureRow[];
  /** worn-in-the-wild photography, for the "In the field" rail */
  fieldImages: ProductImage[];
  colors: ColorVariant[];
};

export const products: Product[] = [
  {
    slug: "roamer",
    name: "Roamer",
    tagline: "Rounded aviator",
    category: "Sunglasses",
    collections: ["everyday", "fishing"],
    price: 120,
  lensOptions: [
    { name: "Standard", surcharge: 0, blurb: "CLARO 52® market-leading clarity and exceptional impact resistance" },
    { name: "Polarised", surcharge: 25, blurb: "Add polarisation for reduced glare and optimal colour contrast", badge: "Most Popular" },
  ],
    rating: 4.61,
    reviewCount: 1473,
    isNew: true,
    description: "Roamer combines the timeless appeal of a rounded aviator with the functionality needed for life outdoors. Equipped with our CLARO 52® optics, it delivers exceptional optical clarity without compromising impact resistance. A detachable sports retainer keeps them secure during trail runs, kayaking, sailing or climbing, while the lightweight acetate frame ensures all-day comfort.",
    highlights: [
      "CLARO 52® nylon polyamide lenses — ABBE 52, the highest clarity in a performance lens",
      "Detachable sports headstrap included",
      "Adjustable metal-core temple ends",
      "Handcrafted premium acetate, 28 g",
    ],
    specGroups: [
    {
      title: "Lens — CLARO 52® Nylon Polyamide",
      items: [
        "Superior clarity (ABBE 52)",
        "Sports impact resistance",
        "Cat. 3 protection (15–17% VLT)",
        "100% UV400 protection",
        "Anti-scratch coating",
      ],
    },
    {
      title: "Frame — Premium Cellulose Acetate",
      items: [
        "Handcrafted frames (28 g)",
        "Adjustable temple ends",
        "Detachable sports headstrap included",
        "Lightweight and hypoallergenic",
      ],
    },
    ],
    features: [
    {
      eyebrow: "Optics",
      title: "CLARO 52® lenses",
      body: "Roamer features VERDON's proprietary CLARO 52® lens technology, constructed from nylon polyamide to provide exceptional optical clarity (ABBE value 52) and 100% UV protection (UV400). They have the highest optical clarity of any performance sunglasses on the market, and are 20% lighter than comparative lenses.",
      image: "/images/verdon/products/roamer/tortoise-4.jpg",
    },
    {
      eyebrow: "Performance",
      title: "Detachable headstrap",
      body: "Whether you're doing outdoor activities such as trail running, kayaking, sailing or climbing, the headstrap guarantees your sunglasses stay on at all times.",
      image: "/images/verdon/products/roamer/tortoise-5.jpg",
    },
    {
      eyebrow: "Fit",
      title: "Adjustable temple ends",
      body: "The temple ends contain a metal core that can be adjusted for a better fit. Turning the tips inwards leads to a more secure fit if too big, and can also help to create space if the sunglasses feel too small against the side of the face.",
      image: "/images/verdon/products/roamer/sage-4.jpg",
    },
    ],
    fieldImages: [
    { src: "/images/verdon/products/roamer/tortoise-4.jpg", alt: "Man wears VERDON Roamer sunglasses for fishing" },
    { src: "/images/verdon/products/roamer/tortoise-5.jpg", alt: "Man wears VERDON Roamer sunglasses for climbing" },
    { src: "/images/verdon/products/roamer/sage-4.jpg", alt: "Woman wears Roamer sunglasses from VERDON in sage at the beach" },
    { src: "/images/verdon/products/roamer/sage-5.jpg", alt: "Man wears VERDON Roamer Cat. 3 sunglasses in sage" },
    { src: "/images/verdon/products/roamer/black-4.jpg", alt: "Woman wears VERDON Roamer sunglasses for an oversized classic aviator look" },
    ],
    colors: [
    {
      name: "Tortoise",
      slug: "tortoise",
      hex: "#a35a2c",
      hex2: "#6f5a30",
      images: [
        { src: "/images/verdon/products/roamer/tortoise-1.jpg", alt: "VERDON Roamer sunglasses for active lifestyle in tortoise" },
        { src: "/images/verdon/products/roamer/tortoise-2.jpg", alt: "VERDON Roamer with detachable sports headstrap" },
        { src: "/images/verdon/products/roamer/tortoise-3.jpg", alt: "Side view of Roamer sunglasses from VERDON with CLARO 52 optics" },
        { src: "/images/verdon/products/roamer/tortoise-4.jpg", alt: "Man wears VERDON Roamer sunglasses for fishing" },
        { src: "/images/verdon/products/roamer/tortoise-5.jpg", alt: "Man wears VERDON Roamer sunglasses for climbing" },
      ],
    },
    {
      name: "Sage",
      slug: "sage",
      hex: "#d8d3ae",
      hex2: "#3c4a3b",
      images: [
        { src: "/images/verdon/products/roamer/sage-1.jpg", alt: "Roamer active lifestyle sunglasses from VERDON in Sage" },
        { src: "/images/verdon/products/roamer/sage-2.jpg", alt: "Roamer polarized aviator sunglasses from VERDON" },
        { src: "/images/verdon/products/roamer/sage-3.jpg", alt: "Side view of Roamer sunglasses from VERDON in sage" },
        { src: "/images/verdon/products/roamer/sage-4.jpg", alt: "Woman wears Roamer sunglasses from VERDON in sage at the beach" },
        { src: "/images/verdon/products/roamer/sage-5.jpg", alt: "Man wears VERDON Roamer Cat. 3 sunglasses in sage" },
      ],
    },
    {
      name: "Black",
      slug: "black",
      hex: "#1c1c1c",
      hex2: "#33413a",
      images: [
        { src: "/images/verdon/products/roamer/black-1.jpg", alt: "Roamer classic rounded aviator sunglasses from VERDON" },
        { src: "/images/verdon/products/roamer/black-2.jpg", alt: "Roamer sunglasses from VERDON with green detachable sports headstrap" },
        { src: "/images/verdon/products/roamer/black-3.jpg", alt: "Side view of Roamer sunglasses from VERDON" },
        { src: "/images/verdon/products/roamer/black-4.jpg", alt: "Woman wears VERDON Roamer sunglasses for an oversized classic aviator look" },
        { src: "/images/verdon/products/roamer/black-5.jpg", alt: "What's in the box image for Roamer Black, including box, leather pouch, microfiber cleaning cloth and detachable sports headstrap" },
      ],
    },
    ],
  },
  {
    slug: "ashfell-classic-edition",
    name: "Ashfell Classic Edition",
    tagline: "Ashfell × VERDON",
    category: "Sunglasses",
    collections: ["everyday"],
    price: 140,
    rating: 4.82,
    reviewCount: 28,
    isNew: true,
    description: "The Ashfell × VERDON collection provides a double measure of classic design and high performance — a new generation of pure motorcycling eyewear inspired by a rich legacy and the thrill of the ride, but built to excel. Strong retro appeal, colours and hallmark features inspired by Ashfell's Classic line, with VERDON's maximum performance specifications.",
    highlights: [
      "Co-designed with Ashfell, badged per edition",
      "CLARO 52® nylon polyamide lenses, 100% UV400",
      "Deep-set moto shape shields against crosswind",
      "Detachable sports headstrap included",
    ],
    specGroups: [
    {
      title: "Lens — CLARO 52® Nylon Polyamide",
      items: [
        "Superior clarity (ABBE 52)",
        "Sports impact resistance",
        "Cat. 3 protection (15–17% VLT)",
        "100% UV400 protection",
        "Anti-scratch coating",
      ],
    },
    {
      title: "Frame — Premium Cellulose Acetate",
      items: [
        "Handcrafted frames (31 g)",
        "Adjustable temple ends",
        "Detachable sports headstrap included",
        "Lightweight and hypoallergenic",
      ],
    },
    ],
    features: [
    {
      eyebrow: "Heritage",
      title: "Pure 70s style",
      body: "Colours and hallmark details are drawn straight from Ashfell's Classic line of motorcycles — a purpose-built, lightweight design with unmistakable heritage, tuned for 21st century torque.",
      image: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-yellow-4.jpg",
    },
    {
      eyebrow: "Optics",
      title: "CLARO 52® lenses",
      body: "CLARO 52® nylon polyamide lenses deliver an ABBE value of 52 and full UV400 protection, with the impact resistance a day in the saddle demands.",
      image: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-yellow-5.jpg",
    },
    {
      eyebrow: "Fit",
      title: "Adjustable temple ends",
      body: "Metal-core temple ends bend to your fit, so the frame stays put under a helmet and through a long ride.",
      image: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-green-4.jpg",
    },
    ],
    fieldImages: [
    { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-yellow-4.jpg", alt: "Man wears Ashfell Special Edition Moto Aviators from VERDON in Dark Tortoise-Yellow" },
    { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-yellow-5.jpg", alt: "Close up of Ashfell Special Edition Moto Aviators from VERDON in Dark Tortoise-Yellow on a motorbike" },
    { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-green-4.jpg", alt: "Woman wears Ashfell Special Edition Moto Aviators from VERDON" },
    { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-green-5.jpg", alt: "Close up of Ashfell Special Edition Moto Aviators from VERDON" },
    { src: "/images/verdon/products/ashfell-classic-edition/black-smoke-4.jpg", alt: "70s-styled motorcyclist wearing Ashfell Special Edition Moto Aviators from VERDON" },
    { src: "/images/verdon/products/ashfell-classic-edition/black-smoke-5.jpg", alt: "Close up of Black-Smoke Ashfell Special Edition Moto Aviators from VERDON on a motorbike" },
    ],
    colors: [
    {
      name: "Dark Tortoise Yellow",
      slug: "dark-tortoise-yellow",
      hex: "#5a2a24",
      hex2: "#f2d574",
      images: [
        { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-yellow-1.jpg", alt: "Ashfell Special Edition Moto Aviators from VERDON in Dark Tortoise-Yellow" },
        { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-yellow-2.jpg", alt: "Side view of Ashfell Special Edition Moto Aviators from VERDON in Dark Tortoise-Yellow" },
        { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-yellow-3.jpg", alt: "Dark Tortoise-Yellow Ashfell Special Edition Moto Aviators from VERDON" },
        { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-yellow-4.jpg", alt: "Man wears Ashfell Special Edition Moto Aviators from VERDON in Dark Tortoise-Yellow" },
        { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-yellow-5.jpg", alt: "Close up of Ashfell Special Edition Moto Aviators from VERDON in Dark Tortoise-Yellow on a motorbike" },
      ],
    },
    {
      name: "Dark Tortoise Green",
      slug: "dark-tortoise-green",
      hex: "#5a2a24",
      hex2: "#4a5a48",
      images: [
        { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-green-1.jpg", alt: "Ashfell Special Edition Moto Aviators from VERDON inspired by classic motorcycles" },
        { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-green-2.jpg", alt: "Side view of Ashfell Special Edition Moto Aviators from VERDON inspired by classic motorcycles" },
        { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-green-3.jpg", alt: "Ashfell Special Edition Moto Aviators from VERDON in Dark Tortoise-Green" },
        { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-green-4.jpg", alt: "Woman wears Ashfell Special Edition Moto Aviators from VERDON" },
        { src: "/images/verdon/products/ashfell-classic-edition/dark-tortoise-green-5.jpg", alt: "Close up of Ashfell Special Edition Moto Aviators from VERDON" },
      ],
    },
    {
      name: "Black Smoke",
      slug: "black-smoke",
      hex: "#171717",
      hex2: "#2e2e2e",
      images: [
        { src: "/images/verdon/products/ashfell-classic-edition/black-smoke-1.jpg", alt: "Ashfell Special Edition Moto Aviators from VERDON in Black-Smoke" },
        { src: "/images/verdon/products/ashfell-classic-edition/black-smoke-2.jpg", alt: "Black-Smoke Ashfell Special Edition Moto Aviators from VERDON" },
        { src: "/images/verdon/products/ashfell-classic-edition/black-smoke-3.jpg", alt: "Side view of Ashfell Special Edition Moto Aviators from VERDON in Black-Smoke" },
        { src: "/images/verdon/products/ashfell-classic-edition/black-smoke-4.jpg", alt: "70s-styled motorcyclist wearing Ashfell Special Edition Moto Aviators from VERDON" },
        { src: "/images/verdon/products/ashfell-classic-edition/black-smoke-5.jpg", alt: "Close up of Black-Smoke Ashfell Special Edition Moto Aviators from VERDON on a motorbike" },
      ],
    },
    ],
  },
  {
    slug: "egret-glacier",
    name: "Egret Glacier",
    tagline: "Category 4 glacier sunglasses",
    category: "Sunglasses",
    collections: ["mountaineering", "ski-snow"],
    price: 130,
    rating: 4.63,
    reviewCount: 802,
    description: "Classic Category 4 glacier sunglasses featuring a vintage round silhouette, genuine leather side shields, a removable centrepiece, shatterproof lenses and full-mirror coating. Lightweight and highly durable, Egret Glacier is equipped for unmatched eye protection in extreme alpine conditions and at high altitude — built for mountaineers, glacier travellers and ski tourers.",
    highlights: [
      "Category 4 lenses for glacier travel and high altitude",
      "Genuine leather side shields with a removable centrepiece",
      "Full-mirror coating over a shatterproof lens",
      "Not suitable for driving (Cat. 4)",
    ],
    specGroups: [
    {
      title: "Lens — Cat. 4 Full Mirror",
      items: [
        "Category 4 protection (5–8% VLT)",
        "Shatterproof construction",
        "100% UV400 protection",
        "Full-mirror coating",
        "Not road legal for driving",
      ],
    },
    {
      title: "Frame — Acetate & Leather",
      items: [
        "Handcrafted frames (33 g)",
        "Genuine leather side shields",
        "Removable leather centrepiece",
        "Retainer cord included",
      ],
    },
    ],
    features: [
    {
      eyebrow: "Optics",
      title: "Category 4 protection",
      body: "A full-mirror Cat. 4 lens cuts the 5–8% of light that gets through on a glacier, where reflected snow glare is as punishing as the sun overhead.",
      image: "/images/verdon/products/egret-glacier/black-4.jpg",
    },
    {
      eyebrow: "Performance",
      title: "Leather side shields",
      body: "Genuine leather side shields block light, wind and spindrift from the sides. The centrepiece lifts off when you drop back below the snowline.",
      image: "/images/verdon/products/egret-glacier/tortoise-4.jpg",
    },
    {
      eyebrow: "Fit",
      title: "Vintage round silhouette",
      body: "The round front sits close to the face and under a helmet brow, with wire-core temples that hook over the ear on steep ground.",
      image: "/images/verdon/products/egret-glacier/tortoise-5.jpg",
    },
    ],
    fieldImages: [
    { src: "/images/verdon/products/egret-glacier/black-4.jpg", alt: "Man wears Egret Glacier Cat. 4 sunglasses from VERDON with full-mirror lenses for winter mountaineering" },
    { src: "/images/verdon/products/egret-glacier/tortoise-4.jpg", alt: "Man wears Egret Glacier sunglasses from VERDON in Tortoise for ski touring" },
    { src: "/images/verdon/products/egret-glacier/tortoise-5.jpg", alt: "Man wears Cat. 4 Egret Glacier side shield sunglasses for skiing" },
    { src: "/images/verdon/products/egret-glacier/off-white-4.jpg", alt: "Woman wears off-white Egret Glacier side shield sunglasses for off-piste skiing in deep snow" },
    ],
    colors: [
    {
      name: "Black",
      slug: "black",
      hex: "#1a1a1a",
      hex2: "#cfd2d5",
      images: [
        { src: "/images/verdon/products/egret-glacier/black-1.jpg", alt: "Egret Glacier unisex best glacier glasses with Cat. 4 sun protection and leather side shields" },
        { src: "/images/verdon/products/egret-glacier/black-2.jpg", alt: "Egret Glacier unisex best glacier glasses with Cat. 4 sun protection and leather side shields and fully adjustable temple ends" },
        { src: "/images/verdon/products/egret-glacier/black-3.jpg", alt: "Egret Glacier best glacier glasses with Cat. 4 shatterproof protection and genuine leather side shields" },
        { src: "/images/verdon/products/egret-glacier/black-4.jpg", alt: "Man wears Egret Glacier Cat. 4 sunglasses from VERDON with full-mirror lenses for winter mountaineering" },
      ],
    },
    {
      name: "Tortoise",
      slug: "tortoise",
      hex: "#5a3128",
      hex2: "#cfd2d5",
      images: [
        { src: "/images/verdon/products/egret-glacier/tortoise-1.jpg", alt: "Egret Glacier Cat. 4 glacier glasses in Tortoise" },
        { src: "/images/verdon/products/egret-glacier/tortoise-2.jpg", alt: "Egret Glacier sunglasses with Cat. 4 protection and genuine leather side shields in Tortoise" },
        { src: "/images/verdon/products/egret-glacier/tortoise-3.jpg", alt: "Alpine-inspired Cat. 4 glacier glasses for ski touring and mountaineering the Egret Glacier from VERDON come with  leather side shields and full-mirror lenses" },
        { src: "/images/verdon/products/egret-glacier/tortoise-4.jpg", alt: "Man wears Egret Glacier sunglasses from VERDON in Tortoise for ski touring" },
        { src: "/images/verdon/products/egret-glacier/tortoise-5.jpg", alt: "Man wears Cat. 4 Egret Glacier side shield sunglasses for skiing" },
      ],
    },
    {
      name: "Off white",
      slug: "off-white",
      hex: "#efece4",
      hex2: "#cfd2d5",
      images: [
        { src: "/images/verdon/products/egret-glacier/off-white-1.jpg", alt: "Egret Glacier Cat. 4 full-mirror sunglasses in off-white" },
        { src: "/images/verdon/products/egret-glacier/off-white-2.jpg", alt: "Egret Glacier Cat. 4 full-mirror sunglasses in off-white with genuine leather side shields and detachable centrepiece" },
        { src: "/images/verdon/products/egret-glacier/off-white-3.jpg", alt: "Egret Glacier Cat. 4 full-mirror sunglasses in off-white have fully adjustable temple ends" },
        { src: "/images/verdon/products/egret-glacier/off-white-4.jpg", alt: "Woman wears off-white Egret Glacier side shield sunglasses for off-piste skiing in deep snow" },
      ],
    },
    ],
  },
  {
    slug: "weekenders",
    name: "Weekenders",
    tagline: "Trapezoidal classic",
    category: "Sunglasses",
    collections: ["everyday", "fishing"],
    price: 145,
    rating: 4.8,
    reviewCount: 49,
    description: "The Weekenders offer a classic silhouette with universal appeal. Inspired by the trapezoidal shapes of the swinging 60s, they're reimagined with a modern edge. Built for everything from everyday wear to outdoor adventure, the polarised lenses and detachable headstrap make them an exceptionally versatile companion from sail to summit.",
    highlights: [
      "Polarised CLARO 52® lenses cut glare off water and road",
      "60s-inspired trapezoidal silhouette",
      "Detachable sports headstrap included",
      "Handcrafted premium acetate, 30 g",
    ],
    specGroups: [
    {
      title: "Lens — CLARO 52® Nylon Polyamide",
      items: [
        "Superior clarity (ABBE 52)",
        "Polarised as standard",
        "Sports impact resistance",
        "Cat. 3 protection (15–17% VLT)",
        "100% UV400 protection",
        "Anti-scratch coating",
      ],
    },
    {
      title: "Frame — Premium Cellulose Acetate",
      items: [
        "Handcrafted frames (30 g)",
        "Adjustable temple ends",
        "Detachable sports headstrap included",
        "Lightweight and hypoallergenic",
      ],
    },
    ],
    features: [
    {
      eyebrow: "Optics",
      title: "Polarised CLARO 52® lenses",
      body: "Polarised as standard: scattered light that reads as glare is filtered out, so colour stays true on water, snow and open road.",
      image: "/images/verdon/products/weekenders/green-4.jpg",
    },
    {
      eyebrow: "Performance",
      title: "Detachable headstrap",
      body: "Clip the headstrap on for the sail or the climb, pull it off for the drive home. One frame covers both halves of the day.",
      image: "/images/verdon/products/weekenders/green-5.jpg",
    },
    {
      eyebrow: "Fit",
      title: "Universal silhouette",
      body: "The trapezoidal front suits the widest range of faces we make — the pair we hand people who are not sure what shape they want.",
      image: "/images/verdon/products/weekenders/black-4.jpg",
    },
    ],
    fieldImages: [
    { src: "/images/verdon/products/weekenders/green-4.jpg", alt: "Weekenders polarized 60-inspired sunglasses from VERDON in Green with premium acetate frame" },
    { src: "/images/verdon/products/weekenders/green-5.jpg", alt: "Man wears Weekenders polarized 60-inspired sunglasses from VERDON in Green" },
    { src: "/images/verdon/products/weekenders/black-4.jpg", alt: "Black Weekenders active lifestyle sunglasses from VERDON with CLARO 52 optics and acetate frame" },
    { src: "/images/verdon/products/weekenders/black-5.jpg", alt: "Man wearing Weekenders polarized sunglasses from VERDON in Black" },
    { src: "/images/verdon/products/weekenders/sage-4.jpg", alt: "Sage Weekenders active lifestyle sunglasses from VERDON with CLARO 52 optics and acetate frame" },
    { src: "/images/verdon/products/weekenders/sage-5.jpg", alt: "Man on a boat wearing Weekenders polarized sunglasses from VERDON in Sage" },
    ],
    colors: [
    {
      name: "Green",
      slug: "green",
      hex: "#37503f",
      hex2: "#2f4436",
      images: [
        { src: "/images/verdon/products/weekenders/green-1.jpg", alt: "Weekenders polarized 60-inspired sunglasses from VERDON in Green" },
        { src: "/images/verdon/products/weekenders/green-2.jpg", alt: "Side view of Weekenders polarized 60-inspired sunglasses from VERDON in Green with detachable sports headstrap" },
        { src: "/images/verdon/products/weekenders/green-3.jpg", alt: "Side view of Weekenders polarized 60-inspired sunglasses from VERDON in Green" },
        { src: "/images/verdon/products/weekenders/green-4.jpg", alt: "Weekenders polarized 60-inspired sunglasses from VERDON in Green with premium acetate frame" },
        { src: "/images/verdon/products/weekenders/green-5.jpg", alt: "Man wears Weekenders polarized 60-inspired sunglasses from VERDON in Green" },
      ],
    },
    {
      name: "Black",
      slug: "black",
      hex: "#141414",
      hex2: "#232323",
      images: [
        { src: "/images/verdon/products/weekenders/black-1.jpg", alt: "VERDON 60s-inspired Weekenders sunglasses in black fitted with CLARO 52 optics" },
        { src: "/images/verdon/products/weekenders/black-2.jpg", alt: "VERDON 60s-inspired Weekenders sunglasses in Black with CLARO 52 optics and detachable sports headstrap" },
        { src: "/images/verdon/products/weekenders/black-3.jpg", alt: "VERDON 60s-inspired Weekenders sunglasses in Black with CLARO 52 optics and premium acetate frame" },
        { src: "/images/verdon/products/weekenders/black-4.jpg", alt: "Black Weekenders active lifestyle sunglasses from VERDON with CLARO 52 optics and acetate frame" },
        { src: "/images/verdon/products/weekenders/black-5.jpg", alt: "Man wearing Weekenders polarized sunglasses from VERDON in Black" },
      ],
    },
    {
      name: "Sage",
      slug: "sage",
      hex: "#ddd6ac",
      hex2: "#3c4a3b",
      images: [
        { src: "/images/verdon/products/weekenders/sage-1.jpg", alt: "VERDON 60s-inspired Weekenders sunglasses in Sage fitted with CLARO 52 optics" },
        { src: "/images/verdon/products/weekenders/sage-2.jpg", alt: "VERDON 60s-inspired Weekenders sunglasses in Sage with CLARO 52 optics and detachable sports headstrap" },
        { src: "/images/verdon/products/weekenders/sage-3.jpg", alt: "VERDON 60s-inspired Weekenders sunglasses in Sage with CLARO 52 optics and premium acetate frame" },
        { src: "/images/verdon/products/weekenders/sage-4.jpg", alt: "Sage Weekenders active lifestyle sunglasses from VERDON with CLARO 52 optics and acetate frame" },
        { src: "/images/verdon/products/weekenders/sage-5.jpg", alt: "Man on a boat wearing Weekenders polarized sunglasses from VERDON in Sage" },
      ],
    },
    ],
  },
  {
    slug: "marlows",
    name: "Marlows",
    tagline: "Round acetate",
    category: "Sunglasses",
    collections: ["everyday"],
    price: 120,
  lensOptions: [
    { name: "Standard", surcharge: 0, blurb: "CLARO 52® market-leading clarity and exceptional impact resistance" },
    { name: "Polarised", surcharge: 25, blurb: "Add polarisation for reduced glare and optimal colour contrast", badge: "Most Popular" },
  ],
    rating: 4.76,
    reviewCount: 443,
    description: "Handcrafted from premium acetate, Marlows are durable and lightweight sunglasses that deliver a truly premium feel. The CLARO 52® performance optics give the highest clarity of any performance sunglasses on the market, and a detachable sports headstrap makes them an exceptional hybrid of sports and lifestyle eyewear, ready for any adventure.",
    highlights: [
      "Round keyhole-bridge front in premium acetate",
      "CLARO 52® nylon polyamide lenses, 100% UV400",
      "Detachable sports headstrap included",
      "Our lightest acetate frame at 26 g",
    ],
    specGroups: [
    {
      title: "Lens — CLARO 52® Nylon Polyamide",
      items: [
        "Superior clarity (ABBE 52)",
        "Sports impact resistance",
        "Cat. 3 protection (15–17% VLT)",
        "100% UV400 protection",
        "Anti-scratch coating",
      ],
    },
    {
      title: "Frame — Premium Cellulose Acetate",
      items: [
        "Handcrafted frames (26 g)",
        "Adjustable temple ends",
        "Detachable sports headstrap included",
        "Lightweight and hypoallergenic",
      ],
    },
    ],
    features: [
    {
      eyebrow: "Optics",
      title: "CLARO 52® lenses",
      body: "An ABBE value of 52 means no distortion at the edge of the lens — the difference you notice on a long day rather than in the first five minutes.",
      image: "/images/verdon/products/marlows/sage-4.jpg",
    },
    {
      eyebrow: "Performance",
      title: "Detachable headstrap",
      body: "A lifestyle shape that takes a headstrap: the same pair works on the terrace and on the water.",
      image: "/images/verdon/products/marlows/sage-5.jpg",
    },
    {
      eyebrow: "Fit",
      title: "Round keyhole bridge",
      body: "The keyhole bridge sits on the sides of the nose rather than the top, which keeps the frame level and stops it sliding when you sweat.",
      image: "/images/verdon/products/marlows/chestnut-4.jpg",
    },
    ],
    fieldImages: [
    { src: "/images/verdon/products/marlows/sage-4.jpg", alt: "Man wears VERDON Marlows round acetate sunglasses in Sage" },
    { src: "/images/verdon/products/marlows/sage-5.jpg", alt: "Woman wears VERDON Marlows round acetate sunglasses in Sage" },
    { src: "/images/verdon/products/marlows/chestnut-4.jpg", alt: "Man wearing Marlows round sunglasses from VERDON in Chestnut" },
    { src: "/images/verdon/products/marlows/chestnut-5.jpg", alt: "Woman wears Marlows round lifestyle sunglasses from VERDON" },
    { src: "/images/verdon/products/marlows/black-4.jpg", alt: "Man in truck wearing Marlows round sunglasses from VERDON with premium acetate frame" },
    { src: "/images/verdon/products/marlows/black-5.jpg", alt: "Woman climber wears VERDON round Marlows sunglasses" },
    ],
    colors: [
    {
      name: "Sage",
      slug: "sage",
      hex: "#ddd6ac",
      hex2: "#3c4a3b",
      images: [
        { src: "/images/verdon/products/marlows/sage-1.jpg", alt: "VERDON Marlows round acetate sunglasses in Sage" },
        { src: "/images/verdon/products/marlows/sage-2.jpg", alt: "VERDON Marlows round acetate sunglasses come with a detachable sports headstrap for extra versatility" },
        { src: "/images/verdon/products/marlows/sage-3.jpg", alt: "VERDON Marlows round acetate sunglasses with CLARO 52 optics" },
        { src: "/images/verdon/products/marlows/sage-4.jpg", alt: "Man wears VERDON Marlows round acetate sunglasses in Sage" },
        { src: "/images/verdon/products/marlows/sage-5.jpg", alt: "Woman wears VERDON Marlows round acetate sunglasses in Sage" },
      ],
    },
    {
      name: "Chestnut",
      slug: "chestnut",
      hex: "#6b3a26",
      hex2: "#5b4026",
      images: [
        { src: "/images/verdon/products/marlows/chestnut-1.jpg", alt: "Marlows round sunglasses from VERDON in chestnut" },
        { src: "/images/verdon/products/marlows/chestnut-2.jpg", alt: "Marlows round sunglasses from VERDON with detachable sports headstrap" },
        { src: "/images/verdon/products/marlows/chestnut-3.jpg", alt: "Side view of Marlows round sunglasses from VERDON in chestnut" },
        { src: "/images/verdon/products/marlows/chestnut-4.jpg", alt: "Man wearing Marlows round sunglasses from VERDON in Chestnut" },
        { src: "/images/verdon/products/marlows/chestnut-5.jpg", alt: "Woman wears Marlows round lifestyle sunglasses from VERDON" },
      ],
    },
    {
      name: "Black",
      slug: "black",
      hex: "#141414",
      hex2: "#232323",
      images: [
        { src: "/images/verdon/products/marlows/black-1.jpg", alt: "Marlows round sunglasses from VERDON in black with CLARO 52 lenses" },
        { src: "/images/verdon/products/marlows/black-2.jpg", alt: "Marlows round sunglasses from VERDON with detachable sports headstrap in black" },
        { src: "/images/verdon/products/marlows/black-3.jpg", alt: "Side view of Marlows round sunglasses from VERDON in black" },
        { src: "/images/verdon/products/marlows/black-4.jpg", alt: "Man in truck wearing Marlows round sunglasses from VERDON with premium acetate frame" },
        { src: "/images/verdon/products/marlows/black-5.jpg", alt: "Woman climber wears VERDON round Marlows sunglasses" },
      ],
    },
    ],
  },
  {
    slug: "egret-ocean",
    name: "Egret Ocean",
    tagline: "Polarised open-water glacier",
    category: "Sunglasses",
    collections: ["fishing", "mountaineering"],
    price: 150,
    rating: 4.66,
    reviewCount: 357,
    description: "Fitted with shatterproof polarised lenses, Egret Ocean is designed to handle the intense glare and challenges of open water. Inspired by glacier sunglasses, leather side shields provide superior protection where regular sunglasses — even wraparounds — fall short. For long, sun-filled days at sea, trust the Egret Ocean.",
    highlights: [
      "Polarised shatterproof lenses for open water",
      "Leather side shields block glare from below and behind",
      "Removable leather centrepiece",
      "Floating retainer cord included",
    ],
    specGroups: [
    {
      title: "Lens — Polarised Shatterproof",
      items: [
        "Polarised for on-water glare",
        "Cat. 3 protection (12–15% VLT)",
        "Shatterproof construction",
        "100% UV400 protection",
        "Mirror coating",
      ],
    },
    {
      title: "Frame — Acetate & Leather",
      items: [
        "Handcrafted frames (34 g)",
        "Genuine leather side shields",
        "Removable leather centrepiece",
        "Floating retainer cord included",
      ],
    },
    ],
    features: [
    {
      eyebrow: "Optics",
      title: "Polarised for water",
      body: "Polarisation filters the scattered light coming off the surface, so you can read what is under it instead of what is bouncing off it.",
      image: "/images/verdon/products/egret-ocean/dark-grey-blue-4.jpg",
    },
    {
      eyebrow: "Performance",
      title: "Leather side shields",
      body: "Offshore, the glare comes from every direction at once. Side shields cover the gap that even a wraparound leaves open.",
      image: "/images/verdon/products/egret-ocean/dark-grey-blue-5.jpg",
    },
    {
      eyebrow: "Fit",
      title: "Glacier silhouette",
      body: "The same round front as Egret Glacier, tuned for sea level: close-fitting, low-profile and happy under a cap.",
      image: "/images/verdon/products/egret-ocean/black-4.jpg",
    },
    ],
    fieldImages: [
    { src: "/images/verdon/products/egret-ocean/dark-grey-blue-4.jpg", alt: "Man wears Egret Ocean sunglasses from VERDON in dark-grey-blue" },
    { src: "/images/verdon/products/egret-ocean/dark-grey-blue-5.jpg", alt: "Female sailor wears Egret Ocean sunglasses from VERDON for open water sailing" },
    { src: "/images/verdon/products/egret-ocean/black-4.jpg", alt: "Man wears Egret Ocean side shield sunglasses from VERDON" },
    { src: "/images/verdon/products/egret-ocean/black-5.jpg", alt: "Woman wears Egret Ocean polarized side shield sunglasses from VERDON for sailing" },
    { src: "/images/verdon/products/egret-ocean/tortoise-4.jpg", alt: "Man wears Egret Ocean sunglasses in Tortoise from VERDON" },
    { src: "/images/verdon/products/egret-ocean/tortoise-5.jpg", alt: "Egret Ocean sunglasses from VERDON in Tortoise offer Cat. 3 polarized sun protection" },
    ],
    colors: [
    {
      name: "Dark Grey Blue",
      slug: "dark-grey-blue",
      hex: "#3c3f42",
      hex2: "#2fb6cf",
      images: [
        { src: "/images/verdon/products/egret-ocean/dark-grey-blue-1.jpg", alt: "Egret Ocean polarized Cat. 3 sunglasses for sailing and open water sports with 100% UV protection and leather side shields" },
        { src: "/images/verdon/products/egret-ocean/dark-grey-blue-2.jpg", alt: "Side view of Egret Ocean polarized Cat. 3 sunglasses for sailing and open water sports with 100% UV protection and leather side shields" },
        { src: "/images/verdon/products/egret-ocean/dark-grey-blue-3.jpg", alt: "Egret Ocean polarized Cat. 3 sunglasses for sailing and open water sports with 100% UV protection and leather side shields in dark-grey-blue" },
        { src: "/images/verdon/products/egret-ocean/dark-grey-blue-4.jpg", alt: "Man wears Egret Ocean sunglasses from VERDON in dark-grey-blue" },
        { src: "/images/verdon/products/egret-ocean/dark-grey-blue-5.jpg", alt: "Female sailor wears Egret Ocean sunglasses from VERDON for open water sailing" },
      ],
    },
    {
      name: "Black",
      slug: "black",
      hex: "#1a1a1a",
      hex2: "#2b2b2b",
      images: [
        { src: "/images/verdon/products/egret-ocean/black-1.jpg", alt: "Egret Ocean ultimate side shield protection polarized sunglasses for the open water" },
        { src: "/images/verdon/products/egret-ocean/black-2.jpg", alt: "Side view of Egret Ocean ultimate side shield protection polarized sunglasses for the open water" },
        { src: "/images/verdon/products/egret-ocean/black-3.jpg", alt: "Egret Ocean side shield protection polarized sunglasses for sailing and open water sports" },
        { src: "/images/verdon/products/egret-ocean/black-4.jpg", alt: "Man wears Egret Ocean side shield sunglasses from VERDON" },
        { src: "/images/verdon/products/egret-ocean/black-5.jpg", alt: "Woman wears Egret Ocean polarized side shield sunglasses from VERDON for sailing" },
      ],
    },
    {
      name: "Tortoise",
      slug: "tortoise",
      hex: "#5a3128",
      hex2: "#2c4a48",
      images: [
        { src: "/images/verdon/products/egret-ocean/tortoise-1.jpg", alt: "VERDON Egret Ocean sunglasses offer Cat. 3 protection, polarized lenses and side shields" },
        { src: "/images/verdon/products/egret-ocean/tortoise-2.jpg", alt: "Side view of VERDON Egret Ocean sunglasses that offer Cat. 3 protection, polarized lenses and side shields" },
        { src: "/images/verdon/products/egret-ocean/tortoise-3.jpg", alt: "Egret Ocean polarized sunglasses from VERDON with genuine leather side shields and detachable centrepiece" },
        { src: "/images/verdon/products/egret-ocean/tortoise-4.jpg", alt: "Man wears Egret Ocean sunglasses in Tortoise from VERDON" },
        { src: "/images/verdon/products/egret-ocean/tortoise-5.jpg", alt: "Egret Ocean sunglasses from VERDON in Tortoise offer Cat. 3 polarized sun protection" },
      ],
    },
    ],
  },
  {
    slug: "lookouts",
    name: "Lookouts™",
    tagline: "Helior Optics shield",
    category: "Sunglasses",
    collections: ["cycling", "fishing"],
    price: 145,
    rating: 4.81,
    reviewCount: 90,
    isNew: true,
    description: "Superior vision for outdoor performance. Lookouts™ feature a shatterproof lens developed with Helior Optics, ensuring exceptional optical clarity, and a HydroVeil hydro-oleophobic coating that combats oil and residue. The 80s-inspired frame is made from 85% recycled fishing nets fused into a durable, lightweight nylon-6, and ships with interchangeable silicone nose pads for a secure, personalised fit.",
    highlights: [
      "Shatterproof lens developed with Helior Optics",
      "HydroVeil hydro-oleophobic coating sheds water and oil",
      "Frame made from 85% recycled fishing nets",
      "Interchangeable silicone nose pads included",
    ],
    specGroups: [
    {
      title: "Lens — Helior Optics Shatterproof",
      items: [
        "Developed with Helior Optics",
        "HydroVeil hydro-oleophobic coating",
        "Cat. 3 protection (15–17% VLT)",
        "100% UV400 protection",
        "Single-shield field of view",
      ],
    },
    {
      title: "Frame — Recycled Nylon-6",
      items: [
        "85% recycled fishing nets (27 g)",
        "Interchangeable silicone nose pads",
        "Helmet-compatible straight temples",
        "80s-inspired shield silhouette",
      ],
    },
    ],
    features: [
    {
      eyebrow: "Optics",
      title: "Helior Optics lens",
      body: "The shield lens is developed with Helior Optics and treated with HydroVeil, a hydro-oleophobic coating that keeps sweat, rain and fingerprints from settling.",
      image: "/images/verdon/products/lookouts/dark-teal-copper-5.jpg",
    },
    {
      eyebrow: "Performance",
      title: "85% recycled nylon-6",
      body: "The frame is fused from reclaimed fishing nets into nylon-6 — as light and as tough as virgin material, out of waste that was already in the water.",
      image: "/images/verdon/products/lookouts/dark-grey-silver-5.jpg",
    },
    {
      eyebrow: "Fit",
      title: "Interchangeable nose pads",
      body: "Three silicone nose pads ship in the box, so the shield can sit high enough to clear a helmet brow or low enough to clear your cheekbones.",
      image: "/images/verdon/products/lookouts/silver-blue-5.jpg",
    },
    ],
    fieldImages: [
    { src: "/images/verdon/products/lookouts/dark-teal-copper-5.jpg", alt: "Male cyclist wears VERDON sustainable shield sunglasses the Lookouts with Helior Optics monolens" },
    { src: "/images/verdon/products/lookouts/dark-grey-silver-5.jpg", alt: "Man wears Dark-Grey-Silver shield sunglasses the Lookouts from VERDON for ski touring" },
    { src: "/images/verdon/products/lookouts/silver-blue-5.jpg", alt: "Woman wears VERDON Lookouts in Silver-Blue for road cycling" },
    ],
    colors: [
    {
      name: "Dark Teal Copper",
      slug: "dark-teal-copper",
      hex: "#3d5a68",
      hex2: "#8a4a24",
      images: [
        { src: "/images/verdon/products/lookouts/dark-teal-copper-1.jpg", alt: "Sustainable shield sunglasses from VERDON the Lookouts feature Helior Optics lenses and frames made of 85% recycled fishing nets" },
        { src: "/images/verdon/products/lookouts/dark-teal-copper-2.jpg", alt: "Side view of  the Lookouts, sustainable shield sunglasses from VERDON, featuring Helior Optics lenses and frames made of 85% recycled fishing nets" },
        { src: "/images/verdon/products/lookouts/dark-teal-copper-3.jpg", alt: "VERDON Lookouts are sustainable shield sunglasses with Helior Optics optics" },
        { src: "/images/verdon/products/lookouts/dark-teal-copper-4.jpg", alt: "Lookouts size guide" },
        { src: "/images/verdon/products/lookouts/dark-teal-copper-5.jpg", alt: "Male cyclist wears VERDON sustainable shield sunglasses the Lookouts with Helior Optics monolens" },
      ],
    },
    {
      name: "Dark Grey Silver",
      slug: "dark-grey-silver",
      hex: "#3a3a3a",
      hex2: "#b9bcc0",
      images: [
        { src: "/images/verdon/products/lookouts/dark-grey-silver-1.jpg", alt: "VERDON Lookouts in Dark-Grey-Silver come with full-mirror Helior Optics optics and a sustainable frame" },
        { src: "/images/verdon/products/lookouts/dark-grey-silver-2.jpg", alt: "VERDON Lookouts in Dark-Grey-Silver come with full-mirror Helior Optics optics and a sustainable frame ideal for cycling and ski touring" },
        { src: "/images/verdon/products/lookouts/dark-grey-silver-3.jpg", alt: "VERDON Lookouts in Dark-Grey-Silver come with full-mirror Helior Optics optics and a sustainable frame perfect for ski touring, biking and running" },
        { src: "/images/verdon/products/lookouts/dark-grey-silver-4.jpg", alt: "Lookouts Dark-Grey-Silver size guide" },
        { src: "/images/verdon/products/lookouts/dark-grey-silver-5.jpg", alt: "Man wears Dark-Grey-Silver shield sunglasses the Lookouts from VERDON for ski touring" },
      ],
    },
    {
      name: "Silver Blue",
      slug: "silver-blue",
      hex: "#f2f2f0",
      hex2: "#2b47a8",
      images: [
        { src: "/images/verdon/products/lookouts/silver-blue-1.jpg", alt: "Sustainable shield sunglasses for gravel, trails and skiing the VERDON Lookouts are fitted with Helior Optics optics" },
        { src: "/images/verdon/products/lookouts/silver-blue-2.jpg", alt: "Sustainable shield sunglasses VERDON Lookouts are fitted with Helior Optics optics and sustainable frames made of 85% recycled materials" },
        { src: "/images/verdon/products/lookouts/silver-blue-3.jpg", alt: "High performance sustainable shield sunglasses the VERDON Lookouts are fitted with Helior Optics optics" },
        { src: "/images/verdon/products/lookouts/silver-blue-4.jpg", alt: "Silver Blue Lookouts sunglasses size guide" },
        { src: "/images/verdon/products/lookouts/silver-blue-5.jpg", alt: "Woman wears VERDON Lookouts in Silver-Blue for road cycling" },
      ],
    },
    ],
  },
  {
    slug: "alpine-aviators",
    name: "Alpine Aviators",
    tagline: "Retro ski aviator",
    category: "Sunglasses",
    collections: ["ski-snow"],
    price: 90,
  lensOptions: [
    { name: "Standard", surcharge: 0, blurb: "CLARO 52® market-leading clarity and exceptional impact resistance" },
    { name: "Polarised", surcharge: 30, blurb: "Add polarisation for reduced glare and optimal colour contrast", badge: "Most Popular" },
  ],
    rating: 4.78,
    reviewCount: 836,
    description: "The epitome of cool. Alpine Aviators were worn by everyone from the greatest skiers to the biggest movie stars — they came in every size and colour, and then they completely disappeared. We made it our mission to return them to their former glory, upgraded with exceptionally clear CLARO 52® lenses and a modern fit.",
    highlights: [
      "Faithful revival of the 70s ski aviator",
      "CLARO 52® nylon polyamide lenses, 100% UV400",
      "Mirror coating for reflected snow glare",
      "Sits flat under a helmet brow",
    ],
    specGroups: [
    {
      title: "Lens — CLARO 52® Nylon Polyamide",
      items: [
        "Superior clarity (ABBE 52)",
        "Sports impact resistance",
        "Cat. 3 protection (15–17% VLT)",
        "100% UV400 protection",
        "Anti-scratch coating",
      ],
    },
    {
      title: "Frame — Premium Cellulose Acetate",
      items: [
        "Handcrafted frames (29 g)",
        "Adjustable temple ends",
        "Detachable sports headstrap included",
        "Lightweight and hypoallergenic",
      ],
    },
    ],
    features: [
    {
      eyebrow: "Optics",
      title: "CLARO 52® lenses",
      body: "The originals looked the part and little else. CLARO 52® nylon polyamide brings ABBE 52 clarity and full UV400 protection to the same silhouette.",
      image: "/images/verdon/products/alpine-aviators/tricolor-blue-4.jpg",
    },
    {
      eyebrow: "Performance",
      title: "Built for reflected glare",
      body: "A mirror coating over the base tint handles light coming up off the snow as well as down from the sky — the reason flat light is so tiring without it.",
      image: "/images/verdon/products/alpine-aviators/black-4.jpg",
    },
    {
      eyebrow: "Fit",
      title: "Modern proportions",
      body: "Reproportioned for a modern face and a modern helmet: the brow sits flat under a lid instead of fighting it.",
      image: "/images/verdon/products/alpine-aviators/tortoise-4.jpg",
    },
    ],
    fieldImages: [
    { src: "/images/verdon/products/alpine-aviators/tricolor-blue-4.jpg", alt: "Man wears VERDON Alpine Aviators in Blue Tricolor color" },
    { src: "/images/verdon/products/alpine-aviators/black-4.jpg", alt: "Man wears VERDON Alpine Aviators sunglasses in Black colorway" },
    { src: "/images/verdon/products/alpine-aviators/tortoise-4.jpg", alt: "Man wears VERDON 70s retro-inspired Alpine Aviators sunglasses in Tortoise" },
    ],
    colors: [
    {
      name: "Tricolor Blue",
      slug: "tricolor-blue",
      hex: "#22304f",
      hex2: "#cdd3da",
      images: [
        { src: "/images/verdon/products/alpine-aviators/tricolor-blue-1.jpg", alt: "70s-inspired mirror lens Alpine Aviators sunglasses from VERDON in Tricolor Blue" },
        { src: "/images/verdon/products/alpine-aviators/tricolor-blue-2.jpg", alt: "Side view of 70s-inspired mirror lens Alpine Aviators sunglasses from VERDON" },
        { src: "/images/verdon/products/alpine-aviators/tricolor-blue-3.jpg", alt: "70s-inspired mirror lens Alpine Aviators sunglasses from VERDON in Tricolor Blue acetate" },
        { src: "/images/verdon/products/alpine-aviators/tricolor-blue-4.jpg", alt: "Man wears VERDON Alpine Aviators in Blue Tricolor color" },
      ],
    },
    {
      name: "Black",
      slug: "black",
      hex: "#141414",
      hex2: "#cdd3da",
      images: [
        { src: "/images/verdon/products/alpine-aviators/black-1.jpg", alt: "70s-inspired mirror lens Alpine Aviator sunglasses from VERDON in Black" },
        { src: "/images/verdon/products/alpine-aviators/black-2.jpg", alt: "70s-inspired mirror lens Alpine Aviator sunglasses from VERDON in Black" },
        { src: "/images/verdon/products/alpine-aviators/black-3.jpg", alt: "70s-inspired Alpine Aviators sunglasses from VERDON in Black" },
        { src: "/images/verdon/products/alpine-aviators/black-4.jpg", alt: "Man wears VERDON Alpine Aviators sunglasses in Black colorway" },
      ],
    },
    {
      name: "Tortoise",
      slug: "tortoise",
      hex: "#a0562a",
      hex2: "#cdd3da",
      images: [
        { src: "/images/verdon/products/alpine-aviators/tortoise-1.jpg", alt: "VERDON 70s-inspired Alpine Aviators sunglasses in Tortoise" },
        { src: "/images/verdon/products/alpine-aviators/tortoise-2.jpg", alt: "Side view of VERDON 70s-inspired Alpine Aviators sunglasses in Tortoise" },
        { src: "/images/verdon/products/alpine-aviators/tortoise-3.jpg", alt: "VERDON 70s-inspired Alpine Aviators sunglasses in Tortoise with mirror lenses" },
        { src: "/images/verdon/products/alpine-aviators/tortoise-4.jpg", alt: "Man wears VERDON 70s retro-inspired Alpine Aviators sunglasses in Tortoise" },
      ],
    },
    ],
  },
];

/** Add-ons offered on the PDP and priced into the cart line. */
export type AddOn = {
  id: string;
  name: string;
  price: number;
  blurb: string;
  image: string;
};

export const addOns: AddOn[] = [
  {
    id: "sport-retainer",
    name: "Sport Retainer",
    price: 10,
    blurb: "Adjustable strap that clips to the temple ends and keeps the frame on.",
    image: "/images/verdon/accessories/sport-retainer-1.jpg",
  },
  {
    id: "hardcase",
    name: "Extra Hardcase",
    price: 15,
    blurb: "A second crush-proof case, so one can live in the pack and one at home.",
    image: "/images/verdon/accessories/hardcase-1.jpg",
  },
  {
    id: "leather-pouch",
    name: "Leather Pouch",
    price: 10,
    blurb: "Slim leather sleeve for a jacket pocket when a hardcase is too much.",
    image: "/images/verdon/accessories/leather-pouch-1.jpg",
  },
];

export function getAddOn(id: string): AddOn | undefined {
  return addOns.find((a) => a.id === id);
}

/** The four benefit accordions under ADD TO CART — identical across the catalogue. */
export const productBenefits: { title: string; body: string }[] = [
  {
    title: "Free Shipping",
    body: "Free standard shipping on every order, dispatched from Amsterdam within one working day. Delivery in 2–9 working days; express is available at checkout.",
  },
  {
    title: "Free Returns",
    body: "Free returns and exchanges for 60 days through our returns portal. Return for another item, store credit or a refund to the original payment method — items must come back in their original condition and packaging.",
  },
  {
    title: "Lifetime Warranty",
    body: "VERDON eyewear carries a lifetime warranty from the date of purchase against manufacturing defects. Where a product has been damaged through normal wear and tear, we always work to offer a repair at a reasonable price.",
  },
  {
    title: "1 kg Plastic Cleanup",
    body: "For every pair of VERDON eyewear sold, 1 kg of plastic waste is cleaned up and recycled through our partner Shorebound. After your order you receive an update detailing the cleanup you funded.",
  },
];

/** Promo strip above ADD TO CART. Demo copy — no discount logic behind it. */
export const promoMessage = "Buy two sunglasses, save 50% on the second pair";

/** Carousel order for the homepage bestsellers rail. */
export const bestsellers: Product[] = products;

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getColor(product: Product, name: string): ColorVariant {
  return product.colors.find((c) => c.name === name) ?? product.colors[0];
}

/** Price of one unit with the chosen lens fitted (add-ons are priced separately). */
export function unitPrice(product: Product, lens?: string): number {
  if (!product.lensOptions) return product.price;
  const option = product.lensOptions.find((l) => l.name === lens) ?? product.lensOptions[0];
  return product.price + option.surcharge;
}
