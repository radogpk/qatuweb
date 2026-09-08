import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/config/site";
import { ArrowUpRight, Store, ShieldCheck, Sparkles, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#E8DEC8]">
      {/* Background Decorative Gradient/Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#D4A017_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF6E5] border border-[#D4A017]/40 text-[#2B3A55] text-xs sm:text-sm font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-[#D4A017]" />
            <span>Mercado digital y presencia web para negocios peruanos</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2B3A55] tracking-tight leading-[1.15]">
            Tu puesto en el <span className="text-[#B23A2E] underline decoration-[#D4A017] decoration-wavy decoration-2">mercado digital</span> del Perú
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#4A5B78] max-w-2xl mx-auto leading-relaxed">
            Obtén tu propia página web en tu subdominio oficial (<span className="font-semibold text-[#2B3A55]">tunegocio.qatu.pe</span>) con catálogo interactivo, pedidos directos a tu WhatsApp y soporte continuo. Sin enredos técnicos ni comisiones por venta.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl("Hola Qatu, quiero solicitar mi página web y subdominio para mi negocio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#B23A2E] hover:bg-[#962E24] text-white font-semibold text-base shadow-md hover:shadow-lg transition-all active:scale-95 group"
            >
              <span>Quiero mi web</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <Link
              href="#vitrina"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#E8DEC8] text-[#2B3A55] font-semibold text-base shadow-xs hover:border-[#D4A017] transition-all"
            >
              <Store className="w-4 h-4 text-[#D4A017]" />
              <span>Ver negocios activos</span>
            </Link>
          </div>

          {/* Trust Value Badges */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left sm:text-center text-xs text-[#2B3A55]/80 font-medium">
            <div className="flex items-center sm:justify-center gap-2 p-2.5 rounded-xl bg-white/60 border border-[#E8DEC8]">
              <Zap className="w-4 h-4 text-[#D4A017]" />
              <span>Web lista en 3 a 5 días hábiles</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2 p-2.5 rounded-xl bg-white/60 border border-[#E8DEC8]">
              <ShieldCheck className="w-4 h-4 text-[#B23A2E]" />
              <span>Subdominio SSL + hosting incluido</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2 p-2.5 rounded-xl bg-white/60 border border-[#E8DEC8]">
              <Store className="w-4 h-4 text-[#2B3A55]" />
              <span>0% comisiones sobre tus ventas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
