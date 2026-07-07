# ICONOGRAPHY.md — Sistema de Íconos

Documentación completa del sistema de íconos de Bowpi Enterprise.

---

## Filosofía

Los íconos de Bowpi son **stroke-based**: trazo sin relleno. Esta elección no es estética aleatoria — es una señal del tipo de producto:

- **Stroke = herramienta de precisión.** Un ícono de fill sólido se lee como app consumer (mobile, marketing). El stroke se lee como software técnico (IDE, herramienta de datos).
- **1.5px = confianza sin agresividad.** Un trazo más fino (1px) es frágil y difícil de ver en pantallas de baja densidad. Uno más grueso (2px) es demasiado bold para la densidad del app.
- **`currentColor` = coherencia automática.** Los íconos heredan el color del texto del elemento padre. No necesitan lógica de color propia — los estados de interacción (hover, active, disabled) se manejan cambiando el `color` del contenedor.

**Principio central:** cada ícono en la UI debe comunicar algo. Sin propósito semántico, no va. La única excepción: íconos grandes en empty states e íconos de auth (decorativos, pero intencionales y contextuales).

---

## Especificación técnica

```svg
stroke-width="1.5"
fill="none"
stroke="currentColor"
stroke-linecap="round"
stroke-linejoin="round"
```

Todos los íconos siguen esta especificación exacta. No hay excepciones en íconos funcionales.

El Matilda Mark (logo) no es un SVG stroke — es un componente CSS puro con sus propias reglas. Ver sección al final.

---

## Tamaños estándar

| Contexto | Tamaño recomendado |
|---|---|
| Inline en texto, chips, badges | 12px |
| Sidebar items | 16px |
| Botones de 40px (default) | 16px |
| Botones sm (32px) | 14px |
| Botones lg (50px) | 18px |
| Topbar (`iconbtn` 40×40px) | 18px |
| Card headers, sección labels | 14px–16px |
| JSON tree (carets) | 10px |
| Empty state (decorativo) | 32px–40px |
| Auth icon (decorativo) | 28px–32px |

**Regla general:** el ícono nunca debe tener más peso visual que el texto al que acompaña. Si el ícono se "roba" la atención del label, reducir el tamaño o aumentar el peso del texto.

Los íconos en botones van siempre **a la derecha del texto** para acciones de avance (→), y **a la izquierda** para acciones de retorno o estado (spinner, check, warning).

---

## Color y herencia

Los íconos usan `stroke: currentColor`. El color se controla desde el CSS del elemento padre, no del SVG:

```css
/* Correcto — controlar el color del padre */
.sidebar-item { color: var(--ink-2); }
.sidebar-item:hover { color: var(--ink-1); }
.sidebar-item.active { color: var(--accent-ink); }

/* Incorrecto — no modificar el stroke del SVG directamente */
.sidebar-item.active svg { stroke: var(--accent-ink); }
```

### Colores por contexto

| Contexto | Color del ícono (heredado) |
|---|---|
| Sidebar reposo | `var(--ink-3)` |
| Sidebar hover | `var(--ink-1)` |
| Sidebar activo | `var(--accent-ink)` |
| Botón default reposo | `var(--ink-1)` |
| Botón ghost | `var(--ink-2)` |
| Topbar iconbtn reposo | `var(--ink-3)` |
| Topbar iconbtn hover | `var(--ink-1)` |
| Card header | `var(--ink-3)` |
| Estado ok | `var(--ok)` |
| Estado warn | `var(--warn)` |
| Estado err | `var(--err)` |
| Statusbar | `var(--ink-4)` |
| Spinner activo | `var(--accent)` (se define en el contexto del btn.primary) |

---

## Inventario de íconos disponibles

Todos los íconos viven en:
- **Claude Design:** `cursor_handoff/design-refs/primitives.jsx` como objeto `Icon.*`
- **Cursor:** `src/components/ui/Icon.tsx`

Usar siempre `<Icon.nombre />`. No embeber SVGs inline en componentes de pantalla.

### Navegación y UI
```
Icon.arrow         → flecha derecha (avanzar, CTA principal)
Icon.arrowLeft     → flecha izquierda (volver, nav atrás)
Icon.chevronDown   → chevron abajo (selects, dropdowns, acordeón)
Icon.chevronLeft   → chevron izquierda (colapsar panel, prev)
Icon.chevronRight  → chevron derecha (expandir panel, next)
Icon.chevronUp     → chevron arriba (acordeón abierto)
Icon.external      → enlace externo (cuadrado con flecha)
Icon.close         → cerrar (×) — modales, toasts, tags removibles
```

### Acciones sobre datos
```
Icon.upload        → subir archivo / drag-drop
Icon.download      → descargar
Icon.copy          → copiar al portapapeles
Icon.edit          → editar (lápiz)
Icon.trash         → eliminar (destructivo)
Icon.refresh       → recargar / base del spinner (.spin)
Icon.search        → buscar (lupa)
Icon.filter        → filtrar
Icon.sort          → ordenar
Icon.plus          → agregar, crear nuevo
Icon.minus         → remover, reducir
```

### Estado y feedback
```
Icon.check         → confirmado, completado
Icon.checkCircle   → éxito circular
Icon.warning       → advertencia / warn
Icon.error         → error crítico
Icon.info          → información neutral
Icon.lock          → bloqueado, prerequisito pendiente
Icon.unlock        → disponible, desbloqueado
```

### Objetos y dominio
```
Icon.json          → archivo JSON (Upload, FileCard)
Icon.data          → dataset / estructura de datos
Icon.code          → código / expresión
Icon.flow          → flujo / pipeline (Explainer, locked surfaces)
Icon.cards         → colección / proyectos (Sidebar nav)
Icon.person        → perfil / solicitante (CapacityCard)
Icon.building      → institución / banco / organización
Icon.sparkles      → agente IA / inteligencia (AgentCard)
Icon.bell          → notificaciones (Topbar)
Icon.settings      → configuración / ajustes (Topbar, Sidebar foot)
Icon.eye           → ver / mostrar contraseña
Icon.eyeOff        → ocultar contraseña
Icon.calendar      → fecha / timestamp
Icon.clock         → tiempo / historial / audit
```

---

## El spinner

El spinner no es un ícono especial — es el `Icon.refresh` con la clase `.spin`:

```jsx
<span className="spin"><Icon.refresh width={14} height={14} /></span>
```

```css
.spin { animation: m-spin 0.9s linear infinite; }
```

Usar en:
- Botones mientras ejecutan una operación: `<button className="btn primary"><span className="spin"><Icon.refresh /></span> Guardando…</button>`
- Estados de carga inline en panels
- El `.save-indicator.saving` del mapper

---

## El Matilda Mark (logo)

El logo de Matilda no es un SVG stroke. Es un componente CSS puro:

```jsx
<div className="mk">
  {[0,1,2,3,4,5,6,7,8].map(i => <span key={i}/>)}
</div>
```

```css
/* Grid 3×3 de spans */
.mk {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 9 celdas */
}
.mk span:nth-child(2),
.mk span:nth-child(4),
.mk span:nth-child(6),
.mk span:nth-child(8) { opacity: 0; } /* posiciones vacías */
.mk span:nth-child(5) { background: var(--accent); } /* centro = acento */
/* resto: var(--ink-1) */
```

El mark se adapta automáticamente al tema y al acento activo. No usar imágenes para el logo — solo el componente CSS.

---

## Agregar un ícono nuevo

Proceso para agregar un ícono que no existe en el inventario:

1. **Confirmar que es necesario** — verificar que ningún ícono existente comunica lo mismo en ese contexto
2. **No instalar librerías** — no agregar Lucide, Heroicons, Phosphor, react-icons ni ninguna otra
3. **Diseñar en Claude Design** — trazar el SVG con stroke 1.5px, fill none, sin colores fijos, linecap round, linejoin round
4. **Verificar coherencia visual** — comparar side by side con 3-4 íconos existentes del mismo tamaño. ¿Se siente del mismo sistema?
5. **Agregar a ambos lugares:**
   - `cursor_handoff/design-refs/primitives.jsx` como `Icon.nombre`
   - `src/components/ui/Icon.tsx` en Cursor
6. **Documentar en este archivo** bajo la categoría correspondiente

### Por qué no usar librerías de íconos
Las librerías (Lucide, Heroicons, etc.) tienen cientos de íconos con estilos ligeramente diferentes entre sí y diferentes al sistema de Bowpi. Un solo ícono de Lucide mezclado con el catálogo propio rompe la coherencia visual. El ojo entrenado lo detecta inmediatamente. El catálogo controlado garantiza que todos los íconos se sienten del mismo sistema.

---

## Íconos prohibidos o incorrectos

```
❌ SVG con fill solid en contexto funcional
   → fill debe ser "none" en todos los íconos funcionales

❌ Ícono sin label en un botón de acción principal
   → Solo en .iconbtn de topbar donde el contexto lo hace obvio
   → En acciones de pantalla: siempre texto + ícono, o solo texto

❌ Ícono de 20px+ dentro de texto de cuerpo inline
   → Los íconos inline en texto son 12–14px

❌ Emoji como sustituto de ícono
   → Nunca. Los emojis varían por plataforma y no siguen el sistema.

❌ Íconos de relleno sólido importados de otras librerías
   → Solo los íconos stroke del catálogo propio

❌ Ícono decorativo en un row de lista o tabla sin propósito semántico
   → En contextos de alta densidad, cada píxel debe justificarse

❌ Dos íconos contiguos sin separador ni texto
   → Genera ambigüedad. Uno o el otro, o texto + ícono.
```
