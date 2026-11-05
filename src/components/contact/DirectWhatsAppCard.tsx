import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { MessageCircle, Mail, MapPin, ArrowUpRight } from "lucide-react";

export function DirectWhatsAppCard() {
  return (
    <aside className="overflow-hidden rounded-2xl border border-[#d5dccb] bg-gradient-to-br from-[#eef2e6] via-[#f6f5eb] to-[#fffaf1] p-6 sm:p-8 shadow-[0_8px_30px_-24px_#283d30]">
      <div className="mb-8 flex items-center gap-3 text-[#476047]">
        <MessageCircle aria-hidden="true" className="h-5 w-5" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">
          Contacto directo
        </p>
      </div>

      <h2 className="max-w-xs font-heading text-[32px] font-semibold leading-[1.12] tracking-[-0.035em] text-[#2d3d30] sm:text-[36px]">
        Hablemos de tu negocio.
      </h2>
      <p className="mt-4 max-w-sm text-sm leading-7 text-[#596650]">
        Si prefieres conversar, empieza por WhatsApp. Cuéntanos qué vendes y qué
        necesitas de tu web.
      </p>

      <a
        href={getWhatsAppUrl(
          "Hola Qatu, deseo consultar sobre una página web para mi negocio.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-7 flex min-h-[52px] w-full items-center justify-between gap-3 rounded-lg bg-[#2d4936] px-5 py-3.5 text-sm font-semibold text-[#fffdf5] transition duration-200 hover:bg-[#203b29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2d4936] active:scale-[0.98]"
      >
        <span>
          Abrir WhatsApp
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
        />
      </a>

      <address className="mt-8 space-y-5 border-t border-[#d4dbca] pt-6 not-italic">
        <div>
          <p className="mb-1 text-xs text-[#64715c]">También por correo</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex min-h-[44px] max-w-full items-center gap-3 text-sm font-medium text-[#324732] underline decoration-[#aebba5] underline-offset-4 transition-colors hover:text-brand-700"
          >
            <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span className="break-all">{siteConfig.email}</span>
          </a>
        </div>

        <div className="flex items-start gap-3 text-[#52624a]">
          <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-[#324732]">Desde Ayacucho</p>
            <p className="text-xs leading-5">{siteConfig.location}</p>
          </div>
        </div>
      </address>
    </aside>
  );
}
