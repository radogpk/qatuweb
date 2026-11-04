'use client';

import React, { useState } from 'react';
import { Business, BusinessCredentials, BusinessStatus } from '@/types/panel';
import { KillSwitchToggle } from './KillSwitchToggle';
import { CredentialVaultModal } from './CredentialVaultModal';
import {
  Search,
  KeyRound,
  ExternalLink,
  MessageCircle,
  Calendar,
  Store,
  Filter,
} from 'lucide-react';

interface BusinessTableProps {
  businesses: Business[];
  onToggleStatus: (id: string, newStatus: BusinessStatus) => Promise<void>;
  onGetCredentials: (businessId: string) => Promise<BusinessCredentials | null>;
  onSaveCredentials: (businessId: string, credentials: Partial<BusinessCredentials>) => Promise<void>;
}

export function BusinessTable({
  businesses,
  onToggleStatus,
  onGetCredentials,
  onSaveCredentials,
}: BusinessTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  // Estado para el modal de bóveda
  const [activeVaultBusiness, setActiveVaultBusiness] = useState<Business | null>(null);
  const [vaultCredentials, setVaultCredentials] = useState<BusinessCredentials | null>(null);
  const [loadingVault, setLoadingVault] = useState(false);

  // Filtrado
  const filtered = businesses.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.owner_email && b.owner_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.owner_phone && b.owner_phone.includes(searchTerm));

    if (statusFilter === 'active') return matchesSearch && b.status === 'active';
    if (statusFilter === 'suspended') return matchesSearch && b.status === 'suspended';
    return matchesSearch;
  });

  const handleOpenVault = async (business: Business) => {
    setActiveVaultBusiness(business);
    setLoadingVault(true);
    try {
      const creds = await onGetCredentials(business.id);
      setVaultCredentials(creds);
    } finally {
      setLoadingVault(false);
    }
  };

  const getWhatsAppReminderUrl = (business: Business) => {
    const phone = business.owner_phone?.replace(/[^0-9]/g, '') || '';
    const text = encodeURIComponent(
      `Hola ${business.owner_name || business.name}, le saludamos de Qatu Web. Le recordamos que el pago de su suscripción web (${business.slug}.qatuweb.com) por S/. ${business.price} vence el ${business.next_due_date}. ¿Desea realizar el pago por Yape o Plin para mantener su web activa?`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
      {/* Barra de Filtros y Búsqueda */}
      <div className="p-5 sm:p-6 border-b border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por negocio, subdominio o cliente..."
            className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-stone-400" />
          <span className="text-xs text-stone-500 font-medium">Estado:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-amber-500 focus:bg-white"
          >
            <option value="all">Todos ({businesses.length})</option>
            <option value="active">Activos ({businesses.filter((b) => b.status === 'active').length})</option>
            <option value="suspended">Suspendidos ({businesses.filter((b) => b.status === 'suspended').length})</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[11px] font-semibold">
              <th className="py-3.5 px-4 sm:px-6">Negocio / Subdominio</th>
              <th className="py-3.5 px-4">Cliente / Contacto</th>
              <th className="py-3.5 px-4">Plan & Cobro</th>
              <th className="py-3.5 px-4">Vencimiento</th>
              <th className="py-3.5 px-4 text-center">Kill-Switch</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-stone-500">
                  No se encontraron negocios con esos filtros.
                </td>
              </tr>
            ) : (
              filtered.map((b) => {
                const isOverdue = new Date(b.next_due_date) < new Date() && b.status === 'active';
                return (
                  <tr key={b.id} className="hover:bg-amber-50/30 transition-colors">
                    {/* Negocio y Subdominio */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 shrink-0 font-serif font-bold">
                          {b.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-stone-900">{b.name}</p>
                          <a
                            href={b.target_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-xs text-amber-700 hover:text-amber-800 hover:underline mt-0.5"
                          >
                            <span>{b.slug}.qatuweb.com</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </td>

                    {/* Cliente */}
                    <td className="py-4 px-4">
                      <p className="text-stone-800 font-medium">{b.owner_name || 'No asignado'}</p>
                      <p className="text-xs text-stone-500">{b.owner_email || b.owner_phone || '-'}</p>
                    </td>

                    {/* Plan */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-800">
                        {b.plan === 'yearly' ? 'Anual S/. 300' : 'Mensual S/. 30'}
                      </span>
                    </td>

                    {/* Vencimiento */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span className={isOverdue ? 'text-rose-600 font-semibold' : 'text-stone-700'}>
                          {b.next_due_date}
                        </span>
                      </div>
                      {isOverdue && (
                        <span className="text-[10px] text-rose-600 font-bold block mt-0.5">
                          ¡Pago vencido!
                        </span>
                      )}
                    </td>

                    {/* Kill Switch */}
                    <td className="py-4 px-4 text-center">
                      <KillSwitchToggle
                        businessId={b.id}
                        businessName={b.name}
                        slug={b.slug}
                        status={b.status}
                        onToggle={onToggleStatus}
                      />
                    </td>

                    {/* Acciones */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                        {/* Bóveda de Credenciales */}
                        <button
                          type="button"
                          onClick={() => handleOpenVault(b)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium transition"
                          title="Bóveda de Credenciales (Gmail, GitHub, Supabase)"
                        >
                          <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                          <span className="hidden sm:inline">Bóveda</span>
                        </button>

                        {/* WhatsApp Recordatorio */}
                        {b.owner_phone && (
                          <a
                            href={getWhatsAppReminderUrl(b)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-medium transition"
                            title="Enviar recordatorio de cobro por WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Cobrar</span>
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Bóveda */}
      {activeVaultBusiness && (
        <CredentialVaultModal
          isOpen={!!activeVaultBusiness}
          businessName={activeVaultBusiness.name}
          slug={activeVaultBusiness.slug}
          credentials={vaultCredentials}
          onClose={() => {
            setActiveVaultBusiness(null);
            setVaultCredentials(null);
          }}
          onSave={async (updated) => {
            await onSaveCredentials(activeVaultBusiness.id, updated);
          }}
        />
      )}
    </div>
  );
}
