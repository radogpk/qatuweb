'use client';

import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { ServiceRequest } from '@/types/panel';

interface RequestServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string;
  clientEmail: string;
  clientName: string;
  onRequest: (req: Omit<ServiceRequest, 'id' | 'created_at' | 'status'>) => Promise<void>;
}

export function RequestServiceModal({
  isOpen,
  onClose,
  clientId,
  clientEmail,
  clientName,
  onRequest,
}: RequestServiceModalProps) {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !businessType) return;

    setLoading(true);
    try {
      await onRequest({
        client_id: clientId,
        client_name: clientName,
        client_email: clientEmail,
        business_name: businessName,
        business_type: businessType,
        phone_contact: phone || '+51 966 000 000',
        details,
      });
      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-stone-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif">Solicitar Nueva Página Web</h2>
              <p className="text-xs text-stone-400">Diseño a medida por solo S/. 30 al mes</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2 rounded-xl hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-stone-900">¡Solicitud Enviada!</h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xs mx-auto">
              Nos comunicaremos contigo por WhatsApp en menos de 24 horas para coordinar el diseño a medida de tu nuevo negocio.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">Nombre del Nuevo Negocio o Sucursal *</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Ej: Calzados Lucas - Sucursal San Juan"
                className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">Rubro o Tipo de Comercio *</label>
              <input
                type="text"
                required
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="Ej: Restaurante, Ferretería, Joyería, Ropa..."
                className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">Número de WhatsApp de Contacto</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+51 966 000 000"
                className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">¿Qué te gustaría incluir en esta web?</label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Ej: Quiero catálogo de fotos con botón de pedidos directos a mi WhatsApp..."
                className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition shadow-sm disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>{loading ? 'Enviando...' : 'Enviar Solicitud'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
