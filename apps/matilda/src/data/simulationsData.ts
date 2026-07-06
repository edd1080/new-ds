/**
 * Mock data — ported from project/v4/simulations-data.jsx.
 * In production this is replaced by calls to the Simulations/DMN service.
 *
 * SIM_MODELS / SIM_DATASETS / SIM_SIMULATIONS_SEED are treated as read-only
 * seed data: the Simulaciones page copies them into React state on mount so
 * that "adding a model", "adding a dataset" and "running a simulation" don't
 * mutate a shared module-level object (the original prototype mutated
 * SIM_SIMULATIONS directly via .unshift() — fine for a single global <script>,
 * not for a React module that can be imported by multiple components/instances).
 */
import type { DmnGraph, DmnModel, SimDataset, SimExecution, SimSummary, Simulation } from "@bowpi/design-system";

export const SIM_MODELS: DmnModel[] = [
  {
    id: "mdl-001",
    modelName: "Decisión de Crédito",
    modelDescription: "Evalúa el perfil crediticio y genera una decisión de aprobación",
    creationDate: "2026-04-10T09:00:00Z",
    versions: [
      {
        versionId: "v-001a",
        name: "v1.0.0",
        description: "Versión inicial",
        published: true,
        fileSizeBytes: 14200,
        decisions: 3,
        inputs: 4,
        metadata: {
          namespace: "credit-decision",
          decisionNames: ["EvaluarPerfil", "CalcularScore", "DecisiónFinal"],
          inputFields: ["edad", "ingresos", "empleo", "historialCrediticio"],
        },
      },
      {
        versionId: "v-001b",
        name: "v1.1.0",
        description: "Ajuste de umbrales de score",
        published: false,
        fileSizeBytes: 14850,
        decisions: 3,
        inputs: 4,
        metadata: {
          namespace: "credit-decision",
          decisionNames: ["EvaluarPerfil", "CalcularScore", "DecisiónFinal"],
          inputFields: ["edad", "ingresos", "empleo", "historialCrediticio"],
        },
      },
    ],
  },
  {
    id: "mdl-002",
    modelName: "Aprobación de Préstamo",
    modelDescription: "Verifica identidad y capacidad de pago para préstamos personales",
    creationDate: "2026-05-02T14:30:00Z",
    versions: [
      {
        versionId: "v-002a",
        name: "v2.0.0",
        description: "Versión de producción",
        published: true,
        fileSizeBytes: 9800,
        decisions: 3,
        inputs: 3,
        metadata: {
          namespace: "loan-approval",
          decisionNames: ["VerificarIdentidad", "EvaluarCapacidad", "AprobarPréstamo"],
          inputFields: ["cedula", "ingresos", "monto"],
        },
      },
    ],
  },
];

export const SIM_DATASETS: Record<string, SimDataset[]> = {
  "mdl-001": [
    {
      id: "ds-001",
      modelId: "mdl-001",
      title: "Lote Q2 2026 — Aplicaciones",
      description: "Solicitudes de crédito segundo trimestre",
      createdAt: "2026-06-01T08:00:00Z",
      files: [{ filename: "aplicaciones-q2.json", itemCount: 3 }],
    },
    {
      id: "ds-002",
      modelId: "mdl-001",
      title: "Test Regresión Junio",
      description: "Dataset de regresión para validar cambios",
      createdAt: "2026-06-15T11:00:00Z",
      files: [{ filename: "regression-jun.json", itemCount: 5 }],
    },
  ],
  "mdl-002": [],
};

export const SIM_SIMULATIONS_SEED: Simulation[] = [
  {
    id: "sim-20260702-001",
    name: "Q2 batch — regresión completa",
    description: "Validación full del modelo v1.1.0 contra lote Q2",
    modelId: "mdl-001",
    versionId: "v-001b",
    datasetId: "ds-001",
    status: "COMPLETED",
    createdAt: "2026-07-02T10:00:00Z",
    finishedAt: "2026-07-02T10:00:18Z",
    currentIndex: 3,
    finalIndex: 3,
  },
  {
    id: "sim-20260702-002",
    name: "Regresión Junio — 5 ítems",
    description: "Corrida de regresión sobre dataset de junio",
    modelId: "mdl-001",
    versionId: "v-001a",
    datasetId: "ds-002",
    status: "RUNNING",
    createdAt: "2026-07-02T11:30:00Z",
    finishedAt: null,
    currentIndex: 2,
    finalIndex: 5,
  },
  {
    id: "sim-20260701-003",
    name: "Prueba préstamo — dataset vacío",
    description: "Intento fallido por esquema incompatible",
    modelId: "mdl-002",
    versionId: "v-002a",
    datasetId: null,
    status: "FAILED",
    createdAt: "2026-07-01T16:45:00Z",
    finishedAt: "2026-07-01T16:45:03Z",
    currentIndex: 0,
    finalIndex: 0,
    error: { code: "SCHEMA_MISMATCH", message: "Dataset schema mismatch: field 'cedula' missing on 3/3 items.", failedAt: "2026-07-01T16:45:03Z" },
  },
];

export const SIM_SUMMARY: Record<string, SimSummary> = {
  "sim-20260702-001": { total: 3, completed: 3, failed: 1, running: 0, avgLatencyMs: 58, distribution: { SUCCEEDED: 2, FAILED: 1 } },
};

/** Executions para sim-20260702-001 */
export const SIM_EXECUTIONS: Record<string, SimExecution[]> = {
  "sim-20260702-001": [
    {
      id: "exec-001a",
      success: true,
      request: { edad: 34, ingresos: 8500, empleo: "dependiente", historialCrediticio: "limpio" },
      decisionResults: [
        { decisionId: "d-eval", decisionName: "EvaluarPerfil", result: "APTO", status: "SUCCEEDED", messages: [] },
        { decisionId: "d-score", decisionName: "CalcularScore", result: 82, status: "SUCCEEDED", messages: [] },
        { decisionId: "d-final", decisionName: "DecisiónFinal", result: "APROBADO", status: "SUCCEEDED", messages: [] },
      ],
      error: null,
      createdAt: "2026-07-02T10:00:01Z",
      finishedAt: "2026-07-02T10:00:01Z",
    },
    {
      id: "exec-001b",
      success: true,
      request: { edad: 28, ingresos: 12000, empleo: "independiente", historialCrediticio: "limpio" },
      decisionResults: [
        { decisionId: "d-eval", decisionName: "EvaluarPerfil", result: "APTO", status: "SUCCEEDED", messages: [] },
        { decisionId: "d-score", decisionName: "CalcularScore", result: 91, status: "SUCCEEDED", messages: [] },
        { decisionId: "d-final", decisionName: "DecisiónFinal", result: "APROBADO", status: "SUCCEEDED", messages: [] },
      ],
      error: null,
      createdAt: "2026-07-02T10:00:07Z",
      finishedAt: "2026-07-02T10:00:07Z",
    },
    {
      id: "exec-001c",
      success: false,
      request: { edad: 21, ingresos: 1800, empleo: "sin_empleo", historialCrediticio: "con_mora" },
      decisionResults: [
        {
          decisionId: "d-eval",
          decisionName: "EvaluarPerfil",
          result: "OBSERVADO",
          status: "SUCCEEDED",
          messages: [{ level: "WARN", text: "Historial con mora reciente." }],
        },
        { decisionId: "d-score", decisionName: "CalcularScore", result: 31, status: "SUCCEEDED", messages: [] },
        {
          decisionId: "d-final",
          decisionName: "DecisiónFinal",
          result: null,
          status: "FAILED",
          messages: [{ level: "ERROR", text: "Score < 40: aprobación denegada automáticamente." }],
        },
      ],
      error: null,
      createdAt: "2026-07-02T10:00:15Z",
      finishedAt: "2026-07-02T10:00:15Z",
    },
  ],
};

/*
 * Grafo DMN — estructura compatible con React Flow.
 * Al migrar: pasar nodes/edges directamente a <ReactFlow nodeTypes={nodeTypes} />
 * nodeTypes = { inputData: SimDmnNodeInput, decision: SimDmnNodeDecision }
 */
export const SIM_DMN_GRAPH: Record<string, DmnGraph> = {
  "mdl-001": {
    nodes: [
      { id: "inp-edad", type: "inputData", position: { x: 40, y: 20 }, data: { label: "edad" } },
      { id: "inp-ing", type: "inputData", position: { x: 220, y: 20 }, data: { label: "ingresos" } },
      { id: "inp-emp", type: "inputData", position: { x: 400, y: 20 }, data: { label: "empleo" } },
      { id: "inp-hist", type: "inputData", position: { x: 580, y: 20 }, data: { label: "historialCrediticio" } },
      { id: "d-eval", type: "decision", position: { x: 120, y: 160 }, data: { label: "EvaluarPerfil", decisionId: "d-eval", expression: 'if historialCrediticio = "limpio" then "APTO" else "OBSERVADO"' } },
      { id: "d-score", type: "decision", position: { x: 320, y: 160 }, data: { label: "CalcularScore", decisionId: "d-score", expression: "if ingresos > 5000 then round(ingresos/150) else round(ingresos/200)" } },
      { id: "d-final", type: "decision", position: { x: 220, y: 310 }, data: { label: "DecisiónFinal", decisionId: "d-final", expression: "if CalcularScore >= 40 and EvaluarPerfil = \"APTO\" then \"APROBADO\" else \"RECHAZADO\"" } },
    ],
    edges: [
      { id: "e1", source: "inp-edad", target: "d-eval", type: "informationRequirement" },
      { id: "e2", source: "inp-hist", target: "d-eval", type: "informationRequirement" },
      { id: "e3", source: "inp-ing", target: "d-score", type: "informationRequirement" },
      { id: "e4", source: "inp-emp", target: "d-score", type: "informationRequirement" },
      { id: "e5", source: "d-eval", target: "d-final", type: "informationRequirement" },
      { id: "e6", source: "d-score", target: "d-final", type: "informationRequirement" },
    ],
  },
  "mdl-002": {
    nodes: [
      { id: "inp-ced", type: "inputData", position: { x: 40, y: 20 }, data: { label: "cedula" } },
      { id: "inp-ing2", type: "inputData", position: { x: 200, y: 20 }, data: { label: "ingresos" } },
      { id: "inp-mnt", type: "inputData", position: { x: 360, y: 20 }, data: { label: "monto" } },
      { id: "d-id", type: "decision", position: { x: 40, y: 160 }, data: { label: "VerificarIdentidad", decisionId: "d-id", expression: "cedula != null and length(cedula) = 10" } },
      { id: "d-cap", type: "decision", position: { x: 220, y: 160 }, data: { label: "EvaluarCapacidad", decisionId: "d-cap", expression: "ingresos / monto >= 0.3" } },
      { id: "d-apro", type: "decision", position: { x: 130, y: 310 }, data: { label: "AprobarPréstamo", decisionId: "d-apro", expression: "VerificarIdentidad and EvaluarCapacidad" } },
    ],
    edges: [
      { id: "e1", source: "inp-ced", target: "d-id", type: "informationRequirement" },
      { id: "e2", source: "inp-ing2", target: "d-cap", type: "informationRequirement" },
      { id: "e3", source: "inp-mnt", target: "d-cap", type: "informationRequirement" },
      { id: "e4", source: "d-id", target: "d-apro", type: "informationRequirement" },
      { id: "e5", source: "d-cap", target: "d-apro", type: "informationRequirement" },
    ],
  },
};

// ─── Data-shape helpers (depend on the in-memory models/datasets collections,
// so they live here rather than in the design-system's format-only utils) ──

export function simGetModel(models: DmnModel[], modelId: string | null | undefined): DmnModel | undefined {
  return models.find((m) => m.id === modelId);
}

export function simGetVersion(model: DmnModel | undefined, versionId: string | null | undefined) {
  return model?.versions.find((v) => v.versionId === versionId);
}

export function simGetDataset(datasetsByModel: Record<string, SimDataset[]>, datasetId: string | null | undefined): SimDataset | undefined {
  return Object.values(datasetsByModel)
    .flat()
    .find((d) => d.id === datasetId);
}

export function simTotalItems(datasetsByModel: Record<string, SimDataset[]>, datasetId: string | null | undefined): number {
  const ds = simGetDataset(datasetsByModel, datasetId);
  return ds ? ds.files.reduce((s, f) => s + f.itemCount, 0) : 0;
}
