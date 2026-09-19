import { MessageSquareText, Smartphone, ArrowRight, ShieldCheck, Check, ArrowDown, Send, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function StepsSection() {
  const steps = [
    {
      number: "01",
      title: "Nos pasas tus productos o carta",
      desc: "Solo envíanos por WhatsApp lo que ya tienes: fotos con tu celular, precios y tus números de Yape o Plin. Nosotros diseñamos tu página y cargamos tu catálogo.",
      detail: "Cero requisitos técnicos de tu parte",
    },
    {
      number: "02",
      title: "Tus clientes eligen en tu web",
      desc: "Compartes tu enlace tunegocio.qatu.pe en tus redes, estados de WhatsApp o código QR en tu local. Tus clientes ven tus fotos y arman su pedido en segundos.",
      detail: "Carga instantánea en cualquier celular",
    },
    {
      number: "03",
      title: "Recibes el pedido listo a WhatsApp",
      desc: "A tu WhatsApp llega el pedido ordenado con los productos, el monto total y la dirección de entrega. Cobras directo por Yape o efectivo sin intermediarios.",
      detail: "0% comisión — el 100% de la venta es tuyo",
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1.5">
            Del catálogo a tu WhatsApp
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Sin enredos técnicos. Tu tienda lista en 3 pasos.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Diseñado para el comercio real: olvídate de programadores caros o pagar comisiones del 18% a aplicaciones de terceros.
          </p>
        </div>

        {/* 3 Step Editorial Progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-16">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-slate-300 group-hover:text-brand-600 transition-colors">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                    Paso {idx + 1}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>{step.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tangible Visual Demonstration (OlaClick / Tiendanube benchmark) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
              Demostración real de pedidos
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              Así de simple funciona la venta en Qatu
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tus clientes no tienen que descargar apps ni registrarse. Tú recibes los datos organizados en tu WhatsApp habitual.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left: What Customer Sees */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-brand-600" />
                  <span className="text-xs font-mono font-semibold text-slate-800">
                    lasflores.qatu.pe
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500">
                  Vista del cliente
                </span>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-slate-900">
                    Ramo 12 Rosas Rojas
                  </h4>
                  <span className="font-heading font-extrabold text-sm text-brand-600">
                    S/ 45.00
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Rosas naturales premium en papel kraft con lazo satinado y tarjeta.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                    Disponible para entrega hoy
                  </span>
                  <div className="px-3 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-semibold shadow-2xs flex items-center gap-1.5">
                    <span>Pedir por WhatsApp</span>
                    <Send className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: What Merchant Receives in WhatsApp */}
            <div className="bg-[#f0fdf4] rounded-2xl p-5 sm:p-6 border border-emerald-200/80">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-200/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-semibold text-emerald-950">
                    Mensaje entrante en tu WhatsApp Business
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700">
                  Hace 1 min
                </span>
              </div>

              <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-2xs text-xs font-sans text-slate-800 space-y-2">
                <p className="font-bold text-slate-900">
                  ¡Hola Florería Las Flores! 👋
                </p>
                <p className="text-slate-600">
                  Quiero realizar un pedido desde su catálogo web:
                </p>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 font-mono text-[11px] space-y-1">
                  <p>• 1x Ramo 12 Rosas Rojas — S/ 45.00</p>
                  <p>• Envío Huamanga Centro — S/ 5.00</p>
                  <p className="font-bold text-slate-900 pt-1 border-t border-slate-200">
                    Total a pagar: S/ 50.00
                  </p>
                </div>
                <p className="text-[11px] text-slate-600">
                  <strong className="text-slate-800">Método de pago:</strong> Yape<br />
                  <strong className="text-slate-800">Dirección:</strong> Jr. 28 de Julio 184, Huamanga
                </p>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Cero tiempo perdido respondiendo precios uno a uno. Confirmas el pedido, recibes tu pago por Yape y despachas.
            </p>
            <Link
              href="/para-tu-negocio"
              prefetch={true}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline shrink-0"
            >
              <span>Ver guía completa para negocios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
