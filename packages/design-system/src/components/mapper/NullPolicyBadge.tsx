import type { NullPolicy } from "../../types/matilda";

const STYLES: Record<NullPolicy, { bg: string; text: string; border: string }> = {
  REQUIRED: { bg: "var(--err-soft)", text: "var(--err)", border: "var(--err-line)" },
  SET_NULL: { bg: "var(--surface-3)", text: "var(--ink-4)", border: "var(--line-2)" },
  USE_DEFAULT: { bg: "var(--warn-soft)", text: "var(--warn)", border: "var(--warn-line)" },
};
const SHORT: Record<NullPolicy, string> = { REQUIRED: "REQ", SET_NULL: "NULL", USE_DEFAULT: "DEF" };

export interface NullPolicyBadgeProps {
  policy: NullPolicy;
}

/** Inline badge in MappingRow showing the active null policy (REQ/NULL/DEF). PRD §5.3. */
export function NullPolicyBadge({ policy }: NullPolicyBadgeProps) {
  const col = STYLES[policy] ?? STYLES.REQUIRED;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 9.5,
        fontWeight: 600,
        padding: "1.5px 5px",
        borderRadius: 3,
        flexShrink: 0,
        background: col.bg,
        color: col.text,
        border: `1px solid ${col.border}`,
      }}
    >
      {SHORT[policy] ?? policy}
    </span>
  );
}
