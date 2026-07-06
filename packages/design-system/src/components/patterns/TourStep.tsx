import type { CSSProperties, ReactNode } from "react";

export interface TourStepProps {
  index: number;
  title: string;
  description: string;
  active: boolean;
  done: boolean;
  onClick: () => void;
}

/** .tour-step — sidebar rail item for a single Tour guiado step. */
export function TourStep({ index, title, description, active, done, onClick }: TourStepProps) {
  return (
    <div className={`tour-step ${active ? "on" : ""} ${done ? "done" : ""}`} onClick={onClick}>
      <div className="nub">{done ? "✓" : index + 1}</div>
      <div>
        <div className="tt">{title}</div>
        <div className="ds">{description}</div>
      </div>
    </div>
  );
}

export interface TourIntroProps {
  n: number;
  kicker: string;
  title: string;
  children: ReactNode;
}

/** .demo-intro — "PASO 0N · kicker" tag + title + body, header of every Tour stage canvas. */
export function TourIntro({ n, kicker, title, children }: TourIntroProps) {
  return (
    <div className="demo-intro">
      <span className="tag accent">
        PASO {String(n).padStart(2, "0")} · {kicker}
      </span>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

export interface DemoEmptyProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  /** Switches the dashed border to solid — used for in-progress states (e.g. "Registrando…"). */
  solid?: boolean;
  style?: CSSProperties;
}

/** .demo-empty — dashed empty-state card with icon, copy and an optional CTA. Used to gate each Tour simulation. */
export function DemoEmpty({ icon, title, description, action, solid, style }: DemoEmptyProps) {
  return (
    <div className="demo-empty" style={{ ...(solid ? { borderStyle: "solid" } : undefined), ...style }}>
      <div className="ic-wrap">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}
