import type { ButtonHTMLAttributes } from "react";
import { Icon } from "../../icons/Icon";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Auth-only button variants (.btn-fill / .btn-outline / .btn-ghost-back).
 * Intentionally distinct from the app's `.btn` system (44px vs 40px) —
 * see cursor_handoff/AGENTS.md, this divergence is deliberate and documented.
 */

export interface BtnFillProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

/** .btn-fill — primary CTA, full-width, 44px, accent fill. Defaults to type="submit". */
export function BtnFill({ type = "submit", className, children, ...rest }: BtnFillProps) {
  return (
    <button type={type} className={cx("btn-fill", className)} {...rest}>
      {children}
    </button>
  );
}

export interface BtnOutlineProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

/** .btn-outline — secondary action, full-width, 44px, outlined (e.g. "Continuar con Google"). */
export function BtnOutline({ type = "button", className, children, ...rest }: BtnOutlineProps) {
  return (
    <button type={type} className={cx("btn-outline", className)} {...rest}>
      {children}
    </button>
  );
}

export interface BtnGhostBackProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

/** .btn-ghost-back — ghost text button with a leading back-arrow icon. */
export function BtnGhostBack({ type = "button", className, children, ...rest }: BtnGhostBackProps) {
  return (
    <button type={type} className={cx("btn-ghost-back", className)} {...rest}>
      <Icon.arrowLeft /> {children}
    </button>
  );
}
