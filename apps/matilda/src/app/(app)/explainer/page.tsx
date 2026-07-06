"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Icon, ExplainerTrack } from "@bowpi/design-system";
import { useMatildaStore } from "../../../store/useMatildaStore";

type StageVisual = "problem" | "upload" | "agent" | "rules" | "publish";

interface XplStage {
  lb: string;
  kick: string;
  title: string;
  body: string;
  bullets: string[];
  visual: StageVisual;
}

const XPL_STAGES: XplStage[] = [
  {
    lb: "El problema",
    kick: "Por qué existe este módulo",
    title: "Cada cliente envía su JSON diferente",
    body: "Tres clientes, tres estructuras, tres nombres distintos para el mismo dato. Sin una capa de traducción, cada integración es a medida — frágil, costosa y lenta.",
    bullets: ["Nombres de campo distintos (nombres vs fullName vs nombre_completo)", "Estructuras anidadas vs planas", "Enums propietarios sin tabla de equivalencia"],
    visual: "problem",
  },
  {
    lb: "Subir JSON",
    kick: "Paso 01",
    title: "Un archivo, un árbol de campos",
    body: "Subís el JSON que tu sistema produce para cada solicitud. Matilda lo parsea al instante e infiere la estructura completa: paths, tipos y valores de muestra.",
    bullets: ["Sin esquema previo requerido", "Detección de tipos automática", "Soporte para estructuras anidadas"],
    visual: "upload",
  },
  {
    lb: "Agente IA",
    kick: "Análisis automático",
    title: "El Agente analiza contra el Canónico v9",
    body: "El Agente de Mapeo compara tu JSON contra el Canónico v9 interno de Bowpi. Propone reglas con nivel de confianza — vos revisás, no re-hacés.",
    bullets: ["Coincidencia semántica de tokens", "Tres categorías: match perfecto / sugerido / sin fuente", "Confianza explícita por campo"],
    visual: "agent",
  },
  {
    lb: "Revisar reglas",
    kick: "Vos decidís",
    title: "Aceptás, rechazás o editás cada regla",
    body: "El editor organiza las reglas por categoría. Las seguras están pre-confirmadas. Las sugeridas esperan tu revisión. Los conflictos de tipo se resuelven con una tabla de conversión.",
    bullets: ["DIRECT / CODE_LOOKUP / TYPE_CONV / DERIVATION", "Detalle de razonamiento IA por campo", "Política de nulos por regla"],
    visual: "rules",
  },
  {
    lb: "Publicar",
    kick: "Paso 04",
    title: "La configuración queda activa",
    body: "Al publicar, el Mapper Service registra la configuración con versión semántica. A partir de ese momento, cada evaluación crediticia de ese cliente pasa automáticamente por la traducción.",
    bullets: ["Versión semántica (ej. ptc-v1.3.0)", "Audit trail de aprobaciones", "Reversible — podés crear una nueva versión"],
    visual: "publish",
  },
];

const PROBLEM_ROWS: [string, string][] = [
  ["cliente_a", "nombres"],
  ["cliente_b", "nombre_completo"],
  ["cliente_c", "fullName"],
];

const UPLOAD_ROWS: [string, string][] = [
  ["proceso.solicitud.solicitante", "obj →"],
  ["  .nombres", "string"],
  ["  .dpi", "string"],
  ["  .fechaNacimiento", "date"],
];

const AGENT_ROWS: [string, string][] = [
  ["Parseando JSON", "ok"],
  ["Consultando Canónico v9", "ok"],
  ["Generando reglas", "ok"],
];

const RULES_ROWS: [string, string, string, string][] = [
  ["solicitante.dpi", "nationalId", "100%", "var(--ok)"],
  ["empleo.ingresos", "monthlyIncome", "82%", "var(--warn)"],
  ["credito.monto", "requestedAmount", "100%", "var(--ok)"],
];

function XplVisual({ kind }: { kind: StageVisual }): ReactNode {
  if (kind === "problem") {
    return (
      <div className="xv-card">
        {PROBLEM_ROWS.map(([k, v], i) => (
          <div className="xv-row" key={k} style={{ animationDelay: `${i * 0.12}s` }}>
            <span className="k">{k}</span>
            <span className="v">{v}</span>
          </div>
        ))}
        <div className="cap" style={{ marginTop: 14, fontSize: 12 }}>
          3 clientes · mismo dato · 3 nombres
        </div>
      </div>
    );
  }

  if (kind === "upload") {
    return (
      <div className="xv-card">
        {UPLOAD_ROWS.map(([k, v], i) => (
          <div className="xv-row" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
            <span className="k" style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>
              {k}
            </span>
            <span className="v">{v}</span>
          </div>
        ))}
        <div className="cap" style={{ marginTop: 14, fontSize: 12 }}>
          JSON inferido · 3 niveles · 15 campos
        </div>
      </div>
    );
  }

  if (kind === "agent") {
    return (
      <div className="xv-card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {AGENT_ROWS.map(([l], i) => (
          <div className="xv-row" key={i} style={{ animationDelay: `${i * 0.14}s`, marginBottom: 0 }}>
            <span style={{ color: "var(--ok)", fontSize: 11 }}>✓</span>
            <span className="k" style={{ fontSize: 13 }}>
              {l}
            </span>
          </div>
        ))}
        <div className="cap" style={{ marginTop: 10, fontSize: 12 }}>
          5 match · 6 sugeridos · 2 sin fuente
        </div>
      </div>
    );
  }

  if (kind === "rules") {
    return (
      <div className="xv-card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {RULES_ROWS.map(([a, b, c, col], i) => (
          <div key={i} className="xv-row" style={{ animationDelay: `${i * 0.14}s`, marginBottom: 0 }}>
            <span className="k" style={{ fontSize: 11 }}>
              {a}
            </span>
            <span style={{ color: "var(--accent)" }}>→</span>
            <span style={{ color: "var(--accent)", fontSize: 11 }}>{b}</span>
            <span className="v" style={{ color: col }}>
              {c}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // publish
  const ringStyle: CSSProperties = {
    width: 56,
    height: 56,
    margin: "0 auto 14px",
    borderRadius: "50%",
    background: "var(--ok-soft)",
    border: "1px solid var(--ok-line)",
    display: "grid",
    placeItems: "center",
    color: "var(--ok)",
  };
  return (
    <div className="xv-card" style={{ textAlign: "center", padding: 24 }}>
      <div style={ringStyle}>
        <svg width="26" height="26" viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 19l6 6 12-13" />
        </svg>
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ok)" }}>Publicado</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-4)", marginTop: 4 }}>ptc-v1.4.0 · bs.prod</div>
    </div>
  );
}

export default function ExplainerPage() {
  const router = useRouter();
  const markExplainerSeen = useMatildaStore((s) => s.markExplainerSeen);
  const [i, setI] = useState(0);

  // Mirrors v3/explainer.jsx: mark the Explainer as seen on mount, which drops the
  // "nuevo" badge on the "Cómo funciona" sidebar item (see AppShellClient.tsx).
  useEffect(() => {
    markExplainerSeen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stage = XPL_STAGES[i];
  const last = i === XPL_STAGES.length - 1;

  return (
    <div className="xpl">
      <div className="xpl-head">
        <div className="eyebrow">Cómo funciona Matilda · Data Translation</div>
        <h1>Del JSON del cliente al motor de decisión</h1>
        <p>Un recorrido conceptual del módulo — avanzá a tu ritmo. Cuando termines, arrancás la configuración real.</p>
      </div>

      <ExplainerTrack
        items={XPL_STAGES.map((st, k) => ({
          label: st.lb,
          state: k === i ? "active" : k < i ? "done" : "pending",
        }))}
        onSelect={setI}
      />

      <div className="xpl-stage">
        <div className="xpl-stage-grid" key={i}>
          <div className="xpl-copy rise">
            <div className="kick">{stage.kick}</div>
            <h2>{stage.title}</h2>
            <p>{stage.body}</p>
            <ul>
              {stage.bullets.map((b, k) => (
                <li key={k}>
                  <Icon.arrow /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="xpl-visual rise" style={{ animationDelay: "0.1s" }}>
            <XplVisual kind={stage.visual} />
          </div>
        </div>
      </div>

      <div className="xpl-nav">
        <button className="btn ghost" onClick={() => setI((x) => Math.max(0, x - 1))} disabled={i === 0}>
          <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}>
            <Icon.arrow />
          </span>{" "}
          Atrás
        </button>
        <div className="dots">
          {XPL_STAGES.map((_, k) => (
            <span key={k} className={`d ${k === i ? "on" : ""}`} onClick={() => setI(k)} />
          ))}
        </div>
        {last ? (
          <button className="btn primary" onClick={() => router.push("/projects")}>
            Ver proyectos <Icon.arrow />
          </button>
        ) : (
          <button className="btn primary" onClick={() => setI((x) => x + 1)}>
            Siguiente <Icon.arrow />
          </button>
        )}
      </div>
    </div>
  );
}
