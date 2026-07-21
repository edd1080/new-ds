import { Dot } from "../primitives/Dot";
import type { SimExecution } from "./types";
import { simLatencyLabel, simExecLatency, simOutcomeLabel } from "./utils";

export interface SimResultsTableProps {
  executions: SimExecution[];
  /** Header + cell for the single decision column when nothing is pinned, e.g. "DecisiónFinal". */
  decisionLabel: string;
  /** Decision names pinned as comparable columns (up to 3). Empty = single swappable column. */
  pinnedDecisions?: string[];
  /** Called when the user clicks the swappable column header to cycle to the next decision (only used when pinnedDecisions is empty). */
  onCycleDecision?: () => void;
  openExecId?: string | null;
  onRowClick: (exec: SimExecution) => void;
}

function decisionValue(ex: SimExecution, decisionName: string): string {
  const d = ex.decisionResults.find((r) => r.decisionName === decisionName);
  return d ? String(d.result ?? "—") : "—";
}

/** .sim-table — per-item results table (ítem / estado / decisión(es) / outcomes / latencia). */
export function SimResultsTable({ executions, decisionLabel, pinnedDecisions = [], onCycleDecision, openExecId, onRowClick }: SimResultsTableProps) {
  const hasPinned = pinnedDecisions.length > 0;
  const decisionCols = hasPinned ? pinnedDecisions : [decisionLabel || "Decisión"];
  const colSpan = 3 + decisionCols.length;

  return (
    <div className="sim-table-wrap">
      <div className="sim-table-inner">
        <table className="sim-table">
          <thead>
            <tr>
              <th>Ítem</th>
              <th>Estado</th>
              {decisionCols.map((col) =>
                !hasPinned && onCycleDecision ? (
                  <th key={col} className="sim-th-swap" onClick={onCycleDecision} title="Clic para rotar la decisión mostrada">
                    {col} <span className="sim-th-swap-caret">▾</span>
                  </th>
                ) : (
                  <th key={col}>{col}</th>
                )
              )}
              <th>Outcomes</th>
              <th style={{ textAlign: "right" }}>Latencia</th>
            </tr>
          </thead>
          <tbody>
            {executions.length === 0 && (
              <tr>
                <td colSpan={colSpan} style={{ textAlign: "center", color: "var(--ink-4)", padding: 20, fontFamily: "var(--font-mono)", fontSize: 12 }}>
                  Sin ítems.
                </td>
              </tr>
            )}
            {executions.map((ex, idx) => {
              const outcome = simOutcomeLabel(ex);
              const dotTone = ex.success ? "ok" : "err";
              return (
                <tr key={ex.id} className={openExecId === ex.id ? "open" : ""} onClick={() => onRowClick(ex)}>
                  <td className="sim-td-mono">#{idx + 1}</td>
                  <td>
                    <span className={`chip ${dotTone}`} style={{ fontSize: 10 }}>
                      <Dot tone={dotTone} />
                      {ex.success ? "Exitosa" : "Fallida"}
                    </span>
                  </td>
                  {decisionCols.map((col, i) => (
                    <td key={col} className="sim-td-decision" style={i === 0 ? { fontWeight: 600 } : undefined}>
                      {decisionValue(ex, col)}
                    </td>
                  ))}
                  <td className={`sim-td-outcomes ${outcome.tone === "ok" ? "all-ok" : "has-fail"}`}>{outcome.label}</td>
                  <td className="sim-td-latency" style={{ textAlign: "right" }}>
                    {simLatencyLabel(simExecLatency(ex))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
