import { TypeBadge } from "../ui/TypeBadge";
import { NullPolicyBadge } from "./NullPolicyBadge";
import { DomainBadge } from "./DomainBadge";
import type { MappingRule, RulePolicyV2 } from "../../types/matilda";

function MapperDestBadge({ path, onClick }: { path: string | null; onClick: () => void }) {
  if (path) {
    const segments = path.split(".");
    const display = segments.length > 2 ? segments.slice(-2).join(".") : path;
    return (
      <button
        className="dest-badge assigned"
        title={path}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <span style={{ opacity: 0.6, fontSize: 9 }}>→</span>
        {display}
      </button>
    );
  }
  return (
    <button
      className="dest-badge unassigned"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      + Asignar destino
    </button>
  );
}

export interface MappingRowProps {
  rule: MappingRule;
  policy: RulePolicyV2;
  selected: boolean;
  onSelect: (id: string) => void;
  onOpenModal: (id: string) => void;
  onRequestRemove?: (id: string) => void;
  onMoveToMatched?: (id: string) => void;
  onClearDestination?: (id: string) => void;
  /** Resolved via the canonical catalog by the caller — design-system stays data-source agnostic. */
  domainId?: string | null;
}

/** .mrow4 — one mapping rule: source path → destination badge + type/policy/domain badges + row actions. */
export function MappingRow({ rule, policy, selected, onSelect, onOpenModal, onRequestRemove, onMoveToMatched, onClearDestination, domainId }: MappingRowProps) {
  const isMatched = rule.category === "matched";
  const hasDestination = !!rule.destinationPath;
  const effectiveTransform = policy.transformationPolicy ?? rule.transformationPolicy;
  const effectiveNullPol = policy.nullPolicy ?? rule.nullPolicy ?? "REQUIRED";

  return (
    <div className={`mrow4 ${selected ? "selected" : ""}`} onClick={() => onSelect(rule.id)}>
      <span className="src-path" title={rule.sourcePath}>
        {rule.sourcePath}
      </span>

      <span className="row-arrow">→</span>

      <MapperDestBadge path={rule.destinationPath} onClick={() => onOpenModal(rule.id)} />

      <div className="mrow4-badges">
        <TypeBadge type={rule.sourceType} variant="mapper" />
        {effectiveTransform === "CODE_LOOKUP" && (
          <span className="op-badge CODE_LOOKUP" style={{ fontSize: 10 }}>
            CODE
          </span>
        )}
        <NullPolicyBadge policy={effectiveNullPol} />
        {rule.destinationPath && domainId && <DomainBadge domainId={domainId} />}
        {!isMatched && rule.unmappedReason && (
          <span className="unmapped-reason" title={rule.unmappedReason}>
            {rule.unmappedReason}
          </span>
        )}
      </div>

      <div className="mrow4-actions">
        {isMatched && (
          <button
            className="row-action-trash"
            title="Remover del mapeo"
            onClick={(e) => {
              e.stopPropagation();
              onRequestRemove?.(rule.id);
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 4h9M5.5 2.5h3M4 4l.6 7.5h4.8L10 4" />
            </svg>
          </button>
        )}
        {!isMatched && hasDestination && (
          <>
            <button
              className="row-action approve"
              onClick={(e) => {
                e.stopPropagation();
                onMoveToMatched?.(rule.id);
              }}
            >
              ✓ Mapear
            </button>
            <button
              className="row-action clear-dest"
              onClick={(e) => {
                e.stopPropagation();
                onClearDestination?.(rule.id);
              }}
            >
              ✕ Quitar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
