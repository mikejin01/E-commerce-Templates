import type { Metadata, Viewport } from "next";
import { Jost, Montserrat } from "next/font/google";
import AnnouncementBar from "@/components/verdon/layout/AnnouncementBar";
import Header from "@/components/verdon/layout/Header";
import Footer from "@/components/verdon/layout/Footer";
import CartDrawer from "@/components/verdon/cart/CartDrawer";
import { CartProvider } from "@/lib/verdon/cart-context";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const description =
  "Classic alpine style meets performance eyewear. Sunglasses and goggles built for life outdoors. Demo site.";

export const metadata: Metadata = {
  title: {
    default: "VERDON® | Classic Style, Maximum Performance",
    template: "%s | VERDON®",
  },
  description,
  applicationName: "VERDON Demo",
  openGraph: {
    type: "website",
    siteName: "VERDON®",
    title: "VERDON® | Classic Style, Maximum Performance",
    description,
    images: [
      { url: "/images/verdon/hero/hero-desktop.png", width: 1200, height: 630, alt: "VERDON" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#173c37",
};

export default function VerdonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`site-verdon ${jost.variable} ${montserrat.variable} flex flex-1 flex-col`}>
      <CartProvider>
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </div>
  );
}
