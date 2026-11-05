import type { Metadata } from "next";
import { initialPricingPlans } from "@/lib/seed/initialBusinesses";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { PageIntro, PageInvite } from "@/components/shared/PageIntro";
import { getWhatsAppUrl } from "@/lib/config/site";
import { Check, ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Planes y precios para tu web",
  description:
    "Compara diseño inicial, mensualidad y funciones de las webs y catálogos de Qatu. Precios en soles y pedidos por WhatsApp.",
  alternates: { canonical: "/planes" },
};
export default function PlanesPage() {
  return (
    <div className="site-page">
      <div className="interior-shell">
        <PageIntro
          eyebrow="Planes y precios"
          title="Invierte en una presencia propia."
          description="Un pago inicial por diseñar y configurar tu web. Una mensualidad por mantenerla. Elige según lo que tu negocio necesita."
        />
        <div className="interior-plans">
          {initialPricingPlans.map((plan) => (
            <article
              className={`interior-plan ${plan.id === "comercio" ? "interior-plan-featured" : ""}`}
              key={plan.id}
            >
              <p className="interior-plan-kicker">
                {plan.id === "comercio"
                  ? "CATÁLOGO Y PEDIDOS"
                  : plan.id === "informativa"
                    ? "PRESENCIA DIGITAL"
                    : "COMERCIO Y RESERVAS"}
              </p>
              <h2>{plan.name}</h2>
              <p className="interior-plan-desc">{plan.tagline}</p>
              <p className="interior-price">
                <span>S/</span>
                {plan.monthlyPrice}
                <small>/ mes</small>
              </p>
              <p className="interior-setup">
                + S/ {plan.setupPrice} de creación inicial
              </p>
              <a
                className="interior-button"
                href={getWhatsAppUrl(
                  `Hola Qatu, me interesa ${plan.name}: S/ ${plan.setupPrice} de creación y S/ ${plan.monthlyPrice} al mes.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar este plan <ArrowUpRight size={18} />
              </a>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="interior-delivery">Entrega: {plan.deliveryDays}</p>
            </article>
          ))}
        </div>
        <p className="interior-note">
          Los plazos empiezan al recibir tus materiales. Confirmamos contigo el
          alcance antes de comenzar.
        </p>
        <section className="interior-comparison">
          <p className="interior-kicker">CADA DETALLE CUENTA</p>
          <h2>Compara con calma.</h2>
          <p>
            Revisa las funciones incluidas en cada plan. En móvil, desliza la
            tabla para ver todas las columnas.
          </p>
          <ComparisonTable />
        </section>
        <PageInvite />
      </div>
    </div>
  );
}
