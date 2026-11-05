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
  Zap,
  Store,
  Utensils,
  Dumbbell,
  CheckCircle2,
  X,
  ExternalLink,
  MapPin,
  ShoppingBag,
  TrendingUp,
  SlidersHorizontal,
  Lock,
  Plus,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/config/site';

type IndustryTab = 'zapateria' | 'restaurante' | 'gimnasio';

interface ShowcaseProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  variantLabel: string;
  variants: string[];
}

interface IndustryShowcase {
  businessName: string;
  category: string;
  location: string;
  products: [ShowcaseProduct, ShowcaseProduct];
  whatsappOrder: {
    number: string;
    text: string;
    paymentNote: string;
  };
  demoUrl: string;
  demoAdminUrl: string;
}

const SHOWCASES: Record<IndustryTab, IndustryShowcase> = {
  zapateria: {
    businessName: 'Calzados Lucas Huamanga',
    category: 'Comercio & Calzado',
    location: 'Jr. Asamblea 245, Huamanga',
    products: [
      {
        id: 'p1',
        name: 'BotÃ­n Cuero CaÃ±a Alta',
        price: 120,
        originalPrice: 135,
        imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop&q=80',
        variantLabel: 'Talla',
        variants: ['37', '38', '39'],
      },
      {
        id: 'p2',
        name: 'Zapatilla Urbana Classic',
        price: 85,
        originalPrice: 95,
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
        variantLabel: 'Talla',
        variants: ['36', '37', '38'],
      },
    ],
    whatsappOrder: {
      number: '#042',
      text: '1x BotÃ­n Cuero CaÃ±a Alta (Talla 38) - S/ 120.00',
      paymentNote: 'Pagado con Yape â€¢ Entrega Jr. 28 de Julio',
    },
    demoUrl: '/demo/calzados',
    demoAdminUrl: '/demo/calzados/admin',
  },
  restaurante: {
    businessName: 'Restaurante Las Flores',
    category: 'GastronomÃ­a & Postres',
    location: 'Jr. Bellido 180, Huamanga',
    products: [
      {
        id: 'p1',
        name: 'Torta Selva Negra Fina',
        price: 55,
        originalPrice: 65,
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
        variantLabel: 'PorciÃ³n',
        variants: ['Personal', 'Mediana', 'Familiar'],
      },
      {
        id: 'p2',
        name: 'Desayuno Criollo Huamanga',
        price: 22,
        originalPrice: 25,
        imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&auto=format&fit=crop&q=80',
        variantLabel: 'Bebida',
        variants: ['CafÃ© Pasado', 'Jugo Natural'],
      },
    ],
    whatsappOrder: {
      number: '#018',
      text: '1x Torta Selva Negra Mediana - S/ 55.00',
      paymentNote: 'Para Mesa 4 â€¢ Pagado con Plin',
    },
    demoUrl: '/demo/pasteleria',
    demoAdminUrl: '/demo/pasteleria/admin',
  },
  gimnasio: {
    businessName: 'Trankilandia Gym',
    category: 'Fitness & Control DNI',
    location: 'Av. Mariscal CÃ¡ceres 540, Huamanga',
    products: [
      {
        id: 'p1',
        name: 'MembresÃ­a Mensual Libre',
        price: 80,
        originalPrice: 90,
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
        variantLabel: 'Turno',
        variants: ['MaÃ±ana', 'Turno Libre'],
      },
      {
        id: 'p2',
        name: 'ProteÃ­na Whey Isolate 2 lbs',
        price: 130,
        originalPrice: 145,
        imageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&auto=format&fit=crop&q=80',
        variantLabel: 'Sabor',
        variants: ['Chocolate', 'Vainilla'],
      },
    ],
    whatsappOrder: {
      number: '#009',
      text: '1x MembresÃ­a Mensual Turno Libre - S/ 80.00',
      paymentNote: 'DNI: 72849102 â€¢ Pagado por Yape',
    },
    demoUrl: '/demo/gym',
    demoAdminUrl: '/demo/gym/admin',
  },
};

export function MarketingHome() {
  const [activeTab, setActiveTab] = useState<IndustryTab>('zapateria');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    'zapateria-p1': '38',
    'zapateria-p2': '37',
    'restaurante-p1': 'Mediana',
    'restaurante-p2': 'CafÃ© Pasado',
    'gimnasio-p1': 'Turno Libre',
    'gimnasio-p2': 'Chocolate',
  });
  const [inStockStatus, setInStockStatus] = useState<boolean>(true);
  const [stockToast, setStockToast] = useState<string | null>(null);

  const showcase = SHOWCASES[activeTab];

  const handleToggleStock = () => {
    const next = !inStockStatus;
    setInStockStatus(next);
    setStockToast(
      next
        ? 'Stock activo en tu catÃ¡logo en vivo'
        : 'Producto apagado como Agotado'
    );
    setTimeout(() => setStockToast(null), 2500);
  };

  const faqs = [
    {
      q: 'Â¿CÃ³mo pago la suscripciÃ³n de S/ 30 al mes?',
      a: 'Abonas mensualmente por Yape, Plin o transferencia bancaria el dÃ­a de corte. Desde tu panel de cliente subes la constancia en un toque y tu servicio continÃºa 100% activo sin trÃ¡mites engorrosos.',
    },
    {
      q: 'Â¿Necesito una computadora para administrar mis productos?',
      a: 'No. El Panel de Bolsillo de Qatu Web estÃ¡ diseÃ±ado para operarse desde tu celular. Tomas fotos con tu cÃ¡mara, cambias precios y activas o apagas stock en menos de 5 segundos.',
    },
    {
      q: 'Â¿Qatu Web cobra comisiones por las ventas que haga?',
      a: 'Cero comisiones (S/ 0). A diferencia de plataformas como Shopify o apps de delivery que descuentan entre el 2% y el 25% de cada venta, en Qatu Web el 100% de tu dinero va directo a tu cuenta bancaria o billetera digital.',
    },
    {
      q: 'Â¿Puedo usar mi propio dominio como .com o .pe?',
      a: 'SÃ­. Tu plan incluye gratis el subdominio seguro tunegocio.qatuweb.com con certificado SSL. Si deseas conectar tu propio dominio (ej: calzadoslucas.com o mifarmacia.pe), lo vinculamos sin costo tÃ©cnico adicional.',
    },
    {
      q: 'Â¿En cuÃ¡nto tiempo entregan el sistema funcionando?',
      a: 'En 24 a 48 horas hÃ¡biles. Una vez que nos envÃ­as tu logotipo, nÃºmero de WhatsApp y tu lista inicial de fotos y precios, nuestro equipo en Huamanga configura tu servidor y te entrega tu web lista para vender.',
    },
    {
      q: 'Â¿QuiÃ©n es dueÃ±o de la informaciÃ³n y la base de datos?',
      a: 'TÃº eres el Ãºnico dueÃ±o. Cada cliente de Qatu Web cuenta con su propio entorno y base de datos Supabase aislada. Si algÃºn dÃ­a decides migrar o crecer a un desarrollo corporativo, te entregamos tu cÃ³digo y datos sin trabas ni penalidades.',
    },
  ];

  return (
    <div className="bg-[#FFFFFF] text-slate-900 selection:bg-emerald-100 selection:text-emerald-950 font-sans antialiased overflow-x-hidden">

      {/* ============================================================== */}
      {/* 1. HERO — MINIMALISTA DE ALTA GAMA (Stripe / Vercel style)      */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden">
        {/* Grilla arquitectonica sutil de fondo */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* COLUMNA IZQUIERDA: Texto y Conversion (span 7) */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">

            {/* Pildora de confianza */}
            <div className="flex justify-center lg:justify-start">
              <span className="bg-slate-100 text-slate-800 text-xs md:text-sm font-medium px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 border border-slate-200 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Huamanga, Ayacucho</span>
                <span className="text-slate-300">&bull;</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  Activacion garantizada en 24h
                </span>
              </span>
            </div>

            {/* Titular principal sin br forzados */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Vende mas por WhatsApp y controla tu negocio{' '}
              <span className="underline decoration-emerald-500 decoration-[3px] underline-offset-[6px]">
                con tu propia Web.
              </span>
            </h1>

            {/* Subtitulo comercial humano */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              Olvida mandar fotos sueltas por chat o anotar ventas en cuadernos. Tus clientes piden desde su celular, el pedido llega armado a tu WhatsApp y tu controlas precios y stock en un toque por solo{' '}
              <span className="font-semibold text-slate-800">S/ 30 al mes.</span>
            </p>

            {/* Doble CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#demos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-4 rounded-xl shadow-lg transition-all active:scale-95 group"
              >
                <span>Explorar Demos en Vivo</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href={getWhatsAppUrl('Hola Qatu Web, quiero una demostracion para mi negocio en Ayacucho.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-4 rounded-xl shadow-lg transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Pedir Demostracion Local</span>
              </a>
            </div>

            {/* Mini-barra de confianza — 3 puntos en linea limpia */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-1 text-sm text-slate-600 font-medium">
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                0% Comisiones por venta
              </span>
              <span className="hidden sm:block w-px h-4 bg-slate-200" />
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                Panel en tu celular
              </span>
              <span className="hidden sm:block w-px h-4 bg-slate-200" />
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                Soporte local en Huamanga
              </span>
            </div>
          </div>

          {/* COLUMNA DERECHA: App Window Shell (span 5) */}
          <div className="lg:col-span-5 flex flex-col items-center gap-3">

            {/* Selector de rubro encima de la ventana */}
            <div className="w-full max-w-md flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
              <button
                type="button"
                onClick={() => setActiveTab('zapateria')}
                className={`flex-1 py-2 px-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'zapateria'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Store className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Calzado</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('restaurante')}
                className={`flex-1 py-2 px-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'restaurante'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Utensils className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Restaurante</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('gimnasio')}
                className={`flex-1 py-2 px-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'gimnasio'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Dumbbell className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Gimnasio</span>
              </button>
            </div>

            {/* App Window Shell */}
            <div className="w-full max-w-md shadow-2xl rounded-2xl border border-slate-200/90 bg-white overflow-hidden">

              {/* Barra del navegador simulada */}
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-md px-2.5 py-1 flex items-center gap-1.5 shadow-inner">
                  <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span className="text-[11px] text-slate-500 font-mono truncate">
                    {activeTab === 'zapateria'
                      ? 'calzadoslucas.qatuweb.com'
                      : activeTab === 'restaurante'
                      ? 'lasflores.qatuweb.com'
                      : 'trankilandia.qatuweb.com'}
                  </span>
                </div>
              </div>

              {/* Cabecera del negocio */}
              <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0">
                    {activeTab === 'zapateria' ? (
                      <Store className="w-4 h-4 text-emerald-400" />
                    ) : activeTab === 'restaurante' ? (
                      <Utensils className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Dumbbell className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-white truncate leading-tight">
                      {showcase.businessName}
                    </h4>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">{showcase.location}</span>
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap shrink-0 ml-2">
                  Abierto
                </span>
              </div>

              {/* Grilla de 2 Productos */}
              <div className="p-3.5 grid grid-cols-2 gap-3">
                {showcase.products.map((prod) => {
                  const variantKey = `${activeTab}-${prod.id}`;
                  const currentVar = selectedVariants[variantKey] || prod.variants[0];
                  return (
                    <div
                      key={prod.id}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex flex-col gap-2 hover:border-slate-300 transition"
                    >
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-200">
                        <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                        {prod.originalPrice && (
                          <span className="absolute top-1.5 left-1.5 bg-slate-900/80 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                            Oferta
                          </span>
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-900 leading-snug line-clamp-1">{prod.name}</h5>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-sm font-black text-slate-950">S/ {prod.price}</span>
                          {prod.originalPrice && (
                            <span className="text-[10px] text-slate-400 line-through">S/ {prod.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      <div className="pt-1.5 border-t border-slate-200">
                        <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">{prod.variantLabel}:</span>
                        <div className="flex gap-1 flex-wrap">
                          {prod.variants.map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setSelectedVariants((prev) => ({ ...prev, [variantKey]: v }))}
                              className={`px-1.5 py-0.5 text-[10px] rounded font-bold transition ${
                                currentVar === v
                                  ? 'bg-slate-900 text-white'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Notificacion de comanda WhatsApp — dentro de la ventana */}
              <div className="mx-3.5 mb-3.5 bg-slate-900 rounded-xl p-3 border border-emerald-500/30 flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Nuevo pedido en WhatsApp del dueno</span>
                  </div>
                  <p className="text-[11px] text-slate-200 font-mono leading-snug">
                    Pedido {showcase.whatsappOrder.number} Pagado con Yape S/ {showcase.products[0].price}.00
                  </p>
                  <span className="text-[10px] text-slate-400 block">
                    {showcase.whatsappOrder.paymentNote}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap shrink-0">
                  S/ 0 comision
                </span>
              </div>
            </div>

            {/* Accesos directos a las demos */}
            <div className="w-full max-w-md grid grid-cols-2 gap-2.5">
              <Link
                href={showcase.demoUrl}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition active:scale-95"
              >
                <span>Abrir Tienda Completa</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </Link>
              <Link
                href={showcase.demoAdminUrl}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-200 transition active:scale-95"
              >
                <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                <span>Panel del Dueno (/admin)</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. BENTO GRID DE LAS 3 VERTICALES OFICIALES                   */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-y border-slate-200/80" id="demos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/80 text-slate-800 border border-slate-300/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tres Negocios Reales en Huamanga</span>
              <span className="text-slate-400">â€¢</span>
              <span>Demos 100% Funcionales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Sistemas probados para cada rubro
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Toca para abrir la tienda que verÃ¡ tu cliente en su celular, y el panel privado desde donde controlarÃ¡s precios y pedidos en segundos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" id="soluciones">
            {/* Vertical 1: Calzados Lucas */}
            <article className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                  <Store className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                    Comercio & Calzado
                  </span>
                  <h3 className="text-xl font-black text-slate-950 mt-1">
                    Calzados Lucas Huamanga
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  CatÃ¡logo mÃ³vil tÃ¡ctil con selector de tallas y variantes, carrito rÃ¡pido y comanda automÃ¡tica lista para enviar directo al WhatsApp del dueÃ±o.
                </p>
                <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Caso activo: <strong>calzadoslucas.qatuweb.com</strong></span>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-slate-100 mt-6">
                <Link
                  href="/demo/calzados"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition active:scale-95"
                >
                  <span>Probar Tienda MÃ³vil</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                </Link>
                <Link
                  href="/demo/calzados/admin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition"
                >
                  <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ver Panel de Bolsillo (/admin)</span>
                </Link>
              </div>
            </article>

            {/* Vertical 2: Restaurante Las Flores */}
            <article className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs">
                  <Utensils className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                    GastronomÃ­a & Carta QR
                  </span>
                  <h3 className="text-xl font-black text-slate-950 mt-1">
                    Restaurante Las Flores
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Carta QR interactiva para mesas y delivery, cero comisiones de apps externas, y switch instantÃ¡neo de plato agotado en tiempo real.
                </p>
                <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Caso activo: <strong>lasflores.qatuweb.com</strong></span>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-slate-100 mt-6">
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
            <article className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                    Fitness & Control DNI
                  </span>
                  <h3 className="text-xl font-black text-slate-950 mt-1">
                    Trankilandia Gym
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Control de membresÃ­as activas vs vencidas, check-in express escaneando el cÃ³digo de barras del DNI, y arqueo de caja diario para counter.
                </p>
                <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Caso activo: <strong>trankilandia.qatuweb.com</strong></span>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-slate-100 mt-6">
                <Link
                  href="/demo/gym"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition active:scale-95"
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
      {/* 3. MATRIZ COMPARATIVA DE 3 COLUMNAS (ALTO CONTRASTE)           */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="comparativa">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Transparencia Absoluta
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Â¿Por quÃ© Qatu Web rompe el mercado tradicional?
            </h2>
            <p className="text-sm text-slate-600">
              Compara lo que te cobra una agencia convencional o una plataforma internacional frente a nuestra soluciÃ³n a medida.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna 1: Agencia Tradicional */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wide">
                  La forma antigua
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Agencia Tradicional
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Presupuestos inflados de miles de soles.
                </p>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>S/ 1,800 a S/ 3,500</strong> de costo inicial por adelantado.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>30 a 60 dÃ­as de espera</strong> para ver tu catÃ¡logo online.
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
                    Hosting compartido lento que se satura en horas punta.
                  </span>
                </li>
              </ul>
            </div>

            {/* Columna 2: SaaS Enlatado Internacional */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  Plataformas Externas
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Shopify / Tiendanube
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Mensualidades en dÃ³lares y comisiones por venta.
                </p>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>$39 a $105 USD / mes</strong> (S/ 150 a S/ 400 mensuales fijos).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Comisiones del 2% al 3%</strong> por cada pedido recibido.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    Configuraciones complejas que no se adaptan al flujo rÃ¡pido de Yape/Plin.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    Soporte tÃ©cnico por chatbot automÃ¡tico en inglÃ©s o tickets lentos.
                  </span>
                </li>
              </ul>
            </div>

            {/* Columna 3: Qatu Web (Destacada en Obsidiana) */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-500/70 shadow-2xl space-y-5 relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                SoluciÃ³n Recomendada
              </div>

              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                  La forma Qatu Web
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Qatu Web (Huamanga)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  IngenierÃ­a moderna con costo accesible para ti.
                </p>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-200">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Solo S/ 30 al mes</strong> (o S/ 300 al aÃ±o con instalaciÃ³n <strong>GRATIS</strong>).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tu web lista en 24 a 48 horas</strong> con fotos y catÃ¡logo cargados.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>0% de comisiones:</strong> El 100% del dinero de tus ventas es tuyo.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Panel de Bolsillo en tu celular:</strong> Cambia precios y fotos tÃº mismo en 5 segundos.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Soporte local en Huamanga:</strong> Ingenieros disponibles por WhatsApp directo.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SECCIÃ“N DE PRECIOS Y MÃ“DULOS A MEDIDA                       */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200/80" id="precios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Tarifas Claras
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Precios pensados para la realidad de Ayacucho
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Elige el plan que mejor se adapte a tu momento comercial. Sin contratos forzosos ni cobros sorpresa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan Mensual */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Plan Flexible
                  </span>
                  <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-semibold">
                    Mes a mes
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-slate-950">S/ 30</span>
                  <span className="text-sm font-semibold text-slate-500">/ al mes</span>
                </div>
                <p className="text-xs text-slate-600">
                  ActivaciÃ³n inicial Ãºnica de S/ 90 (incluye configuraciÃ³n de dominio y carga de tus primeros 30 productos).
                </p>

                <ul className="space-y-3 text-xs text-slate-700 pt-3 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>CatÃ¡logo mÃ³vil tÃ¡ctil adaptado a tu rubro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Subdominio seguro tunegocio.qatuweb.com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Panel de Bolsillo para celular (/admin)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Pedidos ilimitados directos a WhatsApp</span>
                  </li>
                </ul>
              </div>

              <a
                href={getWhatsAppUrl(
                  'Hola Qatu Web, me interesa comenzar con el Plan Mensual de S/ 30 para mi negocio.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs sm:text-sm transition active:scale-95"
              >
                <span>Solicitar Plan Mensual</span>
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </a>
            </div>

            {/* Plan Anual (Recomendado) */}
            <div className="bg-slate-950 text-white rounded-3xl p-7 sm:p-8 border-2 border-emerald-500/80 shadow-2xl flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3.5 right-6 bg-emerald-500 text-slate-950 text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Recomendado â€¢ Ahorras S/ 150</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Plan Anual Inteligente
                  </span>
                  <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-semibold border border-emerald-500/30">
                    InstalaciÃ³n GRATIS
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">S/ 300</span>
                  <span className="text-sm font-semibold text-slate-400">/ al aÃ±o</span>
                </div>
                <p className="text-xs text-slate-300">
                  <strong>InstalaciÃ³n y carga inicial 100% GRATIS</strong> (ahorras los S/ 90 de setup) y recibes 2 meses libres de suscripciÃ³n.
                </p>

                <ul className="space-y-3 text-xs text-slate-200 pt-3 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span><strong>Todo lo del Plan Mensual</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span><strong>ActivaciÃ³n y carga de 30 productos GRATIS</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Soporte prioritario por WhatsApp directo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>OpciÃ³n de conectar tu dominio propio .com</span>
                  </li>
                </ul>
              </div>

              <a
                href={getWhatsAppUrl(
                  'Hola Qatu Web, quiero aprovechar la promociÃ³n del Plan Anual de S/ 300 con instalaciÃ³n GRATIS.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition active:scale-95"
              >
                <span>Activar Plan Anual con InstalaciÃ³n Gratis</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </a>
            </div>
          </div>

          {/* MÃ³dulos Adicionales a Medida */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 max-w-4xl mx-auto space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-950">
                  MÃ³dulos a Medida para Escalar tu Negocio
                </h3>
                <p className="text-xs text-slate-500">
                  Pagos Ãºnicos de activaciÃ³n: tu mensualidad se mantiene fija en S/ 30.
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 w-fit">
                Sin aumentar tu mensualidad
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-900">Control de Inventario</span>
                  <span className="font-mono text-xs font-bold text-slate-900">S/ 90</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Alertas automÃ¡ticas a WhatsApp cuando un producto tenga poco stock.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-900">Lector DNI / Barras</span>
                  <span className="font-mono text-xs font-bold text-slate-900">S/ 150</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Check-in rÃ¡pido escaneando el DNI con la cÃ¡mara del celular.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-900">Carta QR de Mesas</span>
                  <span className="font-mono text-xs font-bold text-slate-900">S/ 70</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Selector de nÃºmero de mesa y mozo con envÃ­o directo a WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PREGUNTAS FRECUENTES (FAQ)                                 */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="faq">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              ConversÃ©moslo Claro
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Respuestas directas sin tÃ©rminos tÃ©cnicos confusos.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-2xl border border-slate-200 p-5 open:shadow-xs transition"
              >
                <summary className="flex items-center justify-between cursor-pointer font-bold text-sm sm:text-base text-slate-900 group-open:text-emerald-700">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. CIERRE DE CONFIANZA ANTES DEL FOOTER GLOBAL                */}
      {/* ============================================================== */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Empecemos hoy mismo</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Dale a tu negocio la presencia digital que merece
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Ãšnete a los comerciantes de Huamanga que ya reciben pedidos directos a su WhatsApp con un sistema rÃ¡pido, profesional y sin pagar comisiones abusivas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsAppUrl(
                'Hola Qatu Web, estoy listo para iniciar mi web y catÃ¡logo por S/ 30 al mes en Ayacucho.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-md transition active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Iniciar mi Web por WhatsApp</span>
            </a>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700 transition"
            >
              <Lock className="w-4 h-4 text-slate-400" />
              <span>Acceso de Clientes (/login)</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
