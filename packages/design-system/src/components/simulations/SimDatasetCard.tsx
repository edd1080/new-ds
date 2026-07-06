import type { ReactNode } from "react";

export interface SimDatasetCardProps {
  title: string;
  description: string;
  filename?: string;
  itemCount: number;
  active?: boolean;
  onClick?: () => void;
  trailing?: ReactNode;
}

/** .sim-dataset-card — radio-style selectable dataset row w/ item count, config view. */
export function SimDatasetCard({ title, description, filename, itemCount, active, onClick, trailing }: SimDatasetCardProps) {
  return (
    <div className={`sim-dataset-card ${active ? "active" : ""}`} onClick={onClick}>
      <div className={`sim-radio ${active ? "checked" : ""}`} />
      <div className="sim-dataset-info">
        <div className="sim-dataset-title">
          {title}
          {filename && (
            <span className="chip" style={{ fontSize: 9 }}>
              {filename}
            </span>
          )}
        </div>
        <div className="sim-dataset-desc">{description}</div>
      </div>
      <div className="sim-dataset-count">
        <div className="n">{itemCount}</div>
        <div className="l">ítems</div>
      </div>
      {trailing}
    </div>
  );
}
