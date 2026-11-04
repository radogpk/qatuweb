'use client';

import React from 'react';
import Link from 'next/link';
import { UserCheck, MessageCircle, LogOut, ArrowLeft } from 'lucide-react';

interface ClientHeaderProps {
  clientName: string;
  clientEmail: string;
}

export function ClientHeader({ clientName, clientEmail }: ClientHeaderProps) {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Marca Qatu y Nombre */}
        <div className="flex items-center gap-3">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-stone-900">
            Qatu<span className="text-[#B23A2E]">.web</span>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
            <UserCheck className="w-3.5 h-3.5 text-[#B23A2E]" />
            Portal Clientes
          </span>
        </div>

        {/* Info de usuario y acciones */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="text-right hidden sm:block">
            <p className="text-xs sm:text-sm font-semibold text-stone-900">{clientName}</p>
            <p className="text-[11px] text-stone-500">{clientEmail}</p>
          </div>

          <a
            href="https://wa.me/51966123456?text=Hola%20equipo%20de%20Qatu,%20necesito%20soporte%20con%20mi%20p%C3%A1gina%20web"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs sm:text-sm font-medium transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Soporte</span> WhatsApp
          </a>

          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 p-2 rounded-lg hover:bg-stone-100 transition"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
