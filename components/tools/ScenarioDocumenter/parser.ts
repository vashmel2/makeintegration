import type {
  ParsedModule,
  ParsedRoute,
  ParsedScenario,
  ModuleType,
  AppSummary,
} from "./types"

// ---------------------------------------------------------------------------
// App name lookup
// ---------------------------------------------------------------------------

const APP_NAMES: Record<string, string> = {
  // Make built-ins
  builtin: "Make (Built-in)",
  tools: "Tools",
  "flow-control": "Flow Control",

  // Web / API
  webhook: "Webhooks",
  http: "HTTP",
  json: "JSON",
  xml: "XML",
  csv: "CSV",
  "text-parser": "Text Parser",
  math: "Math",

  // Google
  "google-sheets": "Google Sheets",
  "google-drive": "Google Drive",
  "google-docs": "Google Docs",
  "google-calendar": "Google Calendar",
  "google-forms": "Google Forms",
  "google-slides": "Google Slides",
  "google-analytics": "Google Analytics",
  gmail: "Gmail",

  // Microsoft
  "microsoft-office-365-excel": "Excel",
  onedrive: "OneDrive",
  sharepoint: "SharePoint",
  "microsoft-teams": "Microsoft Teams",
  outlook: "Outlook",

  // Communication
  slack: "Slack",
  discord: "Discord",
  "telegram-bot-api": "Telegram",
  twilio: "Twilio",
  sendgrid: "SendGrid",
  mailchimp: "Mailchimp",

  // Project management
  airtable: "Airtable",
  notion: "Notion",
  trello: "Trello",
  asana: "Asana",
  jira: "Jira",
  monday: "Monday.com",
  clickup: "ClickUp",
  linear: "Linear",

  // CRM
  hubspot: "HubSpot",
  salesforce: "Salesforce",
  pipedrive: "Pipedrive",

  // E-commerce
  shopify: "Shopify",
  stripe: "Stripe",
  paypal: "PayPal",
  woocommerce: "WooCommerce",

  // Dev
  github: "GitHub",
  gitlab: "GitLab",
  bitbucket: "Bitbucket",

  // Database
  mysql: "MySQL",
  postgresql: "PostgreSQL",
  mongodb: "MongoDB",
  supabase: "Supabase",
  firebase: "Firebase",
  redis: "Redis",

  // Storage
  dropbox: "Dropbox",
  box: "Box",
  "aws-s3": "Amazon S3",

  // AI
  openai: "OpenAI",
  anthropic: "Anthropic",

  // Social
  twitter: "Twitter / X",
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  youtube: "YouTube",

  // Support
  zendesk: "Zendesk",
  intercom: "Intercom",
  freshdesk: "Freshdesk",
}

// ---------------------------------------------------------------------------
// Built-in module overrides
// ---------------------------------------------------------------------------

const BUILTIN_ACTIONS: Record<string, { name: string; type: ModuleType }> = {
  BasicRouter: { name: "Router", type: "router" },
  BasicIterator: { name: "Iterator", type: "iterator" },
  BasicAggregator: { name: "Array Aggregator", type: "aggregator" },
  BasicTextAggregator: { name: "Text Aggregator", type: "aggregator" },
  SetVariable: { name: "Set Variable", type: "action" },
  GetVariable: { name: "Get Variable", type: "action" },
  SetVariables: { name: "Set Multiple Variables", type: "action" },
  GetVariables: { name: "Get Multiple Variables", type: "action" },
  ErrorHandler: { name: "Error Handler", type: "error-handler" },
  Sleep: { name: "Sleep", type: "action" },
  TypeConverter: { name: "Type Converter", type: "action" },
  RepeatRoute: { name: "Repeater", type: "action" },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveAppName(slug: string): string {
  return APP_NAMES[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function humanizeAction(appSlug: string, action: string): { name: string; type: ModuleType } {
  if (appSlug === "builtin") {
    const override = BUILTIN_ACTIONS[action]
    if (override) return override
  }

  // Normalize to PascalCase so both "addRow" and "ActionCreateMessage" work
  const normalized = action.charAt(0).toUpperCase() + action.slice(1)

  // Insert space between lower→upper transitions: "addRow" → "Add Row"
  const spaced = normalized.replace(/([a-z])([A-Z])/g, "$1 $2")

  // Strip common prefixes
  const stripped = spaced.replace(/^(Action|Trigger|Search|Watch|List)\s+/i, "").trim()

  // Detect type from prefix
  const isTrigger = /^(trigger|watch)/i.test(action)
  const type: ModuleType = isTrigger ? "trigger" : "action"

  return { name: stripped || action, type }
}

// ---------------------------------------------------------------------------
// Module parsing (recursive for routers/iterators)
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseModule(raw: any, isFirst: boolean): ParsedModule {
  const moduleString: string = raw.module ?? ""
  const colonIdx = moduleString.indexOf(":")
  const appSlug = colonIdx >= 0 ? moduleString.slice(0, colonIdx) : moduleString
  const actionRaw = colonIdx >= 0 ? moduleString.slice(colonIdx + 1) : moduleString

  const appName = resolveAppName(appSlug)
  const { name: actionName, type: inferredType } = humanizeAction(appSlug, actionRaw)

  // Override type for first module (it's always the trigger)
  let moduleType: ModuleType = inferredType
  if (isFirst) moduleType = "trigger"

  // Parse routes for routers
  let routes: ParsedRoute[] | undefined
  if (moduleType === "router" || (appSlug === "builtin" && actionRaw === "BasicRouter")) {
    moduleType = "router"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routes = (raw.routes ?? []).map((route: any, idx: number) => ({
      index: idx + 1,
      modules: parseFlow(route.flow ?? []),
    }))
  }

  return {
    id: raw.id ?? 0,
    appSlug,
    appName,
    actionRaw,
    actionName,
    moduleType,
    routes,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFlow(flow: any[], isTopLevel = false): ParsedModule[] {
  return flow.map((raw, idx) => parseModule(raw, isTopLevel && idx === 0))
}

// ---------------------------------------------------------------------------
// Count total modules (including inside routes)
// ---------------------------------------------------------------------------

function countModules(modules: ParsedModule[]): number {
  let count = 0
  for (const m of modules) {
    count++
    if (m.routes) {
      for (const route of m.routes) {
        count += countModules(route.modules)
      }
    }
  }
  return count
}

// ---------------------------------------------------------------------------
// Collect unique apps
// ---------------------------------------------------------------------------

function collectApps(modules: ParsedModule[], map: Map<string, number>) {
  for (const m of modules) {
    if (m.appSlug !== "builtin") {
      map.set(m.appName, (map.get(m.appName) ?? 0) + 1)
    }
    if (m.routes) {
      for (const route of m.routes) {
        collectApps(route.modules, map)
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Main parse entry point
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseScenario(raw: any): ParsedScenario {
  // Handle both flat format and blueprint-wrapped format
  const bp = raw.blueprint ?? raw

  const name: string = bp.name ?? "Untitled Scenario"
  const flow = bp.flow ?? []
  const meta = bp.metadata ?? {}
  const scenarioMeta = meta.scenario ?? {}

  const modules = parseFlow(flow, true)
  const total = countModules(modules)

  const appMap = new Map<string, number>()
  collectApps(modules, appMap)
  const appsSummary: AppSummary[] = Array.from(appMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([appName, count]) => ({ appName, count }))

  const zone: string = meta.zone ?? ""
  const isInstant: boolean = meta.instant === true

  return {
    name,
    isInstant,
    zone,
    modules,
    appsSummary,
    totalModules: total,
    settings: {
      maxErrors: scenarioMeta.maxErrors ?? 3,
      sequential: scenarioMeta.sequential ?? false,
      autoCommit: scenarioMeta.autoCommit ?? true,
      dataLoss: scenarioMeta.dataloss ?? false,
      confidential: scenarioMeta.confidential ?? false,
      roundtrips: scenarioMeta.roundtrips ?? 1,
    },
  }
}

// ---------------------------------------------------------------------------
// Markdown export
// ---------------------------------------------------------------------------

function modulesToMarkdown(modules: ParsedModule[], depth = 0): string {
  const indent = "  ".repeat(depth)
  const lines: string[] = []

  for (const m of modules) {
    const badge = m.moduleType === "trigger" ? " `TRIGGER`" : ""
    lines.push(`${indent}- **${m.actionName}** (${m.appName})${badge}`)

    if (m.routes) {
      for (const route of m.routes) {
        lines.push(`${indent}  - *Branch ${route.index}*`)
        lines.push(modulesToMarkdown(route.modules, depth + 2))
      }
    }
  }

  return lines.join("\n")
}

export function scenarioToMarkdown(scenario: ParsedScenario): string {
  const appsLine = scenario.appsSummary.map((a) => a.appName).join(", ") || "None"
  const triggerType = scenario.isInstant ? "Instant (Webhook / Real-time)" : "Scheduled"
  const zoneDisplay = scenario.zone ? scenario.zone.replace(".make.com", "").toUpperCase() : "Unknown"

  const lines = [
    `# ${scenario.name}`,
    "",
    `**Trigger type:** ${triggerType}  `,
    `**Zone:** ${zoneDisplay}  `,
    "",
    `*Generated by [MakeIntegration.com](https://makeintegration.com) - Scenario Documenter*`,
    "",
    "---",
    "",
    "## Summary",
    "",
    "| Field | Value |",
    "|-------|-------|",
    `| Total Modules | ${scenario.totalModules} |`,
    `| Apps Used | ${scenario.appsSummary.length} |`,
    `| Trigger | ${triggerType} |`,
    `| Max Errors | ${scenario.settings.maxErrors} |`,
    `| Sequential | ${scenario.settings.sequential ? "Yes" : "No"} |`,
    `| Auto-commit | ${scenario.settings.autoCommit ? "Yes" : "No"} |`,
    "",
    "---",
    "",
    "## Apps Used",
    "",
    appsLine,
    "",
    "---",
    "",
    "## Module Flow",
    "",
    modulesToMarkdown(scenario.modules),
    "",
    "---",
    "",
    "## Settings",
    "",
    "| Setting | Value |",
    "|---------|-------|",
    `| Max Errors | ${scenario.settings.maxErrors} |`,
    `| Sequential | ${scenario.settings.sequential ? "Yes" : "No"} |`,
    `| Auto-commit | ${scenario.settings.autoCommit ? "Yes" : "No"} |`,
    `| Data Loss Protection | ${scenario.settings.dataLoss ? "Yes" : "No"} |`,
    `| Confidential | ${scenario.settings.confidential ? "Yes" : "No"} |`,
    "",
  ]

  return lines.join("\n")
}

// ---------------------------------------------------------------------------
// Example blueprint (used in UI as a demo)
// ---------------------------------------------------------------------------

export const EXAMPLE_BLUEPRINT = JSON.stringify(
  {
    name: "Typeform Submission → Google Sheets + Slack",
    flow: [
      {
        id: 1,
        module: "webhook:CustomWebHook",
        version: 1,
        parameters: { hook: 123456, maxResults: 1 },
        mapper: {},
        metadata: { designer: { x: 0, y: 0 } },
      },
      {
        id: 2,
        module: "google-sheets:addRow",
        version: 2,
        parameters: { spreadsheetId: "abc123", sheetId: "Sheet1", includesHeaders: true },
        mapper: {},
        metadata: { designer: { x: 300, y: 0 } },
      },
      {
        id: 3,
        module: "builtin:BasicRouter",
        version: 1,
        parameters: {},
        mapper: {},
        metadata: { designer: { x: 600, y: 0 } },
        routes: [
          {
            flow: [
              {
                id: 4,
                module: "slack:ActionCreateMessage",
                version: 1,
                parameters: { channel: "C01234567" },
                mapper: {},
                metadata: { designer: { x: 900, y: -120 } },
              },
            ],
          },
          {
            flow: [
              {
                id: 5,
                module: "gmail:ActionSendEmail",
                version: 1,
                parameters: {},
                mapper: {},
                metadata: { designer: { x: 900, y: 120 } },
              },
            ],
          },
        ],
      },
    ],
    metadata: {
      instant: true,
      version: 1,
      scenario: {
        roundtrips: 1,
        maxErrors: 3,
        autoCommit: true,
        autoCommitTriggerLast: true,
        sequential: false,
        confidential: false,
        dataloss: false,
        dlq: false,
        freshVariables: false,
      },
      designer: { orphans: [] },
      zone: "eu1.make.com",
    },
  },
  null,
  2
)
