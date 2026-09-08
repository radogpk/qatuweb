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
    <div className="py-12 sm:py-16 bg-[#F5EFE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
            Tarifas Claras para Negocios Peruanos
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2B3A55] tracking-tight">
            Planes y Precios de Qatu
          </h1>
          <p className="text-sm sm:text-base text-[#4A5B78] leading-relaxed">
            Sin letras pequeñas: un costo inicial de configuración y diseño profesional (Setup) y una cuota mensual fija para que tu web nunca se caiga, tenga soporte permanente y se mantenga actualizada.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {initialPricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-8 border flex flex-col justify-between relative shadow-warm ${
                plan.popular ? "border-2 border-[#B23A2E] shadow-warm-lg" : "border-[#E8DEC8]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-[#B23A2E] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {!plan.popular && plan.badge && (
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FCF6E5] text-[#D4A017] text-xs font-semibold">
                    {plan.badge}
                  </span>
                )}

                <h2 className="text-2xl font-serif font-bold text-[#2B3A55]">
                  {plan.name}
                </h2>
                <p className="text-xs text-[#4A5B78] min-h-[36px]">
                  {plan.description}
                </p>

                {/* Box de Precios */}
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-3">
                  <div>
                    <span className="text-xs text-[#4A5B78] block">Setup inicial (diseño y puesta en marcha):</span>
                    <span className="text-2xl font-serif font-bold text-[#2B3A55]">
                      S/ {plan.setupPrice}{" "}
                      <span className="text-xs font-sans text-[#4A5B78] font-normal">(pago único)</span>
                    </span>
                  </div>
                  <div className="border-t border-[#E8DEC8] pt-2">
                    <span className="text-xs text-[#4A5B78] block">Renta mensual (hosting, soporte, subdominio):</span>
                    <span className="text-3xl font-serif font-bold text-[#B23A2E]">
                      S/ {plan.monthlyPrice}
                      <span className="text-xs font-sans text-[#4A5B78] font-normal"> / mes</span>
                    </span>
                  </div>
                  <div className="text-[11px] text-[#D4A017] font-semibold pt-1">
                    Entrega estimada: {plan.deliveryDays}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2B3A55]/70 block">
                    Todo lo que incluye:
                  </span>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#4A5B78]">
                      <div className="w-4 h-4 rounded-full bg-[#FCF6E5] text-[#D4A017] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8DEC8]">
                <a
                  href={getWhatsAppUrl(`Hola Qatu, quiero contratar el plan ${plan.name} para mi negocio.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 px-4 rounded-full text-center font-semibold text-xs sm:text-sm transition-all block ${
                    plan.popular
                      ? "bg-[#B23A2E] hover:bg-[#962E24] text-white shadow-xs"
                      : "bg-[#2B3A55] hover:bg-[#1A2436] text-white"
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
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B3A55]">
              Comparativa Detallada de Características
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5B78]">
              Revisa minuciosamente qué incluye cada nivel antes de elegir.
            </p>
          </div>

          <ComparisonTable />
        </div>

        {/* Footer Question */}
        <div className="bg-white rounded-3xl p-8 border border-[#E8DEC8] shadow-warm text-center space-y-4 max-w-3xl mx-auto">
          <HelpCircle className="w-8 h-8 text-[#D4A017] mx-auto" />
          <h3 className="text-xl font-serif font-bold text-[#2B3A55]">
            ¿Tienes dudas sobre qué plan te conviene más?
          </h3>
          <p className="text-xs sm:text-sm text-[#4A5B78] max-w-lg mx-auto">
            Te asesoramos gratis revisando tu negocio, tus productos y tu forma de vender actual para recomendarte la opción más rentable.
          </p>
          <div className="pt-2">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2B3A55] hover:bg-[#1A2436] text-white text-xs sm:text-sm font-semibold transition-colors"
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
