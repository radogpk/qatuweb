'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle, ExternalLink } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/config/site';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const whatsappHref = getWhatsAppUrl(
    'Hola Qatu Web, me gustaría solicitar mi página web y catálogo para mi negocio en Ayacucho.'
  );

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo de la Marca */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-stone-950 flex items-center justify-center text-white font-black text-lg tracking-tight group-hover:scale-105 transition-transform shadow-sm">
            <span className="text-amber-400">Q</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-stone-950">
                QATU<span className="text-[#C83E2B]">WEB</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-900 border border-amber-500/20">
                Huamanga
              </span>
            </div>
            <p className="text-[10px] text-stone-700 hidden sm:block tracking-wide font-medium">
              Software & Páginas Web a Medida
            </p>
          </div>
        </Link>

        {/* 4 Enlaces Principales Limpios en Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-stone-700">
          <a
            href="/#demos"
            className="hover:text-stone-950 transition-colors"
          >
            Rubros y Demos
          </a>
          <a
            href="/#precios"
            className="hover:text-stone-950 transition-colors"
          >
            Precios
          </a>
          <Link
            href="/login"
            className="hover:text-[#C83E2B] transition-colors"
          >
            Acceso Clientes
          </Link>
        </nav>

        {/* Botón CTA Pedir mi Web */}
        <div className="hidden md:flex items-center">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C83E2B] hover:bg-[#A93322] text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Pedir mi Web</span>
          </a>
        </div>

        {/* Botón Móvil Hamburguesa */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C83E2B] text-white text-xs font-bold shadow-sm active:scale-95 transition"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Pedir</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-stone-700 hover:text-stone-950 rounded-lg hover:bg-stone-100 transition"
            aria-label="Abrir menú de navegación"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 py-5 space-y-4 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          <nav className="flex flex-col space-y-3 text-sm font-bold text-stone-800">
            <a
              href="/#demos"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-stone-50 transition"
            >
              Rubros y Demos
            </a>
            <a
              href="/#precios"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-stone-50 transition"
            >
              Precios
            </a>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-[#C83E2B] hover:bg-stone-50 transition"
            >
              Acceso Clientes (/login)
            </Link>
          </nav>

          <div className="pt-2 border-t border-stone-100">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C83E2B] text-white text-sm font-bold shadow-sm transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pedir mi Web por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}