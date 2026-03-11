import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | MakeIntegration",
  description: "Terms of Service for MakeIntegration.com — the rules governing your use of our free Make.com tools.",
}

const LAST_UPDATED = "March 11, 2026"

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <header className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
      </header>

      <div className="space-y-10 text-[15px] leading-relaxed text-foreground/90">

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">1. Acceptance of terms</h2>
          <p>
            By accessing or using makeintegration.com (the &quot;Site&quot;) or any tools,
            content, or services available through it (collectively, the &quot;Service&quot;),
            you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do
            not agree to these Terms, do not use the Service.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and
            MakeIntegration (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">2. Description of service</h2>
          <p>
            MakeIntegration provides free browser-based tools designed to assist users of
            Make.com (formerly Integromat). These tools include, but are not limited to,
            a Webhook Inspector, Scenario Documenter, Scenario Analyzer, Blueprint Diff
            tool, and Dependency Mapper.
          </p>
          <p>
            The Service is provided free of charge. We reserve the right to modify,
            suspend, or discontinue any part of the Service at any time without notice
            or liability.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">3. Acceptable use</h2>
          <p>You agree to use the Service only for lawful purposes. You must not:</p>
          <ul className="list-disc list-inside space-y-1.5 text-muted-foreground ml-2">
            <li>Use the Service to transmit, store, or process any data that is illegal, harmful, abusive, defamatory, obscene, or otherwise objectionable</li>
            <li>Use the Webhook Inspector to capture or inspect data you are not authorised to access</li>
            <li>Attempt to overload, disrupt, or degrade the performance of the Service or its underlying infrastructure</li>
            <li>Use automated scripts, bots, or scrapers to make excessive requests to the Service</li>
            <li>Attempt to gain unauthorised access to any part of the Service, its servers, or any connected systems</li>
            <li>Circumvent any rate limits, session caps, or other technical safeguards we have put in place</li>
            <li>Use the Service in any way that could damage, disable, or impair our ability to provide it to other users</li>
            <li>Resell, sublicense, or commercialise the Service without our prior written consent</li>
          </ul>
          <p>
            We reserve the right to terminate or restrict access to the Service for any
            user who violates these Terms, without notice and without liability.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">4. Webhook Inspector — specific terms</h2>
          <p>
            The Webhook Inspector assigns anonymous session URLs that can receive HTTP
            requests from third-party services. By using this feature, you acknowledge that:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-muted-foreground ml-2">
            <li>Session URLs are not secret — anyone who knows the URL can send requests to it</li>
            <li>You are responsible for ensuring you only capture webhook data you have the right to inspect</li>
            <li>Captured data is stored temporarily (maximum 2 hours) and then deleted automatically</li>
            <li>You must not use this feature to intercept, capture, or store data from systems you do not own or have explicit authorisation to test</li>
            <li>We may delete session data at any time, including before the 2-hour window expires, if we determine it is being used in violation of these Terms</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">5. Intellectual property</h2>
          <p>
            All content on the Site, including but not limited to text, code, graphics,
            tool interfaces, and blog posts, is owned by or licensed to MakeIntegration
            and is protected by applicable intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, or create derivative works from
            any content on the Site without our prior written permission. Personal,
            non-commercial use (such as sharing a link or quoting a short passage with
            attribution) is permitted.
          </p>
          <p>
            MakeIntegration is not affiliated with, endorsed by, or in any way officially
            connected with Make.com or Celonis SE.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">6. Your content</h2>
          <p>
            When you use the Webhook Inspector, you may submit data (webhook payloads)
            to our servers. You retain all rights to that data. By submitting it, you
            grant us a limited, temporary licence to store and display it to you as part
            of the Service. This licence ends when the data is deleted.
          </p>
          <p>
            You represent and warrant that any data you submit does not violate any
            applicable law or third-party rights.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">7. Disclaimer of warranties</h2>
          <p className="uppercase text-sm font-semibold text-muted-foreground">
            The service is provided &quot;as is&quot; and &quot;as available&quot; without
            warranties of any kind, either express or implied.
          </p>
          <p>
            We do not warrant that the Service will be uninterrupted, error-free, secure,
            or free of viruses or other harmful components. We do not warrant the accuracy,
            completeness, or usefulness of any output produced by the tools.
          </p>
          <p>
            The tools on this Site process Make.com blueprint files and produce informational
            output. You are solely responsible for decisions you make based on that output.
            Always verify critical changes to your automations independently.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">8. Limitation of liability</h2>
          <p className="uppercase text-sm font-semibold text-muted-foreground">
            To the fullest extent permitted by applicable law, MakeIntegration shall not
            be liable for any indirect, incidental, special, consequential, or punitive
            damages, including but not limited to loss of profits, data, or goodwill,
            arising out of or in connection with your use of or inability to use the service.
          </p>
          <p>
            To the maximum extent permitted by law, MakeIntegration&apos;s total liability
            for any claim arising from your use of the Service shall not exceed USD $10.
          </p>
          <p>
            Some jurisdictions do not allow the exclusion or limitation of certain damages.
            In such jurisdictions, the above limitations apply to the fullest extent
            permitted by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless MakeIntegration and its
            operators, employees, and agents from and against any claims, liabilities,
            damages, losses, and expenses (including reasonable legal fees) arising out
            of or in any way connected with your use of the Service, your violation of
            these Terms, or your violation of any third-party rights.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">10. Third-party links and services</h2>
          <p>
            The Site may contain links to third-party websites or services, including
            Make.com, Supabase, and Vercel. These links are provided for convenience only.
            We have no control over the content or practices of third-party sites and
            accept no responsibility for them. Accessing third-party sites is at your
            own risk.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">11. Changes to these terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. When we make material
            changes, we will update the &quot;Last updated&quot; date at the top of this page.
            Your continued use of the Service after changes are posted constitutes your
            acceptance of the revised Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">12. Governing law</h2>
          <p>
            These Terms are governed by and construed in accordance with applicable law.
            Any disputes arising from these Terms or your use of the Service shall be
            resolved through good-faith negotiation in the first instance. If that fails,
            disputes shall be subject to the exclusive jurisdiction of the courts in the
            relevant jurisdiction.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">13. Contact</h2>
          <p>
            For questions about these Terms, contact us at:{" "}
            <a href="mailto:support@makeintegration.com" className="text-primary hover:underline">
              support@makeintegration.com
            </a>
          </p>
        </section>

      </div>
    </div>
  )
}
