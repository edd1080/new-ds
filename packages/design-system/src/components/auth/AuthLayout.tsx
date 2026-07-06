import type { ReactNode } from "react";

export interface AuthLayoutProps {
  children: ReactNode;
}

/** .auth-root — flex row, 100vh. Wraps AuthPanel (500px) + AuthArt (flex:1). Auth-only, no Shell. */
export function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="auth-root">{children}</div>;
}
