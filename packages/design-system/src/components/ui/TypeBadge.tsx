import type { SourceType } from "../../types/matilda";

const LABELS: Record<SourceType, string> = {
  STR: "Texto",
  INT: "Entero",
  NUM: "Numérico",
  BOOL: "Booleano",
  OBJ: "Objeto",
  ARR: "Array",
  NULL: "Nulo",
};

/** Mapper Editor uses slightly different labels (project/v4/mapper-rules.jsx TYPE_LABELS). */
const MAPPER_LABELS: Record<SourceType, string> = {
  STR: "Texto",
  INT: "Numérico",
  NUM: "Numérico",
  BOOL: "Sí/No",
  OBJ: "Objeto",
  ARR: "Lista",
  NULL: "Vacío",
};

export interface TypeBadgeProps {
  type: SourceType;
  /** Show the short code (STR) instead of the localized label (Texto). */
  short?: boolean;
  /** Use the Mapper Editor's label set instead of the default one. */
  variant?: "default" | "mapper";
}

/**
 * .type-badge.STR/.INT/.NUM/.BOOL/.OBJ/.ARR/.NULL
 * Colors are hardcoded per type — a documented exception (cursor_handoff/AGENTS.md §2).
 */
export function TypeBadge({ type, short, variant = "default" }: TypeBadgeProps) {
  const labels = variant === "mapper" ? MAPPER_LABELS : LABELS;
  return <span className={`type-badge ${type}`}>{short ? type : labels[type]}</span>;
}
