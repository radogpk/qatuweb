import Link from "next/link";
import { initialPricingPlans } from "@/lib/seed/initialBusinesses";
import { getWhatsAppUrl } from "@/lib/config/site";
import { Check, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export function PricingPreview() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Precios Claros y Transparentes</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Planes diseñados para comercios peruanos
          </h2>
          <p className="text-base text-slate-600">
            Sin comisiones por venta: un pago único de diseño y configuración inicial + una cuota mensual económica para soporte, hosting y subdominio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {initialPricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative bg-white ${
                plan.popular
                  ? "border-2 border-brand-600 shadow-card-hover lg:-translate-y-2 ring-4 ring-brand-500/10"
                  : "border border-slate-200 shadow-card hover:shadow-card-hover"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-brand-600 text-white text-xs font-bold tracking-wide uppercase shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {plan.badge || "Más Popular"}
                  </span>
                </div>
              )}

              <div>
                {!plan.popular && plan.badge && (
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-4">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 min-h-[40px] mb-6">
                  {plan.tagline}
                </p>

                {/* Precios: Setup y Mensualidad */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-500 font-medium">Setup inicial (único):</span>
                    <span className="text-lg font-heading font-extrabold text-slate-900">
                      S/ {plan.setupPrice}
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
