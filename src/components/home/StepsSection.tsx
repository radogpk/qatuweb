import { MessageSquareText, Palette, Globe, TrendingUp, CheckCircle } from "lucide-react";

export function StepsSection() {
  const steps = [
    {
      number: "01",
      title: "Envías tus fotos y productos",
      description: "Nos pasas por WhatsApp tu logo, fotos de tus productos o carta, tus precios y tu número de cobro (Yape o Plin). Cero trámites complicados.",
      icon: MessageSquareText,
      badge: "Sin trámites",
    },
    {
      number: "02",
      title: "Diseñamos tu tienda a medida",
      description: "Construimos tu web rápida y adaptada 100% a celulares con catálogo visual, botón de compra directa y la identidad de tu marca.",
      icon: Palette,
      badge: "Diseño profesional",
    },
    {
      number: "03",
      title: "Lanzamos en tu subdominio",
      description: "Tu web queda activa en tunegocio.qatu.pe en 3 a 5 días con certificado de seguridad SSL, hosting ultrarrápido y presencia en Google.",
      icon: Globe,
      badge: "Listo en 3 a 5 días",
    },
    {
      number: "04",
      title: "Vendes libre de comisiones",
      description: "Recibes clientes y pedidos directamente a tu WhatsApp. Nosotros cuidamos la seguridad, el hosting y actualizamos tus precios cada mes.",
      icon: TrendingUp,
      badge: "0% comisión",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5 text-brand-600" />
            <span>Proceso Simple y Transparente</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            ¿Cómo tener tu web en Qatu?
          </h2>
          <p className="text-base text-slate-600">
            Llevamos tu negocio local al mundo digital en 4 sencillos pasos. Nosotros nos encargamos de toda la tecnología.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-slate-50/80 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-200 shadow-xs hover:shadow-card-hover transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-heading font-extrabold text-slate-300 group-hover:text-brand-300 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-semibold mb-3">
                    {step.badge}
                  </span>

                  <h3 className="text-base font-heading font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs text-brand-600 font-semibold">
                  <span>Paso {index + 1} de 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
