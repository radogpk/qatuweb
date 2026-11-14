'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  StoreProduct,
  TenantConfig,
  CartItem,
  CartCustomizationDetails,
} from './tenant.config';
import { buildWhatsAppUrl } from './whatsappBuilder';
import {
  ShoppingBag,
  MapPin,
  MessageCircle,
  Plus,
  Minus,
  Trash2,
  X,
  Check,
  Smartphone,
  Sparkles,
  ArrowRight,
  Settings2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Flame,
  Search,
  Star,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface StorefrontViewProps {
  config: TenantConfig;
  initialProducts: StoreProduct[];
  isDemoMode?: boolean;
}

export function StorefrontView({
  config,
  initialProducts,
  isDemoMode = true,
}: StorefrontViewProps) {
  // 1. Estado del Carrito y Drawer de Checkout
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 2. Filtro de Categoría y Búsqueda
  const [selectedCategory, setSelectedCategory] = useState<string>('cat-all');
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Modal de Personalización de Producto (02 / Modal)
  const [activeModalProduct, setActiveModalProduct] = useState<StoreProduct | null>(null);
  const [modalVariant, setModalVariant] = useState<string>('');
  const [modalAcabado, setModalAcabado] = useState<string>('');
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalGuarnicion, setModalGuarnicion] = useState('Papas Nativas Crocantes');
  const [modalSalsas, setModalSalsas] = useState<string[]>(['Ají Pollero', 'Mayonesa de la casa']);
  const [modalDedicatoria, setModalDedicatoria] = useState('');
  const [modalVelas, setModalVelas] = useState('Velas clásicas');
  const [modalFechaCelebracion, setModalFechaCelebracion] = useState('');
  const [modalHoraRecojo, setModalHoraRecojo] = useState('');
  const [modalDni, setModalDni] = useState('');
  const [modalTurno, setModalTurno] = useState('Mañana (06:00 - 12:00)');
  const [modalSubtono, setModalSubtono] = useState('Neutro');

  // 4. Datos del Cliente en el Checkout (03 / Checkout Drawer)
  const [customerName, setCustomerName] = useState('');
  const [deliveryType, setDeliveryType] = useState<'tienda' | 'delivery'>('tienda');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(config.paymentMethods[0] || 'Yape');
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 5. Modo Demo Vendedor (Cambio de WhatsApp en vivo en la calle)
  const [vendorWhatsapp, setVendorWhatsapp] = useState('');
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [vendorSuccessToast, setVendorSuccessToast] = useState(false);

  // Cargar número demo previo si existe en sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(`qatu_demo_wa_${config.slug}`);
      if (saved) setVendorWhatsapp(saved);
    }
  }, [config.slug]);

  // Totales del Carrito
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.cantidad, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [cart]
  );

  // Filtrado de productos por categoría y buscador
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'cat-all' ||
        selectedCategory.includes('all') ||
        product.categoria_id === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.nombre.toLowerCase().includes(q) ||
        (product.descripcion && product.descripcion.toLowerCase().includes(q)) ||
        (product.codigo && product.codigo.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  // Abrir modal de personalización
  const handleOpenProductModal = (product: StoreProduct) => {
    setActiveModalProduct(product);
    setModalQuantity(1);
    setModalVariant(product.variantes?.[0] || '');
    setModalAcabado(product.acabados?.[0]?.name || '');
    setModalGuarnicion('Papas Nativas Crocantes');
    setModalSalsas(['Ají Pollero', 'Mayonesa de la casa']);
    setModalDedicatoria('');
    setModalVelas('Velas artesanales');
    setModalFechaCelebracion('');
    setModalHoraRecojo('');
    setModalDni('');
    setModalTurno('Mañana (06:00 - 12:00)');
    setModalSubtono('Neutro');
  };

  // Agregar al carrito desde el modal de personalización
  const handleConfirmAddToCart = () => {
    if (!activeModalProduct) return;

    // Calcular precio base según porción si existe
    let finalPrice = activeModalProduct.precio_oferta || activeModalProduct.precio;
    if (activeModalProduct.portionOptions && activeModalProduct.portionOptions.length > 0) {
      const matchedPortion = activeModalProduct.portionOptions.find(
        (p) => p.label === modalVariant
      );
      if (matchedPortion) {
        finalPrice = matchedPortion.price;
      }
    }

    const customizationDetails: CartCustomizationDetails = {};
    if (config.features.customizationType === 'rotisserie') {
      customizationDetails.guarnicion = modalGuarnicion;
      customizationDetails.salsas = modalSalsas;
    } else if (config.features.customizationType === 'cake') {
      if (modalDedicatoria.trim()) customizationDetails.dedicatoria = modalDedicatoria.trim();
      customizationDetails.velas = modalVelas;
      if (modalFechaCelebracion) customizationDetails.fechaCelebracion = modalFechaCelebracion;
      if (modalHoraRecojo) customizationDetails.horaRecojo = modalHoraRecojo;
    } else if (config.features.customizationType === 'gym') {
      if (modalDni.trim()) customizationDetails.dni = modalDni.trim();
      customizationDetails.turno = modalTurno;
    } else if (config.features.customizationType === 'beauty') {
      customizationDetails.subtono = modalSubtono;
    }

    const cartItemId = `${activeModalProduct.id}-${modalVariant}-${modalAcabado}-${modalGuarnicion || ''}-${modalDedicatoria || ''}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, cantidad: item.cantidad + modalQuantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: activeModalProduct.id,
          nombre: activeModalProduct.nombre,
          precio: finalPrice,
          cantidad: modalQuantity,
          variante: modalVariant,
          acabado: modalAcabado,
          detallesPersonalizados: customizationDetails,
          imagen_url: activeModalProduct.imagen_url,
        },
      ];
    });

    setActiveModalProduct(null);
    setIsCartOpen(true);
  };

  // Modificar cantidad en carrito
  const updateQuantity = (cartItemId: string, change: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.cantidad + change;
            return newQty > 0 ? { ...item, cantidad: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Guardar WhatsApp personalizado del prospecto
  const handleSaveVendorWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = vendorWhatsapp.replace(/[^0-9]/g, '');
    setVendorWhatsapp(clean);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`qatu_demo_wa_${config.slug}`, clean);
    }
    setIsVendorModalOpen(false);
    setVendorSuccessToast(true);
    setTimeout(() => setVendorSuccessToast(false), 3500);
  };

  // Enviar Pedido por WhatsApp
  const handleSendOrder = async () => {
    if (!customerName.trim() || cart.length === 0) return;
    setIsSubmitting(true);

    const whatsappUrl = buildWhatsAppUrl(config, cart, {
      customerName: customerName.trim(),
      deliveryType,
      customerAddress,
      paymentMethod,
      cartTotal,
      customWhatsappOverride: vendorWhatsapp || undefined,
    });

    // Pequeño timeout antes de redirigir para feedback visual
    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 300);
  };

  // Toggle de salsa para Pollería
  const toggleSalsa = (salsa: string) => {
    setModalSalsas((prev) =>
      prev.includes(salsa) ? prev.filter((s) => s !== salsa) : [...prev, salsa]
    );
  };

  const isDarkMode = config.theme.isDarkMode;

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-[#0A0C10] text-[#F5F7FA]' : 'bg-[#F3F4F2] text-[#171717]'
      }`}
      style={{
        backgroundColor: config.theme.bgColor,
        color: config.theme.textColor,
      }}
    >
      {/* =========================================================
          BARRA SUPERIOR EXCLUSIVA MODO DEMO (SWICHER ENTRE NICHOS)
          ========================================================= */}
      {isDemoMode && (
        <nav className="bg-slate-950 text-white px-3 py-2 flex items-center justify-between text-xs sticky top-0 z-50 border-b border-slate-800 shadow-md">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] shrink-0">
              Qatu Demos:
            </span>
            <a
              href="/demo/calzados"
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 transition ${
                config.rubro === 'calzado'
                  ? 'bg-red-700 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              👟 Calzados
            </a>
            <a
              href="/demo/pasteleria"
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 transition ${
                config.rubro === 'pasteleria'
                  ? 'bg-amber-700 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              🍰 Pastelería
            </a>
            <a
              href="/demo/polleria"
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 transition ${
                config.rubro === 'polleria'
                  ? 'bg-orange-700 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              🍗 Pollería
            </a>
            <a
              href="/demo/gym"
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 transition ${
                config.rubro === 'gym'
                  ? 'bg-emerald-700 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              🏋️ Gimnasio
            </a>
            <a
              href="/demo/belleza"
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 transition ${
                config.rubro === 'belleza'
                  ? 'bg-rose-700 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              💄 Belleza
            </a>
            <a
              href="/demo/licoreria"
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 transition ${
                config.rubro === 'licoreria'
                  ? 'bg-sky-700 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              🍻 Licorería
            </a>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2">
            <button
              type="button"
              onClick={() => setIsVendorModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-sm transition active:scale-95"
              title="Configurar número para la demo en vivo"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Probar con mi WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
              {vendorWhatsapp && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
            </button>
            <a
              href={`/demo/${config.slug.replace('calzados-lucas', 'calzados').replace('lasflores', 'pasteleria').replace('don-brasas', 'polleria')}/admin`}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold transition hidden md:inline-flex items-center gap-1"
            >
              <Settings2 className="w-3 h-3" />
              <span>Panel Dueño</span>
            </a>
          </div>
        </nav>
      )}

      {/* =========================================================
          PANEL 01 / TIENDA DESKTOP & MOBILE HEADER
          ========================================================= */}
      <header
        className={`border-b transition-colors ${
          isDarkMode
            ? 'bg-[#0E121B] border-slate-800 text-white'
            : 'bg-white border-stone-200 text-[#171717]'
        }`}
      >
        {/* Barra de Estado Operativo */}
        {config.statusBadge && (
          <div
            className={`px-4 py-1.5 text-xs text-center border-b font-medium flex items-center justify-center gap-2 ${
              isDarkMode
                ? 'bg-slate-900/80 border-slate-800 text-emerald-400'
                : 'bg-stone-100 border-stone-200 text-stone-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">{config.statusBadge.text}</span>
            {config.statusBadge.subtext && (
              <span className="hidden sm:inline text-stone-500">
                • {config.statusBadge.subtext}
              </span>
            )}
          </div>
        )}

        {/* Barra Principal de Navegación */}
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block">
                {config.subTagline || 'Catálogo Oficial • Huamanga'}
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase">
                {config.businessName}
              </h1>
            </div>
          </div>

          {/* Buscador Rápido y Carrito */}
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block w-64">
              <input
                type="text"
                placeholder="Buscar modelo o plato..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-3 py-1.5 rounded-full text-xs border transition focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-700 text-white focus:ring-emerald-500'
                    : 'bg-stone-50 border-stone-300 text-stone-900 focus:ring-red-500'
                }`}
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2" />
            </div>

            {/* Botón Carrito Header */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full font-bold text-xs shadow-sm transition active:scale-95"
              style={{
                backgroundColor: config.theme.primaryColor,
                color: '#FFFFFF',
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Tu Pedido</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white text-stone-900 text-[10px] font-black">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO ASIMÉTRICO (ESTILO FIGMA AGENCY SHOWCASE)
          ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 pt-6 pb-4">
        <div
          className={`rounded-3xl border overflow-hidden p-6 sm:p-10 transition-shadow ${
            isDarkMode
              ? 'bg-[#111622] border-slate-800'
              : 'bg-white border-stone-200/90 shadow-sm'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Lado Izquierdo: Copy Editorial Asimétrico */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-6 rounded-full"
                  style={{ backgroundColor: config.theme.primaryColor }}
                />
                <span className="text-xs font-bold tracking-widest uppercase text-stone-400">
                  {config.hero.badge || 'Huamanga, Ayacucho'}
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-none">
                {config.hero.title}{' '}
                <span
                  className="block mt-1"
                  style={{ color: config.theme.primaryColor }}
                >
                  {config.hero.highlightText}
                </span>
              </h2>

              <p
                className={`text-sm sm:text-base max-w-lg leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-stone-600'
                }`}
              >
                {config.hero.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('catalogo-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider shadow-md transition active:scale-95 inline-flex items-center gap-2"
                  style={{
                    backgroundColor: config.theme.primaryColor,
                    color: '#FFFFFF',
                  }}
                >
                  <span>{config.hero.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs text-stone-400 px-3 py-2">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="truncate max-w-xs">{config.pickupAddress || config.location}</span>
                </div>
              </div>
            </div>

            {/* Lado Derecho: Fotografía Gastronómica o de Producto */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-xl border border-black/10">
                <img
                  src={config.hero.bannerUrl}
                  alt={config.businessName}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md font-semibold">
                    100% Calidad Garantizada
                  </span>
                  <span className="flex items-center gap-1 font-bold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-current" /> 4.9 (Google & WhatsApp)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FILTROS POR CATEGORÍA Y BUSCADOR MÓVIL
          ========================================================= */}
      <section id="catalogo-section" className="max-w-6xl mx-auto px-4 py-4">
        {/* Buscador móvil */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar en el catálogo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 rounded-2xl text-xs border ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-stone-300 text-stone-900'
              }`}
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Barra de Tabs / Pills Horizontales */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {config.categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition active:scale-95 flex items-center gap-1.5 ${
                  isActive
                    ? 'shadow-sm text-white'
                    : isDarkMode
                    ? 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
                style={{
                  backgroundColor: isActive ? config.theme.primaryColor : undefined,
                }}
              >
                {cat.icon && <span>{cat.icon}</span>}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          CUADRÍCULA DE PRODUCTOS (GRIDS 2 A 4 COLUMNAS)
          ========================================================= */}
      <main className="max-w-6xl mx-auto px-4 py-4 pb-32">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs uppercase font-bold tracking-wider text-stone-400">
            Mostrando {filteredProducts.length} productos disponibles
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div
            className={`p-12 text-center rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
            }`}
          >
            <p className="text-stone-400 text-sm">
              No se encontraron productos para &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('cat-all');
              }}
              className="mt-3 text-xs font-bold text-red-600 hover:underline"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const hasOffer = !!product.precio_oferta;
              const displayPrice = product.precio_oferta || product.precio;

              return (
                <div
                  key={product.id}
                  className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-lg ${
                    isDarkMode
                      ? 'bg-[#111622] border-slate-800/90'
                      : 'bg-white border-stone-200'
                  }`}
                >
                  <div>
                    {/* Imagen con Badges */}
                    <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                      <img
                        src={product.imagen_url}
                        alt={product.nombre}
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      {product.badge && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-sm">
                          {product.badge}
                        </span>
                      )}
                      {product.codigo && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 text-white backdrop-blur-sm">
                          {product.codigo}
                        </span>
                      )}
                      {product.rating && (
                        <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-sm">
                          <Star className="w-3 h-3 text-amber-500 fill-current" />
                          <span>{product.rating.score.toFixed(1)}</span>
                          <span className="text-[10px] text-stone-400">
                            ({product.rating.reviewsCount})
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Información del Producto */}
                    <div className="p-5">
                      <h3 className="font-bold text-base sm:text-lg leading-snug">
                        {product.nombre}
                      </h3>
                      {product.descripcion && (
                        <p
                          className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${
                            isDarkMode ? 'text-slate-400' : 'text-stone-500'
                          }`}
                        >
                          {product.descripcion}
                        </p>
                      )}

                      {/* Specs técnicos (si tiene, como en Gym) */}
                      {product.specs && (
                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-1 text-[10px]">
                          {Object.entries(product.specs).map(([key, val]) => (
                            <div key={key} className="bg-slate-100 dark:bg-slate-800/60 p-1 rounded text-center">
                              <span className="text-stone-400 block">{key}</span>
                              <span className="font-bold truncate">{val}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Swatches de acabado/color si tiene */}
                      {product.acabados && product.acabados.length > 0 && (
                        <div className="mt-3 flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-stone-400 uppercase mr-1">
                            Colores:
                          </span>
                          {product.acabados.map((acab) => (
                            <span
                              key={acab.name}
                              title={acab.name}
                              className="w-4 h-4 rounded-full border border-white shadow-sm inline-block"
                              style={{ backgroundColor: acab.colorHex }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Chips de variantes / tallas en tarjeta */}
                      {product.variantes && product.variantes.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {product.variantes.slice(0, 4).map((v) => (
                            <span
                              key={v}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                                isDarkMode
                                  ? 'bg-slate-800 border-slate-700 text-slate-300'
                                  : 'bg-stone-50 border-stone-200 text-stone-600'
                              }`}
                            >
                              {v}
                            </span>
                          ))}
                          {product.variantes.length > 4 && (
                            <span className="text-[10px] text-stone-400 self-center">
                              +{product.variantes.length - 4} más
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Precios y Botón de Acción */}
                  <div className="p-5 pt-0">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xl sm:text-2xl font-black">
                        {config.currency} {displayPrice.toFixed(2)}
                      </span>
                      {hasOffer && (
                        <span className="text-xs text-stone-400 line-through">
                          {config.currency} {product.precio.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenProductModal(product)}
                      className="w-full py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: config.theme.primaryColor,
                        color: '#FFFFFF',
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Personalizar & Pedir</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* =========================================================
          PANEL 02 / MODAL DE PERSONALIZACIÓN DE PRODUCTO
          ========================================================= */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-lg rounded-3xl border overflow-hidden shadow-2xl flex flex-col max-h-[90vh] ${
              isDarkMode ? 'bg-[#111622] border-slate-800 text-white' : 'bg-white border-stone-200 text-[#171717]'
            }`}
          >
            {/* Cabecera del Modal */}
            <div className="px-6 py-4 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400 block">
                  02 / Personalización de Producto
                </span>
                <h3 className="font-bold text-base leading-tight">
                  {activeModalProduct.nombre}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-stone-100 dark:bg-slate-800 text-stone-500 hover:text-stone-900 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cuerpo del Modal con Scroll */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Foto pequeña con precio */}
              <div className="flex gap-4 items-center bg-stone-50 dark:bg-slate-900/60 p-3 rounded-2xl">
                <img
                  src={activeModalProduct.imagen_url}
                  alt={activeModalProduct.nombre}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div>
                  <span className="text-xs text-stone-400 block font-mono">
                    Código: {activeModalProduct.codigo || activeModalProduct.id}
                  </span>
                  <p className="font-black text-xl text-emerald-600 dark:text-emerald-400">
                    {config.currency}{' '}
                    {(activeModalProduct.precio_oferta || activeModalProduct.precio).toFixed(2)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Stock Disponible para despacho hoy
                  </span>
                </div>
              </div>

              {/* 1. Selector de Tallas / Variantes */}
              {activeModalProduct.variantes && activeModalProduct.variantes.length > 0 && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                    Selecciona {config.features.variantLabel}:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProduct.variantes.map((v) => {
                      const isSelected = modalVariant === v;
                      return (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setModalVariant(v)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                            isSelected
                              ? 'bg-stone-900 text-white dark:bg-white dark:text-black ring-2 ring-red-500'
                              : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                          }`}
                        >
                          {v}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. Selector de Acabados / Color (Para Calzados / Belleza) */}
              {activeModalProduct.acabados && activeModalProduct.acabados.length > 0 && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                    Elige el Acabado / Color:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {activeModalProduct.acabados.map((acab) => {
                      const isSelected = modalAcabado === acab.name;
                      return (
                        <button
                          key={acab.name}
                          type="button"
                          onClick={() => setModalAcabado(acab.name)}
                          className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                            isSelected
                              ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                              : 'border-stone-200 dark:border-slate-800'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full border border-black/20"
                            style={{ backgroundColor: acab.colorHex }}
                          />
                          <span className="text-[11px] truncate">{acab.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Selector de Guarnición & Salsas (Para Pollería Don Brasas) */}
              {config.features.customizationType === 'rotisserie' && (
                <div className="space-y-4 pt-2 border-t border-stone-200 dark:border-slate-800">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                      Elige tu guarnición:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Papas Nativas Crocantes', 'Papas Tradicionales'].map((g) => {
                        const isSelected = modalGuarnicion === g;
                        return (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setModalGuarnicion(g)}
                            className={`p-3 rounded-2xl border text-xs font-bold text-left transition ${
                              isSelected
                                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200'
                                : 'border-stone-200 dark:border-slate-800'
                            }`}
                          >
                            <span className="block font-black">{g}</span>
                            <span className="text-[10px] text-stone-400 block mt-0.5">
                              Recién fritas al momento
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                      Elige tus salsas artesanales (incluidas):
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Ají Pollero', 'Mayonesa de la casa', 'Chimichurri', 'Ocopa'].map((salsa) => {
                        const isChecked = modalSalsas.includes(salsa);
                        return (
                          <button
                            key={salsa}
                            type="button"
                            onClick={() => toggleSalsa(salsa)}
                            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition ${
                              isChecked
                                ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 font-bold'
                                : 'border-stone-200 dark:border-slate-800 text-stone-600 dark:text-stone-400'
                            }`}
                          >
                            <span>{salsa}</span>
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                                isChecked ? 'bg-red-600 text-white' : 'border border-stone-300'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Dedicatoria y Velas (Para Pastelería Las Flores) */}
              {config.features.customizationType === 'cake' && (
                <div className="space-y-4 pt-2 border-t border-stone-200 dark:border-slate-800">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                      Dedicatoria en chocolate (Gratis):
                    </label>
                    <input
                      type="text"
                      maxLength={40}
                      placeholder="Ej: Feliz Cumpleaños Mamá (máx 40 letras)"
                      value={modalDedicatoria}
                      onChange={(e) => setModalDedicatoria(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs border border-stone-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="text-[10px] text-stone-400 block text-right mt-1">
                      {modalDedicatoria.length}/40 caracteres
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                      Velas artesanales:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Velas clásicas', 'Velas artesanales', 'Sin velas'].map((vela) => (
                        <button
                          key={vela}
                          type="button"
                          onClick={() => setModalVelas(vela)}
                          className={`p-2 rounded-xl border text-xs font-bold text-center transition ${
                            modalVelas === vela
                              ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200'
                              : 'border-stone-200 dark:border-slate-800'
                          }`}
                        >
                          {vela}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Registro Rápido DNI & Turno (Para Gym Trankilandia) */}
              {config.features.customizationType === 'gym' && (
                <div className="space-y-4 pt-2 border-t border-stone-200 dark:border-slate-800">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                      DNI del Socio (para matrícula):
                    </label>
                    <input
                      type="text"
                      maxLength={8}
                      placeholder="Ej: 73456789"
                      value={modalDni}
                      onChange={(e) => setModalDni(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full px-3 py-2 rounded-xl text-xs font-mono border border-stone-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                      Turno preferido:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Mañana (06:00-12:00)', 'Tarde (12:00-17:00)', 'Noche (17:00-22:00)'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setModalTurno(t)}
                          className={`p-2 rounded-xl border text-[11px] font-bold text-center transition ${
                            modalTurno === t
                              ? 'border-emerald-500 bg-emerald-950/30 text-emerald-400'
                              : 'border-slate-800'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Contador de Cantidad */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Cantidad:
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full border border-stone-300 dark:border-slate-700 flex items-center justify-center text-sm font-bold active:scale-95"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold font-mono w-6 text-center">
                    {modalQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full border border-stone-300 dark:border-slate-700 flex items-center justify-center text-sm font-bold active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="p-4 border-t border-stone-200 dark:border-slate-800 flex gap-3">
              <button
                type="button"
                onClick={handleConfirmAddToCart}
                className="w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider text-white shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
                style={{ backgroundColor: config.theme.primaryColor }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Guardar & Añadir al Carrito</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          PANEL 03 / CHECKOUT DRAWER & PEDIDO WHATSAPP
          ========================================================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-slideLeft ${
              isDarkMode ? 'bg-[#0E121B] border-l border-slate-800 text-white' : 'bg-white text-[#171717]'
            }`}
          >
            {/* Header del Carrito */}
            <div className="px-6 py-4 border-b border-stone-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400 block">
                  03 / Checkout Drawer
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                  <span>Tu Pedido</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-600 text-white font-mono">
                    {cartCount} items
                  </span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-stone-100 dark:bg-slate-800 text-stone-500 hover:text-stone-900 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Lista de Items con Scroll */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {cart.length === 0 ? (
                <div className="py-16 text-center text-stone-400 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-stone-300" />
                  <p className="text-sm font-semibold">Tu carrito está vacío.</p>
                  <p className="text-xs">Elige tus productos del catálogo para armar tu pedido.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl border border-stone-200 dark:border-slate-800 flex gap-3 items-center justify-between bg-stone-50/50 dark:bg-slate-900/50"
                  >
                    <img
                      src={item.imagen_url}
                      alt={item.nombre}
                      className="w-14 h-14 object-cover rounded-xl shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold truncate">{item.nombre}</h4>
                      {item.variante && (
                        <span className="text-[10px] text-stone-400 block font-mono">
                          {item.variante} {item.acabado ? `• ${item.acabado}` : ''}
                        </span>
                      )}
                      {item.detallesPersonalizados?.guarnicion && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 block truncate">
                          ↳ {item.detallesPersonalizados.guarnicion}
                        </span>
                      )}
                      {item.detallesPersonalizados?.dedicatoria && (
                        <span className="text-[10px] text-purple-600 dark:text-purple-400 block truncate">
                          ↳ Dedicatoria: &quot;{item.detallesPersonalizados.dedicatoria}&quot;
                        </span>
                      )}
                      <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-1">
                        {config.currency} {(item.precio * item.cantidad).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-full border border-stone-300 dark:border-slate-700 flex items-center justify-center text-xs active:scale-95"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold font-mono w-4 text-center">
                        {item.cantidad}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-full border border-stone-300 dark:border-slate-700 flex items-center justify-center text-xs active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Formulario de Checkout */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-stone-200 dark:border-slate-800 space-y-4">
                  {/* Nombre del Cliente */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                      Tu Nombre Completo: *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Carlos Mendoza"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs border border-stone-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {/* Método de Entrega */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                      Método de Entrega:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryType('tienda')}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition ${
                          deliveryType === 'tienda'
                            ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                            : 'border-stone-200 dark:border-slate-800'
                        }`}
                      >
                        <span className="block">Recojo en Tienda</span>
                        <span className="text-[10px] text-stone-400 font-normal truncate block">
                          {config.pickupAddress || config.location}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryType('delivery')}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition ${
                          deliveryType === 'delivery'
                            ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                            : 'border-stone-200 dark:border-slate-800'
                        }`}
                      >
                        <span className="block">Delivery a Casa</span>
                        <span className="text-[10px] text-stone-400 font-normal block">
                          Huamanga y distritos
                        </span>
                      </button>
                    </div>

                    {deliveryType === 'delivery' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Escribe tu dirección o referencia en Huamanga..."
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl text-xs border border-stone-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* Método de Pago */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                      Método de Pago:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {config.paymentMethods.map((method) => {
                        const isSelected = paymentMethod === method;
                        const isYape = method.toLowerCase().includes('yape');
                        const isPlin = method.toLowerCase().includes('plin');

                        return (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`p-2 rounded-xl border text-[11px] font-bold text-center transition ${
                              isSelected
                                ? isYape
                                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-black'
                                  : isPlin
                                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300 font-black'
                                  : 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                                : 'border-stone-200 dark:border-slate-800'
                            }`}
                          >
                            {method}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Confirmación de edad para licorería */}
                  {config.rubro === 'licoreria' && (
                    <label className="flex items-center gap-2 text-xs text-stone-400 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAgeConfirmed}
                        onChange={(e) => setIsAgeConfirmed(e.target.checked)}
                        className="rounded text-sky-500 focus:ring-sky-500"
                      />
                      <span>Confirmo ser mayor de 18 años para comprar bebidas alcohólicas.</span>
                    </label>
                  )}
                </div>
              )}
            </div>

            {/* Footer con Total y Botón WhatsApp */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-200 dark:border-slate-800 bg-stone-50/80 dark:bg-slate-900/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Total a Pagar:
                  </span>
                  <span className="text-2xl font-black">
                    {config.currency} {cartTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!customerName.trim() || isSubmitting}
                  onClick={handleSendOrder}
                  className="w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider text-white shadow-xl transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#25D366' }} // Verde WhatsApp Oficial
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>
                    {isSubmitting ? 'Generando Pedido...' : 'Confirmar Pedido por WhatsApp'}
                  </span>
                </button>
                <p className="text-[10px] text-center text-stone-400">
                  ⚡ Tu pedido llegará directamente al WhatsApp del negocio listo para confirmar.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          BARRA FLOTANTE INFERIOR MÓVIL (STICKY CART BAR)
          ========================================================= */}
      {cartCount > 0 && !isCartOpen && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 animate-slideUp">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl shadow-2xl flex items-center justify-between text-white font-bold text-xs uppercase tracking-wider"
            style={{
              backgroundColor: config.theme.primaryColor,
            }}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Ver Pedido ({cartCount})</span>
            </div>
            <div className="flex items-center gap-1 font-black text-sm">
              <span>
                {config.currency} {cartTotal.toFixed(2)}
              </span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* =========================================================
          MODAL DE CONFIGURACIÓN DEL VENDEDOR EN MODO DEMO
          ========================================================= */}
      {isVendorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Simulador de WhatsApp Demo</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsVendorModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ingresa el número de WhatsApp del comerciante (o el tuyo). Cuando hagas un pedido de
              prueba, el mensaje llegará a ese WhatsApp en vivo.
            </p>
            <form onSubmit={handleSaveVendorWhatsapp} className="space-y-3">
              <input
                type="tel"
                placeholder="Ej: 941663265 (9 dígitos)"
                value={vendorWhatsapp}
                onChange={(e) => setVendorWhatsapp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs uppercase tracking-wider text-white transition"
              >
                Guardar y Activar Demo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast de éxito vendedor */}
      {vendorSuccessToast && (
        <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>¡WhatsApp para la demo configurado correctamente!</span>
        </div>
      )}
    </div>
  );
}
