import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/verdon/product/StarRating";
import type { Product } from "@/data/verdon/products";
import { formatPrice } from "@/lib/verdon/format";

function Swatch({ hex, hex2 }: { hex: string; hex2: string }) {
  return (
    <span
      className="block size-3.5 rounded-full ring-1 ring-black/15 ring-offset-1 ring-offset-white"
      style={{ background: `linear-gradient(135deg, ${hex} 50%, ${hex2} 50%)` }}
    />
  );
}

export default function ProductCard({
  product,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 70vw",
}: {
  product: Product;
  sizes?: string;
}) {
  return (
    // `relative` keeps the sr-only spans (position:absolute) inside the card so
    // they can't escape the carousel's overflow clip and widen the document
    <Link href={`/verdon/products/${product.slug}`} className="group relative block">
      <div className="relative aspect-square overflow-hidden bg-verdon-cream">
        {product.isNew && (
          <span className="absolute left-3 top-3 z-10 bg-verdon-green px-2 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            New
          </span>
        )}
        <Image
          src={product.colors[0].images[0].src}
          alt={product.name}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-3.5">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <h3 className="mt-1.5 font-heading text-[15px] font-medium uppercase tracking-[0.06em] group-hover:underline">
          {product.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-neutral-500">{product.tagline}</p>
        <p className="mt-1.5 text-[13px] font-medium tabular-nums">
          {product.lensOptions ? "From " : ""}
          {formatPrice(product.price)}
        </p>

        <div className="mt-2.5 flex items-center gap-1.5">
          {product.colors.map((color) => (
            <Swatch key={color.name} hex={color.hex} hex2={color.hex2} />
          ))}
          <span className="sr-only">
            Available in {product.colors.map((c) => c.name).join(", ")}
          </span>
        </div>
      </div>
    </Link>
  );
}
