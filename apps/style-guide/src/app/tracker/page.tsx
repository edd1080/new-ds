"use client";

import { useMemo, useState } from "react";
import { TRACKER_COMPONENTS, TRACKER_CATEGORIES, STATUS_META, SOURCE_META, type TrackerStatus } from "@bowpi/design-system";
import { StyleGuideNav } from "../../components/StyleGuideNav";

const STATUS_FILTERS: ("all" | TrackerStatus)[] = ["all", "ds", "code", "todo", "fut"];
const STATUS_LABELS: Record<"all" | TrackerStatus, string> = { all: "Todos", ds: "✅ DS", code: "🔧 Código", todo: "📋 Pendiente", fut: "🔮 Futuro" };

export default function TrackerPage() {
  const [filter, setFilter] = useState<"all" | TrackerStatus>("all");
  const [catFilter, setCatFilter] = useState<string>("all");

  const visible = useMemo(
    () => TRACKER_COMPONENTS.filter((c) => (filter === "all" || c.status === filter) && (catFilter === "all" || c.category === catFilter)),
    [filter, catFilter]
  );

  const counts = useMemo(
    () => ({
      ds: TRACKER_COMPONENTS.filter((c) => c.status === "ds").length,
      code: TRACKER_COMPONENTS.filter((c) => c.status === "code").length,
      todo: TRACKER_COMPONENTS.filter((c) => c.status === "todo").length,
      fut: TRACKER_COMPONENTS.filter((c) => c.status === "fut").length,
    }),
    []
  );

  const visibleCats = useMemo(() => TRACKER_CATEGORIES.filter((cat) => visible.some((c) => c.category === cat)), [visible]);

  return (
    <div className="sg-root">
      <StyleGuideNav />
      <main className="sg-main">
        <div className="ct-root">
          <div className="ct-header">
            <h1>Component Tracker</h1>
            <p>
              Inventario en vivo de todos los componentes de <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>@bowpi/design-system</span> — estado actual, origen y notas de
              implementación. A diferencia del tracker estático original, estos datos viven en{" "}
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>packages/design-system/src/tracker/data.ts</span> y se actualizan junto con el código real.
            </p>
          </div>

          <div className="ct-stats">
            <div className="ct-stat" style={{ borderColor: "#7AD1A2" }}>
              <div className="n" style={{ color: "#1f6640" }}>
                {counts.ds}
              </div>
              <div className="l">En Design System</div>
            </div>
            <div className="ct-stat" style={{ borderColor: "#F8C579" }}>
              <div className="n" style={{ color: "#7a5010" }}>
                {counts.code}
              </div>
              <div className="l">En código, falta DS</div>
            </div>
            <div className="ct-stat" style={{ borderColor: "#c2d8e8" }}>
              <div className="n" style={{ color: "#1f5a80" }}>
                {counts.todo}
              </div>
              <div className="l">Por construir</div>
            </div>
            <div className="ct-stat">
              <div className="n" style={{ color: "var(--ink-3)" }}>
                {counts.fut}
              </div>
              <div className="l">Futuro</div>
            </div>
            <div className="ct-stat" style={{ marginLeft: "auto" }}>
              <div className="n" style={{ color: "var(--ink-1)" }}>
                {TRACKER_COMPONENTS.length}
              </div>
              <div className="l">Total</div>
            </div>
          </div>

          <div className="ct-filters">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-4)", marginRight: 4 }}>Estado:</span>
            {STATUS_FILTERS.map((f) => (
              <button key={f} className={`ct-filter f-${f} ${filter === f ? "on" : ""}`} onClick={() => setFilter(f)}>
                {STATUS_LABELS[f]}
              </button>
            ))}
            <div className="ct-sep" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-4)", marginRight: 4 }}>Categoría:</span>
            <button className={`ct-filter ${catFilter === "all" ? "on" : ""}`} onClick={() => setCatFilter("all")}>
              Todas
            </button>
            {TRACKER_CATEGORIES.map((cat) => (
              <button key={cat} className={`ct-filter ${catFilter === cat ? "on" : ""}`} onClick={() => setCatFilter(cat)}>
                {cat}
              </button>
            ))}
          </div>

          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-4)", marginBottom: 24 }}>
            {visible.length} componentes · {visibleCats.length} categorías
          </div>

          {visibleCats.map((cat) => {
            const items = visible.filter((c) => c.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat} className="ct-category">
                <div className="ct-category-title">
                  {cat} <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-5)" }}>({items.length})</span>
                </div>
                <div className="ct-grid">
                  {items.map((c, i) => (
                    <div key={i} className="ct-card">
                      <div>
                        <div className="ct-card-name">{c.name}</div>
                        <div className="ct-card-class">{c.css}</div>
                      </div>
                      <div className="ct-card-desc">{c.desc}</div>
                      <div className="ct-card-footer">
                        <span className={`ct-st ct-st-${c.status}`}>{STATUS_META[c.status].short}</span>
                        <span className={`ct-src ct-src-${c.source}`}>{SOURCE_META[c.source].label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {visible.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-4)", fontFamily: "var(--font-mono)", fontSize: 13 }}>Sin resultados para los filtros seleccionados</div>
          )}
        </div>
      </main>
    </div>
  );
}
