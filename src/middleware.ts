import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Interceptar /dashboard genérico y enrutar según el rol
  if (pathname === '/dashboard') {
    const roleCookie = request.cookies.get('qatu_role')?.value;

    if (roleCookie === 'super_admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard/cliente', request.url));
  }

  // Protección de rutas /dashboard/*
  if (pathname.startsWith('/dashboard/admin')) {
    const roleCookie = request.cookies.get('qatu_role')?.value;
    
    // Si explícitamente es cliente, no permitir entrar a /admin
    if (roleCookie === 'client') {
      return NextResponse.redirect(new URL('/dashboard/cliente', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};
