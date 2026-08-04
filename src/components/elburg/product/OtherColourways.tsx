"use client";

import ProductCard from "@/components/elburg/product/ProductCard";
import { skus, type ColorVariant, type Product } from "@/data/elburg/products";

/**
 * The other-products band — the reference's "OTHER *ORIGINAL* ENVELOPE WALLET"
 * rail. It shows the model's other colourways first, then fills out the rail
 * with the rest of the tier so the band is never two lonely cards.
 */
export default function OtherColourways({
  product,
  color,
}: {
  product: Product;
  color: ColorVariant;
}) {
  const siblings = product.colors
    .filter((option) => option.slug !== color.slug)
    .map((option) => ({ product, color: option }));

  const sameTier = skus.filter(
    (sku) => sku.product.slug !== product.slug && sku.product.tier === product.tier,
  );

  const rail = [...siblings, ...sameTier].slice(0, 8);

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <h2 className="font-heading text-[26px] font-bold uppercase leading-none tracking-[0.01em] md:text-[34px]">
          Other{" "}
          <span className="font-sans text-[0.95em] font-normal normal-case italic">
            {product.name}
          </span>{" "}
          &amp; more
        </h2>
      </div>

      <ul className="no-scrollbar mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 px-6 lg:scroll-pl-12 lg:px-12">
        {rail.map((sku) => (
          <li
            key={`${sku.product.slug}-${sku.color.slug}`}
            className="w-[68vw] min-w-0 shrink-0 snap-start sm:w-[40vw] lg:w-[26vw] xl:w-[20vw]"
          >
            <ProductCard
              product={sku.product}
              color={sku.color}
              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 26vw, (min-width: 640px) 40vw, 68vw"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
