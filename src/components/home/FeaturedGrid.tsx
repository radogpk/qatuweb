import Image from "next/image";
import Link from "next/link";
import { Business } from "@/lib/types/business";
import { ArrowUpRight, MapPin, Tag, Star, Sparkles, ExternalLink } from "lucide-react";

interface FeaturedGridProps {
  businesses: Business[];
}

export function FeaturedGrid({ businesses }: FeaturedGridProps) {
  return (
    <section id="vitrina" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vitrina de Negocios Activos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              Descubre marcas locales con web en Qatu
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Cada negocio cuenta con su propio subdominio independiente, optimizado para recibir pedidos y reservas sin comisiones.
            </p>
          </div>

          <div>
            <Link
              href="/directorio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-sm font-semibold shadow-xs hover:border-slate-400 transition-all group"
            >
              <span>Ver directorio completo</span>
              <ArrowUpRight className="w-4 h-4 text-brand-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {businesses.map((business) => (
            <article
              key={business.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group"
            >
              {/* Cover Image Container */}
              <div className="relative h-60 sm:h-64 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={business.coverUrl}
                  alt={business.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Subdomain tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 text-white text-xs font-mono font-medium backdrop-blur-md border border-white/10 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {business.subdomain}
                  </span>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-lg bg-white/95 text-slate-800 text-xs font-bold backdrop-blur-md border border-slate-200 shadow-sm">
                    {business.categoryLabel}
                  </span>
                </div>

                {/* Title and location inside image bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-heading font-extrabold text-white drop-shadow-sm">
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
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {business.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {business.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
                    >
                      <Tag className="w-3 h-3 text-slate-400" />
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
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold shadow-card hover:shadow-card-hover group/btn active:scale-95 transition-all"
                  >
                    <span>Visitar tienda</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
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
