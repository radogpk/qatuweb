'use client';

import React, { useState } from 'react';
import { Business, BusinessPlan } from '@/types/panel';
import { X, Store, Globe, Calendar, DollarSign, Phone, Mail, PlusCircle } from 'lucide-react';

interface NewBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (business: Omit<Business, 'id' | 'created_at'>) => Promise<void>;
}

export function NewBusinessModal({ isOpen, onClose, onCreate }: NewBusinessModalProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [customAdminUrl, setCustomAdminUrl] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [plan, setPlan] = useState<BusinessPlan>('monthly');
  const [price, setPrice] = useState(30);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d.toISOString().split('T')[0];
  });
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    // Auto generar slug amigable
    const autoSlug = val
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(autoSlug);
    if (!targetUrl || targetUrl.includes('.vercel.app')) {
      setTargetUrl(`https://${autoSlug}.vercel.app`);
      setCustomAdminUrl(`https://${autoSlug}.vercel.app/admin`);
    }
  };

  const handlePlanChange = (newPlan: BusinessPlan) => {
    setPlan(newPlan);
    if (newPlan === 'monthly') {
      setPrice(30);
      const d = new Date();
      d.setMonth(d.getMonth() + 1);
      setDueDate(d.toISOString().split('T')[0]);
    } else {
      setPrice(300);
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      setDueDate(d.toISOString().split('T')[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug || !targetUrl) return;

    setLoading(true);
    try {
      await onCreate({
        name,
        slug,
        target_url: targetUrl,
        custom_admin_url: customAdminUrl,
        owner_email: ownerEmail,
        owner_name: ownerName || name,
        owner_phone: ownerPhone,
        status: 'active',
        plan,
        price,
        currency: 'PEN',
        billing_cycle_day: new Date().getDate(),
        next_due_date: dueDate,
        notes,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Cabecera */}
        <div className="bg-stone-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif">Registrar Nuevo Negocio</h2>
              <p className="text-xs text-stone-400">Alta de subdominio y suscripción en Qatu Hub</p>
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

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700">Nombre del Negocio *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ej: Calzados Huamanga"
              className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-stone-500" /> Subdominio Slug *
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="calzados-huamanga"
                  className="w-full text-sm font-mono bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>
              <p className="text-[11px] text-stone-500">
                URL: <span className="font-semibold text-amber-700">{slug || '...'}.qatuweb.com</span>
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">URL Destino (Vercel) *</label>
              <input
                type="url"
                required
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://...vercel.app"
                className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700">URL Panel Propio del Cliente</label>
            <input
              type="url"
              value={customAdminUrl}
              onChange={(e) => setCustomAdminUrl(e.target.value)}
              placeholder="https://...vercel.app/admin"
              className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-500" /> Correo Google del Dueño
              </label>
              <input
                type="email"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                placeholder="dueno@gmail.com"
                className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-500" /> WhatsApp del Dueño
              </label>
              <input
                type="tel"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                placeholder="+51 966 000 000"
                className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">Plan</label>
              <select
                value={plan}
                onChange={(e) => handlePlanChange(e.target.value as BusinessPlan)}
                className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              >
                <option value="monthly">Mensual (S/. 30)</option>
                <option value="yearly">Anual (S/. 300)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-stone-500" /> Precio (S/.)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-500" /> Vencimiento
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700">Notas Internas</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detalles sobre el cliente, pagos o diseño..."
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
              <PlusCircle className="w-4 h-4" />
              <span>{loading ? 'Creando...' : 'Crear Negocio'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
