export interface SimDistributionSegment {
  key: string;
  label: string;
  count: number;
  tone: "ok" | "err";
}

export interface SimDistributionBarProps {
  total: number;
  segments: SimDistributionSegment[];
}

/** .sim-dist-card — "distribución de estados" bar + legend, results view. */
export function SimDistributionBar({ total, segments }: SimDistributionBarProps) {
  if (total <= 0) return null;
  const visible = segments.filter((s) => s.count > 0);

  return (
    <div className="sim-dist-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div className="sim-dist-title">DISTRIBUCIÓN DE ESTADOS</div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-4)" }}>{total} runs</span>
      </div>
      <div className="sim-dist-bar">
        {visible.map((s) => (
          <div key={s.key} className={`sim-dist-seg ${s.tone}`} style={{ width: `${Math.round((s.count / total) * 100)}%` }} />
        ))}
      </div>
      <div className="sim-dist-legend">
        {visible.map((s) => (
          <div key={s.key} className="sim-dist-legend-item">
            <div className="sim-dist-swatch" style={{ background: s.tone === "ok" ? "var(--ok)" : "var(--err)" }} />
            {s.label}: {s.count}
          </div>
        ))}
      </div>
    </div>
  );
}
