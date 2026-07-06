import type { ReactNode } from "react";

export interface ToggleProps {
  on: boolean;
  onChange: (next: boolean) => void;
  label?: ReactNode;
  hint?: ReactNode;
  disabled?: boolean;
}

/** .toggle-track — 42×24px pill. On: bg accent. */
export function Toggle({ on, onChange, label, hint, disabled }: ToggleProps) {
  return (
    <div className="toggle-row">
      <button
        type="button"
        className={`toggle-track ${on ? "on" : ""}`}
        onClick={() => !disabled && onChange(!on)}
        disabled={disabled}
        aria-pressed={on}
      >
        <div className="toggle-thumb" />
      </button>
      {(label || hint) && (
        <div>
          {label && <div className="toggle-label">{label}</div>}
          {hint && <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 1 }}>{hint}</div>}
        </div>
      )}
    </div>
  );
}
