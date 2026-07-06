"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MatildaMark } from "@bowpi/design-system";

const DS_SECTIONS = [
  { id: "colors", label: "Colores", group: "Fundaciones" },
  { id: "typography", label: "Tipografía", group: "Fundaciones" },
  { id: "spacing", label: "Radios y sombras", group: "Fundaciones" },
  { id: "icons", label: "Íconos", group: "Fundaciones" },
  { id: "buttons", label: "Botones", group: "Base" },
  { id: "badges", label: "Tags y chips", group: "Base" },
  { id: "forms", label: "Formularios", group: "Base" },
  { id: "nav", label: "Navegación", group: "Base" },
  { id: "cards", label: "Cards", group: "Compuestos" },
  { id: "data", label: "Display de datos", group: "Compuestos" },
  { id: "tables", label: "Tablas", group: "Compuestos" },
  { id: "alerts", label: "Alertas y feedback", group: "Compuestos" },
];

// Simulaciones DMN etc. only exist as tracker entries for now (no dedicated
// specimen section on this page yet) — see /tracker for the full inventory.

export function StyleGuideNav() {
  const pathname = usePathname();
  const groups = [...new Set(DS_SECTIONS.map((s) => s.group))];

  return (
    <nav className="sg-nav">
      <div className="sg-nav-brand">
        <div className="row">
          <MatildaMark />
          <div className="title">Bowpi Enterprise</div>
        </div>
        <div className="ver">Design System · v4.5</div>
      </div>

      <div className="sg-nav-group">General</div>
      <Link href="/design-system" className={`sg-nav-link ${pathname === "/design-system" ? "on" : ""}`}>
        Design System
      </Link>
      <Link href="/tracker" className={`sg-nav-link ${pathname === "/tracker" ? "on" : ""}`}>
        Component Tracker
      </Link>

      {pathname === "/design-system" &&
        groups.map((g) => (
          <div key={g}>
            <div className="sg-nav-group">{g}</div>
            {DS_SECTIONS.filter((s) => s.group === g).map((s) => (
              <a key={s.id} className="sg-nav-link" href={`#${s.id}`}>
                {s.label}
              </a>
            ))}
          </div>
        ))}
    </nav>
  );
}
