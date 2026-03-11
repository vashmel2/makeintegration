import Link from "next/link"
import { Zap, Shield, Wrench, BookOpen } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description:
    "MakeIntegration is a free toolkit for Make.com builders. Debug webhooks, document scenarios, analyze health, compare blueprints, and map dependencies — all in your browser.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-16">

      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <h1 className="text-3xl font-bold text-foreground">
            Make<span className="text-primary">Integration</span>
          </h1>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A free toolkit for people who build automations on Make.com. No account required.
          No data uploaded. Everything runs in your browser.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">What this is</h2>
        <div className="space-y-3 text-[15px] text-muted-foreground leading-relaxed">
          <p>
            Make.com is a powerful automation platform. But it has gaps: no version history,
            no built-in documentation, no way to visualize how your scenarios connect to each
            other, and limited debugging tools for webhooks.
          </p>
          <p>
            MakeIntegration fills those gaps with free browser-based tools built specifically
            for Make users. You export a blueprint, load it into a tool, and get something
            useful back in seconds.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold text-foreground">The tools</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              name: "Webhook Inspector",
              href: "/tools/webhook-inspector",
              desc: "Get a unique webhook URL and inspect incoming payloads in real time. See headers, body, query params, and method for every request.",
            },
            {
              name: "Scenario Documenter",
              href: "/tools/scenario-documenter",
              desc: "Turn a Make blueprint into clean, readable documentation. Download as Markdown and share with clients or teammates.",
            },
            {
              name: "Scenario Analyzer",
              href: "/tools/scenario-analyzer",
              desc: "Get a health score for your scenario, identify structural issues, and estimate how many operations it uses per run.",
            },
            {
              name: "Blueprint Diff",
              href: "/tools/blueprint-diff",
              desc: "Compare two versions of a blueprint side by side. See exactly which modules changed and which fields were modified.",
            },
            {
              name: "Dependency Mapper",
              href: "/tools/dependency-mapper",
              desc: "Upload multiple blueprints and visualize how your scenarios call each other via webhooks. See what breaks if you change one.",
            },
          ].map(({ name, href, desc }) => (
            <Link
              key={name}
              href={href}
              className="rounded-xl border border-border bg-card/40 p-4 space-y-1.5 transition-colors hover:border-primary/30 hover:bg-card"
            >
              <p className="font-semibold text-foreground text-sm">{name}</p>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">How the privacy works</h2>
        <div className="space-y-3 text-[15px] text-muted-foreground leading-relaxed">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p>
              All blueprint tools (Scenario Documenter, Scenario Analyzer, Blueprint Diff,
              Dependency Mapper) run entirely in your browser. Your blueprint JSON is never
              sent to any server.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Wrench className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p>
              The Webhook Inspector is the one exception. It stores incoming webhook payloads
              in a database so you can see them in real time. Those payloads are automatically
              deleted after 2 hours. You can also clear them manually at any time.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">The blog</h2>
        <p className="text-[15px] text-muted-foreground leading-relaxed">
          The blog covers Make.com workflows, debugging techniques, and practical guides
          for getting more out of your automations. No fluff, no SEO padding. If a post
          is here it covers something specific and useful.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <BookOpen className="h-4 w-4" />
          Browse the blog
        </Link>
      </section>

      <section className="space-y-3 text-[15px] text-muted-foreground">
        <h2 className="text-xl font-bold text-foreground">Contact</h2>
        <p>
          Questions, feedback, or bug reports: reach out via the GitHub repository or
          email listed in the footer. If something is broken or behaving unexpectedly,
          please let us know.
        </p>
      </section>

    </div>
  )
}
