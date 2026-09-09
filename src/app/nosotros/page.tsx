import { Metadata } from "next";
import Link from "next/link";
import { 
  Store, 
  HeartHandshake, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  User, 
  MessageCircle,
  Zap,
  Code
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Sobre Qatu — Proyecto y Misión",
  description:
    "Conoce la historia detrás de Qatu.pe: una iniciativa independiente nacida en Ayacucho para que todo negocio local tenga su propia página web sin complicaciones.",
};

export default function NosotrosPage() {
  const values = [
    {
      icon: HeartHandshake,
      title: "Trato personal y directo",
      desc: "Aquí no hay bots impersonales ni intermediarios. Hablas directamente conmigo por WhatsApp para diseñar tu web, subir tus fotos o actualizar tus precios.",
    },
    {
      icon: ShieldCheck,
      title: "Cero comisiones por venta",
      desc: "El 100% de cada pedido va directo a tu cuenta o a tu caja. Tu negocio crece con tu esfuerzo; Qatu solo cobra una tarifa fija y justa por el servicio técnico.",
    },
    {
      icon: Store,
      title: "Orgullo por el comercio local",
      desc: "Qatu significa 'mercado' en quechua. Nació para respaldar a las florerías, hoteles, cafeterías, artesanos y comercios de Ayacucho y del Perú.",
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            <span>INICIATIVA INDEPENDIENTE · AYACUCHO, PERÚ 🇵🇪</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            Construyendo tecnología accesible para el comercio local.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Qatu nació con un propósito claro: que cualquier comerciante o emprendedor en Ayacucho y en el Perú pueda tener su propia web profesional sin pagar fortunas ni enredarse con servidores.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-slate-200 shadow-card space-y-6">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block">
              La Historia
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              ¿Por qué creé Qatu?
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Caminando por Huamanga y conversando con dueños de florerías, hoteles boutique, cafeterías y artesanos, noté una realidad constante: tienen productos de primera calidad y atención cálida, pero su presencia digital se limitaba a fotos sueltas en estados de WhatsApp o páginas de Facebook abandonadas.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Mandar a hacer una página web tradicional con agencias costaba miles de soles, tardaba semanas y obligaba a contratar a alguien cada vez que cambiaba un precio en la carta. En el otro extremo, las aplicaciones de delivery y reservas cobraban hasta 18% de comisión por cada venta, comiéndose el margen del comerciante.
            </p>
            <p className="text-base text-slate-900 font-bold leading-relaxed">
              Decidí crear Qatu como una infraestructura moderna y ligera: un espacio donde cada negocio tiene su propio subdominio independiente (<span className="text-brand-600">tunegocio.qatu.pe</span>), catálogo optimizado para celular, cobros por Yape/Plin y soporte personal continuo.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-2 text-xs sm:text-sm text-brand-600 font-bold border-t border-slate-100">
            <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
            <span>Desarrollado en Huamanga, Ayacucho — Impulsando negocios en todo el Perú</span>
          </div>
        </div>

        {/* Founder / Personal Dedication Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
              <div className="w-20 h-20 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
                <Code className="w-10 h-10 text-brand-400" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900">
                  Desarrollador & Creador
                </h3>
                <span className="text-xs font-bold text-brand-600 block">
                  Fundador de Qatu.pe
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  Atención directa y desarrollo 100% personalizado
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
              <h4 className="font-heading font-bold text-lg text-slate-900">
                El valor de hablar con quien construye la plataforma
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Por ahora soy solo yo detrás de este proyecto. Eso significa que no hay departamentos de soporte burocráticos ni respuestas automáticas de copia y pega. 
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cuando me escribes para solicitar tu web, me encargo personalmente de revisar tus fotos, organizar tu catálogo, configurar tu subdominio y asegurar que tus clientes puedan pedirte con total fluidez.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Respuesta rápida por WhatsApp</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Soporte y mantenimiento continuo</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Pillars / Values Section */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
              Nuestros Pilares
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              Los principios que guían este proyecto
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-card hover:shadow-card-hover transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-slate-900">
                      {v.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Direct Founder CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl text-center space-y-6 max-w-4xl mx-auto border border-slate-800">
          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white leading-tight">
            ¿Tienes un negocio y te gustaría tener tu propia web?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Escríbeme directamente por WhatsApp. Te muestro cómo quedaría tu página con tus productos y evaluamos juntos la mejor opción sin ningún compromiso.
          </p>
          <div className="pt-2">
            <a
              href={getWhatsAppUrl("Hola, leí sobre el proyecto Qatu y me gustaría conversar sobre una página web para mi negocio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm sm:text-base font-semibold shadow-card hover:shadow-card-hover transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Conversar conmigo por WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
