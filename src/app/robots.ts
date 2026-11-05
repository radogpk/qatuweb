import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      // Search access is independent from model-training crawler preferences.
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
