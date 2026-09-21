import type { Metadata } from "next";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.naturalkitchen.co.uk"),
  title: { default: "Natural Kitchen — Good food. In good company.", template: "%s | Natural Kitchen" },
  description: "Your all-day London kitchen. Explore breakfast, seasonal food and drinks, browse our menus, and find your table at Angel Court, New Street Square or Trinity Square.",
  openGraph: { title: "Natural Kitchen", description: "Good food. In good company. Restaurant · Deli · Bar in London.", type: "website", locale: "en_GB", images: [{ url: "/images/breakfast.webp", width: 1200, height: 799, alt: "Breakfast at Natural Kitchen" }] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body id="top"><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /></body></html>;
}
