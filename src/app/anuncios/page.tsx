import { Metadata } from "next";
import { initialClassifieds } from "@/lib/seed/initialClassifieds";
import { ClassifiedsView } from "@/components/classifieds/ClassifiedsView";
import { Megaphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Anuncios y Alquileres Comerciales en Ayacucho",
  description:
    "Tablón de anuncios clasificados para negocios en Qatu: alquiler de locales comerciales, stands, traspasos de cafeterías y venta de equipamiento comercial.",
};

export default function AnunciosPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <Megaphone className="w-3.5 h-3.5 text-amber-600" />
            <span>Tablón Comercial y de Oportunidades</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Anuncios, Alquileres y Traspasos
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Un espacio de encuentro para comerciantes y emprendedores: encuentra o publica locales en alquiler, traspasos de negocios en marcha y compra/venta de equipamiento comercial en Ayacucho.
          </p>
        </div>

        {/* View */}
        <ClassifiedsView initialAds={initialClassifieds} />
      </div>
    </div>
  );
}
