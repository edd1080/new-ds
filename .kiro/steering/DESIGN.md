# DESIGN.md — Lenguaje Visual de Bowpi Enterprise

Guía completa del sistema de diseño. Leer antes de implementar cualquier elemento visual.
La fuente de verdad implementada está en `src/styles/base.css`.

---

## Filosofía visual

Bowpi Enterprise es una herramienta B2B para implementadores bancarios. El diseño equilibra:

- **Densidad de información** sin sacrificar legibilidad
- **Precisión técnica** (paths, IDs, código) sin frialdad corporativa
- **Feedback inmediato** — el usuario siempre sabe dónde está y qué pasó
- **Confianza** — sin gradientes agresivos, sin decoración vacía

El resultado es un producto que se siente profesional, rápido y confiable. No moderno por la moda — funcional por diseño.

---

## Sistema de color

### Arquitectura de temas

El tema se controla con `data-theme` y `data-accent` en el elemento `<html>`:

```html
<html data-theme="light" data-accent="cyan">
```

Dos dimensiones independientes:
- **Tema:** `light` (default) | `dark` (Void)
- **Acento:** `cyan` (default) | otros disponibles vía Tweaks para prototipos

En producción, Bowpi Enterprise usa `light + cyan` como configuración base.

### Superficies (light + cyan)

Las superficies siguen una escala numérica — un número mayor significa más elevación/contraste:

```
--surface-0: #f2fafb   app background (la capa más baja)
--surface-1: #ffffff   cards, panels, inputs (el blanco base)
--surface-2: #f7fcfd   fondos elevados, table headers
--surface-3: #e7f3f5   hover states, inset areas
--surface-4: #d8eaed   pressed states, wells profundos
```

### Bordes

```
--line:        #e3eef0   borde estándar
--line-2:      #d4e2e4   borde más fuerte (inputs, separadores)
--line-strong: #bdd1d4   borde enfatizado (hover, focus)
```

### Tipografía

```
--ink-1: #1c1a17   texto primario
--ink-2: #4d4a43   texto secundario
--ink-3: #7a766c   labels, tertiary
--ink-4: #a7a298   meta, faint text
--ink-5: #c9c4b8   placeholder, disabled
```

### Acento (cyan)

El acento se usa como señal, no como decoración. Aparece en:
- Elemento activo/seleccionado
- Botones primarios de acción
- Focus rings
- Indicadores de estado en progreso
- Bordes de inputs con focus

```
--accent:      #04D3EA   acento principal (legible sobre light)
--accent-2:    #0BB7CC   acento secundario / hover
--accent-soft: #e2fbff   fondo tinted (chips, badges, bg activo)
--accent-line: #a4ecf5   borde accent
--accent-ink:  #097e92   texto sobre fondo accent-soft
```

**Regla crítica para botones primarios con cyan:**
El botón primary en `data-accent="cyan"` usa `color: #00282e` (texto muy oscuro sobre el cyan brillante).
Esta excepción está documentada en base.css. No cambiarla.

### Colores semánticos

```
ok:   #27D778  verde — éxito, listo, publicado
warn: #D99733  ámbar — advertencia, cobertura parcial
err:  #D0514A  rojo — error, blocker, crítico
info: #2f6f9e  azul — información neutral
```

Cada uno tiene variantes `-soft` (fondo) y `-line` (borde).

### Dark mode (Void)

Activar con `data-theme="dark"`. Los tokens se sobreescriben via CSS `[data-theme="dark"]`.
El dark mode usa fondos warm near-black (no negro puro) con el mismo acento.

---

## Sistema tipográfico

### Tres familias, tres roles

| Familia | Variable | Uso |
|---|---|---|
| DM Sans | `--font-sans` | Cuerpo de texto, labels, botones, descripciones |
| Space Grotesk | `--font-display` | H1, H2, H3, métricas numéricas grandes, nombres de proyectos |
| JetBrains Mono | `--font-mono` | Paths canónicos, IDs, código, chips de estado técnicos, statusbar |

### Escala tipográfica en uso

```
10px  — statusbar, labels mono uppercase, contadores mini
11px  — meta técnico (crumbs, labels de sección sidebar)
12px  — metadata de cards, descripciones secundarias
13px  — labels de formulario, acciones secundarias
13.5px — textos de nav, links secundarios
14px  — texto de cuerpo compacto
15px  — texto base del app (--base-font default)
16px  — texto base generoso
17px  — subtítulos de sección
18px  — títulos de mapper header
24px  — valores de métricas
26px  — OTP input
27px  — H1 surface header
```

### Peso tipográfico

```
400 — cuerpo de texto, descripciones
500 — emphasis sutil
550 — labels, nav items activos (DM Sans semi-bold)
600 — títulos H1-H3, botones, nombres de proyectos
700 — métricas grandes, números de display
```

### Letterspacing

- Headings: `-0.02em` a `-0.03em` (tight, característico de Space Grotesk)
- Mono labels uppercase: `0.07em` a `0.12em` (open, para legibilidad en small caps)
- Cuerpo: `normal`

### `font-variant-numeric: tabular-nums`

Aplicar en: métricas, contadores, porcentajes, cualquier número que se actualice.
Space Grotesk tiene numerales tabulares nativos.

---

## Espaciado y densidad

El sistema usa un multiplicador `--space` (default: `1`) que escala todo el espaciado:

```css
--pad-surface: calc(40px * var(--space))   /* padding interno de superficies */
--gap-card: calc(20px * var(--space))      /* gap entre cards */
```

Densidades disponibles vía Tweaks:
- `compacto`: `--space: 0.82`
- `cómodo`: `--space: 1.0`
- `generoso`: `--space: 1.18` (default)

En producción, no exponer el control de densidad al usuario final — definir uno fijo.

---

## Sistema de radios

Cinco niveles escalables + pill:

```
--r-xs: 5px    micro elements (type badges, small chips)
--r-sm: 8px    inputs, buttons standard, small cards
--r-md: 12px   cards estándar, modales
--r-lg: 16px   auth icon, large cards
--r-xl: 22px   empty state icons, large modales
--r-pill: 100px   chips, tags, status pills
```

Los radios también escalan con el tweak `--radius` (`recto` | `suave` | `redondo`).
En producción, fijar en `suave` (el default).

---

## Elevación y sombras

```
--shadow-sm:  0 1px 2px rgba(28,26,23,0.05)   cards en reposo
--shadow-md:  0 2px 10px + 0 10px 28px        cards hover, dropdowns
--shadow-lg:  0 6px 22px + 0 30px 60px        modales, popovers
--shadow-pop: 0 0 0 1px var(--line-2) + shadow-md   elementos flotantes
```

Regla de uso:
- Sin sombra: elementos en la misma superficie (list items, table rows)
- `shadow-sm`: cards, inputs en reposo
- `shadow-md`: hover states, elementos elevados
- `shadow-lg`: modales, toasts, dialogs

---

## Animaciones y motion

### Keyframes disponibles (base.css)

```
m-fade-up    from opacity:0 translateY(10px) → normal — entrada de rows/cards
m-fade       from opacity:0 → normal — overlays, fade ins
m-scale-in   from opacity:0 scale(0.96) → normal — modales, dialogs
m-pulse      0/100 opacity:0.35 → 50 opacity:1 — dots animados (estado "run")
m-spin       rotate(360deg) — loading spinner
m-flow       stroke-dashoffset — líneas animadas decorativas
m-blink      50% opacity:0.2 — cursor blink
m-bob        translateY -6px — hover de íconos decorativos
```

### Clases de animación

```css
.spin  { animation: m-spin 0.9s linear infinite; }   /* spinner de carga */
.blink { animation: m-blink 1.2s steps(2) infinite; } /* cursor */
.rise  { animation: m-fade-up 0.4s cubic-bezier(.2,.7,.3,1) both; } /* reveal */
```

### Principios de motion

- Las animaciones de entrada son rápidas (150-300ms) — no deben sentirse lentas
- Los `MappingRow` se animan con `m-fade-up 0.22s` al aparecer
- Los modales usan `m-scale-in 0.18s` — entrada suave sin exageración
- Los dots de estado `run` usan `m-pulse` — respiran lentamente (1.4s)
- `prefers-reduced-motion`: gating de animaciones no críticas

---

## Layout del Shell

```
┌──────────┬──────────────────────────────────────────┐  ← 60px topbar
│ brandcell│           topbar                          │
├──────────┼──────────────────────────────────────────┤
│          │                                          │
│ sidebar  │           main                           │  ← flex: 1
│ 268px    │           (surface content)              │
│          │                                          │
├──────────┼──────────────────────────────────────────┤  ← 34px statusbar
│          │           statusbar                      │
└──────────┴──────────────────────────────────────────┘
```

```css
.shell {
  display: grid;
  grid-template-columns: 268px 1fr;
  grid-template-rows: 60px 1fr 34px;
  height: 100vh;
  min-width: 1180px;
}
```

**Nunca modificar estas dimensiones.** Son el sistema nervioso del app.

### Grid background

El `main` area tiene un grid background sutil:
```css
background: var(--grid-bg), var(--surface-0);
```
El grid son líneas de 1px separadas 72px, opacidad 3-5%. Es decorativo y sutil — casi invisible.

---

## Patrones de superficie

Cada pantalla sigue la misma estructura base:

```
surface-header
  crumbs (mono uppercase, 11px, ink-4)
  h1 (display, 27px, weight 600)
  sub (15px, ink-3, max-width 720px)
  actions (buttons, margin-left auto)

[surface content]
  padding: var(--pad-surface) en todos los lados
```

---

## Patrones de estado

### Estados de un elemento interactivo

```
reposo    → border: var(--line-2), background: var(--surface-1)
hover     → border: var(--line-strong), shadow: var(--shadow-sm)
focus     → border: var(--accent-line), shadow: 0 0 0 3px var(--accent-soft)
active    → border: var(--accent), background: var(--accent-soft)
disabled  → opacity: 0.42, cursor: not-allowed
```

### Estados semánticos de contenido

```
ok    → color: var(--ok),   bg: var(--ok-soft),   border: var(--ok-line)
warn  → color: var(--warn), bg: var(--warn-soft), border: var(--warn-line)
err   → color: var(--err),  bg: var(--err-soft),  border: var(--err-line)
info  → color: var(--info), bg: var(--info-soft), border: var(--info-line)
```

---

## Patrones de tipografía en componentes

### Mono uppercase labels

Usados en: crumbs de navegación, section labels del sidebar, encabezados de card, statusbar.

```css
font-family: var(--font-mono);
font-size: 10px–11px;
letter-spacing: 0.07em–0.12em;
text-transform: uppercase;
color: var(--ink-4);
```

### Código/paths inline

Cualquier path canónico, mapperId, o valor técnico:

```css
font-family: var(--font-mono);
font-size: 11px–13px;
color: var(--accent-ink);   /* sobre fondo claro */
/* o */
color: var(--accent-2);     /* en dark mode */
```

### Métricas y números grandes

```css
font-family: var(--font-display);
font-variant-numeric: tabular-nums;
font-size: 22px–36px;
font-weight: 700;
```

---

## Densidad de información

### Altura de rows interactivos

```
.btn          → 40px
.btn.sm       → 32px
.btn.lg       → 50px
.btn-fill     → 44px  (auth only)
.form-input   → 42px
.sidebar-item → auto (~38px con padding 9px)
.mrow4        → auto (~38px con padding 8px)
.topbar       → 60px fija
.statusbar    → 34px fija
```

### Padding de componentes

```
cards:          padding 18px–20px
surface:        padding var(--pad-surface) = 40px * --space
mapper header:  padding 12px var(--pad-surface)
sidebar items:  padding 9px 11px
chips/tags:     padding 3px 9px
type badges:    padding 2px 7px
```

---

## Qué NO hacer

```
❌ Usar gradientes en fondos de componentes (auth art es la única excepción intencional)
❌ Usar más de 2 fuentes
❌ Usar colores que no sean del token system
❌ Agregar sombras grandes a elementos inline o rows
❌ Usar `border-radius: 50%` en contenedores rectangulares
❌ Animar colores — solo transform y opacity
❌ Usar íconos decorativos sin propósito semántico
❌ Centrar texto en componentes de lista/tabla
❌ Usar negrita (700) en cuerpo de texto
❌ Usar `line-height` menor a 1.45 en texto de más de 1 línea
```
