import type { AnalysisResult, AnalysisMetrics, Issue } from "./types"

// ---------------------------------------------------------------------------
// Raw blueprint helpers (work on untyped JSON)
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RawModule = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RawRoute = any

function getAppSlug(module: RawModule): string {
  const s: string = module.module ?? ""
  const idx = s.indexOf(":")
  return idx >= 0 ? s.slice(0, idx) : s
}

function getAction(module: RawModule): string {
  const s: string = module.module ?? ""
  const idx = s.indexOf(":")
  return idx >= 0 ? s.slice(idx + 1) : s
}

/** Flatten all modules recursively (including inside router branches) */
function flattenModules(flow: RawModule[], depth = 0): Array<{ mod: RawModule; depth: number }> {
  const result: Array<{ mod: RawModule; depth: number }> = []
  for (const mod of flow) {
    result.push({ mod, depth })
    const routes: RawRoute[] = mod.routes ?? []
    for (const route of routes) {
      result.push(...flattenModules(route.flow ?? [], depth + 1))
    }
  }
  return result
}

// ---------------------------------------------------------------------------
// Individual checks
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkNoTrigger(flow: RawModule[]): Issue | null {
  if (flow.length === 0) {
    return {
      id: "empty-scenario",
      severity: "error",
      title: "No modules found",
      description: "This blueprint doesn't contain any modules.",
      suggestion: "Make sure you exported the right blueprint and that it contains a flow.",
    }
  }
  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkNoErrorHandler(allMods: Array<{ mod: RawModule }>): Issue | null {
  const hasHandler = allMods.some((m) => getAction(m.mod) === "ErrorHandler")
  if (!hasHandler) {
    return {
      id: "no-error-handler",
      severity: "warning",
      title: "No error handler configured",
      description:
        "This scenario has no Error Handler module. If a module fails, Make will stop the run and use the default error behavior.",
      suggestion:
        "Add an Error Handler route to at least your most critical modules. This lets you handle failures gracefully — send an alert, log the error, or retry — instead of letting runs silently fail.",
    }
  }
  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkEmptyBranches(flow: RawModule[]): Issue | null {
  let emptyCount = 0

  function scan(modules: RawModule[]) {
    for (const mod of modules) {
      const routes: RawRoute[] = mod.routes ?? []
      for (const route of routes) {
        const branchFlow: RawModule[] = route.flow ?? []
        if (branchFlow.length === 0) emptyCount++
        else scan(branchFlow)
      }
    }
  }

  scan(flow)

  if (emptyCount > 0) {
    return {
      id: "empty-router-branch",
      severity: "warning",
      title: `${emptyCount} empty router branch${emptyCount > 1 ? "es" : ""}`,
      description: `${emptyCount === 1 ? "A router branch has" : `${emptyCount} router branches have`} no modules inside. Data routed into that branch will just pass through and do nothing.`,
      suggestion:
        "Either add modules to the empty branch or remove it. Empty branches consume an operation for every matched run.",
    }
  }
  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkSingleRouteBranch(flow: RawModule[]): Issue | null {
  let count = 0

  function scan(modules: RawModule[]) {
    for (const mod of modules) {
      const routes: RawRoute[] = mod.routes ?? []
      if (getAction(mod) === "BasicRouter" && routes.length === 1) count++
      for (const route of routes) scan(route.flow ?? [])
    }
  }

  scan(flow)

  if (count > 0) {
    return {
      id: "single-route-router",
      severity: "info",
      title: `${count} router with only one branch`,
      description: "A Router module with a single branch doesn't actually route anything. It adds complexity and cost without splitting the flow.",
      suggestion:
        "Remove the single-branch router and connect the modules directly to the previous step, or add a second branch if you need conditional logic.",
    }
  }
  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkUnfilteredBranches(flow: RawModule[]): Issue | null {
  let routerCount = 0
  let unfilteredCount = 0

  function scan(modules: RawModule[]) {
    for (const mod of modules) {
      const routes: RawRoute[] = mod.routes ?? []
      if (getAction(mod) === "BasicRouter" && routes.length > 1) {
        routerCount++
        for (const route of routes) {
          const conditions = route.filter?.conditions ?? []
          if (conditions.length === 0) unfilteredCount++
        }
      }
      for (const route of routes) scan(route.flow ?? [])
    }
  }

  scan(flow)

  // Only flag if there are routers with multiple branches and some are unfiltered
  // (one unfiltered branch on a multi-branch router is often intentional as a catch-all)
  // We flag if MORE than one branch is unfiltered on the same router
  if (routerCount > 0 && unfilteredCount > routerCount) {
    const extra = unfilteredCount - routerCount
    return {
      id: "unfiltered-branches",
      severity: "info",
      title: `${extra} router branch${extra > 1 ? "es" : ""} with no filter conditions`,
      description:
        "Multiple router branches have no filter conditions set. Without filters, all data flows into every branch, which may not be what you intended.",
      suggestion:
        "Add filter conditions to define when each branch should run. A single catch-all unfiltered branch per router is normal, but multiple unfiltered branches means the same data runs through all of them.",
    }
  }
  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkIteratorWithoutAggregator(allMods: Array<{ mod: RawModule }>): Issue | null {
  const hasIterator = allMods.some((m) => getAction(m.mod) === "BasicIterator")
  const hasAggregator = allMods.some(
    (m) => getAction(m.mod) === "BasicAggregator" || getAction(m.mod) === "BasicTextAggregator"
  )

  if (hasIterator && !hasAggregator) {
    return {
      id: "iterator-no-aggregator",
      severity: "info",
      title: "Iterator without an aggregator",
      description:
        "This scenario has an Iterator but no Aggregator. Iterators split an array into individual bundles. Without an Aggregator downstream, the results are never collected back together.",
      suggestion:
        "If you need the final result as a combined value (a string, an array, a count), add an Array Aggregator or Text Aggregator after the loop. If you're intentionally processing each item separately, this is fine.",
    }
  }
  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkHighModuleCount(total: number): Issue | null {
  if (total >= 25) {
    return {
      id: "high-module-count",
      severity: "info",
      title: `${total} modules in a single scenario`,
      description:
        "This scenario is fairly large. Larger scenarios can be harder to maintain, debug, and understand at a glance. They also mean more operations per run.",
      suggestion:
        "Consider splitting complex logic into separate sub-scenarios connected via HTTP modules or Make's built-in tools. Breaking things up makes individual scenarios easier to test and reuse.",
    }
  }
  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkNestedRouters(flow: RawModule[]): Issue | null {
  let nestedCount = 0

  function scan(modules: RawModule[], insideRouter: boolean) {
    for (const mod of modules) {
      const isRouter = getAction(mod) === "BasicRouter"
      if (isRouter && insideRouter) nestedCount++
      for (const route of (mod.routes ?? [] as RawRoute[])) {
        scan(route.flow ?? [], isRouter || insideRouter)
      }
    }
  }

  scan(flow, false)

  if (nestedCount > 0) {
    return {
      id: "nested-routers",
      severity: "info",
      title: `${nestedCount} nested router${nestedCount > 1 ? "s" : ""}`,
      description:
        "This scenario has routers inside router branches. Deeply nested routing logic can make scenarios hard to follow and troubleshoot.",
      suggestion:
        "If the nested routing is complex, consider moving inner branches into a separate sub-scenario triggered by an HTTP call. Flat scenarios are almost always easier to maintain.",
    }
  }
  return null
}

// ---------------------------------------------------------------------------
// Router-aware operation range
// ---------------------------------------------------------------------------

/**
 * Returns the real min/max ops for a flow by taking the shortest/longest
 * branch at each router, rather than blindly summing all modules.
 *
 * Make counts each module execution as 1 op. A router with N branches only
 * executes ONE branch per run, so only those modules actually cost ops.
 */
function countOpsRange(flow: RawModule[]): { min: number; max: number } {
  let min = 0
  let max = 0
  for (const mod of flow) {
    const action = getAction(mod)
    const routes: RawRoute[] = mod.routes ?? []

    if (action === "BasicRouter") {
      // The router module itself = 1 op
      min += 1
      max += 1
      if (routes.length > 0) {
        const branchCounts = routes.map((r: RawRoute) => countOpsRange(r.flow ?? []))
        min += Math.min(...branchCounts.map((b) => b.min))
        max += Math.max(...branchCounts.map((b) => b.max))
      }
    } else {
      min += 1
      max += 1
    }
  }
  return { min, max }
}

// ---------------------------------------------------------------------------
// Iterator loop module count
// ---------------------------------------------------------------------------

/**
 * Counts modules that sit between the first Iterator and its nearest
 * Aggregator in the same linear flow — these are the modules that
 * execute once per item, not once per run.
 *
 * Make's blueprint format is linear (no nested loop structure), so we
 * scan the flat flow looking for the Iterator → Aggregator window.
 */
function countLoopModules(flow: RawModule[]): number {
  // Work on the flat top-level flow only (iterators are not nested like routers)
  let inLoop = false
  let loopCount = 0
  const aggregatorActions = new Set(["BasicAggregator", "BasicTextAggregator"])

  for (const mod of flow) {
    const action = getAction(mod)
    if (action === "BasicIterator") {
      inLoop = true
      continue
    }
    if (inLoop && aggregatorActions.has(action)) {
      inLoop = false
      continue
    }
    if (inLoop) loopCount++
  }

  // Also scan inside router branches
  for (const mod of flow) {
    const routes: RawRoute[] = mod.routes ?? []
    for (const route of routes) {
      loopCount += countLoopModules(route.flow ?? [])
    }
  }

  return loopCount
}

// ---------------------------------------------------------------------------
// Metrics collection
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function collectMetrics(flow: RawModule[], meta: any): AnalysisMetrics {
  const allMods = flattenModules(flow)

  let routerCount = 0
  let totalBranches = 0
  let maxDepth = 0
  const appSet = new Set<string>()

  for (const { mod, depth } of allMods) {
    if (depth > maxDepth) maxDepth = depth
    const slug = getAppSlug(mod)
    const action = getAction(mod)
    if (slug !== "builtin" && slug !== "tools" && slug !== "flow-control") {
      appSet.add(slug)
    }
    if (action === "BasicRouter") {
      routerCount++
      totalBranches += (mod.routes ?? []).length
    }
  }

  const hasErrorHandler = allMods.some((m) => getAction(m.mod) === "ErrorHandler")
  const hasIterator = allMods.some((m) => getAction(m.mod) === "BasicIterator")
  const hasAggregator = allMods.some(
    (m) => getAction(m.mod) === "BasicAggregator" || getAction(m.mod) === "BasicTextAggregator"
  )

  const { min: estimatedOpsMin, max: estimatedOpsMax } = countOpsRange(flow)
  const loopModuleCount = hasIterator ? countLoopModules(flow) : 0

  const triggerType: AnalysisMetrics["triggerType"] =
    flow.length === 0 ? "none" : meta.instant === true ? "instant" : "scheduled"

  return {
    totalModules: allMods.length,
    routerCount,
    totalBranches,
    appsUsed: appSet.size,
    triggerType,
    hasErrorHandler,
    hasIterator,
    hasAggregator,
    estimatedOpsMin,
    estimatedOpsMax,
    loopModuleCount,
    maxNestingDepth: maxDepth,
  }
}

// ---------------------------------------------------------------------------
// Health score
// ---------------------------------------------------------------------------

function computeScore(issues: Issue[]): number {
  let score = 100
  for (const issue of issues) {
    if (issue.severity === "error") score -= 30
    else if (issue.severity === "warning") score -= 15
    else score -= 5
  }
  return Math.max(0, score)
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function analyzeScenario(raw: any): AnalysisResult {
  const bp = raw.blueprint ?? raw
  const name: string = bp.name ?? "Untitled Scenario"
  const flow = bp.flow ?? []
  const meta = bp.metadata ?? {}

  const allMods = flattenModules(flow)
  const metrics = collectMetrics(flow, meta)

  const issues: Issue[] = [
    checkNoTrigger(flow),
    checkNoErrorHandler(allMods),
    checkEmptyBranches(flow),
    checkSingleRouteBranch(flow),
    checkUnfilteredBranches(flow),
    checkIteratorWithoutAggregator(allMods),
    checkHighModuleCount(metrics.totalModules),
    checkNestedRouters(flow),
  ].filter((i): i is Issue => i !== null)

  // Sort: errors first, then warnings, then info
  const order = { error: 0, warning: 1, info: 2 }
  issues.sort((a, b) => order[a.severity] - order[b.severity])

  const healthScore = computeScore(issues)

  return { scenarioName: name, healthScore, issues, metrics }
}
