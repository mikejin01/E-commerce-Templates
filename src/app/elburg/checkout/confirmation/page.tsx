import type { Metadata } from "next";
import ConfirmationView from "@/components/elburg/checkout/ConfirmationView";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your demo order is confirmed.",
  robots: { index: false, follow: false },
};

export default function ElburgConfirmationPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-12 lg:py-20">
      <ConfirmationView />
    </div>
  );
}
