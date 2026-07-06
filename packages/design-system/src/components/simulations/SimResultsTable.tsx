import { Dot } from "../primitives/Dot";
import type { SimExecution } from "./types";
import { simLatencyLabel, simExecLatency, simOutcomeLabel } from "./utils";

export interface SimResultsTableProps {
  executions: SimExecution[];
  /** Header + cell for the primary decision column, e.g. "DecisiónFinal". */
  decisionLabel: string;
  openExecId?: string | null;
  onRowClick: (exec: SimExecution) => void;
}

/** .sim-table — per-item results table (ítem / estado / decisión / outcomes / latencia). */
export function SimResultsTable({ executions, decisionLabel, openExecId, onRowClick }: SimResultsTableProps) {
  return (
    <div className="sim-table-wrap">
      <div className="sim-table-inner">
        <table className="sim-table">
          <thead>
            <tr>
              <th>Ítem</th>
              <th>Estado</th>
              <th>{decisionLabel || "Decisión"}</th>
              <th>Outcomes</th>
              <th>Latencia</th>
            </tr>
          </thead>
          <tbody>
            {executions.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", color: "var(--ink-4)", padding: 20, fontFamily: "var(--font-mono)", fontSize: 12 }}>
                  Sin ítems.
                </td>
              </tr>
            )}
            {executions.map((ex, idx) => {
              const outcome = simOutcomeLabel(ex);
              const primaryDecision = ex.decisionResults[0];
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
                  <td className="sim-td-decision">{primaryDecision ? String(primaryDecision.result ?? "—") : "—"}</td>
                  <td className={`sim-td-outcomes ${outcome.tone === "ok" ? "all-ok" : "has-fail"}`}>{outcome.label}</td>
                  <td className="sim-td-latency">{simLatencyLabel(simExecLatency(ex))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
