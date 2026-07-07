# TOKENS.md — Referencia de Tokens CSS

Todos los custom properties del design system de Bowpi Enterprise.
Archivo fuente: `src/styles/base.css`

Antes de usar cualquier `var(--*)`, verificar que existe aquí.
Nunca inventar nombres de tokens.

---

## Superficies — Light (default con `data-accent="cyan"`)

```css
--surface-0: #f2fafb    /* fondo del app — la capa más baja */
--surface-1: #ffffff    /* cards, panels, inputs — el blanco base */
--surface-2: #f7fcfd    /* fondos elevados, table headers */
--surface-3: #e7f3f5    /* hover states, inset areas */
--surface-4: #d8eaed    /* pressed states, wells */
```

## Bordes — Light

```css
--line:        #e3eef0    /* borde estándar (el más sutil) */
--line-2:      #d4e2e4    /* borde fuerte (inputs, separadores) */
--line-strong: #bdd1d4    /* borde enfatizado (hover, active) */
```

## Tipografía — Light

```css
--ink-1: #1c1a17    /* texto primario */
--ink-2: #4d4a43    /* texto secundario */
--ink-3: #7a766c    /* labels, tertiary */
--ink-4: #a7a298    /* meta, faint, timestamp */
--ink-5: #c9c4b8    /* placeholder, disabled */
```

## Acento — Cyan (default)

```css
--accent:      #04D3EA    /* acento principal — legible sobre superficies light */
--accent-2:    #0BB7CC    /* acento hover / secundario */
--accent-soft: #e2fbff    /* fondo tinted — chips, badges seleccionados, bg active */
--accent-line: #a4ecf5    /* borde accent */
--accent-ink:  #097e92    /* texto sobre fondo accent-soft */
/* --accent-glow: rgba(4,211,234,0.25)  — glow para sombras especiales */
```

**Nota:** en `data-theme="dark"` + `data-accent="cyan"`, `--accent` cambia a `#04D3EA` (mismo valor, más brillante en contexto oscuro).

## Colores semánticos

```css
/* OK — verde */
--ok:        #27D778
--ok-soft:   #D1FFE6    /* fondo */
--ok-line:   #7AD1A2    /* borde */

/* WARN — ámbar */
--warn:      #D99733
--warn-soft: #FFE8C7
--warn-line: #F8C579

/* ERR — rojo */
--err:       #D0514A
--err-soft:  #FFE7E7
--err-line:  #FFC0C0

/* INFO — azul */
--info:      #2f6f9e
--info-soft: #e9f1f8
--info-line: #c2d8e8
```

---

## Superficies — Dark ("Void")

Activar con `data-theme="dark"` en `<html>`.

```css
--surface-0: #0c0b0a
--surface-1: #141312
--surface-2: #1a1917
--surface-3: #211f1d
--surface-4: #2a2826

--line:        #232120
--line-2:      #2f2d2b
--line-strong: #423f3c

--ink-1: #f6f3ec
--ink-2: #c0bbb0
--ink-3: #8b857a
--ink-4: #5d584f
--ink-5: #3a3733

--accent:      #04D3EA
--accent-2:    #5cf6ff
--accent-soft: #06343b
--accent-line: #0e5965
--accent-ink:  #5cf6ff

--ok:   #27D778    --ok-soft:   #16241c    --ok-line:   #2d4a39
--warn: #D99733    --warn-soft: #271f10    --warn-line: #4a3d1f
--err:  #D0514A    --err-soft:  #271612    --err-line:  #4a2823
--info: #74b3df    --info-soft: #111f29    --info-line: #234152
```

## Dark + Cyan

```css
/* [data-theme="dark"][data-accent="cyan"] */
--accent:      #04D3EA    /* cyan principal — mismo valor, más brillante en dark */
--accent-2:    #5cf6ff
--accent-soft: #06343b
--accent-line: #0e5965
--accent-ink:  #5cf6ff
```

---

## Tipografía

```css
--font-sans:    "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif
--font-display: "Space Grotesk", "DM Sans", sans-serif
--font-mono:    "JetBrains Mono", "SF Mono", Menlo, monospace
```

---

## Escala y radio

```css
--r-xs:   5px      /* type badges, micro elements */
--r-sm:   8px      /* inputs, buttons, small cards */
--r-md:   12px     /* cards estándar, modales */
--r-lg:   16px     /* auth icon, large cards */
--r-xl:   22px     /* empty state icons */
--r-pill: 100px    /* chips, tags, status pills, search bars */
```

Los radios escalan con `--radius` tweak:
```css
/* recto:   multiplier 0.4 */
/* suave:   multiplier 1   (default) */
/* redondo: multiplier 1.5 */
```

---

## Espaciado

```css
--base-font:    15.5px      /* tamaño base del body */
--space:        1           /* density multiplier (0.82 | 1 | 1.18) */
--grid-size:    72px        /* tamaño de la grilla de fondo */
--pad-surface:  calc(40px * var(--space))   /* padding interno de superficies */
--gap-card:     calc(20px * var(--space))   /* gap entre cards en grids */
```

---

## Sombras

```css
--shadow-sm:  0 1px 2px rgba(28,26,23,0.05), 0 1px 1px rgba(28,26,23,0.03)
--shadow-md:  0 2px 10px -2px rgba(28,26,23,0.08), 0 10px 28px -14px rgba(28,26,23,0.14)
--shadow-lg:  0 6px 22px -6px rgba(28,26,23,0.10), 0 30px 60px -24px rgba(28,26,23,0.22)
--shadow-pop: 0 0 0 1px var(--line-2), var(--shadow-md)
```

En dark mode las sombras son más opacas (rgba(0,0,0,0.4–0.7)).

---

## Grid background

```css
--grid-bg:
  linear-gradient(to right, #00b8cc08 1px, transparent 1px) 0 0 / var(--grid-size) var(--grid-size),
  linear-gradient(to bottom, #00b8cc08 1px, transparent 1px) 0 0 / var(--grid-size) var(--grid-size);
```

Usado en `.main` como fondo decorativo. Muy sutil (opacidad 3%).

---

## Tokens exclusivos de Auth (`src/styles/auth.css`)

```css
--accent-fi:    #00282e    /* texto sobre botón cyan (muy oscuro) */
--shadow-focus: 0 0 0 4px var(--accent-soft)   /* focus ring inputs auth */
```

---

## Acentos alternativos (disponibles vía Tweaks, no en producción)

```css
/* Ámbar */
--accent: #b8791f    --accent-2: #cf9038

/* Índigo */
--accent: #4f5bd5    --accent-2: #6470e0

/* Pino */
--accent: #2f7d57    --accent-2: #3a9469
```

En producción usar solo cyan. Los demás son para exploración en prototipos.

---

## Cheatsheet: colores más usados

| Uso | Token |
|---|---|
| Fondo del app | `var(--surface-0)` |
| Fondo de cards | `var(--surface-1)` |
| Fondo hover | `var(--surface-3)` |
| Texto principal | `var(--ink-1)` |
| Texto secundario | `var(--ink-3)` |
| Texto meta/faint | `var(--ink-4)` |
| Borde estándar | `var(--line)` |
| Borde input | `var(--line-2)` |
| Acento principal | `var(--accent)` |
| Fondo acento | `var(--accent-soft)` |
| Texto sobre acento-soft | `var(--accent-ink)` |
| Estado ok | `var(--ok)` |
| Estado warning | `var(--warn)` |
| Estado error | `var(--err)` |
| Fondo ok | `var(--ok-soft)` |
| Borde ok | `var(--ok-line)` |

---

## Guía de uso por contexto

### Inputs en reposo
```css
border: 1px solid var(--line-2);
background: var(--surface-1);
color: var(--ink-1);
```

### Inputs en focus
```css
border-color: var(--accent-line);
box-shadow: 0 0 0 3px var(--accent-soft);
```

### Cards en reposo
```css
background: var(--surface-1);
border: 1px solid var(--line);
```

### Cards en hover
```css
border-color: var(--accent-line);
box-shadow: var(--shadow-sm);
```

### Elemento activo/seleccionado
```css
background: var(--accent-soft);
border-color: var(--accent);
color: var(--accent-ink);
```

### Texto técnico (paths, IDs)
```css
font-family: var(--font-mono);
color: var(--accent-ink);    /* sobre fondo claro */
/* o */
color: var(--accent-2);      /* en dark mode */
```

### Labels de sección
```css
font-family: var(--font-mono);
font-size: 10px–11px;
letter-spacing: 0.08em–0.12em;
text-transform: uppercase;
color: var(--ink-4);
```
