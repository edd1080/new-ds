import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  soft?: boolean;
  style?: React.CSSProperties;
}

/** .card — border line, bg surface-1, r-md. */
export function Card({ children, soft, style }: CardProps) {
  return (
    <div className={`card ${soft ? "soft" : ""}`} style={style}>
      {children}
    </div>
  );
}

export interface CardHeadProps {
  icon?: ReactNode;
  children: ReactNode;
  trailing?: ReactNode;
}

/** .card-head — mono 11px title row with optional icon + trailing meta. */
export function CardHead({ icon, children, trailing }: CardHeadProps) {
  return (
    <div className="card-head">
      {icon}
      <span>{children}</span>
      {trailing && <div style={{ marginLeft: "auto" }}>{trailing}</div>}
    </div>
  );
}
