'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  MessageCircle,
  ArrowUpRight,
  Lock,
  Phone,
  Layers,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/config/site';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Aislamiento estricto: en tiendas demo y dashboards NO se renderiza la barra de marketing
  if (pathname?.startsWith('/demo') || pathname?.startsWith('/dashboard')) {
    return null;
  }

  const whatsappHref = getWhatsAppUrl(
    'Hola Qatu Web, deseo solicitar una página web y catálogo a medida por S/ 30 al mes para mi negocio en Ayacucho.'
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Izquierda: Logo Tipográfico Sólido + Badge de Huamanga */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-lg tracking-tight group-hover:scale-105 transition-transform shadow-xs">
            <Layers className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900">
                QATU<span className="text-emerald-600">WEB</span>
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs">
                <span>Huamanga, Ayacucho</span>
              </span>
            </div>
            <span className="text-[10px] text-slate-500 hidden sm:block font-medium tracking-tight">
              Software & Páginas Web a Medida
            </span>
          </div>
        </Link>

        {/* Centro: Cápsula de Navegación Ejecutiva */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 border border-slate-200/80 rounded-full px-2 py-1 shadow-2xs">
          <a
            href="/#soluciones"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white transition"
          >
            Soluciones
          </a>
          <a
            href="/#demos"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white transition"
          >
            Demos en Vivo
          </a>
          <a
            href="/#comparativa"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white transition"
          >
            Comparativa
          </a>
          <a
            href="/#precios"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white transition"
          >
            Planes
          </a>
        </nav>

        {/* Derecha: Acciones Comerciales */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <a
            href="https://wa.me/51966000111"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Soporte y Consultas en Ayacucho"
          >
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>966 000 111</span>
          </a>

          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
          >
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Acceso Clientes</span>
          </Link>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95"
          >
            <span>Solicitar mi Web</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </a>
        </div>

        {/* Hamburguesa Móvil */}
        <div className="sm:hidden flex items-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs active:scale-95 transition"
          >
            <span>Solicitar</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition"
            aria-label="Menú principal"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 py-5 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <a
              href="/#soluciones"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 transition"
            >
              Soluciones por Rubro
            </a>
            <a
              href="/#demos"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 transition flex items-center justify-between"
            >
              <span>Demos Interactivas</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                Interactivas
              </span>
            </a>
            <a
              href="/#comparativa"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 transition"
            >
              Comparativa (Agencias vs Qatu)
            </a>
            <a
              href="/#precios"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-slate-800 hover:bg-slate-50 transition font-medium"
            >
              Planes y Precios
            </a>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 transition flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Acceso Clientes (/login)</span>
            </Link>
          </nav>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-sm transition active:scale-95"
            >
              <span>Solicitar mi Web por WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}