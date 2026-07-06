import { useEffect } from "react";

export interface SaveToastProps {
  tone: "ok" | "err";
  message: string;
  onDismiss: () => void;
  /** ms before auto-dismiss. Default 3000 per STATES.md. */
  duration?: number;
}

/** .save-toast — fixed bottom-center, auto-dismiss 3s. */
export function SaveToast({ tone, message, onDismiss, duration = 3000 }: SaveToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [onDismiss, duration]);

  return (
    <div className={`save-toast ${tone}`}>
      {tone === "ok" ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7l3 3 5-6" />
        </svg>
      ) : (
        "✕"
      )}{" "}
      {message}
    </div>
  );
}
