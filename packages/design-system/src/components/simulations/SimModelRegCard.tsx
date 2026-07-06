import { Button } from "../ui/Button";
import { Chip } from "../ui/Chip";
import { Dot } from "../primitives/Dot";
import { SimStatusBadge } from "./SimStatusBadge";
import type { DmnModel } from "./types";
import { simInitials } from "./utils";

/** A model is "live" if any of its versions is published. */
export function isModelLive(model: DmnModel): boolean {
  return model.versions.some((v) => v.published);
}

export interface SimModelRegCardProps {
  model: DmnModel;
  error?: string | null;
  /** versionId → true while a publish/unpublish request for that version is in flight. */
  publishing?: Record<string, boolean>;
  onTogglePublish: (modelId: string, versionId: string, currentlyPublished: boolean) => void;
}

/** .sim-mreg-card — model registry card: header + per-version publish/unpublish rows. */
export function SimModelRegCard({ model, error, publishing = {}, onTogglePublish }: SimModelRegCardProps) {
  const live = isModelLive(model);
  const initials = simInitials(model.modelName);
  const createdDate = new Date(model.creationDate).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="sim-mreg-card">
      {error && <div className="sim-mreg-error">{error}</div>}

      <div className="sim-mreg-head">
        <div className="sim-mreg-initials" style={{ background: live ? "var(--accent)" : "var(--surface-3)", color: live ? "#00282e" : "var(--ink-3)" }}>
          {initials}
        </div>
        <div className="sim-mreg-meta">
          <div className="sim-mreg-name">
            {model.modelName}
            <SimStatusBadge live={live} />
          </div>
          <div className="sim-mreg-desc">{model.modelDescription || "Sin descripción."}</div>
        </div>
        <div className="sim-mreg-right">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-4)", textAlign: "right" }}>
            <div>
              {model.versions.length} versión{model.versions.length !== 1 ? "es" : ""}
            </div>
            <div>{createdDate}</div>
          </div>
        </div>
      </div>

      <div className="sim-mreg-versions">
        {model.versions.map((v) => {
          const isPub = v.published;
          const isBusy = !!publishing[v.versionId];
          const { decisionNames = [], inputFields = [] } = v.metadata || {};
          return (
            <div key={v.versionId} className={`sim-version-row ${isPub ? "published" : ""}`}>
              <span style={{ flexShrink: 0, opacity: isPub ? 1 : 0.3 }}>
                <Dot tone={isPub ? "ok" : undefined} />
              </span>
              <span className="sim-vrow-name">{v.name}</span>
              <span className="sim-vrow-desc">{v.description || `${decisionNames.length} decisiones · ${inputFields.length} inputs`}</span>
              {isPub && (
                <Chip tone="ok">
                  <Dot tone="ok" />
                  Publicada
                </Chip>
              )}
              <Button variant={isPub ? "ghost" : "primary"} size="sm" disabled={isBusy} style={{ flexShrink: 0, minWidth: 90 }} onClick={() => onTogglePublish(model.id, v.versionId, isPub)}>
                {isBusy ? "…" : isPub ? "Despublicar" : "Publicar"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
