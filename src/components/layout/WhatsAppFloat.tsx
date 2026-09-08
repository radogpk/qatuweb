import { getWhatsAppUrl } from "@/lib/config/site";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <aside aria-label="Contacto flotante" className="fixed bottom-6 right-6 z-40">
      <a
        href={getWhatsAppUrl("Hola Qatu, deseo información para crear la página web de mi negocio.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
        aria-label="Contactar por WhatsApp Business"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="text-sm font-semibold tracking-tight hidden sm:inline">
          ¿Hablamos por WhatsApp?
        </span>
      </a>
    </aside>
  );
}
