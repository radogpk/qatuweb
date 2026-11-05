import { Metadata } from "next";
import { initialClassifieds } from "@/lib/seed/initialClassifieds";
import { ClassifiedsView } from "@/components/classifieds/ClassifiedsView";

export const metadata: Metadata = {
  alternates: { canonical: "/anuncios" },
  title: "Locales, traspasos y equipamiento en Ayacucho",
  description:
    "Encuentra locales comerciales en alquiler, traspasos de negocios en marcha y compra/venta de equipamiento en Ayacucho. Trato directo entre dueños y comerciantes sin comisiones.",
};

export default function AnunciosPage() {
  return (
    <div className="site-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClassifiedsView initialAds={initialClassifieds} />
      </div>
    </div>
  );
}
