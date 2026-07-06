import { Dot } from "../primitives/Dot";
import type { Simulation } from "./types";
import { SIM_STATUS_DOT, SIM_STATUS_LABEL, simRelativeTime, simStatusChipTone } from "./utils";

export interface SimCardProps {
  sim: Simulation;
  active?: boolean;
  onClick?: () => void;
}

/** .sim-card — one simulation row in the history sidebar. */
export function SimCard({ sim, active, onClick }: SimCardProps) {
  const dotTone = SIM_STATUS_DOT[sim.status];
  return (
    <div className={`sim-card ${active ? "active" : ""}`} onClick={onClick}>
      <div className="sim-card-row1">
        <div className="sim-card-name">{sim.name}</div>
        <div className="sim-card-time">{simRelativeTime(sim.createdAt)}</div>
      </div>
      <div className="sim-card-desc">{sim.description || sim.id.slice(-10)}</div>
      <div className="sim-card-row3">
        <span className={`chip ${simStatusChipTone(sim.status)}`} style={{ fontSize: 10 }}>
          <Dot tone={dotTone} />
          {SIM_STATUS_LABEL[sim.status]}
        </span>
        <span className="sim-card-id">{sim.id.slice(-8)}</span>
      </div>
    </div>
  );
}
