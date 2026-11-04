export type UserRole = 'admin' | 'client';

export type BusinessStatus = 'active' | 'suspended' | 'grace';

export type BusinessPlan = 'monthly' | 'yearly';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  role: UserRole;
  created_at: string;
}

export interface Business {
  id: string;
  owner_id?: string;
  owner_email?: string;
  owner_name?: string;
  name: string;
  slug: string; // ej: 'calzados-lucas' -> calzados-lucas.qatuweb.com
  target_url: string; // ej: 'https://calzados-lucas.vercel.app'
  custom_admin_url?: string; // ej: 'https://calzados-lucas.vercel.app/admin'
  status: BusinessStatus;
  plan: BusinessPlan;
  price: number;
  currency: string;
  billing_cycle_day: number;
  next_due_date: string;
  owner_phone?: string;
  notes?: string;
  created_at: string;
}

export interface BusinessCredentials {
  id: string;
  business_id: string;
  gmail_account?: string;
  gmail_password?: string; // Descifrado para la UI del Super Admin
  recovery_phone?: string;
  github_repo_url?: string;
  vercel_project_url?: string;
  supabase_project_url?: string;
  supabase_anon_key?: string;
  extra_notes?: string;
  updated_at: string;
}

export interface ServiceRequest {
  id: string;
  client_id: string;
  client_name?: string;
  client_email?: string;
  business_name: string;
  business_type: string;
  phone_contact: string;
  details?: string;
  status: 'pending' | 'contacted' | 'completed';
  created_at: string;
}

export interface DomainStatusResponse {
  found: boolean;
  status: BusinessStatus;
  target_url?: string;
  name?: string;
  slug?: string;
}
