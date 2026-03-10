"use client"

import { useState } from "react"
import { RotateCcw, AlertCircle, AlertTriangle, Info, CheckCircle2, Zap, Clock, Shield, Layers, GitBranch, Box, Activity } from "lucide-react"
import type { AnalysisResult, Issue, IssueSeverity } from "./types"

// ---------------------------------------------------------------------------
// Health score ring
// ---------------------------------------------------------------------------

function HealthRing({ score }: { score: number }) {
  const radius = 52
  const stroke = 9
  const circumference = 2 * Math.PI * radius
  const filled = (score / 100) * circumference

  const color =
    score >= 80 ? "#22c55e"
    : score >= 60 ? "#eab308"
    : score >= 40 ? "#f97316"
    : "#ef4444"

  const label =
    score >= 80 ? "Healthy"
    : score >= 60 ? "Needs Work"
    : score >= 40 ? "At Risk"
    : "Critical"

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center">
        <svg width="128" height="128" className="-rotate-90" aria-hidden="true">
          <circle
            cx="64" cy="64" r={radius}
            fill="none" stroke="currentColor" strokeWidth={stroke}
            className="text-muted/20"
          />
          <circle
            cx="64" cy="64" r={radius}
            fill="none" stroke={color} strokeWidth={stroke}
            strokeDasharray={`${filled} ${circumference - filled}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-3xl font-bold leading-none" style={{ color }}>{score}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">/ 100</p>
        </div>
      </div>
      <span
        className="rounded-full px-3 py-1 text-xs font-semibold"
        style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
      >
        {label}
      </span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Issue card
// ---------------------------------------------------------------------------

const severityConfig: Record<IssueSeverity, {
  icon: React.ReactNode
  border: string
  bg: string
  label: string
  labelColor: string
}> = {
  error: {
    icon: <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />,
    border: "border-red-500/20",
    bg: "bg-red-500/5",
    label: "Error",
    labelColor: "text-red-400 bg-red-500/10",
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />,
    border: "border-yellow-500/20",
    bg: "bg-yellow-500/5",
    label: "Warning",
    labelColor: "text-yellow-400 bg-yellow-500/10",
  },
  info: {
    icon: <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />,
    border: "border-blue-500/20",
    bg: "bg-blue-500/5",
    label: "Info",
    labelColor: "text-blue-400 bg-blue-500/10",
  },
}

function IssueCard({ issue }: { issue: Issue }) {
  const cfg = severityConfig[issue.severity]
  return (
    <div className={`rounded-xl border ${cfg.border} ${cfg.bg} p-4 space-y-2`}>
      <div className="flex items-start gap-2">
        {cfg.icon}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{issue.title}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${cfg.labelColor}`}>
              {cfg.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{issue.description}</p>
          <p className="text-xs text-muted-foreground/80 border-l-2 border-border pl-3 italic">
            {issue.suggestion}
          </p>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Metrics grid
// ---------------------------------------------------------------------------

function MetricTile({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 px-4 py-3 space-y-0.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-bold text-foreground leading-tight">{value}</p>
      {sub && <p className="text-[11px] text-muted-foreground/60">{sub}</p>}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main AnalysisView
// ---------------------------------------------------------------------------

export function AnalysisView({
  result,
  onReset,
}: {
  result: AnalysisResult
  onReset: () => void
}) {
  const { scenarioName, healthScore, issues, metrics } = result
  const [iterItems, setIterItems] = useState(10)

  const errors = issues.filter((i) => i.severity === "error")
  const warnings = issues.filter((i) => i.severity === "warning")
  const infos = issues.filter((i) => i.severity === "info")
  const allClear = issues.length === 0

  // Projected ops = base ops (min, excluding loop modules) + loop modules × items
  const baseOpsMin = metrics.estimatedOpsMin - metrics.loopModuleCount
  const projectedOps = metrics.hasIterator
    ? baseOpsMin + metrics.loopModuleCount * iterItems
    : null

  return (
    <div className="space-y-6">

      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/50 px-4 py-3">
        <span className="font-medium text-foreground truncate max-w-xs text-sm">{scenarioName}</span>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
        >
          <RotateCcw className="h-3 w-3" />
          Analyze Another
        </button>
      </div>

      {/* Score + summary */}
      <div className="rounded-2xl border border-border bg-card/30 p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">

          <div className="shrink-0">
            <HealthRing score={healthScore} />
          </div>

          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div>
              <h2 className="text-lg font-bold text-foreground">Health Report</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {allClear
                  ? "No issues found. This scenario follows all the best practices we check for."
                  : `Found ${issues.length} issue${issues.length > 1 ? "s" : ""} — ${errors.length > 0 ? `${errors.length} error${errors.length > 1 ? "s" : ""}` : ""}${errors.length > 0 && warnings.length > 0 ? ", " : ""}${warnings.length > 0 ? `${warnings.length} warning${warnings.length > 1 ? "s" : ""}` : ""}${(errors.length > 0 || warnings.length > 0) && infos.length > 0 ? ", " : ""}${infos.length > 0 ? `${infos.length} suggestion${infos.length > 1 ? "s" : ""}` : ""}.`
                }
              </p>
            </div>

            {allClear && (
              <div className="inline-flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2 text-sm text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                All checks passed
              </div>
            )}

            {/* Issue count pills */}
            {!allClear && (
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {errors.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">
                    <AlertCircle className="h-3 w-3" />
                    {errors.length} Error{errors.length > 1 ? "s" : ""}
                  </span>
                )}
                {warnings.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400">
                    <AlertTriangle className="h-3 w-3" />
                    {warnings.length} Warning{warnings.length > 1 ? "s" : ""}
                  </span>
                )}
                {infos.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
                    <Info className="h-3 w-3" />
                    {infos.length} Suggestion{infos.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Metrics</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <MetricTile
            label="Total Modules"
            value={<span className="flex items-center gap-1.5"><Box className="h-4 w-4 text-muted-foreground" />{metrics.totalModules}</span>}
          />
          <MetricTile
            label="Routers"
            value={<span className="flex items-center gap-1.5"><GitBranch className="h-4 w-4 text-muted-foreground" />{metrics.routerCount}</span>}
            sub={metrics.totalBranches > 0 ? `${metrics.totalBranches} branches` : undefined}
          />
          <MetricTile
            label="Apps Used"
            value={<span className="flex items-center gap-1.5"><Layers className="h-4 w-4 text-muted-foreground" />{metrics.appsUsed}</span>}
          />
          <MetricTile
            label="Trigger"
            value={
              metrics.triggerType === "instant"
                ? <span className="flex items-center gap-1.5 text-green-400"><Zap className="h-4 w-4" />Instant</span>
                : metrics.triggerType === "scheduled"
                ? <span className="flex items-center gap-1.5 text-blue-400"><Clock className="h-4 w-4" />Scheduled</span>
                : <span className="text-muted-foreground text-base">None</span>
            }
          />
          <MetricTile
            label="Error Handling"
            value={
              metrics.hasErrorHandler
                ? <span className="flex items-center gap-1.5 text-green-400"><Shield className="h-4 w-4" />Yes</span>
                : <span className="flex items-center gap-1.5 text-red-400"><Shield className="h-4 w-4" />No</span>
            }
          />
          <MetricTile
            label="Ops / Run"
            value={
              <span className="flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-muted-foreground" />
                {metrics.estimatedOpsMin === metrics.estimatedOpsMax
                  ? metrics.estimatedOpsMin
                  : `${metrics.estimatedOpsMin}–${metrics.estimatedOpsMax}`}
              </span>
            }
            sub={
              metrics.hasIterator
                ? "excl. loop"
                : metrics.estimatedOpsMin !== metrics.estimatedOpsMax
                ? "best–worst case"
                : undefined
            }
          />
        </div>
      </div>

      {/* Iterator ops calculator */}
      {metrics.hasIterator && projectedOps !== null && (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 space-y-3">
          <div className="flex items-start gap-2 text-sm text-yellow-400">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="font-medium">Iterator detected — actual ops depend on array size</span>
          </div>
          <p className="text-sm text-muted-foreground pl-6">
            {metrics.loopModuleCount} module{metrics.loopModuleCount !== 1 ? "s" : ""} run once per item in the loop.
            Enter how many items your iterator typically processes to estimate real cost.
          </p>
          <div className="pl-6 flex flex-wrap items-center gap-3">
            <label className="text-sm text-muted-foreground">Items per run:</label>
            <input
              type="number"
              min={1}
              max={10000}
              value={iterItems}
              onChange={(e) => setIterItems(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-24 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <div className="rounded-lg bg-muted/40 border border-border px-3 py-1.5 text-sm">
              <span className="text-muted-foreground">Estimated total: </span>
              <span className="font-semibold text-foreground">{projectedOps} ops</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground/60 pl-6">
            Formula: {baseOpsMin} base ops + ({metrics.loopModuleCount} loop modules × {iterItems} items) = {projectedOps}
          </p>
        </div>
      )}

      {/* Issues */}
      {issues.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Issues</h3>
          <div className="space-y-3">
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <p className="text-center text-xs text-muted-foreground">
        Analysis runs entirely in your browser. Your blueprint data never leaves your device.
      </p>

    </div>
  )
}
