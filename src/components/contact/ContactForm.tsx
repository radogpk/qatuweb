"use client";

import { useActionState } from "react";
import { submitLeadAction, LeadState } from "@/app/actions/lead";
import { Send, CheckCircle2, MessageCircle, AlertCircle, Loader2 } from "lucide-react";

const initialState: LeadState = {
  success: false,
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitLeadAction, initialState);

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-card">
      {state.success ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-heading font-extrabold text-slate-900">
            ¡Muchas gracias por contactarnos!
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            {state.message}
          </p>

          {state.whatsappUrl && (
            <div className="pt-4">
              <a
                href={state.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-card transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Continuar por WhatsApp ahora</span>
              </a>
            </div>
          )}
        </div>
      ) : (
        <form action={formAction} className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              Envíanos un mensaje
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Cuéntanos sobre tu negocio y te responderemos en menos de 2 horas hábiles.
            </p>
          </div>

          {state.message && !state.success && (
            <div className="p-3.5 rounded-xl bg-brand-50 text-brand-700 text-xs flex items-center gap-2 border border-brand-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tu nombre y apellido *
              </label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Ej. Rosa Gutiérrez"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nombre de tu negocio *
              </label>
              <input
                type="text"
                name="businessName"
                required
                placeholder="Ej. Florería Las Flores"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Rubro o tipo de negocio *
              </label>
              <select
                name="category"
                defaultValue="tienda"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
              >
                <option value="tienda">Tienda / Comercio minorista</option>
                <option value="restaurante">Restaurante / Cafetería</option>
                <option value="hotel">Hotel / Hospedaje</option>
                <option value="artesania">Artesanía / Textil</option>
                <option value="servicios">Servicios profesionales</option>
                <option value="otro">Otro rubro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Celular / WhatsApp *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Ej. 966 123 456"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Plan en el que tienes interés
            </label>
            <select
              name="interestedPlan"
              defaultValue="comercio"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
            >
              <option value="comercio">Comercio Básico (S/ 69/mes — Más Popular)</option>
              <option value="informativa">Web Informativa (S/ 49/mes)</option>
              <option value="reservas">Comercio + Reservas (S/ 89/mes)</option>
              <option value="asesoria">Deseo asesoría para elegir</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mensaje o consulta (opcional)
            </label>
            <textarea
              name="message"
              rows={3}
              placeholder="Cuéntanos cuántos productos vendes, si ya tienes logo o tus dudas principales..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-card hover:shadow-card-hover flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enviando información...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar formulario de contacto</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
