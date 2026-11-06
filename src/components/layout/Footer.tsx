'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, ArrowUpRight, ShieldCheck, MapPin, Layers } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/config/site';

export function Footer() {
  const pathname = usePathname();

  // Aislamiento: en demos, dashboards y login no se muestra el footer global de marketing
  if (
    pathname?.startsWith('/demo') ||
    pathname?.startsWith('/dashboard') ||
    pathname === '/login'
  ) {
    return null;
  }

  const whatsappHref = getWhatsAppUrl(
    'Hola Qatu Web, me gustaría recibir más información para crear mi página web o catálogo.'
  );

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Marca */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group inline-block">
              <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-white font-black text-base border border-slate-700">
                <Layers className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                QATU<span className="text-emerald-400">WEB</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Software y páginas web a medida conectadas directo a WhatsApp por S/ 30 al mes. 
              Desarrollado con orgullo en Huamanga, Ayacucho para potenciar a los comercios de nuestra región.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Soporte presencial y remoto en Huamanga, Ayacucho</span>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Soluciones Oficiales
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/demo/calzados" className="hover:text-white transition">
                  Calzados Lucas (Comercio)
                </Link>
              </li>
              <li>
                <Link href="/demo/pasteleria" className="hover:text-white transition">
                  Restaurante Las Flores (Carta QR)
                </Link>
              </li>
              <li>
                <Link href="/demo/gym" className="hover:text-white transition">
                  Trankilandia Gym (Fitness & DNI)
                </Link>
              </li>
              <li>
                <Link href="/planes" className="hover:text-white transition">
                  Planes y Tarifas Oficiales
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto y Acceso */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Clientes & Contacto
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/login" className="text-emerald-400 font-bold hover:underline">
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
                  <span>WhatsApp Directo de Soporte</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="/dashboard/admin" className="hover:text-slate-300 font-mono text-[11px]">
                  Hub Maestro Super Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} QatuWeb.com • Huamanga, Ayacucho, Perú. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/terminos" className="hover:text-slate-300 transition">
              Términos del Servicio
            </Link>
            <Link href="/privacidad" className="hover:text-slate-300 transition">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}