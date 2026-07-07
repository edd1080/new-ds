# Bowpi Enterprise — Matilda

Plataforma B2B de configuración e implementación del **motor de decisión crediticia de Bowpi**, dirigida a equipos técnicos de instituciones financieras. El módulo activo es **Data Translation**: conecta el JSON de solicitud de crédito de un banco al **Canónico v9.0.0** usando un agente IA.

Implementación en código real (React / Next.js) del design system y las pantallas de producto.

---

## Monorepo

pnpm workspaces:

```
bowpi-enterprise/
├── packages/
│   └── design-system/       @bowpi/design-system — tokens CSS, componentes React, íconos
├── apps/
│   ├── matilda/             @bowpi/matilda — app de producto (Next.js 14, App Router)
│   └── style-guide/        @bowpi/style-guide — documentación visual del DS
└── .kiro/
    └── steering/            Documentación de diseño (tokens, layouts, estados, proceso)
```

---

## Design System (`packages/design-system`)

La fuente de verdad de la UI. Incluye:

- **Tokens CSS** (`src/styles/base.css`) — colores, tipografía, radios, sombras, espaciado
- **Estilos de componentes** (`src/styles/`) — base, shell, components, surfaces, auth
- **Componentes React tipados** (`src/components/`) — organizados por categoría
- **Íconos SVG inline** (`src/icons/Icon.tsx`) — stroke 1.5px, `currentColor`
- **Component Tracker** (`src/tracker/data.ts`) — inventario del catálogo

### Paleta de colores

| Token | Valor | Uso |
|-------|-------|-----|
| `--accent` | `#04D3EA` | Acento principal (cyan) |
| `--accent-2` | `#0BB7CC` | Acento secundario |
| `--ok` | `#27D778` | Éxito, publicado |
| `--warn` | `#D99733` | Advertencia, parcial |
| `--err` | `#D0514A` | Error, blocker |
| `--info` | `#2f6f9e` | Información neutral |

### Componentes incluidos

**Primitivos:** MatildaMark, Tag, Dot, Chip, StatusPill, TypeBadge, DestBadge, Kbd, ProgressBar, Spinner

**Botones:** Button (default/primary/ghost, sm/lg), IconButton

**Formularios:** FormInput, Textarea, Select, SearchBar, Toggle, Checkbox, RadioGroup, FormField, MapperIdPreview, OTPInput

**Navegación:** Breadcrumb, TabsUnderline, TabsFlush, TabsSegmented, UploadStepper, DtStepper

**Cards:** Card/CardHead, StatCard (con variante compact y prop tone), ProjectCard, FileCard, AgentCard, CapacityCard

**Data Display:** DataTable, JsonTree

**Feedback:** Alert, SaveIndicator, SaveToast, LockedSurface, EmptyState

**Layout:** SurfaceHeader, Modal, DropZone, SlidePanel, ConfirmDialog

**Shell:** Shell, BrandCell, Topbar, Sidebar, Statusbar

**Domain-specific:** MappingRow, TreePanel, PoliciesPanel, SourcePickerModal, DestinationModal, DomainPanel, 22+ componentes de Simulaciones DMN

**Auth:** AuthLayout, AuthArt, AuthPanel, AuthForm, AuthIcon, PasswordField, AuthButtons, Divider

---

## App (`apps/matilda`)

22 rutas organizadas en dos grupos:

### Auth (`(auth)/`) — sin Shell
- Login, Registro, Olvidé contraseña, Revisar email, Verificar código, Email verificado, 2FA

### App (`(app)/`) — con Shell
- **Overview** — dashboard de estado y acceso rápido
- **Proyectos** — lista de definiciones de mapeo
- **Upload** — configuración + ingesta de datos (wizard de 2 pasos)
- **Mapper Editor** — editor de reglas de mapeo (3 paneles)
- **Resumen** — capacidades habilitadas en el motor
- **Publicar** — activación en producción
- **Dominios** — catálogo de variables crediticias con ciclo de versiones
- **Simulaciones DMN** — ejecución de modelos contra datasets
- **Cómo funciona** — guía conceptual (5 stages)
- **Tour guiado** — simulación interactiva del flujo
- **Ajustes** — perfil, workspace, apariencia

**Estado:** Zustand con `persist` (localStorage key `matilda_v4_store`)

---

## Style Guide (`apps/style-guide`)

Sitio de documentación en vivo:
- `/design-system` — especímenes de todos los componentes con datos reales
- `/tracker` — Component Tracker interactivo con filtros por estado

---

## Stack técnico

- **Next.js 14** (App Router) · **TypeScript** estricto · **Zustand**
- **CSS custom properties** — sin Tailwind, sin librerías de UI ni de íconos externas
- **Fuentes:** DM Sans (cuerpo) · Space Grotesk (display) · JetBrains Mono (código)
- **Tema:** light + acento cyan por defecto; dark mode disponible

---

## Desarrollo

Requiere **Node ≥ 18.18** y **pnpm**.

```bash
# Instalar dependencias
pnpm install

# App de producto (http://localhost:3000)
pnpm dev:matilda

# Design system + tracker (http://localhost:3001)
pnpm dev:style-guide

# Typecheck de todo el monorepo
pnpm typecheck

# Build de producción
pnpm build
```

---

## Documentación de diseño

Los archivos en `.kiro/steering/` sirven como contexto automático para el agente de desarrollo:

| Archivo | Contenido |
|---------|-----------|
| `AESTHETIC.md` | ADN visual — por qué cada decisión de diseño |
| `DESIGN_PROCESS.md` | Proceso de diseño — cómo pensar una pantalla nueva |
| `DESIGN.md` | Sistema técnico — colores, tipografía, espaciado, layout |
| `LAYOUTS.md` | Patrones de layout — Shell, surfaces, mapper, auth |
| `TOKENS.md` | Referencia de todos los CSS custom properties |
| `STATES.md` | Estados de interacción de cada componente |
| `COMPONENTS.md` | Catálogo completo de componentes con ejemplos |
| `ICONOGRAPHY.md` | Sistema de íconos — especificación y catálogo |
| `PRD.md` | Documento de producto — dominio, glosario, flujos |

---

## Reglas del proyecto

- Sin Tailwind ni librerías de UI/íconos externas
- Sin colores hardcodeados fuera de excepciones documentadas — usar `var(--token)`
- Dimensiones del Shell fijas: sidebar 268px, topbar 60px, statusbar 34px
- UI en español LATAM neutro (tú/tienes). Sin emojis en la UI
- Producción usa solo acento cyan. Otros acentos son para prototipos
- Íconos: stroke 1.5px, fill none, `currentColor`. Sin librerías externas

---

## Datos mock

Los datos de negocio están en `apps/matilda/src/data/` como mocks estáticos, listos para reemplazar por la API real del Mapper Service y el catálogo canónico.
