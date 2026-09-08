"use client";

import { useState, useMemo } from "react";
import { Business } from "@/lib/types/business";
import { BusinessCard } from "./BusinessCard";
import { Search, Store, Filter, X } from "lucide-react";

interface DirectoryViewProps {
  initialBusinesses: Business[];
}

const CATEGORIES = [
  { id: "todos", label: "Todos los rubros" },
  { id: "restaurante", label: "Restaurantes y Cafés" },
  { id: "hotel", label: "Hoteles y Hospedaje" },
  { id: "tienda", label: "Tiendas y Comercio" },
  { id: "artesania", label: "Artesanía y Arte" },
  { id: "servicios", label: "Servicios" },
];

export function DirectoryView({ initialBusinesses }: DirectoryViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const filteredBusinesses = useMemo(() => {
    return initialBusinesses.filter((business) => {
      const matchesCategory =
        selectedCategory === "todos" || business.category === selectedCategory;

      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        business.name.toLowerCase().includes(q) ||
        business.shortDescription.toLowerCase().includes(q) ||
        business.subdomain.toLowerCase().includes(q) ||
        business.city.toLowerCase().includes(q) ||
        business.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialBusinesses, searchTerm, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search Bar & Filters Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E8DEC8] shadow-warm space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#4A5B78] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, rubro, producto (ej. flores, hotel, café)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-[#2B3A55] text-sm sm:text-base focus:outline-none focus:border-[#B23A2E] placeholder-[#4A5B78]/60"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#4A5B78] hover:text-[#B23A2E]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 pt-1 scrollbar-none">
          <Filter className="w-4 h-4 text-[#D4A017] shrink-0 ml-1 mr-1 hidden sm:inline" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#B23A2E] text-white shadow-xs"
                  : "bg-[#FAF7F2] text-[#2B3A55] hover:bg-[#EADDC8]/50 border border-[#E8DEC8]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header / Counter */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-[#4A5B78] px-1">
        <span>
          Mostrando <strong className="text-[#2B3A55] font-serif">{filteredBusinesses.length}</strong> {filteredBusinesses.length === 1 ? "negocio activo" : "negocios activos"}
        </span>
        {(searchTerm || selectedCategory !== "todos") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("todos");
            }}
            className="text-[#B23A2E] hover:underline font-medium"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Grid or Empty state */}
      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#E8DEC8] space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FCF6E5] text-[#D4A017] mx-auto flex items-center justify-center">
            <Store className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2B3A55]">
            No encontramos negocios con esos criterios
          </h3>
          <p className="text-sm text-[#4A5B78] max-w-md mx-auto">
            Intenta con otro término de búsqueda o selecciona "Todos los rubros" para ver toda la vitrina de Qatu.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("todos");
            }}
            className="px-5 py-2.5 rounded-full bg-[#2B3A55] text-white text-xs font-semibold hover:bg-[#1A2436] transition-colors"
          >
            Ver todos los negocios
          </button>
        </div>
      )}
    </div>
  );
}
