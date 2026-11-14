import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShoppingBag,
  Smartphone,
  CheckCircle2,
  Sparkles,
  Flame,
  Coffee,
  Dumbbell,
  Wine,
  MessageCircle,
} from 'lucide-react';
import { ALL_DEMO_PRESETS } from '@/templates/storefront-base/tenant.config';

export const metadata = {
  title: 'Showroom de Tiendas Demo • Qatu Web',
  description:
    'Explora las 6 tiendas virtuales interactivas diseñadas por rubro comercial: calzado, pastelería, pollería, gimnasio, cosmética y licorería.',
};

export default function DemoShowroomPage() {
  const demosList = [
    {
      slug: 'calzados',
      rubroLabel: 'Calzado & Cuero',
      name: ALL_DEMO_PRESETS.calzados.config.businessName,
      tagline: ALL_DEMO_PRESETS.calzados.config.tagline,
      location: ALL_DEMO_PRESETS.calzados.config.location,
      badge: 'Boutique Urbana',
      heroImage: ALL_DEMO_PRESETS.calzados.config.hero.bannerUrl,
      accentColor: '#B91C1C',
      features: ['Selector interactivo de tallas', 'Filtro por material y acabado', 'Checkout directo a WhatsApp'],
    },
    {
      slug: 'pasteleria',
      rubroLabel: 'Pastelería & Café',
      name: ALL_DEMO_PRESETS.pasteleria.config.businessName,
      tagline: ALL_DEMO_PRESETS.pasteleria.config.tagline,
      location: ALL_DEMO_PRESETS.pasteleria.config.location,
      badge: 'Repostería Fina',
      heroImage: ALL_DEMO_PRESETS.pasteleria.config.hero.bannerUrl,
      accentColor: '#291508',
      features: ['Dedicatoria en chocolate personalizada', 'Selector de porciones 10p / 20p', 'Reserva con fecha y hora'],
    },
    {
      slug: 'polleria',
      rubroLabel: 'Pollería & Parrillas',
      name: ALL_DEMO_PRESETS.polleria.config.businessName,
      tagline: ALL_DEMO_PRESETS.polleria.config.tagline,
      location: ALL_DEMO_PRESETS.polleria.config.location,
      badge: 'Delivery Nocturno',
      heroImage: ALL_DEMO_PRESETS.polleria.config.hero.bannerUrl,
      accentColor: '#A62920',
      features: ['Combos familiares con papas nativas', 'Selector de salsas artesanales', 'Despacho express con Yape'],
    },
    {
      slug: 'gym',
      rubroLabel: 'Gym & Fitness',
      name: ALL_DEMO_PRESETS.gym.config.businessName,
      tagline: ALL_DEMO_PRESETS.gym.config.tagline,
      location: ALL_DEMO_PRESETS.gym.config.location,
      badge: 'Centro Fitness',
      heroImage: ALL_DEMO_PRESETS.gym.config.hero.bannerUrl,
      accentColor: '#10B981',
      features: ['Métricas de aforo en tiempo real', 'Comparador de membresías 30/90 días', 'Tienda de suplementos y proteínas'],
    },
    {
      slug: 'belleza',
      rubroLabel: 'Belleza & Cosmética',
      name: ALL_DEMO_PRESETS.belleza.config.businessName,
      tagline: ALL_DEMO_PRESETS.belleza.config.tagline,
      location: ALL_DEMO_PRESETS.belleza.config.location,
      badge: 'Boutique Cosmética',
      heroImage: ALL_DEMO_PRESETS.belleza.config.hero.bannerUrl,
      accentColor: '#9F1239',
      features: ['Muestras circulares de tono', 'Filtro por rutina de piel', 'Asesoría de tono por WhatsApp'],
    },
    {
      slug: 'licoreria',
      rubroLabel: 'Licorería Delivery',
      name: ALL_DEMO_PRESETS.licoreria.config.businessName,
      tagline: ALL_DEMO_PRESETS.licoreria.config.tagline,
      location: ALL_DEMO_PRESETS.licoreria.config.location,
      badge: 'Dark Store',
      heroImage: ALL_DEMO_PRESETS.licoreria.config.hero.bannerUrl,
      accentColor: '#38BDF8',
      features: ['Combos chilcanos listos con hielo', 'Add-ons de vasos y piqueos', 'Verificación de mayoría de edad'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121212] font-sans">
      {/* Header Showroom */}
      <header className="bg-black text-white border-b border-stone-800 py-3 px-4 sticky top-0 z-40 font-mono text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold tracking-tight uppercase">QATU WEB</span>
            <span className="text-stone-500">/</span>
            <span className="text-stone-400">SHOWROOM DE DEMOS</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/planes"
              className="text-stone-400 hover:text-white transition hidden sm:inline-block"
            >
              PLANES (S/ 30/MES)
            </Link>
            <a
              href="https://wa.me/51941663265?text=Hola%20Qatu%20Web,%20quiero%20probar%20una%20tienda%20para%20mi%20negocio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 uppercase tracking-wider transition inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>CONSULTAR POR WHATSAPP</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Showroom */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-6 text-center">
        <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 block mb-2">
          ARQUITECTURA DE E-COMMERCE MOVIL Y ESCRITORIO
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-display max-w-3xl mx-auto">
          Catálogos interactivos diseñados por rubro
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed font-sans">
          Selecciona una vertical para explorar la experiencia de compra en vivo: navegación por catálogo, personalización de productos y generación de pedido estructurado a WhatsApp con pago Yape o Plin.
        </p>
      </section>

      {/* Grid de Demos */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demosList.map((demo) => (
            <div
              key={demo.slug}
              className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Imagen de Cabecera con Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={demo.heroImage}
                    alt={demo.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-black text-white">
                    {demo.badge}
                  </span>
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-[10px] font-mono opacity-80 block uppercase">
                      {demo.rubroLabel}
                    </span>
                    <h3 className="text-base font-black uppercase font-display leading-tight">
                      {demo.name}
                    </h3>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-4 space-y-3 font-sans">
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {demo.tagline}
                  </p>

                  <div className="pt-2 border-t border-stone-100 space-y-1.5 font-mono text-[11px]">
                    {demo.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-stone-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="p-4 pt-0 space-y-2 font-mono">
                <Link
                  href={`/demo/${demo.slug}`}
                  className="w-full py-2.5 rounded text-xs font-bold uppercase tracking-wider text-white transition active:scale-95 flex items-center justify-center gap-2"
                  style={{ backgroundColor: demo.accentColor }}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>PROBAR TIENDA ↗</span>
                </Link>

                <Link
                  href={`/demo/${demo.slug}/admin`}
                  className="w-full py-2 rounded text-[11px] font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Smartphone className="w-3 h-3 text-stone-500" />
                  <span>PANEL DE BOLSILLO</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
