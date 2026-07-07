# LAYOUTS.md — Patrones de Layout

Guía de referencia espacial del sistema. Define cómo se estructuran los diferentes tipos de pantalla, cómo se maneja el scroll, y cuándo usar cada patrón.

Leer junto con DESIGN.md (sistema técnico) y DESIGN_PROCESS.md (cuándo elegir cada tipo).

---

## El Shell: la estructura invariable

Todo el app dentro de `(app)/` usa el Shell. Sus dimensiones son absolutas y no se modifican bajo ninguna circunstancia.

```
┌──────────────────────────────────────────────────────────────────┐
│  .brandcell (268×60px)  │         .topbar (1fr × 60px)          │  ← 60px
├─────────────────────────┼──────────────────────────────────────────┤
│                         │                                          │
│  .sidebar               │         .main                           │  ← flex: 1
│  268px                  │         1fr                             │
│  overflow-y: auto       │         overflow-y: auto                │
│                         │         bg: var(--grid-bg), surface-0   │
├─────────────────────────┼──────────────────────────────────────────┤
│  (vacío)                │         .statusbar (1fr × 34px)         │  ← 34px
└─────────────────────────┴──────────────────────────────────────────┘
```

```css
.shell {
  display: grid;
  grid-template-columns: 268px 1fr;
  grid-template-rows: 60px 1fr 34px;
  height: 100vh;
  min-width: 1180px;
  overflow: hidden;
}
```

**Dimensiones invariables:**
- `268px` — sidebar + brandcell
- `60px` — topbar
- `34px` — statusbar
- `min-width: 1180px` — el app no fue diseñado para pantallas menores

**Sobre `.main`:**
- No tiene padding propio — cada superficie define su propio padding interno
- El grid background (`--grid-bg`) es decorativo: líneas de 1px cada 72px, opacidad 3%
- La mayoría de las superficies usan `.main-scroll` para el overflow

---

## Layout A — Surface estándar

**Pantallas existentes:** Overview, Proyectos, Resumen, Publicar

**Cuándo usarlo:** el usuario visualiza datos, navega entre ítems y ejecuta acciones. No hay contexto lateral persistente que requiera paneles fijos.

### Estructura base
```
.main
  .main-scroll (overflow-y: auto; height: 100%; padding: var(--pad-surface))
    .surface-header
      .crumbs
      h1
      .sub
      .actions
    [contenido de la superficie]
```

**Scroll:** único scroll region en `.main-scroll`. El surface-header NO es sticky — scrollea con el contenido.

### Variantes de contenido

**Grid de 4 columnas** — stat cards y métricas
```css
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: var(--gap-card);
```
Uso: fila superior del Overview con métricas globales.

**Grid de 2 columnas** — cards de gestión
```css
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: var(--gap-card);
```
Uso: project-cards, capacity-cards en Resumen, ítems de configuración comparables.

**Lista vertical** — ítems secuenciales
```css
display: flex;
flex-direction: column;
/* Rows separados por border-bottom: 1px solid var(--line) */
```
Uso: audit trail en Publicar, checklists, listas de reglas.

**Dos columnas asimétricas** — contenido + contexto
```css
display: grid;
grid-template-columns: 1fr 360px;
gap: var(--gap-card);
```
Uso: cuando hay un panel de contexto lateral que permanece visible mientras el usuario trabaja en el contenido principal.

### Anatomía del Overview (ejemplo completo)
```
.surface-header
  crumbs: "DATA TRANSLATION / OVERVIEW"
  h1: "Overview"
  sub: "Estado del módulo y acceso rápido a los proyectos activos."

row 1: grid 4 col
  StatCard × 4 (proyectos activos, cobertura promedio, publicados, en análisis)

row 2: grid 2 col
  Card (band de stats del proyecto activo)
  AgentCard (actividad del agente IA)

section header: "Proyectos recientes"
row 3: grid 2 col (o lista vertical)
  ProjectCard × n
```

### Anatomía de Proyectos (ejemplo completo)
```
.surface-header
  crumbs: "DATA TRANSLATION / PROYECTOS"
  h1: "Proyectos"
  sub: "..."
  actions: btn "Nuevo proyecto"

.search-bar + .tabs-bar (filtros: Todos, Publicados, Borrador, En análisis)

grid 2 col:
  ProjectCard × n
```

---

## Layout B — Mapper Editor (3 paneles)

**Pantallas existentes:** Solo el Mapper Editor (`/mapper`)

**Cuándo usarlo:** trabajo denso sobre una lista de ítems donde el usuario necesita contexto lateral (árbol JSON) y contexto de detalle (políticas) visibles simultáneamente.

### Estructura base
```
.mapper4-surface
  display: flex
  flex-direction: column
  height: 100%         ← toma el 100% del .main, no 100vh
  overflow: hidden     ← crítico: sin scroll del contenedor

  .mapper4-header      ← ~60px, fijo
    .crumbs
    título del mapper
    .save-indicator (idle | saving | saved | error)
    .mapper4-stats (n reglas, n match, n nomatch)

  .mapper4-toolbar     ← ~48px, fijo
    .search-bar
    .mapper4-tabs (Todas | Match perfecto | Sin coincidencia)
    actions (btn "Publicar", etc.)

  .mapper4-body        ← flex: 1, overflow: hidden, display: flex, flex-direction: row
    .tree-panel        ← 220px colapsado → 38px
    .rules-list        ← flex: 1, overflow-y: auto
    .policies-panel    ← 310px, fijo
```

**Por qué overflow: hidden en `.mapper4-surface`:** el mapper tiene 3 regiones de scroll independientes. Si el contenedor tuviese overflow, el layout colapsaría. El scroll queda delegado a cada panel.

### Tree panel
```css
.tree-panel.expanded  { width: 220px; }
.tree-panel.collapsed { width: 38px; }
transition: width 0.2s;
```
Contiene `.json-tree` con los nodos del JSON del cliente.
Al colapsar: solo el botón toggle es visible, el árbol se oculta con `overflow: hidden`.

### Rules list
```css
flex: 1;
overflow-y: auto;
```
Contiene las secciones `.section4-head` (matched | nomatch) y los `.mrow4` dentro.
Los `.mrow4` se renderizan con `animation: m-fade-up 0.22s` al aparecer.

### Policies panel
```css
width: 310px;
flex-shrink: 0;
overflow-y: auto;
```
Muestra el detalle del campo seleccionado en `.rules-list`.
Si ningún campo está seleccionado: `.policies-empty` (estado vacío del panel).

### Animación de filas
```css
.mrow4 { animation: m-fade-up 0.22s cubic-bezier(.2,.7,.3,1) both; }
```
Cada fila "aparece" de abajo hacia arriba al renderearse. Crea sensación de construcción progresiva.

---

## Layout C — Wizard / Ingesta

**Pantallas existentes:** Upload ConfigStep + IngestaStep (`/upload`)

**Cuándo usarlo:** flujos con secuencia lineal de pasos donde el usuario NO puede saltear etapas.

**Diferencia clave con Layout A:** el sidebar del Shell incluye un DtStepper que indica el paso actual. El DtStepper es parte del sidebar normal — no requiere estructura especial en el main.

### Sidebar con DtStepper
```
.sidebar
  [nav items normales]
  ---
  .dt-stepper
    .dt-step.done    → nodo: bg ok, ✓, label "Configuración"
    .dt-step.active  → nodo: borde accent, dot, label "Ingesta"
    .dt-step.locked  → nodo: bg surface-3, label "Editor" (cursor: not-allowed)
```

### Surface main (varía por paso)
```
.surface-header (ajusta crumbs y título según el paso)

Paso 1 — ConfigStep:
  .surface-body
    form (max-width: 560px)
      .form-field × n
      .mapper-id-preview
    .actions (right-aligned)
      btn ghost "Cancelar"
      btn primary "Continuar →"

Paso 2 — IngestaStep — tiene 3 fases internas:
  [fase: empty]
    .dt-drop-zone (dashed, centrado)
    .dt-sample-list
    btn "Simular ingesta"

  [fase: loading]
    spinner + pbar
    texto de estado del agente

  [fase: parsed]
    grid 2 col:
      col izq: .file-card + .json-tree
      col der: .agent-card (pasos animados del agente)
    footer: btn primary "Continuar al editor →"
```

### Transición entre fases
Las fases del IngestaStep se manejan con estado local (React `useState`). La transición es `m-fade-up 0.3s` para la fase nueva que entra.

---

## Layout D — Surface narrativa

**Pantallas existentes:** Explainer (`/explainer`), Tour guiado (`/tour`)

**Cuándo usarlo:** el usuario viene a entender algo, no a ejecutar algo. No hay CTA primario de negocio — la acción es navegar entre contenido.

Estos layouts tienen su propio sistema interno y no siguen el patrón de surface-header estándar.

### Explainer — 5 stages
```
.xpl-root (flex column, height: 100%)
  .xpl-header
    logo + título
    barra de progreso visual de stages (5 dots o segmentos)

  .xpl-body (flex: 1, overflow: hidden)
    .xpl-stage-list (flex row, sin scroll visible)
      .xpl-stage × 5
      Cada stage tiene su propio layout interno (ilustración + texto + detalle)

  .xpl-footer
    btn ghost "← Anterior"
    btn primary "Siguiente →"
    indicador de stage actual
```

La navegación entre stages usa JS para mover el `transform: translateX` del `.xpl-stage-list`. Sin scroll visible del usuario.

### Tour guiado — 5 steps
```
.tour-root
  .tour-header (progreso + título del step)
  .tour-content (varía por step — cada step tiene su propio layout simulado)
    .demo-intro     → step 0: pantalla de bienvenida
    .demo-upload    → step 1: simulación de upload
    .demo-mapper    → step 2: simulación del mapper
    .demo-summary   → step 3: simulación del resumen
    .demo-publish   → step 4: simulación del publicar
  .tour-footer
    btn "Anterior" / btn "Siguiente"
```

Cada `.demo-*` es una simulación no interactiva de la pantalla correspondiente, con datos mockeados y algunos elementos animados para ilustrar el flujo.

**No extender estos layouts para otras pantallas sin diseño explícito.**

---

## Layout E — Auth (sin Shell)

**Pantallas existentes:** Login, Registro, Olvidé contraseña, Revisar email, Ingresar código, Email verificado, 2FA

**Cuándo usarlo:** cualquier pantalla de `(auth)/`. No usa Shell.

### Estructura base
```
.auth-root (display: flex; height: 100vh; overflow: hidden)
  
  .auth-panel (width: 500px; flex-shrink: 0)
    display: flex
    flex-direction: column
    padding: 40px
    overflow-y: auto

    .auth-brand (logo + wordmark)

    .auth-form (max-width: 360px; margin: auto; flex: 1; justify-content: center)
      .auth-head
        h1 (display, 28px)
        p (sans, 15px, ink-3)
      [form fields]
      .btn-fill o .btn-outline
      .divider [opcional]
      [link o nota secundaria]

    .auth-footer (mt-auto)
      © copyright + email support (mono, 11px, ink-4)

  .auth-art (flex: 1)
    SVG animado decorativo — dark background con patrones del Canónico
```

### Variantes de pantalla en auth
- **Pantallas con formulario:** `.auth-form` con `.form-field` + `.btn-fill`
- **Pantallas centradas (OTP, email enviado, verificado):** `.auth-center` + `.auth-icon` + texto + acción
- **Pantalla de OTP:** `.otp-row` con 6 `.otp-box` de 52×58px
- **Volver:** `.btn-ghost-back` con flecha izquierda alineado arriba izq del `.auth-form`

**Reglas del layout auth:**
- `.auth-panel` tiene ancho fijo 500px — no flexible
- Los componentes de auth NO se usan en `(app)/` — son exclusivos de auth
- El H1 en auth es 28px (1px más que el in-app 27px — la pantalla es más centrada)
- No usar componentes del Shell dentro de auth (sidebar, topbar, statusbar)

---

## Layout F — Empty / Locked Surface

**Cuándo usarlo:** cuando una superficie no tiene datos todavía o está bloqueada por prerequisitos no completados.

```
.surf-empty
  display: flex
  flex-direction: column
  align-items: center
  text-align: center
  padding: 80px var(--pad-surface)
  
  .ic-wrap [o .ic-wrap.locked]
    width: 56px; height: 56px; border-radius: var(--r-xl)
    bg: var(--accent-soft)  [empty] o var(--surface-3)  [locked]
    display: flex; align-items: center; justify-content: center

  h2 (display, 20px, ink-2)

  p (sans, 15px, ink-3; max-width: 480px; line-height: 1.6)

  .actions (mt: 24px)
    .btn.primary.lg → texto + ícono arrow

  .prereq [opcional]
    .step.done × n
    .step.now × 1
    .step × m (pendientes)
```

### El prereq
Muestra siempre todos los pasos del flujo, marcando el estado de cada uno. Esto orienta al usuario sobre dónde está y qué falta.

```jsx
<div className="prereq">
  <div className="step done">
    <span className="bx">✓</span>
    <span className="lb">Configuración</span>
  </div>
  <div className="step now">
    <span className="bx">2</span>
    <span className="lb">Ingesta</span>
    <span className="go">empieza aquí</span>
  </div>
  <div className="step">
    <span className="bx">3</span>
    <span className="lb">Editor</span>
  </div>
</div>
```

---

## Patrones de scroll

| Tipo de superficie | Scroll |
|---|---|
| Layout A (estándar) | Scroll único en `.main-scroll` |
| Layout B (mapper) | Sin scroll en contenedor. Cada panel tiene su propio `overflow-y: auto` |
| Layout C (wizard) | Scroll único en `.main-scroll`, el formulario scrollea normalmente |
| Layout D (narrativa) | Sin scroll del usuario. Navegación via JS (translateX o show/hide) |
| Layout E (auth) | `.auth-panel` tiene `overflow-y: auto` para pantallas altas en viewports pequeños |
| Layout F (empty) | Sin scroll — el empty state entra en el viewport sin scroll |

---

## Consistencia de padding

| Contexto | Padding |
|---|---|
| Surface body (el contenido principal) | `var(--pad-surface)` = 40px × `--space` |
| Mapper header (horizontal) | `var(--pad-surface)` horizontal, 12px vertical |
| Cards internas | 16px–20px todos los lados |
| Sidebar items | 9px vertical, 11px horizontal |
| Rows de lista | 8px–10px vertical, 12px–16px horizontal |
| Chips / tags | 3px vertical, 9px horizontal |
| Type badges | 2px vertical, 7px horizontal |
| Botones 40px | 0 vertical, 16px horizontal |
| Botones 32px (sm) | 0 vertical, 12px horizontal |

---

## Espaciado entre secciones

Entre el surface-header y el primer bloque de contenido: el padding de `.main-scroll` lo maneja automáticamente.

Entre secciones dentro del contenido principal:
```css
/* Separador con borde */
border-top: 1px solid var(--line);
padding-top: var(--gap-card);
margin-top: var(--gap-card);

/* O gap en el flex/grid container */
gap: var(--gap-card);
```

No usar `<hr>`. El separador visual se logra con `border-top` en el elemento que abre la nueva sección.

---

## min-width y pantallas soportadas

```
min-width: 1180px  → el Shell no funciona por debajo de esto
Mínimo recomendado: 1280px × 800px
Óptimo: 1440px × 900px o más
Ideal para mapper: 1600px+
```

No implementar media queries responsivos para `(app)/`. El implementador técnico trabaja en desktop.

Para `(auth)/`: las pantallas de auth pueden funcionar en viewports más angostos, pero el `.auth-art` simplemente se reduce. No hay breakpoints críticos definidos — el layout se adapta porque es flex.

---

## Altura de filas y elementos interactivos

| Elemento | Altura |
|---|---|
| `.btn` (default) | 40px |
| `.btn.sm` | 32px |
| `.btn.lg` | 50px |
| `.btn-fill` (auth) | 44px |
| `.form-input` | 42px |
| `.sidebar-item` | ~38px (9px padding vertical) |
| `.mrow4` | ~40px (8px padding vertical) |
| `.topbar` | 60px (fija) |
| `.statusbar` | 34px (fija) |
| `.mapper4-header` | ~60px |
| `.mapper4-toolbar` | ~48px |

Estos valores garantizan targets interactivos accesibles y densidad consistente entre pantallas.
