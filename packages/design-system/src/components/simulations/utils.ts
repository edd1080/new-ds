/**
 * Matilda 4.5 — Simulaciones DMN · Shared helpers + label maps.
 * Ported from project/v4/simulations-data.jsx and simulations-sidebar.jsx.
 */
import type { DotTone } from "../primitives/Dot";
import type { DmnGraph, ModelLayer, ModelResult, SimExecution, SimOverlayMap, SimStatus } from "./types";

export const SIM_STATUS_LABEL: Record<SimStatus, string> = {
  COMPLETED: "Completada",
  RUNNING: "Ejecutando",
  FAILED: "Fallida",
  QUEUED: "En cola",
};

export const SIM_STATUS_DOT: Record<SimStatus, DotTone> = {
  COMPLETED: "ok",
  RUNNING: "run",
  FAILED: "err",
  QUEUED: "warn",
};

/** .chip tone class — "run" maps to "brand" chip styling (there's no .chip.run). */
export function simStatusChipTone(status: SimStatus): "ok" | "err" | "warn" | "brand" {
  const dot = SIM_STATUS_DOT[status];
  return dot === "run" ? "brand" : (dot as "ok" | "err" | "warn");
}

/** Relative time label ("justo ahora", "3m", "2h", "1d") from an ISO date string. */
export function simRelativeTime(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "justo ahora";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

/** First two initials of a model/space-separated name, uppercased (e.g. "Decisión de Crédito" → "DD"). */
export function simInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Execution latency in ms, or null if timestamps are missing. */
export function simExecLatency(exec: SimExecution): number | null {
  if (!exec.finishedAt || !exec.createdAt) return null;
  return new Date(exec.finishedAt).getTime() - new Date(exec.createdAt).getTime();
}

/** "58ms" below 1s, "1.20s" at/above 1s. */
export function simLatencyLabel(ms: number | null): string {
  if (ms === null) return "—";
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(2)}s`;
}

/** "✓ todas" | "2 ✓ · 1 ✗" summary of an execution's per-decision outcomes. */
export function simOutcomeLabel(exec: SimExecution): { label: string; tone: "ok" | "err" } {
  const total = exec.decisionResults.length;
  const failed = exec.decisionResults.filter((d) => d.status === "FAILED").length;
  if (failed === 0) return { label: "✓ todas", tone: "ok" };
  const ok = total - failed;
  return { label: `${ok} ✓ · ${failed} ✗`, tone: "err" };
}

/** Builds a decisionId → DecisionResult overlay map, used to color the DMN graph nodes. */
export function simBuildOverlay(execution?: SimExecution | null): SimOverlayMap {
  if (!execution) return {};
  const map: SimOverlayMap = {};
  execution.decisionResults.forEach((d) => {
    map[d.decisionId] = d;
  });
  return map;
}

/** Builds a decisionId → DecisionResult overlay map scoped to a single model/layer. */
export function simBuildLayerOverlay(model?: ModelResult | null): SimOverlayMap {
  if (!model) return {};
  const map: SimOverlayMap = {};
  model.decisionResults.forEach((d) => {
    map[d.decisionId] = d;
  });
  return map;
}

// ─── Layer helpers (multi-model / pipeline executions) ─────────────────────

export const SIM_LAYER_LABEL: Record<ModelLayer, string> = {
  DOMAIN: "Dominio",
  RULES: "Reglas",
  EVALUATION: "Evaluación",
};

/** Chip tone per layer — DOMAIN=info, RULES=accent(brand), EVALUATION=ok. */
export function simLayerTone(layer: ModelLayer): "info" | "brand" | "ok" {
  if (layer === "DOMAIN") return "info";
  if (layer === "RULES") return "brand";
  return "ok";
}

/** Whether an execution's results span more than one model (i.e. a layered pipeline). */
export function simIsLayered(exec: SimExecution): boolean {
  return (exec.modelResults?.length ?? 0) > 1;
}

/** modelResults sorted by execution order (DOMAIN → RULES → EVALUATION). */
export function simOrderedModelResults(exec: SimExecution): ModelResult[] {
  return [...(exec.modelResults ?? [])].sort((a, b) => a.order - b.order);
}

/** Looks up a specific model/layer's result by model name. */
export function simFindModelResult(exec: SimExecution, modelName: string | null): ModelResult | null {
  if (!modelName) return null;
  return exec.modelResults?.find((m) => m.modelName === modelName) ?? null;
}

export interface SimLayerStats {
  modelName: string;
  modelLayer: ModelLayer;
  modelNature: "SINGLE" | "BUNDLE";
  order: number;
  successRate: number;
  runs: number;
}

/**
 * Aggregates per-model success rate across all executions of a simulation —
 * used by the "Layers" summary card in ResultsView. Returns an empty array
 * if no execution has more than one model (i.e. the run is not layered).
 */
export function simAggregateLayerStats(executions: SimExecution[]): SimLayerStats[] {
  const byModel = new Map<string, { modelLayer: ModelLayer; modelNature: "SINGLE" | "BUNDLE"; order: number; ok: number; total: number }>();
  let maxModels = 0;
  executions.forEach((exec) => {
    const models = exec.modelResults ?? [];
    maxModels = Math.max(maxModels, models.length);
    models.forEach((m) => {
      const entry = byModel.get(m.modelName) ?? { modelLayer: m.modelLayer, modelNature: m.modelNature, order: m.order, ok: 0, total: 0 };
      entry.total += 1;
      if (m.success) entry.ok += 1;
      byModel.set(m.modelName, entry);
    });
  });
  if (maxModels <= 1) return [];
  return Array.from(byModel.entries())
    .map(([modelName, v]) => ({
      modelName,
      modelLayer: v.modelLayer,
      modelNature: v.modelNature,
      order: v.order,
      successRate: v.total > 0 ? v.ok / v.total : 0,
      runs: v.total,
    }))
    .sort((a, b) => a.order - b.order);
}

/**
 * Filters a DMN graph down to only the nodes/edges relevant to one model's
 * decisions (its decisionResults' decisionIds), plus their direct input
 * requirements. Falls back to the full graph if nothing matches (e.g. the
 * graph doesn't carry per-layer node metadata yet).
 */
export function simFilterGraphByModel(graph: DmnGraph, model: ModelResult | null): DmnGraph {
  if (!model) return graph;
  const decisionIds = new Set(model.decisionResults.map((d) => d.decisionId));
  const relevantNodeIds = new Set<string>();
  graph.nodes.forEach((n) => {
    if (n.type === "decision" && n.data.decisionId && decisionIds.has(n.data.decisionId)) relevantNodeIds.add(n.id);
  });
  if (relevantNodeIds.size === 0) return graph;
  // Include direct predecessors (inputs/decisions feeding into this layer's decisions).
  graph.edges.forEach((e) => {
    if (relevantNodeIds.has(e.target)) relevantNodeIds.add(e.source);
  });
  return {
    nodes: graph.nodes.filter((n) => relevantNodeIds.has(n.id)),
    edges: graph.edges.filter((e) => relevantNodeIds.has(e.source) && relevantNodeIds.has(e.target)),
  };
}
