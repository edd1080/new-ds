import type { ReactNode } from "react";

export interface StatusbarProps {
  tenant: string;
  mapperId?: string | null;
  extra?: ReactNode;
}

/** .statusbar — 34px, mono 10px uppercase telemetry line. */
export function Statusbar({ tenant, mapperId, extra }: StatusbarProps) {
  return (
    <footer className="statusbar">
      <div className="group">
        <span className="dot ok" />
        <span>MAPPER SERVICE · ONLINE</span>
      </div>
      <div className="group">
        <span>·</span>
        <span>AGENTE IA · DISPONIBLE</span>
      </div>
      <div className="group">
        <span>·</span>
        <span>CANÓNICO · v9.0.0</span>
      </div>
      <span className="spacer" />
      {extra}
      <div className="group">
        <span>
          tenant: <span className="em">{tenant}</span>
        </span>
      </div>
      {mapperId && (
        <div className="group">
          <span>·</span>
          <span className="em">{mapperId}</span>
        </div>
      )}
      <div className="group">
        <span className="dot ok" />
        <span>RT</span>
      </div>
    </footer>
  );
}
