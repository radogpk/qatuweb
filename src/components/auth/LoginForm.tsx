'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, UserCheck, Lock, Mail, KeyRound, Smartphone } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'password' | 'quick'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Si Supabase está conectado
    if (supabaseUrl && supabaseAnon && !supabaseUrl.includes('placeholder')) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseAnon);
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) throw authError;

        // Comprobar rol de super_admin
        const cleanEmail = email.toLowerCase().trim();
        const isSuperAdmin =
          cleanEmail.includes('admin') ||
          cleanEmail.includes('luis') ||
          cleanEmail.includes('llocclla') ||
          cleanEmail.includes('radogpk');
        document.cookie = `qatu_role=${isSuperAdmin ? 'super_admin' : 'client'}; path=/; max-age=2592000`; // 30 días

        if (isSuperAdmin) {
          router.push('/dashboard/admin');
        } else {
          router.push('/dashboard/cliente');
        }
        return;
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error al verificar credenciales');
        setLoading(false);
        return;
      }
    }

    // Fallback de demostración local
    setTimeout(() => {
      const cleanEmail = email.toLowerCase().trim();
      const isSuperAdmin =
        cleanEmail.includes('admin') ||
        cleanEmail.includes('luis') ||
        cleanEmail.includes('llocclla') ||
        cleanEmail.includes('radogpk');
      document.cookie = `qatu_role=${isSuperAdmin ? 'super_admin' : 'client'}; path=/; max-age=2592000`;

      if (isSuperAdmin) {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/cliente');
      }
    }, 500);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnon && !supabaseUrl.includes('placeholder')) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseAnon);
        const { error: oAuthError } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (oAuthError) throw oAuthError;
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error al conectar con Google OAuth');
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        document.cookie = `qatu_role=client; path=/; max-age=2592000`;
        router.push('/dashboard/cliente');
      }, 500);
    }
  };

  const handleQuickRoleSelect = (role: 'super_admin' | 'client') => {
    setLoading(true);
    document.cookie = `qatu_role=${role}; path=/; max-age=2592000`;

    setTimeout(() => {
      if (role === 'super_admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/cliente');
      }
    }, 300);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-stone-200/80 p-6 sm:p-8">
      {/* Cabecera */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-50 text-[#B23A2E] mb-3 border border-amber-200/60 shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
          Ingresar a Qatu Web
        </h1>
        <p className="mt-1 text-xs text-stone-500">
          Hub de gobernanza y portal para comerciantes en Ayacucho
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
          {error}
        </div>
      )}

      {/* Pestañas: Contraseña / Acceso Rápido */}
      <div className="grid grid-cols-2 bg-stone-100 p-1 rounded-2xl mb-5 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('password')}
          className={`py-2 rounded-xl transition ${
            activeTab === 'password'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Correo y Clave
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('quick')}
          className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'quick'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-600" />
          <span>Acceso Rápido</span>
        </button>
      </div>

      {activeTab === 'password' ? (
        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-400" /> Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu-correo@gmail.com o admin@qatuweb.com"
              className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-stone-400" /> Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition"
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-stone-500 text-center leading-relaxed">
            Sesión persistente de larga duración para acceder directamente desde tu celular.
          </p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs sm:text-sm rounded-xl shadow-sm transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continuar con Google</span>
          </button>
        </div>
      )}

      {/* Atajos Rápidos de Demostración Local */}
      <div className="mt-6 pt-5 border-t border-stone-200 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block text-center">
          Atajos Rápidos de Demostración
        </span>

        <button
          type="button"
          onClick={() => handleQuickRoleSelect('super_admin')}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition text-left"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Super Admin (Gobernanza Qatu)</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
        </button>

        <button
          type="button"
          onClick={() => handleQuickRoleSelect('client')}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-xs font-semibold hover:bg-stone-100 transition text-left"
        >
          <div className="flex items-center gap-2">
            <UserCheck className="w-3.5 h-3.5 text-[#B23A2E]" />
            <span>Cliente Comerciante (Calzados Lucas)</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
        </button>
      </div>
    </div>
  );
}
