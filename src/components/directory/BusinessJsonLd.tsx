import { Business } from "@/lib/types/business";

interface BusinessJsonLdProps {
  businesses: Business[];
}

export function BusinessJsonLd({ businesses }: BusinessJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: businesses.map((b, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": b.category === "hotel" ? "LodgingBusiness" : "LocalBusiness",
        name: b.name,
        description: b.shortDescription,
        url: `https://${b.subdomain}`,
        image: b.coverUrl,
        telephone: b.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: b.address || "",
          addressLocality: b.city,
          addressCountry: "PE",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
