import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import services from "@/content/services.json";
import industries from "@/content/industries.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/industries", priority: 0.85, changeFrequency: "monthly" },
    { path: "/case-studies", priority: 0.85, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/team", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/security", priority: 0.65, changeFrequency: "monthly" },
    { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/legal/cookies", priority: 0.3, changeFrequency: "yearly" },
  ];

  const serviceRoutes = services.pillars.map((p) => ({
    path: `/services/${p.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const industryRoutes = industries.industries.map((i) => ({
    path: `/industries/${i.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes].map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
