import type { ReactNode } from "react";

export interface SimFilterChipProps {
  active?: boolean;
  count?: number;
  onClick?: () => void;
  children: ReactNode;
}

/** .sim-filter-chip — pill filter w/ mono count badge (sidebar + models toolbar). */
export function SimFilterChip({ active, count, onClick, children }: SimFilterChipProps) {
  return (
    <button className={`sim-filter-chip ${active ? "active" : ""}`} onClick={onClick}>
      {children}
      {count !== undefined && <span style={{ fontFamily: "var(--font-mono)", fontSize: 9 }}>{count}</span>}
    </button>
  );
}

export interface SimRowFilterProps {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

/** .sim-row-filter — compact pill filter, results table (Todas/Exitosas/Fallidas). */
export function SimRowFilter({ active, onClick, children }: SimRowFilterProps) {
  return (
    <button className={`sim-row-filter ${active ? "active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}
