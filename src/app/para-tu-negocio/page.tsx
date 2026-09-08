import { Metadata } from "next";
import { ProcessTimeline } from "@/components/onboarding/ProcessTimeline";
import { AccordionFaq } from "@/components/onboarding/AccordionFaq";
import { getWhatsAppUrl } from "@/lib/config/site";
import { CheckCircle2, ArrowRight, ShieldCheck, Camera, FileText, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Para tu Negocio — Cómo Funciona y Preguntas Frecuentes",
  description:
    "Descubre lo fácil que es tener tu página web en Qatu: sin requisitos técnicos, con entrega en pocos días y soporte continuo para tu negocio.",
};

export default function ParaTuNegocioPage() {
  const requirements = [
    {
      icon: Camera,
      title: "Fotos de tu local o productos",
      desc: "No necesitas una sesión profesional. Fotos claras tomadas con tu propio celular de tus mejores productos, platos o ambientes son suficientes para empezar.",
    },
    {
      icon: FileText,
      title: "Tu lista de precios o carta",
      desc: "Una foto de tu carta actual, una lista en Word, bloc de notas o simplemente un audio explicándonos qué vendes y a qué precios.",
    },
    {
      icon: Smartphone,
      title: "Número de WhatsApp para pedidos",
      desc: "El número donde tú o tu equipo atienden a los clientes. Ahí llegarán todos los mensajes ordenados con los pedidos que hagan en tu web.",
    },
    {
      icon: ShieldCheck,
      title: "Tu logotipo (opcional)",
      desc: "Si ya tienes logo, nos lo envías en imagen o PDF. Si aún no tienes, diseñamos un identificador tipográfico limpio y profesional para tu web.",
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
            Onboarding sin fricción
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2838] tracking-tight">
            Tener tu web nunca fue tan fácil
          </h1>
          <p className="text-sm sm:text-base text-[#4B586E] leading-relaxed">
            Sabemos que tu tiempo está en atender tu negocio, preparar pedidos y cuidar a tus clientes. Por eso en Qatu nos encargamos de todo el trabajo técnico de principio a fin.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C59218]">
              Paso a paso
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E2838]">
              El proceso desde el primer contacto hasta el lanzamiento
            </h2>
          </div>
          <ProcessTimeline />
        </div>

        {/* Requirements Section */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#EAE6DF] shadow-card space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
              ¿Qué necesitas tener listo?
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E2838]">
              Solo 4 cosas básicas para empezar
            </h2>
            <p className="text-sm text-[#4B586E]">
              No te preocupes si sientes que te falta algo; nuestro equipo te ayuda a ordenarlo todo en la llamada o chat inicial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.map((req, i) => {
              const Icon = req.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF] flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-white text-[#C59218] border border-[#EAE6DF] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-base text-[#1E2838]">
                      {req.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B586E] leading-relaxed">
                      {req.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
              Respuestas Claras
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E2838]">
              Preguntas Frecuentes de Dueños de Negocio
            </h2>
            <p className="text-xs sm:text-sm text-[#4B586E]">
              Todo lo que necesitas saber sobre pagos, propiedad de tus datos y cambios futuros.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AccordionFaq />
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-[#1E2838] text-white rounded-2xl p-8 sm:p-12 shadow-card text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[#C59218] text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#C59218]" />
            <span>Sin contratos forzosos ni comisiones</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white max-w-2xl mx-auto leading-tight">
            ¿Comenzamos a preparar la web de tu negocio hoy mismo?
          </h3>

          <p className="text-sm sm:text-base text-[#FAF9F6]/80 max-w-xl mx-auto">
            Escríbenos directamente a WhatsApp. En 10 minutos te explicamos cómo quedaría tu web y te mostramos un ejemplo real de tu rubro.
          </p>

          <div className="pt-2">
            <a
              href={getWhatsAppUrl("Hola Qatu, deseo iniciar el proceso para tener la página web de mi negocio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#B23A2E] hover:bg-[#962E24] text-white text-sm sm:text-base font-semibold shadow-sm transition-all active:scale-98"
            >
              <span>Hablar por WhatsApp con el equipo</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
