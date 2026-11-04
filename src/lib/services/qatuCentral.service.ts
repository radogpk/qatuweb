import {
  Tenant,
  TenantVault,
  Payment,
  Profile,
  DomainStatusResponse,
} from '@/types/qatu';

// Datos semilla de demostración realistas para Huamanga, Ayacucho
const INITIAL_TENANTS: Tenant[] = [
  {
    id: 't-1',
    owner_id: 'u-1',
    owner_name: 'Lucas Mendoza',
    owner_email: 'lucas.ayacucho@gmail.com',
    owner_phone: '+51 966 888 777',
    business_name: 'Calzados Lucas Huamanga',
    subdomain: 'calzadoslucas',
    rubro: 'comercio',
    plan_type: 'mensual_30',
    status: 'active',
    next_billing_date: '2026-11-15',
    vercel_target_url: 'https://calzados-lucas-qatu.vercel.app',
    killswitch_override: false,
    created_at: '2026-09-10T12:00:00Z',
  },
  {
    id: 't-2',
    owner_id: 'u-2',
    owner_name: 'María Quispe',
    owner_email: 'maria.pasteleria@gmail.com',
    owner_phone: '+51 966 444 333',
    business_name: 'Pastelería & Café Huamanga',
    subdomain: 'pasteleriahuamanga',
    rubro: 'restaurante',
    plan_type: 'anual_300',
    status: 'active',
    next_billing_date: '2027-09-15',
    vercel_target_url: 'https://pasteleria-huamanga.vercel.app',
    killswitch_override: false,
    created_at: '2026-09-15T09:30:00Z',
  },
  {
    id: 't-3',
    owner_id: 'u-3',
    owner_name: 'Carlos Palomino',
    owner_email: 'carlos.plaza@gmail.com',
    owner_phone: '+51 966 999 111',
    business_name: 'Hotel Plaza Ayacucho',
    subdomain: 'hotelplaza',
    rubro: 'hospedaje',
    plan_type: 'mensual_30',
    status: 'suspended', // Killswitch activo
    next_billing_date: '2026-10-01', // Vencido
    vercel_target_url: 'https://hotel-plaza-ayacucho.vercel.app',
    killswitch_override: true,
    created_at: '2026-08-20T11:00:00Z',
  },
  {
    id: 't-4',
    owner_id: 'u-4',
    owner_name: 'Renato Cárdenas',
    owner_email: 'renato.gym@gmail.com',
    owner_phone: '+51 966 555 222',
    business_name: 'Titans Gym Huamanga',
    subdomain: 'titansgym',
    rubro: 'gym',
    plan_type: 'mensual_30',
    status: 'grace_period', // Periodo de gracia (3 días)
    next_billing_date: '2026-11-06',
    vercel_target_url: 'https://titans-gym-aya.vercel.app',
    killswitch_override: false,
    created_at: '2026-10-05T16:00:00Z',
  },
];

const INITIAL_VAULTS: Record<string, TenantVault> = {
  't-1': {
    id: 'v-1',
    tenant_id: 't-1',
    client_email_account: 'calzadoslucas.aya@gmail.com',
    client_supabase_url: 'https://xyz-calzadoslucas.supabase.co',
    client_supabase_anon_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.calzados_anon_key_demo',
    client_supabase_service_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.calzados_service_key_demo',
    client_vercel_project_id: 'prj_calzados_lucas_123',
    github_repo_url: 'https://github.com/qatu-clients/calzados-lucas',
    last_ping_at: '2026-11-04T08:00:00Z',
    last_ping_status: 'ok',
  },
  't-2': {
    id: 'v-2',
    tenant_id: 't-2',
    client_email_account: 'pasteleriahuamanga.qatu@gmail.com',
    client_supabase_url: 'https://xyz-pasteleriahuamanga.supabase.co',
    client_supabase_anon_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.pasteleria_anon_key_demo',
    client_supabase_service_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.pasteleria_service_key_demo',
    client_vercel_project_id: 'prj_pasteleria_123',
    github_repo_url: 'https://github.com/qatu-clients/pasteleria-huamanga',
    last_ping_at: '2026-11-04T08:00:00Z',
    last_ping_status: 'ok',
  },
  't-3': {
    id: 'v-3',
    tenant_id: 't-3',
    client_email_account: 'hotelplaza.aya@gmail.com',
    client_supabase_url: 'https://xyz-hotelplaza.supabase.co',
    client_supabase_anon_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.hotelplaza_anon_key_demo',
    client_supabase_service_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.hotelplaza_service_key_demo',
    client_vercel_project_id: 'prj_hotelplaza_123',
    github_repo_url: 'https://github.com/qatu-clients/hotel-plaza',
    last_ping_at: '2026-10-28T09:00:00Z',
    last_ping_status: 'error',
  },
  't-4': {
    id: 'v-4',
    tenant_id: 't-4',
    client_email_account: 'titansgym.aya@gmail.com',
    client_supabase_url: 'https://xyz-titansgym.supabase.co',
    client_supabase_anon_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.titansgym_anon_key_demo',
    client_supabase_service_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.titansgym_service_key_demo',
    client_vercel_project_id: 'prj_titansgym_123',
    github_repo_url: 'https://github.com/qatu-clients/titans-gym',
    last_ping_at: '2026-11-04T08:00:00Z',
    last_ping_status: 'ok',
  },
};

const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    tenant_id: 't-4',
    tenant_name: 'Titans Gym Huamanga',
    subdomain: 'titansgym',
    amount: 30.0,
    concept: 'mensualidad',
    payment_method: 'Yape',
    voucher_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    status: 'pending', // Pendiente de aprobación
    created_at: '2026-11-04T15:20:00Z',
  },
  {
    id: 'pay-2',
    tenant_id: 't-1',
    tenant_name: 'Calzados Lucas Huamanga',
    subdomain: 'calzadoslucas',
    amount: 30.0,
    concept: 'mensualidad',
    payment_method: 'Yape',
    voucher_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    status: 'approved',
    period_covered_start: '2026-10-15',
    period_covered_end: '2026-11-15',
    created_at: '2026-10-14T11:00:00Z',
  },
  {
    id: 'pay-3',
    tenant_id: 't-2',
    tenant_name: 'Pastelería & Café Huamanga',
    subdomain: 'pasteleriahuamanga',
    amount: 300.0,
    concept: 'anualidad',
    payment_method: 'Transferencia',
    status: 'approved',
    period_covered_start: '2026-09-15',
    period_covered_end: '2027-09-15',
    created_at: '2026-09-15T10:00:00Z',
  },
];

class QatuCentralService {
  private tenants: Tenant[] = [...INITIAL_TENANTS];
  private vaults: Record<string, TenantVault> = { ...INITIAL_VAULTS };
  private payments: Payment[] = [...INITIAL_PAYMENTS];

  // ==========================================
  // TENANTS & GOBERNANZA
  // ==========================================

  async getTenants(): Promise<Tenant[]> {
    return [...this.tenants];
  }

  async getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
    const clean = subdomain.trim().toLowerCase();
    const found = this.tenants.find((t) => t.subdomain.toLowerCase() === clean);
    return found ? { ...found } : null;
  }

  async getTenantById(id: string): Promise<Tenant | null> {
    const found = this.tenants.find((t) => t.id === id);
    return found ? { ...found } : null;
  }

  async getTenantsByOwner(ownerIdOrEmail: string): Promise<Tenant[]> {
    return this.tenants.filter(
      (t) => t.owner_id === ownerIdOrEmail || t.owner_email === ownerIdOrEmail
    );
  }

  async updateTenantStatus(
    tenantId: string,
    status: Tenant['status'],
    killswitchOverride: boolean
  ): Promise<Tenant | null> {
    const idx = this.tenants.findIndex((t) => t.id === tenantId);
    if (idx === -1) return null;

    this.tenants[idx] = {
      ...this.tenants[idx],
      status,
      killswitch_override: killswitchOverride,
    };
    return { ...this.tenants[idx] };
  }

  async createTenantWithVault(
    tenantData: Omit<Tenant, 'id' | 'created_at'>,
    vaultData: Omit<TenantVault, 'id' | 'tenant_id' | 'last_ping_at' | 'last_ping_status'>
  ): Promise<{ tenant: Tenant; vault: TenantVault }> {
    const tenantId = `t-${Date.now()}`;
    const newTenant: Tenant = {
      ...tenantData,
      id: tenantId,
      created_at: new Date().toISOString(),
    };
    this.tenants.unshift(newTenant);

    const vaultId = `v-${Date.now()}`;
    const newVault: TenantVault = {
      ...vaultData,
      id: vaultId,
      tenant_id: tenantId,
      last_ping_at: new Date().toISOString(),
      last_ping_status: 'ok',
    };
    this.vaults[tenantId] = newVault;

    return { tenant: newTenant, vault: newVault };
  }

  // ==========================================
  // BÓVEDA CONFIDENCIAL Y CRON ANTI-PAUSA
  // ==========================================

  async getVaultByTenantId(tenantId: string): Promise<TenantVault | null> {
    const vault = this.vaults[tenantId];
    return vault ? { ...vault } : null;
  }

  async getAllVaults(): Promise<TenantVault[]> {
    return Object.values(this.vaults);
  }

  async updateVaultPing(tenantId: string, status: 'ok' | 'error'): Promise<TenantVault | null> {
    const vault = this.vaults[tenantId];
    if (!vault) return null;

    vault.last_ping_at = new Date().toISOString();
    vault.last_ping_status = status;
    return { ...vault };
  }

  /**
   * Ejecuta ping HTTP contra cada Supabase Free activo para evitar la pausa de los 7 días.
   */
  async executeGlobalKeepAlive(): Promise<{ total: number; successful: number; failed: number }> {
    let successful = 0;
    let failed = 0;

    for (const tenant of this.tenants) {
      if (tenant.status === 'active' || tenant.status === 'grace_period') {
        const vault = this.vaults[tenant.id];
        if (vault?.client_supabase_url && vault?.client_supabase_anon_key) {
          try {
            // Intento de ping REST real si la URL es un hostname real
            if (!vault.client_supabase_url.includes('placeholder') && !vault.client_supabase_url.includes('xyz-')) {
              const res = await fetch(`${vault.client_supabase_url}/rest/v1/`, {
                headers: {
                  apikey: vault.client_supabase_anon_key,
                  Authorization: `Bearer ${vault.client_supabase_anon_key}`,
                },
                signal: AbortSignal.timeout(3000),
              });
              if (res.ok || res.status < 500) {
                await this.updateVaultPing(tenant.id, 'ok');
                successful++;
                continue;
              }
            }
            // En simulación local
            await this.updateVaultPing(tenant.id, 'ok');
            successful++;
          } catch (e) {
            await this.updateVaultPing(tenant.id, 'error');
            failed++;
          }
        }
      }
    }

    return { total: this.tenants.length, successful, failed };
  }

  // ==========================================
  // PAGOS YAPE / PLIN Y APROBACIÓN 1-TOQUE
  // ==========================================

  async getPayments(): Promise<Payment[]> {
    return [...this.payments];
  }

  async getPaymentsByTenant(tenantId: string): Promise<Payment[]> {
    return this.payments.filter((p) => p.tenant_id === tenantId);
  }

  async createPaymentVoucher(
    paymentData: Omit<Payment, 'id' | 'status' | 'created_at'>
  ): Promise<Payment> {
    const newPayment: Payment = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    this.payments.unshift(newPayment);
    return newPayment;
  }

  /**
   * Aprueba el comprobante de Yape/Plin, extiende +1 mes o +1 año y reactiva el tenant
   */
  async approvePayment(paymentId: string): Promise<{ success: boolean; tenant?: Tenant }> {
    const payment = this.payments.find((p) => p.id === paymentId);
    if (!payment) return { success: false };

    const tenant = this.tenants.find((t) => t.id === payment.tenant_id);
    if (!tenant) return { success: false };

    // Calcular nueva fecha
    const currentDueDate = new Date(tenant.next_billing_date);
    const baseDate = currentDueDate > new Date() ? currentDueDate : new Date();

    if (payment.concept === 'anualidad' || tenant.plan_type === 'anual_300') {
      baseDate.setFullYear(baseDate.getFullYear() + 1);
    } else {
      baseDate.setMonth(baseDate.getMonth() + 1);
    }

    const newDueDateString = baseDate.toISOString().split('T')[0];

    // Actualizar pago
    payment.status = 'approved';
    payment.period_covered_start = new Date().toISOString().split('T')[0];
    payment.period_covered_end = newDueDateString;

    // Reactivar tenant
    tenant.status = 'active';
    tenant.killswitch_override = false;
    tenant.next_billing_date = newDueDateString;

    return { success: true, tenant: { ...tenant } };
  }

  async rejectPayment(paymentId: string): Promise<boolean> {
    const payment = this.payments.find((p) => p.id === paymentId);
    if (!payment) return false;
    payment.status = 'rejected';
    return true;
  }
}

export const qatuCentralService = new QatuCentralService();
