import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { DocumenterPanel } from "@/components/tools/ScenarioDocumenter/DocumenterPanel"

export const metadata: Metadata = {
  title: "Scenario Documenter",
  description:
    "Paste your Make.com blueprint JSON and get clean, shareable documentation instantly. Runs entirely in your browser.",
}

export default function ScenarioDocumenterPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Scenario Documenter</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Scenario Documenter</h1>
        <p className="mt-1 text-muted-foreground">
          Export your Make.com blueprint and paste it below to generate clean, readable
          documentation you can share with your team.
        </p>
      </div>

      <DocumenterPanel />
    </div>
  )
}
