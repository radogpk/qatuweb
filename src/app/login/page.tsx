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
    <div className="min-h-screen bg-[#F5EFE4] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Barra superior con volver al inicio */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Qatu</span>
        </Link>
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Qatu Hub • v1.0
        </span>
      </header>

      {/* Contenido centrado con LoginForm */}
      <main className="flex items-center justify-center py-10">
        <LoginForm />
      </main>

      {/* Pie de página */}
      <footer className="text-center text-xs text-stone-500 py-4">
        © 2026 Qatu • Plataforma de páginas web y catálogos para negocios locales. Ayacucho, Perú.
      </footer>
    </div>
  );
}
