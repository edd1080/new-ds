import type { ReactNode } from "react";
import { MatildaMark } from "../primitives/MatildaMark";
import { AuthFooter } from "./AuthFooter";

export interface AuthPanelProps {
  children: ReactNode;
}

/** .auth-panel — 500px scrollable form column: brand header + centered form-wrap + footer. */
export function AuthPanel({ children }: AuthPanelProps) {
  return (
    <div className="auth-panel">
      <div className="auth-brand">
        <MatildaMark size={22} />
        <span className="wm">matilda</span>
      </div>
      <div className="auth-form-wrap">{children}</div>
      <AuthFooter />
    </div>
  );
}
