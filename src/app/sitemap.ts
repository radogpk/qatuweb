import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Add lastModified only when it comes from a real content-update timestamp.
  const routes = [
    "/",
    "/planes",
    "/para-tu-negocio",
    "/nosotros",
    "/contacto",
    "/directorio",
    "/anuncios",
  ];

  return routes.map((route) => ({ url: new URL(route, siteConfig.url).href }));
}
