import { Globe, MessageCircle, QrCode, Search, ShieldCheck, Headphones, Check } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Globe,
      title: "Subdominio propio y seguro",
      desc: "Tu negocio vive en tunegocio.qatu.pe con hosting de alta velocidad y certificado SSL incluido para transmitir máxima confianza.",
    },
    {
      icon: MessageCircle,
      title: "Pedidos ordenados a WhatsApp",
      desc: "Tus clientes eligen los productos en tu catálogo y a ti te llega el mensaje detallado con los ítems, precios y dirección lista.",
    },
    {
      icon: QrCode,
      title: "Cobros con Yape, Plin y Efectivo",
      desc: "Integramos tus códigos QR y números de cuenta para que cobres al instante. El 100% de cada venta va directo a tu bolsillo.",
    },
    {
      icon: Search,
      title: "Posicionamiento local en Google",
      desc: "Estructuramos tu web con Schema.org y buenas prácticas para que clientes que busquen tus productos en tu ciudad te encuentren fácil.",
    },
    {
      icon: ShieldCheck,
      title: "Cero comisiones por venta",
      desc: "A diferencia de las aplicaciones extranjeras que cobran hasta 18% por pedido, en Qatu pagas una cuota fija y vendes sin límites.",
    },
    {
      icon: Headphones,
      title: "Soporte y cambios cada mes",
      desc: "Nosotros nos encargamos de actualizar tus precios, menú o fotos de temporada cada mes con solo enviarnos un WhatsApp.",
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1.5">
            Ventajas claras
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Todo lo que incluye tu página web en Qatu
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Una solución completa pensada para el día a día de un negocio real: rápida, fácil para tus clientes y sin costos sorpresa.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/60 hover:bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white text-brand-600 border border-slate-200 shadow-2xs flex items-center justify-center group-hover:scale-105 group-hover:bg-brand-600 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-900 leading-snug">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Incluido en todos los planes</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
