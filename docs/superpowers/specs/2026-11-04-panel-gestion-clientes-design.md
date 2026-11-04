# Diseño: Panel de Gestión de Clientes, Suscripciones y Kill-Switch para Qatu

**Fecha:** 2026-11-04  
**Dominio:** `qatuweb.com`  
**Estado:** Aprobado / En fase de especificación y arquitectura

---

## 1. Visión y Modelo de Negocio

- **Propósito:** Ofrecer páginas y aplicaciones web a medida para pequeños negocios locales (inicialmente en Ayacucho, Perú) a un costo accesible de **S/. 30 mensuales** (o **S/. 300 anuales**).
- **Independencia de Tiendas:** Cada cliente cuenta con su propia solución a medida (su propio repositorio en GitHub, despliegue en Vercel y base de datos Supabase independiente con su sistema de catálogo, caja o personal).
- **Rol del Hub Central (Qatu):**
  - **Super Admin (Agencia):** Centralizar la administración de clientes, subdominios (`*.qatuweb.com`), bóveda de credenciales técnicas seguras (Gmail, GitHub, Vercel, Supabase), fechas de cobro y **Kill-switch instantáneo**.
  - **Portal del Cliente:** Autenticación única mediante **Google OAuth**. El cliente accede y visualiza los negocios que tiene contratados con Qatu, sus enlaces directos (tienda pública y panel propio), estado de su suscripción y opción de solicitar nuevos servicios.

---

## 2. Arquitectura del Sistema

```
[ Cliente Final / Visitante ] 
             │
             ▼
   panaderia.qatuweb.com
             │
             ▼
 [ Cloudflare Worker (*.qatuweb.com) ]
             │
             ├─► Consulta API / Supabase: ¿Estado de 'panaderia'?
             │
    ┌────────┴────────┐
    ▼                 ▼
[ ACTIVO ]       [ SUSPENDIDO ]
    │                 │
    ▼                 ▼
Proxy hacia      Muestra pantalla
Vercel App       de suspensión y
(cliente.vercel) pago de soporte
```

### Componentes Técnicos
1. **Next.js App Router (Monorepo en `qatupe`):**
   - `src/app/(marketing)`: Portada comercial pública, planes y contacto de Qatu.
   - `src/app/(auth)/login`: Login unificado con botón "Continuar con Google" (OAuth de Supabase).
   - `src/app/(admin)/admin`: Panel privado para el Super Admin.
   - `src/app/(portal)/portal`: Dashboard para clientes.
   - `src/app/api/domain-status`: API de ultra-baja latencia consultada por Cloudflare.
2. **Supabase Central (Auth + Postgres + RLS):**
   - Manejo de identidades vía Google OAuth.
   - RLS estricto: El cliente solo puede leer registros asociados a su `owner_id`.
   - Bóveda de credenciales protegida exclusivamente para el Super Admin.
3. **Cloudflare Edge Worker:**
   - Intercepta el tráfico comodín `*.qatuweb.com`.
   - Ejecuta el Kill-switch en el borde (edge) sin posibilidad de evasión.

---

## 3. Modelo de Datos (Esquema SQL)

### Tabla `profiles`
Extensión del usuario autenticado en `auth.users`:
- `id`: `uuid` (PK, referencia a `auth.users.id`).
- `email`: `text` (Google email).
- `full_name`: `text`.
- `avatar_url`: `text`.
- `phone`: `text` (WhatsApp del cliente).
- `role`: `text` (`'admin'` o `'client'`).
- `created_at`: `timestamptz`.

### Tabla `businesses`
Registro de cada negocio gestionado:
- `id`: `uuid` (PK).
- `owner_id`: `uuid` (FK a `profiles.id`, nullable si aún no se ha vinculado el cliente).
- `name`: `text` (ej. "Calzados Lucas").
- `slug`: `text` (único, ej. "calzados-lucas" -> subdominio `calzados-lucas.qatuweb.com`).
- `target_url`: `text` (URL de Vercel ej. `https://calzados-lucas.vercel.app`).
- `custom_admin_url`: `text` (URL donde el cliente administra su propia tienda).
- `status`: `text` (`'active'`, `'suspended'`, `'grace'`).
- `plan`: `text` (`'monthly'`, `'yearly'`).
- `price`: `numeric(10, 2)` (default `30.00`).
- `currency`: `text` (`'PEN'`).
- `billing_cycle_day`: `int` (1-31).
- `next_due_date`: `date`.
- `notes`: `text`.
- `created_at`: `timestamptz`.

### Tabla `business_credentials` (Bóveda Confidencial - Solo Admin)
- `id`: `uuid` (PK).
- `business_id`: `uuid` (FK a `businesses.id`, único, cascada).
- `gmail_account`: `text`.
- `gmail_password_encrypted`: `text`.
- `recovery_phone`: `text`.
- `github_repo_url`: `text`.
- `vercel_project_url`: `text`.
- `supabase_project_url`: `text`.
- `supabase_anon_key`: `text`.
- `extra_notes`: `text`.
- `updated_at`: `timestamptz`.

### Tabla `service_requests`
Solicitudes de nuevas webs por parte de clientes existentes:
- `id`: `uuid` (PK).
- `client_id`: `uuid` (FK a `profiles.id`).
- `business_name`: `text`.
- `business_type`: `text`.
- `phone_contact`: `text`.
- `details`: `text`.
- `status`: `text` (`'pending'`, `'contacted'`, `'completed'`).
- `created_at`: `timestamptz`.

---

## 4. Diseño de Interfaces (UI/UX)

### 4.1 Login (`/login`)
- Tarjeta limpia, minimalista y confiable con marca Qatu.
- Botón principal: *"Continuar con Google"*.
- Redirección automática inteligente según rol:
  - Si el usuario es `admin` -> `/admin`.
  - Si el usuario es `client` -> `/portal`.

### 4.2 Panel Super Admin (`/admin`)
- **Cabecera de Métricas:**
  - Total de Negocios activos.
  - Negocios suspendidos / por vencer.
  - Ingresos mensuales proyectados en soles (S/.).
- **Buscador y Filtros:** Búsqueda rápida por nombre de negocio, subdominio o cliente.
- **Tabla / Tarjetas de Negocios:**
  - Nombre, subdominio (`slug.qatuweb.com`), plan y fecha de vencimiento.
  - **Interruptor de Kill-switch:** Switch visual para alternar inmediatamente entre `Activo` y `Suspendido`.
  - Botón *"Ver Bóveda de Credenciales"*: Modal con contraseña protegida para copiar cuentas de Gmail, GitHub, Vercel y Supabase.
  - Botón de WhatsApp: Enlace directo `wa.me/51...` con mensaje predeterminado de cobro o soporte.
- **Modal de Alta de Negocio:**
  - Formulario para crear un negocio, vincular el correo Google del dueño, ingresar URLs técnicas y credenciales iniciales.

### 4.3 Portal del Cliente (`/portal`)
- **Bienvenida personalizada:** *"Hola, [Nombre del Cliente]"*.
- **Listado "Mis Negocios y Servicios":**
  - Tarjetas de cada negocio activo:
    - Estado de servicio: Badge verde `Activo` o rojo `En revisión / Pago pendiente`.
    - Próximo vencimiento de mensualidad.
    - Botón primario: *"Abrir mi Tienda Web"* (`slug.qatuweb.com`).
    - Botón secundario: *"Ir a mi Panel de Ventas / Inventario"* (`custom_admin_url`).
- **Botón "Solicitar otro Negocio":**
  - Modal sencillo donde escribe el nombre y rubro de su nueva idea para que la agencia lo contacte y le arme la propuesta.
- **Botón flotante / banner de Soporte:** Acceso directo al WhatsApp de soporte de Qatu.

---

## 5. Estrategia de Cifrado y Seguridad
- Las credenciales sensibles almacenadas en `business_credentials` pueden protegerse a dos niveles:
  1. **Nivel Base de Datos:** RLS estricto que impide cualquier lectura a usuarios con `role != 'admin'`.
  2. **Nivel Aplicación:** Cifrado simétrico AES-256 en variables de entorno del servidor (`ENCRYPTION_SECRET`), de modo que incluso quien tenga acceso directo de lectura solo vea el hash cifrado.
