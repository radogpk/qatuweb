export const siteConfig = {
  name: "Qatu.pe",
  tagline: "Tu marca en una web. Tus pedidos en WhatsApp.",
  description: "Creamos la web y el catálogo de tu negocio con pedidos directos a WhatsApp. Diseño acompañado, precios claros y sin comisión de Qatu por venta.",
  url: "https://qatu.pe",
  ogImage: "https://qatu.pe/og-qatu.jpg",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "51941663265", // Número oficial WhatsApp Business de Qatu
  yapeNumber: process.env.NEXT_PUBLIC_YAPE_PHONE || "941 663 265",
  yapeTitular: "Luis Gerardo Llocclla Sauñe (Qatu Web)",
  email: "hola@qatu.pe",
  location: "Ayacucho, Perú",
  social: {
    instagram: "https://instagram.com/qatu.pe",
    facebook: "https://facebook.com/qatu.pe",
    tiktok: "https://tiktok.com/@qatu.pe",
  },
  navLinks: [
    { label: "Directorio", href: "/directorio" },
    { label: "Planes", href: "/planes" },
    { label: "Para tu negocio", href: "/para-tu-negocio" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
};

export function getWhatsAppUrl(message?: string): string {
  const defaultMsg = "Hola Qatu, quiero conversar sobre una web con catálogo y pedidos por WhatsApp para mi negocio.";
  const encodedMsg = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMsg}`;
}
