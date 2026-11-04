import React from 'react';
import {
  PRESET_CALZADOS,
  MOCK_PRODUCTS_CALZADOS,
  PRESET_PASTELERIA,
  MOCK_PRODUCTS_PASTELERIA,
} from '@/templates/storefront-base/tenant.config';
import { PocketAdminView } from '@/templates/storefront-base/PocketAdminView';

interface PocketAdminPageProps {
  params: Promise<{ rubro: string }>;
}

export async function generateMetadata({ params }: PocketAdminPageProps) {
  const { rubro } = await params;
  const isPasteleria = rubro.toLowerCase().includes('pasteleria') || rubro.toLowerCase().includes('cafe');
  const config = isPasteleria ? PRESET_PASTELERIA : PRESET_CALZADOS;

  return {
    title: `Panel de Bolsillo | ${config.businessName}`,
    description: 'Gestión rápida de catálogo y productos para el comerciante.',
  };
}

export default async function PocketAdminPage({ params }: PocketAdminPageProps) {
  const { rubro } = await params;
  const lower = rubro.toLowerCase();

  let config = PRESET_CALZADOS;
  let products = MOCK_PRODUCTS_CALZADOS;

  if (lower.includes('pasteleria') || lower.includes('cafe') || lower.includes('torta')) {
    config = PRESET_PASTELERIA;
    products = MOCK_PRODUCTS_PASTELERIA;
  } else if (lower.includes('calzado') || lower.includes('zapato') || lower.includes('moda') || lower.includes('ropa')) {
    config = PRESET_CALZADOS;
    products = MOCK_PRODUCTS_CALZADOS;
  }

  const storeUrl = `/demo/${lower.includes('pasteleria') ? 'pasteleria' : 'calzados'}`;

  return (
    <div>
      <PocketAdminView
        config={config}
        initialProducts={products}
        storeUrl={storeUrl}
      />
    </div>
  );
}
