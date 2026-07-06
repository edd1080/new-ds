import type { ReactNode } from "react";

export interface StatCardProps {
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
  color?: string;
}

/** .stat-card — label mono 11px + value display 22px 700 + meta. */
export function StatCard({ label, value, detail, color }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="sk">{label}</div>
      <div className="sv" style={{ color: color ?? "var(--ink-1)" }}>
        {value}
      </div>
      {detail && <div className="sd">{detail}</div>}
    </div>
  );
}
