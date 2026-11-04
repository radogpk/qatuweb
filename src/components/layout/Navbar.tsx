"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/site";

const primaryLinks = [
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/planes", label: "Planes y precios" },
  { href: "/#ejemplos", label: "Ejemplos" },
];
const secondaryLinks = [
  { href: "/directorio", label: "Directorio de negocios" },
  { href: "/anuncios", label: "Anuncios y oportunidades" },
  { href: "/nosotros", label: "Sobre Qatu" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const communityButton = useRef<HTMLButtonElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node))
        setCommunityOpen(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  function closeMenus() {
    setMobileOpen(false);
    setCommunityOpen(false);
  }

  return (
    <header
      className="marketing-header"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          if (communityOpen) communityButton.current?.focus();
          else if (mobileOpen) mobileButton.current?.focus();
          closeMenus();
        }
      }}
    >
      <a className="skip-content" href="#contenido">
        Saltar al contenido
      </a>
      <div className="marketing-shell marketing-nav">
        <Link
          href="/"
          className="brand-wordmark"
          aria-label="Qatu, inicio"
          onClick={closeMenus}
        >
          qatu<span>.pe</span>
        </Link>
        <nav className="desktop-navigation" aria-label="Navegación principal">
          {primaryLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <div
            className="community-menu"
            ref={menuRef}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node))
                setCommunityOpen(false);
            }}
          >
            <button
              type="button"
              ref={communityButton}
              aria-expanded={communityOpen}
              aria-controls="community-navigation"
              onClick={() => setCommunityOpen(!communityOpen)}
            >
              Recursos <ChevronDown size={13} />
            </button>
            {communityOpen && (
              <div className="community-dropdown" id="community-navigation">
                {secondaryLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={closeMenus}>
                    {link.label}
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="nav-actions-group">
          <Link href="/login" className="nav-login-link">
            Mi Panel
          </Link>
          <a
            className="marketing-button button-brand nav-primary-action"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Quiero mi web <ArrowUpRight size={16} />
          </a>
        </div>
        <button
          type="button"
          ref={mobileButton}
          className="mobile-menu-toggle"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {mobileOpen && (
        <nav
          className="mobile-navigation"
          id="mobile-navigation"
          aria-label="Navegación móvil"
        >
          {[...primaryLinks, ...secondaryLinks].map((link) => (
            <Link href={link.href} key={link.href} onClick={closeMenus}>
              {link.label}
              <ArrowUpRight size={15} />
            </Link>
          ))}
          <Link href="/login" onClick={closeMenus}>
            Mi Panel (Clientes / Admin)
            <ArrowUpRight size={15} />
          </Link>
          <a
            className="marketing-button button-brand"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenus}
          >
            Quiero mi web <ArrowUpRight size={16} />
          </a>
        </nav>
      )}
    </header>
  );
}
