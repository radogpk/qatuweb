import Image from "next/image";
import Link from "next/link";
import { Business } from "@/lib/types/business";
import { ArrowUpRight, MapPin, Tag } from "lucide-react";

interface FeaturedGridProps {
  businesses: Business[];
}

export function FeaturedGrid({ businesses }: FeaturedGridProps) {
  return (
    <section id="vitrina" className="py-20 bg-[#FAF9F6] border-b border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
              Vitrina de Negocios Activos
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2838]">
              Descubre los negocios que ya confían en Qatu
            </h2>
            <p className="text-sm sm:text-base text-[#4B586E]">
              Cada negocio cuenta con su propio subdominio independiente, optimizado para vender y recibir pedidos sin fricción.
            </p>
          </div>

          <div>
            <Link
              href="/directorio"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white hover:bg-[#F4F1EA] border border-[#EAE6DF] hover:border-[#1E2838] text-[#1E2838] text-xs sm:text-sm font-semibold shadow-xs transition-colors"
            >
              <span>Ver todos en el directorio</span>
              <ArrowUpRight className="w-4 h-4 text-[#B23A2E]" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {businesses.map((business) => (
            <article
              key={business.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#EAE6DF] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group"
            >
              {/* Cover Image Container */}
              <div className="relative h-56 sm:h-64 w-full bg-[#F4F1EA] overflow-hidden">
                <Image
                  src={business.coverUrl}
                  alt={business.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Subdomain tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-[#1E2838]/90 text-white text-xs font-mono font-medium backdrop-blur-xs border border-white/20">
                    {business.subdomain}
                  </span>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-md bg-[#FAF9F6]/90 text-[#1E2838] text-xs font-semibold backdrop-blur-xs border border-[#EAE6DF]">
                    {business.categoryLabel}
                  </span>
                </div>

                {/* Title and location inside image bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-serif font-bold text-white drop-shadow-xs">
                    {business.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/90 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C59218]" />
                    <span>{business.address || business.city}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-[#4B586E] leading-relaxed">
                  {business.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {business.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FAF9F6] text-[#4B586E] text-[11px] font-medium border border-[#EAE6DF]"
                    >
                      <Tag className="w-2.5 h-2.5 text-[#C59218]" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action CTA Button */}
                <div className="pt-3 border-t border-[#EAE6DF] flex items-center justify-between">
                  <div className="text-xs text-[#4B586E]">
                    Alojado en <span className="font-semibold text-[#1E2838]">Qatu.pe</span>
                  </div>

                  <a
                    href={`https://${business.subdomain}`}
                    target="_self"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B23A2E] hover:bg-[#962E24] text-white text-xs sm:text-sm font-semibold shadow-xs group/btn active:scale-98 transition-all"
                  >
                    <span>Visitar web</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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
