import type { ReactNode } from "react";

export interface CheckboxProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: ReactNode;
  hint?: ReactNode;
  disabled?: boolean;
}

/** .checkbox-box — 18px, r-xs. Checked: bg accent + check svg. */
export function Checkbox({ checked, onChange, label, hint, disabled }: CheckboxProps) {
  return (
    <div
      className="checkbox-row"
      onClick={() => !disabled && onChange(!checked)}
      style={disabled ? { opacity: 0.42, cursor: "not-allowed" } : undefined}
    >
      <div className={`checkbox-box ${checked ? "checked" : ""}`}>
        {checked && (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 6l2.5 2.5 4.5-5" />
          </svg>
        )}
      </div>
      {(label || hint) && (
        <div>
          {label && <div className="checkbox-label">{label}</div>}
          {hint && <div className="checkbox-hint">{hint}</div>}
        </div>
      )}
    </div>
  );
}
