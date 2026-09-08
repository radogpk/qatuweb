import Link from "next/link";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { MessageCircle, Mail, MapPin, Heart, ArrowUpRight, Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand and Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-heading font-extrabold text-base shadow-sm">
                Q
              </div>
              <span className="text-2xl font-heading font-extrabold text-white tracking-tight">
                qatu<span className="text-brand-500">.pe</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              El mercado y plataforma digital para negocios peruanos. Creamos tu presencia web con subdominio propio, catálogo interactivo y pedidos a WhatsApp sin comisiones ni complicaciones.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
              <span>Nacidos en Ayacucho para potenciar a todo el Perú 🇵🇪</span>
            </div>
          </div>

          {/* Col 3: Navegación */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">
              Plataforma
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/directorio" className="hover:text-white transition-colors">
                  Directorio de Negocios
                </Link>
              </li>
              <li>
                <Link href="/anuncios" className="hover:text-white transition-colors">
                  Anuncios & Traspasos
                </Link>
              </li>
              <li>
                <Link href="/planes" className="hover:text-white transition-colors">
                  Planes y Tarifas
                </Link>
              </li>
              <li>
                <Link href="/para-tu-negocio" className="hover:text-white transition-colors">
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Contacto & Soporte
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Negocios Piloto */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">
              Negocios en Qatu
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="https://lasflores.qatu.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Florería Las Flores</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-400 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://hotelumaru.qatu.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Hotel Umaru Ayacucho</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-400 transition-colors" />
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/para-tu-negocio"
                  className="text-brand-400 hover:text-brand-300 transition-colors text-xs font-semibold inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Quiero sumar mi negocio</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contacto Directo */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">
              Hablemos
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href={getWhatsAppUrl("Hola Qatu, quiero información para mi negocio.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Business</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="text-xs text-slate-500 block font-mono">RUC: 20610987654</span>
                <span className="text-xs text-slate-500 block">Qatu Digital S.A.C.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Qatu.pe — Plataforma Digital del Perú. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Hecho con dedicación para el comercio peruano</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
