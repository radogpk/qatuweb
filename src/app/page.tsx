import type { Metadata } from "next";
import { MarketingHome } from "@/components/home/MarketingHome";
import { siteConfig } from "@/lib/config/site";
import {
  homeDescription,
  homeStructuredData,
  homeTitle,
  serializeStructuredData,
} from "@/lib/seo/home";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: siteConfig.name,
    title: homeTitle,
    description: homeDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function HomePage() {
  return (
    <>
      <script
        id="qatu-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(homeStructuredData),
        }}
      />
      <MarketingHome />
    </>
  );
}
