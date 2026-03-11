import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, ArrowRight, BookOpen } from "lucide-react"
import { InspectorPanel } from "@/components/tools/WebhookInspector/InspectorPanel"

export const metadata: Metadata = {
  title: "Webhook Inspector for Make.com",
  description:
    "Generate a unique URL and capture real-time webhook payloads from Make.com with full header and body inspection.",
}

export default function WebhookInspectorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Webhook Inspector</span>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Webhook Inspector</h1>
        <p className="mt-1 text-muted-foreground">
          Send any webhook from Make.com to the URL below and inspect payloads
          in real-time.
        </p>
      </div>

      {/* Main inspector */}
      <InspectorPanel />

      {/* SEO content */}
      <div className="mt-16 border-t border-border pt-12 max-w-3xl space-y-12">

        <section>
          <h2 className="text-xl font-bold mb-3">What is the Webhook Inspector?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Make.com does not give you a live view of what your webhooks are actually sending. The Webhook Inspector
            generates a unique URL you paste into your Make.com webhook module, then captures every incoming
            request in real time with full headers and body. No account needed, no setup, completely free.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">How to use the Webhook Inspector</h2>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">1</span>
              <span>Click <strong className="text-foreground">New Session</strong> to generate your unique inspector URL.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">2</span>
              <span>Copy the URL and paste it into your Make.com webhook module as the target URL.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">3</span>
              <span>Run your Make.com scenario to trigger the webhook.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">4</span>
              <span>Watch the request appear in the left panel. Click it to inspect the full headers and body.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-6">Frequently asked questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Is the Webhook Inspector free?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Yes, completely free. No account, no credit card, no limits on how many sessions you create.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">How long does a session last?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Sessions expire after 2 hours and are capped at 25 requests per session. This keeps the tool fast and prevents abuse.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Is my webhook data safe?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Payloads are stored temporarily for the session duration and deleted automatically when it expires. Sensitive headers like Authorization, Cookie, and X-Api-Key are stripped before storage. Do not send production secrets through the inspector.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Does it work with tools other than Make.com?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Yes. It works with any tool or service that can send HTTP requests, including Zapier, n8n, custom scripts, or any API client.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Related reading</h2>
          <Link
            href="/blog/how-to-debug-make-webhooks-with-webhook-inspector"
            className="flex items-start gap-3 rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-card transition-colors group"
          >
            <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium group-hover:text-primary transition-colors">How to Debug Make.com Webhooks</p>
              <p className="text-sm text-muted-foreground mt-0.5">A full walkthrough of debugging webhook issues in Make.com using the Webhook Inspector.</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto mt-0.5 shrink-0" />
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Other free Make.com tools</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/tools/scenario-analyzer"
              className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-card transition-colors group"
            >
              <p className="font-medium group-hover:text-primary transition-colors">Scenario Analyzer</p>
              <p className="text-sm text-muted-foreground mt-0.5">Health score and issue detection for your Make.com scenarios.</p>
            </Link>
            <Link
              href="/tools/scenario-documenter"
              className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-card transition-colors group"
            >
              <p className="font-medium group-hover:text-primary transition-colors">Scenario Documenter</p>
              <p className="text-sm text-muted-foreground mt-0.5">Turn your blueprint JSON into clean, shareable documentation.</p>
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
