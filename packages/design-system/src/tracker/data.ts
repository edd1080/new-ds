/**
 * Component Tracker — living inventory of every component in Bowpi Enterprise.
 * Ported from project/Bowpi Enterprise Component Tracker.html, re-scoped so
 * "ds" means "implemented as a real component in @bowpi/design-system" rather
 * than "documented in the static HTML specimen". Update this file whenever a
 * component is added, promoted from inline JSX to a shared component, or planned.
 */

export type TrackerStatus = "ds" | "code" | "todo" | "fut";
export type TrackerSource = "ui" | "bowpi" | "auth";

export interface TrackerComponent {
  category: string;
  name: string;
  css: string;
  status: TrackerStatus;
  source: TrackerSource;
  desc: string;
}

export const STATUS_META: Record<TrackerStatus, { label: string; short: string }> = {
  ds: { label: "En @bowpi/design-system", short: "DS" },
  code: { label: "Usado en apps, falta extraer al DS", short: "Código" },
  todo: { label: "Por construir", short: "Pendiente" },
  fut: { label: "Futuro", short: "Futuro" },
};

export const SOURCE_META: Record<TrackerSource, { label: string }> = {
  ui: { label: "Untitled UI" },
  bowpi: { label: "Bowpi" },
  auth: { label: "Auth" },
};

export const TRACKER_COMPONENTS: TrackerComponent[] = [
  // ─── FUNDACIONES ───
  { category: "Fundaciones", name: "Color System", css: "--surface-*, --ink-*, --accent-*, semánticos", status: "ds", source: "bowpi", desc: "Paleta completa: surfaces, tipografía, acento cyan, semánticos ok/warn/err/info. Light + dark. packages/design-system/src/styles/base.css." },
  { category: "Fundaciones", name: "Typography Scale", css: "--font-sans, --font-display, --font-mono", status: "ds", source: "bowpi", desc: "3 familias: DM Sans (cuerpo), Space Grotesk (display), JetBrains Mono (código)." },
  { category: "Fundaciones", name: "Spacing & Density", css: "--space, --pad-surface, --gap-card", status: "ds", source: "bowpi", desc: "Multiplicador de densidad --space (0.82/1/1.18). Escalado automático de padding." },
  { category: "Fundaciones", name: "Border Radius", css: "--r-xs ... --r-xl, --r-pill", status: "ds", source: "bowpi", desc: "6 niveles de radio: 5px a 22px + pill 100px." },
  { category: "Fundaciones", name: "Shadows", css: "--shadow-sm/md/lg/pop", status: "ds", source: "bowpi", desc: "4 niveles de elevación para cards, modales y elementos flotantes." },
  { category: "Fundaciones", name: "Animations", css: "@keyframes m-fade-up, m-spin, m-pulse, etc.", status: "ds", source: "bowpi", desc: "8 keyframes: fade-up, fade, scale-in, pulse, spin, flow, blink, bob." },
  { category: "Fundaciones", name: "Grid Background", css: "--grid-bg", status: "ds", source: "bowpi", desc: "Grid decorativo de fondo en .main. Líneas sutiles cada 72px." },

  // ─── BOTONES ───
  { category: "Botones", name: "Button Default", css: ".btn", status: "ds", source: "ui", desc: "components/ui/Button.tsx. Borde line-2, bg surface-1. 40px height." },
  { category: "Botones", name: "Button Primary", css: ".btn.primary", status: "ds", source: "ui", desc: "components/ui/Button.tsx variant=\"primary\". Usa --action-primary-* para no alterar el acento general." },
  { category: "Botones", name: "Button Ghost", css: ".btn.ghost", status: "ds", source: "ui", desc: "components/ui/Button.tsx variant=\"ghost\"." },
  { category: "Botones", name: "Button Small", css: ".btn.sm", status: "ds", source: "ui", desc: "components/ui/Button.tsx size=\"sm\". 32px height." },
  { category: "Botones", name: "Button Large", css: ".btn.lg", status: "ds", source: "ui", desc: "components/ui/Button.tsx size=\"lg\". 50px height." },
  { category: "Botones", name: "Button Block", css: ".btn.block", status: "ds", source: "ui", desc: "components/ui/Button.tsx block. width: 100%." },
  { category: "Botones", name: "Button Disabled", css: ".btn[disabled]", status: "ds", source: "ui", desc: "Native disabled prop — opacity 0.42, cursor not-allowed." },
  { category: "Botones", name: "Button Loading", css: ".btn + .spin", status: "ds", source: "ui", desc: "components/ui/Button.tsx <Spin> wrapper." },
  { category: "Botones", name: "Icon Button", css: ".iconbtn", status: "ds", source: "ui", desc: "components/ui/Button.tsx IconButton. 40×40px." },
  { category: "Botones", name: "Auth Btn Fill", css: ".btn-fill", status: "ds", source: "auth", desc: "components/auth/AuthButtons.tsx BtnFill. 44px, bg accent, text #00282e." },
  { category: "Botones", name: "Auth Btn Outline", css: ".btn-outline", status: "ds", source: "auth", desc: "components/auth/AuthButtons.tsx BtnOutline. 44px, bg surface-1, borde line-2." },
  { category: "Botones", name: "Auth Btn Ghost", css: ".btn-ghost-back", status: "ds", source: "auth", desc: "components/auth/AuthButtons.tsx BtnGhostBack. Con ícono flecha." },

  // ─── BADGES Y CHIPS ───
  { category: "Badges y Chips", name: "Chip", css: ".chip / .chip.sm", status: "ds", source: "ui", desc: "components/ui/Chip.tsx. Variantes: ok, warn, err, info, brand; size=\"sm\" para etiquetas compactas." },
  { category: "Badges y Chips", name: "Tag", css: ".tag / .tag.sm", status: "ds", source: "ui", desc: "components/primitives/Tag.tsx. size=\"sm\" para labels técnicos compactos." },
  { category: "Badges y Chips", name: "Dot indicator", css: ".dot", status: "ds", source: "ui", desc: "components/primitives/Dot.tsx." },
  { category: "Badges y Chips", name: "Status Pill", css: ".status-pill", status: "ds", source: "bowpi", desc: "components/ui/StatusPill.tsx. published/draft/analysis." },
  { category: "Badges y Chips", name: "Type Badge", css: ".type-badge.STR/.INT etc", status: "ds", source: "bowpi", desc: "components/ui/TypeBadge.tsx. Colores fijos por tipo (excepción documentada). variant=\"mapper\" para labels del Mapper Editor." },
  { category: "Badges y Chips", name: "Dest Badge", css: ".dest-badge", status: "ds", source: "bowpi", desc: "components/ui/DestBadge.tsx. assigned/unassigned." },
  { category: "Badges y Chips", name: "Kbd", css: ".kbd", status: "ds", source: "ui", desc: "components/ui/Kbd.tsx." },
  { category: "Badges y Chips", name: "Progress Bar", css: ".pbar", status: "ds", source: "ui", desc: "components/ui/ProgressBar.tsx." },
  { category: "Badges y Chips", name: "Avatar (SM)", css: ".avatar-sm", status: "code", source: "ui", desc: "Usado inline en Topbar.tsx y Sidebar.tsx. Pendiente generalizar como Avatar propio." },

  // ─── FORMULARIOS ───
  { category: "Formularios", name: "Text Input", css: ".form-input", status: "ds", source: "ui", desc: "components/ui/FormInput.tsx. reposo/focus/error/disabled/mono." },
  { category: "Formularios", name: "Textarea", css: ".form-textarea", status: "ds", source: "ui", desc: "components/ui/Textarea.tsx." },
  { category: "Formularios", name: "Select", css: ".select-native", status: "ds", source: "ui", desc: "components/ui/Select.tsx. Chevron overlay." },
  { category: "Formularios", name: "Search Bar", css: ".search-bar", status: "ds", source: "ui", desc: "components/ui/SearchBar.tsx." },
  { category: "Formularios", name: "Toggle", css: ".toggle-track", status: "ds", source: "ui", desc: "components/ui/Toggle.tsx." },
  { category: "Formularios", name: "Checkbox", css: ".checkbox-box", status: "ds", source: "ui", desc: "components/ui/Checkbox.tsx." },
  { category: "Formularios", name: "Radio", css: ".radio-circle", status: "ds", source: "ui", desc: "components/ui/Radio.tsx RadioOption + RadioGroup." },
  { category: "Formularios", name: "Form Field", css: ".form-field", status: "ds", source: "bowpi", desc: "components/ui/FormField.tsx." },
  { category: "Formularios", name: "Mapper ID Preview", css: ".mapper-id-preview", status: "ds", source: "bowpi", desc: "components/ui/MapperIdPreview.tsx." },
  { category: "Formularios", name: "OTP Input", css: ".otp-box", status: "ds", source: "auth", desc: "components/auth/OTPInput.tsx. 52×58px, font-display 26px. Auto-avance + paste." },
  { category: "Formularios", name: "Dropdown Custom", css: "(no existe aún)", status: "todo", source: "ui", desc: "Dropdown animado con lista de opciones custom." },
  { category: "Formularios", name: "Tag Input", css: "(no existe aún)", status: "fut", source: "ui", desc: "Input para agregar tags/etiquetas múltiples." },
  { category: "Formularios", name: "Date Picker", css: "(no existe aún)", status: "fut", source: "ui", desc: "Selector de fecha." },
  { category: "Formularios", name: "Multi-select", css: "(no existe aún)", status: "fut", source: "ui", desc: "Select con selección múltiple." },

  // ─── NAVEGACIÓN ───
  { category: "Navegación", name: "Sidebar Item", css: ".sidebar-item", status: "ds", source: "bowpi", desc: "components/shell/Sidebar.tsx." },
  { category: "Navegación", name: "Sidebar Section", css: ".sidebar-section / .sidebar-label", status: "ds", source: "bowpi", desc: "components/shell/Sidebar.tsx." },
  { category: "Navegación", name: "Topbar", css: ".topbar", status: "ds", source: "bowpi", desc: "components/shell/Topbar.tsx." },
  { category: "Navegación", name: "Statusbar", css: ".statusbar", status: "ds", source: "bowpi", desc: "components/shell/Statusbar.tsx." },
  { category: "Navegación", name: "Breadcrumb", css: ".breadcrumb", status: "ds", source: "ui", desc: "components/ui/Breadcrumb.tsx." },
  { category: "Navegación", name: "Tabs Underline", css: ".tabs-bar / .tab-ul", status: "ds", source: "ui", desc: "components/ui/Tabs.tsx TabsUnderline." },
  { category: "Navegación", name: "Tabs Segmented", css: ".mapper4-tabs / .mapper4-tab", status: "ds", source: "bowpi", desc: "components/ui/Tabs.tsx TabsSegmented." },
  { category: "Navegación", name: "Upload Stepper", css: ".upload-stepper", status: "ds", source: "bowpi", desc: "components/ui/UploadStepper.tsx." },
  { category: "Navegación", name: "DT Stepper", css: ".dt-stepper", status: "ds", source: "bowpi", desc: "components/ui/DtStepper.tsx + inline in Sidebar.tsx." },
  { category: "Navegación", name: "Pagination", css: "(no existe aún)", status: "fut", source: "ui", desc: "Para listas largas." },

  // ─── CARDS ───
  { category: "Cards", name: "Card Base", css: ".card / .card-head", status: "ds", source: "ui", desc: "components/ui/Card.tsx Card + CardHead." },
  { category: "Cards", name: "Stat Card", css: ".stat-card", status: "ds", source: "bowpi", desc: "components/ui/StatCard.tsx." },
  { category: "Cards", name: "Project Card", css: ".project-card4", status: "ds", source: "bowpi", desc: "components/ui/ProjectCard.tsx." },
  { category: "Cards", name: "File Card", css: ".file-card", status: "ds", source: "bowpi", desc: "components/ui/FileCard.tsx." },
  { category: "Cards", name: "Agent Card", css: ".agent-card", status: "ds", source: "bowpi", desc: "components/ui/AgentCard.tsx." },
  { category: "Cards", name: "Capacity Card", css: ".capacity-card", status: "ds", source: "bowpi", desc: "components/ui/CapacityCard.tsx. Con detalle expandible (pathsMapped/pathsMissing) para /summary." },
  { category: "Cards", name: "Publish Checklist", css: ".checklist-item", status: "code", source: "bowpi", desc: "Item de validación pre-publicación. Inline en app/(app)/publish/page.tsx — pendiente extraer a design-system." },
  { category: "Cards", name: "Auth Icon Card", css: ".auth-icon", status: "ds", source: "auth", desc: "components/auth/AuthIcon.tsx. 58px card decorativa con ícono." },

  // ─── DATA DISPLAY ───
  { category: "Data Display", name: "Mapping Row", css: ".mrow4", status: "ds", source: "bowpi", desc: "components/mapper/MappingRow.tsx. src-path → dest-badge + type-badge + acciones." },
  { category: "Data Display", name: "Section Header", css: ".section4-head", status: "ds", source: "bowpi", desc: "components/mapper/Section4.tsx. Matched/noMatch colapsable." },
  { category: "Data Display", name: "JSON Tree Node", css: ".json-node / .json-leaf", status: "ds", source: "bowpi", desc: "components/ui/JsonTree.tsx (Upload) + components/mapper/TreePanel.tsx (Mapper, con estado de mapeo derivado de las reglas)." },
  { category: "Data Display", name: "JSON Map Dot", css: ".json-map-dot", status: "ds", source: "bowpi", desc: "Inline dentro de JsonTree.tsx / TreePanel.tsx." },
  { category: "Data Display", name: "Agent Step Row", css: ".agent-step-row", status: "ds", source: "bowpi", desc: "Inline dentro de components/ui/AgentCard.tsx." },
  { category: "Data Display", name: "Domain Indicator", css: ".domain-badge", status: "ds", source: "bowpi", desc: "components/mapper/DomainBadge.tsx. Círculo lleno accesible resuelto por el helper oficial D0-D8." },
  { category: "Data Display", name: "Null Policy Badge", css: ".null-pol-badge", status: "ds", source: "bowpi", desc: "components/mapper/NullPolicyBadge.tsx. PRD §5.3." },

  // ─── TABLAS ───
  { category: "Tablas", name: "Data Table", css: ".data-table", status: "ds", source: "ui", desc: "components/ui/DataTable.tsx." },
  { category: "Tablas", name: "Audit Table", css: ".audit-table", status: "code", source: "bowpi", desc: "Tabla del audit trail. Inline en app/(app)/publish/page.tsx — pendiente extraer a design-system." },

  // ─── ALERTAS Y FEEDBACK ───
  { category: "Alertas y Feedback", name: "Alert", css: ".alert", status: "ds", source: "ui", desc: "components/ui/Alert.tsx. 4 tonos." },
  { category: "Alertas y Feedback", name: "Save Indicator", css: ".save-indicator", status: "ds", source: "bowpi", desc: "components/ui/SaveIndicator.tsx." },
  { category: "Alertas y Feedback", name: "Save Toast", css: ".save-toast", status: "ds", source: "bowpi", desc: "components/ui/SaveToast.tsx." },
  { category: "Alertas y Feedback", name: "Empty State", css: ".surf-empty", status: "ds", source: "ui", desc: "components/ui/LockedSurface.tsx." },
  { category: "Alertas y Feedback", name: "Locked Surface", css: ".surf-empty + .prereq", status: "ds", source: "bowpi", desc: "components/ui/LockedSurface.tsx." },
  { category: "Alertas y Feedback", name: "Spinner", css: ".spin", status: "ds", source: "ui", desc: "components/ui/Spinner.tsx." },
  { category: "Alertas y Feedback", name: "Blocker Banner", css: ".publish-blocker-banner / .summary-blocker", status: "code", source: "bowpi", desc: "Banner de error crítico. Inline en /publish y /summary — pendiente generalizar en DS." },
  { category: "Alertas y Feedback", name: "Loading Skeleton", css: "(no existe aún)", status: "todo", source: "ui", desc: "Placeholder animado mientras carga data." },
  { category: "Alertas y Feedback", name: "Editor Loading State", css: ".editor-state-loading", status: "ds", source: "bowpi", desc: "PRD §13. Inline en app/(app)/mapper/page.tsx — spinner + \"Cargando definición…\"." },
  { category: "Alertas y Feedback", name: "Editor Not Found", css: ".editor-state-404", status: "ds", source: "bowpi", desc: "PRD §13. Inline en app/(app)/mapper/page.tsx." },
  { category: "Alertas y Feedback", name: "Parse Error State", css: ".parse-error", status: "ds", source: "bowpi", desc: "PRD §3.4. Inline en app/(app)/upload/page.tsx (phase === \"parseError\")." },
  { category: "Alertas y Feedback", name: "Notification", css: "(no existe aún)", status: "fut", source: "ui", desc: "Toast rico con avatar, título, acción." },
  { category: "Alertas y Feedback", name: "Tooltip", css: "(no existe aún)", status: "fut", source: "ui", desc: "Overlay al hover." },

  // ─── PANELES ───
  { category: "Paneles", name: "Policies Panel", css: ".policies-panel", status: "ds", source: "bowpi", desc: "components/mapper/PoliciesPanel.tsx. Panel derecho del mapper — v2 (PRD §7.5), incluye alt. source picker." },
  { category: "Paneles", name: "Tree Panel", css: ".tree-panel", status: "ds", source: "bowpi", desc: "components/mapper/TreePanel.tsx. Panel izquierdo colapsable del mapper (220px/38px)." },
  { category: "Paneles", name: "Field Info Card", css: ".field-info-card", status: "ds", source: "bowpi", desc: "Inline dentro de PoliciesPanel.tsx." },
  { category: "Paneles", name: "Policy Options", css: ".policy-options / .policy-opt", status: "ds", source: "bowpi", desc: "Inline dentro de PoliciesPanel.tsx (Transformación: DIRECT/CODE_LOOKUP)." },
  { category: "Paneles", name: "Value Preview", css: ".value-preview", status: "ds", source: "bowpi", desc: "Inline dentro de PoliciesPanel.tsx." },
  { category: "Paneles", name: "Domain Review Panel", css: ".dom-panel", status: "ds", source: "bowpi", desc: "components/domains/DomainPanel.tsx. PRD §7.7 — usado en el tab \"Dominios\" del Mapper Editor." },

  // ─── MODALES ───
  { category: "Modales", name: "Destination Modal v2", css: ".dm2-modal (2-col)", status: "ds", source: "bowpi", desc: "components/mapper/DestinationModal.tsx. PRD §6.4 — 900px × 85vh, 2 columnas, simula carga del catálogo." },
  { category: "Modales", name: "Catalog Item", css: ".catalog-item", status: "ds", source: "bowpi", desc: "PRD §6.3. Inline dentro de DestinationModal.tsx (CatalogItemRow)." },
  { category: "Modales", name: "Search Toggle", css: ".search-toggle", status: "ds", source: "bowpi", desc: "PRD §6.5. Inline dentro de DestinationModal.tsx." },
  { category: "Modales", name: "Category Filter Pill", css: ".cat-filter-pill", status: "ds", source: "bowpi", desc: "PRD §6.5. Inline dentro de DestinationModal.tsx, paleta cíclica CATEGORY_COLORS." },
  { category: "Modales", name: "Modal Overlay", css: ".modal-overlay", status: "ds", source: "bowpi", desc: "Portal genérico — usado por ConfirmDialog, SourcePickerModal, DestinationModal." },
  { category: "Modales", name: "Confirm Dialog", css: ".confirm-dialog (portal)", status: "ds", source: "bowpi", desc: "components/domains/ConfirmDialog.tsx. PRD §10 — reutilizado en Domains y Mapper Editor." },
  { category: "Modales", name: "Source Picker Modal", css: ".source-picker-modal", status: "ds", source: "bowpi", desc: "components/mapper/SourcePickerModal.tsx. PRD §7.6." },
  { category: "Modales", name: "Slide Panel", css: ".dom-slide", status: "ds", source: "bowpi", desc: "components/domains/SlidePanel.tsx. Panel deslizante lateral usado por New/Edit Var, New Domain y Publish Version en Dominios." },
  { category: "Modales", name: "Sim Add Model Modal", css: ".sim-modal", status: "ds", source: "bowpi", desc: "app/(app)/simulations/components/AddModelModal.tsx. Sube .dmn, preview parseado, crea DmnModel." },

  // ─── AUTH (exclusivo) ───
  { category: "Auth", name: "Auth Layout", css: ".auth-root", status: "ds", source: "auth", desc: "components/auth/AuthLayout.tsx. 2 columnas: panel 500px + arte SVG dark." },
  { category: "Auth", name: "Auth Art Panel", css: ".auth-art", status: "ds", source: "auth", desc: "components/auth/AuthArt.tsx. Gradiente dark con SVG animado (dots, rings, líneas)." },
  { category: "Auth", name: "Auth Panel", css: ".auth-panel", status: "ds", source: "auth", desc: "components/auth/AuthPanel.tsx. Columna 500px con marca + AuthFooter." },
  { category: "Auth", name: "Auth Form", css: ".auth-form / .auth-center", status: "ds", source: "auth", desc: "components/auth/AuthForm.tsx. AuthForm + AuthCenter — wrapper de formulario centrado, max-width 360px." },
  { category: "Auth", name: "Auth Icon", css: ".auth-icon", status: "ds", source: "auth", desc: "components/auth/AuthIcon.tsx. 58px decorativo, variante .ok." },
  { category: "Auth", name: "Password Field", css: ".pw-wrap / .pw-eye", status: "ds", source: "auth", desc: "components/auth/PasswordField.tsx. Input con toggle mostrar/ocultar." },
  { category: "Auth", name: "Auth Footer", css: ".auth-footer", status: "ds", source: "auth", desc: "components/auth/AuthFooter.tsx. © + email de soporte en mono." },
  { category: "Auth", name: "Divider", css: ".divider", status: "ds", source: "auth", desc: "components/auth/Divider.tsx. Separador \"o\" entre form y login social." },

  // ─── PATRONES ───
  { category: "Patrones", name: "Surface Header", css: ".surface-header", status: "ds", source: "bowpi", desc: "components/ui/SurfaceHeader.tsx." },
  { category: "Patrones", name: "Mapper Editor", css: ".mapper4-surface / .mapper4-body", status: "ds", source: "bowpi", desc: "app/(app)/mapper/page.tsx. 3 paneles: TreePanel + rules list (Section4 + MappingRow) + PoliciesPanel, tabs Mapeo/Dominios." },
  { category: "Patrones", name: "Ingesta Flow", css: ".dt-upload / .agent-aside", status: "ds", source: "bowpi", desc: "app/(app)/upload/page.tsx IngestaStep. 2 columnas: árbol JSON + AgentCard, fases empty→loading→parsed→done/parseError." },
  { category: "Patrones", name: "Config Form", css: ".config-form / .config-surface", status: "ds", source: "bowpi", desc: "app/(app)/upload/page.tsx ConfigStep. Form 520px: nombre + MapperIdPreview." },
  { category: "Patrones", name: "Success Screen", css: ".mapper-success / .ok-ring", status: "ds", source: "bowpi", desc: "app/(app)/publish/page.tsx. Pantalla de publicación exitosa con ok-ring animado." },
  { category: "Patrones", name: "Shell Layout", css: ".shell (grid)", status: "ds", source: "bowpi", desc: "components/shell/Shell.tsx." },
  { category: "Patrones", name: "Explainer Track", css: ".xpl-track", status: "ds", source: "bowpi", desc: "components/patterns/ExplainerTrack.tsx. Track horizontal de 5 stages, usado en /explainer." },
  { category: "Patrones", name: "Tour Step", css: ".tour-step / .demo-empty", status: "ds", source: "bowpi", desc: "components/patterns/TourStep.tsx (TourStep, TourIntro, DemoEmpty), usado en /tour." },
  { category: "Patrones", name: "Settings Screen", css: ".settings-section / .settings-card", status: "code", source: "bowpi", desc: "app/(app)/settings/page.tsx. Perfil, Workspace, Apariencia, Notificaciones, Seguridad, Zona de peligro — sección local, no extraída al DS (uso único)." },
  { category: "Patrones", name: "Sidebar Collapsed State", css: "html[data-sidebar=closed] .shell", status: "ds", source: "bowpi", desc: "Implementado en components/shell/Shell.tsx (48px, auto-colapsa <1100px)." },
  { category: "Patrones", name: "Pipeline Tracker Animado", css: ".ov-pipeline / .ov-pipeline-node", status: "ds", source: "bowpi", desc: "Inline en app/(app)/overview/page.tsx. Tracker de 3 pasos del pipeline Data Translation." },
  { category: "Patrones", name: "Domains Surface", css: ".domains-surface / .dom-body", status: "ds", source: "bowpi", desc: "app/(app)/domains/page.tsx. Split panel: lista de dominios + tabs Variables/Versiones." },

  // ─── DOMINIOS (Matilda 4.5) ───
  { category: "Dominios", name: "Domain List Item", css: ".dom-list-item", status: "ds", source: "bowpi", desc: "Inline en app/(app)/domains/page.tsx. Fila de dominio con id pill, nombre, estado y contador S/C." },
  { category: "Dominios", name: "Vars Tab", css: ".var-row / .var-detail", status: "ds", source: "bowpi", desc: "app/(app)/domains/components/VarsTab.tsx. Variables directas (S) y calculadas (C), expandibles, activar/archivar." },
  { category: "Dominios", name: "Versions Tab", css: ".dom-version-row", status: "ds", source: "bowpi", desc: "app/(app)/domains/components/VersionsTab.tsx. Historial inmutable de versiones con ciclo enable/disable/archive." },
  { category: "Dominios", name: "Version Row", css: ".dom-version-row", status: "ds", source: "bowpi", desc: "app/(app)/domains/components/VersionRow.tsx." },
  { category: "Dominios", name: "Vigente Panel", css: ".dom-vigente-panel", status: "ds", source: "bowpi", desc: "app/(app)/domains/components/VigentePanel.tsx. Snapshot de la versión activa/vigente." },
  { category: "Dominios", name: "New/Edit Variable Slide", css: ".dom-slide", status: "ds", source: "bowpi", desc: "app/(app)/domains/components/{NewVarSlide,EditVarSlide}.tsx." },
  { category: "Dominios", name: "New Domain / Publish Version Slide", css: ".dom-slide", status: "ds", source: "bowpi", desc: "app/(app)/domains/components/{NewDomainSlide,PublishVersionSlide}.tsx." },
  { category: "Dominios", name: "Path Autocomplete", css: ".dom-path-autocomplete", status: "ds", source: "bowpi", desc: "app/(app)/domains/components/PathAutocomplete.tsx. Autocompletado de source path para variables directas." },

  // ─── SIMULACIONES DMN (Matilda 4.5) ───
  { category: "Simulaciones DMN", name: "Sim Tab Bar", css: ".sim-tab-bar", status: "ds", source: "bowpi", desc: "components/simulations/SimTabBar.tsx. Tab switcher Simulaciones / Modelos + chip de tenant." },
  { category: "Simulaciones DMN", name: "Sim History Sidebar", css: ".sim-history", status: "ds", source: "bowpi", desc: "components/simulations/SimHistorySidebar.tsx. 300px, con búsqueda y filtros de estado integrados." },
  { category: "Simulaciones DMN", name: "Sim Filter Chip", css: ".sim-filter-chip", status: "ds", source: "bowpi", desc: "components/simulations/SimFilterChip.tsx (SimFilterChip + SimRowFilter)." },
  { category: "Simulaciones DMN", name: "Sim Card", css: ".sim-card", status: "ds", source: "bowpi", desc: "components/simulations/SimCard.tsx." },
  { category: "Simulaciones DMN", name: "Sim Status View", css: ".sim-status-view", status: "ds", source: "bowpi", desc: "components/simulations/SimStatusView.tsx (SimEmptyState, SimQueuedView, SimRunningView, SimFailedView)." },
  { category: "Simulaciones DMN", name: "Sim Model Card", css: ".sim-model-card", status: "ds", source: "bowpi", desc: "components/simulations/SimModelCard.tsx." },
  { category: "Simulaciones DMN", name: "Sim Version Chip", css: ".sim-version-chip", status: "ds", source: "bowpi", desc: "components/simulations/SimVersionChip.tsx." },
  { category: "Simulaciones DMN", name: "Sim Dataset Card", css: ".sim-dataset-card", status: "ds", source: "bowpi", desc: "components/simulations/SimDatasetCard.tsx." },
  { category: "Simulaciones DMN", name: "Sim Run Rail", css: ".sim-run-rail", status: "ds", source: "bowpi", desc: "components/simulations/SimRunRail.tsx. Panel sticky derecho con resumen + botón Run." },
  { category: "Simulaciones DMN", name: "Sim Metric Card", css: ".sim-metric-card", status: "ds", source: "bowpi", desc: "components/simulations/SimMetricCard.tsx." },
  { category: "Simulaciones DMN", name: "Sim Distribution Bar", css: ".sim-dist-bar / .sim-dist-seg", status: "ds", source: "bowpi", desc: "components/simulations/SimDistributionBar.tsx." },
  { category: "Simulaciones DMN", name: "Sim Results Table", css: ".sim-table / .sim-table-wrap", status: "ds", source: "bowpi", desc: "components/simulations/SimResultsTable.tsx." },
  { category: "Simulaciones DMN", name: "Sim Drawer", css: ".sim-drawer", status: "ds", source: "bowpi", desc: "components/simulations/SimDrawer.tsx. Overlay fullscreen con grafo DMN + panel inferior." },
  { category: "Simulaciones DMN", name: "DMN Canvas (SVG)", css: ".sim-dmn-wrap", status: "ds", source: "bowpi", desc: "components/simulations/SimDmnCanvas.tsx. Grafo DMN con SVG; nodos/aristas en formato React-Flow-ready (id/position/data)." },
  { category: "Simulaciones DMN", name: "DMN Node Decision / Input Data", css: ".sim-node-decision / .sim-node-input", status: "ds", source: "bowpi", desc: "Inline en SimDmnCanvas.tsx (SimDmnNodeDecision, SimDmnNodeInput)." },
  { category: "Simulaciones DMN", name: "DMN Controls", css: ".sim-dmn-controls", status: "ds", source: "bowpi", desc: "Inline en SimDmnCanvas.tsx (SimDmnControls). Zoom +/- y fit view." },
  { category: "Simulaciones DMN", name: "Node Detail Panel", css: ".sim-node-panel", status: "ds", source: "bowpi", desc: "components/simulations/SimNodeDetailPanel.tsx." },
  { category: "Simulaciones DMN", name: "Sim Bottom Panel", css: ".sim-bottom-panel", status: "ds", source: "bowpi", desc: "components/simulations/SimBottomPanel.tsx. Entradas / Resultados de decisión / Mensajes." },
  { category: "Simulaciones DMN", name: "Sim Upload Zone", css: ".sim-upload-zone", status: "ds", source: "bowpi", desc: "components/simulations/SimUploadZone.tsx." },
  { category: "Simulaciones DMN", name: "Sim File Row", css: ".sim-file-row", status: "ds", source: "bowpi", desc: "components/simulations/SimFileRow.tsx." },
  { category: "Simulaciones DMN", name: "Sim Parsed Card", css: ".sim-parsed-card", status: "ds", source: "bowpi", desc: "components/simulations/SimParsedCard.tsx." },
  { category: "Simulaciones DMN", name: "Sim Model Reg Card", css: ".sim-mreg-card", status: "ds", source: "bowpi", desc: "components/simulations/SimModelRegCard.tsx. Registro de modelos con filas de versión Publish/Unpublish." },
  { category: "Simulaciones DMN", name: "Sim Status Badge", css: ".sim-status-badge", status: "ds", source: "bowpi", desc: "components/simulations/SimStatusBadge.tsx. Live/Draft." },

  // ─── FUTURO ───
  { category: "Futuro", name: "Charts / Graphs", css: "(no existe)", status: "fut", source: "ui", desc: "Line chart, bar chart, pie." },
  { category: "Futuro", name: "Calendar", css: "(no existe)", status: "fut", source: "ui", desc: "Vista de mes/semana." },
  { category: "Futuro", name: "Command Menu", css: "(no existe)", status: "fut", source: "ui", desc: "⌘K paleta de comandos." },
  { category: "Futuro", name: "Code Snippet", css: "(no existe)", status: "fut", source: "ui", desc: "Bloque de código con syntax highlight." },
  { category: "Futuro", name: "Activity Feed", css: "(no existe)", status: "fut", source: "ui", desc: "Feed de actividad del workspace." },
  { category: "Futuro", name: "Empty State — Illustration", css: "(no existe)", status: "fut", source: "ui", desc: "Empty state con ilustración SVG." },
  { category: "Futuro", name: "404 / Error Page", css: "(no existe)", status: "fut", source: "ui", desc: "Pantalla de error para rutas no encontradas." },
  { category: "Futuro", name: "React Flow DMN Canvas", css: "(migración futura)", status: "fut", source: "bowpi", desc: "Migrar SimDmnCanvas de SVG plano a @xyflow/react — el modelo de datos (DmnNode/DmnEdge) ya está en formato compatible." },
];

export const TRACKER_CATEGORIES = [...new Set(TRACKER_COMPONENTS.map((c) => c.category))];
