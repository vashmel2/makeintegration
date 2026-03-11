import Link from "next/link"
import { ArrowLeft, Clock, ArrowLeftRight, XCircle, Check } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Compare Two Make.com Blueprints | MakeIntegration",
  description:
    "Make.com has no version history. When something breaks after an edit, there's no way to see what you changed. Here's how to diff two blueprints and find out exactly what's different.",
}

export default function BlueprintDiffPost() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Make.com Has No Version History. Here's What to Do When Something Breaks.",
    description:
      "Make.com has no version history. When something breaks after an edit, there's no way to see what you changed. Here's how to diff two blueprints and find out exactly what's different.",
    url: "https://makeintegration.com/blog/how-to-compare-make-com-blueprints",
    datePublished: "2026-03-11",
    author: { "@type": "Organization", name: "MakeIntegration", url: "https://makeintegration.com" },
    publisher: { "@type": "Organization", name: "MakeIntegration", url: "https://makeintegration.com" },
  }

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-3xl px-4 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Blog
        </Link>
      </div>

      <header className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-orange-400/10 px-2.5 py-0.5 text-xs font-semibold text-orange-400">
            Tool Guide
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            6 min read
          </span>
          <span className="text-xs text-muted-foreground">March 11, 2026</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          Make.com Has No Version History.{" "}
          <span className="text-primary">Here&apos;s What to Do When Something Breaks.</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          You edited a scenario, something stopped working, and now you&apos;re staring at
          the canvas trying to remember what you changed. The Blueprint Diff tool shows you
          exactly what&apos;s different between two versions.
        </p>
      </header>

      <article className="mx-auto max-w-3xl px-4 pb-20">
        <div className="prose-custom space-y-8 text-[15px] leading-relaxed text-foreground/90">

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              The edit nobody documented
            </h2>
            <p>
              Here&apos;s a situation that comes up more than you&apos;d think. You have a
              Make.com scenario that&apos;s been running fine for months. You make what feels
              like a small change, maybe adjusting a filter condition or swapping a field
              mapping. You test it, it looks fine, you move on.
            </p>
            <p>
              Two days later, someone notices the scenario is producing wrong results. You go
              back in to investigate and realize you genuinely cannot remember what you changed.
              Was it the filter? The mapper? Did you accidentally remove a module? Is the version
              running now even the one you tested?
            </p>
            <p>
              Make.com doesn&apos;t have version history. There&apos;s no git blame, no diff
              view, no audit log that shows you what changed between two points in time. Once
              you save a scenario, the previous version is gone unless you exported it before
              making the edit.
            </p>
            <p>
              That&apos;s why we built the Blueprint Diff tool. It takes two exported blueprints
              and tells you exactly what changed between them: which modules were added, which
              were removed, which were modified, and specifically which fields inside each module
              are different.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              The habit that makes this work
            </h2>
            <p>
              To use this tool, you need two blueprints: the before and the after. That means
              you need to be in the habit of exporting your blueprint before making significant
              changes.
            </p>
            <p>
              It&apos;s a 10-second step. Open your scenario, click the three dots in the
              bottom toolbar, select Export Blueprint, save the file with today&apos;s date in
              the name. That file is your snapshot. Now make your changes. If something goes
              wrong, you have something to compare against.
            </p>
            <p>
              If you&apos;re already past that point and forgot to export before the edit, the
              tool still helps when someone else has the previous version (a client, a teammate,
              or a backup copy on your drive). And going forward, the export-before-edit habit
              is worth building.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              How to use the Blueprint Diff tool
            </h2>
            <p>
              The process is straightforward. You bring two blueprint files, the tool does the
              comparison.
            </p>

            {[
              {
                n: 1,
                title: "Export both blueprints",
                body: "If you have the original saved, great. If not, export the current version now so at least you have a baseline for future comparisons. In Make, click the three dots (...) in the bottom toolbar and select Export Blueprint.",
              },
              {
                n: 2,
                title: "Open the Blueprint Diff tool and load both files",
                body: "The tool has two input slots side by side, labeled Before and After. Drop or paste your older blueprint on the left, your newer one on the right. Each slot validates the JSON and shows a green indicator when the file is loaded correctly.",
              },
              {
                n: 3,
                title: "Click Compare Blueprints",
                body: "The button activates once both sides have valid blueprints. Click it and the diff runs instantly in your browser.",
              },
              {
                n: 4,
                title: "Read the results",
                body: "You'll see a summary at the top (how many modules were added, removed, or changed), then a list of every module that isn't identical between the two versions. Unchanged modules are hidden by default so you can focus on what actually changed.",
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

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              What the diff actually shows you
            </h2>
            <p>
              Results are organized by type, with the most impactful changes first.
            </p>

            <div className="space-y-3">
              {[
                {
                  color: "border-red-500/20 bg-red-500/5",
                  label: "Removed",
                  labelColor: "text-red-400",
                  body: "Modules that existed in the Before blueprint but are gone from the After. If you deleted a module by accident, it shows up here. The module name, ID, and where it sat in the flow are all shown.",
                },
                {
                  color: "border-yellow-500/20 bg-yellow-500/5",
                  label: "Changed",
                  labelColor: "text-yellow-400",
                  body: "Modules that exist in both blueprints but have differences in their configuration. Click any changed module to expand it and see a field-by-field comparison: the path of the field that changed, the old value on the left, and the new value on the right. This is where you find the edited filter condition, the swapped field mapping, the URL that got updated.",
                },
                {
                  color: "border-green-500/20 bg-green-500/5",
                  label: "Added",
                  labelColor: "text-green-400",
                  body: "Modules that didn't exist in the Before blueprint but are in the After. New modules you added during the edit.",
                },
              ].map(({ color, label, labelColor, body }) => (
                <div key={label} className={`rounded-xl border p-4 space-y-2 ${color}`}>
                  <p className={`font-semibold text-sm ${labelColor}`}>{label}</p>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>

            <p>
              The field changes inside each Changed module are shown as a small table:
              the field path (like <code className="text-foreground text-xs bg-muted px-1 py-0.5 rounded">mapper.subject</code> or{" "}
              <code className="text-foreground text-xs bg-muted px-1 py-0.5 rounded">filter.conditions</code>),
              the old value in red, and the new value in green. This is the level of detail that
              actually tells you what broke.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Sharing the diff
            </h2>
            <p>
              Once you have the results, two buttons sit at the top of the diff view.
            </p>
            <p>
              <strong className="text-foreground">Copy as Markdown</strong> puts the full diff
              report on your clipboard formatted as Markdown, with a summary line, a section for
              each changed module, and a table of field changes. Paste it straight into a Slack
              message, a Notion doc, a GitHub issue, or a client email.
            </p>
            <p>
              <strong className="text-foreground">Download .md</strong> saves the same report
              as a file named after the scenario. Useful if you want to archive what changed
              alongside the blueprint exports themselves.
            </p>
            <p>
              Both are browser-only. No files are uploaded anywhere.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              What it can&apos;t catch
            </h2>
            <p>
              The diff works by comparing the JSON structure of two blueprints. That comes with
              some real limits worth understanding.
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "Module matching is by ID",
                  body: "The tool matches modules between the two blueprints using their internal ID number. If you deleted a module and added a similar one in its place (rather than editing the original), the tool will show one Removed and one Added instead of one Changed. That's technically accurate, but it can look more dramatic than the actual change was.",
                },
                {
                  title: "It only sees structure, not behavior",
                  body: "The diff tells you that a field value changed from A to B. It doesn't tell you whether that change is what you intended or whether it fixes the problem you're debugging. Logic errors, wrong formulas, and incorrect mappings still require a human to evaluate.",
                },
                {
                  title: "Position changes are filtered out",
                  body: "Make blueprints store the x/y canvas position of every module. If you moved modules around on the canvas without changing anything functional, those position changes are intentionally ignored. The diff focuses on parameters, mapper, and filter fields, not designer metadata.",
                },
                {
                  title: "Template strings are shown as-is",
                  body: "If a field value contains Make's template syntax (things like {{1.id}} or {{formatDate(...)}}), the diff shows those strings as-is. It doesn't evaluate them or tell you whether the referenced data bundle changed.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="flex items-start gap-3 rounded-xl border border-border bg-muted/10 p-4">
                  <XCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              When this is most useful
            </h2>

            <div className="space-y-3">
              {[
                {
                  title: "Something broke and you're not sure what changed",
                  body: "This is the main use case. If you exported a blueprint before editing and something stopped working after, load both versions and look at the Changed modules. The field that caused the regression is almost always in there.",
                },
                {
                  title: "Reviewing someone else's edits before they go live",
                  body: "If you work on scenarios with a team and someone hands you an updated blueprint to review, this is a much faster way to understand what they changed than opening Make and reading through the whole thing.",
                },
                {
                  title: "Client handoffs where you need to document changes",
                  body: "If a client asks what you changed in their scenario during a maintenance session, the Markdown export is a clean, professional answer. Much better than \"I updated a filter condition and changed two field mappings.\"",
                },
                {
                  title: "Verifying that a scenario was restored correctly",
                  body: "If you had to rebuild a scenario from memory after something went wrong, you can compare your rebuilt version against a backup to confirm you got everything right.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-4 text-center">
            <ArrowLeftRight className="mx-auto h-8 w-8 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Compare two blueprints
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Export a blueprint, make a change, export again, and see exactly what&apos;s different.
              Or use any two versions you already have saved.
            </p>
            <Link
              href="/tools/blueprint-diff"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open Blueprint Diff
            </Link>
          </section>

        </div>
      </article>
    </div>
  )
}
