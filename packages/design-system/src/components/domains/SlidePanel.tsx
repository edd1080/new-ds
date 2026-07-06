import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

export interface SlidePanelProps {
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * .dom-slide-overlay / .dom-slide-panel — reusable right-hand drawer. Ported from
 * project/v4/domains-vars-tab.jsx's SlidePanel. Closes on Escape and on overlay click.
 */
export function SlidePanel({ title, onClose, children, footer }: SlidePanelProps) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="dom-slide-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dom-slide-panel">
        <div className="dom-slide-head">
          <span className="dom-slide-title">{title}</span>
          <button className="dom-slide-close" onClick={onClose}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <path d="M1.5 1.5l8 8M9.5 1.5l-8 8" />
            </svg>
          </button>
        </div>
        <div className="dom-slide-body">{children}</div>
        {footer && <div className="dom-slide-foot">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
