'use client';

import React, { useState, useMemo } from 'react';
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Flame,
  MessageCircle,
  Utensils,
  Package,
  ScanLine,
  Zap,
} from 'lucide-react';
import {
  OFFICIAL_PRICING_PLANS,
  OFFICIAL_ADDONS,
  LAUNCH_PROMO_CONFIG,
  buildPricingWhatsAppUrl,
  PricingPlanConfig,
  AddonModuleConfig,
} from '@/lib/config/pricing';

export interface InteractivePricingCalculatorProps {
  defaultPlanId?: 'anual' | 'mensual';
  showDetails?: boolean;
  showPromoBanner?: boolean;
  className?: string;
  initialAddonIds?: ('addon-mesas' | 'addon-inventario' | 'addon-dni')[];
}

export function InteractivePricingCalculator({
  defaultPlanId = 'anual',
  showDetails = true,
  showPromoBanner = true,
  className = '',
  initialAddonIds = [],
}: InteractivePricingCalculatorProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<'anual' | 'mensual'>(defaultPlanId);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(initialAddonIds);

  const activePlan: PricingPlanConfig = useMemo(() => {
    return OFFICIAL_PRICING_PLANS.find((p) => p.id === selectedPlanId) || OFFICIAL_PRICING_PLANS[1];
  }, [selectedPlanId]);

  const selectedAddons: AddonModuleConfig[] = useMemo(() => {
    return OFFICIAL_ADDONS.filter((addon) => selectedAddonIds.includes(addon.id));
  }, [selectedAddonIds]);

  // Calculations
  const addonsTotal = useMemo(() => {
    return selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  }, [selectedAddons]);

  const montoInicial = useMemo(() => {
    if (activePlan.id === 'anual') {
      return activePlan.periodicPrice + addonsTotal;
    }
    return activePlan.setupPrice + activePlan.periodicPrice + addonsTotal;
  }, [activePlan, addonsTotal]);

  const whatsAppUrl = useMemo(() => {
    return buildPricingWhatsAppUrl(selectedPlanId, selectedAddonIds);
  }, [selectedPlanId, selectedAddonIds]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const getAddonIcon = (addonId: string) => {
    switch (addonId) {
      case 'addon-mesas':
        return <Utensils className="w-5 h-5 text-amber-500" />;
      case 'addon-inventario':
        return <Package className="w-5 h-5 text-emerald-500" />;
      case 'addon-dni':
        return <ScanLine className="w-5 h-5 text-blue-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-500" />;
    }
  };

  const spotsLeft = LAUNCH_PROMO_CONFIG.totalSpots - LAUNCH_PROMO_CONFIG.claimedSpots;
  const claimedPercentage = Math.round(
    (LAUNCH_PROMO_CONFIG.claimedSpots / LAUNCH_PROMO_CONFIG.totalSpots) * 100
  );

  return (
    <div className={`w-full space-y-8 ${className}`}>
      {/* 1. BANNER DE PROMOCIÓN DE LANZAMIENTO */}
      {showPromoBanner && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 border-2 border-amber-500/30 p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-950 border border-amber-500/40">
                <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>{LAUNCH_PROMO_CONFIG.badgeText}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
                {LAUNCH_PROMO_CONFIG.headline}
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                {LAUNCH_PROMO_CONFIG.subtext}
              </p>
            </div>

            {/* Contador de urgencia y cupos */}
            <div className="w-full md:w-64 bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/80 shadow-sm shrink-0 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                <span>Cupos Promocionales</span>
                <span className="text-amber-700">
                  {LAUNCH_PROMO_CONFIG.claimedSpots} de {LAUNCH_PROMO_CONFIG.totalSpots} tomados
                </span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-[#B23A2E] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${claimedPercentage}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-600 text-center font-medium">
                ⚡ ¡Solo quedan <strong className="text-stone-900">{spotsLeft} cupos</strong> con tarifa congelada!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. GRID PRINCIPAL: SELECTORES A LA IZQUIERDA Y COTIZACIÓN A LA DERECHA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COLUMNA IZQUIERDA: PLANES Y MÓDULOS (7 columnas) */}
        <div className="lg:col-span-7 space-y-8">
          {/* PASO 1: SELECCIÓN DE PLAN */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#B23A2E] uppercase tracking-wider">
                  Paso 1
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                  Selecciona tu modalidad de servicio
                </h3>
              </div>
            </div>

            {/* Selector de Plan (2 tarjetas táctiles) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OFFICIAL_PRICING_PLANS.map((plan) => {
                const isSelected = plan.id === selectedPlanId;
                const isAnual = plan.id === 'anual';

                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`relative text-left p-5 rounded-2xl transition-all duration-200 border-2 flex flex-col justify-between ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                        : 'border-stone-200 bg-white text-stone-900 hover:border-stone-300 hover:bg-stone-50/50'
                    }`}
                  >
                    {/* Badge de recomendación o tipo */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          isSelected
                            ? isAnual
                              ? 'bg-amber-400 text-stone-950'
                              : 'bg-stone-800 text-stone-200 border border-stone-700'
                            : isAnual
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-stone-100 text-stone-700 border border-stone-200'
                        }`}
                      >
                        {plan.badge}
                      </span>

                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-stone-300 shrink-0" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="font-bold text-base">{plan.name}</div>
                      <p
                        className={`text-xs line-clamp-2 ${
                          isSelected ? 'text-stone-300' : 'text-stone-500'
                        }`}
                      >
                        {plan.tagline}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-dashed border-stone-200/30 flex items-baseline justify-between">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold font-serif">
                            S/ {plan.periodicPrice}
                          </span>
                          <span
                            className={`text-xs font-medium ${
                              isSelected ? 'text-stone-300' : 'text-stone-500'
                            }`}
                          >
                            {plan.periodLabel}
                          </span>
                        </div>
                        <span
                          className={`text-[11px] block mt-0.5 ${
                            isSelected ? 'text-amber-300 font-semibold' : 'text-stone-600'
                          }`}
                        >
                          {plan.dailyEquivalent}
                        </span>
                      </div>

                      <div className="text-right">
                        <span
                          className={`text-xs font-bold block ${
                            isAnual
                              ? isSelected
                                ? 'text-emerald-400'
                                : 'text-emerald-700'
                              : isSelected
                              ? 'text-stone-300'
                              : 'text-stone-600'
                          }`}
                        >
                          {isAnual ? 'Instalación S/ 0 GRATIS' : `Alta inicial S/ ${plan.setupPrice}`}
                        </span>
                        {isAnual && (
                          <span
                            className={`text-[10px] block ${
                              isSelected ? 'text-stone-300' : 'text-stone-500'
                            }`}
                          >
                            Ahorras S/ 150
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PASO 2: MÓDULOS ADICIONALES (ADD-ONS) */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#B23A2E] uppercase tracking-wider">
                Paso 2 (Opcional)
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                Agrega módulos especializados para tu negocio
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Pago único, sin mensualidades adicionales. Actívalos ahora o agrégalos en cualquier momento.
              </p>
            </div>

            <div className="space-y-3">
              {OFFICIAL_ADDONS.map((addon) => {
                const isSelected = selectedAddonIds.includes(addon.id);

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        toggleAddon(addon.id);
                      }
                    }}
                    className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all duration-200 flex items-start gap-4 select-none ${
                      isSelected
                        ? 'border-[#B23A2E] bg-rose-50/40 shadow-sm'
                        : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50'
                    }`}
                  >
                    {/* Checkbox visual */}
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? 'bg-[#B23A2E] text-white shadow-sm'
                          : 'border-2 border-stone-300 text-transparent bg-stone-50'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>

                    {/* Contenido del Addon */}
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {getAddonIcon(addon.id)}
                          <h4 className="text-sm sm:text-base font-bold text-stone-900">
                            {addon.name}
                          </h4>
                        </div>
                        <span className="text-xs font-black text-[#B23A2E] px-2.5 py-0.5 rounded-full bg-rose-100/80 border border-rose-200">
                          {addon.badge}
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">
                        {addon.description}
                      </p>

                      <div className="pt-1.5 flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        <span>Ideal para: {addon.idealFor}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DETALLES DE INCLUSIÓN DEL PLAN */}
          {showDetails && (
            <div className="bg-stone-50/80 rounded-2xl p-5 border border-stone-200/80 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-bold text-stone-900">
                  Todo lo que incluye el {activePlan.name}:
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {activePlan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: RESUMEN DE COTIZACIÓN Y BOTÓN WHATSAPP (5 columnas) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white rounded-3xl border-2 border-stone-900 p-6 sm:p-7 shadow-xl shadow-stone-900/5 space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#B23A2E]">
                Cotización en Vivo
              </span>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Resumen de tu Inversión
              </h3>
            </div>

            {/* Desglose de Costos */}
            <div className="space-y-3 text-xs sm:text-sm">
              {/* Plan Base */}
              <div className="flex justify-between items-start gap-3">
                <div>
                  <span className="font-semibold text-stone-900 block">
                    {activePlan.name}
                  </span>
                  <span className="text-xs text-stone-500">
                    {activePlan.id === 'anual' ? '12 meses de servicio' : 'Primer mes de servicio'}
                  </span>
                </div>
                <span className="font-bold text-stone-900 shrink-0">
                  S/ {activePlan.periodicPrice}
                </span>
              </div>

              {/* Instalación / Activación */}
              <div className="flex justify-between items-start gap-3">
                <div>
                  <span className="font-semibold text-stone-900 block">
                    {activePlan.id === 'anual' ? 'Instalación y Configuración' : 'Costo de Activación Inicial'}
                  </span>
                  <span className="text-xs text-stone-500">
                    {activePlan.id === 'anual'
                      ? 'Carga de 25 productos incluida'
                      : 'Alta técnica en servidor'}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  {activePlan.id === 'anual' ? (
                    <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                      GRATIS (S/ 0)
                    </span>
                  ) : (
                    <span className="font-bold text-stone-900">
                      S/ {activePlan.setupPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Módulos adicionales seleccionados */}
              {selectedAddons.length > 0 && (
                <div className="pt-2 border-t border-dashed border-stone-200 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                    Módulos Seleccionados ({selectedAddons.length})
                  </span>
                  {selectedAddons.map((addon) => (
                    <div key={addon.id} className="flex justify-between items-center text-xs">
                      <span className="text-stone-700 flex items-center gap-1.5">
                        <Plus className="w-3 h-3 text-[#B23A2E]" />
                        {addon.shortName}
                      </span>
                      <span className="font-semibold text-stone-900">
                        +S/ {addon.price}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Callout de Ahorro para Plan Anual */}
              {activePlan.id === 'anual' && (
                <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                  <p className="text-xs text-amber-950 font-bold">
                    ¡Ahorras S/ 150 en tu primer año! (Instalación gratis + 2 meses bonificados)
                  </p>
                </div>
              )}
            </div>

            {/* Total Inicial */}
            <div className="pt-4 border-t-2 border-stone-900/10 space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-stone-500 block">
                    Monto Inicial a Pagar
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {activePlan.id === 'anual'
                      ? 'Cubre los primeros 12 meses completos'
                      : 'Cubre activación inicial + primer mes'}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
                    S/ {montoInicial}
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 block">
                    {activePlan.dailyEquivalent}
                  </span>
                </div>
              </div>

              {/* Próximos Pagos */}
              <div className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>
                  {activePlan.id === 'anual'
                    ? 'Renovación al año siguiente: solo S/ 300 (precio congelado de por vida).'
                    : 'A partir del segundo mes: solo S/ 30/mes sin contrato de permanencia.'}
                </span>
              </div>
            </div>

            {/* BOTÓN CTA WHATSAPP */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-700/20 transition-all duration-150 text-center"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Solicitar por WhatsApp (S/ {montoInicial})</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              {/* Sellos de Confianza */}
              <div className="space-y-1.5 text-center">
                <p className="text-[11px] text-stone-500 font-medium">
                  🇵🇪 Trato directo en Ayacucho • 0% de comisiones por venta
                </p>
                <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400">
                  <span>✓ Pagos con Yape o Plin</span>
                  <span>•</span>
                  <span>✓ Sin tarjetas requeridas</span>
                  <span>•</span>
                  <span>✓ Entrega en 24h a 48h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractivePricingCalculator;
