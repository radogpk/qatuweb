import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { InteractivePricingCalculator } from "@/components/pricing/InteractivePricingCalculator";
import { PageIntro, PageInvite } from "@/components/shared/PageIntro";
import {
  OFFICIAL_PRICING_PLANS,
  OFFICIAL_ADDONS,
  LAUNCH_PROMO_CONFIG,
  buildPricingWhatsAppUrl,
} from "@/lib/config/pricing";
import {
  Check,
  X,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Zap,
  Store,
  Utensils,
  Dumbbell,
  MapPin,
  Flame,
  Package,
  ScanLine,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Planes y Tarifas Oficiales | Qatu Web Ayacucho",
  description:
    "Tu propia página web o sistema a medida por S/ 30 al mes o S/ 300 al año. Con catálogo móvil, pedidos directos a WhatsApp y panel de administración en Huamanga, Ayacucho.",
  alternates: { canonical: "/planes" },
};

export default function PlanesPage() {
  const mensualPlan = OFFICIAL_PRICING_PLANS.find((p) => p.id === "mensual")!;
  const anualPlan = OFFICIAL_PRICING_PLANS.find((p) => p.id === "anual")!;

  const spotsLeft = LAUNCH_PROMO_CONFIG.totalSpots - LAUNCH_PROMO_CONFIG.claimedSpots;
  const claimedPercentage = Math.round(
    (LAUNCH_PROMO_CONFIG.claimedSpots / LAUNCH_PROMO_CONFIG.totalSpots) * 100
  );

  return (
    <div className="site-page">
      <div className="interior-shell space-y-12">
        {/* Encabezado con Cintillo de Confianza Local */}
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 text-slate-800 text-xs font-semibold tracking-wide mb-4 shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <strong className="text-slate-900 font-bold">
              Desarrollado en Huamanga, Ayacucho
            </strong>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span className="text-emerald-700 font-bold">
              Tu web activa en 24 a 48 horas
            </span>
          </div>

          <PageIntro
            eyebrow="Tarifas Claras y Sin Letra Pequeña"
            title="Tu web o sistema por S/ 30 al mes o S/ 300 al año."
            description="Sin presupuestos inflados de S/ 2,500 en agencias ni sistemas enlatados que no entienden cómo vendes en provincia. Catálogo móvil ultra-rápido, comanda digital a WhatsApp y panel de administración en tu propio celular."
          />

          {/* Demos en vivo para probar en celular */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-slate-600">
              Prueba las demostraciones en vivo:
            </span>
            <Link
              href="/demo/calzados"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
            >
              <Store className="w-3.5 h-3.5 text-emerald-400" />
              <span>Calzados Lucas</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
            <Link
              href="/demo/pasteleria"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition"
            >
              <Utensils className="w-3.5 h-3.5 text-amber-700" />
              <span>Restaurante Las Flores</span>
              <ExternalLink className="w-3 h-3 text-amber-700" />
            </Link>
            <Link
              href="/demo/gym"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition"
            >
              <Dumbbell className="w-3.5 h-3.5 text-emerald-700" />
              <span>Trankilandia Gym</span>
              <ExternalLink className="w-3 h-3 text-emerald-700" />
            </Link>
          </div>
        </div>

        {/* Banner de Cupos de Lanzamiento */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 border-2 border-amber-500/30 p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-950 border border-amber-500/40">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>{LAUNCH_PROMO_CONFIG.badgeText}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
                🔥 Cupos de Lanzamiento: Los primeros 30 negocios de Ayacucho congelan el precio de S/ 300 al año para siempre ({LAUNCH_PROMO_CONFIG.claimedSpots} de {LAUNCH_PROMO_CONFIG.totalSpots} reservados)
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                {LAUNCH_PROMO_CONFIG.subtext} Sin sorpresas ni cobros ocultos posteriores. Tu inversión anual queda blindada.
              </p>
            </div>

            {/* Contador de urgencia y cupos */}
            <div className="w-full md:w-64 bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/80 shadow-sm shrink-0 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                <span>Cupos Promocionales</span>
                <span className="text-amber-700">
                  {LAUNCH_PROMO_CONFIG.claimedSpots} de {LAUNCH_PROMO_CONFIG.totalSpots} reservados
                </span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-[#B23A2E] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${claimedPercentage}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-600 text-center font-medium">
                ⚡ ¡Solo quedan <strong className="text-stone-900">{spotsLeft} cupos</strong> con tarifa congelada en S/ 300!
              </p>
            </div>
          </div>
        </div>

        {/* Las 2 Tarjetas de Planes Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Plan Mensual */}
          <article className="interior-plan">
            <p className="interior-plan-kicker">PASO A PASO MES A MES</p>
            <h2>{mensualPlan.name}</h2>
            <p className="interior-plan-desc">{mensualPlan.tagline}</p>

            <div>
              <p className="interior-price">
                <span>S/</span>
                {mensualPlan.periodicPrice}
                <small>{mensualPlan.periodLabel}</small>
              </p>
              <div className="space-y-1 mt-1">
                <p className="interior-setup">
                  + S/ {mensualPlan.setupPrice} pago único de activación inicial
                </p>
                <p className="text-[11px] font-semibold text-stone-600">
                  Carga de 25 productos, subdominio y entrega en 24 a 48 horas
                </p>
              </div>
            </div>

            <a
              className="interior-button font-bold"
              href={buildPricingWhatsAppUrl("mensual")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{mensualPlan.ctaText}</span>
              <ArrowUpRight size={18} />
            </a>

            <ul>
              {mensualPlan.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <p className="interior-delivery">
              Tiempo estimado: <strong>{mensualPlan.deliveryDays}</strong>
            </p>
          </article>

          {/* Plan Anual Recomendado */}
          <article className="interior-plan interior-plan-featured relative border-2 border-amber-500/80 shadow-md">
            <div className="absolute -top-3.5 right-6 bg-amber-400 text-stone-950 text-[11px] font-black uppercase tracking-wider py-1 px-3 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-stone-950" />
              <span>{anualPlan.badge}</span>
            </div>

            <p className="interior-plan-kicker text-amber-900 font-bold">
              MÁXIMO AHORRO · SETUP 100% GRATIS
            </p>
            <h2>{anualPlan.name}</h2>
            <p className="interior-plan-desc">{anualPlan.tagline}</p>

            <div>
              <p className="interior-price">
                <span>S/</span>
                {anualPlan.periodicPrice}
                <small>{anualPlan.periodLabel}</small>
              </p>
              <div className="space-y-1 mt-1">
                <p className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Instalación y Activación: S/ 0 (100% GRATIS)
                </p>
                <p className="text-[11px] font-bold text-amber-950">
                  {anualPlan.savingsNote} (S/ 25/mes · S/ 1 al día)
                </p>
              </div>
            </div>

            <a
              className="interior-button font-bold"
              href={buildPricingWhatsAppUrl("anual")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{anualPlan.ctaText}</span>
              <ArrowUpRight size={18} />
            </a>

            <ul>
              {anualPlan.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <p className="interior-delivery">
              Tiempo estimado: <strong>{anualPlan.deliveryDays}</strong>
            </p>
          </article>
        </div>

        {/* Sección de Módulos Especiales Adicionales & Cotizador Personalizado */}
        <section className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B23A2E]">
              Personalización Sin Costos Recurrentes
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Módulos Especiales Adicionales (Pagos Únicos)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Son pagos únicos que <strong>no aumentan tu cuota mensual</strong>. Actívalos ahora o agrégalos en cualquier momento según las necesidades operativas de tu negocio.
            </p>
          </div>

          {/* Tarjetas explicativas de los 3 Módulos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {OFFICIAL_ADDONS.map((addon) => {
              const getIcon = () => {
                if (addon.id === "addon-mesas") {
                  return <Utensils className="w-5 h-5 text-amber-600" />;
                }
                if (addon.id === "addon-inventario") {
                  return <Package className="w-5 h-5 text-emerald-600" />;
                }
                return <ScanLine className="w-5 h-5 text-blue-600" />;
              };

              return (
                <div
                  key={addon.id}
                  className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                        {getIcon()}
                      </div>
                      <span className="text-xs font-black text-[#B23A2E] px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200">
                        {addon.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-base text-stone-900">
                        {addon.name}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        {addon.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-1 text-xs">
                    <p className="text-stone-500 font-medium">
                      <strong className="text-stone-700">Ideal para:</strong>{" "}
                      {addon.idealFor}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Pago único · No altera cuota mensual
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cotizador Interactivo para Personalizar la Propuesta */}
          <div className="pt-6">
            <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Calculadora en Tiempo Real
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Arma tu cotización a medida
                </h4>
                <p className="text-xs sm:text-sm text-stone-600">
                  Selecciona tu plan base, marca los módulos especializados que requieres y solicita tu activación directa por WhatsApp.
                </p>
              </div>

              <InteractivePricingCalculator
                defaultPlanId="anual"
                showDetails={true}
                showPromoBanner={false}
              />
            </div>
          </div>
        </section>

        {/* Cuadro Comparativo Directo: Agencia Tradicional vs Qatu Web */}
        <section className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B23A2E]">
              Comparativa Directa al Bolsillo
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              ¿Por qué los comercios de Ayacucho eligen Qatu Web?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Compara lo que te pide una agencia de software clásica frente a nuestra suscripción de costo accesible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-2">
            {/* Agencia Clásica */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">
                  La forma tradicional
                </span>
                <h4 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
                  Agencia de Software Convencional
                </h4>
              </div>
              <ul className="space-y-3 text-xs text-stone-600">
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>S/ 1,500 a S/ 2,500</strong> de costo inicial por adelantado.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>30 a 60 días de espera</strong> para ver tu catálogo o web activa.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>S/ 200 a S/ 400 extra</strong> cada vez que pidas cambiar precios o fotos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Sistemas pesados que no abren con agilidad en datos móviles de celular.</span>
                </li>
              </ul>
            </div>

            {/* Qatu Web */}
            <div className="bg-stone-900 text-white rounded-2xl p-6 border-2 border-amber-500/60 shadow-lg space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  La forma Qatu Web
                </span>
                <h4 className="text-lg font-serif font-bold text-white mt-0.5">
                  Qatu Web (Huamanga, Ayacucho)
                </h4>
              </div>
              <ul className="space-y-3 text-xs text-stone-200">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>S/ 30 al mes (S/ 1 al día)</strong> o S/ 300 al año con instalación <strong>100% GRATIS</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Tu catálogo activo en 24 horas</strong> con tus primeros 25 productos cargados.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>0% de comisión por venta:</strong> Tus ganancias de Yape, Plin o efectivo son 100% tuyas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Cambios ilimitados gratis:</strong> Tú mismo apagas o cambias precios desde tu celular.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Compresión WebP automática:</strong> Fotos de celular optimizadas a &lt;80 KB sin costo.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tabla Comparativa Detallada */}
        <section className="interior-comparison">
          <p className="interior-kicker">CADA DETALLE CUENTA</p>
          <h2>Compara las funciones con calma.</h2>
          <p>
            Revisa las características incluidas en cada modalidad. En celulares, desliza la tabla hacia los lados para ver todas las columnas.
          </p>
          <ComparisonTable />
        </section>

        <PageInvite />
      </div>
    </div>
  );
}
