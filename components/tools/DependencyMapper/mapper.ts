// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = any

import type { ScenarioEntry, ResolvedEdge, ExternalCall, GraphData } from "./types"

// ---------------------------------------------------------------------------
// Blueprint parsing helpers
// ---------------------------------------------------------------------------

function getAction(mod: Raw): string {
  const s: string = mod.module ?? ""
  const idx = s.indexOf(":")
  return idx >= 0 ? s.slice(idx + 1) : s
}

function getAppSlug(mod: Raw): string {
  const s: string = mod.module ?? ""
  const idx = s.indexOf(":")
  return idx >= 0 ? s.slice(0, idx) : s
}

function flattenModules(flow: Raw[]): Raw[] {
  const result: Raw[] = []
  for (const mod of flow) {
    result.push(mod)
    const routes: Raw[] = mod.routes ?? []
    for (const route of routes) result.push(...flattenModules(route.flow ?? []))
  }
  return result
}

/** True if the scenario's first module is a webhook trigger */
function detectWebhookTrigger(flow: Raw[]): boolean {
  if (flow.length === 0) return false
  const first = flow[0]
  return getAction(first) === "CustomWebHook" || getAppSlug(first) === "gateway"
}

const HTTP_ACTIONS = new Set([
  "ActionSendData",
  "ActionSendDataAdvancedCookies",
  "ActionGetFile",
  "ActionGetString",
])

/** Extract URLs from HTTP modules — only literal strings, skip template expressions */
function extractOutboundUrls(flow: Raw[]): string[] {
  const urls: string[] = []
  for (const mod of flattenModules(flow)) {
    if (getAppSlug(mod) !== "http") continue
    if (!HTTP_ACTIONS.has(getAction(mod))) continue
    const url: unknown = mod.mapper?.url
    if (typeof url === "string" && url.startsWith("http") && !url.includes("{{")) {
      urls.push(url)
    }
  }
  return urls
}

function extractApps(flow: Raw[]): string[] {
  const apps = new Set<string>()
  const skip = new Set(["http", "gateway", "builtin", "tools", "flow-control"])
  for (const mod of flattenModules(flow)) {
    const slug = getAppSlug(mod)
    if (!skip.has(slug)) apps.add(slug)
  }
  return [...apps]
}

// ---------------------------------------------------------------------------
// Parse a single blueprint into a ScenarioEntry (partial — no id/webhookUrl)
// ---------------------------------------------------------------------------

export function parseBlueprint(raw: Raw): Pick<ScenarioEntry,
  "name" | "hasWebhookTrigger" | "outboundUrls" | "moduleCount" | "apps"
> {
  const bp = raw.blueprint ?? raw
  const flow: Raw[] = bp.flow ?? []
  const all = flattenModules(flow)

  return {
    name: bp.name ?? "Untitled Scenario",
    hasWebhookTrigger: detectWebhookTrigger(flow),
    outboundUrls: extractOutboundUrls(flow),
    moduleCount: all.length,
    apps: extractApps(flow),
  }
}

// ---------------------------------------------------------------------------
// Make webhook URL detection
// ---------------------------------------------------------------------------

const MAKE_HOOK_PATTERN = /https?:\/\/hook\.[a-z0-9-]+\.make\.com\/.+/i

export function isMakeWebhookUrl(url: string): boolean {
  return MAKE_HOOK_PATTERN.test(url)
}

function normalizeUrl(url: string): string {
  return url.trim().toLowerCase().replace(/\/$/, "")
}

// ---------------------------------------------------------------------------
// Build graph data from all loaded entries
// ---------------------------------------------------------------------------

export function buildGraphData(entries: ScenarioEntry[]): GraphData {
  // Map normalized webhook URL → scenario id
  const webhookToId = new Map<string, string>()
  for (const entry of entries) {
    const u = entry.webhookUrl.trim()
    if (u) webhookToId.set(normalizeUrl(u), entry.id)
  }

  const edges: ResolvedEdge[] = []
  const externalCalls: ExternalCall[] = []
  const seenEdges = new Set<string>()

  for (const entry of entries) {
    for (const url of entry.outboundUrls) {
      const norm = normalizeUrl(url)
      const targetId = webhookToId.get(norm)

      if (targetId && targetId !== entry.id) {
        const edgeId = `${entry.id}->${targetId}`
        if (!seenEdges.has(edgeId)) {
          seenEdges.add(edgeId)
          edges.push({ id: edgeId, source: entry.id, target: targetId, url })
        }
      } else if (!targetId && isMakeWebhookUrl(url)) {
        externalCalls.push({ fromId: entry.id, fromName: entry.name, url })
      }
    }
  }

  return { entries, edges, externalCalls }
}

// ---------------------------------------------------------------------------
// DAG-aware layout — source nodes left, sinks right
// ---------------------------------------------------------------------------

export function computeLayout(
  ids: string[],
  edges: ResolvedEdge[]
): Record<string, { x: number; y: number }> {
  if (ids.length === 0) return {}

  // Compute in-degree
  const inDegree: Record<string, number> = Object.fromEntries(ids.map((id) => [id, 0]))
  for (const e of edges) {
    if (inDegree[e.target] !== undefined) inDegree[e.target]++
  }

  // BFS level assignment
  const level: Record<string, number> = {}
  const queue = ids.filter((id) => inDegree[id] === 0)
  queue.forEach((id) => (level[id] = 0))

  const visited = new Set<string>(queue)
  let head = 0
  while (head < queue.length) {
    const cur = queue[head++]
    for (const e of edges) {
      if (e.source === cur && !visited.has(e.target)) {
        visited.add(e.target)
        level[e.target] = (level[cur] ?? 0) + 1
        queue.push(e.target)
      }
    }
  }

  // Unvisited (cycles / isolated) — assign last level
  const maxLevel = Math.max(0, ...Object.values(level))
  for (const id of ids) {
    if (level[id] === undefined) level[id] = maxLevel + 1
  }

  // Group by level
  const byLevel: Record<number, string[]> = {}
  for (const id of ids) {
    const l = level[id]
    ;(byLevel[l] = byLevel[l] ?? []).push(id)
  }

  // Assign x/y
  const NODE_W = 300
  const NODE_H = 180
  const positions: Record<string, { x: number; y: number }> = {}

  for (const [l, nodes] of Object.entries(byLevel)) {
    const lv = Number(l)
    nodes.forEach((id, i) => {
      positions[id] = {
        x: lv * NODE_W,
        y: i * NODE_H - ((nodes.length - 1) * NODE_H) / 2,
      }
    })
  }

  return positions
}
