import { MessageSquareText, Smartphone, ArrowRight, ShieldCheck, Check } from "lucide-react";
import Link from "next/link";

export function StepsSection() {
  const steps = [
    {
      number: "01",
      title: "Nos pasas tu carta o productos",
      desc: "Solo envíanos por WhatsApp lo que ya tienes: fotos tomadas con tu celular, tu lista de precios o carta, y tus números de Yape o Plin. Nosotros nos encargamos del diseño y la carga.",
      detail: "Cero requisitos técnicos o códigos",
    },
    {
      number: "02",
      title: "Tus clientes entran y eligen fácil",
      desc: "Compartes tu enlace tunegocio.qatu.pe en tu Instagram, TikTok, estados o tarjeta física. Tus clientes ven tus fotos en alta calidad y arman su pedido en segundos desde cualquier celular.",
      detail: "Carga ultrarrápida sin instalar apps",
    },
    {
      number: "03",
      title: "Recibes el pedido directo a WhatsApp",
      desc: "El cliente presiona pedir y a ti te llega el mensaje ordenado con la lista de productos, el total a cobrar y la dirección de entrega. Cobras directo y sin comisiones por venta.",
      detail: "0% comisión — el 100% de la venta es tuyo",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
            <span>Experiencia Sin Complicaciones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Diseñado para que tú solo te preocupes de atender y vender.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Eliminamos todo el dolor de cabeza de comprar dominios, contratar programadores costosos o pagar comisiones del 18% a aplicaciones de terceros.
          </p>
        </div>

        {/* 3 Step Editorial Progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-bold text-slate-300 group-hover:text-brand-600 transition-colors">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Paso {idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-extrabold text-slate-900 leading-snug">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>{step.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting Banner Link */}
        <div className="mt-12 text-center">
          <Link
            href="/para-tu-negocio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            <span>Conoce los requisitos detallados y preguntas frecuentes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
