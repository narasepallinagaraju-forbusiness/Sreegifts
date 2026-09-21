import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = {
  title: { default: "mosaic.resin | Handmade resin art", template: "%s | mosaic.resin" },
  description: "A catalogue of handmade resin art for memories, celebrations and meaningful gifting.",
  openGraph: { title: "mosaic.resin", description: "Handmade resin art for moments worth keeping.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
