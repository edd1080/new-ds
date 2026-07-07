# STATES.md — Estados de Interacción

Referencia exhaustiva de todos los estados visuales del sistema.
El agente debe usar esta guía para implementar cada estado sin improvisar.

---

## Estados base (aplicables a cualquier elemento interactivo)

```
reposo    → border: 1px solid var(--line-2)
             background: var(--surface-1)
             color: var(--ink-1) o var(--ink-2)

hover     → border-color: var(--line-strong)
             box-shadow: var(--shadow-sm)
             transition: border-color .14s, box-shadow .14s

focus     → border-color: var(--accent-line)
             box-shadow: 0 0 0 3px var(--accent-soft)
             outline: none

active    → background: var(--accent-soft)
             border-color: var(--accent)
             color: var(--accent-ink)

disabled  → opacity: 0.42
             cursor: not-allowed
             pointer-events: none
```

---

## Botones

### btn (default)
```
reposo    → bg surface-1, border line-2, color ink-1
hover     → bg surface-2, border line-strong
active    → bg surface-3
disabled  → opacity 0.42, cursor not-allowed
```

### btn.primary (con data-accent="cyan")
```
reposo    → bg var(--accent) (#04D3EA), color #00282e, border transparent
hover     → bg var(--accent-2) (#0BB7CC)
active    → bg var(--accent) (más saturado)
disabled  → opacity 0.42
```

> El color del texto (#00282e) es oscuro sobre cyan porque el cyan es muy brillante.
> No cambiar a blanco — el contraste no alcanza.

### btn.ghost
```
reposo    → bg transparent, border transparent, color ink-2
hover     → bg surface-3, color ink-1
active    → bg surface-4
```

### iconbtn
```
reposo    → bg transparent, color ink-3
hover     → bg surface-3, color ink-1
active    → bg surface-4
```

---

## Inputs y formularios

### form-input (reposo → focus → error → disabled)
```
reposo    → border: 1px solid var(--line-2), bg surface-1, color ink-1
focus     → border-color: var(--accent), box-shadow: 0 0 0 3px var(--accent-soft)
             El borde cambia a accent (no accent-line) — más visible
error     → border-color: var(--err-line), bg err-soft
             box-shadow: 0 0 0 3px var(--err-soft) en focus
disabled  → opacity 0.42, cursor not-allowed, bg surface-2
placeholder → color: var(--ink-5)
```

### toggle
```
off/reposo  → bg surface-3, thumb: bg white con shadow-sm
on          → bg var(--accent), thumb: bg white
hover off   → bg surface-4
hover on    → bg var(--accent-2)
disabled    → opacity 0.42
transition  → background .2s, transform .2s
```

### checkbox
```
unchecked   → border: 1.5px solid var(--line-2), bg surface-1
checked     → bg var(--accent), border-color transparent, svg check color #00282e
hover       → border-color var(--line-strong) (unchecked)
             bg var(--accent-2) (checked)
disabled    → opacity 0.42
```

### radio
```
unchecked   → border: 1.5px solid var(--line-2), bg surface-1
checked     → dot 8px bg var(--accent) centrado, border-color var(--accent-line)
hover       → border-color var(--accent-line) (unchecked)
disabled    → opacity 0.42
```

### search-bar (container)
```
reposo      → border: 1px solid var(--line-2), bg surface-1
focus-within → border-color: var(--accent-line), box-shadow: 0 0 0 3px var(--accent-soft)
```

---

## Navegación

### sidebar-item
```
reposo    → bg transparent, color ink-2
hover     → bg surface-3, color ink-1
active    → border-left: 3px solid var(--accent), bg var(--accent-soft), color var(--accent-ink)
             El borde izquierdo es la señal principal de estado activo
```

### tab-ul (underline)
```
inactive  → color ink-3, border-bottom: 2px solid transparent
hover     → color ink-1
active    → color accent-ink, border-bottom: 2px solid var(--accent)
```

### mapper4-tab (segmented)
```
inactive  → bg transparent, color ink-3
hover     → color ink-1
active    → bg surface-1, color ink-1, box-shadow: var(--shadow-sm), border-radius var(--r-sm)
```

### dt-step (sidebar stepper)
```
locked    → node: bg surface-3, border line-2, color ink-5, cursor not-allowed
active    → node: border 2px accent, color accent-ink, bg accent-soft
done      → node: bg ok, color white, checkmark ✓
```

### upload-stepper-step
```
pending   → node: bg surface-3, color ink-4
active    → node: border 2px accent, bg accent-soft, color accent-ink + glow
done      → node: bg ok, color white, checkmark ✓
seg.done  → bg ok (segmento conector verde)
```

---

## Cards

### card (base)
```
reposo    → bg surface-1, border: 1px solid var(--line), shadow-sm
hover     → border-color: var(--accent-line), shadow-md
```

### project-card4
```
reposo    → bg surface-1, border line, shadow-sm
hover     → border-color accent-line, shadow-md
           El nombre del proyecto sube levemente de color (ink-1)
click     → navega a /mapper — no estado activo permanente
```

### capacity-card
```
ok        → border-left: 3px solid var(--ok), bg tinted ok-soft sutil
warn      → border-left: 3px solid var(--warn), bg tinted warn-soft sutil
err       → border-left: 3px solid var(--err), bg tinted err-soft sutil
```

---

## Mapper específico

### mrow4 (mapping row)
```
reposo    → bg transparent, border-bottom: 1px solid var(--line)
hover     → bg surface-2
selected  → bg accent-soft, border-color accent-line
             El borde de toda la fila se vuelve accent-line

remove confirm (inline) →
  banda interna: bg err-soft, border: 1px solid err-line, r-sm
  botones: "Confirmar" (err primary) + "Cancelar" (ghost)
```

### dest-badge
```
unassigned → border: 1px dashed var(--line-2), color ink-4, bg transparent
              hover: border-color accent-line, color accent-ink
assigned   → bg accent-soft, color accent-ink, border: 1px solid accent-line
              hover: bg accent-soft más saturado
```

### mapper4-tab filters
```
Todas      → active cuando no hay filtro activo
Match perfecto → active cuando filtro = "matched"
Sin coincidencia → active cuando filtro = "nomatch"
```

### save indicator (mapper header)
```
idle      → no visible
saving    → icono refresh con .spin + "Guardando…" color ink-3
saved     → "✓ Guardado" color ok
error     → "✕ Error al guardar" color err
```

### save toast (fixed bottom)
```
ok        → bg ok-soft, border ok-line, color ok, "✓ Guardado exitosamente"
err       → bg err-soft, border err-line, color err, "✕ Error al guardar"
entrada   → m-fade-up 0.3s
salida    → auto-dismiss 3s, fade out opacity
```

---

## Modales

### modal-overlay
```
entrada   → m-fade 0.15s
color     → rgba(0,0,0,0.55) + backdrop-filter: blur(2px)
click     → cierra el modal
```

### destination-modal
```
entrada   → m-scale-in 0.18s
modal-path-item reposo   → bg transparent
modal-path-item hover    → bg surface-3
modal-path-item selected → bg accent-soft, color accent-ink, border-left 2px accent
modal-path-item in-use   → opacity 0.45, cursor not-allowed, badge "en uso"
```

### confirm dialog
```
overlay   → identical al modal-overlay
btn confirm (destructivo) → btn.primary con bg err
btn confirm (neutral)     → btn.primary normal
btn cancel → btn.ghost
```

---

## Chips y badges

### chip (semántico)
```
ok      → bg ok-soft, border ok-line, color ok
warn    → bg warn-soft, border warn-line, color warn
err     → bg err-soft, border err-line, color err
info    → bg info-soft, border info-line, color info
brand   → bg accent-soft, border accent-line, color accent-ink
```

### dot indicator
```
(sin clase) → bg ink-4 (gris neutro)
.ok         → bg ok, box-shadow: 0 0 4px ok (glow sutil)
.warn       → bg warn, box-shadow: 0 0 4px warn
.err        → bg err, box-shadow: 0 0 4px err
.run        → bg accent, animation: m-pulse 1.4s infinite
```

### status-pill
```
published → dot.ok + "Publicado" → bg ok-soft, color ok
draft     → dot.warn + "Borrador" → bg warn-soft, color warn
analysis  → dot.run + "En análisis" → bg accent-soft, color accent-ink
```

---

## Estados de pantalla

### locked surface
```
ic-wrap.locked → bg surface-3, r-xl, sin sombra
h2             → ink-2, font-display
prereq steps:
  done → bx: bg ok, color white ✓
  now  → bx: bg accent, color #00282e, texto "empieza aquí"
  pending → bx: bg surface-4, color ink-4
```

### pantalla success (post-publicación)
```
ok-ring → círculo borde ok con glow verde, animación scale-in
         después: borde con animación de trazo (stroke-dashoffset)
H2 → font-display, color ok
```

---

## Auth

### inputs auth
```
focus → box-shadow: var(--shadow-focus) = 0 0 0 4px var(--accent-soft)
        (más generoso que el app — 4px en vez de 3px)
error → border err-line + mensaje debajo
```

### btn-fill (auth)
```
reposo  → bg var(--accent), color #00282e (--accent-fi)
hover   → bg var(--accent-2)
active  → bg var(--accent) (más oscuro)
disabled → opacity 0.42
```

### OTP boxes
```
reposo  → border line-2, bg surface-1
focus   → border accent, shadow-focus
filled  → border accent-line, bg accent-soft (sutil)
error   → border err-line + shake animation
```

### auth-icon
```
default → bg surface-3, color ink-2
.ok     → bg ok-soft, border ok-line, color ok
```

---

## Reglas generales de transición

```css
/* Transiciones estándar del sistema */
transition: border-color .14s, box-shadow .14s, background .14s, color .14s;

/* Transiciones de animación (más lentas) */
transition: transform .2s, opacity .2s;

/* NUNCA animar */
/* color, background-color directamente en hover de UI funcional */
/* width, height de elementos de layout */
/* font-size */
```
