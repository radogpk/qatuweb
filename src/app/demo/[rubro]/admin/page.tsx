import React from 'react';
import { resolveDemoPreset } from '@/templates/storefront-base/tenant.config';
import { PocketAdminView } from '@/templates/storefront-base/PocketAdminView';

interface PocketAdminPageProps {
  params: Promise<{ rubro: string }>;
}

export async function generateMetadata({ params }: PocketAdminPageProps) {
  const { rubro } = await params;
  const { config } = resolveDemoPreset(rubro);

  return {
    title: `Panel de Bolsillo • ${config.businessName} | Qatu Web`,
    description: `Gestión rápida de catálogo y productos para el dueño de ${config.businessName}.`,
  };
}

export default async function PocketAdminPage({ params }: PocketAdminPageProps) {
  const { rubro } = await params;
  const { config, products } = resolveDemoPreset(rubro);
  const storeUrl = `/demo/${rubro}`;

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
