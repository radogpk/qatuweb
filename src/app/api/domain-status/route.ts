import { NextRequest, NextResponse } from 'next/server';
import { panelService } from '@/lib/services/panel.service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
  };

  if (!slug) {
    return NextResponse.json(
      { found: false, error: 'Parámetro "slug" requerido' },
      { status: 400, headers: corsHeaders }
    );
  }

  const business = await panelService.getBusinessBySlug(slug);

  if (!business) {
    return NextResponse.json(
      { found: false, error: 'Negocio o subdominio no encontrado' },
      { status: 404, headers: corsHeaders }
    );
  }

  return NextResponse.json(
    {
      found: true,
      slug: business.slug,
      name: business.name,
      status: business.status, // 'active' | 'suspended' | 'grace'
      target_url: business.target_url,
      custom_admin_url: business.custom_admin_url,
      next_due_date: business.next_due_date,
    },
    { status: 200, headers: corsHeaders }
  );
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
