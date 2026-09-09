"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ClassifiedAd } from "@/lib/types/classified";
import { getWhatsAppUrl } from "@/lib/config/site";
import { 
  Search, 
  MapPin, 
  MessageCircle, 
  PlusCircle, 
  Phone, 
  Megaphone,
  Check,
  Building,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  X,
  Filter
} from "lucide-react";

interface ClassifiedsViewProps {
  initialAds: ClassifiedAd[];
}

export function ClassifiedsView({ initialAds }: ClassifiedsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("todos");
  const [selectedZone, setSelectedZone] = useState<string>("todas");

  const categories = [
    { id: "todos", label: "Todos", count: initialAds.length, icon: Sparkles },
    { id: "alquiler", label: "Locales y Stands", count: initialAds.filter(a => a.type === "alquiler").length, icon: Building },
    { id: "traspaso", label: "Traspasos de Negocios", count: initialAds.filter(a => a.type === "traspaso").length, icon: RefreshCw },
    { id: "venta", label: "Equipamiento Comercial", count: initialAds.filter(a => a.type === "venta").length, icon: ShoppingBag },
  ];

  // Unique zones for filtering
  const zones = useMemo(() => {
    const set = new Set<string>();
    initialAds.forEach((ad) => {
      if (ad.zone) set.add(ad.zone);
    });
    return ["todas", ...Array.from(set)];
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
        ad.tags.some((t) => t.toLowerCase().includes(q));

      return matchesType && matchesZone && matchesSearch;
    });
  }, [initialAds, searchTerm, selectedType, selectedZone]);

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 1. SINGLE, ELEGANT HEADER (Zero duplicate boxes, matches the rest of Qatu) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold">
            <Megaphone className="w-3.5 h-3.5 text-brand-600" />
            <span>Tablón Comercial & Oportunidades</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Anuncios, Alquileres y Traspasos
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Un espacio de encuentro directo para comerciantes y emprendedores: encuentra o publica locales en alquiler, traspasos de negocios en marcha y compra/venta de equipamiento comercial en Ayacucho.
          </p>

          {/* Micro trust indicators */}
          <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              0% comisiones por intermediación
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              Trato directo con el dueño
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              Contacto directo por WhatsApp
            </span>
          </div>
        </div>

        {/* Action Button: Publicar mi aviso gratis */}
        <div className="shrink-0">
          <a
            href={getWhatsAppUrl("Hola Qatu, deseo publicar un aviso comercial de alquiler/traspaso/equipamiento en la web.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-card hover:shadow-card-hover transition-all active:scale-95 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publicar mi aviso gratis</span>
          </a>
        </div>
      </div>

      {/* 2. UNIFIED SEARCH & CATEGORY FILTER BAR */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-card space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por local, stand, traspaso, vitrina, Jr. 28 de Julio, Bellido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedType === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedType(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isSelected ? "bg-white/20 text-white" : "bg-white text-slate-700"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Zone chips */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Filtrar por zona:</span>
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                selectedZone === zone
                  ? "bg-brand-50 text-brand-700 border border-brand-200 font-semibold"
                  : "text-slate-600 hover:bg-slate-100 border border-transparent"
              }`}
            >
              {zone === "todas" ? "Todas las zonas" : zone}
            </button>
          ))}
        </div>
      </div>

      {/* 3. RESULTS COUNTER */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-1">
        <span>
          Mostrando <strong className="text-slate-900 font-bold">{filteredAds.length}</strong> {filteredAds.length === 1 ? "aviso disponible" : "avisos disponibles"}
        </span>
        {(searchTerm || selectedType !== "todos" || selectedZone !== "todas") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedType("todos");
              setSelectedZone("todas");
            }}
            className="text-brand-600 hover:underline font-semibold cursor-pointer"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* 4. BALANCED 3-COLUMN ADS GRID */}
      {filteredAds.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 shadow-card">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-heading font-extrabold text-slate-900">
            No encontramos avisos con esos criterios
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Intenta con otro término de búsqueda o selecciona otra categoría para ver más opciones en Ayacucho.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedType("todos");
              setSelectedZone("todas");
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Ver todos los avisos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredAds.map((ad) => (
            <article
              key={ad.id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group h-full"
            >
              <div>
                {/* Photo with clean badges */}
                <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={ad.imageUrl}
                    alt={ad.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3.5 left-3.5">
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
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700 truncate">
                      <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      <span className="truncate">{ad.zone || ad.location}</span>
                    </span>
                    <span className="shrink-0">{ad.publishedAt}</span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                    {ad.title}
                  </h3>

                  {/* Specs Chips */}
                  {ad.specs && ad.specs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {ad.specs.slice(0, 3).map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          <span className="text-slate-400 font-normal">{spec.label}: </span>
                          {spec.value}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {ad.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 sm:p-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${ad.contactPhone}`}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center"
                    title="Llamar al anunciante"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://wa.me/${ad.contactWhatsapp}?text=${encodeURIComponent(
                      `Hola, vi tu aviso en Qatu.pe sobre "${ad.title}" y deseo más información.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Preguntar por WhatsApp</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 5. PUBLISH GUIDE BANNER (Warm, clear, matching the rest of the site) */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Publicación Gratuita
            </span>
            <h3 className="text-2xl font-heading font-extrabold text-slate-900">
              ¿Tienes un local, traspaso o equipamiento comercial para publicar?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Publicamos tu aviso sin costo en el tablón de Qatu. Solo envíanos tus fotos, la dirección y el precio por WhatsApp y lo subimos en el día con tu número de contacto directo.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>0% comisiones por intermediación</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>Trato directo con los interesados</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <a
              href={getWhatsAppUrl("Hola Qatu, quiero publicar mi aviso de alquiler/traspaso/venta en el tablón.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-card active:scale-95 transition-all"
            >
              <span>Publicar mi aviso por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


