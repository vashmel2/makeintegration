import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, ArrowRight, BookOpen } from "lucide-react"
import { DocumenterPanel } from "@/components/tools/ScenarioDocumenter/DocumenterPanel"

export const metadata: Metadata = {
  title: "Scenario Documenter for Make.com",
  description:
    "Paste your Make.com blueprint JSON and get clean, shareable documentation instantly. Runs entirely in your browser.",
}

export default function ScenarioDocumenterPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Scenario Documenter</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Scenario Documenter</h1>
        <p className="mt-1 text-muted-foreground">
          Export your Make.com blueprint and paste it below to generate clean, readable
          documentation you can share with your team.
        </p>
      </div>

      <DocumenterPanel />

      {/* SEO content */}
      <div className="mt-16 border-t border-border pt-12 space-y-12">

        <section>
          <h2 className="text-xl font-bold mb-3">What is the Scenario Documenter?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Make.com has no built-in way to document your scenarios. When you hand off a project or revisit a
            scenario months later, you end up reading modules one by one to figure out what it does. The Scenario
            Documenter reads your blueprint JSON and produces clean, readable documentation in seconds. No account
            needed, runs entirely in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">How to use the Scenario Documenter</h2>
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
              <span>Open the file, copy the contents, and paste them into the input panel above.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">4</span>
              <span>Click <strong className="text-foreground">Generate Docs</strong> and copy or download the result.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-6">Frequently asked questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Does this send my blueprint to a server?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">No. The tool runs entirely in your browser. Your blueprint JSON never leaves your device.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">What does the output include?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Module names, types, the connections between modules, filters, and field mappings formatted in a human-readable layout.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Can I share the output with my team?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Yes. You can copy the output as markdown or download it as a file to share or add to a project wiki.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Does it work with all Make.com modules?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">It works with any valid Make.com blueprint JSON, regardless of which apps or modules your scenario uses.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Related reading</h2>
          <Link
            href="/blog/how-to-document-your-make-scenarios"
            className="flex items-start gap-3 rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-card transition-colors group"
          >
            <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium group-hover:text-primary transition-colors">How to Document Your Make.com Scenarios</p>
              <p className="text-sm text-muted-foreground mt-0.5">Why documentation matters for Make.com builders and how to generate it in seconds.</p>
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
