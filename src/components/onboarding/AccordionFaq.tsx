"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "¿Pierdo mi web si dejo de pagar la renta mensual?",
    answer:
      "No pierdes tu diseño ni tu contenido. Si en algún momento necesitas pausar tu mensualidad, tu web se desactiva temporalmente en el subdominio, pero resguardamos toda tu información de forma segura en nuestros servidores. Cuando desees reactivarla, solo pagas la mensualidad correspondiente sin tener que volver a pagar el costo de setup inicial.",
  },
  {
    question: "¿Puedo tener mi propio dominio (.com o .pe) en vez del subdominio de Qatu?",
    answer:
      "¡Por supuesto! Tu web arranca de inmediato en tunegocio.qatu.pe para que no tengas que esperar ni gastar en comprar un dominio al inicio. Más adelante, si deseas vincular un dominio propio como tunegocio.pe o .com, nuestro equipo técnico lo configura sin costo de migración de contenido, manteniendo la infraestructura y soporte de Qatu.",
  },
  {
    question: "¿Qué pasa con mis datos, fotos y contenidos?",
    answer:
      "Todo el contenido que nos entregues (logotipos, fotos de tus productos o platos, descripciones y precios) te pertenece al 100%. Qatu actúa únicamente como tu socio y facilitador tecnológico para alojar y mantener tu vitrina web.",
  },
  {
    question: "¿Puedo solicitar cambios o actualizaciones tras la publicación?",
    answer:
      "Sí, todos los planes incluyen soporte mensual para cambios menores (como actualizar precios de productos, agregar platos de temporada o cambiar horarios de atención). Solo nos escribes por WhatsApp con la nueva información y la actualizamos en un plazo de 24 a 48 horas hábiles.",
  },
  {
    question: "¿Cómo cobro a mis clientes a través de la web?",
    answer:
      "Los pedidos se configuran con enlace directo a tu WhatsApp y enlaces rápidos a tus códigos QR de Yape y Plin o cuentas bancarias. El cliente te paga directamente a ti, sin intermediarios y con 0% de comisión por venta.",
  },
];

export function AccordionFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            className="bg-white rounded-xl border border-[#EAE6DF] overflow-hidden shadow-subtle transition-all"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-[#1E2838] hover:text-[#B23A2E] transition-colors"
            >
              <span className="text-base sm:text-lg">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#C59218] shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[#B23A2E]" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#4B586E] leading-relaxed border-t border-[#EAE6DF] bg-[#FAF9F6]">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
