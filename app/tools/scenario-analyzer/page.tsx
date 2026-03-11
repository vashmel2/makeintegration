import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, ArrowRight, BookOpen } from "lucide-react"
import { AnalyzerPanel } from "@/components/tools/ScenarioAnalyzer/AnalyzerPanel"

export const metadata: Metadata = {
  title: "Scenario Analyzer for Make.com",
  description:
    "Get a health score and actionable recommendations for your Make.com scenario. Checks for missing error handlers, empty branches, operation costs, and more. Runs in your browser.",
}

export default function ScenarioAnalyzerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Scenario Analyzer</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Scenario Analyzer</h1>
        <p className="mt-1 text-muted-foreground">
          Export your Make.com blueprint and paste it below to get a health score,
          catch common issues, and see how many operations your scenario uses per run.
        </p>
      </div>

      <AnalyzerPanel />

      {/* SEO content */}
      <div className="mt-16 border-t border-border pt-12 space-y-12">

        <section>
          <h2 className="text-xl font-bold mb-3">What is the Scenario Analyzer?</h2>
          <p className="text-muted-foreground leading-relaxed">
            A scenario that runs without errors is not necessarily a well-built scenario. Missing error handlers,
            empty filter branches, and unbounded iterators are common problems that only surface under pressure.
            The Scenario Analyzer gives your Make.com blueprint a health score and flags these issues before they
            become incidents. Runs entirely in your browser, no account needed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">How to use the Scenario Analyzer</h2>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">1</span>
              <span>Open your scenario in Make.com and click the three-dot menu in the top right corner.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">2</span>
              <span>Select <strong className="text-foreground">Export Blueprint</strong> to download the JSON file.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">3</span>
              <span>Paste the JSON contents into the input panel above and click <strong className="text-foreground">Analyze</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">4</span>
              <span>Review your health score and the list of flagged issues, then fix them in your scenario.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-6">Frequently asked questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-1">What does the health score measure?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">It checks for missing error handlers, empty filter branches, high operation counts, and other common structural issues in Make.com scenarios that tend to cause problems at scale.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Does this modify my scenario?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">No. It only reads the blueprint JSON you paste in. Nothing is sent to a server and nothing in your Make.com account is touched.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">My scenario runs fine. Why does it have a low score?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">A working scenario and a well-built scenario are different things. The analyzer catches issues that do not break your scenario today but will cause problems under edge cases or at higher volumes.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Is my blueprint data sent anywhere?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">No. Everything runs in your browser. Your blueprint JSON never leaves your device.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Related reading</h2>
          <Link
            href="/blog/how-to-check-the-health-of-your-make-scenarios"
            className="flex items-start gap-3 rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-card transition-colors group"
          >
            <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium group-hover:text-primary transition-colors">Is Your Make.com Scenario Actually Built Well?</p>
              <p className="text-sm text-muted-foreground mt-0.5">The difference between a working scenario and a well-built one, and how to close the gap.</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto mt-0.5 shrink-0" />
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Other free Make.com tools</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/tools/scenario-documenter"
              className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-card transition-colors group"
            >
              <p className="font-medium group-hover:text-primary transition-colors">Scenario Documenter</p>
              <p className="text-sm text-muted-foreground mt-0.5">Turn your blueprint JSON into clean, shareable documentation.</p>
            </Link>
            <Link
              href="/tools/blueprint-diff"
              className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-card transition-colors group"
            >
              <p className="font-medium group-hover:text-primary transition-colors">Blueprint Diff</p>
              <p className="text-sm text-muted-foreground mt-0.5">Compare two versions of a scenario and see exactly what changed.</p>
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
