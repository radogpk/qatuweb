import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, ShoppingBag } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/site";
import { demoCatalogs } from "@/lib/data/demo-catalogs";
import { CatalogDemoLink } from "./StorefrontPreview";
import "./premium-hero.css";

const displays = [
  {
    catalog: demoCatalogs[1],
    title: "Dilo con flores.",
    action: "Detalles que se quedan",
    category: "FLORERÍA & REGALOS",
    className: "flowers",
  },
  {
    catalog: demoCatalogs[0],
    title: "Una pausa.\nUn buen café.",
    action: "Hecho para disfrutar, sin prisa.",
    category: "CAFÉ DE ESPECIALIDAD",
    className: "coffee",
  },
  {
    catalog: demoCatalogs[2],
    title: "Lo cotidiano,\nextraordinario.",
    action: "Objetos con una historia propia.",
    category: "DISEÑO & OBJETOS",
    className: "studio",
  },
];

export function PremiumHero() {
  return (
    <section className="p-hero" aria-labelledby="p-title">
      <div className="q-container p-intro">
        {/* Cintillo de Confianza Local */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-stone-800 text-xs font-semibold tracking-wide mb-4 shadow-sm">
          <span className="flex items-center gap-1.5">
            <span>🇵🇪</span>
            <strong className="text-stone-900 font-bold">Desarrollado en Huamanga, Ayacucho</strong>
          </span>
          <span className="w-1 h-1 rounded-full bg-amber-600"></span>
          <span className="text-[#B23A2E] font-bold">Tu sistema activo en 24 horas</span>
        </div>

        <p className="p-eyebrow">QATU · INGENIERÍA DE SOFTWARE & PÁGINAS WEB</p>
        <h1 id="p-title">
          Tu negocio,<span className="p-title-bridge"> con una web</span>
          <br />
          <span className="p-title-accent">que se hace notar.</span>
        </h1>
        <p className="p-description">
          Una primera impresión que invita a quedarse. Diseñamos tu web con la
          personalidad de tu marca, un catálogo para explorar y pedidos directos
          a WhatsApp.
        </p>
        <div className="p-actions">
          <a
            className="q-button q-button-red"
            href={getWhatsAppUrl(
              "Hola Qatu, quiero una web con la identidad de mi negocio. Me gustaría conversar sobre el diseño.",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Diseñemos mi web <ArrowUpRight size={19} />
          </a>
          <a className="p-secondary" href="#demo">
            Descubre cómo funciona <ArrowRight size={17} />
          </a>
        </div>
        <p className="p-service-note">
          Tu marca al frente. Nuestro equipo a tu lado.
        </p>
      </div>
      <div
        className="p-showcase"
        id="ejemplos"
        aria-label="Direcciones de diseño para tu negocio"
      >
        <div className="p-showcase-heading">
          <span>TRES NEGOCIOS. TRES FORMAS DE SER ÚNICOS.</span>
          <span>Ejemplos de diseño / 01—03</span>
        </div>
        <p className="p-gallery-hint">
          Desliza para explorar los diseños{" "}
          <ArrowRight size={13} aria-hidden="true" />
        </p>
        <div
          className="p-gallery"
          role="group"
          aria-label="Ejemplos de tiendas: desplázate para explorar"
        >
          {displays.map(({ catalog, title, action, category, className }) => (
            <CatalogDemoLink
              key={catalog.id}
              catalogId={catalog.id}
              className={`p-site p-site-${className}`}
              aria-label={`Explorar el catálogo de ejemplo de ${catalog.label}`}
            >
              <div className="p-browser">
                <span>{catalog.domain}</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </div>
              <div className="p-shop-nav">
                <strong>
                  {catalog.name}
                  <i>.</i>
                </strong>
                <span>
                  {catalog.id === "cafe" ? "Nuestra carta" : "La colección"}
                </span>
                <ShoppingBag size={16} aria-hidden="true" />
              </div>
              <div className="p-shop-cover">
                <Image
                  src={catalog.cover}
                  alt={catalog.coverAlt}
                  fill
                  priority={catalog.id === "cafe"}
                  sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 540px"
                />
                <div className="p-shop-shade" />
                <div className="p-shop-copy">
                  <span>{category}</span>
                  <p className="p-shop-title">{title}</p>
                  <p>{action}</p>
                  <span className="p-shop-action">
                    {catalog.id === "cafe"
                      ? "Conoce nuestra carta"
                      : "Explora la colección"}{" "}
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
              <div className="p-shop-bottom">
                <span>{catalog.products[0]?.name || ''}</span>
                <strong>S/ {Number(catalog.products[0]?.price || 0).toFixed(2)}</strong>
              </div>
            </CatalogDemoLink>
          ))}
        </div>
        <div className="p-showcase-foot">
          <p>
            Diseños ilustrativos. Tu web tendrá tu marca, tus fotos y tu
            historia.
          </p>
          <a href="#demo">
            Prueba la experiencia <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="q-container p-promises">
        <span>
          <Check size={17} /> Diseño con tu identidad
        </span>
        <span>
          <Check size={17} /> Pedidos a tu WhatsApp
        </span>
        <span>
          <Check size={17} /> Sin comisión de Qatu por venta
        </span>
        <span>Desde Ayacucho, para el Perú.</span>
      </div>
    </section>
  );
}
