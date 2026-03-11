import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { DiffPanel } from "@/components/tools/BlueprintDiff/DiffPanel"

export const metadata: Metadata = {
  title: "Blueprint Diff Tool for Make.com | MakeIntegration",
  description:
    "Compare two Make.com blueprint JSON files and see exactly what changed — added modules, removed modules, and modified filters or field mappings. Free, browser-based.",
  openGraph: {
    title: "Blueprint Diff Tool for Make.com | MakeIntegration",
    description:
      "See exactly what changed between two Make.com scenario versions. Added modules, removed steps, modified filters and mappings — all in one human-readable view.",
    url: "https://makeintegration.com/tools/blueprint-diff",
    type: "website",
  },
}

export default function BlueprintDiffPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Blueprint Diff</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold sm:text-4xl">Blueprint Diff</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Upload your before and after blueprints and see a human-readable breakdown of every
          change — added modules, removed steps, and modified field mappings.
        </p>
      </div>

      <DiffPanel />
    </div>
  )
}
