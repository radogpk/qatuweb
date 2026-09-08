import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/config/site";
import { ArrowUpRight, Zap, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#EAE6DF]">
      {/* Suave degradado radial atmosférico en Índigo y Terracota (sin puntos ni suciedad) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-[#B23A2E]/5 via-[#1E2838]/4 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 left-1/3 w-[350px] h-[300px] bg-[#B23A2E]/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-16 right-1/3 w-[380px] h-[320px] bg-[#1E2838]/4 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Eyebrow / Indicador sobrio */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F4F1EA] border border-[#EAE6DF] text-[#4B586E] text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B23A2E]" />
            <span>Infraestructura web para comercios y servicios peruanos</span>
          </div>

          {/* Heading sin subrayado en zigzag; Fraunces en itálica refinada */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1E2838] tracking-tight leading-[1.12]">
            Tu puesto en el{" "}
            <span className="text-[#B23A2E] italic font-normal">
              mercado digital
            </span>{" "}
            del Perú
          </h1>

          {/* Subtítulo */}
          <p className="text-base sm:text-lg text-[#4B586E] max-w-2xl mx-auto leading-relaxed">
            Obtén tu página web en tu propio subdominio (<span className="font-semibold text-[#1E2838]">tunegocio.qatu.pe</span>) con catálogo interactivo, pedidos directos a tu WhatsApp y soporte mensual incluido. Cero complicaciones técnicas, nacido en Ayacucho.
          </p>

          {/* Botones de acción con radio equilibrado */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={getWhatsAppUrl("Hola Qatu, quiero solicitar mi página web y subdominio para mi negocio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#B23A2E] hover:bg-[#962E24] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow transition-all active:scale-98 group"
            >
              <span>Quiero mi web</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <Link
              href="#vitrina"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F4F1EA] border border-[#EAE6DF] text-[#1E2838] font-semibold text-sm sm:text-base shadow-xs hover:border-[#C59218] transition-all"
            >
              <span>Ver vitrina de negocios</span>
              <ArrowRight className="w-4 h-4 text-[#4B586E]" />
            </Link>
          </div>

          {/* Franja unificada de confianza y valor (sin píldoras flotantes aisladas) */}
          <div className="pt-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#EAE6DF] rounded-2xl bg-white border border-[#EAE6DF] p-2 shadow-xs text-xs text-[#4B586E]">
              <div className="flex items-center justify-center gap-2 py-2.5 px-3">
                <Zap className="w-4 h-4 text-[#C59218] shrink-0" />
                <span className="font-medium text-[#1E2838]">Entrega en 3 a 5 días</span>
              </div>
              <div className="flex items-center justify-center gap-2 py-2.5 px-3">
                <ShieldCheck className="w-4 h-4 text-[#B23A2E] shrink-0" />
                <span className="font-medium text-[#1E2838]">Subdominio SSL + hosting</span>
              </div>
              <div className="flex items-center justify-center gap-2 py-2.5 px-3">
                <CheckCircle2 className="w-4 h-4 text-[#1E2838] shrink-0" />
                <span className="font-medium text-[#1E2838]">0% comisiones por venta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
