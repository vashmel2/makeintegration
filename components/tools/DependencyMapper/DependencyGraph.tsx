"use client"

import "@xyflow/react/dist/style.css"

import { useCallback, useMemo } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react"
import { RotateCcw, ExternalLink } from "lucide-react"
import type { GraphData, ScenarioEntry } from "./types"
import { computeLayout } from "./mapper"

// ---------------------------------------------------------------------------
// Custom scenario node
// ---------------------------------------------------------------------------

function ScenarioNode({ data }: NodeProps) {
  const entry = data as unknown as ScenarioEntry & { isExternal?: boolean }

  if (entry.isExternal) {
    return (
      <div
        style={{ minWidth: 180 }}
        className="rounded-xl border border-dashed border-border bg-background px-4 py-3 text-center"
      >
        <Handle type="target" position={Position.Left} style={{ background: "rgba(255,107,53,0.5)" }} />
        <ExternalLink className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
        <p className="text-xs font-medium text-muted-foreground">External / Unknown</p>
        <p className="text-[10px] text-muted-foreground/60 mt-0.5">Make webhook (not loaded)</p>
      </div>
    )
  }

  return (
    <div
      style={{ minWidth: 220 }}
      className="rounded-xl border border-border bg-card shadow-lg shadow-black/20 px-4 py-3"
    >
      <Handle type="target" position={Position.Left} style={{ background: "#FF6B35" }} />
      <Handle type="source" position={Position.Right} style={{ background: "#FF6B35" }} />

      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="font-semibold text-sm text-foreground leading-snug">{entry.name}</p>
        {entry.hasWebhookTrigger && (
          <span className="shrink-0 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
            Webhook
          </span>
        )}
      </div>

      <div className="flex gap-3 text-[11px] text-muted-foreground">
        <span>{entry.moduleCount} modules</span>
        {entry.apps.length > 0 && <span>{entry.apps.length} apps</span>}
      </div>

      {entry.apps.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {entry.apps.slice(0, 4).map((app) => (
            <span
              key={app}
              className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground capitalize"
            >
              {app}
            </span>
          ))}
          {entry.apps.length > 4 && (
            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
              +{entry.apps.length - 4}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

const nodeTypes = { scenarioNode: ScenarioNode }

// ---------------------------------------------------------------------------
// React Flow graph
// ---------------------------------------------------------------------------

interface DependencyGraphProps {
  graphData: GraphData
  onReset: () => void
}

export function DependencyGraph({ graphData, onReset }: DependencyGraphProps) {
  const { entries, edges: resolvedEdges, externalCalls } = graphData

  const hasExternalCalls = externalCalls.length > 0
  const EXTERNAL_ID = "__external__"

  const positions = useMemo(() => {
    const ids = [...entries.map((e) => e.id), ...(hasExternalCalls ? [EXTERNAL_ID] : [])]
    return computeLayout(ids, resolvedEdges)
  }, [entries, resolvedEdges, hasExternalCalls])

  const nodes = useMemo(() => {
    const scenarioNodes = entries.map((entry) => ({
      id: entry.id,
      type: "scenarioNode",
      position: positions[entry.id] ?? { x: 0, y: 0 },
      data: entry as unknown as Record<string, unknown>,
    }))

    if (hasExternalCalls) {
      scenarioNodes.push({
        id: EXTERNAL_ID,
        type: "scenarioNode",
        position: positions[EXTERNAL_ID] ?? { x: 600, y: 0 },
        data: { isExternal: true } as unknown as Record<string, unknown>,
      })
    }

    return scenarioNodes
  }, [entries, positions, hasExternalCalls])

  const edges = useMemo(() => {
    const known = resolvedEdges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      type: "smoothstep",
      animated: true,
      style: { stroke: "#FF6B35", strokeWidth: 2 },
    }))

    const external = hasExternalCalls
      ? [...new Set(externalCalls.map((c) => c.fromId))].map((fromId) => ({
          id: `${fromId}->${EXTERNAL_ID}`,
          source: fromId,
          target: EXTERNAL_ID,
          type: "smoothstep",
          animated: false,
          style: { stroke: "rgba(255,255,255,0.2)", strokeWidth: 1.5, strokeDasharray: "5 4" },
        }))
      : []

    return [...known, ...external]
  }, [resolvedEdges, externalCalls, hasExternalCalls])

  const connectedCount = resolvedEdges.length
  const isolatedCount = entries.filter(
    (e) => !resolvedEdges.some((r) => r.source === e.id || r.target === e.id)
  ).length

  const onInit = useCallback((instance: { fitView: () => void }) => {
    setTimeout(() => instance.fitView(), 50)
  }, [])

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold">Dependency Map</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {entries.length} scenarios · {connectedCount} connection{connectedCount !== 1 ? "s" : ""}
            {isolatedCount > 0 && ` · ${isolatedCount} isolated`}
            {hasExternalCalls && ` · ${externalCalls.length} unresolved Make call${externalCalls.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
        >
          <RotateCcw className="h-3 w-3" />
          Edit scenarios
        </button>
      </div>

      {/* Graph */}
      <div
        className="rounded-xl border border-border overflow-hidden"
        style={{ height: 520 }}
      >
        <style>{`
          .react-flow__background { background: oklch(0.13 0.015 260); }
          .react-flow__controls button { background: oklch(0.17 0.02 260); border-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); }
          .react-flow__controls button:hover { background: oklch(0.22 0.02 260); }
          .react-flow__minimap { background: oklch(0.17 0.02 260); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; }
        `}</style>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          colorMode="dark"
          fitView
          onInit={onInit}
          proOptions={{ hideAttribution: true }}
          minZoom={0.3}
          maxZoom={2}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(255,255,255,0.06)" />
          <Controls />
          <MiniMap
            nodeColor={() => "#FF6B35"}
            maskColor="rgba(15,17,23,0.8)"
          />
        </ReactFlow>
      </div>

      {/* Unresolved calls callout */}
      {hasExternalCalls && (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3">
          <p className="text-sm font-medium text-yellow-400 mb-1">
            {externalCalls.length} unresolved Make webhook call{externalCalls.length !== 1 ? "s" : ""}
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            These scenarios call Make webhook URLs that were not loaded. Add those blueprints to see the full map.
          </p>
          <ul className="space-y-1">
            {externalCalls.map((c, i) => (
              <li key={i} className="text-xs text-muted-foreground font-mono truncate">
                {c.fromName} → {c.url}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Drag nodes to rearrange. Everything runs in your browser — your blueprints never leave your device.
      </p>
    </div>
  )
}
