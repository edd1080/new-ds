# COMPONENTS.md — Catálogo de Componentes

Inventario de todos los componentes disponibles en Bowpi Enterprise.
**Antes de crear un componente nuevo, verificar que no exista aquí.**
Última actualización: Jun 2026 — incluye todos los componentes del Design System v4.

---

## Cómo leer este catálogo

Para cada componente:
- **CSS classes:** las clases que lo definen en base.css / shell.css / surfaces4.css / auth.css
- **Cuándo usarlo:** guía de uso
- **Variantes:** clases modificadoras disponibles

---

## Fundaciones

### Matilda Mark (logo)

```jsx
<div className="mk">
  {[0,1,2,3,4,5,6,7,8].map(i => <span key={i}/>)}
</div>
```

Grid CSS 3×3. Posiciones 2,4,6,8 transparentes. Posición 5 = `var(--accent)`. Resto = `var(--ink-1)`.

---

## Botones

### Btn (sistema principal)

```jsx
<button className="btn">Default</button>
<button className="btn primary">Primary</button>
<button className="btn ghost">Ghost</button>
<button className="btn sm">Small</button>
<button className="btn lg">Large</button>
<button className="btn primary block">Full width</button>
<button className="btn" disabled>Disabled</button>
<button className="btn"><span className="spin"><Icon.refresh /></span> Cargando…</button>
```

| Clase | Height | Font | Uso |
|---|---|---|---|
| `.btn` | 40px | 14px | Default — acciones secundarias |
| `.btn.primary` | 40px | 14px | CTA principal. Con cyan: `color: #00282e` |
| `.btn.ghost` | 40px | 14px | Terciario, sin borde |
| `.btn.sm` | 32px | 13px | Rows, tablas, acciones inline |
| `.btn.lg` | 50px | 16px | CTAs hero, onboarding |
| `.btn.block` | — | — | Modifier: width 100% |

### Icon Button

```jsx
<button className="iconbtn"><Icon.bell /></button>
```

CSS: `.iconbtn` — 40×40px cuadrado. Para acciones de ícono solo en topbar, toolbar.

### Botones Auth (solo en `(auth)`)

```jsx
<button className="btn-fill">Iniciar sesión</button>
<button className="btn-outline">Continuar con Google</button>
<button className="btn-ghost-back"><IcoArrow/> Volver</button>
```

**CRÍTICO:** Exclusivos de auth. No importar en `(app)`.

---

## Primitivos

### Dot

```jsx
<span className="dot" />          {/* gris default */}
<span className="dot ok" />       {/* verde */}
<span className="dot warn" />     {/* ámbar */}
<span className="dot err" />      {/* rojo */}
<span className="dot run" />      {/* accent, animado m-pulse */}
```

7px círculo con box-shadow glow. `.run` pulsa suavemente (1.4s).

### Chip

```jsx
<span className="chip">Default</span>
<span className="chip ok"><span className="dot ok"/>Publicado</span>
<span className="chip warn"><span className="dot warn"/>Borrador</span>
<span className="chip err">Blocker</span>
<span className="chip info">Info</span>
<span className="chip brand"><span className="dot run"/>procesando</span>
```

CSS: `.chip` — `border-radius: var(--r-pill)`, font-mono 11px.

### Tag

```jsx
<span className="tag">default</span>
<span className="tag ok">ok</span>
<span className="tag warn">warn</span>
<span className="tag err">err</span>
<span className="tag accent">accent</span>
```

CSS: `.tag` — `border-radius: 3px`. Más compacto que chip.

### Status Pill

```jsx
<span className="status-pill published"><span className="dot ok"/>Publicado</span>
<span className="status-pill draft"><span className="dot warn"/>Borrador</span>
<span className="status-pill analysis"><span className="dot run"/>En análisis</span>
```

CSS: `.status-pill.published/.draft/.analysis`

### Type Badge

```jsx
<span className="type-badge STR">Texto</span>
<span className="type-badge INT">Entero</span>
<span className="type-badge NUM">Numérico</span>
<span className="type-badge BOOL">Booleano</span>
<span className="type-badge OBJ">Objeto</span>
<span className="type-badge ARR">Array</span>
<span className="type-badge NULL">Nulo</span>
```

Colores hardcoded por tipo (excepción documentada). CSS: `.type-badge` + `.STR/.INT/.NUM/.BOOL/.OBJ/.ARR/.NULL`

### Destination Badge

```jsx
{path
  ? <button className="dest-badge assigned" title={path}>{shortPath}</button>
  : <button className="dest-badge unassigned">+ Asignar destino</button>}
```

CSS: `.dest-badge.assigned` (pill accent-soft), `.dest-badge.unassigned` (borde dashed).

### Kbd

```jsx
<span className="kbd">⌘K</span>
<span className="kbd">Enter</span>
```

CSS: `.kbd` — fondo surface-3, border-bottom 2px.

### Progress Bar

```jsx
<div className="pbar"><div style={{ width: "72%" }}/></div>
<div className="pbar ok"><div style={{ width: "94%" }}/></div>
<div className="pbar warn"><div style={{ width: "38%" }}/></div>
```

6px height, pill. Variantes: ok, warn. Default: accent.

### Spinner

```jsx
<span className="spin"><Icon.refresh /></span>
```

`.spin` — `animation: m-spin 0.9s linear infinite`. Usable en cualquier ícono.

---

## Formularios

### Text Input

```jsx
<input className="form-input" placeholder="Texto…" />
<input className="form-input has-err" />
<input className="form-input mono" />            {/* para IDs, paths */}
<input className="form-input" disabled />
```

42px height. Focus: `border-color: var(--accent)` + `box-shadow: 0 0 0 3px var(--accent-soft)`.

### Textarea

```jsx
<textarea className="form-textarea" placeholder="Descripción…" />
<textarea className="form-textarea has-err" />
```

min-height 96px, resize vertical. Mismo estilo visual que form-input.

### Select

```jsx
<div className="select-field">
  <select className="select-native">
    <option>Opción</option>
  </select>
  <span className="select-chevron"><Icon.chevronDown /></span>
</div>
```

CSS: `.select-field`, `.select-native`, `.select-chevron`. Nativo con `appearance: none` + chevron overlay.

### Search Bar

```jsx
<div className="search-bar">
  <Icon.search width={14} height={14}/>
  <input placeholder="Buscar…"/>
  <span className="kbd">⌘K</span>
</div>
```

CSS: `.search-bar` — flex row, focus-within con ring accent.

### Toggle

```jsx
<div className="toggle-row">
  <button className={`toggle-track ${on ? "on" : ""}`} onClick={toggle}>
    <div className="toggle-thumb"/>
  </button>
  <span>{label}</span>
</div>
```

CSS: `.toggle-track`, `.toggle-track.on`, `.toggle-thumb`. 42×24px pill.

### Checkbox

```jsx
<div className="checkbox-row" onClick={toggle}>
  <div className={`checkbox-box ${checked ? "checked" : ""}`}>
    {checked && <svg>{/* check icon */}</svg>}
  </div>
  <div>
    <div className="checkbox-label">{label}</div>
    <div className="checkbox-hint">{hint}</div>
  </div>
</div>
```

CSS: `.checkbox-row`, `.checkbox-box`, `.checkbox-box.checked` (bg accent), `.checkbox-label`, `.checkbox-hint`.

### Radio

```jsx
<div className="radio-row" onClick={() => setSel(value)}>
  <div className={`radio-circle ${sel === value ? "checked" : ""}`}/>
  <div className="checkbox-label">{label}</div>
</div>
```

CSS: `.radio-row`, `.radio-circle`, `.radio-circle.checked` (dot 8px accent al centro).

### Form Field

```jsx
<div className="form-field">
  <label>Nombre <span className="req">*</span></label>
  <div className="desc">Descripción del campo.</div>
  <input className="form-input" placeholder="…"/>
</div>
```

CSS: `.form-field`, `.req` (color err), `.desc` (ink-4, 12.5px).

### Mapper ID Preview

```jsx
<div className="mapper-id-preview">
  <span className="val">{mapperId}</span>
  <button className="btn sm ghost">Editar</button>
</div>
```

CSS: `.mapper-id-preview`, `.mapper-id-preview .val` (mono, accent-ink).

### OTP Input (Auth only)

6 inputs 52×58px para código de verificación. Auto-avanza, soporta paste.
CSS: `.otp-row`, `.otp-box`

---

## Navegación

### Breadcrumb

```jsx
<div className="breadcrumb">
  <button className="breadcrumb-item">Data Translation</button>
  <span className="breadcrumb-sep">/</span>
  <button className="breadcrumb-item current">Editor</button>
</div>
```

CSS: `.breadcrumb`, `.breadcrumb-item`, `.breadcrumb-item.current`, `.breadcrumb-sep`. Mono 11px uppercase.

### Tabs Underline

```jsx
<div className="tabs-bar">
  <button className={`tab-ul ${active === "all" ? "active" : ""}`} onClick={() => setActive("all")}>
    Todas <span className="count">29</span>
  </button>
</div>
```

CSS: `.tabs-bar`, `.tab-ul`, `.tab-ul.active` (border-bottom accent), `.tab-ul .count`.

### Tabs Segmented (mapper4-tabs)

```jsx
<div className="mapper4-tabs">
  <button className={`mapper4-tab ${active === "all" ? "active" : ""}`}>Todas</button>
</div>
```

CSS: `.mapper4-tabs`, `.mapper4-tab`, `.mapper4-tab.active`.

### Sidebar Item

```jsx
<div className={`sidebar-item ${isActive ? "active" : ""}`} onClick={navigate}>
  <span className="ico"><Icon.cards /></span>
  <span>Proyectos</span>
  <span className="badge live">nuevo</span>
</div>
```

CSS: `.sidebar-item`, `.sidebar-item.active`, `.sidebar-item .ico`, `.sidebar-item .badge.live`.

### Upload Stepper

```jsx
<div className="upload-stepper">
  <div className="upload-stepper-step done"><div className="node">✓</div><div className="label">Configuración</div></div>
  <div className="upload-stepper-seg done"/>
  <div className="upload-stepper-step active"><div className="node">2</div><div className="label">Ingesta</div></div>
</div>
```

CSS: `.upload-stepper`, `.upload-stepper-step`, `.upload-stepper-step.done/.active`, `.upload-stepper-seg`, `.upload-stepper-seg.done`.

### DT Stepper (sidebar)

```jsx
<div className="dt-stepper">
  <div className="dt-step done">
    <div className="dt-step-line"/>
    <div className="dt-step-node">✓</div>
    <div className="dt-step-label">Configuración</div>
  </div>
</div>
```

CSS: `.dt-stepper`, `.dt-step`, `.dt-step.done/.active/.locked`, `.dt-step-line`, `.dt-step-node`, `.dt-step-label`.

---

## Cards

### Card Base

```jsx
<div className="card">
  <div className="card-head">
    <Icon.data />
    <span>Título</span>
    <span className="chip ok" style={{ marginLeft: "auto" }}>meta</span>
  </div>
  {/* contenido */}
</div>
```

CSS: `.card`, `.card.soft`, `.card-head`. Card-head: font-mono, 11px.

### Stat Card

```jsx
<StatCard label="Proyectos activos" value={2} detail="publicados + borrador" />
<StatCard label="Publicados" value={3} tone="ok" />
<StatCard label="Borradores" value={2} tone="warn" compact />
```

CSS: `.stat-card`, `.sk` (label mono 11px), `.sv` (valor display 22px 700), `.sd` (meta mono 11.5px).
Variantes: `.stat-card.compact` (menos padding, font 18px). Props: `tone` (ok/warn/err/info/accent), `compact`.

### Modal

```jsx
<Modal title="Agregar modelo" subtitle="Descripción opcional" onClose={close} footer={<>…</>}>
  {/* body content */}
</Modal>
```

CSS: `.modal-overlay`, `.modal`, `.modal-head`, `.modal-body`, `.modal-foot`, `.modal-close`.
Entrada: `m-scale-in 0.2s`. Overlay: `rgba(0,0,0,0.45)`. Cierre: click overlay + botón ✕.

### Empty State

```jsx
<EmptyState icon={<Icon.data />} title="Sin datos" description="Descripción opcional" action={<Button>CTA</Button>} />
```

CSS: `.empty-state`, `.empty-state-icon`, `.empty-state h3`, `.empty-state p`.
Centrado vertical, icon en box 48px con bg surface-3.

### Drop Zone

```jsx
<DropZone icon={<Icon.upload />} title="Arrastra tu archivo aquí" description="JSON, XML" accept=".json" onFile={handleFile} />
```

CSS: `.drop-zone`, `.drop-zone-icon`, `.drop-zone:hover` / `.drop-zone.over` (border accent, bg accent-soft).
Drag-and-drop con feedback visual + click para seleccionar.

### Tabs Flush

```jsx
<TabsFlush tabs={[{ value: "vars", label: "Variables", count: 5 }, { value: "versions", label: "Versiones" }]} value={active} onChange={setActive} />
```

CSS: `.tabs`, `.tab`, `.tab.active` (border-bottom accent). Estilo shell/panel — sin borde inferior en contenedor.

### Project Card

```jsx
<div className="project-card4" onClick={handleClick}>
  <div className="pc-info">
    <div className="pc-name">{project.name}</div>
    <div className="pc-meta"><span>29 reglas</span></div>
  </div>
  <div className="pc-actions">
    <button className="btn sm">Ver</button>
  </div>
</div>
```

CSS: `.project-card4`, `.pc-info`, `.pc-name`, `.pc-meta`, `.pc-actions`. Hover: border accent + shadow-sm.

### File Card

```jsx
<div className="file-card">  {/* o clase .fc */}
  <div className="fc-ft"><Icon.json /><span className="ext">JSON</span></div>
  <div className="fc-meta">
    <div className="fc-nm">{filename}</div>
    <div className="fc-sb">{meta}</div>
    <div className="prog-mini"><div style={{ width: `${pct}%` }}/></div>
  </div>
  <span className="chip ok">parseado</span>
</div>
```

CSS: `.file-card/.fc`, `.fc-ft`, `.fc-nm`, `.fc-sb`, `.prog-mini`.

### Agent Card

```jsx
<div className="agent-card">
  <div className="agent-card-head"><Icon.sparkles /> Agente de mapeo</div>
  <div className="agent-card-body">
    <div className="agent-step-row done">
      <div className="agent-step-icon done">✓</div>
      <span>Parseando estructura JSON</span>
    </div>
  </div>
</div>
```

CSS: `.agent-card`, `.agent-card-head`, `.agent-card-body`, `.agent-step-row`, `.agent-step-row.done/.running/.idle`, `.agent-step-icon`.

### Capacity Card

```jsx
<div className="capacity-card ok">
  <div className="cap-card-top">
    <div className="cap-icon ok"><Icon.person /></div>
    <div className="cap-name">Perfil del solicitante</div>
    <div className="cap-status ok"><span className="dot ok"/>Listo</div>
  </div>
  <div className="cap-chips">
    <span className="cap-chip ok">✓ Identidad nacional</span>
    <span className="cap-chip missing">⛔ Email</span>
  </div>
</div>
```

CSS: `.capacity-card`, `.capacity-card.ok/.warn/.err`, `.cap-card-top`, `.cap-icon`, `.cap-name`, `.cap-status`, `.cap-chips`, `.cap-chip.ok/.warn/.missing`.

### Auth Icon

```jsx
<div className="auth-icon"><IcoMail/></div>
<div className="auth-icon ok"><IcoCheck/></div>
```

CSS: `.auth-icon`, `.auth-icon.ok` (verde). 58px, r-lg. Auth only.

---

## Data Display

### Mapping Row

```jsx
<div className="mrow4">
  <span className="src-path">solicitante.cedula</span>
  <span className="row-arrow">→</span>
  <button className="dest-badge assigned">personalInfo.nationalId</button>
  <div className="mrow4-badges"><span className="type-badge STR">Texto</span></div>
  <div className="mrow4-actions">
    <button className="row-action remove">✕ Remover</button>
  </div>
</div>
```

Estados: `.mrow4`, `.mrow4.selected` (bg accent-soft, border accent).
Acciones: `.row-action.remove`, `.row-action.approve`, `.row-action.clear-dest`.
Inline confirm: `.row-confirm`.

### Section Header (mapper)

```jsx
<div className="section4-head matched" onClick={toggle}>
  <span className="sec-label">Match perfecto</span>
  <span className="sec-count">15</span>
  <span>▾</span>
</div>
<div className="section4-head nomatch">…</div>
```

CSS: `.section4-head.matched` (fondo ok-soft), `.section4-head.nomatch` (fondo surface-3).

### JSON Tree

```jsx
<div className="json-tree">
  <div className="json-node">
    <div className="json-node-head">
      <span className="json-caret">▾</span>
      <span className="json-key">solicitante</span>
      <span className="json-type-badge">obj</span>
    </div>
    <div className="json-node-children">
      <div className="json-leaf">
        <span className="json-map-dot ok"/>
        <span className="json-key">cedula</span>
        <span className="json-type-badge">string</span>
        <span className="json-val">"0912345678"</span>
      </div>
    </div>
  </div>
</div>
```

CSS: `.json-tree`, `.json-node`, `.json-node-head`, `.json-node-children`, `.json-leaf`, `.json-caret`, `.json-key`, `.json-type-badge`, `.json-val`, `.json-map-dot`, `.json-map-dot.ok/.warn/.none`.

### Agent Step Row

```jsx
<div className="agent-step-row done">
  <div className="agent-step-icon done">✓</div>
  <span>Parseando estructura JSON</span>
</div>
<div className="agent-step-row running">
  <div className="agent-step-icon running"><span className="spin"><Icon.refresh /></span></div>
  <span>Inferiendo tipos de dato</span>
</div>
```

---

## Tablas

### Data Table

```jsx
<table className="data-table">
  <thead>
    <tr>
      <th>Campo destino</th>
      <th>Tipo</th>
      <th>Estado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="td-mono">profile.personalInfo.nationalId</td>
      <td><span className="type-badge STR">STR</span></td>
      <td><span className="dot ok"/></td>
    </tr>
  </tbody>
</table>
```

CSS: `.data-table`, `.data-table thead th` (mono uppercase), `.data-table tbody td`, `.data-table tbody tr:hover`, `.td-mono`.

---

## Alertas y Feedback

### Alert

```jsx
<div className="alert ok">
  <div className="alert-icon"><span className="dot ok"/></div>
  <div className="alert-body">
    <div className="alert-title">Configuración publicada</div>
    <div className="alert-desc">La versión v1.4.0 está activa.</div>
  </div>
</div>
```

Variantes: `.alert.ok/.warn/.err/.info`. CSS: `.alert`, `.alert-icon`, `.alert-body`, `.alert-title`, `.alert-desc`.

### Save Indicator

```jsx
<div className="save-indicator saving"><span className="spin"><Icon.refresh /></span> Guardando…</div>
<div className="save-indicator saved">✓ Guardado</div>
<div className="save-indicator error">✕ Error al guardar</div>
```

CSS: `.save-indicator`, `.save-indicator.saving/.saved/.error`.

### Save Toast

```jsx
<div className="save-toast ok">✓ Guardado exitosamente</div>
<div className="save-toast err">✕ Error al guardar</div>
```

CSS: `.save-toast` — `position: fixed; bottom: 44px; left: 50%; transform: translateX(-50%)`. Auto-dismiss con setTimeout.

### Empty / Locked Surface

```jsx
<div className="surf-empty">
  <div className="ic-wrap locked"><Icon.flow /></div>
  <h2>Primero completá la ingesta</h2>
  <p>Descripción…</p>
  <div className="actions">
    <button className="btn primary lg">CTA <Icon.arrow /></button>
  </div>
  <div className="prereq">
    <div className="step done"><span className="bx">✓</span><span className="lb">Configuración</span></div>
    <div className="step now"><span className="bx">2</span><span className="lb">Ingesta</span><span className="go">empezá acá</span></div>
    <div className="step"><span className="bx">3</span><span className="lb">Editor</span></div>
  </div>
</div>
```

CSS: `.surf-empty`, `.ic-wrap`, `.ic-wrap.locked`, `.prereq`, `.prereq .step`, `.prereq .step.done/.now`.

---

## Paneles

### Policies Panel

```jsx
<div className="policies-panel">
  <div className="policies-ph"><div className="title">POLÍTICAS</div></div>
  <div className="policies-section">
    <div className="policies-section-head">Campo seleccionado</div>
    <div className="field-info-card">
      <div className="field-info-row"><span className="fk">Origen</span><span className="fv">cedula</span></div>
    </div>
    <div className="value-preview">"0912345678"</div>
    <div className="policy-options">
      <button className="policy-opt on">REQUIRED</button>
      <button className="policy-opt">SET_NULL</button>
    </div>
    <div className="policy-desc">Descripción de la política.</div>
  </div>
</div>
```

CSS: `.policies-panel`, `.policies-ph`, `.policies-empty`, `.policies-section`, `.policies-section-head`, `.field-info-card`, `.field-info-row`, `.fk/.fv`, `.value-preview`, `.policy-options`, `.policy-opt`, `.policy-opt.on`, `.policy-desc`.

### Tree Panel

```jsx
<div className={`tree-panel ${expanded ? "expanded" : "collapsed"}`}>
  <button className="tree-panel-toggle" onClick={togglePanel}>
    {expanded ? <Icon.chevronLeft /> : <Icon.chevronRight />}
  </button>
  {expanded && (
    <div className="tree-panel-inner">
      <div className="tree-panel-lbl">ESTRUCTURA JSON</div>
      <div className="json-tree">{/* JsonTree */}</div>
    </div>
  )}
</div>
```

CSS: `.tree-panel`, `.tree-panel.expanded` (220px), `.tree-panel.collapsed` (38px), `.tree-panel-toggle`, `.tree-panel-inner`, `.tree-panel-lbl`.

---

## Modales

### Destination Modal

```jsx
{/* Portal sobre document.body */}
<div className="modal-overlay" onClick={onClose}>
  <div className="destination-modal" onClick={e => e.stopPropagation()}>
    <div className="modal-hd">
      <span>Asignar destino canónico</span>
      <button className="modal-close" onClick={onClose}>✕</button>
    </div>
    <div className="modal-search">
      <div className="modal-search-box">
        <Icon.search /><input placeholder="Buscar path canónico…"/>
      </div>
    </div>
    <div className="modal-list">
      <div className="modal-group-head">profile <span className="modal-group-count">12</span></div>
      <div className="modal-path-item selected">
        <span className="path-text">profile.personalInfo.nationalId</span>
      </div>
      <div className="modal-path-item in-use">
        <span className="path-text">profile.personalInfo.email</span>
        <span className="in-use-badge">en uso</span>
      </div>
    </div>
    <div className="modal-ft">
      <span className="sel-path">{selectedPath}</span>
      <button className="btn sm ghost" onClick={onClose}>Cancelar</button>
      <button className="btn sm primary" onClick={handleConfirm}>Asignar</button>
    </div>
  </div>
</div>
```

CSS: `.modal-overlay`, `.destination-modal`, `.modal-hd`, `.modal-close`, `.modal-search`, `.modal-search-box`, `.modal-list`, `.modal-group-head`, `.modal-group-count`, `.modal-path-item`, `.modal-path-item.selected/.in-use`, `.path-text`, `.in-use-badge`, `.modal-ft`, `.sel-path`, `.no-sel`.

---

## Auth (exclusivos de route group `(auth)`)

| Componente | CSS | Descripción |
|---|---|---|
| AuthLayout | `.auth-root` | Flex row 100vh |
| AuthPanel | `.auth-panel` | 500px flex column |
| AuthArt | `.auth-art` | SVG animado dark |
| AuthBrand | `.auth-brand .mk` | Logo + wordmark |
| AuthForm | `.auth-form` | Columna gap 22px, max-width 360px |
| AuthCenter | `.auth-center` | Centrado, text-align center |
| AuthHead | `.auth-head` | H1 + párrafo |
| AuthIcon | `.auth-icon`, `.auth-icon.ok` | Ícono 58px decorativo |
| PasswordField | `.pw-wrap`, `.pw-eye` | Input con toggle |
| OTPInput | `.otp-row`, `.otp-box` | 6 boxes numéricos |
| AuthFooter | `.auth-footer` | © + email mono |
| BtnFill | `.btn-fill` | 44px primary auth |
| BtnOutline | `.btn-outline` | 44px outline auth |
| BtnGhostBack | `.btn-ghost-back` | Ghost con flecha |
| Divider | `.divider` | Separador "o" |
| AuthLink | `.auth-link` | Link inline accent |

---

## Shell

| Componente | CSS | Descripción |
|---|---|---|
| Shell | `.shell` | Grid 268px+1fr / 60px+1fr+34px |
| BrandCell | `.brandcell` | Logo + versión izquierda |
| Topbar | `.topbar` | Barra superior 60px |
| OrgSwitcher | `.topbar-org` | Selector de workspace |
| EnvPill | `.topbar-env` | Indicador de ambiente |
| ThemeToggle | `.theme-toggle` | Sun/moon |
| Sidebar | `.sidebar` | Panel izquierdo 268px |
| SidebarSection | `.sidebar-section` | Grupo de nav items |
| SidebarLabel | `.sidebar-label` | Label mono uppercase |
| SidebarFoot | `.sidebar-foot` | Avatar + usuario + settings |
| Main | `.main`, `.main-scroll` | Área de contenido |
| Statusbar | `.statusbar` | Barra inferior 34px |

---

## Patrones de superficie

### Surface Header

```jsx
<div className="surface-header">
  <div>
    <div className="crumbs">DATA TRANSLATION / EDITOR</div>
    <h1>Crédito Individual PTC</h1>
    <div className="sub">Descripción de la superficie.</div>
  </div>
  <div className="actions">
    <button className="btn primary">Guardar</button>
  </div>
</div>
```

CSS: `.surface-header`, `.crumbs`, `.surface-header h1`, `.sub`, `.actions` (margin-left: auto automático).

### Mapper Editor (3 paneles)

```
.mapper4-surface (flex column, height 100vh, overflow hidden)
  .mapper4-header   ← crumbs + título + save indicator
  .mapper4-toolbar  ← search + tabs + stats + actions
  .mapper4-body (flex row, flex:1, overflow hidden)
    .tree-panel      ← JSON tree colapsable (220px / 38px)
    .rules-list      ← MappingRows (flex:1, overflow-y auto)
    .policies-panel  ← Políticas campo seleccionado (310px)
```

### Ingesta Flow (2 fases)

```
fase "empty"  → .dt-drop-zone + .dt-sample-list + btn Simular
fase "loading" → spinner + progress
fase "parsed"  → 2 col: FileCard + JsonTree | AgentCard
fase "done"    → 2 col: FileCard + JsonTree | AgentCard (done) + ResultCard
```

---

## Componentes pendientes (ver Component Tracker)

| Componente | Prioridad | Notas |
|---|---|---|
| Dropdown Custom | Alta | Para filtros con opciones custom |
| Loading Skeleton | Media | Cuando se conecte API real |
| Tooltip | Media | Útil en mapper para paths largos |
| Slideout/Drawer | Baja | Settings, detalles extendidos |
| Date Picker | Baja | Filtros avanzados, audit |
| Multi-select | Baja | Filtrar por múltiples valores |
| Charts | Futura | Analytics dashboard |
| Command Menu | Futura | ⌘K global |
