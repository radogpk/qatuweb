import React from 'react';
import {
  PRESET_CALZADOS,
  MOCK_PRODUCTS_CALZADOS,
  PRESET_PASTELERIA,
  PRESET_LASFLORES,
  MOCK_PRODUCTS_PASTELERIA,
  PRESET_TRANKILANDIA,
  MOCK_PRODUCTS_TRANKILANDIA,
} from '@/templates/storefront-base/tenant.config';
import { PocketAdminView } from '@/templates/storefront-base/PocketAdminView';

interface PocketAdminPageProps {
  params: Promise<{ rubro: string }>;
}

export async function generateMetadata({ params }: PocketAdminPageProps) {
  const { rubro } = await params;
  const lower = rubro.toLowerCase();
  let config = PRESET_CALZADOS;
  if (lower.includes('pasteleria') || lower.includes('flores') || lower.includes('cafe') || lower.includes('restaurante')) {
    config = PRESET_LASFLORES;
  } else if (lower.includes('gym') || lower.includes('trankilandia') || lower.includes('fitness')) {
    config = PRESET_TRANKILANDIA;
  }

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
  let storeSlug = 'calzados';

  if (lower.includes('pasteleria') || lower.includes('flores') || lower.includes('cafe') || lower.includes('restaurante') || lower.includes('torta')) {
    config = PRESET_LASFLORES;
    products = MOCK_PRODUCTS_PASTELERIA;
    storeSlug = 'pasteleria';
  } else if (lower.includes('gym') || lower.includes('trankilandia') || lower.includes('fitness')) {
    config = PRESET_TRANKILANDIA;
    products = MOCK_PRODUCTS_TRANKILANDIA;
    storeSlug = 'gym';
  } else if (lower.includes('calzado') || lower.includes('zapato') || lower.includes('moda') || lower.includes('ropa')) {
    config = PRESET_CALZADOS;
    products = MOCK_PRODUCTS_CALZADOS;
    storeSlug = 'calzados';
  }

  const storeUrl = `/demo/${storeSlug}`;

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
