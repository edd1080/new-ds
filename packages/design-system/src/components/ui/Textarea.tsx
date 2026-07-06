import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

/** .form-textarea — min-height 96px, resize vertical. */
export function Textarea({ hasError, className, ...rest }: TextareaProps) {
  const cls = ["form-textarea", hasError && "has-err", className].filter(Boolean).join(" ");
  return <textarea className={cls} {...rest} />;
}
