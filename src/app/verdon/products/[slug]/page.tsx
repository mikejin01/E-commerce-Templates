import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AsSeenIn from "@/components/verdon/product/AsSeenIn";
import FeatureRows from "@/components/verdon/product/FeatureRows";
import InTheField from "@/components/verdon/product/InTheField";
import ProductCard from "@/components/verdon/product/ProductCard";
import ProductDetail from "@/components/verdon/product/ProductDetail";
import ProductReviews from "@/components/verdon/product/ProductReviews";
import SpecsAndMaterials from "@/components/verdon/product/SpecsAndMaterials";
import { addOns, getProduct, products } from "@/data/verdon/products";
import { getReviews, getReviewSummary } from "@/data/verdon/reviews";
import { formatPrice } from "@/lib/verdon/format";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const summary = getReviewSummary(slug);

  // same-activity frames first, topped up so the rail is always full
  const related = [
    ...products.filter(
      (p) => p.slug !== product.slug && p.collections.some((c) => product.collections.includes(c)),
    ),
    ...products.filter(
      (p) => p.slug !== product.slug && !p.collections.some((c) => product.collections.includes(c)),
    ),
  ].slice(0, 4);

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 py-5 lg:px-16">
        <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.1em] text-neutral-500">
          <Link href="/verdon" className="hover:text-verdon-green">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link href="/verdon/collections/all" className="hover:text-verdon-green">
            Shop All
          </Link>
          <span className="px-2">/</span>
          <span className="text-verdon-green">{product.name}</span>
        </nav>
      </div>

      <ProductDetail product={product} />

      <SpecsAndMaterials product={product} />

      <InTheField images={product.fieldImages} />

      <AsSeenIn />

      <FeatureRows features={product.features} />

      {summary && (
        <ProductReviews
          productName={product.name}
          summary={summary}
          reviews={getReviews(slug)}
        />
      )}

      <section className="bg-verdon-cream py-14 md:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <h2 className="font-heading text-[24px] font-medium uppercase tracking-[0.04em] md:text-[30px]">
            You might also like
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} sizes="(min-width: 1024px) 25vw, 45vw" />
            ))}
          </div>

          <h3 className="mt-14 font-heading text-[16px] font-medium uppercase tracking-[0.08em]">
            Extras
          </h3>
          <ul className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {addOns.map((addOn) => (
              <li key={addOn.id} className="bg-white p-4">
                <div className="relative aspect-square overflow-hidden bg-verdon-cream">
                  <Image
                    src={addOn.image}
                    alt={addOn.name}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 font-heading text-[13px] font-medium uppercase tracking-[0.06em]">
                  {addOn.name}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">{addOn.blurb}</p>
                <p className="mt-2 text-[13px] font-medium tabular-nums">
                  {formatPrice(addOn.price)}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-neutral-400">
                  Add from the box above
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
