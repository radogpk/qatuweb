import React from 'react';
import { notFound } from 'next/navigation';
import {
  PRESET_CALZADOS,
  MOCK_PRODUCTS_CALZADOS,
  PRESET_PASTELERIA,
  PRESET_LASFLORES,
  MOCK_PRODUCTS_PASTELERIA,
  PRESET_TRANKILANDIA,
  MOCK_PRODUCTS_TRANKILANDIA,
} from '@/templates/storefront-base/tenant.config';
import { StorefrontView } from '@/templates/storefront-base/StorefrontView';

interface DemoPageProps {
  params: Promise<{ rubro: string }>;
}

export async function generateMetadata({ params }: DemoPageProps) {
  const { rubro } = await params;
  const lower = rubro.toLowerCase();
  let config = PRESET_CALZADOS;
  if (lower.includes('pasteleria') || lower.includes('flores') || lower.includes('cafe') || lower.includes('restaurante')) {
    config = PRESET_LASFLORES;
  } else if (lower.includes('gym') || lower.includes('trankilandia') || lower.includes('fitness')) {
    config = PRESET_TRANKILANDIA;
  }

  return {
    title: `${config.businessName} | Qatu Demo`,
    description: config.tagline,
  };
}

export default async function DemoRubroPage({ params }: DemoPageProps) {
  const { rubro } = await params;
  const lower = rubro.toLowerCase();

  let config = PRESET_CALZADOS;
  let products = MOCK_PRODUCTS_CALZADOS;

  if (lower.includes('pasteleria') || lower.includes('flores') || lower.includes('cafe') || lower.includes('restaurante') || lower.includes('torta')) {
    config = PRESET_LASFLORES;
    products = MOCK_PRODUCTS_PASTELERIA;
  } else if (lower.includes('gym') || lower.includes('trankilandia') || lower.includes('fitness')) {
    config = PRESET_TRANKILANDIA;
    products = MOCK_PRODUCTS_TRANKILANDIA;
  } else if (lower.includes('calzado') || lower.includes('zapato') || lower.includes('moda') || lower.includes('ropa')) {
    config = PRESET_CALZADOS;
    products = MOCK_PRODUCTS_CALZADOS;
  }

  return (
    <div>
      <StorefrontView
        config={config}
        initialProducts={products}
        isDemoMode={true}
      />
    </div>
  );
}
