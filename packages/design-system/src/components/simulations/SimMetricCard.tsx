import type { ReactNode } from "react";

export interface SimMetricCardProps {
  label: string;
  value: ReactNode;
  tone?: "ok" | "err" | "accent";
  /** e.g. "82%" — rendered muted, right after the value. */
  pct?: string;
  sub: ReactNode;
}

/** .sim-metric-card — one KPI tile in the results metrics grid. */
export function SimMetricCard({ label, value, tone, pct, sub }: SimMetricCardProps) {
  return (
    <div className="sim-metric-card">
      <div className="sk">{label}</div>
      <div className={`sv ${tone ?? ""}`}>
        {value}
        {pct && <span className="sim-pct"> {pct}</span>}
      </div>
      <div className="sd">{sub}</div>
    </div>
  );
}
