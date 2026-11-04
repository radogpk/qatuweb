import { NextRequest, NextResponse } from 'next/server';
import { qatuCentralService } from '@/lib/services/qatuCentral.service';
import { Tenant, TenantVault, TenantStatus } from '@/types/qatu';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [tenants, vaults, payments] = await Promise.all([
      qatuCentralService.getTenants(),
      qatuCentralService.getAllVaults(),
      qatuCentralService.getPayments(),
    ]);

    return NextResponse.json({ tenants, vaults, payments });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al obtener tenants';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.action === 'approve_payment') {
      const { paymentId } = body;
      if (!paymentId) {
        return NextResponse.json({ error: 'paymentId requerido' }, { status: 400 });
      }
      const success = await qatuCentralService.approvePayment(paymentId);
      return NextResponse.json({ success });
    }

    // Creación de nuevo Tenant
    const { tenantData, vaultData } = body;
    if (!tenantData || !tenantData.subdomain || !tenantData.business_name) {
      return NextResponse.json({ error: 'Datos incompletos de tenant' }, { status: 400 });
    }

    const result = await qatuCentralService.createTenantWithVault(tenantData, vaultData);
    return NextResponse.json(result, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al procesar solicitud';
    return NextResponse.json({ error: message }, { status: 500 });
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
      return NextResponse.json({ error: 'tenantId requerido' }, { status: 400 });
    }

    const updated = await qatuCentralService.updateTenantStatus(
      tenantId,
      status,
      killswitchOverride
    );

    if (!updated) {
      return NextResponse.json({ error: 'Tenant no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al actualizar tenant';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
