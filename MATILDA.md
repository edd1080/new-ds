# MATILDA — Documentación del Proyecto

Guía completa del proyecto Matilda: la aplicación de producto de Bowpi Enterprise. Este documento explica la estructura, pantallas, flujos y cómo implementar el design system.

---

## Qué es Matilda

Matilda es la aplicación frontend del módulo **Data Translation** de Bowpi Enterprise. Permite a implementadores técnicos de instituciones financieras configurar la traducción de datos entre el JSON de solicitud de crédito de un banco y el Canónico v9.0.0 de Bowpi.

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript estricto
- **Estado:** Zustand con persistencia en localStorage
- **Design System:** `@bowpi/design-system` (workspace dependency)
- **Puerto de desarrollo:** `http://localhost:3000`

---

## Estructura de carpetas

```
apps/matilda/
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← Root layout (fonts, metadata)
│   │   ├── page.tsx                ← Redirect a /login
│   │   ├── (auth)/                 ← Grupo de rutas SIN Shell
│   │   │   ├── layout.tsx          ← Layout de auth (sin sidebar/topbar)
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── check-email/page.tsx
│   │   │   ├── verify-code/page.tsx
│   │   │   ├── email-verified/page.tsx
│   │   │   └── two-factor/page.tsx
│   │   └── (app)/                  ← Grupo de rutas CON Shell
│   │       ├── layout.tsx          ← Wrapper con AppShellClient
│   │       ├── overview/page.tsx
│   │       ├── projects/page.tsx
│   │       ├── upload/page.tsx
│   │       ├── mapper/page.tsx
│   │       ├── summary/page.tsx
│   │       ├── publish/page.tsx
│   │       ├── explainer/page.tsx
│   │       ├── tour/page.tsx
│   │       ├── domains/
│   │       │   ├── page.tsx
│   │       │   └── components/     ← VarsTab, VersionsTab, slides, etc.
│   │       ├── simulations/
│   │       │   ├── page.tsx
│   │       │   └── components/     ← AddModelModal, ExecutionDrawer
│   │       └── settings/page.tsx
│   ├── components/
│   │   └── app/
│   │       └── AppShellClient.tsx  ← Shell wrapper con navegación y estado
│   ├── data/
│   │   ├── mockData.ts            ← Datos mock del módulo Data Translation
│   │   └── simulationsData.ts     ← Datos mock de simulaciones DMN
│   ├── lib/
│   │   ├── helpers.ts             ← Utilidades (toKebab, structuredDataToRules, etc.)
│   │   └── useStepRunner.ts       ← Hook para animación de pasos secuenciales
│   └── store/
│       └── useMatildaStore.ts     ← Estado global Zustand
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## Flujos de la aplicación

### Flujo 1: Autenticación

Las pantallas de auth NO usan el Shell (sidebar, topbar, statusbar). Tienen su propio layout con panel izquierdo (formulario) y panel derecho (arte decorativo SVG).

| Ruta | Pantalla | Descripción |
|------|----------|-------------|
| `/login` | Iniciar sesión | Email + contraseña + Google OAuth |
| `/register` | Crear cuenta | Nombre + email + contraseña |
| `/forgot-password` | Olvidé contraseña | Envía email de reset |
| `/check-email` | Revisa tu email | Confirmación de envío |
| `/verify-code` | Ingresar código | OTP de 6 dígitos |
| `/email-verified` | Email verificado | Confirmación de éxito |
| `/two-factor` | Verificación 2FA | OTP de app de autenticación |

**Flujo de login:**
```
/login → /two-factor → /overview
```

**Flujo de registro:**
```
/register → /check-email → /verify-code → /email-verified → /login
```

**Flujo de recuperación:**
```
/forgot-password → /check-email
```

---

### Flujo 2: Data Translation (flujo principal)

Este es el flujo core del producto. Se accede desde el Overview o la navegación lateral.

| Paso | Ruta | Pantalla | Descripción |
|------|------|----------|-------------|
| 1 | `/upload` | Configuración | Nombre del proyecto + Mapper ID |
| 2 | `/upload` | Ingesta de datos | Carga JSON + análisis del agente IA |
| 3 | `/mapper` | Editor de mapeo | Asignar destinos, políticas, confirmar reglas |
| 4 | `/summary` | Resumen | Capacidades habilitadas, blockers |
| 5 | `/publish` | Publicar | Activar configuración en producción |

**Flujo completo:**
```
/upload (config) → /upload (ingesta) → /mapper → /summary → /publish
```

**Pantallas de soporte:**
- `/overview` — Dashboard con métricas, pipeline visual, acceso rápido
- `/projects` — Lista de todas las definiciones de mapeo del tenant

---

### Flujo 3: Dominios

Catálogo de variables crediticias agrupadas por dominio. Cada dominio gestiona su propio ciclo de versiones inmutables.

| Ruta | Pantalla | Descripción |
|------|----------|-------------|
| `/domains` | Dominios del sistema | Master-detail: lista lateral + panel de contenido |

**Tabs dentro de la pantalla:**
- **Variables** — CRUD de variables (directas y calculadas), filtros, expandibles
- **Versiones** — Historial de snapshots, habilitar/deshabilitar, hacer activa, archivar

**Acciones disponibles:**
- Crear dominio (slide panel)
- Crear/editar variable (slide panel)
- Publicar versión (slide panel)
- Activar/desactivar/archivar versiones (confirm dialog)

---

### Flujo 4: Simulaciones DMN

Ejecución de modelos de decisión contra datasets de prueba.

| Ruta | Pantalla | Descripción |
|------|----------|-------------|
| `/simulations` | Simulaciones DMN | Tab "Simulaciones" + Tab "Modelos" |

**Tab Simulaciones:**
- Historial lateral (sidebar con corridas previas)
- Nueva simulación: seleccionar modelo → versión → dataset → ejecutar
- Vista de resultados: métricas, distribución, tabla de ejecuciones
- Drawer de detalle por ejecución individual

**Tab Modelos:**
- Registro de modelos DMN
- Agregar modelo (modal con upload de .dmn)
- Publicar/despublicar versiones

---

### Flujo 5: Educación

Pantallas no-transaccionales para que el usuario entienda el módulo.

| Ruta | Pantalla | Descripción |
|------|----------|-------------|
| `/explainer` | Cómo funciona | 5 stages narrativos con visuales |
| `/tour` | Tour guiado | Simulación interactiva paso a paso |

---

### Pantalla 6: Ajustes

| Ruta | Pantalla | Descripción |
|------|----------|-------------|
| `/settings` | Ajustes | Perfil, workspace, apariencia (tema), notificaciones, zona de peligro |

---

## Estado global (Zustand Store)

El store en `src/store/useMatildaStore.ts` persiste en localStorage con la key `matilda_v4_store`.

**Estado principal:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `theme` | `"light" \| "dark"` | Tema activo |
| `seenExplainer` | `boolean` | Si el usuario ya vio el Explainer |
| `activeProject` | `Project \| null` | Proyecto activo en edición |
| `mapperId` | `string \| null` | ID del mapper actual |
| `projectName` | `string \| null` | Nombre del proyecto actual |
| `configDone` | `boolean` | Paso 1 completado |
| `jsonLoaded` | `boolean` | JSON cargado |
| `agentDone` | `boolean` | Agente IA terminó el análisis |
| `mappingRules` | `MappingRule[]` | Reglas de mapeo generadas |
| `rulePolicies` | `Record<string, RulePolicyV2>` | Políticas por regla |
| `rulesConfirmed` | `boolean` | Reglas confirmadas |
| `summaryOk` | `boolean` | Resumen aprobado |
| `published` | `boolean` | Configuración publicada |

---

## Cómo implementar el Design System

### Instalación

El design system es un workspace package. Ya está vinculado en el `package.json`:

```json
{
  "dependencies": {
    "@bowpi/design-system": "workspace:*"
  }
}
```

No se instala via npm — se resuelve automáticamente por pnpm workspaces.

### Importar componentes

Todos los componentes se importan desde el entry point único:

```tsx
import { Button, Icon, FormInput, StatCard, Modal, SurfaceHeader } from "@bowpi/design-system";
```

No importar desde rutas internas (`@bowpi/design-system/src/components/...`). Siempre desde el root.

### Importar estilos

Los estilos CSS del design system se importan en el layout root de la app:

```tsx
// app/layout.tsx
import "@bowpi/design-system/src/styles/base.css";
import "@bowpi/design-system/src/styles/shell.css";
import "@bowpi/design-system/src/styles/components.css";
import "@bowpi/design-system/src/styles/surfaces.css";
// ... otros archivos de estilo según necesidad
```

### Usar componentes — ejemplos

**Botones:**
```tsx
<Button variant="primary" onClick={handleSave}>Guardar</Button>
<Button variant="ghost" size="sm">Cancelar</Button>
<Button size="lg" disabled={!valid}>Continuar <Icon.arrow /></Button>
```

**Formularios:**
```tsx
<FormField label="Nombre del proyecto" required desc="Nombre visible en la lista.">
  <FormInput placeholder="Ej: Crédito Individual" value={name} onChange={e => setName(e.target.value)} />
</FormField>
```

**Cards de métricas:**
```tsx
<StatCard label="Publicados" value={3} tone="ok" />
<StatCard label="Total" value={12} compact />
```

**Modal:**
```tsx
<Modal title="Confirmar acción" subtitle="Esto no se puede deshacer" onClose={close} footer={
  <>
    <Button variant="ghost" onClick={close}>Cancelar</Button>
    <Button variant="primary" onClick={confirm}>Confirmar</Button>
  </>
}>
  <p>¿Estás seguro de continuar?</p>
</Modal>
```

**Empty State:**
```tsx
<EmptyState
  icon={<Icon.data />}
  title="Sin proyectos"
  description="Crea tu primera definición de mapeo para comenzar."
  action={<Button variant="primary" onClick={create}>Nuevo proyecto</Button>}
/>
```

**Tabs:**
```tsx
<TabsFlush
  tabs={[
    { value: "vars", label: "Variables", count: 12 },
    { value: "versions", label: "Versiones" },
  ]}
  value={activeTab}
  onChange={setActiveTab}
/>
```

**Surface Header (encabezado de pantalla):**
```tsx
<SurfaceHeader
  crumbs="DATA TRANSLATION / PROYECTOS"
  title="Proyectos de mapeo"
  sub="Cada proyecto es la configuración de traducción de un JSON cliente."
  actions={<Button variant="primary"><Icon.plus /> Nuevo</Button>}
/>
```

### Usar íconos

Los íconos son SVG inline stroke-based. Se acceden via el objeto `Icon`:

```tsx
import { Icon } from "@bowpi/design-system";

<Icon.arrow />          // flecha derecha
<Icon.plus />           // agregar
<Icon.search />         // buscar
<Icon.json />           // archivo JSON
<Icon.sparkles />       // agente IA
<Icon.data />           // datos/dataset
<Icon.flow />           // flujo/pipeline
<Icon.check />          // confirmado
<Icon.trash />          // eliminar
<Icon.chevronLeft />    // colapsar
```

Todos heredan `currentColor` — el color se controla desde el CSS del padre.

### Usar tokens CSS

No hardcodear colores, radios ni sombras. Siempre usar los tokens:

```css
/* Correcto */
background: var(--surface-1);
border: 1px solid var(--line-2);
color: var(--ink-1);
border-radius: var(--r-md);
box-shadow: var(--shadow-sm);

/* Incorrecto */
background: #ffffff;
border: 1px solid #e0e0e0;
color: #333333;
border-radius: 12px;
```

### Estructura de una pantalla nueva

Toda pantalla dentro del grupo `(app)/` sigue este patrón:

```tsx
"use client";

import { SurfaceHeader, Button, Icon } from "@bowpi/design-system";

export default function NuevaPantalla() {
  return (
    <>
      <SurfaceHeader
        crumbs="MÓDULO / PANTALLA"
        title="Título de la pantalla"
        sub="Descripción funcional de qué hace el usuario aquí."
        actions={<Button variant="primary">Acción principal</Button>}
      />

      <div style={{ padding: "0 var(--pad-surface) var(--pad-surface)" }}>
        {/* Contenido de la pantalla */}
      </div>
    </>
  );
}
```

### Reglas clave para desarrolladores

1. **Sin Tailwind ni librerías externas** — todo se hace con CSS custom properties y los componentes del DS
2. **Sin librerías de íconos** — solo `Icon.*` del design system
3. **Español LATAM neutro** — tú/tienes, nunca vos/tenés ni usted
4. **Componentes del DS primero** — antes de crear markup custom, verificar si ya existe en el DS
5. **Tokens, siempre** — `var(--surface-1)` no `#ffffff`, `var(--r-md)` no `12px`
6. **`"use client"`** — todas las pantallas son client components (usan hooks y estado)
7. **Estado en Zustand** — no crear estado local para datos que persisten entre pantallas

---

## Datos mock

Los datos de negocio están en `src/data/` como constantes TypeScript:

- `mockData.ts` — proyectos, pasos del flujo, fuentes JSON, reglas de mapeo, árbol JSON, dominios, variables, versiones
- `simulationsData.ts` — modelos DMN, datasets, simulaciones, ejecuciones, resultados

Estos datos están listos para ser reemplazados por llamadas a API real sin cambiar la estructura de los componentes.

---

## Comandos útiles

```bash
# Desarrollo
pnpm dev:matilda              # http://localhost:3000

# Verificación
pnpm typecheck                # TypeScript check de todo el monorepo
pnpm build:matilda            # Build de producción

# Reset de estado (desde el app)
# Sidebar → avatar → "Reiniciar sesión" (limpia localStorage y redirige a /login)
```
