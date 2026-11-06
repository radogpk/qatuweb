"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { getWhatsAppUrl } from "@/lib/config/site";

export function WhatsAppFloat() {
  const pathname = usePathname();
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname?.startsWith("/demo") ||
    pathname?.startsWith("/dashboard")
  )
    return null;

  return (
    <a
      className="contact-float"
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a Qatu por WhatsApp"
    >
      <MessageCircle size={22} />
    </a>
  );
}
