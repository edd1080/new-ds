import type { ReactNode } from "react";
import { Icon } from "../../icons/Icon";

export interface FileCardProps {
  name: string;
  subtitle: ReactNode;
  progress?: number;
  progressTone?: "ok" | undefined;
  badge?: ReactNode;
  ext?: string;
}

/** .file-card — file icon + name + sub + mini progress + status chip. surfaces.css `.file-card .ft/.meta`. */
export function FileCard({ name, subtitle, progress, progressTone, badge, ext = "JSON" }: FileCardProps) {
  return (
    <div className="file-card">
      <div className="ft">
        <Icon.json />
        <span className="ext">{ext}</span>
      </div>
      <div className="meta">
        <div className="nm">{name}</div>
        <div className="sb">{subtitle}</div>
        {progress !== undefined && (
          <div className="prog-mini">
            <div style={{ width: `${progress}%`, background: progressTone === "ok" ? "var(--ok)" : undefined }} />
          </div>
        )}
      </div>
      {badge}
    </div>
  );
}
