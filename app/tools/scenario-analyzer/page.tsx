import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { AnalyzerPanel } from "@/components/tools/ScenarioAnalyzer/AnalyzerPanel"

export const metadata: Metadata = {
  title: "Scenario Analyzer",
  description:
    "Get a health score and actionable recommendations for your Make.com scenario. Checks for missing error handlers, empty branches, operation costs, and more. Runs in your browser.",
}

export default function ScenarioAnalyzerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Scenario Analyzer</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Scenario Analyzer</h1>
        <p className="mt-1 text-muted-foreground">
          Export your Make.com blueprint and paste it below to get a health score,
          catch common issues, and see how many operations your scenario uses per run.
        </p>
      </div>

      <AnalyzerPanel />
    </div>
  )
}
