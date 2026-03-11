"use client"

import { useState, useCallback, useRef } from "react"
import { Plus, X, Upload, AlertCircle, Network, ChevronDown, ChevronUp } from "lucide-react"
import { parseBlueprint, buildGraphData } from "./mapper"
import { DependencyGraph } from "./DependencyGraph"
import type { ScenarioEntry, GraphData } from "./types"

// ---------------------------------------------------------------------------
// Empty slot factory
// ---------------------------------------------------------------------------

function makeEntry(id: string): ScenarioEntry {
  return {
    id,
    name: "",
    webhookUrl: "",
    hasWebhookTrigger: false,
    outboundUrls: [],
    moduleCount: 0,
    apps: [],
    parsed: null,
    filename: null,
    error: null,
  }
}

// ---------------------------------------------------------------------------
// Single scenario slot
// ---------------------------------------------------------------------------

interface SlotProps {
  entry: ScenarioEntry
  canRemove: boolean
  onChange: (updated: ScenarioEntry) => void
  onRemove: () => void
}

function ScenarioSlot({ entry, canRemove, onChange, onRemove }: SlotProps) {
  const [expanded, setExpanded] = useState(!entry.parsed)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const loadText = useCallback(
    (text: string, filename: string | null) => {
      if (!text.trim()) return
      try {
        const raw = JSON.parse(text)
        const parsed = parseBlueprint(raw)
        onChange({ ...entry, ...parsed, parsed: raw, filename, error: null })
        setExpanded(false)
      } catch {
        onChange({ ...entry, parsed: null, error: "Invalid JSON — make sure you exported the full blueprint from Make.com.", filename })
      }
    },
    [entry, onChange]
  )

  const loadFile = (file: File) => {
    if (!file.name.endsWith(".json") && file.type !== "application/json") {
      onChange({ ...entry, error: "Please drop a .json file.", filename: null })
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => loadText(e.target?.result as string, file.name)
    reader.readAsText(file, "utf-8")
  }

  const isLoaded = entry.parsed !== null

  return (
    <div className={`rounded-xl border transition-colors overflow-hidden ${isLoaded ? "border-border bg-card" : "border-dashed border-border"}`}>
      {/* Slot header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          {isLoaded ? (
            <>
              <span className="h-2 w-2 shrink-0 rounded-full bg-green-400" />
              <div className="min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{entry.name}</p>
                <p className="text-xs text-muted-foreground">
                  {entry.moduleCount} modules · {entry.apps.length} apps
                  {entry.hasWebhookTrigger && " · Webhook trigger"}
                </p>
              </div>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">
              {entry.error ? "Error — fix or replace" : "No blueprint loaded"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-2">
          {isLoaded && (
            <button
              onClick={() => setExpanded((o) => !o)}
              className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          )}
          {canRemove && (
            <button
              onClick={onRemove}
              className="rounded p-1 text-muted-foreground hover:text-red-400 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Expanded body — file input + webhook URL */}
      {(!isLoaded || expanded) && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={(e) => { e.preventDefault(); setDragging(false) }}
            onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) loadFile(f) }}
            className={`relative rounded-lg border-2 transition-colors ${dragging ? "border-primary bg-primary/5" : "border-dashed border-border"}`}
          >
            <textarea
              rows={5}
              spellCheck={false}
              defaultValue=""
              onChange={(e) => { if (e.target.value.trim()) loadText(e.target.value, null) }}
              placeholder="Drop .json file here or paste blueprint JSON…"
              className="w-full bg-transparent px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none resize-none border-0"
            />
          </div>

          {/* Browse button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Upload className="h-3 w-3" />
              Browse file
            </button>
            {entry.filename && (
              <span className="text-xs text-muted-foreground truncate max-w-[200px]">{entry.filename}</span>
            )}
          </div>
          <input ref={fileRef} type="file" accept=".json,application/json" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); e.target.value = "" }} />

          {/* Error */}
          {entry.error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
              <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
              {entry.error}
            </div>
          )}
        </div>
      )}

      {/* Webhook URL — always visible when loaded and has webhook trigger */}
      {isLoaded && entry.hasWebhookTrigger && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-1.5">
          <label className="text-xs font-medium text-foreground">
            Webhook URL for this scenario
            <span className="ml-1 font-normal text-muted-foreground">(optional — enables connection matching)</span>
          </label>
          <input
            type="url"
            value={entry.webhookUrl}
            onChange={(e) => onChange({ ...entry, webhookUrl: e.target.value })}
            placeholder="https://hook.eu1.make.com/abc123…"
            className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-[11px] text-muted-foreground">
            Found in Make.com: open the webhook module, click &quot;Copy address to clipboard&quot;
          </p>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main panel
// ---------------------------------------------------------------------------

export function MapperPanel() {
  const nextId = useRef(3)
  const [entries, setEntries] = useState<ScenarioEntry[]>([makeEntry("1"), makeEntry("2")])
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [tipOpen, setTipOpen] = useState(false)

  const updateEntry = (id: string, updated: ScenarioEntry) =>
    setEntries((prev) => prev.map((e) => (e.id === id ? updated : e)))

  const removeEntry = (id: string) =>
    setEntries((prev) => prev.filter((e) => e.id !== id))

  const addEntry = () => {
    const id = String(nextId.current++)
    setEntries((prev) => [...prev, makeEntry(id)])
  }

  const loadedCount = entries.filter((e) => e.parsed !== null).length
  const canBuild = loadedCount >= 2

  const handleBuild = () => {
    const loaded = entries.filter((e) => e.parsed !== null)
    setGraphData(buildGraphData(loaded))
  }

  const handleReset = () => setGraphData(null)

  if (graphData) {
    return <DependencyGraph graphData={graphData} onReset={handleReset} />
  }

  return (
    <div className="space-y-5">
      {/* Export tip */}
      <div className="rounded-xl border border-border bg-card/40 overflow-hidden">
        <button
          onClick={() => setTipOpen((o) => !o)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>How to export blueprints from Make.com</span>
          {tipOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {tipOpen && (
          <div className="border-t border-border px-4 pb-4 pt-3">
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Open each scenario in Make.com</li>
              <li>Click the <strong className="text-foreground">three dots (...)</strong> menu in the bottom toolbar</li>
              <li>Select <strong className="text-foreground">Export Blueprint</strong> and save the .json file</li>
              <li>Load each blueprint below — add as many as you need</li>
              <li>For webhook-triggered scenarios, paste the webhook URL to enable connection matching</li>
            </ol>
          </div>
        )}
      </div>

      {/* Scenario slots */}
      <div className="space-y-3">
        {entries.map((entry) => (
          <ScenarioSlot
            key={entry.id}
            entry={entry}
            canRemove={entries.length > 2}
            onChange={(updated) => updateEntry(entry.id, updated)}
            onRemove={() => removeEntry(entry.id)}
          />
        ))}
      </div>

      {/* Add scenario */}
      <button
        onClick={addEntry}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-sm text-muted-foreground transition-colors hover:text-foreground hover:border-primary/30"
      >
        <Plus className="h-4 w-4" />
        Add scenario
      </button>

      {/* Build map */}
      <button
        onClick={handleBuild}
        disabled={!canBuild}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Network className="h-4 w-4" />
        Build Dependency Map
        {loadedCount > 0 && <span className="opacity-70">({loadedCount} loaded)</span>}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Everything runs in your browser. Your blueprint data never leaves your device.
      </p>
    </div>
  )
}
