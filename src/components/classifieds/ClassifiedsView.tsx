"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ClassifiedAd } from "@/lib/types/classified";
import { getWhatsAppUrl } from "@/lib/config/site";
import { 
  Search, 
  MapPin, 
  Tag, 
  MessageCircle, 
  PlusCircle, 
  Phone, 
  Sparkles,
  Building,
  RefreshCw,
  ShoppingBag,
  CheckCircle2,
  SlidersHorizontal,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Eye,
  Check,
  Zap,
  ArrowRight
} from "lucide-react";

interface ClassifiedsViewProps {
  initialAds: ClassifiedAd[];
}

export function ClassifiedsView({ initialAds }: ClassifiedsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("todos");
  const [selectedZone, setSelectedZone] = useState<string>("todas");
  const [selectedAdForModal, setSelectedAdForModal] = useState<ClassifiedAd | null>(null);

  const categories = [
    { id: "todos", label: "Todas las Oportunidades", count: initialAds.length, icon: Sparkles },
    { id: "alquiler", label: "Locales y Stands", count: initialAds.filter(a => a.type === "alquiler").length, icon: Building },
    { id: "traspaso", label: "Traspasos de Negocios", count: initialAds.filter(a => a.type === "traspaso").length, icon: RefreshCw },
    { id: "venta", label: "Equipamiento Comercial", count: initialAds.filter(a => a.type === "venta").length, icon: ShoppingBag },
  ];

  // Extract unique zones for quick filter
  const zones = useMemo(() => {
    const set = new Set<string>();
    initialAds.forEach((ad) => {
      if (ad.zone) set.add(ad.zone);
    });
    return ["todas", ...Array.from(set)];
  }, [initialAds]);

  // Featured ad for hero spotlight
  const featuredAd = useMemo(() => {
    return initialAds.find((a) => a.featured) || initialAds[0];
  }, [initialAds]);

  const filteredAds = useMemo(() => {
    return initialAds.filter((ad) => {
      const matchesType = selectedType === "todos" || ad.type === selectedType;
      const matchesZone = selectedZone === "todas" || ad.zone === selectedZone;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        ad.title.toLowerCase().includes(q) ||
        ad.description.toLowerCase().includes(q) ||
        ad.location.toLowerCase().includes(q) ||
        ad.zone?.toLowerCase().includes(q) ||
        ad.tags.some((t) => t.toLowerCase().includes(q)) ||
        ad.specs?.some((s) => s.value.toLowerCase().includes(q) || s.label.toLowerCase().includes(q));

      return matchesType && matchesZone && matchesSearch;
    });
  }, [initialAds, searchTerm, selectedType, selectedZone]);

  return (
    <div className="space-y-12 pb-24">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative bg-slate-950 text-white overflow-hidden pt-12 pb-16 lg:py-20 border-b border-slate-800">
        {/* Ambient atmospheric gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Col: Master Editorial Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-300 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">{initialAds.length} Oportunidades comerciales</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">Ayacucho 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1]">
                Locales, traspasos y equipamiento para tu negocio.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                El espacio de encuentro directo entre propietarios y emprendedores en Huamanga. Sin agentes inmobiliarios, <span className="text-white font-semibold underline decoration-brand-500 decoration-2 underline-offset-4">sin comisiones de intermediación</span> y con contacto 100% directo por WhatsApp.
              </p>

              {/* Quick Hero Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href={getWhatsAppUrl("Hola Qatu, quiero publicar mi local comercial / traspaso / maquinaria en el tablón.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-lg shadow-brand-600/25 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publicar mi aviso gratis</span>
                </a>

                <a
                  href="#listado"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4 text-slate-400" />
                  <span>Explorar {initialAds.length} avisos</span>
                </a>
              </div>

              {/* Trust Ribbon */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>0% comisiones por venta o alquiler</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Trato directo con el propietario</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Publicación rápida en el día</span>
                </div>
              </div>
            </div>

            {/* Right Col: Featured "Oportunidad de la Semana" Spotlight Card */}
            {featuredAd && (
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl p-1 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl shadow-slate-950">
                  <div className="bg-slate-900 rounded-[22px] overflow-hidden">
                    
                    {/* Header bar of spotlight */}
                    <div className="px-5 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[11px] font-bold uppercase tracking-wider">
                          🔥 Oportunidad Destacada
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">{featuredAd.publishedAt}</span>
                    </div>

                    {/* Spotlight Image */}
                    <div className="relative h-56 w-full bg-slate-800 overflow-hidden group">
                      <Image
                        src={featuredAd.imageUrl}
                        alt={featuredAd.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 450px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-xl bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-md border border-slate-700">
                          {featuredAd.typeLabel}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <div>
                          <p className="text-[11px] font-medium text-slate-300 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-brand-400" />
                            <span>{featuredAd.zone}</span>
                          </p>
                          <p className="text-2xl font-heading font-extrabold text-white">
                            {featuredAd.priceText}{" "}
                            <span className="text-xs text-slate-300 font-normal font-sans">
                              {featuredAd.periodLabel}
                            </span>
                          </p>
                        </div>

                        <button
                          onClick={() => setSelectedAdForModal(featuredAd)}
                          className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver Ficha</span>
                        </button>
                      </div>
                    </div>

                    {/* Spotlight Details */}
                    <div className="p-5 space-y-4">
                      <h3 className="text-base font-heading font-bold text-white line-clamp-2 leading-snug">
                        {featuredAd.title}
                      </h3>

                      {/* Specs Row */}
                      {featuredAd.specs && (
                        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                          {featuredAd.specs.slice(0, 4).map((spec, i) => (
                            <div key={i} className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/50">
                              <span className="text-slate-400 text-[10px] block">{spec.label}</span>
                              <span className="font-semibold text-slate-200 truncate block">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CTAs */}
                      <div className="pt-2 flex items-center gap-2">
                        <a
                          href={`https://wa.me/${featuredAd.contactWhatsapp}?text=${encodeURIComponent(
                            `Hola, vi la oportunidad destacada en Qatu sobre "${featuredAd.title}" y deseo más información.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-emerald-950"
                        >
                          <MessageCircle className="w-4 h-4 fill-white" />
                          <span>Preguntar por WhatsApp</span>
                        </a>

                        <button
                          onClick={() => setSelectedAdForModal(featuredAd)}
                          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                          title="Ver ficha completa"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE SEARCH & CATEGORIES CAPSULE */}
      <div id="listado" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-5">
          
          {/* Main Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por local, mampara, Jr. 28 de Julio, Bellido, cafetería, vitrina..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedType === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedType(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2.5 cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "text-brand-400" : "text-slate-500"}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isSelected ? "bg-white/20 text-white" : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Zone and Status Sub-filters */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-slate-400 font-medium whitespace-nowrap">Filtrar por zona:</span>
              {zones.map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                    selectedZone === zone
                      ? "bg-brand-50 text-brand-700 border border-brand-200 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 border border-transparent"
                  }`}
                >
                  {zone === "todas" ? "Todas las zonas" : zone}
                </button>
              ))}
            </div>

            {(searchTerm || selectedType !== "todos" || selectedZone !== "todas") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("todos");
                  setSelectedZone("todas");
                }}
                className="text-brand-600 hover:text-brand-700 font-semibold cursor-pointer flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Restablecer filtros</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 3. LISTINGS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              {selectedType === "todos" 
                ? "Todas las oportunidades comerciales" 
                : categories.find(c => c.id === selectedType)?.label}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Mostrando <strong className="text-slate-900 font-bold">{filteredAds.length}</strong> {filteredAds.length === 1 ? "aviso disponible" : "avisos disponibles"}
            </p>
          </div>
        </div>

        {/* Ads Grid */}
        {filteredAds.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-heading font-bold text-slate-900">No encontramos avisos con esos filtros</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Intenta con otra palabra clave o cambia los filtros de categoría y zona para ver más locales o equipamiento.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedType("todos");
                setSelectedZone("todas");
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
            >
              Ver todos los avisos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredAds.map((ad) => (
              <article
                key={ad.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-56 w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setSelectedAdForModal(ad)}>
                    <Image
                      src={ad.imageUrl}
                      alt={ad.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Top overlay badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-xl bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-md">
                        {ad.typeLabel}
                      </span>
                    </div>

                    <div className="absolute top-3.5 right-3.5">
                      <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-heading font-extrabold text-xs shadow-xs">
                        {ad.priceText}{" "}
                        {ad.periodLabel && (
                          <span className="text-[10px] font-normal font-sans opacity-90">
                            {ad.periodLabel}
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Bottom gradient with Zone */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3.5">
                      <span className="text-white text-xs font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                        <span className="truncate">{ad.zone || ad.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Trato Directo</span>
                      </span>
                      <span>{ad.publishedAt}</span>
                    </div>

                    <h3 
                      onClick={() => setSelectedAdForModal(ad)}
                      className="font-heading font-bold text-lg text-slate-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2 cursor-pointer"
                    >
                      {ad.title}
                    </h3>

                    {/* Specs chips */}
                    {ad.specs && ad.specs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {ad.specs.slice(0, 3).map((spec, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold flex items-center gap-1"
                          >
                            <span className="text-slate-400 font-normal">{spec.label}:</span>
                            <span>{spec.value}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 pt-1">
                      {ad.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 sm:p-6 pt-0">
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedAdForModal(ad)}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Ver ficha</span>
                    </button>

                    <a
                      href={`https://wa.me/${ad.contactWhatsapp}?text=${encodeURIComponent(
                        `Hola, vi tu aviso en Qatu.pe sobre "${ad.title}" y deseo más información.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs active:scale-95 transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${ad.contactPhone}`}
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center"
                      title="Llamar al anunciante"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. CONCIERGE PUBLISHING EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider">
                Publicación 100% Gratuita
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight leading-tight">
                ¿Tienes un local desocupado o equipamiento comercial para vender?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Llega directamente a comerciantes y emprendedores activos en Ayacucho. Sin formularios largos ni cobros ocultos: nos envías tus fotos por WhatsApp y lo activamos con tu contacto directo.
              </p>

              {/* 3 Simple Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white font-bold text-xs flex items-center justify-center">1</span>
                  <p className="text-xs font-bold text-white">Envía fotos y precio</p>
                  <p className="text-[11px] text-slate-400">Por WhatsApp con la dirección del local.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white font-bold text-xs flex items-center justify-center">2</span>
                  <p className="text-xs font-bold text-white">Armamos la ficha</p>
                  <p className="text-[11px] text-slate-400">Con diseño profesional y especificaciones.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white font-bold text-xs flex items-center justify-center">3</span>
                  <p className="text-xs font-bold text-white">Trato 100% directo</p>
                  <p className="text-[11px] text-slate-400">Los interesados te llaman directamente a ti.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-4 text-center lg:text-right">
              <a
                href={getWhatsAppUrl("Hola Qatu, deseo publicar mi aviso de alquiler/traspaso/equipamiento comercial.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-xl shadow-brand-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Publicar mi aviso por WhatsApp</span>
              </a>
              <span className="text-xs text-slate-400">
                Respuesta en menos de 2 horas en horario comercial.
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 5. MODAL: DETAILED FICHA TÉCNICA DEL AVISO */}
      {selectedAdForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with Close */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-xs font-semibold">
                  {selectedAdForModal.typeLabel}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedAdForModal.publishedAt}
                </span>
              </div>
              <button
                onClick={() => setSelectedAdForModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                title="Cerrar ficha"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Photo */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src={selectedAdForModal.imageUrl}
                  alt={selectedAdForModal.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3.5 right-3.5">
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-heading font-extrabold text-sm shadow-md">
                    {selectedAdForModal.priceText}{" "}
                    {selectedAdForModal.periodLabel && (
                      <span className="text-xs font-normal font-sans opacity-90">
                        {selectedAdForModal.periodLabel}
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Title & Location */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 leading-snug">
                  {selectedAdForModal.title}
                </h3>
                <p className="text-sm text-slate-600 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>{selectedAdForModal.location}</span>
                </p>
              </div>

              {/* Technical Specifications */}
              {selectedAdForModal.specs && selectedAdForModal.specs.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Ficha Técnica y Condiciones
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                    {selectedAdForModal.specs.map((spec, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] text-slate-500 block font-medium">{spec.label}</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 block">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Descripción Detallada
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-line">
                  {selectedAdForModal.description}
                </p>
              </div>

              {/* Verified badge reassurance */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-xs text-emerald-800 leading-snug">
                  <strong>Trato directo garantizado:</strong> Qatu no cobra comisiones ni participa en la negociación. Coordinas las visitas y el pago directamente con el dueño.
                </p>
              </div>
            </div>

            {/* Modal Sticky Footer CTAs */}
            <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`tel:${selectedAdForModal.contactPhone}`}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar {selectedAdForModal.contactPhone}</span>
              </a>

              <a
                href={`https://wa.me/${selectedAdForModal.contactWhatsapp}?text=${encodeURIComponent(
                  `Hola, vi la ficha en Qatu de "${selectedAdForModal.title}" y deseo coordinar una visita / más información.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Contactar por WhatsApp ahora</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

