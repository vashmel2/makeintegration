"use client"

import { Copy, Download, RotateCcw, Zap, Clock, Globe } from "lucide-react"
import type { ParsedScenario, ParsedModule, ParsedRoute } from "./types"

interface DocumentViewProps {
  scenario: ParsedScenario
  onReset: () => void
  onCopyMarkdown: () => void
  onDownload: () => void
  copied: boolean
}

// ---------------------------------------------------------------------------
// Module type badge
// ---------------------------------------------------------------------------

function TypeBadge({ type }: { type: ParsedModule["moduleType"] }) {
  const styles: Record<string, string> = {
    trigger: "bg-green-500/10 text-green-400 border-green-500/20",
    action: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    router: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    iterator: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    aggregator: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "error-handler": "bg-red-500/10 text-red-400 border-red-500/20",
    unknown: "bg-muted/50 text-muted-foreground border-border",
  }
  const labels: Record<string, string> = {
    trigger: "Trigger",
    action: "Action",
    router: "Router",
    iterator: "Iterator",
    aggregator: "Aggregator",
    "error-handler": "Error Handler",
    unknown: "Module",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles[type] ?? styles.unknown}`}
    >
      {labels[type] ?? "Module"}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Single module row
// ---------------------------------------------------------------------------

function ModuleRow({
  module,
  index,
  showIndex = true,
}: {
  module: ParsedModule
  index: number
  showIndex?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      {showIndex && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted/50 text-[11px] font-bold text-muted-foreground mt-0.5">
          {index}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-foreground text-sm">{module.actionName}</span>
          <TypeBadge type={module.moduleType} />
        </div>
        {module.appSlug !== "builtin" && (
          <p className="text-xs text-muted-foreground mt-0.5">{module.appName}</p>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Route branch
// ---------------------------------------------------------------------------

function RouteBranch({ route, startIndex }: { route: ParsedRoute; startIndex: number }) {
  let counter = startIndex
  return (
    <div className="mt-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Branch {route.index}
      </p>
      <div className="border-l-2 border-border pl-4 space-y-3">
        {route.modules.map((m) => {
          const idx = counter++
          return (
            <div key={m.id}>
              <ModuleRow module={m} index={idx} />
              {m.routes && (
                <div className="mt-3 ml-6 space-y-3">
                  {m.routes.map((r) => (
                    <RouteBranch key={r.index} route={r} startIndex={counter} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Recursive module flow renderer
// ---------------------------------------------------------------------------

function FlowList({ modules }: { modules: ParsedModule[] }) {
  let globalIndex = 1
  return (
    <div className="space-y-4">
      {modules.map((m) => {
        const idx = globalIndex++
        return (
          <div key={m.id}>
            <ModuleRow module={m} index={idx} />
            {m.routes && (
              <div className="mt-3 ml-9 space-y-4 rounded-xl border border-border bg-muted/10 p-4">
                {m.routes.map((route) => {
                  const branchStart = globalIndex
                  globalIndex += countModulesFlat(route.modules)
                  return (
                    <RouteBranch key={route.index} route={route} startIndex={branchStart} />
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function countModulesFlat(modules: ParsedModule[]): number {
  let n = 0
  for (const m of modules) {
    n++
    if (m.routes) for (const r of m.routes) n += countModulesFlat(r.modules)
  }
  return n
}

// ---------------------------------------------------------------------------
// Main DocumentView
// ---------------------------------------------------------------------------

export function DocumentView({
  scenario,
  onReset,
  onCopyMarkdown,
  onDownload,
  copied,
}: DocumentViewProps) {
  const zoneDisplay = scenario.zone
    ? scenario.zone.replace(".make.com", "").toUpperCase()
    : null

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/50 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground truncate max-w-xs">{scenario.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
          >
            <RotateCcw className="h-3 w-3" />
            Start Over
          </button>
          <button
            onClick={onCopyMarkdown}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
          >
            <Copy className="h-3 w-3" />
            {copied ? "Copied!" : "Copy Markdown"}
          </button>
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-3 w-3" />
            Download .md
          </button>
        </div>
      </div>

      {/* Document body */}
      <div className="rounded-2xl border border-border bg-card/30 p-6 sm:p-8 space-y-8">

        {/* Scenario header */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground leading-tight">{scenario.name}</h2>
          <div className="flex flex-wrap items-center gap-2">
            {scenario.isInstant ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-2.5 py-1 text-xs font-semibold text-green-400">
                <Zap className="h-3 w-3" />
                Instant
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-semibold text-blue-400">
                <Clock className="h-3 w-3" />
                Scheduled
              </span>
            )}
            {zoneDisplay && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
                <Globe className="h-3 w-3" />
                {zoneDisplay}
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total Modules", value: scenario.totalModules },
            { label: "Apps Used", value: scenario.appsSummary.length },
            { label: "Max Errors", value: scenario.settings.maxErrors },
            { label: "Sequential", value: scenario.settings.sequential ? "Yes" : "No" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-border bg-muted/20 px-4 py-3">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-xl font-bold text-foreground mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-border" />

        {/* Apps used */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Apps Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {scenario.appsSummary.length > 0 ? (
              scenario.appsSummary.map(({ appName, count }) => (
                <span
                  key={appName}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-sm font-medium text-foreground"
                >
                  {appName}
                  {count > 1 && (
                    <span className="text-xs text-muted-foreground">×{count}</span>
                  )}
                </span>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No external apps detected</span>
            )}
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Module flow */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Module Flow
          </h3>
          {scenario.modules.length > 0 ? (
            <FlowList modules={scenario.modules} />
          ) : (
            <p className="text-sm text-muted-foreground">No modules found in this scenario.</p>
          )}
        </div>

        <div className="border-t border-border" />

        {/* Settings */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Settings
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { label: "Max Errors", value: scenario.settings.maxErrors },
              { label: "Sequential Execution", value: scenario.settings.sequential ? "Yes" : "No" },
              { label: "Auto-commit", value: scenario.settings.autoCommit ? "Yes" : "No" },
              { label: "Data Loss Protection", value: scenario.settings.dataLoss ? "Enabled" : "Disabled" },
              { label: "Confidential", value: scenario.settings.confidential ? "Yes" : "No" },
              { label: "Roundtrips", value: scenario.settings.roundtrips },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/10 px-3 py-2">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer attribution */}
        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            Generated by{" "}
            <span className="text-primary font-medium">MakeIntegration.com</span>
            {" "}Scenario Documenter. Your data never leaves your browser.
          </p>
        </div>

      </div>
    </div>
  )
}
