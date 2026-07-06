import type { InputHTMLAttributes } from "react";

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  mono?: boolean;
}

/** .form-input — 42px. Focus: accent border + ring. Error: err-line border. */
export function FormInput({ hasError, mono, className, ...rest }: FormInputProps) {
  const cls = ["form-input", hasError && "has-err", mono && "mono", className].filter(Boolean).join(" ");
  return <input className={cls} {...rest} />;
}
