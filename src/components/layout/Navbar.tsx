'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowUpRight,
  Lock,
  Phone,
  Layers,
  ShieldCheck,
  User,
  LayoutDashboard,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/config/site';
import { createClient } from '@/lib/supabase/client';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authUser, setAuthUser] = useState<{
    name: string;
    email: string;
    avatarUrl?: string;
    isSuperAdmin: boolean;
  } | null>(null);

  // Aislamiento estricto: en tiendas demo y dashboards NO se renderiza la barra de marketing
  if (pathname?.startsWith('/demo') || pathname?.startsWith('/dashboard')) {
    return null;
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user?.email) {
          const cleanEmail = user.email.toLowerCase().trim();
          const isSuperAdmin =
            cleanEmail === 'luisgerardolloccllasaune@gmail.com' ||
            cleanEmail.includes('luis.llocclla') ||
            cleanEmail.endsWith('@unsch.edu.pe');

          setAuthUser({
            name:
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              (user.email ? user.email.split('@')[0] : 'Mi Cuenta'),
            email: user.email,
            avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture,
            isSuperAdmin,
          });
        }
      } catch {
        // Modo anónimo sin sesión
      }
    };
    checkAuth();
  }, []);

  const whatsappHref = getWhatsAppUrl(
    'Hola Qatu Web, deseo solicitar una página web y catálogo a medida por S/ 30 al mes para mi negocio en Ayacucho.'
  );

  const dashboardHref = authUser?.isSuperAdmin ? '/dashboard/admin' : '/dashboard/cliente';

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

        {/* Derecha: Acciones Comerciales y Perfil de Usuario */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <a
            href="https://wa.me/51941663265"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Soporte y Consultas en Ayacucho"
          >
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>941 663 265</span>
          </a>

          {authUser ? (
            /* Usuario con Sesión Activa (Google o Email) */
            <Link
              href={dashboardHref}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition text-xs font-bold shadow-xs border border-emerald-500/40 group"
              title={`Sesión iniciada como ${authUser.email}`}
            >
              {authUser.avatarUrl ? (
                <img
                  src={authUser.avatarUrl}
                  alt={authUser.name}
                  className="w-5 h-5 rounded-full object-cover border border-emerald-400 shrink-0"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[10px] shrink-0">
                  {(authUser.name || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <span className="max-w-[120px] truncate">{authUser.name}</span>
              <span className="text-[10px] text-emerald-300 font-bold px-1.5 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-500/30">
                {authUser.isSuperAdmin ? 'Admin' : 'Mi Panel'}
              </span>
            </Link>
          ) : (
            /* Usuario Anónimo: Acceso a Login */
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Acceso Clientes</span>
            </Link>
          )}

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
          {authUser ? (
            <Link
              href={dashboardHref}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold border border-emerald-500/40"
            >
              {authUser.avatarUrl ? (
                <img
                  src={authUser.avatarUrl}
                  alt={authUser.name}
                  className="w-4 h-4 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>Panel</span>
            </Link>
          ) : (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs active:scale-95 transition"
            >
              <span>Solicitar</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          )}
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
          {authUser && (
            <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {authUser.avatarUrl ? (
                  <img
                    src={authUser.avatarUrl}
                    alt={authUser.name}
                    className="w-8 h-8 rounded-full border border-emerald-500 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    {(authUser.name || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 line-clamp-1">
                    {authUser.name}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    {authUser.isSuperAdmin ? 'Super Administrador' : 'Cliente Qatu'}
                  </span>
                </div>
              </div>
              <Link
                href={dashboardHref}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs"
              >
                Ir al Panel
              </Link>
            </div>
          )}

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
            {!authUser && (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-slate-50 transition flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Acceso Clientes (/login)</span>
              </Link>
            )}
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
