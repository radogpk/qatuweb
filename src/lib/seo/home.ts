import { siteConfig } from "@/lib/config/site";

export const homeTitle =
  "Software y Páginas Web a Medida por S/ 30 al mes en Ayacucho | Qatu Web";
export const homeDescription =
  "El primer SaaS no tradicional en Ayacucho: software a medida, páginas web y catálogos móviles con pedidos a WhatsApp por S/ 30 al mes. Sin comisiones por venta y con base de datos propia.";

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;

// Keep this graph aligned with the service and location described on the page.
// Reviews, customer counts, social profiles and unverified contacts are omitted.
export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      alternateName: "Qatu",
      url: siteConfig.url,
      description: siteConfig.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ayacucho",
        addressCountry: "PE",
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: siteConfig.name,
      alternateName: "Qatu",
      inLanguage: "es-PE",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "Service",
      "@id": `${siteConfig.url}/#web-design-service`,
      name: "Diseño de páginas web y catálogos con pedidos por WhatsApp",
      serviceType: "Diseño web para negocios",
      description:
        "Diseño e implementación de páginas web y catálogos digitales para negocios, con alojamiento, soporte y pedidos directos por WhatsApp según el plan contratado.",
      url: `${siteConfig.url}/planes`,
      provider: { "@id": organizationId },
      areaServed: { "@type": "Country", name: "Perú" },
    },
  ],
};

export function serializeStructuredData(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
