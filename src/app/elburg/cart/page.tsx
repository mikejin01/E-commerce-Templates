import type { Metadata } from "next";
import CartView from "@/components/elburg/cart/CartView";

export const metadata: Metadata = {
  title: "Your bag",
  robots: { index: false },
};

export default function ElburgCartPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-12 lg:py-20">
      <CartView />
    </div>
  );
}
