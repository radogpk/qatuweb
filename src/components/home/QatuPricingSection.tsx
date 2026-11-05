'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  X,
  ArrowRight,
  Sparkles,
  Smartphone,
  Zap,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  Store,
  Utensils,
  Dumbbell,
  Clock,
  Coins,
  BadgePercent,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/config/site';

export function QatuPricingSection() {
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
    }* (Rubro: ${businessType}). Me interesa el *${planText}*. ¿Cuándo podemos coordinar?`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20" id="planes">
      {/* 1. SECCIÓN: SOLUCIONES POR RUBRO EN VIVO */}
      <div className="space-y-10" id="soluciones-rubros">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-900 border border-amber-500/25">
            <span>🇵🇪 Desarrollado en Huamanga, Ayacucho</span>
            <span className="w-1 h-1 rounded-full bg-amber-600"></span>
            <span>Probado en Negocios Reales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Sistemas a la medida de tu rubro
            <br />
            <span className="text-[#B23A2E]">Prueba las demos en vivo en tu celular</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Sin sistemas genéricos ni botones complicados. Diseñamos la experiencia exacta que tu cliente y tú necesitan en el mostrador o por WhatsApp.
          </p>
        </div>

        {/* 3 Tarjetas Interactivas de Rubros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1: Calzado y Ropa */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 text-white flex items-center justify-center shadow-sm">
                <Store className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#B23A2E]">
                  Comercio & Moda
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                  Calzado, Ropa y Boutiques
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Catálogo visual con selector de tallas y colores, carrito interactivo móvil y comanda automática lista para enviar directo al WhatsApp del dueño.
              </p>
              <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Caso activo: <strong>Calzados Lucas Huamanga</strong></span>
              </div>
            </div>

            <div className="pt-6 space-y-2 border-t border-stone-100 mt-6">
              <Link
                href="/demo/calzados"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition"
              >
                <span>👠 Ver Catálogo Cliente</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </Link>
              <Link
                href="/demo/calzados/admin"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200 transition"
              >
                <Smartphone className="w-3.5 h-3.5 text-stone-500" />
                <span>Probar Panel Móvil (/admin)</span>
              </Link>
            </div>
          </div>

          {/* Tarjeta 2: Restaurantes y Pastelerías */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-sm">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                  Gastronomía & Cafés
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                  Restaurantes y Pastelerías
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Menú digital de carga instantánea con variantes de sabor, porciones o extras. QR para mesas o delivery directo a WhatsApp sin comisiones por plato.
              </p>
              <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Caso activo: <strong>Restaurante Las Flores</strong></span>
              </div>
            </div>

            <div className="pt-6 space-y-2 border-t border-stone-100 mt-6">
              <Link
                href="/demo/pasteleria"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition"
              >
                <span>🍰 Ver Menú Digital</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/demo/pasteleria/admin"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                <span>Probar Panel Móvil Chef/Caja</span>
              </Link>
            </div>
          </div>

          {/* Tarjeta 3: Gimnasios y Academias */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                  Fitness & Acceso por DNI
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                  Gimnasios y Academias
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Control de membresías, check-in ultra-rápido escaneando el código de barras del DNI, alertas de cobro vencido y arqueo de caja diario para recepcionistas.
              </p>
              <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Caso activo: <strong>Trankilandia Gym</strong></span>
              </div>
            </div>

            <div className="pt-6 space-y-2 border-t border-stone-100 mt-6">
              <a
                href={getWhatsAppUrl(
                  'Hola Qatu Web, me interesa la solución para gimnasios con control de acceso por DNI y membresías como Trankilandia Gym.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition"
              >
                <span>🏋️ Solicitar Demo Gym por WhatsApp</span>
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <p className="text-[11px] text-center text-stone-400 font-medium">
                Control por DNI • Caja diaria • Alertas WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CUADRO COMPARATIVO: AGENCIA TRADICIONAL VS QATU WEB */}
      <div className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B23A2E]">
            Comparativa Real Directa al Bolsillo
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            ¿Por qué los comerciantes de Ayacucho eligen Qatu Web?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600">
            Compara lo que te ofrece una agencia convencional frente a nuestra plataforma moderna de costo accesible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Columna: Agencia Tradicional */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">
                La forma antigua
              </span>
              <h4 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
                Agencia de Software Tradicional
              </h4>
              <p className="text-xs text-stone-500">
                Costos inflados pensados para corporaciones grandes.
              </p>
            </div>

            <ul className="space-y-3 text-xs text-stone-600">
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>S/ 1,500 a S/ 2,500</strong> de costo inicial por adelantado.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>30 a 60 días de espera</strong> para ver tu web funcionando.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Cobro de S/ 200 a S/ 400</strong> cada vez que quieras cambiar fotos o precios.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  Sistemas complejos y pesados que solo abren bien en computadoras de escritorio.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  Soporte distante o tercerizado fuera de Ayacucho.
                </span>
              </li>
            </ul>
          </div>

          {/* Columna: Qatu Web */}
          <div className="bg-stone-900 text-white rounded-2xl p-6 border-2 border-amber-500/60 shadow-lg space-y-4 relative overflow-hidden">
            <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
              Solución Inteligente
            </div>

            <div className="border-b border-stone-800 pb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                La forma Qatu Web
              </span>
              <h4 className="text-lg font-serif font-bold text-white mt-0.5">
                Qatu Web (Huamanga, Ayacucho)
              </h4>
              <p className="text-xs text-stone-300">
                Ingeniería ágil y costo marginal cero para tu negocio.
              </p>
            </div>

            <ul className="space-y-3 text-xs text-stone-200">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>S/ 30 al mes (S/ 1 al día)</strong> o S/ 300 al año con instalación <strong>GRATIS</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Tu sistema activo en 24 a 48 horas</strong> con tus primeros 25 productos cargados.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Cambios ilimitados gratis:</strong> Tú mismo subes fotos o cambias precios desde tu celular en 5 segundos.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Compresión WebP automática:</strong> Fotos de celular optimizadas a &lt;80 KB sin gastar almacenamiento.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Soporte local en Ayacucho:</strong> Atención directa por WhatsApp y llamadas de inmediato.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. PLANES DE PRECIOS */}
      <div className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-800 border border-amber-500/20">
            Precios Claros y Sin Letra Pequeña
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Elige el plan ideal para tu negocio
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            Ambos planes incluyen tu subdominio oficial, catálogo móvil para WhatsApp y soporte técnico continuo.
          </p>
        </div>

        {/* Grid de Precios Comparativo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan Mensual */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Para empezar paso a paso
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900">Plan Mensual</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Ideal si prefieres pagar mes a mes mientras ves crecer tus ventas por WhatsApp.
              </p>

              <div className="pt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-serif font-bold text-stone-900">S/ 30</span>
                  <span className="text-sm font-semibold text-stone-500">/ mes</span>
                </div>
                <p className="text-xs font-medium text-amber-800 mt-1">
                  + S/ 90 pago único de activación y subida de catálogo
                </p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-stone-100 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Web a medida en subdominio <strong>tunegocio.qatuweb.com</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Catálogo móvil con fotos, precios y tallas/sabores</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Pedidos estructurados directos a tu WhatsApp</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Panel de Bolsillo para apagar productos agotados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Soporte continuo ante dudas y consultas</span>
                </li>
              </ul>
            </div>

            <a
              href={getWhatsAppUrl(
                'Hola Qatu Web, deseo contratar el Plan Mensual de S/ 30 para mi negocio.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-3.5 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs sm:text-sm text-center transition"
            >
              Elegir Plan Mensual (S/ 30)
            </a>
          </div>

          {/* Plan Anual (Destacado) */}
          <div className="bg-stone-900 text-white rounded-3xl p-8 border-2 border-amber-500/50 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
              Recomendado • Ahorra 2 Meses
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Máxima Rentabilidad
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">Plan Anual Completo</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Te olvidas de cobros mensuales por todo un año y la instalación te sale totalmente GRATIS.
              </p>

              <div className="pt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-serif font-bold text-white">S/ 300</span>
                  <span className="text-sm font-semibold text-stone-400">/ año</span>
                </div>
                <p className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Activación y subida de tus primeros 25 productos: S/ 0 (GRATIS)
                </p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-stone-800 text-xs sm:text-sm text-stone-200">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Todo lo del Plan Mensual</strong> durante 12 meses
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Ahorro inmediato de S/ 90</strong> en costo de instalación
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Prioridad en actualización de fotos y precios</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Configuración de código QR para mostrador incluido</span>
                </li>
              </ul>
            </div>

            <a
              href={getWhatsAppUrl(
                'Hola Qatu Web, quiero asegurar el Plan Anual de S/ 300 con instalación GRATIS para mi negocio.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs sm:text-sm text-center shadow-lg transition"
            >
              Asegurar Plan Anual (S/ 300)
            </a>
          </div>
        </div>
      </div>

      {/* 4. WIZARD EXPRESS: "SOLICITAR MI WEB" */}
      <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-md max-w-3xl mx-auto">
        <div className="text-center max-w-md mx-auto mb-6">
          <h3 className="font-serif font-bold text-xl text-stone-900">
            ¿Quieres tu web lista en 24 a 48 horas?
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Completa estos datos y te responderemos por WhatsApp con la propuesta para tu negocio.
          </p>
        </div>

        <form onSubmit={handleQuickRequest} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Nombre de tu Negocio *
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Ej: Calzados Huamanga"
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Rubro de Comercio
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500"
              >
                <option value="Calzado y Ropa">Calzado y Ropa (Moda)</option>
                <option value="Cafetería y Restaurante">
                  Cafetería y Restaurante (Gastronomía)
                </option>
                <option value="Gimnasio o Academia">Gimnasio o Academia (Control DNI)</option>
                <option value="Regalos y Detalles">Regalos, Detalles y Florerías</option>
                <option value="Hospedaje o Turismo">Hospedaje o Turismo</option>
                <option value="Ferretería o Distribuidora">Ferretería o Distribuidora</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-stone-600">Plan de interés:</span>
              <button
                type="button"
                onClick={() => setSelectedPlan('anual')}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                  selectedPlan === 'anual'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700'
                }`}
              >
                Anual S/ 300 (Gratis Setup)
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan('mensual')}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                  selectedPlan === 'mensual'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700'
                }`}
              >
                Mensual S/ 30
              </button>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B23A2E] hover:bg-[#962f25] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition"
            >
              <MessageCircle className="w-4 h-4 text-amber-300" />
              <span>Solicitar por WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
