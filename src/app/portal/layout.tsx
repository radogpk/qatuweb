import React from 'react';

export const metadata = {
  title: 'Mi Portal de Negocios | Qatu',
  description: 'Gestiona tus páginas web contratadas y solicita nuevos servicios.',
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5EFE4] flex flex-col text-stone-900">
      {children}
      <footer className="border-t border-stone-200/80 bg-stone-100/60 py-6 text-center text-xs text-stone-500 mt-auto">
        Qatu • Impulsando los negocios locales de Ayacucho. Tus webs activas y conectadas a WhatsApp.
      </footer>
    </div>
  );
}
