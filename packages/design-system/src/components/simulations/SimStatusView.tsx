/**
 * Matilda 4.5 — Simulaciones · Vistas de estado intermedio.
 * Ported from project/v4/simulations-status-views.jsx.
 */

/** .sim-empty-state — shown when no simulation is selected yet. */
export function SimEmptyState() {
  return (
    <div className="sim-empty-state">
      <span>Selecciona una simulación del historial.</span>
    </div>
  );
}

export interface SimQueuedViewProps {
  /** Total items the run will process, once it starts — 0/undefined hides the extra sentence. */
  totalItems?: number;
}

/** .sim-status-view.warn — run is queued, waiting for a worker. */
export function SimQueuedView({ totalItems }: SimQueuedViewProps) {
  return (
    <div className="sim-content-inner">
      <div className="sim-status-view">
        <div className="sim-status-icon warn">◷</div>
        <div className="sim-status-title">En cola</div>
        <div className="sim-status-sub">
          Esta corrida está esperando un worker.
          {totalItems ? ` ${totalItems} ejecuciones comenzarán en breve.` : ""}
        </div>
      </div>
    </div>
  );
}

export interface SimRunningViewProps {
  current: number;
  total: number;
}

/** .sim-status-view.info — run in progress, striped progress bar. */
export function SimRunningView({ current, total }: SimRunningViewProps) {
  const safeTotal = total || 1;
  const pct = Math.round((current / safeTotal) * 100);

  return (
    <div className="sim-content-inner">
      <div className="sim-status-view">
        <div className="sim-status-icon info" style={{ fontSize: 0 }}>
          <div className="sim-spinner" />
        </div>
        <div className="sim-status-title">Ejecutando simulación</div>
        <div className="sim-status-sub">Procesando {total} ítems contra el modelo seleccionado.</div>
        <div className="sim-progress-wrap">
          <div className="sim-progress-bar">
            <div className="sim-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="sim-progress-labels">
            <span>
              {current} / {total} completados
            </span>
            <span className="pct">{pct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface SimFailedViewProps {
  message?: string;
}

/** .sim-status-view.err — run failed before any execution was confirmed. */
export function SimFailedView({ message }: SimFailedViewProps) {
  return (
    <div className="sim-content-inner">
      <div className="sim-status-view">
        <div className="sim-status-icon err">!</div>
        <div className="sim-status-title">La simulación falló</div>
        <div className="sim-error-block">
          <pre>{message || "Error desconocido."}</pre>
        </div>
        <div className="sim-error-remedy">No se confirmaron ejecuciones. Verifica que el schema del dataset coincida con los inputs requeridos por el modelo.</div>
      </div>
    </div>
  );
}
