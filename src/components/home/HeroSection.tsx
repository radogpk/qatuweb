"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/config/site";
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  MessageCircle,
  Zap,
  Lock,
  Smartphone,
  Check
} from "lucide-react";

interface DemoBusiness {
  id: string;
  name: string;
  subdomain: string;
  category: string;
  location: string;
  coverImage: string;
  badgeText: string;
  item: {
    title: string;
    price: string;
    image: string;
    desc: string;
  };
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
    item: {
      title: "Ramo 12 Rosas Premium",
      price: "S/ 65.00",
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=300&q=80",
      desc: "Moño de seda fino y tarjeta con dedicatoria.",
    },
    sampleMessage: "¡Hola Las Flores! Quiero pedir 1x Ramo 12 Rosas Premium (S/ 65.00) para entrega en Huamanga.",
  },
  {
    id: "hoteltest",
    name: "Hotel Boutique Umaru",
    subdomain: "hotelumaru.qatu.pe",
    category: "Hospedaje Boutique",
    location: "Centro Histórico, Ayacucho",
    coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    badgeText: "Casona Colonial · Desayuno Incluido",
    item: {
      title: "Habitación Matrimonial Superior",
      price: "S/ 140 / noche",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=300&q=80",
      desc: "Cama Queen, baño privado, agua caliente 24h y WiFi rápido.",
    },
    sampleMessage: "¡Hola Hotel Umaru! Deseo consultar disponibilidad para Habitación Matrimonial del 15 al 18.",
  },
  {
    id: "cafetest",
    name: "Café Andino Huamanga",
    subdomain: "cafeandino.qatu.pe",
    category: "Café de Especialidad",
    location: "Plaza Mayor, Ayacucho",
    coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    badgeText: "Café de Altura · Tostado Propio",
    item: {
      title: "Combo Desayuno Tradicional",
      price: "S/ 24.00",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80",
      desc: "Café espresso o pasado + pan con chicharrón artesanal.",
    },
    sampleMessage: "¡Hola Café Andino! Quiero pedir 1x Combo Desayuno Tradicional para recoger en 15 minutos.",
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
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-20 overflow-hidden bg-white border-b border-slate-200/80">
      {/* Soft atmospheric gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-slate-50 via-white to-white pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Above-the-Fold 2-Column Balanced Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Core Value & Interactive Reservation */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Brand Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
              <span>Plataforma web y catálogo digital para negocios peruanos</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-heading font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Tu negocio en internet con{" "}
              <span className="text-brand-600">
                tu propia web
              </span>{" "}
              y pedidos a WhatsApp.
            </h1>

            {/* Clear Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Te entregamos tu página lista en <strong className="text-slate-900 font-bold">tunegocio.qatu.pe</strong> en 3 a 5 días con catálogo interactivo, cobros directos por Yape/Plin y soporte técnico mensual. Cero comisiones por venta.
            </p>

            {/* Subdomain Claim Interactive Bar */}
            <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-50 border border-slate-300 shadow-card flex flex-col sm:flex-row items-stretch gap-2 transition-all focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 max-w-xl">
              <div className="flex-1 flex items-center px-3.5 py-2.5 bg-white rounded-xl border border-slate-200">
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

            {/* Instant Subdomain Status Feedback */}
            <div className="flex items-center justify-between text-xs text-slate-500 max-w-xl px-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>
                  {sanitizedSubdomain ? (
                    <>
                      <strong className="text-slate-900 font-bold">{sanitizedSubdomain}.qatu.pe</strong> está disponible
                    </>
                  ) : (
                    "Escribe tu nombre comercial para comprobar disponibilidad"
                  )}
                </span>
              </div>
              <span className="text-slate-400 font-medium hidden sm:inline">⚡ Entrega en 3 a 5 días</span>
            </div>

            {/* Trust Badges Row */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>3 a 5 días</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                <span>0% comisiones</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                <Lock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>SSL + Hosting</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                <Smartphone className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span>100% Celular</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Store Window Showcase */}
          <div className="lg:col-span-5 space-y-3">
            
            {/* Store Type Switcher Tabs */}
            <div className="flex items-center justify-between gap-1.5 bg-slate-100 p-1 rounded-2xl">
              {DEMO_BUSINESSES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedDemo(b)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer truncate ${
                    selectedDemo.id === b.id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {b.name.split(" ")[0]} {b.name.split(" ")[1] || ""}
                </button>
              ))}
            </div>

            {/* Interactive Browser Window */}
            <div className="rounded-3xl border border-slate-300 bg-white shadow-xl overflow-hidden">
              
              {/* Browser Address Bar */}
              <div className="bg-slate-100 px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-mono text-slate-700">
                <div className="flex items-center gap-1.5 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-bold text-slate-900">{selectedDemo.subdomain}</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  En línea
                </span>
              </div>

              {/* Store View Content */}
              <div className="p-4 sm:p-5 space-y-4">
                
                {/* Store Header Banner */}
                <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src={selectedDemo.coverImage}
                    alt={selectedDemo.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-brand-600 text-white px-2 py-0.5 rounded shadow-xs inline-block mb-0.5">
                      {selectedDemo.category}
                    </span>
                    <h3 className="text-xl font-heading font-extrabold text-white">
                      {selectedDemo.name}
                    </h3>
                    <p className="text-[11px] text-slate-200">{selectedDemo.location}</p>
                  </div>
                </div>

                {/* Featured Product Card */}
                <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50/80 flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                    <Image
                      src={selectedDemo.item.image}
                      alt={selectedDemo.item.title}
                      fill
                      className="object-cover"
                      sizes="70px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-slate-900 text-xs truncate">
                      {selectedDemo.item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {selectedDemo.item.desc}
                    </p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="font-heading font-extrabold text-brand-600 text-xs">
                        {selectedDemo.item.price}
                      </span>
                      <a
                        href={getWhatsAppUrl(`Hola ${selectedDemo.name}, quiero pedir ${selectedDemo.item.title}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-xs active:scale-95 transition-all"
                      >
                        <MessageCircle className="w-3 h-3 fill-white" />
                        <span>Pedir</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Message Simulation */}
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-950 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      Pedido directo a WhatsApp:
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold text-[9px]">Yape</span>
                      <span className="px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700 font-bold text-[9px]">Plin</span>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-900 italic font-mono bg-white/80 p-2 rounded-xl border border-emerald-200/60">
                    "{selectedDemo.sampleMessage}"
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Supporting Full-Width Ribbon */}
        <div className="mt-14 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-0.5">
              <div className="font-heading font-extrabold text-3xl text-slate-900">0%</div>
              <p className="text-xs text-slate-500 font-medium">Comisiones por venta</p>
            </div>
            <div className="space-y-0.5">
              <div className="font-heading font-extrabold text-3xl text-slate-900">3 a 5 días</div>
              <p className="text-xs text-slate-500 font-medium">Tiempo de entrega</p>
            </div>
            <div className="space-y-0.5">
              <div className="font-heading font-extrabold text-3xl text-slate-900">100% Celular</div>
              <p className="text-xs text-slate-500 font-medium">Catálogo adaptado</p>
            </div>
            <div className="space-y-0.5">
              <div className="font-heading font-extrabold text-3xl text-slate-900">Ayacucho</div>
              <p className="text-xs text-slate-500 font-medium">Sede y soporte local</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
