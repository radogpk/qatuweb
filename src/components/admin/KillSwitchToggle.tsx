'use client';

import React, { useState } from 'react';
import { BusinessStatus } from '@/types/panel';
import { Power, Loader2 } from 'lucide-react';

interface KillSwitchToggleProps {
  businessId: string;
  businessName: string;
  slug: string;
  status: BusinessStatus;
  onToggle: (id: string, newStatus: BusinessStatus) => Promise<void>;
}

export function KillSwitchToggle({
  businessId,
  businessName,
  slug,
  status,
  onToggle,
}: KillSwitchToggleProps) {
  const [loading, setLoading] = useState(false);
  const isActive = status === 'active';

  const handleClick = async () => {
    const nextStatus: BusinessStatus = isActive ? 'suspended' : 'active';
    const message = isActive
      ? `¿Estás seguro de suspender "${businessName}"? Su subdominio (${slug}.qatuweb.com) mostrará la pantalla de suspensión inmediatamente.`
      : `¿Reactivar "${businessName}"? Su subdominio volverá a estar operativo al instante.`;

    if (!window.confirm(message)) return;

    setLoading(true);
    try {
      await onToggle(businessId, nextStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        title={isActive ? 'Hacer clic para suspender (Kill-Switch)' : 'Hacer clic para activar'}
        className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
          isActive ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'
        } ${loading ? 'opacity-60 cursor-wait' : ''}`}
      >
        <span className="sr-only">Toggle Kill-Switch</span>
        <span
          className={`pointer-events-none inline-flex items-center justify-center h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            isActive ? 'translate-x-7' : 'translate-x-0'
          }`}
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 text-stone-600 animate-spin" />
          ) : (
            <Power className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-rose-600'}`} />
          )}
        </span>
      </button>

      <span
        className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
          isActive
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
            : 'bg-rose-50 text-rose-700 border border-rose-200/60'
        }`}
      >
        {isActive ? 'Activo' : 'Suspendido'}
      </span>
    </div>
  );
}
