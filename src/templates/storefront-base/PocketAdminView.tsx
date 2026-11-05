'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { StoreProduct, TenantConfig } from './tenant.config';
import { compressImageToWebP, CompressionResult } from './imageCompressor';
import {
  Store,
  TrendingUp,
  Camera,
  Upload,
  Plus,
  Power,
  Edit2,
  Trash2,
  Check,
  X,
  ExternalLink,
  DollarSign,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

interface PocketAdminViewProps {
  config: TenantConfig;
  initialProducts: StoreProduct[];
  storeUrl: string; // ej: "/demo/calzados" o "https://calzadoslucas.qatuweb.com"
}

export function PocketAdminView({
  config,
  initialProducts,
  storeUrl,
}: PocketAdminViewProps) {
  const [products, setProducts] = useState<StoreProduct[]>(initialProducts);
  const [filter, setFilter] = useState<'all' | 'available' | 'soldout'>('all');

  // Estado del Modal de Subida de Producto
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNombre, setNewNombre] = useState('');
  const [newPrecio, setNewPrecio] = useState('');
  const [newPrecioOferta, setNewPrecioOferta] = useState('');
  const [newVariantes, setNewVariantes] = useState('');
  const [compressedImage, setCompressedImage] = useState<CompressionResult | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);

  // Edición rápida de precio en línea
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState('');

  // Notificación flotante rápida
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Toggle instantáneo de Disponibilidad ("Agotado / Disponible")
  const handleToggleAvailability = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextState = !p.disponible;
          showToast(
            nextState
              ? `✅ "${p.nombre}" marcado como DISPONIBLE.`
              : `⚠️ "${p.nombre}" marcado como AGOTADO (Oculto en web).`
          );
          return { ...p, disponible: nextState };
        }
        return p;
      })
    );
  };

  // 2. Manejo de subida y compresión WebP en el navegador
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressing(true);
    try {
      // Comprime de 4-8 MB a ~60 KB a 800px WebP
      const result = await compressImageToWebP(file, 800, 0.8);
      setCompressedImage(result);
    } catch (error) {
      console.error('Error al comprimir imagen:', error);
      alert('Error al procesar la foto.');
    } finally {
      setCompressing(false);
    }
  };

  // 3. Guardar nuevo producto
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNombre.trim() || !newPrecio || !compressedImage) {
      alert('Por favor toma una foto, ingresa nombre y precio.');
      return;
    }

    setSavingProduct(true);
    setTimeout(() => {
      const variantesArray = newVariantes
        ? newVariantes
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean)
        : [];

      const newProduct: StoreProduct = {
        id: `prod-${Date.now()}`,
        nombre: newNombre.trim(),
        precio: parseFloat(newPrecio),
        precio_oferta: newPrecioOferta ? parseFloat(newPrecioOferta) : undefined,
        imagen_url: compressedImage.dataUrl,
        variantes: variantesArray,
        disponible: true,
        destacado: true,
      };

      setProducts((prev) => [newProduct, ...prev]);
      setIsModalOpen(false);
      setSavingProduct(false);

      // Limpiar formulario
      setNewNombre('');
      setNewPrecio('');
      setNewPrecioOferta('');
      setNewVariantes('');
      setCompressedImage(null);

      showToast(`🎉 ¡"${newProduct.nombre}" publicado con éxito en tu web!`);
    }, 400);
  };

  // 4. Guardar precio editado
  const handleSavePrice = (productId: string) => {
    const val = parseFloat(tempPrice);
    if (!isNaN(val) && val > 0) {
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, precio: val } : p))
      );
      showToast('💰 Precio actualizado.');
    }
    setEditingPriceId(null);
  };

  // Filtrado de productos
  const filteredProducts = products.filter((p) => {
    if (filter === 'available') return p.disponible;
    if (filter === 'soldout') return !p.disponible;
    return true;
  });

  // Métricas de demostración de obtener_resumen_mes()
  const monthlyOrders = 42;
  const monthlyRevenue = 2850.0;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 pb-20 font-sans">
      {/* Toast Flotante */}
      {toastMessage && (
        <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 bg-stone-900 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-amber-400/30 animate-in fade-in slide-in-from-top-4">
          <Zap className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cabecera Superior Móvil */}
      <header className="bg-stone-900 text-white px-4 py-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-base leading-none">
                {config.businessName}
              </h1>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                Panel de Bolsillo
              </span>
            </div>
          </div>

          <Link
            href={storeUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold border border-stone-700 transition"
          >
            <span>Ver Tienda</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-5 space-y-5">
        {/* =========================================================================
            CANDADO 3: LA TARJETA DE RETENCIÓN (ROI MENSUAL)
            Lo primero que ve el dueño sentado en su tienda
            ========================================================================= */}
        <div className="bg-white text-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200/90 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Resumen de este mes en tu Web
            </span>
            <span className="text-[11px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold px-2.5 py-0.5 rounded-full">
              Al día
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-500 font-medium">Pedidos por WhatsApp</p>
              <p className="text-slate-900 font-black text-3xl mt-0.5">
                {monthlyOrders}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Vendido Estimado</p>
              <p className="text-emerald-700 font-black text-3xl mt-0.5">
                {config.currency} {monthlyRevenue.toFixed(2)}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3 pt-2.5 border-t border-slate-100 leading-snug">
            Tu cuota mensual de <strong className="text-slate-900">S/ 30</strong> mantiene tu catálogo y ventas activas en{' '}
            <span className="text-slate-800 font-mono font-semibold">{config.slug}.qatuweb.com</span>.
          </p>
        </div>

        {/* Botón Principal: Subir Producto con Cámara */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full py-4 px-5 rounded-2xl bg-[#B23A2E] hover:bg-[#962f25] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 transition"
        >
          <Camera className="w-5 h-5" />
          <span>Tomar Foto y Subir Producto</span>
        </button>

        {/* Filtros rápidos */}
        <div className="flex items-center justify-between pt-1">
          <h2 className="text-sm font-bold text-stone-800 font-serif">
            Tus Productos ({products.length})
          </h2>

          <div className="flex bg-stone-200/80 p-0.5 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition ${
                filter === 'all' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-600'
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => setFilter('available')}
              className={`px-2.5 py-1 rounded-lg transition ${
                filter === 'available' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-600'
              }`}
            >
              Activos
            </button>
            <button
              type="button"
              onClick={() => setFilter('soldout')}
              className={`px-2.5 py-1 rounded-lg transition ${
                filter === 'soldout' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-600'
              }`}
            >
              Agotados
            </button>
          </div>
        </div>

        {/* Lista de Productos del Dueño */}
        <div className="space-y-3">
          {filteredProducts.map((p) => {
            const isEditingThis = editingPriceId === p.id;

            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl p-3.5 border transition-all shadow-sm flex items-center gap-3.5 ${
                  p.disponible
                    ? 'border-stone-200/90'
                    : 'border-rose-200/70 bg-rose-50/20 opacity-80'
                }`}
              >
                {/* Miniatura */}
                <img
                  src={p.imagen_url}
                  alt={p.nombre}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200"
                />

                {/* Info y Edición de Precio */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xs sm:text-sm text-stone-900 truncate">
                    {p.nombre}
                  </h3>

                  {p.variantes && p.variantes.length > 0 && (
                    <p className="text-[11px] text-stone-500 mt-0.5 truncate">
                      {config.features.variantLabel}: {p.variantes.join(', ')}
                    </p>
                  )}

                  {/* Precio / Edición inline */}
                  <div className="mt-1 flex items-center gap-2">
                    {isEditingThis ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          autoFocus
                          value={tempPrice}
                          onChange={(e) => setTempPrice(e.target.value)}
                          className="w-16 text-xs bg-stone-100 border border-stone-300 rounded px-1.5 py-0.5 font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => handleSavePrice(p.id)}
                          className="p-1 bg-emerald-600 text-white rounded text-xs"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingPriceId(null)}
                          className="p-1 bg-stone-300 text-stone-700 rounded text-xs"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPriceId(p.id);
                          setTempPrice(p.precio.toString());
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-stone-900 hover:text-amber-800"
                        title="Toca para cambiar precio"
                      >
                        <span>
                          {config.currency} {p.precio.toFixed(2)}
                        </span>
                        <Edit2 className="w-2.5 h-2.5 text-stone-400" />
                      </button>
                    )}

                    {p.precio_oferta && (
                      <span className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded font-bold">
                        Oferta
                      </span>
                    )}
                  </div>
                </div>

                {/* Switch de 1 Toque: Disponible / Agotado */}
                <div className="shrink-0 text-center">
                  <button
                    type="button"
                    onClick={() => handleToggleAvailability(p.id)}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      p.disponible ? 'bg-emerald-500' : 'bg-stone-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        p.disponible ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span
                    className={`block text-[9px] font-bold mt-0.5 uppercase tracking-wide ${
                      p.disponible ? 'text-emerald-700' : 'text-stone-400'
                    }`}
                  >
                    {p.disponible ? 'Activo' : 'Agotado'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* =========================================================================
          MODAL: SUBIR PRODUCTO DESDE CÁMARA CON COMPRESIÓN WEBP AUTOMÁTICA
          ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 space-y-4 max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#B23A2E]" />
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Subir Nuevo Producto
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5">
              {/* Selector de Foto / Cámara */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Foto del Producto (Cámara o Galería) *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    required
                    onChange={handleFileChange}
                    className="hidden"
                    id="camera-input"
                  />
                  <label
                    htmlFor="camera-input"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-stone-300 hover:border-amber-500 rounded-2xl p-4 bg-stone-50 cursor-pointer transition text-center"
                  >
                    {compressedImage ? (
                      <div className="space-y-2">
                        <img
                          src={compressedImage.dataUrl}
                          alt="Vista previa"
                          className="w-24 h-24 object-cover rounded-xl mx-auto shadow-sm"
                        />
                        {/* Candado Técnico: Compresión WebP visible */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            {compressedImage.originalSizeKB} KB ➔ {compressedImage.compressedSizeKB} KB (-{compressedImage.reductionPercentage}%)
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-500">Toca para cambiar foto</p>
                      </div>
                    ) : compressing ? (
                      <div className="py-6 text-xs text-stone-500 font-medium">
                        Comprimiendo a WebP ligero...
                      </div>
                    ) : (
                      <div className="py-4 space-y-1">
                        <Camera className="w-8 h-8 text-stone-400 mx-auto" />
                        <p className="text-xs font-bold text-stone-700">Tocar para tomar foto</p>
                        <p className="text-[10px] text-stone-400">
                          Se optimiza automáticamente a WebP &lt;80 KB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Nombre */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Nombre del Modelo o Producto *
                </label>
                <input
                  type="text"
                  required
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  placeholder="Ej: Botín Cuero Gamuza Marrón"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              {/* Precios */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Precio Normal ({config.currency}) *
                  </label>
                  <input
                    type="number"
                    step="0.50"
                    required
                    value={newPrecio}
                    onChange={(e) => setNewPrecio(e.target.value)}
                    placeholder="95.00"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Precio Oferta (Opcional)
                  </label>
                  <input
                    type="number"
                    step="0.50"
                    value={newPrecioOferta}
                    onChange={(e) => setNewPrecioOferta(e.target.value)}
                    placeholder="85.00"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Variantes (Tallas / Sabores) */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  {config.features.variantLabel}s disponibles (separadas por coma)
                </label>
                <input
                  type="text"
                  value={newVariantes}
                  onChange={(e) => setNewVariantes(e.target.value)}
                  placeholder="37, 38, 39, 40"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
                <p className="text-[10px] text-stone-400 mt-1">
                  Ejemplo: 36, 37, 38 (el cliente podrá elegirla al pedir).
                </p>
              </div>

              {/* Botón Guardar */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={savingProduct || !compressedImage}
                  className="w-full py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition"
                >
                  {savingProduct ? 'Publicando...' : 'Publicar Inmediatamente en mi Web'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
