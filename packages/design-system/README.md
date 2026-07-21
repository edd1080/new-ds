# @bowpi/design-system

Bowpi Enterprise design system — React component library, CSS tokens, and icons.

## Instalación

```bash
pnpm add @bowpi/design-system
```

Requiere `react` y `react-dom` >= 18.0.0 como peer dependencies.

## Uso

```tsx
import { Button, Icon, FormInput, SurfaceHeader } from "@bowpi/design-system";
import "@bowpi/design-system/styles";
```

Importa los estilos una sola vez en el entry point de tu app (por ejemplo `app/layout.tsx` en Next.js).

## Desarrollo

```bash
pnpm install
pnpm build       # build de producción (lib/)
pnpm dev         # build en modo watch
pnpm typecheck
```

## Publicación

```bash
pnpm publish
```

El script `prepublishOnly` corre el build automáticamente antes de publicar.
