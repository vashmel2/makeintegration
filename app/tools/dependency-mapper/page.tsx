import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { MapperPanel } from "@/components/tools/DependencyMapper/MapperPanel"

export const metadata: Metadata = {
  title: "Dependency Mapper for Make.com | MakeIntegration",
  description:
    "Upload multiple Make.com blueprints and visualize how your scenarios call each other. See which scenarios break if you change one. Free, browser-based.",
  openGraph: {
    title: "Dependency Mapper for Make.com | MakeIntegration",
    description:
      "Visualize cross-scenario dependencies in Make.com. Upload your blueprints, add webhook URLs, and see which scenarios call which.",
    url: "https://makeintegration.com/tools/dependency-mapper",
    type: "website",
  },
}

export default function DependencyMapperPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Dependency Mapper</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold sm:text-4xl">Dependency Mapper</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Upload your Make.com blueprints and see how your scenarios connect. Find out which
          scenarios would break if you changed or deleted one.
        </p>
      </div>

      <MapperPanel />
    </div>
  )
}
