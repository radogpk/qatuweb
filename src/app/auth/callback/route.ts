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

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignorar si se ejecuta en un contexto de solo lectura
          }
        },
      },
    });

    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
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
        cleanEmail.includes('radogpk');

      const targetRole = isSuperAdmin ? 'super_admin' : 'client';

      // Sincronizar cookie de sesión de rol
      cookieStore.set('qatu_role', targetRole, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 días
        sameSite: 'lax',
      });

      // Redirigir al panel correspondiente
      const destination = isSuperAdmin ? '/dashboard/admin' : '/dashboard/cliente';
      return NextResponse.redirect(new URL(destination, requestUrl.origin));
    }
  }

  // Fallback si no hay código
  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}
