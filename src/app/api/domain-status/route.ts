import { NextRequest, NextResponse } from 'next/server';
import { qatuCentralService } from '@/lib/services/qatuCentral.service';
import { DomainStatusResponse } from '@/types/qatu';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  // Soporta tanto ?subdomain= como ?slug= para máxima compatibilidad con el Worker
  const subdomain = searchParams.get('subdomain') || searchParams.get('slug');

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
  };

  if (!subdomain) {
    return NextResponse.json(
      { active: false, reason: 'not_found', error: 'Parámetro subdomain o slug requerido' },
      { status: 400, headers: corsHeaders }
    );
  }

  const tenant = await qatuCentralService.getTenantBySubdomain(subdomain);

  if (!tenant) {
    const notFoundRes: DomainStatusResponse = {
      active: false,
      reason: 'not_found',
      subdomain,
    };
    return NextResponse.json(notFoundRes, { status: 404, headers: corsHeaders });
  }

  // Comprobar corte de servicio por Killswitch manual o mora
  const isKilled = tenant.killswitch_override || tenant.status === 'suspended';
  const isDeploying = tenant.status === 'deploying';

  if (isKilled) {
    const suspendedRes: DomainStatusResponse = {
      active: false,
      reason: tenant.killswitch_override ? 'killswitch_override' : 'payment_overdue',
      subdomain: tenant.subdomain,
      businessName: tenant.business_name,
      renewalAmount: tenant.plan_type === 'anual_300' ? 300 : 30,
    };
    return NextResponse.json(suspendedRes, { status: 200, headers: corsHeaders });
  }

  if (isDeploying) {
    const deployingRes: DomainStatusResponse = {
      active: false,
      reason: 'deploying',
      subdomain: tenant.subdomain,
      businessName: tenant.business_name,
    };
    return NextResponse.json(deployingRes, { status: 200, headers: corsHeaders });
  }

  // Activo o en periodo de gracia
  const activeRes: DomainStatusResponse = {
    active: true,
    targetUrl: tenant.vercel_target_url,
    businessName: tenant.business_name,
    subdomain: tenant.subdomain,
  };

  return NextResponse.json(activeRes, { status: 200, headers: corsHeaders });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
