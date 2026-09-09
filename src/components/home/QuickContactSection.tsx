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
    <section id="contacto-rapido" className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Direct Callout & WhatsApp */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Atención Rápida y Personalizada</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white leading-tight tracking-tight">
                Empieza a vender con tu propia web esta misma semana.
              </h2>

              <p className="text-base text-slate-300 leading-relaxed">
                Sin intermediarios, sin comisiones por venta y con la tranquilidad de tener un equipo técnico que te respalda mes a mes.
              </p>

              {/* Direct WhatsApp Box */}
              <div className="pt-2">
                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 fill-white" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white">
                        Canal Oficial de WhatsApp
                      </h4>
                      <p className="text-xs text-slate-400">
                        Lunes a Sábado de 8:00 AM a 8:00 PM
                      </p>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppUrl(whatsappDirectMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all shadow-md active:scale-95"
                  >
                    <span>Hablar con un asesor por WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Form */}
            <div className="lg:col-span-7">
              <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl">
                {submitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-heading font-extrabold text-slate-900">
                      ¡Solicitud recibida, {formData.nombre}!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Nos pondremos en contacto contigo en breve al número{" "}
                      <strong className="text-slate-900 font-bold">{formData.telefono}</strong>.
                    </p>
                    <div className="pt-2">
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
                    <div>
                      <h3 className="text-xl font-heading font-extrabold text-slate-900">
                        Solicita tu web o una llamada demostrativa
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Déjanos tus datos y te responderemos en menos de 2 horas hábiles.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Rubro *
                        </label>
                        <select
                          value={formData.rubro}
                          onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
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
                          WhatsApp / Celular *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Ej. 966 123 456"
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ¿Qué productos o servicios vendes? (opcional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ej. Vendo tortas personalizadas y bocaditos para eventos..."
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-card hover:shadow-card-hover flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar solicitud sin compromiso</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
