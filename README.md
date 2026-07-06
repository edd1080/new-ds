# Bowpi Enterprise — Matilda

Plataforma B2B de configuración e implementación del **motor de decisión crediticia de Bowpi**, dirigida a equipos técnicos de instituciones financieras. El módulo activo es **Data Translation**: conecta el JSON de solicitud de crédito de un banco al **Canónico v9.0.0** usando un agente IA.

Esta es la implementación en código real (React / Next.js) de los diseños producidos en Claude Design.

## Monorepo

pnpm workspaces:

```
bowpi-enterprise/
├── packages/
│   └── design-system/     @bowpi/design-system — librería de componentes React + tokens CSS + Component Tracker (datos)
└── apps/
    ├── matilda/           @bowpi/matilda — la app de producto (Next.js 14, App Router)
    └── style-guide/       @bowpi/style-guide — referencia visual del DS + Component Tracker en vivo
```

### `packages/design-system`
La fuente de verdad de la UI: tokens CSS (`src/styles/`), librería de íconos SVG inline (`src/icons/Icon.tsx`), y todos los componentes tipados (Shell, formularios, cards, editor de mapeo, Auth, Dominios, Simulaciones DMN). El inventario vivo de componentes está en `src/tracker/data.ts`.

### `apps/matilda`
La aplicación real. 22 rutas: Auth (login, register, forgot-password, check-email, verify-code, email-verified, two-factor), Overview, Proyectos, Upload (Config + Ingesta), Mapper Editor, Resumen, Publicar, Cómo funciona, Tour, Dominios, Ajustes, Simulaciones DMN.

- **Estado:** Zustand con `persist` (localStorage key `matilda_v4_store`).
- **Layout:** grupos de rutas `(app)` (con Shell) y `(auth)` (sin Shell).

### `apps/style-guide`
Sitio de documentación: `/design-system` (especímenes en vivo usando los componentes reales) y `/tracker` (Component Tracker interactivo).

## Stack

- **Next.js 14** (App Router) · **TypeScript** estricto · **Zustand**
- **CSS custom properties** (sin Tailwind, sin librerías de UI ni de íconos externas)
- Fuentes: DM Sans · Space Grotesk · JetBrains Mono (Google Fonts)
- Tema `light` + acento `cyan` por defecto; dark mode disponible

## Desarrollo

Requiere Node ≥ 18.18 y pnpm.

```bash
pnpm install

# app de producto (http://localhost:3000)
pnpm dev:matilda

# design system + tracker (http://localhost:3001)
pnpm dev:style-guide

# typecheck / build de todo el monorepo
pnpm typecheck
pnpm build
```

## Reglas de diseño (contrato)

- Nunca Tailwind ni librerías de UI/íconos externas.
- Nunca hardcodear colores/radios/sombras fuera de las excepciones documentadas — usar `var(--token)`.
- Dimensiones del Shell fijas: sidebar 268px · topbar 60px · statusbar 34px.
- UI en español (Argentina): vos/te. Sin emojis en la UI.

Los datos de negocio son mock (`apps/matilda/src/data/`), listos para reemplazar por la API real del Mapper Service / catálogo canónico.
