import Link from "next/link"
import { ArrowLeft, Clock, Activity, XCircle, AlertTriangle, Info } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Is Your Make.com Scenario Actually Built Well? | MakeIntegration",
  description:
    "A working scenario and a well-built scenario are two different things. The free Scenario Analyzer gives yours a health score and flags issues before they cost you.",
}

export default function ScenarioAnalyzerPost() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Your Make.com Scenario Works. But Is It Actually Built Well?",
    description:
      "A working scenario and a well-built scenario are two different things. The free Scenario Analyzer gives yours a health score and flags issues before they cost you.",
    url: "https://makeintegration.com/blog/how-to-check-the-health-of-your-make-scenarios",
    datePublished: "2026-03-11",
    author: { "@type": "Organization", name: "MakeIntegration", url: "https://makeintegration.com" },
    publisher: { "@type": "Organization", name: "MakeIntegration", url: "https://makeintegration.com" },
  }

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Back link */}
      <div className="mx-auto max-w-3xl px-4 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Blog
        </Link>
      </div>

      {/* Hero */}
      <header className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-orange-400/10 px-2.5 py-0.5 text-xs font-semibold text-orange-400">
            Tool Guide
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            7 min read
          </span>
          <span className="text-xs text-muted-foreground">March 11, 2026</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          Your Make.com Scenario Works.{" "}
          <span className="text-primary">But Is It Actually Built Well?</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          &quot;It works&quot; and &quot;it&apos;s built well&quot; are two very different
          things. The Scenario Analyzer tells you the difference.
        </p>
      </header>

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-4 pb-20">
        <div className="prose-custom space-y-8 text-[15px] leading-relaxed text-foreground/90">

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              The scenario that almost cost someone their job
            </h2>
            <p>
              I&apos;ve seen this happen more than once. Someone builds a Make.com scenario
              that works perfectly in testing. It processes orders, sends emails, updates
              a spreadsheet. Clean, fast, reliable. They hand it off to a client, the client
              loves it.
            </p>
            <p>
              Three months later, an API it depends on returns an unexpected error. The scenario
              fails. But because there&apos;s no error handler configured, Make just quietly
              logs the failure and moves on. Nobody gets notified. No Slack message, no email,
              no alert. For two weeks, the automation is silently doing nothing.
            </p>
            <p>
              By the time anyone notices, hundreds of orders haven&apos;t been processed.
            </p>
            <p>
              The scenario worked. It just wasn&apos;t built to handle real-world conditions.
              And the gap between those two things is exactly what we built the Scenario
              Analyzer to catch.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              What the Scenario Analyzer actually does
            </h2>
            <p>
              You export your blueprint from Make.com (same process as the Documenter), paste
              or drop the file into the tool, and it runs a set of checks on the structure of
              your scenario. You get a health score out of 100 and a list of issues organized
              by severity.
            </p>
            <p>
              It also calculates how many operations your scenario uses per run. Since Make
              bills by operations, this helps you understand what a scenario is actually
              costing you before you hit your monthly limit and start getting surprised.
            </p>
            <p>
              The whole thing runs in your browser. No data leaves your device.
            </p>
          </section>

          {/* Section 3: How to use */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              How to use it
            </h2>
            <p>Same process as the Documenter. Takes about 30 seconds.</p>

            {[
              {
                n: 1,
                title: "Export your blueprint",
                body: "Open your scenario in Make, click the three dots (...) in the bottom toolbar, and select Export Blueprint. You'll get a .json file.",
              },
              {
                n: 2,
                title: "Drop it in or paste the contents",
                body: "Go to the Scenario Analyzer, drag your file onto the input area, or open the file and paste the JSON. The Browse file button works too.",
              },
              {
                n: 3,
                title: "Click Analyze Scenario",
                body: "If you used drag-and-drop or the file browser, it analyzes automatically. Otherwise, hit the button.",
              },
              {
                n: 4,
                title: "Read the results",
                body: "You'll see a health score, a metrics grid, and a list of issues with plain-language explanations and specific suggestions for each one.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="rounded-xl border border-border bg-muted/20 p-5 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{n}</div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground pl-10">{body}</p>
              </div>
            ))}
          </section>

          {/* Section 4: The checks explained */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              What the tool checks for, and why each one matters
            </h2>
            <p>
              There are currently eight checks. Here&apos;s what each one is looking for and
              why it shows up in the report.
            </p>

            {/* Errors */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                <p className="text-sm font-bold uppercase tracking-wider text-red-400">Errors</p>
              </div>

              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 space-y-2">
                <p className="font-semibold text-foreground text-sm">No modules found</p>
                <p className="text-sm text-muted-foreground">
                  This fires if the blueprint is empty or the flow contains nothing. Usually
                  means you exported the wrong thing, or the file is corrupted. Deducts 30
                  points from the health score.
                </p>
              </div>
            </div>

            {/* Warnings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0" />
                <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">Warnings</p>
              </div>

              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 space-y-2">
                <p className="font-semibold text-foreground text-sm">No error handler configured</p>
                <p className="text-sm text-muted-foreground">
                  This is the big one. Without an Error Handler module, Make uses its default
                  behavior when something fails, which is: stop the run and log it. You won&apos;t
                  get notified. Your data won&apos;t be retried. The failure just sits in the
                  history tab waiting for you to notice it.
                </p>
                <p className="text-sm text-muted-foreground">
                  An Error Handler lets you define what happens instead. Send yourself a Slack
                  message, log the failed bundle to a Google Sheet, try again after a delay.
                  Anything is better than silent failure. This check deducts 15 points.
                </p>
              </div>

              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 space-y-2">
                <p className="font-semibold text-foreground text-sm">Empty router branch</p>
                <p className="text-sm text-muted-foreground">
                  A Router branch with zero modules. When data matches the filter for that
                  branch, Make routes it in, executes... nothing, and burns one operation doing
                  it. If it&apos;s intentional (you plan to fill it in later) that&apos;s fine,
                  but it&apos;s usually an oversight. Also deducts 15 points.
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-400 shrink-0" />
                <p className="text-sm font-bold uppercase tracking-wider text-blue-400">Suggestions</p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "Router with only one branch",
                    body: "A Router that leads to a single branch doesn't route anything. It adds 1 op per run and makes the scenario harder to read. The modules inside should connect directly to the previous step. 5 points.",
                  },
                  {
                    title: "Multiple unfiltered router branches",
                    body: "Having one unfiltered branch on a router is normal and intentional (it's usually your catch-all). Having multiple unfiltered branches means everything flows into all of them, which may not be what you wanted. 5 points.",
                  },
                  {
                    title: "Iterator without an aggregator",
                    body: "An Iterator splits an array into individual bundles. Without an Aggregator downstream, those bundles never get collected back together. Sometimes that's intentional: you want to process each item separately and you're done. But if you expected a combined output, the aggregator is missing. 5 points.",
                  },
                  {
                    title: "25 or more modules",
                    body: "Large scenarios aren't inherently bad, but they're harder to debug, harder to hand off, and more expensive per run. At some point it's worth asking whether this should be two or three smaller scenarios that communicate via HTTP. 5 points.",
                  },
                  {
                    title: "Nested routers",
                    body: "A Router inside another Router's branch. This isn't wrong, but it adds complexity fast. If the inner logic is getting complicated, a sub-scenario can make things easier to reason about. 5 points.",
                  },
                ].map(({ title, body }) => (
                  <div key={title} className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-2">
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 5: Operations */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              The operations estimator
            </h2>
            <p>
              Make charges by operation. Every module that executes in a run costs 1 op.
              That sounds simple, but the actual number gets tricky fast.
            </p>
            <p>
              The tool shows you a range: a minimum and a maximum ops-per-run estimate.
              The minimum assumes your scenario always takes the shortest router branch.
              The maximum assumes it always takes the longest. Reality is usually somewhere
              in between, depending on which branches actually fire for a given piece of data.
            </p>
            <p>
              If your scenario has an Iterator, you also get a calculator. You tell it how
              many items your iterator typically processes, and it shows you the projected
              total. The formula is straightforward: base ops (modules that run once) plus
              loop modules multiplied by your item count. A scenario with 5 base modules
              and 3 modules in a loop that processes 100 items per run costs 305 ops, not 8.
              That&apos;s the kind of thing that surprises people when they hit their plan limit.
            </p>
          </section>

          {/* Section 6: Limitations */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              What the tool can&apos;t tell you (and why)
            </h2>
            <p>
              The analyzer works from the blueprint file, which describes the structure of
              your scenario. It doesn&apos;t know what actually happens when your scenario
              runs. That creates some real blind spots.
            </p>

            <div className="space-y-3">
              {[
                {
                  icon: <XCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />,
                  title: "It can't see inside your modules",
                  body: "The analyzer knows which modules exist and what order they're in. It doesn't know what field mappings, formulas, or conditions you've set inside each one. A filter condition that references a non-existent field, a formula that divides by zero, a mapping that pulls from the wrong bundle. None of that shows up here.",
                },
                {
                  icon: <XCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />,
                  title: "The ops estimate is an approximation",
                  body: "We count router branches correctly (only one fires per run), but Make's exact counting rules for certain built-in modules aren't publicly documented. The estimate is directionally accurate and useful for planning, but don't treat it as a precise billing number.",
                },
                {
                  icon: <XCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />,
                  title: "Iterator detection scans linearly",
                  body: "The tool finds modules that sit between an Iterator and an Aggregator in a flat flow. If your scenario has an unusual structure (an iterator with no aggregator at all, or multiple nested iterators), the loop module count may be off. We flag the situation but the number should be treated as approximate.",
                },
                {
                  icon: <XCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />,
                  title: "It doesn't check connection health or rate limits",
                  body: "Whether your connections are authorized, whether you're approaching API rate limits, whether a module is using a deprecated version. None of that is in the blueprint. You'd need Make's API for that level of inspection.",
                },
                {
                  icon: <XCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />,
                  title: "It can't catch logic bugs",
                  body: "The analyzer checks structure, not intent. A scenario with no structural problems can still have completely wrong logic. If your router sends the right data to the wrong branch, or your aggregator is in the wrong place, or you're writing to the wrong sheet, the analyzer won't know. That's a human review job.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex items-start gap-3 rounded-xl border border-border bg-muted/10 p-4">
                  {icon}
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p>
              The limitations aren&apos;t reasons not to use it. They&apos;re reasons to
              treat the results as a starting point, not a final verdict. A clean score
              means your scenario is structurally sound. It doesn&apos;t mean it&apos;s
              correct. You still need to test it with real data.
            </p>
          </section>

          {/* Section 7: Who benefits */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              When this is most useful
            </h2>
            <p>
              Run it before you hand off a scenario to a client. It takes 30 seconds and
              catches the kind of structural problems that are embarrassing to explain after
              the fact. No error handler is the big one. If a scenario you delivered breaks
              silently for two weeks, that&apos;s a difficult conversation.
            </p>
            <p>
              Run it on old scenarios you&apos;ve inherited or haven&apos;t touched in a
              while. Scenarios that were built quickly under deadline pressure often skip
              error handling. The analyzer surfaces that quickly.
            </p>
            <p>
              Run it when you&apos;re getting close to your Make operations limit and don&apos;t
              know which scenario is eating the most. Export a few suspects, check their
              operations estimates, and you&apos;ll usually find one that&apos;s much more
              expensive than you expected.
            </p>
            <p>
              Run it when you&apos;re learning Make. The suggestions section explains not just
              what&apos;s flagged but why it matters and what to do about it. It&apos;s a
              decent way to learn best practices without having to find them all through
              trial and error.
            </p>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-4 text-center">
            <Activity className="mx-auto h-8 w-8 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Run a scenario through it
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Export any blueprint from Make.com and see what comes up. The no-error-handler
              warning fires on most scenarios people test for the first time.
            </p>
            <Link
              href="/tools/scenario-analyzer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open Scenario Analyzer
            </Link>
          </section>

        </div>
      </article>
    </div>
  )
}
