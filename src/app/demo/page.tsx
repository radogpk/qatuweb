import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  Smartphone,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Zap,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { ALL_DEMO_PRESETS } from '@/templates/storefront-base/tenant.config';

export const metadata = {
  title: 'Showroom de Tiendas Demo • Qatu Web',
  description:
    'Explora las 6 tiendas virtuales interactivas diseñadas a medida para comercios de Huamanga, Ayacucho: calzados, pastelería, pollería, gimnasio, cosmética y licorería.',
};

export default function DemoShowroomPage() {
  const demosList = [
    {
      slug: 'calzados',
      rubroLabel: 'Calzados & Streetwear',
      icon: '👟',
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
      rubroLabel: 'Pastelería & Cafetería',
      icon: '🍰',
      name: ALL_DEMO_PRESETS.pasteleria.config.businessName,
      tagline: ALL_DEMO_PRESETS.pasteleria.config.tagline,
      location: ALL_DEMO_PRESETS.pasteleria.config.location,
      badge: 'Repostería Fina',
      heroImage: ALL_DEMO_PRESETS.pasteleria.config.hero.bannerUrl,
      accentColor: '#A46A3F',
      features: ['Dedicatoria en chocolate personalizada', 'Selector de porciones 10p / 20p', 'Reserva con fecha y hora'],
    },
    {
      slug: 'polleria',
      rubroLabel: 'Pollería & Parrillas',
      icon: '🍗',
      name: ALL_DEMO_PRESETS.polleria.config.businessName,
      tagline: ALL_DEMO_PRESETS.polleria.config.tagline,
      location: ALL_DEMO_PRESETS.polleria.config.location,
      badge: 'Delivery Nocturno',
      heroImage: ALL_DEMO_PRESETS.polleria.config.hero.bannerUrl,
      accentColor: '#A62920',
      features: ['Combos familiares con papas nativas', 'Selector de 4 cremas peruanas', 'Despacho express con Yape'],
    },
    {
      slug: 'gym',
      rubroLabel: 'Gym & Nutrición',
      icon: '🏋️',
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
      rubroLabel: 'Belleza & Skincare',
      icon: '💄',
      name: ALL_DEMO_PRESETS.belleza.config.businessName,
      tagline: ALL_DEMO_PRESETS.belleza.config.tagline,
      location: ALL_DEMO_PRESETS.belleza.config.location,
      badge: 'Boutique Cosmética',
      heroImage: ALL_DEMO_PRESETS.belleza.config.hero.bannerUrl,
      accentColor: '#9F1239',
      features: ['Swatches circulares de tono', 'Filtro por rutina de piel', 'Asesoría personalizada por WhatsApp'],
    },
    {
      slug: 'licoreria',
      rubroLabel: 'Licorería & Delivery 24/7',
      icon: '🍻',
      name: ALL_DEMO_PRESETS.licoreria.config.businessName,
      tagline: ALL_DEMO_PRESETS.licoreria.config.tagline,
      location: ALL_DEMO_PRESETS.licoreria.config.location,
      badge: 'Dark Store Nocturna',
      heroImage: ALL_DEMO_PRESETS.licoreria.config.hero.bannerUrl,
      accentColor: '#38BDF8',
      features: ['Combos chilcanos listos con hielo', 'Add-ons rápidos de vasos y piqueos', 'Confirmación de mayoría de edad'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F2] text-[#171717]">
      {/* Header Superior Showroom */}
      <header className="bg-slate-950 text-white border-b border-slate-800 py-4 px-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center font-black text-white text-base shadow-sm group-hover:scale-105 transition">
              Q
            </span>
            <div>
              <span className="font-black tracking-tight text-sm uppercase block leading-none">
                Qatu Web
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                Showroom Oficial de Demos
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/planes"
              className="text-xs font-semibold text-slate-300 hover:text-white transition hidden sm:inline-block"
            >
              Ver Planes (S/ 30/mes)
            </Link>
            <a
              href="https://wa.me/51941663265?text=Hola%20Qatu%20Web,%20quiero%20probar%20una%20tienda%20para%20mi%20negocio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition active:scale-95 inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Solicitar para Mi Negocio</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Showroom */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Tecnología E-Commerce 100% Adaptada a Huamanga</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight max-w-3xl mx-auto">
          Prueba nuestras tiendas virtuales{' '}
          <span className="text-red-600">en vivo y en directo</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Haz clic en cualquier rubro para interactuar con la tienda real tal como la verá tu
          cliente. Agrega productos al carrito, prueba los selectores y simula un pedido directo
          a WhatsApp con pago Yape o Plin.
        </p>
      </section>

      {/* Grid de Demos */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demosList.map((demo) => (
            <div
              key={demo.slug}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Imagen de Cabecera con Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={demo.heroImage}
                    alt={demo.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/70 text-white backdrop-blur-md">
                    {demo.badge}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs font-mono opacity-80 block">
                      {demo.icon} {demo.rubroLabel}
                    </span>
                    <h3 className="text-lg font-black leading-tight">{demo.name}</h3>
                  </div>
                </div>

                {/* Contenido y Beneficios */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {demo.tagline}
                  </p>

                  <div className="pt-2 border-t border-stone-100 space-y-1.5">
                    {demo.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="p-5 pt-0 space-y-2">
                <Link
                  href={`/demo/${demo.slug}`}
                  className="w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider text-white shadow-md transition active:scale-95 flex items-center justify-center gap-2"
                  style={{ backgroundColor: demo.accentColor }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Probar Tienda Cliente ↗</span>
                </Link>

                <Link
                  href={`/demo/${demo.slug}/admin`}
                  className="w-full py-2.5 rounded-2xl text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-3.5 h-3.5 text-stone-500" />
                  <span>Simular Panel de Bolsillo (Dueño)</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Comercial Inferior */}
        <div className="mt-16 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-wider inline-block">
              Oferta Lanzamiento en Huamanga
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
              ¿Quieres una tienda así con el logo y productos de tu negocio?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              La dejamos lista en menos de 24 horas por solo <strong>S/ 30 al mes</strong>. Sin
              comisiones por venta, tus clientes piden directo a tu WhatsApp y cobran con Yape o
              Plin al 100% para ti.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://wa.me/51941663265?text=Hola%20Qatu%20Web,%20vi%20las%20demos%20y%20quiero%20crear%20mi%20tienda"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 font-black text-xs uppercase tracking-wider text-white shadow-lg transition active:scale-95 inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Hablar por WhatsApp con un Asesor</span>
              </a>
              <Link
                href="/planes"
                className="px-6 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 font-bold text-xs uppercase tracking-wider text-white transition active:scale-95 inline-flex items-center gap-1.5"
              >
                <span>Ver Planes y Precios</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
