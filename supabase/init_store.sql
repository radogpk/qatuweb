-- ==============================================================================
-- PLANTILLA BASE STOREFRONT - QATU WEB (init_store.sql)
-- Base de datos aislada para el Tier Gratuito de cada cliente
-- ==============================================================================

-- 1. TABLA: Categorías del catálogo
create table if not exists public.categorias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  orden integer default 0,
  activo boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. TABLA: Productos con Variantes en JSONB (Tallas, Sabores, Medidas)
create table if not exists public.productos (
  id uuid primary key default gen_random_uuid(),
  categoria_id uuid references public.categorias(id) on delete set null,
  nombre text not null,
  descripcion text,
  precio numeric(10, 2) not null,
  precio_oferta numeric(10, 2),
  imagen_url text not null,
  -- Variantes guardadas en formato flexible: ej. ["36", "37", "38", "39"] o [{"nombre": "38", "disponible": true}]
  variantes jsonb default '[]'::jsonb,
  disponible boolean default true,
  destacado boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. TABLA: Log de Pedidos (El Candado de Retención Qatu)
create table if not exists public.pedidos_log (
  id uuid primary key default gen_random_uuid(),
  cliente_nombre text not null,
  cliente_telefono text,
  tipo_entrega text not null default 'tienda', -- 'tienda' o 'delivery'
  direccion_entrega text,
  metodo_pago text not null default 'Yape', -- 'Yape', 'Plin', 'Efectivo'
  items jsonb not null, -- Array con productos, variantes, cantidades y subtotales
  total numeric(10, 2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Índices para consultas ultrarrápidas en móviles
create index if not exists idx_productos_categoria on public.productos(categoria_id);
create index if not exists idx_productos_disponible on public.productos(disponible);
create index if not exists idx_pedidos_created_at on public.pedidos_log(created_at);

-- ==============================================================================
-- 4. POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)
-- ==============================================================================
alter table public.categorias enable row level security;
alter table public.productos enable row level security;
alter table public.pedidos_log enable row level security;

-- PÚBLICO (Clientes y visitantes)
create policy "Categorias publicas" on public.categorias
  for select using (activo = true);

create policy "Productos publicos disponibles" on public.productos
  for select using (disponible = true);

create policy "Insertar pedidos desde web" on public.pedidos_log
  for insert with check (true);

-- ADMINISTRADOR DEL NEGOCIO (Autenticado en /admin del cliente)
create policy "Admin todo categorias" on public.categorias
  for all to authenticated using (true) with check (true);

create policy "Admin todo productos" on public.productos
  for all to authenticated using (true) with check (true);

create policy "Admin leer pedidos" on public.pedidos_log
  for select to authenticated using (true);

-- ==============================================================================
-- 5. FUNCIÓN RPC DE RETENCIÓN: ROI Mensual para el Comerciante
-- Devuelve al instante: { "total_pedidos": 42, "monto_total": 2850.00 }
-- ==============================================================================
create or replace function public.obtener_resumen_mes()
returns json
language sql
security definer
as $$
  select json_build_object(
    'total_pedidos', count(*),
    'monto_total', coalesce(sum(total), 0)
  )
  from public.pedidos_log
  where created_at >= date_trunc('month', now());
$$;
