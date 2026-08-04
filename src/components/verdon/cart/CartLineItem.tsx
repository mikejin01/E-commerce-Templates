"use client";

import Image from "next/image";
import Link from "next/link";
import QuantityStepper from "@/components/verdon/cart/QuantityStepper";
import { useCart, type CartItem } from "@/lib/verdon/cart-context";
import { formatPrice } from "@/lib/verdon/format";

export default function CartLineItem({
  item,
  size = "sm",
  onNavigate,
}: {
  item: CartItem;
  /** `sm` in the drawer, `md` on the cart page */
  size?: "sm" | "md";
  onNavigate?: () => void;
}) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity, variantLabel, addOnItems } = item;

  return (
    <li className={`flex gap-4 ${size === "md" ? "py-6" : "py-5"}`}>
      <Link
        href={`/verdon/products/${product.slug}`}
        onClick={onNavigate}
        className={`relative aspect-square shrink-0 overflow-hidden bg-verdon-cream ${
          size === "md" ? "w-24 md:w-32" : "w-20"
        }`}
      >
        <Image
          src={item.image}
          alt={product.name}
          fill
          sizes={size === "md" ? "128px" : "80px"}
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/verdon/products/${product.slug}`}
              onClick={onNavigate}
              className="font-heading text-[13px] font-medium uppercase tracking-[0.06em] hover:underline md:text-[14px]"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-[11px] text-neutral-500">{variantLabel}</p>
            {addOnItems.length > 0 && (
              <ul className="mt-1 space-y-0.5">
                {addOnItems.map((addOn) => (
                  <li key={addOn.id} className="text-[11px] text-neutral-500">
                    + {addOn.name} ({formatPrice(addOn.price)})
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="shrink-0 text-[13px] font-medium tabular-nums">
            {formatPrice(item.lineTotal)}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <QuantityStepper
            quantity={quantity}
            onChange={(next) => updateQuantity(item.key, next)}
            label={`${product.name}, ${variantLabel}`}
            size={size}
          />
          <button
            type="button"
            onClick={() => removeItem(item.key)}
            className="text-[11px] uppercase tracking-[0.1em] text-neutral-500 underline underline-offset-4 hover:text-verdon-green"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
