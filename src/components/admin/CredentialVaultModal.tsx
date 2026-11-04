'use client';

import React, { useState } from 'react';
import { BusinessCredentials } from '@/types/panel';
import {
  KeyRound,
  X,
  Copy,
  Check,
  Eye,
  EyeOff,
  ExternalLink,
  Save,
  Lock,
  Mail,
  Phone,
  FolderGit2,
  Database,
  Cloud,
} from 'lucide-react';

interface CredentialVaultModalProps {
  businessName: string;
  slug: string;
  credentials: BusinessCredentials | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<BusinessCredentials>) => Promise<void>;
}

export function CredentialVaultModal({
  businessName,
  slug,
  credentials,
  isOpen,
  onClose,
  onSave,
}: CredentialVaultModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [gmail, setGmail] = useState(credentials?.gmail_account || '');
  const [password, setPassword] = useState(credentials?.gmail_password || '');
  const [phone, setPhone] = useState(credentials?.recovery_phone || '');
  const [github, setGithub] = useState(credentials?.github_repo_url || '');
  const [vercel, setVercel] = useState(credentials?.vercel_project_url || '');
  const [supabaseUrl, setSupabaseUrl] = useState(credentials?.supabase_project_url || '');
  const [supabaseKey, setSupabaseKey] = useState(credentials?.supabase_anon_key || '');
  const [notes, setNotes] = useState(credentials?.extra_notes || '');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        gmail_account: gmail,
        gmail_password: password,
        recovery_phone: phone,
        github_repo_url: github,
        vercel_project_url: vercel,
        supabase_project_url: supabaseUrl,
        supabase_anon_key: supabaseKey,
        extra_notes: notes,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Cabecera del Modal */}
        <div className="bg-stone-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif">{businessName}</h2>
              <p className="text-xs text-stone-400">
                Bóveda Confidencial • <span className="text-amber-400">{slug}.qatuweb.com</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2 rounded-xl hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario de Credenciales */}
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
            <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Esta información solo es accesible por el <strong>Super Administrador</strong>. Los clientes no pueden ver estas claves ni las cuentas de plataforma bajo ninguna circunstancia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cuenta Gmail */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-500" /> Correo Gmail Creado
              </label>
              <div className="relative flex">
                <input
                  type="email"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  placeholder="tunegocio.aya@gmail.com"
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 pr-10 focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(gmail, 'gmail')}
                  className="absolute right-2 top-2 text-stone-400 hover:text-stone-700 p-1"
                  title="Copiar correo"
                >
                  {copiedField === 'gmail' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Contraseña Gmail */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-stone-500" /> Contraseña de Cuenta
              </label>
              <div className="relative flex">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña segura"
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 pr-16 focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
                <div className="absolute right-2 top-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-stone-400 hover:text-stone-700 p-1"
                    title={showPassword ? 'Ocultar' : 'Mostrar'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(password, 'password')}
                    className="text-stone-400 hover:text-stone-700 p-1"
                    title="Copiar contraseña"
                  >
                    {copiedField === 'password' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Teléfono de Recuperación */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-500" /> Teléfono de Recuperación (Cliente)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+51 966 000 000"
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            {/* Repositorio GitHub */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-stone-500" /> Repositorio GitHub
                </span>
                {github && (
                  <a href={github} target="_blank" rel="noreferrer" className="text-amber-700 hover:underline inline-flex items-center gap-0.5">
                    Abrir <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            {/* Proyecto Vercel */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Cloud className="w-3.5 h-3.5 text-stone-500" /> URL Proyecto Vercel
                </span>
                {vercel && (
                  <a href={vercel} target="_blank" rel="noreferrer" className="text-amber-700 hover:underline inline-flex items-center gap-0.5">
                    Abrir <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </label>
              <input
                type="url"
                value={vercel}
                onChange={(e) => setVercel(e.target.value)}
                placeholder="https://vercel.com/..."
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>

            {/* Proyecto Supabase */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-stone-500" /> Proyecto Supabase
                </span>
                {supabaseUrl && (
                  <a href={supabaseUrl} target="_blank" rel="noreferrer" className="text-amber-700 hover:underline inline-flex items-center gap-0.5">
                    Abrir <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </label>
              <input
                type="url"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://app.supabase.com/project/..."
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Anon Key Supabase */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700">Supabase Anon Key</label>
            <div className="relative flex">
              <input
                type="text"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                placeholder="eyJhbGciOi..."
                className="w-full text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 pr-10 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => copyToClipboard(supabaseKey, 'supabaseKey')}
                className="absolute right-2 top-2 text-stone-400 hover:text-stone-700 p-1"
                title="Copiar Anon Key"
              >
                {copiedField === 'supabaseKey' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Notas Adicionales */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700">Notas Técnicas / Requerimientos</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detalles de la plantilla, catálogo, plugins usados..."
              className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          {/* Acciones */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Guardando...' : 'Guardar Credenciales'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
