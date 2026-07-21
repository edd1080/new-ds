import { useMemo, useState } from "react";
import { Icon } from "../../icons/Icon";
import { TypeBadge } from "../ui/TypeBadge";
import { DomainBadge } from "../mapper/DomainBadge";
import { DomainLegend } from "./DomainLegend";
import { getDomainColor, getDomainName } from "../../domainColors";
import type { MappingRule } from "../../types/matilda";

/** Minimal shape this panel needs from a canonical-catalog lookup — kept decoupled from any concrete catalog data source. */
export interface DomainPanelCatalogItem {
  domainId?: string | null;
}

export interface DomainPanelProps {
  /** Mapping rules to review. Only rules with category "matched" are grouped/shown. */
  rules: MappingRule[];
  /** Resolves a canonical destination path to its domain grouping (e.g. from CANONICAL_CATALOG). */
  getCatalogItem: (path: string) => DomainPanelCatalogItem | null | undefined;
}

interface DomainGroup {
  domainId: string | null;
  name: string;
  rules: MappingRule[];
}

/**
 * .dom-panel — Domain Review Panel (PRD §7.7). Groups matched mapping rules by canonical
 * domain family, with a collapsible header (progress bar + count/%) and an expandable
 * sub-table of rules with policy badges. Ported from project/v4/domain-panel.jsx.
 *
 * Also referenced from the Mapper Editor's coverage review step — kept generic (no
 * dependency on any specific app's mock data) so it can be imported from there too.
 */
export function DomainPanel({ rules, getCatalogItem }: DomainPanelProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const matchedRules = useMemo(() => rules.filter((r) => r.category === "matched"), [rules]);

  const groups = useMemo<DomainGroup[]>(() => {
    const map: Record<string, DomainGroup> = {};
    matchedRules.forEach((rule) => {
      const item = rule.destinationPath ? getCatalogItem(rule.destinationPath) : null;
      const key = item?.domainId || "null";
      const name = key === "null" ? "Sin dominio" : getDomainName(key);
      if (!map[key]) map[key] = { domainId: item?.domainId ?? null, name, rules: [] };
      map[key].rules.push(rule);
    });
    return Object.values(map).sort((a, b) => {
      if (a.domainId === null) return 1;
      if (b.domainId === null) return -1;
      return a.name.localeCompare(b.name);
    });
  }, [matchedRules, getCatalogItem]);

  const withDomain = useMemo(
    () => matchedRules.filter((r) => !!(r.destinationPath && getCatalogItem(r.destinationPath)?.domainId)),
    [matchedRules, getCatalogItem]
  );
  const maxCount = Math.max(...groups.map((g) => g.rules.length), 1);
  const uniqueDomains = groups.filter((g) => g.domainId).length;

  const toggleAll = (open: boolean) => {
    const next: Record<string, boolean> = {};
    groups.forEach((g) => {
      next[g.domainId ?? "null"] = open;
    });
    setExpanded(next);
  };

  if (matchedRules.length === 0) {
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: "20px var(--pad-surface)" }}>
        <DomainLegend />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: "var(--ink-4)", padding: 40 }}>
          <Icon.data style={{ width: 28, height: 28, opacity: 0.25 }} />
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, textAlign: "center" }}>No hay reglas mapeadas para revisar</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px var(--pad-surface)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 5, color: "var(--ink-1)" }}>Cobertura de dominios</h2>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-4)" }}>
            {withDomain.length} de {matchedRules.length} campos con dominio detectado · {uniqueDomains} dominio{uniqueDomains !== 1 ? "s" : ""}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button className="btn sm ghost" onClick={() => toggleAll(true)}>
            Expandir todo
          </button>
          <button className="btn sm ghost" onClick={() => toggleAll(false)}>
            Colapsar todo
          </button>
        </div>
      </div>

      <DomainLegend />

      {/* Groups */}
      {groups.map((group) => {
        const key = group.domainId ?? "null";
        const isOpen = !!expanded[key];
        const pct = Math.round((group.rules.length / matchedRules.length) * 100);
        const barW = Math.round((group.rules.length / maxCount) * 100);
        const color = group.domainId
          ? getDomainColor(group.domainId)
          : { background: "transparent", text: "var(--ink-4)", border: "var(--line)", dot: "var(--ink-4)" };

        return (
          <div key={key} style={{ marginBottom: 8, border: "1px solid var(--line)", borderRadius: "var(--r-md)", overflow: "hidden", background: "var(--surface-1)" }}>
            {/* Group header row */}
            <div
              onClick={() => setExpanded((p) => ({ ...p, [key]: !p[key] }))}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", cursor: "pointer", background: isOpen ? color.background : "transparent", transition: "background .12s" }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ flexShrink: 0, transform: isOpen ? "rotate(90deg)" : "rotate(0)", transition: "transform .15s", color: "var(--ink-4)" }}
              >
                <path d="M4 2l4 4-4 4" />
              </svg>
              {group.domainId ? <DomainBadge domainId={group.domainId} size="default" /> : <span style={{ width: 10, height: 10, borderRadius: "50%", background: color.dot, flexShrink: 0 }} />}
              <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-1)", flex: 1 }}>{group.name}</span>
              <div style={{ flex: "0 0 100px", height: 5, background: "var(--surface-3)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${barW}%`, height: "100%", background: color.dot, borderRadius: 3, transition: "width .35s" }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-4)", minWidth: 58, textAlign: "right" }}>
                {group.rules.length} <span style={{ opacity: 0.55 }}>({pct}%)</span>
              </span>
            </div>

            {/* Expanded sub-table */}
            {isOpen && (
              <div style={{ borderTop: "1px solid var(--line)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "var(--surface-3)" }}>
                      {["Origen", "Destino", "Tipo", "Políticas"].map((h) => (
                        <th key={h} style={{ padding: "7px 14px", textAlign: "left", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-4)", letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 600 }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {group.rules.map((rule, i) => (
                      <tr key={rule.id} style={{ borderTop: i > 0 ? "1px solid var(--line)" : "none" }}>
                        <td style={{ padding: "8px 14px", fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-2)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{rule.sourcePath}</td>
                        <td style={{ padding: "8px 14px", fontFamily: "var(--font-mono)", fontSize: 11.5, color: getDomainColor(group.domainId ?? "D-DEFAULT").text, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{rule.destinationPath || "—"}</td>
                        <td style={{ padding: "8px 14px" }}>
                          <TypeBadge type={rule.sourceType} />
                        </td>
                        <td style={{ padding: "8px 14px" }}>
                          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                            {rule.nullPolicy === "REQUIRED" && (
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, padding: "1px 5px", borderRadius: 3, background: "var(--err-soft)", color: "var(--err)", border: "1px solid var(--err-line)" }}>REQ</span>
                            )}
                            {rule.defaultValue && (
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, padding: "1px 5px", borderRadius: 3, background: "var(--surface-3)", color: "var(--ink-4)", border: "1px solid var(--line-2)" }}>DEF</span>
                            )}
                            {rule.transformationPolicy === "CODE_LOOKUP" && (
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, padding: "1px 5px", borderRadius: 3, background: "var(--warn-soft)", color: "var(--warn)", border: "1px solid var(--warn-line)" }}>LOOKUP</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
