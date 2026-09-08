import { Metadata } from "next";
import { ProcessTimeline } from "@/components/onboarding/ProcessTimeline";
import { AccordionFaq } from "@/components/onboarding/AccordionFaq";
import { getWhatsAppUrl } from "@/lib/config/site";
import { CheckCircle2, ArrowRight, ShieldCheck, Camera, FileText, Smartphone, Sparkles } from "lucide-react";

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
      desc: "No necesitas una sesión profesional. Fotos claras tomadas con tu celular de tus mejores productos, platos o ambientes son suficientes para empezar.",
    },
    {
      icon: FileText,
      title: "Tu lista de precios o carta",
      desc: "Una foto de tu carta actual, una lista en Word, notas o simplemente un audio explicándonos qué vendes y a qué precios.",
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
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Onboarding Sin Fricción</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Tener tu web nunca fue tan fácil
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Sabemos que tu tiempo está en atender tu negocio, preparar pedidos y cuidar a tus clientes. Por eso en Qatu nos encargamos de todo el trabajo técnico de principio a fin.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Paso a paso
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              El proceso desde el primer contacto hasta el lanzamiento
            </h2>
          </div>
          <ProcessTimeline />
        </div>

        {/* Requirements Section */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-card space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
              ¿Qué necesitas tener listo?
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Solo 4 cosas básicas para empezar
            </h2>
            <p className="text-sm text-slate-600">
              No te preocupes si sientes que te falta algo; nuestro equipo te ayuda a ordenarlo todo en la llamada o chat inicial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.map((req, i) => {
              const Icon = req.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-white text-brand-600 border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-base text-slate-900">
                      {req.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
              Respuestas Claras
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Preguntas Frecuentes de Dueños de Negocio
            </h2>
            <p className="text-sm text-slate-600">
              Todo lo que necesitas saber sobre pagos, propiedad de tus datos y cambios futuros.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AccordionFaq />
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 max-w-4xl mx-auto border border-slate-800">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Sin contratos forzosos ni comisiones por venta</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-white max-w-2xl mx-auto leading-tight">
            ¿Comenzamos a preparar la web de tu negocio hoy mismo?
          </h3>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Escríbenos directamente a WhatsApp. En 10 minutos te explicamos cómo quedaría tu web y te mostramos un ejemplo real de tu rubro.
          </p>

          <div className="pt-2">
            <a
              href={getWhatsAppUrl("Hola Qatu, deseo iniciar el proceso para tener la página web de mi negocio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm sm:text-base font-semibold shadow-card hover:shadow-card-hover transition-all active:scale-95"
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
