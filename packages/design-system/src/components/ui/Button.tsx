import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "default" | "lg";
  block?: boolean;
}

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** .btn / .btn.primary / .btn.ghost / .btn.sm / .btn.lg / .btn.block */
export function Button({ variant = "default", size = "default", block, className, ...rest }: ButtonProps) {
  return (
    <button
      className={cx("btn", variant === "primary" && "primary", variant === "ghost" && "ghost", size === "sm" && "sm", size === "lg" && "lg", block && "block", className)}
      {...rest}
    />
  );
}

/** .iconbtn — 40×40px square, icon-only. */
export function IconButton({ className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cx("iconbtn", className)} {...rest} />;
}

/** Wraps an icon with the .spin animation (m-spin 0.9s linear infinite). */
export function Spin({ children }: { children: ReactNode }) {
  return <span className="spin">{children}</span>;
}
