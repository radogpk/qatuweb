"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/config/site";
import { 
  ArrowUpRight, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Smartphone,
  Globe,
  MessageCircle,
  Check
} from "lucide-react";

export function HeroSection() {
  const [subdomainInput, setSubdomainInput] = useState("");

  const sanitizedSubdomain = subdomainInput
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");

  const claimUrl = getWhatsAppUrl(
    sanitizedSubdomain
      ? `¡Hola Qatu! Quiero reclamar el subdominio ${sanitizedSubdomain}.qatu.pe para mi negocio y crear mi página web.`
      : `¡Hola Qatu! Quiero crear la página web para mi negocio en mi propio subdominio.`
  );

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/80">
      {/* Background Glows for Modern Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-tr from-brand-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-brand-400/5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Mensaje y Simulador de Subdominio */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/70 text-brand-700 text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
              </span>
              <span>Plataforma Digital para Negocios en el Perú</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Tu negocio en internet con{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-500">
                tu propia web
              </span>{" "}
              y pedidos a WhatsApp.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Obtén tu página web profesional en tu propio subdominio (<span className="font-semibold text-slate-900">tunegocio.qatu.pe</span>) con catálogo interactivo, botón para recibir pedidos directos a tu WhatsApp y soporte mensual. Cero comisiones por venta.
            </p>

            {/* Interactive Subdomain Claim Simulator */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card space-y-3">
              <label htmlFor="subdomain-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Verifica la disponibilidad de tu web:
              </label>
              
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="relative flex-1 flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-all">
                  <span className="text-xs sm:text-sm text-slate-400 select-none mr-1 font-mono">https://</span>
                  <input
                    id="subdomain-input"
                    type="text"
                    value={subdomainInput}
                    onChange={(e) => setSubdomainInput(e.target.value)}
                    placeholder="nombre-de-tu-negocio"
                    className="w-full bg-transparent font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal text-sm focus:outline-hidden font-mono"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-brand-600 select-none ml-1 font-mono">
                    .qatu.pe
                  </span>
                </div>

                <a
                  href={claimUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-card hover:shadow-card-hover transition-all active:scale-95 whitespace-nowrap"
                >
                  <span>Reclamar mi web</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Real-time feedback badge */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-medium text-slate-700">
                    {sanitizedSubdomain ? (
                      <>
                        <strong className="text-emerald-700">{sanitizedSubdomain}.qatu.pe</strong> está disponible
                      </>
                    ) : (
                      "Escribe el nombre de tu marca para comprobarlo"
                    )}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  ⚡ Entrega de 3 a 5 días hábiles
                </span>
              </div>
            </div>

            {/* Quick action buttons & links */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/directorio"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors"
              >
                <span>Ver negocios ya activos en la vitrina</span>
                <ArrowUpRight className="w-4 h-4 text-brand-600" />
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                href="/planes"
                className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                Ver planes y precios desde S/ 49/mes
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Mockup Visual de Tienda Activa en Celular */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Background Decoration Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 to-indigo-500/20 rounded-3xl blur-2xl -z-10" />

            {/* Smartphone Mockup */}
            <div className="w-full max-w-[340px] bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800">
              {/* Phone Speaker & Camera Notch */}
              <div className="h-5 flex items-center justify-center mb-1">
                <div className="w-20 h-3.5 bg-slate-800 rounded-full flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                </div>
              </div>

              {/* Phone Screen Container */}
              <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 flex flex-col text-slate-900">
                {/* Browser Address Bar */}
                <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600 font-mono">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span className="font-semibold text-slate-800">lasflores.qatu.pe</span>
                  </div>
                  <span className="text-[10px] text-slate-400">SSL Activo</span>
                </div>

                {/* Simulated Business Header */}
                <div className="relative h-28 w-full bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
                    alt="Florería Las Flores en Qatu"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold font-heading">Florería Las Flores</span>
                      <span className="text-[9px] bg-brand-600 text-white px-1.5 py-0.2 rounded font-semibold">
                        Verificado
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-200">Arreglos florales · Ayacucho</p>
                  </div>
                </div>

                {/* Simulated Store Content */}
                <div className="p-3 space-y-2.5 bg-slate-50/50">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-900 font-heading">Catálogo Destacado</span>
                    <span className="text-emerald-700 font-semibold text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Abierto ahora
                    </span>
                  </div>

                  {/* Product Card 1 */}
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2.5">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=200&q=80"
                        alt="Ramo Rosas"
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">Ramo 12 Rosas Rojas</h4>
                      <p className="text-[10px] text-slate-500 truncate">Moño fino & dedicatoria</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-extrabold text-brand-600">S/ 65.00</span>
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-bold shadow-xs">
                          <MessageCircle className="w-2.5 h-2.5" />
                          <span>Pedir</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Badges in App */}
                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 px-1">
                    <span>Acepta:</span>
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 text-[9px]">Yape</span>
                      <span className="px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700 text-[9px]">Plin</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px]">Efectivo</span>
                    </div>
                  </div>

                  {/* Live Order Simulation Toast */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 flex items-center gap-2 text-[10px] text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Pedido recibido directo a tu WhatsApp con el detalle listo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Metric 1 */}
            <div className="absolute -bottom-4 -left-4 sm:-left-8 bg-white p-3 rounded-xl border border-slate-200 shadow-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                0%
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">0% comisiones</p>
                <p className="text-[11px] text-slate-500">100% de tus ventas para ti</p>
              </div>
            </div>

            {/* Floating Metric 2 */}
            <div className="absolute top-8 -right-2 sm:-right-6 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xl flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">Listo en 3 días</p>
                <p className="text-[10px] text-slate-500">Diseñado a medida</p>
              </div>
            </div>

          </div>
        </div>

        {/* Feature Value Grid */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Subdominio Propio</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  tunegocio.qatu.pe con hosting de alta velocidad y certificado SSL incluido.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Pedidos a WhatsApp</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tus clientes eligen los productos y el pedido te llega formateado al WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Cobro con Yape y Plin</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Muestra tus códigos QR y números para cobrar al instante sin comisiones de pasarela.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Soporte y Cambios</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Nosotros nos encargamos de actualizar tus precios, fotos y menú cada mes.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
