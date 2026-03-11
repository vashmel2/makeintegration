import type { MetadataRoute } from "next"

const BASE_URL = "https://makeintegration.com"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-03-11"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date("2026-03-11"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools/webhook-inspector`,
      lastModified: new Date("2026-03-11"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/scenario-documenter`,
      lastModified: new Date("2026-03-11"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/scenario-analyzer`,
      lastModified: new Date("2026-03-11"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/blueprint-diff`,
      lastModified: new Date("2026-03-11"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/dependency-mapper`,
      lastModified: new Date("2026-03-11"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date("2026-03-11"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/how-to-compare-make-com-blueprints`,
      lastModified: new Date("2026-03-11"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/how-to-map-make-com-scenario-dependencies`,
      lastModified: new Date("2026-03-11"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/how-to-check-the-health-of-your-make-scenarios`,
      lastModified: new Date("2026-03-11"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/how-to-document-your-make-scenarios`,
      lastModified: new Date("2026-03-11"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/how-to-debug-make-webhooks-with-webhook-inspector`,
      lastModified: new Date("2025-03-10"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]
}
