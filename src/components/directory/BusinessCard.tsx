import Image from "next/image";
import { Business } from "@/lib/types/business";
import { ArrowUpRight, MapPin, Tag, MessageCircle } from "lucide-react";

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-[#EAE6DF] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group h-full">
      {/* Cover Image */}
      <div className="relative h-48 sm:h-52 w-full bg-[#F4F1EA] overflow-hidden">
        <Image
          src={business.coverUrl}
          alt={business.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Subdomain tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 rounded-md bg-[#1E2838]/90 text-white text-[11px] font-mono backdrop-blur-xs border border-white/20">
            {business.subdomain}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6]/90 text-[#1E2838] text-[11px] font-semibold backdrop-blur-xs border border-[#EAE6DF]">
            {business.categoryLabel}
          </span>
        </div>

        {/* Name and location */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-xl font-serif font-bold text-white leading-snug drop-shadow-xs">
            {business.name}
          </h3>
          <div className="flex items-center gap-1 text-[11px] text-white/90 mt-0.5">
            <MapPin className="w-3 h-3 text-[#C59218]" />
            <span>{business.address || business.city}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs sm:text-sm text-[#4B586E] leading-relaxed line-clamp-3">
          {business.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {business.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-[#FAF9F6] text-[#4B586E] text-[10px] font-medium border border-[#EAE6DF]"
            >
              <Tag className="w-2 h-2 text-[#C59218]" />
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-[#EAE6DF] flex items-center justify-between gap-2">
          {business.whatsapp ? (
            <a
              href={`https://wa.me/${business.whatsapp}?text=Hola,%20los%20encontr%C3%A9%20en%20Qatu.pe`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
              aria-label={`Escribir por WhatsApp a ${business.name}`}
              title="Pedir por WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>
          ) : <div />}

          <a
            href={`https://${business.subdomain}`}
            target="_self"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B23A2E] hover:bg-[#962E24] text-white text-xs font-semibold shadow-xs active:scale-98 transition-all"
          >
            <span>Visitar web</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
