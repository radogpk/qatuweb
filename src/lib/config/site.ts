export const siteConfig = {
  name: "Qatu.pe",
  tagline: "Tu puesto en el mercado digital del Perú",
  description: "Plataforma web que impulsa a negocios peruanos con su propio subdominio, catálogo digital y presencia web profesional sin complicaciones técnicas.",
  url: "https://qatu.pe",
  ogImage: "https://qatu.pe/og-qatu.jpg",
  whatsappNumber: "51966123456", // Número oficial WhatsApp Business de Qatu
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
  const defaultMsg = "¡Hola Qatu! Quiero información sobre cómo obtener mi propia página web y subdominio para mi negocio.";
  const encodedMsg = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMsg}`;
}
