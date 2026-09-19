import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getWhatsAppUrl, siteConfig } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="marketing-footer">
      <div className="marketing-shell">
        <div className="footer-columns">
          <div className="footer-brand">
            <Link href="/" className="brand-wordmark" aria-label="Qatu, inicio">
              qatu<span>.pe</span>
            </Link>
            <p>
              Tu marca en una web.
              <br />
              Tus pedidos en WhatsApp.
            </p>
            <span>Desde Ayacucho, para el Perú.</span>
          </div>
          <div>
            <h2>Para tu negocio</h2>
            <Link href="/#como-funciona">Cómo funciona</Link>
            <Link href="/#ejemplos">Ejemplos de catálogo</Link>
            <Link href="/planes">Planes y precios</Link>
          </div>
          <div>
            <h2>La comunidad</h2>
            <Link href="/directorio">Directorio de negocios</Link>
            <Link href="/anuncios">Anuncios y oportunidades</Link>
            <Link href="/nosotros">Sobre Qatu</Link>
          </div>
          <div>
            <h2>Conversemos</h2>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp <ArrowUpRight size={13} />
            </a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <Link href="/contacto">Contacto y consultas</Link>
          </div>
        </div>
        <div className="footer-baseline">
          <span>© {new Date().getFullYear()} Qatu.pe</span>
          <span>Hecho para los negocios de aquí.</span>
        </div>
      </div>
    </footer>
  );
}
