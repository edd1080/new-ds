export interface ProgressBarProps {
  /** 0-100 */
  value: number;
  tone?: "ok" | "warn" | undefined;
}

/** .pbar — 6px height pill. Default accent fill, tone overrides to ok/warn. */
export function ProgressBar({ value, tone }: ProgressBarProps) {
  return (
    <div className={`pbar ${tone ?? ""}`}>
      <div style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
