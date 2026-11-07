import { NextRequest, NextResponse } from 'next/server';
import { qatuCentralService } from '@/lib/services/qatuCentral.service';
import { Tenant, TenantVault, TenantStatus } from '@/types/qatu';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId');

    if (tenantId) {
      const [tenant, vault, payments] = await Promise.all([
        qatuCentralService.getTenantById(tenantId),
        qatuCentralService.getVaultByTenantId(tenantId),
        qatuCentralService.getPaymentsByTenant(tenantId),
      ]);
      return NextResponse.json({ tenant, vault, payments }, { headers: corsHeaders });
    }

    const [tenants, vaults, payments] = await Promise.all([
      qatuCentralService.getTenants(),
      qatuCentralService.getAllVaults(),
      qatuCentralService.getPayments(),
    ]);

    return NextResponse.json({ tenants, vaults, payments }, { headers: corsHeaders });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al obtener datos de tenants';
    return NextResponse.json({ error: message }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Aprobación de Pago en 1-Toque
    if (body.action === 'approve_payment') {
      const { paymentId } = body;
      if (!paymentId) {
        return NextResponse.json({ error: 'paymentId requerido' }, { status: 400, headers: corsHeaders });
      }
      const result = await qatuCentralService.approvePayment(paymentId);
      return NextResponse.json(result, { headers: corsHeaders });
    }

    // 2. Rechazo de Comprobante
    if (body.action === 'reject_payment') {
      const { paymentId } = body;
      if (!paymentId) {
        return NextResponse.json({ error: 'paymentId requerido' }, { status: 400, headers: corsHeaders });
      }
      const success = await qatuCentralService.rejectPayment(paymentId);
      return NextResponse.json({ success }, { headers: corsHeaders });
    }

    // 3. Subida de Voucher Yape / Plin
    if (body.action === 'upload_voucher') {
      const { paymentData } = body;
      if (!paymentData || !paymentData.tenant_id) {
        return NextResponse.json({ error: 'paymentData y tenant_id requeridos' }, { status: 400, headers: corsHeaders });
      }
      const newPayment = await qatuCentralService.createPaymentVoucher(paymentData);
      return NextResponse.json(newPayment, { status: 201, headers: corsHeaders });
    }

    // 4. Creación de nuevo Tenant en Wizard
    const { tenantData, vaultData } = body;
    if (!tenantData || !tenantData.subdomain || !tenantData.business_name) {
      return NextResponse.json({ error: 'Datos incompletos de tenant' }, { status: 400, headers: corsHeaders });
    }

    const result = await qatuCentralService.createTenantWithVault(tenantData, vaultData);
    return NextResponse.json(result, { status: 201, headers: corsHeaders });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al procesar solicitud';
    return NextResponse.json({ error: message }, { status: 500, headers: corsHeaders });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { tenantId, status, killswitchOverride } = body as {
      tenantId: string;
      status: TenantStatus;
      killswitchOverride: boolean;
    };

    if (!tenantId) {
      return NextResponse.json({ error: 'tenantId requerido' }, { status: 400, headers: corsHeaders });
    }

    const updated = await qatuCentralService.updateTenantStatus(
      tenantId,
      status,
      killswitchOverride
    );

    if (!updated) {
      return NextResponse.json({ error: 'Tenant no encontrado' }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json(updated, { headers: corsHeaders });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al actualizar tenant';
    return NextResponse.json({ error: message }, { status: 500, headers: corsHeaders });
  }
}
