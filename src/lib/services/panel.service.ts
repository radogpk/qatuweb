import { Business, BusinessCredentials, BusinessStatus, ServiceRequest, UserProfile } from '@/types/panel';
import { MOCK_BUSINESSES, MOCK_CREDENTIALS, MOCK_PROFILES, MOCK_SERVICE_REQUESTS } from './panel.mock';

class PanelService {
  private businesses: Business[] = [...MOCK_BUSINESSES];
  private credentials: Record<string, BusinessCredentials> = { ...MOCK_CREDENTIALS };
  private serviceRequests: ServiceRequest[] = [...MOCK_SERVICE_REQUESTS];
  private profiles: UserProfile[] = [...MOCK_PROFILES];

  // ==========================================
  // NEGOCIOS (BUSINESSES)
  // ==========================================
  
  async getBusinesses(): Promise<Business[]> {
    return [...this.businesses];
  }

  async getBusinessBySlug(slug: string): Promise<Business | null> {
    const biz = this.businesses.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
    return biz || null;
  }

  async getBusinessesByOwner(ownerIdOrEmail: string): Promise<Business[]> {
    return this.businesses.filter(
      (b) => b.owner_id === ownerIdOrEmail || b.owner_email === ownerIdOrEmail
    );
  }

  async updateBusinessStatus(businessId: string, status: BusinessStatus): Promise<Business | null> {
    const index = this.businesses.findIndex((b) => b.id === businessId);
    if (index === -1) return null;
    
    this.businesses[index] = {
      ...this.businesses[index],
      status,
    };
    return { ...this.businesses[index] };
  }

  async createBusiness(newBiz: Omit<Business, 'id' | 'created_at'>): Promise<Business> {
    const id = `biz-${Date.now()}`;
    const business: Business = {
      ...newBiz,
      id,
      created_at: new Date().toISOString(),
    };
    this.businesses.unshift(business);
    return business;
  }

  // ==========================================
  // BÓVEDA DE CREDENCIALES
  // ==========================================

  async getCredentialsByBusinessId(businessId: string): Promise<BusinessCredentials | null> {
    const cred = this.credentials[businessId];
    return cred ? { ...cred } : null;
  }

  async saveCredentials(credentials: Omit<BusinessCredentials, 'id' | 'updated_at'>): Promise<BusinessCredentials> {
    const existing = this.credentials[credentials.business_id];
    const id = existing?.id || `cred-${Date.now()}`;
    const saved: BusinessCredentials = {
      ...credentials,
      id,
      updated_at: new Date().toISOString(),
    };
    this.credentials[credentials.business_id] = saved;
    return saved;
  }

  // ==========================================
  // SOLICITUDES DE SERVICIO
  // ==========================================

  async getServiceRequests(): Promise<ServiceRequest[]> {
    return [...this.serviceRequests];
  }

  async createServiceRequest(req: Omit<ServiceRequest, 'id' | 'created_at' | 'status'>): Promise<ServiceRequest> {
    const newRequest: ServiceRequest = {
      ...req,
      id: `req-${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    this.serviceRequests.unshift(newRequest);
    return newRequest;
  }

  // ==========================================
  // PERFILES & ROLES
  // ==========================================

  async getProfiles(): Promise<UserProfile[]> {
    return [...this.profiles];
  }

  async getProfileByEmail(email: string): Promise<UserProfile | null> {
    const user = this.profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
    return user || null;
  }
}

// Instancia única (Singleton) para mantener estado durante la sesión del servidor
export const panelService = new PanelService();
