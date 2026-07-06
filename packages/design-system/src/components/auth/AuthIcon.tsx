import type { ReactNode } from "react";

export interface AuthIconProps {
  children: ReactNode;
  ok?: boolean;
}

/** .auth-icon (+ .ok variant) — 58px decorative icon card above a headline. */
export function AuthIcon({ children, ok }: AuthIconProps) {
  return <div className={`auth-icon${ok ? " ok" : ""}`}>{children}</div>;
}
