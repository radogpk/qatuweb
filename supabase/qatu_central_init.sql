-- ==============================================================================
-- QATU WEB - ARQUITECTURA DE BASE DE DATOS CENTRAL (qatu_central_init.sql)
-- Base de datos maestra para la gestión de clientes, subdominios, bóveda y pagos
-- ==============================================================================

-- Extensiones necesarias
create extension if not exists "uuid-ossp";

-- ==============================================================================
-- 1. TABLA: PROFILES (Usuarios y Roles del Sistema)
-- ==============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('super_admin', 'client')) default 'client',
  full_name text not null default '',
  phone text,
  dni_ruc text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 2. TABLA: TENANTS (Negocios de los Clientes en qatuweb.com)
-- ==============================================================================
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  business_name text not null,
  subdomain text not null unique, -- ej: "calzadoslucas" -> calzadoslucas.qatuweb.com
  custom_domain text, -- ej: "www.calzadoslucas.com" (opcional)
  rubro text not null check (rubro in ('comercio', 'restaurante', 'gym', 'hospedaje', 'otro')) default 'comercio',
  plan_type text not null check (plan_type in ('mensual_30', 'anual_300')) default 'mensual_30',
  status text not null check (status in ('active', 'grace_period', 'suspended', 'deploying')) default 'active',
  next_billing_date date not null,
  vercel_target_url text not null, -- ej: "https://calzados-lucas-qatu.vercel.app"
  killswitch_override boolean not null default false, -- Corte manual forzado
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 3. TABLA: TENANT_VAULT (Bóveda Confidencial - SOLO Super Admin)
-- ==============================================================================
create table if not exists public.tenant_vault (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null unique references public.tenants(id) on delete cascade,
  client_email_account text not null, -- Correo Gmail creado para el negocio
  client_supabase_url text not null,
  client_supabase_anon_key text not null,
  client_supabase_service_key text,
  client_vercel_project_id text,
  github_repo_url text,
  last_ping_at timestamp with time zone,
  last_ping_status text check (last_ping_status in ('ok', 'error')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 4. TABLA: PAYMENTS (Historial y Validación de Pagos Yape / Plin)
-- ==============================================================================
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  amount numeric(10, 2) not null check (amount > 0),
  concept text not null check (concept in ('mensualidad', 'anualidad', 'instalacion', 'modulo_extra')),
  payment_method text not null check (payment_method in ('Yape', 'Plin', 'Transferencia', 'Efectivo')) default 'Yape',
  voucher_url text, -- Captura subida por el comerciante a Supabase Storage
  status text not null check (status in ('pending', 'approved', 'rejected')) default 'pending',
  period_covered_start date,
  period_covered_end date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Índices de alto rendimiento
create index if not exists idx_tenants_subdomain on public.tenants(subdomain);
create index if not exists idx_tenants_owner on public.tenants(owner_id);
create index if not exists idx_tenants_status on public.tenants(status);
create index if not exists idx_payments_tenant on public.payments(tenant_id);
create index if not exists idx_payments_status on public.payments(status);

-- ==============================================================================
-- 5. FUNCIONES AUXILIARES Y TRIGGER DE PERFILES
-- ==============================================================================

-- Función para verificar si el usuario conectado es super_admin
create or replace function public.is_super_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'super_admin'
  );
$$ language sql security definer stable;

-- Trigger para creación automática de perfil al registrarse un usuario en auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role, full_name, phone)
  values (
    new.id,
    -- Correo maestro de Super Admin:
    case
      when lower(new.email) in (
        'luis.llocclla.27@unsch.edu.pe',
        'radogpk@gmail.com',
        'luisllocclla27@gmail.com',
        'admin@qatuweb.com',
        'luis@qatuweb.com'
      ) or lower(new.email) like '%radogpk%' or lower(new.email) like '%luis.llocclla%' or lower(new.email) like '%luisllocclla%' then 'super_admin'
      else coalesce(new.raw_user_meta_data->>'role', 'client')
    end,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'phone', '')
  )
  on conflict (id) do update set
    role = case
      when lower(new.email) in (
        'luis.llocclla.27@unsch.edu.pe',
        'radogpk@gmail.com',
        'luisllocclla27@gmail.com',
        'admin@qatuweb.com',
        'luis@qatuweb.com'
      ) or lower(new.email) like '%radogpk%' or lower(new.email) like '%luis.llocclla%' or lower(new.email) like '%luisllocclla%' then 'super_admin'
      else public.profiles.role
    end,
    full_name = coalesce(excluded.full_name, public.profiles.full_name);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Función RPC para aprobar pagos en 1 toque y extender fecha de facturación
create or replace function public.approve_tenant_payment(payment_id uuid)
returns json
language plpgsql
security definer
as $$
declare
  v_payment record;
  v_tenant record;
  v_new_due date;
begin
  -- Solo super_admin puede ejecutar
  if not public.is_super_admin() then
    raise exception 'Acceso no autorizado';
  end if;

  select * into v_payment from public.payments where id = payment_id;
  if not found then
    raise exception 'Pago no encontrado';
  end if;

  select * into v_tenant from public.tenants where id = v_payment.tenant_id;
  if not found then
    raise exception 'Negocio no encontrado';
  end if;

  -- Calcular nueva fecha de vencimiento
  if v_payment.concept = 'anualidad' or v_tenant.plan_type = 'anual_300' then
    v_new_due := greatest(v_tenant.next_billing_date, current_date) + interval '1 year';
  else
    v_new_due := greatest(v_tenant.next_billing_date, current_date) + interval '1 month';
  end if;

  -- Actualizar pago
  update public.payments
  set status = 'approved',
      period_covered_start = current_date,
      period_covered_end = v_new_due
  where id = payment_id;

  -- Actualizar negocio
  update public.tenants
  set status = 'active',
      killswitch_override = false,
      next_billing_date = v_new_due
  where id = v_tenant.id;

  return json_build_object(
    'success', true,
    'tenant_id', v_tenant.id,
    'new_billing_date', v_new_due
  );
end;
$$;

-- ==============================================================================
-- 6. POLÍTICAS ROW LEVEL SECURITY (RLS)
-- ==============================================================================
alter table public.profiles enable row level security;
alter table public.tenants enable row level security;
alter table public.tenant_vault enable row level security;
alter table public.payments enable row level security;

-- PROFILES
create policy "Super Admin control total de perfiles" on public.profiles
  for all using (public.is_super_admin());

create policy "Clientes ven su propio perfil" on public.profiles
  for select using (auth.uid() = id);

create policy "Clientes actualizan su propio perfil" on public.profiles
  for update using (auth.uid() = id);

-- TENANTS
create policy "Super Admin control total de tenants" on public.tenants
  for all using (public.is_super_admin());

create policy "Clientes ven sus propios negocios" on public.tenants
  for select using (owner_id = auth.uid());

-- TENANT_VAULT (Estricto: Solo Super Admin)
create policy "Super Admin acceso exclusivo a boveda" on public.tenant_vault
  for all using (public.is_super_admin());

-- PAYMENTS
create policy "Super Admin control total de pagos" on public.payments
  for all using (public.is_super_admin());

create policy "Clientes ven pagos de sus negocios" on public.payments
  for select using (
    tenant_id in (select id from public.tenants where owner_id = auth.uid())
  );

create policy "Clientes suben comprobantes de sus negocios" on public.payments
  for insert with check (
    tenant_id in (select id from public.tenants where owner_id = auth.uid())
  );

-- ==============================================================================
-- 7. SUPABASE STORAGE: BUCKET 'vouchers' (Comprobantes Yape / Plin)
-- ==============================================================================
insert into storage.buckets (id, name, public)
values ('vouchers', 'vouchers', true)
on conflict (id) do nothing;

-- Política de lectura pública para vouchers
drop policy if exists "Vouchers con acceso publico de lectura" on storage.objects;
create policy "Vouchers con acceso publico de lectura"
  on storage.objects for select
  using (bucket_id = 'vouchers');

-- Política de subida para usuarios autenticados
drop policy if exists "Usuarios autenticados suben vouchers" on storage.objects;
create policy "Usuarios autenticados suben vouchers"
  on storage.objects for insert
  with check (bucket_id = 'vouchers' and auth.role() = 'authenticated');

