import { Dot } from "../primitives/Dot";

export interface SimStatusBadgeProps {
  live: boolean;
}

/** .sim-status-badge — Live/Draft pill next to a model's name in the registry. */
export function SimStatusBadge({ live }: SimStatusBadgeProps) {
  return (
    <span className={`sim-status-badge ${live ? "live" : "draft"}`}>
      <Dot tone={live ? "ok" : "warn"} />
      {live ? "Live" : "Draft"}
    </span>
  );
}
