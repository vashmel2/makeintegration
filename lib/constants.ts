import type { Tool, NavItem } from "@/lib/types"

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryColor: string
  readTime: string
  publishedAt: string
  featured: boolean
}

export const BLOG_POSTS: PostMeta[] = [
  {
    slug: "how-to-check-the-health-of-your-make-scenarios",
    title: "Your Make.com Scenario Works. But Is It Actually Built Well?",
    excerpt:
      "A working scenario and a well-built scenario are two different things. The free Scenario Analyzer gives yours a health score, flags structural issues, and estimates what it costs you in operations per run.",
    category: "Tool Guide",
    categoryColor: "text-blue-400 bg-blue-400/10",
    readTime: "7 min read",
    publishedAt: "2026-03-11",
    featured: true,
  },
  {
    slug: "how-to-document-your-make-scenarios",
    title: "Your Make.com Scenario Works Great. Can You Explain How?",
    excerpt:
      "Three months after you build a scenario, opening it feels like reading someone else's code. The free Scenario Documenter turns your blueprint into clean, shareable documentation in seconds.",
    category: "Tool Guide",
    categoryColor: "text-blue-400 bg-blue-400/10",
    readTime: "6 min read",
    publishedAt: "2026-03-11",
    featured: false,
  },
  {
    slug: "how-to-compare-make-com-blueprints",
    title: "Make.com Has No Version History. Here's What to Do When Something Breaks.",
    excerpt:
      "You edited a scenario, something stopped working, and now you have no idea what changed. The Blueprint Diff tool shows you exactly what is different between two blueprint versions, down to the field level.",
    category: "Tool Guide",
    categoryColor: "text-blue-400 bg-blue-400/10",
    readTime: "6 min read",
    publishedAt: "2026-03-11",
    featured: false,
  },
  {
    slug: "how-to-map-make-com-scenario-dependencies",
    title: "Your Make.com Scenarios Are Probably More Connected Than You Think",
    excerpt:
      "Most Make power users run scenarios that quietly call each other via webhooks. When one breaks, others go down with it. The Dependency Mapper shows you the full picture before that happens.",
    category: "Tool Guide",
    categoryColor: "text-blue-400 bg-blue-400/10",
    readTime: "7 min read",
    publishedAt: "2026-03-11",
    featured: false,
  },
  {
    slug: "how-to-debug-make-webhooks-with-webhook-inspector",
    title: "How to Debug Make.com Webhooks (Without Losing Your Mind)",
    excerpt:
      "Webhooks are powerful but when they silently fail, debugging them feels impossible. Learn how to use the free Webhook Inspector tool to see exactly what data Make.com is sending and receiving.",
    category: "Tutorial",
    categoryColor: "text-orange-400 bg-orange-400/10",
    readTime: "8 min read",
    publishedAt: "2025-03-10",
    featured: false,
  },
]

export const SITE_NAME = "MakeIntegration"
export const SITE_URL = "https://makeintegration.com"
export const SITE_DESCRIPTION =
  "The missing toolkit for Make.com builders. Free tools, deep tutorials, and a template marketplace. All in one place."

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
  {
    slug: "blueprint-diff",
    name: "Blueprint Diff",
    description:
      "Upload two Make.com blueprint JSON files and see a human-readable breakdown of every change — added modules, removed steps, modified filters and mappings.",
    icon: "arrow-left-right",
    tags: ["Comparison", "Versioning", "Debugging"],
    badge: "FREE",
    href: "/tools/blueprint-diff",
    available: true,
  },
  {
    slug: "dependency-mapper",
    name: "Dependency Mapper",
    description:
      "Upload multiple Make.com blueprints and visualize how your scenarios call each other. See which scenarios break if you change one.",
    icon: "network",
    tags: ["Visualization", "Dependencies", "Architecture"],
    badge: "FREE",
    href: "/tools/dependency-mapper",
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
    { label: "Blueprint Diff", href: "/tools/blueprint-diff" },
    { label: "Dependency Mapper", href: "/tools/dependency-mapper" },
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
