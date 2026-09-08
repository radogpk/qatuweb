import { Metadata } from "next";
import Link from "next/link";
import { initialPricingPlans } from "@/lib/seed/initialBusinesses";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { getWhatsAppUrl } from "@/lib/config/site";
import { Check, Sparkles, HelpCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Planes y Precios — Presencia Web para tu Negocio",
  description:
    "Conoce las tarifas transparentes de Qatu: Web Informativa, Comercio Básico y Comercio con Reservas. Setup único + renta mensual accesible sin comisiones.",
};

export default function PlanesPage() {
  return (
    <div className="py-12 sm:py-16 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
            Tarifas Claras para Negocios Peruanos
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2838] tracking-tight">
            Planes y Precios de Qatu
          </h1>
          <p className="text-sm sm:text-base text-[#4B586E] leading-relaxed">
            Sin letras pequeñas: un costo inicial de configuración y diseño profesional (Setup) y una cuota mensual fija para que tu web nunca se caiga, tenga soporte permanente y se mantenga actualizada.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {initialPricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-8 border flex flex-col justify-between relative shadow-card ${
                plan.popular ? "border-2 border-[#B23A2E] shadow-card-hover" : "border-[#EAE6DF]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 py-1 rounded-md bg-[#B23A2E] text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#C59218]" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {!plan.popular && plan.badge && (
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#F4F1EA] text-[#C59218] text-xs font-semibold">
                    {plan.badge}
                  </span>
                )}

                <h2 className="text-2xl font-serif font-bold text-[#1E2838]">
                  {plan.name}
                </h2>
                <p className="text-xs text-[#4B586E] min-h-[36px]">
                  {plan.description}
                </p>

                {/* Box de Precios */}
                <div className="p-5 rounded-xl bg-[#FAF9F6] border border-[#EAE6DF] space-y-3">
                  <div>
                    <span className="text-xs text-[#4B586E] block">Setup inicial (diseño y puesta en marcha):</span>
                    <span className="text-2xl font-serif font-bold text-[#1E2838]">
                      S/ {plan.setupPrice}{" "}
                      <span className="text-xs font-sans text-[#4B586E] font-normal">(pago único)</span>
                    </span>
                  </div>
                  <div className="border-t border-[#EAE6DF] pt-2">
                    <span className="text-xs text-[#4B586E] block">Renta mensual (hosting, soporte, subdominio):</span>
                    <span className="text-3xl font-serif font-bold text-[#B23A2E]">
                      S/ {plan.monthlyPrice}
                      <span className="text-xs font-sans text-[#4B586E] font-normal"> / mes</span>
                    </span>
                  </div>
                  <div className="text-[11px] text-[#C59218] font-semibold pt-1">
                    Entrega estimada: {plan.deliveryDays}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1E2838]/70 block">
                    Todo lo que incluye:
                  </span>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#4B586E]">
                      <div className="w-4 h-4 rounded-full bg-[#FCF8EC] text-[#C59218] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EAE6DF]">
                <a
                  href={getWhatsAppUrl(`Hola Qatu, quiero contratar el plan ${plan.name} para mi negocio.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-4 rounded-xl text-center font-semibold text-xs sm:text-sm transition-all block ${
                    plan.popular
                      ? "bg-[#B23A2E] hover:bg-[#962E24] text-white shadow-xs"
                      : "bg-[#1E2838] hover:bg-[#121A24] text-white"
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
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E2838]">
              Comparativa Detallada de Características
            </h2>
            <p className="text-xs sm:text-sm text-[#4B586E]">
              Revisa minuciosamente qué incluye cada nivel antes de elegir.
            </p>
          </div>

          <ComparisonTable />
        </div>

        {/* Footer Question */}
        <div className="bg-white rounded-2xl p-8 border border-[#EAE6DF] shadow-card text-center space-y-4 max-w-3xl mx-auto">
          <HelpCircle className="w-8 h-8 text-[#C59218] mx-auto" />
          <h3 className="text-xl font-serif font-bold text-[#1E2838]">
            ¿Tienes dudas sobre qué plan te conviene más?
          </h3>
          <p className="text-xs sm:text-sm text-[#4B586E] max-w-lg mx-auto">
            Te asesoramos gratis revisando tu negocio, tus productos y tu forma de vender actual para recomendarte la opción más rentable.
          </p>
          <div className="pt-2">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E2838] hover:bg-[#121A24] text-white text-xs sm:text-sm font-semibold transition-colors"
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
