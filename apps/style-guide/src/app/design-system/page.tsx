"use client";

import { useState, type ReactNode } from "react";
import {
  Icon,
  Button,
  IconButton,
  Chip,
  Tag,
  Dot,
  Kbd,
  ProgressBar,
  StatusPill,
  TypeBadge,
  DestBadge,
  FormInput,
  Textarea,
  Select,
  SearchBar,
  Toggle,
  Checkbox,
  RadioGroup,
  FormField,
  MapperIdPreview,
  Breadcrumb,
  TabsUnderline,
  TabsSegmented,
  Card,
  CardHead,
  StatCard,
  ProjectCard,
  FileCard,
  AgentCard,
  CapacityCard,
  DataTable,
  Alert,
  SaveIndicator,
  SaveToast,
  LockedSurface,
  SurfaceHeader,
  JsonTree,
  type SourceType,
} from "@bowpi/design-system";
import { StyleGuideNav } from "../../components/StyleGuideNav";

function Sec({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <div className="sg-section" id={id}>
      <div className="sg-section-title">{title}</div>
      {children}
    </div>
  );
}
function Sub({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="sg-sub">
      <div className="sg-sub-title">{title}</div>
      {children}
    </div>
  );
}
function Preview({ col, children, style }: { col?: boolean; children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div className={`sg-preview ${col ? "col" : ""}`} style={style}>
      {children}
    </div>
  );
}
function Swatch({ name, val }: { name: string; val: string }) {
  return (
    <div className="sg-swatch">
      <div className="sg-swatch-color" style={{ background: val, border: val === "#ffffff" ? "1px solid #e3eef0" : undefined }} />
      <div className="sg-swatch-info">
        <div className="n">{name}</div>
        <div className="v">{val}</div>
      </div>
    </div>
  );
}

const TYPES: SourceType[] = ["STR", "INT", "NUM", "BOOL", "OBJ", "ARR", "NULL"];

export default function DesignSystemPage() {
  const [tabUl, setTabUl] = useState("all");
  const [tabSeg, setTabSeg] = useState("all");
  const [toggleOn, setToggleOn] = useState(true);
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState("REQUIRED");
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="sg-root">
      <StyleGuideNav />
      <main className="sg-main">
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, letterSpacing: "-.025em", marginBottom: 8 }}>Design System</div>
          <div style={{ fontSize: 15, color: "var(--ink-3)", lineHeight: 1.6, maxWidth: 600 }}>
            Referencia viva de componentes y tokens de Bowpi Enterprise — cada elemento de esta página es el componente real importado de{" "}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>@bowpi/design-system</span>, no una recreación visual. Fuente de verdad:{" "}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>packages/design-system/src/styles/base.css</span>
          </div>
        </div>

        <Sec id="colors" title="Sistema de color">
          <Sub title="Superficies — light + cyan (default)">
            <div className="sg-swatch-grid">
              {[
                ["surface-0", "#f2fafb"],
                ["surface-1", "#ffffff"],
                ["surface-2", "#f7fcfd"],
                ["surface-3", "#e7f3f5"],
                ["surface-4", "#d8eaed"],
              ].map(([n, v]) => (
                <Swatch key={n} name={`--${n}`} val={v} />
              ))}
            </div>
          </Sub>
          <Sub title="Tipografía">
            <div className="sg-swatch-grid">
              {[
                ["ink-1", "#1c1a17"],
                ["ink-2", "#4d4a43"],
                ["ink-3", "#7a766c"],
                ["ink-4", "#a7a298"],
                ["ink-5", "#c9c4b8"],
              ].map(([n, v]) => (
                <Swatch key={n} name={`--${n}`} val={v} />
              ))}
            </div>
          </Sub>
          <Sub title="Acento — Cyan">
            <div className="sg-swatch-grid">
              {[
                ["accent", "#0bb6cc"],
                ["accent-2", "#00d3ea"],
                ["accent-soft", "#e2fbff"],
                ["accent-line", "#a4ecf5"],
                ["accent-ink", "#097e92"],
              ].map(([n, v]) => (
                <Swatch key={n} name={`--${n}`} val={v} />
              ))}
            </div>
          </Sub>
          <Sub title="Semánticos">
            <div className="sg-swatch-grid" style={{ gridTemplateColumns: "repeat(6,1fr)" }}>
              {[
                ["ok", "#2f8f57"],
                ["ok-soft", "#e7f4ec"],
                ["ok-line", "#bfe2cc"],
                ["warn", "#b67c12"],
                ["warn-soft", "#fbf2dc"],
                ["warn-line", "#ecd6a2"],
                ["err", "#cc4334"],
                ["err-soft", "#fbe9e6"],
                ["err-line", "#f0c5bd"],
                ["info", "#2f6f9e"],
                ["info-soft", "#e9f1f8"],
                ["info-line", "#c2d8e8"],
              ].map(([n, v]) => (
                <Swatch key={n} name={`--${n}`} val={v} />
              ))}
            </div>
          </Sub>
        </Sec>

        <Sec id="typography" title="Tipografía">
          <Sub title="Familias y roles">
            <Preview col>
              {[
                { fam: "var(--font-display)", name: "Space Grotesk", use: "H1–H3, métricas grandes, nombres de proyectos", sample: "Crédito Individual — Banco Solidario" },
                { fam: "var(--font-sans)", name: "DM Sans", use: "Cuerpo, labels, botones, descripciones", sample: "Configurá las políticas de mapeo para este campo" },
                { fam: "var(--font-mono)", name: "JetBrains Mono", use: "IDs, paths canónicos, código, statusbar", sample: "profile.personalInfo.nationalId → 0912345678" },
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 20, padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
                  <div style={{ fontFamily: t.fam, fontSize: 16, color: "var(--ink-1)", minWidth: 380 }}>{t.sample}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-2)", fontWeight: 500 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-4)" }}>{t.use}</div>
                  </div>
                </div>
              ))}
            </Preview>
          </Sub>
        </Sec>

        <Sec id="spacing" title="Radios y sombras">
          <Sub title="Escala de radios">
            <Preview>
              {[
                ["r-xs", "5px"],
                ["r-sm", "8px"],
                ["r-md", "12px"],
                ["r-lg", "16px"],
                ["r-xl", "22px"],
                ["r-pill", "100px"],
              ].map(([n, v]) => (
                <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 56, height: 56, background: "var(--accent-soft)", border: "1.5px solid var(--accent-line)", borderRadius: `var(--${n})` }} />
                  <div className="sg-label" style={{ textAlign: "center" }}>
                    --{n}
                    <br />
                    {v}
                  </div>
                </div>
              ))}
            </Preview>
          </Sub>
          <Sub title="Sombras">
            <Preview>
              {[
                ["Ninguna", "none"],
                ["shadow-sm", "var(--shadow-sm)"],
                ["shadow-md", "var(--shadow-md)"],
                ["shadow-lg", "var(--shadow-lg)"],
                ["shadow-pop", "var(--shadow-pop)"],
              ].map(([n, v]) => (
                <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 80, height: 56, background: "var(--surface-1)", borderRadius: "var(--r-md)", boxShadow: v }} />
                  <div className="sg-label">{n}</div>
                </div>
              ))}
            </Preview>
          </Sub>
        </Sec>

        <Sec id="icons" title="Íconos">
          <div style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 12 }}>
            SVG inline, stroke 1.5px, fill none. Uso:{" "}
            <code style={{ fontFamily: "var(--font-mono)", fontSize: 12, background: "var(--surface-3)", padding: "1px 6px", borderRadius: 4 }}>&lt;Icon.nombre /&gt;</code>
          </div>
          <Preview style={{ padding: 8 }}>
            <div className="sg-icon-grid" style={{ width: "100%" }}>
              {Object.entries(Icon).map(([name, Ico]) => (
                <div key={name} className="sg-icon-item">
                  <Ico width={18} height={18} />
                  <div className="n">{name}</div>
                </div>
              ))}
            </div>
          </Preview>
        </Sec>

        <Sec id="buttons" title="Botones">
          <Sub title="Variantes principales">
            <Preview>
              <Button>Default</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button disabled>Disabled</Button>
            </Preview>
          </Sub>
          <Sub title="Tamaños">
            <Preview style={{ alignItems: "center" }}>
              <Button size="sm">Small 32px</Button>
              <Button>Default 40px</Button>
              <Button size="lg">Large 50px</Button>
              <IconButton title="Icon button">
                <Icon.bell />
              </IconButton>
            </Preview>
          </Sub>
          <Sub title="Con íconos y estados">
            <Preview>
              <Button variant="primary">
                <Icon.plus /> Nueva definición
              </Button>
              <Button variant="primary" size="lg">
                Publicar <Icon.bolt />
              </Button>
              <Button variant="ghost">
                <Icon.arrow style={{ transform: "rotate(180deg)" }} /> Volver
              </Button>
              <Button block variant="primary" style={{ maxWidth: 240 }}>
                Block — width 100%
              </Button>
            </Preview>
          </Sub>
        </Sec>

        <Sec id="badges" title="Tags, Chips y Dots">
          <Sub title="Chips">
            <Preview>
              <Chip>Default</Chip>
              <Chip tone="ok">
                <Dot tone="ok" />
                Publicado
              </Chip>
              <Chip tone="warn">
                <Dot tone="warn" />
                Borrador
              </Chip>
              <Chip tone="err">Blocker</Chip>
              <Chip tone="info">Info</Chip>
              <Chip tone="brand">
                <Dot tone="run" />
                procesando
              </Chip>
            </Preview>
          </Sub>
          <Sub title="Tags">
            <Preview>
              <Tag>default</Tag>
              <Tag tone="ok">ok</Tag>
              <Tag tone="warn">warn</Tag>
              <Tag tone="err">err</Tag>
              <Tag tone="accent">accent</Tag>
              <Tag tone="info">info</Tag>
            </Preview>
          </Sub>
          <Sub title="Dots">
            <Preview style={{ alignItems: "center" }}>
              <Dot />
              <Dot tone="ok" />
              <Dot tone="warn" />
              <Dot tone="err" />
              <Dot tone="run" />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-4)" }}>.run está animado</span>
            </Preview>
          </Sub>
          <Sub title="Status Pill">
            <Preview>
              <StatusPill status="published" />
              <StatusPill status="draft" />
              <StatusPill status="analysis" />
            </Preview>
          </Sub>
          <Sub title="Type Badges">
            <Preview>
              {TYPES.map((t) => (
                <TypeBadge key={t} type={t} short />
              ))}
            </Preview>
          </Sub>
          <Sub title="Dest Badge">
            <Preview>
              <DestBadge path="profile.personalInfo.nationalId" onClick={() => {}} />
              <DestBadge path={null} onClick={() => {}} />
            </Preview>
          </Sub>
          <Sub title="Kbd y Progress bar">
            <Preview>
              <Kbd>⌘K</Kbd>
              <Kbd>Enter</Kbd>
              <Kbd>Esc</Kbd>
              <div style={{ flex: 1, maxWidth: 240 }}>
                <ProgressBar value={72} />
                <div style={{ marginTop: 8 }}>
                  <ProgressBar value={94} tone="ok" />
                </div>
                <div style={{ marginTop: 8 }}>
                  <ProgressBar value={38} tone="warn" />
                </div>
              </div>
            </Preview>
          </Sub>
        </Sec>

        <Sec id="forms" title="Formularios">
          <Sub title="Text input">
            <Preview col style={{ maxWidth: 480, gap: 10 }}>
              <FormInput placeholder="Estado reposo" />
              <FormInput hasError defaultValue="Valor inválido" />
              <FormInput mono defaultValue="credito-grupal-bpr" placeholder="Mono variant" />
              <FormInput disabled placeholder="Deshabilitado" />
            </Preview>
          </Sub>
          <Sub title="Textarea">
            <Preview col style={{ maxWidth: 480 }}>
              <Textarea placeholder="Escribí una descripción del proyecto o notas de implementación…" />
            </Preview>
          </Sub>
          <Sub title="Select">
            <Preview col style={{ maxWidth: 360 }}>
              <Select defaultValue="">
                <option value="">Seleccioná una opción</option>
                <option>REQUIRED</option>
                <option>SET_NULL</option>
                <option>USE_DEFAULT</option>
              </Select>
            </Preview>
          </Sub>
          <Sub title="Search bar">
            <Preview col style={{ maxWidth: 360 }}>
              <SearchBar placeholder="Buscar proyectos, reglas, configuraciones…" trailing={<Kbd>⌘K</Kbd>} />
            </Preview>
          </Sub>
          <Sub title="Toggle">
            <Preview col style={{ gap: 14 }}>
              <Toggle on={toggleOn} onChange={setToggleOn} label="Tema oscuro" hint="Cambia la apariencia de la interfaz" />
            </Preview>
          </Sub>
          <Sub title="Checkbox">
            <Preview col style={{ gap: 12 }}>
              <Checkbox checked={checked} onChange={setChecked} label="Acepto los términos y condiciones" hint="Requerido para continuar" />
            </Preview>
          </Sub>
          <Sub title="Radio group">
            <Preview>
              <RadioGroup options={["REQUIRED", "SET_NULL", "USE_DEFAULT"] as const} value={radio} onChange={setRadio} />
            </Preview>
          </Sub>
          <Sub title="Form field completo">
            <Preview col style={{ maxWidth: 480 }}>
              <FormField label="Nombre del proyecto" required desc="Nombre descriptivo visible en la lista de definiciones.">
                <FormInput placeholder="Ej: Crédito Individual — Banco Solidario" />
              </FormField>
              <FormField label="Mapper ID" hint="auto-generado">
                <MapperIdPreview mapperId="credito-individual-banco-solidario" onEdit={() => {}} />
              </FormField>
            </Preview>
          </Sub>
        </Sec>

        <Sec id="nav" title="Navegación">
          <Sub title="Breadcrumb">
            <Preview>
              <Breadcrumb items={[{ label: "Workspace" }, { label: "Data Translation" }, { label: "Editor de mapeo" }]} />
            </Preview>
          </Sub>
          <Sub title="Tabs — underline">
            <Preview col style={{ gap: 0, padding: 0 }}>
              <div style={{ padding: "0 20px" }}>
                <TabsUnderline
                  tabs={[
                    { value: "all", label: "Todas", count: 29 },
                    { value: "matched", label: "Mapeadas", count: 15 },
                    { value: "nomatch", label: "Sin mapear", count: 14 },
                  ]}
                  value={tabUl}
                  onChange={setTabUl}
                />
              </div>
              <div style={{ padding: "20px", fontSize: 13, color: "var(--ink-4)" }}>Tab activa: {tabUl}</div>
            </Preview>
          </Sub>
          <Sub title="Tabs — segmented">
            <Preview>
              <TabsSegmented
                tabs={[
                  { value: "all", label: "Todas" },
                  { value: "matched", label: "Match perfecto" },
                  { value: "nomatch", label: "Sin coincidencia" },
                ]}
                value={tabSeg}
                onChange={setTabSeg}
              />
            </Preview>
          </Sub>
        </Sec>

        <Sec id="cards" title="Cards">
          <Sub title="Card base">
            <Card style={{ maxWidth: 420 }}>
              <CardHead icon={<Icon.data />} trailing={<Chip tone="ok">completado</Chip>}>
                Resultado del análisis
              </CardHead>
              <div style={{ padding: "16px 18px", display: "flex", gap: 24 }}>
                {[
                  ["15", "Match perfecto", "var(--ok)"],
                  ["3", "Sin equivalente", "var(--warn)"],
                  ["11", "Sin mapear", "var(--ink-3)"],
                ].map(([n, l, c]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: c }}>{n}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Sub>
          <Sub title="Stat card">
            <Preview>
              <StatCard label="Proyectos activos" value={2} detail="publicados + borrador" />
              <StatCard label="Reglas mapeadas" value={15} detail="con match perfecto" color="var(--ok)" />
              <StatCard label="Sin asignar" value={14} detail="requieren asignación" color="var(--warn)" />
              <StatCard label="Cobertura" value="52%" detail="15/29 campos al canónico" />
            </Preview>
          </Sub>
          <Sub title="Project card">
            <div style={{ maxWidth: 640 }}>
              <ProjectCard project={{ id: "p1", name: "Crédito Individual PTC", source: "credito_individual.json", status: "published", mapperId: "credito-individual-ptc", rules: 29, coverage: 94, updated: "10 jun 2026", client: "" }} />
            </div>
          </Sub>
          <Sub title="File card">
            <Preview col style={{ gap: 10 }}>
              <FileCard name="credito_individual.json" subtitle="Subiendo… parseando estructura" progress={65} badge={<Chip tone="brand">procesando</Chip>} />
              <FileCard name="credito_individual.json" subtitle="29 campos · 11.4 KB · estructura anidada" progress={100} progressTone="ok" badge={<Chip tone="ok">parseado · 31ms</Chip>} />
            </Preview>
          </Sub>
          <Sub title="Agent card">
            <div style={{ maxWidth: 380 }}>
              <AgentCard
                ready
                steps={[
                  { label: "Parseando estructura JSON", state: "done" },
                  { label: "Inferiendo tipos de dato", state: "done" },
                  { label: "Consultando Canónico v9.0.0", state: "done" },
                  { label: "Generando reglas de mapeo", state: "done" },
                  { label: "Validando coherencia semántica", state: "done" },
                ]}
              />
            </div>
          </Sub>
          <Sub title="Capacity card">
            <Preview>
              <CapacityCard name="Perfil del solicitante" state="ok" chips={[{ label: "Identidad nacional", state: "ok" }, { label: "Email", state: "ok" }]} />
              <CapacityCard name="Historial crediticio" state="err" chips={[{ label: "Score de buró", state: "missing" }, { label: "Morosidades", state: "missing" }]} />
              <CapacityCard name="Capacidad de pago" state="warn" chips={[{ label: "Ingresos", state: "ok" }, { label: "Egresos", state: "warn" }]} />
            </Preview>
          </Sub>
        </Sec>

        <Sec id="data" title="Display de datos">
          <Sub title="JSON tree">
            <Preview col>
              <JsonTree
                node={{
                  key: "root",
                  type: "object",
                  children: [
                    {
                      key: "solicitante",
                      type: "object",
                      children: [
                        { key: "cedula", type: "string", value: '"0912345678"', mapStatus: "ok" },
                        { key: "estadoCivil", type: "string", value: '"C"', mapStatus: "warn" },
                        { key: "primerNombre", type: "string", value: '"María"', mapStatus: "none" },
                        { key: "correoElectronico", type: "string", value: '"maria@email.com"', mapStatus: "ok" },
                      ],
                    },
                  ],
                }}
              />
              <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
                {(
                  [
                    ["ok", "Con match"],
                    ["warn", "Sin equivalente"],
                    ["none", "Sin mapear"],
                  ] as const
                ).map(([c, l]) => (
                  <div key={c} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "var(--ink-4)" }}>
                    <span className={`json-map-dot ${c}`} />
                    {l}
                  </div>
                ))}
              </div>
            </Preview>
          </Sub>
        </Sec>

        <Sec id="tables" title="Tablas">
          <Sub title="Data table">
            <Card style={{ overflow: "hidden" }}>
              <DataTable
                rowKey={(r) => r.path}
                columns={[
                  { header: "Campo destino", render: (r) => r.path, mono: true },
                  { header: "Tipo", render: (r) => <TypeBadge type={r.type} short /> },
                  { header: "Política nulos", render: (r) => <Chip>{r.np}</Chip> },
                  { header: "Estado", render: (r) => <Dot tone={r.ok ? "ok" : "warn"} /> },
                ]}
                rows={[
                  { path: "profile.personalInfo.nationalId", type: "STR" as SourceType, np: "REQUIRED", ok: true },
                  { path: "paymentCapacity.monthlyIncome", type: "NUM" as SourceType, np: "REQUIRED", ok: true },
                  { path: "profile.personalInfo.maritalStatus", type: "STR" as SourceType, np: "SET_NULL", ok: false },
                  { path: "bureaus.score", type: "INT" as SourceType, np: "REQUIRED", ok: true },
                ]}
              />
            </Card>
          </Sub>
        </Sec>

        <Sec id="alerts" title="Alertas y feedback">
          <Sub title="Alert — 4 tonos">
            <Preview col style={{ gap: 10, maxWidth: 560 }}>
              <Alert tone="ok" title="Configuración publicada" desc="La versión credito-individual-ptc v1.4.0 está activa en producción." />
              <Alert tone="warn" title="Cobertura parcial" desc="3 capacidades tienen cobertura incompleta. Revisá los campos faltantes en el resumen." />
              <Alert tone="err" title="Blocker: campo crítico sin fuente" desc="creditHistory.bureauScore no tiene campo de origen asignado." />
              <Alert tone="info" title="Canónico v9.0.0" desc="El schema canónico fue actualizado el 15 jun. Revisá si hay campos nuevos disponibles." />
            </Preview>
          </Sub>
          <Sub title="Save indicator">
            <Preview>
              <SaveIndicator state="saving" />
              <SaveIndicator state="saved" />
              <SaveIndicator state="error" />
            </Preview>
          </Sub>
          <Sub title="Save toast">
            <Preview>
              <Button onClick={() => setShowToast(true)}>Mostrar toast</Button>
              {showToast && <SaveToast tone="ok" message="Guardado exitosamente" onDismiss={() => setShowToast(false)} />}
            </Preview>
          </Sub>
          <Sub title="Locked surface">
            <Preview style={{ padding: 0 }}>
              <div style={{ width: "100%" }}>
                <LockedSurface
                  heading="Primero completá la ingesta"
                  body="El editor se activa después de cargar el JSON del cliente y ejecutar el análisis del agente."
                  cta="Ir a configuración"
                  onCta={() => {}}
                  steps={[
                    { label: "Configuración", state: "done" },
                    { label: "Ingesta de datos", state: "now" },
                    { label: "Editor de mapeo", state: "pending" },
                  ]}
                />
              </div>
            </Preview>
          </Sub>
          <Sub title="Surface header">
            <Preview col style={{ gap: 0, padding: 0 }}>
              <SurfaceHeader crumbs="DATA TRANSLATION / EDITOR" title="Crédito Individual PTC" sub="Definición de mapeo activa en producción." actions={<Button variant="primary">Guardar</Button>} />
            </Preview>
          </Sub>
        </Sec>
      </main>
    </div>
  );
}
