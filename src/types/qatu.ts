export type UserRole = 'super_admin' | 'client';

export type TenantRubro = 'comercio' | 'restaurante' | 'gym' | 'hospedaje' | 'otro';

export type TenantPlan = 'mensual_30' | 'anual_300';

export type TenantStatus = 'active' | 'grace_period' | 'suspended' | 'deploying';

export type PaymentConcept = 'mensualidad' | 'anualidad' | 'instalacion' | 'modulo_extra';

export type PaymentMethod = 'Yape' | 'Plin' | 'Transferencia' | 'Efectivo';

export type PaymentStatus = 'pending' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  phone?: string;
  dni_ruc?: string;
  created_at: string;
}

export interface Tenant {
  id: string;
  owner_id?: string;
  owner_name?: string;
  owner_email?: string;
  owner_phone?: string;
  business_name: string;
  subdomain: string; // ej: "calzadoslucas"
  custom_domain?: string;
  rubro: TenantRubro;
  plan_type: TenantPlan;
  status: TenantStatus;
  next_billing_date: string;
  vercel_target_url: string;
  killswitch_override: boolean;
  created_at: string;
}

export interface TenantVault {
  id: string;
  tenant_id: string;
  client_email_account: string;
  client_supabase_url: string;
  client_supabase_anon_key: string;
  client_supabase_service_key?: string;
  client_vercel_project_id?: string;
  github_repo_url?: string;
  last_ping_at?: string;
  last_ping_status?: 'ok' | 'error';
  created_at?: string;
}

export interface Payment {
  id: string;
  tenant_id: string;
  tenant_name?: string;
  subdomain?: string;
  amount: number;
  concept: PaymentConcept;
  payment_method: PaymentMethod;
  voucher_url?: string;
  status: PaymentStatus;
  period_covered_start?: string;
  period_covered_end?: string;
  created_at: string;
}

export interface DomainStatusResponse {
  active: boolean;
  targetUrl?: string;
  businessName?: string;
  subdomain?: string;
  reason?: 'payment_overdue' | 'killswitch_override' | 'not_found' | 'deploying';
  renewalAmount?: number;
}
