export interface FieldChange {
  path: string
  before: unknown
  after: unknown
}

export type DiffType = "added" | "removed" | "changed" | "unchanged"

export interface ModuleDiff {
  type: DiffType
  id: number
  moduleName: string
  displayName: string
  location: string
  changes: FieldChange[]
}

export interface BlueprintDiff {
  nameBefore: string
  nameAfter: string
  modules: ModuleDiff[]
  added: number
  removed: number
  changed: number
  unchanged: number
}
