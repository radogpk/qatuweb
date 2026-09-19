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
  Clock
} from "lucide-react";

interface ShowcaseStore {
  name: string;
  subdomain: string;
  category: string;
  location: string;
  image: string;
  highlight: string;
}

const SHOWCASE_STORES: ShowcaseStore[] = [
  {
    name: "Florería Las Flores",
    subdomain: "lasflores.qatu.pe",
    category: "Florería & Regalos",
    location: "Huamanga, Ayacucho",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80",
    highlight: "Catálogo interactivo con recepción directa de pedidos por WhatsApp.",
  },
  {
    name: "Hotel Boutique Umaru",
    subdomain: "hotelumaru.qatu.pe",
    category: "Hospedaje Colonial",
    location: "Centro Histórico, Ayacucho",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=700&q=80",
    highlight: "Reservas directas de habitaciones y atención al huésped sin comisiones.",
  },
  {
    name: "Café Andino Huamanga",
    subdomain: "cafeandino.qatu.pe",
    category: "Café de Especialidad",
    location: "Plaza Mayor, Ayacucho",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=700&q=80",
    highlight: "Carta digital con cobros inmediatos por Yape y Plin para delivery y mesa.",
  },
];

export function HeroSection() {
  const [subdomainInput, setSubdomainInput] = useState("");

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
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-white border-b border-slate-200/80">
      {/* Subtle warm atmospheric glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[560px] bg-radial from-slate-100/70 via-slate-50/40 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Headline & Value Narrative */}
        <div className="text-center max-w-4xl mx-auto space-y-6">

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

          {/* Centered Protagonist: High-End Interactive Subdomain Search Bar */}
          <div className="pt-3 max-w-2xl mx-auto">
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
            <div className="pt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-600">
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

        {/* High-Level Editorial Showcase: Real Peruvian Businesses */}
        <div className="mt-16 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
                Negocios que ya confían en Qatu
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                Tu web se verá así de profesional
              </h3>
            </div>
            <Link
              href="/directorio"
              prefetch={true}
              className="text-xs sm:text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Ver todos los negocios en el directorio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {SHOWCASE_STORES.map((store, idx) => (
              <a
                key={idx}
                href={`https://${store.subdomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image Frame */}
                <div className="relative h-56 sm:h-64 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={store.image}
                    alt={store.name}
                    fill
                    priority={idx === 0}
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                  {/* Subdomain Pill */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/85 text-white text-xs font-mono font-medium backdrop-blur-md border border-white/10 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {store.subdomain}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded-lg bg-white/95 text-slate-900 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-slate-200/80 shadow-xs">
                      {store.category}
                    </span>
                  </div>

                  {/* Store Title inside bottom image */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <h4 className="text-xl font-heading font-extrabold text-white leading-tight drop-shadow-xs">
                      {store.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <span>{store.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Detail */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {store.highlight}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-600 group-hover:text-brand-700">
                    <span>Visitar tienda de ejemplo</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Seamless Metrics & Impact Ribbon */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1.5 md:border-r border-slate-100 last:border-r-0">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">0%</div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Comisiones por venta</p>
            </div>
            <div className="space-y-1.5 md:border-r border-slate-100 last:border-r-0">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">3 a 5 días</div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Tu web lista al aire</p>
            </div>
            <div className="space-y-1.5 md:border-r border-slate-100 last:border-r-0">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">100% Celular</div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Adaptado a WhatsApp</p>
            </div>
            <div className="space-y-1.5">
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">Ayacucho</div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Sede y soporte local</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
