"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../../icons/Icon";
import type { CanonicalCatalogItem, CategoryColor } from "../../types/matilda";

/** Generic cyclical palette for category pills — a presentation detail, not domain data. */
const CATEGORY_COLORS: CategoryColor[] = [
  { bg: "rgba(13,42,58,0.9)", text: "#5ce0d8", border: "rgba(92,224,216,0.2)" },
  { bg: "rgba(18,32,68,0.9)", text: "#7cb3f0", border: "rgba(124,179,240,0.2)" },
  { bg: "rgba(40,18,68,0.9)", text: "#c084fc", border: "rgba(192,132,252,0.2)" },
  { bg: "rgba(18,40,18,0.9)", text: "#86d986", border: "rgba(134,217,134,0.2)" },
  { bg: "rgba(56,30,8,0.9)", text: "#f0a05c", border: "rgba(240,160,92,0.2)" },
  { bg: "rgba(40,36,8,0.9)", text: "#e0c050", border: "rgba(224,192,80,0.2)" },
  { bg: "rgba(40,12,12,0.9)", text: "#f87171", border: "rgba(248,113,113,0.2)" },
  { bg: "rgba(6,38,40,0.9)", text: "#22d3ee", border: "rgba(34,211,238,0.2)" },
];

function CatFilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "5px 10px",
        marginBottom: 3,
        background: active ? "rgba(34,211,238,0.10)" : "transparent",
        border: `1px solid ${active ? "#22d3ee44" : "transparent"}`,
        borderRadius: "var(--r-xs)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: active ? "var(--accent-ink)" : "var(--ink-3)",
        cursor: "pointer",
        transition: "all .12s",
        lineHeight: 1.4,
      }}
    >
      {label}
    </button>
  );
}

function SearchToggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "3px 9px",
        background: active ? "rgba(34,211,238,0.12)" : "var(--surface-2)",
        border: `1px solid ${active ? "#22d3ee44" : "var(--line-2)"}`,
        borderRadius: "var(--r-xs)",
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        color: active ? "var(--accent-ink)" : "var(--ink-4)",
        cursor: "pointer",
        transition: "all .12s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function CatalogItemRow({ item, selected, inUse, onClick, getCatColor }: { item: CanonicalCatalogItem; selected: boolean; inUse: boolean; onClick: (item: CanonicalCatalogItem) => void; getCatColor: (cat: string) => CategoryColor }) {
  const cats = (item.categories || []).slice(0, 3);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => !inUse && onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "10px 16px",
        borderBottom: "1px solid var(--line)",
        borderLeft: `2px solid ${selected ? "var(--accent)" : "transparent"}`,
        cursor: inUse ? "default" : "pointer",
        background: selected ? "rgba(34,211,238,0.07)" : hovered && !inUse ? "var(--surface-3)" : "transparent",
        opacity: inUse ? 0.52 : 1,
        transition: "background .1s",
        minHeight: 72,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12.5,
            fontWeight: 600,
            color: selected ? "var(--accent-ink)" : "var(--ink-1)",
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.path}
        </span>
        {inUse && (
          <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 10, padding: "1px 6px", borderRadius: 3, background: "var(--surface-3)", color: "var(--ink-4)", border: "1px solid var(--line-2)" }}>En uso</span>
        )}
        {selected && !inUse && (
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)", flexShrink: 0 }}>
            <path d="M3 7l3 3 5-6" />
          </svg>
        )}
      </div>

      {item.name && <div style={{ fontSize: 11.5, color: "var(--accent-ink)", marginBottom: 2, opacity: 0.88 }}>{item.name}</div>}

      {item.description && (
        <div style={{ fontSize: 11, color: "var(--ink-4)", lineHeight: 1.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: cats.length ? 5 : 0 }}>{item.description}</div>
      )}

      {cats.length > 0 && (
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {cats.map((cat) => {
            const col = getCatColor(cat);
            return (
              <span key={cat} style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, padding: "1px 6px", borderRadius: 3, background: col.bg, color: col.text, border: `1px solid ${col.border}` }}>
                {cat}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export interface DestinationModalProps {
  sourcePath?: string;
  currentPath: string | null;
  usedPaths: Set<string>;
  catalog: CanonicalCatalogItem[];
  onConfirm: (path: string) => void;
  onClose: () => void;
}

/** Destination Modal v2 — 900px × 85vh, 2 columns (PRD §6.4/§6.5). Simulates a catalog load. */
export function DestinationModal({ sourcePath, currentPath, usedPaths, catalog, onConfirm, onClose }: DestinationModalProps) {
  const [catalogState, setCatalogState] = useState<"loading" | "ready" | "error">("loading");
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<"all" | "path" | "name" | "desc">("all");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(currentPath || null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isModify = !!currentPath;

  const categoryColorMap = useMemo(() => {
    const keys = [...new Set(catalog.flatMap((i) => i.categories ?? []))].sort();
    const map: Record<string, CategoryColor> = {};
    keys.forEach((c, i) => (map[c] = CATEGORY_COLORS[i % CATEGORY_COLORS.length]));
    return map;
  }, [catalog]);
  const getCatColor = (cat: string) => categoryColorMap[cat] ?? CATEGORY_COLORS[0];

  useEffect(() => {
    const t = setTimeout(() => {
      setCatalogState("ready");
      setTimeout(() => inputRef.current?.focus(), 60);
    }, 550);
    return () => clearTimeout(t);
  }, []);

  const allCats = useMemo(() => [...new Set(catalog.flatMap((i) => i.categories ?? []))].sort(), [catalog]);

  const toggleCat = (cat: string) => setSelectedCats((p) => (p.includes(cat) ? p.filter((c) => c !== cat) : [...p, cat]));

  const filtered = useMemo(() => {
    if (catalogState !== "ready") return [];
    return catalog.filter((item) => {
      if (selectedCats.length > 0 && !item.categories?.some((c) => selectedCats.includes(c))) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      if (searchField === "path") return item.path.toLowerCase().includes(q);
      if (searchField === "name") return (item.name || "").toLowerCase().includes(q);
      if (searchField === "desc") return (item.description || "").toLowerCase().includes(q);
      return item.path.toLowerCase().includes(q) || (item.name || "").toLowerCase().includes(q) || (item.description || "").toLowerCase().includes(q);
    });
  }, [catalog, catalogState, search, searchField, selectedCats]);

  const selectedItem = catalog.find((i) => i.path === selected) || null;

  const handleConfirm = () => {
    if (selected) onConfirm(selected);
    else onClose();
  };

  const handleOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Enter" && selected && selected !== currentPath) handleConfirm();
  };

  const retryLoad = () => {
    setCatalogState("loading");
    setTimeout(() => setCatalogState("ready"), 600);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCats([]);
    setSearchField("all");
  };
  const hasFilters = !!search.trim() || selectedCats.length > 0;

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlay} onKeyDown={handleKey} style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(3px)" }}>
      <div className="dm2-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dm2-hd">
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--ink-1)" }}>{isModify ? "Modificar destino canónico" : "Asignar destino canónico"}</h2>
            {sourcePath && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-4)", marginTop: 4 }}>
                origen <span style={{ color: "var(--ink-5)" }}>→</span> <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>{sourcePath}</span>
              </div>
            )}
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="dm2-body">
          <div className="dm2-sidebar">
            <div style={{ display: "flex", alignItems: "center", gap: 8, height: 36, padding: "0 10px", border: "1.5px solid var(--line-2)", borderRadius: "var(--r-sm)", background: "var(--surface-1)", marginBottom: 14 }}>
              <Icon.search style={{ width: 13, height: 13, color: "var(--ink-4)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                placeholder="Buscar…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13, color: "var(--ink-1)", fontFamily: "var(--font-sans)" }}
              />
              {search && (
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-4)", fontSize: 12, padding: "0 2px", lineHeight: 1 }} onClick={() => setSearch("")}>
                  ✕
                </button>
              )}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>Buscar por</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {(
                  [
                    ["all", "Todo"],
                    ["path", "Path"],
                    ["name", "Nombre"],
                    ["desc", "Descripción"],
                  ] as const
                ).map(([v, l]) => (
                  <SearchToggle key={v} label={l} active={searchField === v} onClick={() => setSearchField(v)} />
                ))}
              </div>
            </div>

            <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>Categoría</div>
              <div style={{ overflowY: "auto", flex: 1, paddingRight: 2 }}>
                <CatFilterPill label="Todas" active={selectedCats.length === 0} onClick={() => setSelectedCats([])} />
                {allCats.map((cat) => (
                  <CatFilterPill key={cat} label={cat} active={selectedCats.includes(cat)} onClick={() => toggleCat(cat)} />
                ))}
              </div>
            </div>

            {catalogState === "ready" && (
              <div style={{ paddingTop: 10, borderTop: "1px solid var(--line)", marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-5)", lineHeight: 1.6 }}>
                {filtered.length} de {catalog.length} campos
                {hasFilters && (
                  <button onClick={clearFilters} style={{ display: "block", marginTop: 3, background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontSize: 10, fontFamily: "var(--font-mono)", padding: 0 }}>
                    limpiar filtros
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="dm2-list">
            {catalogState === "loading" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12, color: "var(--ink-4)" }}>
                <span className="spin" style={{ display: "inline-flex" }}>
                  <Icon.refresh style={{ width: 20, height: 20 }} />
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>Cargando catálogo…</span>
              </div>
            )}

            {catalogState === "error" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 14, padding: 32 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--err-soft)", border: "1px solid var(--err-line)", display: "grid", placeItems: "center" }}>
                  <Icon.refresh style={{ width: 20, height: 20, color: "var(--err)" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--ink-1)", marginBottom: 6 }}>Error al cargar el catálogo</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-4)", lineHeight: 1.5 }}>No se pudo conectar con el Domain Manager Service</div>
                </div>
                <button className="btn sm" onClick={retryLoad}>
                  <Icon.refresh style={{ width: 12, height: 12 }} /> Reintentar
                </button>
              </div>
            )}

            {catalogState === "ready" && filtered.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 10, color: "var(--ink-4)", padding: 32 }}>
                <Icon.search style={{ width: 26, height: 26, opacity: 0.25 }} />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, textAlign: "center", lineHeight: 1.6 }}>
                  No se encontraron campos
                  <br />
                  con los filtros aplicados
                </div>
                {hasFilters && (
                  <button className="btn sm ghost" onClick={clearFilters}>
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}

            {catalogState === "ready" &&
              filtered.map((item) => {
                const inUse = usedPaths.has(item.path) && item.path !== currentPath;
                return <CatalogItemRow key={item.id} item={item} selected={selected === item.path} inUse={inUse} onClick={(itm) => setSelected(itm.path)} getCatColor={getCatColor} />;
              })}
          </div>
        </div>

        <div className="dm2-ft">
          <div style={{ flex: 1, minWidth: 0 }}>
            {selected ? (
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>{selected}</div>
                {selectedItem?.name && <div style={{ fontSize: 11, color: "var(--ink-4)" }}>{selectedItem.name}</div>}
              </div>
            ) : (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-5)" }}>Seleccioná un campo del catálogo canónico</span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button className="btn ghost" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn primary" disabled={!selected || selected === currentPath} onClick={handleConfirm}>
              {isModify ? "Modificar destino" : "Asignar destino"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
