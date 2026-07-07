"use client";

import { useRouter } from "next/navigation";
import { Icon, SurfaceHeader, Button } from "@bowpi/design-system";
import { useMatildaStore } from "../../../store/useMatildaStore";
import { dtProgress } from "../../../lib/helpers";
import { DT_PROJECTS } from "../../../data/mockData";

const PIPELINE_ICONS = [
  (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1 1M11 11l1 1M11 5l1-1M3 11l1-1" />
    </svg>
  ),
  (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8 2v9M4.5 6.5L8 10l3.5-3.5M3 13h10" />
    </svg>
  ),
  (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 5h6M3 8h10M3 11h4M13 10l2 2-2 2" />
    </svg>
  ),
];

const DoneIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 8l3 3 5-6" />
  </svg>
);

export default function OverviewPage() {
  const router = useRouter();
  const go = (surface: string) => router.push(`/${surface}`);

  const activeProject = useMatildaStore((s) => s.activeProject);
  const projectName = useMatildaStore((s) => s.projectName);
  const configDone = useMatildaStore((s) => s.configDone);
  const agentDone = useMatildaStore((s) => s.agentDone);
  const mappingRules = useMatildaStore((s) => s.mappingRules);

  const prog = dtProgress({ configDone, agentDone });

  const steps = [
    { label: "Configuración", surface: "upload", done: prog >= 1 },
    { label: "Ingesta de datos", surface: "upload", done: prog >= 2 },
    { label: "Editor de mapeo", surface: "mapper", done: false },
  ];

  const ctaLabel = prog === 0 ? "Nuevo proyecto" : prog === 1 ? "Continuar: Ingesta" : "Ir al editor";
  const ctaSurface = prog < 2 ? "upload" : "mapper";

  const matchedCount = mappingRules.filter((r) => r.category === "matched").length;
  const noMatchCount = mappingRules.filter((r) => r.category === "noMatch").length;

  const metrics = [
    { k: "Proyectos activos", v: String(DT_PROJECTS.filter((p) => p.status !== "analysis").length), unit: "", d: "publicados + borrador" },
    { k: "Reglas mapeadas", v: prog >= 2 ? String(matchedCount || 15) : "—", unit: "", d: prog >= 2 ? "campos mapeados" : "agente sin correr" },
    { k: "Sin asignar", v: prog >= 2 ? String(noMatchCount || 14) : "—", unit: "", d: prog >= 2 ? "requieren asignación manual" : "pendiente" },
    { k: "Cobertura canónica", v: prog >= 2 ? "52" : "—", unit: prog >= 2 ? "%" : "", d: prog >= 2 ? "15/29 campos al canónico" : "pendiente" },
  ];

  const modules = [
    { id: "projects", ic: <Icon.cards />, nm: "Proyectos", ds: "Lista de definiciones de mapeo", n: "01" },
    { id: "upload", ic: <Icon.upload />, nm: "Crear definición", ds: "Configurar nombre, ID e ingestar JSON", n: "02" },
    { id: "mapper", ic: <Icon.flow />, nm: "Editor de mapeo", ds: "Asignar destinos, aprobar, configurar", n: "03" },
    { id: "summary", ic: <Icon.data />, nm: "Resumen", ds: "Capacidades habilitadas en el motor", n: "04" },
  ];

  return (
    <>
      <SurfaceHeader
        crumbs="WORKSPACE / OVERVIEW"
        title="Buen día, Jonatán"
        sub={
          <>
            Banco Solidario · tenant <span className="codeword">bs.prod</span> · Módulo Data Translation
          </>
        }
      />

      <div className="ov">
        <div className="ov-hero">
          <div className="ov-greet">
            <div className="eyebrow">{prog === 0 ? "Empieza aquí" : prog === 2 ? "En progreso" : "Continuar"}</div>
            <h2>
              {prog === 0
                ? "Conecta tus datos al motor de decisión"
                : prog === 2
                ? `Editando: ${activeProject?.name || "proyecto activo"}`
                : "Completa la ingesta de datos"}
            </h2>
            <p>
              {prog === 0
                ? "Data Translation toma el JSON de tu sistema, lo traduce al Canónico v9.0.0 con IA y lo conecta al motor crediticio. Dos pasos, sin código."
                : prog === 1
                ? `Proyecto "${projectName}" configurado. Carga el JSON del cliente para que el agente IA genere las reglas de mapeo.`
                : `${mappingRules.length || 29} reglas cargadas · ${matchedCount || 15} con match · ${noMatchCount || 14} sin asignar`}
            </p>
            <div className="cta-row">
              <Button variant="primary" onClick={() => go(ctaSurface)}>
                {ctaLabel} <Icon.arrow />
              </Button>
              <Button onClick={() => go("explainer")}>
                <Icon.book /> Cómo funciona
              </Button>
              <Button onClick={() => go("projects")}>
                <Icon.cards /> Ver proyectos
              </Button>
            </div>
          </div>

          <div className="ov-pipeline">
            <div className="ov-pipeline-hd">
              <span className="t">Pipeline Data Translation</span>
              <span className="c">{prog === 0 ? "sin iniciar" : `${prog} de 2 completados`}</span>
            </div>
            <div className="ov-pipeline-track">
              {steps.map((st, i) => {
                const isDone = st.done;
                const isNow = !isDone && activeProject && ((i === 0 && prog === 0) || (i === 1 && prog === 1) || (i === 2 && prog === 2));
                const StepIcon = PIPELINE_ICONS[i];
                return (
                  <span key={i} style={{ display: "contents" }}>
                    {i > 0 && <div className={`ov-pipeline-seg ${isDone ? "done" : isNow ? "active" : ""}`} />}
                    <div
                      className={`ov-pipeline-node ${isDone ? "done" : isNow ? "now" : "locked"}`}
                      onClick={() => (isDone || isNow) && go(st.surface)}
                      style={{ cursor: isDone || isNow ? "pointer" : "default" }}
                    >
                      <div className="ov-pipeline-step-icon">{isDone ? <DoneIcon style={{ width: 16, height: 16 }} /> : <StepIcon style={{ width: 16, height: 16 }} />}</div>
                      <div className="ov-pipeline-step-info">
                        <div className="ov-pipeline-step-label">{st.label}</div>
                        <div className="ov-pipeline-step-sub">{isDone ? "Completado" : isNow ? "En progreso" : "Pendiente"}</div>
                      </div>
                      {isNow && <Icon.arrow style={{ width: 14, height: 14, color: "var(--accent)", flexShrink: 0 }} />}
                    </div>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="ov-metrics">
          {metrics.map((m, i) => (
            <div key={i} className={`ov-metric ${m.v === "—" ? "empty" : ""}`}>
              <div className="k">{m.k}</div>
              <div className="v">
                {m.v}
                {m.unit && <span className="unit">{m.unit}</span>}
              </div>
              <div className="d">{m.d}</div>
            </div>
          ))}
        </div>

        <div className="ov-modules-label">Módulos del workflow</div>
        <div className="ov-modules">
          {modules.map((m) => (
            <button key={m.id} className="ov-module" onClick={() => go(m.id)}>
              <div className="top">
                <div className="ic">{m.ic}</div>
                <span className="n">{m.n}</span>
              </div>
              <h3>{m.nm}</h3>
              <p>{m.ds}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
