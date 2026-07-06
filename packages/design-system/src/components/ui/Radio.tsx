import type { ReactNode } from "react";

export interface RadioOptionProps {
  checked: boolean;
  onSelect: () => void;
  label: ReactNode;
}

/** .radio-circle — 18px, checked: 8px accent dot centered. */
export function RadioOption({ checked, onSelect, label }: RadioOptionProps) {
  return (
    <div className="radio-row" onClick={onSelect}>
      <div className={`radio-circle ${checked ? "checked" : ""}`} />
      <div className="checkbox-label">{label}</div>
    </div>
  );
}

export interface RadioGroupProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  labels?: Partial<Record<T, ReactNode>>;
}

export function RadioGroup<T extends string>({ options, value, onChange, labels }: RadioGroupProps<T>) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {options.map((o) => (
        <RadioOption key={o} checked={value === o} onSelect={() => onChange(o)} label={labels?.[o] ?? o} />
      ))}
    </div>
  );
}
