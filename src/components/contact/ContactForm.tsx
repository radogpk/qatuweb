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
    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DEC8] shadow-warm">
      {state.success ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FCF6E5] text-[#D4A017] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#2B3A55]">
            ¡Muchas gracias por contactarnos!
          </h3>
          <p className="text-xs sm:text-sm text-[#4A5B78] max-w-md mx-auto leading-relaxed">
            {state.message}
          </p>

          {state.whatsappUrl && (
            <div className="pt-4">
              <a
                href={state.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95"
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
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B3A55]">
              Envíanos un mensaje
            </h2>
            <p className="text-xs text-[#4A5B78] mt-1">
              Cuéntanos sobre tu negocio y te responderemos en menos de 2 horas hábiles.
            </p>
          </div>

          {state.message && !state.success && (
            <div className="p-3.5 rounded-xl bg-[#FDF0EE] text-[#B23A2E] text-xs flex items-center gap-2 border border-[#B23A2E]/20">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2B3A55] mb-1">
                Tu nombre y apellido *
              </label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Ej. Rosa Gutiérrez"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-[#2B3A55] text-xs sm:text-sm focus:outline-none focus:border-[#B23A2E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2B3A55] mb-1">
                Nombre de tu negocio *
              </label>
              <input
                type="text"
                name="businessName"
                required
                placeholder="Ej. Florería Las Flores"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-[#2B3A55] text-xs sm:text-sm focus:outline-none focus:border-[#B23A2E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2B3A55] mb-1">
                Rubro o tipo de negocio *
              </label>
              <select
                name="category"
                defaultValue="tienda"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-[#2B3A55] text-xs sm:text-sm focus:outline-none focus:border-[#B23A2E]"
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
              <label className="block text-xs font-semibold text-[#2B3A55] mb-1">
                Celular / WhatsApp *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Ej. 966 123 456"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-[#2B3A55] text-xs sm:text-sm focus:outline-none focus:border-[#B23A2E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2B3A55] mb-1">
              Plan en el que tienes interés
            </label>
            <select
              name="interestedPlan"
              defaultValue="comercio"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-[#2B3A55] text-xs sm:text-sm focus:outline-none focus:border-[#B23A2E]"
            >
              <option value="comercio">Comercio Básico (S/ 55/mes — Más Popular)</option>
              <option value="informativa">Web Informativa (S/ 35/mes)</option>
              <option value="reservas">Comercio + Reservas (S/ 75/mes)</option>
              <option value="asesoria">Deseo asesoría para elegir</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2B3A55] mb-1">
              Mensaje o consulta (opcional)
            </label>
            <textarea
              name="message"
              rows={3}
              placeholder="Cuéntanos cuántos productos vendes, si ya tienes logo o tus dudas principales..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-[#2B3A55] text-xs sm:text-sm focus:outline-none focus:border-[#B23A2E]"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-6 rounded-full bg-[#B23A2E] hover:bg-[#962E24] text-white font-semibold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
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
