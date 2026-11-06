'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Tenant,
  TenantVault,
  Payment,
  TenantStatus,
  TenantPlan,
  TenantRubro,
} from '@/types/qatu';
import { qatuCentralService } from '@/lib/services/qatuCentral.service';
import { createClient } from '@/lib/supabase/client';
import {
  ShieldCheck,
  Power,
  KeyRound,
  ExternalLink,
  PlusCircle,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Eye,
  Zap,
  Activity,
  Check,
  X,
  CreditCard,
  Building,
  Smartphone,
  Globe,
  Database,
  Calendar,
  MessageCircle,
  Filter,
  LogOut,
  ChevronRight,
  Copy,
  Layers,
  ArrowUpRight,
  Loader2,
  ShieldAlert,
} from 'lucide-react';

export default function SuperAdminDashboardPage() {
  const router = useRouter();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [vaults, setVaults] = useState<TenantVault[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'tenants' | 'vault' | 'payments'>('tenants');

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'grace_period' | 'suspended'>('all');
  const [rubroFilter, setRubroFilter] = useState<string>('all');

  // Modales
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [activeVaultTenant, setActiveVaultTenant] = useState<Tenant | null>(null);
  const [activeVaultData, setActiveVaultData] = useState<TenantVault | null>(null);
  const [selectedVoucherPayment, setSelectedVoucherPayment] = useState<Payment | null>(null);
  const [killSwitchConfirmTenant, setKillSwitchConfirmTenant] = useState<Tenant | null>(null);
  const [killSwitchProcessing, setKillSwitchProcessing] = useState(false);

  // Estados de proceso
  const [pingLoading, setPingLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Formulario Wizard Nuevo Tenant
  const [wizardName, setWizardName] = useState('');
  const [wizardSubdomain, setWizardSubdomain] = useState('');
  const [wizardOwnerName, setWizardOwnerName] = useState('');
  const [wizardOwnerEmail, setWizardOwnerEmail] = useState('');
  const [wizardOwnerPhone, setWizardOwnerPhone] = useState('');
  const [wizardRubro, setWizardRubro] = useState<TenantRubro>('comercio');
  const [wizardPlan, setWizardPlan] = useState<TenantPlan>('mensual_30');
  const [wizardVercelUrl, setWizardVercelUrl] = useState('');
  const [wizardGmail, setWizardGmail] = useState('');
  const [wizardSupabaseUrl, setWizardSupabaseUrl] = useState('');
  const [wizardSupabaseAnon, setWizardSupabaseAnon] = useState('');
  const [wizardCreating, setWizardCreating] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tenants');
      if (res.ok) {
        const data = await res.json();
        setTenants(data.tenants || []);
        setVaults(data.vaults || []);
        setPayments(data.payments || []);
        return;
      }
    } catch {
      // Fallback local
    }

    try {
      const [tenantsList, vaultsList, paymentsList] = await Promise.all([
        qatuCentralService.getTenants(),
        qatuCentralService.getAllVaults(),
        qatuCentralService.getPayments(),
      ]);
      setTenants(tenantsList);
      setVaults(vaultsList);
      setPayments(paymentsList);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Manejo de Logout real
  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignorar
    }
    document.cookie = 'qatu_role=; path=/; max-age=0';
    router.push('/login');
  };

  // 1. Kill-Switch Modal Trigger
  const handleToggleKillswitch = (tenant: Tenant) => {
    setKillSwitchConfirmTenant(tenant);
  };

  // Confirmar Kill-Switch
  const executeKillSwitch = async () => {
    if (!killSwitchConfirmTenant) return;
    const tenant = killSwitchConfirmTenant;
    setKillSwitchProcessing(true);

    const isCurrentlyActive = tenant.status === 'active' && !tenant.killswitch_override;
    const nextStatus: TenantStatus = isCurrentlyActive ? 'suspended' : 'active';
    const nextOverride = isCurrentlyActive;

    try {
      const res = await fetch('/api/tenants', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: tenant.id,
          status: nextStatus,
          killswitchOverride: nextOverride,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setTenants((prev) => prev.map((t) => (t.id === tenant.id ? updated : t)));
        showToast(
          nextStatus === 'active'
            ? `✅ "${tenant.business_name}" ACTIVADO con éxito en Cloudflare Edge.`
            : `⚠️ "${tenant.business_name}" SUSPENDIDO. Kill-switch activo en Cloudflare.`
        );
        setKillSwitchConfirmTenant(null);
        return;
      }
    } catch {
      // Fallback
    }

    const updated = await qatuCentralService.updateTenantStatus(
      tenant.id,
      nextStatus,
      nextOverride
    );

    if (updated) {
      setTenants((prev) => prev.map((t) => (t.id === tenant.id ? updated : t)));
      showToast(
        nextStatus === 'active'
          ? `✅ "${tenant.business_name}" ACTIVADO con éxito.`
          : `⚠️ "${tenant.business_name}" SUSPENDIDO por Kill-Switch.`
      );
    }
    setKillSwitchConfirmTenant(null);
    setKillSwitchProcessing(false);
  };

  // 2. Ejecutar Ping Global Anti-Pausa
  const handleExecuteGlobalPing = async () => {
    setPingLoading(true);
    try {
      const res = await qatuCentralService.executeGlobalKeepAlive();
      showToast(
        `⚡ Ping Anti-Pausa completado: ${res.successful} proyectos Supabase Free verificados.`
      );
      await loadData();
    } catch {
      showToast('❌ Error al ejecutar pings.');
    } finally {
      setPingLoading(false);
    }
  };

  // 3. Abrir Bóveda de un Tenant
  const handleOpenVault = async (tenant: Tenant) => {
    setActiveVaultTenant(tenant);
    const vault = await qatuCentralService.getVaultByTenantId(tenant.id);
    setActiveVaultData(vault);
  };

  // 4. Aprobación de Pago Yape / Plin en 1 Toque
  const handleApprovePayment = async (paymentId: string) => {
    try {
      const res = await fetch('/api/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve_payment', paymentId }),
      });
      if (res.ok) {
        showToast('🎉 Pago aprobado con éxito. Subdominio reactivado y fecha extendida.');
        await loadData();
        setSelectedVoucherPayment(null);
        return;
      }
    } catch {
      // Fallback
    }

    const res = await qatuCentralService.approvePayment(paymentId);
    if (res.success && res.tenant) {
      showToast(`🎉 Pago aprobado. Nueva fecha de facturación: ${res.tenant.next_billing_date}`);
      await loadData();
      setSelectedVoucherPayment(null);
    }
  };

  // Rechazar Pago
  const handleRejectPayment = async (paymentId: string) => {
    await qatuCentralService.rejectPayment(paymentId);
    showToast('❌ Comprobante marcado como observado/rechazado.');
    await loadData();
    setSelectedVoucherPayment(null);
  };

  // 5. Crear Nuevo Tenant en el Wizard
  const handleWizardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWizardCreating(true);

    try {
      const nextDue = new Date();
      if (wizardPlan === 'anual_300') {
        nextDue.setFullYear(nextDue.getFullYear() + 1);
      } else {
        nextDue.setMonth(nextDue.getMonth() + 1);
      }

      const tenantPayload = {
        business_name: wizardName.trim(),
        subdomain: wizardSubdomain.toLowerCase().trim(),
        owner_name: wizardOwnerName.trim(),
        owner_email: wizardOwnerEmail.trim(),
        owner_phone: wizardOwnerPhone.trim(),
        rubro: wizardRubro,
        plan_type: wizardPlan,
        status: 'active' as const,
        next_billing_date: nextDue.toISOString().split('T')[0],
        vercel_target_url: wizardVercelUrl.trim(),
        killswitch_override: false,
      };

      const vaultPayload = {
        client_email_account: wizardGmail.trim(),
        client_supabase_url: wizardSupabaseUrl.trim(),
        client_supabase_anon_key: wizardSupabaseAnon.trim(),
      };

      try {
        const res = await fetch('/api/tenants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tenantData: tenantPayload,
            vaultData: vaultPayload,
          }),
        });

        if (res.ok) {
          showToast(`✨ Negocio "${wizardName}" aprovisionado con éxito.`);
          setIsWizardOpen(false);
          await loadData();
          setWizardName('');
          setWizardSubdomain('');
          setWizardVercelUrl('');
          setWizardSupabaseUrl('');
          setWizardSupabaseAnon('');
          setWizardGmail('');
          return;
        }
      } catch {
        // Fallback
      }

      await qatuCentralService.createTenantWithVault(tenantPayload, vaultPayload);

      showToast(`✨ Negocio "${wizardName}" aprovisionado con éxito.`);
      setIsWizardOpen(false);
      await loadData();

      // Reset
      setWizardName('');
      setWizardSubdomain('');
      setWizardVercelUrl('');
      setWizardSupabaseUrl('');
      setWizardSupabaseAnon('');
      setWizardGmail('');
    } finally {
      setWizardCreating(false);
    }
  };

  // Métricas de alto impacto
  const totalTenants = tenants.length;
  const activeTenants = tenants.filter((t) => t.status === 'active' && !t.killswitch_override).length;
  const suspendedTenants = tenants.filter((t) => t.status === 'suspended' || t.killswitch_override).length;
  const pendingPayments = payments.filter((p) => p.status === 'pending');
  const estimatedMRR = tenants.reduce((acc, t) => {
    if (t.status === 'suspended') return acc;
    return acc + (t.plan_type === 'anual_300' ? 25 : 30);
  }, 0);

  // Filtrado de Tenants
  const filteredTenants = useMemo(() => {
    return tenants.filter((t) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.business_name.toLowerCase().includes(q) ||
        t.subdomain.toLowerCase().includes(q) ||
        (t.owner_name && t.owner_name.toLowerCase().includes(q)) ||
        (t.owner_phone && t.owner_phone.includes(q)) ||
        (t.owner_email && t.owner_email.toLowerCase().includes(q));

      const matchesRubro = rubroFilter === 'all' || t.rubro === rubroFilter;

      let matchesStatus = true;
      if (statusFilter === 'active') {
        matchesStatus = t.status === 'active' && !t.killswitch_override;
      } else if (statusFilter === 'grace_period') {
        matchesStatus = t.status === 'grace_period';
      } else if (statusFilter === 'suspended') {
        matchesStatus = t.status === 'suspended' || t.killswitch_override;
      }

      return matchesSearch && matchesRubro && matchesStatus;
    });
  }, [tenants, searchTerm, statusFilter, rubroFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 selection:bg-emerald-500 selection:text-slate-950">
      {/* Toast Notificación */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          CABECERA SUPERIOR: HUB DE GOBERNANZA CENTRAL
          ========================================================================= */}
      <header className="bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-base sm:text-lg tracking-tight text-white">
                    QATU<span className="text-emerald-400">ADMIN</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Gobernanza Edge
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                  Control Central de Subdominios & Bóveda
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Botón Ping Anti-Pausa */}
            <button
              type="button"
              onClick={handleExecuteGlobalPing}
              disabled={pingLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition disabled:opacity-50 cursor-pointer shadow-xs"
              title="Ping preventivo para evitar suspensión de proyectos Supabase Free a los 7 días"
            >
              <Activity className={`w-3.5 h-3.5 ${pingLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Ping Anti-Pausa</span>
            </button>

            <Link
              href="/dashboard/cliente"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/60 transition border border-slate-800"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Vista Cliente</span>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition border border-rose-500/20"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          CONTENIDO PRINCIPAL
          ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Cabecera y botón de aprovisionar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Consola de Infraestructura & Negocios
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Monitoreo de suscripciones activas, corte por kill-switch en Cloudflare Edge y auditoría de pagos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadData}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition shadow-xs"
              title="Recargar datos"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => setIsWizardOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Aprovisionar Nuevo Negocio</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TARJETAS DE MÉTRICAS EJECUTIVAS
            ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-5 shadow-xs space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Negocios
            </span>
            <p className="text-2xl sm:text-3xl font-black text-white">{totalTenants}</p>
            <p className="text-xs text-slate-500 font-medium">Subdominios en qatuweb.com</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-5 shadow-xs space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Activos en Línea
            </span>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400">{activeTenants}</p>
            <p className="text-xs text-slate-500 font-medium">Cloudflare Edge OK</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-5 shadow-xs space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              MRR Proyectado
            </span>
            <p className="text-2xl sm:text-3xl font-black text-amber-400">S/ {estimatedMRR}</p>
            <p className="text-xs text-slate-500 font-medium">Ingresos recurrentes al mes</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-5 shadow-xs space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
              Pagos por Validar
            </span>
            <p className="text-2xl sm:text-3xl font-black text-rose-400">{pendingPayments.length}</p>
            <p className="text-xs text-slate-500 font-medium">Comprobantes Yape/Plin</p>
          </div>
        </div>

        {/* =========================================================================
            PESTAÑAS DE NAVEGACIÓN
            ========================================================================= */}
        <div className="flex border-b border-slate-800 gap-6 text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('tenants')}
            className={`pb-4 px-1 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'tenants'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Negocios & Kill-Switch ({tenants.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vault')}
            className={`pb-4 px-1 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'vault'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Bóveda & Monitor Keep-Alive ({vaults.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('payments')}
            className={`pb-4 px-1 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'payments'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Validación de Pagos</span>
            {pendingPayments.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px]">
                {pendingPayments.length} pendientes
              </span>
            )}
          </button>
        </div>

        {/* =========================================================================
            TAB 1: GESTIÓN DE TENANTS & KILL-SWITCH CLOUDFLARE
            ========================================================================= */}
        {activeTab === 'tenants' && (
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-3xl overflow-hidden shadow-sm space-y-4">
            {/* Barra de Búsqueda y Filtros */}
            <div className="p-4 sm:p-6 border-b border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por negocio, subdominio, dueño o celular..."
                  className="w-full text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-semibold">Estado:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-300 outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">Todos ({tenants.length})</option>
                    <option value="active">Activos</option>
                    <option value="grace_period">En Gracia</option>
                    <option value="suspended">Suspendidos</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-semibold">Rubro:</span>
                  <select
                    value={rubroFilter}
                    onChange={(e) => setRubroFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-300 outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">Todos los rubros</option>
                    <option value="comercio">Comercio</option>
                    <option value="restaurante">Restaurante</option>
                    <option value="gym">Gimnasio</option>
                    <option value="hospedaje">Hospedaje</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tabla de Tenants */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-800">
                    <th className="py-4 px-4 sm:px-6">Negocio / Subdominio</th>
                    <th className="py-4 px-4">Dueño & Contacto</th>
                    <th className="py-4 px-4">Plan & Vencimiento</th>
                    <th className="py-4 px-4 text-center">Kill-Switch (Cloudflare Edge)</th>
                    <th className="py-4 px-4 sm:px-6 text-right">Bóveda</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredTenants.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">
                        No se encontraron negocios con los filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    filteredTenants.map((t) => {
                      const isLive = t.status === 'active' && !t.killswitch_override;
                      const isGrace = t.status === 'grace_period';
                      const cleanPhone = t.owner_phone ? t.owner_phone.replace(/[^0-9]/g, '') : '';

                      return (
                        <tr key={t.id} className="hover:bg-slate-800/30 transition">
                          <td className="py-4 px-4 sm:px-6">
                            <div className="space-y-1">
                              <p className="font-bold text-white text-sm">{t.business_name}</p>
                              <div className="flex items-center gap-2">
                                <a
                                  href={`https://${t.subdomain}.qatuweb.com`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-mono text-xs text-emerald-400 hover:underline inline-flex items-center gap-1"
                                >
                                  <span>{t.subdomain}.qatuweb.com</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                                  {t.rubro}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <p className="font-semibold text-slate-200">
                              {t.owner_name || 'No asignado'}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                              <span>{t.owner_phone || t.owner_email || '-'}</span>
                              {cleanPhone && (
                                <a
                                  href={`https://wa.me/${cleanPhone}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-emerald-400 hover:text-emerald-300 p-1 rounded-md hover:bg-slate-800 transition"
                                  title="Escribir por WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                              {t.plan_type === 'anual_300' ? 'Anual S/ 300' : 'Mensual S/ 30'}
                            </span>
                            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                              <Calendar className="w-3 h-3 text-slate-500" />
                              <span>{t.next_billing_date}</span>
                            </p>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleKillswitch(t)}
                              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                isLive ? 'bg-emerald-500' : 'bg-rose-500'
                              }`}
                              title={
                                isLive
                                  ? 'Click para activar Kill-Switch (suspender subdominio)'
                                  : 'Click para desactivar Kill-Switch (reactivar subdominio)'
                              }
                            >
                              <span
                                className={`pointer-events-none inline-flex items-center justify-center h-6 w-6 transform rounded-full bg-slate-950 shadow-md ring-0 transition duration-200 ease-in-out ${
                                  isLive ? 'translate-x-7' : 'translate-x-0'
                                }`}
                              >
                                <Power
                                  className={`w-3.5 h-3.5 ${
                                    isLive ? 'text-emerald-400' : 'text-rose-400'
                                  }`}
                                />
                              </span>
                            </button>
                            <span
                              className={`block text-[10px] font-bold mt-1 ${
                                isLive
                                  ? 'text-emerald-400'
                                  : isGrace
                                  ? 'text-amber-400'
                                  : 'text-rose-400'
                              }`}
                            >
                              {isLive ? 'Activo en Línea' : isGrace ? 'En Gracia' : 'Suspendido'}
                            </span>
                          </td>

                          <td className="py-4 px-4 sm:px-6 text-right">
                            <button
                              type="button"
                              onClick={() => handleOpenVault(t)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-slate-700"
                            >
                              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                              <span>Credenciales</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: BÓVEDA CONFIDENCIAL & MONITOR ANTI-PAUSA (7 DÍAS)
            ========================================================================= */}
        {activeTab === 'vault' && (
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white">
                  Monitor Anti-Pausa de Proyectos Supabase Free
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Ejecuta pings REST periódicos para garantizar que las bases de datos gratuitas de los clientes no se congelen por inactividad.
                </p>
              </div>

              <button
                type="button"
                onClick={handleExecuteGlobalPing}
                disabled={pingLoading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                <Activity className={`w-4 h-4 ${pingLoading ? 'animate-spin' : ''}`} />
                <span>Ejecutar Ping Preventivo Global</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tenants.map((t) => {
                const vault = vaults.find((v) => v.tenant_id === t.id);

                return (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white">{t.business_name}</h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          vault?.last_ping_status === 'ok'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        Ping: {vault?.last_ping_status === 'ok' ? 'Activo (OK)' : 'Pendiente / Fallido'}
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 font-mono text-slate-400">
                      <p className="truncate">
                        <span className="font-sans text-slate-500">Gmail:</span>{' '}
                        {vault?.client_email_account || '-'}
                      </p>
                      <p className="truncate">
                        <span className="font-sans text-slate-500">Supabase:</span>{' '}
                        {vault?.client_supabase_url || '-'}
                      </p>
                      <p className="text-[11px] text-slate-500 font-sans">
                        Último keep-alive:{' '}
                        {vault?.last_ping_at
                          ? new Date(vault.last_ping_at).toLocaleString()
                          : 'No registrado'}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => handleOpenVault(t)}
                        className="text-xs font-bold text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Ver Llaves y Credenciales</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: VALIDACIÓN DE PAGOS YAPE / PLIN EN 1 TOQUE
            ========================================================================= */}
        {activeTab === 'payments' && (
          <div className="bg-slate-900/70 border border-slate-800/90 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-800">
              <h3 className="font-black text-lg text-white">
                Auditoría y Aprobación de Pagos Yape / Plin
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Verifica las capturas de pantalla enviadas por los comerciantes y aprueba en 1 clic para extender su fecha de vencimiento.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-800">
                    <th className="py-4 px-4 sm:px-6">Negocio</th>
                    <th className="py-4 px-4">Concepto & Monto</th>
                    <th className="py-4 px-4">Método</th>
                    <th className="py-4 px-4">Comprobante</th>
                    <th className="py-4 px-4">Estado</th>
                    <th className="py-4 px-4 sm:px-6 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {payments.map((p) => {
                    const isPending = p.status === 'pending';

                    return (
                      <tr key={p.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-4 px-4 sm:px-6 font-bold text-white">
                          {p.tenant_name || p.subdomain || 'Negocio'}
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-mono font-bold text-white">S/ {p.amount.toFixed(2)}</p>
                          <p className="text-[11px] text-slate-400 uppercase">{p.concept}</p>
                        </td>
                        <td className="py-4 px-4 font-semibold text-slate-300">
                          {p.payment_method}
                        </td>
                        <td className="py-4 px-4">
                          {p.voucher_url ? (
                            <button
                              type="button"
                              onClick={() => setSelectedVoucherPayment(p)}
                              className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold hover:underline cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Inspeccionar Captura</span>
                            </button>
                          ) : (
                            <span className="text-slate-500 text-xs">Sin captura</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                              p.status === 'approved'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : p.status === 'pending'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {p.status === 'approved'
                              ? 'Aprobado'
                              : p.status === 'pending'
                              ? 'Por Revisar'
                              : 'Rechazado'}
                          </span>
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-right">
                          {isPending ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleApprovePayment(p.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xs transition cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Aprobar 1-Toque</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRejectPayment(p.id)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-xs font-bold transition"
                              >
                                Rechazar
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-500">Procesado</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          MODAL: SEGURIDAD KILL-SWITCH (SIN ALERT NATIVO)
          ========================================================================= */}
      {killSwitchConfirmTenant && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150 shadow-2xl">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  killSwitchConfirmTenant.status === 'active' &&
                  !killSwitchConfirmTenant.killswitch_override
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                <Power className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-lg text-white">
                  {killSwitchConfirmTenant.status === 'active' &&
                  !killSwitchConfirmTenant.killswitch_override
                    ? '¿Activar Kill-Switch?'
                    : '¿Reactivar Negocio?'}
                </h4>
                <p className="text-xs text-slate-400">
                  {killSwitchConfirmTenant.business_name} ({killSwitchConfirmTenant.subdomain}
                  .qatuweb.com)
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-2">
              <p>
                <strong>Efecto en Cloudflare Edge:</strong>
              </p>
              {killSwitchConfirmTenant.status === 'active' &&
              !killSwitchConfirmTenant.killswitch_override ? (
                <p className="text-rose-300">
                  Al confirmar la suspensión, cualquier visitante o cliente que ingrese a{' '}
                  <code className="text-white font-mono bg-slate-800 px-1 py-0.5 rounded">
                    {killSwitchConfirmTenant.subdomain}.qatuweb.com
                  </code>{' '}
                  verá inmediatamente la pantalla de corte de servicio por pago pendiente.
                </p>
              ) : (
                <p className="text-emerald-300">
                  El subdominio volverá a estar en línea al instante, enrutando el tráfico hacia el
                  catálogo del comerciante sin ninguna interrupción.
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setKillSwitchConfirmTenant(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={killSwitchProcessing}
                onClick={executeKillSwitch}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer ${
                  killSwitchConfirmTenant.status === 'active' &&
                  !killSwitchConfirmTenant.killswitch_override
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
              >
                {killSwitchProcessing ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Procesando...
                  </span>
                ) : killSwitchConfirmTenant.status === 'active' &&
                  !killSwitchConfirmTenant.killswitch_override ? (
                  'Confirmar Suspensión Inmediata'
                ) : (
                  'Confirmar Reactivación en Línea'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: APROVISIONADOR DE NUEVO CLIENTE (WIZARD)
          ========================================================================= */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] overflow-y-auto animate-in zoom-in-95">
            <div className="bg-slate-950 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-white">Aprovisionar Nuevo Negocio</h3>
                  <p className="text-xs text-slate-400">
                    Alta de subdominio e infraestructura en Cloudflare Edge
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsWizardOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleWizardSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Nombre del Negocio *</label>
                <input
                  type="text"
                  required
                  value={wizardName}
                  onChange={(e) => {
                    setWizardName(e.target.value);
                    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');
                    setWizardSubdomain(slug);
                    setWizardVercelUrl(`https://${slug}-qatu.vercel.app`);
                  }}
                  placeholder="Ej: Joyería Ayacucho"
                  className="w-full text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Subdominio (*.qatuweb.com) *
                  </label>
                  <input
                    type="text"
                    required
                    value={wizardSubdomain}
                    onChange={(e) =>
                      setWizardSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))
                    }
                    placeholder="joyeriaayacucho"
                    className="w-full text-xs sm:text-sm font-mono bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Rubro</label>
                  <select
                    value={wizardRubro}
                    onChange={(e) => setWizardRubro(e.target.value as any)}
                    className="w-full text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="comercio">Comercio / Tienda</option>
                    <option value="restaurante">Restaurante / Cafetería</option>
                    <option value="gym">Gimnasio / Academia</option>
                    <option value="hospedaje">Hospedaje / Hotel</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Nombre del Dueño</label>
                  <input
                    type="text"
                    value={wizardOwnerName}
                    onChange={(e) => setWizardOwnerName(e.target.value)}
                    placeholder="Nombre completo"
                    className="w-full text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">WhatsApp del Dueño</label>
                  <input
                    type="tel"
                    value={wizardOwnerPhone}
                    onChange={(e) => setWizardOwnerPhone(e.target.value)}
                    placeholder="+51 966 000 000"
                    className="w-full text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Plan de Suscripción</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWizardPlan('mensual_30')}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                      wizardPlan === 'mensual_30'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Mensual (S/ 30/mes)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWizardPlan('anual_300')}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                      wizardPlan === 'anual_300'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Anual (S/ 300/año)
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Credenciales de Infraestructura Aislada</span>
                </h4>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">URL Proyecto Vercel *</label>
                  <input
                    type="url"
                    required
                    value={wizardVercelUrl}
                    onChange={(e) => setWizardVercelUrl(e.target.value)}
                    placeholder="https://...vercel.app"
                    className="w-full text-xs font-mono bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Correo Gmail Creado</label>
                    <input
                      type="email"
                      value={wizardGmail}
                      onChange={(e) => setWizardGmail(e.target.value)}
                      placeholder="negocio.aya@gmail.com"
                      className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">URL Supabase Proyecto</label>
                    <input
                      type="url"
                      value={wizardSupabaseUrl}
                      onChange={(e) => setWizardSupabaseUrl(e.target.value)}
                      placeholder="https://...supabase.co"
                      className="w-full text-xs font-mono bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Supabase Anon Key</label>
                  <input
                    type="text"
                    value={wizardSupabaseAnon}
                    onChange={(e) => setWizardSupabaseAnon(e.target.value)}
                    placeholder="eyJhbGciOi..."
                    className="w-full text-xs font-mono bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsWizardOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={wizardCreating}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 text-xs font-black shadow-md transition disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {wizardCreating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Aprovisionando...</span>
                    </>
                  ) : (
                    <span>Completar Aprovisionamiento</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: BÓVEDA CONFIDENCIAL DETALLADA
          ========================================================================= */}
      {activeVaultTenant && activeVaultData && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-lg text-white">
                  Bóveda: {activeVaultTenant.business_name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveVaultTenant(null);
                  setActiveVaultData(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white text-xs transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  Cuenta Google / Gmail
                </span>
                <span className="font-semibold text-slate-200">
                  {activeVaultData.client_email_account}
                </span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 font-mono">
                <span className="text-slate-500 block text-[10px] uppercase font-bold font-sans">
                  URL Supabase
                </span>
                <span className="text-emerald-400 break-all">{activeVaultData.client_supabase_url}</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 font-mono">
                <span className="text-slate-500 block text-[10px] uppercase font-bold font-sans">
                  Supabase Anon Key
                </span>
                <span className="text-slate-300 break-all">{activeVaultData.client_supabase_anon_key}</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 font-mono">
                <span className="text-slate-500 block text-[10px] uppercase font-bold font-sans">
                  Vercel Target
                </span>
                <span className="text-slate-300 break-all">{activeVaultTenant.vercel_target_url}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setActiveVaultTenant(null);
                  setActiveVaultData(null);
                }}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Cerrar Bóveda
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: INSPECCIÓN DE COMPROBANTE Y VALIDACIÓN 1-TOQUE
          ========================================================================= */}
      {selectedVoucherPayment && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 animate-in zoom-in-95 shadow-2xl text-center">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="text-left">
                <span className="font-black text-sm text-white block">
                  Comprobante: {selectedVoucherPayment.tenant_name || selectedVoucherPayment.subdomain}
                </span>
                <span className="text-xs text-slate-400">
                  {selectedVoucherPayment.payment_method} • S/ {selectedVoucherPayment.amount.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVoucherPayment(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white text-xs transition"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 max-h-80 flex items-center justify-center p-2">
              <img
                src={selectedVoucherPayment.voucher_url}
                alt="Comprobante Yape"
                className="max-h-72 w-auto object-contain rounded-xl mx-auto shadow-sm"
              />
            </div>

            <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-around">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Concepto</span>
                <span className="font-bold capitalize">{selectedVoucherPayment.concept}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Monto</span>
                <span className="font-bold text-emerald-400 font-mono">
                  S/ {selectedVoucherPayment.amount.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Estado</span>
                <span className="font-bold capitalize">{selectedVoucherPayment.status}</span>
              </div>
            </div>

            {selectedVoucherPayment.status === 'pending' && (
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRejectPayment(selectedVoucherPayment.id)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold text-xs transition"
                >
                  Observar / Rechazar
                </button>
                <button
                  type="button"
                  onClick={() => handleApprovePayment(selectedVoucherPayment.id)}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition cursor-pointer"
                >
                  Aprobar en 1-Toque
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
