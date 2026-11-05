'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tenant, Payment } from '@/types/qatu';
import { qatuCentralService } from '@/lib/services/qatuCentral.service';
import { compressImageToWebP } from '@/templates/storefront-base/imageCompressor';
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
  Settings,
  ShieldCheck,
  LogOut,
  Camera,
} from 'lucide-react';

export default function ClienteDashboardPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTenantIndex, setSelectedTenantIndex] = useState(0);

  // Módulo de Renovación Yape / Plin
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [voucherDataUrl, setVoucherDataUrl] = useState<string | null>(null);
  const [voucherMethod, setVoucherMethod] = useState<'Yape' | 'Plin'>('Yape');
  const [voucherAmount, setVoucherAmount] = useState('30.00');
  const [uploadingVoucher, setUploadingVoucher] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Módulo de Solicitud de Módulos Extra
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [moduleRequestText, setModuleRequestText] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadClientData = async () => {
    setLoading(true);
    try {
      // Cargamos por defecto los tenants asignados a Lucas Mendoza para la demo interactiva
      const list = await qatuCentralService.getTenants();
      // Filtramos para vista cliente
      setTenants(list.filter((t) => t.owner_name?.includes('Lucas') || t.subdomain === 'calzadoslucas'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClientData();
  }, []);

  const tenant = tenants[selectedTenantIndex] || tenants[0];

  // Cálculo de días restantes
  const calculateDaysRemaining = (dueDate: string) => {
    const diff = new Date(dueDate).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = tenant ? calculateDaysRemaining(tenant.next_billing_date) : 0;
  const isSuspended = tenant ? (tenant.status === 'suspended' || tenant.killswitch_override) : false;
  const isGrace = tenant ? tenant.status === 'grace_period' || (daysRemaining <= 3 && daysRemaining >= 0) : false;
  const isHealthy = !isSuspended && !isGrace;

  // Manejo de subida de captura de Yape comprimida en WebP
  const handleVoucherFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Comprime la captura a WebP <70 KB
      const result = await compressImageToWebP(file, 800, 0.8);
      setVoucherDataUrl(result.dataUrl);
    } catch (err) {
      alert('Error al comprimir la captura de pago.');
    }
  };

  // Enviar Comprobante
  const handleSendPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherDataUrl || !tenant) return;

    setUploadingVoucher(true);
    try {
      await qatuCentralService.createPaymentVoucher({
        tenant_id: tenant.id,
        tenant_name: tenant.business_name,
        subdomain: tenant.subdomain,
        amount: parseFloat(voucherAmount),
        concept: tenant.plan_type === 'anual_300' ? 'anualidad' : 'mensualidad',
        payment_method: voucherMethod,
        voucher_url: voucherDataUrl,
      });

      showToast('🎉 Comprobante enviado. El Super Admin lo verificará en minutos.');
      setIsVoucherModalOpen(false);
      setVoucherDataUrl(null);
    } finally {
      setUploadingVoucher(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 pb-24 font-sans">
      {/* Toast Notificación */}
      {toastMessage && (
        <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 bg-stone-900 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-400/40 animate-in fade-in slide-in-from-top-4">
          <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cabecera Superior Móvil */}
      <header className="bg-stone-900 text-white px-4 py-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-base leading-none">
                {tenant?.business_name || 'Mi Negocio'}
              </h1>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                Portal de Autogestión
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-stone-400 hover:text-white p-2 rounded-xl"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-5 space-y-5">
        {/* =========================================================================
            1. ESTADO DEL SERVICIO EN TIEMPO REAL
            ========================================================================= */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Estado de tu Página Web
            </span>

            {/* Badge de Estado */}
            {isSuspended ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                <XCircle className="w-3.5 h-3.5" />
                SUSPENDIDO
              </span>
            ) : isGrace ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                <Clock className="w-3.5 h-3.5" />
                POR VENCER
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ACTIVO EN LÍNEA
              </span>
            )}
          </div>

          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/70 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Subdominio oficial:</span>
              <span className="font-mono font-bold text-stone-900">
                {tenant?.subdomain}.qatuweb.com
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Próximo vencimiento:</span>
              <span className={`font-bold ${isGrace || isSuspended ? 'text-rose-600' : 'text-stone-900'}`}>
                {tenant?.next_billing_date} ({daysRemaining} días restantes)
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Plan contratado:</span>
              <span className="font-bold text-stone-900">
                {tenant?.plan_type === 'anual_300' ? 'Anual S/ 300' : 'Mensual S/ 30'}
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. ACCESOS DIRECTOS A SU INFRAESTRUCTURA
            ========================================================================= */}
        <div className="space-y-2.5">
          <a
            href={tenant?.vercel_target_url || '#'}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center justify-between transition"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Ver mi Página Web Pública</span>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400" />
          </a>

          <Link
            href="/demo/calzados/admin"
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-900 border border-stone-200 font-bold text-xs sm:text-sm shadow-sm flex items-center justify-between transition"
          >
            <div className="flex items-center gap-2.5">
              <Smartphone className="w-4 h-4 text-[#B23A2E]" />
              <span>Abrir mi Panel de Bolsillo (/admin)</span>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400" />
          </Link>
        </div>

        {/* =========================================================================
            3. MÓDULO DE RENOVACIÓN RÁPIDA (YAPE / PLIN)
            ========================================================================= */}
        <div className="bg-gradient-to-br from-purple-950 via-stone-900 to-stone-900 text-white p-5 rounded-3xl shadow-lg border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-purple-400" />
              <h3 className="font-serif font-bold text-base">Renovación por Yape / Plin</h3>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              S/ {tenant?.plan_type === 'anual_300' ? '300.00' : '30.00'}
            </span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            Mantén tu página web y pedidos activos. Escanea el código o transfiere al número oficial de Qatu Web:
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-purple-300 uppercase tracking-wider font-bold">Número Yape / Plin</p>
              <p className="text-xl font-bold font-mono tracking-tight text-white mt-0.5">
                966 123 456
              </p>
              <p className="text-[11px] text-stone-300">Titular: Luis Gerardo Llocclla Sauñe (Qatu Web)</p>
            </div>
            <div className="w-14 h-14 bg-white p-1 rounded-xl shadow-md shrink-0 flex items-center justify-center">
              <QrCode className="w-12 h-12 text-stone-900" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsVoucherModalOpen(true)}
            className="w-full py-3.5 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition"
          >
            <Upload className="w-4 h-4" />
            <span>Subir Captura de Pago (Yape / Plin)</span>
          </button>
        </div>

        {/* =========================================================================
            4. CONFIGURACIONES Y SOLICITUD DE MÓDULOS EXTRA
            ========================================================================= */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-sm space-y-3">
          <h3 className="text-sm font-bold font-serif text-stone-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>¿Necesitas Módulos Especiales a Medida?</span>
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            ¿Deseas agregar control de comisiones, impresión de tickets de caja o lector de código de barras? Desarrollamos tu módulo a medida por un pago único accesible.
          </p>

          <a
            href="https://wa.me/51966123456?text=Hola%20Qatu%20Web,%20deseo%20solicitar%20un%20m%C3%B3dulo%20a%20medida%20para%20mi%20negocio"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Solicitar Módulo por WhatsApp</span>
          </a>
        </div>
      </main>

      {/* =========================================================================
          MODAL: SUBIDA DE VOUCHER YAPE / PLIN (CON COMPRESIÓN WEBP)
          ========================================================================= */}
      {isVoucherModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <span className="font-bold text-sm text-stone-900">Subir Comprobante</span>
              <button
                type="button"
                onClick={() => setIsVoucherModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendPayment} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Método de Pago</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVoucherMethod('Yape')}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      voucherMethod === 'Yape' ? 'bg-purple-600 text-white border-purple-600' : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    Yape
                  </button>
                  <button
                    type="button"
                    onClick={() => setVoucherMethod('Plin')}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      voucherMethod === 'Plin' ? 'bg-blue-600 text-white border-blue-600' : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    Plin
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Monto Pagado (S/)</label>
                <input
                  type="number"
                  required
                  value={voucherAmount}
                  onChange={(e) => setVoucherAmount(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Captura de Pantalla *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleVoucherFileChange}
                    className="hidden"
                    id="voucher-input"
                  />
                  <label
                    htmlFor="voucher-input"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-stone-300 hover:border-purple-500 rounded-2xl p-4 bg-stone-50 cursor-pointer transition text-center"
                  >
                    {voucherDataUrl ? (
                      <div className="space-y-1">
                        <img
                          src={voucherDataUrl}
                          alt="Comprobante"
                          className="w-28 h-28 object-contain rounded-xl mx-auto shadow-sm"
                        />
                        <p className="text-[11px] text-emerald-700 font-bold">Captura optimizada en WebP</p>
                      </div>
                    ) : (
                      <div className="py-3 space-y-1">
                        <Camera className="w-7 h-7 text-stone-400 mx-auto" />
                        <p className="text-xs font-bold text-stone-700">Tocar para seleccionar captura</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={uploadingVoucher || !voucherDataUrl}
                  className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
                >
                  {uploadingVoucher ? 'Enviando...' : 'Confirmar Envío de Pago'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
