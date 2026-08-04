"use client";

import { useState } from "react";
import ProductBuyBox from "@/components/verdon/product/ProductBuyBox";
import ProductGallery from "@/components/verdon/product/ProductGallery";
import { getColor, type Product } from "@/data/verdon/products";

/**
 * Owns the selected colourway, which the gallery and the buy box both read —
 * picking a swatch swaps the gallery to that colourway's own packshots.
 */
export default function ProductDetail({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].name);
  const variant = getColor(product, color);

  return (
    // minmax(0,…) on every track, including the single-column mobile one: an
    // `auto` or bare-`fr` track is sized to its items' min-content, so one nowrap
    // string deep in the buy column is enough to push the whole grid wider than
    // its container — which is how ADD TO CART ended up off-screen once already
    <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] gap-10 px-6 pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 lg:px-16 lg:pb-24">
      <ProductGallery
        key={variant.slug}
        images={variant.images}
        productName={`${product.name} — ${variant.name}`}
      />

      <div className="lg:sticky lg:top-20 lg:self-start">
        <ProductBuyBox product={product} variant={variant} onSelectColor={setColor} />
      </div>
    </div>
  );
}
