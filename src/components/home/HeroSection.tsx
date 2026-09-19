"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/config/site";
import { 
  ArrowRight, 
  ExternalLink,
  Check,
  Search,
  MapPin,
  Clock,
  ShoppingBag,
  Send,
  Store,
  ArrowUpRight
} from "lucide-react";

interface ShowcaseStore {
  id: string;
  name: string;
  subdomain: string;
  category: string;
  location: string;
  image: string;
  tagline: string;
  products: { name: string; price: string; detail: string }[];
  highlight: string;
}

const SHOWCASE_STORES: ShowcaseStore[] = [
  {
    id: "florería",
    name: "Florería Las Flores",
    subdomain: "lasflores.qatu.pe",
    category: "Florería & Detalles",
    location: "Huamanga, Ayacucho",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
    tagline: "Ramos de rosas, orquídeas y regalos con entrega el mismo día",
    products: [
      { name: "Ramo 12 Rosas Rojas", price: "S/ 45.00", detail: "Papel kraft y lazo satinado" },
      { name: "Caja Girasoles & Bombones", price: "S/ 65.00", detail: "Con dedicatoria personalizada" },
      { name: "Orquídea Colonial en Maceta", price: "S/ 85.00", detail: "Maceta artesanal ayacuchana" },
    ],
    highlight: "Catálogo interactivo con pedidos a WhatsApp y cobros por Yape",
  },
  {
    id: "hotel",
    name: "Hotel Boutique Umaru",
    subdomain: "hotelumaru.qatu.pe",
    category: "Hospedaje Colonial",
    location: "Centro Histórico, Ayacucho",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    tagline: "Habitaciones coloniales con encanto andino a 2 cuadras de la plaza",
    products: [
      { name: "Habitación Matrimonial Superior", price: "S/ 160.00 / noche", detail: "Cama Queen, vista al patio colonial" },
      { name: "Suite Colonial Balcón", price: "S/ 240.00 / noche", detail: "Vista panorámica y tina hidromasaje" },
      { name: "Habitación Doble Clásica", price: "S/ 140.00 / noche", detail: "Dos camas de plaza y media" },
    ],
    highlight: "Reservas directas de habitaciones sin comisiones a agencias",
  },
  {
    id: "cafe",
    name: "Café Andino Huamanga",
    subdomain: "cafeandino.qatu.pe",
    category: "Café de Especialidad",
    location: "Plaza Mayor, Ayacucho",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    tagline: "Café de valles ayacuchanos, tueste fresco y postres artesanales",
    products: [
      { name: "Capuccino Andino 8oz", price: "S/ 9.50", detail: "Espresso doble con leche vaporizada" },
      { name: "Cheesecake de Sauco Huamanguino", price: "S/ 14.00", detail: "Mermelada artesanal de la región" },
      { name: "Bolsa Café Grano 250g Chungui", price: "S/ 28.00", detail: "Tueste medio artesanal" },
    ],
    highlight: "Carta digital con cobros inmediatos por Yape para delivery y mesa",
  },
];

export function HeroSection() {
  const [subdomainInput, setSubdomainInput] = useState("");
  const [activeStoreIndex, setActiveStoreIndex] = useState(0);

  const activeStore = SHOWCASE_STORES[activeStoreIndex];

  const sanitizedSubdomain = subdomainInput
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");

  const claimUrl = getWhatsAppUrl(
    sanitizedSubdomain
      ? `¡Hola Qatu! Quiero reclamar el subdominio ${sanitizedSubdomain}.qatu.pe para mi negocio.`
      : `¡Hola Qatu! Quiero crear la página web de mi negocio con subdominio propio.`
  );

  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-white border-b border-slate-200/80">
      {/* Subtle warm atmospheric glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-radial from-slate-100/80 via-slate-50/40 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Headline & Value Narrative */}
        <div className="text-center max-w-4xl mx-auto space-y-5">

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.08] sm:leading-[1.1]">
            Tu negocio merece{" "}
            <span className="text-brand-600">
              su propia página web.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Te entregamos tu tienda oficial en{" "}
            <span className="text-slate-900 font-semibold font-mono text-[0.95em] px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200/80">
              tunegocio.qatu.pe
            </span>{" "}
            lista en 3 a 5 días. Catálogo a WhatsApp, cobros con Yape y cero comisiones por venta.
          </p>

          {/* Centered Subdomain Search Bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="p-1.5 sm:p-2 rounded-2xl bg-white border border-slate-300 shadow-xl shadow-slate-200/60 flex flex-col sm:flex-row items-stretch gap-2 transition-all focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-500/10">
              
              <div className="flex-1 flex items-center px-3.5 py-2.5 sm:py-3 bg-slate-50/80 rounded-xl border border-slate-200/80 transition-colors">
                <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                <span className="text-sm font-mono text-slate-400 select-none hidden sm:inline mr-1">
                  https://
                </span>
                <input
                  type="text"
                  value={subdomainInput}
                  onChange={(e) => setSubdomainInput(e.target.value)}
                  placeholder="nombre-de-tu-negocio"
                  className="w-full bg-transparent font-medium text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-hidden font-mono"
                  aria-label="Nombre del subdominio de tu negocio"
                />
                <span className="text-sm font-bold font-mono text-brand-600 select-none ml-1">
                  .qatu.pe
                </span>
              </div>

              <a
                href={claimUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md hover:shadow-brand-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Reclamar mi web</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Instant Real-Time Availability Feedback */}
            <div className="mt-3 flex items-center justify-between text-xs sm:text-sm text-slate-500 px-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <span>
                  {sanitizedSubdomain ? (
                    <>
                      <strong className="text-slate-900 font-bold">{sanitizedSubdomain}.qatu.pe</strong> está disponible para registrar
                    </>
                  ) : (
                    "Escribe tu nombre comercial para verificar disponibilidad"
                  )}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Listo en 3 a 5 días hábiles</span>
              </div>
            </div>

            {/* Micro-Trust Pillars */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span>0% comisiones por venta</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span>Catálogo directo a WhatsApp</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span>Cobros con Yape y Plin</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span>Hosting SSL seguro incluido</span>
              </div>
            </div>

          </div>
        </div>

        {/* HERO PROTAGONIST CANVAS: Live Studio Browser with Real Peruvian Businesses */}
        <div className="mt-10 sm:mt-12 max-w-5xl mx-auto">
          
          {/* Segmented Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">
              Ver tienda de ejemplo:
            </span>
            {SHOWCASE_STORES.map((store, idx) => {
              const isActive = idx === activeStoreIndex;
              return (
                <button
                  key={store.id}
                  onClick={() => setActiveStoreIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  <span>{store.name}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${isActive ? "bg-white/20 text-white" : "text-slate-400"}`}>
                    {store.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Browser Window Frame */}
          <div className="rounded-3xl border border-slate-300 shadow-2xl bg-white overflow-hidden transition-all duration-300">
            
            {/* Top Mac/Browser Chrome Bar */}
            <div className="px-4 py-3 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
              </div>

              {/* Address bar pill */}
              <div className="flex-1 max-w-md mx-auto flex items-center justify-center gap-2 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="truncate">https://{activeStore.subdomain}</span>
              </div>

              {/* Open Real Site CTA */}
              <a
                href={`https://${activeStore.subdomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline shrink-0"
              >
                <span className="hidden sm:inline">Visitar web real</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Browser Content Viewport */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Store Hero Visual Column (5 cols) */}
              <div className="lg:col-span-5 relative h-64 sm:h-72 lg:h-auto min-h-[260px] bg-slate-900 overflow-hidden">
                <Image
                  src={activeStore.image}
                  alt={activeStore.name}
                  fill
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-2.5 py-1 rounded-md bg-white/95 text-slate-900 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs">
                    {activeStore.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl leading-tight drop-shadow-xs">
                    {activeStore.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-200 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                    <span>{activeStore.location}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-2">
                    {activeStore.tagline}
                  </p>
                </div>
              </div>

              {/* Store Interactive Catalog Column (7 cols) */}
              <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between bg-slate-50/50">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Catálogo interactivo en línea
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      Pedidos a WhatsApp activos
                    </span>
                  </div>

                  {/* 3 Real Catalog Products */}
                  <div className="space-y-2.5">
                    {activeStore.products.map((prod, pIdx) => (
                      <div
                        key={pIdx}
                        className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h5 className="font-heading font-bold text-sm text-slate-900 truncate">
                            {prod.name}
                          </h5>
                          <p className="text-xs text-slate-500 truncate">
                            {prod.detail}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-heading font-extrabold text-sm text-brand-600 block">
                            {prod.price}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            Yape / Efectivo
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom WhatsApp Order Preview Strip */}
                <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>{activeStore.highlight}</span>
                  </div>
                  <a
                    href={`https://${activeStore.subdomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors shrink-0"
                  >
                    <span>Probar pedido en vivo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Seamless Metrics & Impact Ribbon */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-slate-200/80 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1.5 md:border-r border-slate-100 last:border-r-0">
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">0%</div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Comisiones por venta</p>
            </div>
            <div className="space-y-1.5 md:border-r border-slate-100 last:border-r-0">
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">3 a 5 días</div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Tu web lista al aire</p>
            </div>
            <div className="space-y-1.5 md:border-r border-slate-100 last:border-r-0">
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">100% Celular</div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Adaptado a WhatsApp</p>
            </div>
            <div className="space-y-1.5">
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">Ayacucho</div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Sede y soporte local</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
