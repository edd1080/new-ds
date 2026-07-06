export interface DestBadgeProps {
  path: string | null;
  onClick?: () => void;
  shorten?: (path: string) => string;
}

/** .dest-badge.assigned (accent pill) / .dest-badge.unassigned (dashed border). */
export function DestBadge({ path, onClick, shorten }: DestBadgeProps) {
  if (!path) {
    return (
      <button type="button" className="dest-badge unassigned" onClick={onClick}>
        + Asignar destino
      </button>
    );
  }
  return (
    <button type="button" className="dest-badge assigned" title={path} onClick={onClick}>
      {shorten ? shorten(path) : path}
    </button>
  );
}
