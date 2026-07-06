import type { ReactNode } from "react";

export interface SurfaceHeaderProps {
  crumbs: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  actions?: ReactNode;
}

/** .surface-header — crumbs mono + H1 display + sub + actions (margin-left auto). */
export function SurfaceHeader({ crumbs, title, sub, actions }: SurfaceHeaderProps) {
  return (
    <div className="surface-header">
      <div>
        <div className="crumbs">{crumbs}</div>
        <h1>{title}</h1>
        {sub && <div className="sub">{sub}</div>}
      </div>
      {actions && <div className="actions">{actions}</div>}
    </div>
  );
}
