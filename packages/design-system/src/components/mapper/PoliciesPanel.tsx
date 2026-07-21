"use client";

import { useState } from "react";
import { Icon } from "../../icons/Icon";
import { TypeBadge } from "../ui/TypeBadge";
import { DomainBadge } from "./DomainBadge";
import { SourcePickerModal } from "./SourcePickerModal";
import type { MappingRule, RulePolicyV2, CanonicalCatalogItem, TransformPolicy } from "../../types/matilda";

const TRANSFORM_POLICIES_V2: { value: TransformPolicy; label: string; desc: string }[] = [
  { value: "DIRECT", label: "DIRECT", desc: "Sin transformación. No se persiste explícitamente." },
  { value: "CODE_LOOKUP", label: "CODE_LOOKUP", desc: "Aplica una función de transformación por nombre." },
];

export interface PoliciesPanelProps {
  rule: MappingRule | null;
  policy: RulePolicyV2;
  onSetPolicy: (policy: Partial<RulePolicyV2>) => void;
  /** Resolved via the canonical catalog by the caller. */
  catalogItem?: CanonicalCatalogItem | null;
  /** Other rules' source paths, for the alternative-source picker. */
  availablePaths: string[];
  /** Opens the mapper's existing destination modal for the selected rule. */
  onAssignDestination?: () => void;
}

/** .policies-panel — right panel of the Mapper Editor. Field metadata + policies (PRD §7.5). */
export function PoliciesPanel({ rule, policy, onSetPolicy, catalogItem, availablePaths, onAssignDestination }: PoliciesPanelProps) {
  const [condKey, setCondKey] = useState("");
  const [condVal, setCondVal] = useState("");
  const [altPickerOpen, setAltPickerOpen] = useState(false);

  if (!rule) {
    return (
      <div className="policies-panel">
        <div className="policies-empty">
          <Icon.flow width={30} height={30} />
          <div className="msg">Selecciona una fila para configurar sus políticas</div>
        </div>
      </div>
    );
  }

  const transformP = policy.transformationPolicy ?? rule.transformationPolicy ?? "DIRECT";
  const defaultVal = policy.defaultValue ?? rule.defaultValue ?? "";
  const transformFn = policy.transformationFunction ?? rule.transformationFunction ?? "";
  const required = policy.required ?? false;
  const altSrc = policy.alternativeSource ?? "";
  const condVals = policy.conditionalValues ?? null;

  const set = (obj: Partial<RulePolicyV2>) => onSetPolicy(obj);

  const addCondition = () => {
    if (!condKey.trim() || !condVal.trim()) return;
    const next = { ...(condVals || {}), [condKey.trim()]: condVal.trim() };
    set({ conditionalValues: next });
    setCondKey("");
    setCondVal("");
  };

  const removeCondition = (key: string) => {
    if (!condVals) return;
    const next = { ...condVals };
    delete next[key];
    set({ conditionalValues: Object.keys(next).length > 0 ? next : null });
  };

  return (
    <div className="policies-panel">
      <div className="policies-ph">
        <div className="title">POLÍTICAS · CONFIGURACIÓN</div>
      </div>

      <div className="policies-section">
        <div className="policies-section-head">Campo seleccionado</div>
        <div className="field-info-card">
          <div className="field-info-row">
            <span className="fk">Origen</span>
            <span className="fv" style={{ color: "var(--ink-1)" }}>
              {rule.sourcePath}
            </span>
          </div>
          <div className="field-info-row">
            <span className="fk">Tipo</span>
            <TypeBadge type={rule.sourceType} variant="mapper" />
          </div>
          <div className="field-info-row field-info-destination">
            <div className="field-info-destination-label">
              <span className="fk">Destino</span>
              <button className="policy-destination-action" type="button" onClick={onAssignDestination} disabled={!onAssignDestination}>
                Asignar
              </button>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span className={`fv ${rule.destinationPath ? "" : "no-dest"}`} style={{ display: "block" }}>
                {rule.destinationPath || "(sin asignar)"}
              </span>
              {catalogItem && (
                <div style={{ marginTop: 4 }}>
                  {catalogItem.name && <div style={{ fontSize: 11, color: "var(--accent-ink)", opacity: 0.88, marginBottom: 1 }}>{catalogItem.name}</div>}
                  {catalogItem.description && <div style={{ fontSize: 10.5, color: "var(--ink-5)", lineHeight: 1.4 }}>{catalogItem.description}</div>}
                </div>
              )}
            </div>
          </div>
          {catalogItem?.domainId && (
            <div className="field-info-row">
              <span className="fk">Dominio</span>
              <DomainBadge domainId={catalogItem.domainId} size="sm" />
            </div>
          )}
        </div>

        {rule.sourceValue !== null && rule.sourceValue !== undefined && (
          <div>
            <div className="policies-section-head" style={{ marginBottom: 6 }}>
              Muestra de valor
            </div>
            <div className="value-preview">{JSON.stringify(rule.sourceValue)}</div>
          </div>
        )}

        {rule.unmappedReason && (
          <div style={{ marginTop: 10, padding: "8px 10px", background: "var(--warn-soft)", border: "1px solid var(--warn-line)", borderRadius: "var(--r-xs)", fontSize: 12, color: "var(--warn)", lineHeight: 1.5 }}>
            ⚠ {rule.unmappedReason}
          </div>
        )}
      </div>

      <div className="policies-section">
        <div className="policies-section-head">Políticas</div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => set({ required: !required })}>
            <div className={`checkbox-box ${required ? "checked" : ""}`} style={{ flexShrink: 0 }}>
              {required && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 5l2.5 2.5L8 2.5" />
                </svg>
              )}
            </div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 550, color: "var(--ink-1)" }}>Campo obligatorio</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-4)", lineHeight: 1.4 }}>El proceso falla si no se puede resolver</div>
            </div>
          </div>
          {required && (
            <div style={{ marginTop: 8, padding: "6px 10px", background: "var(--err-soft)", border: "1px solid var(--err-line)", borderRadius: "var(--r-xs)", fontSize: 11.5, color: "var(--err)" }}>
              ⚠ El mapeo fallará si el valor no se resuelve.
            </div>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 550, color: "var(--ink-2)", marginBottom: 4 }}>Valor por defecto</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginBottom: 6 }}>Se usa cuando el campo fuente es null</div>
          <input className="policy-input" placeholder="Ej: 0, false, N/A…" value={defaultVal} onChange={(e) => set({ defaultValue: e.target.value })} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 550, color: "var(--ink-2)", marginBottom: 4 }}>Fuente alternativa</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginBottom: 6 }}>Campo de respaldo si la fuente primaria devuelve null</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input className="policy-input" style={{ flex: 1, margin: 0 }} placeholder="ruta.del.campo…" value={altSrc} onChange={(e) => set({ alternativeSource: e.target.value })} />
            {altSrc && (
              <button
                style={{ flexShrink: 0, background: "none", border: "1px solid var(--line-2)", borderRadius: "var(--r-xs)", padding: "0 8px", height: 34, cursor: "pointer", color: "var(--err)", fontSize: 12 }}
                onClick={() => set({ alternativeSource: "" })}
              >
                ✕
              </button>
            )}
            <button className="btn sm ghost" style={{ flexShrink: 0, height: 34, padding: "0 10px" }} onClick={() => setAltPickerOpen(true)} title="Explorar rutas disponibles">
              ⋯
            </button>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 550, color: "var(--ink-2)", marginBottom: 4 }}>Valores condicionales</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginBottom: 8 }}>Mapa de transformación: entrada → salida</div>

          {condVals && Object.keys(condVals).length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }}>
              {Object.entries(condVals).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px", background: "var(--surface-3)", border: "1px solid var(--line)", borderRadius: "var(--r-xs)", fontSize: 11.5 }}>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-2)", flex: 1 }}>{k}</span>
                  <span style={{ color: "var(--ink-5)" }}>→</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-ink)", flex: 1 }}>{v}</span>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-4)", fontSize: 12, padding: "0 2px" }} onClick={() => removeCondition(k)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <input className="policy-input" style={{ flex: 1, margin: 0, fontSize: 11 }} placeholder="entrada" value={condKey} onChange={(e) => setCondKey(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCondition()} />
            <span style={{ color: "var(--ink-5)", fontSize: 12, flexShrink: 0 }}>→</span>
            <input className="policy-input" style={{ flex: 1, margin: 0, fontSize: 11 }} placeholder="salida" value={condVal} onChange={(e) => setCondVal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCondition()} />
            <button className="btn sm" style={{ flexShrink: 0, height: 34, padding: "0 10px" }} disabled={!condKey.trim() || !condVal.trim()} onClick={addCondition}>
              +
            </button>
          </div>
        </div>
      </div>

      <div className="policies-section">
        <div className="policies-section-head">Transformación</div>
        <div className="policy-options">
          {TRANSFORM_POLICIES_V2.map((opt) => (
            <button key={opt.value} className={`policy-opt ${transformP === opt.value ? "on" : ""}`} onClick={() => set({ transformationPolicy: opt.value })}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="policy-desc">{TRANSFORM_POLICIES_V2.find((o) => o.value === transformP)?.desc}</div>
        {transformP === "CODE_LOOKUP" && <input className="policy-input" placeholder="Nombre de la función…" value={transformFn} onChange={(e) => set({ transformationFunction: e.target.value })} />}
      </div>

      <div className="policies-section" style={{ borderBottom: "none" }}>
        <div className="policies-section-head">Serialización</div>
        <div style={{ fontSize: 12, color: "var(--ink-4)", lineHeight: 1.6 }}>
          {rule.category === "matched" ? (
            <>
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-ink)" }}>name</span> = <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>{rule.destinationPath || "(sin destino)"}</span>
            </>
          ) : (
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>additionalData.{rule.sourcePath}</span>
          )}
        </div>
      </div>

      {altPickerOpen && (
        <SourcePickerModal
          currentPath={altSrc}
          availablePaths={availablePaths}
          onConfirm={(p) => {
            set({ alternativeSource: p });
            setAltPickerOpen(false);
          }}
          onClose={() => setAltPickerOpen(false)}
        />
      )}
    </div>
  );
}
