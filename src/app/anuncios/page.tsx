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
    <main className="min-h-screen bg-slate-50">
      <ClassifiedsView initialAds={initialClassifieds} />
    </main>
  );
}

