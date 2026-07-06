"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "../../icons/Icon";
import { Dot } from "../primitives/Dot";

export type CapacityState = "ok" | "warn" | "err";

export interface CapacityChip {
  label: string;
  state: "ok" | "warn" | "missing";
}

export interface CapacityCardProps {
  name: string;
  state: CapacityState;
  chips: CapacityChip[];
  icon?: ReactNode;
  desc?: string;
  /** When provided (with pathsMissing), renders a "Ver detalle técnico" toggle. */
  pathsMapped?: string[];
  pathsMissing?: string[];
}

const STATE_LABEL: Record<CapacityState, string> = { ok: "Listo", warn: "Cobertura parcial", err: "Problema a resolver" };
const CHIP_ICON: Record<CapacityChip["state"], string> = { ok: "✓ ", missing: "⛔ ", warn: "⚠ " };

/** .capacity-card — icon + name + status + chips of sub-capabilities, with optional expandable path detail. */
export function CapacityCard({ name, state, chips, icon, desc, pathsMapped, pathsMissing }: CapacityCardProps) {
  const [open, setOpen] = useState(false);
  const hasDetail = (pathsMapped && pathsMapped.length > 0) || (pathsMissing && pathsMissing.length > 0);

  return (
    <div className={`capacity-card ${state}`} style={{ minWidth: 220 }}>
      <div className="cap-card-top">
        <div className={`cap-icon ${state}`}>{icon ?? <Icon.person />}</div>
        <div style={{ flex: 1 }}>
          <div className="cap-name">{name}</div>
          {desc && <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}>{desc}</div>}
        </div>
        <div className={`cap-status ${state}`}>
          <Dot tone={state === "ok" ? "ok" : state === "err" ? "err" : "warn"} />
          {STATE_LABEL[state]}
        </div>
      </div>
      <div className="cap-chips">
        {chips.map((c, i) => (
          <span key={i} className={`cap-chip ${c.state}`}>
            {CHIP_ICON[c.state]}
            {c.label}
          </span>
        ))}
      </div>

      {hasDetail && (
        <>
          <button className="cap-detail-toggle" onClick={() => setOpen((o) => !o)}>
            {open ? "▾ Ocultar detalle técnico" : "▸ Ver detalle técnico"}
          </button>
          {open && (
            <div className="cap-detail-panel">
              {pathsMapped?.map((p, i) => (
                <div key={`m${i}`} className="cap-detail-path ok">
                  <span>✓</span>
                  <span>{p}</span>
                </div>
              ))}
              {pathsMissing?.map((p, i) => (
                <div key={`x${i}`} className="cap-detail-path miss">
                  <span>⛔</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
