'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Globe2,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
  Store,
  Utensils,
  Dumbbell,
  CheckCircle2,
  X,
  ExternalLink,
  Layers,
  Database,
  Building2,
  Clock,
  Coins,
  QrCode,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/config/site';

export function MarketingHome() {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Calzado y Ropa');
  const [selectedPlan, setSelectedPlan] = useState<'anual' | 'mensual'>('anual');

  const handleQuickRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const planText =
      selectedPlan === 'anual'
        ? 'Plan Anual S/ 300 (Instalación Gratis)'
        : 'Plan Mensual S/ 30 (+ S/ 90 activación)';
    const text = `Hola Qatu Web, deseo solicitar mi web para mi negocio: *${
      businessName || 'Mi Negocio'
    }* (Rubro: ${businessType}). Me interesa el *${planText}*. ¿Podemos coordinar los detalles?`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  const faqs = [
    {
      q: '¿Cómo pago la suscripción de S/ 30 al mes?',
      a: 'Sencillo y sin trámites engorrosos: abonas directamente por Yape, Plin o transferencia bancaria el día de corte de cada mes. Desde tu panel de cliente subes la captura en un toque y tu servicio continúa 100% activo.',
    },
    {
      q: '¿Necesito una computadora para administrar mis productos?',
      a: 'No. El Panel de Bolsillo de Qatu Web está diseñado específicamente para usarse desde tu celular. Subes fotos directamente de tu cámara, cambias precios y activas o marcas como agotado cualquier producto en menos de 5 segundos.',
    },
    {
      q: '¿Qatu Web cobra comisiones por las ventas que haga?',
      a: 'Cero comisiones (S/ 0). A diferencia de plataformas como Shopify o apps de delivery que se quedan con el 2% al 25% de cada venta, en Qatu Web el 100% del dinero de tu cliente va directo a tu cuenta bancaria o Yape.',
    },
    {
      q: '¿Puedo usar mi propio dominio como .com o .pe?',
      a: 'Por supuesto. Tu plan incluye gratis el subdominio seguro tunegocio.qatuweb.com con certificado SSL. Si deseas conectar tu propio dominio (ej: calzadoslucas.com o mifarmacia.pe), lo vinculamos sin costo técnico adicional.',
    },
    {
      q: '¿En cuánto tiempo entregan el sistema funcionando?',
      a: 'En 24 a 48 horas hábiles. Una vez que nos envías tu logotipo, número de WhatsApp y tu lista inicial de fotos y precios, nuestro equipo en Huamanga configura tu servidor y te entrega tu web lista para vender.',
    },
    {
      q: '¿Quién es dueño de la información y la base de datos?',
      a: 'Tú eres el único dueño. Cada cliente de Qatu Web cuenta con su propio entorno y base de datos Supabase aislada. Si algún día decides migrar o crecer a un desarrollo corporativo, te entregamos tu código y datos sin trabas ni penalidades.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-amber-100 selection:text-amber-950 font-sans antialiased overflow-x-hidden">
      {/* ============================================================== */}
      {/* 1. HEADER & CINTILLO DE AUTORIDAD LOCAL                        */}
      {/* ============================================================== */}
      <aside aria-label="Aviso de disponibilidad local" className="bg-stone-950 text-white text-xs py-2.5 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wide text-stone-200">
              🇵🇪 Ingeniería de Software en Huamanga, Ayacucho
            </span>
            <span className="hidden md:inline text-stone-500">•</span>
            <span className="hidden md:inline text-amber-400 font-medium">
              Activación en 24 horas para tu negocio
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-stone-400">
            <span className="font-mono text-stone-300">S/ 30 / mes</span>
            <span className="text-stone-600">|</span>
            <span className="text-stone-300">0% comisiones</span>
          </div>
        </div>
      </aside>

      {/* Barra de Navegación Principal */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-stone-950 flex items-center justify-center text-white font-black text-lg tracking-tight group-hover:scale-105 transition-transform">
              <span className="text-amber-400">Q</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-stone-950">
                  QATU<span className="text-[#C83E2B]">WEB</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-800 border border-amber-500/20">
                  SaaS Huamanga
                </span>
              </div>
              <p className="text-[10px] text-stone-700 hidden sm:block tracking-wide">
                Software & Catálogos a Medida
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-stone-600">
            <a href="#soluciones" className="hover:text-stone-950 transition-colors">
              Soluciones
            </a>
            <a href="#demos" className="hover:text-stone-950 transition-colors">
              Demos en Celular
            </a>
            <a href="#comparativa" className="hover:text-stone-950 transition-colors">
              Comparativa
            </a>
            <a href="#precios" className="hover:text-[#C83E2B] transition-colors">
              Precios (S/ 30)
            </a>
            <a href="#faq" className="hover:text-stone-950 transition-colors">
              Preguntas
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-3.5 py-2 text-xs font-bold text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-xl transition"
            >
              Acceso Clientes
            </Link>
            <a
              href={getWhatsAppUrl(
                'Hola Qatu Web, quisiera conversar con un ingeniero sobre una web y catálogo para mi negocio en Ayacucho.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-[#C83E2B] hover:bg-[#A93322] text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Hablar con un Ingeniero</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO SECTION CON DEMOSTRACIÓN DE ARQUITECTURA              */}
      {/* ============================================================== */}
      <section className="pt-10 sm:pt-16 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Columna Izquierda: Mensaje Central */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 text-stone-200 text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>SaaS No Tradicional de Costo S/ 0 Marginal</span>
              <span className="text-stone-500">•</span>
              <span className="text-amber-300 font-bold">Ayacucho, Perú</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-950 tracking-tight leading-[1.12]">
              Software y Páginas Web a Medida para tu Negocio por{' '}
              <span className="text-[#C83E2B] underline decoration-[#C83E2B]/30 decoration-wavy decoration-2">
                S/ 30 al mes
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              El primer SaaS no tradicional en Ayacucho: <strong>sin comisiones por venta</strong>, 
              sin amarras a plataformas compartidas. Entregamos un sistema ultra-rápido, 
              con <strong>base de datos propia</strong> y catálogo conectado directo al WhatsApp de tu negocio.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#demos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-stone-950 text-white font-bold text-sm shadow-md hover:bg-stone-800 transition active:scale-95"
              >
                <span>Probar Demos en Celular</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </a>
              <a
                href={getWhatsAppUrl(
                  'Hola Qatu Web, me gustaría cotizar una web personalizada para mi negocio en Ayacucho.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-800 font-bold text-sm hover:bg-stone-50 shadow-sm transition active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#059669]" />
                <span>Cotizar por WhatsApp</span>
              </a>
            </div>

            {/* Micro métricas de confianza */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
                <div className="text-xs font-bold text-stone-400 uppercase">Entrega</div>
                <div className="text-sm font-black text-stone-900">24 Horas</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
                <div className="text-xs font-bold text-stone-400 uppercase">Comisiones</div>
                <div className="text-sm font-black text-[#059669]">S/ 0 (0%)</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
                <div className="text-xs font-bold text-stone-400 uppercase">Alojamiento</div>
                <div className="text-sm font-black text-stone-900">Incluido</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
                <div className="text-xs font-bold text-stone-400 uppercase">Soporte</div>
                <div className="text-sm font-black text-[#C83E2B]">Huamanga</div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Bento de Arquitectura Viva (Impeccable Craft) */}
          <div className="lg:col-span-5">
            <div className="bg-stone-950 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-800 space-y-5 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-stone-400 font-semibold pl-2">
                    Arquitectura Activa
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Edge 200 OK
                </span>
              </div>

              {/* Pieza 1: Dominio del Cliente */}
              <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Globe2 className="w-3.5 h-3.5 text-amber-400" />
                    Dominio Propio Seguro
                  </span>
                  <span className="font-mono text-emerald-400 text-[11px]">SSL Activo</span>
                </div>
                <div className="font-mono text-sm sm:text-base font-bold text-stone-100 bg-stone-950 px-3 py-2 rounded-xl border border-stone-800 flex items-center justify-between">
                  <span>tunegocio.qatuweb.com</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                </div>
                <p className="text-[11px] text-stone-400">
                  Alojado en Vercel con servidor independiente y base de datos Supabase aislada.
                </p>
              </div>

              {/* Pieza 2: Panel de Bolsillo */}
              <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                    Panel de Bolsillo del Dueño (/admin)
                  </span>
                  <span className="text-[11px] text-amber-400 font-mono">Tiempo Real</span>
                </div>
                <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-200">Botín Caña Alta Cuero</div>
                    <div className="text-[11px] font-mono text-stone-400">S/ 120.00 • WebP 58 KB</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      DISPONIBLE
                    </span>
                  </div>
                </div>
              </div>

              {/* Pieza 3: Pedido en WhatsApp */}
              <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Comanda Directa a WhatsApp
                  </span>
                  <span className="text-[11px] text-stone-500">Sin intermediarios</span>
                </div>
                <div className="bg-[#052e16]/40 p-3 rounded-xl border border-emerald-800/40 text-xs text-emerald-200 font-mono space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center justify-between">
                    <span>📦 NUEVO PEDIDO #042</span>
                    <span className="text-[10px] text-emerald-300">Yape Confirmado</span>
                  </div>
                  <div>• 1x Botín Caña Alta (Talla 38) - S/ 120.00</div>
                  <div className="text-stone-300">Total: S/ 120.00 | Entrega: Jr. 28 de Julio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. BENTO GRID INTERACTIVO DE 3 VERTICALES OFICIALES            */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 bg-stone-100/70 border-y border-stone-200/90" id="demos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-900 border border-amber-500/25">
              <span>Tres Negocios Reales en Huamanga</span>
              <span className="w-1 h-1 rounded-full bg-amber-600" />
              <span>Demos 100% Interactivas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
              Sistemas probados para cada rubro
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Toca para abrir la tienda que verá tu cliente en su celular, y el panel privado desde donde controlarás precios y pedidos en segundos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" id="soluciones">
            {/* Vertical 1: Calzados Lucas */}
            <article className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-stone-950 text-white flex items-center justify-center shadow-sm">
                  <Store className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#C83E2B]">
                    Calzado, Ropa & Boutiques
                  </span>
                  <h3 className="text-xl font-black text-stone-950 mt-1">
                    Calzados Lucas Huamanga
                  </h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Catálogo móvil táctil con selector de tallas y variantes, carrito rápido y comanda automática lista para enviar directo al WhatsApp del dueño.
                </p>
                <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Caso activo: <strong>calzadoslucas.qatuweb.com</strong></span>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-stone-100 mt-6">
                <Link
                  href="/demo/calzados"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-950 text-white text-xs font-bold hover:bg-stone-800 transition active:scale-95"
                >
                  <span>Probar Tienda Móvil</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </Link>
                <Link
                  href="/demo/calzados/admin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200 transition"
                >
                  <Smartphone className="w-3.5 h-3.5 text-stone-500" />
                  <span>Ver Panel de Bolsillo (/admin)</span>
                </Link>
              </div>
            </article>

            {/* Vertical 2: Restaurante Las Flores */}
            <article className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-sm">
                  <Utensils className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                    Gastronomía & Pastelería
                  </span>
                  <h3 className="text-xl font-black text-stone-950 mt-1">
                    Restaurante Las Flores
                  </h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Carta QR interactiva para mesas y delivery, cero comisiones de apps externas, y switch instantáneo de plato agotado en tiempo real.
                </p>
                <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Caso activo: <strong>lasflores.qatuweb.com</strong></span>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-stone-100 mt-6">
                <Link
                  href="/demo/pasteleria"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition active:scale-95"
                >
                  <span>Probar Carta QR & Delivery</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/demo/pasteleria/admin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition"
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                  <span>Ver Panel de Cocina / Admin</span>
                </Link>
              </div>
            </article>

            {/* Vertical 3: Trankilandia Gym */}
            <article className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#059669] text-white flex items-center justify-center shadow-sm">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#059669]">
                    Fitness & Control DNI
                  </span>
                  <h3 className="text-xl font-black text-stone-950 mt-1">
                    Trankilandia Gym
                  </h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Control de membresías activas vs vencidas, check-in express escaneando el código de barras del DNI, y arqueo de caja diario para counter.
                </p>
                <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Caso activo: <strong>trankilandia.qatuweb.com</strong></span>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-stone-100 mt-6">
                <Link
                  href="/demo/gym"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition active:scale-95"
                >
                  <span>Probar Portal Gym</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/demo/gym/admin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Ver Panel de Turnos / Counter</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. MATRIZ COMPARATIVA DE 3 COLUMNAS: ROMPIENDO EL MERCADO     */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="comparativa">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C83E2B]">
              Transparencia Absoluta
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight">
              ¿Por qué Qatu Web rompe el mercado tradicional?
            </h2>
            <p className="text-sm text-stone-600">
              Compara lo que te cobra una agencia convencional o una plataforma internacional frente a nuestra solución a medida.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna 1: Agencia Tradicional */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 space-y-5">
              <div className="border-b border-stone-100 pb-4">
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wide">
                  La forma antigua
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  Agencia Tradicional
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Presupuestos inflados de miles de soles.
                </p>
              </div>

              <ul className="space-y-3.5 text-xs text-stone-600">
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>S/ 1,800 a S/ 3,500</strong> de costo inicial por adelantado.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>30 a 60 días de espera</strong> para ver tu catálogo online.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cobros de S/ 150 a S/ 300</strong> por cada cambio de fotos o precios.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    Hosting compartido lento (cPanel) que se cae en fechas clave.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    Soporte distante o ausente cuando necesitas resolver urgencias.
                  </span>
                </li>
              </ul>
            </div>

            {/* Columna 2: SaaS Enlatado Internacional */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 space-y-5">
              <div className="border-b border-stone-100 pb-4">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                  Plataformas Externas
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  Shopify / Tiendanube
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Mensualidades en dólares y comisiones por venta.
                </p>
              </div>

              <ul className="space-y-3.5 text-xs text-stone-600">
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>$39 a $105 USD / mes</strong> (S/ 150 a S/ 400 mensuales fijos).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Comisiones del 2% al 3%</strong> por cada pedido recibido.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>
                    Configuraciones complejas que no se adaptan al flujo rápido de Yape/Plin.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>
                    Plantillas rígidas que se ven idénticas a miles de tiendas genéricas.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>
                    Soporte técnico por chatbot automático en inglés o tickets lentos.
                  </span>
                </li>
              </ul>
            </div>

            {/* Columna 3: Qatu Web (Destacada) */}
            <div className="bg-stone-950 text-white rounded-3xl p-6 sm:p-7 border-2 border-amber-500/70 shadow-xl space-y-5 relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                Solución Recomendada
              </div>

              <div className="border-b border-stone-800 pb-4">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                  La forma Qatu Web
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Qatu Web (Huamanga)
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Ingeniería moderna con costo marginal cero para ti.
                </p>
              </div>

              <ul className="space-y-3.5 text-xs text-stone-200">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Solo S/ 30 al mes</strong> (o S/ 300 al año con instalación <strong>GRATIS</strong>).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tu web lista en 24 a 48 horas</strong> con fotos y catálogo cargados.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>0% de comisiones:</strong> El 100% del dinero de tus ventas es tuyo.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Panel de Bolsillo en tu celular:</strong> Cambia precios y fotos tú mismo en 5 segundos.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Soporte local en Huamanga:</strong> Ingenieros de Ayacucho disponibles por WhatsApp directo.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. SECCIÓN DE PRECIOS Y MÓDULOS A MEDIDA                       */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 bg-stone-100/70 border-t border-stone-200/90" id="precios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C83E2B]">
              Planes Sin Letra Pequeña
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
              Precios pensados para la realidad de Ayacucho
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Elige el plan que mejor se adapte a tu momento comercial. Sin contratos forzosos ni comisiones ocultas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan Mensual */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Plan Flexible
                  </span>
                  <span className="text-xs font-mono bg-stone-100 text-stone-700 px-2.5 py-1 rounded-full font-semibold">
                    Mes a mes
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-stone-950">S/ 30</span>
                  <span className="text-sm font-semibold text-stone-500">/ al mes</span>
                </div>
                <p className="text-xs text-stone-600">
                  Activación inicial única de S/ 90 (incluye configuración de dominio y carga de tus primeros 30 productos).
                </p>

                <ul className="space-y-3 text-xs text-stone-700 pt-3 border-t border-stone-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Catálogo móvil táctil adaptado a tu rubro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Subdominio seguro tunegocio.qatuweb.com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Panel de Bolsillo para celular (/admin)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Pedidos ilimitados directos a WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Alojamiento en Vercel y Supabase incluido</span>
                  </li>
                </ul>
              </div>

              <a
                href={getWhatsAppUrl(
                  'Hola Qatu Web, me interesa comenzar con el Plan Mensual de S/ 30 para mi negocio.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs sm:text-sm transition active:scale-95"
              >
                <span>Solicitar Plan Mensual</span>
                <ArrowRight className="w-4 h-4 text-stone-600" />
              </a>
            </div>

            {/* Plan Anual (Recomendado) */}
            <div className="bg-stone-950 text-white rounded-3xl p-7 sm:p-8 border-2 border-amber-500/80 shadow-xl flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                ⭐ Más Vendido • Ahorras S/ 150
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Plan Anual Inteligente
                  </span>
                  <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full font-semibold border border-amber-500/30">
                    Instalación GRATIS
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">S/ 300</span>
                  <span className="text-sm font-semibold text-stone-400">/ al año</span>
                </div>
                <p className="text-xs text-stone-300">
                  <strong>Instalación y carga inicial 100% GRATIS</strong> (ahorras los S/ 90 de setup) y recibes 2 meses libres de suscripción.
                </p>

                <ul className="space-y-3 text-xs text-stone-200 pt-3 border-t border-stone-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span><strong>Todo lo del Plan Mensual</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span><strong>Activación y carga de 30 productos GRATIS</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Soporte prioritario por WhatsApp directo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Opción de conectar tu dominio propio .com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Reporte trimestral de métricas de visita</span>
                  </li>
                </ul>
              </div>

              <a
                href={getWhatsAppUrl(
                  'Hola Qatu Web, quiero aprovechar la promoción del Plan Anual de S/ 300 con instalación GRATIS.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm shadow-md transition active:scale-95"
              >
                <span>Activar Plan Anual con Instalación Gratis</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </a>
            </div>
          </div>

          {/* Módulos Adicionales a Medida */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-stone-950">
                  Módulos a Medida para Escalar tu Negocio
                </h3>
                <p className="text-xs text-stone-500">
                  Pagos únicos de activación: tu mensualidad se mantiene fija en S/ 30.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#059669] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 w-fit">
                Sin aumentar tu mensualidad
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-stone-900">Control de Inventario</span>
                  <span className="font-mono text-xs font-bold text-[#C83E2B]">S/ 90</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Alertas automáticas a WhatsApp cuando un producto tenga menos de 3 unidades.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-stone-900">Lector DNI / Barras</span>
                  <span className="font-mono text-xs font-bold text-[#C83E2B]">S/ 150</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Check-in rápido escaneando el DNI con la cámara de tu celular o pistola USB.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-stone-900">Carta QR de Mesas</span>
                  <span className="font-mono text-xs font-bold text-[#C83E2B]">S/ 70</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Selector de número de mesa y mozo con envío directo a la comanda de cocina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. PREGUNTAS FRECUENTES (FAQ)                                 */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="faq">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C83E2B]">
              Conversémoslo Claro
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-sm text-stone-600">
              Respuestas directas sin términos técnicos confusos.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-2xl border border-stone-200 p-5 open:shadow-sm transition"
              >
                <summary className="flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base text-stone-900 group-open:text-[#C83E2B]">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-stone-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. CIERRE DE CONFIANZA & FOOTER                               */}
      {/* ============================================================== */}
      <section className="bg-stone-950 text-white py-16 sm:py-20 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-stone-300 text-xs font-semibold border border-stone-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Empecemos hoy mismo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Dale a tu negocio la presencia digital que merece
            </h2>
            <p className="text-sm sm:text-base text-stone-400 leading-relaxed">
              Únete a los comerciantes de Huamanga que ya reciben pedidos directos a su WhatsApp con un sistema rápido, profesional y sin pagar comisiones abusivas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl(
                'Hola Qatu Web, estoy listo para iniciar mi web y catálogo por S/ 30 al mes.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-xl transition active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Iniciar mi Web por WhatsApp</span>
            </a>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-bold text-sm border border-stone-800 transition"
            >
              <span>Acceso de Clientes Registrados</span>
            </Link>
          </div>

          <div className="pt-12 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-300">Qatu Web</span>
              <span>•</span>
              <span>Huamanga, Ayacucho, Perú</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/terminos" className="hover:text-stone-300 transition">
                Términos del Servicio
              </Link>
              <Link href="/privacidad" className="hover:text-stone-300 transition">
                Privacidad
              </Link>
              <Link href="/dashboard/admin" className="hover:text-stone-300 font-mono transition">
                Hub Maestro
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}