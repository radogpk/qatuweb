# 📖 Guía Completa de Instalación, Configuración y Ejecución — Qatu SaaS Hub

Esta guía contiene todos los pasos necesarios para configurar y desplegar el sistema cuando decidas activar los servicios en **Supabase**, **Cloudflare**, **Google Cloud** y **Vercel**.

---

## Índice
1. [Esquema y Migración en Supabase (SQL)](#1-esquema-y-migración-en-supabase-sql)
2. [Configuración de Google OAuth en Supabase](#2-configuración-de-google-oauth-en-supabase)
3. [Configuración de Cloudflare y Kill-Switch](#3-configuración-de-cloudflare-y-kill-switch)
4. [Variables de Entorno (`.env.local`)](#4-variables-de-entorno-envlocal)
5. [Ejecución y Comprobación Local](#5-ejecución-y-comprobación-local)

---

## 1. Esquema y Migración en Supabase (SQL)

Copia y pega este script en el **SQL Editor** de tu proyecto Supabase para crear las tablas, relaciones, disparadores y políticas de seguridad (RLS):

```sql
-- ==============================================================================
-- 1. EXTENSIONES Y TABLAS PRINCIPALES
-- ==============================================================================

-- Tabla de perfiles vinculada a auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  phone text,
  role text not null default 'client' check (role in ('admin', 'client')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabla de negocios gestionados
create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  name text not null,
  slug text not null unique,
  target_url text not null,
  custom_admin_url text,
  status text not null default 'active' check (status in ('active', 'suspended', 'grace')),
  plan text not null default 'monthly' check (plan in ('monthly', 'yearly')),
  price numeric(10, 2) not null default 30.00,
  currency text not null default 'PEN',
  billing_cycle_day integer default 1,
  next_due_date date not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bóveda de credenciales confidenciales (Solo visible por Super Admin)
create table if not exists public.business_credentials (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null unique references public.businesses(id) on delete cascade,
  gmail_account text,
  gmail_password_encrypted text,
  recovery_phone text,
  github_repo_url text,
  vercel_project_url text,
  supabase_project_url text,
  supabase_anon_key text,
  extra_notes text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Solicitudes de nuevos negocios o servicios hechas por clientes
create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  business_name text not null,
  business_type text not null,
  phone_contact text not null,
  details text,
  status text not null default 'pending' check (status in ('pending', 'contacted', 'completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 2. TRIGGER PARA CREACIÓN AUTOMÁTICA DE PERFIL AL INICIAR CON GOOGLE
-- ==============================================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', ''),
    -- Si el correo coincide con tu correo de administrador principal, se le asigna rol admin:
    case when new.email = 'tu-correo-admin@gmail.com' then 'admin' else 'client' end
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url);
  return new;
end;
$$ language plpgsql security definer;

-- Activar el trigger en auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==============================================================================
-- 3. POLÍTICAS DE SEGURIDAD ROW LEVEL SECURITY (RLS)
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.business_credentials enable row level security;
alter table public.service_requests enable row level security;

-- Función de ayuda para saber si el usuario actual es admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Políticas de PROFILES
create policy "Usuarios ven su propio perfil" on public.profiles
  for select using (auth.uid() = id);

create policy "Admins gestionan todos los perfiles" on public.profiles
  for all using (public.is_admin());

-- Políticas de BUSINESSES
create policy "Clientes ven sus negocios asignados" on public.businesses
  for select using (owner_id = auth.uid());

create policy "Admins tienen acceso total a negocios" on public.businesses
  for all using (public.is_admin());

-- Políticas de BUSINESS_CREDENTIALS (Estricto: Solo Admin)
create policy "Solo admin accede a credenciales" on public.business_credentials
  for all using (public.is_admin());

-- Políticas de SERVICE_REQUESTS
create policy "Clientes crean y ven sus solicitudes" on public.service_requests
  for all using (client_id = auth.uid());

create policy "Admins ven y gestionan solicitudes" on public.service_requests
  for all using (public.is_admin());
```

---

## 2. Configuración de Google OAuth en Supabase

1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un proyecto (ej: `Qatu Web`).
3. Ve a **APIs & Services > OAuth consent screen**:
   - Tipo de usuario: **External**.
   - Nombre de la app: `Qatu Web`.
   - Correo de soporte y desarrollador: tu correo.
4. Ve a **Credentials > Create Credentials > OAuth client ID**:
   - Application type: **Web application**.
   - Name: `Supabase Auth Client`.
   - En **Authorized redirect URIs**, agrega la URL de tu proyecto Supabase:  
     `https://<TU-PROJECT-ID>.supabase.co/auth/v1/callback`
5. Copia el **Client ID** y **Client Secret**.
6. En tu panel de **Supabase**:
   - Ve a **Authentication > Providers > Google**.
   - Activa el toggle **Enable Google**.
   - Pega el **Client ID** y **Client Secret**.
   - Guarda los cambios.

---

## 3. Configuración de Cloudflare y Kill-Switch

Para que los subdominios `*.qatuweb.com` apunten automáticamente a Vercel con Kill-Switch:

### A. Registro DNS Wildcard en Cloudflare
- En el panel de Cloudflare para `qatuweb.com`, ve a **DNS > Records**:
  - **Type:** `CNAME`
  - **Name:** `*` (comodín)
  - **Target:** `cname.vercel-dns.com`
  - **Proxy status:** `Proxied` (Nube naranja activada ☁️)

### B. Código del Cloudflare Worker para el Kill-Switch
Crea un Cloudflare Worker y asígnalo a la ruta `*.qatuweb.com/*`:

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const hostname = url.hostname; // ej: calzados-lucas.qatuweb.com
    const parts = hostname.split('.');

    // Si es el dominio principal (qatuweb.com o www.qatuweb.com), dejar pasar normalmente
    if (parts.length <= 2 || parts[0] === 'www') {
      return fetch(request);
    }

    const subdomainSlug = parts[0];

    // Consultar el estado en la API de Qatu (con cacheo rápido de 60s)
    try {
      const apiResponse = await fetch(`https://qatuweb.com/api/domain-status?slug=${subdomainSlug}`, {
        cf: { cacheTtl: 60 }
      });
      const data = await apiResponse.json();

      if (!data.found || data.status === 'suspended') {
        // Pantalla de suspensión elegante
        return new Response(`
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Sitio en Mantenimiento | Qatu</title>
            <style>
              body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; padding: 20px; }
              .box { max-width: 480px; background: #1e293b; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); border: 1px solid #334155; }
              h1 { font-size: 24px; margin-bottom: 12px; color: #f59e0b; }
              p { color: #94a3b8; font-size: 15px; line-height: 1.6; }
              .btn { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; }
            </style>
          </head>
          <body>
            <div class="box">
              <h1>Sitio temporalmente suspendido</h1>
              <p>Este sitio web se encuentra en mantenimiento o pausado por su administrador.</p>
              <p>Si eres el propietario del negocio, ingresa a tu panel de cliente o contáctanos por WhatsApp para reactivarlo.</p>
              <a href="https://wa.me/51999999999?text=Hola,%20deseo%20reactivar%20mi%20web" class="btn">Contactar a Soporte</a>
            </div>
          </body>
          </html>
        `, {
          status: 402,
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }

      // Si está activo, redirigir / hacer proxy al target_url de Vercel
      if (data.target_url) {
        const targetUrl = new URL(data.target_url);
        url.hostname = targetUrl.hostname;
        return fetch(new Request(url.toString(), request));
      }
    } catch (e) {
      // En caso de fallo de red, se permite el paso por seguridad
      return fetch(request);
    }

    return fetch(request);
  }
};
```

---

## 4. Variables de Entorno (`.env.local`)

Crea un archivo `.env.local` en la raíz de `qatupe` con los siguientes valores:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://<TU-PROJECT-ID>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui

# URL de la aplicación principal
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Clave secreta para cifrado AES-256 de credenciales (32 caracteres)
ENCRYPTION_SECRET=clave_secreta_super_admin_32_bytes!

# Correo de Super Administrador (coincide con el trigger de Supabase)
ADMIN_EMAIL=tu-correo-admin@gmail.com
```

---

## 5. Ejecución y Comprobación Local

1. Instalar dependencias necesarias (si no están instaladas):
   ```bash
   npm install
   ```
2. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Visitar en el navegador:
   - Portada: `http://localhost:3000`
   - Iniciar Sesión con Google: `http://localhost:3000/login`
   - Panel Super Admin: `http://localhost:3000/admin`
   - Portal Cliente: `http://localhost:3000/portal`
   - Endpoint de verificación: `http://localhost:3000/api/domain-status?slug=demo`
