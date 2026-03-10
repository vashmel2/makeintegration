export type ModuleType =
  | "trigger"
  | "action"
  | "router"
  | "iterator"
  | "aggregator"
  | "error-handler"
  | "unknown"

export interface ParsedModule {
  id: number
  appSlug: string
  appName: string
  actionRaw: string
  actionName: string
  moduleType: ModuleType
  routes?: ParsedRoute[]
}

export interface ParsedRoute {
  index: number
  modules: ParsedModule[]
}

export interface AppSummary {
  appName: string
  count: number
}

export interface ScenarioSettings {
  maxErrors: number
  sequential: boolean
  autoCommit: boolean
  dataLoss: boolean
  confidential: boolean
  roundtrips: number
}

export interface ParsedScenario {
  name: string
  isInstant: boolean
  zone: string
  modules: ParsedModule[]
  appsSummary: AppSummary[]
  totalModules: number
  settings: ScenarioSettings
}
