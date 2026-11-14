import { siteConfig } from "@/lib/config/site";

export const homeTitle =
  "Software y Páginas Web a Medida por S/ 30 al mes en Ayacucho | Qatu Web";
export const homeDescription =
  "El primer SaaS no tradicional en Ayacucho: software a medida, páginas web y catálogos móviles con pedidos a WhatsApp por S/ 30 al mes. Sin comisiones por venta y con base de datos propia.";

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;

// Schema enriquecido para SEO, AEO (Google AI Overviews) y GEO (LLMs)
export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      alternateName: "Qatu Web Ayacucho",
      url: siteConfig.url,
      description: siteConfig.description,
      telephone: "+51941663265",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Huamanga",
        addressRegion: "Ayacucho",
        addressCountry: "PE",
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: siteConfig.name,
      alternateName: "Qatu Web",
      inLanguage: "es-PE",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.url}/#software-app`,
      name: "Qatu Web — Plataforma de Tiendas y Catálogos Móviles",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android (PWA)",
      offers: [
        {
          "@type": "Offer",
          name: "Plan Mensual",
          price: "30.00",
          priceCurrency: "PEN",
          description: "Suscripción mensual de S/ 30 al mes (S/ 1 al día) con S/ 90 de activación.",
          url: `${siteConfig.url}/planes`,
        },
        {
          "@type": "Offer",
          name: "Plan Anual Recomendado",
          price: "300.00",
          priceCurrency: "PEN",
          description: "Suscripción anual de S/ 300 con activación e instalación 100% GRATIS.",
          url: `${siteConfig.url}/planes`,
        },
      ],
      author: { "@id": organizationId },
    },
    {
      "@type": "Service",
      "@id": `${siteConfig.url}/#web-design-service`,
      name: "Diseño de páginas web, cartas digitales y tiendas virtuales en Ayacucho",
      serviceType: "Ingeniería de Software y Comercio Electrónico",
      description:
        "Infraestructura aislada en Supabase y Cloudflare Edge, catálogo móvil ultraligero y comanda directa a WhatsApp con 0% de comisiones por venta.",
      url: `${siteConfig.url}/planes`,
      provider: { "@id": organizationId },
      areaServed: [
        { "@type": "City", name: "Ayacucho" },
        { "@type": "City", name: "Huamanga" },
        { "@type": "Country", name: "Perú" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cuánto cuesta crear una página web o tienda virtual en Ayacucho con Qatu Web?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El Plan Mensual cuesta S/ 30 al mes (equivalente a S/ 1 al día) con S/ 90 de activación inicial técnica. El Plan Anual Recomendado cuesta S/ 300 al año e incluye la instalación y la carga inicial de los primeros 25 productos 100% GRATIS (ahorras S/ 150 en tu primer año).",
          },
        },
        {
          "@type": "Question",
          name: "¿Qatu Web cobra comisión por cada venta que hace mi negocio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Qatu Web cobra 0% de comisión por venta. El comerciante recibe el 100% de su dinero directamente en su cuenta de Yape, Plin o en efectivo contraentrega sin intermediarios.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo llegan los pedidos de los clientes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El cliente final explora el catálogo móvil táctil (<120 KB), selecciona variantes como tallas, colores o porciones y presiona un botón que envía una comanda estructurada directamente al WhatsApp del negocio (+51 941 663 265).",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué es el Panel de Bolsillo móvil (/admin)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Es una interfaz ultraligera optimizada para celular que permite al dueño del negocio apagar productos agotados o actualizar precios en un solo toque bajo la luz del sol en las calles de Ayacucho.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo se activan las tiendas y a qué número se paga?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El pago se realiza por Yape o Plin al número oficial 941 663 265 (Titular: Luis Gerardo Llocclla Sauñe) y se sube el comprobante desde el portal de autogestión (/dashboard/cliente). La activación se realiza en 1 toque en 24 a 48 horas.",
          },
        },
      ],
    },
  ],
};

export function serializeStructuredData(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
