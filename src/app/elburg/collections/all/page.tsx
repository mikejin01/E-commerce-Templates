import type { Metadata } from "next";
import ListingView from "@/components/elburg/product/ListingView";

export const metadata: Metadata = {
  title: "All wallets",
  description:
    "Every ELBURG wallet — essential carry for up to six cards, expanded carry for up to sixteen.",
};

export default function ElburgCollectionPage() {
  return <ListingView />;
}
