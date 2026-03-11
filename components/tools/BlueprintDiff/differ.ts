// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = any

import type { FieldChange, ModuleDiff, BlueprintDiff } from "./types"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatModuleName(s: string): string {
  if (!s) return "Unknown"
  const colonIdx = s.indexOf(":")
  const app = colonIdx >= 0 ? s.slice(0, colonIdx) : s
  const action = colonIdx >= 0 ? s.slice(colonIdx + 1) : ""

  const appTitle = app.charAt(0).toUpperCase() + app.slice(1)
  // Strip leading verb prefix that Make uses (Action, Trigger, etc.)
  const cleanAction = action.replace(/^(Action|Trigger|Response)/, "")
  const spaced = cleanAction.replace(/([A-Z])/g, " $1").trim()

  return spaced ? `${appTitle}: ${spaced}` : appTitle
}

interface FlatModule {
  id: number
  moduleName: string
  location: string
  raw: Raw
}

function flattenWithPath(flow: Raw[], location = "Main flow"): FlatModule[] {
  const result: FlatModule[] = []
  let routerIndex = 0

  for (const mod of flow) {
    result.push({ id: mod.id, moduleName: mod.module ?? "", location, raw: mod })

    const routes: Raw[] = mod.routes ?? []
    if (routes.length > 0) {
      routerIndex++
      routes.forEach((route: Raw, i: number) => {
        const branchLabel = `Router ${routerIndex}, Branch ${i + 1}`
        result.push(...flattenWithPath(route.flow ?? [], branchLabel))
      })
    }
  }

  return result
}

// ---------------------------------------------------------------------------
// Field-level differ
// ---------------------------------------------------------------------------

const IGNORED_KEYS = new Set(["metadata", "id", "version"])

function diffValues(
  before: unknown,
  after: unknown,
  path: string,
  depth: number,
  out: FieldChange[]
) {
  if (depth > 5) return
  if (before === after) return
  if (JSON.stringify(before) === JSON.stringify(after)) return

  // Both are plain objects — recurse key by key
  if (
    typeof before === "object" && before !== null &&
    typeof after === "object" && after !== null &&
    !Array.isArray(before) && !Array.isArray(after)
  ) {
    const keys = new Set([
      ...Object.keys(before as Record<string, unknown>),
      ...Object.keys(after as Record<string, unknown>),
    ])
    for (const k of keys) {
      if (IGNORED_KEYS.has(k)) continue
      diffValues(
        (before as Record<string, unknown>)[k],
        (after as Record<string, unknown>)[k],
        path ? `${path}.${k}` : k,
        depth + 1,
        out
      )
    }
    return
  }

  out.push({ path, before, after })
}

function diffModules(before: Raw, after: Raw): FieldChange[] {
  const changes: FieldChange[] = []

  if (before.module !== after.module) {
    changes.push({ path: "module type", before: before.module, after: after.module })
  }

  for (const key of ["parameters", "mapper", "filter"]) {
    diffValues(before[key], after[key], key, 0, changes)
  }

  return changes
}

// ---------------------------------------------------------------------------
// Main entry
// ---------------------------------------------------------------------------

export function diffBlueprints(rawBefore: Raw, rawAfter: Raw): BlueprintDiff {
  const bpBefore = rawBefore.blueprint ?? rawBefore
  const bpAfter = rawAfter.blueprint ?? rawAfter

  const flatBefore = flattenWithPath(bpBefore.flow ?? [])
  const flatAfter = flattenWithPath(bpAfter.flow ?? [])

  const beforeById = new Map(flatBefore.map((m) => [m.id, m]))
  const afterById = new Map(flatAfter.map((m) => [m.id, m]))

  const allIds = new Set([...beforeById.keys(), ...afterById.keys()])

  const modules: ModuleDiff[] = []

  for (const id of allIds) {
    const b = beforeById.get(id)
    const a = afterById.get(id)

    if (!b) {
      modules.push({
        type: "added",
        id,
        moduleName: a!.moduleName,
        displayName: formatModuleName(a!.moduleName),
        location: a!.location,
        changes: [],
      })
    } else if (!a) {
      modules.push({
        type: "removed",
        id,
        moduleName: b.moduleName,
        displayName: formatModuleName(b.moduleName),
        location: b.location,
        changes: [],
      })
    } else {
      const changes = diffModules(b.raw, a.raw)
      modules.push({
        type: changes.length > 0 ? "changed" : "unchanged",
        id,
        moduleName: a.moduleName,
        displayName: formatModuleName(a.moduleName),
        location: a.location,
        changes,
      })
    }
  }

  // Sort: removed → changed → added → unchanged, then by id within each group
  const order: Record<string, number> = { removed: 0, changed: 1, added: 2, unchanged: 3 }
  modules.sort((a, b) => {
    const d = order[a.type] - order[b.type]
    return d !== 0 ? d : a.id - b.id
  })

  return {
    nameBefore: bpBefore.name ?? "Untitled",
    nameAfter: bpAfter.name ?? "Untitled",
    modules,
    added: modules.filter((m) => m.type === "added").length,
    removed: modules.filter((m) => m.type === "removed").length,
    changed: modules.filter((m) => m.type === "changed").length,
    unchanged: modules.filter((m) => m.type === "unchanged").length,
  }
}
