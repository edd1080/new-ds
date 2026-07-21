/**
 * Matilda 4.5 — Simulaciones DMN · Shared TypeScript interfaces.
 * Ported from project/v4/simulations-data.jsx.
 *
 * The DMN graph shapes (DmnNode / DmnEdge) are intentionally kept
 * React-Flow-compatible (`{ id, position: { x, y }, data }` for nodes,
 * `{ id, source, target }` for edges) so that swapping the current
 * placeholder SVG canvas (SimDmnCanvas) for `@xyflow/react` in the future
 * is a rendering-layer change only — the data model does not need to move.
 */

// ─── Models / versions ──────────────────────────────────────────────────────

export interface DmnVersionMetadata {
  namespace: string;
  decisionNames: string[];
  inputFields: string[];
}

export interface DmnModelVersion {
  versionId: string;
  name: string;
  description: string;
  published: boolean;
  fileSizeBytes: number;
  decisions: number;
  inputs: number;
  metadata: DmnVersionMetadata;
}

export interface DmnModel {
  id: string;
  modelName: string;
  modelDescription: string;
  creationDate: string;
  versions: DmnModelVersion[];
}

// ─── Datasets ────────────────────────────────────────────────────────────────

export interface SimDatasetFile {
  filename: string;
  itemCount: number;
  size?: number;
}

export interface SimDataset {
  id: string;
  modelId: string;
  title: string;
  description: string;
  createdAt: string;
  files: SimDatasetFile[];
}

// ─── Simulations ────────────────────────────────────────────────────────────

export type SimStatus = "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED";

export interface SimRunError {
  code: string;
  message: string;
  failedAt: string;
}

export interface Simulation {
  id: string;
  name: string;
  description: string;
  modelId: string;
  versionId: string;
  datasetId: string | null;
  status: SimStatus;
  createdAt: string;
  finishedAt: string | null;
  currentIndex: number;
  finalIndex: number;
  error?: SimRunError;
}

export interface SimSummaryDistribution {
  SUCCEEDED?: number;
  FAILED?: number;
}

export interface SimSummary {
  total: number;
  completed: number;
  failed: number;
  running: number;
  avgLatencyMs: number | null;
  distribution: SimSummaryDistribution;
}

// ─── Executions ─────────────────────────────────────────────────────────────

export type DecisionStatus = "SUCCEEDED" | "FAILED" | "SKIPPED";

export interface DecisionMessage {
  level: "INFO" | "WARN" | "ERROR";
  text: string;
}

export interface DecisionResult {
  decisionId: string;
  decisionName: string;
  result: unknown;
  status: DecisionStatus;
  messages: DecisionMessage[];
}

/**
 * Pipeline layer a model belongs to within a multi-model (layered) execution.
 * Layers always execute in this order: DOMAIN → RULES → EVALUATION.
 */
export type ModelLayer = "DOMAIN" | "RULES" | "EVALUATION";

/**
 * Whether a model reads raw profile data (SINGLE) or aggregates results
 * produced by previous layers (BUNDLE).
 */
export type ModelNature = "SINGLE" | "BUNDLE";

export interface ModelResultError {
  code: string;
  message: string;
}

/**
 * The result of running ONE model within a (possibly multi-model) execution.
 * For a single-model execution, `SimExecution.modelResults` has exactly one
 * entry shaped like this. For a layered execution, one entry per layer.
 */
export interface ModelResult {
  modelName: string;
  modelLayer: ModelLayer;
  modelNature: ModelNature;
  success: boolean;
  /** Execution order within the sequence (DOMAIN layers first, then RULES, then EVALUATION). */
  order: number;
  /** Inputs this model received — base profile + accumulated results from earlier layers. */
  contextInputs: Record<string, unknown>;
  decisionResults: DecisionResult[];
  messages: DecisionMessage[];
  error?: ModelResultError;
}

export interface SimExecution {
  id: string;
  success: boolean;
  request: Record<string, unknown>;
  /** Aggregated across all modelResults — every decision produced by any model/layer. */
  decisionResults: DecisionResult[];
  error: unknown;
  createdAt: string;
  finishedAt: string;
  /**
   * Per-model/layer breakdown. Present on every execution: a single-model run
   * has exactly one entry; a layered run has one entry per model in the
   * DOMAIN → RULES → EVALUATION sequence. Optional for backward compatibility
   * with executions seeded before this field existed.
   */
  modelResults?: ModelResult[];
  /** Domain verdicts accumulated so far and passed forward to later layers. */
  accumulatedDomainResults?: Record<string, unknown>;
  /** Rule outcomes accumulated so far and passed forward to later layers. */
  accumulatedRuleResults?: Record<string, unknown>;
}

/** decisionId → its DecisionResult for a given execution — used to overlay the DMN graph. */
export type SimOverlayMap = Record<string, DecisionResult>;

// ─── DMN graph (React-Flow-ready shape) ────────────────────────────────────

export type DmnNodeType = "inputData" | "decision";

export interface DmnNodePosition {
  x: number;
  y: number;
}

export interface DmnNodeData {
  label: string;
  decisionId?: string;
  expression?: string;
}

export interface DmnNode {
  id: string;
  type: DmnNodeType;
  position: DmnNodePosition;
  data: DmnNodeData;
}

export type DmnEdgeType = "informationRequirement" | "authorityRequirement";

export interface DmnEdge {
  id: string;
  source: string;
  target: string;
  type: DmnEdgeType;
}

export interface DmnGraph {
  nodes: DmnNode[];
  edges: DmnEdge[];
}

// ─── Parsed DMN preview (upload modal) ─────────────────────────────────────

export interface DmnParsedPreview {
  inputs: string[];
  decisions: string[];
}
