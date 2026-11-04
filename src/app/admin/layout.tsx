import React from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';

export const metadata = {
  title: 'Super Admin | Qatu Hub',
  description: 'Panel de administración de clientes, subdominios y kill-switch.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5EFE4] flex flex-col text-stone-900">
      <AdminHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="border-t border-stone-200/80 bg-stone-100/60 py-6 text-center text-xs text-stone-500">
        Qatu Hub Agency • Gestión centralizada de subdominios y suscripciones Cloudflare / Supabase.
      </footer>
    </div>
  );
}
