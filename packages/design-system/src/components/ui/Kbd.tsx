import type { ReactNode } from "react";

/** .kbd — keyboard shortcut hint. */
export function Kbd({ children }: { children: ReactNode }) {
  return <span className="kbd">{children}</span>;
}
