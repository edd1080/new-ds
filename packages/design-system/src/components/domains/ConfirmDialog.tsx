import { useEffect } from "react";
import { createPortal } from "react-dom";

export interface ConfirmDialogProps {
  title?: string;
  message?: string;
  confirmLabel?: string;
  confirmStyle?: "danger" | undefined;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * .modal-overlay — reusable confirmation modal. Ported from project/v4/confirm-dialog.jsx,
 * referenced from both the Domains module (variable/version lifecycle actions) and the
 * Mapper Editor. Escape cancels, Enter confirms.
 */
export function ConfirmDialog({ title, message, confirmLabel, confirmStyle, onConfirm, onClose }: ConfirmDialogProps) {
  const isDanger = confirmStyle === "danger";

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") {
        e.preventDefault();
        onConfirm();
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose, onConfirm]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface-1)",
          border: "1px solid var(--line-strong)",
          borderRadius: "var(--r-lg)",
          boxShadow: "var(--shadow-pop)",
          width: "min(440px, 90vw)",
          padding: "28px 28px 22px",
          animation: "m-scale-in .15s both",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            marginBottom: 18,
            background: isDanger ? "var(--err-soft)" : "var(--warn-soft)",
            border: `1px solid ${isDanger ? "var(--err-line)" : "var(--warn-line)"}`,
            display: "grid",
            placeItems: "center",
          }}
        >
          {isDanger ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--err)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 4v6M10 14v1" />
              <path d="M3.5 17h13L10 3 3.5 17z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--warn)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10" cy="10" r="8" />
              <path d="M10 7v4M10 14v.5" />
            </svg>
          )}
        </div>

        {/* Title */}
        <h2 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink-1)", margin: "0 0 8px" }}>{title || "¿Confirmar acción?"}</h2>

        {/* Message */}
        <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.65, margin: "0 0 24px" }}>{message || "Esta acción no se puede deshacer."}</p>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button className="btn ghost" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn primary" style={isDanger ? { background: "var(--err)", borderColor: "var(--err-line)", color: "#fff" } : {}} onClick={onConfirm}>
            {confirmLabel || "Confirmar"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
