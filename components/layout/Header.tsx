"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, Zap, ChevronDown, Webhook, FileText, BarChart2 } from "lucide-react"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { cn } from "@/lib/utils"
import { TOOLS } from "@/lib/constants"

const toolIcons: Record<string, React.ElementType> = {
  webhook: Webhook,
  "file-text": FileText,
  "bar-chart-2": BarChart2,
}

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false)
    setToolsOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md"
            : "bg-background/60 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </span>
            <span className="hidden sm:inline">
              Make<span className="text-primary">Integration</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {/* Tools dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                onClick={() => setToolsOpen((v) => !v)}
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-muted hover:text-foreground",
                  pathname.startsWith("/tools")
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                Tools
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    toolsOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Dropdown panel — pt-2 creates invisible bridge between button and panel */}
              {toolsOpen && (
                <div className="absolute left-0 top-full pt-1 w-72">
                  <div className="rounded-xl border border-border bg-card p-2 shadow-xl">
                    {TOOLS.map((tool) => {
                      const Icon = toolIcons[tool.icon] || Webhook
                      return (
                        <Link
                          key={tool.slug}
                          href={tool.href}
                          className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted"
                        >
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <div className="flex items-center gap-2 text-sm font-medium">
                              {tool.name}
                              {tool.badge && (
                                <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold bg-primary/10 text-primary">
                                  {tool.badge}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                              {tool.description}
                            </p>
                          </div>
                        </Link>
                      )
                    })}
                    <div className="mt-1 border-t border-border pt-1">
                      <Link
                        href="/tools"
                        className="flex items-center justify-center rounded-lg p-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        View all tools →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                pathname.startsWith("/blog")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              Blog
            </Link>

            <span className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground/40 cursor-not-allowed">
              Marketplace
              <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground">
                SOON
              </span>
            </span>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/auth/login"
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:block"
            >
              Sign In
            </Link>
            <Link
              href="/tools"
              className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:block"
            >
              Get Started
            </Link>

            {/* Mobile menu button */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute inset-x-0 top-16 bg-card border-b border-border p-4 shadow-xl">
            <nav className="flex flex-col gap-1">
              <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tools
              </p>
              {TOOLS.map((tool) => {
                const Icon = toolIcons[tool.icon] || Webhook
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {tool.name}
                  </Link>
                )
              })}

              <div className="my-2 border-t border-border" />

              <Link
                href="/blog"
                className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Blog
              </Link>
              <span className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground/40 cursor-not-allowed">
                Marketplace
                <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold bg-muted text-muted-foreground">
                  SOON
                </span>
              </span>

              <div className="my-2 border-t border-border" />

              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>

              <Link
                href="/tools"
                className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
