import type { Metadata } from "next";
import CartView from "@/components/verdon/cart/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review the frames in your cart before checkout.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-16 lg:py-16">
      <CartView />
    </div>
  );
}
