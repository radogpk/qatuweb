'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Business, ServiceRequest } from '@/types/panel';
import { panelService } from '@/lib/services/panel.service';
import { ClientHeader } from '@/components/portal/ClientHeader';
import { ClientBusinessCard } from '@/components/portal/ClientBusinessCard';
import { RequestServiceModal } from '@/components/portal/RequestServiceModal';
import { Sparkles, PlusCircle, Store, Zap } from 'lucide-react';

function PortalContent() {
  const searchParams = useSearchParams();
  const queryUser = searchParams.get('user');

  // Si no se pasa query param, por defecto usamos a Lucas Mendoza para la demostración
  const [currentUser, setCurrentUser] = useState({
    id: 'user-client-1',
    email: queryUser || 'lucas.ayacucho@gmail.com',
    name: queryUser?.includes('maria') ? 'María Quispe' : 'Lucas Mendoza',
  });

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const loadClientBusinesses = async (email: string) => {
    setLoading(true);
    try {
      const data = await panelService.getBusinessesByOwner(email);
      setBusinesses(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const email = queryUser || 'lucas.ayacucho@gmail.com';
    const name = email.includes('maria') ? 'María Quispe' : 'Lucas Mendoza';
    setCurrentUser({
      id: email.includes('maria') ? 'user-client-2' : 'user-client-1',
      email,
      name,
    });
    loadClientBusinesses(email);
  }, [queryUser]);

  const handleRequestNewService = async (req: Omit<ServiceRequest, 'id' | 'created_at' | 'status'>) => {
    await panelService.createServiceRequest(req);
    setNotification('🎉 Solicitud registrada. Nos comunicaremos contigo muy pronto.');
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div>
      <ClientHeader clientName={currentUser.name} clientEmail={currentUser.email} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {notification && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm px-5 py-3 rounded-2xl flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>{notification}</span>
          </div>
        )}

        {/* Bienvenida y botón solicitar nueva web */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Mis Negocios & Páginas Web
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Aquí puedes ver tus páginas web activas, enlaces a tus paneles de venta y el estado de tu suscripción.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#B23A2E] hover:bg-[#962f25] text-white text-sm font-medium transition shadow-sm hover:shadow"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>Solicitar Otra Web</span>
          </button>
        </div>

        {/* Lista de negocios */}
        {loading ? (
          <div className="py-20 text-center text-stone-500 text-sm">
            Cargando tus negocios...
          </div>
        ) : businesses.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-stone-200">
            <Store className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-stone-800">No tienes negocios registrados</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Si acabas de contratar tu web con Qatu, estamos configurándola. También puedes solicitar una haciendo clic en el botón superior.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businesses.map((biz) => (
              <ClientBusinessCard key={biz.id} business={biz} />
            ))}
          </div>
        )}

        {/* Banner de soporte y aviso para solicitar cambios */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Soporte Continuo Incluido
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
              ¿Deseas agregar más fotos, actualizar precios o cambiar tu logo?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Tu mensualidad de S/. 30 incluye soporte permanente. Escríbenos por WhatsApp y nuestros agentes actualizarán tu web de inmediato.
            </p>
          </div>

          <a
            href="https://wa.me/51966123456?text=Hola,%20deseo%20actualizar%20informaci%C3%B3n%20de%20mi%20p%C3%A1gina%20web"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-bold transition shadow-sm"
          >
            Escribir a Soporte
          </a>
        </div>
      </main>

      {/* Modal para solicitar nueva web */}
      <RequestServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clientId={currentUser.id}
        clientEmail={currentUser.email}
        clientName={currentUser.name}
        onRequest={handleRequestNewService}
      />
    </div>
  );
}

export default function PortalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F5EFE4] text-stone-600 text-sm">
          Cargando Portal de Clientes...
        </div>
      }
    >
      <PortalContent />
    </Suspense>
  );
}
