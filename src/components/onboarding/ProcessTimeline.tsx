import { MessageSquare, UploadCloud, MonitorCheck, Rocket, RefreshCw } from "lucide-react";

export function ProcessTimeline() {
  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Contacto y selección de tu plan",
      desc: "Nos escribes por WhatsApp o completas el formulario. Conversamos sobre tu rubro, tu público y definimos qué plan se ajusta mejor a tus necesidades.",
      time: "Día 1",
    },
    {
      number: "02",
      icon: UploadCloud,
      title: "Nos envías tus materiales por WhatsApp",
      desc: "Solo necesitas enviarnos lo que ya tienes: fotos de tu local o productos tomadas con tu celular, tu logotipo si lo tienes, lista de precios o carta, y tus números de cobro.",
      time: "Día 1 - 2",
    },
    {
      number: "03",
      icon: MonitorCheck,
      title: "Nosotros diseñamos y configuramos todo",
      desc: "Estructuramos tu catálogo digital, optimizamos las imágenes para que carguen al instante en celulares y programamos los botones directos de compra.",
      time: "Día 3 - 5",
    },
    {
      number: "04",
      icon: Rocket,
      title: "Revisión final y lanzamiento oficial",
      desc: "Te mostramos la web antes de salir al aire. Si necesitas afinar algún detalle lo corregimos y la publicamos oficialmente en tu subdominio tunegocio.qatu.pe.",
      time: "Lanzamiento",
    },
    {
      number: "05",
      icon: RefreshCw,
      title: "Acompañamiento y soporte mensual",
      desc: "Tu web queda vigilada 24/7 con SSL y hosting cloud. Cada mes puedes solicitarnos actualización de precios o productos con solo mandarnos un mensaje.",
      time: "Continuo",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4 relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {step.time}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs font-mono font-bold text-brand-600">
                Paso {step.number}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
