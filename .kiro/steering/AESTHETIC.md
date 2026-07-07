# AESTHETIC.md — ADN Visual de Bowpi Enterprise

Este documento captura el **por qué** detrás de cada decisión visual del producto.
No son reglas técnicas (eso está en TOKENS.md, DESIGN.md y COMPONENTS.md) — es la lógica de diseño.

Leer primero, antes de implementar cualquier elemento visual. La diferencia entre un componente que "funciona" y uno que "se siente Bowpi" está en entender este documento.

---

## Qué tipo de producto es este

Bowpi Enterprise es una **herramienta de precisión para implementadores técnicos bancarios**.

El usuario típico es un ingeniero o arquitecto de datos que pasa horas configurando mapeos de campos JSON contra un schema canónico. No es un usuario casual. No viene a explorar — viene a ejecutar una tarea técnica con exactitud.

Esto define todo. Cada decisión de diseño es consecuencia directa de este perfil:

| Característica del usuario | Implicación de diseño |
|---|---|
| Trabaja horas seguidas en el app | Colores que no generan fatiga visual |
| Procesa densidad de información (paths, IDs, campos) | Alta densidad informacional intencional |
| Necesita saber exactamente en qué estado está todo | Estados claros e inequívocos |
| Tiene criterio técnico — detecta lo que no funciona | Sin decoración vacía |
| No busca entretenimiento — busca eficiencia | Sin animaciones decorativas |

El resultado buscado: un producto que se siente **profesional, rápido y confiable**. No moderno por la moda — funcional por diseño.

---

## Por qué warm-tinted y no grises neutros

Los backgrounds del app (`--surface-0: #f2fafb` en cyan mode) tienen un leve tinte que insinúa el acento sin afirmarlo explícitamente.

**El argumento técnico:** los grises neutros puros (`#f5f5f5`, `#eeeeee`) generan fatiga visual en sesiones largas. El ojo humano descansa mejor sobre blancos levemente teñidos. Los estudios de tipografía editorial lo confirman: el papel de los libros no es blanco puro por esta razón.

**El argumento de marca:** el warm-tint es subconsciente. El usuario no "ve" el tinte — lo siente. Conecta la superficie con el acento cyan sin saturarlo. La UI respira con el mismo vocabulario cromático en todo.

**Cómo extender:** cualquier background nuevo debe derivarse de la paleta de superficies existente (`--surface-0` a `--surface-4`). Nunca usar `#f5f5f5`, `#eeeeee`, `#e0e0e0` o cualquier gris neutro. Si la escala existente no alcanza, pedir el token correcto antes de inventar uno.

---

## Por qué un solo acento

El cyan es la única nota cromática en la UI funcional. Aparece exclusivamente en:
- El elemento activo o seleccionado
- El foco de inputs
- Los botones de acción primaria
- Los paths e IDs técnicos (como `color: var(--accent-ink)`)
- Los dots animados de estado "en proceso"

**La lógica:** cuando el cyan aparece, señala "acá está la acción o el foco del sistema". Si aparece en demasiados lugares simultáneamente, pierde este significado. La escasez del acento es su superpoder.

**El test empírico:** en una pantalla bien diseñada de Bowpi, al desenfocarse los ojos, el cyan marca exactamente qué está pasando: qué item está activo, qué botón es la acción principal, dónde está el cursor. Si el cyan está en 8 lugares distintos sin que ninguno sea el elemento focal, la pantalla está mal diseñada.

**Qué hacer con estados semánticos:** los colores ok/warn/err/info son narrativos (comunican estado del sistema), no decorativos. Son la única razón para que aparezca color adicional. Si un elemento no tiene estado semántico real, su color viene del sistema de superficies e ink, no de los semánticos.

---

## Por qué tres familias tipográficas con roles estrictos

La tipografía de Bowpi es un **sistema de señales**, no de estética. Cada familia comunica una categoría de información:

**Space Grotesk → importancia y jerarquía**
Aparece cuando algo es significativo: el título de una pantalla, el nombre de un proyecto, un número de métrica. Letter-spacing negativo (-0.02em) que da densidad y precisión. El implementador lo lee y sabe: "esto es importante, presto atención". Nunca en cuerpo de texto — pierde su señal de jerarquía.

**DM Sans → información funcional**
El texto que el usuario necesita leer para entender y actuar: labels, botones, descripciones, mensajes. Es el "trabajador silencioso" — no llama la atención, permite leer sin esfuerzo. La legibilidad sobre la expresividad.

**JetBrains Mono → mundo técnico**
IDs, paths canónicos, código, valores de campos. Cuando el usuario ve mono, sabe instantáneamente: "esto es un dato técnico, no UI". Es la tipografía de las herramientas de desarrollo — el implementador la reconoce del IDE. Cuando aparece en uppercase con letter-spacing positivo (crumbs, section labels, statusbar), communica "etiqueta del sistema, no contenido de negocio".

**La prueba del rol tipográfico:** tomar cualquier elemento de la pantalla y preguntar: ¿es un título o número importante? (Space Grotesk) ¿Es instrucción o label funcional? (DM Sans) ¿Es dato técnico o etiqueta del sistema? (JetBrains Mono). Si la respuesta no encaja claramente en ninguna de las tres, reconsiderar el elemento.

---

## Por qué la escala tipográfica es conservadora

El título principal de una pantalla es 27px. No 36px, no 40px. El H1 más grande del producto es 28px (en auth, donde la pantalla tiene más espacio para respirar).

**La razón:** el diseño no gana autoridad con texto grande. La gana con tipografía correcta, espacio bien usado y jerarquía clara. Un H1 de 40px en una pantalla densa solo crea desequilibrio — el contenido real (los datos, las acciones) queda aplastado debajo de un título sobredimensionado.

Los tamaños grandes (22px+) están reservados para un único caso: métricas y números de display en stat cards. Y ahí tienen sentido porque son el dato más importante de la pantalla.

---

## Por qué densidad media-alta

El implementador necesita ver muchos campos a la vez. En el mapper, hay filas de mapeo con paths largos. En resumen, hay múltiples grupos de capacidades con múltiples campos cada uno.

La generosidad de espacio "por estética" es un lujo de apps consumer. En una herramienta técnica, el espacio extra entre elementos no ayuda al usuario — le obliga a hacer más scroll para ver la misma información.

**Densidad = respeto por el tiempo del usuario.**

Los paddings son exactos por razón:
- `.mrow4` tiene 8px vertical: el mapper puede mostrar 8-10 filas sin scroll. Con 16px, son 5 filas.
- `.sidebar-item` tiene 9px vertical: la navegación de 8 items cabe sin scroll.
- Las cards tienen 16-20px: suficiente para jerarquía interna sin desperdiciar pantalla.

---

## Por qué los estados de interacción son sutiles

```
reposo  → borde line-2, sin sombra
hover   → borde line-strong, shadow-sm (casi imperceptible)
focus   → borde accent-line, ring 3px accent-soft
active  → bg accent-soft, borde accent
```

No hay transiciones de fondo dramáticas en hover. No hay sombras grandes en reposo. La interactividad se sugiere al hover y se confirma al hacer acción.

**La razón:** en una herramienta técnica de uso intensivo, los estados de hover exagerados generan ruido visual. El usuario que trabaja horas en el mapper ve cientos de hovers por sesión. Si cada hover es una transformación visual significativa, la pantalla se convierte en un espectáculo de movimiento que distrae del trabajo.

La sutileza no es timidez — es respeto por la concentración del usuario.

**La única excepción:** el estado `active` (seleccionado, con foco) sí es claro. El fondo `accent-soft` + borde `accent` es visible e inequívoco. La interacción completa merece confirmación visual; el hover no.

---

## Por qué las animaciones son funcionales, no decorativas

Las animaciones del sistema tienen propósito específico:

| Animación | Propósito |
|---|---|
| `m-fade-up 0.22s` en `.mrow4` | Cada fila "aparece" al renderizarse. Crea sensación de sistema construyendo la lista. |
| `m-scale-in 0.18s` en modales | Da "peso" al modal — aparece desde adentro, no desde afuera. |
| `m-pulse` en dots `.run` | Respiración suave = el sistema está procesando activamente. |
| `m-spin` en `.spin` | Feedback de carga. Universal, reconocible. |
| `m-fade 0.15s` en overlays | El overlay aparece, no "cae". Discreta. |

No hay animaciones de hover en elementos funcionales. No hay floats, bobs ni pulses en elementos que no tienen estado de proceso. El movimiento decorativo en una herramienta técnica es ruido.

**La regla de oro:** si quitar la animación no pierde información o feedback, la animación sobra.

---

## El lenguaje del Shell

### El sidebar es utilidad, no marca

El sidebar es 100% funcional. El único elemento que "brilla" es el item activo (borde accent izquierdo + bg accent-soft). El resto son ink-3 en reposo. Sin colores de fondo seccionales, sin accent como decoración, sin ilustraciones.

**Por qué:** el sidebar es navegación, no branding. El usuario lo mira decenas de veces por sesión. Cualquier decoración extra se convierte en ruido.

### El topbar es contexto, no protagonista

La topbar muestra en qué workspace/tenant está el usuario y da acceso a acciones globales (notificaciones, settings, theme toggle). No tiene CTAs de negocio. Los CTAs van en el surface-header de cada pantalla.

**Por qué:** mezclar el contexto global con acciones de negocio crea confusión. El topbar responde "dónde estás". El surface-header responde "qué puedes hacer aquí".

### La statusbar es telemetría, no UI

10px mono uppercase. Solo información técnica sobre el estado del sistema (mapper activo, versión, tenant). No interactiva, no clickeable, no modificable por el usuario.

**Por qué:** los implementadores técnicos valoran la telemetría constante. La statusbar es la "línea de terminal" del app — siempre presente, siempre informativa, nunca intrusiva.

---

## El grid background

Las líneas de 1px en `.main` (separadas 72px, opacidad 3%) hacen **visible la estructura invisible**. El usuario no las "ve" conscientemente, pero percibe que hay un orden subyacente en la pantalla.

Es un truco de diseño editorial clásico: el papel rayado de un cuaderno técnico no se usa para escribir sobre las rayas — se usa para que el texto se sienta organizado.

No eliminar este efecto. Si parece demasiado visible, reducir la opacidad — nunca sacarlo.

---

## El auth art como única excepción decorativa

El panel derecho de las pantallas de auth tiene un SVG animado decorativo sobre fondo oscuro. Es la única instancia de diseño "expresivo" en el producto.

**Por qué es la excepción:** el auth no es una pantalla de trabajo — es una pantalla de entrada. El usuario llega una vez por sesión. Puede permitirse un momento de "bienvenida visual" sin comprometer la eficiencia. También establece el acento cyan como identidad del producto desde el primer contacto.

Esto NO autoriza gradientes ni decoraciones en el resto del app. El auth art es una zona claramente delimitada, no un permiso general.

---

## Bowpi vs. lo que Bowpi NO es

Para entender el lenguaje visual, es útil saber de qué se aleja explícitamente:

**No es un SaaS consumer (Notion, Figma, Linear)**
→ Sin playfulness tipográfico, sin ilustraciones en el UI funcional, sin micro-interactions de entretenimiento

**No es un dashboard de analytics (Tableau, Looker)**
→ Sin gráficos por defecto, sin data viz decorativa, sin accent colors en cada métrica

**No es un formulario corporativo (SAP, Oracle)**
→ Sin fondos grises neutros puros, sin tipografía corporativa sin personalidad, sin densidad agresiva de texto

**No es una landing page o marketing site**
→ Sin gradientes, sin hero sections, sin tipografía de display grande como protagonista

Bowpi existe en el espacio entre herramienta técnica y producto bien diseñado. Funcional como un IDE, cuidado como un SaaS de calidad.

---

## Cómo determinar si algo "se siente Bowpi"

Cuatro preguntas para cualquier elemento nuevo:

**1. ¿Es funcional antes que decorativo?**
Si el elemento comunica información o facilita una acción → probablemente bien.
Si el elemento "embellece" sin agregar información → revisar.

**2. ¿El acento cyan aparece solo donde hay acción o foco?**
Si el cyan señala exactamente qué hacer → bien.
Si el cyan está como decoración o separador → mal.

**3. ¿La tipografía mantiene los tres roles?**
Display para lo importante, sans para lo funcional, mono para lo técnico → bien.
Mezcla arbitraria → mal.

**4. ¿Los estados son claros sin ser ruidosos?**
El usuario sabe qué está pasando sin que la pantalla se lo grite → bien.
Animaciones llamativas o colores intensos en estados comunes → mal.

---

## Cómo extender el diseño coherentemente

Cuando necesitas diseñar algo que no está en el catálogo, seguir este proceso:

### 1. Definir el propósito semántico primero
¿Comunica estado? → usar colores semánticos (ok/warn/err/info)
¿Es navegación? → sidebar pattern
¿Es dato técnico? → mono, accent-ink
¿Es acción primaria? → btn.primary
¿Es contexto secundario? → ink-3, font-sans

### 2. Ubicar en la jerarquía espacial
¿Está en el surface body? → padding var(--pad-surface), gap var(--gap-card)
¿Es un componente dentro de otro? → padding 8-16px
¿Es un row de lista? → padding 8-9px vertical

### 3. Validar contra el ritmo existente
¿Las dimensiones se sienten consistentes con elementos adyacentes?
¿Los bordes y radios están en escala con el contexto?
¿La tipografía mantiene los tres roles?
¿El acento es escaso y deliberado?

### 4. El test final
Poner el elemento nuevo junto a elementos existentes de la misma pantalla. ¿Se siente del mismo sistema, o introduce una nota visual diferente? Si hay disonancia, identificar qué token o decisión la está causando y corregirla antes de seguir.

---

## Lo que NO es Bowpi — lista definitiva

```
❌ Gradientes en fondos de componentes funcionales
   Solo el auth art y el grid background son excepciones documentadas.

❌ Sombras grandes en elementos inline o en reposo
   shadow-lg es exclusivo de modales y toasts. Nunca para cards en reposo.

❌ Border-radius muy grande en containers rectangulares
   --r-md (12px) es el máximo para cards. --r-xl solo para empty state icons y auth icons.

❌ Colores de acento como fondos dominantes de pantalla
   accent-soft como fondo de un elemento seleccionado: sí. De una sección entera: no.

❌ Íconos decorativos sin propósito semántico
   Cada ícono debe comunicar algo.

❌ Peso 700 en cuerpo de texto
   700 solo para métricas y números grandes en Space Grotesk.

❌ Múltiples niveles de jerarquía tipográfica dentro de una card
   Una card tiene: label + valor + meta. No H1 + H2 + H3 dentro de sí misma.

❌ Animaciones en propiedades de color (color, background-color)
   Solo transform y opacity se animan. Nunca background o color directamente.

❌ Grises neutros puros como fondos
   #f5f5f5, #eeeeee, #e0e0e0 no existen en este sistema. Solo var(--surface-*).

❌ Line-height menor a 1.45 en texto de más de una línea
   La legibilidad tiene un mínimo. No comprimir más que esto.

❌ Centrar texto en componentes de lista o tabla
   El texto en listas y tablas va siempre left-aligned. El centrado es solo para
   estados vacíos (.surf-empty) y auth centrado.
```
