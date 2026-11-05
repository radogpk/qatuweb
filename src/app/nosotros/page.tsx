import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PageIntro, PageInvite } from "@/components/shared/PageIntro";
import "../editorial.css";

export const metadata: Metadata = {
  alternates: { canonical: "/nosotros" },
  title: "Sobre Qatu — Diseño web para el comercio local",
  description:
    "Qatu es un proyecto de Ayacucho que crea webs y catálogos para negocios locales, con pedidos por WhatsApp, precios claros y acompañamiento.",
};

const principles = [
  {
    title: "Tu marca tiene el protagonismo.",
    description:
      "Tus productos, tus fotos y tu forma de atender. Organizamos cada página para que quien llegue entienda qué ofreces y cómo comprarte.",
  },
  {
    title: "La relación con tu cliente es tuya.",
    description:
      "Los pedidos y consultas llegan a tu WhatsApp. Conversas con tu cliente, confirmas la disponibilidad y coordinas el pago directamente.",
  },
  {
    title: "El servicio debe ser claro.",
    description:
      "Un pago por crear tu web y una mensualidad para mantenerla. Sin comisión de Qatu por tus ventas y con el alcance definido antes de empezar.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="site-page editorial-page">
      <div className="interior-shell">
        <PageIntro
          eyebrow="Sobre Qatu"
          title="Diseño cercano. Ambición para lo local."
          description="Desde Ayacucho, ayudamos a los negocios a tener un lugar propio en internet. Con su identidad, sus productos y su forma de atender."
        />
        <section className="editorial-origin" aria-labelledby="origin-title">
          <div className="editorial-origin-copy">
            <p className="editorial-kicker">EL PUNTO DE PARTIDA</p>
            <h2 id="origin-title">
              Hay mucho que hace especial a tu negocio. Hagamos que se vea.
            </h2>
            <p>
              Una buena recomendación despierta el interés. Una web clara ayuda
              a dar el siguiente paso: conocer lo que vendes, revisar tus
              precios y ponerse en contacto contigo.
            </p>
            <p>
              Qatu reúne esa información en una página que puedes compartir en
              tus redes, en tu local o por WhatsApp. Nosotros nos encargamos del
              diseño y la configuración; tú sigues cerca de tus clientes.
            </p>
            <Link className="editorial-text-link" href="/para-tu-negocio">
              Así trabajamos contigo{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="editorial-manifesto">
            <p className="editorial-manifesto-label">
              EL COMERCIO LOCAL, EN INTERNET
            </p>
            <p className="editorial-manifesto-statement">
              Un lugar propio.
              <br />
              Tu manera
              <br />
              de hacer las cosas.
            </p>
            <div className="editorial-manifesto-footer">
              <span className="editorial-wordmark" aria-label="Qatu punto pe">
                qatu<span>.pe</span>
              </span>
              <span>
                <MapPin size={15} aria-hidden="true" /> Ayacucho, Perú
              </span>
            </div>
          </div>
        </section>
        <section
          className="editorial-principles"
          aria-labelledby="principles-title"
        >
          <div className="editorial-section-heading">
            <p className="editorial-kicker">NUESTRA FORMA DE TRABAJAR</p>
            <h2 id="principles-title">
              Cuidar el diseño.
              <br />Y lo que hay detrás.
            </h2>
          </div>
          <ol className="editorial-principle-list">
            {principles.map((principle, index) => (
              <li key={principle.title}>
                <span className="editorial-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section
          className="editorial-continuity"
          aria-labelledby="continuity-title"
        >
          <p className="editorial-kicker">DESPUÉS DE PUBLICAR</p>
          <h2 id="continuity-title">
            Tu negocio cambia.
            <br />
            Tu web también.
          </h2>
          <div>
            <p>
              Un nuevo producto, otra temporada, un cambio de horario. El
              mantenimiento incluye soporte y actualizaciones según tu plan,
              para que la información que ven tus clientes siga al día.
            </p>
            <Link className="editorial-text-link" href="/planes">
              Revisar qué incluye cada plan{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
        <PageInvite />
      </div>
    </div>
  );
}
