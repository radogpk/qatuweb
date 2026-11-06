'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Tenant, Payment, PaymentConcept } from '@/types/qatu';
import { qatuCentralService } from '@/lib/services/qatuCentral.service';
import { compressImageToWebP } from '@/templates/storefront-base/imageCompressor';
import { createClient } from '@/lib/supabase/client';
import {
  Store,
  Globe,
  ExternalLink,
  Smartphone,
  QrCode,
  Upload,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Sparkles,
  MessageCircle,
  Zap,
  Phone,
  Copy,
  Check,
  LogOut,
  Camera,
  Layers,
  ShieldCheck,
  Receipt,
  Download,
  Share2,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { siteConfig } from '@/lib/config/site';

export default function ClienteDashboardPage() {
  const router = useRouter();
  const yapeNumber = siteConfig.yapeNumber || '966 888 777';
  const yapeTitular = siteConfig.yapeTitular || 'Luis Gerardo Llocclla Sauñe (Qatu Web)';
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedTenantIndex, setSelectedTenantIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Estados de interacción
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Módulo de Renovación Yape / Plin
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [voucherDataUrl, setVoucherDataUrl] = useState<string | null>(null);
  const [voucherMethod, setVoucherMethod] = useState<'Yape' | 'Plin'>('Yape');
  const [voucherAmount, setVoucherAmount] = useState('30.00');
  const [uploadingVoucher, setUploadingVoucher] = useState(false);

  // Modal para ver QR de difusión de tienda
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cargar usuario autenticado y sus negocios
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let clientEmail = user?.email || null;
      let clientName =
        user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        (user?.email ? user.email.split('@')[0] : null);

      setUserEmail(clientEmail);
      setUserName(clientName);

      // Obtener todos los tenants (Intentar API con credenciales service-role primero)
      let allTenants: Tenant[] = [];
      try {
        const res = await fetch('/api/tenants');
        if (res.ok) {
          const apiData = await res.json();
          if (Array.isArray(apiData.tenants) && apiData.tenants.length > 0) {
            allTenants = apiData.tenants;
          }
        }
      } catch {
        // Fallback local
      }

      if (allTenants.length === 0) {
        allTenants = await qatuCentralService.getTenants();
      }

      // Si hay usuario autenticado, buscar sus tenants asignados
      let userTenants: Tenant[] = [];
      if (clientEmail) {
        userTenants = allTenants.filter(
          (t) =>
            t.owner_email?.toLowerCase() === clientEmail?.toLowerCase() ||
            t.owner_id === user?.id
        );
      }

      // Si no tiene o es modo visitante/demo, mostrar Calzados Lucas como comercio insigne
      if (userTenants.length === 0) {
        userTenants = allTenants.filter(
          (t) => t.subdomain === 'calzadoslucas' || t.owner_name?.includes('Lucas')
        );
        if (userTenants.length === 0 && allTenants.length > 0) {
          userTenants = [allTenants[0]];
        }
      }

      setTenants(userTenants);

      // Cargar pagos asociados
      const activeTenant = userTenants[0];
      if (activeTenant) {
        try {
          const res = await fetch(`/api/tenants?tenantId=${encodeURIComponent(activeTenant.id)}`);
          if (res.ok) {
            const apiData = await res.json();
            if (Array.isArray(apiData.payments)) {
              setPayments(apiData.payments);
            }
          } else {
            const tenantPayments = await qatuCentralService.getPaymentsByTenant(activeTenant.id);
            setPayments(tenantPayments);
          }
        } catch {
          const tenantPayments = await qatuCentralService.getPaymentsByTenant(activeTenant.id);
          setPayments(tenantPayments);
        }
        setVoucherAmount(activeTenant.plan_type === 'anual_300' ? '300.00' : '30.00');
      }
    } catch {
      // Fallback seguro
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const tenant = tenants[selectedTenantIndex] || tenants[0];

  // Cálculo de días restantes
  const calculateDaysRemaining = (dueDate: string) => {
    if (!dueDate) return 0;
    const diff = new Date(dueDate).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = tenant ? calculateDaysRemaining(tenant.next_billing_date) : 0;
  const isSuspended = tenant ? tenant.status === 'suspended' || tenant.killswitch_override : false;
  const isGrace = tenant
    ? tenant.status === 'grace_period' || (daysRemaining <= 3 && daysRemaining >= 0)
    : false;

  const publicUrl = tenant
    ? tenant.custom_domain
      ? `https://${tenant.custom_domain}`
      : `https://${tenant.subdomain}.qatuweb.com`
    : 'https://qatuweb.com';

  const pocketAdminUrl = tenant ? `/demo/${tenant.rubro || 'comercio'}/admin` : '/demo/calzados/admin';

  // Copiar enlace al portapapeles
  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    showToast('📋 ¡Enlace copiado al portapapeles!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Copiar número Yape
  const handleCopyPhone = () => {
    const rawDigits = yapeNumber.replace(/[^0-9]/g, '');
    navigator.clipboard.writeText(rawDigits);
    setCopiedPhone(true);
    showToast(`📱 Número ${yapeNumber} copiado para Yape / Plin`);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  // Cerrar sesión real
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

  // Subida de captura de Yape comprimida en WebP
  const handleVoucherFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await compressImageToWebP(file, 800, 0.8);
      setVoucherDataUrl(result.dataUrl);
    } catch {
      alert('Error al comprimir la captura de pago.');
    }
  };

  // Enviar Comprobante
  const handleSendPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherDataUrl || !tenant) return;

    setUploadingVoucher(true);
    try {
      const payload = {
        tenant_id: tenant.id,
        tenant_name: tenant.business_name,
        subdomain: tenant.subdomain,
        amount: parseFloat(voucherAmount),
        concept: (tenant.plan_type === 'anual_300' ? 'anualidad' : 'mensualidad') as PaymentConcept,
        payment_method: voucherMethod,
        voucher_url: voucherDataUrl,
      };

      let newPayment: Payment | null = null;
      try {
        const res = await fetch('/api/tenants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'upload_voucher',
            paymentData: payload,
          }),
        });
        if (res.ok) {
          newPayment = (await res.json()) as Payment;
        }
      } catch {
        // Fallback local
      }

      if (!newPayment) {
        newPayment = await qatuCentralService.createPaymentVoucher(payload);
      }

      // Refrescar pagos locales
      setPayments((prev) => [newPayment!, ...prev]);
      showToast('🎉 ¡Comprobante enviado con éxito! El equipo de Qatu lo validará en breve.');
      setIsVoucherModalOpen(false);
      setVoucherDataUrl(null);
    } catch {
      alert('Error al registrar el comprobante. Por favor intenta de nuevo.');
    } finally {
      setUploadingVoucher(false);
    }
  };

  // Generar QR oficial para el mostrador de la tienda
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
    publicUrl
  )}&margin=10`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      {/* Toast Flotante */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-emerald-500/40 animate-in fade-in slide-in-from-top-4">
          <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          BARRA DE NAVEGACIÓN SUPERIOR (RESPONSIVA)
          ========================================================================= */}
      <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo y contexto del negocio */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-emerald-400 flex items-center justify-center font-bold shadow-xs">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg tracking-tight text-slate-900">
                  {tenant?.business_name || 'Mi Negocio'}
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Ayacucho
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Portal de Autogestión del Comerciante
              </p>
            </div>
          </div>

          {/* Acciones de usuario */}
          <div className="flex items-center gap-2 sm:gap-4">
            {tenants.length > 1 && (
              <select
                value={selectedTenantIndex}
                onChange={(e) => setSelectedTenantIndex(Number(e.target.value))}
                className="text-xs bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-700 outline-none"
              >
                {tenants.map((t, idx) => (
                  <option key={t.id} value={idx}>
                    {t.business_name}
                  </option>
                ))}
              </select>
            )}

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-100"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          CONTENIDO PRINCIPAL EN FORMATO GRID RESPONSIVO
          ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        {/* =========================================================================
            1. TARJETA HERO: ESTADO DE TU WEB Y ACCESOS CLAVE
            ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm transition">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Dominio Oficial
                </span>
                {isSuspended ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                    <XCircle className="w-3.5 h-3.5" />
                    PÁGINA SUSPENDIDA
                  </span>
                ) : isGrace ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    <Clock className="w-3.5 h-3.5" />
                    PERÍODO DE GRACIA ({daysRemaining} días)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ACTIVO EN LÍNEA • CLOUDFLARE EDGE
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>{tenant?.subdomain}.qatuweb.com</span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                  title="Copiar URL"
                >
                  {copiedLink ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl leading-relaxed">
                Tu catálogo y tienda están optimizados para ventas por WhatsApp, con carga instantánea y certificados SSL activos para tus clientes en Ayacucho.
              </p>
            </div>

            {/* Botones de acción principales */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 active:bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-sm transition"
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Ver Mi Tienda Pública</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <Link
                href={pocketAdminUrl}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm border border-slate-300 shadow-2xs transition"
              >
                <Smartphone className="w-4 h-4 text-[#B23A2E]" />
                <span>Abrir Panel de Bolsillo</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Barra inferior de métricas de servicio */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Plan Contratado
              </span>
              <span className="text-sm sm:text-base font-black text-slate-900 mt-0.5 block">
                {tenant?.plan_type === 'anual_300' ? 'Anual S/ 300' : 'Mensual S/ 30'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Próxima Facturación
              </span>
              <span
                className={`text-sm sm:text-base font-black mt-0.5 block ${
                  isGrace || isSuspended ? 'text-rose-600' : 'text-slate-900'
                }`}
              >
                {tenant?.next_billing_date} ({daysRemaining} días)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Servidor y Edge
              </span>
              <span className="text-sm sm:text-base font-black text-emerald-600 mt-0.5 block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Vercel + Cloudflare
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Código QR de Tienda
              </span>
              <button
                type="button"
                onClick={() => setIsQrModalOpen(true)}
                className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 mt-0.5 inline-flex items-center gap-1 hover:underline cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Ver y Descargar QR</span>
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. GRID DE DOS COLUMNAS: RENOVACIÓN Y DIFUSIÓN
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* COLUMNA IZQUIERDA: MÓDULO DE RENOVACIÓN YAPE / PLIN */}
          <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/40 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-white">Renovación Yape & Plin</h3>
                  <p className="text-xs text-slate-400 font-medium">Pago oficial sin intermediarios</p>
                </div>
              </div>

              <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                S/ {tenant?.plan_type === 'anual_300' ? '300.00' : '30.00'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Transfiere o yapea directamente para mantener tu catálogo activo en línea y evitar el corte por kill-switch.
            </p>

            {/* Tarjeta de datos bancarios con copiado en 1 clic */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 block">
                  Número Yape / Plin Oficial
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black font-mono tracking-tight text-white">
                    {yapeNumber}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                    title="Copiar número"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <span className="text-xs text-slate-300 font-medium block">
                  Titular: {yapeTitular}
                </span>
              </div>

              <div className="w-16 h-16 bg-white p-1.5 rounded-2xl shadow-md shrink-0 flex items-center justify-center">
                <QrCode className="w-12 h-12 text-slate-900" />
              </div>
            </div>

            {/* Botón para subir captura */}
            <button
              type="button"
              onClick={() => setIsVoucherModalOpen(true)}
              className="w-full py-4 px-5 rounded-2xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2.5 transition cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Subir Captura de Pago (Yape / Plin)</span>
            </button>
          </section>

          {/* COLUMNA DERECHA: DIFUSIÓN Y PEDIDOS POR WHATSAPP */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">Difusión y Pedidos</h3>
                  <p className="text-xs text-slate-500 font-medium">Comparte tu tienda con tus clientes</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Envía tu catálogo oficial a tus clientes de Huamanga por WhatsApp o imprime tu código QR para exhibirlo en tu mostrador o vitrina física.
              </p>

              {/* Botones de acción rápida */}
              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `¡Hola! Visita nuestra página web y catálogo oficial de ${tenant?.business_name}: ${publicUrl}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2.5 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Compartir Catálogo por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-slate-600" />
                  <span>Abrir Código QR para Mostrador</span>
                </button>
              </div>
            </div>

            {/* Soporte de Módulos */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>¿Deseas impresión de tickets o lector de códigos?</span>
              </div>
              <a
                href="https://wa.me/51941663265?text=Hola%20Qatu%20Web,%20deseo%20consultar%20por%20m%C3%B3dulos%20a%20medida"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-slate-900 hover:underline shrink-0 ml-2"
              >
                Consultar
              </a>
            </div>
          </section>
        </div>

        {/* =========================================================================
            3. HISTORIAL DE PAGOS Y FACTURACIÓN (TABLA COMPLETA)
            ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-black text-lg text-slate-900">Historial de Pagos y Comprobantes</h3>
              <p className="text-xs text-slate-500 font-medium">
                Registro de mensualidades enviadas y estado de validación
              </p>
            </div>
            <button
              type="button"
              onClick={loadInitialData}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition w-fit"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Actualizar Historial</span>
            </button>
          </div>

          {payments.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-400 font-medium">
              No hay comprobantes registrados aún. Cuando realices tu primer pago vía Yape o Plin, aparecerá aquí con su estado de aprobación.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200">
                    <th className="py-3 px-4 rounded-l-xl">Fecha</th>
                    <th className="py-3 px-4">Concepto</th>
                    <th className="py-3 px-4">Método</th>
                    <th className="py-3 px-4">Monto</th>
                    <th className="py-3 px-4">Período Cubierto</th>
                    <th className="py-3 px-4 text-right rounded-r-xl">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {p.created_at ? new Date(p.created_at).toLocaleDateString('es-PE') : 'Reciente'}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 capitalize">
                        {p.concept}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {p.payment_method}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        S/ {Number(p.amount).toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-xs">
                        {p.period_covered_start && p.period_covered_end
                          ? `${p.period_covered_start} al ${p.period_covered_end}`
                          : 'Validación en curso'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {p.status === 'approved' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            Aprobado
                          </span>
                        ) : p.status === 'rejected' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <XCircle className="w-3 h-3" />
                            Observado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <Clock className="w-3 h-3" />
                            En Verificación
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* =========================================================================
          MODAL: SUBIR COMPROBANTE YAPE / PLIN (COMPRESIÓN WEBP)
          ========================================================================= */}
      {isVoucherModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="font-black text-base text-slate-900">Subir Comprobante de Pago</h4>
                <p className="text-xs text-slate-400 font-medium">Adjunta tu captura de Yape o Plin</p>
              </div>
              <button
                type="button"
                onClick={() => setIsVoucherModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 text-sm transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendPayment} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Método de Pago
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVoucherMethod('Yape')}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                      voucherMethod === 'Yape'
                        ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Yape
                  </button>
                  <button
                    type="button"
                    onClick={() => setVoucherMethod('Plin')}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                      voucherMethod === 'Plin'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Plin
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Monto Pagado (S/)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={voucherAmount}
                  onChange={(e) => setVoucherAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Captura de Pantalla *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleVoucherFileChange}
                    className="hidden"
                    id="client-voucher-input"
                  />
                  <label
                    htmlFor="client-voucher-input"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-purple-500 rounded-2xl p-5 bg-slate-50 hover:bg-purple-50/30 cursor-pointer transition text-center"
                  >
                    {voucherDataUrl ? (
                      <div className="space-y-2">
                        <img
                          src={voucherDataUrl}
                          alt="Comprobante optimizado"
                          className="w-32 h-32 object-contain rounded-xl mx-auto shadow-sm border border-slate-200"
                        />
                        <p className="text-[11px] text-emerald-700 font-bold">
                          ✓ Captura lista (WebP optimizado)
                        </p>
                      </div>
                    ) : (
                      <div className="py-3 space-y-1.5">
                        <Camera className="w-8 h-8 text-slate-400 mx-auto" />
                        <p className="text-xs font-bold text-slate-700">Tocar para seleccionar imagen</p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          La imagen se comprimirá automáticamente a WebP
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={uploadingVoucher || !voucherDataUrl}
                  className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {uploadingVoucher ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enviando Comprobante...</span>
                    </>
                  ) : (
                    <span>Confirmar y Enviar Comprobante</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: CÓDIGO QR PARA EL MOSTRADOR DE LA TIENDA
          ========================================================================= */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 text-center space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-black text-sm text-slate-900">QR Oficial de tu Tienda</span>
              <button
                type="button"
                onClick={() => setIsQrModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl inline-block">
              <img
                src={qrImageUrl}
                alt={`Código QR para ${tenant?.business_name}`}
                className="w-56 h-56 mx-auto rounded-xl shadow-xs"
              />
            </div>

            <div>
              <p className="font-black text-slate-900 text-base">{tenant?.business_name}</p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{tenant?.subdomain}.qatuweb.com</p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Tus clientes pueden escanear este código con su celular para ver tu catálogo y enviarte pedidos directos por WhatsApp.
            </p>

            <a
              href={qrImageUrl}
              download={`${tenant?.subdomain}-qr-qatuweb.png`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Descargar Imagen QR</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
