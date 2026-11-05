"use client";

import { initialPricingPlans } from "@/lib/seed/initialBusinesses";
import { useActionState, useEffect, useRef } from "react";
import { submitLeadAction, LeadState } from "@/app/actions/lead";
import {
  Send,
  CheckCircle2,
  MessageCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const initialState: LeadState = {
  success: false,
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitLeadAction,
    initialState,
  );
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state.success) successHeadingRef.current?.focus();
  }, [state.success]);

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-card">
      {state.success ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2
            ref={successHeadingRef}
            tabIndex={-1}
            className="text-2xl font-heading font-extrabold text-slate-900"
          >
            {state.persisted
              ? "Recibimos tu solicitud."
              : "Tu mensaje está listo."}
          </h2>
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
        <form action={formAction} aria-busy={isPending} className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              Envíanos un mensaje
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Comparte tus datos para preparar una propuesta. Los campos con *
              son obligatorios.
            </p>
          </div>

          {state.message && !state.success && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-brand-50 text-brand-700 text-xs flex items-center gap-2 border border-brand-200"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-fullName"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Tu nombre y apellido *
              </label>
              <input
                type="text"
                id="contact-fullName"
                name="fullName"
                autoComplete="name"
                maxLength={120}
                defaultValue={state.values?.fullName}
                required
                placeholder="Ej. Rosa Gutiérrez"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="contact-businessName"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Nombre de tu negocio *
              </label>
              <input
                type="text"
                id="contact-businessName"
                name="businessName"
                autoComplete="organization"
                maxLength={160}
                defaultValue={state.values?.businessName}
                required
                placeholder="Ej. Florería Las Flores"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-category"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Rubro o tipo de negocio *
              </label>
              <select
                id="contact-category"
                name="category"
                defaultValue={state.values?.category || "tienda"}
                required
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
              <label
                htmlFor="contact-phone"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Celular / WhatsApp *
              </label>
              <input
                type="tel"
                id="contact-phone"
                name="phone"
                autoComplete="tel"
                maxLength={20}
                defaultValue={state.values?.phone}
                inputMode="tel"
                aria-describedby="contact-phone-help"
                required
                placeholder="Ej. 966 123 456"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
              />
              <p
                id="contact-phone-help"
                className="mt-1.5 text-xs text-slate-500"
              >
                9 dígitos en Perú. Para otro país, incluye el código
                internacional.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-interestedPlan"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Plan en el que tienes interés
            </label>
            <select
              id="contact-interestedPlan"
              name="interestedPlan"
              defaultValue={state.values?.interestedPlan || "comercio"}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
            >
              {initialPricingPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} — S/ {plan.monthlyPrice}/mes + S/{" "}
                  {plan.setupPrice} de creación
                </option>
              ))}
              <option value="asesoria">Deseo asesoría para elegir</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Mensaje o consulta (opcional)
            </label>
            <textarea
              id="contact-message"
              name="message"
              maxLength={2000}
              defaultValue={state.values?.message}
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
                <span>Preparando tu solicitud...</span>
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
