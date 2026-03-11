import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | MakeIntegration",
  description: "Privacy Policy for MakeIntegration.com — what data we collect, how we use it, and how we protect it.",
}

const LAST_UPDATED = "March 11, 2026"

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <header className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
      </header>

      <div className="space-y-10 text-[15px] leading-relaxed text-foreground/90">

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">1. Overview</h2>
          <p>
            MakeIntegration (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates
            makeintegration.com (the &quot;Site&quot;). This Privacy Policy explains what
            information we collect, how we use it, and what rights you have in relation to it.
          </p>
          <p>
            The short version: most tools on this Site run entirely in your browser and send
            no data to our servers. The one exception is the Webhook Inspector, which
            temporarily stores incoming webhook payloads so you can inspect them in real time.
            Those payloads are deleted automatically after 2 hours.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">2. Information we collect</h2>

          <h3 className="font-semibold text-foreground">2a. Browser-only tools (no data collected)</h3>
          <p>
            The following tools process data entirely within your browser. Nothing you input
            into these tools is transmitted to our servers or stored anywhere:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
            <li>Scenario Documenter</li>
            <li>Scenario Analyzer</li>
            <li>Blueprint Diff</li>
            <li>Dependency Mapper</li>
          </ul>
          <p>
            When you load a blueprint file into any of these tools, that file is read by
            your browser only. It is never uploaded to any server.
          </p>

          <h3 className="font-semibold text-foreground">2b. Webhook Inspector</h3>
          <p>
            The Webhook Inspector works by assigning you a unique session URL. When an
            external service sends a request to that URL, we store the following data
            temporarily so you can inspect it:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
            <li>HTTP method, headers, query parameters, and request body</li>
            <li>IP address of the sending server</li>
            <li>Timestamp of receipt</li>
            <li>An anonymous session token (stored in your browser&apos;s localStorage)</li>
          </ul>
          <p>
            This data is stored on Supabase (our database provider) and is automatically
            deleted after <strong className="text-foreground">2 hours</strong>. You can
            also delete it manually at any time using the Clear button in the tool.
            We never read, analyse, or act on the content of webhook payloads you capture.
          </p>
          <p>
            Sensitive headers including <code className="text-xs bg-muted px-1 py-0.5 rounded">authorization</code>,{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">cookie</code>, and{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">x-api-key</code> are
            stripped before storage and are never saved to the database.
          </p>

          <h3 className="font-semibold text-foreground">2c. Server and usage logs</h3>
          <p>
            Our hosting provider (Vercel) automatically collects basic request logs
            including IP addresses, request paths, timestamps, and response codes. This
            is standard infrastructure logging and is governed by{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Vercel&apos;s Privacy Policy
            </a>.
            We do not run any additional analytics or tracking scripts on this Site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">3. How we use the information</h2>
          <p>The limited data we collect is used only to operate the Webhook Inspector tool:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
            <li>To display captured webhook requests to you in real time</li>
            <li>To enforce session limits and prevent abuse of our infrastructure</li>
          </ul>
          <p>
            We do not sell, rent, trade, or share your data with any third parties for
            marketing or advertising purposes. We do not use your data to build profiles,
            run analytics, or train machine learning models.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">4. Data retention</h2>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
            <li>Webhook payloads: deleted automatically after 2 hours, or immediately when you click Clear</li>
            <li>Session tokens: stored in your browser&apos;s localStorage only; we hold only an anonymous identifier in our database</li>
            <li>Server logs: retained according to Vercel&apos;s standard infrastructure log retention policy</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">5. Third-party services</h2>
          <p>We use the following third-party services to operate the Site:</p>
          <div className="space-y-2">
            {[
              {
                name: "Vercel",
                role: "Hosting and deployment",
                url: "https://vercel.com/legal/privacy-policy",
              },
              {
                name: "Supabase",
                role: "Database for Webhook Inspector session storage",
                url: "https://supabase.com/privacy",
              },
            ].map(({ name, role, url }) => (
              <div key={name} className="flex items-start gap-2 text-sm">
                <span className="font-medium text-foreground w-24 shrink-0">{name}</span>
                <span className="text-muted-foreground">{role} —{" "}
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">6. Cookies and local storage</h2>
          <p>
            We do not use tracking cookies or advertising cookies. The only browser storage
            we use is <code className="text-xs bg-muted px-1 py-0.5 rounded">localStorage</code> to
            remember your Webhook Inspector session token between page visits. This data
            stays on your device and is never transmitted except as part of normal API
            requests to retrieve your session&apos;s captured data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">7. Your rights</h2>
          <p>
            You have the right to access, correct, or delete any personal data we hold
            about you. Because we store only anonymous session tokens and temporary webhook
            payloads, there is very limited personal data associated with your use of this Site.
          </p>
          <p>
            To delete your webhook data, use the Clear button in the Webhook Inspector.
            For any other data requests or privacy concerns, contact us at the address below.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">8. Children</h2>
          <p>
            This Site is not directed at children under the age of 13. We do not knowingly
            collect personal data from children. If you believe a child has provided us
            with personal data, please contact us and we will delete it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">9. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update
            the &quot;Last updated&quot; date at the top of this page. Continued use of the
            Site after changes are posted constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">10. Contact</h2>
          <p>
            For privacy-related questions or requests, contact us at:{" "}
            <a href="mailto:privacy@makeintegration.com" className="text-primary hover:underline">
              privacy@makeintegration.com
            </a>
          </p>
        </section>

      </div>
    </div>
  )
}
