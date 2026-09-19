import Link from "next/link";
import { initialPricingPlans } from "@/lib/seed/initialBusinesses";
import { getWhatsAppUrl } from "@/lib/config/site";
import { Check, ArrowRight } from "lucide-react";

export function PricingPreview() {
  return (
    <section className="py-20 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1.5">
            Tarifas transparentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Un plan pensado para tu negocio
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Sin comisiones por venta: un pago único de diseño inicial y una cuota mensual accesible para que tu web nunca se caiga y tenga soporte permanente.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {initialPricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 relative bg-white ${
                plan.popular
                  ? "border-2 border-brand-600 shadow-xl lg:-translate-y-2 ring-4 ring-brand-500/10"
                  : "border border-slate-200/90 shadow-sm hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 py-1 rounded-full bg-brand-600 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                    Recomendado
                  </span>
                </div>
              )}

              <div>
                {!plan.popular && plan.badge && (
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-4">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-1.5">
                  {plan.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 min-h-[42px] mb-6 leading-relaxed">
                  {plan.tagline}
                </p>

                {/* Precios: Setup y Mensualidad */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-6 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-500 font-medium">Setup inicial:</span>
                    <span className="text-lg font-heading font-extrabold text-slate-900">
                      S/ {plan.setupPrice}{" "}
                      <span className="text-[11px] font-normal text-slate-400">(pago único)</span>
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-slate-200 pt-2.5">
                    <span className="text-xs text-slate-500 font-medium">Mantenimiento:</span>
                    <span className="text-2xl font-heading font-black text-brand-600">
                      S/ {plan.monthlyPrice}
                      <span className="text-xs font-normal text-slate-500 font-sans"> / mes</span>
                    </span>
                  </div>
                </div>

                {/* Lista de características */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    ¿Qué incluye?
                  </span>
                  {plan.features.slice(0, 5).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón de acción */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={getWhatsAppUrl(`¡Hola Qatu! Quiero contratar el plan ${plan.name} para mi negocio.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 px-4 rounded-xl text-center font-semibold text-sm transition-all block active:scale-95 ${
                    plan.popular
                      ? "bg-brand-600 hover:bg-brand-700 text-white shadow-card hover:shadow-card-hover"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {plan.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Link to full comparison */}
        <div className="mt-12 text-center">
          <Link
            href="/planes"
            prefetch={true}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            <span>Ver tabla comparativa detallada de todos los planes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
