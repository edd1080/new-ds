import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import { Icon } from "../../icons/Icon";
import { Dot } from "../primitives/Dot";

export interface SimDrawerProps {
  /** 0-based index of the execution within its simulation, rendered as "Ítem #N". */
  execIndex: number;
  success: boolean;
  latencyMs?: number | null;
  decisionCount: number;
  onClose: () => void;
  /** Graph canvas + node detail panel area. */
  children: ReactNode;
  bottomPanel: ReactNode;
}

/** .sim-drawer — fullscreen overlay: top bar, graph area (children), bottom panel. */
export function SimDrawer({ execIndex, success, latencyMs, decisionCount, onClose, children, bottomPanel }: SimDrawerProps) {
  return (
    <div className="sim-drawer">
      <div className="sim-drawer-bar">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <Icon.chevronLeft width={12} height={12} /> Volver a resultados
        </Button>
        <div className="sep" />
        <span className="sim-drawer-item mono">Ítem #{execIndex + 1}</span>
        <span className={`chip ${success ? "ok" : "err"}`} style={{ fontSize: 10 }}>
          <Dot tone={success ? "ok" : "err"} />
          {success ? "Exitosa" : "Fallida"}
        </span>
        {latencyMs != null && (
          <span className="sim-drawer-item" style={{ fontSize: 12, color: "var(--ink-4)" }}>
            {latencyMs}ms
          </span>
        )}
        <span className="sim-drawer-item" style={{ fontSize: 12, color: "var(--ink-4)" }}>
          {decisionCount} decisiones
        </span>
        <div className="sim-drawer-spacer" />
        <Button variant="ghost" size="sm" onClick={onClose}>
          <Icon.close width={12} height={12} />
        </Button>
      </div>

      <div style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>{children}</div>

      {bottomPanel}
    </div>
  );
}
