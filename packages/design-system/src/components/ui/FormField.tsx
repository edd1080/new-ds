import type { ReactNode } from "react";

export interface FormFieldProps {
  label: ReactNode;
  required?: boolean;
  desc?: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
}

/** .form-field — label + desc + input composition. */
export function FormField({ label, required, desc, hint, children }: FormFieldProps) {
  return (
    <div className="form-field">
      <label>
        {label} {required && <span className="req">*</span>}
        {hint && <span style={{ fontSize: 11, color: "var(--ink-4)", fontWeight: 400, fontFamily: "var(--font-mono)", marginLeft: 6 }}>{hint}</span>}
      </label>
      {desc && <div className="desc">{desc}</div>}
      {children}
    </div>
  );
}
