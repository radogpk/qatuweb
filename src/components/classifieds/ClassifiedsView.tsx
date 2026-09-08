"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ClassifiedAd } from "@/lib/types/classified";
import { getWhatsAppUrl } from "@/lib/config/site";
import { Search, MapPin, Tag, MessageCircle, PlusCircle, Filter } from "lucide-react";

interface ClassifiedsViewProps {
  initialAds: ClassifiedAd[];
}

export function ClassifiedsView({ initialAds }: ClassifiedsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("todos");

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
    <div className="space-y-8">
      {/* Top Banner & Publish CTA */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <Tag className="w-3.5 h-3.5" />
            <span>Tablón de Oportunidades Comerciales</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
            Alquileres, traspasos y equipamiento para negocios
          </h2>
          <p className="text-sm text-slate-600 max-w-xl">
            Encuentra locales comerciales disponibles, traspasos de negocios en marcha y maquinaria o vitrinas en Ayacucho y la región.
          </p>
        </div>

        <a
          href={getWhatsAppUrl("Hola Qatu, deseo publicar un anuncio de alquiler/venta/traspaso en el tablón comercial.")}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold shadow-card hover:shadow-card-hover flex items-center gap-2 transition-all active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publicar aviso comercial</span>
        </a>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-card space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por local, stand, traspaso, vitrina, ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-1 hidden sm:inline" />
          {[
            { id: "todos", label: "Todos los avisos" },
            { id: "alquiler", label: "Alquileres de locales" },
            { id: "traspaso", label: "Traspasos de negocios" },
            { id: "venta", label: "Venta de equipamiento" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedType(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedType === cat.id
                  ? "bg-brand-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-1">
        <span>
          Mostrando <strong className="text-slate-900 font-bold">{filteredAds.length}</strong> avisos comerciales disponibles
        </span>
      </div>

      {/* Grid of Ads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAds.map((ad) => (
          <article
            key={ad.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              {ad.imageUrl && (
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={ad.imageUrl}
                    alt={ad.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-900/90 text-white text-[11px] font-semibold backdrop-blur-md">
                      {ad.typeLabel}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-md bg-emerald-600 text-white font-heading font-bold text-xs shadow-xs">
                      {ad.priceText}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-brand-600" />
                    {ad.location}
                  </span>
                  <span>{ad.publishedAt}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900 leading-snug group-hover:text-brand-600 transition-colors">
                  {ad.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {ad.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {ad.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Contacto directo:
                </span>
                <a
                  href={`https://wa.me/${ad.contactWhatsapp}?text=${encodeURIComponent(
                    `Hola, vi tu aviso en Qatu.pe sobre "${ad.title}" y deseo más información.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Preguntar por WhatsApp</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
