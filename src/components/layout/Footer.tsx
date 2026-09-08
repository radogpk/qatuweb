import Link from "next/link";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { Store, MessageCircle, Mail, MapPin, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2B3A55] text-[#FAF7F2] pt-16 pb-12 border-t border-[#1A2436]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#4A5B78]/40">
          {/* Col 1 & 2: Brand and Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center text-[#B23A2E] shadow-sm">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                qatu<span className="text-[#D4A017]">.pe</span>
              </span>
            </Link>
            <p className="text-sm text-[#FAF7F2]/80 max-w-sm leading-relaxed">
              El mercado digital para negocios peruanos. Creamos tu presencia web con subdominio propio, catálogo profesional y visibilidad local garantizada sin complicaciones técnicas.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#FAF7F2]/60">
              <MapPin className="w-4 h-4 text-[#D4A017]" />
              <span>Nacidos en Ayacucho para impulsar a todo el Perú</span>
            </div>
          </div>

          {/* Col 3: Navegación */}
          <div>
            <h4 className="font-serif font-semibold text-[#D4A017] text-base mb-4">
              Plataforma
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/80">
              <li>
                <Link href="/directorio" className="hover:text-white transition-colors">
                  Directorio de Negocios
                </Link>
              </li>
              <li>
                <Link href="/anuncios" className="hover:text-white transition-colors">
                  Anuncios & Alquileres
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
            <h4 className="font-serif font-semibold text-[#D4A017] text-base mb-4">
              Negocios en Qatu
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/80">
              <li>
                <a
                  href="https://lasflores.qatu.pe"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Florería Las Flores</span>
                </a>
              </li>
              <li>
                <a
                  href="https://hotelumaru.qatu.pe"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Hotel Umaru Ayacucho</span>
                </a>
              </li>
              <li>
                <Link href="/para-tu-negocio" className="text-[#D4A017] hover:underline text-xs">
                  + Quiero sumar mi negocio
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contacto Directo */}
          <div>
            <h4 className="font-serif font-semibold text-[#D4A017] text-base mb-4">
              Hablemos
            </h4>
            <ul className="space-y-3 text-sm text-[#FAF7F2]/80">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#D4A017] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Business</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 hover:text-[#D4A017] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D4A017]" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="text-xs text-[#FAF7F2]/60 block">RUC: 20610987654</span>
                <span className="text-xs text-[#FAF7F2]/60 block">Qatu Digital S.A.C.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <p>© {currentYear} Qatu.pe — Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Diseñado con</span>
            <Heart className="w-3.5 h-3.5 text-[#B23A2E] fill-[#B23A2E]" />
            <span>para el comercio local peruano</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
