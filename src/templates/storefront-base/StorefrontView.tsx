'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import {
  StoreProduct,
  TenantConfig,
  CartItem,
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
} from 'lucide-react';

interface StorefrontViewProps {
  config: TenantConfig;
  initialProducts: StoreProduct[];
  isDemoMode?: boolean; // Habilita el modal del vendedor para cambiar el WhatsApp en vivo
}

export function StorefrontView({
  config,
  initialProducts,
  isDemoMode = true,
}: StorefrontViewProps) {
  // Estado del Carrito
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estado de Selección de Variantes por Producto { [productId]: selectedVariant }
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    initialProducts.forEach((p) => {
      if (p.variantes && p.variantes.length > 0) {
        initial[p.id] = p.variantes[0];
      }
    });
    return initial;
  });

  // Datos del Cliente en el Checkout
  const [customerName, setCustomerName] = useState('');
  const [deliveryType, setDeliveryType] = useState<'tienda' | 'delivery'>('tienda');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(config.paymentMethods[0] || 'Yape');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modo Demo Vendedor (Para cambiar el número de WhatsApp en la calle)
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

  // Cálculos de Totales
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.cantidad, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [cart]
  );

  // Agregar al carrito
  const handleAddToCart = (product: StoreProduct) => {
    const selectedVariant = selectedVariants[product.id] || (product.variantes?.[0] ?? '');
    const price = product.precio_oferta || product.precio;
    const cartItemId = `${product.id}-${selectedVariant}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          nombre: product.nombre,
          precio: price,
          cantidad: 1,
          variante: selectedVariant,
          imagen_url: product.imagen_url,
        },
      ];
    });

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

  // Enviar Pedido por WhatsApp (Con evasión infalible del bloqueador de iOS/Safari)
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

    // 1. Guardado silencioso en pedidos_log con Timeout máximo de 800ms
    // Si la señal 3G en Jr. Asamblea es lenta, no bloqueamos la apertura de WhatsApp
    try {
      const logPayload = {
        cliente_nombre: customerName.trim(),
        tipo_entrega: deliveryType,
        direccion_entrega: deliveryType === 'delivery' ? customerAddress : config.location,
        metodo_pago: paymentMethod,
        items: cart,
        total: cartTotal,
      };

      // Si existiera cliente Supabase del tenant:
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);

        await Promise.race([
          supabase.from('pedidos_log').insert(logPayload),
          new Promise((resolve) => setTimeout(resolve, 800)),
        ]);
      }
    } catch (e) {
      console.warn('Omitido log en pedidos_log por latencia de red:', e);
    }

    // 2. Redirección síncrona directa (abre la App de WhatsApp nativa sin popup blocker)
    window.location.href = whatsappUrl;
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-28">
      {/* Toast Notificación Vendedor */}
      {vendorSuccessToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs border border-amber-400/40 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>WhatsApp de prueba actualizado: <strong>+{vendorWhatsapp}</strong></span>
        </div>
      )}

      {/* Cabecera / Portada del Negocio */}
      <header
        className="text-white relative shadow-md"
        style={{ backgroundColor: config.theme.primaryColor }}
      >
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-black/20 text-white/90 mb-1.5 backdrop-blur-sm">
              Tienda Oficial • Catálogo
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              {config.businessName}
            </h1>
            <p className="text-xs sm:text-sm text-white/85 mt-1 max-w-md">
              {config.tagline}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-white/75 mt-2.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{config.location}</span>
            </div>
          </div>

          {/* Botón flotante superior del Carrito */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-stone-900 font-semibold text-xs sm:text-sm shadow-lg hover:bg-stone-100 transition active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#B23A2E]" />
            <span>Ver Pedido</span>
            {cartCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#B23A2E] text-white text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Catálogo de Productos */}
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
            Productos Disponibles
          </h2>
          <span className="text-xs text-stone-500">
            {initialProducts.length} modelos listos para entrega
          </span>
        </div>

        {/* Rejilla de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {initialProducts.map((product) => {
            const hasOffer = !!product.precio_oferta;
            const currentVariant = selectedVariants[product.id];

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Imagen */}
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <img
                      src={product.imagen_url}
                      alt={product.nombre}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {hasOffer && (
                      <span className="absolute top-3 left-3 bg-[#B23A2E] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                        Oferta Especial
                      </span>
                    )}
                  </div>

                  {/* Info Producto */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 leading-snug">
                      {product.nombre}
                    </h3>
                    {product.descripcion && (
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                        {product.descripcion}
                      </p>
                    )}

                    {/* Selector de Variantes (Tallas / Sabores) */}
                    {config.features.enableVariants && product.variantes && product.variantes.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-stone-100">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                          Elegir {config.features.variantLabel}:
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {product.variantes.map((v) => {
                            const isSelected = currentVariant === v;
                            return (
                              <button
                                key={v}
                                type="button"
                                onClick={() =>
                                  setSelectedVariants((prev) => ({
                                    ...prev,
                                    [product.id]: v,
                                  }))
                                }
                                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                                  isSelected
                                    ? 'bg-stone-900 text-white shadow-sm'
                                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                }`}
                              >
                                {v}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Precios y Botón de Pedir */}
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 flex items-center justify-between border-t border-stone-100 mt-2">
                  <div>
                    {hasOffer ? (
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold font-serif text-[#B23A2E]">
                          {config.currency} {product.precio_oferta?.toFixed(2)}
                        </span>
                        <span className="text-xs text-stone-400 line-through">
                          {config.currency} {product.precio.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold font-serif text-stone-900">
                        {config.currency} {product.precio.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-white shadow-sm active:scale-95 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Pedir</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Barra Flotante Inferior en Móviles (Sticky Footer Bar) */}
      {cartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40 animate-in fade-in slide-in-from-bottom-4">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl bg-stone-900 text-white shadow-2xl flex items-center justify-between font-medium text-sm active:scale-[0.99] transition"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#B23A2E] text-white flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
              <span>Revisar Pedido</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold font-serif text-amber-300">
                {config.currency} {cartTotal.toFixed(2)}
              </span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Drawer / Modal de Carrito & Checkout */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Cabecera del Carrito */}
            <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#B23A2E]" />
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Resumen de tu Pedido
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-900 rounded-xl hover:bg-stone-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lista de Productos en el Carrito */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-stone-400 text-sm">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-stone-300" />
                  Tu carrito está vacío. Elige tus modelos favoritos.
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-200/80 gap-3"
                  >
                    <img
                      src={item.imagen_url}
                      alt={item.nombre}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs sm:text-sm text-stone-900 truncate">
                        {item.nombre}
                      </p>
                      {item.variante && (
                        <p className="text-[11px] text-stone-500">
                          {config.features.variantLabel}: <strong>{item.variante}</strong>
                        </p>
                      )}
                      <p className="text-xs font-bold text-stone-800">
                        {config.currency} {(item.precio * item.cantidad).toFixed(2)}
                      </p>
                    </div>

                    {/* Controles de Cantidad */}
                    <div className="flex items-center gap-1.5 shrink-0 bg-white border border-stone-200 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100"
                      >
                        {item.cantidad === 1 ? <Trash2 className="w-3.5 h-3.5 text-rose-600" /> : <Minus className="w-3.5 h-3.5" />}
                      </button>
                      <span className="w-5 text-center text-xs font-bold">{item.cantidad}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Formulario de Checkout */}
              {cart.length > 0 && (
                <div className="pt-4 mt-4 border-t border-stone-200 space-y-3.5 text-xs sm:text-sm">
                  {/* Nombre del Cliente */}
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Tu Nombre o de quien recibe *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ej: María Quispe"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  {/* Tipo de Entrega */}
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Método de Entrega
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryType('tienda')}
                        className={`py-2 px-3 rounded-xl border text-xs font-medium transition ${
                          deliveryType === 'tienda'
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        Recojo en Tienda
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryType('delivery')}
                        className={`py-2 px-3 rounded-xl border text-xs font-medium transition ${
                          deliveryType === 'delivery'
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        Envío a Domicilio
                      </button>
                    </div>
                  </div>

                  {/* Dirección si eligió delivery */}
                  {deliveryType === 'delivery' && (
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">
                        Dirección en Ayacucho
                      </label>
                      <input
                        type="text"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="Ej: Jr. Asamblea 120 o Ref: cerca al arco"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white"
                      />
                    </div>
                  )}

                  {/* Método de Pago */}
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      ¿Cómo deseas pagar?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {config.paymentMethods.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setPaymentMethod(m)}
                          className={`text-xs px-3 py-1.5 rounded-xl border font-medium ${
                            paymentMethod === m
                              ? 'bg-amber-100 border-amber-300 text-amber-900'
                              : 'bg-stone-50 border-stone-200 text-stone-600'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pie del Carrito: Total & Botón WhatsApp */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-stone-600">Total a pagar:</span>
                  <span className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    {config.currency} {cartTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSendOrder}
                  disabled={!customerName.trim() || isSubmitting}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>
                    {isSubmitting
                      ? 'Abriendo WhatsApp...'
                      : 'Enviar Pedido por WhatsApp'}
                  </span>
                </button>

                <p className="text-[11px] text-center text-stone-500">
                  {vendorWhatsapp ? (
                    <span className="text-emerald-700 font-semibold">
                      Demo en vivo dirigida al WhatsApp: +{vendorWhatsapp}
                    </span>
                  ) : (
                    <span>El pedido llegará formateado al WhatsApp oficial de la tienda.</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Botón Flotante Discreto: "Modo Demo Vendedor" (Tu arma de ventas en la calle) */}
      {isDemoMode && (
        <div className="fixed bottom-4 left-4 z-40">
          <button
            type="button"
            onClick={() => setIsVendorModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-stone-900/90 text-amber-400 hover:bg-stone-900 text-xs font-semibold shadow-xl border border-amber-500/30 backdrop-blur-sm transition"
            title="Configurar teléfono del prospecto para la demo en vivo"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Modo Demo</span>
            {vendorWhatsapp && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
          </button>
        </div>
      )}

      {/* Modal Modo Demo Vendedor */}
      {isVendorModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Cierre de Venta en Vivo</span>
              </div>
              <button
                type="button"
                onClick={() => setIsVendorModalOpen(false)}
                className="text-stone-400 hover:text-stone-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Ingresa el número de WhatsApp del comerciante que estás visitando (ej: <code className="bg-stone-100 px-1 py-0.5 rounded font-bold">51966123456</code>). Al hacer un pedido de prueba, <strong>su propio celular sonará</strong> con la comanda de su negocio.
            </p>

            <form onSubmit={handleSaveVendorWhatsapp} className="space-y-3">
              <input
                type="tel"
                required
                value={vendorWhatsapp}
                onChange={(e) => setVendorWhatsapp(e.target.value)}
                placeholder="51966000000"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsVendorModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-stone-900 text-white rounded-xl shadow-sm hover:bg-stone-800"
                >
                  Activar Demo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pie de Página: Marca Qatu */}
      <footer className="mt-16 text-center text-xs text-stone-500 py-6 border-t border-stone-200 space-y-1.5">
        <p>
          Sitio oficial de {config.businessName} • Ayacucho, Perú
        </p>
        <p className="text-[11px] text-stone-400">
          Tecnología y catálogo por{' '}
          <a
            href="/"
            className="text-amber-800 font-semibold hover:underline"
          >
            QatuWeb.com
          </a>{' '}
          (Tu web y pedidos por S/ 30/mes)
        </p>
        <p className="pt-2">
          <a
            href={`/demo/${config.slug.includes('pasteleria') ? 'pasteleria' : 'calzados'}/admin`}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 px-3 py-1 rounded-full transition"
          >
            <span>⚙️ Panel de Bolsillo (Dueño)</span>
          </a>
        </p>
      </footer>
    </div>
  );
}
