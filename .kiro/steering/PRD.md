# PRD — Bowpi Enterprise

Documento de referencia del producto. Leer para entender el dominio antes de implementar cualquier feature.

---

## Qué es Bowpi Enterprise

Bowpi Enterprise es la plataforma de configuración e implementación del **motor de decisión crediticia de Bowpi**. Está dirigida a equipos técnicos de instituciones financieras (bancos, cooperativas, fintechs) que necesitan conectar sus sistemas de datos al motor de Bowpi.

**No es** una plataforma para analistas de crédito ni para clientes finales del banco. Es una herramienta de implementación — la usan ingenieros, implementadores técnicos y arquitectos de datos del banco cliente.

---

## Módulo activo: Data Translation

### El problema que resuelve

Cada institución financiera tiene su propio JSON de solicitud de crédito con estructura y nomenclatura propietaria. El motor de decisión de Bowpi opera sobre un **Canónico v9.0.0** — un schema normalizado con rutas de campo fijas.

Sin Data Translation, cada integración requiere desarrollo a medida: frágil, costoso, lento.

Con Data Translation: el implementador sube el JSON del cliente, un agente IA genera las reglas de mapeo automáticamente, el implementador revisa y ajusta, y la configuración queda activa en producción.

### Flujo completo

```
1. CONFIGURACIÓN
   El implementador crea una "definición de mapeo":
   - Nombre del proyecto (ej: "Crédito Individual PTC")
   - Mapper ID (auto-generado en kebab-case, ej: "credito-individual-ptc")

2. INGESTA DE DATOS
   Sube el JSON de solicitud del cliente.
   El sistema parsea la estructura y el agente IA analiza campo a campo
   contra el Canónico v9.0.0 para generar reglas de mapeo.

3. EDITOR DE MAPEO
   El implementador revisa las reglas generadas:
   - Confirma los "match perfecto" (IA con alta confianza)
   - Asigna destino a los "sin coincidencia" (IA no pudo mapear)
   - Configura políticas: qué hacer si un campo llega nulo, transformaciones

4. RESUMEN
   Vista de capacidades habilitadas en el motor:
   - Qué grupos de evaluación están listos (perfil, empleo, buró, etc.)
   - Qué campos críticos faltan
   - Blockers que impiden la publicación

5. PUBLICAR
   Activa la configuración en producción con versión semántica.
   Audit trail de aprobaciones.
   Una vez publicado, cada evaluación crediticia del cliente pasa por esta configuración.
```

---

## Usuarios

### Usuario primario: Implementador técnico

- Trabaja en el equipo de implementación de Bowpi o en el banco cliente
- Conoce estructuras de datos y JSONs
- No necesita entender el motor crediticio en profundidad
- Necesita eficiencia: menos clicks, feedback claro, sin ambigüedad

**Ejemplo:** Jonatán Fernández, Implementación — Banco Solidario, tenant `bs.prod`

### Usuario secundario: Arquitecto de datos / Tech lead

- Revisa y aprueba configuraciones antes de publicar
- Puede hacer cambios en el editor de mapeo
- Le importa la trazabilidad (audit trail) y la versión semántica

---

## Tenant / Workspace

Cada institución financiera es un **tenant** con su propio workspace aislado. El tenant se identifica en el topbar y en la statusbar.

```
Banco Solidario → tenant: bs.prod
```

Un tenant puede tener múltiples proyectos de Data Translation (uno por producto crediticio).

---

## El Canónico v9.0.0

El Canónico es el schema normalizado interno de Bowpi. Tiene paths fijos organizados en grupos:

| Grupo | Descripción |
|---|---|
| `metadata` | Metadatos de la solicitud (fechas, versiones, IDs) |
| `processContext` | Contexto del proceso (tipo, agente, sesión) |
| `profile` | Perfil del solicitante (identidad, contacto, empleo) |
| `paymentCapacity` | Capacidad de pago (ingresos, monto, plazo) |
| `bureaus` | Historial de buró de crédito |
| `additionalData` | Campos adicionales sin equivalente directo |

**El Canónico NO cambia** en el ciclo de vida de una integración — es la fuente de verdad inmutable del motor.

---

## Reglas de mapeo — Conceptos clave

### Categorías

| Categoría | Descripción |
|---|---|
| `matched` | Campo con destino canónico asignado y confirmado |
| `noMatch` | Campo sin destino asignado (requiere acción manual) |

### Políticas de nulos

| Política | Comportamiento |
|---|---|
| `REQUIRED` | Campo obligatorio. El proceso falla si llega nulo |
| `SET_NULL` | Asigna null en destino sin fallar |
| `USE_DEFAULT` | Usa el valor por defecto configurado |

### Políticas de transformación

| Política | Comportamiento |
|---|---|
| `DIRECT` | El valor se transfiere sin transformación |
| `CODE_LOOKUP` | Aplica una función de transformación por nombre |

---

## Estados de un proyecto

| Estado | Descripción | Color |
|---|---|---|
| `published` | Configuración activa en producción | ok (verde) |
| `draft` | En edición, no publicado | warn (ámbar) |
| `analysis` | Sin JSON cargado, en configuración inicial | run/accent (animado) |

---

## Versión semántica

Al publicar, la configuración recibe una versión en formato `[mapperId]-v[major].[minor].[patch]`.

Ejemplo: `credito-individual-ptc-v1.4.0`

Cada publicación crea una nueva versión. Las versiones anteriores se mantienen accesibles para rollback.

---

## Módulos del workflow (navegación)

| Módulo | Route | Descripción |
|---|---|---|
| Overview | `/overview` | Dashboard de estado, métricas, acceso rápido |
| Proyectos | `/projects` | Lista de definiciones de mapeo del tenant |
| Crear definición | `/upload` | Config + Ingesta (2 sub-pasos) |
| Editor de mapeo | `/mapper` | Editor de reglas, políticas, árbol JSON |
| Resumen | `/summary` | Capacidades habilitadas, blockers |
| Publicar | `/publish` | Checklist, audit trail, activación |
| Cómo funciona | `/explainer` | Guía conceptual del módulo (5 stages) |
| Tour guiado | `/tour` | Simulación interactiva del flujo completo |

---

## Módulos futuros (referencia, no implementar aún)

Bowpi Enterprise incluirá otros módulos además de Data Translation. No están diseñados todavía. Cuando se diseñen, se agregarán a este PRD y a los handoff packages correspondientes.

---

## Glosario del dominio

| Término | Definición |
|---|---|
| **Canónico** | Schema normalizado de Bowpi (v9.0.0). El destino de todo mapeo. |
| **Mapper ID** | Identificador único de una definición de mapeo, en kebab-case. |
| **Tenant** | Institución financiera cliente. Identificada por un slug (ej: `bs.prod`). |
| **Definición de mapeo** | Un proyecto completo de Data Translation para un producto crediticio. |
| **Regla de mapeo** | La relación entre un campo del JSON del cliente y un path del Canónico. |
| **Agente IA** | El sistema que analiza el JSON y propone reglas de mapeo automáticamente. |
| **Match perfecto** | Regla donde el agente IA encontró equivalente canónico con alta confianza. |
| **Sin coincidencia** | Regla donde el agente no encontró equivalente — requiere asignación manual. |
| **Ingesta** | El proceso de subir y parsear el JSON del cliente. |
| **Política de nulos** | Comportamiento definido cuando un campo llega nulo en tiempo de evaluación. |
| **Blocker** | Campo crítico sin fuente asignada que impide la publicación. |
| **Cobertura canónica** | Porcentaje de campos del Canónico que tienen fuente asignada. |
| **Audit trail** | Registro de quién aprobó cada regla y cuándo. |

---

## Terminología a evitar

| ❌ No usar | ✅ Usar en su lugar |
|---|---|
| "Mapping" | "Mapeo" |
| "Fields" | "Campos" |
| "Rules" | "Reglas" |
| "Pipeline" | "Pipeline" (este sí en inglés, es nombre técnico) |
| "Dashboard" | "Overview" (nombre de la pantalla) |
| "Sign in / Sign up" | "Iniciar sesión / Crear cuenta" |
| "Submit" | "Confirmar", "Guardar", "Publicar" según contexto |
| "Error" (UI) | "Problema", "No encontrado", "Sin coincidencia" según contexto |
