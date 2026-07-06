export interface DomainBadgeProps {
  /** Full domain id, e.g. "D-PERFIL" — the "D-" prefix is stripped for display. */
  domainId: string;
}

/** Inline badge in MappingRow resolving the business domain of the assigned destination. PRD §19.3. */
export function DomainBadge({ domainId }: DomainBadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 9.5,
        padding: "1.5px 5px",
        borderRadius: 3,
        flexShrink: 0,
        background: "var(--accent-soft)",
        color: "var(--accent-ink)",
        border: "1px solid var(--accent-line)",
      }}
    >
      {domainId.replace("D-", "")}
    </span>
  );
}
