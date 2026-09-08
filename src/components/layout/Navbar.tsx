"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Wordmark Puro */}
          <Link href="/" className="group inline-flex items-baseline gap-0.5">
            <span className="text-2xl sm:text-[27px] font-serif font-bold tracking-tight text-[#1E2838] group-hover:text-[#B23A2E] transition-colors">
              qatu<span className="text-[#B23A2E]">.pe</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#4B586E] hover:text-[#1E2838] transition-colors relative py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/anuncios"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1E2838] hover:text-[#B23A2E] hover:bg-[#F4F1EA] rounded-xl border border-[#EAE6DF] transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59218]" />
              <span>Anuncios & Alquileres</span>
            </Link>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#B23A2E] hover:bg-[#962E24] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all active:scale-98"
            >
              <span>Quiero mi web</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#1E2838] hover:bg-[#F4F1EA] transition-colors"
              aria-label="Abrir menú de navegación"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-[#EAE6DF] bg-[#FAF9F6] px-4 pt-2 pb-6 space-y-3 shadow-card">
          <nav className="flex flex-col space-y-1.5">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 rounded-xl text-base font-medium text-[#1E2838] hover:bg-[#F4F1EA] hover:text-[#B23A2E] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/anuncios"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2.5 rounded-xl text-base font-medium text-[#B23A2E] bg-[#FDF2F0] hover:bg-[#FBEAE8] transition-colors flex items-center justify-between"
            >
              <span>Anuncios & Alquileres</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#C59218] text-white">
                Nuevo
              </span>
            </Link>
          </nav>

          <div className="pt-3 border-t border-[#EAE6DF] flex flex-col gap-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-xl bg-[#B23A2E] text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2"
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
