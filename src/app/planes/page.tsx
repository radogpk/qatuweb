import { Metadata } from "next";
import Link from "next/link";
import { initialPricingPlans } from "@/lib/seed/initialBusinesses";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { getWhatsAppUrl } from "@/lib/config/site";
import { Check, Sparkles, HelpCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Planes y Precios — Presencia Web para tu Negocio",
  description:
    "Conoce las tarifas transparentes de Qatu: Web Informativa, Comercio Básico y Comercio con Reservas. Setup único + mantenimiento mensual accesible sin comisiones.",
};

export default function PlanesPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tarifas Transparentes para Negocios Peruanos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Planes y Precios de Qatu
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Sin letras pequeñas: un pago único de configuración y diseño inicial (Setup) y una cuota mensual económica para que tu web nunca se caiga, tenga soporte permanente y se mantenga actualizada.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {initialPricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-8 border flex flex-col justify-between relative shadow-card transition-all ${
                plan.popular 
                  ? "border-2 border-brand-600 shadow-card-hover lg:-translate-y-2 ring-4 ring-brand-500/10" 
                  : "border-slate-200 hover:shadow-card-hover"
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

              <div className="space-y-4">
                {!plan.popular && plan.badge && (
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    {plan.badge}
                  </span>
                )}

                <h2 className="text-2xl font-heading font-extrabold text-slate-900">
                  {plan.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 min-h-[36px]">
                  {plan.description}
                </p>

                {/* Box de Precios */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Setup inicial (diseño y puesta en marcha):</span>
                    <span className="text-2xl font-heading font-extrabold text-slate-900">
                      S/ {plan.setupPrice}{" "}
                      <span className="text-xs font-sans text-slate-500 font-normal">(pago único)</span>
                    </span>
                  </div>
                  <div className="border-t border-slate-200 pt-2.5">
                    <span className="text-xs text-slate-500 block font-medium">Mantenimiento mensual:</span>
                    <span className="text-3xl font-heading font-black text-brand-600">
                      S/ {plan.monthlyPrice}
                      <span className="text-xs font-sans text-slate-500 font-normal"> / mes</span>
                    </span>
                  </div>
                  <div className="text-xs text-emerald-700 font-semibold pt-1">
                    ⚡ Entrega estimada: {plan.deliveryDays}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Todo lo que incluye:
                  </span>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <a
                  href={getWhatsAppUrl(`Hola Qatu, quiero contratar el plan ${plan.name} para mi negocio.`)}
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

        {/* Detailed Comparison Table Section */}
        <div className="space-y-6 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Comparativa Detallada de Características
            </h2>
            <p className="text-sm text-slate-600">
              Revisa minuciosamente qué incluye cada nivel antes de elegir.
            </p>
          </div>

          <ComparisonTable />
        </div>

        {/* Footer Question */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-card text-center space-y-4 max-w-3xl mx-auto">
          <HelpCircle className="w-8 h-8 text-brand-600 mx-auto" />
          <h3 className="text-xl font-heading font-extrabold text-slate-900">
            ¿Tienes dudas sobre qué plan te conviene más?
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Te asesoramos gratis evaluando tu rubro, productos y público objetivo para recomendarte la alternativa más rentable.
          </p>
          <div className="pt-2">
            <Link
              href="/contacto"
              prefetch={true}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-card transition-all"
            >
              <span>Hablar con un asesor de Qatu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
