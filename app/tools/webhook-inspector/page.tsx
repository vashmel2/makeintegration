import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { InspectorPanel } from "@/components/tools/WebhookInspector/InspectorPanel"

export const metadata: Metadata = {
  title: "Webhook Inspector",
  description:
    "Generate a unique URL and capture real-time webhook payloads from Make.com with full header and body inspection.",
}

export default function WebhookInspectorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/tools" className="hover:text-foreground transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Webhook Inspector</span>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Webhook Inspector</h1>
        <p className="mt-1 text-muted-foreground">
          Send any webhook from Make.com to the URL below and inspect payloads
          in real-time.
        </p>
      </div>

      {/* Main inspector */}
      <InspectorPanel />
    </div>
  )
}
