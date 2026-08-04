import Link from "next/link";
import ProductThumb from "@/components/elburg/product/ProductThumb";
import { titleFor, type ColorVariant, type Product } from "@/data/elburg/products";
import { formatPrice } from "@/lib/elburg/format";

/**
 * One SKU — a model in one colourway — laid out the way the reference lays out
 * its listing card: the render on its own tint, the title in condensed caps
 * with the price on the same line, the colour name below it, then the model's
 * other colourways as dots.
 *
 * The dots navigate. Each one is a real sibling SKU with its own listing card
 * and its own PDP state, so making them links (rather than the homepage's
 * decorative dots) costs nothing and matches the reference.
 */
export default function ProductCard({
  product,
  color,
  sizes,
  priority = false,
}: {
  product: Product;
  color: ColorVariant;
  sizes: string;
  priority?: boolean;
}) {
  const href = `/elburg/products/${product.slug}?colour=${color.slug}`;

  return (
    <article className="flex min-w-0 flex-col">
      <Link href={href} className="group block">
        <ProductThumb
          src={color.images[0].src}
          alt={color.images[0].alt}
          tint={color.tint}
          sizes={sizes}
          priority={priority}
          className="aspect-[41/47]"
        />
        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="min-w-0 font-heading text-[16px] font-bold uppercase leading-[1.1] tracking-[0.02em] group-hover:text-elburg-accent">
            {titleFor(product, color)}
          </h3>
          <span className="shrink-0 font-heading text-[16px] font-medium leading-[1.1] tabular-nums">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="mt-1 text-[14px] italic leading-none opacity-70">{color.name}</p>
      </Link>

      <ul className="mt-3 flex items-center gap-1.5">
        {product.colors.map((option) => (
          <li key={option.slug}>
            <Link
              href={`/elburg/products/${product.slug}?colour=${option.slug}`}
              aria-label={`${product.name} in ${option.name}`}
              style={{ backgroundColor: option.hex }}
              className={`block size-3.5 rounded-full ${
                option.slug === color.slug
                  ? "ring-1 ring-elburg-ink/50 ring-offset-2 ring-offset-elburg-paper"
                  : ""
              }`}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
