import type { Metadata } from "next";
import Link from "next/link";
import { initialPricingPlans } from "@/lib/seed/initialBusinesses";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { PageIntro, PageInvite } from "@/components/shared/PageIntro";
import { getWhatsAppUrl } from "@/lib/config/site";
import {
  Check,
  X,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Planes y Precios Oficiales | Qatu Web Ayacucho",
  description:
    "Tu propia página web o sistema a medida por S/ 30 al mes o S/ 300 al año. Con catálogo móvil, pedidos directos a WhatsApp y panel de administración en Huamanga, Ayacucho.",
  alternates: { canonical: "/planes" },
};

export default function PlanesPage() {
  return (
    <div className="site-page">
      <div className="interior-shell space-y-12">
        {/* Encabezado con Cintillo de Confianza Local */}
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-stone-800 text-xs font-semibold tracking-wide mb-4 shadow-sm">
            <span className="flex items-center gap-1.5">
              <span>🇵🇪</span>
              <strong className="text-stone-900 font-bold">
                Desarrollado en Huamanga, Ayacucho
              </strong>
            </span>
            <span className="w-1 h-1 rounded-full bg-amber-600"></span>
            <span className="text-[#B23A2E] font-bold">
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
            <span className="text-xs font-semibold text-stone-600">
              Prueba las demostraciones en vivo:
            </span>
            <Link
              href="/demo/calzados"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition"
            >
              <span>👠 Demo Calzado & Moda</span>
              <ExternalLink className="w-3 h-3 text-amber-400" />
            </Link>
            <Link
              href="/demo/pasteleria"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold hover:bg-amber-200 transition"
            >
              <span>🍰 Demo Pastelería & Café</span>
              <ExternalLink className="w-3 h-3 text-amber-800" />
            </Link>
          </div>
        </div>

        {/* Las 3 Tarjetas de Planes */}
        <div className="interior-plans">
          {initialPricingPlans.map((plan) => {
            const isAnual = plan.id === "anual";
            const isMedida = plan.id === "medida";

            return (
              <article
                className={`interior-plan ${isAnual ? "interior-plan-featured" : ""}`}
                key={plan.id}
              >
                <p className="interior-plan-kicker">
                  {isAnual
                    ? "⭐ MÁXIMO AHORRO · SETUP GRATIS"
                    : isMedida
                      ? "LÓGICA OPERATIVA A MEDIDA"
                      : "PASO A PASO MES A MES"}
                </p>
                <h2>{plan.name}</h2>
                <p className="interior-plan-desc">{plan.tagline}</p>

                {isAnual ? (
                  <div>
                    <p className="interior-price">
                      <span>S/</span>
                      300
                      <small>/ año</small>
                    </p>
                    <p className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Activación y subida inicial: S/ 0 (GRATIS)
                    </p>
                  </div>
                ) : isMedida ? (
                  <div>
                    <p className="interior-price">
                      <span>S/</span>
                      {plan.setupPrice}
                      <small> cotización base</small>
                    </p>
                    <p className="interior-setup">
                      + S/ {plan.monthlyPrice} / mes de infraestructura aislada
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="interior-price">
                      <span>S/</span>
                      {plan.monthlyPrice}
                      <small>/ mes</small>
                    </p>
                    <p className="interior-setup">
                      + S/ {plan.setupPrice} pago único de activación inicial
                    </p>
                  </div>
                )}

                <a
                  className="interior-button"
                  href={getWhatsAppUrl(
                    isAnual
                      ? "Hola Qatu Web, deseo contratar el Plan Anual Recomendado de S/ 300 con instalación GRATIS."
                      : isMedida
                        ? "Hola Qatu Web, requiero un sistema a medida (Gym con control DNI / Restaurante / Facturación)."
                        : "Hola Qatu Web, deseo contratar el Plan Mensual de S/ 30 (+ S/ 90 de activación).",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.ctaText} <ArrowUpRight size={18} />
                </a>

                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="interior-delivery">
                  Tiempo estimado: <strong>{plan.deliveryDays}</strong>
                </p>
              </article>
            );
          })}
        </div>

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
                  <span><strong>S/ 30 al mes (S/ 1 al día)</strong> o S/ 300 al año con instalación <strong>GRATIS</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Tu catálogo activo en 24 horas</strong> con tus primeros 25 productos cargados.</span>
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
            Revisa las características incluidas en cada plan. En celulares, desliza la tabla hacia los lados para ver todas las columnas.
          </p>
          <ComparisonTable />
        </section>

        <PageInvite />
      </div>
    </div>
  );
}
