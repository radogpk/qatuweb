export const siteConfig = {
  name: "Qatu Web",
  tagline: "Tu tienda virtual o carta digital por S/ 1 al día. Sin comisiones. Lista en 48 horas.",
  description: "Primer SaaS no tradicional de ingeniería de software para comercios en Ayacucho. Tiendas virtuales, cartas digitales y sistemas de control a medida con pedidos directos a WhatsApp y subdominios en el Edge.",
  url: "https://qatuweb.com",
  ogImage: "https://qatuweb.com/og-qatu.jpg",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "51941663265", // Número oficial WhatsApp Business de Qatu
  yapeNumber: process.env.NEXT_PUBLIC_YAPE_PHONE || "941 663 265",
  yapeTitular: "Luis Gerardo Llocclla Sauñe (Qatu Web)",
  email: "hola@qatuweb.com",
  location: "Ayacucho, Perú",
  social: {
    instagram: "https://instagram.com/qatuweb",
    facebook: "https://facebook.com/qatuweb",
    tiktok: "https://tiktok.com/@qatuweb",
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
  const defaultMsg = "Hola Qatu Web, quiero conversar sobre una tienda virtual con catálogo y pedidos por WhatsApp para mi negocio.";
  const encodedMsg = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMsg}`;
}
