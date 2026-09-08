import { siteConfig, getWhatsAppUrl } from "@/lib/config/site";
import { MessageCircle, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

export function DirectWhatsAppCard() {
  return (
    <div className="space-y-6">
      {/* WhatsApp Business Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-card space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
            <MessageCircle className="w-6 h-6 fill-white" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Canal Prioritario
            </span>
            <h3 className="text-xl font-heading font-extrabold text-white">
              WhatsApp Business
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          ¿Prefieres una respuesta inmediata? Escríbenos directamente y te atenderá un miembro de nuestro equipo sin esperas.
        </p>

        <a
          href={getWhatsAppUrl("Hola Qatu, deseo consultar sobre una página web para mi negocio.")}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <span>Escribir al WhatsApp (+51 966 123 456)</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Office & Direct info */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-card space-y-5">
        <h3 className="font-heading font-bold text-lg text-slate-900">
          Información de Contacto
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block font-heading">Sede Principal:</strong>
              <span>Huamanga, Ayacucho, Perú</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block font-heading">Correo Electrónico:</strong>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-brand-600 underline decoration-dotted"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block font-heading">Horario de Atención:</strong>
              <span>Lunes a Sábado: 8:00 AM – 8:00 PM</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 text-xs text-slate-400">
          RUC: 20610987654 · Qatu Digital S.A.C.
        </div>
      </div>
    </div>
  );
}
