"use client"

import { cn } from "@/lib/utils"
import { Inbox } from "lucide-react"
import type { WebhookRequest } from "./types"

const methodColors: Record<string, string> = {
  GET: "text-blue-400",
  POST: "text-green-400",
  PUT: "text-yellow-400",
  PATCH: "text-orange-400",
  DELETE: "text-red-400",
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

interface RequestListProps {
  requests: WebhookRequest[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function RequestList({ requests, selectedId, onSelect }: RequestListProps) {
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center">
        <Inbox className="mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">
          No requests yet
        </p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Send a webhook to the URL above to see it appear here
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1 overflow-y-auto rounded-xl border border-border bg-card p-2">
      {requests.map((req) => (
        <button
          key={req.id}
          onClick={() => onSelect(req.id)}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
            selectedId === req.id
              ? "bg-primary/10 border border-primary/20"
              : "hover:bg-muted border border-transparent"
          )}
        >
          <span
            className={cn(
              "shrink-0 font-mono text-xs font-bold",
              methodColors[req.method] || "text-muted-foreground"
            )}
          >
            {req.method}
          </span>
          <span className="flex-1 truncate text-xs text-muted-foreground font-mono">
            {req.query_params && Object.keys(req.query_params).length > 0
              ? `?${new URLSearchParams(req.query_params).toString()}`
              : "/"}
          </span>
          <span className="shrink-0 text-[11px] text-muted-foreground/60 tabular-nums">
            {formatTime(req.received_at)}
          </span>
        </button>
      ))}
    </div>
  )
}
