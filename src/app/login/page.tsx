import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Ingresar | Qatu',
  description: 'Inicia sesión en Qatu para gestionar tus negocios y suscripciones.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]">
      {/* Barra superior con volver al inicio */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Qatu Web</span>
        </Link>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Qatu Hub • Ayacucho
        </span>
      </header>

      {/* Contenido centrado con LoginForm */}
      <main className="flex items-center justify-center py-10">
        <LoginForm />
      </main>

      {/* Pie de página */}
      <footer className="text-center text-xs text-slate-400 py-4">
        © 2026 Qatu Web • Plataforma de páginas web y catálogos para comerciantes de Huamanga, Ayacucho.
      </footer>
    </div>
  );
}
