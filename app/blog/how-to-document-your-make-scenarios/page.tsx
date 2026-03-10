import Link from "next/link"
import { ArrowLeft, Clock, FileText, CheckCircle, Share2, Users } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Document Your Make.com Scenarios | MakeIntegration",
  description:
    "Built a Make.com scenario and now nobody (including you) knows how it works? The free Scenario Documenter turns your blueprint into clean, readable docs in seconds.",
}

export default function ScenarioDocumenterPost() {
  return (
    <main className="min-h-screen">
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
            6 min read
          </span>
          <span className="text-xs text-muted-foreground">March 11, 2026</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          Your Make.com Scenario Works Great.{" "}
          <span className="text-primary">Can You Explain How?</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Three months after you build a scenario, opening it feels like reading someone
          else&apos;s code. Here&apos;s a free tool that documents it for you, instantly.
        </p>
      </header>

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-4 pb-20">
        <div className="prose-custom space-y-8 text-[15px] leading-relaxed text-foreground/90">

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              The scenario that nobody can explain
            </h2>
            <p>
              Picture this: you built a Make.com scenario six months ago. It watches for
              new orders, pulls the customer data, creates a row in Google Sheets, sends
              a Slack message to your team, and fires off a confirmation email. It runs
              every day without you touching it. You love it.
            </p>
            <p>
              Then a client asks you: &quot;Can you walk me through how this works?&quot;
            </p>
            <p>
              You open Make, stare at the canvas full of modules and arrows, and realize
              you&apos;d need ten minutes just to remember what each module is doing. If
              you&apos;re a freelancer handing off a finished project, that&apos;s not a
              great look. If you&apos;re on a team and someone else needs to maintain the
              scenario, it&apos;s an even bigger problem.
            </p>
            <p>
              Documentation is one of those things everyone agrees is important and almost
              nobody actually does. It takes time, it&apos;s boring, and when you&apos;re
              in the flow of building something, stopping to write a doc feels like the
              last thing you want to do.
            </p>
            <p>
              That&apos;s exactly why we built the Scenario Documenter.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              What the Scenario Documenter actually does
            </h2>
            <p>
              The tool takes your Make.com blueprint file (a JSON file you export straight
              from Make) and turns it into a clean, readable document. Not a wall of raw
              JSON. A proper document with section headers, a list of apps used, a numbered
              breakdown of every module in the flow, and the settings your scenario is
              running on.
            </p>
            <p>
              You get two things out of it. First, an on-screen document you can read right
              there in the browser. Second, a downloadable Markdown file you can save, share
              as a Google Doc, paste into Notion, attach to a client handoff, or drop into
              a GitHub repo.
            </p>
            <p>
              The whole thing runs in your browser. Your blueprint data never touches a
              server. You&apos;re not uploading anything to a third party. You paste or drop
              the file, click a button, and the document is ready.
            </p>
          </section>

          {/* Section 3: How to use it */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              How to use it (step by step)
            </h2>

            <p>
              It takes about 30 seconds. Here&apos;s the full process.
            </p>

            {/* Step 1 */}
            <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  1
                </div>
                <h3 className="font-semibold text-foreground">Export your blueprint from Make.com</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-10">
                Open your scenario in Make. Click the three dots (...) in the bottom toolbar,
                then select <strong className="text-foreground">Export Blueprint</strong>. Make
                will download a <code className="text-foreground">.json</code> file to your computer.
                That&apos;s your blueprint.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  2
                </div>
                <h3 className="font-semibold text-foreground">Drop the file (or paste the contents)</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-10">
                Go to the{" "}
                <Link href="/tools/scenario-documenter" className="text-primary hover:underline">
                  Scenario Documenter
                </Link>{" "}
                and drag your blueprint file directly onto the input area. You can also click
                &quot;Browse file&quot; to pick it from your computer, or open the file, copy
                everything, and paste it in. All three options work the same way.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  3
                </div>
                <h3 className="font-semibold text-foreground">Click Generate Document</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-10">
                Hit the orange button. The tool parses the blueprint and builds the document
                instantly. If you used the drag-and-drop or file browser, it even skips the
                button click and generates it automatically.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  4
                </div>
                <h3 className="font-semibold text-foreground">Copy or download the result</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-10">
                You&apos;ll see the full document on screen. From there you can copy the raw
                Markdown with one click, or download it as a <code className="text-foreground">.md</code> file.
                Paste it into Notion, Google Docs, a README, a client email, wherever you need it.
              </p>
            </div>
          </section>

          {/* Section 4: What's in the doc */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              What&apos;s actually in the document
            </h2>
            <p>
              We thought carefully about what someone reading the document actually needs to
              know. Here&apos;s what gets included.
            </p>

            <div className="space-y-3">
              {[
                {
                  label: "Scenario name and trigger type",
                  desc: "Whether your scenario runs on a schedule or fires instantly via webhook.",
                },
                {
                  label: "Quick stats",
                  desc: "Total number of modules, how many different apps are connected, the max error count, and whether sequential execution is on.",
                },
                {
                  label: "Apps used",
                  desc: "A clean list of every app your scenario connects to: Google Sheets, Slack, Gmail, Airtable, whatever you have. If an app appears more than once, it shows a count.",
                },
                {
                  label: "Module flow",
                  desc: "Every module listed in order, numbered, with the app it belongs to and whether it's the trigger, an action, a router, an iterator, or an aggregator. Router branches are shown as sub-lists so the branching logic is clear.",
                },
                {
                  label: "Settings",
                  desc: "Max errors, sequential execution, auto-commit, data loss protection, and confidential mode. The stuff that affects how your scenario behaves when things go wrong.",
                },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  <div>
                    <p className="font-medium text-foreground">{label}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Who it's for */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Who actually needs this
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: <Users className="h-5 w-5 text-primary" />,
                  title: "Freelancers and agencies",
                  body: "When you deliver a finished automation to a client, a document showing exactly what you built is part of a professional handoff. It answers the questions before the client even asks them.",
                },
                {
                  icon: <Share2 className="h-5 w-5 text-primary" />,
                  title: "Teams",
                  body: "If you work with other people, the person who didn't build the scenario shouldn't have to reverse-engineer it to understand it. A doc makes collaboration and maintenance a lot less painful.",
                },
                {
                  icon: <FileText className="h-5 w-5 text-primary" />,
                  title: "Solo builders",
                  body: "Even if it's just you, you will forget. Six months from now when something breaks at 2am, you'll want a plain-language explanation of what this scenario is supposed to do.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
                  {icon}
                  <p className="font-semibold text-foreground text-sm">{title}</p>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: FAQ-style real questions */}
          <section className="space-y-5">
            <h2 className="text-2xl font-bold text-foreground">
              A few things people ask
            </h2>

            <div className="space-y-5">
              <div className="space-y-2">
                <p className="font-semibold text-foreground">
                  Does it show the actual data inside my modules? Filters, field mappings, that kind of thing?
                </p>
                <p className="text-muted-foreground">
                  Not right now. The Scenario Documenter focuses on structure: which apps are connected,
                  in what order, and how the flow branches. The actual field mappings inside each module
                  can contain sensitive information (API keys, column references, customer data), so we
                  leave those out by default. We&apos;re thinking about how to handle that well in a
                  future version.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-foreground">
                  What happens if my scenario is really large?
                </p>
                <p className="text-muted-foreground">
                  It handles large blueprints fine. Even a &quot;simple&quot; Make scenario can export
                  as a 2,000+ line JSON file because the format includes a lot of editor metadata (x/y
                  positions, column specs, interface definitions). The tool ignores all of that and only
                  reads the parts that matter. Parsing is instant regardless of file size.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-foreground">
                  Is my data safe?
                </p>
                <p className="text-muted-foreground">
                  Yes. Everything runs in your browser. Your blueprint is never sent to any server.
                  There&apos;s no account, no login, no data stored anywhere. You paste your file,
                  your browser processes it, and that&apos;s it.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-foreground">
                  Is it free?
                </p>
                <p className="text-muted-foreground">
                  Completely free. No limits on how many scenarios you document.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-4 text-center">
            <FileText className="mx-auto h-8 w-8 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Try it on one of your own scenarios
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Export any blueprint from Make.com, drop it in, and see what the document looks like.
              Takes less than a minute.
            </p>
            <Link
              href="/tools/scenario-documenter"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open Scenario Documenter
            </Link>
          </section>

        </div>
      </article>
    </main>
  )
}
