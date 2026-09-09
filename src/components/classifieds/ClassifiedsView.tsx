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
  Filter, 
  Phone, 
  Clock, 
  Sparkles,
  Building,
  RefreshCw,
  ShoppingBag,
  Check
} from "lucide-react";

interface ClassifiedsViewProps {
  initialAds: ClassifiedAd[];
}

export function ClassifiedsView({ initialAds }: ClassifiedsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("todos");

  const categories = [
    { id: "todos", label: "Todos", count: initialAds.length, icon: Building },
    { id: "alquiler", label: "Locales y Stands", count: initialAds.filter(a => a.type === "alquiler").length, icon: Building },
    { id: "traspaso", label: "Traspasos de Negocios", count: initialAds.filter(a => a.type === "traspaso").length, icon: RefreshCw },
    { id: "venta", label: "Equipamiento y Maquinaria", count: initialAds.filter(a => a.type === "venta").length, icon: ShoppingBag },
  ];

  const filteredAds = useMemo(() => {
    return initialAds.filter((ad) => {
      const matchesType = selectedType === "todos" || ad.type === selectedType;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        ad.title.toLowerCase().includes(q) ||
        ad.description.toLowerCase().includes(q) ||
        ad.location.toLowerCase().includes(q) ||
        ad.tags.some((t) => t.toLowerCase().includes(q));

      return matchesType && matchesSearch;
    });
  }, [initialAds, searchTerm, selectedType]);

  return (
    <div className="space-y-10">
      {/* Top Banner & Fast Publish Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Tablón de Oportunidades Comerciales</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
            Encuentra o publica tu oportunidad de negocio
          </h2>
          <p className="text-sm text-slate-600 max-w-xl">
            Locales comerciales disponibles en zonas céntricas de Ayacucho, traspasos en funcionamiento y compra/venta de maquinaria sin comisiones de intermediación.
          </p>
        </div>

        <a
          href={getWhatsAppUrl("Hola Qatu, deseo publicar un anuncio comercial de alquiler/traspaso/equipamiento en la web.")}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-card hover:shadow-card-hover flex items-center gap-2 transition-all active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publicar mi aviso gratis</span>
        </a>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-card space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por local, stand, traspaso, vitrina, ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedType(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  selectedType === cat.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  selectedType === cat.id ? "bg-white/20 text-white" : "bg-white text-slate-700"
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-2">
        <span>
          Mostrando <strong className="text-slate-900 font-bold">{filteredAds.length}</strong> avisos disponibles
        </span>
        {(searchTerm || selectedType !== "todos") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedType("todos");
            }}
            className="text-brand-600 hover:underline font-semibold"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* 3-Column Balanced Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredAds.map((ad) => (
          <article
            key={ad.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group h-full"
          >
            <div>
              {ad.imageUrl && (
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
                      {ad.priceText}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-700 truncate">
                    <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                    <span className="truncate">{ad.location}</span>
                  </span>
                  <span className="shrink-0">{ad.publishedAt}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                  {ad.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {ad.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ad.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

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

      {/* How to Publish Guide Box */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Publicación Gratuita
            </span>
            <h3 className="text-2xl font-heading font-extrabold text-slate-900">
              ¿Tienes un local, traspaso o maquinaria comercial para publicar?
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
