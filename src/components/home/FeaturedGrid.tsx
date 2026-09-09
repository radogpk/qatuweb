import Image from "next/image";
import Link from "next/link";
import { Business } from "@/lib/types/business";
import { ArrowUpRight, MapPin, Tag, Star, Sparkles, ExternalLink } from "lucide-react";

interface FeaturedGridProps {
  businesses: Business[];
}

export function FeaturedGrid({ businesses }: FeaturedGridProps) {
  return (
    <section id="vitrina" className="py-20 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header aligned with container */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vitrina de Negocios Activos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
              Marcas locales que ya operan con Qatu
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Cada negocio cuenta con su propio subdominio independiente, optimizado para recibir pedidos y reservas sin comisiones.
            </p>
          </div>

          <div>
            <Link
              href="/directorio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-card hover:shadow-card-hover transition-all group active:scale-95"
            >
              <span>Ver directorio completo</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 3 Column Balanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {businesses.slice(0, 3).map((business) => (
            <article
              key={business.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group h-full"
            >
              {/* Cover Image Container */}
              <div className="relative h-52 sm:h-56 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={business.coverUrl}
                  alt={business.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                {/* Subdomain tag */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-[11px] font-mono font-medium backdrop-blur-md border border-white/10 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {business.subdomain}
                  </span>
                </div>

                {/* Category badge */}
                <div className="absolute top-3.5 right-3.5">
                  <span className="px-2.5 py-1 rounded-lg bg-white/95 text-slate-800 text-[11px] font-bold backdrop-blur-md border border-slate-200 shadow-xs">
                    {business.categoryLabel}
                  </span>
                </div>

                {/* Title and location inside image bottom */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-heading font-extrabold text-white drop-shadow-xs">
                      {business.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-amber-500 text-slate-950 text-xs font-extrabold px-2 py-0.5 rounded-md shadow-xs">
                      <Star className="w-3 h-3 fill-slate-950 text-slate-950" />
                      <span>4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-400" />
                    <span>{business.address || business.city}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {business.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {business.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      <Tag className="w-2.5 h-2.5 text-slate-400" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action CTA Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Alojado en <span className="font-semibold text-slate-900">Qatu.pe</span>
                  </div>

                  <a
                    href={`https://${business.subdomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-card hover:shadow-card-hover group/btn active:scale-95 transition-all"
                  >
                    <span>Visitar tienda</span>
                    <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
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
