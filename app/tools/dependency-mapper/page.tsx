import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, ArrowRight, BookOpen } from "lucide-react"
import { MapperPanel } from "@/components/tools/DependencyMapper/MapperPanel"

export const metadata: Metadata = {
  title: "Dependency Mapper for Make.com",
  description:
    "Upload multiple Make.com blueprints and visualize how your scenarios call each other. See which scenarios break if you change one. Free, browser-based.",
  openGraph: {
    title: "Dependency Mapper for Make.com",
    description:
      "Visualize cross-scenario dependencies in Make.com. Upload your blueprints, add webhook URLs, and see which scenarios call which.",
    url: "https://makeintegration.com/tools/dependency-mapper",
    type: "website",
  },
}

export default function DependencyMapperPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Dependency Mapper</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold sm:text-4xl">Dependency Mapper</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Upload your Make.com blueprints and see how your scenarios connect. Find out which
          scenarios would break if you changed or deleted one.
        </p>
      </div>

      <MapperPanel />

      {/* SEO content */}
      <div className="mt-16 border-t border-border pt-12 space-y-12">

        <section>
          <h2 className="text-xl font-bold mb-3">What is the Dependency Mapper?</h2>
          <p className="text-muted-foreground leading-relaxed">
            In a large Make.com workspace, scenarios often trigger each other via webhooks. When you have dozens
            of scenarios, it becomes impossible to know which ones depend on which without mapping it out. The
            Dependency Mapper reads your blueprint files and draws the connections so you can see the full picture
            before making changes. Runs entirely in your browser, no account needed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">How to use the Dependency Mapper</h2>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">1</span>
              <span>Export blueprints from the Make.com scenarios you want to map using the three-dot menu.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">2</span>
              <span>Upload them using the file picker in the tool above.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">3</span>
              <span>Optionally add the webhook URLs your scenarios use to call each other for more accurate matching.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">4</span>
              <span>View the dependency graph and identify which scenarios would break if one was changed or deleted.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-6">Frequently asked questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-1">How does it detect dependencies between scenarios?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">It looks for HTTP and Webhook modules in your blueprints and matches their target URLs to the webhook URLs of other scenarios you have uploaded.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Do I need to upload all my scenarios?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">No. You can start with a subset. Scenarios that call URLs not matched to an uploaded blueprint will show as unresolved dependencies in the graph.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Is my data sent to a server?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">No. Everything runs in your browser. Your blueprint files never leave your device.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Can I export the dependency map?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">You can take a screenshot of the graph. Downloadable exports are on the roadmap.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Related reading</h2>
          <Link
            href="/blog/how-to-map-make-com-scenario-dependencies"
            className="flex items-start gap-3 rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-card transition-colors group"
          >
            <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium group-hover:text-primary transition-colors">How to Map Dependencies Between Make.com Scenarios</p>
              <p className="text-sm text-muted-foreground mt-0.5">Why cross-scenario dependencies are a hidden risk and how to visualize them before they cause outages.</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto mt-0.5 shrink-0" />
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Other free Make.com tools</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/tools/blueprint-diff"
              className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-card transition-colors group"
            >
              <p className="font-medium group-hover:text-primary transition-colors">Blueprint Diff</p>
              <p className="text-sm text-muted-foreground mt-0.5">Compare two versions of a scenario and see exactly what changed.</p>
            </Link>
            <Link
              href="/tools/scenario-analyzer"
              className="rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-card transition-colors group"
            >
              <p className="font-medium group-hover:text-primary transition-colors">Scenario Analyzer</p>
              <p className="text-sm text-muted-foreground mt-0.5">Health score and issue detection for your Make.com scenarios.</p>
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
