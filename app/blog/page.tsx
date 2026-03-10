import Link from "next/link"
import { ArrowRight, Clock, Tag } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — MakeIntegration",
  description:
    "Tutorials, tips, and deep dives for Make.com builders. Learn how to automate smarter.",
}

const posts = [
  {
    slug: "how-to-debug-make-webhooks-with-webhook-inspector",
    title: "How to Debug Make.com Webhooks (Without Losing Your Mind)",
    excerpt:
      "Webhooks are powerful — but when they silently fail, debugging them feels impossible. Learn how to use the free Webhook Inspector tool to see exactly what data Make.com is sending and receiving.",
    category: "Tutorials",
    categoryColor: "text-orange-400 bg-orange-400/10",
    readTime: "8 min read",
    publishedAt: "2025-03-10",
    featured: true,
  },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogPage() {
  const featured = posts.find((p) => p.featured)
  const rest = posts.filter((p) => !p.featured)

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-5xl px-4">
          <p className="mb-3 text-sm font-medium text-primary">The Blog</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Learn Make.com, the hard-won way.
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Tutorials, debugging guides, and workflow ideas — written by people
            who&apos;ve spent too many hours staring at failed scenario runs.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Featured post */}
        {featured && (
          <div className="mb-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Latest Post
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/40 hover:bg-card/80"
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${featured.categoryColor}`}
                >
                  {featured.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {featured.readTime}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(featured.publishedAt)}
                </span>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mb-6 text-muted-foreground">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Read the guide
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        )}

        {/* More posts grid */}
        {rest.length > 0 && (
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              More Posts
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${post.categoryColor}`}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mb-2 font-bold text-foreground group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Coming soon nudge */}
        <div className="mt-16 rounded-2xl border border-dashed border-border p-8 text-center">
          <Tag className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
          <p className="font-medium text-muted-foreground">More posts coming soon</p>
          <p className="mt-1 text-sm text-muted-foreground/60">
            Subscribe to the newsletter on the homepage to get notified.
          </p>
        </div>
      </div>
    </main>
  )
}
