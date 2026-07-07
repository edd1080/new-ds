import type { ReactNode } from "react";

export interface StatCardProps {
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
  color?: string;
  /** Compact variant — smaller padding, used in summary rows. */
  compact?: boolean;
  /** Tone shortcut — sets color to var(--{tone}). Overridden by `color`. */
  tone?: "ok" | "warn" | "err" | "info" | "accent";
}

/** .stat-card — label mono 11px + value display 22px 700 + meta. */
export function StatCard({ label, value, detail, color, compact, tone }: StatCardProps) {
  const resolvedColor = color ?? (tone ? `var(--${tone})` : "var(--ink-1)");
  return (
    <div className={`stat-card ${compact ? "compact" : ""}`}>
      <div className="sk">{label}</div>
      <div className="sv" style={{ color: resolvedColor }}>
        {value}
      </div>
      {detail && <div className="sd">{detail}</div>}
    </div>
  );
}
