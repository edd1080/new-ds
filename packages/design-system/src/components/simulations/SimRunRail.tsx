import { Button } from "../ui/Button";
import { Icon } from "../../icons/Icon";

export interface SimRunRailProps {
  modelName?: string;
  versionName?: string;
  datasetTitle?: string;
  execCount: number;
  estSeconds?: string | null;
  canRun: boolean;
  submitting?: boolean;
  onRun: () => void;
}

/** .sim-run-rail — sticky "resumen de ejecución" panel, config view. */
export function SimRunRail({ modelName, versionName, datasetTitle, execCount, estSeconds, canRun, submitting, onRun }: SimRunRailProps) {
  return (
    <div className="sim-run-rail">
      <div className="sim-config-label" style={{ marginBottom: 12 }}>
        RESUMEN DE EJECUCIÓN
      </div>
      <div className="sim-rail-row">
        <span className="sim-rail-key">Modelo</span>
        <span className="sim-rail-val">{modelName || "—"}</span>
      </div>
      <div className="sim-rail-row">
        <span className="sim-rail-key">Versión</span>
        <span className="sim-rail-val">{versionName || "—"}</span>
      </div>
      <div className="sim-rail-row">
        <span className="sim-rail-key">Dataset</span>
        <span className="sim-rail-val">{datasetTitle || "—"}</span>
      </div>

      <div style={{ margin: "14px 0 6px", textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--ink-4)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>Ejecuciones</div>
        <div className="sim-rail-exec">{execCount || "—"}</div>
      </div>
      {estSeconds && (
        <div style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-4)", marginBottom: 14 }}>Est. duración: ~{estSeconds}s</div>
      )}

      <Button variant="primary" block disabled={!canRun} onClick={onRun} style={{ marginBottom: 8 }}>
        <Icon.play /> {submitting ? "Iniciando…" : "Ejecutar simulación"}
      </Button>
      <div className="sim-rail-hint">{!canRun && !submitting ? "Seleccioná modelo, versión y dataset para continuar." : "Corre contra el endpoint documentado del servicio."}</div>
    </div>
  );
}
