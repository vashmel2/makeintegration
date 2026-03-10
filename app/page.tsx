import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Webhook, FileText, BarChart2, Zap } from "lucide-react"
import { TOOLS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "MakeIntegration - Free Tools for Make.com Builders",
  description:
    "Free browser-based tools for Make.com automation builders. Inspect webhooks, document scenarios, analyze health and operation costs. No login required.",
  openGraph: {
    title: "MakeIntegration - Free Tools for Make.com Builders",
    description:
      "Free browser-based tools for Make.com automation builders. Inspect webhooks, document scenarios, analyze health and operation costs.",
    url: "https://makeintegration.com",
    type: "website",
  },
}

const toolIcons: Record<string, React.ElementType> = {
  webhook: Webhook,
  "file-text": FileText,
  "bar-chart-2": BarChart2,
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Orange glow */}
        <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-3.5 w-3.5" />
              Built for Make.com power users
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              The missing toolkit for{" "}
              <span className="relative">
                <span className="text-primary">Make.com</span>
              </span>{" "}
              builders.
            </h1>

            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Free tools, deep tutorials, and — soon — a template marketplace.
              Everything automation professionals need, in one place.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/tools"
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Explore Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-base font-semibold transition-colors hover:bg-muted"
              >
                Browse the Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Free Tools</h2>
          <p className="mt-2 text-muted-foreground">
            Browser-based utilities for Make.com developers. No login required.
          </p>
        </div>

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

                <h3 className="mt-4 text-base font-semibold">{tool.name}</h3>
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
                  Launch tool
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Blog teaser */}
      <section className="border-y border-border bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">From the Blog</h2>
              <p className="mt-1 text-muted-foreground">
                Tutorials, tips, and use cases for Make.com builders.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Placeholder cards — will be replaced with real data */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                category: "Tutorial",
                title: "How to Debug Make.com Webhooks Like a Pro",
                excerpt:
                  "Learn how to use the Webhook Inspector to capture and analyze payloads in real-time.",
              },
              {
                category: "Tips",
                title: "5 Ways to Reduce Your Make.com Operation Count",
                excerpt:
                  "Practical techniques to optimize your scenarios and stay within your plan limits.",
              },
              {
                category: "Use Case",
                title: "Building a Lead Scoring System with Make.com",
                excerpt:
                  "A step-by-step guide to automatically scoring and routing inbound leads.",
              },
            ].map((post) => (
              <div
                key={post.title}
                className="rounded-xl border border-border bg-card p-5"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {post.category}
                </span>
                <h3 className="mt-2 text-base font-semibold leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/blog"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all posts →
            </Link>
          </div>
        </div>
      </section>

      {/* Marketplace teaser */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 via-card to-card p-8 sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Coming Soon
            </span>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Template Marketplace
            </h2>
            <p className="mt-3 text-muted-foreground">
              Buy and sell production-ready Make.com scenario templates from
              verified builders. Skip the setup — launch automations in minutes.
            </p>
            <form className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary sm:w-72"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
              >
                Notify Me
              </button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              No spam. Just a heads-up when it launches.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
