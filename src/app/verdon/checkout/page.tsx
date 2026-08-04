import type { Metadata } from "next";
import CheckoutForm from "@/components/verdon/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Demo checkout — no payment is taken.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
