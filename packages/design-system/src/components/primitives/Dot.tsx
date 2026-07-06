export type DotTone = "ok" | "warn" | "err" | "run" | undefined;

export interface DotProps {
  tone?: DotTone;
}

/** 7px status indicator. .run pulses (m-pulse 1.4s). */
export function Dot({ tone }: DotProps) {
  return <span className={`dot ${tone ?? ""}`} />;
}
