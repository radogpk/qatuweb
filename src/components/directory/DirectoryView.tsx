"use client";
import { useMemo, useRef } from "react";
import { Business } from "@/lib/types/business";
import { normalizeSearch, pageWindow } from "@/lib/ui/listing";
import { useListingQuery } from "@/components/shared/useListingQuery";
import { Pagination } from "@/components/shared/Pagination";
import { BusinessCard } from "./BusinessCard";
import { Search, X, Store } from "lucide-react";
const categories = [
  ["todos", "Todos"],
  ["restaurante", "Restaurantes y cafés"],
  ["hotel", "Hospedaje"],
  ["tienda", "Tiendas"],
  ["artesania", "Artesanía"],
  ["servicios", "Servicios"],
];
export function DirectoryView({
  initialBusinesses,
}: {
  initialBusinesses: Business[];
}) {
  const { query, update } = useListingQuery();
  const results = useRef<HTMLDivElement>(null);
  const search = query.get("q") || "",
    category = query.get("rubro") || "todos",
    sort = query.get("orden") || "destacados";
  const filtered = useMemo(
    () =>
      initialBusinesses
        .filter(
          (b) =>
            b.active &&
            (category === "todos" || b.category === category) &&
            normalizeSearch(
              [b.name, b.shortDescription, b.city, b.subdomain, ...b.tags].join(
                " ",
              ),
            ).includes(normalizeSearch(search)),
        )
        .sort((a, b) =>
          sort === "nombre"
            ? a.name.localeCompare(b.name, "es")
            : Number(b.featured) - Number(a.featured),
        ),
    [initialBusinesses, category, search, sort],
  );
  const window = pageWindow(filtered.length, Number(query.get("pagina") || 1));
  const clear = () => update({ q: "", rubro: "", pagina: "", orden: "" });
  return (
    <div className="listing-view">
      <div className="listing-tools">
        <label className="listing-search">
          <Search size={20} />
          <span className="sr-only">Buscar negocios</span>
          <input
            type="search"
            placeholder="Nombre, producto o ciudad…"
            value={search}
            onChange={(e) => update({ q: e.target.value, pagina: "" })}
          />
          {search && (
            <button
              type="button"
              aria-label="Borrar búsqueda"
              onClick={() => update({ q: "", pagina: "" })}
            >
              <X size={17} />
            </button>
          )}
        </label>
        <label className="listing-sort">
          Ordenar
          <select
            value={sort}
            onChange={(e) => update({ orden: e.target.value, pagina: "" })}
          >
            <option value="destacados">Destacados primero</option>
            <option value="nombre">Nombre A–Z</option>
          </select>
        </label>
      </div>
      <div
        className="listing-categories"
        role="group"
        aria-label="Filtrar por rubro"
      >
        {categories.map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={category === id}
            onClick={() =>
              update({ rubro: id === "todos" ? "" : id, pagina: "" })
            }
          >
            {label}
          </button>
        ))}
      </div>
      <div className="listing-results" ref={results} tabIndex={-1}>
        <p role="status">
          {filtered.length
            ? `${window.start + 1}–${window.end} de ${filtered.length} negocios`
            : "No hay resultados"}
        </p>
        {(search || category !== "todos") && (
          <button type="button" onClick={clear}>
            Limpiar filtros
          </button>
        )}
      </div>
      {filtered.length ? (
        <div className="listing-grid">
          {filtered.slice(window.start, window.end).map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>
      ) : (
        <div className="listing-empty">
          <Store size={30} />
          <h2>No encontramos ese negocio.</h2>
          <p>Prueba otro nombre o explora todos los rubros.</p>
          <button onClick={clear}>Ver todos los negocios</button>
        </div>
      )}
      <Pagination
        page={window.page}
        pages={window.pages}
        onChange={(page) => {
          update({ pagina: String(page) }, true);
          results.current?.focus();
          results.current?.scrollIntoView({
            block: "start",
            behavior: "smooth",
          });
        }}
      />
    </div>
  );
}
