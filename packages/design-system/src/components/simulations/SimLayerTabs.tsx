import { Chip } from "../ui/Chip";
import { Dot } from "../primitives/Dot";
import type { ModelResult } from "./types";
import { SIM_LAYER_LABEL, simLayerTone, simOrderedModelResults } from "./utils";
import type { SimExecution } from "./types";

export interface SimLayerTabsProps {
  execution: SimExecution;
  /** null = "All / Combined" view. */
  activeModelName: string | null;
  onSelect: (modelName: string | null) => void;
}

/**
 * .sim-layer-tabs — chip row to switch between layers (DOMAIN → RULES → EVALUATION)
 * of a multi-model execution, plus an "All / Combined" chip for the aggregated view.
 * Only rendered when the execution's modelResults span more than one model.
 */
export function SimLayerTabs({ execution, activeModelName, onSelect }: SimLayerTabsProps) {
  const models = simOrderedModelResults(execution);
  if (models.length <= 1) return null;

  return (
    <div className="sim-layer-tabs">
      <button className={`sim-layer-tab ${activeModelName === null ? "active" : ""}`} onClick={() => onSelect(null)}>
        <Dot tone={execution.success ? "ok" : "err"} />
        <span className="sim-layer-tab-name">Todas / Combinado</span>
      </button>
      <div className="sim-layer-tab-sep" />
      {models.map((m: ModelResult) => (
        <button key={m.modelName} className={`sim-layer-tab ${activeModelName === m.modelName ? "active" : ""}`} onClick={() => onSelect(m.modelName)}>
          <Dot tone={m.success ? "ok" : "err"} />
          <span className="sim-layer-tab-name">{m.modelName}</span>
          <Chip tone={simLayerTone(m.modelLayer)}>{SIM_LAYER_LABEL[m.modelLayer]}</Chip>
        </button>
      ))}
    </div>
  );
}
