import Link from "next/link";
import Image from "next/image";
import { initialClassifieds } from "@/lib/seed/initialClassifieds";
import { ArrowUpRight, MapPin, Tag, MessageCircle, Megaphone, PlusCircle } from "lucide-react";

export function ClassifiedsPreview() {
  const topAds = initialClassifieds.slice(0, 2);

  return (
    <section className="py-24 md:py-32 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with clear space */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              <Megaphone className="w-3.5 h-3.5 text-amber-600" />
              <span>Tablón Comercial de Ayacucho</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
              Alquileres, traspasos y equipamiento para negocios
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Un espacio de oportunidades directas entre comerciantes: locales disponibles en zonas céntricas, traspasos en marcha y maquinaria comercial.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/anuncios"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-sm font-semibold shadow-xs transition-all group active:scale-95"
            >
              <span>Ver todos los avisos</span>
              <ArrowUpRight className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 2 Ads Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {topAds.map((ad) => (
            <article
              key={ad.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {ad.imageUrl && (
                  <div className="relative h-56 sm:h-64 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={ad.imageUrl}
                      alt={ad.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-xl bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-md">
                        {ad.typeLabel}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3.5 py-1 rounded-xl bg-emerald-600 text-white font-heading font-bold text-xs shadow-xs">
                        {ad.priceText}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-brand-600" />
                      {ad.location}
                    </span>
                    <span>{ad.publishedAt}</span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-slate-900 leading-snug group-hover:text-brand-600 transition-colors">
                    {ad.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {ad.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {ad.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Trato directo con el dueño</span>
                  <a
                    href={`https://wa.me/${ad.contactWhatsapp}?text=${encodeURIComponent(
                      `Hola, vi tu aviso en Qatu.pe sobre "${ad.title}" y deseo información.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs active:scale-95 transition-all"
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
    </section>
  );
}
