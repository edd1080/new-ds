import { simInitials } from "./utils";

export interface SimModelCardProps {
  modelName: string;
  modelDescription: string;
  active?: boolean;
  onClick?: () => void;
}

/** .sim-model-card — selectable model tile (initials + name + desc), config view. */
export function SimModelCard({ modelName, modelDescription, active, onClick }: SimModelCardProps) {
  return (
    <div className={`sim-model-card ${active ? "active" : ""}`} onClick={onClick}>
      <div className="sim-model-initials">{simInitials(modelName)}</div>
      <div className="sim-model-info">
        <div className="sim-model-name">{modelName}</div>
        <div className="sim-model-desc">{modelDescription}</div>
      </div>
    </div>
  );
}
