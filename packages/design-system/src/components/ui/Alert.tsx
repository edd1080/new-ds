import type { ReactNode } from "react";
import { Dot } from "../primitives/Dot";

export type AlertTone = "ok" | "warn" | "err" | "info";

export interface AlertProps {
  tone: AlertTone;
  title: ReactNode;
  desc?: ReactNode;
}

const DOT_TONE: Record<AlertTone, "ok" | "warn" | "err" | undefined> = { ok: "ok", warn: "warn", err: "err", info: undefined };

/** .alert — 4 tones: ok/warn/err/info. */
export function Alert({ tone, title, desc }: AlertProps) {
  return (
    <div className={`alert ${tone}`}>
      <div className="alert-icon">
        <Dot tone={DOT_TONE[tone]} />
      </div>
      <div className="alert-body">
        <div className="alert-title">{title}</div>
        {desc && <div className="alert-desc">{desc}</div>}
      </div>
    </div>
  );
}
