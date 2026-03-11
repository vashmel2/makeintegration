export interface ScenarioEntry {
  id: string
  name: string
  webhookUrl: string
  hasWebhookTrigger: boolean
  outboundUrls: string[]       // raw URLs found in HTTP modules
  moduleCount: number
  apps: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parsed: any | null
  filename: string | null
  error: string | null
}

export interface ResolvedEdge {
  id: string
  source: string   // ScenarioEntry.id
  target: string   // ScenarioEntry.id
  url: string
}

export interface ExternalCall {
  fromId: string
  fromName: string
  url: string
}

export interface GraphData {
  entries: ScenarioEntry[]
  edges: ResolvedEdge[]
  externalCalls: ExternalCall[]
}
