import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { MessageCircle, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

export function DirectWhatsAppCard() {
  return (
    <div className="space-y-6">
      {/* WhatsApp Business Card */}
      <div className="bg-[#1E2838] text-white rounded-2xl p-8 border border-[#121A24] shadow-card space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
            <MessageCircle className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#C59218] uppercase tracking-wider block">
              Canal Prioritario
            </span>
            <h3 className="text-xl font-serif font-bold text-white">
              WhatsApp Business
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#FAF9F6]/80 leading-relaxed">
          ¿Prefieres una respuesta inmediata? Escríbenos directamente y te atenderá un miembro de nuestro equipo sin intermediarios.
        </p>

        <a
          href={getWhatsAppUrl("Hola Qatu, deseo consultar sobre una página web para mi negocio.")}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-center font-semibold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <span>Escribir al WhatsApp (+51 966 123 456)</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Office & Direct info */}
      <div className="bg-white rounded-2xl p-8 border border-[#EAE6DF] shadow-card space-y-5">
        <h3 className="font-serif font-bold text-lg text-[#1E2838]">
          Información de Contacto
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-[#4B586E]">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#B23A2E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1E2838] block">Sede Principal:</strong>
              <span>Huamanga, Ayacucho, Perú</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-[#C59218] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1E2838] block">Correo Electrónico:</strong>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-[#B23A2E] underline decoration-dotted"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#1E2838] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1E2838] block">Horario de Atención:</strong>
              <span>Lunes a Sábado: 8:00 AM – 8:00 PM</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#EAE6DF] text-[11px] text-[#4B586E]/70">
          RUC: 20610987654 · Qatu Digital S.A.C.
        </div>
      </div>
    </div>
  );
}
