"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon, Button, SearchBar, ConfirmDialog, Chip } from "@bowpi/design-system";
import { VARIABLES_MOCK, DTYPE_SHORT, OP_LABELS, type DomainRecord, type DomainVariable } from "../../../../data/mockData";
import { NewVarSlide } from "./NewVarSlide";
import { EditVarSlide } from "./EditVarSlide";
import type { ConfirmState, DomainMode } from "./types";

export interface VarsTabProps {
  domain: DomainRecord;
  mode: DomainMode;
  onShowToast: (msg: string, tone?: "ok" | "warn") => void;
}

/** Variables tab — lists direct (S) and calculated (C) variables for the selected domain. */
export function VarsTab({ domain, mode, onShowToast }: VarsTabProps) {
  const [vars, setVars] = useState<DomainVariable[]>(() => (VARIABLES_MOCK[domain.id] || []).map((v) => ({ ...v })));
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "S" | "C">("all");
  const [editVar, setEditVar] = useState<DomainVariable | null>(null);
  const [slideNew, setSlideNew] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);

  useEffect(() => {
    setVars((VARIABLES_MOCK[domain.id] || []).map((v) => ({ ...v })));
    setExpanded(new Set());
    setSearch("");
    setTypeFilter("all");
  }, [domain.id]);

  const toggleExpand = (id: string) =>
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const filtered = useMemo(() => {
    let list = vars;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((v) => v.name.toLowerCase().includes(q) || (v.description || "").toLowerCase().includes(q));
    }
    if (typeFilter !== "all") list = list.filter((v) => v.type === typeFilter);
    return list;
  }, [vars, search, typeFilter]);

  const simples = filtered.filter((v) => v.type === "S");
  const calculadas = filtered.filter((v) => v.type === "C");
  const pendingCnt = vars.filter((v) => v.status === "draft").length;

  const askActivate = (v: DomainVariable) =>
    setConfirm({
      title: "Activar variable",
      confirmLabel: "Activar",
      message: `"${v.name}" pasará a ACTIVE y quedará disponible para el próximo snapshot publicado.`,
      onConfirm: () => {
        setVars((prev) => prev.map((x) => (x.id === v.id ? { ...x, status: "active" } : x)));
        setConfirm(null);
        onShowToast(`"${v.name}" activada.`);
      },
    });

  const askArchive = (v: DomainVariable) =>
    setConfirm({
      title: "Archivar variable",
      confirmLabel: "Archivar",
      confirmStyle: "danger",
      message: `"${v.name}" quedará archivada. Dejará de aparecer en futuros snapshots.`,
      onConfirm: () => {
        setVars((prev) => prev.map((x) => (x.id === v.id ? { ...x, status: "archived" } : x)));
        setConfirm(null);
        onShowToast(`"${v.name}" archivada.`, "warn");
      },
    });

  const renderRow = (v: DomainVariable) => {
    const isOpen = expanded.has(v.id);
    const isDraft = v.status === "draft";
    const isArchived = v.status === "archived";

    return (
      <div key={v.id} className="var-row" style={{ animation: "m-fade-up 0.18s both" }}>
        <div className="var-row-head" onClick={() => toggleExpand(v.id)}>
          <span className={v.type === "S" ? "var-type-s" : "var-type-c"}>{v.type}</span>
          <span className="var-row-name">{v.name}</span>
          {isDraft && (
            <Chip tone="warn" style={{ fontSize: 10, flexShrink: 0 }}>
              Pendiente
            </Chip>
          )}
          {isArchived && (
            <Chip tone="err" style={{ fontSize: 10, flexShrink: 0 }}>
              Archivada
            </Chip>
          )}
          <span className="var-row-datatype">{DTYPE_SHORT[v.dataType] || v.dataType}</span>
          {v.description && <span className="var-row-desc">{v.description}</span>}
          <div className="var-row-actions" onClick={(e) => e.stopPropagation()}>
            <button className="dom-icon-btn" onClick={() => setEditVar(v)}>
              <Icon.pencil />
              <span className="dom-tooltip">Editar</span>
            </button>
            {mode === "admin" && v.status !== "active" && (
              <Button size="sm" variant="primary" onClick={() => askActivate(v)}>
                Activar
              </Button>
            )}
            {mode === "admin" && v.status !== "archived" && (
              <button className="dom-icon-btn danger" onClick={() => askArchive(v)}>
                <Icon.archiveBox />
                <span className="dom-tooltip">Archivar</span>
              </button>
            )}
          </div>
          <span className={`var-chevron ${isOpen ? "open" : ""}`}>
            <Icon.chevron />
          </span>
        </div>
        {isOpen && (
          <div className="var-detail">
            <div className="var-detail-id">
              <span>{v.id}</span>
              <span className="var-detail-id-sep">·</span>
              <span>{v.technicalName}</span>
              <span className="var-detail-id-sep">·</span>
              <span>{v.dataType}</span>
            </div>
            {v.type === "S" && v.sourcePath && (
              <div className="var-detail-cell">
                <span className="var-detail-key">Source Path</span>
                <span className="var-detail-val">{v.sourcePath}</span>
              </div>
            )}
            {v.type === "C" && v.atlasDefinition && (
              <div className="var-detail-cell" style={{ gridColumn: "1 / -1" }}>
                <span className="var-detail-key">Expresión</span>
                <span className="var-detail-val expr">
                  <span className="var-detail-expr-part">{v.atlasDefinition.left?.value}</span>
                  <span className="var-detail-expr-op">{OP_LABELS[v.atlasDefinition.operator] || v.atlasDefinition.operator}</span>
                  <span className="var-detail-expr-const">{v.atlasDefinition.right?.value}</span>
                </span>
              </div>
            )}
            {v.exampleValue && (
              <div className="var-detail-cell">
                <span className="var-detail-key">Ejemplo</span>
                <span className="var-detail-val">{v.exampleValue}</span>
              </div>
            )}
            <div className="var-detail-cell">
              <span className="var-detail-key">Null Policy</span>
              <span className={`var-detail-val ${!v.nullPolicy ? "muted" : ""}`}>{v.nullPolicy || "—"}</span>
            </div>
            {v.description && (
              <div className="var-detail-cell" style={{ gridColumn: "1 / -1" }}>
                <span className="var-detail-key">Descripción</span>
                <span style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.5 }}>{v.description}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Métricas */}
      <div className="dom-metrics">
        {[
          { label: "Directas (S)", value: domain.variableCount.s, tone: undefined as string | undefined },
          { label: "Calculadas (C)", value: domain.variableCount.c, tone: undefined as string | undefined },
          { label: "Total activas", value: domain.variableCount.total, tone: "ok" },
          ...(mode === "admin" ? [{ label: "Pendientes", value: pendingCnt, tone: pendingCnt > 0 ? "warn" : undefined }] : []),
        ].map((m, i) => (
          <div key={i} className="dom-metric">
            <div className="dom-metric-label">{m.label}</div>
            <div className={`dom-metric-value ${m.tone || ""}`}>{m.value}</div>
          </div>
        ))}
        <Button size="sm" variant="primary" style={{ alignSelf: "flex-end", marginLeft: "auto", flexShrink: 0 }} onClick={() => setSlideNew(true)}>
          <Icon.plus /> Variable
        </Button>
      </div>

      {/* Filtros */}
      <div className="dom-filters">
        <SearchBar placeholder="Buscar por nombre o descripción…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="dom-type-btns">
          {[
            { id: "all" as const, label: "Todas" },
            { id: "S" as const, label: "Directas" },
            { id: "C" as const, label: "Calculadas" },
          ].map((t) => (
            <button key={t.id} className={typeFilter === t.id ? "active" : ""} onClick={() => setTypeFilter(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="dom-empty">
          <Icon.data width={28} height={28} />
          <h3>{vars.length === 0 ? "Sin variables" : "Sin resultados"}</h3>
          <p>{vars.length === 0 ? "Este dominio aún no tiene variables. Usá + Variable para agregar la primera." : "Probá cambiando los filtros de búsqueda."}</p>
        </div>
      )}

      {/* Sección S */}
      {simples.length > 0 && (
        <>
          <div className="dom-section-head">
            Variables directas (S) <span className="dom-section-count">{simples.length}</span>
          </div>
          {simples.map(renderRow)}
        </>
      )}

      {/* Sección C */}
      {calculadas.length > 0 && (
        <>
          <div className="dom-section-head" style={{ marginTop: simples.length > 0 ? 16 : 0 }}>
            Variables calculadas (C) <span className="dom-section-count">{calculadas.length}</span>
          </div>
          {calculadas.map(renderRow)}
        </>
      )}

      {/* Slides */}
      {editVar && (
        <EditVarSlide
          variable={editVar}
          mode={mode}
          onClose={() => setEditVar(null)}
          onSaved={(n) => {
            setEditVar(null);
            onShowToast(`"${n}" actualizada.`);
          }}
        />
      )}
      {slideNew && (
        <NewVarSlide
          domain={domain}
          mode={mode}
          onClose={() => setSlideNew(false)}
          onSaved={(n) => {
            setSlideNew(false);
            onShowToast(`"${n}" creada en borrador.`);
          }}
        />
      )}

      {/* Confirm */}
      {confirm && (
        <ConfirmDialog title={confirm.title} message={confirm.message} confirmLabel={confirm.confirmLabel} confirmStyle={confirm.confirmStyle} onConfirm={confirm.onConfirm} onClose={() => setConfirm(null)} />
      )}
    </>
  );
}
