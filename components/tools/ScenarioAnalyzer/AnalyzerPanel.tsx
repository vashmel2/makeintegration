"use client"

import { useState, useCallback, useRef } from "react"
import { Activity, ChevronDown, ChevronUp, AlertCircle, Upload } from "lucide-react"
import { analyzeScenario } from "./analyzer"
import { AnalysisView } from "./AnalysisView"
import { EXAMPLE_BLUEPRINT } from "@/components/tools/ScenarioDocumenter/parser"
import type { AnalysisResult } from "./types"

type PanelState = "idle" | "done" | "error"

export function AnalyzerPanel() {
  const [state, setState] = useState<PanelState>("idle")
  const [raw, setRaw] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [tipOpen, setTipOpen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const analyze = useCallback((input: string) => {
    const text = input.trim()
    if (!text) {
      setError("Paste your blueprint JSON first.")
      setState("error")
      return
    }
    try {
      const parsed = JSON.parse(text)
      const analysis = analyzeScenario(parsed)
      setResult(analysis)
      setError(null)
      setState("done")
    } catch {
      setError(
        "Could not parse this JSON. Make sure you exported the blueprint from Make.com and pasted the full file contents."
      )
      setState("error")
    }
  }, [])

  const loadFile = useCallback((file: File) => {
    if (!file.name.endsWith(".json") && file.type !== "application/json") {
      setError("Please drop a .json file exported from Make.com.")
      setState("error")
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      setRaw(text)
      analyze(text)
    }
    reader.readAsText(file, "utf-8")
  }, [analyze])

  const handleAnalyze = () => analyze(raw)

  const handleLoadExample = () => {
    setRaw(EXAMPLE_BLUEPRINT)
    analyze(EXAMPLE_BLUEPRINT)
  }

  const handleReset = () => {
    setState("idle")
    setRaw("")
    setResult(null)
    setError(null)
  }

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true) }
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setDragging(false) }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) loadFile(file)
  }
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) loadFile(file)
    e.target.value = ""
  }

  if (state === "done" && result) {
    return <AnalysisView result={result} onReset={handleReset} />
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">

      {/* Export tip */}
      <div className="rounded-xl border border-border bg-card/40 overflow-hidden">
        <button
          onClick={() => setTipOpen((o) => !o)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>How to export your blueprint from Make.com</span>
          {tipOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {tipOpen && (
          <div className="border-t border-border px-4 pb-4 pt-3">
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Open your scenario in Make.com</li>
              <li>Click the <strong className="text-foreground">three dots (...)</strong> menu in the bottom toolbar</li>
              <li>Select <strong className="text-foreground">Export Blueprint</strong></li>
              <li>Drop the downloaded <code className="text-foreground">.json</code> file below, or open it and paste the contents</li>
            </ol>
          </div>
        )}
      </div>

      {/* Drop zone + textarea */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-foreground">Blueprint JSON</label>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Upload className="h-3 w-3" />
            Browse file
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative rounded-xl border-2 transition-colors ${
            dragging ? "border-primary bg-primary/5" : "border-border border-dashed"
          }`}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-background/80 backdrop-blur-sm">
              <Upload className="h-8 w-8 text-primary" />
              <p className="text-sm font-medium text-primary">Drop your blueprint file here</p>
            </div>
          )}
          <textarea
            value={raw}
            onChange={(e) => {
              setRaw(e.target.value)
              if (state === "error") { setError(null); setState("idle") }
            }}
            placeholder={`Drop your .blueprint.json file above, or paste the JSON here.\n\n{\n  "name": "My Scenario",\n  "flow": [...],\n  "metadata": {...}\n}`}
            rows={14}
            spellCheck={false}
            className="w-full rounded-xl bg-muted/20 px-4 py-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none border-0"
          />
        </div>

        {state === "error" && error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAnalyze}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          disabled={!raw.trim()}
        >
          <Activity className="h-4 w-4" />
          Analyze Scenario
        </button>
        <button
          onClick={handleLoadExample}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
        >
          Load Example
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Everything runs in your browser. Your blueprint data never leaves your device.
      </p>
    </div>
  )
}
