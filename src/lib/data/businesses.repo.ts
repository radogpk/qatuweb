import { Business, Lead, PricingPlan } from "../types/business";
import { initialBusinesses, initialPricingPlans } from "../seed/initialBusinesses";
import { supabase, isSupabaseConfigured } from "../supabase/client";

export async function getBusinesses(): Promise<Business[]> {
  if (!isSupabaseConfigured || !supabase) {
    return initialBusinesses;
  }

  try {
    const { data, error } = await supabase
      .from("negocios")
      .select("*")
      .eq("active", true)
      .order("featured", { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn("Supabase query returned empty or error, using local seed:", error?.message);
      return initialBusinesses;
    }

    return data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      subdomain: item.subdomain,
      category: item.category,
      categoryLabel: item.category_label || item.category,
      city: item.city || "Ayacucho",
      shortDescription: item.short_description,
      longDescription: item.long_description,
      logoUrl: item.logo_url,
      coverUrl: item.cover_url,
      featured: item.featured ?? false,
      active: item.active ?? true,
      address: item.address,
      phone: item.phone,
      whatsapp: item.whatsapp,
      instagram: item.instagram,
      tags: item.tags || [],
    }));
  } catch (err) {
    console.error("Error fetching from Supabase, falling back to seed:", err);
    return initialBusinesses;
  }
}

export async function getFeaturedBusinesses(): Promise<Business[]> {
  const all = await getBusinesses();
  return all.filter((b) => b.featured);
}

export async function getBusinessBySlug(slug: string): Promise<Business | undefined> {
  const all = await getBusinesses();
  return all.find((b) => b.slug === slug);
}

export function getPricingPlans(): PricingPlan[] {
  return initialPricingPlans;
}

export async function saveLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Supabase not configured; lead captured locally in mock mode:", lead);
    return { success: true };
  }

  try {
    const { error } = await supabase.from("leads").insert([
      {
        full_name: lead.fullName,
        business_name: lead.businessName,
        category: lead.category,
        phone: lead.phone,
        interested_plan: lead.interestedPlan,
        message: lead.message,
      },
    ]);

    if (error) {
      console.error("Supabase insert lead error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Unexpected error saving lead:", err);
    return { success: false, error: err.message || "Error al conectar con la base de datos" };
  }
}
