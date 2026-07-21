export interface DomainColor {
  background: string;
  text: string;
  border: string;
  dot: string;
}

export interface DomainDefinition {
  id: string;
  name: string;
  note?: string;
  color: DomainColor;
}

/** Official domain palette. Each value points to theme-aware tint, shade, border, and dot tokens. */
export const DOMAIN_COLORS: Record<string, DomainColor> = {
  D0: { background: "var(--domain-d0-bg)", text: "var(--domain-d0-text)", border: "var(--domain-d0-border)", dot: "var(--domain-d0-dot)" },
  D1: { background: "var(--domain-d1-bg)", text: "var(--domain-d1-text)", border: "var(--domain-d1-border)", dot: "var(--domain-d1-dot)" },
  D2: { background: "var(--domain-d2-bg)", text: "var(--domain-d2-text)", border: "var(--domain-d2-border)", dot: "var(--domain-d2-dot)" },
  D3: { background: "var(--domain-d3-bg)", text: "var(--domain-d3-text)", border: "var(--domain-d3-border)", dot: "var(--domain-d3-dot)" },
  D4: { background: "var(--domain-d4-bg)", text: "var(--domain-d4-text)", border: "var(--domain-d4-border)", dot: "var(--domain-d4-dot)" },
  D5: { background: "var(--domain-d5-bg)", text: "var(--domain-d5-text)", border: "var(--domain-d5-border)", dot: "var(--domain-d5-dot)" },
  D6: { background: "var(--domain-d6-bg)", text: "var(--domain-d6-text)", border: "var(--domain-d6-border)", dot: "var(--domain-d6-dot)" },
  D7: { background: "var(--domain-d7-bg)", text: "var(--domain-d7-text)", border: "var(--domain-d7-border)", dot: "var(--domain-d7-dot)" },
  D8: { background: "var(--domain-d8-bg)", text: "var(--domain-d8-text)", border: "var(--domain-d8-border)", dot: "var(--domain-d8-dot)" },
};

export const DOMAIN_DEFINITIONS: readonly DomainDefinition[] = [
  { id: "D0", name: "Variables varias", note: "Nombre provisional", color: DOMAIN_COLORS.D0 },
  { id: "D1", name: "Perfil del solicitante", color: DOMAIN_COLORS.D1 },
  { id: "D2", name: "Ingresos y empleo", color: DOMAIN_COLORS.D2 },
  { id: "D3", name: "Gastos y compromisos", color: DOMAIN_COLORS.D3 },
  { id: "D4", name: "Capacidad de pago", color: DOMAIN_COLORS.D4 },
  { id: "D5", name: "Historial crediticio (SIB / TUCA)", color: DOMAIN_COLORS.D5 },
  { id: "D6", name: "Score crediticio Equifax", color: DOMAIN_COLORS.D6 },
  { id: "D7", name: "Cumplimiento normativo", color: DOMAIN_COLORS.D7 },
  { id: "D8", name: "Parámetros del producto", color: DOMAIN_COLORS.D8 },
];

const LEGACY_DOMAIN_ALIASES: Record<string, string> = {
  "D-META": "D0",
  "D-PROC": "D0",
  "D-EXTRA": "D0",
  "D-PERFIL": "D1",
  "D-CRED": "D4",
  "D-BURO": "D5",
  "D-DEFAULT": "D0",
};

/** Normalizes numeric domains and maps the previous canonical family ids to D0-D8. */
export function canonicalDomainId(domainId: string): string {
  const normalized = domainId.trim().toUpperCase().replace(/_/g, "-");
  if (/^D[0-8]$/.test(normalized)) return normalized;
  const legacyId = normalized.startsWith("D-") ? normalized : `D-${normalized}`;
  return LEGACY_DOMAIN_ALIASES[legacyId] ?? "D0";
}

/** Returns the official definition for a domain id, including legacy ids. */
export function getDomainDefinition(domainId: string): DomainDefinition {
  const id = canonicalDomainId(domainId);
  return DOMAIN_DEFINITIONS.find((domain) => domain.id === id) ?? DOMAIN_DEFINITIONS[0];
}

/** Resolves a domain id to the stable, theme-aware design-system palette. */
export function getDomainColor(domainId: string): DomainColor {
  return getDomainDefinition(domainId).color;
}

/** Returns the official display name used by legends and grouped domain views. */
export function getDomainName(domainId: string): string {
  return getDomainDefinition(domainId).name;
}
