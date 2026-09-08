import { getWhatsAppUrl } from "@/lib/config/site";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <aside aria-label="Contacto flotante" className="fixed bottom-6 right-6 z-40">
      <a
        href={getWhatsAppUrl("Hola Qatu, deseo información para crear la página web de mi negocio.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group focus:outline-hidden focus:ring-4 focus:ring-emerald-500/30 active:scale-95"
        aria-label="Contactar por WhatsApp Business"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="text-sm font-semibold tracking-tight hidden sm:inline">
          ¿Hablamos por WhatsApp?
        </span>
      </a>
    </aside>
  );
}
