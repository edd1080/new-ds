import type { ReactNode } from "react";

export type ChipTone = "ok" | "warn" | "err" | "info" | "brand" | undefined;

export interface ChipProps {
  tone?: ChipTone;
  children: ReactNode;
  style?: React.CSSProperties;
}

/** .chip — border-radius: pill. */
export function Chip({ tone, children, style }: ChipProps) {
  return (
    <span className={`chip ${tone ?? ""}`} style={style}>
      {children}
    </span>
  );
}
