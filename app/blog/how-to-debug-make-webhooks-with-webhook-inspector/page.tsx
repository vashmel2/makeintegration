import Link from "next/link"
import { ArrowLeft, Clock, Webhook, AlertTriangle, CheckCircle, Zap } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Debug Make.com Webhooks | MakeIntegration",
  description:
    "Webhooks are powerful but hard to debug. Learn how to use the free Webhook Inspector tool to see exactly what data Make.com is sending, in real time.",
}

export default function WebhookInspectorPost() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Debug Make.com Webhooks (Without Losing Your Mind)",
    description:
      "Webhooks are powerful but hard to debug. Learn how to use the free Webhook Inspector tool to see exactly what data Make.com is sending, in real time.",
    url: "https://makeintegration.com/blog/how-to-debug-make-webhooks-with-webhook-inspector",
    datePublished: "2025-03-10",
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
            Tutorial
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            8 min read
          </span>
          <span className="text-xs text-muted-foreground">March 10, 2025</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          How to Debug Make.com Webhooks{" "}
          <span className="text-primary">(Without Losing Your Mind)</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          If you&apos;ve ever built a Make.com scenario that uses webhooks and thought
          &quot;is this thing even working?&quot; This guide is for you.
        </p>
      </header>

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-4 pb-20">
        <div className="prose-custom space-y-8 text-[15px] leading-relaxed text-foreground/90">

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              What even is a webhook?
            </h2>
            <p>
              Think of a webhook like a doorbell. When something happens in one app (say,
              someone fills out a form, pays for something, or sends a message), that app
              rings the doorbell of another app (your Make.com scenario) by sending it
              a package of data over the internet.
            </p>
            <p>
              That &quot;package&quot; is called a <strong>webhook payload</strong>. It usually
              looks something like this:
            </p>
            <div className="rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm text-muted-foreground">
              <pre className="whitespace-pre-wrap wrap-break-word">{`{
  "event": "payment.completed",
  "customer": {
    "name": "Alex Johnson",
    "email": "alex@example.com"
  },
  "amount": 49.00,
  "currency": "USD"
}`}</pre>
            </div>
            <p>
              Your Make.com scenario receives that data, and then does something with it.
              It sends an email, creates a row in a Google Sheet, pings you in Slack, whatever
              you&apos;ve set up.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              The problem: webhooks fail silently
            </h2>
            <p>
              Here&apos;s where things get frustrating. Webhooks are invisible. When your
              scenario isn&apos;t triggering, you don&apos;t always know <em>why</em>. Is the
              other app even sending the webhook? Is it sending data in the right format?
              Are the field names different from what you expected?
            </p>

            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
              <div className="mb-2 flex items-center gap-2 font-semibold text-red-400">
                <AlertTriangle className="h-4 w-4" />
                Common webhook debugging nightmares
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">•</span>
                  The webhook fires but Make.com says &quot;no data received&quot;
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">•</span>
                  The data comes through but a field is called <code className="text-foreground">customer_email</code> instead of <code className="text-foreground">email</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">•</span>
                  You&apos;re not sure if the webhook is even firing at all
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">•</span>
                  The payload format changes and your scenario silently breaks
                </li>
              </ul>
            </div>

            <p>
              The old way to debug this? Trigger the webhook, run the Make.com scenario,
              cross your fingers, look at the execution history, and try to guess what
              happened. If something went wrong, start over.
            </p>
            <p>
              There&apos;s a better way.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Enter the Webhook Inspector
            </h2>
            <p>
              The <strong>Webhook Inspector</strong> is a free tool (built right here on
              MakeIntegration) that gives you a temporary URL you can point webhooks at.
              Then you watch the incoming requests in real time, right in your browser.
            </p>
            <p>
              No account needed. No setup. You just open the tool, grab your URL, and
              start sending webhooks to it.
            </p>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="mb-2 flex items-center gap-2 font-semibold text-primary">
                <Webhook className="h-4 w-4" />
                What you can see for each incoming request
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                  The full <strong className="text-foreground">body</strong>: every field and value in a pretty expandable tree
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                  The <strong className="text-foreground">HTTP method</strong>: GET, POST, PUT, PATCH, DELETE
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                  All <strong className="text-foreground">headers</strong>, including content type, authorization tokens, and more
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                  <strong className="text-foreground">Query parameters</strong>, if the URL has any <code className="text-foreground">?key=value</code> stuff
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                  The <strong className="text-foreground">raw body</strong>, exactly as it was sent and unformatted
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                  <strong className="text-foreground">Timestamp + IP address</strong> so you know when and where it came from
                </li>
              </ul>
            </div>

            <p>
              Best part? It updates <em>live</em>. The moment a webhook hits your URL, it
              appears on screen. No refresh needed.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              How to use it, step by step
            </h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  1
                </div>
                <div className="space-y-2 pt-1">
                  <h3 className="font-semibold text-foreground">Open the Webhook Inspector</h3>
                  <p className="text-sm text-muted-foreground">
                    Head to{" "}
                    <Link
                      href="/tools/webhook-inspector"
                      className="text-primary underline underline-offset-2 hover:no-underline"
                    >
                      MakeIntegration &rsaquo; Tools &rsaquo; Webhook Inspector
                    </Link>
                    . A unique URL is automatically generated for you, like:
                  </p>
                  <div className="rounded-lg border border-border bg-muted/30 px-4 py-2 font-mono text-xs text-muted-foreground">
                    https://makeintegration.com/api/wh/abc123xyz...
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This URL is yours for this session. It&apos;s saved automatically in your
                    browser, so you can close the tab and come back to it later.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  2
                </div>
                <div className="space-y-2 pt-1">
                  <h3 className="font-semibold text-foreground">Copy the URL</h3>
                  <p className="text-sm text-muted-foreground">
                    Click the copy button next to the URL. That&apos;s your inspection endpoint.
                    Now go to whatever app you want to test: Stripe, Typeform, Shopify,
                    a custom app, or even Make.com itself.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  3
                </div>
                <div className="space-y-2 pt-1">
                  <h3 className="font-semibold text-foreground">
                    Point the webhook at your Inspector URL
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    In most apps, this is in a &quot;Webhooks&quot; or &quot;Integrations&quot; settings
                    page. Paste your Inspector URL as the destination. If you&apos;re testing
                    a Make.com <em>outgoing</em> webhook (the HTTP module), put the URL
                    there instead.
                  </p>
                  <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                    <p className="mb-2 font-medium text-foreground">Example: Testing a Make.com HTTP Request module</p>
                    <ol className="list-inside list-decimal space-y-1">
                      <li>Add an HTTP &rsaquo; Make a Request module to your scenario</li>
                      <li>Set the URL to your Inspector URL</li>
                      <li>Set Method to POST</li>
                      <li>Add whatever body data you want to test</li>
                      <li>Run the scenario once manually</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  4
                </div>
                <div className="space-y-2 pt-1">
                  <h3 className="font-semibold text-foreground">Trigger it and watch</h3>
                  <p className="text-sm text-muted-foreground">
                    Fire the webhook from your app: submit the form, trigger the event,
                    run the scenario. Within a second or two, the request appears in the
                    Webhook Inspector panel on the left side. Click it, and the full details
                    load on the right.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  5
                </div>
                <div className="space-y-2 pt-1">
                  <h3 className="font-semibold text-foreground">Dig into the data</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the tabs to explore:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-primary">Body</span>
                      <span>The main payload. Click any arrow to expand nested objects.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-primary">Headers</span>
                      <span>Authentication tokens, content types, and other metadata.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-primary">Query</span>
                      <span>URL parameters (the <code>?key=value</code> part of the URL).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-primary">Raw</span>
                      <span>The exact raw text body, as-is.</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Hit the copy button to copy the current tab&apos;s content, or download
                    the full request as a JSON file if you want to share it or save it.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Practical example: debugging a Make.com webhook trigger
            </h2>
            <p>
              Let&apos;s say you&apos;re building a scenario that triggers when someone fills
              out a Typeform survey. You&apos;ve set up the webhook in Typeform, but Make.com
              keeps saying it didn&apos;t receive any data.
            </p>
            <p>Here&apos;s exactly how you&apos;d debug that:</p>

            <div className="space-y-3">
              <div className="rounded-lg border border-border p-4">
                <p className="mb-1 text-sm font-semibold text-foreground">Step A: Verify the webhook is even firing</p>
                <p className="text-sm text-muted-foreground">
                  Temporarily swap the webhook URL in Typeform to your Inspector URL.
                  Submit a test response. Does it show up in the Inspector? If yes,
                  Typeform is sending it. The problem is on the Make.com side.
                  If not, the issue is in Typeform&apos;s webhook settings.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="mb-1 text-sm font-semibold text-foreground">Step B: Check the exact field names</p>
                <p className="text-sm text-muted-foreground">
                  Look at the Body tab. You might see that Typeform sends answers under
                  a key like <code className="text-foreground">form_response.answers</code>, not a flat{" "}
                  <code className="text-foreground">answers</code> object. Now you know exactly
                  how to map it in Make.com.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="mb-1 text-sm font-semibold text-foreground">Step C: Check the Content-Type header</p>
                <p className="text-sm text-muted-foreground">
                  Head to the Headers tab. Is the <code className="text-foreground">content-type</code> set
                  to <code className="text-foreground">application/json</code>? If it&apos;s{" "}
                  <code className="text-foreground">application/x-www-form-urlencoded</code> instead,
                  Make.com will parse the body differently, and that could be your bug.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Tips and tricks
            </h2>

            <div className="space-y-3">
              <div className="flex gap-3">
                <Zap className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Your session persists across page refreshes</p>
                  <p className="text-sm text-muted-foreground">
                    The Inspector saves your session ID in your browser&apos;s local storage.
                    Close the tab, come back tomorrow. Your session URL is the same and
                    your requests are still there.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Zap className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Share your session URL with teammates</p>
                  <p className="text-sm text-muted-foreground">
                    The URL in the inspector bar is shareable. Copy it and send it to a
                    colleague. They can open the same session and see the same requests.
                    Useful for async debugging.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Zap className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Use &quot;New Session&quot; to start fresh</p>
                  <p className="text-sm text-muted-foreground">
                    If you&apos;re done with a test and want a clean slate, click &quot;New Session&quot;.
                    This generates a brand new URL with no history. Use &quot;Clear&quot; to just
                    wipe the request list without changing your URL.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Zap className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Download the JSON for reference</p>
                  <p className="text-sm text-muted-foreground">
                    The download button saves the full request (method, headers, body, query
                    params) as a JSON file. Great for documenting exactly what an API sends
                    before you build your Make.com mapping.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Wrap up</h2>
            <p>
              Webhooks are one of the most powerful features in Make.com, but they&apos;re
              also one of the most frustrating to debug when things go wrong.
            </p>
            <p>
              The Webhook Inspector gives you a live X-ray view of everything being
              sent and received. Instead of guessing, you can see it. Once you
              know exactly what the data looks like, mapping it in Make.com becomes
              trivial.
            </p>
            <p>
              It&apos;s free, no account needed, and takes about 10 seconds to start using.
              Give it a try next time you&apos;re wrestling with a webhook.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-foreground">Try the Webhook Inspector</p>
                <p className="text-sm text-muted-foreground">
                  Free, instant, no sign-up required.
                </p>
              </div>
              <Link
                href="/tools/webhook-inspector"
                className="shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Open the tool
              </Link>
            </div>
          </section>

        </div>
      </article>
    </div>
  )
}
