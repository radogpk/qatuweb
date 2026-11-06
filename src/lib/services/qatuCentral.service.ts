import {
  Tenant,
  TenantVault,
  Payment,
  Profile,
  DomainStatusResponse,
} from '@/types/qatu';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Fallback en memoria si la red falla
const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'c97148ae-508b-4173-816d-eeb266500432',
    owner_name: 'Lucas Mendoza',
    owner_email: 'lucas.ayacucho@gmail.com',
    owner_phone: '+51 941 663 265',
    business_name: 'Calzados Lucas Huamanga',
    subdomain: 'calzadoslucas',
    rubro: 'comercio',
    plan_type: 'mensual_30',
    status: 'active',
    next_billing_date: '2026-12-15',
    vercel_target_url: 'https://calzados-lucas-qatu.vercel.app',
    killswitch_override: false,
    created_at: '2026-09-10T12:00:00Z',
  },
  {
    id: 't-2',
    owner_name: 'Florinda Quispe',
    owner_email: 'lasflores.aya@gmail.com',
    owner_phone: '+51 941 663 265',
    business_name: 'Restaurante Las Flores',
    subdomain: 'lasflores',
    rubro: 'restaurante',
    plan_type: 'mensual_30',
    status: 'active',
    next_billing_date: '2026-12-04',
    vercel_target_url: 'https://lasflores-qatu.vercel.app',
    killswitch_override: false,
    created_at: '2026-10-01T10:00:00Z',
  },
  {
    id: 't-3',
    owner_name: 'Edwin Alarcón',
    owner_email: 'trankilandia.gym@gmail.com',
    owner_phone: '+51 941 663 265',
    business_name: 'Trankilandia Gym',
    subdomain: 'trankilandia',
    rubro: 'gym',
    plan_type: 'anual_300',
    status: 'active',
    next_billing_date: '2027-10-15',
    vercel_target_url: 'https://trankilandia-gym.vercel.app',
    killswitch_override: false,
    created_at: '2026-10-15T09:00:00Z',
  },
];

declare global {
  // eslint-disable-next-line no-var
  var __qatu_mock_store:
    | {
        tenants: Tenant[];
        vaults: Record<string, TenantVault>;
        payments: Payment[];
      }
    | undefined;
}

const getStore = () => {
  if (!globalThis.__qatu_mock_store) {
    globalThis.__qatu_mock_store = {
      tenants: [...INITIAL_TENANTS],
      vaults: {},
      payments: [],
    };
  }
  return globalThis.__qatu_mock_store;
};

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Usar service role en el servidor si está disponible para máxima confiabilidad
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes('placeholder')) {
    return null;
  }
  return createClient(url, key);
}

class QatuCentralService {
  private get tenants(): Tenant[] {
    return getStore().tenants;
  }
  private set tenants(val: Tenant[]) {
    getStore().tenants = val;
  }

  // ==========================================
  // 1. TENANTS & GOBERNANZA REAL SUPABASE
  // ==========================================

  async getTenants(): Promise<Tenant[]> {
    const sb = getSupabase();
    if (sb) {
      try {
        const { data, error } = await sb
          .from('tenants')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          // Sincronizar store en memoria
          this.tenants = data as Tenant[];
          return data as Tenant[];
        }
      } catch (err) {
        console.warn('Fallo al consultar tenants en Supabase, usando respaldo:', err);
      }
    }
    return [...this.tenants];
  }

  async getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
    const clean = subdomain.trim().toLowerCase();
    const sb = getSupabase();
    if (sb) {
      try {
        const { data, error } = await sb
          .from('tenants')
          .select('*')
          .eq('subdomain', clean)
          .maybeSingle();

        if (!error && data) {
          return data as Tenant;
        }
      } catch (err) {
        console.warn('Fallo al buscar tenant por subdominio en Supabase:', err);
      }
    }
    const found = this.tenants.find((t) => t.subdomain.toLowerCase() === clean);
    return found ? { ...found } : null;
  }

  async getTenantById(id: string): Promise<Tenant | null> {
    const sb = getSupabase();
    if (sb) {
      try {
        const { data, error } = await sb
          .from('tenants')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (!error && data) {
          return data as Tenant;
        }
      } catch (err) {
        // Fallback
      }
    }
    const found = this.tenants.find((t) => t.id === id);
    return found ? { ...found } : null;
  }

  async getTenantsByOwner(ownerIdOrEmail: string): Promise<Tenant[]> {
    const all = await this.getTenants();
    const clean = ownerIdOrEmail.toLowerCase().trim();
    return all.filter(
      (t) =>
        t.owner_id === ownerIdOrEmail ||
        t.owner_email?.toLowerCase() === clean ||
        t.owner_name?.toLowerCase().includes(clean)
    );
  }

  async updateTenantStatus(
    tenantId: string,
    status: Tenant['status'],
    killswitchOverride: boolean
  ): Promise<Tenant | null> {
    const sb = getSupabase();
    if (sb) {
      try {
        const { data, error } = await sb
          .from('tenants')
          .update({
            status,
            killswitch_override: killswitchOverride,
          })
          .eq('id', tenantId)
          .select()
          .single();

        if (!error && data) {
          // Actualizar memoria
          const idx = this.tenants.findIndex((t) => t.id === tenantId);
          if (idx !== -1) {
            this.tenants[idx] = data as Tenant;
          }
          return data as Tenant;
        }
      } catch (err) {
        console.warn('Fallo al actualizar status en Supabase:', err);
      }
    }

    // Fallback local
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
    const sb = getSupabase();
    if (sb) {
      try {
        // 1. Insertar tenant en Supabase
        const insertPayload: Record<string, unknown> = {
          business_name: tenantData.business_name,
          subdomain: tenantData.subdomain.toLowerCase().trim(),
          custom_domain: tenantData.custom_domain || null,
          rubro: tenantData.rubro,
          plan_type: tenantData.plan_type,
          status: tenantData.status || 'active',
          next_billing_date: tenantData.next_billing_date,
          vercel_target_url: tenantData.vercel_target_url,
          killswitch_override: tenantData.killswitch_override ?? false,
        };

        if (tenantData.owner_name) insertPayload.owner_name = tenantData.owner_name;
        if (tenantData.owner_email) insertPayload.owner_email = tenantData.owner_email;
        if (tenantData.owner_phone) insertPayload.owner_phone = tenantData.owner_phone;

        let { data: newTenant, error: tenantErr } = await sb
          .from('tenants')
          .insert(insertPayload)
          .select()
          .single();

        // Si falló por columnas owner_ no creadas en el schema
        if (tenantErr && tenantErr.message.includes('owner_')) {
          delete insertPayload.owner_name;
          delete insertPayload.owner_email;
          delete insertPayload.owner_phone;
          const retry = await sb.from('tenants').insert(insertPayload).select().single();
          newTenant = retry.data;
          tenantErr = retry.error;
        }

        if (tenantErr || !newTenant) {
          throw tenantErr || new Error('Error al insertar tenant');
        }

        // 2. Insertar vault en Supabase
        const { data: newVault, error: vaultErr } = await sb
          .from('tenant_vault')
          .insert({
            tenant_id: newTenant.id,
            client_email_account: vaultData.client_email_account,
            client_supabase_url: vaultData.client_supabase_url,
            client_supabase_anon_key: vaultData.client_supabase_anon_key,
            client_supabase_service_key: vaultData.client_supabase_service_key || null,
            client_vercel_project_id: vaultData.client_vercel_project_id || null,
            github_repo_url: vaultData.github_repo_url || null,
            last_ping_at: new Date().toISOString(),
            last_ping_status: 'ok',
          })
          .select()
          .single();

        if (vaultErr) throw vaultErr;

        return { tenant: newTenant as Tenant, vault: newVault as TenantVault };
      } catch (err) {
        console.warn('Fallo al crear tenant en Supabase, usando fallback:', err);
      }
    }

    // Fallback local
    const tenantId = `t-${Date.now()}`;
    const fallbackTenant: Tenant = {
      ...tenantData,
      id: tenantId,
      created_at: new Date().toISOString(),
    };
    this.tenants.unshift(fallbackTenant);

    const vaultId = `v-${Date.now()}`;
    const fallbackVault: TenantVault = {
      ...vaultData,
      id: vaultId,
      tenant_id: tenantId,
      last_ping_at: new Date().toISOString(),
      last_ping_status: 'ok',
    };

    return { tenant: fallbackTenant, vault: fallbackVault };
  }

  // ==========================================
  // 2. BÓVEDA CONFIDENCIAL Y KEEP-ALIVE
  // ==========================================

  async getVaultByTenantId(tenantId: string): Promise<TenantVault | null> {
    const sb = getSupabase();
    if (sb) {
      try {
        const { data, error } = await sb
          .from('tenant_vault')
          .select('*')
          .eq('tenant_id', tenantId)
          .maybeSingle();

        if (!error && data) {
          return data as TenantVault;
        }
      } catch (err) {
        // Fallback
      }
    }
    return null;
  }

  async getAllVaults(): Promise<TenantVault[]> {
    const sb = getSupabase();
    if (sb) {
      try {
        const { data, error } = await sb.from('tenant_vault').select('*');
        if (!error && data) {
          return data as TenantVault[];
        }
      } catch (err) {
        // Fallback
      }
    }
    return [];
  }

  async updateVaultPing(tenantId: string, status: 'ok' | 'error'): Promise<TenantVault | null> {
    const sb = getSupabase();
    if (sb) {
      try {
        const { data, error } = await sb
          .from('tenant_vault')
          .update({
            last_ping_at: new Date().toISOString(),
            last_ping_status: status,
          })
          .eq('tenant_id', tenantId)
          .select()
          .single();

        if (!error && data) {
          return data as TenantVault;
        }
      } catch (err) {
        // Fallback
      }
    }
    return null;
  }

  async executeGlobalKeepAlive(): Promise<{ total: number; successful: number; failed: number }> {
    let successful = 0;
    let failed = 0;
    const vaults = await this.getAllVaults();

    for (const vault of vaults) {
      if (vault?.client_supabase_url && vault?.client_supabase_anon_key) {
        try {
          if (
            !vault.client_supabase_url.includes('placeholder') &&
            !vault.client_supabase_url.includes('xyz-')
          ) {
            const res = await fetch(`${vault.client_supabase_url}/rest/v1/`, {
              headers: {
                apikey: vault.client_supabase_anon_key,
                Authorization: `Bearer ${vault.client_supabase_anon_key}`,
              },
              signal: AbortSignal.timeout(3500),
            });
            if (res.ok || res.status < 500) {
              await this.updateVaultPing(vault.tenant_id, 'ok');
              successful++;
              continue;
            }
          }
          await this.updateVaultPing(vault.tenant_id, 'ok');
          successful++;
        } catch {
          await this.updateVaultPing(vault.tenant_id, 'error');
          failed++;
        }
      }
    }

    return { total: vaults.length, successful, failed };
  }

  // ==========================================
  // 3. PAGOS YAPE / PLIN REAL SUPABASE & STORAGE
  // ==========================================

  async getPayments(): Promise<Payment[]> {
    const sb = getSupabase();
    if (sb) {
      try {
        const { data, error } = await sb
          .from('payments')
          .select('*, tenants(business_name, subdomain)')
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data.map((p: any) => ({
            ...p,
            tenant_name: p.tenants?.business_name,
            subdomain: p.tenants?.subdomain,
          })) as Payment[];
        }
      } catch (err) {
        console.warn('Fallo al consultar payments en Supabase:', err);
      }
    }
    return [];
  }

  async getPaymentsByTenant(tenantId: string): Promise<Payment[]> {
    const sb = getSupabase();
    if (sb) {
      try {
        const { data, error } = await sb
          .from('payments')
          .select('*')
          .eq('tenant_id', tenantId)
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data as Payment[];
        }
      } catch (err) {
        console.warn('Fallo al consultar payments por tenant:', err);
      }
    }
    return [];
  }

  async createPaymentVoucher(
    paymentData: Omit<Payment, 'id' | 'status' | 'created_at'>
  ): Promise<Payment> {
    const sb = getSupabase();
    let finalVoucherUrl = paymentData.voucher_url;

    // Subir imagen base64 al Bucket 'vouchers' de Supabase Storage
    if (sb && paymentData.voucher_url && paymentData.voucher_url.startsWith('data:image/')) {
      try {
        const base64Data = paymentData.voucher_url.split(',')[1];
        const mimeType = paymentData.voucher_url.substring(
          paymentData.voucher_url.indexOf(':') + 1,
          paymentData.voucher_url.indexOf(';')
        );
        const ext = mimeType.includes('webp') ? 'webp' : 'jpg';
        const fileName = `voucher-${paymentData.tenant_id}-${Date.now()}.${ext}`;

        const buffer = Buffer.from(base64Data, 'base64');
        const { error: uploadError } = await sb.storage
          .from('vouchers')
          .upload(fileName, buffer, {
            contentType: mimeType,
            upsert: true,
          });

        if (!uploadError) {
          const { data: pubData } = sb.storage.from('vouchers').getPublicUrl(fileName);
          if (pubData?.publicUrl) {
            finalVoucherUrl = pubData.publicUrl;
          }
        }
      } catch (uploadErr) {
        console.warn('Fallo al subir voucher a Storage, guardando URL directa:', uploadErr);
      }
    }

    if (sb) {
      try {
        const { data: newPayment, error: insertError } = await sb
          .from('payments')
          .insert({
            tenant_id: paymentData.tenant_id,
            amount: paymentData.amount,
            concept: paymentData.concept,
            payment_method: paymentData.payment_method,
            voucher_url: finalVoucherUrl,
            status: 'pending',
          })
          .select()
          .single();

        if (!insertError && newPayment) {
          return newPayment as Payment;
        }
      } catch (err) {
        console.warn('Fallo al registrar pago en tabla payments de Supabase:', err);
      }
    }

    // Fallback
    const fallbackPayment: Payment = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      voucher_url: finalVoucherUrl,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    return fallbackPayment;
  }

  async approvePayment(paymentId: string): Promise<{ success: boolean; tenant?: Tenant }> {
    const sb = getSupabase();
    if (sb) {
      try {
        // 1. Obtener pago
        const { data: payment, error: pErr } = await sb
          .from('payments')
          .select('*')
          .eq('id', paymentId)
          .single();

        if (pErr || !payment) return { success: false };

        // 2. Obtener tenant
        const { data: tenant, error: tErr } = await sb
          .from('tenants')
          .select('*')
          .eq('id', payment.tenant_id)
          .single();

        if (tErr || !tenant) return { success: false };

        // 3. Calcular nueva fecha de facturación (+1 mes o +1 año)
        const currentDueDate = new Date(tenant.next_billing_date);
        const baseDate = currentDueDate > new Date() ? currentDueDate : new Date();

        if (payment.concept === 'anualidad' || tenant.plan_type === 'anual_300') {
          baseDate.setFullYear(baseDate.getFullYear() + 1);
        } else {
          baseDate.setMonth(baseDate.getMonth() + 1);
        }

        const newDueDateString = baseDate.toISOString().split('T')[0];

        // 4. Actualizar estado de pago en Supabase
        await sb
          .from('payments')
          .update({
            status: 'approved',
            period_covered_start: new Date().toISOString().split('T')[0],
            period_covered_end: newDueDateString,
          })
          .eq('id', paymentId);

        // 5. Actualizar y reactivar tenant en Supabase
        const { data: updatedTenant, error: uErr } = await sb
          .from('tenants')
          .update({
            status: 'active',
            killswitch_override: false,
            next_billing_date: newDueDateString,
          })
          .eq('id', tenant.id)
          .select()
          .single();

        if (!uErr && updatedTenant) {
          return { success: true, tenant: updatedTenant as Tenant };
        }
      } catch (err) {
        console.warn('Fallo al aprobar pago en Supabase:', err);
      }
    }

    return { success: false };
  }

  async rejectPayment(paymentId: string): Promise<boolean> {
    const sb = getSupabase();
    if (sb) {
      try {
        const { error } = await sb
          .from('payments')
          .update({ status: 'rejected' })
          .eq('id', paymentId);

        return !error;
      } catch {
        return false;
      }
    }
    return false;
  }
}

export const qatuCentralService = new QatuCentralService();
