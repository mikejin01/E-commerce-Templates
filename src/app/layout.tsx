import type { Metadata, Viewport } from "next";
import "./globals.css";
import DemoSwitcher from "@/components/shared/DemoSwitcher";

export const metadata: Metadata = {
  // deploy URL (incl. base path) so OG asset paths resolve; localhost keeps
  // local builds warning-free
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Commerce Demo Showcase",
    template: "%s | Commerce Demo Showcase",
  },
  description: "A private showcase of e-commerce demo storefronts.",
  // private client demos — never meant to be indexed
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1d1c1c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {children}
        <DemoSwitcher />
      </body>
    </html>
  );
}
