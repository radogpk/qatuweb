'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  ArrowRight,
  Sparkles,
  Smartphone,
  Zap,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/config/site';

export function QatuPricingSection() {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('comercio');
  const [selectedPlan, setSelectedPlan] = useState<'anual' | 'mensual'>('anual');

  const handleQuickRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const planText = selectedPlan === 'anual' ? 'Plan Anual S/ 300 (Instalación Gratis)' : 'Plan Mensual S/ 30 (+ S/ 90 activación)';
    const text = `Hola Qatu Web, deseo solicitar mi web para mi negocio: *${businessName || 'Mi Negocio'}* (Rubro: ${businessType}). Me interesa el *${planText}*. ¿Cuándo podemos coordinar?`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16" id="planes">
      {/* Título de la sección */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-800 border border-amber-500/20">
          Precios Claros y Accesibles para Ayacucho
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Tu propia Página Web o Sistema
          <br />
          <span className="text-[#B23A2E]">por solo S/ 30 al mes o S/ 300 al año</span>
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Sin costos inflados ni sistemas genéricos. Diseñamos a la medida de tu comercio en Huamanga, con catálogo, pedidos directos a tu WhatsApp y soporte técnico con Inteligencia Artificial.
        </p>

        {/* Demos en vivo destacadas */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-semibold text-stone-500">Prueba las demos en vivo:</span>
          <Link
            href="/demo/calzados"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition"
          >
            <span>👠 Demo Calzado & Moda</span>
            <ExternalLink className="w-3 h-3 text-amber-400" />
          </Link>
          <Link
            href="/demo/pasteleria"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold hover:bg-amber-200 transition"
          >
            <span>🍰 Demo Pastelería & Café</span>
            <ExternalLink className="w-3 h-3 text-amber-800" />
          </Link>
        </div>
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
                <span>Web a medida en subdominio <strong>tunegocio.qatuweb.com</strong></span>
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
                <span>Soporte continuo ante caídas y dudas</span>
              </li>
            </ul>
          </div>

          <a
            href={getWhatsAppUrl("Hola Qatu Web, deseo contratar el Plan Mensual de S/ 30 para mi negocio.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 w-full py-3.5 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs sm:text-sm text-center transition"
          >
            Elegir Plan Mensual
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
                <span><strong>Todo lo del Plan Mensual</strong> durante 12 meses</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Ahorro inmediato de S/ 90</strong> en costo de instalación</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Prioridad en actualización de fotos y precios con IA</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Configuración de código QR de mesa o mostrador incluido</span>
              </li>
            </ul>
          </div>

          <a
            href={getWhatsAppUrl("Hola Qatu Web, quiero asegurar el Plan Anual de S/ 300 con instalación GRATIS para mi negocio.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs sm:text-sm text-center shadow-lg transition"
          >
            Asegurar Plan Anual (S/ 300)
          </a>
        </div>
      </div>

      {/* Wizard Express: "Solicitar mi Web" */}
      <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-md max-w-3xl mx-auto">
        <div className="text-center max-w-md mx-auto mb-6">
          <h3 className="font-serif font-bold text-xl text-stone-900">
            ¿Quieres tu web lista en 24 a 48 horas?
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Completa estos datos y te responderemos por WhatsApp con la propuesta de tu catálogo.
          </p>
        </div>

        <form onSubmit={handleQuickRequest} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Nombre de tu Negocio *</label>
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
              <label className="text-xs font-bold text-stone-700 block mb-1">Rubro de Comercio</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500"
              >
                <option value="Calzado y Ropa">Calzado y Ropa (Moda)</option>
                <option value="Cafetería y Restaurante">Cafetería y Restaurante (Gastronomía)</option>
                <option value="Regalos y Detalles">Regalos, Detalles y Florerías</option>
                <option value="Gimnasio o Academia">Gimnasio o Academia</option>
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
                  selectedPlan === 'anual' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
                }`}
              >
                Anual S/ 300 (Gratis Setup)
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan('mensual')}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                  selectedPlan === 'mensual' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
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
