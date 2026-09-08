import Image from "next/image";
import { Business } from "@/lib/types/business";
import { ArrowUpRight, MapPin, Tag, MessageCircle, ExternalLink } from "lucide-react";

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group h-full">
      {/* Cover Image */}
      <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
        <Image
          src={business.coverUrl}
          alt={business.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Subdomain tag */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-[11px] font-mono font-medium backdrop-blur-md border border-white/10 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {business.subdomain}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-lg bg-white/95 text-slate-800 text-[11px] font-bold backdrop-blur-md border border-slate-200 shadow-xs">
            {business.categoryLabel}
          </span>
        </div>

        {/* Name and location */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-xl font-heading font-extrabold text-white leading-snug drop-shadow-xs">
            {business.name}
          </h3>
          <div className="flex items-center gap-1 text-[11px] text-slate-200 mt-0.5">
            <MapPin className="w-3 h-3 text-brand-400" />
            <span>{business.address || business.city}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
          {business.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {business.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
            >
              <Tag className="w-2.5 h-2.5 text-slate-400" />
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {business.whatsapp ? (
            <a
              href={`https://wa.me/${business.whatsapp}?text=Hola,%20los%20encontr%C3%A9%20en%20Qatu.pe`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold transition-colors"
              aria-label={`Escribir por WhatsApp a ${business.name}`}
              title="Pedir por WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          ) : <div />}

          <a
            href={`https://${business.subdomain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-card hover:shadow-card-hover active:scale-95 transition-all"
          >
            <span>Visitar web</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  );
}
