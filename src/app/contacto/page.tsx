import { PageIntro } from "@/components/shared/PageIntro";
import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { DirectWhatsAppCard } from "@/components/contact/DirectWhatsAppCard";

export const metadata: Metadata = {
  alternates: { canonical: "/contacto" },
  title: "Contacto — Hablemos sobre tu Web",
  description:
    "Comunícate con el equipo de Qatu por WhatsApp o mediante nuestro formulario. Te asesoramos para crear la página web y subdominio de tu negocio.",
};

export default function ContactoPage() {
  return (
    <div className="site-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <PageIntro
          eyebrow="Contacto"
          title="Tu idea merece una buena conversación."
          description="Cuéntanos qué haces y qué necesitas. Te ayudamos a elegir una web que represente a tu negocio."
        />

        {/* Form and WhatsApp Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5">
            <DirectWhatsAppCard />
          </div>
        </div>
      </div>
    </div>
  );
}
