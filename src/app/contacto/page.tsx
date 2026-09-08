import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { DirectWhatsAppCard } from "@/components/contact/DirectWhatsAppCard";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto — Hablemos sobre tu Web",
  description:
    "Comunícate con el equipo de Qatu por WhatsApp o mediante nuestro formulario. Te asesoramos para crear la página web y subdominio de tu negocio.",
};

export default function ContactoPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Canales de Atención Directa</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Contáctanos y estrena tu web
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
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
