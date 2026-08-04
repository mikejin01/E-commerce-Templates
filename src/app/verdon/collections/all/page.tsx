import type { Metadata } from "next";
import ProductCard from "@/components/verdon/product/ProductCard";
import { products } from "@/data/verdon/products";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Every VERDON frame — sunglasses and goggles built for the mountains, the water and the road home.",
};

export default function ShopAllPage() {
  return (
    <>
      <div className="border-b border-neutral-200">
        <div className="mx-auto max-w-[1440px] px-6 py-12 text-center lg:px-16 lg:py-16">
          <h1 className="font-heading text-[30px] font-medium uppercase tracking-[0.04em] md:text-[38px]">
            Shop All
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-neutral-500">
            Classic frames, alpine-grade optics. Every pair ships free with a lifetime warranty and
            60 days to change your mind.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-16 lg:py-16">
        <p className="text-[11px] uppercase tracking-[0.12em] text-neutral-500">
          {products.length} products
        </p>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 45vw"
            />
          ))}
        </div>
      </div>
    </>
  );
}
