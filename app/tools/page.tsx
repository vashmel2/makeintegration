import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Webhook, FileText, BarChart2, ArrowLeftRight, Network } from "lucide-react"
import { TOOLS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Free Make.com Tools",
  description:
    "Free, browser-based utilities for Make.com automation developers. Inspect webhooks, document scenarios, analyze health and operation costs. No login required.",
  openGraph: {
    title: "Free Make.com Tools | MakeIntegration",
    description:
      "Free browser-based tools for Make.com builders. Inspect webhooks, document scenarios, analyze health and operation costs.",
    url: "https://makeintegration.com/tools",
    type: "website",
  },
}

const toolIcons: Record<string, React.ElementType> = {
  webhook: Webhook,
  "file-text": FileText,
  "bar-chart-2": BarChart2,
  "arrow-left-right": ArrowLeftRight,
  "network": Network,
}

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold sm:text-4xl">Make.com Tools</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Free, browser-based utilities for automation developers. No login
          required.
        </p>
      </div>

      {/* Tools grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => {
          const Icon = toolIcons[tool.icon] || Webhook
          return (
            <Link
              key={tool.slug}
              href={tool.href}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                {tool.badge && (
                  <span className="rounded-md px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                    {tool.badge}
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-lg font-semibold">{tool.name}</h2>
              <p className="mt-1.5 flex-1 text-sm text-muted-foreground">
                {tool.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Launch tool <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          )
        })}

        {/* Coming soon card */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-6 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            More tools in development
          </p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Have an idea?{" "}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Suggest one →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
