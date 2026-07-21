import { getDomainColor, getDomainDefinition } from "../../domainColors";

export interface DomainBadgeProps {
  /** Domain id, including official D0-D8 ids or legacy canonical ids. */
  domainId: string;
  size?: "default" | "sm";
}

/** Filled domain indicator. The accessible label and title expose the domain name without adding a visual chip. */
export function DomainBadge({ domainId, size = "sm" }: DomainBadgeProps) {
  const color = getDomainColor(domainId);
  const definition = getDomainDefinition(domainId);

  return (
    <span
      className={`domain-badge ${size === "sm" ? "sm" : ""}`}
      role="img"
      aria-label={`${definition.id}: ${definition.name}`}
      title={`${definition.id}: ${definition.name}`}
      style={{
        display: "inline-block",
        width: 12,
        height: 12,
        minWidth: 12,
        padding: 0,
        aspectRatio: "1 / 1",
        borderRadius: "50%",
        border: "none",
        boxSizing: "border-box",
        lineHeight: 0,
        background: color.dot,
        boxShadow: `0 0 10px color-mix(in srgb, ${color.dot} 42%, transparent)`,
      }}
    />
  );
}
