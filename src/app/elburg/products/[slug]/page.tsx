import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/elburg/product/ProductDetail";
import ReviewCarousel from "@/components/elburg/product/ReviewCarousel";
import StoriesBand from "@/components/elburg/product/StoriesBand";
import WalletFacts from "@/components/elburg/product/WalletFacts";
import { getColor, getProduct, products, titleFor } from "@/data/elburg/products";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ colour?: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { colour } = await searchParams;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };

  const color = getColor(product, colour);
  return {
    title: `${titleFor(product, color)} — ${color.name}`,
    description: product.description,
    openGraph: {
      title: `${titleFor(product, color)} — ${color.name}`,
      description: product.description,
      images: [{ url: color.images[0].src, alt: color.images[0].alt }],
    },
  };
}

export default async function ElburgProductPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { colour } = await searchParams;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <ProductDetail product={product} initialColour={colour}>
      <ReviewCarousel />
      <WalletFacts />
      <StoriesBand />
    </ProductDetail>
  );
}
