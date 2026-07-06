"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../../icons/Icon";

export interface SourcePickerModalProps {
  currentPath: string | null;
  availablePaths: string[];
  onConfirm: (path: string) => void;
  onClose: () => void;
}

/** Modal for selecting an alternative source path from the input JSON. PRD §7.6. */
export function SourcePickerModal({ currentPath, availablePaths, onConfirm, onClose }: SourcePickerModalProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(currentPath || null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = availablePaths.filter((p) => !search.trim() || p.toLowerCase().includes(search.toLowerCase()));

  const handleOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlay} style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(2px)" }}>
      <div
        style={{
          background: "var(--surface-1)",
          border: "1px solid var(--line-strong)",
          borderRadius: "var(--r-lg)",
          boxShadow: "var(--shadow-pop)",
          width: "min(480px, 92vw)",
          maxHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          animation: "m-scale-in .15s both",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dm2-hd">
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Fuente alternativa</h2>
            <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 3, fontFamily: "var(--font-mono)" }}>Seleccioná una ruta del JSON de entrada como respaldo</div>
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, height: 36, padding: "0 10px", border: "1.5px solid var(--line-2)", borderRadius: "var(--r-sm)", background: "var(--surface-2)" }}>
            <Icon.search style={{ width: 13, height: 13, color: "var(--ink-4)", flexShrink: 0 }} />
            <input
              ref={inputRef}
              placeholder="Filtrar rutas…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13, color: "var(--ink-1)" }}
            />
            {search && (
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-4)", fontSize: 12 }} onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: "var(--ink-4)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
              {availablePaths.length === 0 ? "No hay rutas disponibles" : "Sin coincidencias"}
            </div>
          ) : (
            filtered.map((path) => (
              <div
                key={path}
                onClick={() => setSelected(path)}
                style={{
                  padding: "10px 16px",
                  borderBottom: "1px solid var(--line)",
                  cursor: "pointer",
                  background: selected === path ? "rgba(34,211,238,0.07)" : "transparent",
                  borderLeft: `2px solid ${selected === path ? "var(--accent)" : "transparent"}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "background .1s",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, flex: 1, color: selected === path ? "var(--accent-ink)" : "var(--ink-1)" }}>{path}</span>
                {selected === path && (
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)", flexShrink: 0 }}>
                    <path d="M3 7l3 3 5-6" />
                  </svg>
                )}
              </div>
            ))
          )}
        </div>

        <div className="dm2-ft">
          <div style={{ flex: 1, minWidth: 0 }}>
            {selected ? (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{selected}</span>
            ) : (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-5)" }}>Seleccioná una ruta</span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button className="btn ghost" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn primary" disabled={!selected} onClick={() => selected && onConfirm(selected)}>
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
