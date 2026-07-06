import type { ReactNode } from "react";

export interface BreadcrumbItem {
  label: ReactNode;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/** .breadcrumb — mono 11px uppercase, last item is .current. */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="breadcrumb">
      {items.map((it, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} style={{ display: "contents" }}>
            <button type="button" className={`breadcrumb-item ${isLast ? "current" : ""}`} onClick={it.onClick} disabled={isLast}>
              {it.label}
            </button>
            {!isLast && <span className="breadcrumb-sep">/</span>}
          </span>
        );
      })}
    </div>
  );
}
