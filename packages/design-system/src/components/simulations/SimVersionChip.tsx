export interface SimVersionChipProps {
  active?: boolean;
  onClick?: () => void;
  children: string;
}

/** .sim-version-chip — pill version selector (v1.0.0, v1.1.0, ...). */
export function SimVersionChip({ active, onClick, children }: SimVersionChipProps) {
  return (
    <button className={`sim-version-chip ${active ? "active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}
