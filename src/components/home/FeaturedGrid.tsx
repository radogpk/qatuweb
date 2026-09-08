import Image from "next/image";
import Link from "next/link";
import { Business } from "@/lib/types/business";
import { ArrowUpRight, MapPin, Tag } from "lucide-react";

interface FeaturedGridProps {
  businesses: Business[];
}

export function FeaturedGrid({ businesses }: FeaturedGridProps) {
  return (
    <section id="vitrina" className="py-20 bg-[#F5EFE4] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
              Vitrina de Negocios Activos
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B3A55]">
              Descubre los negocios que ya confían en Qatu
            </h2>
            <p className="text-sm sm:text-base text-[#4A5B78]">
              Cada negocio cuenta con su propio subdominio independiente, optimizado para vender y recibir pedidos sin fricción.
            </p>
          </div>

          <div>
            <Link
              href="/directorio"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#E8DEC8] hover:border-[#D4A017] text-[#2B3A55] text-sm font-semibold shadow-xs transition-colors"
            >
              <span>Ver todos en el directorio</span>
              <ArrowUpRight className="w-4 h-4 text-[#B23A2E]" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {businesses.map((business) => (
            <article
              key={business.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8DEC8] shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col group"
            >
              {/* Cover Image Container */}
              <div className="relative h-56 sm:h-64 w-full bg-[#FAF7F2] overflow-hidden">
                <Image
                  src={business.coverUrl}
                  alt={business.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Subdomain pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#2B3A55]/90 text-white text-xs font-mono font-medium backdrop-blur-xs border border-white/20">
                    {business.subdomain}
                  </span>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[#FCF6E5] text-[#D4A017] text-xs font-semibold shadow-xs">
                    {business.categoryLabel}
                  </span>
                </div>

                {/* Title and location inside image bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-serif font-bold text-white drop-shadow-xs">
                    {business.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/90 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4A017]" />
                    <span>{business.address || business.city}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-[#4A5B78] leading-relaxed">
                  {business.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {business.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FAF7F2] text-[#4A5B78] text-[11px] font-medium border border-[#E8DEC8]"
                    >
                      <Tag className="w-2.5 h-2.5 text-[#D4A017]" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action CTA Button */}
                <div className="pt-2 border-t border-[#E8DEC8] flex items-center justify-between">
                  <div className="text-xs text-[#4A5B78]">
                    Alojado en <span className="font-semibold text-[#2B3A55]">Qatu.pe</span>
                  </div>

                  <a
                    href={`https://${business.subdomain}`}
                    target="_self"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#B23A2E] hover:bg-[#962E24] text-white text-xs sm:text-sm font-semibold shadow-xs group/btn active:scale-95 transition-all"
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
