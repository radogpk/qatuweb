import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageIntro, PageInvite } from "@/components/shared/PageIntro";
import { ProcessTimeline } from "@/components/onboarding/ProcessTimeline";
import { AccordionFaq } from "@/components/onboarding/AccordionFaq";
import { initialPricingPlans } from "@/lib/seed/initialBusinesses";
import "../editorial.css";

export const metadata: Metadata = {
  alternates: { canonical: "/para-tu-negocio" },
  title: "Cómo creamos la web de tu negocio — Qatu",
  description:
    "Conoce el proceso de diseño de Qatu, los materiales que necesitas y los plazos por plan. Creamos tu web contigo y te acompañamos después de publicarla.",
};

const requirements = [
  {
    title: "Fotos de tu negocio",
    description:
      "Tus productos, platos, ambientes o servicios. Podemos empezar con fotos claras tomadas con tu celular.",
  },
  {
    title: "Lo que ofreces y sus precios",
    description:
      "Tu carta, catálogo o lista de servicios, junto con los horarios y la ubicación de tu negocio.",
  },
  {
    title: "El WhatsApp donde atiendes",
    description:
      "El número que usarás para recibir consultas, pedidos o solicitudes de reserva de tus clientes.",
  },
  {
    title: "Tu logo, si ya lo tienes",
    description:
      "Compártenos tu logo y tus colores. Si aún no tienes uno, lo conversamos al definir la presentación de tu web.",
  },
];

export default function ParaTuNegocioPage() {
  return (
    <div className="site-page editorial-page">
      <div className="interior-shell">
        <PageIntro
          eyebrow="Cómo trabajamos"
          title="Tú conoces tu negocio. Nosotros diseñamos su web."
          description="Te acompañamos desde la primera conversación hasta la publicación. Sin que tengas que aprender a diseñar o programar."
        />
        <section
          className="editorial-process-section"
          aria-labelledby="process-title"
        >
          <div className="editorial-section-heading editorial-heading-inline">
            <div>
              <p className="editorial-kicker">DE LA IDEA A TU ENLACE</p>
              <h2 id="process-title">Cuatro pasos. Un trabajo en equipo.</h2>
            </div>
            <Link className="editorial-text-link" href="/contacto">
              Empezar una conversación{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ProcessTimeline />
        </section>
        <section
          className="editorial-delivery"
          aria-labelledby="delivery-title"
        >
          <div>
            <p className="editorial-kicker">TIEMPOS DE ENTREGA</p>
            <h2 id="delivery-title">Un plazo según lo que necesitas.</h2>
            <p>
              Contamos desde que recibimos tus materiales y confirmamos el
              alcance contigo.
            </p>
          </div>
          <dl>
            {initialPricingPlans.map((plan) => (
              <div key={plan.id}>
                <dt>{plan.name}</dt>
                <dd>{plan.deliveryDays}</dd>
              </div>
            ))}
          </dl>
        </section>
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
              Reunimos contigo la información. No necesitas tener todo listo
              para escribirnos.
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
        <section className="editorial-faq" aria-labelledby="faq-title">
          <div className="editorial-section-heading">
            <p className="editorial-kicker">ANTES DE DECIDIR</p>
            <h2 id="faq-title">Hablemos claro.</h2>
            <p>
              Dominio, contenido, pagos y cambios. Estas son algunas preguntas
              que conviene resolver antes de empezar.
            </p>
            <Link className="editorial-text-link" href="/planes">
              Comparar planes y precios{" "}
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
