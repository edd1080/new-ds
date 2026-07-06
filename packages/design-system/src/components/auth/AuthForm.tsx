import type { FormEvent, ReactNode } from "react";

export interface AuthFormProps {
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

/** .auth-form — left-aligned form wrapper, max-width 360px, entrance animation. */
export function AuthForm({ children, onSubmit }: AuthFormProps) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export interface AuthCenterProps {
  children: ReactNode;
  /** When provided, renders as a <form> (e.g. OTP screens) instead of a plain <div>. */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

/** .auth-center — centered variant of AuthForm, used by icon+message screens (check-email, OTP, etc.). */
export function AuthCenter({ children, onSubmit }: AuthCenterProps) {
  if (onSubmit) {
    return (
      <form className="auth-center" onSubmit={onSubmit}>
        {children}
      </form>
    );
  }
  return <div className="auth-center">{children}</div>;
}
