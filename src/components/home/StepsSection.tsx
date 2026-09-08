import { MessageSquareText, Palette, Globe, TrendingUp } from "lucide-react";

export function StepsSection() {
  const steps = [
    {
      number: "01",
      title: "Nos cuentas de tu negocio",
      description: "Nos envías tus fotos, logo, lista de productos/carta y tus datos de contacto por WhatsApp. Nosotros nos encargamos de organizarlo todo.",
      icon: MessageSquareText,
      tag: "Cero fricción",
    },
    {
      number: "02",
      title: "Diseñamos tu web a medida",
      description: "Creamos tu página optimizada para celulares con los colores de tu marca, catálogo ordenado y botón directo para recibir pedidos a tu WhatsApp.",
      icon: Palette,
      tag: "Diseño profesional",
    },
    {
      number: "03",
      title: "Publicamos en tu subdominio",
      description: "Tu web queda activa en tunegocio.qatu.pe con certificado de seguridad SSL, hosting ultrarrápido y presencia en el directorio general.",
      icon: Globe,
      tag: "Entrega express",
    },
    {
      number: "04",
      title: "Tú vendes, nosotros mantenemos",
      description: "Recibes clientes sin pagar comisiones por venta. Nosotros nos encargamos del hosting, copias de seguridad y actualización mensual de precios.",
      icon: TrendingUp,
      tag: "Tranquilidad total",
    },
  ];

  return (
    <section className="py-20 bg-[#FDFBF7] border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2.5">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
            Proceso sin complicaciones
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2838]">
            ¿Cómo funciona tener tu web en Qatu?
          </h2>
          <p className="text-sm sm:text-base text-[#4B586E]">
            En 4 sencillos pasos llevamos tu negocio local al mundo digital, sin que tengas que aprender código ni lidiar con servidores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-6 border border-[#EAE6DF] shadow-subtle hover:shadow-card transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#FDF2F0] text-[#B23A2E] flex items-center justify-center font-serif font-bold text-base">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-[#C59218]/40">
                      {step.number}
                    </span>
                  </div>

                  <span className="inline-block px-2 py-0.5 rounded-md bg-[#F4F1EA] text-[#C59218] text-[11px] font-semibold mb-2">
                    {step.tag}
                  </span>

                  <h3 className="text-base font-serif font-bold text-[#1E2838] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4B586E] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
