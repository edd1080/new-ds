import type { ReactNode } from "react";

export interface EmptyStateProps {
  /** Icon element (typically an <Icon.xxx /> from the icon set). */
  icon?: ReactNode;
  /** Heading text. */
  title: ReactNode;
  /** Optional description text below the heading. */
  description?: ReactNode;
  /** Optional action (button or link). */
  action?: ReactNode;
}

/** Centered empty/placeholder state with icon, title, description and optional CTA. */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state-icon">{icon}</div>}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}
