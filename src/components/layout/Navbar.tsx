"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { Menu, X, ArrowUpRight, Store, Megaphone } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Wordmark */}
          <Link href="/" prefetch={true} className="group flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-heading font-extrabold text-xl shadow-card group-hover:scale-105 transition-transform">
              Q
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-heading font-extrabold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors leading-none">
                qatu<span className="text-brand-600">.pe</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-1">
                Mercado Digital
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`text-sm font-medium transition-colors py-1 relative ${
                    isActive
                      ? "text-brand-600 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:font-semibold"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-600 rounded-full animate-in fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/anuncios"
              prefetch={true}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                pathname === "/anuncios"
                  ? "bg-amber-100/70 border-amber-300 text-amber-900 shadow-xs"
                  : "text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border-slate-200"
              }`}
            >
              <Megaphone className="w-3.5 h-3.5 text-amber-600" />
              <span>Anuncios & Traspasos</span>
            </Link>

            <a
              href={getWhatsAppUrl("Hola Qatu, quiero solicitar información para crear mi página web con subdominio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold shadow-card hover:shadow-card-hover transition-all active:scale-95"
            >
              <span>Crear mi web</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-50 text-brand-700 font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/anuncios"
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                pathname === "/anuncios"
                  ? "bg-amber-100/80 text-amber-900 font-bold"
                  : "text-slate-800 bg-amber-50/60 hover:bg-amber-100/60"
              }`}
            >
              <span className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-amber-600" />
                <span>Anuncios & Traspasos</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-amber-500 text-white">
                Oportunidades
              </span>
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-100">
            <a
              href={getWhatsAppUrl("Hola Qatu, quiero solicitar mi página web.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-card flex items-center justify-center gap-2"
            >
              <span>Quiero mi web para mi negocio</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

