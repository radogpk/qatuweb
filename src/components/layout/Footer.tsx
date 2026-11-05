import React from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/config/site';

export function Footer() {
  const whatsappHref = getWhatsAppUrl(
    'Hola Qatu Web, me gustaría recibir más información para crear mi página web o catálogo.'
  );

  return (
    <footer className="bg-stone-950 text-white border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Marca */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group inline-block">
              <div className="w-8 h-8 rounded-xl bg-stone-800 flex items-center justify-center text-white font-black text-base">
                <span className="text-amber-400">Q</span>
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                QATU<span className="text-[#C83E2B]">WEB</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Software a medida y catálogos virtuales conectados directo a WhatsApp por S/ 30 al mes. 
              Desarrollado con orgullo en Huamanga, Ayacucho para potenciar a los comerciantes locales.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Soporte técnico directo en Ayacucho</span>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Soluciones
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/demo/calzados" className="hover:text-white transition">
                  Demo Calzado & Ropa
                </Link>
              </li>
              <li>
                <Link href="/demo/pasteleria" className="hover:text-white transition">
                  Demo Carta QR & Restaurante
                </Link>
              </li>
              <li>
                <Link href="/demo/gym" className="hover:text-white transition">
                  Demo Gimnasio & DNI
                </Link>
              </li>
              <li>
                <Link href="/planes" className="hover:text-white transition">
                  Planes y Precios (S/ 30)
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto y Acceso */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Clientes & Contacto
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/login" className="text-amber-400 font-bold hover:underline">
                  Acceso Clientes (/login)
                </Link>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <span>WhatsApp Directo</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="/dashboard/admin" className="hover:text-stone-300 font-mono text-[11px]">
                  Hub Maestro
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} QatuWeb.com • Huamanga, Ayacucho, Perú.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/terminos" className="hover:text-stone-300 transition">
              Términos del Servicio
            </Link>
            <Link href="/privacidad" className="hover:text-stone-300 transition">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}