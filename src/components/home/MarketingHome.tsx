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
  MapPin,
  ShoppingBag,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/config/site';

type IndustryTab = 'zapateria' | 'restaurante' | 'gimnasio';

interface PhoneDemoData {
  businessName: string;
  tagline: string;
  location: string;
  productName: string;
  productDesc: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  variantLabel: string;
  variants: string[];
  activeVariant: string;
  whatsappBubble: {
    orderNumber: string;
    itemSummary: string;
    paymentNote: string;
  };
  demoUrl: string;
  demoAdminUrl: string;
}

const DEMO_TABS_DATA: Record<IndustryTab, PhoneDemoData> = {
  zapateria: {
    businessName: 'Calzados Lucas Huamanga',
    tagline: 'Calzado artesanal en puro cuero ayacuchano',
    location: 'Jr. Asamblea 245, Huamanga',
    productName: 'Botín Cuero Caña Alta',
    productDesc: 'Puro cuero vacuno con suela antideslizante reforzada.',
    price: 120,
    originalPrice: 135,
    imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop&q=80',
    variantLabel: 'Talla',
    variants: ['37', '38', '39', '40'],
    activeVariant: '38',
    whatsappBubble: {
      orderNumber: '#42',
      itemSummary: '1x Botín Cuero Caña Alta (Talla 38) - S/ 120.00',
      paymentNote: 'Pagado con Yape • Entrega Jr. 28 de Julio',
    },
    demoUrl: '/demo/calzados',
    demoAdminUrl: '/demo/calzados/admin',
  },
  restaurante: {
    businessName: 'Restaurante Las Flores',
    tagline: 'Carta digital, desayunos y postres tradicionales',
    location: 'Jr. Bellido 180, Huamanga',
    productName: 'Torta Selva Negra Artesanal',
    productDesc: 'Cacao cusqueño, crema chantilly y cerezas maceradas.',
    price: 55,
    originalPrice: 65,
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
    variantLabel: 'Porción',
    variants: ['Personal', 'Mediana', 'Familiar'],
    activeVariant: 'Mediana',
    whatsappBubble: {
      orderNumber: '#18',
      itemSummary: '1x Torta Selva Negra Mediana - S/ 55.00',
      paymentNote: 'Para Mesa 4 • Pagado con Plin',
    },
    demoUrl: '/demo/pasteleria',
    demoAdminUrl: '/demo/pasteleria/admin',
  },
  gimnasio: {
    businessName: 'Trankilandia Gym',
    tagline: 'Fuerza, rendimiento y nutrición en Huamanga',
    location: 'Av. Mariscal Cáceres 540, Huamanga',
    productName: 'Membresía Mensual Libre',
    productDesc: 'Acceso total a máquinas, peso libre y casillero.',
    price: 80,
    originalPrice: 90,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    variantLabel: 'Modalidad',
    variants: ['Mañana', 'Libre Completo'],
    activeVariant: 'Libre Completo',
    whatsappBubble: {
      orderNumber: '#09',
      itemSummary: '1x Membresía Mensual Libre Completo - S/ 80.00',
      paymentNote: 'DNI: 72849102 • Pagado por Yape',
    },
    demoUrl: '/demo/gym',
    demoAdminUrl: '/demo/gym/admin',
  },
};

export function MarketingHome() {
  const [activeTab, setActiveTab] = useState<IndustryTab>('zapateria');
  const [selectedVariants, setSelectedVariants] = useState<Record<IndustryTab, string>>({
    zapateria: '38',
    restaurante: 'Mediana',
    gimnasio: 'Libre Completo',
  });

  const currentDemo = DEMO_TABS_DATA[activeTab];
  const activeVariant = selectedVariants[activeTab];

  const handleSelectVariant = (variant: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [activeTab]: variant,
    }));
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
      a: 'En 24 a 48 horas hábiles. Una vez que nos envías tu logotipo, número de WhatsApp y tu lista inicial de fotos y precios, nuestro equipo en Huamanga configura tu web lista para vender.',
    },
    {
      q: '¿Quién es dueño de la información y la base de datos?',
      a: 'Tú eres el único dueño. Cada cliente de Qatu Web cuenta con su propio entorno y base de datos Supabase aislada. Si algún día decides migrar o crecer a un desarrollo corporativo, te entregamos tu código y datos sin trabas ni penalidades.',
    },
  ];

  return (
    <div className="bg-[#FDFBF7] text-stone-900 selection:bg-amber-100 selection:text-amber-950 font-sans antialiased overflow-x-hidden">
      {/* ============================================================== */}
      {/* HERO SECTION COMERCIAL CON MOCKUP INTERACTIVO DE CELULAR       */}
      {/* ============================================================== */}
      <section className="pt-8 sm:pt-14 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Columna Izquierda: Mensaje Comercial Directo */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-center lg:text-left">
            {/* Etiqueta única superior de autoridad local */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-stone-900 text-xs font-semibold shadow-2xs">
              <span className="text-sm">📍</span>
              <span>Huamanga, Ayacucho</span>
              <span className="text-amber-600 font-black">•</span>
              <span className="text-[#C83E2B] font-bold">Tu web o sistema listo en 24 horas</span>
            </div>

            {/* Título Principal Limpio (Sin subrayado ondulado rojo) */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-stone-950 tracking-tight leading-[1.14]">
              Páginas Web y Sistemas a Medida para tu Negocio por{' '}
              <span className="text-[#C83E2B]">S/ 30 al mes</span>
            </h1>

            {/* Subtítulo enfocado en beneficios */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Diseñamos el catálogo virtual, carta QR o sistema de control exacto para tu negocio en Ayacucho. 
              Tus clientes piden desde su celular, el pedido llega armado a tu WhatsApp y tú controlas precios y stock en un toque.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <a
                href="#demos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-stone-950 text-white font-bold text-sm shadow-md hover:bg-stone-800 transition active:scale-95"
              >
                <span>Ver Demos en Vivo</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </a>
              <a
                href={getWhatsAppUrl(
                  'Hola Qatu Web, me gustaría recibir asesoría para implementar una web y catálogo por S/ 30 al mes en mi negocio de Ayacucho.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-800 font-bold text-sm hover:bg-stone-50 shadow-xs transition active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#059669]" />
                <span>Hablar por WhatsApp</span>
              </a>
            </div>

            {/* Micro métricas de tranquilidad */}
            <div className="pt-2 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 text-left">
              <div className="p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
                <div className="text-[11px] font-bold text-stone-400 uppercase">Sin Comisiones</div>
                <div className="text-sm font-black text-[#059669]">0% por venta</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
                <div className="text-[11px] font-bold text-stone-400 uppercase">Administración</div>
                <div className="text-sm font-black text-stone-900">En tu celular</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
                <div className="text-[11px] font-bold text-stone-400 uppercase">Soporte Local</div>
                <div className="text-sm font-black text-[#C83E2B]">En Huamanga</div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Mockup de Celular Moderno Interactivo */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Pestañas Interactivas para cambiar de Rubro */}
            <div className="w-full max-w-sm mb-4 flex items-center justify-between p-1 bg-stone-200/80 rounded-2xl border border-stone-300/80 text-xs font-bold text-stone-700 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('zapateria')}
                className={`flex-1 py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'zapateria'
                    ? 'bg-white text-stone-950 shadow-xs font-black'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                <span>👟</span>
                <span>Zapatería</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('restaurante')}
                className={`flex-1 py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'restaurante'
                    ? 'bg-white text-stone-950 shadow-xs font-black'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                <span>🍲</span>
                <span>Restaurante</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('gimnasio')}
                className={`flex-1 py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'gimnasio'
                    ? 'bg-white text-stone-950 shadow-xs font-black'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                <span>🏋️</span>
                <span>Gimnasio</span>
              </button>
            </div>

            {/* Chasis del Celular Moderno */}
            <div className="w-full max-w-sm bg-stone-950 p-3 sm:p-3.5 rounded-[40px] shadow-2xl border-4 border-stone-800 relative">
              {/* Notch superior del celular */}
              <div className="w-24 h-4 bg-stone-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-stone-950" />
              </div>

              {/* Pantalla del Celular */}
              <div className="bg-white rounded-[30px] overflow-hidden border border-stone-200 flex flex-col relative text-left">
                {/* Cabecera de la Tienda dentro del Celular */}
                <div className="bg-[#C83E2B] text-white p-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 block">
                        Tienda Oficial • Ayacucho
                      </span>
                      <h3 className="font-bold text-sm tracking-tight">
                        {currentDemo.businessName}
                      </h3>
                      <p className="text-[10px] text-stone-100 truncate mt-0.5">
                        {currentDemo.location}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Contenido del Producto en la Pantalla */}
                <div className="p-3.5 space-y-3">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                    <img
                      src={currentDemo.imageUrl}
                      alt={currentDemo.productName}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-stone-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Disponible
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-bold text-sm text-stone-900">
                        {currentDemo.productName}
                      </h4>
                      <div className="text-right">
                        <span className="text-base font-black text-[#C83E2B]">
                          S/ {currentDemo.price.toFixed(2)}
                        </span>
                        {currentDemo.originalPrice && (
                          <span className="text-[11px] text-stone-400 line-through block -mt-1">
                            S/ {currentDemo.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {currentDemo.productDesc}
                    </p>
                  </div>

                  {/* Selector Interactivo de Variantes */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-stone-600 block">
                      Selecciona {currentDemo.variantLabel}:
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {currentDemo.variants.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => handleSelectVariant(v)}
                          className={`px-2.5 py-1 text-xs rounded-lg font-bold border transition ${
                            activeVariant === v
                              ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Burbuja Flotante de WhatsApp: Muestra cómo llega el pedido listo */}
                <div className="p-3 bg-stone-50 border-t border-stone-200">
                  <div className="bg-[#E7F8EE] border border-emerald-300 rounded-2xl p-2.5 text-xs text-stone-800 space-y-1 shadow-xs">
                    <div className="flex items-center gap-1.5 text-[#059669] font-black text-[11px]">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Mensaje listo en el WhatsApp del dueño:</span>
                    </div>
                    <p className="text-[11px] text-stone-700 leading-snug">
                      ✅ <strong>Nuevo Pedido {currentDemo.whatsappBubble.orderNumber}</strong>: 1x {currentDemo.productName} ({currentDemo.variantLabel} {activeVariant}) por <strong>S/ {currentDemo.price.toFixed(2)}</strong>.
                    </p>
                    <span className="text-[10px] text-emerald-800 font-medium block">
                      {currentDemo.whatsappBubble.paymentNote}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón Directo para Probar la Tienda en Pantalla Completa */}
            <div className="w-full max-w-sm mt-3">
              <Link
                href={currentDemo.demoUrl}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white border border-stone-300 text-stone-900 font-black text-xs hover:bg-stone-50 shadow-xs transition active:scale-95 group"
              >
                <span>Probar esta tienda en pantalla completa</span>
                <ArrowRight className="w-4 h-4 text-[#C83E2B] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. BENTO GRID DE LAS 3 VERTICALES OFICIALES                   */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-20 bg-stone-100/70 border-y border-stone-200/90" id="demos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-900 border border-amber-500/25">
              <span>Tres Negocios Reales en Huamanga</span>
              <span className="w-1 h-1 rounded-full bg-amber-600" />
              <span>Demos 100% Interactivas</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight">
              Sistemas probados para cada rubro
            </h2>
            <p className="text-stone-600 text-xs sm:text-base leading-relaxed">
              Toca para abrir la tienda que verá tu cliente en su celular, y el panel de bolsillo privado desde donde controlarás precios y productos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
      {/* 3. MATRIZ COMPARATIVA DE 3 COLUMNAS                            */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="comparativa">
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C83E2B]">
              Transparencia Absoluta
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight">
              ¿Por qué Qatu Web rompe el mercado tradicional?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Compara lo que te cobra una agencia convencional o una plataforma internacional frente a nuestra solución a medida.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna 1: Agencia Tradicional */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wide">
                  La forma antigua
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  Agencia Tradicional
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Presupuestos inflados de miles de soles.
                </p>
              </div>

              <ul className="space-y-3 text-xs text-stone-600">
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
                    Hosting compartido lento que se cae en fechas clave.
                  </span>
                </li>
              </ul>
            </div>

            {/* Columna 2: SaaS Enlatado Internacional */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                  Plataformas Externas
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  Shopify / Tiendanube
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Mensualidades en dólares y comisiones por venta.
                </p>
              </div>

              <ul className="space-y-3 text-xs text-stone-600">
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
                    Soporte técnico por chatbot automático en inglés o tickets lentos.
                  </span>
                </li>
              </ul>
            </div>

            {/* Columna 3: Qatu Web (Destacada) */}
            <div className="bg-stone-950 text-white rounded-3xl p-6 sm:p-7 border-2 border-amber-500/70 shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                Solución Recomendada
              </div>

              <div className="border-b border-stone-800 pb-3">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                  La forma Qatu Web
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Qatu Web (Huamanga)
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Ingeniería moderna con costo accesible para ti.
                </p>
              </div>

              <ul className="space-y-3 text-xs text-stone-200">
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
                    <strong>Soporte local en Huamanga:</strong> Ingenieros disponibles por WhatsApp directo.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SECCIÓN DE PRECIOS Y MÓDULOS A MEDIDA                       */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-20 bg-stone-100/70 border-t border-stone-200/90" id="precios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C83E2B]">
              Tarifas Claras
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight">
              Precios pensados para la realidad de Ayacucho
            </h2>
            <p className="text-stone-600 text-xs sm:text-base leading-relaxed">
              Elige el plan que mejor se adapte a tu momento comercial. Sin contratos forzosos ni cobros sorpresa.
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
              <div className="absolute -top-3.5 right-6 bg-amber-500 text-stone-950 text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md">
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 max-w-4xl mx-auto space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
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
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-stone-900">Control de Inventario</span>
                  <span className="font-mono text-xs font-bold text-[#C83E2B]">S/ 90</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Alertas automáticas a WhatsApp cuando un producto tenga poco stock.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-stone-900">Lector DNI / Barras</span>
                  <span className="font-mono text-xs font-bold text-[#C83E2B]">S/ 150</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Check-in rápido escaneando el DNI con la cámara del celular.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-stone-900">Carta QR de Mesas</span>
                  <span className="font-mono text-xs font-bold text-[#C83E2B]">S/ 70</span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Selector de número de mesa y mozo con envío directo a WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PREGUNTAS FRECUENTES (FAQ)                                 */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="faq">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C83E2B]">
              Conversémoslo Claro
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight">
              Preguntas Frecuentes
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Respuestas directas sin términos técnicos confusos.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-2xl border border-stone-200 p-5 open:shadow-xs transition"
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
      {/* 6. CIERRE DE CONFIANZA ANTES DEL FOOTER GLOBAL                */}
      {/* ============================================================== */}
      <section className="bg-stone-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Empecemos hoy mismo</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Dale a tu negocio la presencia digital que merece
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Únete a los comerciantes de Huamanga que ya reciben pedidos directos a su WhatsApp con un sistema rápido, profesional y sin pagar comisiones abusivas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsAppUrl(
                'Hola Qatu Web, estoy listo para iniciar mi web y catálogo por S/ 30 al mes en Ayacucho.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-md transition active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Iniciar mi Web por WhatsApp</span>
            </a>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-sm border border-stone-700 transition"
            >
              <span>Acceso de Clientes (/login)</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}