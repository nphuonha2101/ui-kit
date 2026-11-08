import type { MetadataRoute } from "next";
import { registry } from "@/content/components";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/docs/`, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${SITE_URL}/docs/installation/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/theming/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/forms/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/docs/upgrading/`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/docs/components/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { url: `${SITE_URL}/docs/agents/`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const componentRoutes: MetadataRoute.Sitemap = registry.map((component) => ({
    url: `${SITE_URL}/docs/components/${component.slug}/`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...componentRoutes];
}
