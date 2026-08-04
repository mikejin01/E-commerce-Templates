import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Newsreader } from "next/font/google";
import Header from "@/components/elburg/layout/Header";
import Footer from "@/components/elburg/layout/Footer";
import CartDrawer from "@/components/elburg/cart/CartDrawer";
import { CartProvider } from "@/lib/elburg/cart-context";

/* Barlow Condensed stands in for the reference's condensed grotesque: every
   label, nav item, product name and button. Newsreader is the editorial serif,
   loaded with italic because the display type leans on it far more than upright. */
const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const description =
  "Card-protecting wallets and pocket carry, made in Europe. Designed to last, built to be repaired. Demo site.";

export const metadata: Metadata = {
  title: {
    default: "ELBURG | Wallet Makers Since 1997",
    template: "%s | ELBURG",
  },
  description,
  applicationName: "ELBURG Demo",
  openGraph: {
    type: "website",
    siteName: "ELBURG",
    title: "ELBURG | Wallet Makers Since 1997",
    description,
    images: [
      {
        url: "/images/elburg/hero/claspwallet-hero.jpg",
        width: 1200,
        height: 630,
        alt: "ELBURG",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f4f0",
};

export default function ElburgLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`site-elburg ${barlowCondensed.variable} ${newsreader.variable} flex flex-1 flex-col`}
    >
      <CartProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </div>
  );
}
