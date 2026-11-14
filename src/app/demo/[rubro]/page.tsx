import React from 'react';
import { resolveDemoPreset } from '@/templates/storefront-base/tenant.config';
import { StorefrontView } from '@/templates/storefront-base/StorefrontView';

interface DemoPageProps {
  params: Promise<{ rubro: string }>;
}

export async function generateMetadata({ params }: DemoPageProps) {
  const { rubro } = await params;
  const { config } = resolveDemoPreset(rubro);

  return {
    title: `${config.businessName} • Demo Oficial | Qatu Web`,
    description: `${config.tagline} • Software e-commerce y catálogo móvil para comercios de Huamanga, Ayacucho.`,
  };
}

export default async function DemoRubroPage({ params }: DemoPageProps) {
  const { rubro } = await params;
  const { config, products } = resolveDemoPreset(rubro);

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
