"use client";

import { Dot, Button } from "@bowpi/design-system";
import { VARIABLES_MOCK, DTYPE_SHORT, OP_LABELS, type DomainRecord } from "../../../../data/mockData";

export interface VigentePanelProps {
  domain: DomainRecord;
  activeVer: string | null;
  onClose: () => void;
}

/** .dom-vigente-panel — read-only snapshot preview of the currently active version's ACTIVE variables. */
export function VigentePanel({ domain, activeVer, onClose }: VigentePanelProps) {
  const snapVars = activeVer ? (VARIABLES_MOCK[domain.id] || []).filter((v) => v.status === "active") : [];

  return (
    <div className="dom-vigente-panel">
      <div className="dom-vigente-head">
        <Dot tone="ok" />
        <span className="dom-vigente-title">Versión vigente{activeVer ? ` · v${activeVer}` : " · sin versión activa"}</span>
        <Button size="sm" variant="ghost" onClick={onClose}>
          Ocultar
        </Button>
      </div>
      {!activeVer ? (
        <div style={{ fontSize: 13, color: "var(--ink-3)", fontStyle: "italic" }}>No hay versión activa. Publicá y habilitá una versión para activar este dominio.</div>
      ) : snapVars.length === 0 ? (
        <div style={{ fontSize: 13, color: "var(--ink-3)", fontStyle: "italic" }}>Snapshot vacío (sin variables activas al publicar).</div>
      ) : (
        <table className="dom-snapshot-table" style={{ marginTop: 4 }}>
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
  );
}
