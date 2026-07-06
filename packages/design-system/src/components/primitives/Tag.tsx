import type { CSSProperties, ReactNode } from "react";

export type TagTone = "ok" | "warn" | "err" | "accent" | "info" | undefined;

export interface TagProps {
  children: ReactNode;
  tone?: TagTone;
  mono?: boolean;
  style?: CSSProperties;
}

/** border-radius: 3px — more compact than Chip. */
export function Tag({ children, tone, mono = true, style }: TagProps) {
  return (
    <span className={`tag ${tone ?? ""}`} style={{ fontFamily: mono ? undefined : "var(--font-sans)", ...style }}>
      {children}
    </span>
  );
}
