"use client";

import { useRouter } from "next/navigation";
import { Icon, LockedSurface, CapacityCard, SurfaceHeader, Button } from "@bowpi/design-system";
import { useMatildaStore } from "../../../store/useMatildaStore";
import { CAPACITY_CARDS } from "../../../data/mockData";

const ICONS = {
  person: <Icon.person />,
  bell: <Icon.bell />,
  doc: <Icon.doc />,
  cards: <Icon.cards />,
  data: <Icon.data />,
  graph: <Icon.graph />,
  bolt: <Icon.bolt />,
  shield: <Icon.shield />,
};

export default function SummaryPage() {
  const router = useRouter();
  const rulesConfirmed = useMatildaStore((s) => s.rulesConfirmed);
  const jsonLoaded = useMatildaStore((s) => s.jsonLoaded);
  const markSummaryOk = useMatildaStore((s) => s.markSummaryOk);

  if (!rulesConfirmed) {
    return (
      <LockedSurface
        icon={<Icon.data />}
        heading="Confirmá las reglas primero"
        body="El resumen de capacidades se genera después de revisar y confirmar las reglas de mapeo en el paso anterior."
        steps={[
          { label: "Conectar JSON", state: jsonLoaded ? "done" : "now" },
          { label: "Mapear variables", state: jsonLoaded ? "now" : "pending" },
          { label: "Resumen", state: "pending" },
        ]}
        cta="Ir a Mapear variables"
        onCta={() => router.push("/mapper")}
      />
    );
  }

  const hasBlocker = CAPACITY_CARDS.some((c) => c.blocker);

  return (
    <>
      <SurfaceHeader
        crumbs="DATA TRANSLATION / PASO 3"
        title="Resumen de integración"
        sub="¿Qué puede evaluar el motor con los datos de este cliente?"
        actions={
          <>
            <Button variant="ghost" onClick={() => router.push("/mapper")}>
              <Icon.arrow style={{ transform: "rotate(180deg)" }} /> Volver al mapeo
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                markSummaryOk();
                router.push("/publish");
              }}
            >
              Continuar a publicar <Icon.arrow />
            </Button>
          </>
        }
      />

      <div className="dt-summary">
        {hasBlocker && (
          <div className="summary-blocker">
            <span style={{ fontSize: 20 }}>⛔</span>
            <div>
              <strong>1 campo crítico sin fuente:</strong> creditHistory.bureauScore — El motor crediticio no puede evaluar riesgo sin este dato.{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => router.push("/mapper")}>
                Resolver en el editor de mapeo
              </span>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { n: 4, l: "Capacidades listas", t: "ok" },
            { n: 3, l: "Cobertura parcial", t: "warn" },
            { n: 1, l: "Problema a resolver", t: "err" },
            { n: 13, l: "Campos mapeados en total", t: "" },
          ].map((m, i) => (
            <div key={i} style={{ background: "var(--surface-1)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "12px 18px", flex: 1, minWidth: 120 }}>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-display)", color: m.t ? `var(--${m.t})` : "var(--ink-1)" }}>{m.n}</div>
              <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}>{m.l}</div>
            </div>
          ))}
        </div>

        <div className="capacity-grid">
          {CAPACITY_CARDS.map((c) => (
            <CapacityCard key={c.id} name={c.name} state={c.status} icon={ICONS[c.icon]} desc={c.desc} chips={c.chips.map((ch) => ({ label: ch.label, state: ch.st }))} pathsMapped={c.pathsMapped} pathsMissing={c.pathsMissing} />
          ))}
        </div>
      </div>
    </>
  );
}
