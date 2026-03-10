"use client"

import { useState } from "react"
import { Copy, Check, Download, MousePointerClick } from "lucide-react"
import { cn } from "@/lib/utils"
import { PayloadViewer } from "./PayloadViewer"
import type { WebhookRequest } from "./types"

type Tab = "body" | "headers" | "query" | "raw"

interface RequestDetailProps {
  request: WebhookRequest | null
}

export function RequestDetail({ request }: RequestDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>("body")
  const [copied, setCopied] = useState(false)

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center">
        <MousePointerClick className="mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">
          Select a request to inspect
        </p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Click on a request in the list to view its details
        </p>
      </div>
    )
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "body", label: "Body" },
    { key: "headers", label: "Headers" },
    { key: "query", label: "Query" },
    { key: "raw", label: "Raw" },
  ]

  const getTabContent = () => {
    switch (activeTab) {
      case "body":
        return request.body ? (
          <PayloadViewer data={request.body} />
        ) : (
          <p className="p-4 text-sm text-muted-foreground italic">
            No body content
          </p>
        )
      case "headers":
        return <PayloadViewer data={request.headers} />
      case "query":
        return Object.keys(request.query_params || {}).length > 0 ? (
          <PayloadViewer data={request.query_params} />
        ) : (
          <p className="p-4 text-sm text-muted-foreground italic">
            No query parameters
          </p>
        )
      case "raw":
        return (
          <pre className="overflow-auto whitespace-pre-wrap break-words p-4 text-sm font-mono text-muted-foreground">
            {request.raw_body || "(empty)"}
          </pre>
        )
    }
  }

  const handleCopy = async () => {
    const content =
      activeTab === "raw"
        ? request.raw_body || ""
        : JSON.stringify(
            activeTab === "body"
              ? request.body
              : activeTab === "headers"
                ? request.headers
                : request.query_params,
            null,
            2
          )
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const content = JSON.stringify(
      {
        method: request.method,
        headers: request.headers,
        body: request.body,
        query_params: request.query_params,
        received_at: request.received_at,
      },
      null,
      2
    )
    const blob = new Blob([content], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `webhook-${request.id.slice(0, 8)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
            {request.method}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(request.received_at).toLocaleString()}
          </span>
          {request.ip_address && (
            <span className="text-xs text-muted-foreground/60">
              from {request.ip_address}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-muted"
            title="Copy content"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-muted"
            title="Download JSON"
          >
            <Download className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto max-h-[600px]">{getTabContent()}</div>
    </div>
  )
}
