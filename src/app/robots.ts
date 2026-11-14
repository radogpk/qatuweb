import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/dashboard/admin"],
      },
      // Motores de Búsqueda con IA (GEO / AEO)
      {
        userAgent: [
          "Googlebot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
        ],
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/dashboard/admin"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
