#!/usr/bin/env node

/**
 * QATU WEB - FAST TENANT PROVISIONING CLI (scripts/clone-tenant.js)
 * Genera el paquete completo de despliegue para un nuevo cliente en < 2 minutos.
 *
 * Uso:
 *   node scripts/clone-tenant.js --name "Boutique Bellido" --slug "boutiquebellido" --phone "51966444111" --color "#7C3AED" --rubro "ropa"
 */

const fs = require('fs');
const path = require('path');

// Parsear argumentos CLI
const args = process.argv.slice(2);
const params = {};

for (let i = 0; i < args.length; i += 2) {
  const key = args[i]?.replace(/^--/, '');
  const value = args[i + 1];
  if (key && value) {
    params[key] = value;
  }
}

// Valores por defecto para Huamanga
const name = params.name || 'Comercio Ayacuchano';
const slug = (params.slug || name.toLowerCase().replace(/[^a-z0-9]/g, '')).toLowerCase();
const phone = (params.phone || '51966123456').replace(/[^0-9]/g, '');
const color = params.color || '#B23A2E';
const rubro = params.rubro || 'calzado';
const location = params.location || 'Jr. Asamblea, Huamanga, Ayacucho';

console.log('\n🚀 [QATU WEB] Aprovisionando cliente nuevo...');
console.log(`• Negocio: ${name}`);
console.log(`• Subdominio: ${slug}.qatuweb.com`);
console.log(`• WhatsApp: +${phone}`);
console.log(`• Color de Marca: ${color}\n`);

// Directorio destino
const outputDir = path.join(__dirname, '..', 'tenants_generated', slug);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Archivo tenant.config.ts
const tenantConfigContent = `import { TenantConfig } from '@/templates/storefront-base/tenant.config';

export const TENANT_CONFIG: TenantConfig = {
  slug: '${slug}',
  businessName: '${name}',
  tagline: 'Productos y pedidos directos a WhatsApp',
  rubro: '${rubro}',
  whatsappNumber: '${phone}',
  currency: 'S/',
  location: '${location}',
  paymentMethods: ['Yape', 'Plin', 'Efectivo contraentrega'],
  theme: {
    primaryColor: '${color}',
    accentColor: '#D4A017',
  },
  features: {
    enableVariants: true,
    variantLabel: '${rubro === 'calzado' || rubro === 'ropa' ? 'Talla' : 'Sabor / Porción'}',
    requireCustomerAddress: false,
  },
};
`;

fs.writeFileSync(path.join(outputDir, 'tenant.config.ts'), tenantConfigContent, 'utf8');

// 2. Archivo README de Despliegue Rápido
const readmeContent = `# Despliegue Rápido: ${name} (${slug}.qatuweb.com)

## Paso 1: Base de datos Supabase Free del Cliente
1. Crea un proyecto gratuito en Supabase con la cuenta Google del cliente.
2. Abre el **SQL Editor** y ejecuta el script: \`supabase/init_store.sql\`.
3. Copia el **Project URL** y la **anon key**.

## Paso 2: Despliegue en Vercel
1. Conecta el repositorio o despliega con el CLI de Vercel:
   \`\`\`bash
   vercel --prod
   \`\`\`
2. URL obtenida: \`https://${slug}-qatu.vercel.app\`

## Paso 3: Registro en Hub Super Admin de Qatu Web
1. Ingresa a: https://qatuweb.com/dashboard/admin
2. Haz clic en **"Aprovisionar Nuevo Negocio"** y pega:
   - Subdominio: \`${slug}\`
   - URL Vercel: \`https://${slug}-qatu.vercel.app\`
   - Supabase URL y Anon Key del cliente.
3. ¡Listo! Cloudflare Worker activará inmediatamente \`${slug}.qatuweb.com\`.
`;

fs.writeFileSync(path.join(outputDir, 'DESPLIEGUE.md'), readmeContent, 'utf8');

console.log(`✅ Archivos generados con éxito en: tenants_generated/${slug}/`);
console.log(`📁 1. tenants_generated/${slug}/tenant.config.ts`);
console.log(`📁 2. tenants_generated/${slug}/DESPLIEGUE.md\n`);
console.log('⚡ Tiempo estimado de despliegue restante con IA: ~90 segundos.\n');
