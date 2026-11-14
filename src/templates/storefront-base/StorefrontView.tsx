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
  ArrowRight,
  Settings2,
  Search,
  Star,
  Calendar,
  Clock,
  Layers,
  ChevronRight,
  User,
  CheckSquare,
  Square,
  Shield,
  Coffee,
  Flame,
  Dumbbell,
  Sparkles,
  Wine,
  Package,
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
  // 1. Estado del Carrito y Drawer de Checkout (03 / CHECKOUT DRAWER)
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 2. Filtros y Búsqueda
  const [selectedCategory, setSelectedCategory] = useState<string>('cat-all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Modal de Personalización de Producto (02 / PRODUCT DETAIL)
  const [activeModalProduct, setActiveModalProduct] = useState<StoreProduct | null>(null);
  const [modalVariant, setModalVariant] = useState<string>('');
  const [modalAcabado, setModalAcabado] = useState<string>('');
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalGuarnicion, setModalGuarnicion] = useState('Papas nativas');
  const [modalSalsas, setModalSalsas] = useState<string[]>(['Ají pollero', 'Mayonesa']);
  const [modalDedicatoria, setModalDedicatoria] = useState('');
  const [modalVelas, setModalVelas] = useState('Velas artesanales');
  const [modalFechaCelebracion, setModalFechaCelebracion] = useState('');
  const [modalHoraRecojo, setModalHoraRecojo] = useState('');
  const [modalDni, setModalDni] = useState('');
  const [modalTurno, setModalTurno] = useState('Mañana 06:00 - 12:00');
  const [modalSubtono, setModalSubtono] = useState('Neutro');

  // 4. Datos del Checkout
  const [customerName, setCustomerName] = useState('');
  const [deliveryType, setDeliveryType] = useState<'tienda' | 'delivery'>('tienda');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(config.paymentMethods[0] || 'Yape');
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 5. Modo Demo Vendedor
  const [vendorWhatsapp, setVendorWhatsapp] = useState('');
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [vendorSuccessToast, setVendorSuccessToast] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(`qatu_demo_wa_${config.slug}`);
      if (saved) setVendorWhatsapp(saved);
    }
  }, [config.slug]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.cantidad, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [cart]
  );

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'cat-all' ||
        product.categoria_id === selectedCategory;

      const matchesSize =
        !selectedSizeFilter ||
        (product.variantes && product.variantes.includes(selectedSizeFilter));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.nombre.toLowerCase().includes(q) ||
        (product.descripcion && product.descripcion.toLowerCase().includes(q)) ||
        (product.codigo && product.codigo.toLowerCase().includes(q));

      return matchesCategory && matchesSize && matchesSearch;
    });
  }, [initialProducts, selectedCategory, selectedSizeFilter, searchQuery]);

  // Abrir Modal de Producto
  const handleOpenProductModal = (product: StoreProduct, presetVariant?: string) => {
    setActiveModalProduct(product);
    setModalQuantity(1);
    setModalVariant(presetVariant || product.variantes?.[0] || '');
    setModalAcabado(product.acabados?.[0]?.name || '');
    setModalGuarnicion('Papas nativas');
    setModalSalsas(['Ají pollero', 'Mayonesa']);
    setModalDedicatoria('');
    setModalVelas('Velas artesanales');
    setModalFechaCelebracion('');
    setModalHoraRecojo('');
    setModalDni('');
    setModalTurno('Mañana 06:00 - 12:00');
    setModalSubtono('Neutro');
  };

  // Agregar al Carrito
  const handleConfirmAddToCart = () => {
    if (!activeModalProduct) return;

    let finalPrice = activeModalProduct.precio_oferta || activeModalProduct.precio;
    if (activeModalProduct.portionOptions && activeModalProduct.portionOptions.length > 0) {
      const matched = activeModalProduct.portionOptions.find(
        (p) => p.label === modalVariant
      );
      if (matched) finalPrice = matched.price;
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

    const cartItemId = `${activeModalProduct.id}-${modalVariant}-${modalAcabado}-${modalGuarnicion || ''}-${modalDedicatoria || ''}-${modalTurno || ''}`;

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

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 250);
  };

  const toggleSalsa = (salsa: string) => {
    setModalSalsas((prev) =>
      prev.includes(salsa) ? prev.filter((s) => s !== salsa) : [...prev, salsa]
    );
  };

  const isDarkMode = config.theme.isDarkMode;

  // Iconos de categoría limpios
  const renderCategoryIcon = (iconName?: string) => {
    if (iconName === 'flame') return <Flame className="w-3.5 h-3.5" />;
    if (iconName === 'coffee') return <Coffee className="w-3.5 h-3.5" />;
    if (iconName === 'dumbbell') return <Dumbbell className="w-3.5 h-3.5" />;
    if (iconName === 'sparkles') return <Sparkles className="w-3.5 h-3.5" />;
    if (iconName === 'glass') return <Wine className="w-3.5 h-3.5" />;
    return <Package className="w-3.5 h-3.5" />;
  };

  return (
    <div
      className={`min-h-screen text-xs sm:text-sm font-sans ${
        isDarkMode ? 'bg-[#0E0D0B] text-[#F5EFE6]' : 'bg-[#FAF8F5] text-[#121212]'
      }`}
      style={{
        backgroundColor: config.theme.bgColor,
        color: config.theme.textColor,
      }}
    >
      {/* =========================================================
          BARRA TÉCNICA SUPERIOR DE SISTEMA (SHOWCASE FIGMA)
          ========================================================= */}
      {isDemoMode && (
        <div className="bg-black text-white text-[11px] font-mono border-b border-stone-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2 z-50 sticky top-0">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-stone-400 font-bold uppercase tracking-wider">
              DEMO V.01:
            </span>
            {[
              { slug: 'calzados', label: 'CALZADO' },
              { slug: 'pasteleria', label: 'PASTELERÍA' },
              { slug: 'polleria', label: 'POLLERÍA' },
              { slug: 'gym', label: 'GIMNASIO' },
              { slug: 'belleza', label: 'BELLEZA' },
              { slug: 'licoreria', label: 'LICORERÍA' },
            ].map((d) => (
              <a
                key={d.slug}
                href={`/demo/${d.slug}`}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider transition ${
                  config.slug === d.slug
                    ? 'bg-stone-200 text-black font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {d.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsVendorModalOpen(true)}
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono text-[10px] uppercase tracking-wider transition flex items-center gap-1.5"
            >
              <Smartphone className="w-3 h-3 text-emerald-400" />
              <span>PROBAR CON MI WHATSAPP</span>
              {vendorWhatsapp && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
            </button>
            <a
              href={`/demo/${config.slug}/admin`}
              className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-white font-mono text-[10px] uppercase tracking-wider transition hidden md:inline-flex items-center gap-1"
            >
              <Settings2 className="w-3 h-3" />
              <span>PANEL DUEÑO</span>
            </a>
          </div>
        </div>
      )}

      {/* =========================================================
          01 / TIENDA DESKTOP & MOBILE (HEADER SEGÚN IMÁGENES)
          ========================================================= */}
      <header
        className={`border-b transition-colors ${
          isDarkMode
            ? 'bg-[#0E0D0B] border-stone-800/90'
            : 'bg-[#FAF8F5] border-stone-200'
        }`}
      >
        {/* Barra de Estado con punto verde */}
        {config.statusBadge && (
          <div
            className={`px-4 py-1.5 text-[11px] font-mono border-b flex items-center justify-center gap-2 ${
              isDarkMode
                ? 'bg-stone-950/80 border-stone-900 text-emerald-400'
                : 'bg-stone-100 border-stone-200 text-stone-700'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold tracking-wider uppercase">
              {config.statusBadge.text}
            </span>
            {config.statusBadge.subtext && (
              <span className="hidden sm:inline text-stone-500">
                — {config.statusBadge.subtext}
              </span>
            )}
          </div>
        )}

        {/* Barra de Navegación Principal */}
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {/* Logo del Rubro */}
          <div className="flex items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase font-display">
              {config.businessName}
            </h1>
          </div>

          {/* Menú de Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-stone-400">
            {config.categories.slice(0, 4).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`transition ${
                  selectedCategory === c.id
                    ? 'text-stone-900 dark:text-white font-bold underline underline-offset-4'
                    : 'hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {c.name}
              </button>
            ))}
          </nav>

          {/* Iconos de Utilidad y Carrito */}
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block w-52">
              <input
                type="text"
                placeholder="Buscar modelo o plato..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-8 pr-3 py-1.5 rounded text-xs border transition focus:outline-none ${
                  isDarkMode
                    ? 'bg-stone-900 border-stone-800 text-white focus:border-stone-600'
                    : 'bg-white border-stone-300 text-stone-900 focus:border-stone-500'
                }`}
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Botón Carrito */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-900 transition"
              title="Ver Pedido"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-600 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO ASIMÉTRICO (FIGMA PANEL 01)
          ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          {/* Columna Izquierda: Texto Asimétrico con Barra Vertical */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-start gap-3">
              <span
                className="w-1 self-stretch shrink-0 rounded"
                style={{ backgroundColor: config.theme.primaryColor }}
              />
              <div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none font-display">
                  {config.hero.title}
                </h2>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-stone-400 block mt-2">
                  {config.subTagline}
                </span>
              </div>
            </div>

            <p
              className={`text-xs sm:text-sm max-w-lg leading-relaxed ${
                isDarkMode ? 'text-stone-400' : 'text-stone-600'
              }`}
            >
              {config.hero.subtitle}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('catalogo-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-mono font-bold uppercase tracking-wider underline underline-offset-4 hover:opacity-80 transition flex items-center gap-1.5"
              >
                <span>{config.hero.ctaText}</span>
              </button>
              <span className="text-stone-300 dark:text-stone-700">|</span>
              <span className="text-[11px] font-mono text-stone-400 truncate">
                {config.pickupAddress || config.location}
              </span>
            </div>
          </div>

          {/* Columna Derecha: Fotografía */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md">
              <img
                src={config.hero.bannerUrl}
                alt={config.businessName}
                className="w-full h-full object-cover"
              />
              {config.hero.badge && (
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded">
                  {config.hero.badge}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECCIÓN CATÁLOGO + SIDEBAR FILTROS (DISEÑO FIGMA)
          ========================================================= */}
      <section id="catalogo-grid" className="max-w-6xl mx-auto px-4 py-4 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SIDEBAR DE FILTROS (ESCRITORIO) */}
          <aside className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400 mb-3">
                FILTRAR
              </h3>

              {/* Filtro por Categoría */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-stone-400 uppercase block mb-1">
                  CATEGORÍA
                </span>
                {config.categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left text-xs font-mono uppercase tracking-wider py-1 px-2 rounded flex items-center gap-2 transition ${
                        isSelected
                          ? 'bg-stone-900 text-white dark:bg-white dark:text-black font-bold'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-900'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className="truncate">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filtro por Talla (Para calzados) */}
            {config.rubro === 'calzado' && (
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                <span className="text-[11px] font-mono text-stone-400 uppercase block mb-2">
                  TALLA
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {['38', '39', '40', '41'].map((t) => {
                    const isSelected = selectedSizeFilter === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() =>
                          setSelectedSizeFilter(isSelected ? '' : t)
                        }
                        className={`py-1.5 text-xs font-mono border rounded text-center transition ${
                          isSelected
                            ? 'bg-stone-900 text-white dark:bg-white dark:text-black border-stone-900'
                            : 'border-stone-300 dark:border-stone-800 hover:border-stone-500'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>

          {/* CUADRÍCULA DE PRODUCTOS */}
          <main className="lg:col-span-9">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200 dark:border-stone-800 text-[11px] font-mono text-stone-400">
              <span>{filteredProducts.length} MODELOS DISPONIBLES</span>
              {selectedSizeFilter && (
                <button
                  type="button"
                  onClick={() => setSelectedSizeFilter('')}
                  className="hover:underline text-red-600"
                >
                  Quitar filtro talla [{selectedSizeFilter}]
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredProducts.map((product) => {
                const hasOffer = !!product.precio_oferta;
                const displayPrice = product.precio_oferta || product.precio;

                return (
                  <div
                    key={product.id}
                    className={`rounded-lg border overflow-hidden flex flex-col justify-between transition ${
                      isDarkMode
                        ? 'bg-[#141310] border-stone-800 hover:border-stone-700'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      {/* Imagen con Badges Planos (Sin emojis) */}
                      <div className="relative aspect-[4/3] bg-stone-100 dark:bg-stone-900 overflow-hidden">
                        <img
                          src={product.imagen_url}
                          alt={product.nombre}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {product.badge && (
                          <span
                            className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-white"
                            style={{ backgroundColor: config.theme.primaryColor }}
                          >
                            {product.badge}
                          </span>
                        )}
                        {product.codigo && (
                          <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 text-[9px] font-mono bg-black/80 text-white">
                            {product.codigo}
                          </span>
                        )}
                      </div>

                      {/* Detalles del Producto */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-black text-sm uppercase tracking-tight font-display">
                            {product.nombre}
                          </h4>
                          <span className="text-sm font-black font-mono shrink-0">
                            {config.currency} {displayPrice.toFixed(2)}
                          </span>
                        </div>

                        {product.descripcion && (
                          <p
                            className={`text-[11px] line-clamp-2 leading-relaxed ${
                              isDarkMode ? 'text-stone-400' : 'text-stone-600'
                            }`}
                          >
                            {product.descripcion}
                          </p>
                        )}

                        {/* Estado Disponible */}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>DISPONIBLE</span>
                        </div>

                        {/* Specs técnicas si existen (Gym) */}
                        {product.specs && (
                          <div className="pt-2 grid grid-cols-3 gap-1 text-[10px] font-mono border-t border-stone-200 dark:border-stone-800">
                            {Object.entries(product.specs).map(([k, v]) => (
                              <div key={k} className="text-center p-1 bg-stone-100 dark:bg-stone-900 rounded">
                                <span className="text-stone-400 block text-[9px]">{k}</span>
                                <span className="font-bold truncate block">{v}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tallas / Variantes en botones circulares/cuadrados */}
                        {product.variantes && product.variantes.length > 0 && (
                          <div className="pt-2 flex flex-wrap gap-1.5 items-center">
                            {product.variantes.map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => handleOpenProductModal(product, v)}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono border transition ${
                                  isDarkMode
                                    ? 'border-stone-800 hover:border-stone-600 text-stone-300'
                                    : 'border-stone-300 hover:border-stone-600 text-stone-700'
                                }`}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Botón de Acción Rectangular */}
                    <div className="p-4 pt-0">
                      <button
                        type="button"
                        onClick={() => handleOpenProductModal(product)}
                        className="w-full py-2.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider text-white transition active:scale-95 flex items-center justify-center gap-2"
                        style={{ backgroundColor: config.theme.primaryColor }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>AGREGAR AL CARRITO</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </section>

      {/* =========================================================
          02 / PRODUCT DETAIL MODAL (FIGMA PANEL 02)
          ========================================================= */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            className={`w-full max-w-md rounded-lg border overflow-hidden flex flex-col max-h-[90vh] shadow-2xl ${
              isDarkMode
                ? 'bg-[#141310] border-stone-800 text-white'
                : 'bg-white border-stone-200 text-[#121212]'
            }`}
          >
            {/* Header del Modal */}
            <div className="px-5 py-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono">
              <span className="text-stone-400 uppercase tracking-wider font-bold">
                02 / PRODUCT DETAIL
              </span>
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cuerpo del Modal */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="aspect-[4/3] rounded overflow-hidden border border-stone-200 dark:border-stone-800">
                <img
                  src={activeModalProduct.imagen_url}
                  alt={activeModalProduct.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-black uppercase font-display">
                    {activeModalProduct.nombre}
                  </h3>
                  <span className="text-base font-black font-mono">
                    {config.currency}{' '}
                    {(activeModalProduct.precio_oferta || activeModalProduct.precio).toFixed(2)}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-stone-400 uppercase">
                  {config.rubro.toUpperCase()} • {activeModalProduct.codigo || 'LFH-01'}
                </span>
              </div>

              {/* Acabado / Color (Calzado / Belleza) */}
              {activeModalProduct.acabados && activeModalProduct.acabados.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <span className="text-[11px] font-mono text-stone-400 uppercase block">
                    ACABADO
                  </span>
                  <div className="flex items-center gap-3">
                    {activeModalProduct.acabados.map((acab) => {
                      const isSelected = modalAcabado === acab.name;
                      return (
                        <button
                          key={acab.name}
                          type="button"
                          onClick={() => setModalAcabado(acab.name)}
                          className="flex flex-col items-center gap-1 group"
                        >
                          <span
                            className={`w-6 h-6 rounded-full border-2 transition ${
                              isSelected
                                ? 'border-red-600 scale-110'
                                : 'border-stone-400 dark:border-stone-700'
                            }`}
                            style={{ backgroundColor: acab.colorHex }}
                          />
                          <span className="text-[10px] font-mono text-stone-400 group-hover:text-stone-200">
                            {acab.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Selector de Tallas */}
              {activeModalProduct.variantes && activeModalProduct.variantes.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span className="uppercase">{config.features.variantLabel.toUpperCase()}</span>
                    <span className="hover:underline cursor-pointer">GUÍA DE TALLAS ↗</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProduct.variantes.map((v) => {
                      const isSelected = modalVariant === v;
                      return (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setModalVariant(v)}
                          className={`w-9 h-9 rounded-full border text-xs font-mono font-bold flex items-center justify-center transition ${
                            isSelected
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                          }`}
                        >
                          {v}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Guarnición y Salsas (Pollería) */}
              {config.features.customizationType === 'rotisserie' && (
                <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800 font-mono text-xs">
                  <div>
                    <span className="text-[11px] text-stone-400 uppercase block mb-1.5">
                      ELIGE TU GUARNICIÓN
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {['Papas nativas', 'Papas tradicionales'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setModalGuarnicion(g)}
                          className={`p-2 border rounded text-left transition ${
                            modalGuarnicion === g
                              ? 'border-amber-500 bg-amber-950/20 text-amber-300 font-bold'
                              : 'border-stone-700 text-stone-400'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-stone-400 uppercase block mb-1.5">
                      ELIGE TUS SALSAS
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {['Ají pollero', 'Mayonesa', 'Chimichurri', 'Ocopa'].map((s) => {
                        const isChecked = modalSalsas.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleSalsa(s)}
                            className={`p-2 border rounded flex items-center justify-between text-left transition ${
                              isChecked
                                ? 'border-amber-500 text-amber-300 font-bold'
                                : 'border-stone-800 text-stone-400'
                            }`}
                          >
                            <span>{s}</span>
                            {isChecked ? (
                              <CheckSquare className="w-3.5 h-3.5" />
                            ) : (
                              <Square className="w-3.5 h-3.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Dedicatoria y Velas (Pastelería) */}
              {config.features.customizationType === 'cake' && (
                <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800 font-mono text-xs">
                  <div>
                    <span className="text-[11px] text-stone-400 uppercase block mb-1">
                      DEDICATORIA EN CHOCOLATE
                    </span>
                    <input
                      type="text"
                      maxLength={40}
                      placeholder="Escribe tu dedicatoria en chocolate... 0/40"
                      value={modalDedicatoria}
                      onChange={(e) => setModalDedicatoria(e.target.value)}
                      className="w-full px-3 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-transparent text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 uppercase block mb-1.5">
                      VELAS ARTESANALES
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {['Velas clásicas', 'Velas artesanales', 'Sin velas'].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setModalVelas(v)}
                          className={`p-1.5 border rounded text-center text-[10px] transition ${
                            modalVelas === v
                              ? 'border-amber-700 bg-amber-900/20 text-amber-900 dark:text-amber-300 font-bold'
                              : 'border-stone-300 dark:border-stone-700 text-stone-500'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* DNI y Turno (Gym) */}
              {config.features.customizationType === 'gym' && (
                <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800 font-mono text-xs">
                  <div>
                    <span className="text-[11px] text-stone-400 uppercase block mb-1">
                      DNI DEL SOCIO
                    </span>
                    <input
                      type="text"
                      maxLength={8}
                      placeholder="Ej: 73456789"
                      value={modalDni}
                      onChange={(e) => setModalDni(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full px-3 py-1.5 rounded border border-stone-700 bg-transparent text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Barra de Stock Disponible */}
              <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-900/40 text-emerald-500 text-xs font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>STOCK DISPONIBLE</span>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-stone-200 dark:border-stone-800">
              <button
                type="button"
                onClick={handleConfirmAddToCart}
                className="w-full py-3 rounded text-xs font-mono font-bold uppercase tracking-wider text-white transition active:scale-95 flex items-center justify-center gap-2"
                style={{ backgroundColor: config.theme.primaryColor }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>AGREGAR AL CARRITO</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          03 / CHECKOUT DRAWER (FIGMA PANEL 03)
          ========================================================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm h-full flex flex-col justify-between bg-[#121212] text-white shadow-2xl font-mono text-xs">
            {/* Header Drawer */}
            <div className="px-5 py-4 border-b border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-bold">
                  03 / CHECKOUT DRAWER
                </span>
                <h3 className="text-base font-black uppercase tracking-tight">
                  TU PEDIDO ({cartCount.toString().padStart(2, '0')} ARTÍCULOS)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Lista de Items */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {cart.length === 0 ? (
                <div className="py-20 text-center text-stone-500 space-y-2">
                  <ShoppingBag className="w-10 h-10 mx-auto stroke-1" />
                  <p className="uppercase">Tu carrito está vacío</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded border border-stone-800 flex gap-3 items-center justify-between bg-stone-900/60"
                  >
                    <img
                      src={item.imagen_url}
                      alt={item.nombre}
                      className="w-12 h-12 object-cover rounded shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h4 className="font-bold truncate uppercase">{item.nombre}</h4>
                      {item.variante && (
                        <span className="text-[10px] text-stone-400 block">
                          {item.acabado ? `${item.acabado} | ` : ''}Talla {item.variante}
                        </span>
                      )}
                      {item.detallesPersonalizados?.guarnicion && (
                        <span className="text-[10px] text-amber-400 block truncate">
                          - {item.detallesPersonalizados.guarnicion}
                        </span>
                      )}
                      <span className="font-bold text-stone-200 block">
                        {config.currency} {(item.precio * item.cantidad).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-5 h-5 rounded border border-stone-700 flex items-center justify-center text-[10px]"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold">
                        {item.cantidad}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-5 h-5 rounded border border-stone-700 flex items-center justify-center text-[10px]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Formulario Checkout */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-stone-800 space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-stone-400 pb-2 border-b border-stone-800">
                    <span>SUBTOTAL</span>
                    <span className="font-bold text-white text-sm">
                      {config.currency} {cartTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Nombre */}
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block mb-1">
                      NOMBRE DEL CLIENTE:
                    </span>
                    <input
                      type="text"
                      placeholder="Ej: Carlos Mendoza"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded border border-stone-800 bg-stone-900 text-white text-xs focus:outline-none focus:border-stone-600"
                    />
                  </div>

                  {/* Método de Entrega */}
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block mb-1.5">
                      MÉTODO DE ENTREGA
                    </span>
                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() => setDeliveryType('tienda')}
                        className={`w-full p-2.5 rounded border text-left flex items-start gap-2 transition ${
                          deliveryType === 'tienda'
                            ? 'border-red-600 bg-red-950/20 text-white font-bold'
                            : 'border-stone-800 text-stone-400'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-current mt-0.5 flex items-center justify-center">
                          {deliveryType === 'tienda' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          )}
                        </span>
                        <div>
                          <span className="block text-[11px]">RECOJO EN TIENDA</span>
                          <span className="text-[9px] text-stone-500 font-normal">
                            {config.pickupAddress || config.location}
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryType('delivery')}
                        className={`w-full p-2.5 rounded border text-left flex items-start gap-2 transition ${
                          deliveryType === 'delivery'
                            ? 'border-red-600 bg-red-950/20 text-white font-bold'
                            : 'border-stone-800 text-stone-400'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-current mt-0.5 flex items-center justify-center">
                          {deliveryType === 'delivery' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          )}
                        </span>
                        <div>
                          <span className="block text-[11px]">DELIVERY A DOMICILIO</span>
                          <span className="text-[9px] text-stone-500 font-normal">
                            Envío en Huamanga y distritos
                          </span>
                        </div>
                      </button>
                    </div>

                    {deliveryType === 'delivery' && (
                      <input
                        type="text"
                        placeholder="Dirección o referencia exacta..."
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full mt-2 px-3 py-1.5 rounded border border-stone-800 bg-stone-900 text-white text-xs focus:outline-none"
                      />
                    )}
                  </div>

                  {/* Método de Pago */}
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block mb-1.5">
                      MÉTODO DE PAGO
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {config.paymentMethods.map((m) => {
                        const isSelected = paymentMethod === m;
                        return (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setPaymentMethod(m)}
                            className={`p-2 rounded border text-[10px] font-bold text-center uppercase transition ${
                              isSelected
                                ? 'border-red-600 bg-red-950/30 text-white'
                                : 'border-stone-800 text-stone-400'
                            }`}
                          >
                            {m}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Verificación edad licorería */}
                  {config.rubro === 'licoreria' && (
                    <label className="flex items-center gap-2 text-[10px] text-stone-400 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAgeConfirmed}
                        onChange={(e) => setIsAgeConfirmed(e.target.checked)}
                        className="rounded bg-stone-900 border-stone-700"
                      />
                      <span>Confirmo ser mayor de 18 años.</span>
                    </label>
                  )}
                </div>
              )}
            </div>

            {/* Footer Drawer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-stone-800 bg-stone-950 space-y-3">
                <button
                  type="button"
                  disabled={!customerName.trim() || isSubmitting}
                  onClick={handleSendOrder}
                  className="w-full py-3.5 rounded text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xl transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-40"
                  style={{ backgroundColor: '#B91C1C' }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'GENERANDO PEDIDO...' : 'CONFIRMAR POR WHATSAPP'}
                  </span>
                </button>
                <span className="text-[9px] text-center text-stone-500 block uppercase tracking-wider">
                  PEDIDO SUJETO A CONFIRMACIÓN
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          SISTEMA DE DISEÑO BARRA INFERIOR (FIGMA FOOTER SHOWCASE)
          ========================================================= */}
      <footer className="border-t border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-black py-4 px-4 text-[10px] font-mono text-stone-500 uppercase tracking-wider">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900 dark:text-stone-100">
              SISTEMA VISUAL:
            </span>
            <span>{config.businessName} • E-COMMERCE UI</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span>PALETA:</span>
              <span
                className="w-3 h-3 rounded-full border border-black/20"
                style={{ backgroundColor: config.theme.primaryColor }}
              />
              <span
                className="w-3 h-3 rounded-full border border-black/20"
                style={{ backgroundColor: config.theme.bgColor }}
              />
            </div>
            <span>ESPACIADO: 8PT GRID</span>
          </div>
        </div>
      </footer>

      {/* Modal Vendedor WhatsApp */}
      {isVendorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-stone-950 border border-stone-800 text-white rounded p-6 max-w-sm w-full space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider">
                SIMULADOR DE WHATSAPP DEMO
              </span>
              <button
                type="button"
                onClick={() => setIsVendorModalOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Ingresa el número de WhatsApp para recibir los pedidos de prueba en vivo.
            </p>
            <form onSubmit={handleSaveVendorWhatsapp} className="space-y-3">
              <input
                type="tel"
                placeholder="Ej: 941663265"
                value={vendorWhatsapp}
                onChange={(e) => setVendorWhatsapp(e.target.value)}
                className="w-full px-3 py-2 rounded bg-stone-900 border border-stone-700 text-white text-xs font-mono focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 rounded bg-stone-200 text-black font-bold uppercase tracking-wider transition"
              >
                ACTIVAR NÚMERO DEMO
              </button>
            </form>
          </div>
        </div>
      )}

      {vendorSuccessToast && (
        <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50 bg-stone-900 border border-stone-700 text-emerald-400 font-mono px-4 py-2 rounded text-xs font-bold shadow-lg">
          WHATSAPP DEMO CONFIGURADO
        </div>
      )}
    </div>
  );
}
