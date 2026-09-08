"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { Menu, X, Store, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F5EFE4]/90 backdrop-blur-md border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Wordmark */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#B23A2E] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Store className="w-5 h-5 text-[#FCF6E5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold tracking-tight text-[#2B3A55] group-hover:text-[#B23A2E] transition-colors">
                qatu<span className="text-[#B23A2E]">.pe</span>
              </span>
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#D4A017] font-semibold -mt-1">
                Mercado Digital
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#2B3A55] hover:text-[#B23A2E] transition-colors relative py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/directorio"
              className="px-4 py-2 text-sm font-medium text-[#2B3A55] hover:text-[#B23A2E] transition-colors"
            >
              Ver vitrina
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#B23A2E] hover:bg-[#962E24] text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <span>Quiero mi web</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#2B3A55] hover:bg-[#EADDC8]/50 transition-colors"
              aria-label="Abrir menú de navegación"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-[#E8DEC8] bg-[#F5EFE4] px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-[#2B3A55] hover:bg-[#FAF7F2] hover:text-[#B23A2E] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#E8DEC8] flex flex-col gap-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-full bg-[#B23A2E] text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2"
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
