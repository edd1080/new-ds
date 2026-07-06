import { Button } from "../ui/Button";
import { Icon } from "../../icons/Icon";
import { Dot } from "../primitives/Dot";
import type { DecisionResult, DmnNode } from "./types";

const TYPE_LABEL: Record<DmnNode["type"], string> = { decision: "Decisión", inputData: "Input data" };

export interface SimNodeDetailPanelProps {
  node: DmnNode;
  overlay?: DecisionResult;
  /** value of this node's field on the execution's request payload, if it's an input node. */
  inputValue?: unknown;
  onClose: () => void;
}

/** .sim-node-panel — floating detail card for the selected DMN node, top-right of the canvas. */
export function SimNodeDetailPanel({ node, overlay, inputValue, onClose }: SimNodeDetailPanelProps) {
  return (
    <div className="sim-node-panel">
      <div className="sim-node-panel-head">
        <div>
          <div className="type">{TYPE_LABEL[node.type] || node.type}</div>
          <div className="title">{node.data.label}</div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <Icon.close width={12} height={12} />
        </Button>
      </div>
      <div className="sim-node-panel-body">
        {overlay && (
          <div className="sim-panel-row">
            <div className="sim-panel-lbl">Estado</div>
            <span className={`chip ${overlay.status === "SUCCEEDED" ? "ok" : overlay.status === "FAILED" ? "err" : ""}`} style={{ fontSize: 10 }}>
              <Dot tone={overlay.status === "SUCCEEDED" ? "ok" : overlay.status === "FAILED" ? "err" : undefined} />
              {overlay.status}
            </span>
          </div>
        )}
        {inputValue !== undefined && (
          <div className="sim-panel-row">
            <div className="sim-panel-lbl">Valor de entrada</div>
            <div className="sim-panel-val">{JSON.stringify(inputValue)}</div>
          </div>
        )}
        {node.data.expression && (
          <div className="sim-panel-row">
            <div className="sim-panel-lbl">Expresión</div>
            <div className="sim-panel-val">{node.data.expression}</div>
          </div>
        )}
        {overlay?.result != null && (
          <div className="sim-panel-row">
            <div className="sim-panel-lbl">Resultado</div>
            <div className="sim-panel-val">{JSON.stringify(overlay.result, null, 2)}</div>
          </div>
        )}
        {overlay?.messages && overlay.messages.length > 0 && (
          <div className="sim-panel-row">
            <div className="sim-panel-lbl">Mensajes ({overlay.messages.length})</div>
            {overlay.messages.map((m, i) => (
              <div key={i} className="sim-panel-val" style={{ color: m.level === "ERROR" ? "var(--err)" : "var(--warn)" }}>
                [{m.level}] {m.text}
              </div>
            ))}
          </div>
        )}
        {!overlay && node.type !== "inputData" && <div style={{ fontSize: 12, color: "var(--ink-4)", fontFamily: "var(--font-mono)" }}>Sin detalles de ejecución para este nodo.</div>}
      </div>
    </div>
  );
}
