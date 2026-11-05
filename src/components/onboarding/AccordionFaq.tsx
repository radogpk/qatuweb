"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "¿Pierdo mi web si en algún momento pauso la mensualidad?",
    answer:
      "No pierdes tu diseño ni tu catálogo. Si en algún momento necesitas pausar tu mensualidad, tu web se desactiva temporalmente en el subdominio, pero resguardamos toda tu información de forma segura. Cuando desees reactivarla, solo pagas la mensualidad correspondiente sin tener que volver a pagar el costo de setup inicial.",
  },
  {
    question:
      "¿Puedo tener mi propio dominio (.pe o .com) en vez del subdominio de Qatu?",
    answer:
      "¡Por supuesto! Tu web arranca de inmediato en tunegocio.qatu.pe para que no tengas que esperar ni gastar en comprar un dominio al inicio. Si más adelante deseas vincular tu propio dominio como tunegocio.pe o .com, nuestro equipo técnico lo configura sin costo de migración.",
  },
  {
    question: "¿Qué pasa con mis fotos, precios y datos?",
    answer:
      "Todo el contenido que nos entregues (logotipo, fotos de tus productos o platos, descripciones y precios) te pertenece al 100%. Qatu actúa únicamente como tu socio tecnológico para alojar y mantener tu web rápida y segura.",
  },
  {
    question:
      "¿Puedo solicitar cambios o agregar productos después del lanzamiento?",
    answer:
      "Sí, todos los planes incluyen mantenimiento mensual para cambios (como actualizar precios de productos, agregar fotos de temporada o actualizar horarios de atención). Solo nos escribes por WhatsApp y lo actualizamos.",
  },
  {
    question: "¿Cómo cobro a mis clientes a través de la página?",
    answer:
      "Los pedidos se configuran con enlace directo a tu WhatsApp y accesos directos a tus códigos QR de Yape, Plin o cuentas bancarias. El cliente te paga directamente a ti, con 0% de comisiones por venta.",
  },
];

export function AccordionFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqId = useId();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card transition-all"
          >
            <h3>
              <button
                type="button"
                id={`${faqId}-question-${index}`}
                aria-expanded={isOpen}
                aria-controls={`${faqId}-answer-${index}`}
                onClick={() => toggle(index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-slate-900 hover:text-brand-600 transition-colors"
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                <span
                  aria-hidden="true"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                    isOpen
                      ? "bg-brand-50 text-brand-600 rotate-180"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
            </h3>

            <div
              id={`${faqId}-answer-${index}`}
              role="region"
              aria-labelledby={`${faqId}-question-${index}`}
              hidden={!isOpen}
              className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50"
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
