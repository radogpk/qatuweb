import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  if (error) {
    const redirectUrl = new URL('/login', requestUrl.origin);
    redirectUrl.searchParams.set('error', errorDescription || error);
    return NextResponse.redirect(redirectUrl);
  }

  if (code) {
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

    // Colección de cookies de sesión emitidas por Supabase
    const cookiesToApply: { name: string; value: string; options: any }[] = [];

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach((c) => {
            cookiesToApply.push(c);
            try {
              cookieStore.set(c.name, c.value, c.options);
            } catch {
              // Ignorar contexto de solo lectura
            }
          });
        },
      },
    });

    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('Error al intercambiar código PKCE por sesión:', exchangeError);
      const redirectUrl = new URL('/login', requestUrl.origin);
      redirectUrl.searchParams.set('error', exchangeError.message);
      return NextResponse.redirect(redirectUrl);
    }

    const user = data.user;
    if (user?.email) {
      const cleanEmail = user.email.toLowerCase().trim();

      // Criterio de Super Admin: Correo personal Google oficial y dominios administrativos
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
        cleanEmail.includes('radogpk') ||
        cleanEmail.endsWith('@unsch.edu.pe');

      const targetRole = isSuperAdmin ? 'super_admin' : 'client';
      const destination = isSuperAdmin ? '/dashboard/admin' : '/dashboard/cliente';

      // Crear respuesta de redirección explícita
      const response = NextResponse.redirect(new URL(destination, requestUrl.origin));

      // Adjuntar explícitamente TODAS las cookies de sesión de Supabase al objeto de respuesta
      cookiesToApply.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, {
          ...options,
          path: '/',
          sameSite: 'lax',
          maxAge: options?.maxAge ?? 60 * 60 * 24 * 30, // 30 días
          secure: process.env.NODE_ENV === 'production',
        });
      });

      // Sincronizar cookie de sesión de rol
      response.cookies.set('qatu_role', targetRole, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 días
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });

      return response;
    }
  }

  // Fallback si no hay código
  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}
