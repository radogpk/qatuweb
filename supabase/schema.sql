-- =========================================================
-- QATU.PE — Esquema de Base de Datos para Supabase
-- =========================================================

-- Habilitar extensión para UUIDs
create extension if not exists "pgcrypto";

-- 1. TABLA DE NEGOCIOS (Directorio y Subdominios)
create table if not exists public.negocios (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  subdomain text unique not null,
  category text not null check (category in ('restaurante', 'hotel', 'tienda', 'servicios', 'artesania')),
  category_label text not null,
  city text not null default 'Ayacucho',
  short_description text not null,
  long_description text,
  logo_url text not null,
  cover_url text not null,
  featured boolean default false,
  active boolean default true,
  address text,
  phone text,
  whatsapp text,
  instagram text,
  tags text[] default '{}',
  created_at timestamp with time zone default now()
);

-- Índices de búsqueda
create index if not exists idx_negocios_active on public.negocios(active);
create index if not exists idx_negocios_category on public.negocios(category);
create index if not exists idx_negocios_featured on public.negocios(featured);

-- 2. TABLA DE LEADS (Contactos y Solicitudes de Negocios)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  business_name text not null,
  category text,
  phone text not null,
  interested_plan text,
  message text,
  created_at timestamp with time zone default now()
);

-- 3. POLÍTICAS DE SEGURIDAD (RLS)
alter table public.negocios enable row level security;
alter table public.leads enable row level security;

-- Los negocios activos son públicos para lectura de cualquier visitante
create policy "Negocios activos visibles públicamente" 
  on public.negocios 
  for select 
  using (active = true);

-- Cualquier visitante puede enviar un formulario de contacto / lead
create policy "Cualquiera puede registrar un lead" 
  on public.leads 
  for insert 
  with check (true);

-- 4. DATOS INICIALES DE PILOTO (Seed)
insert into public.negocios (
  slug, name, subdomain, category, category_label, city, short_description, long_description,
  logo_url, cover_url, featured, active, address, phone, whatsapp, tags
) values 
(
  'lasflores',
  'Florería Las Flores',
  'lasflores.qatu.pe',
  'tienda',
  'Florería & Regalos',
  'Ayacucho',
  'Arreglos florales exclusivos, detalles personalizados y envíos express a todo Ayacucho.',
  'Negocio familiar emblemático en Ayacucho especializado en arreglos florales frescos para aniversarios, bodas, condolencias y fechas especiales.',
  'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&auto=format&fit=crop&q=80',
  true,
  true,
  'Jr. 28 de Julio 340, Huamanga, Ayacucho',
  '+51 966 876 543',
  '51966876543',
  array['Flores', 'Regalos', 'Delivery', 'Ayacucho']
),
(
  'hotelumaru',
  'Hotel Umaru Ayacucho',
  'hotelumaru.qatu.pe',
  'hotel',
  'Hospedaje Boutique',
  'Ayacucho',
  'Confort, calidez colonial y ubicación privilegiada en el corazón histórico de Ayacucho.',
  'Hotel boutique con habitaciones coloniales modernas, desayuno andino buffet, wifi de alta velocidad y atención personalizada.',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80',
  true,
  true,
  'Jr. Bellido 215, Centro Histórico, Ayacucho',
  '+51 966 321 987',
  '51966321987',
  array['Hotel', 'Hospedaje', 'Turismo', 'Centro Histórico']
)
on conflict (slug) do nothing;
