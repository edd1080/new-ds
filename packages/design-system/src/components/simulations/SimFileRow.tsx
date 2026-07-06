import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import { Icon } from "../../icons/Icon";

export interface SimFileRowProps {
  /** Short badge text, e.g. "DMN". Omit to show a generic file glyph instead. */
  badge?: string;
  name: string;
  meta: ReactNode;
  onRemove?: () => void;
}

/** .sim-file-row — confirmed-file row (green tone) after a successful pick, in upload modals. */
export function SimFileRow({ badge, name, meta, onRemove }: SimFileRowProps) {
  return (
    <div className="sim-file-row">
      {badge ? <span className="sim-file-badge">{badge}</span> : <Icon.json width={16} height={16} />}
      <span className="sim-file-name">{name}</span>
      <span className="sim-file-meta">{meta}</span>
      {onRemove && (
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Icon.close width={11} height={11} />
        </Button>
      )}
    </div>
  );
}
