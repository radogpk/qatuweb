import Link from "next/link";
import { initialPricingPlans } from "@/lib/seed/initialBusinesses";
import { getWhatsAppUrl } from "@/lib/config/site";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export function PricingPreview() {
  return (
    <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
            Precios Claros y Transparentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B3A55]">
            Un plan a la medida de tu rubro
          </h2>
          <p className="text-sm sm:text-base text-[#4A5B78]">
            Sin costos ocultos: un pago único de diseño y configuración (setup) + una cuota mensual económica para hosting, subdominio y mantenimiento continuo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {initialPricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? "bg-white border-2 border-[#B23A2E] shadow-warm-lg scale-100 lg:-translate-y-2"
                  : "bg-white/80 border border-[#E8DEC8] shadow-warm hover:shadow-warm-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-[#B23A2E] text-white text-xs font-semibold tracking-wide uppercase shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D4A017]" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {!plan.popular && plan.badge && (
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FCF6E5] text-[#D4A017] text-xs font-semibold mb-4">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-2xl font-serif font-bold text-[#2B3A55] mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-[#4A5B78] min-h-[36px] mb-6">
                  {plan.tagline}
                </p>

                {/* Precios: Setup y Mensualidad */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] mb-6 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-[#4A5B78] font-medium">Setup inicial (único):</span>
                    <span className="text-xl font-serif font-bold text-[#2B3A55]">
                      S/ {plan.setupPrice}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-[#E8DEC8] pt-2">
                    <span className="text-xs text-[#4A5B78] font-medium">Mantenimiento mensual:</span>
                    <span className="text-2xl font-serif font-bold text-[#B23A2E]">
                      S/ {plan.monthlyPrice}
                      <span className="text-xs font-sans text-[#4A5B78] font-normal"> / mes</span>
                    </span>
                  </div>
                </div>

                {/* Características destacadas */}
                <div className="space-y-2.5 mb-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2B3A55]/70 block mb-2">
                    Incluye:
                  </span>
                  {plan.features.slice(0, 5).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#4A5B78]">
                      <div className="w-4 h-4 rounded-full bg-[#FCF6E5] text-[#D4A017] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón de acción */}
              <div className="pt-4 border-t border-[#E8DEC8]">
                <a
                  href={getWhatsAppUrl(`Hola Qatu, me interesa contratar el plan ${plan.name} para mi negocio.`)}
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

        {/* Link to full comparison */}
        <div className="mt-12 text-center">
          <Link
            href="/planes"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B23A2E] hover:underline"
          >
            <span>Ver tabla comparativa detallada de todos los planes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
