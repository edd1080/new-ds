import type { CSSProperties, ReactNode } from "react";

export type ChipTone = "ok" | "warn" | "err" | "info" | "brand" | undefined;
export type ChipSize = "default" | "sm";

export interface ChipProps {
  tone?: ChipTone;
  size?: ChipSize;
  children: ReactNode;
  style?: CSSProperties;
}

/** .chip — border-radius: pill. */
export function Chip({ tone, size = "default", children, style }: ChipProps) {
  return (
    <span className={`chip ${tone ?? ""} ${size === "sm" ? "sm" : ""}`} style={style}>
      {children}
    </span>
  );
}
