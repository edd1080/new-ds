"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon, TourStep, TourIntro, DemoEmpty, Spin } from "@bowpi/design-system";

interface TourStepDef {
  id: "upload" | "agent" | "rules" | "summary" | "publish";
  tt: string;
  ds: string;
}

const TOUR_STEPS_V3: TourStepDef[] = [
  { id: "upload", tt: "Conectar JSON", ds: "Subir el JSON del cliente" },
  { id: "agent", tt: "Análisis del Agente", ds: "IA contra Canónico v9" },
  { id: "rules", tt: "Revisar reglas", ds: "Aceptar / rechazar" },
  { id: "summary", tt: "Resumen", ds: "Capacidades habilitadas" },
  { id: "publish", tt: "Publicar", ds: "Activar configuración" },
];

interface StepProps {
  played: boolean;
  onPlay: () => void;
}

/** Port of v3/store.jsx's useStepRunner — drives a fixed-interval counter up to `total`, calling onDone once. */
function useStepRunner(total: number, intervalMs: number, onDone?: () => void) {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const ivRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const firedRef = useRef(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  const clear = () => {
    if (ivRef.current) {
      clearInterval(ivRef.current);
      ivRef.current = null;
    }
  };

  const start = useCallback(() => {
    if (running || firedRef.current) return;
    setRunning(true);
    clear();
    ivRef.current = setInterval(() => {
      setCount((c) => {
        const n = c + 1;
        if (n >= total) clear();
        return Math.min(n, total);
      });
    }, intervalMs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, total, intervalMs]);

  useEffect(() => {
    if (count >= total && total > 0 && !firedRef.current && running) {
      firedRef.current = true;
      clear();
      setRunning(false);
      doneRef.current?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, total, running]);

  useEffect(() => clear, []);

  const complete = useCallback(() => {
    clear();
    firedRef.current = true;
    setCount(total);
    setRunning(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return { count, running, start, complete };
}

/* ─── Step 1 — Upload JSON ─────────────────────────────────────────────── */
function TUploadV3({ played, onPlay }: StepProps) {
  const [up, setUp] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (t.current) clearTimeout(t.current);
  }, []);
  const run = () => {
    setUp(true);
    t.current = setTimeout(() => {
      setUp(false);
      onPlay();
    }, 1300);
  };

  return (
    <>
      <TourIntro n={1} kicker="Conectar JSON" title="Subí el JSON del cliente">
        Matilda parsea la estructura al instante e infiere paths, tipos y valores de muestra.
      </TourIntro>
      {!played && !up && (
        <DemoEmpty
          icon={<Icon.json />}
          title="Sin JSON cargado"
          description="Simulá la carga de un JSON de proceso PTC."
          action={
            <button className="btn primary lg" onClick={run}>
              <Icon.upload /> Simular carga de JSON
            </button>
          }
        />
      )}
      {up && (
        <div className="file-card">
          <div className="ft">
            <Icon.json />
            <span className="ext">JSON</span>
          </div>
          <div className="meta">
            <div className="nm">proceso_ptc.json</div>
            <div className="sb">Parseando estructura…</div>
            <div className="prog-mini">
              <div style={{ width: "65%" }} />
            </div>
          </div>
        </div>
      )}
      {played && (
        <>
          <div className="file-card">
            <div className="ft">
              <Icon.json />
              <span className="ext">JSON</span>
            </div>
            <div className="meta">
              <div className="nm">proceso_ptc.json</div>
              <div className="sb">15 campos · 3 niveles · estructura anidada · 14.2 KB</div>
              <div className="prog-mini">
                <div style={{ width: "100%" }} />
              </div>
            </div>
            <span className="chip ok">
              <span className="dot ok" /> parseado · 38ms
            </span>
          </div>
          <div className="cap">Árbol inferido: proceso.solicitud.solicitante + empleo + credito</div>
        </>
      )}
    </>
  );
}

/* ─── Step 2 — Agent analysis ──────────────────────────────────────────── */
const AGENT_TOUR_STEPS = ["Parseando estructura JSON", "Consultando Canónico v9.0.0", "Generando reglas de mapeo", "Calculando confianza semántica"];

function TAgentV3({ played, onPlay }: StepProps) {
  const { count, running, start, complete } = useStepRunner(AGENT_TOUR_STEPS.length, 480, onPlay);
  const mp = useRef(played);
  useEffect(() => {
    if (mp.current) complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete]);
  const shown = running ? count : played ? AGENT_TOUR_STEPS.length : 0;

  return (
    <>
      <TourIntro n={2} kicker="Agente de Mapeo" title="IA analiza tu JSON contra el Canónico v9">
        Sin configuración manual — el Agente propone las reglas con nivel de confianza explícito.
      </TourIntro>
      {!played && !running && (
        <DemoEmpty
          icon={<Icon.sparkles />}
          title="Agente en espera"
          description="15 campos pendientes de análisis."
          action={
            <button className="btn primary lg" onClick={start}>
              <Icon.sparkles /> Ejecutar Agente de Mapeo
            </button>
          }
        />
      )}
      {(running || played) && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {AGENT_TOUR_STEPS.map(
            (step, i) =>
              i < shown && (
                <div
                  key={i}
                  className="rise"
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", background: "var(--surface-1)" }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      display: "grid",
                      placeItems: "center",
                      background: "var(--ok-soft)",
                      color: "var(--ok)",
                      border: "1px solid var(--ok-line)",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span>{step}</span>
                </div>
              )
          )}
          {played && <div className="cap">15 campos · 5 match perfecto · 6 sugeridos · 1 conflicto · 2 sin fuente · conf. promedio 91%</div>}
        </div>
      )}
    </>
  );
}

/* ─── Step 3 — Review rules ─────────────────────────────────────────────── */
interface TourRule {
  src: string;
  tgt: string;
  op: "DIRECT" | "TYPE_CONV" | "CODE_LOOKUP" | "DERIVATION";
  conf: number;
  st: "ok" | "pending";
}

const TOUR_RULES: TourRule[] = [
  { src: "solicitante.dpi", tgt: "personalData.nationalId", op: "DIRECT", conf: 100, st: "ok" },
  { src: "empleo.ingresos", tgt: "employmentData.monthlyIncome", op: "DIRECT", conf: 82, st: "pending" },
  { src: "credito.monto", tgt: "creditRequest.requestedAmount", op: "DIRECT", conf: 100, st: "ok" },
  { src: "nombres+apellidos", tgt: "personalData.fullName", op: "CODE_LOOKUP", conf: 89, st: "pending" },
];

function TRulesV3({ played, onPlay }: StepProps) {
  const [accepted, setAccepted] = useState<Set<number>>(new Set());
  const allAccepted = accepted.size >= 2;
  useEffect(() => {
    if (allAccepted && !played) onPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAccepted]);

  return (
    <>
      <TourIntro n={3} kicker="Revisar reglas" title="Aceptás, rechazás o editás">
        Las reglas confirmadas quedan en verde. Las sugeridas esperan tu acción.
      </TourIntro>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {TOUR_RULES.map((r, i) => {
          const isAcc = accepted.has(i);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 10px",
                border: `1px solid ${isAcc ? "var(--ok-line)" : r.st === "ok" ? "var(--ok-line)" : "var(--line)"}`,
                borderRadius: "var(--r-sm)",
                background: isAcc || r.st === "ok" ? "var(--ok-soft)" : "var(--surface-1)",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, padding: "2px 6px", borderRadius: 4, background: "var(--surface-3)", color: "var(--ink-2)" }}>{r.src}</span>
              <span style={{ color: "var(--ink-4)" }}>→</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)" }}>{r.tgt.split(".").slice(-1)[0]}</span>
              <span className={`op-badge ${r.op}`} style={{ fontSize: 9 }}>
                {r.op}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, marginLeft: "auto", color: r.conf >= 90 ? "var(--ok)" : "var(--warn)" }}>{r.conf}%</span>
              {r.st === "pending" && !isAcc && (
                <button className="btn sm" style={{ fontSize: 11 }} onClick={() => setAccepted((p) => new Set([...p, i]))}>
                  ✓ Aceptar
                </button>
              )}
              {(r.st === "ok" || isAcc) && <span style={{ color: "var(--ok)", fontSize: 13 }}>✓</span>}
            </div>
          );
        })}
      </div>
      {!allAccepted && <div className="cap">Aceptá las 2 sugerencias pendientes para continuar</div>}
      {allAccepted && <div className="cap">Todas las reglas confirmadas · listo para el resumen</div>}
    </>
  );
}

/* ─── Step 4 — Summary ──────────────────────────────────────────────────── */
interface TourCap {
  name: string;
  st: "ok" | "err" | "warn";
  n: number;
}

const TOUR_CAPS: TourCap[] = [
  { name: "Perfil del solicitante", st: "ok", n: 3 },
  { name: "Historial crediticio", st: "err", n: 0 },
  { name: "Capacidad de pago", st: "warn", n: 1 },
  { name: "Solicitud de crédito", st: "ok", n: 3 },
];

function TSummaryV3({ played, onPlay }: StepProps) {
  const [shown, setShown] = useState(played ? 4 : 0);
  const t = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(
    () => () => {
      if (t.current) clearInterval(t.current);
    },
    []
  );
  const run = () => {
    let c = 0;
    t.current = setInterval(() => {
      c++;
      setShown(c);
      if (c >= 4) {
        if (t.current) clearInterval(t.current);
        onPlay();
      }
    }, 320);
  };

  return (
    <>
      <TourIntro n={4} kicker="Resumen" title="¿Qué puede evaluar el motor?">
        Cada grupo de capacidades muestra si está listo, parcial o bloqueado.
      </TourIntro>
      {shown === 0 && (
        <DemoEmpty
          icon={<Icon.data />}
          title="Sin resumen generado"
          description="Generá el resumen de capacidades habilitadas."
          action={
            <button className="btn primary lg" onClick={run}>
              <Icon.data /> Generar resumen
            </button>
          }
        />
      )}
      {shown > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {TOUR_CAPS.slice(0, shown).map((c, i) => (
            <div
              key={i}
              className="rise"
              style={{
                padding: "14px 16px",
                border: `1px solid ${c.st === "ok" ? "var(--ok-line)" : c.st === "err" ? "var(--err-line)" : "var(--warn-line)"}`,
                borderRadius: "var(--r-md)",
                background: `var(--${c.st}-soft)`,
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 13.5, color: "var(--ink-1)", marginBottom: 4 }}>{c.name}</div>
              <span className={`dot ${c.st}`} /> <span style={{ fontSize: 12, color: `var(--${c.st})` }}>{c.st === "ok" ? "Listo" : c.st === "err" ? "Problema" : "Parcial"}</span>
            </div>
          ))}
        </div>
      )}
      {shown >= 4 && <div className="cap" style={{ marginTop: 8 }}>1 blocker — historial crediticio sin fuente · publicación condicionada</div>}
    </>
  );
}

/* ─── Step 5 — Publish ──────────────────────────────────────────────────── */
function TPublishV3({ played, onPlay }: StepProps) {
  const [run, setRun] = useState(false);
  const [done, setDone] = useState(played);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fired = useRef(false);
  useEffect(() => () => {
    if (t.current) clearTimeout(t.current);
  }, []);
  const go = () => {
    if (fired.current) return;
    fired.current = true;
    onPlay();
    setRun(true);
    t.current = setTimeout(() => {
      setRun(false);
      setDone(true);
    }, 900);
  };

  return (
    <>
      <TourIntro n={5} kicker="Publicar" title="La configuración se activa en producción">
        El Mapper Service registra la versión y todas las evaluaciones pasan por esta traducción.
      </TourIntro>
      {!done && !run && (
        <DemoEmpty
          icon={<Icon.bolt />}
          title="Listo para publicar"
          description="13 reglas confirmadas · validación OK · versión ptc-v1.4.0"
          action={
            <button className="btn primary lg" onClick={go}>
              <Icon.bolt /> Publicar configuración activa
            </button>
          }
        />
      )}
      {run && (
        <DemoEmpty
          solid
          icon={
            <Spin>
              <Icon.refresh />
            </Spin>
          }
          title="Registrando…"
          description="Enviando al Mapper Service."
        />
      )}
      {done && !run && (
        <div className="decision">
          <div className="decision-badge">
            <svg width="36" height="36" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 19l6 6 12-13" />
            </svg>
          </div>
          <h2>Publicado</h2>
          <div className="lead">La configuración de mapeo está activa en producción.</div>
          <div className="decision-card">
            {(
              [
                ["versión", "ptc-v1.4.0", "ok"],
                ["tenant", "bs.prod", ""],
                ["reglas", "13", ""],
                ["ambiente", "producción", "brand"],
              ] as [string, string, string][]
            ).map(([k, v, c]) => (
              <div className="dc-row" key={k}>
                <span className="k">{k}</span>
                <span className={`v ${c}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function TourStepCanvas({ step, played, onPlay }: { step: number; played: boolean; onPlay: () => void }): ReactNode {
  const id = TOUR_STEPS_V3[step].id;
  if (id === "upload") return <TUploadV3 played={played} onPlay={onPlay} />;
  if (id === "agent") return <TAgentV3 played={played} onPlay={onPlay} />;
  if (id === "rules") return <TRulesV3 played={played} onPlay={onPlay} />;
  if (id === "summary") return <TSummaryV3 played={played} onPlay={onPlay} />;
  return <TPublishV3 played={played} onPlay={onPlay} />;
}

export default function TourPage() {
  const [active, setActive] = useState(0);
  const [played, setPlayed] = useState<Record<number, boolean>>({});
  const mark = (i: number) => setPlayed((p) => ({ ...p, [i]: true }));
  const isP = (i: number) => !!played[i];
  const progress = Math.round((Object.keys(played).length / TOUR_STEPS_V3.length) * 100);

  return (
    <div className="tour">
      <div className="tour-rail">
        <div className="ey">Tour guiado</div>
        <h2>Data Translation</h2>
        <p>Recorré el flujo completo de configuración. Disparás cada simulación a tu ritmo.</p>
        <div className="tour-progress">
          <div style={{ width: `${progress}%` }} />
        </div>
        <div className="tour-progress-lbl">
          {Object.keys(played).length} / {TOUR_STEPS_V3.length} pasos simulados
        </div>
        <div className="tour-steps">
          {TOUR_STEPS_V3.map((s, i) => (
            <TourStep key={s.id} index={i} title={s.tt} description={s.ds} active={active === i} done={isP(i)} onClick={() => setActive(i)} />
          ))}
        </div>
        <div className="tour-rail-foot">
          <button
            className="btn ghost block"
            onClick={() => {
              setPlayed({});
              setActive(0);
            }}
          >
            <Icon.refresh /> Reiniciar tour
          </button>
        </div>
      </div>

      <div className="tour-stage">
        <div className="tour-stage-inner">
          <div className="tour-canvas">
            <TourStepCanvas step={active} played={isP(active)} onPlay={() => mark(active)} />
          </div>
        </div>
        <div className="tour-nav">
          <button className="btn ghost" onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0}>
            <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}>
              <Icon.arrow />
            </span>{" "}
            Atrás
          </button>
          <div className="status">
            {isP(active) ? (
              <>
                <span className="dot ok" /> Paso {active + 1} completo
              </>
            ) : (
              <>
                <span className="dot" /> Esperando simulación
              </>
            )}
          </div>
          <button className="btn primary" onClick={() => setActive((a) => Math.min(TOUR_STEPS_V3.length - 1, a + 1))} disabled={active === TOUR_STEPS_V3.length - 1 || !isP(active)}>
            Continuar <Icon.arrow />
          </button>
        </div>
      </div>
    </div>
  );
}
