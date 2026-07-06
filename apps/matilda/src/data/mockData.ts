/**
 * Mock data — ported from project/v4/store.jsx.
 * In production this is replaced by calls to the Mapper Service / canonical catalog API.
 */
import type { Project, StructuredData, JsonTreeNode, DtStep, JsonSourceItem } from "@bowpi/design-system";

export const DT_PROJECTS: Project[] = [
  { id: "credito-individual-ptc", name: "Crédito Individual PTC", source: "credito_individual.json", status: "published", mapperId: "credito-individual-ptc", rules: 29, coverage: 94, updated: "10 jun 2026", client: "Banco Solidario" },
  { id: "credito-grupal-bpr", name: "Crédito Grupal BPR", source: "banco_bpr.json", status: "draft", mapperId: "credito-grupal-bpr", rules: 21, coverage: 71, updated: "14 jun 2026", client: "Banco Solidario" },
  { id: "microempresa-cofradia", name: "Microempresa — Cofradía", source: null, status: "analysis", mapperId: "microempresa-cofradia", rules: 0, coverage: 0, updated: "17 jun 2026", client: "Banco Solidario" },
  { id: "credito-historico-v0", name: "Crédito Histórico v0 (demo: no encontrado)", source: null, status: "notFound", mapperId: "credito-historico-v0", rules: 0, coverage: 0, updated: "—", client: "Banco Solidario" },
];

export const DT_STEPS: DtStep[] = [
  { id: "config", label: "Configuración", surface: "upload" },
  { id: "ingesta", label: "Ingesta de datos", surface: "upload" },
  { id: "editor", label: "Editor de mapeo", surface: "mapper" },
];

export const JSON_SOURCES_V4: JsonSourceItem[] = [
  { id: "credito-individual", name: "credito_individual.json", size: "11.4 KB", fieldCount: 29, desc: "JSON crédito individual — Banco Solidario" },
  { id: "credito-grupal", name: "credito_grupal.json", size: "8.2 KB", fieldCount: 22, desc: "JSON crédito grupal — BPR" },
];

export const AGENT_STEPS_V4: string[] = [
  "Parseando estructura JSON",
  "Inferiendo tipos de dato",
  "Consultando Canónico v9.0.0",
  "Generando reglas de mapeo",
  "Validando coherencia semántica",
];

export const JSON_TREE_V4: JsonTreeNode = {
  key: "root",
  type: "object",
  children: [
    {
      key: "solicitud", type: "object", children: [
        { key: "id", type: "string", value: '"SOL-2024-001234"', mapStatus: "none" },
        { key: "fechaCreacion", type: "string", value: '"2024-06-10T14:23:00Z"', mapStatus: "none" },
        { key: "canal", type: "string", value: '"DIGITAL"', mapStatus: "warn" },
        { key: "tipoProducto", type: "string", value: '"CREDITO_INDIVIDUAL"', mapStatus: "none" },
      ],
    },
    {
      key: "solicitante", type: "object", children: [
        { key: "primerNombre", type: "string", value: '"María"', mapStatus: "none" },
        { key: "segundoNombre", type: "string", value: '"Elena"', mapStatus: "none" },
        { key: "primerApellido", type: "string", value: '"González"', mapStatus: "none" },
        { key: "segundoApellido", type: "string", value: '"Ruiz"', mapStatus: "none" },
        { key: "cedula", type: "string", value: '"0912345678"', mapStatus: "ok" },
        { key: "tipoCedula", type: "string", value: '"CC"', mapStatus: "ok" },
        { key: "fechaNacimiento", type: "string", value: '"1988-07-15"', mapStatus: "ok" },
        { key: "genero", type: "string", value: '"F"', mapStatus: "none" },
        { key: "estadoCivil", type: "string", value: '"C"', mapStatus: "warn" },
        { key: "correoElectronico", type: "string", value: '"maria.gonzalez@email.com"', mapStatus: "ok" },
        { key: "celular", type: "string", value: '"0991234567"', mapStatus: "ok" },
        { key: "ciudad", type: "string", value: '"Guayaquil"', mapStatus: "ok" },
      ],
    },
    {
      key: "laboralInfo", type: "object", children: [
        { key: "tipoEmpleo", type: "string", value: '"DEPENDIENTE"', mapStatus: "ok" },
        { key: "nombreEmpresa", type: "string", value: '"Corporación Favorita"', mapStatus: "ok" },
        { key: "cargo", type: "string", value: '"Analista Senior"', mapStatus: "none" },
        { key: "ingresosMensuales", type: "number", value: "2850.00", mapStatus: "ok" },
        { key: "anosAntigüedad", type: "number", value: "6", mapStatus: "ok" },
      ],
    },
    {
      key: "creditoSolicitado", type: "object", children: [
        { key: "monto", type: "number", value: "15000", mapStatus: "ok" },
        { key: "plazoMeses", type: "number", value: "36", mapStatus: "ok" },
        { key: "destinoCredito", type: "string", value: '"CONSUMO"', mapStatus: "warn" },
        { key: "cuotaEstimada", type: "number", value: "485.50", mapStatus: "none" },
      ],
    },
    {
      key: "buroCredito", type: "object", children: [
        { key: "scoreActual", type: "number", value: "742", mapStatus: "ok" },
        { key: "fechaConsulta", type: "string", value: '"2024-06-10"', mapStatus: "none" },
        { key: "totalDeuda", type: "number", value: "8500", mapStatus: "ok" },
        { key: "cuentasActivas", type: "number", value: "3", mapStatus: "ok" },
      ],
    },
  ],
};

export const MOCK_STRUCTURED_DATA: StructuredData = {
  mappedFields: [
    { source: { path: "solicitante.cedula", value: "0912345678" }, standard: { path: "profile.personalInfo.nationalId", type: "STR" } },
    { source: { path: "solicitante.tipoCedula", value: "CC" }, standard: { path: "profile.personalInfo.nationalIdType", type: "STR" } },
    { source: { path: "solicitante.fechaNacimiento", value: "1988-07-15" }, standard: { path: "profile.personalInfo.birthDate", type: "STR" } },
    { source: { path: "solicitante.correoElectronico", value: "maria.gonzalez@email.com" }, standard: { path: "profile.contactInfo.email", type: "STR" } },
    { source: { path: "solicitante.celular", value: "0991234567" }, standard: { path: "profile.contactInfo.phone", type: "STR" } },
    { source: { path: "solicitante.ciudad", value: "Guayaquil" }, standard: { path: "profile.contactInfo.city", type: "STR" } },
    { source: { path: "laboralInfo.tipoEmpleo", value: "DEPENDIENTE" }, standard: { path: "profile.employmentInfo.employmentType", type: "STR" } },
    { source: { path: "laboralInfo.nombreEmpresa", value: "Corporación Favorita" }, standard: { path: "profile.employmentInfo.employerName", type: "STR" } },
    { source: { path: "laboralInfo.ingresosMensuales", value: 2850.0 }, standard: { path: "paymentCapacity.monthlyIncome", type: "NUM" } },
    { source: { path: "laboralInfo.anosAntigüedad", value: 6 }, standard: { path: "profile.employmentInfo.yearsEmployed", type: "INT" } },
    { source: { path: "creditoSolicitado.monto", value: 15000 }, standard: { path: "paymentCapacity.requestedAmount", type: "NUM" } },
    { source: { path: "creditoSolicitado.plazoMeses", value: 36 }, standard: { path: "paymentCapacity.requestedTerm", type: "INT" } },
    { source: { path: "buroCredito.scoreActual", value: 742 }, standard: { path: "bureaus.score", type: "INT" } },
    { source: { path: "buroCredito.totalDeuda", value: 8500 }, standard: { path: "bureaus.totalDebt", type: "NUM" } },
    { source: { path: "buroCredito.cuentasActivas", value: 3 }, standard: { path: "bureaus.openAccounts", type: "INT" } },
  ],
  unmappedFields: [
    { source: { path: "solicitante.estadoCivil", value: "C" }, reason: "Enum sin tabla de conversión hacia maritalStatus" },
    { source: { path: "creditoSolicitado.destinoCredito", value: "CONSUMO" }, reason: "Código local sin equivalente canónico directo" },
    { source: { path: "solicitud.canal", value: "DIGITAL" }, reason: "Campo contextual sin mapeo en el canónico" },
  ],
  unmappedSourceFields: [
    { source: { path: "solicitud.id", value: "SOL-2024-001234" } },
    { source: { path: "solicitud.fechaCreacion", value: "2024-06-10T14:23:00Z" } },
    { source: { path: "solicitud.tipoProducto", value: "CREDITO_INDIVIDUAL" } },
    { source: { path: "solicitante.primerNombre", value: "María" } },
    { source: { path: "solicitante.segundoNombre", value: "Elena" } },
    { source: { path: "solicitante.primerApellido", value: "González" } },
    { source: { path: "solicitante.segundoApellido", value: "Ruiz" } },
    { source: { path: "solicitante.genero", value: "F" } },
    { source: { path: "laboralInfo.cargo", value: "Analista Senior" } },
    { source: { path: "creditoSolicitado.cuotaEstimada", value: 485.5 } },
    { source: { path: "buroCredito.fechaConsulta", value: "2024-06-10" } },
  ],
};

export interface CanonicalCatalogItem {
  id: string;
  path: string;
  name: string;
  description: string;
  domainId: string;
  categories: string[];
}

export const CANONICAL_CATALOG: CanonicalCatalogItem[] = [
  { id: "m1", path: "metadata.createdAt", name: "Fecha de creación", description: "Timestamp ISO 8601 de creación de la solicitud", domainId: "D-META", categories: ["metadata", "fecha"] },
  { id: "m2", path: "metadata.updatedAt", name: "Última actualización", description: "Timestamp de la última modificación del registro", domainId: "D-META", categories: ["metadata", "fecha"] },
  { id: "m3", path: "metadata.source", name: "Sistema origen", description: "Sistema que generó la solicitud", domainId: "D-META", categories: ["metadata"] },
  { id: "m4", path: "metadata.tenantId", name: "ID del tenant", description: "Slug de la institución financiera", domainId: "D-META", categories: ["metadata"] },
  { id: "m5", path: "metadata.processId", name: "ID del proceso", description: "Referencia al proceso crediticio activo", domainId: "D-META", categories: ["metadata", "proceso"] },
  { id: "m6", path: "metadata.status", name: "Estado", description: "Estado actual de la solicitud", domainId: "D-META", categories: ["metadata"] },
  { id: "m7", path: "metadata.version", name: "Versión del esquema", description: "Versión del esquema de datos de la solicitud", domainId: "D-META", categories: ["metadata"] },
  { id: "p1", path: "processContext.processId", name: "ID del proceso", description: "Referencia interna al proceso en el motor de decisión", domainId: "D-PROC", categories: ["proceso"] },
  { id: "p2", path: "processContext.processType", name: "Tipo de proceso", description: "Evaluación, renovación, consulta", domainId: "D-PROC", categories: ["proceso"] },
  { id: "p3", path: "processContext.startedAt", name: "Inicio del proceso", description: "Timestamp de inicio de la evaluación crediticia", domainId: "D-PROC", categories: ["proceso", "fecha"] },
  { id: "p4", path: "processContext.completedAt", name: "Fin del proceso", description: "Timestamp de cierre del proceso", domainId: "D-PROC", categories: ["proceso", "fecha"] },
  { id: "p5", path: "processContext.agentId", name: "ID del agente", description: "Agente evaluador asignado al proceso", domainId: "D-PROC", categories: ["proceso"] },
  { id: "p6", path: "processContext.sessionId", name: "ID de sesión", description: "Sesión activa de evaluación del cliente", domainId: "D-PROC", categories: ["proceso"] },
  { id: "p7", path: "processContext.templateId", name: "ID de plantilla", description: "Plantilla de evaluación utilizada", domainId: "D-PROC", categories: ["proceso"] },
  { id: "pr1", path: "profile.personalInfo.firstName", name: "Primer nombre", description: "Primer nombre del solicitante", domainId: "D-PERFIL", categories: ["perfil", "identidad"] },
  { id: "pr2", path: "profile.personalInfo.lastName", name: "Apellido", description: "Apellido(s) del solicitante", domainId: "D-PERFIL", categories: ["perfil", "identidad"] },
  { id: "pr3", path: "profile.personalInfo.fullName", name: "Nombre completo", description: "Nombre y apellidos concatenados", domainId: "D-PERFIL", categories: ["perfil", "identidad"] },
  { id: "pr4", path: "profile.personalInfo.nationalId", name: "Cédula / Documento", description: "Número de identificación nacional", domainId: "D-PERFIL", categories: ["perfil", "identidad"] },
  { id: "pr5", path: "profile.personalInfo.nationalIdType", name: "Tipo de documento", description: "CC, CE, PAS, RUC…", domainId: "D-PERFIL", categories: ["perfil", "identidad"] },
  { id: "pr6", path: "profile.personalInfo.birthDate", name: "Fecha de nacimiento", description: "Fecha de nacimiento en ISO 8601", domainId: "D-PERFIL", categories: ["perfil", "fecha"] },
  { id: "pr7", path: "profile.personalInfo.age", name: "Edad", description: "Edad calculada en años completos", domainId: "D-PERFIL", categories: ["perfil"] },
  { id: "pr8", path: "profile.personalInfo.gender", name: "Género", description: "Género declarado del solicitante", domainId: "D-PERFIL", categories: ["perfil"] },
  { id: "pr9", path: "profile.personalInfo.maritalStatus", name: "Estado civil", description: "Soltero, casado, divorciado, etc.", domainId: "D-PERFIL", categories: ["perfil"] },
  { id: "pr10", path: "profile.personalInfo.nationality", name: "Nacionalidad", description: "País de nacionalidad del solicitante", domainId: "D-PERFIL", categories: ["perfil", "identidad"] },
  { id: "pr11", path: "profile.contactInfo.email", name: "Correo electrónico", description: "Email de contacto del solicitante", domainId: "D-PERFIL", categories: ["perfil", "contacto"] },
  { id: "pr12", path: "profile.contactInfo.phone", name: "Teléfono", description: "Número de teléfono de contacto", domainId: "D-PERFIL", categories: ["perfil", "contacto"] },
  { id: "pr13", path: "profile.contactInfo.address", name: "Dirección", description: "Dirección de residencia actual", domainId: "D-PERFIL", categories: ["perfil", "contacto"] },
  { id: "pr14", path: "profile.contactInfo.city", name: "Ciudad", description: "Ciudad de residencia", domainId: "D-PERFIL", categories: ["perfil", "contacto"] },
  { id: "pr15", path: "profile.contactInfo.country", name: "País", description: "País de residencia", domainId: "D-PERFIL", categories: ["perfil", "contacto"] },
  { id: "pr16", path: "profile.contactInfo.postalCode", name: "Código postal", description: "Código postal de la dirección", domainId: "D-PERFIL", categories: ["perfil", "contacto"] },
  { id: "pr17", path: "profile.employmentInfo.employmentType", name: "Tipo de empleo", description: "Dependiente, independiente, pensionado…", domainId: "D-PERFIL", categories: ["perfil", "empleo"] },
  { id: "pr18", path: "profile.employmentInfo.employerName", name: "Empresa empleadora", description: "Nombre de la empresa donde trabaja", domainId: "D-PERFIL", categories: ["perfil", "empleo"] },
  { id: "pr19", path: "profile.employmentInfo.jobTitle", name: "Cargo", description: "Título del puesto de trabajo actual", domainId: "D-PERFIL", categories: ["perfil", "empleo"] },
  { id: "pr20", path: "profile.employmentInfo.monthlyIncome", name: "Ingreso mensual (emp.)", description: "Ingresos mensuales por relación laboral", domainId: "D-PERFIL", categories: ["perfil", "empleo", "ingresos"] },
  { id: "pr21", path: "profile.employmentInfo.yearsEmployed", name: "Antigüedad laboral", description: "Años continuos en el empleo actual", domainId: "D-PERFIL", categories: ["perfil", "empleo"] },
  { id: "pr22", path: "profile.employmentInfo.industryCode", name: "Sector económico", description: "Código de industria del empleador", domainId: "D-PERFIL", categories: ["perfil", "empleo"] },
  { id: "pr23", path: "profile.employmentInfo.contractType", name: "Tipo de contrato", description: "Indefinido, temporal, por obra…", domainId: "D-PERFIL", categories: ["perfil", "empleo"] },
  { id: "pc1", path: "paymentCapacity.monthlyIncome", name: "Ingreso mensual total", description: "Ingresos netos mensuales del solicitante", domainId: "D-CRED", categories: ["capacidad", "ingresos"] },
  { id: "pc2", path: "paymentCapacity.monthlyExpenses", name: "Gastos mensuales", description: "Total de egresos y compromisos mensuales fijos", domainId: "D-CRED", categories: ["capacidad"] },
  { id: "pc3", path: "paymentCapacity.netCapacity", name: "Capacidad neta", description: "Diferencia neta entre ingresos y gastos", domainId: "D-CRED", categories: ["capacidad"] },
  { id: "pc4", path: "paymentCapacity.debtRatio", name: "Ratio de endeudamiento", description: "Proporción de deuda sobre ingresos totales", domainId: "D-CRED", categories: ["capacidad"] },
  { id: "pc5", path: "paymentCapacity.requestedAmount", name: "Monto solicitado", description: "Monto total del crédito solicitado", domainId: "D-CRED", categories: ["capacidad", "crédito"] },
  { id: "pc6", path: "paymentCapacity.requestedTerm", name: "Plazo solicitado", description: "Número de meses del crédito", domainId: "D-CRED", categories: ["capacidad", "crédito"] },
  { id: "pc7", path: "paymentCapacity.loanPurpose", name: "Destino del crédito", description: "Uso previsto de los fondos solicitados", domainId: "D-CRED", categories: ["capacidad", "crédito"] },
  { id: "pc8", path: "paymentCapacity.installmentAmount", name: "Cuota estimada", description: "Valor de la cuota mensual calculada", domainId: "D-CRED", categories: ["capacidad", "crédito"] },
  { id: "pc9", path: "paymentCapacity.disposableIncome", name: "Ingreso disponible", description: "Ingresos disponibles tras deducir gastos fijos", domainId: "D-CRED", categories: ["capacidad", "ingresos"] },
  { id: "b1", path: "bureaus.score", name: "Score de buró", description: "Puntaje de calificación crediticia", domainId: "D-BURO", categories: ["buró"] },
  { id: "b2", path: "bureaus.reportDate", name: "Fecha del reporte", description: "Fecha de generación del reporte de buró", domainId: "D-BURO", categories: ["buró", "fecha"] },
  { id: "b3", path: "bureaus.openAccounts", name: "Cuentas activas", description: "Número de cuentas de crédito vigentes", domainId: "D-BURO", categories: ["buró"] },
  { id: "b4", path: "bureaus.closedAccounts", name: "Cuentas cerradas", description: "Cuentas cerradas en historial", domainId: "D-BURO", categories: ["buró"] },
  { id: "b5", path: "bureaus.delinquencies", name: "Eventos de mora", description: "Número de eventos de mora histórica", domainId: "D-BURO", categories: ["buró"] },
  { id: "b6", path: "bureaus.maxDelinquencyDays", name: "Días máx. de mora", description: "Mayor número de días en mora registrado", domainId: "D-BURO", categories: ["buró"] },
  { id: "b7", path: "bureaus.totalDebt", name: "Deuda total", description: "Monto total de deudas vigentes en buró", domainId: "D-BURO", categories: ["buró"] },
  { id: "b8", path: "bureaus.availableCredit", name: "Crédito disponible", description: "Líneas de crédito disponibles sin utilizar", domainId: "D-BURO", categories: ["buró"] },
  { id: "b9", path: "bureaus.creditUtilization", name: "Utilización de crédito", description: "Porcentaje de uso de las líneas de crédito", domainId: "D-BURO", categories: ["buró"] },
  { id: "b10", path: "bureaus.inquiriesLast6Months", name: "Consultas (6 meses)", description: "Consultas al buró en los últimos 6 meses", domainId: "D-BURO", categories: ["buró"] },
  { id: "ad1", path: "additionalData.customField1", name: "Campo adicional 1", description: "Campo sin equivalente canónico directo", domainId: "D-EXTRA", categories: ["adicional"] },
  { id: "ad2", path: "additionalData.customField2", name: "Campo adicional 2", description: "Campo sin equivalente canónico directo", domainId: "D-EXTRA", categories: ["adicional"] },
  { id: "ad3", path: "additionalData.customField3", name: "Campo adicional 3", description: "Campo sin equivalente canónico directo", domainId: "D-EXTRA", categories: ["adicional"] },
  { id: "ad4", path: "additionalData.notes", name: "Notas", description: "Observaciones y comentarios del caso", domainId: "D-EXTRA", categories: ["adicional"] },
  { id: "ad5", path: "additionalData.referenceId", name: "ID de referencia", description: "Referencia al registro en el sistema del cliente", domainId: "D-EXTRA", categories: ["adicional"] },
  { id: "ad6", path: "additionalData.externalId", name: "ID externo", description: "Identificador en el sistema origen del cliente", domainId: "D-EXTRA", categories: ["adicional"] },
];

export const CATEGORY_COLORS = [
  { bg: "rgba(13,42,58,0.9)", text: "#5ce0d8", border: "rgba(92,224,216,0.2)" },
  { bg: "rgba(18,32,68,0.9)", text: "#7cb3f0", border: "rgba(124,179,240,0.2)" },
  { bg: "rgba(40,18,68,0.9)", text: "#c084fc", border: "rgba(192,132,252,0.2)" },
  { bg: "rgba(18,40,18,0.9)", text: "#86d986", border: "rgba(134,217,134,0.2)" },
  { bg: "rgba(56,30,8,0.9)", text: "#f0a05c", border: "rgba(240,160,92,0.2)" },
  { bg: "rgba(40,36,8,0.9)", text: "#e0c050", border: "rgba(224,192,80,0.2)" },
  { bg: "rgba(40,12,12,0.9)", text: "#f87171", border: "rgba(248,113,113,0.2)" },
  { bg: "rgba(6,38,40,0.9)", text: "#22d3ee", border: "rgba(34,211,238,0.2)" },
];

const categoryKeys = [...new Set(CANONICAL_CATALOG.flatMap((i) => i.categories ?? []))].sort();
const categoryColorMap: Record<string, (typeof CATEGORY_COLORS)[number]> = {};
categoryKeys.forEach((c, i) => {
  categoryColorMap[c] = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
});

export function getCatalogItem(path: string): CanonicalCatalogItem | null {
  return CANONICAL_CATALOG.find((i) => i.path === path) ?? null;
}

export function getCatColor(category: string) {
  return categoryColorMap[category] ?? CATEGORY_COLORS[0];
}

/* ─── Dominios (Domains) module — ported from project/v4/domains-data.jsx ───
 * Note: these D1..D8 business-domain records are a separate scheme from the
 * D-META/D-PROC/... canonical-family ids used by CANONICAL_CATALOG above —
 * that mismatch already exists in the source design (surf-domains.jsx never
 * references CANONICAL_CATALOG) and is preserved as-is.
 */

export interface DomainVariableCount {
  s: number;
  c: number;
  total: number;
}

export type DomainStatus = "active" | "draft" | "archived";

export interface DomainRecord {
  id: string;
  name: string;
  description: string;
  status: DomainStatus;
  activeVersion: string | null;
  draftVersion: string | null;
  variableCount: DomainVariableCount;
}

export const DOMAINS_MOCK: DomainRecord[] = [
  { id: "D1", name: "Perfil del solicitante", description: "Datos de identidad, contacto y empleo del solicitante de crédito.", status: "active", activeVersion: "2.1.0", draftVersion: null, variableCount: { s: 14, c: 3, total: 17 } },
  { id: "D2", name: "Capacidad de pago", description: "Variables derivadas de ingresos, gastos y ratio de endeudamiento.", status: "active", activeVersion: "1.3.2", draftVersion: "1.3.3", variableCount: { s: 7, c: 5, total: 12 } },
  { id: "D3", name: "Buró crediticio", description: "Score, historial de mora, cuentas activas y consultas al buró.", status: "active", activeVersion: "3.0.1", draftVersion: null, variableCount: { s: 9, c: 2, total: 11 } },
  { id: "D4", name: "Contexto de proceso", description: "Metadatos del proceso de evaluación: sesión, agente, plantilla.", status: "active", activeVersion: "1.0.0", draftVersion: null, variableCount: { s: 6, c: 0, total: 6 } },
  { id: "D5", name: "Datos adicionales", description: "Campos sin equivalente canónico directo, manejados por tenant.", status: "active", activeVersion: "1.1.0", draftVersion: "1.1.1", variableCount: { s: 4, c: 2, total: 6 } },
  { id: "D6", name: "Metadata de solicitud", description: "Canal, timestamp y versión del esquema de la solicitud.", status: "draft", activeVersion: null, draftVersion: null, variableCount: { s: 3, c: 0, total: 3 } },
  { id: "D7", name: "Garantías reales", description: "Activos ofrecidos como garantía: inmuebles, vehículos, CDT.", status: "draft", activeVersion: null, draftVersion: null, variableCount: { s: 0, c: 0, total: 0 } },
  { id: "D8", name: "Scoring interno", description: "Modelo de scoring propietario Bowpi. Archivado en v3.", status: "archived", activeVersion: null, draftVersion: null, variableCount: { s: 6, c: 2, total: 8 } },
];

export function domainStatusLabel(d: DomainRecord): string {
  if (d.status === "active" && d.draftVersion) return "En actualización";
  if (d.status === "active") return "Activo";
  if (d.status === "draft") return "Draft";
  if (d.status === "archived") return "Archivado";
  return d.status;
}

export function domainStatusTone(d: DomainRecord): "warn" | "ok" | "info" | "err" | "" {
  if (d.status === "active" && d.draftVersion) return "warn";
  if (d.status === "active") return "ok";
  if (d.status === "draft") return "info";
  if (d.status === "archived") return "err";
  return "";
}

export type DomainVariableType = "S" | "C";
export type DomainVariableStatus = "active" | "draft" | "archived";
export type DomainVariableDataType = "string" | "integer" | "number" | "boolean";
/** Field-level null-handling policy for domain variables — a distinct, smaller vocabulary than MappingRule's NullPolicy. */
export type DomainNullPolicy = "FAIL" | "SET_NULL";

export interface AtlasOperatorExpr {
  type: "OPERATOR_EXPR";
  operator: string;
  left: { type: "PATH"; value: string };
  right: { type: "CONST"; value: string };
}

export interface DomainVariable {
  id: string;
  domainId: string;
  type: DomainVariableType;
  name: string;
  technicalName: string;
  dataType: DomainVariableDataType;
  status: DomainVariableStatus;
  /** Present on type "S" (direct) variables. */
  sourcePath?: string;
  /** Present on type "C" (calculated) variables. */
  sourcePaths?: string[];
  description: string;
  exampleValue: string;
  nullPolicy: DomainNullPolicy;
  atlasDefinition?: AtlasOperatorExpr;
}

export const VARIABLES_MOCK: Record<string, DomainVariable[]> = {
  D5: [
    { id: "D5_S_001", domainId: "D5", type: "S", name: "Campo adicional 1", technicalName: "campoAdicional1", dataType: "string", status: "active", sourcePath: "additionalData.customField1", description: "Campo sin equivalente canónico directo.", exampleValue: "valor_custom_01", nullPolicy: "FAIL" },
    { id: "D5_S_002", domainId: "D5", type: "S", name: "Campo adicional 2", technicalName: "campoAdicional2", dataType: "string", status: "active", sourcePath: "additionalData.customField2", description: "Campo auxiliar del tenant.", exampleValue: "valor_custom_02", nullPolicy: "SET_NULL" },
    { id: "D5_S_003", domainId: "D5", type: "S", name: "Notas del caso", technicalName: "notasCaso", dataType: "string", status: "active", sourcePath: "additionalData.notes", description: "Observaciones libres del analista.", exampleValue: "Caso prioritario.", nullPolicy: "SET_NULL" },
    { id: "D5_S_004", domainId: "D5", type: "S", name: "ID de referencia", technicalName: "idReferencia", dataType: "string", status: "draft", sourcePath: "additionalData.referenceId", description: "Referencia al registro en el sistema cliente.", exampleValue: "REF-2024-001", nullPolicy: "FAIL" },
    { id: "D5_C_001", domainId: "D5", type: "C", name: "Tiene campo extra", technicalName: "tieneCampoExtra", dataType: "boolean", status: "active", sourcePaths: ["additionalData.customField1"], description: "Indica si existe campo adicional 1.", exampleValue: "true", nullPolicy: "FAIL", atlasDefinition: { type: "OPERATOR_EXPR", operator: "NEQ", left: { type: "PATH", value: "additionalData.customField1" }, right: { type: "CONST", value: "" } } },
    { id: "D5_C_002", domainId: "D5", type: "C", name: "Referencia válida", technicalName: "referenciaValida", dataType: "boolean", status: "draft", sourcePaths: ["additionalData.referenceId"], description: "Verifica que el ID de referencia no esté vacío.", exampleValue: "true", nullPolicy: "FAIL", atlasDefinition: { type: "OPERATOR_EXPR", operator: "NEQ", left: { type: "PATH", value: "additionalData.referenceId" }, right: { type: "CONST", value: "null" } } },
  ],
  D1: [
    { id: "D1_S_001", domainId: "D1", type: "S", name: "Primer nombre", technicalName: "primerNombre", dataType: "string", status: "active", sourcePath: "profile.personalInfo.firstName", description: "Primer nombre del solicitante.", exampleValue: "María", nullPolicy: "FAIL" },
    { id: "D1_S_002", domainId: "D1", type: "S", name: "Apellido", technicalName: "apellido", dataType: "string", status: "active", sourcePath: "profile.personalInfo.lastName", description: "Apellido del solicitante.", exampleValue: "González", nullPolicy: "FAIL" },
    { id: "D1_S_003", domainId: "D1", type: "S", name: "Cédula / Documento", technicalName: "cedula", dataType: "string", status: "active", sourcePath: "profile.personalInfo.nationalId", description: "Número de identificación nacional.", exampleValue: "0912345678", nullPolicy: "FAIL" },
    { id: "D1_S_004", domainId: "D1", type: "S", name: "Fecha de nacimiento", technicalName: "fechaNacimiento", dataType: "string", status: "active", sourcePath: "profile.personalInfo.birthDate", description: "Fecha de nacimiento ISO 8601.", exampleValue: "1988-07-15", nullPolicy: "FAIL" },
    { id: "D1_S_005", domainId: "D1", type: "S", name: "Correo electrónico", technicalName: "correoElectronico", dataType: "string", status: "active", sourcePath: "profile.contactInfo.email", description: "Email de contacto.", exampleValue: "maria@email.com", nullPolicy: "SET_NULL" },
    { id: "D1_S_006", domainId: "D1", type: "S", name: "Teléfono", technicalName: "telefono", dataType: "string", status: "active", sourcePath: "profile.contactInfo.phone", description: "Número de teléfono.", exampleValue: "0991234567", nullPolicy: "SET_NULL" },
    { id: "D1_S_007", domainId: "D1", type: "S", name: "Ciudad", technicalName: "ciudad", dataType: "string", status: "active", sourcePath: "profile.contactInfo.city", description: "Ciudad de residencia.", exampleValue: "Guayaquil", nullPolicy: "SET_NULL" },
    { id: "D1_S_008", domainId: "D1", type: "S", name: "Tipo de empleo", technicalName: "tipoEmpleo", dataType: "string", status: "active", sourcePath: "profile.employmentInfo.employmentType", description: "Dependiente, independiente...", exampleValue: "DEPENDIENTE", nullPolicy: "FAIL" },
    { id: "D1_S_009", domainId: "D1", type: "S", name: "Empresa empleadora", technicalName: "empresaEmpleadora", dataType: "string", status: "active", sourcePath: "profile.employmentInfo.employerName", description: "Nombre de la empresa.", exampleValue: "Corp. Favorita", nullPolicy: "SET_NULL" },
    { id: "D1_S_010", domainId: "D1", type: "S", name: "Antigüedad laboral", technicalName: "antiguedadLaboral", dataType: "integer", status: "active", sourcePath: "profile.employmentInfo.yearsEmployed", description: "Años en el empleo actual.", exampleValue: "6", nullPolicy: "FAIL" },
    { id: "D1_S_011", domainId: "D1", type: "S", name: "Género", technicalName: "genero", dataType: "string", status: "draft", sourcePath: "profile.personalInfo.gender", description: "Género declarado.", exampleValue: "F", nullPolicy: "SET_NULL" },
    { id: "D1_C_001", domainId: "D1", type: "C", name: "Es dependiente", technicalName: "esDependiente", dataType: "boolean", status: "active", sourcePaths: ["profile.employmentInfo.employmentType"], description: "Solicitante es empleado dependiente.", exampleValue: "true", nullPolicy: "FAIL", atlasDefinition: { type: "OPERATOR_EXPR", operator: "EQ", left: { type: "PATH", value: "profile.employmentInfo.employmentType" }, right: { type: "CONST", value: "DEPENDIENTE" } } },
    { id: "D1_C_002", domainId: "D1", type: "C", name: "Antigüedad suficiente", technicalName: "antiguedadSuficiente", dataType: "boolean", status: "active", sourcePaths: ["profile.employmentInfo.yearsEmployed"], description: "≥ 2 años en empleo actual.", exampleValue: "true", nullPolicy: "FAIL", atlasDefinition: { type: "OPERATOR_EXPR", operator: "GTE", left: { type: "PATH", value: "profile.employmentInfo.yearsEmployed" }, right: { type: "CONST", value: "2" } } },
    { id: "D1_C_003", domainId: "D1", type: "C", name: "Mayor de edad", technicalName: "mayorDeEdad", dataType: "boolean", status: "draft", sourcePaths: ["profile.personalInfo.age"], description: "≥ 18 años.", exampleValue: "true", nullPolicy: "FAIL", atlasDefinition: { type: "OPERATOR_EXPR", operator: "GTE", left: { type: "PATH", value: "profile.personalInfo.age" }, right: { type: "CONST", value: "18" } } },
  ],
  D2: [
    { id: "D2_S_001", domainId: "D2", type: "S", name: "Ingreso mensual", technicalName: "ingresoMensual", dataType: "number", status: "active", sourcePath: "paymentCapacity.monthlyIncome", description: "Ingresos netos mensuales.", exampleValue: "2850.00", nullPolicy: "FAIL" },
    { id: "D2_S_002", domainId: "D2", type: "S", name: "Gastos mensuales", technicalName: "gastosMensuales", dataType: "number", status: "active", sourcePath: "paymentCapacity.monthlyExpenses", description: "Total de egresos fijos.", exampleValue: "1200.00", nullPolicy: "FAIL" },
    { id: "D2_S_003", domainId: "D2", type: "S", name: "Monto solicitado", technicalName: "montoSolicitado", dataType: "number", status: "active", sourcePath: "paymentCapacity.requestedAmount", description: "Monto total del crédito.", exampleValue: "15000", nullPolicy: "FAIL" },
    { id: "D2_S_004", domainId: "D2", type: "S", name: "Plazo solicitado", technicalName: "plazoSolicitado", dataType: "integer", status: "active", sourcePath: "paymentCapacity.requestedTerm", description: "Número de meses.", exampleValue: "36", nullPolicy: "FAIL" },
    { id: "D2_S_005", domainId: "D2", type: "S", name: "Cuota estimada", technicalName: "cuotaEstimada", dataType: "number", status: "active", sourcePath: "paymentCapacity.installmentAmount", description: "Cuota mensual.", exampleValue: "485.50", nullPolicy: "SET_NULL" },
    { id: "D2_S_006", domainId: "D2", type: "S", name: "Ratio endeudamiento", technicalName: "ratioEndeudamiento", dataType: "number", status: "active", sourcePath: "paymentCapacity.debtRatio", description: "Deuda / ingresos.", exampleValue: "0.42", nullPolicy: "FAIL" },
    { id: "D2_S_007", domainId: "D2", type: "S", name: "Ingreso disponible", technicalName: "ingresoDisponible", dataType: "number", status: "draft", sourcePath: "paymentCapacity.disposableIncome", description: "Ingresos tras gastos fijos.", exampleValue: "1650.00", nullPolicy: "FAIL" },
    { id: "D2_C_001", domainId: "D2", type: "C", name: "Ratio bajo riesgo", technicalName: "ratioBajoRiesgo", dataType: "boolean", status: "active", sourcePaths: ["paymentCapacity.debtRatio"], description: "Ratio < 0.5.", exampleValue: "true", nullPolicy: "FAIL", atlasDefinition: { type: "OPERATOR_EXPR", operator: "LT", left: { type: "PATH", value: "paymentCapacity.debtRatio" }, right: { type: "CONST", value: "0.5" } } },
    { id: "D2_C_002", domainId: "D2", type: "C", name: "Crédito > $10k", technicalName: "creditoMayor10k", dataType: "boolean", status: "active", sourcePaths: ["paymentCapacity.requestedAmount"], description: "Monto > 10.000 USD.", exampleValue: "true", nullPolicy: "FAIL", atlasDefinition: { type: "OPERATOR_EXPR", operator: "GT", left: { type: "PATH", value: "paymentCapacity.requestedAmount" }, right: { type: "CONST", value: "10000" } } },
    { id: "D2_C_003", domainId: "D2", type: "C", name: "Largo plazo", technicalName: "largoplazo", dataType: "boolean", status: "draft", sourcePaths: ["paymentCapacity.requestedTerm"], description: "Plazo > 24 meses.", exampleValue: "true", nullPolicy: "FAIL", atlasDefinition: { type: "OPERATOR_EXPR", operator: "GT", left: { type: "PATH", value: "paymentCapacity.requestedTerm" }, right: { type: "CONST", value: "24" } } },
  ],
  D3: [
    { id: "D3_S_001", domainId: "D3", type: "S", name: "Score de buró", technicalName: "scoreBuro", dataType: "integer", status: "active", sourcePath: "bureaus.score", description: "Puntaje crediticio.", exampleValue: "742", nullPolicy: "FAIL" },
    { id: "D3_S_002", domainId: "D3", type: "S", name: "Cuentas activas", technicalName: "cuentasActivas", dataType: "integer", status: "active", sourcePath: "bureaus.openAccounts", description: "Cuentas de crédito vigentes.", exampleValue: "3", nullPolicy: "FAIL" },
    { id: "D3_S_003", domainId: "D3", type: "S", name: "Deuda total", technicalName: "deudaTotal", dataType: "number", status: "active", sourcePath: "bureaus.totalDebt", description: "Monto total de deudas.", exampleValue: "8500", nullPolicy: "FAIL" },
    { id: "D3_S_004", domainId: "D3", type: "S", name: "Eventos de mora", technicalName: "eventosMora", dataType: "integer", status: "active", sourcePath: "bureaus.delinquencies", description: "Moras históricas.", exampleValue: "0", nullPolicy: "FAIL" },
    { id: "D3_S_005", domainId: "D3", type: "S", name: "Días máx. mora", technicalName: "diasMaxMora", dataType: "integer", status: "active", sourcePath: "bureaus.maxDelinquencyDays", description: "Mayor días en mora.", exampleValue: "0", nullPolicy: "FAIL" },
    { id: "D3_S_006", domainId: "D3", type: "S", name: "Utilización crédito", technicalName: "utilizacionCredito", dataType: "number", status: "active", sourcePath: "bureaus.creditUtilization", description: "% uso de líneas.", exampleValue: "0.38", nullPolicy: "SET_NULL" },
    { id: "D3_S_007", domainId: "D3", type: "S", name: "Consultas 6 meses", technicalName: "consultas6m", dataType: "integer", status: "active", sourcePath: "bureaus.inquiriesLast6Months", description: "Consultas últimos 6 meses.", exampleValue: "2", nullPolicy: "FAIL" },
    { id: "D3_S_008", domainId: "D3", type: "S", name: "Cuentas cerradas", technicalName: "cuentasCerradas", dataType: "integer", status: "active", sourcePath: "bureaus.closedAccounts", description: "Cuentas cerradas.", exampleValue: "1", nullPolicy: "SET_NULL" },
    { id: "D3_S_009", domainId: "D3", type: "S", name: "Crédito disponible", technicalName: "creditoDisponible", dataType: "number", status: "draft", sourcePath: "bureaus.availableCredit", description: "Líneas disponibles.", exampleValue: "5000", nullPolicy: "SET_NULL" },
    { id: "D3_C_001", domainId: "D3", type: "C", name: "Score apto", technicalName: "scoreApto", dataType: "boolean", status: "active", sourcePaths: ["bureaus.score"], description: "Score ≥ 650.", exampleValue: "true", nullPolicy: "FAIL", atlasDefinition: { type: "OPERATOR_EXPR", operator: "GTE", left: { type: "PATH", value: "bureaus.score" }, right: { type: "CONST", value: "650" } } },
    { id: "D3_C_002", domainId: "D3", type: "C", name: "Sin mora reciente", technicalName: "sinMora", dataType: "boolean", status: "active", sourcePaths: ["bureaus.delinquencies"], description: "Cero eventos de mora.", exampleValue: "true", nullPolicy: "FAIL", atlasDefinition: { type: "OPERATOR_EXPR", operator: "EQ", left: { type: "PATH", value: "bureaus.delinquencies" }, right: { type: "CONST", value: "0" } } },
  ],
  D4: [
    { id: "D4_S_001", domainId: "D4", type: "S", name: "ID del proceso", technicalName: "idProceso", dataType: "string", status: "active", sourcePath: "processContext.processId", description: "Referencia al proceso.", exampleValue: "PROC-001", nullPolicy: "FAIL" },
    { id: "D4_S_002", domainId: "D4", type: "S", name: "Tipo de proceso", technicalName: "tipoProceso", dataType: "string", status: "active", sourcePath: "processContext.processType", description: "Evaluación, renovación...", exampleValue: "evaluacion", nullPolicy: "FAIL" },
    { id: "D4_S_003", domainId: "D4", type: "S", name: "Inicio del proceso", technicalName: "inicioProceso", dataType: "string", status: "active", sourcePath: "processContext.startedAt", description: "Timestamp de inicio.", exampleValue: "2024-06-10T14:23:00Z", nullPolicy: "FAIL" },
    { id: "D4_S_004", domainId: "D4", type: "S", name: "ID del agente", technicalName: "idAgente", dataType: "string", status: "active", sourcePath: "processContext.agentId", description: "Agente evaluador asignado.", exampleValue: "AGT-007", nullPolicy: "SET_NULL" },
    { id: "D4_S_005", domainId: "D4", type: "S", name: "ID de sesión", technicalName: "idSesion", dataType: "string", status: "active", sourcePath: "processContext.sessionId", description: "Sesión activa.", exampleValue: "SES-2024-001", nullPolicy: "SET_NULL" },
    { id: "D4_S_006", domainId: "D4", type: "S", name: "ID de plantilla", technicalName: "idPlantilla", dataType: "string", status: "draft", sourcePath: "processContext.templateId", description: "Plantilla de evaluación.", exampleValue: "TPL-CRED-01", nullPolicy: "SET_NULL" },
  ],
  D6: [
    { id: "D6_S_001", domainId: "D6", type: "S", name: "Fecha de creación", technicalName: "fechaCreacion", dataType: "string", status: "draft", sourcePath: "metadata.createdAt", description: "Timestamp de creación.", exampleValue: "2024-06-10T14:23:00Z", nullPolicy: "FAIL" },
    { id: "D6_S_002", domainId: "D6", type: "S", name: "Sistema origen", technicalName: "sistemaOrigen", dataType: "string", status: "draft", sourcePath: "metadata.source", description: "Sistema que generó la solicitud.", exampleValue: "core-bancario-v3", nullPolicy: "FAIL" },
    { id: "D6_S_003", domainId: "D6", type: "S", name: "Estado solicitud", technicalName: "estadoSolicitud", dataType: "string", status: "draft", sourcePath: "metadata.status", description: "Estado actual del proceso.", exampleValue: "PENDIENTE", nullPolicy: "FAIL" },
  ],
  D7: [],
  D8: [
    { id: "D8_S_001", domainId: "D8", type: "S", name: "Score interno v2", technicalName: "scoreInternoV2", dataType: "integer", status: "archived", sourcePath: "bureaus.score", description: "Score interno Bowpi (obsoleto).", exampleValue: "780", nullPolicy: "FAIL" },
    { id: "D8_C_001", domainId: "D8", type: "C", name: "Aprobado scoring", technicalName: "aprobadoScoring", dataType: "boolean", status: "archived", sourcePaths: ["bureaus.score"], description: "Score > 700 (criterio obsoleto).", exampleValue: "true", nullPolicy: "FAIL", atlasDefinition: { type: "OPERATOR_EXPR", operator: "GT", left: { type: "PATH", value: "bureaus.score" }, right: { type: "CONST", value: "700" } } },
  ],
};

export interface DomainVersion {
  version: string;
  tag: string;
  variableCount: number;
  publishedBy: string;
  publishedAt: string;
  enabled: boolean;
  archived: boolean;
}

export const VERSIONS_MOCK: Record<string, DomainVersion[]> = {
  D1: [
    { version: "2.1.0", tag: "stable", variableCount: 17, publishedBy: "Jonatán F.", publishedAt: "2026-05-20", enabled: true, archived: false },
    { version: "2.0.0", tag: "stable", variableCount: 15, publishedBy: "Jonatán F.", publishedAt: "2026-04-10", enabled: true, archived: false },
    { version: "1.2.0", tag: "dev", variableCount: 12, publishedBy: "Natalia C.", publishedAt: "2026-02-18", enabled: false, archived: false },
    { version: "1.0.0", tag: "stable", variableCount: 8, publishedBy: "Natalia C.", publishedAt: "2026-01-05", enabled: false, archived: true },
  ],
  D2: [
    { version: "1.3.2", tag: "stable", variableCount: 12, publishedBy: "Jonatán F.", publishedAt: "2026-06-01", enabled: true, archived: false },
    { version: "1.3.1", tag: "stable", variableCount: 11, publishedBy: "Jonatán F.", publishedAt: "2026-05-15", enabled: true, archived: false },
    { version: "1.3.0", tag: "beta", variableCount: 10, publishedBy: "Natalia C.", publishedAt: "2026-04-20", enabled: false, archived: false },
    { version: "1.2.0", tag: "stable", variableCount: 9, publishedBy: "Natalia C.", publishedAt: "2026-03-08", enabled: false, archived: true },
  ],
  D3: [
    { version: "3.0.1", tag: "stable", variableCount: 11, publishedBy: "Jonatán F.", publishedAt: "2026-05-28", enabled: true, archived: false },
    { version: "3.0.0", tag: "stable", variableCount: 10, publishedBy: "Jonatán F.", publishedAt: "2026-05-01", enabled: false, archived: false },
    { version: "2.1.0", tag: "stable", variableCount: 8, publishedBy: "Natalia C.", publishedAt: "2026-03-12", enabled: false, archived: true },
  ],
  D4: [{ version: "1.0.0", tag: "stable", variableCount: 6, publishedBy: "Natalia C.", publishedAt: "2026-01-10", enabled: true, archived: false }],
  D5: [
    { version: "1.1.0", tag: "dev", variableCount: 6, publishedBy: "Jonatán F.", publishedAt: "2026-06-10", enabled: true, archived: false },
    { version: "1.0.0", tag: "stable", variableCount: 4, publishedBy: "Jonatán F.", publishedAt: "2026-04-22", enabled: false, archived: false },
  ],
  D6: [],
  D7: [],
  D8: [{ version: "1.0.0", tag: "stable", variableCount: 8, publishedBy: "Natalia C.", publishedAt: "2025-11-01", enabled: false, archived: true }],
};

export function slugifyTechName(name: string): string {
  const norm = (name || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const words = norm.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  if (!words.length) return "";
  return (
    words[0].charAt(0).toLowerCase() +
    words[0].slice(1) +
    words
      .slice(1)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("")
  );
}

export const OPERATORS_BY_TYPE: Record<DomainVariableDataType, string[]> = {
  boolean: ["EQ", "NEQ"],
  integer: ["EQ", "NEQ", "LT", "LTE", "GT", "GTE"],
  number: ["EQ", "NEQ", "LT", "LTE", "GT", "GTE"],
  string: ["EQ", "NEQ", "CONTAINS"],
};
export const OP_LABELS: Record<string, string> = { EQ: "=", NEQ: "≠", LT: "<", LTE: "≤", GT: ">", GTE: "≥", CONTAINS: "contiene" };
export const DTYPE_SHORT: Record<string, string> = { boolean: "Bool", integer: "Int", number: "Num", string: "Str" };

// ─── Summary (Resumen de integración) — ported from project/v3/surf-summary.jsx ───

export interface CapacityCardData {
  id: string;
  name: string;
  icon: "person" | "bell" | "doc" | "cards" | "data" | "graph" | "bolt" | "shield";
  status: "ok" | "warn" | "err";
  blocker?: boolean;
  desc: string;
  chips: { label: string; st: "ok" | "warn" | "missing" }[];
  pathsMapped: string[];
  pathsMissing: string[];
}

export const CAPACITY_CARDS: CapacityCardData[] = [
  {
    id: "profile", name: "Perfil del solicitante", icon: "person", status: "ok",
    desc: "Identidad y datos personales del solicitante.",
    chips: [
      { label: "Identidad nacional", st: "ok" },
      { label: "Nombre completo", st: "ok" },
      { label: "Fecha de nacimiento", st: "ok" },
      { label: "Estado civil", st: "warn" },
    ],
    pathsMapped: ["personalData.nationalId", "personalData.fullName", "personalData.birthDate"],
    pathsMissing: [],
  },
  {
    id: "contact", name: "Datos de contacto", icon: "bell", status: "ok",
    desc: "Canales de comunicación verificables.",
    chips: [
      { label: "Email", st: "ok" },
      { label: "Teléfono", st: "ok" },
    ],
    pathsMapped: ["contactData.email", "contactData.phone"],
    pathsMissing: [],
  },
  {
    id: "employment", name: "Datos de empleo", icon: "doc", status: "ok",
    desc: "Vínculo laboral e ingresos declarados.",
    chips: [
      { label: "Ingreso mensual", st: "ok" },
      { label: "Tipo de empleo", st: "ok" },
      { label: "Empleador", st: "ok" },
      { label: "Antigüedad", st: "ok" },
    ],
    pathsMapped: ["employmentData.monthlyIncome", "employmentData.employmentType", "employmentData.employerName", "employmentData.yearsEmployed"],
    pathsMissing: [],
  },
  {
    id: "credit", name: "Solicitud de crédito", icon: "cards", status: "ok",
    desc: "Parámetros de la solicitud que activa el motor.",
    chips: [
      { label: "Monto solicitado", st: "ok" },
      { label: "Plazo", st: "ok" },
      { label: "Destino", st: "ok" },
    ],
    pathsMapped: ["creditRequest.requestedAmount", "creditRequest.term", "creditRequest.purpose"],
    pathsMissing: [],
  },
  {
    id: "history", name: "Historial crediticio", icon: "data", status: "err", blocker: true,
    desc: "Comportamiento de pago en el sistema financiero.",
    chips: [
      { label: "Score de buró", st: "missing" },
      { label: "Morosidades 30+", st: "missing" },
    ],
    pathsMapped: [],
    pathsMissing: ["creditHistory.bureauScore — CRÍTICO", "creditHistory.delinquencies — CRÍTICO"],
  },
  {
    id: "capacity", name: "Capacidad de pago", icon: "graph", status: "warn",
    desc: "Análisis de flujo de ingresos vs. compromisos.",
    chips: [
      { label: "Ingresos mensuales", st: "ok" },
      { label: "Egresos mensuales", st: "warn" },
    ],
    pathsMapped: ["employmentData.monthlyIncome"],
    pathsMissing: ["financialData.monthlyExpenses"],
  },
  {
    id: "score", name: "Score interno", icon: "bolt", status: "warn",
    desc: "Puntuación calculada por el motor de Bowpi.",
    chips: [{ label: "Score generado", st: "warn" }],
    pathsMapped: [],
    pathsMissing: ["derivedData.internalScore"],
  },
  {
    id: "compliance", name: "Compliance AML", icon: "shield", status: "warn",
    desc: "Verificación antilavado y listas restrictivas.",
    chips: [{ label: "Estado PEP", st: "warn" }],
    pathsMapped: [],
    pathsMissing: ["compliance.pepStatus (opcional)"],
  },
];

// ─── Publish (Publicar) — ported from project/v3/surf-publish.jsx ───

export interface ChecklistItemData {
  st: "ok" | "warn" | "err";
  label: string;
  sub: string;
  blocker?: boolean;
}

export const CHECKLIST_ITEMS: ChecklistItemData[] = [
  { st: "ok", label: "Reglas de mapeo validadas", sub: "13 reglas confirmadas — 5 directas, 6 IA, 1 avanzada, 1 conflicto resuelto" },
  { st: "ok", label: "Tipos de dato compatibles", sub: "string, date, number, enum — sin incompatibilidades restantes" },
  { st: "warn", label: "1 conflicto resuelto manualmente", sub: "estadoCivil → maritalStatus — tabla de conversión C/S/D/V definida" },
  { st: "err", label: "1 campo crítico sin fuente", sub: "creditHistory.bureauScore — el motor no puede evaluar riesgo sin este dato", blocker: true },
];

export interface AuditRowData {
  rule: string;
  user: string;
  when: string;
  how: string;
}

export const AUDIT_ROWS: AuditRowData[] = [
  { rule: "personalData.nationalId", user: "JF", when: "17 jun · 10:34", how: "IA 100% — auto" },
  { rule: "contactData.email", user: "JF", when: "17 jun · 10:34", how: "IA 100% — auto" },
  { rule: "creditRequest.requestedAmount", user: "JF", when: "17 jun · 10:34", how: "IA 100% — auto" },
  { rule: "personalData.fullName", user: "JF", when: "17 jun · 10:41", how: "IA 89% — aprobado" },
  { rule: "employmentData.monthlyIncome", user: "JF", when: "17 jun · 10:42", how: "IA 82% — aprobado" },
  { rule: "personalData.maritalStatus", user: "JF", when: "17 jun · 10:44", how: "TYPE_CONV — resuelto manual" },
  { rule: "derivedData.age", user: "JF", when: "17 jun · 10:45", how: "DERIVATION — manual" },
];
