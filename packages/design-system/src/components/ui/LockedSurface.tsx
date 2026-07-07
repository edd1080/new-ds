import type { ReactNode } from "react";
import { Icon } from "../../icons/Icon";
import { Button } from "./Button";

export interface PrereqStep {
  label: string;
  state: "done" | "now" | "pending";
}

export interface LockedSurfaceProps {
  icon?: ReactNode;
  heading: ReactNode;
  body: ReactNode;
  cta: string;
  onCta: () => void;
  secondary?: string;
  onSecondary?: () => void;
  steps?: PrereqStep[];
}

/** .surf-empty + .ic-wrap.locked + .prereq — empty/locked surface pattern. */
export function LockedSurface({ icon, heading, body, cta, onCta, secondary, onSecondary, steps }: LockedSurfaceProps) {
  return (
    <div className="surf-empty">
      <div className="ic-wrap locked">{icon ?? <Icon.flow style={{ width: 28, height: 28 }} />}</div>
      <h2>{heading}</h2>
      <p>{body}</p>
      <div className="actions">
        {secondary && (
          <Button size="lg" onClick={onSecondary}>
            {secondary}
          </Button>
        )}
        <Button variant="primary" size="lg" onClick={onCta}>
          {cta} <Icon.arrow />
        </Button>
      </div>
      {steps && (
        <div className="prereq">
          {steps.map((st, i) => (
            <div key={i} className={`step ${st.state}`}>
              <span className="bx">{st.state === "done" ? "✓" : i + 1}</span>
              <span className="lb">{st.label}</span>
              {st.state === "now" && <span className="go">empieza aquí</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
