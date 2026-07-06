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

export interface SimExecution {
  id: string;
  success: boolean;
  request: Record<string, unknown>;
  decisionResults: DecisionResult[];
  error: unknown;
  createdAt: string;
  finishedAt: string;
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
