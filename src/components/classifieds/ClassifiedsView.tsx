"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { PageIntro } from "@/components/shared/PageIntro";
import { Pagination } from "@/components/shared/Pagination";
import { useListingQuery } from "@/components/shared/useListingQuery";
import { normalizeSearch, pageWindow } from "@/lib/ui/listing";
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
  X,
  Heart,
  Eye,
  ShieldCheck,
  Share2,
} from "lucide-react";

interface ClassifiedsViewProps {
  initialAds: ClassifiedAd[];
}

export function ClassifiedsView({ initialAds }: ClassifiedsViewProps) {
  const { query, update } = useListingQuery();
  const searchTerm = query.get("q") || "";
  const setSearchTerm = (value: string) => update({ q: value, pagina: "" });
  const selectedType = query.get("tipo") || "todos";
  const setSelectedType = (value: string) =>
    update({ tipo: value === "todos" ? "" : value, pagina: "" });
  const selectedZone = query.get("zona") || "todas";
  const setSelectedZone = (value: string) =>
    update({ zona: value === "todas" ? "" : value, pagina: "" });
  const priceFilter = query.get("precio") || "todos";
  const setPriceFilter = (value: string) =>
    update({ precio: value === "todos" ? "" : value, pagina: "" });
  const sortBy = query.get("orden") || "destacados";
  const setSortBy = (value: string) => update({ orden: value, pagina: "" });
  const showOnlyFavorites = query.get("guardados") === "si";
  const setShowOnlyFavorites = (value: boolean) =>
    update({ guardados: value ? "si" : "", pagina: "" });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedAdForModal, setSelectedAdForModal] =
    useState<ClassifiedAd | null>(null);
  const [activeModalImageIndex, setActiveModalImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareError, setShareError] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("qatu_fav_ads");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed))
          setFavorites(
            parsed.filter((id): id is string => typeof id === "string"),
          );
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem("qatu_fav_ads", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const categories = [
    {
      id: "todos",
      label: "Todos los rubros",
      count: initialAds.length,
      icon: Megaphone,
    },
    {
      id: "alquiler",
      label: "Locales y Stands",
      count: initialAds.filter((a) => a.type === "alquiler").length,
      icon: Building,
    },
    {
      id: "traspaso",
      label: "Traspasos de Negocios",
      count: initialAds.filter((a) => a.type === "traspaso").length,
      icon: RefreshCw,
    },
    {
      id: "venta",
      label: "Equipamiento Comercial",
      count: initialAds.filter((a) => a.type === "venta").length,
      icon: ShoppingBag,
    },
  ];

  // Unique zones
  const zones = useMemo(() => {
    const set = new Set<string>();
    initialAds.forEach((ad) => {
      if (ad.zone) set.add(ad.zone);
    });
    return ["todas", ...Array.from(set)];
  }, [initialAds]);

  // Filtered and sorted listings
  const filteredAds = useMemo(() => {
    const q = normalizeSearch(searchTerm);
    const result = initialAds.filter((ad) => {
      const matchesType = selectedType === "todos" || ad.type === selectedType;
      const matchesZone = selectedZone === "todas" || ad.zone === selectedZone;
      const matchesFav = !showOnlyFavorites || favorites.includes(ad.id);

      // Price filter
      let matchesPrice = true;
      if (priceFilter === "bajo1000") matchesPrice = ad.priceNumeric <= 1000;
      else if (priceFilter === "1000a3000")
        matchesPrice = ad.priceNumeric > 1000 && ad.priceNumeric <= 3000;
      else if (priceFilter === "mas3000") matchesPrice = ad.priceNumeric > 3000;

      const matchesSearch = normalizeSearch(
        [
          ad.title,
          ad.description,
          ad.location,
          ad.zone,
          ...ad.tags,
          ...(ad.specs || []).flatMap((spec) => [spec.label, spec.value]),
        ].join(" "),
      ).includes(q);

      return (
        matchesType &&
        matchesZone &&
        matchesPrice &&
        matchesFav &&
        matchesSearch
      );
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === "menor-precio") return a.priceNumeric - b.priceNumeric;
      if (sortBy === "mayor-precio") return b.priceNumeric - a.priceNumeric;
      if (sortBy === "mas-vistos")
        return (b.viewsCount || 0) - (a.viewsCount || 0);
      return Number(b.featured || false) - Number(a.featured || false);
    });
  }, [
    initialAds,
    searchTerm,
    selectedType,
    selectedZone,
    priceFilter,
    sortBy,
    showOnlyFavorites,
    favorites,
  ]);

  const paging = pageWindow(
    filteredAds.length,
    Number(query.get("pagina") || 1),
  );
  const sharedAdId = query.get("aviso");
  useEffect(() => {
    setSelectedAdForModal(
      initialAds.find((ad) => ad.id === sharedAdId) || null,
    );
    setActiveModalImageIndex(0);
  }, [sharedAdId, initialAds]);
  useEffect(() => {
    if (!selectedAdForModal) return;
    const dialog = dialogRef.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [selectedAdForModal]);
  const closeAd = () => {
    setSelectedAdForModal(null);
    update({ aviso: "" });
  };
  // Open modal
  const openAdModal = (ad: ClassifiedAd) => {
    setSelectedAdForModal(ad);
    update({ aviso: ad.id });
    setActiveModalImageIndex(0);
    setCopiedLink(false);
    setShareError(false);
  };

  const copyAdShare = async (ad: ClassifiedAd) => {
    const url = new URL(window.location.href);
    url.searchParams.set("aviso", ad.id);
    try {
      await navigator.clipboard.writeText(url.href);
      setCopiedLink(true);
      setShareError(false);
    } catch {
      setCopiedLink(false);
      setShareError(true);
    }
  };

  return (
    <div className="classifieds-view">
      <PageIntro
        eyebrow="Comunidad · Anuncios"
        title="El espacio para tu próximo paso."
        description="Locales, traspasos y equipamiento comercial. Explora las oportunidades y contacta directamente con quien publica."
      />
      <div className="listing-tools">
        <label className="listing-search">
          <Search size={20} />
          <span className="sr-only">Buscar anuncios</span>
          <input
            type="search"
            placeholder="Local, equipamiento o ubicación…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              aria-label="Borrar búsqueda"
              onClick={() => setSearchTerm("")}
            >
              <X size={17} />
            </button>
          )}
        </label>
        <button
          className="listing-save-toggle"
          aria-pressed={showOnlyFavorites}
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
        >
          <Heart size={18} />
          Guardados ({favorites.length})
        </button>
        <a
          className="listing-publish"
          href={getWhatsAppUrl("Hola Qatu, quiero publicar un anuncio.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Publicar un anuncio <PlusCircle size={17} />
        </a>
      </div>
      {/* 2. ADVANCED COMMERCIAL TOOLBAR (Category pills, price filter, and sorting like Crexi/Idealista) */}
      <div id="catalogo" ref={resultsRef} tabIndex={-1} className="ad-filters">
        {/* Category Pills Row */}
        <div
          className="listing-categories"
          role="group"
          aria-label="Tipo de anuncio"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedType === cat.id && !showOnlyFavorites;
            return (
              <button
                key={cat.id}
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedType(cat.id);
                  setShowOnlyFavorites(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Row: Price Range + Zone + Sort Selector */}
        <div className="ad-filter-details">
          <div className="ad-budget" role="group" aria-label="Presupuesto">
            <span className="text-slate-400 font-medium">Presupuesto:</span>
            {[
              { id: "todos", label: "Cualquier precio" },
              { id: "bajo1000", label: "Hasta S/ 1,000" },
              { id: "1000a3000", label: "S/ 1,000 a S/ 3,000" },
              { id: "mas3000", label: "Más de S/ 3,000" },
            ].map((p) => (
              <button
                key={p.id}
                aria-pressed={priceFilter === p.id}
                onClick={() => setPriceFilter(p.id)}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
                  priceFilter === p.id
                    ? "bg-slate-900 text-white font-semibold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="ad-sort-row">
            <label className="listing-zone">
              Zona
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
              >
                {zones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone === "todas" ? "Todas las zonas" : zone}
                  </option>
                ))}
              </select>
            </label>
            {/* Sort Selector */}
            <label className="listing-sort">
              <span className="text-slate-400 font-medium">Ordenar:</span>
              <select
                aria-label="Ordenar anuncios"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-1 focus:outline-hidden focus:ring-1 focus:ring-brand-500 font-medium"
              >
                <option value="destacados">Destacados primero</option>
                <option value="menor-precio">Menor precio</option>
                <option value="mayor-precio">Mayor precio</option>
                <option value="mas-vistos">Más consultados</option>
              </select>
            </label>

            {/* Results count & Clear */}
            <div className="ad-results">
              <span role="status">
                {filteredAds.length
                  ? `${paging.start + 1}–${paging.end} de ${filteredAds.length} avisos`
                  : "Sin resultados"}
              </span>
              {(searchTerm ||
                selectedType !== "todos" ||
                selectedZone !== "todas" ||
                priceFilter !== "todos" ||
                showOnlyFavorites) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("todos");
                    setSelectedZone("todas");
                    setPriceFilter("todos");
                    setShowOnlyFavorites(false);
                  }}
                  className="text-brand-600 hover:underline font-semibold cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. COMMERCIAL REAL ESTATE CARDS GRID */}
      {filteredAds.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 shadow-card">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-heading font-extrabold text-slate-900">
            No encontramos avisos con esos filtros
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            {showOnlyFavorites
              ? "Aún no tienes avisos guardados. Haz clic en el corazón de cualquier ficha para guardarlo aquí."
              : "Intenta con otro término de búsqueda o modifica el rango de presupuesto para ver más opciones en Ayacucho."}
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedType("todos");
              setSelectedZone("todas");
              setPriceFilter("todos");
              setShowOnlyFavorites(false);
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Ver todos los avisos
          </button>
        </div>
      ) : (
        <div className="listing-grid">
          {filteredAds.slice(paging.start, paging.end).map((ad) => (
            <article
              key={ad.id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group h-full cursor-pointer"
              onClick={() => openAdModal(ad)}
            >
              <div>
                {/* Photo with clean badges & Heart Save */}
                <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={ad.imageUrl}
                    alt={ad.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Category Type */}
                  <div className="ad-image-labels">
                    <span className="px-2.5 py-1 rounded-xl bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-md">
                      {ad.typeLabel}
                    </span>
                    {ad.conditionTag && (
                      <span className="px-2 py-1 rounded-xl bg-white/90 text-slate-800 text-[10px] font-bold backdrop-blur-md">
                        {ad.conditionTag}
                      </span>
                    )}
                  </div>

                  {/* Favorite button & Price */}
                  <div className="ad-image-actions">
                    <button
                      onClick={(e) => toggleFavorite(ad.id, e)}
                      className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
                      aria-label={`Guardar: ${ad.title}`}
                      aria-pressed={favorites.includes(ad.id)}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${favorites.includes(ad.id) ? "fill-rose-500 text-rose-500" : "text-white"}`}
                      />
                    </button>
                    <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-heading font-extrabold text-xs shadow-xs">
                      {ad.priceText}{" "}
                      {ad.periodLabel && (
                        <span className="text-[10px] font-normal font-sans opacity-90">
                          {ad.periodLabel}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Gallery counter if multiple */}
                  {ad.gallery && ad.gallery.length > 1 && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-medium backdrop-blur-xs">
                      📷 {ad.gallery.length} fotos
                    </div>
                  )}
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

                  {/* Specs Chips (Crexi-style metrics) */}
                  {ad.specs && ad.specs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {ad.specs.slice(0, 3).map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          <span className="text-slate-400 font-normal">
                            {spec.label}:{" "}
                          </span>
                          {spec.value}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {ad.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 sm:p-6 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      openAdModal(ad);
                    }}
                    aria-label={`Ver ficha: ${ad.title}`}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Ficha</span>
                  </button>

                  <a
                    href={`https://wa.me/${ad.contactWhatsapp}?text=${encodeURIComponent(
                      `Hola, vi tu aviso en Qatu.pe sobre "${ad.title}" y deseo más información.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${ad.contactPhone}`}
                    onClick={(e) => e.stopPropagation()}
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

      <Pagination
        page={paging.page}
        pages={paging.pages}
        onChange={(page) => {
          update({ pagina: String(page) }, true);
          resultsRef.current?.focus();
          resultsRef.current?.scrollIntoView({
            block: "start",
            behavior: "smooth",
          });
        }}
      />
      {/* 4. CONCIERGE PUBLISHING GUIDE BANNER */}
      <div className="ad-publish-invite bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Publicación Gratuita
            </span>
            <h3 className="text-2xl font-heading font-extrabold text-slate-900">
              ¿Tienes un local, traspaso o maquinaria comercial para publicar?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Envíanos las fotos, la ubicación y el precio por WhatsApp.
              Revisamos la información contigo y publicamos tu aviso con tu
              contacto directo.
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
              href={getWhatsAppUrl(
                "Hola Qatu, quiero publicar mi aviso de alquiler/traspaso/venta en el tablón.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-card active:scale-95 transition-all"
            >
              <span>Publicar mi aviso por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 5. INTERACTIVE PROPERTY DETAIL MODAL (Idealista / Crexi caliber) */}
      {selectedAdForModal && (
        <dialog
          ref={dialogRef}
          className="ad-dialog"
          aria-label="Detalles del anuncio"
          onCancel={closeAd}
          onClick={() => closeAd()}
        >
          <div
            className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-xs font-semibold">
                  {selectedAdForModal.typeLabel}
                </span>
                {selectedAdForModal.conditionTag && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    {selectedAdForModal.conditionTag}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyAdShare(selectedAdForModal)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                  title="Compartir enlace"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => toggleFavorite(selectedAdForModal.id, e)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-slate-200 transition-colors"
                  aria-label="Guardar anuncio"
                  aria-pressed={favorites.includes(selectedAdForModal.id)}
                >
                  <Heart
                    className={`w-4 h-4 ${favorites.includes(selectedAdForModal.id) ? "fill-rose-600 text-rose-600" : ""}`}
                  />
                </button>
                <button
                  onClick={closeAd}
                  aria-label="Cerrar anuncio"
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Photo & Carousel */}
              <div className="space-y-2">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src={
                      selectedAdForModal.gallery &&
                      selectedAdForModal.gallery.length > 0
                        ? selectedAdForModal.gallery[activeModalImageIndex]
                        : selectedAdForModal.imageUrl
                    }
                    alt={selectedAdForModal.title}
                    fill
                    sizes="(max-width: 700px) calc(100vw - 80px), 616px"
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

                {/* Gallery thumbnails if multiple */}
                {selectedAdForModal.gallery &&
                  selectedAdForModal.gallery.length > 1 && (
                    <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                      {selectedAdForModal.gallery.map((img, idx) => (
                        <button
                          key={idx}
                          aria-label={`Ver imagen ${idx + 1}`}
                          aria-pressed={activeModalImageIndex === idx}
                          onClick={() => setActiveModalImageIndex(idx)}
                          className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                            activeModalImageIndex === idx
                              ? "border-brand-600 ring-2 ring-brand-500/20"
                              : "border-slate-200 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`Imagen ${idx + 1} de ${selectedAdForModal.title}`}
                            sizes="64px"
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
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

              {/* Key Specs Sheet */}
              {selectedAdForModal.specs &&
                selectedAdForModal.specs.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Ficha Técnica Comercial
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {selectedAdForModal.specs.map((spec, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-100"
                        >
                          <span className="text-[11px] text-slate-500 block font-medium">
                            {spec.label}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Detalles y Condiciones
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-line">
                  {selectedAdForModal.description}
                </p>
              </div>

              {/* Direct Deal Guarantee Badge */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-xs text-emerald-800 leading-snug">
                  <strong>Trato directo con el propietario:</strong> Qatu no
                  cobra comisiones de intermediación. Tu negociación es 100%
                  directa y transparente.
                </p>
              </div>

              {shareError && (
                <p role="alert" className="text-sm">
                  No se pudo copiar. Puedes copiar la dirección del navegador
                  para compartir este anuncio.
                </p>
              )}
              {copiedLink && (
                <div
                  role="status"
                  className="p-3 rounded-xl bg-slate-900 text-white text-xs text-center font-medium animate-in fade-in"
                >
                  ¡Enlace copiado al portapapeles!
                </div>
              )}
            </div>

            {/* Footer CTAs */}
            <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`tel:${selectedAdForModal.contactPhone}`}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar al anunciante</span>
              </a>

              <a
                href={`https://wa.me/${selectedAdForModal.contactWhatsapp}?text=${encodeURIComponent(
                  `Hola, vi la ficha en Qatu de "${selectedAdForModal.title}" y deseo coordinar una visita / más información.`,
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
        </dialog>
      )}
    </div>
  );
}
