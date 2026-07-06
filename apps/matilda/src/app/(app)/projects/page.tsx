"use client";

import { useRouter } from "next/navigation";
import { Icon, SurfaceHeader, Button, Dot } from "@bowpi/design-system";
import type { Project } from "@bowpi/design-system";
import { useMatildaStore } from "../../../store/useMatildaStore";
import { DT_PROJECTS } from "../../../data/mockData";

const STATUS_LABEL: Record<string, string> = { published: "Publicado", draft: "Borrador", analysis: "En análisis", notFound: "No encontrado" };
const STATUS_DOT: Record<string, "ok" | "warn" | "err" | "run"> = { published: "ok", draft: "warn", analysis: "run", notFound: "err" };

export default function ProjectsPage() {
  const router = useRouter();
  const go = (surface: string) => router.push(`/${surface}`);
  const setProject = useMatildaStore((s) => s.setProject);

  const visibleProjects = DT_PROJECTS.filter((p) => p.status !== "notFound");

  const openEditor = (p: Project) => {
    setProject({ ...p });
    go("mapper");
  };
  const openSummary = (p: Project) => {
    setProject({ ...p });
    go("summary");
  };
  const openPublish = (p: Project) => {
    setProject({ ...p });
    go("publish");
  };
  const newProject = () => go("upload");

  const stats = [
    { lb: "Total", v: DT_PROJECTS.length, tone: undefined as string | undefined },
    { lb: "Publicados", v: DT_PROJECTS.filter((p) => p.status === "published").length, tone: "ok" },
    { lb: "Borradores", v: DT_PROJECTS.filter((p) => p.status === "draft").length, tone: "warn" },
    { lb: "En análisis", v: DT_PROJECTS.filter((p) => p.status === "analysis").length, tone: "info" },
  ];

  return (
    <>
      <SurfaceHeader
        crumbs="DATA TRANSLATION / PROYECTOS"
        title="Proyectos de mapeo"
        sub="Cada proyecto es la configuración de traducción de un JSON cliente hacia el Canónico v9."
        actions={
          <Button variant="primary" onClick={newProject}>
            <Icon.plus /> Nueva definición
          </Button>
        }
      />

      <div className="dt-projects">
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          {stats.map((st, i) => (
            <div key={i} style={{ background: "var(--surface-1)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "12px 18px", minWidth: 110 }}>
              <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--ink-4)", marginBottom: 4 }}>{st.lb}</div>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-display)", color: st.tone ? `var(--${st.tone})` : "var(--ink-1)" }}>{st.v}</div>
            </div>
          ))}
        </div>

        <div className="projects-grid">
          {visibleProjects.map((p) => (
            <div key={p.id} className="project-card4" onClick={() => openEditor(p)}>
              <div className="pc-info">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <div className="pc-name">{p.name}</div>
                  <span className={`status-pill ${p.status}`}>
                    <Dot tone={STATUS_DOT[p.status]} />
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>
                <div className="pc-meta">
                  {p.source && (
                    <span>
                      <Icon.json style={{ width: 11, height: 11 }} /> {p.source}
                    </span>
                  )}
                  {p.rules > 0 && <span>{p.rules} reglas</span>}
                  {p.coverage > 0 && <span>{p.coverage}% cobertura</span>}
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent-ink)" }}>/{p.mapperId}</span>
                  <span>· {p.updated}</span>
                </div>
              </div>
              <div className="pc-actions" onClick={(e) => e.stopPropagation()}>
                <Button size="sm" onClick={() => (p.status === "analysis" ? go("upload") : openEditor(p))}>
                  {p.status === "published" ? "Ver" : p.status === "analysis" ? "Configurar" : "Editar"} <Icon.arrow />
                </Button>
                <Button size="sm" variant="ghost" title="Ver resumen" onClick={() => openSummary(p)} style={p.status === "analysis" ? { opacity: 0.35, pointerEvents: "none" } : {}}>
                  <Icon.data />
                </Button>
                <Button size="sm" variant="ghost" title="Publicar" onClick={() => openPublish(p)} style={p.status !== "published" ? { opacity: 0.35, pointerEvents: "none" } : {}}>
                  <Icon.bolt />
                </Button>
              </div>
            </div>
          ))}

          <div
            className="project-card4"
            style={{ border: "2px dashed var(--line-2)", background: "transparent", justifyContent: "center", flexDirection: "column", gap: 10, padding: 32, textAlign: "center" }}
            onClick={newProject}
          >
            <div style={{ width: 40, height: 40, borderRadius: "var(--r-md)", background: "var(--surface-3)", display: "grid", placeItems: "center", color: "var(--ink-3)", margin: "0 auto" }}>
              <Icon.plus />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-2)" }}>Nueva definición</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-4)" }}>Configurar nombre, ID e ingestar JSON</div>
          </div>
        </div>
      </div>
    </>
  );
}
