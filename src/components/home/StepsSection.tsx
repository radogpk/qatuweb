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
    <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
            Proceso sin complicaciones
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B3A55]">
            ¿Cómo funciona tener tu web en Qatu?
          </h2>
          <p className="text-sm sm:text-base text-[#4A5B78]">
            En 4 sencillos pasos llevamos tu negocio local al mundo digital, sin que tengas que aprender código ni lidiar con servidores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-warm hover:shadow-warm-lg transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FDF0EE] text-[#B23A2E] flex items-center justify-center font-serif font-bold text-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-[#D4A017]/60">
                      {step.number}
                    </span>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FCF6E5] text-[#D4A017] text-[11px] font-semibold mb-2">
                    {step.tag}
                  </span>

                  <h3 className="text-lg font-serif font-bold text-[#2B3A55] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4A5B78] leading-relaxed">
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
