"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface PayloadViewerProps {
  data: unknown
}

export function PayloadViewer({ data }: PayloadViewerProps) {
  return (
    <div className="p-4 font-mono text-sm">
      <JsonNode value={data} depth={0} />
    </div>
  )
}

function JsonNode({ value, depth, keyName }: { value: unknown; depth: number; keyName?: string }) {
  const [expanded, setExpanded] = useState(depth < 3)

  if (value === null) {
    return (
      <div style={{ paddingLeft: depth * 16 }}>
        {keyName && <span className="text-primary">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-muted-foreground">: </span>}
        <span className="text-muted-foreground italic">null</span>
      </div>
    )
  }

  if (typeof value === "boolean") {
    return (
      <div style={{ paddingLeft: depth * 16 }}>
        {keyName && <span className="text-primary">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-muted-foreground">: </span>}
        <span className="text-yellow-500">{value.toString()}</span>
      </div>
    )
  }

  if (typeof value === "number") {
    return (
      <div style={{ paddingLeft: depth * 16 }}>
        {keyName && <span className="text-primary">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-muted-foreground">: </span>}
        <span className="text-cyan-400">{value}</span>
      </div>
    )
  }

  if (typeof value === "string") {
    return (
      <div style={{ paddingLeft: depth * 16 }}>
        {keyName && <span className="text-primary">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-muted-foreground">: </span>}
        <span className="text-green-400">&quot;{value}&quot;</span>
      </div>
    )
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <div style={{ paddingLeft: depth * 16 }}>
          {keyName && <span className="text-primary">&quot;{keyName}&quot;</span>}
          {keyName && <span className="text-muted-foreground">: </span>}
          <span className="text-muted-foreground">[]</span>
        </div>
      )
    }

    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn("flex items-center gap-0.5 hover:bg-muted/50 rounded px-1 -ml-1")}
          style={{ paddingLeft: depth * 16 }}
        >
          {expanded ? (
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          )}
          {keyName && <span className="text-primary">&quot;{keyName}&quot;</span>}
          {keyName && <span className="text-muted-foreground">: </span>}
          <span className="text-muted-foreground">
            [{!expanded && <span className="text-xs"> {value.length} items </span>}
          </span>
        </button>
        {expanded && (
          <>
            {value.map((item, index) => (
              <JsonNode key={index} value={item} depth={depth + 1} keyName={String(index)} />
            ))}
            <div style={{ paddingLeft: depth * 16 }}>
              <span className="text-muted-foreground">]</span>
            </div>
          </>
        )}
        {!expanded && (
          <span className="text-muted-foreground">]</span>
        )}
      </div>
    )
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)

    if (entries.length === 0) {
      return (
        <div style={{ paddingLeft: depth * 16 }}>
          {keyName && <span className="text-primary">&quot;{keyName}&quot;</span>}
          {keyName && <span className="text-muted-foreground">: </span>}
          <span className="text-muted-foreground">{"{}"}</span>
        </div>
      )
    }

    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn("flex items-center gap-0.5 hover:bg-muted/50 rounded px-1 -ml-1")}
          style={{ paddingLeft: depth * 16 }}
        >
          {expanded ? (
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          )}
          {keyName && <span className="text-primary">&quot;{keyName}&quot;</span>}
          {keyName && <span className="text-muted-foreground">: </span>}
          <span className="text-muted-foreground">
            {"{"}{!expanded && <span className="text-xs"> {entries.length} keys </span>}
          </span>
          {!expanded && <span className="text-muted-foreground">{"}"}</span>}
        </button>
        {expanded && (
          <>
            {entries.map(([key, val]) => (
              <JsonNode key={key} value={val} depth={depth + 1} keyName={key} />
            ))}
            <div style={{ paddingLeft: depth * 16 }}>
              <span className="text-muted-foreground">{"}"}</span>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div style={{ paddingLeft: depth * 16 }}>
      {keyName && <span className="text-primary">&quot;{keyName}&quot;</span>}
      {keyName && <span className="text-muted-foreground">: </span>}
      <span className="text-muted-foreground">{String(value)}</span>
    </div>
  )
}
