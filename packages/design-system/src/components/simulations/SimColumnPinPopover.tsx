"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { Icon } from "../../icons/Icon";

const MAX_PINNED = 3;

export interface SimColumnPinPopoverProps {
  /** All decision names available across the executions being displayed. */
  decisionNames: string[];
  pinned: string[];
  onChange: (pinned: string[]) => void;
}

/** .sim-pin-popover — "⊞ Columns" trigger + popover to pin up to 3 decision columns in SimResultsTable. */
export function SimColumnPinPopover({ decisionNames, pinned, onChange }: SimColumnPinPopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (decisionNames.length <= 1) return null;

  const toggle = (name: string) => {
    if (pinned.includes(name)) {
      onChange(pinned.filter((p) => p !== name));
    } else if (pinned.length < MAX_PINNED) {
      onChange([...pinned, name]);
    }
  };

  return (
    <div className="sim-pin-popover-wrap" ref={ref}>
      <Button variant="ghost" size="sm" onClick={() => setOpen((o) => !o)}>
        <Icon.grid /> Columnas
      </Button>
      {open && (
        <div className="sim-pin-popover">
          <div className="sim-pin-popover-head">
            <span>Fijar columnas</span>
            {pinned.length > 0 && (
              <button className="sim-pin-reset" onClick={() => onChange([])}>
                Reiniciar
              </button>
            )}
          </div>
          <div className="sim-pin-popover-hint">{pinned.length === 0 ? `Elige hasta ${MAX_PINNED} decisiones para comparar.` : `${pinned.length} de ${MAX_PINNED} fijadas`}</div>
          <div className="sim-pin-popover-list">
            {decisionNames.map((name) => {
              const checked = pinned.includes(name);
              const disabled = !checked && pinned.length >= MAX_PINNED;
              return (
                <button key={name} className={`sim-pin-item ${checked ? "checked" : ""}`} disabled={disabled} onClick={() => toggle(name)}>
                  <span className="sim-pin-check">{checked ? "✓" : ""}</span>
                  <span className="sim-pin-name">{name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
