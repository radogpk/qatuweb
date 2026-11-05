"use server";

import { saveLead } from "@/lib/data/businesses.repo";
import { siteConfig } from "@/lib/config/site";
import { initialPricingPlans } from "@/lib/seed/initialBusinesses";

export interface LeadValues {
  fullName: string;
  businessName: string;
  category: string;
  phone: string;
  interestedPlan: string;
  message: string;
}

export interface LeadState {
  success: boolean;
  message?: string;
  whatsappUrl?: string;
  persisted?: boolean;
  values?: LeadValues;
}

const categoryLabels: Record<string, string> = {
  tienda: "Tienda / Comercio minorista",
  restaurante: "Restaurante / Cafetería",
  hotel: "Hotel / Hospedaje",
  artesania: "Artesanía / Textil",
  servicios: "Servicios profesionales",
  otro: "Otro rubro",
};

export async function submitLeadAction(
  _prevState: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const readField = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" ? value.trim() : "";
  };
  const values: LeadValues = {
    fullName: readField("fullName"),
    businessName: readField("businessName"),
    category: readField("category"),
    phone: readField("phone"),
    interestedPlan: readField("interestedPlan"),
    message: readField("message"),
  };
  const { fullName, businessName, category, phone, interestedPlan, message } =
    values;
  const invalid = (message: string): LeadState => ({
    success: false,
    message,
    values,
  });

  if (!fullName || !businessName || !phone) {
    return invalid(
      "Completa tu nombre, el nombre de tu negocio y tu número de teléfono.",
    );
  }

  if (
    fullName.length > 120 ||
    businessName.length > 160 ||
    message.length > 2000
  ) {
    return invalid(
      "Acorta los campos que superen el límite: nombre, 120 caracteres; negocio, 160; mensaje, 2000.",
    );
  }
  const phoneDigits = phone.replace(/\D/g, "");
  if (
    !/^\+?[\d\s()-]{9,20}$/.test(phone) ||
    phoneDigits.length < 9 ||
    phoneDigits.length > 15
  ) {
    return invalid(
      "Escribe un celular válido de 9 dígitos. Si es de otro país, incluye el código internacional.",
    );
  }
  const selectedPlan = initialPricingPlans.find(
    (plan) => plan.id === interestedPlan,
  );
  if (
    !Object.hasOwn(categoryLabels, category) ||
    (!selectedPlan && interestedPlan !== "asesoria")
  ) {
    return invalid(
      "Selecciona un rubro y uno de los planes disponibles, o elige la opción de asesoría.",
    );
  }
  // Guardar en Supabase o preparar contacto directo
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
    return invalid(
      "No pudimos registrar tu solicitud. Inténtalo de nuevo o usa el botón de WhatsApp para conversar con nosotros.",
    );
  }

  // Pre-generar mensaje codificado para WhatsApp
  const planMessage = selectedPlan
    ? `Me interesa el plan ${selectedPlan.name}.`
    : "Quisiera asesoría para elegir un plan.";
  const text = `¡Hola Qatu! Mi nombre es ${fullName}, soy de ${businessName} (${categoryLabels[category]}). ${planMessage} Mi celular es ${phone}.${
    message ? ` Nota: ${message}` : ""
  }`;

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;

  return {
    success: true,
    persisted: result.persisted === true,
    message:
      result.persisted === true
        ? "Tu solicitud ha sido registrada. Puedes continuar la conversación por WhatsApp."
        : "Tu mensaje está preparado. Para enviarlo y que podamos atenderte, continúa por WhatsApp.",
    whatsappUrl,
  };
}
