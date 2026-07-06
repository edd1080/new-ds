import { Icon } from "../../icons/Icon";
import { StatusPill } from "./StatusPill";
import { Chip } from "./Chip";
import { Button } from "./Button";
import type { Project } from "../../types/matilda";

export interface ProjectCardProps {
  project: Project;
  onView?: () => void;
  onSummary?: () => void;
  onPublish?: () => void;
}

/** .project-card4 — horizontal row: name + status pill + metadata + actions. */
export function ProjectCard({ project, onView, onSummary, onPublish }: ProjectCardProps) {
  return (
    <div className="project-card4" onClick={onView}>
      <div className="pc-info">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div className="pc-name">{project.name}</div>
          {project.status === "notFound" ? <Chip tone="err">no encontrado</Chip> : <StatusPill status={project.status} />}
        </div>
        <div className="pc-meta">
          {project.source && (
            <span>
              <Icon.json style={{ width: 11, height: 11 }} /> {project.source}
            </span>
          )}
          <span>{project.rules} reglas</span>
          <span>{project.coverage}% cobertura</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent-ink)" }}>/{project.mapperId}</span>
          <span>· {project.updated}</span>
        </div>
      </div>
      <div className="pc-actions" onClick={(e) => e.stopPropagation()}>
        <Button size="sm" onClick={onView}>
          Ver <Icon.arrow />
        </Button>
        <Button size="sm" variant="ghost" onClick={onSummary} title="Resumen">
          <Icon.data />
        </Button>
        <Button size="sm" variant="ghost" onClick={onPublish} title="Publicar">
          <Icon.bolt />
        </Button>
      </div>
    </div>
  );
}
