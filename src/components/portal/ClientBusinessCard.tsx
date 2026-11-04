'use client';

import React from 'react';
import { Business } from '@/types/panel';
import {
  Globe,
  LayoutDashboard,
  ExternalLink,
  Calendar,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  MessageCircle,
} from 'lucide-react';

interface ClientBusinessCardProps {
  business: Business;
}

export function ClientBusinessCard({ business }: ClientBusinessCardProps) {
  const isActive = business.status === 'active';
  const isOverdue = new Date(business.next_due_date) < new Date() && isActive;

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-7 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
      <div>
        {/* Cabecera de la tarjeta */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                isActive
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/70'
                  : 'bg-rose-50 text-rose-800 border border-rose-200/70'
              }`}
            >
              {isActive ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Sitio Activo en Línea
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                  Servicio Pausado / Suspendido
                </>
              )}
            </span>
            <h3 className="text-xl font-bold font-serif text-stone-900">{business.name}</h3>
            <p className="font-mono text-xs text-amber-800 font-semibold mt-1">
              {business.slug}.qatuweb.com
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#B23A2E] shrink-0 font-serif font-bold text-lg">
            {business.name.charAt(0)}
          </div>
        </div>

        {/* Detalles de suscripción */}
        <div className="bg-stone-50 rounded-2xl p-4 mb-6 space-y-2 border border-stone-200/60 text-xs sm:text-sm">
          <div className="flex items-center justify-between text-stone-600">
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-stone-400" /> Plan Contratado
            </span>
            <span className="font-semibold text-stone-800">
              {business.plan === 'yearly' ? 'Anual (S/. 300 / año)' : 'Mensual (S/. 30 / mes)'}
            </span>
          </div>

          <div className="flex items-center justify-between text-stone-600">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-stone-400" /> Próximo Vencimiento
            </span>
            <span className={`font-semibold ${isOverdue ? 'text-rose-600' : 'text-stone-800'}`}>
              {business.next_due_date} {isOverdue && '(Vencido)'}
            </span>
          </div>
        </div>

        {/* Mensaje de suspensión si no está activo */}
        {!isActive && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 leading-relaxed">
            <p className="font-bold mb-1">Tu página web se encuentra suspendida temporalmente.</p>
            <p>
              Para reactivarla inmediatamente y habilitar nuevamente las ventas y visitas de tus clientes, comunícate con nosotros por WhatsApp.
            </p>
            <a
              href={`https://wa.me/51966123456?text=Hola,%20deseo%20reactivar%20mi%20web%20${business.slug}.qatuweb.com`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Reactivar ahora por WhatsApp
            </a>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="space-y-2.5 pt-4 border-t border-stone-100">
        <a
          href={business.target_url}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-medium transition shadow-sm"
        >
          <Globe className="w-4 h-4 text-amber-400" />
          <span>Ver Mi Tienda Web</span>
          <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
        </a>

        {business.custom_admin_url && (
          <a
            href={business.custom_admin_url}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs sm:text-sm font-medium transition"
          >
            <LayoutDashboard className="w-4 h-4 text-[#B23A2E]" />
            <span>Panel de Ventas / Inventario Propio</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
        )}
      </div>
    </div>
  );
}
