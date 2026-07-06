import { useState } from "react";
import { Button } from "../ui/Button";
import { Icon } from "../../icons/Icon";
import type { SimExecution } from "./types";

export interface SimBottomPanelProps {
  execution: SimExecution;
}

/** .sim-bottom-panel — drawer footer w/ Entradas / Resultados de decisión / Mensajes columns + raw JSON toggle. */
export function SimBottomPanel({ execution }: SimBottomPanelProps) {
  const [minimized, setMinimized] = useState(false);
  const [rawOpen, setRawOpen] = useState(false);

  const inputs = Object.entries(execution.request || {});
  const decisions = execution.decisionResults || [];
  const messages = decisions.flatMap((d) => d.messages.map((m) => ({ ...m, decisionName: d.decisionName })));

  return (
    <div className="sim-bottom-panel">
      <div className="sim-bottom-bar">
        <span className="lbl">DETALLES DE EJECUCIÓN</span>
        <Button variant="ghost" size="sm" onClick={() => setMinimized((m) => !m)}>
          {minimized ? <Icon.chevron style={{ transform: "rotate(-90deg)" }} /> : <Icon.chevronDown />}
          {minimized ? "Expandir" : "Minimizar"}
        </Button>
      </div>
      {!minimized && (
        <>
          <div className="sim-bottom-cols">
            {/* Entradas */}
            <div className="sim-bottom-col">
              <div className="sim-bottom-col-head">Entradas</div>
              {inputs.length === 0 ? (
                <div style={{ padding: 12, color: "var(--ink-4)", fontSize: 12, fontFamily: "var(--font-mono)" }}>Sin entradas.</div>
              ) : (
                <table className="sim-detail-table">
                  <tbody>
                    {inputs.map(([k, v]) => (
                      <tr key={k}>
                        <td>{k}</td>
                        <td>{JSON.stringify(v)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Decisiones */}
            <div className="sim-bottom-col">
              <div className="sim-bottom-col-head">Resultados de decisión</div>
              <table className="sim-detail-table">
                <tbody>
                  {decisions.map((d) => (
                    <tr key={d.decisionId}>
                      <td>
                        <div>{d.decisionName}</div>
                        <div style={{ fontSize: 10, color: "var(--ink-5)", fontFamily: "var(--font-mono)" }}>{d.decisionId}</div>
                      </td>
                      <td>
                        <span className={`chip ${d.status === "SUCCEEDED" ? "ok" : d.status === "FAILED" ? "err" : ""}`} style={{ fontSize: 9 }}>
                          <span className={`dot ${d.status === "SUCCEEDED" ? "ok" : d.status === "FAILED" ? "err" : ""}`} />
                          {d.status}
                        </span>
                        <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 120 }}>
                          {d.result != null ? String(d.result) : "—"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mensajes */}
            <div className="sim-bottom-col">
              <div className={`sim-bottom-col-head ${messages.length > 0 ? "err" : ""}`}>Mensajes {messages.length > 0 ? `(${messages.length})` : ""}</div>
              {messages.length === 0 ? (
                <div style={{ padding: 12, color: "var(--ink-4)", fontSize: 12, fontFamily: "var(--font-mono)" }}>Sin mensajes.</div>
              ) : (
                <table className="sim-detail-table">
                  <tbody>
                    {messages.map((m, i) => (
                      <tr key={i}>
                        <td style={{ color: m.level === "ERROR" ? "var(--err)" : "var(--warn)" }}>{m.level}</td>
                        <td>
                          <div style={{ fontSize: 10, color: "var(--ink-4)", fontFamily: "var(--font-mono)" }}>{m.decisionName}</div>
                          <div>{m.text}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Raw JSON */}
          <button className="sim-raw-toggle" onClick={() => setRawOpen((o) => !o)}>
            {rawOpen ? <Icon.chevronDown width={10} height={10} /> : <Icon.chevron width={10} height={10} />}
            Documento de ejecución crudo
          </button>
          {rawOpen && <pre className="sim-raw-pre">{JSON.stringify(execution, null, 2)}</pre>}
        </>
      )}
    </div>
  );
}
