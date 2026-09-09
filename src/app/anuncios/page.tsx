import { Metadata } from "next";
import { initialClassifieds } from "@/lib/seed/initialClassifieds";
import { ClassifiedsView } from "@/components/classifieds/ClassifiedsView";

export const metadata: Metadata = {
  title: "Locales Comerciales, Traspasos y Equipamiento en Ayacucho | Qatu",
  description:
    "Encuentra locales comerciales en alquiler, traspasos de negocios en marcha y compra/venta de equipamiento en Ayacucho. Trato directo entre dueños y comerciantes sin comisiones.",
};

export default function AnunciosPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClassifiedsView initialAds={initialClassifieds} />
      </div>
    </div>
  );
}


