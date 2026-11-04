'use client';

import React, { useState, useEffect } from 'react';
import { Business, BusinessCredentials, BusinessStatus } from '@/types/panel';
import { panelService } from '@/lib/services/panel.service';
import { AdminStatsCards } from '@/components/admin/AdminStatsCards';
import { BusinessTable } from '@/components/admin/BusinessTable';
import { NewBusinessModal } from '@/components/admin/NewBusinessModal';
import { PlusCircle, RefreshCw, Zap, ShieldAlert } from 'lucide-react';

export default function AdminPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const loadBusinesses = async () => {
    setLoading(true);
    try {
      const data = await panelService.getBusinesses();
      setBusinesses(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBusinesses();
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Toggle Kill-switch en tiempo real
  const handleToggleStatus = async (id: string, newStatus: BusinessStatus) => {
    const updated = await panelService.updateBusinessStatus(id, newStatus);
    if (updated) {
      setBusinesses((prev) => prev.map((b) => (b.id === id ? updated : b)));
      showNotification(
        newStatus === 'active'
          ? `✅ "${updated.name}" ha sido ACTIVADO. El subdominio está disponible en línea.`
          : `⚠️ "${updated.name}" ha sido SUSPENDIDO. Kill-switch activo en Cloudflare.`
      );
    }
  };

  // Obtener credenciales de la bóveda
  const handleGetCredentials = async (businessId: string): Promise<BusinessCredentials | null> => {
    return await panelService.getCredentialsByBusinessId(businessId);
  };

  // Guardar credenciales
  const handleSaveCredentials = async (
    businessId: string,
    credentials: Partial<BusinessCredentials>
  ) => {
    await panelService.saveCredentials({
      business_id: businessId,
      ...credentials,
    });
    showNotification('🔒 Credenciales actualizadas en la bóveda confidencial.');
  };

  // Crear nuevo negocio
  const handleCreateBusiness = async (newBiz: Omit<Business, 'id' | 'created_at'>) => {
    const created = await panelService.createBusiness(newBiz);
    setBusinesses((prev) => [created, ...prev]);
    showNotification(`✨ Negocio "${created.name}" registrado con éxito.`);
  };

  return (
    <div className="space-y-8">
      {/* Notificación flotante / Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-500/30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <Zap className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Cabecera Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            Panel de Clientes & Subdominios
          </h1>
          <p className="text-stone-600 text-sm mt-1">
            Control de suscripciones, kill-switch en el borde y bóveda de cuentas para <span className="font-semibold text-stone-800">qatuweb.com</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadBusinesses}
            className="p-2.5 rounded-xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 transition shadow-sm"
            title="Recargar datos"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium transition shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Nuevo Negocio</span>
          </button>
        </div>
      </div>

      {/* Alerta explicativa de Kill-Switch */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-xs sm:text-sm text-amber-950">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Mecanismo de Kill-Switch Activo con Cloudflare Edge</p>
          <p className="text-amber-800/90 mt-0.5 leading-relaxed">
            Al alternar el interruptor a <strong>Suspendido</strong>, la API actualiza el estado al instante. Cuando un visitante ingrese a cualquier subdominio (<code className="bg-amber-100/70 px-1 py-0.5 rounded text-amber-900 font-mono text-xs">negocio.qatuweb.com</code>), Cloudflare interceptará el tráfico y mostrará la pantalla de corte de servicio sin tocar el código del cliente.
          </p>
        </div>
      </div>

      {/* Tarjetas de Estadísticas */}
      <AdminStatsCards businesses={businesses} />

      {/* Tabla de Negocios */}
      <BusinessTable
        businesses={businesses}
        onToggleStatus={handleToggleStatus}
        onGetCredentials={handleGetCredentials}
        onSaveCredentials={handleSaveCredentials}
      />

      {/* Modal Nuevo Negocio */}
      <NewBusinessModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onCreate={handleCreateBusiness}
      />
    </div>
  );
}
