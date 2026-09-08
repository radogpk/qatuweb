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
      desc: "Solo necesitas enviarnos lo que ya tienes: fotos de tu local o productos tomadas con tu celular, tu logotipo si lo tienes, lista de precios o carta, y tus números de contacto.",
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
      title: "Revisión final y publicación oficial",
      desc: "Te mostramos la web antes de salir al aire. Si necesitas afinar algún detalle lo corregimos y la publicamos oficialmente en tu subdominio tunegocio.qatu.pe.",
      time: "Lanzamiento",
    },
    {
      number: "05",
      icon: RefreshCw,
      title: "Acompañamiento y mantenimiento mensual",
      desc: "Tu web queda vigilada 24/7. Cada mes puedes solicitarnos actualización de precios o productos nuevos con solo mandarnos un mensaje.",
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
              className="bg-white rounded-xl p-5 sm:p-6 border border-[#EAE6DF] shadow-subtle hover:shadow-card transition-all flex flex-col justify-between space-y-4 relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#FDF2F0] text-[#B23A2E] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F4F1EA] text-[#C59218]">
                    {step.time}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-sm sm:text-base text-[#1E2838]">
                  {step.title}
                </h3>

                <p className="text-xs text-[#4B586E] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-[#EAE6DF] text-[11px] font-mono text-[#4B586E]">
                Paso {step.number}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
