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
  estimatedOpsMin: number
  maxNestingDepth: number
}

export interface AnalysisResult {
  scenarioName: string
  healthScore: number
  issues: Issue[]
  metrics: AnalysisMetrics
}
