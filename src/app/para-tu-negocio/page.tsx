import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { PageIntro, PageInvite } from "@/components/shared/PageIntro";
import { ProcessTimeline } from "@/components/onboarding/ProcessTimeline";
import { AccordionFaq } from "@/components/onboarding/AccordionFaq";
import { OFFICIAL_PRICING_PLANS } from "@/lib/config/pricing";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import "../editorial.css";

export const metadata: Metadata = {
  alternates: { canonical: "/para-tu-negocio" },
  title: "Cómo creamos la web de tu negocio en Ayacucho — Qatu Web",
  description:
    "Conoce el proceso de 4 pasos de Qatu Web en Huamanga, Ayacucho: demostración en vivo con tu nombre, elección de plan, activación transparente con Yape/Plin y tu catálogo listo en 24 a 48 horas.",
};

const requirements = [
  {
    title: "Fotos de tus productos o platos",
    description:
      "Tus productos, platos o servicios tomados con la cámara de tu celular. Nuestro sistema las convierte automáticamente al formato WebP ultra-ligero (<80 KB) sin perder nitidez.",
  },
  {
    title: "Lista de productos y precios",
    description:
      "Tu carta, catálogo o lista de precios. Te incluimos la carga inicial de tus primeros 25 productos para que tu catálogo nazca listo para vender.",
  },
  {
    title: "El WhatsApp donde atiendes",
    description:
      "El número oficial donde tu negocio recibirá las comandas y pedidos ordenados directamente desde el carrito de compras flotante.",
  },
  {
    title: "Tu logo y datos para cobros",
    description:
      "Compártenos tu logo y tu propio número de Yape o Plin para que tus clientes te transfieran directamente a ti, con 0% de comisión para intermediarios.",
  },
];

export default function ParaTuNegocioPage() {
  return (
    <div className="site-page editorial-page">
      <div className="interior-shell">
        <PageIntro
          eyebrow="Cómo trabajamos en Ayacucho"
          title="Tú conoces tu negocio. Nosotros activamos tu web y tus pedidos."
          description="Diseñado para comerciantes, restaurantes y profesionales de Huamanga que quieren vender por internet y WhatsApp sin intermediarios costosos, sin comisiones abusivas y con soporte humano local."
        />

        {/* Sección 1: Proceso Oficial de 4 Pasos */}
        <section
          className="editorial-process-section"
          aria-labelledby="process-title"
        >
          <div className="editorial-section-heading editorial-heading-inline">
            <div>
              <p className="editorial-kicker">FLUJO DE VENTA Y ACTIVACIÓN</p>
              <h2 id="process-title">
                Cuatro pasos. Cero complicaciones y máxima transparencia.
              </h2>
            </div>
            <Link className="editorial-text-link" href="/contacto">
              Solicitar demostración sin costo{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ProcessTimeline />
        </section>

        {/* Sección 2: Tiempos de Entrega Oficiales */}
        <section
          className="editorial-delivery"
          aria-labelledby="delivery-title"
        >
          <div>
            <p className="editorial-kicker">TIEMPOS DE ENTREGA</p>
            <h2 id="delivery-title">Plazos claros según tu plan elegido.</h2>
            <p>
              Contamos desde que confirmas tu plan y nos compartes los datos o fotos
              de tus primeros 25 productos.
            </p>
          </div>
          <dl>
            {OFFICIAL_PRICING_PLANS.map((plan) => (
              <div key={plan.id}>
                <dt>
                  <strong>{plan.name}</strong>
                  <span
                    style={{
                      display: "block",
                      fontSize: "11px",
                      color: "#626b60",
                      marginTop: "2px",
                    }}
                  >
                    {plan.badge}
                  </span>
                </dt>
                <dd>{plan.deliveryDays}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Sección 3: Bloque de Confianza de Pago y Activación */}
        <section
          className="my-14 p-6 sm:p-9 rounded-2xl bg-[#eaece1] border border-[#d8dccf]"
          aria-labelledby="payment-trust-title"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#303e32]/10 text-[#303e32] text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#303e32]" />
                <span>Canal Oficial de Pago y Activación Inmediata</span>
              </div>
              <h2
                id="payment-trust-title"
                className="font-serif text-2xl sm:text-3xl font-bold text-[#303e32] tracking-tight"
              >
                Pago transparente con Yape o Plin. Sin sorpresas.
              </h2>
              <p className="text-sm text-[#626b60] leading-relaxed">
                Olvídate de ingresar tarjetas de crédito en plataformas extranjeras o pagar
                comisiones ocultas por venta. En Qatu Web transfieres directamente vía Yape o Plin
                a nuestra cuenta oficial y registras tu comprobante en tu portal de autogestión
                para activación en 24 a 48 horas.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/dashboard/cliente"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#303e32] text-[#f7f4e8] text-sm font-semibold hover:bg-[#232f25] transition shadow-xs"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Subir comprobante en /dashboard/cliente</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={getWhatsAppUrl(
                    "Hola Qatu Web, acabo de realizar mi pago con Yape/Plin y quiero activar mi catálogo para mi negocio."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#d8dccf] text-[#303e32] text-sm font-medium hover:bg-slate-50 transition"
                >
                  <span>Consultar por WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 border border-[#d8dccf] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#d8dccf] pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8a5b53]">
                    Credenciales Verificadas
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Cuenta Oficial
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#626b60] font-medium block">
                      Número Oficial Yape / Plin
                    </span>
                    <p className="text-2xl font-bold font-mono text-[#303e32] tracking-tight">
                      {siteConfig.yapeNumber}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#626b60] font-medium block">
                      Titular Oficial de la Cuenta
                    </span>
                    <p className="text-sm font-semibold text-[#303e32]">
                      {siteConfig.yapeTitular}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#d8dccf]/70 text-xs text-[#626b60] space-y-1.5">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>
                        Validación en 1 toque por Super Admin en{" "}
                        <code className="text-[11px] bg-slate-100 px-1 py-0.5 rounded">
                          /dashboard/admin
                        </code>
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>
                        Subida de voucher en tu portal{" "}
                        <code className="text-[11px] bg-slate-100 px-1 py-0.5 rounded">
                          /dashboard/cliente
                        </code>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 4: Requisitos Esenciales */}
        <section
          className="editorial-requirements"
          aria-labelledby="requirements-title"
        >
          <div className="editorial-section-heading">
            <p className="editorial-kicker">PREPARA LO ESENCIAL</p>
            <h2 id="requirements-title">
              Ya tienes mucho de lo que hace falta.
            </h2>
            <p>
              Reunimos contigo la información básica de tu negocio. No necesitas tener
              todo perfecto para escribirnos y ver tu demostración.
            </p>
          </div>
          <ul>
            {requirements.map((requirement) => (
              <li key={requirement.title}>
                <Check size={20} aria-hidden="true" />
                <div>
                  <h3>{requirement.title}</h3>
                  <p>{requirement.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Sección 5: Preguntas Frecuentes */}
        <section className="editorial-faq" aria-labelledby="faq-title">
          <div className="editorial-section-heading">
            <p className="editorial-kicker">ANTES DE DECIDIR</p>
            <h2 id="faq-title">Hablemos claro.</h2>
            <p>
              Dominio, catálogo, pagos, Panel de Bolsillo y cambios. Estas son algunas
              preguntas frecuentes que resolvemos a comerciantes de Huamanga.
            </p>
            <Link className="editorial-text-link" href="/planes">
              Comparar planes y tarifas oficiales{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="editorial-faq-list">
            <AccordionFaq />
          </div>
        </section>

        <PageInvite />
      </div>
    </div>
  );
}
