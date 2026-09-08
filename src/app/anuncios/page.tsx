import { Metadata } from "next";
import { initialClassifieds } from "@/lib/seed/initialClassifieds";
import { ClassifiedsView } from "@/components/classifieds/ClassifiedsView";

export const metadata: Metadata = {
  title: "Anuncios y Alquileres Comerciales en Ayacucho",
  description:
    "Tablón de anuncios clasificados para negocios en Qatu: alquiler de locales comerciales, stands, traspasos de cafeterías y venta de equipamiento gastronómico.",
};

export default function AnunciosPage() {
  return (
    <div className="py-12 sm:py-16 bg-[#F5EFE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
            Tablón Comunitario
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2B3A55] tracking-tight">
            Anuncios, Alquileres y Traspasos
          </h1>
          <p className="text-sm sm:text-base text-[#4A5B78] leading-relaxed">
            Un espacio de encuentro para comerciantes y emprendedores: encuentra o publica locales en alquiler, traspasos de negocios en marcha y compra/venta de equipamiento comercial en Ayacucho.
          </p>
        </div>

        {/* View */}
        <ClassifiedsView initialAds={initialClassifieds} />
      </div>
    </div>
  );
}
