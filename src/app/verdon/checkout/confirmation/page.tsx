import type { Metadata } from "next";
import ConfirmationView from "@/components/verdon/checkout/ConfirmationView";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your demo order is confirmed.",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-16 lg:py-16">
      <ConfirmationView />
    </div>
  );
}
