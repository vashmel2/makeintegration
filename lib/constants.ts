import type { Tool, NavItem } from "@/lib/types"

export const SITE_NAME = "MakeIntegration"
export const SITE_URL = "https://makeintegration.com"
export const SITE_DESCRIPTION =
  "The missing toolkit for Make.com builders. Free tools, deep tutorials, and a template marketplace — all in one place."

export const TOOLS: Tool[] = [
  {
    slug: "webhook-inspector",
    name: "Webhook Inspector",
    description:
      "Generate a unique URL and capture real-time webhook payloads with full header and body inspection.",
    icon: "webhook",
    tags: ["Debugging", "Webhooks", "Real-time"],
    badge: "FREE",
    href: "/tools/webhook-inspector",
    available: true,
  },
  {
    slug: "scenario-documenter",
    name: "Scenario Documenter",
    description:
      "Paste your Make.com scenario blueprint JSON and generate clean, shareable documentation instantly.",
    icon: "file-text",
    tags: ["Documentation", "Blueprints", "Sharing"],
    badge: "FREE",
    href: "/tools/scenario-documenter",
    available: true,
  },
  {
    slug: "scenario-analyzer",
    name: "Scenario Analyzer",
    description:
      "Get a health score and actionable recommendations for your Make.com scenarios. Includes operations estimator.",
    icon: "bar-chart-2",
    tags: ["Optimization", "Operations", "Best Practices"],
    badge: "FREE",
    href: "/tools/scenario-analyzer",
    available: true,
  },
]

export const NAV_LINKS: NavItem[] = [
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
  { label: "Marketplace", href: "/marketplace", disabled: true },
]

export const BLOG_CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Tutorials", value: "tutorials" },
  { label: "Tips & Tricks", value: "tips" },
  { label: "Use Cases", value: "use-cases" },
  { label: "News", value: "news" },
  { label: "Tools", value: "tools" },
] as const

export const FOOTER_LINKS = {
  tools: [
    { label: "Webhook Inspector", href: "/tools/webhook-inspector" },
    { label: "Scenario Documenter", href: "/tools/scenario-documenter" },
    { label: "Scenario Analyzer", href: "/tools/scenario-analyzer" },
  ],
  blog: [
    { label: "Latest Posts", href: "/blog" },
    { label: "Tutorials", href: "/blog?category=tutorials" },
    { label: "Tips & Tricks", href: "/blog?category=tips" },
    { label: "Use Cases", href: "/blog?category=use-cases" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Newsletter", href: "#newsletter" },
    { label: "Twitter / X", href: "https://twitter.com", external: true },
  ],
}
