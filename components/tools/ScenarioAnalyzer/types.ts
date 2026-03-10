export type IssueSeverity = "error" | "warning" | "info"

export interface Issue {
  id: string
  severity: IssueSeverity
  title: string
  description: string
  suggestion: string
}

export interface AnalysisMetrics {
  totalModules: number
  routerCount: number
  totalBranches: number
  appsUsed: number
  triggerType: "instant" | "scheduled" | "none"
  hasErrorHandler: boolean
  hasIterator: boolean
  hasAggregator: boolean
  /** Ops for a single run taking the shortest branch at every router */
  estimatedOpsMin: number
  /** Ops for a single run taking the longest branch at every router */
  estimatedOpsMax: number
  /** Modules that sit between an Iterator and its Aggregator (run N times) */
  loopModuleCount: number
  maxNestingDepth: number
}

export interface AnalysisResult {
  scenarioName: string
  healthScore: number
  issues: Issue[]
  metrics: AnalysisMetrics
}
