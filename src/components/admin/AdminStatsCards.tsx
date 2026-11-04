'use client';

import React from 'react';
import { Business } from '@/types/panel';
import { Store, CheckCircle2, AlertOctagon, DollarSign } from 'lucide-react';

interface AdminStatsCardsProps {
  businesses: Business[];
}

export function AdminStatsCards({ businesses }: AdminStatsCardsProps) {
  const total = businesses.length;
  const active = businesses.filter((b) => b.status === 'active').length;
  const suspended = businesses.filter((b) => b.status === 'suspended').length;

  // Cálculo de recaudación mensual estimada
  const monthlyRevenue = businesses.reduce((acc, curr) => {
    if (curr.status === 'suspended') return acc;
    if (curr.plan === 'yearly') {
      return acc + curr.price / 12; // prorrateo mensual de la anualidad
    }
    return acc + curr.price;
  }, 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {/* Total Negocios */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Total Negocios
          </p>
          <p className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-1">
            {total}
          </p>
          <p className="text-xs text-stone-500 mt-1">Subdominios en qatuweb.com</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
          <Store className="w-6 h-6" />
        </div>
      </div>

      {/* Activos */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Páginas Activas
          </p>
          <p className="text-2xl sm:text-3xl font-bold font-serif text-emerald-700 mt-1">
            {active}
          </p>
          <p className="text-xs text-emerald-600/80 mt-1">Tráfico y ventas online</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      </div>

      {/* Suspendidos (Kill-switch) */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">
            Suspendidos
          </p>
          <p className="text-2xl sm:text-3xl font-bold font-serif text-rose-700 mt-1">
            {suspended}
          </p>
          <p className="text-xs text-rose-600/80 mt-1">Kill-Switch activado</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
          <AlertOctagon className="w-6 h-6" />
        </div>
      </div>

      {/* Recaudación Mensual Estimada */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Ingreso Mensual
          </p>
          <p className="text-2xl sm:text-3xl font-bold font-serif text-amber-800 mt-1">
            S/. {monthlyRevenue.toFixed(0)}
          </p>
          <p className="text-xs text-amber-700/80 mt-1">Base recurrente estimada</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
          <DollarSign className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
