import { Chip } from "../ui/Chip";
import { SIM_LAYER_LABEL, simLayerTone, type SimLayerStats } from "./utils";

export interface SimLayersCardProps {
  layers: SimLayerStats[];
}

/**
 * .sim-layers-card — summary of the models/layers that compose a multi-model
 * simulation, in execution order (DOMAIN → RULES → EVALUATION), with each
 * model's nature (SINGLE/BUNDLE) and aggregated success rate. Only rendered
 * when a simulation's executions span more than one model.
 */
export function SimLayersCard({ layers }: SimLayersCardProps) {
  if (layers.length === 0) return null;

  return (
    <div className="sim-layers-card">
      <div className="sim-layers-head">
        <span className="label-mono">CAPAS DEL PIPELINE</span>
        <span className="sim-layers-count">{layers.length} modelos encadenados</span>
      </div>
      <div className="sim-layers-list">
        {layers.map((l, i) => (
          <div key={l.modelName} className="sim-layer-item">
            <span className="sim-layer-order">{i + 1}</span>
            <div className="sim-layer-info">
              <div className="sim-layer-name-row">
                <span className="sim-layer-name">{l.modelName}</span>
                <Chip tone={simLayerTone(l.modelLayer)}>{SIM_LAYER_LABEL[l.modelLayer]}</Chip>
                <span className="sim-layer-nature">{l.modelNature === "SINGLE" ? "lee datos crudos" : "agrega resultados previos"}</span>
              </div>
            </div>
            <div className="sim-layer-rate">
              <span className={`sim-layer-rate-value ${l.successRate === 1 ? "ok" : l.successRate === 0 ? "err" : "warn"}`}>{Math.round(l.successRate * 100)}%</span>
              <span className="sim-layer-rate-label">éxito</span>
            </div>
            {i < layers.length - 1 && <div className="sim-layer-connector" />}
          </div>
        ))}
      </div>
    </div>
  );
}
