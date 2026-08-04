"use client";

import Link from "next/link";
import ProductThumb from "@/components/elburg/product/ProductThumb";
import QuantityStepper from "@/components/elburg/cart/QuantityStepper";
import { useCart, type CartItem } from "@/lib/elburg/cart-context";
import { formatPrice } from "@/lib/elburg/format";

export default function CartLineItem({
  item,
  onNavigate,
  size = "sm",
}: {
  item: CartItem;
  onNavigate?: () => void;
  size?: "sm" | "md";
}) {
  const { updateQuantity, removeItem } = useCart();
  const href = `/elburg/products/${item.product.slug}?colour=${item.variant.slug}`;

  return (
    /* minmax(0,…) on the text track — standing rule 5. A long colourway name
       inside a 390px drawer sizes the grid to its min-content otherwise. */
    <li className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[88px_minmax(0,1fr)]">
      <Link href={href} onClick={onNavigate} className="block">
        <ProductThumb
          src={item.image}
          alt={item.variant.images[0].alt}
          tint={item.tint}
          sizes="88px"
          className="aspect-square"
        />
      </Link>

      <div className="flex min-w-0 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={href}
            onClick={onNavigate}
            className="-my-1 py-1 font-heading text-[14px] font-medium uppercase leading-tight tracking-[0.03em] hover:text-elburg-accent"
          >
            {item.title}
          </Link>
          <span className="shrink-0 font-heading text-[14px] tabular-nums">
            {formatPrice(item.lineTotal)}
          </span>
        </div>

        <p className="mt-0.5 text-[13px] italic text-elburg-ink/70">{item.variant.name}</p>

        {item.addOnItems.length > 0 && (
          <ul className="mt-1.5 space-y-0.5">
            {item.addOnItems.map((addOn) => (
              <li key={addOn.id} className="text-[12px] text-elburg-ink/60">
                + {addOn.name} · {formatPrice(addOn.price)}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3 flex items-center justify-between gap-3">
          <QuantityStepper
            quantity={item.quantity}
            onChange={(quantity) => updateQuantity(item.key, quantity)}
            label={item.title}
            size={size}
          />
          <button
            type="button"
            onClick={() => removeItem(item.key)}
            className="-m-2 p-2 font-heading text-[11px] uppercase tracking-[0.1em] text-elburg-ink/60 underline underline-offset-4 hover:text-elburg-accent"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
