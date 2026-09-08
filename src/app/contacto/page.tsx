import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { DirectWhatsAppCard } from "@/components/contact/DirectWhatsAppCard";

export const metadata: Metadata = {
  title: "Contacto — Hablemos sobre tu Web",
  description:
    "Comunícate con el equipo de Qatu por WhatsApp o mediante nuestro formulario. Te asesoramos para crear la página web y subdominio de tu negocio.",
};

export default function ContactoPage() {
  return (
    <div className="py-12 sm:py-16 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
            Canales de Atención
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2838] tracking-tight">
            Contáctanos y estrena tu web
          </h1>
          <p className="text-sm sm:text-base text-[#4B586E] leading-relaxed">
            Estamos listos para resolver tus dudas, mostrarte ejemplos para tu rubro o iniciar la configuración de tu subdominio de inmediato.
          </p>
        </div>

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
