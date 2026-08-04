"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import BuyBox from "@/components/elburg/product/BuyBox";
import ImageStrip from "@/components/elburg/product/ImageStrip";
import MaterialBand from "@/components/elburg/product/MaterialBand";
import OtherColourways from "@/components/elburg/product/OtherColourways";
import Specifications from "@/components/elburg/product/Specifications";
import StickyBuyBar from "@/components/elburg/product/StickyBuyBar";
import { getColor, type Product } from "@/data/elburg/products";
import { useCart } from "@/lib/elburg/cart-context";

/**
 * The PDP's colourway-dependent half. The reference gives each colourway its own
 * URL; this demo has one route per model (standing rule 3) and carries the
 * colourway in `?colour=`, which the listing links to and this component keeps
 * in sync with `replace` — so a swatch click is shareable and does not stack up
 * history entries.
 *
 * The three sections that do not depend on the colourway — reviews, wallet
 * facts, stories — arrive as `children` and stay server components.
 */
export default function ProductDetail({
  product,
  initialColour,
  children,
}: {
  product: Product;
  initialColour?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [colourSlug, setColourSlug] = useState(() => getColor(product, initialColour).slug);
  const [addOns, setAddOns] = useState<string[]>([]);

  const color = getColor(product, colourSlug);

  const onColorChange = useCallback(
    (slug: string) => {
      setColourSlug(slug);
      router.replace(`/elburg/products/${product.slug}?colour=${slug}`, { scroll: false });
    },
    [product.slug, router],
  );

  const onToggleAddOn = useCallback((id: string) => {
    setAddOns((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  }, []);

  const onAdd = useCallback(() => {
    addItem({ slug: product.slug, color: colourSlug, addOns });
  }, [addItem, product.slug, colourSlug, addOns]);

  return (
    <>
      {/* minmax(0,…) on both tracks; the left one holds a scroll rail, so it
          needs min-w-0 as well — standing rule 5 */}
      <section className="mx-auto grid max-w-[1440px] gap-8 px-0 pb-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-10 lg:pl-0 lg:pr-12">
        <div className="min-w-0">
          <ImageStrip key={color.slug} color={color} />
        </div>

        <div className="min-w-0 px-6 lg:sticky lg:top-[74px] lg:self-start lg:px-0 lg:pt-6">
          <BuyBox
            product={product}
            color={color}
            onColorChange={onColorChange}
            selectedAddOns={addOns}
            onToggleAddOn={onToggleAddOn}
            onAdd={onAdd}
          />
        </div>
      </section>

      <Specifications accordions={product.accordions} dimensions={product.dimensions} />

      <MaterialBand material={color.material} />

      {children}

      <OtherColourways product={product} color={color} />

      <StickyBuyBar product={product} color={color} addOns={addOns} onAdd={onAdd} />
    </>
  );
}
