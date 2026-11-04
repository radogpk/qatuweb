'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Tenant,
  TenantVault,
  Payment,
  TenantStatus,
  TenantPlan,
  TenantRubro,
} from '@/types/qatu';
import { qatuCentralService } from '@/lib/services/qatuCentral.service';
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
} from 'lucide-react';

export default function SuperAdminDashboardPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [vaults, setVaults] = useState<TenantVault[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'tenants' | 'vault' | 'payments'>('tenants');

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'grace_period' | 'suspended'>('all');

  // Modales
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [activeVaultTenant, setActiveVaultTenant] = useState<Tenant | null>(null);
  const [activeVaultData, setActiveVaultData] = useState<TenantVault | null>(null);
  const [selectedVoucherPayment, setSelectedVoucherPayment] = useState<Payment | null>(null);

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
      // Fallback local si falla la red
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

  // 1. Kill-Switch Instantáneo
  const handleToggleKillswitch = async (tenant: Tenant) => {
    const isCurrentlyActive = tenant.status === 'active' && !tenant.killswitch_override;
    const nextStatus: TenantStatus = isCurrentlyActive ? 'suspended' : 'active';
    const nextOverride = isCurrentlyActive;

    const message = isCurrentlyActive
      ? `¿Activar corte Kill-Switch en "${tenant.business_name}" (${tenant.subdomain}.qatuweb.com)? Cloudflare mostrará la pantalla de suspensión inmediatamente.`
      : `¿Reactivar "${tenant.business_name}"? El subdominio volverá a responder en línea.`;

    if (!window.confirm(message)) return;

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
            ? `✅ "${tenant.business_name}" ACTIVADO con éxito.`
            : `⚠️ "${tenant.business_name}" SUSPENDIDO por Kill-Switch.`
        );
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
  };

  // 2. Ejecutar Ping Global Anti-Pausa
  const handleExecuteGlobalPing = async () => {
    setPingLoading(true);
    try {
      const res = await qatuCentralService.executeGlobalKeepAlive();
      showToast(`⚡ Ping Anti-Pausa completado: ${res.successful} proyectos Supabase Free verificados.`);
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
        showToast('🎉 Pago aprobado con éxito.');
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
          showToast(`✨ Tenant "${wizardName}" aprovisionado con éxito.`);
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

      showToast(`✨ Tenant "${wizardName}" aprovisionado con éxito.`);
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

  // Métricas
  const totalTenants = tenants.length;
  const activeTenants = tenants.filter((t) => t.status === 'active' && !t.killswitch_override).length;
  const pendingPayments = payments.filter((p) => p.status === 'pending');
  const estimatedMRR = tenants.reduce((acc, t) => {
    if (t.status === 'suspended') return acc;
    return acc + (t.plan_type === 'anual_300' ? 25 : 30);
  }, 0);

  // Filtrado de Tenants
  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      t.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subdomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.owner_name && t.owner_name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (statusFilter === 'active') return matchesSearch && t.status === 'active' && !t.killswitch_override;
    if (statusFilter === 'grace_period') return matchesSearch && t.status === 'grace_period';
    if (statusFilter === 'suspended') return matchesSearch && (t.status === 'suspended' || t.killswitch_override);
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5EFE4] text-stone-900 pb-20 font-sans">
      {/* Toast Notificación */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs sm:text-sm px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-500/30 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-5">
          <Zap className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header de Gobernanza Central */}
      <header className="bg-stone-900 text-white sticky top-0 z-30 shadow-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-white">
              Qatu<span className="text-[#B23A2E]">.web</span>
            </Link>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Hub Super Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Botón Ping Global Anti-Pausa */}
            <button
              type="button"
              onClick={handleExecuteGlobalPing}
              disabled={pingLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition disabled:opacity-50"
              title="Hace un ping a cada Supabase gratuito para evitar que se pause a los 7 días"
            >
              <Activity className={`w-3.5 h-3.5 ${pingLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Ping Anti-Pausa</span>
            </button>

            <Link
              href="/dashboard/cliente"
              className="text-xs text-stone-300 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-stone-800"
            >
              Portal Cliente
            </Link>

            <Link
              href="/login"
              className="text-xs text-stone-400 hover:text-red-400 px-2 py-1.5"
            >
              Salir
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Cabecera de Estadísticas y Acciones */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Centro de Gobernanza Qatu Web
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Control de subdominios, kill-switch en Cloudflare Edge y bóveda de cuentas aisladas.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsWizardOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold shadow-md transition"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Aprovisionar Nuevo Negocio</span>
          </button>
        </div>

        {/* Tarjetas Métricas Rápidas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Total Tenants</p>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">{totalTenants}</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Infraestructuras aisladas</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Activos en Línea</p>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-emerald-700 mt-1">{activeTenants}</p>
            <p className="text-[11px] text-emerald-600/80 mt-0.5">Tráfico validado por Worker</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">MRR Recurrente</p>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-800 mt-1">S/ {estimatedMRR}</p>
            <p className="text-[11px] text-amber-700/80 mt-0.5">Ingreso mensual proyectado</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Pagos por Aprobar</p>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-rose-700 mt-1">{pendingPayments.length}</p>
            <p className="text-[11px] text-rose-600/80 mt-0.5">Comprobantes Yape/Plin</p>
          </div>
        </div>

        {/* Pestañas de Navegación del Hub */}
        <div className="flex border-b border-stone-300 gap-4 text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('tenants')}
            className={`pb-3 px-1 border-b-2 transition ${
              activeTab === 'tenants'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Negocios & Kill-Switch ({tenants.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vault')}
            className={`pb-3 px-1 border-b-2 transition ${
              activeTab === 'vault'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Bóveda de Credenciales & Monitor ({vaults.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('payments')}
            className={`pb-3 px-1 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'payments'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Validación Pagos Yape</span>
            {pendingPayments.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] flex items-center justify-center font-bold">
                {pendingPayments.length}
              </span>
            )}
          </button>
        </div>

        {/* =========================================================================
            TAB 1: GESTOR DE CLIENTES Y KILL-SWITCH EN 1 CLIC
            ========================================================================= */}
        {activeTab === 'tenants' && (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
            {/* Barra de Filtros */}
            <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por negocio, subdominio o dueño..."
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-stone-500 font-semibold">Estado:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">Todos ({tenants.length})</option>
                  <option value="active">Activos</option>
                  <option value="grace_period">En Gracia</option>
                  <option value="suspended">Suspendidos</option>
                </select>
              </div>
            </div>

            {/* Tabla de Tenants */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[11px] font-semibold">
                    <th className="py-3.5 px-4 sm:px-6">Negocio / Subdominio</th>
                    <th className="py-3.5 px-4">Dueño & Teléfono</th>
                    <th className="py-3.5 px-4">Plan & Vencimiento</th>
                    <th className="py-3.5 px-4 text-center">Kill-Switch (Cloudflare)</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Bóveda</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredTenants.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-stone-400">
                        No se encontraron negocios con esos filtros.
                      </td>
                    </tr>
                  ) : (
                    filteredTenants.map((t) => {
                      const isLive = t.status === 'active' && !t.killswitch_override;
                      const isGrace = t.status === 'grace_period';

                      return (
                        <tr key={t.id} className="hover:bg-amber-50/20 transition-colors">
                          <td className="py-4 px-4 sm:px-6">
                            <p className="font-bold text-stone-900">{t.business_name}</p>
                            <a
                              href={t.vercel_target_url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-mono text-xs text-amber-700 hover:underline inline-flex items-center gap-1 mt-0.5"
                            >
                              <span>{t.subdomain}.qatuweb.com</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>

                          <td className="py-4 px-4">
                            <p className="font-medium text-stone-800">{t.owner_name || 'No asignado'}</p>
                            <p className="text-[11px] text-stone-500">{t.owner_phone || t.owner_email || '-'}</p>
                          </td>

                          <td className="py-4 px-4">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-stone-100 text-stone-800">
                              {t.plan_type === 'anual_300' ? 'Anual S/ 300' : 'Mensual S/ 30'}
                            </span>
                            <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Vence: {t.next_billing_date}</span>
                            </p>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleKillswitch(t)}
                              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                isLive ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-flex items-center justify-center h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                  isLive ? 'translate-x-7' : 'translate-x-0'
                                }`}
                              >
                                <Power className={`w-3.5 h-3.5 ${isLive ? 'text-emerald-600' : 'text-rose-600'}`} />
                              </span>
                            </button>
                            <span
                              className={`block text-[10px] font-bold mt-1 ${
                                isLive
                                  ? 'text-emerald-700'
                                  : isGrace
                                  ? 'text-amber-700'
                                  : 'text-rose-700'
                              }`}
                            >
                              {isLive ? 'Activo' : isGrace ? 'En Gracia' : 'Suspendido'}
                            </span>
                          </td>

                          <td className="py-4 px-4 sm:px-6 text-right">
                            <button
                              type="button"
                              onClick={() => handleOpenVault(t)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs transition"
                            >
                              <KeyRound className="w-3.5 h-3.5 text-amber-600" />
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
            TAB 2: BÓVEDA CONFIDENCIAL Y MONITOR ANTI-PAUSA (7 DÍAS)
            ========================================================================= */}
        {activeTab === 'vault' && (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-serif text-stone-900">
                  Monitor Anti-Pausa de Proyectos Supabase Free
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Garantiza que ningún proyecto gratuito se congele por los 7 días de inactividad de Supabase.
                </p>
              </div>

              <button
                type="button"
                onClick={handleExecuteGlobalPing}
                disabled={pingLoading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition disabled:opacity-50"
              >
                <Activity className={`w-4 h-4 ${pingLoading ? 'animate-spin' : ''}`} />
                <span>Ejecutar Ping Global Ahora</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tenants.map((t) => {
                const vault = vaults.find((v) => v.tenant_id === t.id);

                return (
                  <div
                    key={t.id}
                    className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-stone-900">{t.business_name}</h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          vault?.last_ping_status === 'ok'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        Ping: {vault?.last_ping_status === 'ok' ? 'Activo (OK)' : 'Pendiente / Fallido'}
                      </span>
                    </div>

                    <div className="text-xs space-y-1 font-mono text-stone-600">
                      <p className="truncate">
                        <span className="font-sans text-stone-400 font-normal">Cuenta:</span> {vault?.client_email_account || '-'}
                      </p>
                      <p className="truncate">
                        <span className="font-sans text-stone-400 font-normal">Supabase:</span> {vault?.client_supabase_url || '-'}
                      </p>
                      <p className="text-[11px] text-stone-400 font-sans">
                        Último keep-alive: {vault?.last_ping_at ? new Date(vault.last_ping_at).toLocaleString() : 'No registrado'}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => handleOpenVault(t)}
                        className="text-xs font-semibold text-amber-800 hover:underline inline-flex items-center gap-1"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        Ver Llaves y Credenciales
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: APROBACIÓN DE PAGOS YAPE / PLIN EN 1 TOQUE
            ========================================================================= */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-stone-200">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Historial y Comprobantes Yape / Plin
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Valida las capturas de pantalla de los comerciantes para extender su fecha de vencimiento en 1 toque.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[11px] font-semibold">
                    <th className="py-3.5 px-4 sm:px-6">Negocio</th>
                    <th className="py-3.5 px-4">Concepto & Monto</th>
                    <th className="py-3.5 px-4">Método</th>
                    <th className="py-3.5 px-4">Comprobante</th>
                    <th className="py-3.5 px-4">Estado</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {payments.map((p) => {
                    const isPending = p.status === 'pending';

                    return (
                      <tr key={p.id} className="hover:bg-amber-50/20">
                        <td className="py-4 px-4 sm:px-6 font-bold text-stone-900">
                          {p.tenant_name || p.subdomain || 'Negocio'}
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-stone-900">S/ {p.amount.toFixed(2)}</p>
                          <p className="text-[11px] text-stone-500 uppercase">{p.concept}</p>
                        </td>
                        <td className="py-4 px-4 font-semibold text-stone-800">
                          {p.payment_method}
                        </td>
                        <td className="py-4 px-4">
                          {p.voucher_url ? (
                            <button
                              type="button"
                              onClick={() => setSelectedVoucherPayment(p)}
                              className="inline-flex items-center gap-1 text-xs text-amber-800 font-bold hover:underline"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Ver Voucher
                            </button>
                          ) : (
                            <span className="text-stone-400 text-xs">Sin captura</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              p.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : p.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {p.status === 'approved' ? 'Aprobado' : p.status === 'pending' ? 'Por Revisar' : 'Rechazado'}
                          </span>
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-right">
                          {isPending ? (
                            <button
                              type="button"
                              onClick={() => handleApprovePayment(p.id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Aprobar</span>
                            </button>
                          ) : (
                            <span className="text-xs text-stone-400">Procesado</span>
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
          MODAL: APROVISIONADOR DE NUEVO CLIENTE (WIZARD DE DESPLIEGUE)
          ========================================================================= */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[92vh] overflow-y-auto animate-in zoom-in-95">
            <div className="bg-stone-900 text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg">Aprovisionar Nuevo Negocio</h3>
                  <p className="text-xs text-stone-400">Alta de subdominio e infraestructura aislada</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsWizardOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleWizardSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Nombre del Negocio *</label>
                <input
                  type="text"
                  required
                  value={wizardName}
                  onChange={(e) => {
                    setWizardName(e.target.value);
                    const slug = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]/g, '');
                    setWizardSubdomain(slug);
                    setWizardVercelUrl(`https://${slug}-qatu.vercel.app`);
                  }}
                  placeholder="Ej: Calzados Lucas"
                  className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Subdominio (*.qatuweb.com) *</label>
                  <input
                    type="text"
                    required
                    value={wizardSubdomain}
                    onChange={(e) => setWizardSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                    placeholder="calzadoslucas"
                    className="w-full text-sm font-mono bg-stone-50 border border-stone-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Rubro</label>
                  <select
                    value={wizardRubro}
                    onChange={(e) => setWizardRubro(e.target.value as any)}
                    className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2"
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
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Nombre del Dueño</label>
                  <input
                    type="text"
                    value={wizardOwnerName}
                    onChange={(e) => setWizardOwnerName(e.target.value)}
                    placeholder="Lucas Mendoza"
                    className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">WhatsApp del Dueño</label>
                  <input
                    type="tel"
                    value={wizardOwnerPhone}
                    onChange={(e) => setWizardOwnerPhone(e.target.value)}
                    placeholder="+51 966 888 777"
                    className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Plan de Suscripción</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWizardPlan('mensual_30')}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                      wizardPlan === 'mensual_30'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700'
                    }`}
                  >
                    Mensual (S/ 30/mes)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWizardPlan('anual_300')}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                      wizardPlan === 'anual_300'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700'
                    }`}
                  >
                    Anual (S/ 300/año)
                  </button>
                </div>
              </div>

              <div className="border-t border-stone-200 pt-3 space-y-3">
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  Credenciales de Infraestructura Aislada
                </h4>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">URL Proyecto Vercel *</label>
                  <input
                    type="url"
                    required
                    value={wizardVercelUrl}
                    onChange={(e) => setWizardVercelUrl(e.target.value)}
                    placeholder="https://...vercel.app"
                    className="w-full text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl px-3 py-2"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">Correo Gmail Creado</label>
                    <input
                      type="email"
                      value={wizardGmail}
                      onChange={(e) => setWizardGmail(e.target.value)}
                      placeholder="negocio.aya@gmail.com"
                      className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">URL Supabase Proyecto</label>
                    <input
                      type="url"
                      value={wizardSupabaseUrl}
                      onChange={(e) => setWizardSupabaseUrl(e.target.value)}
                      placeholder="https://...supabase.co"
                      className="w-full text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl px-3 py-2"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Supabase Anon Key</label>
                  <input
                    type="text"
                    value={wizardSupabaseAnon}
                    onChange={(e) => setWizardSupabaseAnon(e.target.value)}
                    placeholder="eyJhbGciOi..."
                    className="w-full text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsWizardOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={wizardCreating}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition"
                >
                  {wizardCreating ? 'Aprovisionando...' : 'Completar Aprovisionamiento'}
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
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Bóveda: {activeVaultTenant.business_name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveVaultTenant(null);
                  setActiveVaultData(null);
                }}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Cuenta Google</span>
                <span className="font-semibold text-stone-900">{activeVaultData.client_email_account}</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 font-mono">
                <span className="text-stone-400 block text-[10px] uppercase font-bold font-sans">URL Supabase</span>
                <span className="text-stone-900 break-all">{activeVaultData.client_supabase_url}</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 font-mono">
                <span className="text-stone-400 block text-[10px] uppercase font-bold font-sans">Anon Key</span>
                <span className="text-stone-900 break-all">{activeVaultData.client_supabase_anon_key}</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 font-mono">
                <span className="text-stone-400 block text-[10px] uppercase font-bold font-sans">Vercel Target</span>
                <span className="text-stone-900 break-all">{activeVaultTenant.vercel_target_url}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setActiveVaultTenant(null);
                  setActiveVaultData(null);
                }}
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold"
              >
                Cerrar Bóveda
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: VISTA DE VOUCHER YAPE / PLIN
          ========================================================================= */}
      {selectedVoucherPayment && (
        <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-5 space-y-4 animate-in zoom-in-95 text-center">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <span className="font-bold text-sm text-stone-900">Comprobante de Pago</span>
              <button
                type="button"
                onClick={() => setSelectedVoucherPayment(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 max-h-80 flex items-center justify-center">
              <img
                src={selectedVoucherPayment.voucher_url}
                alt="Comprobante"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="text-xs text-stone-600">
              <p>Monto: <strong>S/ {selectedVoucherPayment.amount.toFixed(2)}</strong> ({selectedVoucherPayment.payment_method})</p>
              <p>Concepto: <strong>{selectedVoucherPayment.concept}</strong></p>
            </div>

            {selectedVoucherPayment.status === 'pending' && (
              <button
                type="button"
                onClick={() => handleApprovePayment(selectedVoucherPayment.id)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
              >
                Aprobar y Extender Fecha
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
