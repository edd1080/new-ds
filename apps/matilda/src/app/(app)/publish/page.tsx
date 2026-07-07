"use client";

import { useRouter } from "next/navigation";
import { Icon, LockedSurface, SurfaceHeader, Button } from "@bowpi/design-system";
import { useMatildaStore } from "../../../store/useMatildaStore";
import { CHECKLIST_ITEMS, AUDIT_ROWS } from "../../../data/mockData";

const CHECKLIST_ICON: Record<string, string> = { ok: "✓", warn: "!", err: "✕" };

export default function PublishPage() {
  const router = useRouter();
  const summaryOk = useMatildaStore((s) => s.summaryOk);
  const jsonLoaded = useMatildaStore((s) => s.jsonLoaded);
  const rulesConfirmed = useMatildaStore((s) => s.rulesConfirmed);
  const blockerResolved = useMatildaStore((s) => s.blockerResolved);
  const published = useMatildaStore((s) => s.published);
  const publishedVersion = useMatildaStore((s) => s.publishedVersion);
  const activeProject = useMatildaStore((s) => s.activeProject);
  const resolveBlocker = useMatildaStore((s) => s.resolveBlocker);
  const publish = useMatildaStore((s) => s.publish);

  if (!summaryOk) {
    return (
      <LockedSurface
        icon={<Icon.bolt />}
        heading="Revisa el resumen primero"
        body="Revisa las capacidades habilitadas antes de activar la configuración en producción."
        steps={[
          { label: "Conectar JSON", state: jsonLoaded ? "done" : "now" },
          { label: "Mapear variables", state: rulesConfirmed ? "done" : jsonLoaded ? "now" : "pending" },
          { label: "Resumen", state: rulesConfirmed ? "now" : "pending" },
          { label: "Publicar", state: "pending" },
        ]}
        cta="Ir al resumen"
        onCta={() => router.push("/summary")}
      />
    );
  }

  const hasBlocker = !blockerResolved;
  const srcFile = activeProject?.source || "banco_bpr.json";

  if (published) {
    return (
      <>
        <SurfaceHeader crumbs="DATA TRANSLATION / PUBLICADO" title="Configuración activa" />
        <div className="mapper-success">
          <div className="ok-ring">
            <svg width="32" height="32" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 19l6 6 12-13" />
            </svg>
          </div>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)" }}>Publicado en producción</h2>
          <p style={{ color: "var(--ink-3)", maxWidth: 480 }}>
            Versión <span className="codeword">{publishedVersion}</span> activa en <span className="codeword">bs.prod</span>. Cada evaluación crediticia de este cliente pasa automáticamente por esta configuración de mapeo.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <Button onClick={() => router.push("/projects")}>Ver proyectos</Button>
            <Button variant="primary" onClick={() => router.push("/overview")}>
              Ir al overview <Icon.arrow />
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SurfaceHeader crumbs="DATA TRANSLATION / PASO 4" title="Publicar configuración" sub={`${srcFile} → Canónico v9.0.0 · revisión final antes de activar`} />

      <div className="dt-publish">
        {hasBlocker && (
          <div className="publish-blocker-banner">
            <span style={{ fontSize: 20 }}>⛔</span>
            <div style={{ flex: 1 }}>
              <strong>Publicación bloqueada:</strong> creditHistory.bureauScore no tiene campo de origen asignado. El motor no puede evaluar riesgo sin este dato.
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button size="sm" onClick={() => router.push("/mapper")}>
                Resolver en mapeo
              </Button>
              <Button size="sm" variant="ghost" onClick={resolveBlocker} title="Omitir para demo">
                Omitir (demo)
              </Button>
            </div>
          </div>
        )}

        <div className="publish-grid">
          <div className="publish-card">
            <div className="publish-card-head">Resumen de la configuración</div>
            <div className="publish-card-body">
              {(
                [
                  ["Cliente / proyecto", activeProject?.name || "Nuevo proyecto"],
                  ["Archivo fuente", srcFile],
                  ["Schema target", "Canónico v9.0.0"],
                  ["Reglas totales", "13"],
                  ["Mapeados directos", "5"],
                  ["Aprobados por IA", "6"],
                  ["Procesamiento avanz.", "1"],
                  ["Conflictos resueltos", "1"],
                ] as const
              ).map(([k, v], i) => (
                <div key={i} className="publish-meta-row">
                  <span className="k">{k}</span>
                  <span className="v">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="publish-card">
            <div className="publish-card-head">Validación previa a publicación</div>
            <div className="publish-card-body">
              {CHECKLIST_ITEMS.map((it, i) => {
                const effective = it.blocker && blockerResolved ? { ...it, st: "ok" as const, sub: "Omitido para demo — bureauScore aceptado sin fuente." } : it;
                return (
                  <div key={i} className="checklist-item">
                    <div className={`checklist-icon ${effective.st}`}>{CHECKLIST_ICON[effective.st]}</div>
                    <div>
                      <div style={{ fontSize: 13.5, color: "var(--ink-1)" }}>{effective.label}</div>
                      <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}>{effective.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="publish-card" style={{ gridColumn: "1/-1" }}>
          <div className="publish-card-head">Audit trail — historial de aprobaciones</div>
          <table className="audit-table">
            <thead>
              <tr>
                <th>Campo destino</th>
                <th>Aprobado por</th>
                <th>Fecha / hora</th>
                <th>Origen</th>
              </tr>
            </thead>
            <tbody>
              {AUDIT_ROWS.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{r.rule}</td>
                  <td>
                    <div className="avatar-sm" style={{ display: "inline-flex" }}>
                      {r.user}
                    </div>
                  </td>
                  <td style={{ color: "var(--ink-4)", fontFamily: "var(--font-mono)", fontSize: 11.5 }}>{r.when}</td>
                  <td>
                    <span className="chip">{r.how}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="publish-footer">
          <Button variant="ghost" onClick={() => {}}>
            <Icon.doc /> Guardar borrador
          </Button>
          <Button onClick={() => {}}>
            <Icon.shield /> Publicar en pruebas
          </Button>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            {hasBlocker && <span style={{ fontSize: 12.5, color: "var(--err)", fontFamily: "var(--font-mono)" }}>1 blocker · Publicar activo deshabilitado</span>}
            <Button variant={!hasBlocker ? "primary" : "default"} disabled={hasBlocker} style={{ minWidth: 160 }} onClick={() => publish("ptc-v1.4.0")}>
              <Icon.bolt /> Publicar activo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
