"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/config/site";
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Store
} from "lucide-react";

interface DemoBusiness {
  id: string;
  name: string;
  subdomain: string;
  category: string;
  location: string;
  coverImage: string;
  badgeText: string;
  items: {
    title: string;
    price: string;
    image: string;
    desc: string;
  }[];
  sampleMessage: string;
}

const DEMO_BUSINESSES: DemoBusiness[] = [
  {
    id: "floreriatest",
    name: "Florería Las Flores",
    subdomain: "lasflores.qatu.pe",
    category: "Florería & Regalos",
    location: "Jr. 28 de Julio, Huamanga",
    coverImage: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    badgeText: "Arreglos Florales · Envíos Hoy",
    items: [
      {
        title: "Ramo 12 Rosas Premium",
        price: "S/ 65.00",
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=300&q=80",
        desc: "Moño de seda, follaje fino y tarjeta con dedicatoria.",
      },
      {
        title: "Caja Tulipanes & Girasoles",
        price: "S/ 85.00",
        image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=300&q=80",
        desc: "Arreglo primaveral fresco con base de madera artesanal.",
      },
    ],
    sampleMessage: "¡Hola Las Flores! Quiero pedir 1x Ramo 12 Rosas Premium (S/ 65.00) para entrega hoy en Huamanga.",
  },
  {
    id: "hoteltest",
    name: "Hotel Boutique Umaru",
    subdomain: "hotelumaru.qatu.pe",
    category: "Hospedaje & Turismo",
    location: "Centro Histórico, Ayacucho",
    coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    badgeText: "Casona Colonial · Desayuno Incluido",
    items: [
      {
        title: "Habitación Matrimonial Superior",
        price: "S/ 140 / noche",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=300&q=80",
        desc: "Cama Queen, baño privado, agua caliente 24h y WiFi de alta velocidad.",
      },
      {
        title: "Suite Colonial con Balcón",
        price: "S/ 190 / noche",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&q=80",
        desc: "Vista a la plaza, arquitectura virreinal y ambiente acogedor.",
      },
    ],
    sampleMessage: "¡Hola Hotel Umaru! Deseo consultar disponibilidad para Habitación Matrimonial del 15 al 18 de este mes.",
  },
  {
    id: "cafetest",
    name: "Café del Centro",
    subdomain: "cafedelcentro.qatu.pe",
    category: "Cafetería de Especialidad",
    location: "Portal Constitución, Ayacucho",
    coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    badgeText: "Café Ayacuchano · Tostado Propio",
    items: [
      {
        title: "Combo Desayuno Tradicional",
        price: "S/ 24.00",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80",
        desc: "Café pasado o espresso + pan con chicharrón artesanal.",
      },
      {
        title: "Bolsa Café de Origen 250g",
        price: "S/ 32.00",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&q=80",
        desc: "Grano selecto del VRAEM con notas a chocolate y miel.",
      },
    ],
    sampleMessage: "¡Hola Café del Centro! Quiero pedir 1x Combo Desayuno Tradicional para recoger en 15 minutos.",
  },
];

export function HeroSection() {
  const [subdomainInput, setSubdomainInput] = useState("");
  const [selectedDemo, setSelectedDemo] = useState<DemoBusiness>(DEMO_BUSINESSES[0]);

  const sanitizedSubdomain = subdomainInput
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");

  const claimUrl = getWhatsAppUrl(
    sanitizedSubdomain
      ? `¡Hola Qatu! Quiero reclamar el subdominio ${sanitizedSubdomain}.qatu.pe para mi negocio.`
      : `¡Hola Qatu! Quiero información para crear la página web de mi negocio.`
  );

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-white border-b border-slate-200/80">
      {/* Soft atmospheric gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-slate-100/80 via-white to-white pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Center Container */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Eyebrow Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            <span>Infraestructura digital para negocios de Ayacucho y Perú</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Tu propia web en internet con{" "}
            <span className="text-brand-600">
              pedidos directos a WhatsApp.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Te entregamos tu sitio en <strong className="text-slate-900 font-semibold">tunegocio.qatu.pe</strong> en menos de 5 días. Con catálogo interactivo, cobro directo con Yape o Plin y soporte de personas reales. Cero comisiones por venta.
          </p>

          {/* Subdomain Claim Interactive Bar */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-50 border border-slate-300 shadow-card flex flex-col sm:flex-row items-stretch gap-2 transition-all focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
              <div className="flex-1 flex items-center px-3 py-2 bg-white rounded-xl border border-slate-200">
                <span className="text-xs text-slate-400 font-mono select-none mr-1">qatu.pe/</span>
                <input
                  type="text"
                  value={subdomainInput}
                  onChange={(e) => setSubdomainInput(e.target.value)}
                  placeholder="nombre-de-tu-negocio"
                  className="w-full bg-transparent font-medium text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden font-mono"
                />
              </div>

              <a
                href={claimUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-card hover:shadow-card-hover transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Reclamar mi web</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Instant Subdomain Status */}
            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 px-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>
                  {sanitizedSubdomain ? (
                    <>
                      <strong className="text-slate-900 font-bold">{sanitizedSubdomain}.qatu.pe</strong> está disponible
                    </>
                  ) : (
                    "Escribe tu nombre comercial para verificar disponibilidad"
                  )}
                </span>
              </div>
              <span className="text-slate-400 hidden sm:inline font-medium">Entrega en 3 a 5 días</span>
            </div>
          </div>
        </div>

        {/* The Hero Centerpiece: Interactive Live Store Showcase */}
        <div className="mt-14 max-w-4xl mx-auto">
          {/* Showcase Category Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 mb-4 overflow-x-auto pb-1">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mr-2 hidden sm:inline">
              Ver tienda de ejemplo:
            </span>
            {DEMO_BUSINESSES.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedDemo(b)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedDemo.id === b.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>

          {/* Browser Window Mockup Frame */}
          <div className="rounded-3xl border border-slate-300 bg-white shadow-2xl overflow-hidden">
            {/* Window Browser Header */}
            <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 max-w-md mx-auto bg-white rounded-lg px-3 py-1.5 border border-slate-200 flex items-center justify-between text-xs text-slate-700 font-mono shadow-2xs">
                <div className="flex items-center gap-1.5 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-900">{selectedDemo.subdomain}</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                  SSL Activo
                </span>
              </div>

              <div className="text-xs text-slate-400 hidden sm:flex items-center gap-1 font-medium">
                <span>Qatu Engine</span>
              </div>
            </div>

            {/* Window Content: Live Store View */}
            <div className="p-5 sm:p-8 space-y-6">
              {/* Store Cover Header Banner */}
              <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src={selectedDemo.coverImage}
                  alt={selectedDemo.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-brand-600 text-white text-xs font-bold uppercase tracking-wider mb-1 shadow-xs">
                      {selectedDemo.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white drop-shadow-xs">
                      {selectedDemo.name}
                    </h3>
                    <p className="text-xs text-slate-200 mt-0.5">{selectedDemo.location}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                      {selectedDemo.badgeText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Store Catalog Items Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                    Catálogo de Productos & Precios
                  </h4>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Pedidos abiertos
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedDemo.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 flex items-center gap-3.5 transition-all"
                    >
                      <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-heading font-bold text-slate-900 text-sm truncate">
                          {item.title}
                        </h5>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {item.desc}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-heading font-extrabold text-slate-900 text-sm text-brand-600">
                            {item.price}
                          </span>
                          <a
                            href={getWhatsAppUrl(`Hola ${selectedDemo.name}, quiero pedir ${item.title}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                          >
                            <MessageCircle className="w-3 h-3 fill-white" />
                            <span>Pedir</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Simulation Callout */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-emerald-950 block">
                      Así llega el pedido al WhatsApp del negocio:
                    </span>
                    <p className="text-emerald-800 italic mt-0.5 font-mono">
                      "{selectedDemo.sampleMessage}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-bold text-slate-500">Cobro:</span>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-bold text-[11px]">Yape</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-700 font-bold text-[11px]">Plin</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Trust Badges Ribbon */}
        <div className="mt-14 max-w-4xl mx-auto pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">0%</div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Comisiones por venta</p>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">3 a 5 días</div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Entrega lista al aire</p>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">100% Móvil</div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Catálogo y WhatsApp</p>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">Soporte Local</div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Ayacucho y todo el Perú</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
