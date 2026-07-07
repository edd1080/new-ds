import type { ReactNode } from "react";

export interface ModalProps {
  /** Modal title (rendered in header). */
  title: ReactNode;
  /** Optional subtitle below the title. */
  subtitle?: ReactNode;
  /** Body content. */
  children: ReactNode;
  /** Footer content (buttons, meta). If omitted, no footer renders. */
  footer?: ReactNode;
  /** Close handler — called on overlay click and close button. */
  onClose: () => void;
  /** Optional width override (default: 540px). */
  width?: number | string;
}

/** Generic modal overlay with head/body/footer sections. */
export function Modal({ title, subtitle, children, footer, onClose, width }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={width ? { width } : undefined} onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ flex: 1 }}>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}
