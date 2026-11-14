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
  User,
  CheckSquare,
  Square,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  Flame,
  Wine,
  Coffee,
  Dumbbell,
  Droplets,
  Heart,
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
  // Mobile Tab activo cuando la pantalla es pequeña (< 1024px)
  const [mobileTab, setMobileTab] = useState<'tienda' | 'detalle' | 'pedido'>('tienda');

  // Producto seleccionado para Panel 02
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct>(() => {
    return initialProducts.find((p) => p.destacado) || initialProducts[0] || {} as StoreProduct;
  });

  // Estado del Producto en Panel 02
  const [selectedVariant, setSelectedVariant] = useState<string>(() => {
    const prod = initialProducts.find((p) => p.destacado) || initialProducts[0];
    return prod?.variantes?.[0] || '40';
  });
  const [selectedAcabado, setSelectedAcabado] = useState<string>(() => {
    const prod = initialProducts.find((p) => p.destacado) || initialProducts[0];
    return prod?.acabados?.[1]?.name || prod?.acabados?.[0]?.name || 'Tabaco';
  });
  const [selectedGuarnicion, setSelectedGuarnicion] = useState('Papas nativas');
  const [selectedSalsas, setSelectedSalsas] = useState<string[]>(['Ají pollero', 'Mayonesa']);
  const [selectedDedicatoria, setSelectedDedicatoria] = useState('');
  const [selectedVelas, setSelectedVelas] = useState('Velas artesanales');
  const [selectedPorcionTorta, setSelectedPorcionTorta] = useState('Mediana 10p');
  const [selectedDni, setSelectedDni] = useState('');
  const [selectedTurno, setSelectedTurno] = useState('Mañana 06:00 - 12:00');
  const [selectedTonoBelleza, setSelectedTonoBelleza] = useState('Rosa Profundo');
  const [selectedSubtono, setSelectedSubtono] = useState<'Cálido' | 'Neutro' | 'Frío'>('Neutro');
  const [activeTabBelleza, setActiveTabBelleza] = useState<'ingredientes' | 'modo' | 'recomendacion'>('ingredientes');
  const [selectedComplementosLicor, setSelectedComplementosLicor] = useState<string[]>(['Bolsa de hielo']);

  // Filtros en Panel 01
  const [categoryFilter, setCategoryFilter] = useState<string>('cat-all');
  const [sizeFilter, setSizeFilter] = useState<string>('40');
  const [searchQuery, setSearchQuery] = useState('');

  // Carrito de Compras (Panel 03) - Precargar items realistas idénticos a los de Figma para cada rubro
  const [cart, setCart] = useState<CartItem[]>(() => {
    switch (config.slug) {
      case 'calzados':
        return [
          {
            id: 'cart-calz-1',
            productId: 'calz-1',
            nombre: 'BOTÍN ANDINO 01',
            precio: 289,
            cantidad: 1,
            variante: '40',
            acabado: 'TABACO',
            imagen_url: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80',
          },
          {
            id: 'cart-calz-2',
            productId: 'calz-2',
            nombre: 'SNEAKER PIEDRA',
            precio: 219,
            cantidad: 1,
            variante: '40',
            acabado: 'GRIS',
            imagen_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
          },
        ];
      case 'pasteleria':
        return [
          {
            id: 'cart-past-1',
            productId: 'past-1',
            nombre: 'Selva Negra',
            precio: 85,
            cantidad: 1,
            variante: 'Mediana (10 porciones)',
            imagen_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
          },
          {
            id: 'cart-past-2',
            productId: 'past-3',
            nombre: 'Desayuno Clásico de la Casa',
            precio: 24,
            cantidad: 1,
            variante: 'Clásico',
            imagen_url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=80',
          },
        ];
      case 'polleria':
        return [
          {
            id: 'cart-poll-1',
            productId: 'bras-1',
            nombre: 'Combo Brasero',
            precio: 68,
            cantidad: 1,
            variante: '1 pollo + papas nativas + 3 salsas artesanales (Ají pollero, Mayonesa)',
            detallesPersonalizados: { guarnicion: 'Papas nativas', salsas: ['Ají pollero', 'Mayonesa'] },
            imagen_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop&q=80',
          },
        ];
      case 'gym':
        return [
          {
            id: 'cart-gym-1',
            productId: 'gym-plan-2',
            nombre: 'Mensual Libre',
            precio: 75,
            cantidad: 1,
            variante: 'Acceso ilimitado por 30 días',
            imagen_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
          },
          {
            id: 'cart-gym-2',
            productId: 'gym-supl-1',
            nombre: 'Whey Isolate',
            precio: 120,
            cantidad: 1,
            variante: 'Sabor: Chocolate • 1 kg',
            imagen_url: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&auto=format&fit=crop&q=80',
          },
        ];
      case 'belleza':
        return [
          {
            id: 'cart-glow-1',
            productId: 'glow-1',
            nombre: 'Labial Hidratante Mate',
            precio: 49,
            cantidad: 1,
            variante: 'Tono: Rosa Profundo',
            imagen_url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80',
          },
          {
            id: 'cart-glow-2',
            productId: 'glow-3',
            nombre: 'Sérum Niacinamida 10%',
            precio: 89,
            cantidad: 1,
            variante: '30 ml',
            imagen_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
          },
        ];
      case 'licoreria':
        return [
          {
            id: 'cart-lic-1',
            productId: 'prev-1',
            nombre: 'Combo Chilcano',
            precio: 48,
            cantidad: 1,
            variante: 'Pisco Quebranta + Ginger Ale + Hielo',
            imagen_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80',
          },
          {
            id: 'cart-lic-2',
            productId: 'prev-2',
            nombre: 'Bolsa de hielo (3 kg)',
            precio: 5,
            cantidad: 1,
            variante: '3 kg',
            imagen_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
          },
          {
            id: 'cart-lic-3',
            productId: 'prev-3',
            nombre: 'Vasos descartables (10 u)',
            precio: 3,
            cantidad: 1,
            variante: '10 unidades',
            imagen_url: 'https://images.unsplash.com/photo-1572455857811-045fb4255b5d?w=800&auto=format&fit=crop&q=80',
          },
        ];
      default:
        return [];
    }
  });

  // Datos del Cliente en Panel 03
  const [customerName, setCustomerName] = useState('Juan Pérez');
  const [deliveryType, setDeliveryType] = useState<'tienda' | 'delivery'>('tienda');
  const [customerAddress, setCustomerAddress] = useState('Jr. 28 de Julio 340, Huamanga');
  const [paymentMethod, setPaymentMethod] = useState(config.paymentMethods[0] || 'Yape');
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(true);
  const [isTermsAccepted, setIsTermsAccepted] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modo Demo Vendedor
  const [vendorWhatsapp, setVendorWhatsapp] = useState('');
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [vendorSuccessToast, setVendorSuccessToast] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(`qatu_demo_wa_${config.slug}`);
      if (saved) setVendorWhatsapp(saved);
    }
  }, [config.slug]);

  const handleSelectProduct = (product: StoreProduct) => {
    setSelectedProduct(product);
    setSelectedVariant(product.variantes?.[0] || '');
    if (product.acabados && product.acabados.length > 0) {
      setSelectedAcabado(product.acabados[0].name);
    }
    setMobileTab('detalle');
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.cantidad, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [cart]
  );

  const handleAddToCart = () => {
    let price = selectedProduct.precio_oferta || selectedProduct.precio;
    if (selectedProduct.portionOptions && selectedProduct.portionOptions.length > 0) {
      const matched = selectedProduct.portionOptions.find((p) => p.label === selectedVariant);
      if (matched) price = matched.price;
    }

    const customization: CartCustomizationDetails = {};
    if (config.slug === 'polleria') {
      customization.guarnicion = selectedGuarnicion;
      customization.salsas = selectedSalsas;
    } else if (config.slug === 'pasteleria') {
      if (selectedDedicatoria.trim()) customization.dedicatoria = selectedDedicatoria.trim();
      customization.velas = selectedVelas;
    } else if (config.slug === 'gym') {
      if (selectedDni.trim()) customization.dni = selectedDni.trim();
      customization.turno = selectedTurno;
    }

    const cartItemId = `${selectedProduct.id}-${selectedVariant}-${selectedAcabado}-${Date.now()}`;

    setCart((prev) => [
      ...prev,
      {
        id: cartItemId,
        productId: selectedProduct.id,
        nombre: selectedProduct.nombre,
        precio: price,
        cantidad: 1,
        variante: selectedVariant,
        acabado: selectedAcabado,
        detallesPersonalizados: customization,
        imagen_url: selectedProduct.imagen_url,
      },
    ]);

    setMobileTab('pedido');
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
    if (cart.length === 0) return;
    setIsSubmitting(true);

    const whatsappUrl = buildWhatsAppUrl(config, cart, {
      customerName: customerName.trim() || 'Cliente Demo',
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

  const isDarkMode = config.theme.isDarkMode;

  // Títulos de paneles adaptados a las láminas de Figma
  const getPanelLabels = () => {
    switch (config.slug) {
      case 'calzados':
        return {
          p1: '01 / TIENDA DESKTOP',
          p2: '02 / PRODUCT DETAIL',
          p3: '03 / CHECKOUT DRAWER',
          accentColor: '#B91C1C',
        };
      case 'pasteleria':
        return {
          p1: '01 / CATÁLOGO',
          p2: '02 / PERSONALIZA TU TORTA',
          p3: '03 / TU PEDIDO',
          accentColor: '#A46A3F',
        };
      case 'polleria':
        return {
          p1: '01 / TIENDA PRINCIPAL (DESKTOP)',
          p2: '02 / PERSONALIZACIÓN DE COMBO',
          p3: '03 / CHECKOUT — WHATSAPP',
          accentColor: '#F59E0B',
        };
      case 'gym':
        return {
          p1: '01 / MEMBRESÍAS & TIENDA (DESKTOP)',
          p2: '02 / REGISTRO RÁPIDO DE SOCIO',
          p3: '03 / CHECKOUT — WHATSAPP',
          accentColor: '#10B981',
        };
      case 'belleza':
        return {
          p1: '01 / TIENDA (ESCRITORIO)',
          p2: '02 / DETALLE & ASESORÍA DE TONO',
          p3: '03 / CARRITO DE COMPRA',
          accentColor: '#9F1239',
        };
      case 'licoreria':
        return {
          p1: '01 / TIENDA',
          p2: '02 / COMBO DESTACADO',
          p3: '03 / TU PEDIDO',
          accentColor: '#38BDF8',
        };
      default:
        return {
          p1: '01 / TIENDA',
          p2: '02 / DETALLE',
          p3: '03 / PEDIDO',
          accentColor: config.theme.primaryColor,
        };
    }
  };

  const labels = getPanelLabels();

  return (
    <div
      className={`min-h-screen text-xs sm:text-sm ${
        isDarkMode ? 'bg-[#0E0D0B] text-[#F5F7FA]' : 'bg-[#EAE8E3] text-[#121212]'
      }`}
    >
      {/* =========================================================
          BARRA DE NAVEGACIÓN ENTRE DEMOS (SUPERIOR)
          ========================================================= */}
      {isDemoMode && (
        <div className="bg-black text-white text-[11px] font-mono border-b border-stone-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2 z-50 sticky top-0">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-stone-400 font-bold uppercase tracking-wider">
              SHOWCASE V.01:
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
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider transition ${
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
              className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-300 font-mono text-[10px] uppercase tracking-wider transition flex items-center gap-1.5"
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
          ENCABEZADO DE PRESENTACIÓN FIGMA SHOWCASE (16:9 ARTBOARD)
          ========================================================= */}
      <div className="max-w-[1760px] mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-stone-300 dark:border-stone-800 text-[11px] font-mono uppercase tracking-wider text-stone-500">
          <div className="flex items-center gap-4">
            <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">
              {config.businessName}
            </span>
            <span className="hidden sm:inline text-stone-400">|</span>
            <span className="hidden sm:inline">SISTEMA DE INTERFAZ E-COMMERCE • DISEÑO UI/UX</span>
          </div>
          <div>
            <span>V.01 — UI DESIGN SYSTEM</span>
          </div>
        </div>

        {/* TABS PARA MÓVIL (< 1024px) */}
        <div className="lg:hidden flex items-center gap-1.5 py-3 border-b border-stone-300 dark:border-stone-800 font-mono text-[11px] uppercase">
          <button
            type="button"
            onClick={() => setMobileTab('tienda')}
            className={`flex-1 py-1.5 rounded text-center transition ${
              mobileTab === 'tienda'
                ? 'bg-stone-900 text-white dark:bg-white dark:text-black font-bold'
                : 'text-stone-600 dark:text-stone-400 bg-stone-200 dark:bg-stone-900'
            }`}
          >
            {labels.p1}
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('detalle')}
            className={`flex-1 py-1.5 rounded text-center transition ${
              mobileTab === 'detalle'
                ? 'bg-stone-900 text-white dark:bg-white dark:text-black font-bold'
                : 'text-stone-600 dark:text-stone-400 bg-stone-200 dark:bg-stone-900'
            }`}
          >
            {labels.p2}
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('pedido')}
            className={`flex-1 py-1.5 rounded text-center transition ${
              mobileTab === 'pedido'
                ? 'bg-stone-900 text-white dark:bg-white dark:text-black font-bold'
                : 'text-stone-600 dark:text-stone-400 bg-stone-200 dark:bg-stone-900'
            }`}
          >
            {labels.p3} ({cartCount})
          </button>
        </div>

        {/* =========================================================
            MATRIZ DE 3 PANTALLAS (01 TIENDA | 02 DETALLE | 03 CHECKOUT)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 xl:gap-5 pt-3 items-start">
          {/* =========================================================
              PANEL 01 / TIENDA (COLUMNA IZQUIERDA - 50% ANCHO EN PC)
              ========================================================= */}
          <div
            className={`lg:col-span-6 flex flex-col space-y-2 ${
              mobileTab !== 'tienda' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500">
              <span className="w-1 h-3 rounded" style={{ backgroundColor: labels.accentColor }} />
              <span>{labels.p1}</span>
            </div>

            <div
              className={`rounded border overflow-hidden shadow-sm flex flex-col ${
                isDarkMode ? 'bg-[#0E0D0B] border-stone-800' : 'bg-[#FAF8F5] border-stone-300'
              }`}
            >
              {/* Header Interno Panel 01 */}
              <div className="px-4 py-2.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
                <span className="font-black text-sm uppercase tracking-tight font-bebas">
                  {config.businessName}
                </span>

                <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-stone-500">
                  {config.slug === 'calzados' && (
                    <>
                      <span className="font-bold text-stone-900 dark:text-white">SNEAKERS</span>
                      <span>CUERO</span>
                      <span>HUAMANGA / ORIGEN</span>
                    </>
                  )}
                  {config.slug === 'pasteleria' && (
                    <>
                      <span className="font-bold text-stone-900 dark:text-white">Inicio</span>
                      <span>Tortas</span>
                      <span>Porciones</span>
                      <span>Desayunos</span>
                      <span>Café</span>
                      <span>Reservas</span>
                    </>
                  )}
                  {config.slug === 'polleria' && (
                    <>
                      <span className="font-bold text-stone-900 dark:text-white">Pollos</span>
                      <span>Parrillas</span>
                      <span>Combos</span>
                      <span>Bebidas</span>
                    </>
                  )}
                  {config.slug === 'gym' && (
                    <>
                      <span className="font-bold text-stone-900 dark:text-white">Inicio</span>
                      <span>Membresías</span>
                      <span>Suplementos</span>
                      <span>Horarios</span>
                    </>
                  )}
                  {config.slug === 'belleza' && (
                    <>
                      <span className="font-bold text-stone-900 dark:text-white">Tienda</span>
                      <span>Rutinas faciales</span>
                      <span>Maquillaje</span>
                      <span>Cuidado facial</span>
                      <span>Promociones</span>
                    </>
                  )}
                  {config.slug === 'licoreria' && (
                    <>
                      <span className="font-bold text-stone-900 dark:text-white">Delivery 24/7</span>
                      <span>•</span>
                      <span>Huamanga</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2.5">
                  <Search className="w-3.5 h-3.5 text-stone-400 cursor-pointer" />
                  <User className="w-3.5 h-3.5 text-stone-400 cursor-pointer" />
                  <button
                    type="button"
                    onClick={() => setMobileTab('pedido')}
                    className="relative p-1 text-stone-700 dark:text-stone-300"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-white font-mono text-[9px] font-bold flex items-center justify-center"
                      style={{ backgroundColor: labels.accentColor }}
                    >
                      {cartCount}
                    </span>
                  </button>
                </div>
              </div>

              {/* Status / Live Radar Banner (Pollería, Licorería, Gym, Pastelería) */}
              {config.slug === 'polleria' && (
                <div className="px-4 py-1.5 bg-stone-950 border-b border-stone-800 text-[9px] font-mono flex items-center gap-2 text-stone-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-stone-200">HORNO A LA BRASA ACTIVO</span>
                  <span>•</span>
                  <span>TIEMPO ESTIMADO 25 MIN</span>
                </div>
              )}
              {config.slug === 'licoreria' && (
                <div className="px-4 py-1.5 bg-[#0A0E18] border-b border-stone-800 text-[9px] font-mono flex items-center justify-between text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    <span className="font-bold text-sky-400">BEBIDAS FRÍAS • DISPONIBILIDAD SEGÚN ZONA</span>
                  </div>
                  <span className="text-[8px] text-stone-500 hidden sm:inline">Solo mayores de 18 años • Verificación al entregar</span>
                </div>
              )}
              {config.slug === 'gym' && (
                <div className="px-4 py-1.5 bg-stone-950 border-b border-stone-800 text-[9px] font-mono flex items-center justify-between text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="font-bold text-emerald-400">AFORO EN VIVO: 32 / 60</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-400 text-[9px]">
                    <Clock className="w-3 h-3" />
                    <span>HOY 06:00 - 22:00</span>
                  </div>
                </div>
              )}
              {config.slug === 'pasteleria' && (
                <div className="px-4 py-1.5 bg-[#F5EFE6] border-b border-stone-200 text-[9px] font-mono flex items-center gap-2 text-amber-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span className="font-bold">Horneado hoy - Pedidos y reservas anticipadas</span>
                </div>
              )}

              {/* Hero Banner Panel 01 */}
              <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-7 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <span
                        className="w-1 self-stretch rounded shrink-0"
                        style={{ backgroundColor: labels.accentColor }}
                      />
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none font-bebas">
                          {config.hero.title}
                        </h2>
                        {config.hero.highlightText && (
                          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none font-bebas text-stone-600 dark:text-stone-300">
                            {config.hero.highlightText}
                          </h2>
                        )}
                        <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mt-1">
                          {config.subTagline || config.tagline}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        className="text-[11px] font-mono font-bold uppercase tracking-wider underline underline-offset-4 hover:opacity-80 transition flex items-center gap-1"
                        style={{ color: labels.accentColor }}
                      >
                        <span>{config.hero.ctaText}</span>
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-5">
                    <div className="aspect-[4/3] rounded overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
                      <img
                        src={config.hero.bannerUrl}
                        alt={config.businessName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges (Belleza) */}
              {config.slug === 'belleza' && (
                <div className="px-4 py-2 bg-[#FFF5F5] border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-[9px] font-mono text-stone-600">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-rose-700" /> Fórmulas efectivas
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-rose-700" /> Dermatológicamente testadas
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-700" /> Envíos a Huamanga y todo el Perú
                  </span>
                </div>
              )}

              {/* Categorías Horizontales (Pastelería, Belleza, Licorería) */}
              {['pasteleria', 'belleza', 'licoreria'].includes(config.slug) && (
                <div className="px-4 py-2 border-b border-stone-200 dark:border-stone-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none font-mono text-[10px]">
                  {config.categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategoryFilter(c.id)}
                      className={`px-2.5 py-1 rounded text-center whitespace-nowrap transition ${
                        categoryFilter === c.id
                          ? 'bg-stone-900 text-white dark:bg-white dark:text-black font-bold'
                          : 'border border-stone-300 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              )}

              {/* VISTA PRODUCTOS / SECCIONES SEGÚN RUBRO */}
              <div className="p-4 sm:p-5">
                {/* 1. CALZADOS: FILTRO A LA IZQUIERDA + 2 PRODUCTOS DESTACADOS */}
                {config.slug === 'calzados' && (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                    {/* Filtro Izquierdo */}
                    <div className="sm:col-span-4 space-y-4 font-mono text-[10px] uppercase">
                      <div>
                        <span className="font-bold tracking-wider text-stone-400 block mb-1.5">
                          FILTRAR
                        </span>
                        <span className="text-stone-400 block mb-1">CATEGORÍA</span>
                        <div className="space-y-1">
                          <button
                            type="button"
                            onClick={() => setCategoryFilter('cat-all')}
                            className="w-full text-left py-0.5 px-1 rounded flex items-center gap-1.5 text-stone-900 dark:text-white font-bold"
                          >
                            <span className="w-2 h-2 rounded bg-red-600" />
                            <span>SNEAKERS (12)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCategoryFilter('cat-cuero')}
                            className="w-full text-left py-0.5 px-1 rounded flex items-center gap-1.5 text-stone-500"
                          >
                            <span className="w-2 h-2 border border-stone-400 rounded-sm" />
                            <span>CUERO (8)</span>
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                        <span className="text-stone-400 block mb-1">TALLA</span>
                        <div className="grid grid-cols-2 gap-1">
                          {['38', '39', '40', '41'].map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setSizeFilter(sizeFilter === t ? '' : t)}
                              className={`py-1 border rounded text-center ${
                                sizeFilter === t
                                  ? 'bg-stone-900 text-white dark:bg-white dark:text-black font-bold'
                                  : 'border-stone-300 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 2 Productos Lado a Lado (Sneaker Piedra + Sneaker Caliza) */}
                    <div className="sm:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {initialProducts.slice(1, 3).map((p) => {
                        const isSelected = selectedProduct.id === p.id;
                        return (
                          <div
                            key={p.id}
                            onClick={() => handleSelectProduct(p)}
                            className={`rounded border overflow-hidden p-2.5 transition cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'border-red-600 ring-1 ring-red-600 bg-white dark:bg-stone-900'
                                : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 hover:border-stone-400'
                            }`}
                          >
                            <div>
                              <div className="relative aspect-[4/3] rounded overflow-hidden mb-2 bg-stone-100 dark:bg-stone-950">
                                <img
                                  src={p.imagen_url}
                                  alt={p.nombre}
                                  className="w-full h-full object-cover"
                                />
                                {p.badge && (
                                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider bg-red-600 text-white">
                                    {p.badge}
                                  </span>
                                )}
                              </div>

                              <h4 className="font-black text-xs uppercase font-bebas leading-tight truncate">
                                {p.nombre}
                              </h4>
                              <span className="text-[9px] font-mono text-stone-400 block">
                                {p.codigo || 'LFH-SN01'}
                              </span>

                              <div className="mt-1 flex items-baseline justify-between">
                                <span className="font-black font-mono text-xs">
                                  {config.currency} {p.precio.toFixed(0)}
                                </span>
                                <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">
                                  ● DISPONIBLE
                                </span>
                              </div>

                              {p.variantes && p.variantes.length > 0 && (
                                <div className="mt-2 flex gap-1">
                                  {p.variantes.slice(0, 4).map((v) => (
                                    <span
                                      key={v}
                                      className={`w-5 h-5 rounded-full border text-[8px] font-mono flex items-center justify-center ${
                                        v === '40'
                                          ? 'border-red-600 text-red-600 font-bold ring-1 ring-red-600'
                                          : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                                      }`}
                                    >
                                      {v}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. POLLERÍA: 3 PRODUCTOS EN LÍNEA HORIZONTAL (1/4, 1/2, 1 POLLO) */}
                {config.slug === 'polleria' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        name: '1/4 POLLO',
                        desc: 'Pechuga o pierna con papas.',
                        price: 'S/ 22.00',
                        activePortion: '1/4',
                        img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80',
                      },
                      {
                        name: '1/2 POLLO',
                        desc: 'Medio pollo a la brasa con papas.',
                        price: 'S/ 39.00',
                        activePortion: '1/2',
                        img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop&q=80',
                      },
                      {
                        name: '1 POLLO',
                        desc: 'Pollo entero a la brasa con papas.',
                        price: 'S/ 68.00',
                        activePortion: '1 POLLO',
                        img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop&q=80',
                      },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="rounded border border-stone-800 bg-stone-900/60 p-2.5 flex flex-col justify-between space-y-2"
                      >
                        <div className="aspect-[4/3] rounded overflow-hidden bg-stone-950">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-black text-xs font-bebas uppercase tracking-wide">
                            {item.name}
                          </h4>
                          <p className="text-[9px] text-stone-400 line-clamp-1">{item.desc}</p>
                          <span className="font-mono font-bold text-xs text-stone-100 block mt-1">
                            {item.price}
                          </span>
                        </div>
                        <div className="pt-1 border-t border-stone-800 flex items-center justify-between gap-1 text-[8px] font-mono">
                          <div className="flex gap-0.5">
                            {['1/4', '1/2', '1 POLLO'].map((por) => (
                              <span
                                key={por}
                                className={`px-1 py-0.5 rounded ${
                                  por === item.activePortion
                                    ? 'bg-amber-500 text-black font-bold'
                                    : 'text-stone-400'
                                }`}
                              >
                                {por}
                              </span>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSelectProduct(initialProducts[0])}
                            className="px-1.5 py-0.5 rounded border border-amber-500 text-amber-400 font-bold hover:bg-amber-500 hover:text-black transition"
                          >
                            AGREGAR +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. GYM: 3 MEMBRESÍAS + SUPLEMENTOS */}
                {config.slug === 'gym' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        {
                          title: 'PASE DIARIO',
                          price: 'S/ 10',
                          features: ['Acceso por 1 día', 'Uso de salas y máquinas', 'Duchas y vestidores'],
                          badge: null,
                          isHighlight: false,
                        },
                        {
                          title: 'MENSUAL LIBRE',
                          price: 'S/ 75',
                          features: ['Acceso ilimitado (30 días)', 'Área de pesas y cardio', 'Asesoría básica en sala', 'Vestidores y duchas'],
                          badge: 'MÁS VENDIDO',
                          isHighlight: true,
                        },
                        {
                          title: 'TRIMESTRE PRO',
                          price: 'S/ 195',
                          features: ['Acceso ilimitado (90 días)', 'Asesoría personalizada', 'Evaluación de progreso', 'Prioridad en horarios'],
                          badge: null,
                          isHighlight: false,
                        },
                      ].map((plan) => (
                        <div
                          key={plan.title}
                          className={`rounded border p-3 flex flex-col justify-between relative ${
                            plan.isHighlight
                              ? 'border-emerald-500 bg-stone-900 ring-1 ring-emerald-500'
                              : 'border-stone-800 bg-stone-900/50'
                          }`}
                        >
                          {plan.badge && (
                            <span className="absolute -top-2 left-3 px-1.5 py-0.5 rounded bg-emerald-500 text-black text-[8px] font-mono font-bold uppercase">
                              {plan.badge}
                            </span>
                          )}
                          <div>
                            <span className="text-[10px] font-mono text-stone-400 block uppercase">
                              {plan.title}
                            </span>
                            <span
                              className={`text-xl font-black font-mono block mt-0.5 ${
                                plan.isHighlight ? 'text-emerald-400' : 'text-stone-100'
                              }`}
                            >
                              {plan.price}
                            </span>
                            <ul className="mt-2 space-y-1 text-[9px] text-stone-400 font-mono">
                              {plan.features.map((f) => (
                                <li key={f} className="flex items-center gap-1">
                                  <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button
                            type="button"
                            onClick={() => setMobileTab('detalle')}
                            className={`w-full mt-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase transition ${
                              plan.isHighlight
                                ? 'bg-emerald-500 text-black'
                                : 'border border-stone-700 text-stone-300 hover:border-emerald-500'
                            }`}
                          >
                            Elegir plan
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Fila Suplementos */}
                    <div className="pt-2 border-t border-stone-800">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block mb-2">
                        SUPLEMENTOS ESENCIALES
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-2.5 rounded border border-stone-800 bg-stone-900/40 flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&auto=format&fit=crop&q=80"
                            alt="Whey Isolate"
                            className="w-14 h-14 object-cover rounded bg-stone-950 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-xs uppercase block truncate">
                              WHEY ISOLATE
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                              S/ 120
                            </span>
                            <span className="text-[8px] text-stone-400 block truncate">
                              Proteína 24g • Carbohidratos 2g • Grasas 1g
                            </span>
                          </div>
                        </div>

                        <div className="p-2.5 rounded border border-stone-800 bg-stone-900/40 flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=400&auto=format&fit=crop&q=80"
                            alt="Creatina"
                            className="w-14 h-14 object-cover rounded bg-stone-950 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-xs uppercase block truncate">
                              CREATINA MONOHIDRATADA
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                              S/ 80
                            </span>
                            <span className="text-[8px] text-stone-400 block truncate">
                              Creatina pura 5g • Presentación 300g
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. PASTELERÍA: 3 PRODUCTOS (Selva Negra + Torta Zanahoria + Desayuno) */}
                {config.slug === 'pasteleria' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {initialProducts.slice(0, 3).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProduct(p)}
                        className="rounded border border-stone-200 bg-white p-2.5 flex flex-col justify-between space-y-2 cursor-pointer hover:border-amber-700 transition"
                      >
                        <div className="aspect-[4/3] rounded overflow-hidden bg-stone-100">
                          <img src={p.imagen_url} alt={p.nombre} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          {p.badge && (
                            <span className="text-[8px] font-mono uppercase tracking-wider text-amber-800 font-bold block mb-0.5">
                              {p.badge}
                            </span>
                          )}
                          <h4 className="font-bold text-xs font-serif leading-tight">
                            {p.nombre}
                          </h4>
                          <span className="font-mono font-bold text-xs text-stone-900 block mt-1">
                            {config.currency} {p.precio.toFixed(0)}
                          </span>
                        </div>
                        {p.variantes && p.variantes.length > 0 && (
                          <div className="flex gap-1 pt-1 border-t border-stone-100 text-[8px] font-mono">
                            {p.variantes.slice(0, 3).map((v, i) => (
                              <span
                                key={v}
                                className={`px-1.5 py-0.5 rounded border ${
                                  i === 1 ? 'border-amber-800 bg-amber-950 text-white font-bold' : 'border-stone-200 text-stone-500'
                                }`}
                              >
                                {v}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. BELLEZA: 4 PRODUCTOS EN LÍNEA */}
                {config.slug === 'belleza' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {initialProducts.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProduct(p)}
                        className="rounded border border-stone-200 bg-white p-2 flex flex-col justify-between space-y-1.5 cursor-pointer hover:border-rose-800 transition"
                      >
                        <div className="aspect-square rounded overflow-hidden bg-rose-50/50">
                          <img src={p.imagen_url} alt={p.nombre} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[11px] leading-tight line-clamp-2">
                            {p.nombre}
                          </h4>
                          <span className="text-[9px] text-amber-600 block mt-0.5">
                            ★ 4.8 (320)
                          </span>
                          <span className="font-mono font-bold text-xs text-stone-900 block mt-0.5">
                            S/ {p.precio.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 6. LICORERÍA: COMPLEMENTA TU PEDIDO + 4 PRODUCTOS */}
                {config.slug === 'licoreria' && (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                    {/* Complementa tu pedido */}
                    <div className="sm:col-span-4 p-2.5 rounded border border-stone-800 bg-stone-950 space-y-2 font-mono text-[9px]">
                      <span className="font-bold uppercase tracking-wider text-sky-400 block">
                        Complementa tu pedido
                      </span>
                      <div className="space-y-1.5">
                        {[
                          { name: 'Bolsa de hielo', price: 'S/ 5.00', checked: true },
                          { name: 'Vasos descartables (10 u)', price: 'S/ 3.00', checked: false },
                          { name: 'Piqueo mixto (250 g)', price: 'S/ 18.00', checked: false },
                        ].map((item) => (
                          <div key={item.name} className="flex items-center justify-between text-stone-300">
                            <span className="flex items-center gap-1.5">
                              {item.checked ? (
                                <CheckSquare className="w-3 h-3 text-sky-400" />
                              ) : (
                                <Square className="w-3 h-3 text-stone-600" />
                              )}
                              <span>{item.name}</span>
                            </span>
                            <span className="text-stone-400">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4 Cards Licor */}
                    <div className="sm:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {initialProducts.slice(1, 5).map((p) => (
                        <div
                          key={p.id}
                          className="rounded border border-stone-800 bg-stone-900/60 p-2 flex flex-col justify-between space-y-1.5"
                        >
                          <div className="aspect-square rounded overflow-hidden bg-stone-950">
                            <img src={p.imagen_url} alt={p.nombre} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="font-bold text-[10px] block truncate text-stone-200">
                              {p.nombre}
                            </span>
                            <span className="font-mono font-bold text-[10px] text-sky-400 block">
                              S/ {p.precio.toFixed(2)}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSelectProduct(p)}
                            className="w-full py-0.5 rounded border border-stone-700 text-stone-300 text-[8px] font-mono hover:border-sky-400 hover:text-sky-400"
                          >
                            + Agregar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =========================================================
              PANEL 02 / PRODUCT DETAIL (COLUMNA CENTRO - 25% ANCHO EN PC)
              ========================================================= */}
          <div
            className={`lg:col-span-3 flex flex-col space-y-2 ${
              mobileTab !== 'detalle' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500">
              <span className="w-1 h-3 rounded" style={{ backgroundColor: labels.accentColor }} />
              <span>{labels.p2}</span>
            </div>

            <div
              className={`rounded border overflow-hidden shadow-sm p-4 space-y-3.5 ${
                isDarkMode ? 'bg-[#0E0D0B] border-stone-800' : 'bg-white border-stone-300'
              }`}
            >
              {/* Header con botón X */}
              <div className="flex items-center justify-between pb-1 border-b border-stone-200 dark:border-stone-800">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  {labels.p2.replace(/^\d+\s*\/\s*/, '')}
                </span>
                <X className="w-4 h-4 text-stone-400 cursor-pointer" />
              </div>

              {/* Contenido Especializado de Panel 02 según Rubro */}
              {/* 1. CALZADOS: BOTÍN ANDINO 01 CON ACABADOS Y TALLAS */}
              {config.slug === 'calzados' && (
                <>
                  <div className="relative aspect-[4/3] rounded overflow-hidden border border-stone-200 dark:border-stone-800">
                    <img
                      src={selectedProduct.imagen_url || 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80'}
                      alt={selectedProduct.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex justify-center items-center gap-1.5 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <h3 className="font-black text-sm uppercase font-bebas leading-tight">
                        {selectedProduct.nombre || 'BOTÍN ANDINO 01'}
                      </h3>
                      <span className="text-[10px] font-mono text-stone-400 uppercase block mt-0.5">
                        CUERO NATURAL | {selectedProduct.codigo || 'LFH-BT01'}
                      </span>
                    </div>
                    <span className="font-black font-mono text-sm">
                      {config.currency} {selectedProduct.precio.toFixed(0)}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-stone-200 dark:border-stone-800 font-mono text-[10px] uppercase">
                    <span className="text-stone-400 block font-bold">ACABADO</span>
                    <div className="flex items-center gap-4">
                      {[
                        { name: 'Negro', hex: '#121212' },
                        { name: 'Tabaco', hex: '#78350F' },
                        { name: 'Miel', hex: '#D97706' },
                      ].map((a) => (
                        <button
                          key={a.name}
                          type="button"
                          onClick={() => setSelectedAcabado(a.name)}
                          className="flex flex-col items-center gap-1"
                        >
                          <span
                            className={`w-5 h-5 rounded-full border-2 transition ${
                              selectedAcabado === a.name ? 'border-red-600 scale-110' : 'border-stone-300 dark:border-stone-700'
                            }`}
                            style={{ backgroundColor: a.hex }}
                          />
                          <span className="text-[9px] text-stone-500">{a.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-stone-200 dark:border-stone-800 font-mono text-[10px] uppercase">
                    <div className="flex items-center justify-between text-stone-400">
                      <span className="font-bold">TALLA</span>
                      <span className="hover:underline cursor-pointer">GUÍA DE TALLAS ↗</span>
                    </div>
                    <div className="flex gap-1.5">
                      {['38', '39', '40', '41'].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`w-8 h-8 rounded-full border text-[11px] font-mono font-bold flex items-center justify-center transition ${
                            selectedVariant === v
                              ? 'border-red-600 text-red-600 ring-2 ring-red-600/30'
                              : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* 2. POLLERÍA: PERSONALIZAR COMBO (GUARNICIÓN, SALSAS, CANTIDAD) */}
              {config.slug === 'polleria' && (
                <>
                  <div className="aspect-[16/9] rounded overflow-hidden bg-stone-950">
                    <img
                      src="https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&auto=format&fit=crop&q=80"
                      alt="Combo Brasero"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase font-bebas leading-tight">
                      COMBO BRASERO
                    </h3>
                    <p className="text-[9px] text-stone-400">
                      1 pollo a la brasa + papas nativas + 3 salsas artesanales
                    </p>
                    <span className="font-black font-mono text-sm text-amber-400 block mt-1">
                      S/ 68.00
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-stone-800 font-mono text-[10px] uppercase">
                    <span className="text-stone-400 block font-bold">ELIGE TU GUARNICIÓN</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {['Papas tradicionales', 'Papas nativas'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setSelectedGuarnicion(g)}
                          className={`p-2 rounded border text-left flex items-center gap-1.5 ${
                            selectedGuarnicion === g
                              ? 'border-amber-500 bg-amber-950/20 text-amber-300 font-bold'
                              : 'border-stone-800 text-stone-400'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full border ${selectedGuarnicion === g ? 'bg-amber-400 border-amber-400' : 'border-stone-600'}`} />
                          <span className="text-[9px]">{g}</span>
                        </button>
                      ))}
                    </div>

                    <span className="text-stone-400 block font-bold pt-1">ELIGE TUS SALSAS</span>
                    <div className="grid grid-cols-2 gap-1">
                      {['Ají pollero', 'Mayonesa', 'Chimichurri', 'Ocopa'].map((s) => {
                        const isChecked = selectedSalsas.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => {
                              setSelectedSalsas((prev) =>
                                prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
                              );
                            }}
                            className={`p-1.5 border rounded flex items-center justify-between ${
                              isChecked ? 'border-amber-500 text-amber-300 font-bold bg-amber-950/20' : 'border-stone-800 text-stone-500'
                            }`}
                          >
                            <span className="text-[9px]">{s}</span>
                            {isChecked ? <CheckSquare className="w-3 h-3 text-amber-400" /> : <Square className="w-3 h-3 text-stone-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* 3. PASTELERÍA: PERSONALIZA TU TORTA (DEDICATORIA, FECHA, VELAS, TAMAÑO) */}
              {config.slug === 'pasteleria' && (
                <>
                  <div className="aspect-[16/9] rounded overflow-hidden bg-stone-100">
                    <img
                      src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80"
                      alt="Selva Negra"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm font-serif">Selva Negra</h3>
                    <p className="text-[9px] text-stone-500">Torta clásica de celebración.</p>
                    <span className="font-mono font-bold text-xs text-stone-900 block mt-0.5">
                      Desde S/ 85
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-stone-200 font-mono text-[9px]">
                    <div>
                      <span className="text-stone-500 uppercase block font-bold mb-1">
                        Dedicatoria en chocolate
                      </span>
                      <input
                        type="text"
                        placeholder="Escribe tu dedicatoria en chocolate... 0/40"
                        value={selectedDedicatoria}
                        onChange={(e) => setSelectedDedicatoria(e.target.value)}
                        className="w-full px-2 py-1 rounded border border-stone-300 text-[10px] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-stone-500 uppercase block font-bold mb-1">Fecha</span>
                        <select className="w-full px-1.5 py-1 rounded border border-stone-300 text-[9px]">
                          <option>Selecciona fecha</option>
                          <option>Hoy</option>
                          <option>Mañana</option>
                        </select>
                      </div>
                      <div>
                        <span className="text-stone-500 uppercase block font-bold mb-1">Hora</span>
                        <select className="w-full px-1.5 py-1 rounded border border-stone-300 text-[9px]">
                          <option>Selecciona hora</option>
                          <option>10:00 AM</option>
                          <option>04:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <span className="text-stone-500 uppercase block font-bold mb-1">
                        Velas artesanales
                      </span>
                      <div className="grid grid-cols-3 gap-1">
                        {['Velas clásicas', 'Velas artesanales', 'Sin velas'].map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setSelectedVelas(v)}
                            className={`py-1 rounded border text-center text-[8px] ${
                              selectedVelas === v
                                ? 'border-amber-800 bg-amber-950 text-white font-bold'
                                : 'border-stone-200 text-stone-600'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-stone-500 uppercase block font-bold mb-1">
                        Tamaño / Porciones
                      </span>
                      <div className="grid grid-cols-3 gap-1">
                        {['Personal', 'Mediana 10p', 'Familiar 20p'].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setSelectedPorcionTorta(p)}
                            className={`py-1 rounded border text-center text-[8px] ${
                              selectedPorcionTorta === p
                                ? 'border-amber-800 bg-amber-950 text-white font-bold'
                                : 'border-stone-200 text-stone-600'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 4. GYM: REGISTRO RÁPIDO DE SOCIO (FORMULARIO DNI + TURNO) */}
              {config.slug === 'gym' && (
                <>
                  <div>
                    <h3 className="font-bold text-sm uppercase font-mono text-stone-100">
                      REGISTRO DE SOCIO
                    </h3>
                    <p className="text-[9px] text-stone-400">
                      Crea tu cuenta y formaliza tu matrícula.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-stone-800 font-mono text-[9px]">
                    <div>
                      <span className="text-stone-400 uppercase block font-bold mb-1">DNI</span>
                      <input
                        type="text"
                        placeholder="Ej: 73456789"
                        value={selectedDni}
                        onChange={(e) => setSelectedDni(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded border border-stone-700 bg-stone-900 text-stone-100 text-[10px] focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="text-stone-400 uppercase block font-bold mb-1">
                        Turno preferido
                      </span>
                      <div className="grid grid-cols-3 gap-1">
                        {['Mañana 06:00 - 12:00', 'Tarde 12:00 - 17:00', 'Noche 17:00 - 22:00'].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSelectedTurno(t)}
                            className={`py-1 px-1 rounded border text-center text-[8px] ${
                              selectedTurno === t
                                ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold'
                                : 'border-stone-800 text-stone-500'
                            }`}
                          >
                            {t.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-stone-400 uppercase block font-bold mb-1">
                        Nombre completo
                      </span>
                      <input
                        type="text"
                        placeholder="Ej: Juan Pérez Huamán"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded border border-stone-700 bg-stone-900 text-stone-100 text-[10px] focus:outline-none"
                      />
                    </div>

                    <label className="flex items-start gap-1.5 pt-1 text-[8px] text-stone-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isTermsAccepted}
                        onChange={(e) => setIsTermsAccepted(e.target.checked)}
                        className="mt-0.5 accent-emerald-500"
                      />
                      <span>Acepto los términos y condiciones y la política de privacidad.</span>
                    </label>

                    <div className="p-2 rounded bg-stone-900/80 border border-stone-800 text-[8px] text-stone-400">
                      ℹ Confirma tu matrícula en recepción con tu DNI el día de tu primer entrenamiento.
                    </div>
                  </div>
                </>
              )}

              {/* 5. BELLEZA: DETALLE & ASESORÍA DE TONO (LABIAL, SWATCHES, SUBTONO) */}
              {config.slug === 'belleza' && (
                <>
                  <div className="flex gap-2.5 items-start">
                    <img
                      src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&auto=format&fit=crop&q=80"
                      alt="Labial"
                      className="w-20 h-20 object-cover rounded bg-rose-50"
                    />
                    <div>
                      <h3 className="font-bold text-xs">Labial Hidratante Mate</h3>
                      <span className="text-[9px] text-amber-600 block">★ 4.8 (320 reseñas)</span>
                      <span className="font-mono font-bold text-xs text-stone-900 block mt-0.5">
                        S/ 49.00
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-stone-200 font-mono text-[9px]">
                    <span className="text-stone-500 uppercase block font-bold">Elige tu tono</span>
                    <div className="flex items-center gap-2">
                      {['#E0A899', '#C56276', '#B91C1C', '#701A75', '#9F1239', '#D3A49A'].map((hex, i) => (
                        <button
                          key={hex}
                          type="button"
                          className={`w-5 h-5 rounded-full border-2 ${i === 1 ? 'border-rose-900 scale-110' : 'border-stone-300'}`}
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>

                    <span className="text-stone-500 uppercase block font-bold pt-1">Subtono</span>
                    <div className="grid grid-cols-3 gap-1">
                      {(['Cálido', 'Neutro', 'Frío'] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSubtono(s)}
                          className={`py-1 rounded border text-center text-[8px] ${
                            selectedSubtono === s
                              ? 'border-rose-900 bg-rose-950 text-white font-bold'
                              : 'border-stone-200 text-stone-600'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    <div className="p-2 rounded bg-rose-50 border border-rose-200 text-[8px] text-rose-900">
                      Recomendado para ti: Ideal para labios secos o sensibles. Aporta color intenso sin resecar.
                    </div>
                  </div>
                </>
              )}

              {/* 6. LICORERÍA: COMBO DESTACADO */}
              {config.slug === 'licoreria' && (
                <>
                  <div className="aspect-[4/3] rounded overflow-hidden bg-stone-950">
                    <img
                      src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80"
                      alt="Combo Chilcano"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="px-1.5 py-0.5 rounded bg-amber-500 text-black font-mono text-[8px] font-bold uppercase">
                      COMBO DESTACADO
                    </span>
                    <h3 className="font-bold text-sm font-mono uppercase text-stone-100 mt-1">
                      COMBO CHILCANO
                    </h3>
                    <p className="text-[9px] text-stone-400">
                      Pisco Quebranta 750ml + Ginger Ale + Hielo
                    </p>
                    <span className="font-mono font-bold text-sm text-sky-400 block mt-1">
                      S/ 48.00
                    </span>
                  </div>
                </>
              )}

              {/* Barra de Stock Disponible */}
              <div className="p-2 rounded bg-emerald-950/20 border border-emerald-900/40 text-emerald-500 text-[10px] font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="font-bold">STOCK DISPONIBLE</span>
              </div>

              {/* Botón CTA Panel 02 */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider text-white shadow transition active:scale-95 flex items-center justify-center gap-2"
                style={{ backgroundColor: labels.accentColor }}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>
                  {config.slug === 'gym'
                    ? 'CONTINUAR REGISTRO'
                    : config.slug === 'polleria'
                    ? 'CONFIRMAR COMBO'
                    : config.slug === 'pasteleria'
                    ? 'GUARDAR PERSONALIZACIÓN'
                    : config.slug === 'licoreria'
                    ? 'AGREGAR COMBO +'
                    : 'AGREGAR AL CARRITO'}
                </span>
              </button>
            </div>
          </div>

          {/* =========================================================
              PANEL 03 / CHECKOUT DRAWER (COLUMNA DERECHA - 25% ANCHO EN PC)
              ========================================================= */}
          <div
            className={`lg:col-span-3 flex flex-col space-y-2 ${
              mobileTab !== 'pedido' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500">
              <span className="w-1 h-3 rounded" style={{ backgroundColor: labels.accentColor }} />
              <span>{labels.p3}</span>
            </div>

            <div
              className={`rounded border shadow-xl p-4 space-y-3 font-mono text-[11px] ${
                config.slug === 'pasteleria'
                  ? 'bg-[#291508] border-amber-950 text-white'
                  : config.slug === 'belleza'
                  ? 'bg-white border-stone-200 text-stone-900'
                  : 'bg-[#121212] border-stone-800 text-white'
              }`}
            >
              {/* Encabezado Pedido */}
              <div className="pb-2 border-b border-stone-800/60 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tight">
                    {config.slug === 'gym' ? 'TU INSCRIPCIÓN' : 'TU PEDIDO'}
                  </h4>
                  <span className="text-[10px] text-stone-400">
                    {cartCount.toString().padStart(2, '0')} ARTÍCULOS
                  </span>
                </div>
                <X className="w-4 h-4 text-stone-400 cursor-pointer" />
              </div>

              {/* Lista de Items */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-stone-500 text-center py-6 text-[10px] uppercase">
                    El carrito está vacío
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 rounded border border-stone-800/80 flex gap-2 items-center justify-between bg-stone-900/60"
                    >
                      <img
                        src={item.imagen_url}
                        alt={item.nombre}
                        className="w-10 h-10 object-cover rounded shrink-0 bg-stone-950"
                      />
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <span className="font-bold block truncate uppercase text-[10px]">
                          {item.nombre}
                        </span>
                        {item.variante && (
                          <span className="text-[9px] text-stone-400 block truncate">
                            {item.acabado ? `${item.acabado} | ` : ''}Talla {item.variante}
                          </span>
                        )}
                        <span className="font-bold text-stone-200 block text-[10px]">
                          {config.currency} {(item.precio * item.cantidad).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-4 h-4 rounded border border-stone-700 flex items-center justify-center text-[9px]"
                        >
                          -
                        </button>
                        <span className="w-3 text-center text-[10px] font-bold">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-4 h-4 rounded border border-stone-700 flex items-center justify-center text-[9px]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Subtotal */}
              <div className="pt-2 border-t border-stone-800/60 flex items-baseline justify-between">
                <span className="text-stone-400 uppercase text-[10px]">SUBTOTAL</span>
                <span className="font-black text-sm">
                  {config.currency} {cartTotal.toFixed(0)}
                </span>
              </div>

              {/* Método de Entrega */}
              <div className="space-y-1.5 pt-1 border-t border-stone-800/60">
                <span className="text-[10px] text-stone-400 uppercase block font-bold">
                  MÉTODO DE ENTREGA
                </span>
                <button
                  type="button"
                  onClick={() => setDeliveryType('tienda')}
                  className={`w-full p-2 rounded border text-left flex items-start gap-2 transition ${
                    deliveryType === 'tienda'
                      ? 'border-red-600 bg-red-950/20 text-white font-bold ring-1 ring-red-600'
                      : 'border-stone-800 text-stone-400'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-current mt-0.5 flex items-center justify-center">
                    {deliveryType === 'tienda' && <span className="w-1 h-1 rounded-full bg-current" />}
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] truncate">RECOJO EN TIENDA</span>
                    <span className="text-[8px] text-stone-500 font-normal truncate block">
                      {config.pickupAddress || config.location}
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`w-full p-2 rounded border text-left flex items-start gap-2 transition ${
                    deliveryType === 'delivery'
                      ? 'border-red-600 bg-red-950/20 text-white font-bold ring-1 ring-red-600'
                      : 'border-stone-800 text-stone-400'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-current mt-0.5 flex items-center justify-center">
                    {deliveryType === 'delivery' && <span className="w-1 h-1 rounded-full bg-current" />}
                  </span>
                  <div>
                    <span className="block text-[10px]">DELIVERY</span>
                    <span className="text-[8px] text-stone-500 font-normal block">
                      Envío en Huamanga
                    </span>
                  </div>
                </button>
              </div>

              {/* Cliente */}
              <div>
                <span className="text-[10px] text-stone-400 uppercase block mb-1">
                  CLIENTE:
                </span>
                <input
                  type="text"
                  placeholder="Tu nombre completo..."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-2 py-1 rounded border border-stone-800 bg-stone-900 text-white text-[10px] focus:outline-none"
                />
              </div>

              {/* Método de Pago */}
              <div className="space-y-1">
                <span className="text-[10px] text-stone-400 uppercase block font-bold">
                  MÉTODO DE PAGO
                </span>
                <div className="flex gap-1">
                  {config.paymentMethods.map((m) => {
                    const isSelected = paymentMethod === m;
                    const isYape = m.toLowerCase().includes('yape');
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPaymentMethod(m)}
                        className={`flex-1 py-1 rounded border text-[9px] font-mono uppercase text-center transition ${
                          isSelected
                            ? isYape
                              ? 'bg-purple-900 border-purple-500 text-purple-200 font-bold'
                              : 'bg-stone-800 border-stone-600 text-white font-bold'
                            : 'border-stone-800 text-stone-400'
                        }`}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Confirmación de Mayor de 18 (Licorería) */}
              {config.slug === 'licoreria' && (
                <label className="flex items-center gap-1.5 text-[8px] text-stone-400 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={isAgeConfirmed}
                    onChange={(e) => setIsAgeConfirmed(e.target.checked)}
                    className="accent-sky-400"
                  />
                  <span>Confirmo ser mayor de 18 años.</span>
                </label>
              )}

              {/* Botón Asesoría WhatsApp (Belleza) */}
              {config.slug === 'belleza' && (
                <button
                  type="button"
                  onClick={handleSendOrder}
                  className="w-full py-2 rounded text-[10px] font-mono font-bold uppercase tracking-wider border border-rose-900 text-rose-900 hover:bg-rose-50 flex items-center justify-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>SOLICITAR ASESORÍA DE TONO POR WHATSAPP</span>
                </button>
              )}

              {/* Botón Ubicación (Licorería) */}
              {config.slug === 'licoreria' && (
                <button
                  type="button"
                  onClick={handleSendOrder}
                  className="w-full py-1.5 rounded border border-stone-800 text-stone-400 hover:text-white text-[9px] font-mono flex items-center justify-between px-2.5 transition"
                >
                  <span>Compartir ubicación por WhatsApp</span>
                  <span>&gt;</span>
                </button>
              )}

              {/* Botón WhatsApp Principal */}
              <button
                type="button"
                onClick={handleSendOrder}
                className="w-full py-2.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider shadow-xl transition active:scale-95 flex items-center justify-center gap-1.5"
                style={{
                  backgroundColor: config.slug === 'pasteleria' ? '#FFFFFF' : labels.accentColor,
                  color: config.slug === 'pasteleria' ? '#291508' : '#FFFFFF',
                }}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting
                    ? 'ENVIANDO...'
                    : config.slug === 'licoreria'
                    ? 'COORDINAR PEDIDO POR WHATSAPP'
                    : config.slug === 'gym'
                    ? 'CONTINUAR POR WHATSAPP'
                    : config.slug === 'polleria'
                    ? 'DESPACHAR POR WHATSAPP'
                    : config.slug === 'pasteleria'
                    ? 'COMPLETAR PEDIDO POR WHATSAPP'
                    : config.slug === 'belleza'
                    ? 'COMPRAR AHORA'
                    : 'CONFIRMAR POR WHATSAPP'}
                </span>
              </button>

              <span className="text-[8px] text-center text-stone-500 block uppercase tracking-widest">
                PEDIDO SUJETO A CONFIRMACIÓN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          FOOTER SISTEMA VISUAL (EXACTO A LÁMINAS FIGMA)
          ========================================================= */}
      <footer className="border-t border-stone-300 dark:border-stone-800 bg-[#FAF8F5] dark:bg-black py-3 px-4 text-[10px] font-mono text-stone-500 uppercase tracking-wider mt-8">
        <div className="max-w-[1760px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900 dark:text-stone-100">
              SISTEMA VISUAL
            </span>
            <span>|</span>
            <span>
              TIPOGRAFÍA:{' '}
              {config.slug === 'calzados'
                ? 'BEBAS NEUE (TÍTULOS) + INTER (INTERFAZ) + IBM PLEX MONO (CÓDIGOS)'
                : config.slug === 'pasteleria'
                ? 'SERIF EDITORIAL (TÍTULOS) + SANS UI (INTERFAZ) + MONO TÉCNICA (PRECIOS)'
                : config.slug === 'gym'
                ? 'CONDENSED DISPLAY + UI SANS + MONO DATA'
                : config.slug === 'belleza'
                ? 'PLAYFAIR DISPLAY (EDITORIAL) + INTER (INTERFAZ)'
                : config.slug === 'licoreria'
                ? 'GROTESK DISPLAY + UI SANS + IBM PLEX MONO'
                : 'CONDENSED DISPLAY + UI SANS + MONO'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span>PALETA DE COLOR:</span>
              <span
                className="w-3 h-3 rounded-sm border border-stone-400"
                style={{ backgroundColor: labels.accentColor }}
                title={labels.accentColor}
              />
              <span
                className="w-3 h-3 rounded-sm border border-stone-400"
                style={{ backgroundColor: config.theme.bgColor }}
                title={config.theme.bgColor}
              />
              <span
                className="w-3 h-3 rounded-sm border border-stone-400"
                style={{ backgroundColor: config.theme.textColor }}
                title={config.theme.textColor}
              />
            </div>
            <span>|</span>
            <span>ESPACIADO (8PT) [8] [16] [24] [32] [48]</span>
          </div>
        </div>
      </footer>

      {/* Modal Vendedor WhatsApp */}
      {isVendorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-stone-950 border border-stone-800 text-white rounded p-5 max-w-sm w-full space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider">
                SIMULADOR WHATSAPP DEMO
              </span>
              <button
                type="button"
                onClick={() => setIsVendorModalOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-stone-400 text-[10px]">
              Ingresa el número para recibir pedidos de prueba en vivo.
            </p>
            <form onSubmit={handleSaveVendorWhatsapp} className="space-y-2">
              <input
                type="tel"
                placeholder="Ej: 941663265"
                value={vendorWhatsapp}
                onChange={(e) => setVendorWhatsapp(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-700 text-white text-xs font-mono focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-1.5 rounded bg-stone-200 text-black font-bold uppercase tracking-wider transition text-[10px]"
              >
                ACTIVAR NÚMERO
              </button>
            </form>
          </div>
        </div>
      )}

      {vendorSuccessToast && (
        <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50 bg-stone-900 border border-stone-700 text-emerald-400 font-mono px-3 py-1.5 rounded text-[11px] font-bold shadow-lg">
          WHATSAPP CONFIGURADO
        </div>
      )}
    </div>
  );
}