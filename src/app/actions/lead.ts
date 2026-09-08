"use server";

import { saveLead } from "@/lib/data/businesses.repo";
import { siteConfig } from "@/lib/config/site";

export interface LeadState {
  success: boolean;
  message?: string;
  whatsappUrl?: string;
}

export async function submitLeadAction(
  prevState: LeadState,
  formData: FormData
): Promise<LeadState> {
  const fullName = formData.get("fullName")?.toString().trim() || "";
  const businessName = formData.get("businessName")?.toString().trim() || "";
  const category = formData.get("category")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";
  const interestedPlan = formData.get("interestedPlan")?.toString().trim() || "comercio";
  const message = formData.get("message")?.toString().trim() || "";

  if (!fullName || !businessName || !phone) {
    return {
      success: false,
      message: "Por favor completa tu nombre, el nombre de tu negocio y tu número de teléfono.",
    };
  }

  // Guardar en Supabase o mock local
  const result = await saveLead({
    fullName,
    businessName,
    category,
    phone,
    interestedPlan,
    message,
    createdAt: new Date().toISOString(),
  });

  if (!result.success) {
    return {
      success: false,
      message: result.error || "No se pudo registrar la solicitud. Por favor intenta por WhatsApp directamente.",
    };
  }

  // Pre-generar mensaje codificado para WhatsApp
  const text = `¡Hola Qatu! Mi nombre es ${fullName}, soy de ${businessName} (${category}). Me interesa el plan ${interestedPlan}. Mi celular es ${phone}.${
    message ? ` Nota: ${message}` : ""
  }`;

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;

  return {
    success: true,
    message: "¡Tu solicitud ha sido registrada exitosamente! Puedes continuar la conversación de inmediato en WhatsApp.",
    whatsappUrl,
  };
}
