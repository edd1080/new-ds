"use client";

import { useState } from "react";
import { Icon, Chip, Button } from "@bowpi/design-system";
import { VARIABLES_MOCK, DTYPE_SHORT, OP_LABELS, type DomainRecord, type DomainVersion } from "../../../../data/mockData";
import type { DomainMode } from "./types";

export type VersionAction = "enable-activate" | "make-active" | "disable" | "archive";

export interface VersionRowProps {
  ver: DomainVersion;
  domain: DomainRecord;
  isActive: boolean;
  mode: DomainMode;
  onAction: (kind: VersionAction, ver: DomainVersion) => void;
}

/** Expandable row in the versions table — click to preview the immutable snapshot. */
export function VersionRow({ ver, domain, isActive, mode, onAction }: VersionRowProps) {
  const [open, setOpen] = useState(false);

  const snapVars = (VARIABLES_MOCK[domain.id] || []).filter((v) => v.status === "active").slice(0, ver.variableCount);

  let statusLabel: string;
  let statusTone: "err" | "ok" | "";
  if (ver.archived) {
    statusLabel = "Archivada";
    statusTone = "err";
  } else if (ver.enabled) {
    statusLabel = "Habilitada";
    statusTone = "ok";
  } else {
    statusLabel = "Deshabilitada";
    statusTone = "";
  }

  return (
    <>
      <tr className="ver-data-row" onClick={() => setOpen((o) => !o)}>
        <td>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span className="ver-num">v{ver.version}</span>
            {isActive && (
              <Chip tone="ok" style={{ fontSize: 10 }}>
                Activa
              </Chip>
            )}
          </div>
        </td>
        <td>
          <span className="ver-tag">{ver.tag}</span>
        </td>
        <td style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-3)" }}>{ver.variableCount} vars</td>
        <td style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{ver.publishedBy || "—"}</td>
        <td style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-4)" }}>{ver.publishedAt || "—"}</td>
        <td>
          <Chip tone={statusTone || undefined}>
            {statusTone && <span className={`dot ${statusTone}`} />}
            {statusLabel}
          </Chip>
        </td>
        {mode === "admin" && (
          <td>
            <div className="ver-actions" onClick={(e) => e.stopPropagation()}>
              {!ver.archived && !ver.enabled && (
                <Button size="sm" variant="primary" onClick={() => onAction("enable-activate", ver)}>
                  Habilitar y activar
                </Button>
              )}
              {!ver.archived && ver.enabled && !isActive && (
                <Button size="sm" onClick={() => onAction("make-active", ver)}>
                  ★ Hacer activa
                </Button>
              )}
              {!ver.archived && ver.enabled && (
                <Button size="sm" variant="ghost" onClick={() => onAction("disable", ver)}>
                  Deshabilitar
                </Button>
              )}
              {!ver.archived && (
                <Button size="sm" variant="ghost" style={{ color: "var(--err)" }} onClick={() => onAction("archive", ver)}>
                  Archivar
                </Button>
              )}
            </div>
          </td>
        )}
        <td style={{ width: 30 }}>
          <span style={{ color: "var(--ink-4)", display: "inline-block", transition: "transform 0.15s", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
            <Icon.chevron />
          </span>
        </td>
      </tr>
      {open && (
        <tr className="ver-snapshot-row">
          <td colSpan={mode === "admin" ? 8 : 7}>
            <div className="dom-snapshot-wrap">
              <div className="dom-snapshot-label">
                <span className="dot ok" /> Snapshot · v{ver.version} · {snapVars.length} variables
              </div>
              {snapVars.length === 0 ? (
                <div style={{ fontSize: 12.5, color: "var(--ink-4)", fontStyle: "italic" }}>Snapshot vacío.</div>
              ) : (
                <table className="dom-snapshot-table">
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>technicalName</th>
                      <th>Nombre</th>
                      <th>Dato</th>
                      <th>Path / Expresión</th>
                    </tr>
                  </thead>
                  <tbody>
                    {snapVars.map((v) => (
                      <tr key={v.id}>
                        <td>
                          <span className={v.type === "S" ? "var-type-s" : "var-type-c"} style={{ display: "inline-block" }}>
                            {v.type}
                          </span>
                        </td>
                        <td className="mono-cell">{v.technicalName}</td>
                        <td>{v.name}</td>
                        <td style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-3)" }}>{DTYPE_SHORT[v.dataType] || v.dataType}</td>
                        <td className="mono-cell" style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {v.type === "S" ? v.sourcePath : `${v.atlasDefinition?.left?.value || ""} ${OP_LABELS[v.atlasDefinition?.operator || ""] || v.atlasDefinition?.operator || ""} ${v.atlasDefinition?.right?.value || ""}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
