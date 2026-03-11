import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, ArrowRight, BookOpen } from "lucide-react"
import { DiffPanel } from "@/components/tools/BlueprintDiff/DiffPanel"

export const metadata: Metadata = {
  title: "Blueprint Diff Tool for Make.com",
  description:
    "Compare two Make.com blueprint JSON files and see exactly what changed — added modules, removed modules, and modified filters or field mappings. Free, browser-based.",
  openGraph: {
    title: "Blueprint Diff Tool for Make.com",
    description:
      "See exactly what changed between two Make.com scenario versions. Added modules, removed steps, modified filters and mappings — all in one human-readable view.",
    url: "https://makeintegration.com/tools/blueprint-diff",
    type: "website",
  },
}

export default function BlueprintDiffPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Blueprint Diff</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold sm:text-4xl">Blueprint Diff</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Upload your before and after blueprints and see a human-readable breakdown of every
          change — added modules, removed steps, and modified field mappings.
        </p>
      </div>

      <DiffPanel />

      {/* SEO content */}
      <div className="mt-16 border-t border-border pt-12 max-w-3xl space-y-12">

        <section>
          <h2 className="text-xl font-bold mb-3">What is the Blueprint Diff tool?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Make.com has no version history. When something breaks after you edit a scenario, there is no built-in
            way to see exactly what changed. The Blueprint Diff tool lets you compare two blueprint JSON exports
            and get a line-by-line breakdown of every addition, removal, and modification. Runs entirely in your
            browser, completely free.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">How to use the Blueprint Diff tool</h2>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">1</span>
              <span>Export your "before" blueprint from Make.com and paste it into the left panel.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">2</span>
              <span>Export your "after" blueprint and paste it into the right panel.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">3</span>
              <span>Click <strong className="text-foreground">Compare</strong> to generate the diff.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">4</span>
              <span>Review added modules, removed steps, and changed field mappings or filters.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-6">Frequently asked questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Where do I get two versions of a blueprint?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">If you saved a copy before editing, you can compare the old and new exports. It also works for comparing blueprints from two team members who edited the same scenario independently.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Does this send my data to a server?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">No. The comparison runs entirely in your browser. Your blueprint JSON never leaves your device.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Can I compare blueprints from different scenarios?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Yes, though the diff will show everything as changed since the structure will be different. The tool is most useful for comparing two versions of the same scenario.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">What changes get highlighted?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Added modules, removed modules, and changed connections, filters, or field mappings between the two blueprint versions.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Related reading</h2>
          <Link
            href="/blog/how-to-compare-make-com-blueprints"
            className="flex items-start gap-3 rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-card transition-colors group"
          >
            <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium group-hover:text-primary transition-colors">How to Compare Two Make.com Blueprints</p>
              <p className="text-sm text-muted-foreground mt-0.5">Why Make.com has no version history and how to work around it by diffing your blueprints.</p>
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
              href="/tools/dependency-mapper"
              className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-card transition-colors group"
            >
              <p className="font-medium group-hover:text-primary transition-colors">Dependency Mapper</p>
              <p className="text-sm text-muted-foreground mt-0.5">Visualize how your Make.com scenarios call each other.</p>
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
