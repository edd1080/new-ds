/**
 * Matilda 4.5 — Simulaciones DMN · Shared helpers + label maps.
 * Ported from project/v4/simulations-data.jsx and simulations-sidebar.jsx.
 */
import type { DotTone } from "../primitives/Dot";
import type { SimExecution, SimOverlayMap, SimStatus } from "./types";

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
