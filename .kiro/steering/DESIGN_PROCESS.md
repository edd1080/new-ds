# DESIGN_PROCESS.md — Proceso de diseño en Bowpi Enterprise

Cómo pensar y ejecutar el diseño de una pantalla o componente nuevo, manteniendo consistencia visual y lógica del sistema.

Este documento captura el **proceso mental** del diseñador. No es un checklist burocrático — es la secuencia de decisiones que garantiza que el output se sienta Bowpi. Leer antes de abrir cualquier archivo.

---

## Antes de empezar: las 6 preguntas

Antes de diseñar cualquier pantalla nueva, responder estas preguntas. Sin respuesta clara, no se empieza.

1. **¿Para qué existe esta pantalla?** — cuál es la tarea concreta que el usuario viene a hacer
2. **¿Quién la usa?** — implementador técnico, arquitecto de datos, revisor. El perfil cambia la densidad y el tono
3. **¿Qué pantalla existente se parece más?** — Overview, Mapper, Upload, Explainer, etc.
4. **¿Qué datos necesita mostrar?** — listar campos y sus tipos antes de pensar en layout
5. **¿Qué acciones necesita el usuario?** — CTA primario, acciones secundarias, acciones destructivas
6. **¿Qué estados puede tener la pantalla?** — vacía, cargando, con datos, con error, bloqueada

---

## Paso 1: Clasificar el tipo de pantalla

Cada pantalla nueva cae en una categoría. Elegirla define el layout base, los patrones de scroll y los componentes apropiados. Ver LAYOUTS.md para la especificación espacial de cada tipo.

| Tipo | Cuándo | Ejemplos existentes |
|---|---|---|
| **A — Surface estándar** | Gestión y visualización de datos, scroll libre | Overview, Proyectos, Resumen, Publicar |
| **B — Editor de 3 paneles** | Trabajo denso sobre lista de ítems con contexto lateral | Mapper Editor |
| **C — Wizard / ingesta** | Flujo de pasos secuenciales con progreso explícito | Upload (Config + Ingesta) |
| **D — Narrativa** | Lectura y exploración sin acción principal | Explainer, Tour guiado |
| **E — Auth** | Autenticación fuera del Shell | Login, Registro, OTP, etc. |
| **F — Empty/Locked** | Pantalla sin datos o bloqueada por prerequisito | Guards de mapper, upload vacío |

Si la pantalla nueva no encaja en ninguna de estas categorías, es una señal de que el flujo podría requerir revisión antes de diseñar.

---

## Paso 2: Diseñar el surface-header primero

En toda pantalla dentro del Shell (tipos A, B, C, D, F), el surface-header es lo primero. Definirlo antes de pensar en el contenido.

```
.surface-header
  .crumbs          → MÓDULO / PANTALLA en mono uppercase, 11px, ink-4
  h1               → Nombre de la pantalla — display, 27px, weight 600
  .sub             → Descripción funcional de qué hace el usuario acá — sans, 15px, ink-3
  .actions         → CTAs alineados a la derecha via margin-left: auto
```

**Reglas del surface-header:**

- Los **crumbs** son siempre mono uppercase: `DATA TRANSLATION / EDITOR`, no "Data Translation / Editor"
- El **H1** es Space Grotesk, -0.02em tracking, peso 600. No más grande que 27px. La jerarquía no se logra con tamaño sino con tipografía y espacio.
- El **subtítulo** responde "qué haces aquí" de forma funcional. No es marketing. Ejemplo: "Revisa y confirma las reglas de mapeo generadas por el agente antes de publicar." Máximo 2 líneas, max-width 720px.
- Las **acciones** son el CTA principal de la pantalla. Máximo 2-3 botones. Si hay solo uno: `.btn.primary`. Si hay dos: el secundario es `.btn` o `.btn.ghost`. Si hay tres: el tercero es `.btn.ghost` o `.btn.sm`.
- No poner íconos en los botones del header a menos que agreguen información (ej: spinner de guardado). Los botones de texto son más legibles en este contexto.

---

## Paso 3: Elegir el layout del contenido

Según la naturaleza de los datos y las acciones disponibles:

### Grid de cards — para ítems comparables
```css
display: grid;
grid-template-columns: repeat(2, 1fr);   /* 2 col para cards de gestión */
gap: var(--gap-card);
```
Usar para: project-cards, capacity-cards, items de configuración. Cuando los ítems tienen estructura similar y el usuario los compara visualmente.

### Grid de métricas — para stat cards
```css
grid-template-columns: repeat(4, 1fr);   /* 4 col para stat cards */
gap: var(--gap-card);
```
Usar para: fila de métricas en Overview o dashboards de estado.

### Lista vertical — para ítems de acción directa
```css
display: flex;
flex-direction: column;
/* Rows contiguos separados por border-bottom */
```
Usar para: audit trail, checklists, listas de reglas. Cuando el usuario interactúa con cada ítem individualmente y la comparación entre ítems no es el objetivo.

### Dos columnas asimétricas — para contenido + contexto
```css
display: grid;
grid-template-columns: 1fr 360px;
gap: var(--gap-card);
```
Usar para: pantallas con contenido principal + panel de contexto lateral que permanece visible mientras el usuario trabaja en el contenido.

### Panel triple fijo — solo para el Mapper
Ver LAYOUTS.md — Layout B. No extender para otras pantallas sin consultar el diseño.

---

## Paso 4: Identificar y reusar componentes existentes

El catálogo está en COMPONENTS.md. Antes de diseñar algo nuevo, recorrerlo en este orden:

1. **¿Existe un componente que hace exactamente esto?** → usarlo sin modificar
2. **¿Existe uno similar con una variante que falta?** → agregar la variante (ej: `.chip.nuevo-estado`)
3. **¿Se pueden componer dos componentes existentes?** → componerlos sin crear CSS nuevo
4. **Nada de lo anterior funciona** → diseñar un componente nuevo (ver Paso 7)

**La regla empírica:** el 90% de las pantallas nuevas deberían poder armarse con componentes existentes. Si se está creando más de 2 componentes nuevos para una sola pantalla, revisar si el diseño está sobre-especificando algo que podría resolverse con patrones existentes.

---

## Paso 5: Diseñar todos los estados de la pantalla

Nunca entregar un diseño con solo el "estado lleno". Toda pantalla necesita diseño explícito de:

### Estado vacío (empty state)
Cuando no hay datos todavía. Usar `.surf-empty` con la estructura:
- Ícono central en `.ic-wrap` (accent-soft, r-xl)
- H2 en font-display explicando qué falta
- Párrafo de contexto (opcional, max 480px)
- CTA primario para el siguiente paso
- Prerequisitos visibles si los hay (`.prereq`)

El empty state nunca es solo texto. Debe orientar al usuario hacia la acción.

### Estado bloqueado (locked)
Cuando un prerequisito no se completó. Usar `.surf-empty` con `.ic-wrap.locked`:
- Ícono de lock o estado pendiente
- Mostrar los pasos prerequisito con `.prereq`, marcando cuál es el que falta
- El CTA apunta directamente al paso bloqueante

### Estado de carga (loading)
Mientras se fetchean datos. Por ahora: `.spin` en el área de contenido. En el futuro se implementará loading skeleton.

### Estado lleno (filled)
El estado principal del diseño. Siempre diseñar con datos realistas y representativos, no placeholders genéricos. Ejemplo: usar `"Crédito Individual PTC"` no `"Nombre del proyecto"`.

### Estado de error
- Error recuperable: `.alert.err` visible en el contenido
- Error al guardar: `.save-toast.err` con auto-dismiss
- Error crítico de carga: pantalla de error completa (por diseñar cuando sea necesario)

---

## Paso 6: Mapear las interacciones

Listar cada acción posible del usuario y su resultado visual antes de diseñar los estados intermedios:

| Acción del usuario | Feedback visual |
|---|---|
| Click en botón primario de submit | Botón con `.spin` + estado "Guardando…" → `.save-toast.ok` |
| Acción exitosa sin navegación | `.save-toast.ok` auto-dismiss 3s |
| Acción fallida | `.save-toast.err` o `.alert.err` persistente si requiere atención |
| Acción destructiva (eliminar, desasignar) | Inline confirm (`.row-confirm`) o modal de confirmación |
| Selección de un ítem | Estado `.selected` en el elemento (bg accent-soft, borde accent) |
| Abrir un modal | Overlay `rgba(0,0,0,0.55) blur(2px)` + modal con `m-scale-in 0.18s` |
| Operación que tarda > 2s | Progress indicator (`.pbar` o spinner) con texto de estado |

**Principios de interacción:**
- Nunca dejar al usuario sin feedback después de una acción. Todo action tiene reaction.
- Las acciones destructivas siempre tienen confirmación explícita. Nunca eliminar con un solo click.
- Los mensajes de éxito son efímeros (auto-dismiss). Los errores persisten hasta ser resueltos.
- Nunca usar `alert()`, `confirm()` o `prompt()` del browser. Siempre componentes del sistema.

---

## Paso 7: Diseñar componentes nuevos (cuando son necesarios)

Cuando el Paso 4 confirma que no existe el componente:

### Clasificar primero
¿Es un primitivo? (un indicador, un badge, una etiqueta) → minimal CSS, heredar base styles
¿Es un card? → extender `.card` con especificidades del nuevo card
¿Es un row de lista? → extender el patrón de `.mrow4` adaptado al contexto
¿Es un panel lateral? → extender el patrón de `.policies-panel`
¿Es algo completamente nuevo? → documentar el patrón desde cero con todo el sistema

### Reglas para diseñar el componente nuevo
- **Solo tokens CSS** — nunca valores hardcodeados (excepto las excepciones documentadas en AGENTS.md)
- **Radios en escala**: `--r-sm` para elementos pequeños/inputs, `--r-md` para cards, `--r-pill` para chips
- **Tamaño mínimo de touch target**: 32px (equivalente a `.btn.sm`)
- **Padding interno**:
  - Rows compactos: 8-9px vertical, 12px horizontal
  - Cards: 16-20px todos los lados
  - Superficies: `var(--pad-surface)`
- **Animaciones**: solo `transform` y `opacity`. Duración: 150-300ms. Sin animaciones en hover de elementos funcionales.

### Nombrar las CSS classes
- Descriptivo del componente, no del estilo: `.audit-row` no `.green-flex-row`
- Modificadores con punto: `.audit-row.approved`, `.audit-row.pending`
- Prefijo del módulo si es específico: `.mapper4-*`, `.xpl-*`, `.auth-*`

### Documentar antes de usar
El componente nuevo se documenta en `COMPONENTS.md` y se registra en el Component Tracker **antes de considerarse listo**. Si no está documentado, no existe oficialmente.

---

## Paso 8: Verificar copy y voz

- **Idioma:** español LATAM neutro — tú/te, nunca vos/usted
- **Labels de formulario:** sustantivo en mayúscula inicial: "Nombre del proyecto", "Mapper ID"
- **Botones:** verbos en imperativo — "Publicar", "Guardar", "Cancelar", "Confirmar", "Continuar"
- **Mensajes de estado:** específicos — "Configuración publicada como v1.4.0" no "Acción completada"
- **Empty states:** siempre explicar qué falta Y qué hacer. Dos partes: problema + solución.
- **Errores:** decir exactamente qué salió mal. Nunca "Error desconocido". Si no se puede ser específico, decir "Hubo un problema al guardar. Intenta de nuevo."
- **Terminología del dominio:** consultar PRD.md → Glosario para términos correctos

**Terminología crítica:**

| ❌ Incorrecto | ✅ Correcto |
|---|---|
| "Mapping" | "Mapeo" |
| "Fields" | "Campos" |
| "Submit" | "Confirmar" / "Guardar" / "Publicar" (según contexto) |
| "Dashboard" | "Overview" |
| "Sign in" | "Iniciar sesión" |
| "Error" (como label de UI) | "Problema", "Sin coincidencia", "No encontrado" (según contexto) |

---

## Checklist de cierre: ¿se siente Bowpi?

Antes de dar por finalizado un diseño, verificar cada punto:

### Visual
- [ ] Ningún color hardcodeado — todo usa `var(--)` (excepto las excepciones documentadas)
- [ ] Las tres fuentes están en su rol correcto: display para títulos, sans para cuerpo, mono para técnico
- [ ] El acento cyan aparece solo donde hay acción activa o dato técnico — no como decoración
- [ ] No hay gradientes en fondos de UI funcional
- [ ] Los bordes y radios están en escala con el contexto
- [ ] Las sombras son correctas: `shadow-sm` en cards reposo, `shadow-md` en hover, `shadow-lg` en modales

### Tipografía
- [ ] El H1 del surface-header es Space Grotesk 27px 600
- [ ] Los crumbs son mono uppercase 11px ink-4
- [ ] Los paths canónicos y IDs están en mono con color `accent-ink`
- [ ] Las métricas numéricas grandes están en Space Grotesk 700 con `tabular-nums`
- [ ] No hay bold (700) en cuerpo de texto

### Estados
- [ ] Estado vacío diseñado (`.surf-empty` o equivalente)
- [ ] Estado de carga representado
- [ ] Estado lleno con datos realistas
- [ ] Estado de error con mensaje específico
- [ ] Estado bloqueado si aplica

### Interacción
- [ ] Las acciones destructivas tienen confirmación explícita
- [ ] Las acciones exitosas tienen feedback visual (toast o indicador)
- [ ] Los elementos interactivos tienen todos sus estados: reposo, hover, focus, active, disabled
- [ ] Los modales tienen overlay blur y animación de entrada

### Contenido
- [ ] Copy en español LATAM neutro (tú/te)
- [ ] Datos de ejemplo son realistas
- [ ] Empty states tienen CTA hacia el siguiente paso
- [ ] Los mensajes de error son específicos

### Sistema
- [ ] No se creó ningún componente que ya existía en COMPONENTS.md
- [ ] Los componentes nuevos están documentados en COMPONENTS.md y en el Component Tracker
- [ ] Los tokens CSS nuevos (si los hay) están en TOKENS.md y en base.css

---

## Anti-patrones frecuentes

Cosas que aparecen en el diseño de nuevas pantallas y no deben suceder:

```
❌ "Le agrego un gradiente para que se vea más moderno"
   → Los gradientes no son parte del lenguaje visual. El auth art es la única excepción intencional.

❌ "Uso accent-soft como fondo de una sección para que destaque"
   → accent-soft es solo para elementos seleccionados/activos, no para decorar áreas

❌ "Este H1 lo pongo más grande para darle más impacto"
   → 27px es el tamaño. La jerarquía se logra con tipografía y espacio, no con tamaño mayor.

❌ "Agrego un ícono decorativo para que no quede vacío el espacio"
   → Sin propósito semántico, no va. Ver ICONOGRAPHY.md.

❌ "Invento un color nuevo para este estado especial"
   → Solo los cuatro semánticos: ok/warn/err/info. No inventar colores intermedios.

❌ "Le doy más padding para que respire mejor"
   → La densidad media-alta es intencional. Densidad = herramienta profesional.

❌ "Diseño el componente acá y lo documento después cuando tenga tiempo"
   → Primero al catálogo, después al prototipo. Sin registro, no existe.

❌ "Uso un acento alternativo para este módulo nuevo"
   → En producción solo cyan. Los acentos alternativos son para exploración en prototipos.
```
