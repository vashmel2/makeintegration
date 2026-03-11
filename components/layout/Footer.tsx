import Link from "next/link"
import { Zap } from "lucide-react"
import { SITE_DESCRIPTION, FOOTER_LINKS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Top row */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
              </span>
              Make<span className="text-primary">Integration</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              {SITE_DESCRIPTION}
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold">Tools</h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="text-sm font-semibold">Blog</h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.blog.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Support bar */}
        <div className="mt-10 rounded-xl border border-border bg-muted/50 p-5 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">All tools are free. Keep them that way.</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              If MakeIntegration saves you time, a coffee helps cover the costs.
            </p>
          </div>
          <a
            href="https://paypal.me/makeintegration"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:mt-0 sm:ml-4"
          >
            ☕ Buy us a coffee
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} MakeIntegration.com — Not affiliated with Make.com</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
