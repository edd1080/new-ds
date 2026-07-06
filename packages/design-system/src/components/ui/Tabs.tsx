import type { ReactNode } from "react";

export interface UnderlineTab {
  value: string;
  label: ReactNode;
  count?: number;
}

export interface TabsUnderlineProps {
  tabs: UnderlineTab[];
  value: string;
  onChange: (value: string) => void;
}

/** .tabs-bar / .tab-ul — section navigation, active = accent underline. */
export function TabsUnderline({ tabs, value, onChange }: TabsUnderlineProps) {
  return (
    <div className="tabs-bar">
      {tabs.map((t) => (
        <button key={t.value} className={`tab-ul ${value === t.value ? "active" : ""}`} onClick={() => onChange(t.value)}>
          {t.label}
          {t.count !== undefined && <span className="count">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}

export interface SegmentedTab {
  value: string;
  label: ReactNode;
}

export interface TabsSegmentedProps {
  tabs: SegmentedTab[];
  value: string;
  onChange: (value: string) => void;
}

/** .mapper4-tabs / .mapper4-tab — pill segmented control, compact filters. */
export function TabsSegmented({ tabs, value, onChange }: TabsSegmentedProps) {
  return (
    <div className="mapper4-tabs">
      {tabs.map((t) => (
        <button key={t.value} className={`mapper4-tab ${value === t.value ? "active" : ""}`} onClick={() => onChange(t.value)}>
          {t.label}
        </button>
      ))}
    </div>
  );
}
