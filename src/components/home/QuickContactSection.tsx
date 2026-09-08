"use client";

import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/config/site";
import { MessageCircle, Send, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";

export function QuickContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    negocio: "",
    rubro: "restaurante",
    telefono: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappDirectMsg = formData.nombre
    ? `Hola Qatu, soy ${formData.nombre} del negocio ${formData.negocio || "mi negocio"} (${formData.rubro}). Quiero información para crear mi página web.`
    : "Hola Qatu, quiero información para crear mi página web y subdominio.";

  return (
    <section id="contacto-rapido" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & WhatsApp Direct */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hablemos Hoy Mismo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
              ¿Listo para estrenar tu web en Qatu?
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Completa el formulario o contáctanos directamente a nuestro canal de WhatsApp Business. Te asesoramos sin compromiso y evaluamos qué plan se adapta mejor a tu negocio.
            </p>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 fill-emerald-600 text-white" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">
                    Atención directa por WhatsApp
                  </h4>
                  <p className="text-xs text-slate-500">
                    Respuesta rápida de lunes a sábado de 8am a 8pm
                  </p>
                </div>
              </div>

              <a
                href={getWhatsAppUrl(whatsappDirectMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all shadow-card hover:shadow-card-hover active:scale-95"
              >
                <span>Chatear ahora con un asesor</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-card">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-extrabold text-slate-900">
                    ¡Solicitud recibida, {formData.nombre}!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Nos pondremos en contacto contigo en breve al número{" "}
                    <span className="font-bold text-slate-900">{formData.telefono}</span>.
                    También puedes escribirnos directamente para avanzar más rápido.
                  </p>
                  <div className="pt-4">
                    <a
                      href={getWhatsAppUrl(whatsappDirectMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 text-white text-sm font-semibold shadow-card hover:bg-brand-700 transition-all active:scale-95"
                    >
                      <span>Abrir chat de WhatsApp</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-heading font-extrabold text-slate-900 mb-4">
                    Pide tu web o solicita una demo
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tu nombre completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Rosa Gutiérrez"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nombre de tu negocio *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Florería Las Flores"
                        value={formData.negocio}
                        onChange={(e) => setFormData({ ...formData, negocio: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Rubro o sector *
                      </label>
                      <select
                        value={formData.rubro}
                        onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                      >
                        <option value="restaurante">Restaurante / Cafetería</option>
                        <option value="hotel">Hotel / Hospedaje</option>
                        <option value="tienda">Tienda / Comercio minorista</option>
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
                        required
                        placeholder="Ej. 966 123 456"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mensaje o consulta adicional (opcional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Cuéntanos brevemente si ya tienes fotos o si quieres alguna función especial..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-card hover:shadow-card-hover flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar solicitud</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
