import { Dot } from "../primitives/Dot";
import type { ProjectStatus } from "../../types/matilda";

type RealStatus = Exclude<ProjectStatus, "notFound">;

const META: Record<RealStatus, { label: string; dot: "ok" | "warn" | "run" }> = {
  published: { label: "Publicado", dot: "ok" },
  draft: { label: "Borrador", dot: "warn" },
  analysis: { label: "En análisis", dot: "run" },
};

export interface StatusPillProps {
  status: RealStatus;
}

/** .status-pill.published/.draft/.analysis */
export function StatusPill({ status }: StatusPillProps) {
  const m = META[status];
  return (
    <span className={`status-pill ${status}`}>
      <Dot tone={m.dot} />
      {m.label}
    </span>
  );
}
