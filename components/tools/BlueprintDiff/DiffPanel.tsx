"use client"

import { useState, useCallback, useRef } from "react"
import { ArrowLeftRight, Upload, AlertCircle, X, ChevronDown, ChevronUp } from "lucide-react"
import { diffBlueprints } from "./differ"
import { DiffView } from "./DiffView"
import type { BlueprintDiff } from "./types"

// ---------------------------------------------------------------------------
// Single blueprint input slot
// ---------------------------------------------------------------------------

interface SlotState {
  raw: string
  filename: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parsed: any | null
  error: string | null
}

const EMPTY_SLOT: SlotState = { raw: "", filename: null, parsed: null, error: null }

function tryParse(text: string): { parsed: unknown; error: null } | { parsed: null; error: string } {
  try {
    return { parsed: JSON.parse(text), error: null }
  } catch {
    return {
      parsed: null,
      error: "Invalid JSON. Make sure you pasted the full blueprint file.",
    }
  }
}

interface InputSlotProps {
  label: string
  slot: SlotState
  onChange: (slot: SlotState) => void
}

function InputSlot({ label, slot, onChange }: InputSlotProps) {
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const loadText = useCallback(
    (text: string, filename: string | null) => {
      if (!text.trim()) {
        onChange({ raw: "", filename: null, parsed: null, error: null })
        return
      }
      const { parsed, error } = tryParse(text)
      onChange({ raw: text, filename, parsed, error })
    },
    [onChange]
  )

  const loadFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith(".json") && file.type !== "application/json") {
        onChange({ ...slot, error: "Please drop a .json file exported from Make.com." })
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => loadText(e.target?.result as string, file.name)
      reader.readAsText(file, "utf-8")
    },
    [slot, loadText]
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) loadFile(file)
  }

  const isValid = slot.parsed !== null

  return (
    <div className="flex flex-col gap-2">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        <div className="flex items-center gap-2">
          {isValid && (
            <span className="rounded-md bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
              Valid JSON
            </span>
          )}
          <button
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Upload className="h-3 w-3" />
            Browse
          </button>
          {slot.raw && (
            <button
              onClick={() => onChange(EMPTY_SLOT)}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) loadFile(file)
            e.target.value = ""
          }}
        />
      </div>

      {/* Drop zone + textarea */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={(e) => { e.preventDefault(); setDragging(false) }}
        onDrop={handleDrop}
        className={`relative rounded-xl border-2 transition-colors ${
          dragging
            ? "border-primary bg-primary/5"
            : isValid
            ? "border-green-500/30"
            : slot.error
            ? "border-red-500/30"
            : "border-dashed border-border"
        }`}
      >
        {dragging && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-background/80 backdrop-blur-sm">
            <Upload className="h-6 w-6 text-primary" />
            <p className="text-sm font-medium text-primary">Drop blueprint here</p>
          </div>
        )}
        <textarea
          value={slot.raw}
          onChange={(e) => loadText(e.target.value, null)}
          placeholder={`Paste ${label.toLowerCase()} blueprint JSON here…\nor drop the .json file above.`}
          rows={12}
          spellCheck={false}
          className="w-full rounded-xl bg-muted/20 px-4 py-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none border-0"
        />
      </div>

      {/* Filename badge */}
      {slot.filename && (
        <p className="text-xs text-muted-foreground">
          Loaded: <span className="text-foreground">{slot.filename}</span>
        </p>
      )}

      {/* Error */}
      {slot.error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {slot.error}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main panel
// ---------------------------------------------------------------------------

export function DiffPanel() {
  const [before, setBefore] = useState<SlotState>(EMPTY_SLOT)
  const [after, setAfter] = useState<SlotState>(EMPTY_SLOT)
  const [diff, setDiff] = useState<BlueprintDiff | null>(null)
  const [diffError, setDiffError] = useState<string | null>(null)
  const [tipOpen, setTipOpen] = useState(false)

  const canCompare = before.parsed !== null && after.parsed !== null

  const handleCompare = () => {
    if (!canCompare) return
    try {
      const result = diffBlueprints(before.parsed, after.parsed)
      setDiff(result)
      setDiffError(null)
    } catch {
      setDiffError("Something went wrong while diffing the blueprints. Make sure both files are valid Make.com exports.")
    }
  }

  const handleReset = () => {
    setBefore(EMPTY_SLOT)
    setAfter(EMPTY_SLOT)
    setDiff(null)
    setDiffError(null)
  }

  if (diff) {
    return <DiffView diff={diff} onReset={handleReset} />
  }

  return (
    <div className="space-y-6">
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
              <li>Open your scenario in Make.com</li>
              <li>Click the <strong className="text-foreground">three dots (...)</strong> menu in the bottom toolbar</li>
              <li>Select <strong className="text-foreground">Export Blueprint</strong></li>
              <li>Save that file, then update your scenario and export again</li>
              <li>Paste or drop the two .json files into the slots below</li>
            </ol>
          </div>
        )}
      </div>

      {/* Two input slots side by side on desktop */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <InputSlot label="Before" slot={before} onChange={setBefore} />
        <InputSlot label="After" slot={after} onChange={setAfter} />
      </div>

      {/* Compare button */}
      {diffError && (
        <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {diffError}
        </div>
      )}

      <button
        onClick={handleCompare}
        disabled={!canCompare}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ArrowLeftRight className="h-4 w-4" />
        Compare Blueprints
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Everything runs in your browser. Your blueprint data never leaves your device.
      </p>
    </div>
  )
}
