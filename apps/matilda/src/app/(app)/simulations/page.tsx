"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Icon,
  Button,
  SurfaceHeader,
  SimTabBar,
  SimHistorySidebar,
  SimModelCard,
  SimVersionChip,
  SimDatasetCard,
  SimRunRail,
  SimQueuedView,
  SimRunningView,
  SimFailedView,
  SimMetricCard,
  SimDistributionBar,
  SimResultsTable,
  SimModelRegCard,
  simLatencyLabel,
  type Simulation,
  type DmnModel,
  type SimDataset,
} from "@bowpi/design-system";
import { AddModelModal } from "./components/AddModelModal";
import { ExecutionDrawer } from "./components/ExecutionDrawer";
import { SIM_MODELS, SIM_DATASETS, SIM_SIMULATIONS_SEED, SIM_SUMMARY, SIM_EXECUTIONS, simGetModel, simGetVersion, simGetDataset, simTotalItems } from "../../../data/simulationsData";

export default function SimulationsPage() {
  const [tab, setTab] = useState<"sims" | "models">("sims");

  // Local, mutable copies of the seed data (see simulationsData.ts header comment).
  const [models, setModels] = useState<DmnModel[]>(SIM_MODELS);
  const [datasets, setDatasets] = useState<Record<string, SimDataset[]>>(SIM_DATASETS);
  const [sims, setSims] = useState<Simulation[]>(SIM_SIMULATIONS_SEED);

  const [selectedSimId, setSelectedSimId] = useState<string | null>(sims[0]?.id ?? null);

  // New-run config state
  const [cfgModelId, setCfgModelId] = useState<string | null>(models[0]?.id ?? null);
  const [cfgVersionId, setCfgVersionId] = useState<string | null>(models[0]?.versions.find((v) => v.published)?.versionId ?? models[0]?.versions[0]?.versionId ?? null);
  const [cfgDatasetId, setCfgDatasetId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [openExecId, setOpenExecId] = useState<string | null>(null);
  const [addModelOpen, setAddModelOpen] = useState(false);
  const [publishing, setPublishing] = useState<Record<string, boolean>>({});

  const selectedSim = sims.find((s) => s.id === selectedSimId) ?? null;

  // Advance any RUNNING simulation's progress, then mark it COMPLETED — a lightweight
  // demo of the real async job. Mirrors the prototype's setInterval-driven RunningView.
  useEffect(() => {
    const running = sims.filter((s) => s.status === "RUNNING");
    if (running.length === 0) return;
    const t = setInterval(() => {
      setSims((prev) =>
        prev.map((s) => {
          if (s.status !== "RUNNING") return s;
          const next = s.currentIndex + 1;
          if (next >= s.finalIndex) {
            return { ...s, currentIndex: s.finalIndex, status: "COMPLETED", finishedAt: new Date().toISOString() };
          }
          return { ...s, currentIndex: next };
        })
      );
    }, 900);
    return () => clearInterval(t);
  }, [sims]);

  const cfgModel = simGetModel(models, cfgModelId);
  const cfgVersion = simGetVersion(cfgModel, cfgVersionId);
  const cfgDataset = simGetDataset(datasets, cfgDatasetId);
  const modelDatasets = cfgModelId ? datasets[cfgModelId] || [] : [];

  const handleRun = () => {
    if (!cfgModel || !cfgVersion) return;
    setSubmitting(true);
    setTimeout(() => {
      const id = `sim-${Date.now()}`;
      const totalItems = simTotalItems(datasets, cfgDatasetId);
      const sim: Simulation = {
        id,
        name: `${cfgModel.modelName} — ${cfgVersion.name}`,
        description: cfgDataset ? cfgDataset.title : "Sin dataset — ejecución de prueba",
        modelId: cfgModel.id,
        versionId: cfgVersion.versionId,
        datasetId: cfgDatasetId,
        status: "RUNNING",
        createdAt: new Date().toISOString(),
        finishedAt: null,
        currentIndex: 0,
        finalIndex: Math.max(totalItems, 1),
      };
      setSims((prev) => [sim, ...prev]);
      setSelectedSimId(id);
      setSubmitting(false);
    }, 600);
  };

  const handleTogglePublish = (modelId: string, versionId: string, currentlyPublished: boolean) => {
    setPublishing((p) => ({ ...p, [versionId]: true }));
    setTimeout(() => {
      setModels((prev) =>
        prev.map((m) => (m.id !== modelId ? m : { ...m, versions: m.versions.map((v) => (v.versionId !== versionId ? v : { ...v, published: !currentlyPublished })) }))
      );
      setPublishing((p) => {
        const n = { ...p };
        delete n[versionId];
        return n;
      });
    }, 700);
  };

  const openExecution = selectedSim && openExecId ? (SIM_EXECUTIONS[selectedSim.id] || []).find((e) => e.id === openExecId) : null;
  const execIndex = openExecution && selectedSim ? (SIM_EXECUTIONS[selectedSim.id] || []).findIndex((e) => e.id === openExecId) : -1;

  return (
    <>
      <SurfaceHeader crumbs="DATA TRANSLATION / SIMULACIONES" title="Simulaciones DMN" sub="Ejecuta modelos de decisión contra datasets de prueba y revisa resultados." />

      <div style={{ padding: "0 var(--pad-surface) 20px" }}>
        <SimTabBar
          tabs={[
            { value: "sims", label: "Simulaciones" },
            { value: "models", label: "Modelos" },
          ]}
          value={tab}
          onChange={(v) => setTab(v as "sims" | "models")}
          tenant="bs.prod"
        />
      </div>

      {tab === "sims" && (
        <div style={{ display: "flex", flex: 1, minHeight: 0, padding: "0 var(--pad-surface) var(--pad-surface)", gap: 20 }}>
          <div style={{ flexShrink: 0, width: 300 }}>
            <SimHistorySidebar simulations={sims} selectedId={selectedSimId} onSelect={(s) => setSelectedSimId(s.id)} onNew={() => setSelectedSimId(null)} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {!selectedSim && (
              <div>
                <div className="sim-config-label">MODELO</div>
                <div className="sim-model-grid">
                  {models.map((m) => (
                    <SimModelCard
                      key={m.id}
                      modelName={m.modelName}
                      modelDescription={m.modelDescription}
                      active={cfgModelId === m.id}
                      onClick={() => {
                        setCfgModelId(m.id);
                        const firstPublished = m.versions.find((v) => v.published)?.versionId ?? m.versions[0]?.versionId ?? null;
                        setCfgVersionId(firstPublished);
                        setCfgDatasetId(null);
                      }}
                    />
                  ))}
                </div>

                {cfgModel && (
                  <>
                    <div className="sim-config-label" style={{ marginTop: 16 }}>
                      VERSIÓN
                    </div>
                    <div className="sim-version-chips">
                      {cfgModel.versions.map((v) => (
                        <SimVersionChip key={v.versionId} active={cfgVersionId === v.versionId} onClick={() => setCfgVersionId(v.versionId)}>
                          {v.name}
                        </SimVersionChip>
                      ))}
                    </div>
                  </>
                )}

                <div className="sim-config-label" style={{ marginTop: 16 }}>
                  DATASET
                </div>
                {modelDatasets.length === 0 ? (
                  <div style={{ fontSize: 12.5, color: "var(--ink-4)", fontFamily: "var(--font-mono)" }}>Sin datasets para este modelo — la corrida procesará 1 ítem de prueba.</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {modelDatasets.map((d) => (
                      <SimDatasetCard
                        key={d.id}
                        title={d.title}
                        description={d.description}
                        filename={d.files[0]?.filename}
                        itemCount={d.files.reduce((s, f) => s + f.itemCount, 0)}
                        active={cfgDatasetId === d.id}
                        onClick={() => setCfgDatasetId(d.id)}
                      />
                    ))}
                  </div>
                )}

                <div style={{ marginTop: 24 }}>
                  <SimRunRail
                    modelName={cfgModel?.modelName}
                    versionName={cfgVersion?.name}
                    datasetTitle={cfgDataset?.title}
                    execCount={Math.max(simTotalItems(datasets, cfgDatasetId), 1)}
                    canRun={!!cfgModel && !!cfgVersion}
                    submitting={submitting}
                    onRun={handleRun}
                  />
                </div>
              </div>
            )}

            {selectedSim && selectedSim.status === "QUEUED" && <SimQueuedView totalItems={selectedSim.finalIndex} />}
            {selectedSim && selectedSim.status === "RUNNING" && <SimRunningView current={selectedSim.currentIndex} total={selectedSim.finalIndex} />}
            {selectedSim && selectedSim.status === "FAILED" && <SimFailedView message={selectedSim.error?.message} />}

            {selectedSim && selectedSim.status === "COMPLETED" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {(() => {
                  const executions = SIM_EXECUTIONS[selectedSim.id] || [];
                  const summary = SIM_SUMMARY[selectedSim.id];
                  const total = summary?.total ?? executions.length;
                  const completed = summary?.completed ?? executions.filter((e) => e.success).length;
                  const failed = summary?.failed ?? executions.filter((e) => !e.success).length;
                  const avgLatency = summary?.avgLatencyMs ?? null;
                  const decisionLabel = cfgModel?.versions[0]?.metadata.decisionNames.slice(-1)[0] ?? "Decisión";
                  return (
                    <>
                      <div className="sim-metrics-grid">
                        <SimMetricCard label="Total" value={total} sub={`${total} cargados`} />
                        <SimMetricCard label="Exitosas" value={completed} tone="ok" sub={`de ${total}`} />
                        <SimMetricCard label="Fallidas" value={failed} tone="err" sub={`de ${total}`} />
                        <SimMetricCard label="Lat. media" value={simLatencyLabel(avgLatency)} tone="accent" sub="promedio" />
                        <SimMetricCard label="Decisiones" value={cfgModel?.versions[0]?.decisions ?? "—"} sub="por run" />
                      </div>

                      {total > 0 && (
                        <SimDistributionBar
                          total={total}
                          segments={[
                            { key: "ok", label: "Exitosas", count: completed, tone: "ok" },
                            { key: "err", label: "Fallidas", count: failed, tone: "err" },
                          ]}
                        />
                      )}

                      {executions.length > 0 ? (
                        <SimResultsTable executions={executions} decisionLabel={decisionLabel} openExecId={openExecId} onRowClick={(exec) => setOpenExecId(exec.id)} />
                      ) : (
                        <div style={{ fontSize: 12.5, color: "var(--ink-4)", fontFamily: "var(--font-mono)", padding: "20px 0" }}>
                          Sin resultados detallados por ítem para esta corrida (dataset de prueba).
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "models" && (
        <div style={{ padding: "0 var(--pad-surface) var(--pad-surface)" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <Button variant="primary" onClick={() => setAddModelOpen(true)}>
              <Icon.plus /> Agregar modelo
            </Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {models.map((m) => (
              <SimModelRegCard key={m.id} model={m} publishing={publishing} onTogglePublish={handleTogglePublish} />
            ))}
          </div>
        </div>
      )}

      {addModelOpen && (
        <AddModelModal
          onClose={() => setAddModelOpen(false)}
          onAdd={(model) => {
            setModels((prev) => [...prev, model]);
            setDatasets((prev) => ({ ...prev, [model.id]: [] }));
            setAddModelOpen(false);
          }}
        />
      )}

      {openExecution && selectedSim && <ExecutionDrawer execution={openExecution} simModelId={selectedSim.modelId} execIndex={execIndex} onClose={() => setOpenExecId(null)} />}
    </>
  );
}
