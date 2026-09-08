import { Metadata } from "next";
import Link from "next/link";
import { getBusinesses } from "@/lib/data/businesses.repo";
import { DirectoryView } from "@/components/directory/DirectoryView";
import { BusinessJsonLd } from "@/components/directory/BusinessJsonLd";
import { ArrowRight, PlusCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Directorio de Negocios — Vitrina Digital",
  description:
    "Explora los negocios peruanos con presencia web activa en Qatu.pe: florerías, hoteles, restaurantes y comercios locales con sus propios subdominios.",
};

export const revalidate = 60;

export default async function DirectorioPage() {
  const businesses = await getBusinesses();

  return (
    <div className="py-12 sm:py-16 bg-[#FAF9F6]">
      <BusinessJsonLd businesses={businesses} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B23A2E]">
            Mercado Digital Qatu
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2838] tracking-tight">
            Directorio de Negocios
          </h1>
          <p className="text-sm sm:text-base text-[#4B586E] leading-relaxed">
            Navega por la vitrina de negocios locales. Cada tarjeta te lleva directo al subdominio independiente del comercio, donde podrás ver su carta o catálogo completo y pedir por WhatsApp.
          </p>
        </div>

        {/* Interactive Directory View */}
        <DirectoryView initialBusinesses={businesses} />

        {/* Join the directory CTA Banner */}
        <div className="mt-16 bg-white rounded-2xl p-8 sm:p-10 border border-[#EAE6DF] shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C59218] uppercase tracking-wider">
              <PlusCircle className="w-4 h-4 text-[#C59218]" />
              <span>Suma tu negocio a Qatu</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1E2838]">
              ¿Tienes un negocio en Ayacucho o el Perú y quieres tu propio subdominio?
            </h2>
            <p className="text-xs sm:text-sm text-[#4B586E] max-w-xl">
              Diseñamos tu página web, publicamos tu catálogo en tunegocio.qatu.pe y te sumamos a este directorio con tráfico compartido.
            </p>
          </div>

          <Link
            href="/para-tu-negocio"
            className="shrink-0 px-6 py-3.5 rounded-xl bg-[#B23A2E] hover:bg-[#962E24] text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition-all active:scale-98"
          >
            <span>Ver cómo funciona</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
