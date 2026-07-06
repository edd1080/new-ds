import { Dot } from "../primitives/Dot";

export interface SimTab {
  value: string;
  label: string;
}

export interface SimTabBarProps {
  tabs: SimTab[];
  value: string;
  onChange: (value: string) => void;
  /** e.g. "bs.prod" — rendered as a mono chip pinned to the right. */
  tenant?: string;
}

/** .sim-tab-bar — internal Simulaciones/Modelos tab switch + tenant chip. */
export function SimTabBar({ tabs, value, onChange, tenant }: SimTabBarProps) {
  return (
    <div className="sim-tab-bar">
      {tabs.map((t) => (
        <button key={t.value} className={value === t.value ? "active" : ""} onClick={() => onChange(t.value)}>
          {t.label}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      {tenant && (
        <span className="chip" style={{ fontSize: 10, fontFamily: "var(--font-mono)" }}>
          <Dot tone="ok" />
          tenant: {tenant}
        </span>
      )}
    </div>
  );
}
