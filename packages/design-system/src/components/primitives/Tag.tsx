import type { CSSProperties, ReactNode } from "react";

export type TagTone = "ok" | "warn" | "err" | "accent" | "info" | undefined;
export type TagSize = "default" | "sm";

export interface TagProps {
  children: ReactNode;
  tone?: TagTone;
  size?: TagSize;
  mono?: boolean;
  style?: CSSProperties;
}

/** .tag — compact technical label. */
export function Tag({ children, tone, size = "default", mono = true, style }: TagProps) {
  return (
    <span className={`tag ${tone ?? ""} ${size === "sm" ? "sm" : ""}`} style={{ fontFamily: mono ? undefined : "var(--font-sans)", ...style }}>
      {children}
    </span>
  );
}
