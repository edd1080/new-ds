import { Fragment } from "react";

export interface ExplainerTrackItem {
  /** Short label shown under the node (e.g. "El problema", "Subir JSON"). */
  label: string;
  state: "done" | "active" | "pending";
}

export interface ExplainerTrackProps {
  items: ExplainerTrackItem[];
  onSelect: (index: number) => void;
}

/** .xpl-track — 5-stage horizontal track with connecting segments, used by the Explainer surface. */
export function ExplainerTrack({ items, onSelect }: ExplainerTrackProps) {
  return (
    <div className="xpl-track">
      {items.map((item, k) => (
        <Fragment key={k}>
          {k > 0 && <div className={`seg ${items[k - 1].state !== "pending" ? "lit" : ""}`} />}
          <div className={`node ${item.state === "active" ? "on" : item.state === "done" ? "done" : ""}`} onClick={() => onSelect(k)}>
            <div className="ring">{item.state === "done" ? "✓" : k + 1}</div>
            <div className="lb">{item.label}</div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
