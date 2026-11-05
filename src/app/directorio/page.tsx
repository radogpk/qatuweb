import { PageIntro } from "@/components/shared/PageIntro";
import { Metadata } from "next";
import Link from "next/link";
import { getBusinesses } from "@/lib/data/businesses.repo";
import { DirectoryView } from "@/components/directory/DirectoryView";
import { BusinessJsonLd } from "@/components/directory/BusinessJsonLd";
import { ArrowRight, PlusCircle } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/directorio" },
  title: "Directorio de Negocios — Vitrina Digital",
  description:
    "Explora los negocios peruanos con presencia web activa en Qatu.pe: florerías, hoteles, restaurantes y comercios locales con sus propios subdominios.",
};

export const revalidate = 60;

export default async function DirectorioPage() {
  const businesses = await getBusinesses();

  return (
    <div className="site-page">
      <BusinessJsonLd businesses={businesses} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <PageIntro
          eyebrow="Directorio"
          title="Negocios de aquí. A un clic de ti."
          description="Encuentra comercios, explora sus catálogos y conversa directamente con ellos."
        />

        {/* Interactive Directory View */}
        <DirectoryView initialBusinesses={businesses} />

        {/* Join the directory CTA Banner */}
        <div className="mt-16 bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider">
              <PlusCircle className="w-4 h-4 text-brand-600" />
              <span>Suma tu negocio a Qatu</span>
            </div>
            <h2 className="text-2xl font-heading font-extrabold text-slate-900">
              ¿Tienes un negocio y quieres tu propio subdominio?
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Diseñamos tu página web, publicamos tu catálogo en{" "}
              <strong className="text-slate-900">tunegocio.qatu.pe</strong> y te
              sumamos a este directorio con visibilidad compartida.
            </p>
          </div>

          <Link
            href="/para-tu-negocio"
            prefetch={true}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-card hover:shadow-card-hover flex items-center gap-2 transition-all active:scale-95"
          >
            <span>Ver cómo funciona</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
