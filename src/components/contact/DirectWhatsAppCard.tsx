import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { MessageCircle, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

export function DirectWhatsAppCard() {
  return (
    <div className="space-y-6">
      {/* WhatsApp Business Card */}
      <div className="bg-[#2B3A55] text-white rounded-3xl p-8 border border-[#1A2436] shadow-warm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
            <MessageCircle className="w-6 h-6 fill-white" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#D4A017] uppercase tracking-wider block">
              Canal Prioritario
            </span>
            <h3 className="text-xl font-serif font-bold text-white">
              WhatsApp Business
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
          ¿Prefieres una respuesta inmediata? Escríbenos directamente y te atenderá un miembro de nuestro equipo sin intermediarios.
        </p>

        <a
          href={getWhatsAppUrl("Hola Qatu, deseo consultar sobre una página web para mi negocio.")}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
        >
          <span>Escribir al WhatsApp (+51 966 123 456)</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Office & Direct info */}
      <div className="bg-white rounded-3xl p-8 border border-[#E8DEC8] shadow-warm space-y-5">
        <h3 className="font-serif font-bold text-lg text-[#2B3A55]">
          Información de Contacto
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-[#4A5B78]">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#B23A2E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2B3A55] block">Sede Principal:</strong>
              <span>Huamanga, Ayacucho, Perú</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2B3A55] block">Correo Electrónico:</strong>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-[#B23A2E] underline decoration-dotted"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#2B3A55] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2B3A55] block">Horario de Atención:</strong>
              <span>Lunes a Sábado: 8:00 AM – 8:00 PM</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#E8DEC8] text-[11px] text-[#4A5B78]/70">
          RUC: 20610987654 · Qatu Digital S.A.C.
        </div>
      </div>
    </div>
  );
}
