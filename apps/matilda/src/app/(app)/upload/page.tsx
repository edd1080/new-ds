"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon, UploadStepper, FormField, FormInput, MapperIdPreview, Button, FileCard, AgentCard, Chip, Alert, Card, CardHead, JsonTree } from "@bowpi/design-system";
import { useMatildaStore } from "../../../store/useMatildaStore";
import { toKebab, structuredDataToRules } from "../../../lib/helpers";
import { useStepRunner } from "../../../lib/useStepRunner";
import { JSON_SOURCES_V4, AGENT_STEPS_V4, JSON_TREE_V4, MOCK_STRUCTURED_DATA } from "../../../data/mockData";

function ConfigStep({ onNext }: { onNext: () => void }) {
  const setConfig = useMatildaStore((s) => s.setConfig);
  const [name, setName] = useState("");
  const [overrideId, setOverrideId] = useState("");
  const [editingId, setEditingId] = useState(false);
  const [error, setError] = useState("");

  const autoId = toKebab(name).slice(0, 40);
  const effectiveId = editingId ? overrideId : autoId;
  const valid = name.trim().length > 0 && effectiveId.trim().length > 0;

  const handleNameChange = (v: string) => {
    setName(v);
    if (error) setError("");
  };

  const handleNext = () => {
    if (!name.trim()) {
      setError("El nombre del proyecto es obligatorio.");
      return;
    }
    if (!effectiveId.trim()) {
      setError("El Mapper ID no puede estar vacío.");
      return;
    }
    setConfig(effectiveId.trim(), name.trim());
    onNext();
  };

  return (
    <>
      <div className="surface-header">
        <div>
          <div className="crumbs">DATA TRANSLATION / NUEVA DEFINICIÓN</div>
          <h1>Configuración</h1>
          <div className="sub">Asigna un nombre y un identificador único a esta definición de mapeo.</div>
        </div>
      </div>

      <UploadStepper step={1} />

      <div className="config-surface">
        <div className="config-form">
          <FormField label="Nombre del proyecto" required desc="Nombre descriptivo visible en la lista de definiciones.">
            <FormInput
              hasError={!!error && !name.trim()}
              placeholder="Ej: Crédito Individual — Banco Solidario"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && valid && handleNext()}
              autoFocus
            />
          </FormField>

          <FormField label="Mapper ID" hint="auto-generado" desc="Identificador único en kebab-case (máx. 40 caracteres). Se genera desde el nombre, puedes editarlo.">
            {!editingId ? (
              <MapperIdPreview
                mapperId={effectiveId || ""}
                onEdit={effectiveId ? () => { setOverrideId(effectiveId); setEditingId(true); } : undefined}
              />
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <FormInput
                  mono
                  value={overrideId}
                  onChange={(e) => setOverrideId(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40))}
                  onKeyDown={(e) => e.key === "Enter" && valid && handleNext()}
                />
                <Button size="sm" variant="ghost" onClick={() => { setEditingId(false); setOverrideId(""); }}>
                  Resetear
                </Button>
              </div>
            )}
          </FormField>

          {error && (
            <div style={{ fontSize: 13, color: "var(--err)", padding: "8px 12px", background: "var(--err-soft)", border: "1px solid var(--err-line)", borderRadius: "var(--r-sm)" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, paddingTop: 8 }}>
            <Button variant="primary" size="lg" disabled={!valid} onClick={handleNext}>
              Siguiente — Ingesta de datos <Icon.arrow />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

type Phase = "empty" | "loading" | "parsed" | "done" | "parseError";

function IngestaStep({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const projectName = useMatildaStore((s) => s.projectName);
  const mapperId = useMatildaStore((s) => s.mapperId);
  const agentDone = useMatildaStore((s) => s.agentDone);
  const loadJson = useMatildaStore((s) => s.loadJson);
  const runAgent = useMatildaStore((s) => s.runAgent);
  const setRules = useMatildaStore((s) => s.setRules);

  const [phase, setPhase] = useState<Phase>(agentDone ? "done" : "empty");
  const [picked, setPicked] = useState(JSON_SOURCES_V4[0].id);
  const [parseErrorMsg, setParseErrorMsg] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const src = JSON_SOURCES_V4.find((x) => x.id === picked) || JSON_SOURCES_V4[0];

  const { count: agentCount, running: agentRunning, start: agentStart, complete: agentComplete } = useStepRunner(AGENT_STEPS_V4.length, 440, () => {
    const rules = structuredDataToRules(MOCK_STRUCTURED_DATA);
    setRules(rules);
    runAgent();
    setPhase("done");
  });

  useEffect(() => {
    if (agentDone && phase === "empty") {
      setPhase("done");
      agentComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const runUpload = () => {
    setPhase("loading");
    timerRef.current = setTimeout(() => {
      loadJson();
      setPhase("parsed");
      setTimeout(() => agentStart(), 500);
    }, 1400);
  };

  const done = phase === "done";
  const agentStepsDone = agentCount;

  return (
    <>
      <div className="surface-header">
        <div>
          <div className="crumbs">DATA TRANSLATION / {projectName || "NUEVA DEFINICIÓN"}</div>
          <h1>Ingesta de datos</h1>
          <div className="sub">Carga el JSON del cliente. El agente IA analizará su estructura y generará las reglas de mapeo.</div>
        </div>
        <div className="actions">
          {done ? (
            <Button variant="primary" onClick={() => router.push("/mapper")}>
              Ir al editor <Icon.arrow />
            </Button>
          ) : (
            <Button variant="ghost" onClick={onBack}>
              <Icon.arrow style={{ transform: "rotate(180deg)" }} /> Volver
            </Button>
          )}
        </div>
      </div>

      <UploadStepper step={2} />

      <div style={{ padding: "0 var(--pad-surface) 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 13, color: "var(--ink-3)" }}>Proyecto:</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-1)", fontWeight: 600 }}>{projectName}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent-ink)", background: "var(--accent-soft)", border: "1px solid var(--accent-line)", borderRadius: "var(--r-xs)", padding: "2px 8px" }}>/{mapperId}</span>
      </div>

      <div className={`dt-upload ${phase === "empty" ? "empty" : ""}`}>
        <div>
          {phase === "empty" && (
            <>
              <div className="dt-drop-zone">
                <div className="ic-wrap">
                  <Icon.json />
                </div>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>Arrastra tu JSON aquí</h3>
                <p style={{ margin: 0, color: "var(--ink-4)", fontSize: 13.5 }}>Soporte para JSON de proceso BPM, sistema propio o exportación de base de datos</p>
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Simular con muestra</div>
                <div className="dt-sample-list">
                  {JSON_SOURCES_V4.map((x) => (
                    <button key={x.id} className={`dt-sample-row ${picked === x.id ? "sel" : ""}`} onClick={() => setPicked(x.id)}>
                      <span style={{ color: "var(--accent)" }}>
                        <Icon.json />
                      </span>
                      <span>
                        <div className="nm">{x.name}</div>
                        <div className="sb">
                          {x.fieldCount} campos · {x.size} · {x.desc}
                        </div>
                      </span>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", border: "1.5px solid var(--line-strong)", background: picked === x.id ? "var(--accent)" : "transparent", flexShrink: 0 }} />
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  <Button variant="primary" size="lg" onClick={runUpload}>
                    <Icon.upload /> Simular carga de {src.name}
                  </Button>
                </div>
              </div>
            </>
          )}

          {phase === "parseError" && (
            <div>
              <FileCard name={src.name} subtitle="Error al procesar con el agente" progress={100} badge={<Chip tone="err">error</Chip>} />
              <div style={{ marginTop: 16, marginBottom: 16 }}>
                <Alert tone="err" title="Error del agente mapper" desc={parseErrorMsg} />
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  setPhase("empty");
                  setParseErrorMsg("");
                }}
              >
                <Icon.refresh /> Reintentar con otro JSON
              </Button>
            </div>
          )}

          {phase === "loading" && <FileCard name={src.name} subtitle="Subiendo… parseando estructura" progress={65} badge={<Chip tone="brand"><Icon.refresh /> procesando</Chip>} />}

          {(phase === "parsed" || phase === "done") && (
            <>
              <div style={{ marginBottom: 16 }}>
                <FileCard
                  name={src.name}
                  subtitle={`${src.fieldCount} campos · ${src.size} · estructura anidada · ${src.desc}`}
                  progress={100}
                  progressTone="ok"
                  badge={<Chip tone="ok">parseado · 31ms</Chip>}
                />
              </div>
              <Card style={{ padding: 0 }}>
                <CardHead icon={<Icon.json />} trailing={<span className="chip" style={{ fontSize: 11, fontFamily: "var(--font-mono)" }}>{src.fieldCount} campos · 5 grupos</span>}>
                  Árbol de campos inferido
                </CardHead>
                <div style={{ padding: "10px 8px" }}>
                  <JsonTree node={JSON_TREE_V4} />
                </div>
                <div style={{ padding: "8px 14px 10px", borderTop: "1px solid var(--line)", display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {[
                    ["ok", "Con match"],
                    ["warn", "Sin equivalente"],
                    ["none", "Sin mapear"],
                  ].map(([c, l]) => (
                    <div key={c} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "var(--ink-4)" }}>
                      <span className={`json-map-dot ${c}`} />
                      {l}
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>

        {(phase === "parsed" || phase === "done") && (
          <div className="agent-aside">
            <AgentCard
              ready={done}
              steps={AGENT_STEPS_V4.map((label, i) => ({
                label,
                state: agentStepsDone > i ? "done" : agentRunning && agentStepsDone === i ? "running" : "idle",
              }))}
            />

            {done && (
              <Card>
                <CardHead icon={<Icon.data />}>Resultado del análisis</CardHead>
                <div style={{ padding: "8px 14px" }}>
                  {[
                    [MOCK_STRUCTURED_DATA.mappedFields.length, "Match perfecto", "var(--ok)"],
                    [MOCK_STRUCTURED_DATA.unmappedFields.length, "Sin equivalente", "var(--warn)"],
                    [MOCK_STRUCTURED_DATA.unmappedSourceFields.length, "Sin mapeo", "var(--ink-3)"],
                  ].map(([n, l, c], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: i < 2 ? "1px solid var(--line)" : "none" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, color: c as string, width: 28 }}>{n}</span>
                      <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{l}</span>
                    </div>
                  ))}
                  <div className="cap" style={{ marginTop: 10 }}>
                    {src.fieldCount} campos · guardado automático
                  </div>
                </div>
              </Card>
            )}

            {done && (
              <Button variant="primary" block onClick={() => router.push("/mapper")}>
                <Icon.flow /> Ir al editor de mapeo <Icon.arrow />
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default function UploadPage() {
  const configDone = useMatildaStore((s) => s.configDone);
  const agentDone = useMatildaStore((s) => s.agentDone);
  const [step, setStep] = useState(configDone ? 1 : 0);

  if (agentDone && step === 1) {
    return <IngestaStep onBack={() => setStep(0)} />;
  }
  if (step === 0) return <ConfigStep onNext={() => setStep(1)} />;
  return <IngestaStep onBack={() => setStep(0)} />;
}
