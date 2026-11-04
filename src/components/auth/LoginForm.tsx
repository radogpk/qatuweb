'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, UserCheck, Lock } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    // Si Supabase estuviera configurado con variables de entorno reales:
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnon) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseAnon);
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error al conectar con Google OAuth');
        setLoading(false);
      }
    } else {
      // Modo Demo local sin Supabase activo aún
      // Redirige al portal de cliente por defecto tras simular carga breve
      setTimeout(() => {
        router.push('/portal?demo=client');
      }, 700);
    }
  };

  const handleQuickDemoLogin = (role: 'admin' | 'client', email: string) => {
    setLoading(true);
    // Guardar usuario demo simulado en sessionStorage para la sesión actual
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qatu_demo_user', JSON.stringify({ role, email }));
    }
    setTimeout(() => {
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push(`/portal?user=${encodeURIComponent(email)}`);
      }
    }, 400);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200/80 p-8 sm:p-10">
      {/* Cabecera del formulario */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-[#B23A2E] mb-4 border border-amber-200/60 shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
          Ingresar a Qatu
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          Accede al panel de control de tu negocio o administración de suscripciones.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          {error}
        </div>
      )}

      {/* Botón Principal: Google OAuth */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{loading ? 'Iniciando sesión...' : 'Continuar con Google'}</span>
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-stone-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Accesos de Demostración
          </span>
          <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            Modo Local
          </span>
        </div>

        <p className="text-xs text-stone-500 mb-4">
          Mientras configuras tus credenciales oficiales de Supabase en producción, prueba directamente las interfaces con estos perfiles:
        </p>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('admin', 'admin@qatuweb.com')}
            className="w-full flex items-center justify-between p-3 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition text-sm font-medium text-left"
          >
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-amber-400" />
              <div>
                <p className="font-semibold text-xs sm:text-sm">Super Admin (Luis)</p>
                <p className="text-xs text-stone-400">Control total, Kill-switch y Bóveda</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemoLogin('client', 'lucas.ayacucho@gmail.com')}
            className="w-full flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl transition text-sm font-medium text-left text-stone-800"
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-[#B23A2E]" />
              <div>
                <p className="font-semibold text-xs sm:text-sm">Cliente: Lucas Mendoza</p>
                <p className="text-xs text-stone-500">2 negocios (Calzados & Abarrotes)</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemoLogin('client', 'maria.pasteleria@gmail.com')}
            className="w-full flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl transition text-sm font-medium text-left text-stone-800"
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-[#B23A2E]" />
              <div>
                <p className="font-semibold text-xs sm:text-sm">Cliente: María Quispe</p>
                <p className="text-xs text-stone-500">Pastelería Huamanga (Anual S/. 300)</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
