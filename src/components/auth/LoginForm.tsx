'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      try {
        setError(decodeURIComponent(errorParam));
      } catch {
        setError(errorParam);
      }
    }

    const isLoggedOut = searchParams.get('logged_out') === 'true';
    if (isLoggedOut) {
      setSuccessMessage('Has cerrado sesión correctamente. Puedes volver a ingresar cuando gustes.');
      return;
    }

    // Si ya existe sesión activa de Google/Supabase y no viene de cerrar sesión, redirigir
    const checkActiveSession = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user?.email) {
          const cleanEmail = user.email.toLowerCase().trim();
          const isSuperAdmin =
            cleanEmail === 'luisgerardolloccllasaune@gmail.com' ||
            cleanEmail.includes('luis.llocclla') ||
            cleanEmail.endsWith('@unsch.edu.pe');

          document.cookie = `qatu_role=${isSuperAdmin ? 'super_admin' : 'client'}; path=/; max-age=2592000; SameSite=Lax`;
          router.replace(isSuperAdmin ? '/dashboard/admin' : '/dashboard/cliente');
        }
      } catch {
        // Ignorar
      }
    };
    checkActiveSession();
  }, [searchParams, router]);

  // Manejo de inicio de sesión con correo y contraseña
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        throw authError;
      }

      const cleanEmail = (data.user?.email || email).toLowerCase().trim();
      const isSuperAdmin =
        cleanEmail === 'luisgerardolloccllasaune@gmail.com' ||
        cleanEmail === 'admin@qatuweb.com' ||
        cleanEmail === 'luis@qatuweb.com' ||
        cleanEmail === 'radogpk@gmail.com' ||
        cleanEmail === 'luisllocclla27@gmail.com' ||
        cleanEmail.includes('luisgerardo') ||
        cleanEmail.includes('lloccllasaune') ||
        cleanEmail.includes('luis.llocclla') ||
        cleanEmail.includes('luisllocclla') ||
        cleanEmail.includes('radogpk');

      // Asignar cookie de rol para el middleware de navegación
      document.cookie = `qatu_role=${isSuperAdmin ? 'super_admin' : 'client'}; path=/; max-age=2592000; SameSite=Lax`;

      setSuccessMessage('Acceso verificado. Redirigiendo a tu panel...');

      setTimeout(() => {
        if (isSuperAdmin) {
          router.push('/dashboard/admin');
        } else {
          router.push('/dashboard/cliente');
        }
      }, 500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al verificar credenciales';
      if (msg.includes('Invalid login credentials')) {
        setError('El correo o la contraseña son incorrectos. Por favor verifica tus datos.');
      } else {
        setError(msg);
      }
      setLoading(false);
    }
  };

  // Manejo de inicio de sesión con Google OAuth
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const redirectUri = `${origin}/auth/callback`;

      const { error: oAuthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUri,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (oAuthError) {
        throw oAuthError;
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al conectar con Google OAuth');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 sm:p-8 transition-all">
      {/* Cabecera de autenticación */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-950 text-emerald-400 mb-3 border border-slate-800 shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Iniciar Sesión en Qatu
        </h1>
        <p className="mt-1 text-xs text-slate-500 font-medium">
          Accede al panel de tu negocio o a la consola central de gobernanza
        </p>
      </div>

      {/* Alerta de Error */}
      {error && (
        <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl font-medium flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      {/* Alerta de Éxito */}
      {successMessage && (
        <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Botón de Google OAuth */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl shadow-xs transition disabled:opacity-60 cursor-pointer"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
          )}
          <span>{googleLoading ? 'Conectando con Google...' : 'Continuar con Google'}</span>
        </button>

        {/* Separador */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider relative">
            o con tu correo
          </span>
        </div>

        {/* Formulario Correo y Contraseña */}
        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Correo Electrónico</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu-correo@negocio.com"
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:bg-white text-slate-900 outline-none transition placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                <span>Contraseña</span>
              </label>
              <a
                href="https://wa.me/51941663265?text=Hola%20Qatu%20Web,%20necesito%20asistencia%20para%20recuperar%20el%20acceso%20a%20mi%20cuenta"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition"
              >
                ¿Olvidaste tu clave?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:bg-white text-slate-900 outline-none transition placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 active:bg-slate-900 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verificando...</span>
              </>
            ) : (
              <>
                <span>Ingresar al Portal</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Nota de Seguridad y Soporte */}
      <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
        ¿Eres un comerciante nuevo en Huamanga?{' '}
        <a
          href="https://wa.me/51941663265?text=Hola%20Qatu%20Web,%20quiero%20crear%20mi%20p%C3%A1gina%20web"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-slate-900 hover:underline inline-flex items-center gap-1"
        >
          Solicita tu web aquí
        </a>
      </div>
    </div>
  );
}
