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
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-warm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCF6E5] text-[#D4A017] text-xs font-semibold">
            <Tag className="w-3.5 h-3.5" />
            <span>Tablón de la Comunidad Comercial</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B3A55]">
            Alquileres, traspasos y ventas para negocios
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5B78] max-w-xl">
            Encuentra locales comerciales disponibles, traspasos de negocios en marcha y equipamiento de segunda mano en Ayacucho y la región.
          </p>
        </div>

        <a
          href={getWhatsAppUrl("Hola Qatu, deseo publicar un anuncio de alquiler/venta/traspaso en el tablón de avisos.")}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-6 py-3.5 rounded-full bg-[#B23A2E] hover:bg-[#962E24] text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition-all active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publicar mi aviso gratis</span>
        </a>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E8DEC8] shadow-warm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-[#4A5B78] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por local, stand, traspaso, vitrina, ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-[#2B3A55] text-xs sm:text-sm focus:outline-none focus:border-[#B23A2E]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-[#D4A017] shrink-0 ml-1 mr-1 hidden sm:inline" />
          {[
            { id: "todos", label: "Todos los avisos" },
            { id: "alquiler", label: "Alquileres de locales" },
            { id: "traspaso", label: "Traspasos de negocios" },
            { id: "venta", label: "Venta de equipamiento" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedType(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedType === cat.id
                  ? "bg-[#B23A2E] text-white shadow-xs"
                  : "bg-[#FAF7F2] text-[#2B3A55] hover:bg-[#EADDC8]/50 border border-[#E8DEC8]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-[#4A5B78] px-1">
        <span>
          Mostrando <strong className="text-[#2B3A55] font-serif">{filteredAds.length}</strong> avisos disponibles
        </span>
      </div>

      {/* Grid of Ads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAds.map((ad) => (
          <article
            key={ad.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#E8DEC8] shadow-warm hover:shadow-warm-lg transition-all flex flex-col justify-between group"
          >
            <div>
              {ad.imageUrl && (
                <div className="relative h-48 w-full bg-[#FAF7F2] overflow-hidden">
                  <Image
                    src={ad.imageUrl}
                    alt={ad.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#2B3A55]/90 text-white text-[11px] font-semibold backdrop-blur-xs">
                      {ad.typeLabel}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-[#D4A017] text-white font-serif font-bold text-xs shadow-xs">
                      {ad.priceText}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#4A5B78]">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#B23A2E]" />
                    {ad.location}
                  </span>
                  <span>{ad.publishedAt}</span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#2B3A55] leading-snug group-hover:text-[#B23A2E] transition-colors">
                  {ad.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#4A5B78] leading-relaxed line-clamp-3">
                  {ad.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {ad.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[#FAF7F2] text-[#4A5B78] text-[10px] font-medium border border-[#E8DEC8]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-[#E8DEC8] flex items-center justify-between">
                <span className="text-xs text-[#4A5B78]">
                  Contacto directo:
                </span>
                <a
                  href={`https://wa.me/${ad.contactWhatsapp}?text=${encodeURIComponent(
                    `Hola, vi tu anuncio en Qatu.pe sobre "${ad.title}" y deseo más información.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all"
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
