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
  Lock,
  Flame,
  Sparkles,
  Package,
  ScanLine,
  CreditCard,
  QrCode,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
} from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '@/lib/config/site';
import { InteractivePricingCalculator } from '@/components/pricing/InteractivePricingCalculator';
import {
  OFFICIAL_VERTICALS,
  OFFICIAL_ADDONS,
  LAUNCH_PROMO_CONFIG,
} from '@/lib/config/pricing';

const BRANDS_LIST = [
  {
    name: 'QuinuaQ',
    rubro: 'Restaurante de Campo & Carta QR',
    loc: 'Quinua, Ayacucho',
    web: 'quinuaq.com',
    url: 'https://quinuaq.com',
  },
  {
    name: 'Mama Alice ONG',
    rubro: 'ONG & Formación Social',
    loc: 'Huamanga, Ayacucho',
    web: 'mamaalice.org',
    url: 'https://www.mamaalice.org',
  },
  {
    name: 'TrankilandiaGym',
    rubro: 'Fitness & Control DNI',
    loc: 'Huamanga, Ayacucho',
    web: 'trankilandiagym.qatuweb.com',
    url: 'https://trankilandiagym.qatuweb.com',
  },
];

export function MarketingHome() {
  const [inStockStatus, setInStockStatus] = useState<boolean>(true);
  const [stockToast, setStockToast] = useState<string | null>(null);
  const [businessInput, setBusinessInput] = useState('');

  const handleToggleStock = () => {
    const next = !inStockStatus;
    setInStockStatus(next);
    setStockToast(
      next
        ? '✓ Botín de Cuero Talla 38: marcado como DISPONIBLE en el catálogo web'
        : '⚠️ Botín de Cuero Talla 38: marcado como AGOTADO (botón de compra apagado en tiempo real)'
    );
    setTimeout(() => setStockToast(null), 3000);
  };

  const faqs = [
    {
      q: '¿Cuáles son los métodos oficiales de pago y a nombre de quién se abona?',
      a: `Aceptamos Yape y Plin directamente al número oficial ${siteConfig.yapeNumber} a nombre del titular ${siteConfig.yapeTitular}. También aceptamos transferencias bancarias BCP, BBVA e Interbank en soles. Cero comisiones de intermediarios y sin necesidad de tarjeta de crédito.`,
    },
    {
      q: '¿Cómo funciona la activación inmediata en 1 toque tras realizar el pago?',
      a: 'Una vez realizado tu pago con Yape o Plin, ingresas a tu portal en /dashboard/cliente (o nos escribes al WhatsApp oficial), adjuntas la captura del comprobante y nuestro sistema o equipo valida tu cuenta en un toque. Tu subdominio y Panel de Bolsillo quedan listos de inmediato.',
    },
    {
      q: '¿Qatu Web cobra comisiones por las ventas que haga en mi negocio?',
      a: 'Cero comisiones (0%). A diferencia de plataformas como Shopify o apps de pedidos que descuentan entre el 2% y el 25% de cada venta, en Qatu Web pagas una tarifa plana fija (S/ 1 al día con el Plan Anual de S/ 300 o S/ 30 al mes). Todo el dinero de tus clientes va 100% íntegro a tu cuenta o billetera digital.',
    },
    {
      q: '¿En cuánto tiempo entregan el sistema y catálogo funcionando?',
      a: 'En un plazo de 24 a 48 horas hábiles. Una vez que nos envías tu logotipo, número de WhatsApp y tu lista inicial de productos con fotos y precios, nuestro equipo en Huamanga configura tu servidor en el Edge, carga tus primeros 25 productos y te entrega tu web lista para vender.',
    },
    {
      q: '¿Necesito una computadora para administrar mis productos y precios?',
      a: 'No. El Panel de Bolsillo de Qatu Web (/admin) está 100% diseñado para operarse desde tu celular. Tomas fotos con tu cámara, cambias precios y activas o apagas productos agotados en menos de 5 segundos con 1 toque.',
    },
    {
      q: '¿Puedo usar mi propio dominio como .com o .pe?',
      a: 'Sí. Tu plan incluye gratis el subdominio seguro tunegocio.qatuweb.com con certificado SSL y compresión WebP. Si deseas conectar tu propio dominio (ej: quinuaq.com o trankilandia.pe), lo vinculamos sin costo técnico adicional.',
    },
    {
      q: '¿Quién es dueño de la información y la base de datos de mi negocio?',
      a: 'Tú eres el único dueño. Cada cliente de Qatu Web cuenta con su propio entorno y base de datos Supabase aislada. Si algún día decides migrar o crecer a un desarrollo corporativo, te entregamos tu código y datos sin trabas ni penalidades.',
    },
  ];

  const handleQuickLead = (e: React.FormEvent) => {
    e.preventDefault();
    const query = businessInput.trim()
      ? `Hola Qatu Web, quiero crear la tienda web para mi negocio: ${businessInput} en Ayacucho.`
      : 'Hola Qatu Web, quiero solicitar información para digitalizar mi negocio con tienda virtual por S/ 1 al día.';
    window.open(getWhatsAppUrl(query), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FFFFFF] text-slate-900 selection:bg-emerald-100 selection:text-emerald-950 font-sans antialiased overflow-x-hidden">

      {/* ============================================================== */}
      {/* 1. HERO EJECUTIVO — ESTILO SHOPIFY (TODO EN PANTALLA & SEO/GEO) */}
      {/* ============================================================== */}
      <section className="relative pt-3 sm:pt-6 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Grilla arquitectónica de fondo */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

        {/* Resplandor ambiental suave de alta gama */}
        <div className="absolute top-1/4 right-1/4 -z-10 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* ── COLUMNA IZQUIERDA: Titular SEO/GEO Imponente + Formulario Ejecutivo (Span 7) ── */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">

            {/* Cintillo de Lanzamiento con Urgencia Real */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-950 border border-amber-500/35 shadow-xs mx-auto lg:mx-0">
              <Flame className="w-4 h-4 text-amber-600 animate-pulse shrink-0" />
              <span>
                <strong>Cupos de Lanzamiento:</strong> Los primeros 30 negocios de Ayacucho congelan el precio de S/ 300 al año para siempre (9 de 30 reservados)
              </span>
            </div>

            {/* Titular Principal H1 Oficial */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[50px] xl:text-[56px] font-black text-slate-950 tracking-tight leading-[1.12] sm:leading-[1.08]">
              Tu tienda virtual o carta digital por{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                S/ 1 al día.
              </span>{' '}
              Sin comisiones. Lista en 48 horas.
            </h1>

            {/* Subtítulo Oficial con Densidad Semántica de Negocio */}
            <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 leading-relaxed max-w-xl font-normal mx-auto lg:mx-0">
              Olvídate de agencias que cobran S/ 2,500 y demoran semanas o plataformas que te cobran comisiones por cada venta. En Qatu Web tu catálogo corre en tu propio subdominio en el Edge y los pedidos te llegan ordenados directamente a tu WhatsApp.
            </p>

            {/* Tarjeta de Captura Interactiva Estilo Shopify (Simulador en Vivo) */}
            <div className="bg-slate-950 text-white p-3.5 sm:p-5 rounded-2xl shadow-xl max-w-xl mx-auto lg:mx-0 space-y-2.5 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Simula tu tienda en vivo
                </span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
                  0% comisiones
                </span>
              </div>

              <p className="text-xs text-slate-400 font-normal text-left">
                Escribe tu negocio (ej. QuinuaQ, TrankilandiaGym, Calzados Lucas...) para ver la vista previa:
              </p>

              <form onSubmit={handleQuickLead} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-emerald-500 transition shadow-inner">
                <div className="flex items-center flex-1 min-w-0 px-2.5 py-1 sm:py-0">
                  <Store className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    value={businessInput}
                    onChange={(e) => setBusinessInput(e.target.value)}
                    placeholder="Tu negocio (ej. QuinuaQ, Calzados Lucas...)"
                    className="w-full bg-transparent py-1.5 sm:py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="h-10 px-5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition flex items-center justify-center gap-2 shrink-0 font-bold text-xs sm:text-sm active:scale-95 shadow-md cursor-pointer"
                  title="Crear mi tienda en WhatsApp"
                >
                  <span>Crear Mi Tienda</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* ── 3 GANCHOS COMERCIALES CLAVE DESTACADOS ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-left max-w-xl mx-auto lg:mx-0">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>0% comisiones</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  No pagas por cada venta: pagas lo mismo venda poco o mucho (0% comisiones).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pruébalo antes</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Mira cómo quedaría tu negocio antes de pagar con el simulador y demos en vivo.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Comandas ordenadas</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  El pedido te llega ordenado al WhatsApp con talla, porción o color.
                </p>
              </div>
            </div>

          </div>

          {/* ── COLUMNA DERECHA: Canvas de Estudio Reactivo Inteligente (Span 5) ── */}
          <div className="lg:col-span-5 flex justify-center">

            {(() => {
              const inputLower = businessInput.trim().toLowerCase();
              const cleanSlug = businessInput.trim()
                ? businessInput.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '') || 'mitienda'
                : 'quinuaq';

              // Clasificación inteligente multi-rubro
              const isNGO = inputLower.includes('mamaalice') || inputLower.includes('mama alice') || inputLower.includes('ong') || inputLower.includes('fundacion') || inputLower.includes('social') || inputLower.includes('donacion');
              const isGym = inputLower.includes('gym') || inputLower.includes('trankilandia') || inputLower.includes('fitness') || inputLower.includes('pesas') || inputLower.includes('crossfit');
              const isOutlet = inputLower.includes('outlet') || inputLower.includes('moda') || inputLower.includes('ropa') || inputLower.includes('boutique') || inputLower.includes('zapatilla') || inputLower.includes('sneaker') || inputLower.includes('streetwear') || inputLower.includes('calzado') || inputLower.includes('jeans');
              const isFood = inputLower.includes('restaurante') || inputLower.includes('restaurant') || inputLower.includes('comida') || inputLower.includes('cafe') || inputLower.includes('cafeteria') || inputLower.includes('polleria') || inputLower.includes('ceviche') || inputLower.includes('pizza') || inputLower.includes('burger') || inputLower.includes('chifa') || inputLower.includes('bar');
              const isTech = inputLower.includes('tech') || inputLower.includes('tecnologia') || inputLower.includes('celular') || inputLower.includes('iphone') || inputLower.includes('laptop') || inputLower.includes('computo') || inputLower.includes('gadgets');
              const isBeauty = inputLower.includes('barber') || inputLower.includes('barberia') || inputLower.includes('salon') || inputLower.includes('spa') || inputLower.includes('belleza') || inputLower.includes('cosmetica') || inputLower.includes('skincare');
              const isMarket = inputLower.includes('market') || inputLower.includes('minimarket') || inputLower.includes('bodega') || inputLower.includes('licor') || inputLower.includes('licoreria') || inputLower.includes('bebida') || inputLower.includes('pisco');
              const isHealth = inputLower.includes('botica') || inputLower.includes('farmacia') || inputLower.includes('salud') || inputLower.includes('dental') || inputLower.includes('clinica');

              const activeData = isNGO ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'MAMA ALICE ONG',
                domain: 'mamaalice.org',
                slug: cleanSlug || 'mamaalice',
                tagline: 'ONG & IMPACTO SOCIAL • HUAMANGA, AYACUCHO',
                p1: { name: 'Educación y Niños', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Capacitación y Oficios', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Comunidad Solidaria', img: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Donación / Kit Escolar',
                  price: 'S/ 50',
                  img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&auto=format&fit=crop&q=80'
                }
              } : isGym ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'TRANKILANDIAGYM',
                domain: 'trankilandiagym.qatuweb.com',
                slug: cleanSlug || 'trankilandiagym',
                tagline: 'FITNESS & CONTROL DE MEMBRESÍAS • AYACUCHO',
                p1: { name: 'Whey Protein Isolate', img: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Creatina Monohidratada', img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Entrenamiento & Pesas', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Membresía Mensual Libre',
                  price: 'S/ 120',
                  img: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=300&auto=format&fit=crop&q=80'
                }
              } : isOutlet ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'OUTLET URBANO',
                domain: `${cleanSlug || 'outlet'}.qatuweb.com`,
                slug: cleanSlug || 'outlet',
                tagline: 'OUTLET DE MODA & SNEAKERS • TIENDA OFICIAL',
                p1: { name: 'Sneakers Streetwear', img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Casaca Denim Street', img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Zapatilla Urban Classic', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Sneaker Urbano Streetwear',
                  price: 'S/ 119',
                  img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300&auto=format&fit=crop&q=80'
                }
              } : isTech ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'TECH STORE',
                slug: cleanSlug || 'techstore',
                tagline: 'TECNOLOGÍA & ACCESORIOS • ENVÍOS PERÚ',
                p1: { name: 'Audífonos Pro Wireless', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Smartwatch Deportivo', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Gadgets & Carga Rápida', img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Audífonos Pro Noise Cancelling',
                  price: 'S/ 89',
                  img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80'
                }
              } : isBeauty ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'STUDIO & BEAUTY',
                slug: cleanSlug || 'studio',
                tagline: 'BELLEZA & CUIDADO PERSONAL • TIENDA OFICIAL',
                p1: { name: 'Sérum Facial Botánico', img: 'https://images.unsplash.com/photo-1608248597359-59750047b4d1?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Cosmética Natural', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Barber & Estética', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Sérum Facial Botánico 50ml',
                  price: 'S/ 48',
                  img: 'https://images.unsplash.com/photo-1608248597359-59750047b4d1?w=300&auto=format&fit=crop&q=80'
                }
              } : isMarket ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'MARKET EXPRESS',
                slug: cleanSlug || 'market',
                tagline: 'MINIMARKET & LICORERÍA • DELIVERY EN MINUTOS',
                p1: { name: 'Pack Pisco Quebranta', img: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Vinos & Bebidas', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Snacks & Abarrotes', img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Pack Pisco Quebranta + Mixers',
                  price: 'S/ 65',
                  img: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=300&auto=format&fit=crop&q=80'
                }
              } : isHealth ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'BOTICA & SALUD',
                slug: cleanSlug || 'botica',
                tagline: 'BOTICA & SALUD INTEGRAL • ATENCIÓN INMEDIATA',
                p1: { name: 'Multivitamínico Zinc', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Botiquín y Cuidado', img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Suplementos Nutricionales', img: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Multivitamínico Zinc + Vitamina C',
                  price: 'S/ 38',
                  img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80'
                }
              } : isFood ? {
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'RESTAURANTE & CARTA',
                slug: cleanSlug || 'restaurant',
                tagline: 'GASTRONOMÍA & CARTA QR • PEDIDOS POR WHATSAPP',
                p1: { name: 'Plato Especial a la Carta', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Bebida y Café Pasado', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Parrilla & Especialidad', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: 'Plato a la Carta / Especial',
                  price: 'S/ 32',
                  img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80'
                }
              } : {
                // Caso por defecto: QUINUAQ (Restaurante de Campo en Quinua, Ayacucho)
                storeName: businessInput.trim() ? businessInput.trim().toUpperCase() : 'QUINUAQ',
                domain: businessInput.trim() ? `${cleanSlug}.qatuweb.com` : 'quinuaq.com',
                slug: cleanSlug || 'quinuaq',
                tagline: businessInput.trim() ? 'CATÁLOGO DIGITAL & PEDIDOS • AYACUCHO, PERÚ' : 'RESTAURANTE DE CAMPO & CARTA DIGITAL • QUINUA, AYACUCHO',
                p1: { name: 'Trucha Andina a la Parrilla', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80' },
                p2: { name: 'Café de Especialidad y Postre', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&auto=format&fit=crop&q=80' },
                p3: { name: 'Parrilla Campestre Tradicional', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&auto=format&fit=crop&q=80' },
                card: {
                  title: businessInput.trim() ? `${businessInput.trim()}` : 'Trucha Andina a la Parrilla',
                  price: 'S/ 36',
                  img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80'
                }
              };

              return (
                <div className="relative w-full max-w-[480px] lg:max-w-[500px] aspect-[4/3] sm:aspect-[16/12] rounded-3xl bg-gradient-to-br from-slate-100 via-stone-50 to-slate-200/90 border border-slate-200/90 shadow-2xl p-3.5 sm:p-5 flex items-center justify-center">

                  {/* Grilla Sutil del Canvas de Edición */}
                  <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none rounded-3xl" />

                  {/* Fondo Editorial del Storefront con datos reactivos */}
                  <div className="w-full h-full bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between relative transition-all duration-300">

                    {/* Barra de Acento Superior Naranja/Coral (Shopify Style) */}
                    <div className="h-2 w-full bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500" />

                    {/* Vista Previa de la Tienda de Marca */}
                    <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
                      {/* Barra de dominio superior */}
                      <div className="flex items-center justify-between text-slate-400 text-xs font-mono border-b border-slate-100 pb-2">
                        <span className="text-slate-600 font-semibold truncate max-w-[200px] sm:max-w-[220px]">
                          {`${activeData.domain || `${activeData.slug}.qatuweb.com`}`}
                        </span>
                        <span className="text-slate-500 font-sans font-semibold text-xs shrink-0">
                          Tienda Oficial
                        </span>
                      </div>

                      {/* Letras de Marca Grandes e Impactantes */}
                      <div className="py-2 sm:py-2.5 text-center transition-all duration-200">
                        <span className={`font-black tracking-tighter text-slate-900 uppercase block select-none px-2 leading-none ${
                          activeData.storeName.length > 12
                            ? 'text-xl sm:text-2xl lg:text-3xl'
                            : 'text-2xl sm:text-4xl lg:text-5xl'
                        }`}>
                          {activeData.storeName}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-700 block mt-1">
                          {activeData.tagline}
                        </span>
                      </div>

                      {/* Fila de 3 Mini Productos de la Tienda Coherentes con el Rubro */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                        <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden shadow-2xs">
                          <img
                            src={activeData.p1.img}
                            alt={activeData.p1.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden shadow-2xs">
                          <img
                            src={activeData.p2.img}
                            alt={activeData.p2.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden shadow-2xs">
                          <img
                            src={activeData.p3.img}
                            alt={activeData.p3.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* ── ELEMENTO FLOTANTE 1: Herramientas de Edición ── */}
                  <div className="hidden sm:flex absolute top-2 sm:top-3 left-3 sm:left-5 z-20 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/90 px-3 py-1 items-center gap-2 text-slate-700 text-xs font-bold">
                    <span className="text-emerald-600 font-black">✦</span>
                    <span>Aa</span>
                    <span className="font-black">B</span>
                    <span className="italic font-serif">I</span>
                    <span className="text-slate-300">|</span>
                    <span>🔗</span>
                    <span>≡</span>
                  </div>

                  {/* ── ELEMENTO FLOTANTE 2: Selector de Paleta ── */}
                  <div className="hidden sm:flex absolute bottom-2 sm:bottom-3 left-3 sm:left-5 z-20 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/90 p-1.5 sm:p-2 items-center gap-1.5">
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-rose-600 ring-2 ring-rose-400/40 cursor-pointer" />
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-600 cursor-pointer" />
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-600 cursor-pointer" />
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-slate-900 cursor-pointer" />
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-100 border border-slate-300 cursor-pointer" />
                  </div>

                  {/* ── ELEMENTO FLOTANTE 3: Tarjeta de Producto ── */}
                  <div className="hidden sm:block absolute -bottom-3 sm:-bottom-4 -right-2 sm:-right-4 z-20 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2.5 sm:p-3 w-38 sm:w-42 space-y-1.5">
                    <div className="relative h-20 sm:h-22 rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                      <img
                        src={activeData.card.img}
                        alt={activeData.card.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1 left-1 bg-slate-950/80 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                        {activeData.card.price}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-900 block truncate leading-tight">
                        {activeData.card.title}
                      </span>
                      <div className="flex items-center gap-1.5 pt-0.5">
                        <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-lg px-2 py-0.5 text-[9px] font-bold text-slate-700">
                          <span>-</span>
                          <span>1</span>
                          <span>+</span>
                        </div>
                        <button
                          type="button"
                          className="w-6 h-6 rounded-lg bg-slate-900 text-white hover:bg-emerald-600 transition flex items-center justify-center shrink-0 shadow-xs"
                          title="Agregar al Carrito"
                        >
                          <ShoppingBag className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })()}

          </div>

        </div>

        {/* ── BARRA DESLIZANTE INFINITA: Marquee de Proyectos Reales ── */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200/80">
          <p className="text-center text-[11px] sm:text-xs uppercase font-bold tracking-widest text-slate-500 mb-2.5">
            Marcas y proyectos activos que confían en Qatu Web
          </p>

          <div className="relative w-full overflow-hidden py-0.5">
            <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

            <div className="animate-marquee flex items-center gap-3 sm:gap-6">
              {[...BRANDS_LIST, ...BRANDS_LIST].map((b, idx) => (
                <div
                  key={`b1-${idx}`}
                  className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 text-xs font-bold shadow-2xs shrink-0 hover:border-slate-400 hover:bg-white transition"
                >
                  <span className="text-slate-900 font-black">{b.name}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200/90">{b.web}</span>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">{b.rubro}</span>
                  <span className="text-slate-300 hidden md:inline">•</span>
                  <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full hidden md:inline">{b.loc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ============================================================== */}
      {/* 2. DEMOS OFICIALES Y PANEL DE BOLSILLO EN 1 TOQUE             */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-24 bg-slate-50 border-y border-slate-200/80" id="demos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Encabezado de la sección */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/80 text-slate-800 border border-slate-300/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>3 Verticales Oficiales</span>
              <span className="text-slate-400">•</span>
              <span>Demos y Panel de Bolsillo en Vivo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Pruébalo antes de pagar con demos reales adaptadas a tu rubro
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explora la experiencia de compra de tus clientes y prueba el Panel de Bolsillo móvil (/admin) para apagar agotados o cambiar precios en 1 toque desde tu celular.
            </p>
          </div>

          {/* ── SIMULADOR INTERACTIVO DEL PANEL DE BOLSILLO (1 TOQUE) ── */}
          <div className="bg-gradient-to-r from-stone-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-lg">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Simulador de Panel de Bolsillo</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  ¿Se agotó un plato o una talla? Apágalo en 1 toque
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Sin llamar al programador ni esperar horas. Toca el botón para ver cómo reacciona tu catálogo en tiempo real ante tus clientes:
                </p>
              </div>

              {/* Botón táctil interactivo */}
              <div className="w-full md:w-auto bg-slate-900/90 rounded-2xl p-4 border border-slate-700 text-center space-y-3 shrink-0">
                <div className="flex items-center justify-between gap-4 text-xs">
                  <span className="font-semibold text-slate-300">Botín de Cuero (Talla 38)</span>
                  <span
                    className={`font-black px-2.5 py-0.5 rounded-full text-[11px] ${
                      inStockStatus
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {inStockStatus ? '● DISPONIBLE' : '✕ AGOTADO'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleToggleStock}
                  className={`w-full py-3 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                    inStockStatus
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {inStockStatus ? (
                    <>
                      <ToggleRight className="w-5 h-5 text-rose-200" />
                      <span>Apagar Producto (Marcar Agotado)</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-5 h-5 text-emerald-200" />
                      <span>Reactivar Producto (Disponible)</span>
                    </>
                  )}
                </button>

                {stockToast && (
                  <p className="text-[11px] text-amber-300 font-medium animate-fadeIn">
                    {stockToast}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── GRID DE LAS 3 VERTICALES OFICIALES CON RUTAS, PANEL Y UPSELLS ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="soluciones">

            {/* VERTICAL 1: CALZADOS & BOUTIQUES */}
            <article className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-semibold">
                    Jr. Asamblea 245
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-rose-700">
                    Vertical Oficial • Calzado & Moda
                  </span>
                  <h3 className="text-xl font-black text-slate-950 mt-1">
                    Calzados Lucas Huamanga
                  </h3>
                </div>

                {/* Dolor del comerciante */}
                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-xs text-rose-950 space-y-1">
                  <span className="font-bold block text-rose-800">Dolor común en Ayacucho:</span>
                  <p className="italic text-slate-700">
                    &quot;Responder &apos;¿tienes en talla 38?&apos; mandando 20 fotos sueltas que saturan el chat.&quot;
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Catálogo con selector de tallas y variantes de color, compresión WebP rápida para fotos de celular y comanda ordenada directa al WhatsApp con 0% comisiones.
                </p>

                {/* UPSELL NATURAL OFICIAL */}
                <div className="pt-2 p-3 bg-stone-50 rounded-xl border border-dashed border-stone-300 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-emerald-600" />
                      Módulo Upsell Natural:
                    </span>
                    <span className="font-black text-[#B23A2E] bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[10px]">
                      +S/ 90 pago único
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    <strong>Control de Inventario con Alertas WhatsApp:</strong> Te avisa a tu celular cuando te queden 2 pares de una talla para no perder ventas.
                  </p>
                </div>
              </div>

              {/* Botones de acción: Demo y Panel de Bolsillo */}
              <div className="pt-6 space-y-2 border-t border-slate-100 mt-6">
                <Link
                  href="/demo/calzados"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition active:scale-95 shadow-xs"
                >
                  <span>Ver Tienda en Vivo (/demo/calzados)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                </Link>
                <Link
                  href="/demo/calzados/admin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition"
                >
                  <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                  <span>Probar Panel de Bolsillo (/admin)</span>
                </Link>
              </div>
            </article>

            {/* VERTICAL 2: RESTAURANTES & PASTELERÍAS */}
            <article className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-semibold">
                    Jr. Bellido 180
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                    Vertical Oficial • Gastronomía & Carta QR
                  </span>
                  <h3 className="text-xl font-black text-slate-950 mt-1">
                    Restaurante Las Flores
                  </h3>
                </div>

                {/* Dolor del comerciante */}
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-xs text-amber-950 space-y-1">
                  <span className="font-bold block text-amber-800">Dolor común en Ayacucho:</span>
                  <p className="italic text-slate-700">
                    &quot;Cartas en PDF pesadas que los clientes no descargan y platos agotados a mediodía.&quot;
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Carta digital interactiva QR para salón y delivery con apagado de productos agotados en tiempo real y recepción de pedidos calculados por WhatsApp.
                </p>

                {/* UPSELL NATURAL OFICIAL */}
                <div className="pt-2 p-3 bg-stone-50 rounded-xl border border-dashed border-stone-300 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5 text-amber-600" />
                      Módulo Upsell Natural:
                    </span>
                    <span className="font-black text-[#B23A2E] bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[10px]">
                      +S/ 70 pago único
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    <strong>Carta QR con Mesas y Mozos:</strong> El cliente selecciona su número de mesa y mozo en su celular y la comanda llega lista a cocina.
                  </p>
                </div>
              </div>

              {/* Botones de acción: Demo y Panel de Bolsillo */}
              <div className="pt-6 space-y-2 border-t border-slate-100 mt-6">
                <Link
                  href="/demo/pasteleria"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition active:scale-95 shadow-xs"
                >
                  <span>Ver Carta en Vivo (/demo/pasteleria)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/demo/pasteleria/admin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition"
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                  <span>Probar Panel de Bolsillo (/admin)</span>
                </Link>
              </div>
            </article>

            {/* VERTICAL 3: GIMNASIOS & CONTROL DNI */}
            <article className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <Dumbbell className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-semibold">
                    Av. Mariscal Cáceres 540
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                    Vertical Oficial • Fitness & Membresías
                  </span>
                  <h3 className="text-xl font-black text-slate-950 mt-1">
                    Trankilandia Gym & Fitness
                  </h3>
                </div>

                {/* Dolor del comerciante */}
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-emerald-950 space-y-1">
                  <span className="font-bold block text-emerald-800">Dolor común en Ayacucho:</span>
                  <p className="italic text-slate-700">
                    &quot;Llevar cuadernos a mano para saber quién tiene la mensualidad vencida al entrar.&quot;
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Venta de pases online por WhatsApp, catálogo de suplementos, arqueo diario de caja y control rápido de clientes por DNI.
                </p>

                {/* UPSELL NATURAL OFICIAL */}
                <div className="pt-2 p-3 bg-stone-50 rounded-xl border border-dashed border-stone-300 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <ScanLine className="w-3.5 h-3.5 text-blue-600" />
                      Módulo Upsell Natural:
                    </span>
                    <span className="font-black text-[#B23A2E] bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[10px]">
                      +S/ 150 pago único
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    <strong>Lector DNI / Códigos de Barras:</strong> Escanea el documento en counter con la cámara del celular o lector USB para dar pase en 2 segundos.
                  </p>
                </div>
              </div>

              {/* Botones de acción: Demo y Panel de Bolsillo */}
              <div className="pt-6 space-y-2 border-t border-slate-100 mt-6">
                <Link
                  href="/demo/gym"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition active:scale-95 shadow-xs"
                >
                  <span>Ver Portal en Vivo (/demo/gym)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/demo/gym/admin"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Probar Panel de Bolsillo (/admin)</span>
                </Link>
              </div>
            </article>

          </div>

          {/* Franja de Autoridad: Marcas Oficiales con Sistemas en Producción */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200">
                <span>Marcas Oficiales en Producción</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-950">
                Marcas y proyectos reales que operan con sistemas Qatu Web
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Sistemas en vivo conectados con dominios propios y alta disponibilidad en Ayacucho y todo el Perú.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full md:w-auto">
              <a
                href="https://quinuaq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between sm:justify-start gap-2.5 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold transition group shadow-2xs"
                title="Visitar quinuaq.com"
              >
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>QuinuaQ</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-bold">
                    quinuaq.com
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 transition shrink-0" />
                </div>
              </a>

              <a
                href="https://www.mamaalice.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between sm:justify-start gap-2.5 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold transition group shadow-2xs"
                title="Visitar mamaalice.org"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Mama Alice ONG</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-bold">
                    mamaalice.org
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 transition shrink-0" />
                </div>
              </a>

              <a
                href="https://trankilandiagym.qatuweb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between sm:justify-start gap-2.5 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold transition group shadow-2xs"
                title="Visitar trankilandiagym.qatuweb.com"
              >
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>TrankilandiaGym</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-bold">
                    trankilandiagym.qatuweb.com
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 transition shrink-0" />
                </div>
              </a>
            </div>
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
              ¿Por qué Qatu Web rompe el mercado tradicional?
            </h2>
            <p className="text-sm text-slate-600">
              Compara lo que te cobra una agencia convencional o una plataforma internacional frente a nuestra tarifa de S/ 1 al día.
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
                  Mensualidades en dólares y comisiones por venta.
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
                    Configuraciones complejas que no se adaptan al flujo rápido de Yape/Plin.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    Soporte técnico por chatbot automático en inglés o tickets lentos.
                  </span>
                </li>
              </ul>
            </div>

            {/* Columna 3: Qatu Web (Destacada en Obsidiana) */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-500/70 shadow-2xl space-y-5 relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                Solución Recomendada
              </div>

              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                  La forma Qatu Web
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Qatu Web (Ayacucho)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ingeniería moderna con costo accesible para ti.
                </p>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-200">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Solo S/ 1 al día</strong> (S/ 300 al año con instalación <strong>GRATIS</strong> o S/ 30 al mes).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tu web lista en 24 a 48 horas</strong> con fotos y catálogo inicial cargado.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>0% de comisiones:</strong> El 100% del dinero de tus ventas va a tu bolsillo.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Panel de Bolsillo en tu celular:</strong> Cambia precios y apaga agotados en 5 segundos.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Soporte local en Huamanga:</strong> Trato directo por WhatsApp en español.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SECCIÓN DE PRECIOS CON CALCULADORA INTERACTIVA             */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-24 bg-stone-50 border-t border-stone-200/80" id="precios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B23A2E]">
              Tarifas Claras y Transparentes
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">
              Precios pensados para la realidad de Ayacucho
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Selecciona tu plan, combina los módulos especializados para tu rubro y obtén tu cotización en vivo con botón directo a WhatsApp. 0% comisiones por venta.
            </p>
          </div>

          {/* CALCULADORA INTERACTIVA DE PRECIOS */}
          <InteractivePricingCalculator
            defaultPlanId="anual"
            showDetails={true}
            showPromoBanner={true}
          />
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PREGUNTAS FRECUENTES (FAQ) Y MÉTODOS DE PAGO OFICIALES      */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" id="faq">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Conversémoslo Claro
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Respuestas directas sin letras chicas ni términos confusos.
          </p>
        </div>

        {/* Acordeón de FAQs */}
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

        {/* ── CUADRO DE CONFIANZA Y DATOS OFICIALES DE PAGO ── */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 sm:p-7 border-2 border-emerald-500/40 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-950 text-base">
                Datos Oficiales de Pago & Activación Inmediata
              </h3>
              <p className="text-xs text-slate-500">
                Transparencia total para comerciantes de Huamanga y el Perú
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
                Billeteras Digitales
              </span>
              <p className="font-mono font-black text-sm text-slate-900">
                {siteConfig.yapeNumber}
              </p>
              <p className="text-[11px] text-slate-500">
                Yape y Plin autorizados
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Titular Registrado
              </span>
              <p className="font-bold text-xs sm:text-sm text-slate-900">
                {siteConfig.yapeTitular}
              </p>
              <p className="text-[11px] text-slate-500">
                Emisión de comprobante legal
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                Activación en 1 Toque
              </span>
              <p className="font-bold text-xs sm:text-sm text-emerald-800">
                Portal /dashboard/cliente
              </p>
              <p className="text-[11px] text-slate-500">
                Subes la constancia y tu web queda activa
              </p>
            </div>
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
              Dale a tu negocio la presencia digital que merece por S/ 1 al día
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Únete a los comerciantes de Huamanga que ya reciben pedidos directos a su WhatsApp con un sistema rápido, profesional y con 0% de comisiones por venta.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsAppUrl(
                'Hola Qatu Web, estoy listo para iniciar mi tienda virtual o carta digital por S/ 1 al día (Plan Anual S/ 300) en Ayacucho.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-md transition active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Iniciar mi Web por WhatsApp</span>
            </a>
            <Link
              href="/dashboard/cliente"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700 transition"
            >
              <Lock className="w-4 h-4 text-slate-400" />
              <span>Portal de Clientes (/dashboard/cliente)</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MarketingHome;