'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink, LogOut, LayoutDashboard, Globe } from 'lucide-react';

export function AdminHeader() {
  return (
    <header className="bg-stone-900 text-white border-b border-stone-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Marca y Rol */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-amber-400 transition">
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              Qatu<span className="text-[#B23A2E]">.web</span>
            </span>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Super Admin
          </span>
        </div>

        {/* Acciones y Navegación */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/portal"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-stone-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-stone-800 transition"
          >
            <LayoutDashboard className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Ver como</span> Cliente
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-stone-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-stone-800 transition"
          >
            <Globe className="w-4 h-4 text-stone-400" />
            <span className="hidden sm:inline">Web Pública</span>
          </Link>

          <div className="h-5 w-px bg-stone-700 mx-1" />

          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-stone-400 hover:text-red-400 px-2.5 py-1.5 rounded-lg hover:bg-stone-800/80 transition"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Salir</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
