/**
 * Matilda — TypeScript interfaces.
 * Ported from cursor_handoff/types/matilda.ts (design source of truth).
 */

// ─── Enums / Union types ────────────────────────────────────────────────────

export type Theme = "light" | "dark";

export type SavingState = "idle" | "saving" | "saved" | "error";

export type RuleCategory = "matched" | "noMatch";

export type NullPolicy = "REQUIRED" | "SET_NULL" | "USE_DEFAULT";

export type TransformPolicy = "DIRECT" | "CODE_LOOKUP";

/** "notFound" is a demo-only sentinel (v4 store) for the Editor Not Found state — not a StatusPill variant. */
export type ProjectStatus = "published" | "draft" | "analysis" | "notFound";

export type SourceType = "STR" | "INT" | "NUM" | "BOOL" | "OBJ" | "ARR" | "NULL";

export type DtProgress = 0 | 1 | 2;

// ─── Domain models ──────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  /** Nombre del archivo JSON fuente, o null si aún no se cargó */
  source: string | null;
  status: ProjectStatus;
  mapperId: string;
  /** Número de reglas de mapeo en esta definición */
  rules: number;
  /** Porcentaje de cobertura canónica (0-100) */
  coverage: number;
  updated: string;
  client: string;
}

export interface MappingRule {
  id: string;
  sourcePath: string;
  /** Valor de muestra del JSON del cliente */
  sourceValue: unknown;
  sourceType: SourceType;
  /** Path en el Canónico v9 (null si no asignado) */
  destinationPath: string | null;
  nullPolicy: NullPolicy;
  defaultValue: string;
  transformationPolicy: TransformPolicy;
  transformationFunction: string;
  category: RuleCategory;
  /** Solo presente si category === 'noMatch' y el agente identificó la razón */
  unmappedReason?: string;
}

export interface RulePolicy {
  nullPolicy?: NullPolicy;
  defaultValue?: string;
  transformationPolicy?: TransformPolicy;
  transformationFunction?: string;
}

// ─── Store state ────────────────────────────────────────────────────────────

export interface MatildaState {
  theme: Theme;
  seenExplainer: boolean;

  activeProject: Project | null;
  mapperId: string | null;
  projectName: string | null;

  configDone: boolean;
  jsonLoaded: boolean;
  agentDone: boolean;

  mappingRules: MappingRule[];
  rulePolicies: Record<string, RulePolicy>;

  savingState: SavingState;

  rulesConfirmed: boolean;
  summaryOk: boolean;
  published: boolean;
  publishedVersion: string | null;
  blockerResolved: boolean;

  /** True right after setProject() loads an existing project with rules — editor should show its loading state once. */
  editorNeedsLoading: boolean;
  editorState: "idle" | "notFound";
}

// ─── Store actions ──────────────────────────────────────────────────────────

export interface MatildaActions {
  setTheme: (theme: Theme) => void;
  markExplainerSeen: () => void;

  setConfig: (mapperId: string, projectName: string) => void;
  setProject: (project: Project) => void;

  loadJson: () => void;
  runAgent: () => void;

  setRules: (rules: MappingRule[]) => void;
  moveToMatched: (id: string) => void;
  moveToNoMatch: (id: string) => void;

  setDestination: (id: string, path: string) => void;
  clearDestination: (id: string) => void;

  setPolicy: (id: string, policy: Partial<RulePolicy>) => void;

  startSaving: () => void;
  savedOk: () => void;
  savedError: () => void;
  clearSave: () => void;

  confirmRules: () => void;
  markSummaryOk: () => void;
  resolveBlocker: () => void;
  publish: (version: string) => void;
  editorShown: () => void;

  reset: () => void;
}

// ─── Static data shapes ─────────────────────────────────────────────────────

export interface JsonSourceItem {
  id: string;
  name: string;
  size: string;
  fieldCount: number;
  desc: string;
}

export interface DtStep {
  id: string;
  label: string;
  surface: string;
}

export interface JsonTreeNode {
  key: string;
  type: "object" | "string" | "number" | "boolean";
  value?: string;
  mapStatus?: "ok" | "warn" | "none";
  children?: JsonTreeNode[];
}

// ─── Canonical paths ────────────────────────────────────────────────────────

export type CanonicalGroup = "metadata" | "processContext" | "profile" | "paymentCapacity" | "bureaus" | "additionalData";

export type CanonicalPaths = Record<CanonicalGroup, string[]>;

// ─── Structured data (output del agente IA) ─────────────────────────────────

export interface MappedField {
  source: { path: string; value: unknown };
  standard: { path: string; type: SourceType };
}

export interface UnmappedField {
  source: { path: string; value: unknown };
  reason: string;
}

export interface UnmappedSourceField {
  source: { path: string; value: unknown };
}

export interface StructuredData {
  mappedFields: MappedField[];
  unmappedFields: UnmappedField[];
  unmappedSourceFields: UnmappedSourceField[];
}

// ─── Canonical catalog (Destination Modal / Domain Panel) ──────────────────────

export interface CanonicalCatalogItem {
  id: string;
  path: string;
  name: string;
  description: string;
  domainId: string;
  categories: string[];
}

export interface CategoryColor {
  bg: string;
  text: string;
  border: string;
}

/** Extended per-rule policy fields used by the Mapper Editor's v2 Policies Panel (PRD §7.5). */
export interface RulePolicyV2 extends RulePolicy {
  required?: boolean;
  alternativeSource?: string;
  conditionalValues?: Record<string, string> | null;
}
